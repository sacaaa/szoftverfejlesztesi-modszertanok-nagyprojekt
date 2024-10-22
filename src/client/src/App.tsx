import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin"; // Importáld a Signin komponenst
import Protect from "./Protected"; // Importáld a Protect komponenst
import { AuthProvider } from "./useAuth"; // Importáld az AuthProvider-t a hitelesítési állapot kezeléséhez

const App = () => {
    return (
        <Router>
            <AuthProvider>
                {/* Az AuthProvider köré csomagoljuk az alkalmazást, hogy minden komponens hozzáférjen a hitelesítéshez */}
                <Routes>
                    {/* Az útvonalak beállítása */}
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/protected" element={<Protect />} />
                    {/* További útvonalak */}
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
