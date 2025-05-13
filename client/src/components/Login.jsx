
import '../App.css';
//import { Divider } from 'primereact/divider';
//import { InputText } from 'primereact/inputtext';
//import { Button } from 'primereact/button';
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken,setRole,setUser } from '../redux/tokenSlice'
import { useEffect, useState, useRef } from "react"
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


const Login = () => {
  // const [token, settoken] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state)

  const loginUser = async (data) => {

    const username = data.username
    const password = data.password
    const res = await axios.post('http://localhost:7002/api/auth/login', { username, password },{ headers: { Authorization: `Bearer ${token}` }})
    if (res.status !== 200)  //didnt succeed to login
    {
      console.log('you cant login')
    }
    console.log(res.data);
    dispatch(setToken(res.data.accessToken))
    console.log(res.data.user.role);
    dispatch(setRole(res.data.user.role))
    dispatch(setUser(res.data.user))

    localStorage.setItem('token', res.data.accessToken)

    navigate('./delivers/ViewDelivers');
  }
  const password = useRef(" ")
  const username = useRef(" ")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSumbit = (data) => {
    loginUser(data);
  }

  return (
  <div className='login'>
  <div className="app-container">
    <div className="form-container">
      <h2 className="form-title">כניסה </h2>
      <form onSubmit={handleSubmit(onSumbit)}>

        <div className={`input-group${errors.name ? 'error' : ''}`}>
          <label >שם משתמש</label>
          <input
            {...register("username", { required: true, minLength: 1, type: "text" })}
          />
        </div>
        <div className={`input-group ${errors.password ? 'error' : ''}`}>
          <label >סיסמא *</label>
          <input
            type='password'
            {...register("password", { required: true, minLength:  1})}
          />
        </div>

        <button type="submit" className="submit-btn"> התחברות</button>
      </form>
    </div>
  </div>
</div>
   );


}

export default Login;