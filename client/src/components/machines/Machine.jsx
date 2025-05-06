// import { Avatar } from '@/components/lib/avatar/Avatar';
// import { deleteMachine } from "../../../../server/controllers/machineControllers";
import axios from 'axios';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { ViewDeliver } from '../delivers/ViewDelivers'

const Machine = (props) => {
    let emptyProduct = {
        id: '',
        machineName: '',
        //idDeliver: '',
        area: '',
        neighborhood: '',
        address: '',
        maxItems: '',
        minItems: '',
        require_Hour_Active: '',

        // inventoryStatus: 'INSTOCK'
    };
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [machines, setMachines] = useState(null);
    const [machineDialog, setMachineDialog] = useState(false);
    const [updateDialog, setUpdateDialog] = useState(false);

    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [machine, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [fillReport, setFillReport] = useState(false);
    const [value1, setValue1] = useState(22);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(20);
    const [data, setData] = useState("");
    const toast = useRef(null);
    const dt = useRef(null);
    const { token } = useSelector((state) => state.token);
    const { role } = useSelector((state) => state.token);
    const { user } = useSelector((state) => state.token);

    const [selectedArea, setselectedArea] = useState();
    const [DeliversDataToArea, setDeliversDataToArea] = useState([]);
    const [findDeliverByArea, setFindDeliverByArea] = useState([]);

    const machineName = useRef(" ")
    const area = useRef(" ")
    const neighborhood = useRef(" ")
    const address = useRef(" ")
    const maxItems = useRef(" ")
    const minItems = useRef(" ")
    const require_Hour_Active = useRef(" ")


    const updateMachine = async (machineName, idDeliver, area, neighborhood, address, maxItems, minItems, require_Hour_Active) => {
        const updateDetailMachine = {
            _id: machine._id,
            machineName: machineName,
            idDeliver: idDeliver,
            area: area,
            neighborhood: neighborhood,
            address: address,
            minItems: minItems,
            maxItems: maxItems,
            require_Hour_Active: require_Hour_Active
        }
        try {
            const res = await axios.put('http://localhost:7002/api/machines', updateDetailMachine);
            console.log('Machine update successfully:', res.data);
        } catch (error) {

        }
    }



    const createDeliver = async (machineName, idDeliver, area, neighborhood, address, maxItems, minItems, require_Hour_Active) => {

        const newMachine = {
            machineName: machineName,
            idDeliver: idDeliver,
            area: area,
            neighborhood: neighborhood,
            address: address,
            maxItems: maxItems,
            minItems: minItems,
            require_Hour_Active: require_Hour_Active
        }
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const res = await axios.post('http://localhost:7002/api/machines', newMachine);
            console.log('Machine created successfully:', res.data);
        } catch (error) {

        }
    }
    const getDeliversToArea = async () => {
        try {
            console.log(token);
            const delivers = await axios.get('http://localhost:7002/api/delivers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (delivers.status === 200) {
                setDeliversDataToArea(delivers.data);

            }
        } catch (e) {
            console.error(e);
        }

    };

    useEffect(() => {
        getDeliversToArea();
    }, []);



    const DeliversName = DeliversDataToArea.map(element => (element.area));

    const getMachines = async () => {
        try {
            console.log(token);
            const res=null;
            if (role == "manager") {
             res = await axios.get('http://localhost:7002/api/machines', {
                headers: { Authorization: `Bearer ${token}` }
            }); }
            else{
                console.log("jjjjjjjjjjjj",user);
                const res = await axios.get(`http://localhost:7002/api/machines/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });  
            }
            if (res.status === 200) {
                setMachines(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };
    const formatCurrency = (value) => {
        console.log(value);
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setMachineDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setMachineDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };
    const hideFillReport = () => {
        setFillReport(false);
    };


    const saveProduct = () => {
        setSubmitted(true);
        if (machine.machineName.trim()) {
            let _machines = [...machines];
            let _machine = { ...machine };

            if (machine.id) {
                const index = findIndexById(machine.id);

                _machines[index] = _machine;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _machine.id = createId();
                // _machine.image = 'machine-placeholder.svg';
                _machines.push(_machine);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setMachines(_machines);
            setMachineDialog(false);
            createDeliver
                (machineName.current.value,
                    findDeliverByArea[0]._id,
                    selectedArea,
                    neighborhood.current.value,
                    address.current.value,
                    value3,
                    value2,
                    value1)
        }
    };
    const saveUpdate = () => {
        setSubmitted(true);
        if (machine.machineName.trim()) {
            let _machines = [...machines];
            let _machine = { ...machine };

            if (machine.id) {
                const index = findIndexById(machine.id);
                _machines[index] = _machine;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Machine Updated', life: 3000 });
            }

            setMachines(_machines);
            setUpdateDialog(false);
            setProduct(emptyProduct);
            updateMachine(
                machineName.current.value,
                findDeliverByArea[0]?._id,
                selectedArea,
                neighborhood.current.value,
                address.current.value,
                value3,
                value2,
                value1
            );
        }
    };




    const deleteProduct = () => {
        let _machines = machines.filter((val) => val.id !== machine.id);

        setMachines(_machines);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < machines.length; i++) {
            if (machines[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };



    const deleteSelectedProducts = async () => {
        let _machines = machines.filter((val) => !selectedProducts.includes(val));
        let selectMachine = machines.filter((val) => selectedProducts.includes(val));
        setMachines(_machines);

        setSelectedProducts(null);
        const res = await axios.delete(`http://localhost:7002/api/machines/${selectMachine[0]._id}`);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _machine = { ...machine };

        _machine['category'] = e.value;
        setProduct(_machine);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _machine = { ...machine };

        _machine[`${name}`] = val;

        setProduct(_machine);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _machine = { ...machine };

        _machine[`${name}`] = val;

        setProduct(_machine);
    };

    const leftToolbarTemplate = () => {
        if (role == "manager")
            return (
                <div className="flex flex-wrap gap-2">
                    <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                </div>
            );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/machine/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        console.log(rowData);
        return formatCurrency(rowData.price);
    };

    const statusBodyTemplate = (rowData) => {

        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (


            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
            </React.Fragment>
        );
    };
    const sendReport = (rowData) => {
        return (
            <>
                <Button onClick={() => { setFillReport(true) }}>שלח דוח</Button>
                <Dialog visible={fillReport} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" onHide={hideFillReport}>
                    <div className="confirmation-content"></div>
                </Dialog></>
        );
    };
    const getSeverity = (machine) => {
        switch (machine.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h2 className="m-0">Machines</h2>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const machineDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />

        </React.Fragment>
    );

    const machineDialogFooterUpdate = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={() => {
                setSubmitted(false);
                setUpdateDialog(false)
            }} />

            <Button label="Update" icon="pi pi-refresh" onClick={saveUpdate} />

        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    // const deleteProductsDialogFooter = (
    //     <React.Fragment>
    //         <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
    //         <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
    //     </React.Fragment>
    // );
    const editProduct = (machine) => {
        setProduct({ ...machine });
        setUpdateDialog(true);
    };
    useEffect(() => {
        getMachines();
    }, []);
    return (
        <div>

            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={machines} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} machines" globalFilter={globalFilter} header={header}>
                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    <Column field="machineName" header="machineName" sortable style={{ minWidth: '12rem' }}></Column>
                    {/* <Column field="idDeliver" header="idDeliver" sortable style={{ minWidth: '16rem' }} body={(rowData) => rowData.idDeliver} /> */}
                    <Column field="area" header="area" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="neighborhood" heade="neighborhood" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="address" header="address" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="minItems" header="minItems" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="maxItems" header="maxItems" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="require_Hour_Active" header="require_Hour_Active" sortable style={{ minWidth: '16rem' }}></Column>
                    {role == "manager" &&
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>}

                </DataTable>
            </div>




            <Dialog visible={machineDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Add Machine" modal className="p-fluid" footer={machineDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="machineName" className="font-bold">Machine Name</label>
                    <InputText id="machineName" value={machine.machineName} onChange={(e) => onInputChange(e, 'machineName')} required autoFocus className={classNames({ 'p-invalid': submitted && !machine.machineName })} ref={machineName} />
                    {submitted && !machine.machineName && <small className="p-error">Machine name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="address" className="font-bold">Address</label>
                    <InputText id="address" value={machine.address} onChange={(e) => onInputChange(e, 'address')} required className={classNames({ 'p-invalid': submitted && !machine.address })} ref={address} />
                    {submitted && !machine.address && <small className="p-error">Address is required.</small>}
                </div>
                <label htmlFor="area" className="font-bold">area</label>

                <div className="card flex justify-content-left">
                    <Dropdown
                        value={selectedArea}
                        onChange={(e) => {
                            setselectedArea(e.value);
                            const filteredDeliveries = DeliversDataToArea.filter(element => element.area === e.value);
                            setFindDeliverByArea(filteredDeliveries);
                        }} options={DeliversName} placeholder="Select an area" className="w-full md:w-14rem" ref={area} /> </div>
                <div className="field">
                    <label htmlFor="idDeliver-buttons" className="font-bold">Delivery name:</label>
                    <InputText id="deliver" value={findDeliverByArea.length > 0 ? findDeliverByArea[0].name : ''} readOnly /></div>

                <div className="field">
                    <label htmlFor="neighborhood-buttons" className="font-bold">Neighborhood</label>
                    <InputText id="neighborhood" value={machine.neighborhood} onChange={(e) => onInputChange(e, 'neighborhood')} required className={classNames({ 'p-invalid': submitted && !machine.neighborhood })} ref={neighborhood} />
                    {submitted && !machine.neighborhood && <small className="p-error">Neighborhood is required.</small>}
                </div>

                <div className="formgrid grid">
                    <div className="flex-auto">
                        <label htmlFor="minItems-buttons" className="font-bold block mb-2">Minimum itens</label>
                        <InputNumber inputId="minmax-buttons" value={value3} onValueChange={(e) => setValue3(e.value)} mode="decimal" showButtons min={20} max={49} ref={minItems} />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="maxItems-buttons" className="font-bold block mb-2">Maximum itens</label>
                        <InputNumber inputId="minmax-buttons" value={value2} onValueChange={(e) => setValue2(e.value)} mode="decimal" showButtons min={21} max={50} ref={maxItems} />
                    </div>
                </div>
                <div className="flex-auto">
                    <label htmlFor="require_Hour_Active-buttons" className="font-bold block mb-2">Require hour Active</label>
                    <InputNumber inputId="minmax-buttons" value={value1} onValueChange={(e) => setValue1(e.value)} mode="decimal" showButtons min={0} max={24} ref={require_Hour_Active} />

                </div>
            </Dialog>












            <Dialog visible={updateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Update Machine" modal className="p-fluid" footer={machineDialogFooterUpdate} onHide={() => {
                setSubmitted(false);
                setUpdateDialog(false)
            }}>
                <div className="field">
                    <label htmlFor="machineName" className="font-bold">Machine Name</label>
                    <InputText id="machineName" value={machine.machineName} onChange={(e) => onInputChange(e, 'machineName')} required autoFocus className={classNames({ 'p-invalid': submitted && !machine.machineName })} ref={machineName} />
                    {submitted && !machine.machineName && <small className="p-error">Machine name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="address" className="font-bold">Address</label>
                    <InputText id="address" value={machine.address} onChange={(e) => onInputChange(e, 'address')} required className={classNames({ 'p-invalid': submitted && !machine.address })} ref={address} />
                    {submitted && !machine.address && <small className="p-error">Address is required.</small>}
                </div>
                <label htmlFor="area" className="font-bold">area</label>

                <div className="card flex justify-content-left">
                    <Dropdown
                        value={selectedArea}
                        onChange={(e) => {
                            setselectedArea(e.value);
                            const filteredDeliveries = DeliversDataToArea.filter(element => element.area === e.value);
                            setFindDeliverByArea(filteredDeliveries);
                        }} options={DeliversName} placeholder="Select an area" className="w-full md:w-14rem" ref={area} /> </div>
                <div className="field">
                    <label htmlFor="idDeliver-buttons" className="font-bold">Delivery name:</label>
                    <InputText id="deliver" value={findDeliverByArea.length > 0 ? findDeliverByArea[0].name : ''} readOnly /></div>

                <div className="field">
                    <label htmlFor="neighborhood-buttons" className="font-bold">Neighborhood</label>
                    <InputText id="neighborhood" value={machine.neighborhood} onChange={(e) => onInputChange(e, 'neighborhood')} required className={classNames({ 'p-invalid': submitted && !machine.neighborhood })} ref={neighborhood} />
                    {submitted && !machine.neighborhood && <small className="p-error">Neighborhood is required.</small>}
                </div>

                <div className="formgrid grid">
                    <div className="flex-auto">
                        <label htmlFor="minItems-buttons" className="font-bold block mb-2">Minimum itens</label>
                        <InputNumber inputId="minmax-buttons" value={value3} onValueChange={(e) => setValue3(e.value)} mode="decimal" showButtons min={20} max={49} ref={minItems} />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="maxItems-buttons" className="font-bold block mb-2">Maximum itens</label>
                        <InputNumber inputId="minmax-buttons" value={value2} onValueChange={(e) => setValue2(e.value)} mode="decimal" showButtons min={21} max={50} ref={maxItems} />
                    </div>
                </div>
                <div className="flex-auto">
                    <label htmlFor="require_Hour_Active-buttons" className="font-bold block mb-2">Require hour Active</label>
                    <InputNumber inputId="minmax-buttons" value={value1} onValueChange={(e) => setValue1(e.value)} mode="decimal" showButtons min={0} max={24} ref={require_Hour_Active} />

                </div>
            </Dialog>
        </div>
    );
};

export default Machine;