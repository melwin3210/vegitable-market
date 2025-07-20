import Link from "next/link"
import ProductCard from "../components/ProductCard"

// Function to fetch inventory data at build time
async function getInventory() {
  try {
    const productsRes = await fetch("http://localhost:4000/products")
    const products = await productsRes.json()

    const stockRes = await fetch("http://localhost:4000/stock")
    const stock = await stockRes.json()

    return { products, stock }
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return { products: [], stock: [] }
  }
}

export default async function InventoryPage() {
  const { products, stock } = await getInventory()
  const buildTime = new Date().toLocaleString()

  // Combine products with their build-time stock levels
  const productsWithStock = products.map((product) => {
    const stockItem = stock.find((s) => Number(s.productId) === Number(product.id))
    return {
      ...product,
      stockQuantity: stockItem?.quantity || 0,
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Overview (SSG)</h1>
        <p className="text-gray-600">
          Current stock levels for all products (snapshot at build time)
        </p>
        <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm">
          <p className="text-green-800">
            <strong>Page built at:</strong> {buildTime}
          </p>
          <p className="text-green-600 text-xs mt-1">
            SSG: This page is pre-built at build time. Click on products for individual SSG pages.
          </p>
        </div>
      </div>

      {productsWithStock.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No inventory data available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsWithStock.map((product) => (
            <Link key={product.id} href={`/inventory/${product.id}`}>
              <div className="relative cursor-pointer transform hover:scale-105 transition-transform">
                <ProductCard product={product} showStock={false} />
                {/* Static stock badge showing build-time stock */}
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium shadow-md">
                  {product.stockQuantity > 0 ? (
                    <span className={`${product.stockQuantity < 10 ? "text-orange-600" : "text-green-600"}`}>
                      Build-time: {product.stockQuantity}
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
                {/* Click indicator */}
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full px-2 py-1 mt-14 text-xs">
                  View Details
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}