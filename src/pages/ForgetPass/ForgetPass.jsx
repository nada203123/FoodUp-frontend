import "./ForgetPass.css";
import {useState} from "react";
import axios from "axios";
import Navigationbar from '../../components/Navbar';
import ForgetPass from "../../assets/ForgetPass.png";
import PopUp from '../../components/PopUp';
import { useNavigate } from 'react-router-dom';


function ForgetPassword(){
    const [email, setEmail] = useState(""); 
    const [modalVisible, setModalVisible] = useState(false); // State for popup visibility
  const [modalMessage, setModalMessage] = useState('');
    let navigation = useNavigate();

  async  function forgetPass(event) {
        event.preventDefault() ;
        if (email.trim() === "") {
          alert("Email address is required.");
          return; // Don't proceed with the form submission
        }
        console.log("🚀 ~ forgetPass ~ email:", email)
try {
  const response = await axios.post("http://localhost:5198/api/users/reset-password", { Email: email })
        console.log("🚀 ~ forgetPass ~ response:", response)
        if (response.status===200){
          navigation("/ResetPass")
        }
        /*.then((response) => {
          alert('Please check your email.');
          
          })
          .catch((error) => {
            alert('Email not found.');
            
            console.log(error.message);
          });*/
} catch (error) {
  console.error(error)
}
       
         

    }
    const handleModalClose = () => {
      setModalVisible(false); // Close the popup
    };
    return(
      <div>
        {modalVisible && <div className="blur-overlay"/>}
      <>
      
      <Navigationbar/>
<div className="AppF" > 
          <form onSubmit={(event) => forgetPass(event)}> 
            <fieldset className="fieldsetF"> 

              <h2>Forget your password ?</h2>
              <div className="imgF">
        <img className='imgF' src={ForgetPass} alt="verifyAccount" /> 
        </div>
              <p>Enter your email to continue. </p>


              <div className="Field"> 
                <input 
                  value={email} 
                  onChange={(e) => { 
                    setEmail(e.target.value); 
                  }} 
                  placeholder="Email address" 
                /> 
              </div> 

              <button type="submit" className="btnF"> 
                Forget Password
              </button> 
            </fieldset> 
          </form> 
        </div>
        {modalVisible && <PopUp message={modalMessage} buttontext="OK" onclick={handleModalClose} />}
        </> 
        </div>
      ); 
}

export default ForgetPassword;