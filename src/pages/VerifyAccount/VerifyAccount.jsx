import "./VerifyAccount.css";
import { useState} from "react";
import VerifyAccount from "../../assets/VerifyAccount.png"
import { useLocation,useNavigate } from 'react-router-dom';
import Navigationbar from '../../components/Navbar';

 


function Verification(){
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email ||""); 
    const [otpcode, setOtpCode] = useState(""); 
    let navigation = useNavigate();


    function verifyAccount (event) {
        event.preventDefault();
        
        if (otpcode.trim() === "" || isNaN(otpcode)) {
          alert("Please enter a valid OTP code");
          return; 
      }
      axios.post("http://localhost:4000/auth/verifyAccount" , {email:email,inputCode: otpcode})
        .then((response)=>

        navigation("/SignIn")   
        )
        .catch((error)=> {
         
            console.log(error.message)
        }   )
        
        
        
        
    }

   


    return ( 
      <>
      <Navigationbar/>
      <div className="all">
        <div className="App" > 
          <form onSubmit={(event) => verifyAccount(event)}> 
            <fieldset className="fieldsetfood"> 

              <h2 className="verifyA">Verify Your Account</h2> 
              <div className="img">
        <img className='imgV' src={VerifyAccount} alt="verifyAccount" /> 
        </div>
              <p>We have sent you an email containing the code needed to complete your registration steps. </p>


              <div className="Field"> 
                <input 
                  value={email} 
                  onChange={(e) => { 
                    setEmail(e.target.value); 
                  }} 
                  placeholder="Email address" 
                /> 
              </div> 

              <div className="Field"> 
                <input 
                  value={otpcode} 
                   
                  onChange={(e) => { 
                    setOtpCode(e.target.value ); 
                  }} 
                  placeholder="OTP Code" 
                /> 
                
              </div> 
              
             

              <button type="submit" className="btnV" > 
                Submit
              </button> 
            </fieldset> 
          </form> 
        </div> </div>
        </>
      ); 
 
};

export default Verification;