import Image from "next/image"
import StockLevel from "./StockLevel"

export default function ProductCard({ product, showStock = true }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 w-full">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-green-600">₹{product.price}</span>
          <span className="text-sm text-gray-500">{product.unit}</span>
        </div>

        {/* Stock Level */}
        {showStock && (
          <div className="mt-2">
            <StockLevel productId={product.id} />
          </div>
        )}
      </div>
    </div>
  )
}