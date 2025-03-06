import { useForm } from "react-hook-form";
import useAuthStore from "../context/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const credentials = {
      username: data.username, 
      password: data.password,
    };

    console.log("Sending credentials:", credentials); // ✅ Debugging line

    const result = await login(credentials);
    
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" defaultValue="kminchelle" autoComplete="username" required />
        <input {...register("password")} type="password" placeholder="Password" defaultValue="0lelplR" autoComplete="current-password" required />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
