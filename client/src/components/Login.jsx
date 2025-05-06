
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
    const res = await axios.post('http://localhost:7002/api/auth/login', { username, password })
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
    // <div className="app-container">
    //   <div className="form-container">
    //     <h2 className="form-title">login</h2>
    //     <form onSubmit={handleSubmit(onSumbit)}>

    //       <div className={`input-group${errors.name ? 'error' : ''}`}>
    //         <label >UserName</label>
    //         <input
    //           {...register("username", { required: true, minLength: 3, type: "text" })}
    //         />
    //       </div>
    //       <div className={`input-group ${errors.password ? 'error' : ''}`}>
    //         <label >Password *</label>
    //         <input
    //           type='password'
    //           {...register("password", { required: true, minLength: 3 })}
    //         />
    //       </div>

    //       <button type="submit" className="submit-btn"  >Sign Up</button>

    //     
    //   </div>
    // </div>

  //   <div className="card">
  //     <div className="flex flex-column md:flex-row">
  //       <form onSubmit={handleSubmit(onSumbit)}>
  //         <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">

  //           <div className="flex flex-wrap justify-content-center align-items-center gap-2">

  //             <label className="w-6rem">Username</label>
  //             <InputText id="username" type="text" className="w-12rem" ref={username} />
  //             {/* <label >UserName</label>
  //                         <input
  //                         {...register("username", { required: true, minLength: 3, type: "text" })}
  //                         /> */}
  //           </div>
  //           <div className="flex flex-wrap justify-content-center align-items-center gap-2">
  //             <label className="w-6rem">Password *</label>
  //             <InputText id="password" type="password" className="w-12rem" ref={password} />
  //             {/* <label >Password *</label>
  //                       <input
  //                         type='password'
  //                         {...register("password", { required: true, minLength: 3 })}
  //                       /> */}

  //           </div>
  //           <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
  //         </div>
  //         <div className="w-full md:w-2">
  //           <Divider layout="vertical" className="hidden md:flex">
  //             <b>OR</b>
  //           </Divider>
  //           <Divider layout="horizontal" className="flex md:hidden" align="center">
  //             <b>OR</b>
  //           </Divider>
  //         </div>
  //         <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
  //           <Button type="submit" label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"> </Button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>

  //
  <div className='login'>
  <div className="app-container">
    <div className="form-container">
      <h2 className="form-title">Login </h2>
      <form onSubmit={handleSubmit(onSumbit)}>

        <div className={`input-group${errors.name ? 'error' : ''}`}>
          <label >UserName</label>
          <input
            {...register("username", { required: true, minLength: 1, type: "text" })}
          />
        </div>
        <div className={`input-group ${errors.password ? 'error' : ''}`}>
          <label >Password *</label>
          <input
            type='password'
            {...register("password", { required: true, minLength:  1})}
          />
        </div>

        <button type="submit" className="submit-btn">Sign in</button>
        {/* {token} */}
      </form>
    </div>
  </div>
</div>
   );


}

export default Login;