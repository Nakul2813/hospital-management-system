import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser, logoutUser, clearAuthError } from "../redux/slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, status, bootstrapped, error } = useSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    isLoading: status === "loading",
    bootstrapped,
    error,
    login: (payload) => dispatch(loginUser(payload)),
    register: (payload) => dispatch(registerUser(payload)),
    logout: () => dispatch(logoutUser()),
    clearError: () => dispatch(clearAuthError()),
  };
}
