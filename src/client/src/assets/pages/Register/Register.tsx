import RegisterComponent from "../../components/RegisterComponent/RegisterComponent";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";
import Footer2 from "../../components/Footer2/Footer2";

const Register = () => {
    return (
        <div className="reg-container">
            <Navbar />
            <div className="login-main-content">
                <RegisterComponent />
            </div>
            <Footer2 />
        </div>
    )
}

export default Register;