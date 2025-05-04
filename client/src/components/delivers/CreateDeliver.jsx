import { useEffect, useState, useRef } from "react"
// import Delivers from "./Delivers"
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import ViewDelivers from "./ViewDelivers";
import axios from 'axios'
const CreatDeliver = (props) => {
    const { visible } = props
    const { setVisible } = props
    const { areaDeliver } = props
    const { getDelivers } = props

    const password = useRef(" ")
    const username = useRef(" ")
    const name = useRef(" ")
    const email = useRef(" ")
    const area = useRef(" ")


    const createDeliver = async (username, password, name, email, area) => {

        const newDeliver = {
            username: username,
            password: password,
            name: name,
            email: email,
            area: area
        }
        
        const res = await axios.post('http://localhost:7002/api/auth/registerDeliver', newDeliver)
        if (res.status == "201") {
            console.log("uuuuuuuuuuuu");
        }
        if (areaDeliver) {
            console.log(areaDeliver);
            const res1 = await axios.put(`http://localhost:7002/api/machines/updateMachineDeliver/${areaDeliver._id}`, { newId: res.data._id })
            if (res.status == "200") {
                const res1 = await axios.delete(`http://localhost:7002/api/delivers/${areaDeliver._id}`)
                if(res1.status=="200"){
                    alert("deleted")
                }
            }
        }

        getDelivers();


        //setDeliverData(res.data)

    }


    return (<>
        <Dialog
            visible={visible}
            modal
            onHide={() => { if (!visible) return; setVisible(false); }}
            content={({ hide }) => (
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            username
                        </label>
                        <InputText id="username" label="username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={username}></InputText>
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="password" className="text-primary-50 font-semibold">
                            password
                        </label>
                        <InputText id="password" label="password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" ref={password}></InputText>
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="name" className="text-primary-50 font-semibold">
                            name
                        </label>
                        <InputText id="name" label="name" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" ref={name}></InputText>
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="email" className="text-primary-50 font-semibold">
                            email
                        </label>
                        <InputText id="email" label="email" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" ref={email}></InputText>
                    </div>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="area" className="text-primary-50 font-semibold">
                            area
                        </label>
                        <InputText id="area" label="area" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" value={areaDeliver?.area} ref={area}></InputText>
                    </div>

                    <div className="flex align-items-center gap-2">
                        <Button label="cancel" onClick={(e) => { hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>

                        <Button label="Add" onClick={(e) => { createDeliver(username.current.value, password.current.value, name.current.value, email.current.value, area.current.value); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
            )}
        ></Dialog>
    </>)

}
export default CreatDeliver;