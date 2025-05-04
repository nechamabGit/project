// import { useEffect, useState, useRef } from "react"
// import ReportToDelivers from "./ReportToDelivers"
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import ViewReportToDelivers from "./ViewReportToDelivers";
import axios from 'axios'
import MachineSending from "../machineSending/MachineSending";
import React, { useState, useEffect, useRef } from 'react'

const CreatReportToDeliver = (props) => {
    const { rowData} =props
    const { fillReport } =   props
    const {  hideDialog} =   props
    const {setFillReport}=props
    const {hideFillReport}=props
    // const { areaReportToDeliver } = props
    
  
    const massage=useRef(" ");
    // const username = useRef(" ")

    const createReportToDeliver = async (idMachine, countFilling,complete,message) =>{

        const newReportToDeliver = {
            idMachine: idMachine,
            countFilling : countFilling,
            complete: complete,
            message: message
        }
        
        const res = await axios.post('http://127.0.0.1:7002/api/reportToDeliver', newReportToDeliver)
        if (res.status == "201") {
            console.log("uuuuuuuuuuuu");
        }
        hideFillReport();
    }
    // createReportToDeliver(rowData.idMachine,50,false,message.current.value)}    />
    const sendToDeliver =(
        <React.Fragment>
            {/* <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} /> */}
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={()=>createReportToDeliver(rowData.idMachine,50,false,massage.current.value)}     />
        </React.Fragment>
    );

    return (<>
            <Dialog visible={fillReport} style={{ width: '80em' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Report" modal footer={sendToDeliver} onHide={hideFillReport}>
                <div className="confirmation-content"> 
                                
                    <div>
                        <p>Hello  {rowData.idMachine.idDeliver.name} </p>
                        <p> you need to fill in your machine    {(rowData.idMachine.maxItems - rowData.amountLeft).toString()} </p>
                        <InputText type="text" label="massage"style={{ width: '1000px',  height: '100px'        }}    ref={massage}   />
                    </div>                             
                
                </div>
            </Dialog>
    </>)

}
export default CreatReportToDeliver;