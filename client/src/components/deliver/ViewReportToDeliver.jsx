
import React from "react";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button'
//import { useNavigate } from "react-router";
import ReportToDeliver from "./ReportToDeliver";

const ViewReportToDelivedr = () => {
    const { token } = useSelector((state) => state.token);
    const [reportsTodeliversData, setreportsTodeliversData] = useState([]);

    const getReportsToDelivers = async () => {
         //const username=token.user
        try {
            console.log(token);
            const res = await axios.get("http://localhost:7002/api/reportToDeliver/byid", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setreportsTodeliversData(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };
    const formatCurrency = (value) => {
        console.log(value);
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    useEffect(() => {
        getReportsToDelivers();
    }, []);

    const [visible, setVisible] = useState(false);

    

    return ( <>  
        {/* <div>
            <Button label="create" icon="pi pi-user" onClick={() => { setVisible(true)} }/>
            <CreatDeliver areaDeliver={null}  visible={visible} setVisible={setVisible} getDelivers={getDelivers}></CreatDeliver>
            
        </div>
         */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            {reportsTodeliversData && reportsTodeliversData.map((report, index) =>{
                return (
                    <div style={{ margin: "10px" }} key={index}>
                        <ReportToDeliver index={index} report={report} setreportsTodeliversData={setreportsTodeliversData} getReportsToDelivers={getReportsToDelivers}  />
                    </div>
                );
            }  )}
        </div>
        </> );
};

export default ViewReportToDelivedr;







