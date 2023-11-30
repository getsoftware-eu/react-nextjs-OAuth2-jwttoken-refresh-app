
import React from "react"
// import $ from 'jquery'

function InformationSaListTable({ informations, curUser }) { //props

    // $.DataTable = require('datatables.net')
    // const tableRef = useRef()
    //
    // useEffect(() => {
    //     console.log(tableRef.current)
    //     const table = $(tableRef.current).DataTable(
    //         {
    //             data: props.data,
    //             columns: [
    //                 { title: "Name"},
    //                 { title: "Position"},
    //                 { title: "Office"},
    //                 { title: "Extn."},
    //                 { title: "Start data"},
    //                 { title: "Salary"}
    //             ],
    //             destroy: true  // I think some clean up is happening here
    //         }
    //     )
    //     // Extra step to do extra clean-up.
    //     return function() {
    //         console.log("Table destroyed")
    //         table.destroy()
    //     }
    // },[])
    //
    // return (
    //     <div>
    //         <table className="display" width="100%" ref={ tableRef }></table>
    //     </div>
    //
    // )
    //

    // <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    // <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
    //            dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
    //            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    //            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
    //     <Column selectionMode="multiple" exportable={false}></Column>
    //     <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
    //     <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
    //     <Column field="image" header="Image" body={imageBodyTemplate}></Column>
    //     <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
    //     <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
    //     <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
    //     <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
    //     <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
    // </DataTable>
    
    return (
        <table id="mainDataTable" className="table table-hover table-sm noDatatableFlashing" style={{width: '100%'}}>
            <thead>
            <tr>
                <th>{curUser.canEdit &&
                    <input type="checkbox" className="form-check-input" id="checkAll"/>
                }
                </th>

                <th>Name</th>
                <th>Beschreibung</th>
                <th>Bearbeiter&nbsp;</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>

            {informations.map(nextAsset => (
                <tr className="{AssetStatusCssClass(nextAsset.saStatus activePhase selectedPhase)}">

                    <td>
                        {/* <@content.getAssetStatusIcon nextAsset.saStatus nextAsset.id canEdit/>*/}
                    </td>

                    <td><a href="/asset/informationSa/detail/{nextAsset.id}">{nextAsset.name}</a></td>
                    <td>{nextAsset.beschreibung}</td>
                    {/*<td>{nextAsset.editor.fullName}</td>*/}
                    <td>{nextAsset.saStatus} </td>
                </tr>
            ))}

            </tbody>
        </table>
    )
}
export default InformationSaListTable;