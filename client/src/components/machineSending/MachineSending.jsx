import axios from 'axios';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import CreatReportToDeliver from '../reportsToDelivers/CreateReportToDeliver';
import { useSelector } from 'react-redux';

const MachineSending = (props) => {
    const [MachineSendings, setMachineSendings] = useState(null);
    const [fillReport, setFillReport] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [report, setReport] = useState();
    const [notWorking, setnotWorking] = useState();
    const toast = useRef(null);
    const dt = useRef(null);
    const { token } = useSelector((state) => state.token);

    const getMachineSendings = async () => {


        try {
            console.log(token);
            const res = await axios.get('http://localhost:7002/api/machineSending', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setMachineSendings(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const formatCurrency = (value) => {
        //    console.log(value);
        //return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const sendReport = (rowData) => {

        return (
            <>
                {rowData.last_Hour_Active < rowData.idMachine.require_Hour_Active ?
                    <Button disabled onClick={() => { setReport(rowData); setFillReport(true); }}>שלח דוח</Button> :
                     <Button onClick={() => { setReport(rowData); setFillReport(true); }}>שלח דוח</Button>}

            </>
        );
    };
    const makeMachineName = (rowData) => {
        //console.log({"rowData":  rowData});    
        return <h4> {rowData.idMachine.machineName} </h4>;
    };
    const getSeverity = (MachineSending) => {
        if (MachineSending.last_Hour_Active < MachineSending.idMachine.require_Hour_Active) {
            return 'warning';
        } else {
            return 'success';
        }
    };

    const getStatus = (MachineSending) => {
        if (MachineSending.last_Hour_Active < MachineSending.idMachine.require_Hour_Active) {
            return 'לא תקינה';
        } else {
            return "תקינה";
        }
    };

   

    const statusBodyTemplate = (rowData) => {
        // console.log(rowData);
        return <Tag value={getStatus(rowData)} severity={getSeverity(rowData)}></Tag>;

    };

    useEffect(() => {
        getMachineSendings();
    }, []);

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <DataTable
                    ref={dt}
                    value={MachineSendings}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} MachineSendings"
                    globalFilter={globalFilter}
                >
                    <Column field="machinName" header="שם מכונה" body={makeMachineName} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="amountBuying" header="מספר רכישות" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="amountLeft" header="כמות שנשארה" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="last_Hour_Active" header="שעת פעילות אחרונה" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="inventoryStatus" header="סטטוס" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column header="" body={sendReport} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>

                {fillReport && report ? <>
                    {console.log(report)
                    }  <CreatReportToDeliver
                        fillReport={fillReport}
                        rowData={report}
                        hideFillReport={() => setFillReport(false)}
                        setFillReport={setFillReport}
                    ></CreatReportToDeliver></> : <></>}
            </div>
        </div>
    );
};

export default MachineSending;