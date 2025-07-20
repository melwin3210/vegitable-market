"use client"

import useSWR from "swr"

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function StockLevel({ productId }) {
  const { data, error, isLoading } = useSWR("http://localhost:4000/stock", fetcher, {
    refreshInterval: 3000, // Poll every 3 seconds for real-time updates
    revalidateOnFocus: false,
  })

  // Loading state
  if (isLoading) {
    return <span className="text-sm text-gray-500 animate-pulse">Loading stock...</span>
  }

  // Error state
  if (error) {
    return <span className="text-sm text-red-500">Stock unavailable</span>
  }

  // Find stock for this specific product
  const stockItem = data?.find((item) => Number(item.productId) === Number(productId))
  const quantity = stockItem?.quantity || 0

  // Function to determine stock color based on quantity
  const getStockColor = (qty) => {
    if (qty === 0) return "text-red-600"
    if (qty < 10) return "text-orange-600"
    return "text-green-600"
  }

  // Function to get stock text
  const getStockText = (qty) => {
    if (qty === 0) return "Out of stock"
    if (qty < 10) return `Low stock: ${qty} left`
    return `In stock: ${qty}`
  }

  return (
    <span className={`text-sm font-medium ${getStockColor(quantity)}`}>
      {getStockText(quantity)}
    </span>
  )
}