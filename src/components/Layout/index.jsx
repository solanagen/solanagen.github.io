import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    {
      label: 'Features',
      items: [
        { path: '/tokenomics', label: 'Tokenomics' },
        { path: '/roadmap', label: 'Roadmap' },
      ]
    },
    {
      label: 'Community',
      items: [
        { path: '/community', label: 'Join Us' },
        { path: '/gallery', label: 'Meme Gallery' },
      ]
    },
    {
      label: 'Tools',
      items: [
        { path: '/meme-generator', label: 'Meme Generator' },
        { path: '/chat', label: 'Chat with AI' },
        { path: '/terminal', label: 'Trading Terminal' },
      ]
    },
  ];

  const handleDropdownClick = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed w-full bg-black/80 backdrop-blur-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-xl font-press-start text-primary hover:text-accent transition-colors flex flex-col leading-tight"
            >
              <span>
                <span className="font-bold text-[#FFD700]">A</span>utism
              </span>
              <span>
                <span className="font-bold text-[#FFD700]">I</span>ntelligence
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white text-2xl focus:outline-none"
            >
              ☰
            </button>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                item.items ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => handleDropdownClick(item.label)}
                      className="font-press-start text-sm text-white hover:text-accent transition-colors flex items-center gap-1"
                    >
                      {item.label}
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden"
                        >
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`block px-4 py-3 text-sm font-press-start hover:bg-primary/20 transition-colors ${
                                location.pathname === subItem.path ? 'text-accent' : 'text-white'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-press-start text-sm hover:text-accent transition-transform hover:scale-105 ${
                      location.pathname === item.path ? 'text-accent' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 space-y-4 text-center">
              {menuItems.map((item) => (
                item.items ? (
                  <div key={item.label} className="space-y-2">
                    <button
                      onClick={() => handleDropdownClick(item.label)}
                      className="w-full font-press-start text-sm text-white py-2"
                    >
                      {item.label}
                    </button>
                    {activeDropdown === item.label && (
                      <div className="space-y-2 bg-primary/10 py-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block font-press-start text-sm py-2 hover:text-accent transition-colors ${
                              location.pathname === subItem.path ? 'text-accent' : 'text-white'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-press-start text-sm py-2 hover:text-accent transition-colors ${
                      location.pathname === item.path ? 'text-accent' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
        {children}
      </main>

      <footer className="bg-black/90 text-center py-6">
        <p className="text-white">© 2025 Autism Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 