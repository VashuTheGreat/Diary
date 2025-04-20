import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white py-6 mt-10 shadow-inner">
    <div className="max-w-4xl mx-auto text-center px-4">
      <h2 className="text-xl font-bold mb-2">📝 My Diary</h2>
      <p className="text-sm">Made with 💜 to capture your thoughts, memories, and emotions.</p>
      <div className="flex justify-center gap-4 mt-3">
        <a href="https://github.com/vashuthegreat" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <i className="fab fa-github text-xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/vashuthegreat" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <i className="fab fa-linkedin text-xl"></i>
        </a>
        <a href="mailto:vashu@example.com" className="hover:text-gray-300">
          <i className="fas fa-envelope text-xl"></i>
        </a>
      </div>
      <p className="text-xs mt-3 text-purple-200">&copy; {new Date().getFullYear()} VashuTheGreat. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer

