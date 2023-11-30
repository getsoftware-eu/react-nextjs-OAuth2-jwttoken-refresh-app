import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from '@/services/productService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import {useSession} from "next-auth/react";
import Link from "next/link";

function InformationSaDataListTable({ informations }) { //props

    const { data: session } = useSession();
    
    let useTestData = false
    
    let emptyProduct = {
        entityId: null,
        name: '',
        beschreibung: '',
        saStatus: '',
        sbStatus: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    
    const [sessionUser, setSessionUser] = useState({});
    const [infos, setInfos] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        if(useTestData) {
            ProductService.getProducts().then((data) =>
                setInfos(
                    data
                ));
        }
        else 
            setInfos(informations);

    }, [informations]);

    const formatCurrency = (value) => {
        return value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...informations];
            let _product = { ...product };

            if (product.entityId) {
                const index = findIndexById(product.entityId);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.entityId = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setInfos(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = infos.filter((val) => val.entityId !== product.entityId);

        setInfos(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < infos.length; i++) {
            if (infos[i].entityId === id) {
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
        let _products = infos.filter((val) => !selectedProducts.includes(val));

        setInfos(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <div className="row gx-1 align-items-center">
                    <div className="col-auto">
                        <a href="/asset/informationSa/create" className="btn btn-primary">neue Information</a>
                    </div>
                    {/*<div className="col-auto">*/}
                    {/*    <input type="button" className="btn btn-light" value="Bearbeiter zuweisen"*/}
                    {/*             onClick={openNew} disabled={!selectedProducts || !selectedProducts.length} />*/}
                    {/*</div>*/}
                    {/*<div className="col-auto">*/}
                    {/*    <input type="button" className="btn btn-danger" value="Löschen"*/}
                    {/*      onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length}  />*/}
                    {/*    /!*<Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />*!/*/}
                    {/*</div>*/}
                </div>
                {/*<Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />*/}
                {/*<Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />*/}
            </div>
        );
    };

    const rightToolbarTemplate = () => {

        return (
            <div className="row">
            <div className="col-auto">
                {/*<span className="p-input-icon-left">*/}
                {/*<i className="pi pi-search" />*/}
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="form-control" style={{height: '32px'}}/>
                {/*</span>*/}
            </div>
            
            <div className="col-auto">
            <a href="#" title="Datenexport" className="btn btn-light" onClick={exportCSV}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="feather feather-download align-middle">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                </a>
            </div>
        </div>
        )
        
        // return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <Link href={"/asset/informationSa/detail/" + rowData.entityId}>
                {rowData.name}
            </Link>
        )
    };  
    
    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const saStatusBodyTemplate = (rowData) => {
        //Ask Dima: return <Tag value={rowData.saStatus} severity={getSaStatus(rowData)}></Tag>;
        return getSaStatus(rowData);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSaStatus = (product) => {
        switch (product.saStatus) {
            case 'BEARBEITET':
                return 'Bearbeitet';

            case 'BEARBEITUNG_ABGESCHLOSSEN':
                return 'Im Review';

            case 'ABGESCHLOSSEN':
                return 'Abgeschlossen';

            default:
                return null;
        }
    };

    const header = (
        <div></div>
        // <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        //     {/*<h4 className="m-0">Manage Products</h4>*/}
        //     <span className="p-input-icon-left">
        //         <i className="pi pi-search" />
        //         <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        //     </span>
        // </div>
    );
    const productDialogFooter = (
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

    return (
        <>
            <Toast ref={toast} />
            {/*<div className="card">*/}
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} 
                           value={infos} 
                           selection={selectedProducts} 
                           onSelectionChange={(e) => setSelectedProducts(e.value)}
                           dataKey="entityId"  
                           // className="testclass"
                           tableClassName="table table-hover table-sm"
                           tableStyle={{width: '100%'}}
                           
                           cellClassName="eu-DataTable-cellClassName"
                           rowClassName="eu-DataTable-rowClassName"
                           paginatorClassName="eu-DataTable-paginatorClassName"
                           className="eu-DataTable-className"
                           // paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" 
                           globalFilter={globalFilter}
                           header={header}
                     >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    {/*<Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>*/}
                    <Column field="name" header="Name" body={nameBodyTemplate} sortable></Column>
                    {/*<Column field="image" header="Image" body={imageBodyTemplate}></Column>*/}
                    {/*<Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>*/}
                    <Column field="beschreibung" header="Beschreibung" sortable footerClassName="eu-Column-footerClassName" filterHeaderClassName="eu-Column-filterHeaderClassName" bodyClassName="eu-Column-bodyClassName" className="eu-Column-className" headerClassName="eu-Column-headerClassName"></Column>
                    <Column field="editor" header="Bearbeiter" sortable></Column>
                    <Column field="saStatus" header="Status" body={saStatusBodyTemplate} sortable></Column>
                    {/*<Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>*/}
                    {/*<Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>*/}
                </DataTable>
            {/*</div>*/}

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="beschreibung" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="beschreibung" value={product.beschreibung} onChange={(e) => onInputChange(e, 'beschreibung')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </>
    );
}
export default InformationSaDataListTable;