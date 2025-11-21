import Home from './components/Home'
import './App.css'

function App() {
  return (
    <div className="app-outer-container">
      <div className="app-inner-container">
        <Home firstname="Firstname" balance={6213.45} />
      </div>
    </div>
  )
}

export default App