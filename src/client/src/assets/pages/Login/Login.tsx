import LoginComponent from "../../components/LoginComponent/LoginComponent";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Login.css";

const Login = () => {
    return (
        <div className="container">
            <Navbar />
            <div className="login-main-content">
                <LoginComponent />
            </div>
            <Footer />
        </div>
    )
}

export default Login;