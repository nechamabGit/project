import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
// import '../App.css';
import { useDispatch, useSelector } from 'react-redux';



const HomeDeliver = () => {
    const accesstoken=useSelector((state)=>state.token.token)
    const navigate= useNavigate()
    
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate('/')
            }
        },
        {
            label: ' machines',
            icon: 'pi pi-star',
            command: () => {
                navigate('/machines/Mmachines')
            }
        },
        {
            label: 'logOut',
            icon: 'pi pi-star',
            command: () => {
                navigate('/logOut')
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
        // {
        //     label: 'Contact',
        //     icon: 'pi pi-envelope'
        // }/
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
export default  HomeDeliver ;
   
