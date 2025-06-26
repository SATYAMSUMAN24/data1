import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import Categories from './Categories'
import Customers from './Customers'
import Inventory from './Inventory'
import Settings from './Settings'


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Home />
      case 'categories':
        return <Categories />
      case 'customers':
        return <Customers />
      case 'inventory':
        return <Inventory />
      case 'settings':
        return <Settings />
      default:
        return <Home />
    }
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar 
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderCurrentPage()}
    </div>
  )
}

export default App