import React, { useState, useEffect, useRef } from 'react'
import Aux from "../../hoc/_Aux";


import { Row, Col } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from "react-redux"
import { Toast } from 'primereact/toast';


import ClientForm from '../../App/components/Register/ClientForm';
import PanelControl from '../../utils/Control/PanelControl'
import * as ClientAction from "../../store/Action/Register/client"
import SearchControl from '../../utils/Control/SearchControl'
import DialogMessage from '../../utils/Control/DialogMessage'

function PageClient({ ...props }) {

    const [stateRefreshData, setRefreshData] = useState({
        value: []
    });

    const removeToFilterColumn = ["clientid", "client_guid", "mname", "bdate", "address", "country", "contact_no", "email_address", "isActive", "isDelete", "date_created", "client_name", "client_address", "client_logo", "userId"];
    const { onSearchClick, onInputChange, DataValue, stateFilter } = SearchControl(props.clientList.list, removeToFilterColumn)
    const { toast, confirmDelete } = DialogMessage(props.deleteClients, stateFilter, setRefreshData, stateRefreshData)


    const [stateEditData, setEditData] = useState([])
    const [stateOption, setOption] = useState({
        isActive: null
    })
    const [stateDate, setDate] = useState({
        dateValue: new Date('')
    });


    useEffect(() => {
        setTimeout(() => {
            props.fetchClients();
        }, 1000)

        console.log("stateRefreshData", stateRefreshData)


    }, [stateRefreshData])


    const editSection = (data) => {
        setEditData({ ...data });
        setOption(data.isActive)
        setDate(data.bdate);

        setRefreshData({ ...stateRefreshData, value: data, reset: false })
        props.fetchClients()
    }

    const actionBodyTemplate = (rowData, index) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-edit p-mr-2" onClick={() => editSection(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-delete" onClick={() => confirmDelete(index, rowData.clientid, rowData.fname)} />
            </React.Fragment>
        );
    }




    // useEffect(() => {
    //     props.fetchClients();
    // }, [])

    return (
        <Aux>
            <Row>
                <Col md={12} xl={12}>
                    <Toast ref={toast} />

                    <PanelControl header="CLIENT REGISTRATION FORM" icon="studentIcon">
                        <ClientForm {...({ stateEditData, stateOption, setOption, stateDate, setDate, stateRefreshData, setRefreshData, toast })} />
                        <hr />
                        <div className="p-grid p-fluid p-justify-end">
                            <div className="p-col-12 p-md-6  p-lg-4">
                                <div className="p-inputgroup">
                                    <InputText placeholder="Search by" onChange={onInputChange} />
                                    <Button icon="pi pi-search" className="p-button-warning" onClick={onSearchClick} />
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <DataTable value={DataValue} paginator pageLinkSize={2}
                                rows={10}
                            >
                                <Column field="lname" header="LASTNAME" style={{ textAlign: 'center', fontWeight: 'normal' }}></Column>
                                <Column field="fname" header="FIRSTNAME" style={{ textAlign: 'center', fontWeight: 'normal' }}></Column>
                                <Column field="mname" header="M.NAME" style={{ textAlign: 'center', fontWeight: 'normal' }}></Column>
                                <Column field="client_name" header="CLIENT NAME" style={{ textAlign: 'center', fontWeight: 'normal' }}></Column>
                                <Column field="country" header="COUNTRY" style={{ textAlign: 'center', fontWeight: 'normal' }}></Column>
                                <Column body={actionBodyTemplate} header="ACTION" style={{ textAlign: 'center' }}></Column>
                            </DataTable>
                        </div>

                    </PanelControl>
                </Col>
            </Row>
        </Aux>
    );
}

const mapStateToProps = state => {
    console.log("mapStateToProps", state.client)
    return {
        clientList: state.client
    }
}

const mapActionToProps = {
    fetchClients: ClientAction.GetData,
    deleteClients: ClientAction.Delete
}



export default connect(mapStateToProps, mapActionToProps)(PageClient)
