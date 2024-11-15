import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-secondary navbar-dark">
            <a href="index.html" className="navbar-brand mx-4 mb-3">
                <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>WebMusic</h3>
            </a>
            <div className="d-flex align-items-center ms-4 mb-4">
                <div className="ms-3">
                    <h6 className="mb-0">Admin</h6>
                    <span>Menu</span>
                </div>
            </div>
            <div className="navbar-nav w-100">
                <Link to="home" id='dashboard-menu' className="nav-item  nav-link"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
            </div>
            <div className="navbar-nav mt-1 w-100">
                <Link to="add-artist" id='artist-menu' className="nav-item  nav-link"><i className="fa fa-tachometer-alt me-2"></i>Add Artist</Link>
            </div>
            <div className="navbar-nav mt-1 w-100">
                <Link to="music-list" id='music-menu' className="nav-item  nav-link"><i className="fa fa-tachometer-alt me-2"></i>Music</Link>
            </div>
        </nav>
    </div>
  )
}
