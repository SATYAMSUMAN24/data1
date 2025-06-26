import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left' style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          color: '#40e0ff',
          fontSize: '18px',
          fontFamily: 'Orbitron, monospace',
          fontWeight: '600'
        }}>
            <BsSearch className='icon'/>
            <span>COSMIC ADMIN</span>
        </div>
        <div className='header-right' style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
            <div style={{
              position: 'relative',
              padding: '8px',
              borderRadius: '50%',
              background: 'rgba(64, 224, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <BsFillBellFill className='icon pulse'/>
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '8px',
                height: '8px',
                background: '#ff6b6b',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(255, 107, 107, 0.8)'
              }}></span>
            </div>
            <div style={{
              padding: '8px',
              borderRadius: '50%',
              background: 'rgba(64, 224, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <BsFillEnvelopeFill className='icon'/>
            </div>
            <div style={{
              padding: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(64, 224, 255, 0.2), rgba(102, 126, 234, 0.2))',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(64, 224, 255, 0.3)'
            }}>
              <BsPersonCircle className='icon'/>
            </div>
        </div>
    </header>
  )
}

export default Header