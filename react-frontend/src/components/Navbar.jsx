import { Link, useLocation } from 'react-router-dom'
import { FormInput, LayoutDashboard, Home, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/form', label: 'Submit Project', icon: FormInput },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
  ]

  return (
    <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="brand-logo me-2">
            <FormInput size={28} className="text-primary" />
          </div>
          <div className="brand-text">
            <div className="brand-title">Project Evaluation</div>
            <div className="brand-subtitle">Management System</div>
          </div>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li className="nav-item" key={item.path}>
                  <Link 
                    className={`nav-link d-flex align-items-center ${isActive(item.path) ? 'active' : ''}`}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={18} className="me-2" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <style>{`
        .navbar {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding: 1rem 0;
          transition: all 0.3s ease;
          z-index: 1030;
        }

        .navbar.scrolled {
          padding: 0.5rem 0;
          background: rgba(255, 255, 255, 0.98) !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.12);
        }

        .navbar-brand {
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--primary-600) !important;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .navbar-brand:hover {
          color: var(--primary-700) !important;
          transform: translateY(-1px);
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.2;
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--secondary-500);
          line-height: 1;
        }

        .nav-link {
          font-weight: 600;
          color: var(--secondary-600) !important;
          padding: 0.75rem 1.25rem !important;
          border-radius: 12px;
          transition: all 0.3s ease;
          margin: 0 0.25rem;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
        }

        .nav-link:hover {
          color: var(--primary-600) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
        }

        .nav-link:hover::before {
          opacity: 0.1;
        }

        .nav-link.active {
          color: white !important;
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .nav-link.active:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .nav-link span {
          position: relative;
          z-index: 1;
        }

        .navbar-toggler {
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .navbar-toggler:hover {
          background: var(--primary-50);
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Mobile menu styles */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            border-radius: 0 0 16px 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 1rem 0;
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-top: none;
          }

          .navbar-collapse.show {
            display: block !important;
          }

          .navbar-nav {
            padding: 0 1rem;
          }

          .nav-item {
            margin: 0.25rem 0;
          }

          .nav-link {
            padding: 0.75rem 1rem !important;
            margin: 0;
            border-radius: 8px;
          }
        }

        /* Animation for nav items */
        .nav-item {
          animation: slideInRight 0.5s ease-out;
        }

        .nav-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-item:nth-child(2) { animation-delay: 0.2s; }
        .nav-item:nth-child(3) { animation-delay: 0.3s; }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
