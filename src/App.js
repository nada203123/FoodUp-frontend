import NavigationBar from "./components/Navbar.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import VerifyAccount from "./pages/VerifyAccount/VerifyAccount.jsx";
import ForgetPass from "./pages/ForgetPass/ForgetPass.jsx";
import ResetPass from "./pages/ResetPass/ResetPass.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Home from "./pages/home/Home.jsx";
import ChangePass from "./pages/ChangePas/ChangePass.jsx";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts.jsx";
import OneProduct from "./pages/oneProduct/OneProduct.jsx";
import EditProduct from "./pages/editProduct/EditProduct.jsx";
import AddProduct from "./pages/addProduct/AddProduct.jsx";
import AddCategory from "./pages/addCategory/AddCategory.jsx";
import EditCategory from "./pages/editCategory/EditCategory.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import useUserStore from "./utilities/store/userStore.js";
function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = useUserStore();
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? element : <Navigate to="/SignIn" replace />;
}
const PrivateRouteWrapper = ({ children }) => (
  <>
    <NavigationBar />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/VerifyAccount" element={<VerifyAccount />} />
        <Route path="/ForgetPass" element={<ForgetPass />} />
        <Route path="/ResetPass" element={<ResetPass />} />
        <Route
          path="/"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<Home />} />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<Profile />} />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path="/ChangePass"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<ChangePass />} />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<CategoryProducts />} />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<OneProduct />} />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path="/modify/:productId"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<EditProduct />} />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path="/addProduct"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<AddProduct />} />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path="/addCategory"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<AddCategory />} />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path="/editCategory/:categoryId"
          element={
            <PrivateRouteWrapper>
              <PrivateRoute element={<EditCategory />} />
            </PrivateRouteWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
