import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../context/Alter/AlertContext';

const MyAccount = () => {
    const {showAlert} = useContext(AlertContext);
    const navigate = useNavigate();
    const userToken = localStorage.getItem('authToken');
    const APIURL = process.env.REACT_APP_API_URL;
    const [userDetails,setUserDetails] = useState({'_id':'','loginName':'','loginEmail':'','password':''});

    useEffect(() => {
        if(userToken){
            getUserDetails(userToken);
        }else{
            navigate('/login');
        }
    },[userToken,navigate]);

    const getUserDetails = async (userToken) =>{
        const resp = await fetch(`${APIURL}auth/get_user_data`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json','auth-token':userToken}
        })

        const respJson = await resp.json();
        setUserDetails({'_id':respJson._id,'loginName':respJson.name,'loginEmail':respJson.email});
    }

    const handleOnChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const userData = {'name':userDetails.loginName,'password':userDetails.password};
        const resp = await fetch(`${APIURL}auth/update_user`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','auth-token':userToken},
            body: JSON.stringify(userData)
        });

        const respJson = await resp.json();

        if(respJson.authToken){
            localStorage.setItem('authToken',respJson.authToken);
            localStorage.setItem('loginName',respJson.user.name);
            showAlert('Account details updated successfully','success');
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="loginName" className="form-label">Name</label>
                <input type="text" className="form-control" id="loginName" name='loginName' value={userDetails.loginName} onChange={handleOnChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="loginEmail" name='loginEmail' value={userDetails.loginEmail} disabled/>
            </div>
            <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginPassword" name='loginPassword'  onChange={handleOnChange}/>
                <div id="passHelp" className="form-text">leave it blank if you do not want to change password</div>
            </div>
            <div className="mb-3">
                <label htmlFor="loginCPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="loginCPassword" name='loginCPassword' />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    )
}

export default MyAccount
