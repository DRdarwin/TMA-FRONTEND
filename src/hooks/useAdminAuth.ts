// src/hooks/useAdminAuth.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { verifyAdminToken } from "../api/adminAuth";

const useAdminAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                setIsAuthenticated(false);
                navigate("/admin/login");
                return;
            }

            //try {
           //     const isValid = await verifyAdminToken(token);
           //     if (!isValid) {
           //         localStorage.removeItem("adminToken");
           //         navigate("/admin/login");
                }
           //     setIsAuthenticated(isValid);
          //  } catch (error) {
           //     console.error("Помилка перевірки токена адміністратора:", error);
           //     setIsAuthenticated(false);
        //   //     navigate("/admin/login");
        //    }
     //   };

        checkAuth();
    }, [navigate]);

    return isAuthenticated;
};

export default useAdminAuth;
