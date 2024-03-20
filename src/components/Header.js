import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const handleLogout = (e) =>{
        e.preventDefault();
        if(localStorage.getItem('authToken')){
            localStorage.removeItem('authToken');
            localStorage.removeItem('loginName');
            navigate('/login');
        }
    }
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to='/' className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 text-decoration-none text-reset">
                        <i className="fa-solid fa-infinity"></i>
                        {/* <img src={process.env.PUBLIC_URL + 'logo_header.jpg'} style={{ height: '40px', width: 'auto' }} alt='Header Logo' /> */}
                        <h1>iNoteBook</h1>
                    </Link>
                    {/* <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><NavLink to="/" className="nav-link px-2 text-secondary">My Notest</NavLink></li>
                        <li><NavLink to="/addnote" className="nav-link px-2 text-white">Add Note</NavLink></li>
                    </ul> */}

                    {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                    </form> */}

                    {!localStorage.getItem('authToken') ? <div className="text-end">
                        <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                        <Link to="/register" className="btn btn-warning">Sign-up</Link>
                    </div> : <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Hi {localStorage.getItem('loginName')}!
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link className="dropdown-item" to="/my-account">My Account</Link></li>
                            <li><Link className="dropdown-item" to="/" onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </div>}
                </div>
            </div>
        </header>
    )
}
