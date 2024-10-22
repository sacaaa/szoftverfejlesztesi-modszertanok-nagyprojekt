import { useAuth } from "./useAuth";

const Protect = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div>
            {isAuthenticated ? (
                <h1>Protected Content</h1>
            ) : (
                <h1>Unauthorized - Please login</h1>
            )}
        </div>
    );
};

export default Protect;
