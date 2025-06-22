const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center text-sm py-6 px-4 bottom-0 border-t border-gray-700">
      <p>
        © {new Date().getFullYear()} <span className="text-green-400">GetMeAChai</span>. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
