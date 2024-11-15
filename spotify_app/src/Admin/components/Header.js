import React from 'react'

export const Header = () => {
  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0" >
        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
            <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
        </a>
        <div className="navbar-nav align-items-center ms-auto">
            
            <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{width:'40px', height:'40px'}} />
                    <span className="d-none d-lg-inline-flex">John Doe</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                    <a href="#" className="dropdown-item">My Profile</a>
                    <a href="#" className="dropdown-item">Settings</a>
                    <a href="#" className="dropdown-item">Log Out</a>
                </div>
            </div>
        </div>
    </nav>
  )
}
