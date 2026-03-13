import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Form from './pages/Form'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
