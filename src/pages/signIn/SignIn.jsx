import Navigationbar from "../../components/Navbar";
import React, { useState } from "react";
import { FaKey, FaMailBulk, FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import useEmailValidation from "../../utilities/hooks/useEmailValidation";
import signInImg from "../../assets/SignIn.png";
import "./SignIn.css";
import axios from "axios";
import useUserStore from "../../utilities/store/userStore";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const { setIsAuthenticated, setUser } = useUserStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const validateEmail = useEmailValidation();
  const handleSignIn = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError("");
    }
    if (!password) {
      setEmailError("Please enter a password");
      return;
    } else {
      setEmailError("");
    }
    axios
      .post(
        "http://localhost:5198/api/users/login", //api jdid houni
        {
          Email: email,
          Password: password,
        }
      )
      .then((response) => {
        console.log("Token received:", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.token));
        localStorage.getItem("token"); // afsa5 line 43 7ata hedha ki torbet backend
        const user = jwtDecode(response.data.token);
        setUser(user);
        
        if(user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]==="admin") {
          setIsAuthenticated(true);
          console.log("🚀 ~ .then ~ response.data.user:", response.data);

        navigate("/");
        }
        
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <Navigationbar />
      <div className="signup-containerI">
        <div className="right-sideI">
          <h2 className="signup-titleI">Sign In</h2>
          <div className="formI">
            <Input
              type={"text"}
              icon={<FaMailBulk size={24} />}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder={"Email Address"}
            />
            {emailError && <span className="error-message">{emailError}</span>}
            <Input
              type={"password"}
              icon={<FaKey size={24} />}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder={"Password"}
            />
          </div>
          <span className="link" onClick={() => navigate("/ForgetPass")}>
            forgot your password?
          </span>
          <div className="vertical-align">
            <button className="submit-buttonI" onClick={handleSignIn}>
              <FaArrowAltCircleRight size={30} />
            </button>
            <span>Sign In</span>
          </div>
          <p className="already-have-accountI">
            Need an account?{" "}
            <strong>
              <Link className="link" to="/SignUp">
                Sign up
              </Link>
            </strong>
          </p>
        </div>
        <div className="left-sideI">
          <img className="left-ImageI" src={signInImg} alt="signin" />
        </div>
      </div>
    </>
  );
};
export default SignIn;
