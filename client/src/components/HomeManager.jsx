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
            label: 'delivers',
            icon: 'pi pi-star',
            command :()=>{
                navigate('./delivers/ViewDelivers')
            }
           
        },
        {
            label: 'machineSendings',
            icon: 'pi pi-star',
            command :()=>{
                navigate('./machineSending/MachineSending')
            }
           
        },{
            label: 'logOut',
            icon: 'pi pi-star',
            command: () => {
                navigate('../logOut')
            }
        },
        // {
        //     label: 'Projects',
        //     icon: 'pi pi-search',
        //     items: [
        //         {
        //             label: 'Components',
        //             icon: 'pi pi-bolt'
        //         },
        //         {
        //             label: 'Blocks',
        //             icon: 'pi pi-server'
        //         },
        //         {
        //             label: 'UI Kit',
        //             icon: 'pi pi-pencil'
        //         },
        //         {
        //             label: 'Templates',
        //             icon: 'pi pi-palette',
        //             items: [
        //                 {
        //                     label: 'Apollo',
        //                     icon: 'pi pi-palette'
        //                 },
        //                 {
        //                     label: 'Ultima',
        //                     icon: 'pi pi-palette'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            label: 'Machines',
            icon: 'pi pi-envelope',
            command :()=>{
                navigate('./Machines/Machine')
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
