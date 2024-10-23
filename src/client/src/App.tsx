import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Protect from "./Protected";
import { AuthProvider } from "./useAuth";
import HomePage from "./assets/pages/HomePage";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" index element={<HomePage />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/protected" element={<Protect />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
