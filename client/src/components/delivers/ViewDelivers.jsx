import Deliver from "./Deliver";
import React from "react";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import CreatDeliver from "./CreateDeliver";
import { Button } from 'primereact/button'
//import { useNavigate } from "react-router";

//const navigate = useNavigate();

const ViewDelivers = () => {
    const { token } = useSelector((state) => state.token);
    const [deliversData, setDeliversData] = useState([]);

    const getDelivers = async () => {
        try {
            console.log(token);
            const res = await axios.get('http://localhost:7002/api/delivers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setDeliversData(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getDelivers();
    }, []);

    const [visible, setVisible] = useState(false);

    

    return ( <>  
        <div>
            <Button label="create" icon="pi pi-user" onClick={() => { setVisible(true)} }/>
            <CreatDeliver areaDeliver={null}  visible={visible} setVisible={setVisible} getDelivers={getDelivers}></CreatDeliver>
            
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            {deliversData && deliversData.map((deliver, index) =>{
                return (
                    <div style={{ margin: "10px" }} key={index}>
                        <Deliver index={index} deliver={deliver} setDeliversData={setDeliversData} getDelivers={getDelivers}  />
                    </div>
                );
            }  )}
        </div>
        </> );
};

export default ViewDelivers;