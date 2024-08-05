// ** packages **
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** others **
import {
  getAuth,
  setAuthInitialized,
  setCredentials,
  setLogoutData,
} from "@/redux/slices/authSlice";
import { useGetLoggedInUserAPI } from "@/modules/Auth/services/auth.service";

const useAuthGuard = () => {
  // ===================== Hooks =======================
  const dispatch = useDispatch();
  const { isAuthenticated, token, isAuthInitialized } = useSelector(getAuth);

  // ================= Custom hooks ====================
  const { getLoggedInUserAPI, isLoading } = useGetLoggedInUserAPI();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUser = async () => {
    if (!token && !isAuthenticated && !isAuthInitialized) {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        const { data, error } = await getLoggedInUserAPI({});

        if (!error && data) {
          dispatch(setCredentials({ token: accessToken }));
          dispatch(setAuthInitialized());
        } else {
          dispatch(setLogoutData());
          dispatch(setAuthInitialized());
        }
      } else {
        dispatch(setAuthInitialized());
      }
    }
  };

  return {
    isLoading,
    isAuthenticated,
    isAuthInitialized,
  };
};

export default useAuthGuard;
