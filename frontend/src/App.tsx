import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/context/ThemeContext'
import Sidebar from './components/layout/sidebar'
import Navbar from './components/layout/navbar'
import './App.css'

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Navbar />
                <Sidebar />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
