import React from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export const Base = () => {

  return (
    <div className="container-fluid position-relative d-flex p-0">
        {/* <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width:'3rem', height:'3rem'}}  role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> */}

        <Sidebar />

        <div className="content">
            <Header />

            <div className="container-fluid pt-4 px-4">
               <Outlet />
            </div>

        </div>


    </div>
  )
}
