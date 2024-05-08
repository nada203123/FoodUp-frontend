import SignUp from './pages/signUp/SignUp.jsx';
import SignIn from './pages/signIn/SignIn.jsx';
import VerifyAccount from './pages/VerifyAccount/VerifyAccount.jsx';
import ForgetPass from './pages/ForgetPass/ForgetPass.jsx';
import ResetPass from './pages/ResetPass/ResetPass.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Home from './pages/home/Home.jsx';
import ChangePass from './pages/ChangePas/ChangePass.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />  
       <Route path="/SignUp" element={<SignUp />} /> 
       <Route path="/SignIn" element={<SignIn />} />
       <Route path="/VerifyAccount" element={<VerifyAccount />} />
       <Route path="/ForgetPass" element={<ForgetPass/>}/>
       <Route path="/ResetPass" element={<ResetPass/>}/>
       <Route path="/profile" element={<Profile/>}/>
       <Route path="/ChangePass" element={<ChangePass/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
