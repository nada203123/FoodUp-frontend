import { Input } from '@mui/material'
import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navigationbar from '../../components/Navbar';
import "./ChangePass.css";
import ChangePass from "../../assets/changePass.png"
import BasicTextFields from "../../components/InputPass"


function ChangePassword() {

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [userId, setUserId] = useState(null);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    setUserId(userId);

    if (!password || !newPassword || !confirmNewPassword) {
      console.log('All fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      console.log('New passwords do not match');
      return;
    }

    try {
      // Call the API to update the password
      const response = await axios.patch(`http://localhost:4000/auth/updatePass/${userId}`, {
        password,
        newPassword,
        confirmNewPassword
      });
      
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

 


  return (
    <>
      <Navigationbar/>
      <div className="ChangePass">
        <div className="formPass" > 
          <form onSubmit={handleSubmit}> 
            <fieldset className='fieldsetPass'> 
            
            
            <img className='imagePass' src={ChangePass} alt="myprofile" />
            <div className='infoPass'>
            
              <div className="FieldPass"> 
              
              <BasicTextFields   label="Current Password"
                  variant="standard"
                  value={password}
            onChange={(e) => setPassword(e.target.value)}/>
      
                
              </div> 

              <div className="FieldPass"> 
              <BasicTextFields  label="New Password"
                  variant="standard"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
        />
                
              </div> 
              <div className="FieldPass"> 
              <BasicTextFields  label=" Confirm New Password"
                  variant="standard"
                  value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
                
              </div> 
              </div>
              
              <div className="buttonContainerPass">

              <button className="btnPass" type="submit" > 
              Change password
              </button>
               
              </div>
              
            </fieldset> 
          </form> 
        </div> 
        </div>
      
        </>
    
   
  )
}

export default ChangePassword