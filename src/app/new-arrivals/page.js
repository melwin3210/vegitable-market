import ProductCard from "../components/ProductCard"

// Force dynamic rendering (SSR) - this ensures fresh data on every request
export const dynamic = "force-dynamic"

// Function to fetch new arrivals data
async function getNewArrivals() {
  try {
    console.log("Fetching new arrivals (SSR)...")
    
    // Step 1: Fetch new arrival IDs (always fresh data)
    const newArrivalsRes = await fetch("http://localhost:4000/newArrivals", {
      cache: "no-store", // Always fetch fresh data (SSR)
    })
    
    if (!newArrivalsRes.ok) {
      throw new Error(`New arrivals fetch failed: ${newArrivalsRes.status}`)
    }
    
    const newArrivals = await newArrivalsRes.json()

    // Step 2: Fetch all products (always fresh data)
    const productsRes = await fetch("http://localhost:4000/products", {
      cache: "no-store", // Always fetch fresh data (SSR)
    })
    
    if (!productsRes.ok) {
      throw new Error(`Products fetch failed: ${productsRes.status}`)
    }
    
    const allProducts = await productsRes.json()
    console.log("allProducts count:", allProducts.length)

    // Step 3: Filter products that are new arrivals
    const newArrivalProductIds = newArrivals.map((na) => Number(na.productId))
    console.log("newArrivalProductIds:", newArrivalProductIds)
    
    const newArrivalProducts = allProducts.filter((product) => {
      return newArrivalProductIds.includes(Number(product.id))
    })
    
    console.log("newArrivalProducts count:", newArrivalProducts.length)
    return newArrivalProducts

  } catch (error) {
    console.error("Error fetching new arrivals:", error)
    return []
  }
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h1>
        <p className="text-gray-600">
          Fresh products just added to our catalog
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Page rendered at: {new Date().toLocaleString()} (SSR - always fresh!)
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Found {products.length} new arrival products
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No new arrivals available at the moment.</p>
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