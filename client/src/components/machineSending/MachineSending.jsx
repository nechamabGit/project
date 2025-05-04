// import { Avatar } from '@/components/lib/avatar/Avatar';
//  { deleteMimportachineSending } from '../../../../server/controllers/machineSendingController';
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
import CreatReportToDeliver from '../reportsToDelivers/CreateReportToDeliver';

const MachineSending = (props) => {

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [MachineSendings, setMachineSendings] = useState(null);
    const [MachineSendingDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [MachineSending, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [fillReport, setFillReport] = useState(false);
    const [countFillingNum, setCountFillingNum] =useState(0);

    const toast = useRef(null);
    const dt = useRef(null);
    const { token } = useSelector((state) => state.token);

   
const getMachineSendings=async ()=>{
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

        if (MachineSending.name.trim()) {
            let _MachineSendings = [...MachineSendings];
            let _MachineSending = { ...MachineSending };

            if (MachineSending.id) {
                const index = findIndexById(MachineSending.id);

                _MachineSendings[index] = _MachineSending;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _MachineSending.id = createId();
                _MachineSending.image = 'MachineSending-placeholder.svg';
                _MachineSendings.push(_MachineSending);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setMachineSendings(_MachineSendings);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (MachineSending) => {
        setProduct({ ...MachineSending });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (MachineSending) => {
        setProduct(MachineSending);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _MachineSendings = MachineSendings.filter((val) => val.id !== MachineSending.id);

        setMachineSendings(_MachineSendings);
        setDeleteProductDialog(true);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < MachineSendings.length; i++) {
            if (MachineSendings[i].id === id) {
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

    const deleteSelectedProducts = () => {
        let _MachineSendings = MachineSendings.filter((val) => !selectedProducts.includes(val));

        setMachineSendings(_MachineSendings);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _MachineSending = { ...MachineSending };

        _MachineSending['category'] = e.value;
        setProduct(_MachineSending);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _MachineSending = { ...MachineSending };

        _MachineSending[`${name}`] = val;

        setProduct(_MachineSending);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _MachineSending = { ...MachineSending };

        _MachineSending[`${name}`] = val;

        setProduct(_MachineSending);
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
        return <img src={`https://primefaces.org/cdn/primereact/images/MachineSending/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        console.log(rowData);
        return formatCurrency(rowData.price);
    };

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // };

    const statusBodyTemplate = (rowData) => {
        
        return <Tag value={getStatus(rowData)} severity={getSeverity(rowData)}></Tag>;
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
            <Button  onClick={()=>{setFillReport(true)}}>שלח דוח</Button>
             <CreatReportToDeliver fillReport={fillReport} rowData={rowData}  hideDialog={hideDialog}  hideFillReport={hideFillReport} setFillReport={setFillReport}     ></CreatReportToDeliver>
    
            </>
        );
    };
    const getSeverity = (MachineSending) => {
        if(MachineSending.last_Hour_Active<MachineSending.idMachine.require_Hour_Active){
            return 'warning';
        }
        else{
            return 'success';
        }
    };
    const getStatus = (MachineSending) => {
        if(MachineSending.last_Hour_Active<MachineSending.idMachine.require_Hour_Active){
            return 'not working';
        }
        else{
            return "working";
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
    const MachineSendingDialogFooter = (
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
    
    useEffect(() => {
        getMachineSendings();
    }, []);
    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={MachineSendings} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} MachineSendings" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="machinName" header="machinName" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="amountBuying" header="amountBuying" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="amountLeft" header="amountLeft" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="last_Hour_Active" header="last_Hour_Active" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> 
                    <Column    header="sending report" body={sendReport} exportable={false} style= {{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                </DataTable>
            </div>
            {/* //onHide={hideDialog} */}

            <Dialog visible={MachineSendingDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={MachineSendingDialogFooter} onHide={hideDialog}>
                {MachineSending.image && <img src={`https://primefaces.org/cdn/primereact/images/MachineSending/${MachineSending.image}`} alt={MachineSending.image} className="MachineSending-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={MachineSending.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !MachineSending.name })} />
                    {submitted && !MachineSending.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={MachineSending.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={MachineSending.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={MachineSending.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={MachineSending.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={MachineSending.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={MachineSending.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={MachineSending.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {MachineSending && (
                        <span>
                            Are you sure you want to delete <b>{MachineSending.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {MachineSending && <span>Are you sure you want to delete the selected MachineSendings?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        






export default MachineSending;