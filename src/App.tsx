import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Transactions from './pages/Transactions'
import VirtualJar from './pages/VirtualJar'
import Goals from './pages/Goals'
import Buddies from './pages/Buddies'
import Settings from './pages/Settings'
import './App.css'

function App() {
  return (
    <div className="app-outer-container">
      <div className="app-inner-container">
        <Routes>
          <Route path="/" element={<Home firstname="Firstname" balance={6213.45} />} />
          <Route path="/expenses" element={<Transactions />} />
          <Route path="/virtual-jar" element={<VirtualJar />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/buddies" element={<Buddies />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}

export default App