import React, { useState ,useRef} from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
// import { Avatar } from '@/components/lib/avatar/Avatar';
// import { deleteDeliver } from "../../../../server/controllers/deliverControllers";
import axios from 'axios';
import { Card } from "primereact/card"
import { useSelector } from "react-redux";
import CreatDeliver from "./CreateDeliver";
import {createDeliver} from "./ViewDelivers"
import { Toast } from 'primereact/toast';

const Deliver = (props) => {
    const { token } = useSelector((state) => state.token);
    const [visible, setVisible] = useState(false);
    const[areaDeliver, setAreaDeliver]= useState(null);
    
    const { getDelivers } = props
    const { deliver } = props
    const {deliversData, setDeliversData } = props
    const { index } = props

    const [visible1, setVisible1] = useState(false);
    const toastBC = useRef(null);

    const clear = () => {
        toastBC.current.clear();
        setVisible1(false);
        deletAndCreate();
    };

    const confirm = () => {
        if (!visible) {
            setVisible1(true);
            toastBC.current.clear();
            toastBC.current.show({
                
                severity: 'success',
                summary: 'To delete you need to enter a new deliver to this area',
                sticky: true,
                content: (props) => (
                    <div   className="flex flex-column align-items-center"  style={{  backgroundColor:"whiteblue",flex: '1' }}>
                        <div className="flex align-items-center gap-2">
                            {/* <span className="font-bold text-900">Amy Elsner</span> */}
                        </div>
                        <div className="font-medium text-lg my-3 text-900">{props.message.summary}</div>
                        <Button  className="p-button-sm flex align-items-center" label="OK" severity="success" onClick={clear}></Button>
                    </div>
                )
            });
        }
    };

const deletAndCreate= async ()=>{
    console.log(deliver);
    setVisible(true)
    setAreaDeliver(deliver);
    
    // return<>
    //     <div>
    //         <Button label="create" icon="pi pi-user" onClick={() => { setVisible(true)} }/>
    //         <CreatDeliver  setVisible={setVisible} areaDeliver={areaDeliver}></CreatDeliver>
    //         {/* createDeliver={createDeliver} visible={visible} */}
    //     </div>
    
    
    
    
    // </>
}    

    
const deleteDeliver = async (props) => {

    //<Button label="delete" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={() => {return deleteDeliver()}} />
    const id = deliver._id; // Ensure 'deliver' is defined
    try {
        const res = await axios.delete(`http://localhost:7002/api/delivers/${id}`);
        if (res.status === 200) {
            console.log("200 OK");
            // Correctly call setDeliversData without assignment to res.data
           getDelivers();
        }
    } catch (err) {
        console.error("Failed to delete deliver:", err);
    }
};


const footer = (
    <>
            <Toast   style={{  color:"blue",flex: '1' }} ref={toastBC} position="top-center" onRemove={clear} />

        <Button label="delete" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={confirm} 
        //  onClick={() => { deletAndCreate()}}
          />
    </>
);

const header = (
    <img src="https://primefaces.org/cdn/primereact/images/usercard.png" />
);
return (<>

    {<Card style={{ width: "20%" }} title={deliver.username} footer={footer} header={header} className="md:w-25rem">
        <p className="m-0">
            {deliver.name}
            {deliver.email}
            {deliver.area}
        </p>
    </Card>
    } 
    
    {areaDeliver?<CreatDeliver  visible={visible} setVisible={setVisible} areaDeliver={areaDeliver}  getDelivers={getDelivers}>  </CreatDeliver>:<></>}
    <br></br>
</>)


}

export default Deliver;
