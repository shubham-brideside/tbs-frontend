export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Us Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-600 mb-6">Contact Us</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Wedding Curation */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">For Wedding Curation</h4>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.16.37 2.41.57 3.67.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.61.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="text-sm text-gray-800">9999988888</span>
                </div>
              </div>

              {/* Address */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">Our Address</h4>
                <div className="text-sm text-gray-800 space-y-1">
                  <div className="font-bold text-gray-800">Saket</div>
                  <div>Lane no.5, Westend Marg,</div>
                  <div>Saidulajaib Extention,</div>
                  <div>New Delhi-110030</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Customer Services */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">For Customer Services</h4>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:bridesidecontact@gmail.com" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                    bridesidecontact@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">WhatsApp</h4>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                    +919999999999
                  </a>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="space-y-4">
                {/* Instagram Icon */}
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://www.instagram.com/thebrideside.in/?igsh=bWh0dXdoNXF4NTU4#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t pt-6">
          <p className="text-sm text-gray-800">© {new Date().getFullYear()} TheBrideSide.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

