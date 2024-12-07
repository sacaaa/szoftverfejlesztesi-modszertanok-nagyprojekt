import LoginComponent from "../../components/LoginComponent/LoginComponent";
import Navbar from "../../components/Navbar/Navbar";
import "./Login.css";
import Footer2 from "../../components/Footer2/Footer2";

const Login = () => {
    return (
        <div className="log-container">
            <Navbar />
            <div className="login-main-content">
                <LoginComponent />
            </div>
            <Footer2 />
        </div>
    )
}

export default Login;