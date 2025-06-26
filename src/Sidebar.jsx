import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsPhone } from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar, currentPage, setCurrentPage}) {
  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className={`sidebar-list-item ${currentPage === 'dashboard' ? 'active' : ''}`}>
                <a href="#" onClick={() => handleNavigation('dashboard')}>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#" onClick={() => handleNavigation('products')}>
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
            <li className={`sidebar-list-item ${currentPage === 'categories' ? 'active' : ''}`}>
                <a href="#" onClick={() => handleNavigation('categories')}>
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            
            <li className={`sidebar-list-item ${currentPage === 'inventory' ? 'active' : ''}`}>
                <a href="#" onClick={() => handleNavigation('inventory')}>
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#" onClick={() => handleNavigation('reports')}>
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className={`sidebar-list-item ${currentPage === 'settings' ? 'active' : ''}`}>
                <a href="#" onClick={() => handleNavigation('settings')}>
                    <BsFillGearFill className='icon'/> Settings
                </a>
            </li>
            {/* Users menu item removed */}
        </ul>
    </aside>
  )
}

export default Sidebar