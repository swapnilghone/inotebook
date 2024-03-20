import React, { useContext, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../context/Alter/AlertContext';

const Register = () => {
  const APIURL = process.env.REACT_APP_API_URL;
  const {showAlert} = useContext(AlertContext);

  const navigate = useNavigate();
  const userToken = localStorage.getItem('authToken');

  const [creds, setCreds] = useState({ name: '', email: '', password: '',cpassword:'' });
  const handleOnChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${APIURL}auth/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
    });

    const jsonResp = await resp.json();
    if(jsonResp.authToken){
      showAlert('Account Created Sucessfully!','success');
      navigate('/');
    }else{
      if(jsonResp.errors){
        jsonResp.errors.map((error)=>{
          return showAlert(error.msg,'danger');
        })
      }
    }
  }

  useEffect(()=>{
    if(userToken){
      navigate("/");
    }
  },[userToken,navigate])

  return (
    <div className='row'>
      <div className="col-md-8 mx-auto">
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="loginName" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' id="loginName" aria-describedby="loginName" value={creds.name} onChange={handleOnChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id="loginEmail" aria-describedby="emailHelp" value={creds.email} onChange={handleOnChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="loginPassword" value={creds.password} onChange={handleOnChange}  minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="loginCPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name='cpassword' id="loginCPassword" value={creds.cpassword} onChange={handleOnChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">Sign-up</button>
        </form>
      </div>
    </div>
  )
}

export default Register