import React, {useState, useEffect, useRef} from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { CustomerService } from './demo/CustomerService';
import Link from "next/link";
import {useSession} from "next-auth/react";
import { InputSwitch } from 'primereact/inputswitch';

export default function InformationSaDataListTable({ givenAssets }) {

    const { data: session } = useSession();

    const [assets, setAssets] = useState(null);
    const [rowClick, setRowClick] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        // 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        beschreibung: { value: null, matchMode: FilterMatchMode.IN },
        saStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    // const [representatives] = useState([
    //     { name: 'Amy Elsner', image: 'amyelsner.png' },
    //     { name: 'Anna Fali', image: 'annafali.png' },
    //     { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    //     { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    //     { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    //     { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    //     { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    //     { name: 'Onyama Limba', image: 'onyamalimba.png' },
    //     { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    //     { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    // ]);
    // const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);
    const dt = useRef(null);

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    useEffect(() => {
        
        let demo = false;
        
        if(demo)
            CustomerService.getCustomersMedium().then((data) => {
                setAssets(getCustomers(data));
                setLoading(false);
            });
        else {
            setAssets(givenAssets);
            setLoading(false);
        }
        
    }, [givenAssets]); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
           <>
           </>
        );
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };


    const countryBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                     className={`flag flag-${rowData.country.code}`} style={{width: '24px'}}/>
                <span>{rowData.country.name}</span>
            </div>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <Link href={"/asset/informationSa/detail/" + rowData.entityId}>
                {rowData.name}
            </Link>
        )
    };

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;

        return (
            <div className="flex align-items-center gap-2">
                <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
                <span>{representative.name}</span>
            </div>
        );
    };

    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
                <span>{option.name}</span>
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
    };

    const representativeRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={representatives}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="Any"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };
    
    const editorBodyTemplate = (rowData) => {
        //Ask Dima: return <Tag value={rowData.editorId} severity={getEditorById(rowData)}></Tag>;
        return getEditorById(rowData);
    };

    const getEditorById = (editorId) => {
        switch (editorId) {
            case '0':
                return 'Donald Duck';

            default:
                return 'Donald Duck';
        }
    };

    const saStatusBodyTemplate = (rowData) => {
        //Ask Dima: return <Tag value={rowData.saStatus} severity={getSaStatus(rowData)}></Tag>;
        return getSaStatus(rowData);
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
    
    // const statusRowFilterTemplate = (options) => {
    //     return (
    //         <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    //     );
    // };

    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    };

    const header = renderHeader();

    return (

        <>
            <div id="mainToolPanel" className="row gy-2 gx-3 align-items-center">
                <div className="col-auto">
                    <a href="/asset/informationSa/create" className="btn btn-primary">neue Information</a>
                </div>
                <div className="col-auto ms-auto noDatatableFlashing" style={{display: 'block'}}>
                    <div className="row">
                        <div className="col-auto">
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} type="search"
                                       id="fullSearch"
                                       placeholder="Search..." className="form-control" style={{height: '32px'}}/>
                            {/*<input id="fullSearch" className="form-control" placeholder="Suche... ">*/}
                        </div>
                    </div>
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
                <div className="col-auto" data-eugen-tipp="row-click-selection">
                    <InputSwitch checked={rowClick} onChange={(e) => setRowClick(e.value)} />
                </div>
            </div>
            
            <div id="selectionPanel" className="d-none row gx-1 align-items-center">
                <div className="col-auto">
                    <input type="submit" className="btn btn-primary" formAction="/informationSa/closeStrukturanalyse"
                           value="Bearbeitung abschließen"/>

                </div>
                <div className="col-auto">
                    <input type="button" className="btn btn-light" value="Bearbeiter zuweisen" data-bs-toggle="modal"
                           data-bs-target="#userSelectionDialog"/>
                </div>
            </div>

            <div id="mainDataTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">


                <DataTable ref={dt}
                           value={assets}
                    // paginator rows={10} 
                           dataKey="entityId"
                           filters={filters}
                           // filterDisplay="row"
                           loading={loading}
                    // globalFilterFields={['name', 'country.name', 'representative.name', 'status']} 
                           selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} tableStyle={{ minWidth: '50rem' }}
                           globalFilterFields={['name', 'beschreibung', 'saStatus']}
                           header={header}
                           emptyMessage="No assets found.">
                    <Column selectionMode="multiple" exportable={false} 
                            // headerStyle={{ width: '3rem' }}
                    ></Column>
                    <Column field="name" header="Name" body={nameBodyTemplate}
                            sortable 
                            // filter filterPlaceholder="Search by name" filterMenuStyle={{height: '32px'}} 
                            style={{height: '32px'}}/>
                    {/*<Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />*/}
                    {/*<Column filterField="beschreibung" header="Beschreibung" sortable showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ height: '32px' }}*/}
                    {/*        body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} footerClassName="eu-Column-footerClassName" filterHeaderClassName="eu-Column-filterHeaderClassName" bodyClassName="eu-Column-bodyClassName" className="eu-Column-className" headerClassName="eu-Column-headerClassName"/>*/}
                    <Column field="beschreibung" header="Beschreibung"
                            // filterField="beschreibung" ???
                            sortable 
                            // filter  showFilterMenu={false} filterMenuStyle={{width: '14rem'}} 
                            style={{height: '32px'}}
                            // body={representativeBodyTemplate
                            footerClassName="eu-Column-footerClassName"
                            filterHeaderClassName="eu-Column-filterHeaderClassName"
                            bodyClassName="eu-Column-bodyClassName" 
                            className="eu-Column-className"
                            headerClassName="eu-Column-headerClassName"/>
                    <Column field="editorId" header="Bearbeiter" body={editorBodyTemplate}
                            sortable 
                            // filter  showFilterMenu={false} filterMenuStyle={{width: '14rem'}} 
                            style={{height: '32px'}} 
                            // filterElement={statusRowFilterTemplate}
                    />
                    <Column field="saStatus" header="Status" body={saStatusBodyTemplate}
                            sortable 
                            // filter showFilterMenu={false} filterMenuStyle={{width: '14rem'}} 
                            style={{height: '32px'}} 
                            // filterElement={statusRowFilterTemplate}
                    />
                    {/*<Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />*/}
                </DataTable>
            </div>

        </>
    );
}
        