import ProductCard from "../components/ProductCard"

// Function to fetch best sellers data
async function getBestSellers() {
  try {
    // Fetch best seller IDs
    const bestSellersRes = await fetch("http://localhost:4000/bestSellers", {
      next: { revalidate: 60 },
    })
    const bestSellers = await bestSellersRes.json()
    

    //Fetch all products
    const productsRes = await fetch("http://localhost:4000/products", {
      next: { revalidate: 60 },
    })
    const allProducts = await productsRes.json()

    //Extract IDs 
    const bestSellerProductIds = bestSellers.map((bs) => Number(bs.productId))

    //Filter products
    const bestSellerProducts = allProducts.filter((product) => {
      return bestSellerProductIds.includes(Number(product.id))
    })
    
    console.log("Found best seller products:", bestSellerProducts.length)
    return bestSellerProducts

  } catch (error) {
    console.error("Error fetching best sellers:", error)
    return []
  }
}
export default async function BestSellersPage() {
  const products = await getBestSellers()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Best Sellers</h1>
        <p className="text-gray-600">
          Our most popular products, updated every minute with ISR
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Page built at: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No best sellers available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}