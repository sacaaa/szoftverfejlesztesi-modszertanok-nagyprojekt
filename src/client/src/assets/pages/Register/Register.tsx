import RegisterComponent from "../../components/RegisterComponent/RegisterComponent";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Register.css";

const Register = () => {
    return (
        <div className="container">
            <Navbar />
            <div className="login-main-content">
                <RegisterComponent />
            </div>
            <Footer />
        </div>
    )
}

export default Register;