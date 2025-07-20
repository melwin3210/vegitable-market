import Image from "next/image"
import Link from "next/link"

// Function to fetch all products for generateStaticParams
async function getAllProducts() {
  try {
    const productsRes = await fetch("http://localhost:4000/products")
    const products = await productsRes.json()
    return products
  } catch (error) {
    console.error("Error fetching products for static params:", error)
    return []
  }
}

// Function to fetch individual product data
async function getProductWithStock(id) {
  try {
    const productsRes = await fetch("http://localhost:4000/products")
    const products = await productsRes.json()

    // Filter the product by ID
    const product = products.find((p) => p.id.toString() === id.toString())
    if (!product) return null

    // Fetch stock data
    const stockRes = await fetch("http://localhost:4000/stock")
    const stockData = await stockRes.json()

    const stockItem = stockData.find((s) => s.productId.toString() === id.toString())

    return {
      ...product,
      stockQuantity: stockItem?.quantity || 0,
      buildTime: new Date().toLocaleString(),
    }
  } catch (error) {
    console.error("Error fetching product with stock:", error)
    return null
  }
}


// Generate static params for all products (SSG requirement)
export async function generateStaticParams() {
  const products = await getAllProducts()
  
  console.log("Generating static params for products:", products.map(p => p.id))
  
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductInventoryPage({ params }) {
  const product = await getProductWithStock(params.id)

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/inventory" className="text-blue-600 hover:text-blue-800">
            ← Back to Inventory
          </Link>
        </div>
      </div>
    )
  }

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50" }
    if (quantity < 10) return { text: "Low Stock", color: "text-orange-600 bg-orange-50" }
    return { text: "In Stock", color: "text-green-600 bg-green-50" }
  }

  const stockStatus = getStockStatus(product.stockQuantity)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/inventory" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Inventory
        </Link>
      </div>

      {/* Product details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product image */}
          <div className="md:w-1/2">
            <div className="relative h-96 w-full">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-lg text-gray-500">{product.unit}</span>
              </div>

              {/* Stock information */}
              <div className={`p-4 rounded-lg ${stockStatus.color}`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{stockStatus.text}</span>
                  <span className="text-2xl font-bold">{product.stockQuantity} units</span>
                </div>
              </div>
            </div>

            {/* Build time info */}
            <div className="border-t pt-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>SSG Page built at:</strong> {product.buildTime}
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  This page was pre-rendered at build time with static stock data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}