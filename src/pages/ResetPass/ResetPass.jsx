import "./ResetPass.css";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ResetPass from "../../assets/ResetPass.png"
import Navigationbar from '../../components/Navbar';
 


function ResetPassword(){
    //const { token } = useParams()
    const [password, setPassword] = useState(""); 
    
    const [otp, setOtp] = useState(""); 
    
    const [email, setEmail] = useState(""); 
    
    const [error, setError] = useState('');
    let navigation = useNavigate();
    const token = localStorage.getItem("token")

    const handleResetPassword = async (event) => {
        event.preventDefault();
        
        console.log("🚀 ~ handleResetPassword ~ password:", password)
        console.log("🚀 ~ handleResetPassword ~ otp:", otp)
        console.log("🚀 ~ handleResetPassword ~ email:", email)
          try {
            const response = await axios.put(`http://localhost:5198/api/users/reset-password/apply`,  {Email:email,Otp:otp, Password: password });
            console.log(response.data);

            navigation('/SignIn');
          } catch (error) {
            console.error('Error:', error);
            setError('Failed to reset password');
          }
      
        
  }


    return ( 
      <>
      <Navigationbar/>
        <div className="AppR" > 
          <form onSubmit={(event) => handleResetPassword(event)}> 
            <fieldset className="fieldsetR"> 

              <h2>Set up your new password</h2> 
              

              <div className="imgR">
        <img className='imgR' src={ResetPass} alt="verifyAccount" /> 
        </div>

              <div className="FieldR"> 
                <input 
                  value={email} 
                  onChange={(e) => { 
                    setEmail( e.target.value ); 
                  }} 
                  placeholder="Email" 
                /> 
              </div> 

              <div className="FieldR"> 
              <input 
                  value={otp} 
                  type="text" 
                  onChange={(e) => { 
                    setOtp(e.target.value ); 
                  }} 
                  placeholder="OTP" 
                />
                 </div>  
                <div className="FieldR"> 
                <input 
                  value={password} 
                  type="password" 
                  onChange={(e) => { 
                    setPassword( e.target.value ); 
                  }} 
                  placeholder="Password" 
                /> 
                
                
              </div> 
              
             

              <button type="submit" className="btnR"> 
                Update Password
              </button> 
            </fieldset> 
          </form> 
        </div> 
        </>
      ); 
 
};

export default ResetPassword;