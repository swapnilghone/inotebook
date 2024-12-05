import React, { useState,useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../context/Alter/AlertContext';

const Login = () => {
    const APIURL = process.env.REACT_APP_API_URL;
    const {showAlert} = useContext(AlertContext);
    const navigate = useNavigate();
    const [creds,setCreds] = useState({email:'',password:''});
    const userToken = localStorage.getItem('authToken');
    const handleOnChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const resp = await fetch(`${APIURL}auth/login`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(creds)
        })
        const respUser = await resp.json();

        if(respUser.authToken){
            localStorage.setItem('authToken',respUser.authToken);
            localStorage.setItem('loginName',respUser.name);
            navigate('/');
            showAlert('Loggedin Sucessfully!','success');
            
        }else{
            if(respUser.error){
                showAlert(respUser.error,'error');
            }
            // alert('Invalid Details!');
        }
        // console.log(respUser);
    }

    useEffect(()=>{
        console.log(process.env);
        if(userToken){
            navigate("/");
        }
    },[userToken,navigate])

    return (
        <div className='row'>
            <div className="col-md-8 mx-auto">
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' id="loginEmail" aria-describedby="emailHelp" value={creds.email} onChange={handleOnChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="loginPassword" value={creds.password} onChange={handleOnChange} required minLength={5}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
