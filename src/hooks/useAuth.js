import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
    const { user } = useSelector((state) => state.auth);
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            setAuth(true);
            if (user.role && user.role === "ADMIN") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } else {
            setAuth(false);
            setIsAdmin(false);
        }

        setLoading(false);
    }, [user]);

    return { auth, loading, isAdmin };
};