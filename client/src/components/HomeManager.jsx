import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
// import '../App.css';
import { useDispatch, useSelector } from 'react-redux';

import ViewDelivers from './delivers/ViewDelivers';

const HomeManager = () => {
    const accesstoken=useSelector((state)=>state.token.token)
    const navigate= useNavigate()
    
    const items = [
       
        {
            label: 'משלוחנים',
            icon: 'pi pi-user',
            command :()=>{
                navigate('./delivers/ViewDelivers')
            }
           
        },
        {
            label: ' דוחות ממכונה',
            icon: 'pi pi-send',
            command :()=>{
                navigate('./machineSending/MachineSending')
            }
           
        },
        {
            label: 'מכונות',
            icon: 'pi pi-shop',
            command :()=>{
                navigate('./Machines/Machine')
            }
            
        },{
            label: 'התנתק',
            icon: 'pi pi-sign-out',
            command: () => {
                navigate('../logOut')
            }
        }
    
        
    ];
useEffect(()=>{
console.log(accesstoken);
},[])
    return (
        <div >
            <Menubar model={items} />

        </div>
    )
}
export default HomeManager;
