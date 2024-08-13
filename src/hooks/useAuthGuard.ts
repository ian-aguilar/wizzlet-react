// ** packages **
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** others **
import {
  getAuth,
  setAuthInitialized,
  setLogoutData,
} from "@/redux/slices/authSlice";
import { useGetLoggedInUserAPI } from "@/modules/Auth/services/auth.service";
import { setRemoveUser, setUser } from "@/redux/slices/userSlice";

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
    if (token) {
      const { data, error } = await getLoggedInUserAPI({});
      if (!error && data?.data) {
        dispatch(setUser({ user: data?.data }));
      } else {
        dispatch(setLogoutData());
        dispatch(setRemoveUser());
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
