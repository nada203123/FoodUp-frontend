
import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navigationbar from '../../components/Navbar';
import "./Profile.css";
import profile from "../../assets/myProfile.png"
import BasicTextFields from "../../components/InputPass"


function Profil() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
 // const {_id } = useParams();
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
    setUserId(userId);
  const getUserData = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/auth/UserById/${userId}`);
    console.log(response.data)
    setUsername(response.data.username);
    setEmail(response.data.email);
  } catch (error) {
    console.error('Error fetching user data:', error);
  } 
};
getUserData();
},[userId])

const handleUpdateProfile = async () => {
   

  if (!username || !email) {
    alert('Username and email cannot be empty.');
    
    return;
  }
  try {
    const response = await axios.patch(`http://localhost:4000/auth/updateUser/${userId}`, {
      username,
      email,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    
  } 
alert ('update successfully')
  
};

const handleChangePass = () => {
  navigate(`/ChangePass/${userId}`);
};

 


  return (
    <>
      <Navigationbar/>
      <div className="myprofile">
        <div className="formMyprofile" > 
          <form onSubmit={handleUpdateProfile}> 
            <fieldset className='fieldsetmyprofile'> 
            
            <div className='imgP'>
            <img className='imageP' src={profile} alt="myprofile" />
            </div>
            <div className='infoP'>
            
              <div className="FieldP"> 
              <BasicTextFields   label="Username"
                  variant="standard"
                  value={username}
                  setValue={setUsername}/>
              
             
      
                
              </div> 

              <div className="FieldP"> 
              <BasicTextFields  label="Email"
                  variant="standard"
                  value={email}
                  setValue={setEmail}
        />
              
                
              </div> 
              </div>
              
              <div className="buttonContainer">

              <button className="btnP" type="submit" > 
                Update Profile
              </button>
              <button  className="btn" onClick={handleChangePass}> 
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

export default Profil
