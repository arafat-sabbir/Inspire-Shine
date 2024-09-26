import LoginForm from "@/components/form/LoginForm";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";
import { Navigate } from "react-router-dom";

const Login = () => {
  const user = useAppSelector(selectCurrentUser);
  return user ? <Navigate to={"/"}/> : <LoginForm />;
};

export default Login;
