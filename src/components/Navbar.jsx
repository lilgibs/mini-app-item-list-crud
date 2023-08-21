import React from 'react'

function Navbar({ onToggleSidebar }) {
  return (
    <div className='sticky top-0 w-full h-10 bg-teal-500'>
      <button onClick={onToggleSidebar}>Tombol Sidebar</button>
    </div>
  )
}

export default Navbar