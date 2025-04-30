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
import{ViewDeliver} from '../delivers/ViewDelivers'
const Machine = (props) => {
    let emptyProduct = {
        id: null,
        machinName: '',
        image: null,
        //idDeliver: '',
        area: null,
        neightborhood: 0,
        address: 0,
        maxItems: 0,
        minItems: 0,
        require_Hour_Active: 0,

        // inventoryStatus: 'INSTOCK'
    };
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [machines, setMachines] = useState(null);
    const [machineDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
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
    const [selectedCity, setSelectedCity] = useState(null);
    const DeliversName = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const getMachines = async () => {
        try {
            console.log(token);
            const res = await axios.get('http://localhost:7002/api/machines', {
                headers: { Authorization: `Bearer ${token}` }
            });
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
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };
    const hideFillReport = () => {
        setFillReport(false);
    };
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (machine.name.trim()) {
            let _machines = [...machines];
            let _machine = { ...machine };

            if (machine.id) {
                const index = findIndexById(machine.id);

                _machines[index] = _machine;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _machine.id = createId();
                _machine.image = 'machine-placeholder.svg';
                _machines.push(_machine);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setMachines(_machines);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (machine) => {
        setProduct({ ...machine });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (machine) => {
        setProduct(machine);
        setDeleteProductDialog(true);
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

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = async () => {
        let _machines = machines.filter((val) => !selectedProducts.includes(val));
        let selectMachine = machines.filter((val) => selectedProducts.includes(val));
        setMachines(_machines);

        setDeleteProductsDialog(false);
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
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
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

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // };

    const statusBodyTemplate = (rowData) => {

        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };
    const sendReport = (rowData) => {
        return (
            <>
                <Button onClick={() => { setFillReport(true) }}>שלח דוח</Button>
                <Dialog visible={fillReport} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideFillReport}>
                    <div className="confirmation-content">

                    </div>
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
            <h4 className="m-0">Manage Products</h4>
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
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );
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
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="machinName" header="machinName" sortable style={{ minWidth: '12rem' }}></Column>
                    {/* <Column field="idDeliver" header="idDeliver" sortable style={{ minWidth: '16rem' }} body={(rowData) => rowData.idDeliver} /> */}
                    <Column field="area" header="area" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="neightborhood" heade="neightborhood" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="address" header="address" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="minItems" header="minItems" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="maxItems" header="maxItems" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="require_Hour_Active" header="require_Hour_Active" sortable style={{ minWidth: '16rem' }}></Column>

                    {/* <Column field="require_Hour_Active" header="require_Hour_Active" sortable style={{ minWidth: '16rem' }}></Column> */}
                    {/* <Column field="require_Hour_Active" header="require_Hour_Active" body={imageBodyTemplate}></Column> */}
                    {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column> */}
                    {/* <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column> */}
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>  */}
                    {/* <Column    header="aaa" body={sendReport} exportable={false} style={{ minWidth: '12rem' }}></Column> */}

                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                </DataTable>
            </div>

            <Dialog visible={machineDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Add Machine" modal className="p-fluid" footer={machineDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="machineName" className="font-bold">Machine Name</label>
                    <InputText id="machineName" value={machine.machineName} onChange={(e) => onInputChange(e, 'machineName')} required autoFocus className={classNames({ 'p-invalid': submitted && !machine.machineName })} />
                    {submitted && !machine.machineName && <small className="p-error">Machine name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="address" className="font-bold">Address</label>
                    <InputText id="address" value={machine.address} onChange={(e) => onInputChange(e, 'address')} required className={classNames({ 'p-invalid': submitted && !machine.address })} />
                    {submitted && !machine.address && <small className="p-error">Address is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="area" className="font-bold">Area</label>
                    <InputText id="area" value={machine.area} onChange={(e) => onInputChange(e, 'area')} required className={classNames({ 'p-invalid': submitted && !machine.area })} />
                    {submitted && !machine.area && <small className="p-error">Area is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="idDeliver" className="font-bold">Delivery ID</label>
                    <InputText id="idDeliver" value={machine.idDeliver} onChange={(e) => onInputChange(e, 'idDeliver')} required className={classNames({ 'p-invalid': submitted && !machine.idDeliver })} />
                    {submitted && !machine.idDeliver && <small className="p-error">Delivery ID is required.</small>}
                </div>
                
                <div className="field">
                    <label htmlFor="neighborhood" className="font-bold">Neighborhood</label>
                    <InputText id="neighborhood" value={machine.neighborhood} onChange={(e) => onInputChange(e, 'neighborhood')} required className={classNames({ 'p-invalid': submitted && !machine.neighborhood })} />
                    {submitted && !machine.neighborhood && <small className="p-error">Neighborhood is required.</small>}
                </div>
             
                <div className="formgrid grid">
                <div className="flex-auto">
                        <label htmlFor="minmax-buttons" className="font-bold block mb-2">Minimum itens</label>
                        <InputNumber inputId="minmax-buttons" value={value3} onValueChange={(e) => setValue3(e.value)} mode="decimal" showButtons min={20} max={49} />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="minmax-buttons" className="font-bold block mb-2">Maximum itens</label>
                        <InputNumber inputId="minmax-buttons" value={value2} onValueChange={(e) => setValue2(e.value)} mode="decimal" showButtons min={21} max={50} />
                    </div>
                </div>
                <div className="flex-auto">
                        <label htmlFor="minmax-buttons" className="font-bold block mb-2">Require Hour Active</label>
                        <InputNumber inputId="minmax-buttons" value={value1} onValueChange={(e) => setValue1(e.value)} mode="decimal" showButtons min={0} max={24} />
                    </div>
                <div className="card flex flex-wrap gap-3 p-fluid">


                <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={DeliversName} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" />
        </div>
                </div>
            </Dialog>

        </div>

    );
}

export default Machine;