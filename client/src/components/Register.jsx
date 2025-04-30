//import React, { useState } from 'react';
import '../App.css';
import { useForm } from "react-hook-form"
//import { useForm } from "react-hook-form"
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 

function Register() {
  const [token,setToken]=useState('')
 const accesstoken=useSelector((state)=>state.token.token)

                const createDeliver=async(data)=>{
                  setToken(localStorage.getItem('token'))
                  
                  try{
                      const res=await axios.post('http://localhost:7002/api/auth/registerDeliver',data,{
                      headers:{'Authorization':`Bearer ${accesstoken}`}})///
                      alert("sucses!!!!!!!!")
                  }
                  catch(error){
                    alert("This deliver already exists.")
                  }
}


    const {
        register,
        handleSubmit,
        watch,
        formState:{errors},
    }=useForm()

    const onSumbit=(data)=>{
        console.log(data);
        const username=data.username
        const password=data.password
        const name=data.name
        const email=data.email
        const area=data.area
        createDeliver(data);
    alert(data.username.trim())
  }
    

  return (
    <div>
      <div >
        <h2 className="form-title">register delivers</h2>
        <form onSubmit={handleSubmit(onSumbit)}>
          
        <div className={`input-group${errors.username ? 'error' : ''}`}>
            <label >username</label>
            <input
              {...register("username",{required:true,minLength:3,type:"text"})}
            />
          </div>

          <div className= {`input-group ${errors.password ? 'error' : ''}`}
>
            <label >Password *</label>
            <input
                type='password'
              {...register("password",{required:true,minLength:3})}
            />
          </div>
          
          <div className= {`input-group ${errors.name ? 'error' : ''}`}
>           <label >name *</label>
            <input
              {...register("name",{required:true,minLength:3})}
            />
          </div>

          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <label >Email Address</label>
            <input
              {...register("email",{required:true,minLength:3,type:"text"})}
            />
          </div>
         
          <div className={`input-group ${errors.area ? 'error' : ''}`}>
            <label >area</label>
            <input
              {...register("area",{required:true,minLength:3,type:"text"})}
            />
          </div>

          

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
