import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
// import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
//import ViewReportToDeliver from './deliver/ViewReportToDeliver'


const HomeDeliver = () => {
    const accesstoken=useSelector((state)=>state.token.token)
    const navigate= useNavigate()
    
    const items = [
        {
            label: 'מסלול יומי',
            icon: 'pi pi-car',
            command: () => {
                navigate('./deliver/RandomWay')
            }
        },
        {
            label: ' דוחות',
            icon: 'pi pi-credit-card',
            command: () => {
                navigate('./deliver/ViewReportToDeliver')
            }
        },
        {
            label: ' מכונות',
            icon: 'pi pi-shop',
            command: () => {
                navigate('./Machines/Machine')
            }
        },
        {
            label: 'התנתק',
            icon: 'pi pi-sign-out',
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
// useEffect(()=>{
// console.log(accesstoken);
// },[])
useEffect(() => {
    console.log("User data:", accesstoken);  // הצגת הטוקן
}, [accesstoken])

    return (
        <div >
            <Menubar model={items} />

        </div>
    )
}
export default  HomeDeliver ;
   
