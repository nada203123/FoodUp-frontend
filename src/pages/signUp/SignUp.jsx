import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navigationbar from '../../components/Navbar';
import signUpImg from "../../assets/signUp.jpg"
import './SignUp.css'
import axios from "axios";
import useEmailValidation from '../../utilities/hooks/useEmailValidation';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { FaInfoCircle, FaKey, FaMailBulk, FaShieldAlt, FaArrowAltCircleRight } from "react-icons/fa"

const SignUp = () => {
  const navigate = useNavigate()
  const validateEmail = useEmailValidation() 
  const [fullName,setFullName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [checked,setChecked]=useState(false)
  

  const HandleSignUp = (event) => {
    

    if (!validateEmail(email)) {
        setEmailError("Invalid email address");
        return;
    } else {
        setEmailError("");
    }
    if(!password){
      setPasswordError("Please enter a password");
      return;
    }else{
      setPasswordError("")
    }
    event.preventDefault();


    if(password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match !");
      return;
      } else{
        setPasswordMatchError("");
      }
      axios.post("http://localhost:5198//api/users/register", { username: fullName, email: email, password: password })
      .then((response) => {
        console.log("🚀 ~ handleSignUp ~ response:", response)
      if (response.status === 201) {
          return navigate("/VerifyAccount", { state: { email } })
      }
      })
        .catch((error) => {
            alert(error.response.data.error);
            return;
        });

      
  };
  return (
    <>
    <Navigationbar/>
    <div className="signup-container">
        <div className="left-side">
        <img className='left-Image' src={signUpImg} alt="signup" /> 
        </div>
        <div className="right-side">
        <h2 className="signup-title">Sign Up</h2>
        <div className='form'> 
          <Input type={"text"} icon={<FaInfoCircle size={24} />} onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder={"Full Name"} />
          <Input type={"text"} icon={<FaMailBulk size={24} />} onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email Address"} />
          {emailError && <span style={{ fontSize:'12px',color: 'red' }}>{emailError}</span>}
          <Input type={"password"} icon={<FaKey size={24} />} onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"} />
          <Input type={"password"} icon={<FaShieldAlt size={24} />} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder={"Confirm Password"} />
          {passwordMatchError && <span style={{ fontSize:'12px',color: 'red' }}>{passwordMatchError}</span>}
        </div>
        <div className="horizontal-align">
          <input type="checkbox" id="discounts" name="discounts" onClick={() => (setChecked(!checked))} value={checked} />
          <label htmlFor="discounts">Yes, I would like to receive discounts, loyalty offers and other updates</label>
        </div>
        <div className="vertical-align">
          <button className="submit-button" onClick={HandleSignUp}>
            <FaArrowAltCircleRight size={30} />
          </button>
          <span>Sign Up</span>
        </div>
        <p className="already-have-account">Already have an account? <strong><Link className="link" to="/SignIn">Sign In</Link></strong></p>
        </div>
        </div>
        </>
  );

}
export default SignUp;

