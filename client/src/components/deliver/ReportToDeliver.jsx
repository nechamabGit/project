import React, { useState ,useRef} from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
// import { Avatar } from '@/components/lib/avatar/Avatar';
// import { deleteDeliver } from "../../../../server/controllers/deliverControllers";
import axios from 'axios';
import { Card } from "primereact/card"
import { useSelector } from "react-redux";
//import CreatDeliver from "./CreateDeliver";
//import {createDeliver} from "./ViewDelivers"
import { Toast } from 'primereact/toast';

const ReportToDeliver = (props) => {
    

const { token } = useSelector((state) => state.token);
    const [visible, setVisible] = useState(false);
    const[areaDeliver, setAreaDeliver]= useState(null);
    console.log("to view");
    
    const { getReportsToDelivers } = props
    const { report } = props
    const {reportsTodeliversData, setreportsTodeliversData } = props
    const { index } = props

    const [visible1, setVisible1] = useState(false);
    const toastBC = useRef(null);

    const clear = () => {
        toastBC.current.clear();
        setVisible1(false);
        // deletAndCreate();
    };


    const footer = (
        <>
                <Toast   style={{  color:"blue",flex: '1' }} ref={toastBC} position="top-center" onRemove={clear} />

            {/* <Button label="delete" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={confirm}  */}
            {/* //  onClick={() => { deletAndCreate()}  /> */}
        </>
    );

    const header = (
        <img src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
return (<>
{ }
    {<Card style={{ width: "20%" }} title={report.idMachine.idDeliver.name} footer={footer} header={header} className="md:w-25rem">
        <p className="m-0"> </p>
          <h> you need to feel in {report.idMachine.machineName} {report.countFilling}</h>
            <h4> my message for you {report.message}</h4>

    </Card>
    } 
    
    {/* {areaDeliver?<CreatDeliver  visible={visible} setVisible={setVisible} areaDeliver={areaDeliver}  getDelivers={getDelivers}>  </CreatDeliver>:<></>}
    <br></br> */}
</>)


}

export default ReportToDeliver;
