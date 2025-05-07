import '../App.css';
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setRole, setUser } from '../redux/tokenSlice';
import { useState } from 'react';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state);
  const [serverError, setServerError] = useState(null); // מצב לשמירת הודעות שגיאה מהשרת

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    const username = data.username;
    const password = data.password;

    try {
      const res = await axios.post('http://localhost:7002/api/auth/login', { username, password });

      if (res.status === 200) {
        console.log(res.data);
        dispatch(setToken(res.data.accessToken));
        dispatch(setRole(res.data.user.role));
        dispatch(setUser(res.data.user));

        localStorage.setItem('token', res.data.accessToken);

        navigate('./delivers/ViewDelivers');
      } else {
        setServerError("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setServerError("An error occurred during login. Please try again later.");
    }
  };

  const onSumbit = (data) => {
    setServerError(null); // איפוס הודעת שגיאה לפני ניסיון חדש
    loginUser(data);
  };

  return (
    <div className='login'>
      <div className="app-container">
        <div className="form-container">
          <h2 className="form-title">Login</h2>
          {serverError && (
            <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
              {serverError}
            </div>
          )}
          <form onSubmit={handleSubmit(onSumbit)}>
            <div className={`input-group${errors.username ? ' error' : ''}`}>
              <label>Username</label>
              <input
                {...register("username", {
                  required: "Username is required.",
                  minLength: {
                    value: 1,
                    message: "Username must be at least 1 characters long.",
                  },
                })}
              />
              {errors.username && (
                <small style={{ color: "red" }}>{errors.username.message}</small>
              )}
            </div>
            <div className={`input-group ${errors.password ? 'error' : ''}`}>
              <label>Password *</label>
              <input
                type='password'
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 1,
                    message: "Password must be at least 1 characters long.",
                  },
                })}
              />
              {errors.password && (
                <small style={{ color: "red" }}>{errors.password.message}</small>
              )}
            </div>

            <button type="submit" className="submit-btn">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;