import React , { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export const Header = () => {

      const navigate = useNavigate();


      useEffect(() => {
        const checkLog = sessionStorage.getItem("isLogin");
        console.log("Session Value:", checkLog);
    
        if (checkLog === "false" || !checkLog) {
          navigate("/admin/login");
        }
      }, [navigate]);

  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0" >
        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
            <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
        </a>
        <div className="navbar-nav align-items-center ms-auto">
            
            <div className="nav-item dropdown">
                <a href="/admin/login" className="nav-link " >
                    <span className="d-none d-lg-inline-flex">Log Out</span>
                </a>
            </div>
        </div>
    </nav>
  )
}
