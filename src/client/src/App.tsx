import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Protect from "./Protected";
import { AuthProvider } from "./useAuth";
import HomePage from "./assets/pages/HomePage";
import SchoolList from "./assets/pages/SchoolList/SchoolList";
import Login from "./assets/pages/Login/Login";
import UserProfile from "./assets/components/UserProfile/UserProfile";

const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" index element={<HomePage />}/>
                    <Route path="/signin" element={<Signin />}/>
                    <Route path="/protected" element={<Protect />}/>
                    <Route path="/schools" element={<SchoolList />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/profile" element={<UserProfile />}/>
                </Routes>
        </Router>
    );
};

export default App;
