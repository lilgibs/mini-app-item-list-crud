import React from 'react'

function Sidebar({ visible }) {
  const sidebarStyle = {
    transform: visible ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    width: '240px', // Lebar sidebar yang diinginkan
    zIndex: 1 // Pastikan sidebar muncul di atas konten
  }

  return (
    <div className='fixed min-h-screen bg-teal-200 p-5' style={sidebarStyle}>
      <div className='h-screen'>
        <p>item 1</p>
        <p>item 2</p>
        <p>item 3</p>
        <p>item 4</p>
      </div>
    </div>
  )
}

export default Sidebar
