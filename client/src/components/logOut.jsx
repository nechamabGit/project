import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
// import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/tokenSlice';


const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

useEffect(()=>{
    dispatch(logOut())
    navigate('../login');

},[])
    return (
        <div >

        </div>
    )
}
export default  LogOut ;
   
