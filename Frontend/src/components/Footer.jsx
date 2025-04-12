import React from 'react'

function Footer() {
  return (
    <footer className="bg-zinc-800 text-white py-8">
  <div className="container mx-auto text-center">
    <p className="text-sm">&copy; 2025 Your Company. All Rights Reserved.</p>
    <div className="mt-4">
      <a href="#" className="text-gray-400 hover:text-white mx-3">About Us</a>
      <a href="#" className="text-gray-400 hover:text-white mx-3">Privacy Policy</a>
      <a href="#" className="text-gray-400 hover:text-white mx-3">Terms of Service</a>
    </div>
  </div>
</footer>
  )
}

export default Footer