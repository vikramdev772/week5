# Form App - React Frontend

A modern React frontend built with Vite for the Form Application. This SPA provides a responsive user interface for submitting forms and viewing dashboard data.

## 🚀 Features

- **Modern React**: Built with React 18 and hooks
- **Vite**: Fast development server and optimized builds
- **Routing**: Client-side routing with React Router
- **Form Validation**: Robust form validation with React Hook Form
- **API Integration**: Axios-based API service with error handling
- **Toast Notifications**: User-friendly notifications with react-hot-toast
- **Responsive Design**: Mobile-first responsive design
- **Modern UI**: Beautiful gradient design with glass-morphism effects
- **Icons**: Lucide React icons for consistent UI

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Vite 5**: Fast build tool and dev server
- **React Router 6**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Hook Form**: Form validation and management
- **React Hot Toast**: Toast notifications
- **Lucide React**: Icon library
- **CSS-in-JS**: Styled-jsx for component styling

## 📦 Dependencies

### Runtime Dependencies
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-router-dom` ^6.20.1
- `axios` ^1.6.2
- `react-hook-form` ^7.48.2
- `react-hot-toast` ^2.4.1
- `lucide-react` ^0.294.0

### Development Dependencies
- `@vitejs/plugin-react` ^4.2.1
- `vite` ^5.0.8
- `eslint` ^8.55.0
- `eslint-plugin-react` ^7.33.2
- `eslint-plugin-react-hooks` ^4.6.0
- `eslint-plugin-react-refresh` ^0.4.5

## 🏗️ Project Structure

```
react-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   └── Navbar.jsx      # Navigation component
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Home page
│   │   ├── Form.jsx        # Form submission page
│   │   └── Dashboard.jsx   # Dashboard page
│   ├── services/           # API services
│   │   └── api.js          # Axios configuration and API calls
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore file
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to match your backend API URL.

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🔧 Configuration

### Environment Variables
- `VITE_API_URL`: Backend API URL (default: http://localhost:6060)
- `VITE_DEV_MODE`: Development mode flag

### Vite Configuration
The `vite.config.js` includes:
- React plugin
- Development server on port 5173
- API proxy to backend (port 6060)
- Build optimization

## 📱 Pages

### Home Page (`/`)
- Hero section with call-to-action buttons
- Feature showcase
- Navigation to form and dashboard

### Form Page (`/form`)
- Form submission with validation
- Real-time validation feedback
- Success/error notifications
- Navigation after submission

### Dashboard Page (`/dashboard`)
- Data table with all submissions
- Search functionality
- Delete operations
- Statistics display
- Responsive table design

## 🎨 Styling

The application uses:
- **CSS-in-JS** with styled-jsx for component-scoped styles
- **Responsive design** with mobile-first approach
- **Modern UI** with gradients and glass-morphism effects
- **Animations** for smooth interactions
- **Consistent design system** across components

## 🔌 API Integration

The API service (`src/services/api.js`) provides:
- Axios instance with interceptors
- Error handling
- Request/response logging
- Form data CRUD operations

## 🧪 Development

### Linting
```bash
npm run lint
```

### Development Server
```bash
npm run dev
```

The development server includes:
- Hot module replacement
- API proxy to backend
- Source maps
- Error overlay

## 🚀 Deployment

### Build
```bash
npm run build
```

The build creates optimized static files in the `dist/` directory.

### Preview
```bash
npm run preview
```

## 🔗 Backend Integration

The frontend is designed to work with the Spring Boot backend. Make sure:
1. Backend is running on port 6060 (or configure accordingly)
2. CORS is enabled on the backend
3. API endpoints match the expected format

## 🐛 Troubleshooting

### Common Issues
1. **CORS errors**: Ensure backend allows requests from frontend origin
2. **API connection**: Check that backend is running and accessible
3. **Environment variables**: Verify `.env` file is correctly configured
4. **Port conflicts**: Change Vite port if 5173 is in use

### Development Tips
- Use React DevTools for debugging
- Check browser console for API errors
- Use Network tab to inspect API calls
- Enable hot reload for faster development
