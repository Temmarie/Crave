import React from 'react'

const Header = () => {
  return (
    <>
      <nav className=" bg-lime-200 text-brown hover:bg-lime-300 text-4xl font-bold p-4">
        <div className="container">
          <a className="navbar-brand" href="/">React CRUD</a>
        </div>  
      </nav>
    </>
  )
}

export default Header
