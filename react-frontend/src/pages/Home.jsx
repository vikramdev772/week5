import { Link } from 'react-router-dom'
import { FormInput, LayoutDashboard, ArrowRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="home-page">
      <div className="background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
      
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            <span className="title-line">Project Evaluation</span>
            <span className="title-line">System</span>
          </h1>
          <p className="home-subtitle">Submit and manage your academic projects with ease</p>
          
          <div className="home-actions">
            <Link to="/form" className="btn btn-primary btn-lg home-btn swing-animation">
              <div className="btn-content">
                <FormInput size={20} className="btn-icon" />
                <span className="btn-text">Submit Form</span>
                <ArrowRight size={20} className="btn-arrow" />
              </div>
              <div className="btn-glow"></div>
            </Link>
            
            <Link to="/dashboard" className="btn btn-outline-primary btn-lg home-btn swing-animation" style={{animationDelay: '0.2s'}}>
              <div className="btn-content">
                <LayoutDashboard size={20} className="btn-icon" />
                <span className="btn-text">View Dashboard</span>
                <ArrowRight size={20} className="btn-arrow" />
              </div>
              <div className="btn-glow"></div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .home-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 50%, var(--primary-100) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .background-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-200), var(--primary-300));
          opacity: 0.3;
          filter: blur(40px);
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 10%;
          animation: float-swing 8s ease-in-out infinite;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: 15%;
          animation: float-swing 10s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 20%;
          animation: float-swing 12s ease-in-out infinite;
        }

        .shape-4 {
          width: 250px;
          height: 250px;
          top: 30%;
          right: 30%;
          animation: float-swing 9s ease-in-out infinite reverse;
        }

        .home-container {
          max-width: 600px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .home-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 4rem 3rem;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            0 16px 32px rgba(0, 0, 0, 0.08),
            0 8px 16px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          animation: content-float 6s ease-in-out infinite;
        }

        .home-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }

        .home-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .title-line {
          display: block;
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700), var(--primary-800));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: title-glow 3s ease-in-out infinite alternate;
        }

        .title-line:first-child {
          animation-delay: 0s;
        }

        .title-line:last-child {
          animation-delay: 0.5s;
        }

        .home-subtitle {
          font-size: 1.25rem;
          color: var(--secondary-600);
          margin-bottom: 3.5rem;
          line-height: 1.6;
          font-weight: 500;
          opacity: 0.9;
        }

        .home-actions {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }

        .home-btn {
          min-width: 280px;
          padding: 1.25rem 2.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          border-radius: 16px;
          text-decoration: none;
          display: block;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          position: relative;
          z-index: 2;
        }

        .btn-icon {
          transition: all 0.3s ease;
        }

        .btn-text {
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .btn-arrow {
          transition: all 0.3s ease;
          opacity: 0.8;
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .home-btn.btn-primary {
          background: linear-gradient(135deg, var(--primary-500), var(--primary-600), var(--primary-700));
          color: white;
          box-shadow: 
            0 8px 24px rgba(59, 130, 246, 0.3),
            0 4px 12px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .home-btn.btn-primary:hover {
          transform: translateY(-4px) rotateX(5deg);
          box-shadow: 
            0 16px 48px rgba(59, 130, 246, 0.4),
            0 8px 24px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .home-btn.btn-primary:hover .btn-glow {
          opacity: 1;
        }

        .home-btn.btn-primary:hover .btn-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .home-btn.btn-primary:hover .btn-arrow {
          transform: translateX(4px);
          opacity: 1;
        }

        .home-btn.btn-outline-primary {
          background: rgba(255, 255, 255, 0.9);
          color: var(--primary-600);
          border: 2px solid var(--primary-200);
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .home-btn.btn-outline-primary:hover {
          transform: translateY(-4px) rotateX(-5deg);
          background: linear-gradient(135deg, var(--primary-50), var(--primary-100));
          border-color: var(--primary-400);
          color: var(--primary-700);
          box-shadow: 
            0 16px 48px rgba(59, 130, 246, 0.2),
            0 8px 24px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .home-btn.btn-outline-primary:hover .btn-glow {
          opacity: 1;
          background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.2), transparent);
        }

        .home-btn.btn-outline-primary:hover .btn-icon {
          transform: scale(1.1) rotate(-5deg);
          color: var(--primary-600);
        }

        .home-btn.btn-outline-primary:hover .btn-arrow {
          transform: translateX(4px);
          opacity: 1;
        }

        /* Swing Animations */
        .swing-animation {
          animation: card-swing 4s ease-in-out infinite;
        }

        @keyframes card-swing {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-8px) rotate(1deg); 
          }
          75% { 
            transform: translateY(-4px) rotate(-1deg); 
          }
        }

        @keyframes float-swing {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1); 
          }
          33% { 
            transform: translate(30px, -30px) scale(1.1); 
          }
          66% { 
            transform: translate(-20px, 20px) scale(0.9); 
          }
        }

        @keyframes content-float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }

        @keyframes title-glow {
          0% { 
            filter: brightness(1) drop-shadow(0 0 20px rgba(59, 130, 246, 0.3)); 
          }
          100% { 
            filter: brightness(1.2) drop-shadow(0 0 30px rgba(59, 130, 246, 0.5)); 
          }
        }

        @keyframes shimmer {
          0% { 
            left: -100%; 
          }
          50%, 100% { 
            left: 100%; 
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .home-content {
            padding: 3rem 2rem;
          }

          .home-title {
            font-size: 2.5rem;
          }

          .home-subtitle {
            font-size: 1.125rem;
          }

          .home-actions {
            gap: 1rem;
          }

          .home-btn {
            min-width: 240px;
            padding: 1rem 2rem;
            font-size: 1rem;
          }

          .floating-shape {
            filter: blur(30px);
          }

          .shape-1 {
            width: 200px;
            height: 200px;
          }

          .shape-2 {
            width: 150px;
            height: 150px;
          }

          .shape-3 {
            width: 100px;
            height: 100px;
          }

          .shape-4 {
            width: 180px;
            height: 180px;
          }
        }

        @media (max-width: 480px) {
          .home-page {
            padding: 1rem;
          }

          .home-content {
            padding: 2.5rem 1.5rem;
            border-radius: 24px;
          }

          .home-title {
            font-size: 2rem;
          }

          .home-btn {
            min-width: 100%;
            max-width: 300px;
            padding: 0.875rem 1.5rem;
          }

          .btn-content {
            gap: 0.5rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .home-page {
            background: linear-gradient(135deg, var(--secondary-900) 0%, var(--secondary-800) 50%, var(--primary-900) 100%);
          }

          .home-content {
            background: rgba(30, 41, 59, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .home-subtitle {
            color: var(--secondary-300);
          }

          .floating-shape {
            background: linear-gradient(135deg, var(--primary-800), var(--primary-700));
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
