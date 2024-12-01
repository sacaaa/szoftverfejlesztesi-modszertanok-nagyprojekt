import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import SchoolList from "./assets/pages/SchoolList/SchoolList";
import Register from "./assets/pages/Register/Register";
import Login from "./assets/pages/Login/Login";
import UserProfile from "./assets/components/UserProfile/UserProfile";
import TeacherList from "./assets/pages/TeacherList/TeacherList";
import TeacherRaterPage from "./assets/pages/TeacherRaterPage/TeacherRaterPage";

const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" index element={<HomePage />}/>
                    <Route path="/schools" element={<SchoolList />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/profile" element={<UserProfile />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/teachers/:id" element={<TeacherRaterPage />}/>
                    <Route path="/teachers" element={<TeacherList />}/>
                </Routes>
        </Router>
    );
};

export default App;
