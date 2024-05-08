import Navigationbar from '../../components/Navbar';
import React,{ useState } from 'react'
import { FaKey, FaMailBulk, FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import useEmailValidation from '../../utilities/hooks/useEmailValidation';
import signInImg from "../../assets/SignIn.jpg"
import './SignIn.css'


const SignIn = () => {
    const navigate = useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [emailError, setEmailError] = useState("");
  const validateEmail = useEmailValidation()
  const handleSignIn=()=>{
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError("");
    }
    if(!password){
      setEmailError("Please enter a password");
      return;
    }else{
      setEmailError("")
    }
    axios.post("http://localhost:4000/auth/login", { email: email, password: password })
        .then((response) => {
          console.log('Token received:', response.data.token);
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.getItem('token')
          console.log("🚀 ~ .then ~ response.data.user:", response.data)

         
          navigate("/")
        })
        .catch((error) => {
          console.log(error.message);
        });
   
}
    return (
        <>
    <Navigationbar/>
    <div className='signup-containerI'>
      <div className='right-sideI'>
      <h2 className="signup-titleI">Sign In</h2>
      <div className='formI'>
      <Input type={"text"} icon={<FaMailBulk size={24} />} onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"Email Address"} />
      {emailError && <span className="error-message">{emailError}</span>}
      <Input type={"password"} icon={<FaKey size={24} />} onChange={(e) => setPassword(e.target.value)} value={password} placeholder={"Password"} />
      </div>
      <span className= "link" onClick={()=>navigate("/ForgetPass")}>forgot your password?</span>
      <div className="vertical-align">
          <button className="submit-buttonI" onClick={handleSignIn}>
            <FaArrowAltCircleRight size={30} />
          </button>
          <span>Sign In</span>
        </div>
        <p className="already-have-accountI">Need an account? <strong><Link className="link" to="/SignUp">Sign up</Link></strong></p>

      </div>
      <div className='left-sideI'>
      <img className='left-ImageI' src={signInImg} alt="signin" />
      </div>
    </div>

    </>
    )
}
export default SignIn