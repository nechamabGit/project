import Machine from "./Machine";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

const ViewMachines = () => {
    const { token } = useSelector((state) => state.token);
    const [machinesData, setMachinesData] = useState();

    const getMachines = async () => {
        try {
            console.log(token);
            const res = await axios.get('http://localhost:7002/api/machines', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setMachinesData(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getMachines();
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            {machinesData && machinesData.map((machine, index) =>{
                return (
                    <div style={{ margin: "10px" }} key={index}>
                        <Machine index={index} machine={machine} getMachines={getMachines} />
                    </div>
                );
            }  )}
        </div>
    );
};

export default ViewMachines;