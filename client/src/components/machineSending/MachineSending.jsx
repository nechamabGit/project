import axios from 'axios';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useSelector } from 'react-redux';
import CreatReportToDeliver from '../reportsToDelivers/CreateReportToDeliver';

const MachineSending = (props) => {
    const [MachineSendings, setMachineSendings] = useState(null);
    const [fillReport, setFillReport] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

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
        console.log({"rowData":  rowData});
        return (
            <>
                <Button onClick={() => { setFillReport(true); }}>שלח דוח</Button>
                <CreatReportToDeliver
                    fillReport={fillReport}
                    rowData={rowData}
                    hideFillReport={() => setFillReport(false)}
                    setFillReport={setFillReport}
                ></CreatReportToDeliver>
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
            return 'not working';
        } else {
            return "working";
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <div className="p-input-icon-left">
                <input
                    type="text"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                    className="p-inputtext p-component"
                />
            </div>
        </div>
    );

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
                    header={header}
                >
                    <Column field="machinName" header="machinName" body={makeMachineName}sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="amountBuying" header="amountBuying" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="amountLeft" header="amountLeft" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="last_Hour_Active" header="last_Hour_Active" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column header="sending report" body={sendReport} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default MachineSending;