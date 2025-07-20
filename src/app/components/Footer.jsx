export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} FreshMarket. All rights reserved.</p>
            <p className="mt-2 text-sm">Fresh products delivered to your door</p>
          </div>
        </div>
      </div>
    </footer>
  )
}