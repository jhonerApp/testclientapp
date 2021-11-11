import React, { useState, useEffect, useRef } from 'react'
import Aux from "../../hoc/_Aux";


import { Row, Col } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from "react-redux"
import { Toast } from 'primereact/toast';


import StaffForm from '../../App/components/Register/StaffForm';
import PanelControl from '../../utils/Control/PanelControl'
import * as StaffAction from "../../store/Action/Register/staff"
import SearchControl from '../../utils/Control/SearchControl'
import DialogMessage from '../../utils/Control/DialogMessage'


function PageStaff({ ...props }) {

    const [stateRefreshData, setRefreshData] = useState({
        value: [],
        reset: false
    });

    const removeToFilterColumn = ["stafftid", "staff_guid", "mname", "bdate", "address", "country", "contact_no", "email_address", "isActive", "isDelete", "date_created", "client_id"];
    const { onSearchClick, onInputChange, DataValue, stateFilter } = SearchControl(props.staffList.list, removeToFilterColumn)
    const { toast, confirmDelete } = DialogMessage(props.deleteStaff, stateFilter, setRefreshData, stateRefreshData)



    const [stateEditData, setEditData] = useState([])
    const [stateOption, setOption] = useState({
        isActive: null
    })
    const [stateDate, setDate] = useState({
        dateValue: new Date('')
    });


    useEffect(() => {
        setTimeout(() => {
            props.fetchStaff();
            console.log("stateRefreshData", stateRefreshData)
        }, 1000)

    }, [stateRefreshData])


    const editSection = (data) => {
        setEditData({ ...data });
        setOption(data.isActive)
        setDate(data.bdate);

        setRefreshData({ ...stateRefreshData, value: data, reset: false })
        props.fetchStaff()

    }

    const actionBodyTemplate = (rowData, index) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-edit p-mr-2" onClick={() => editSection(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-delete" onClick={() => confirmDelete(index, rowData.stafftid, rowData.fname)} />
            </React.Fragment>
        );
    }

    // useEffect(() => {
    //     props.fetchStaff();
    // }, [])


    return (
        <Aux>
            <Row>
                <Col md={12} xl={12}>
                    <Toast ref={toast} />

                    <PanelControl header="STAFF REGISTRATION FORM" icon="studentIcon">
                        <StaffForm {...({ stateEditData, stateOption, setOption, stateDate, setDate, stateRefreshData, setRefreshData, toast })} />
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
    console.log("mapStateToProps", state.staff)
    return {
        staffList: state.staff
    }
}

const mapActionToProps = {
    fetchStaff: StaffAction.GetData,
    deleteStaff: StaffAction.Delete
}



export default connect(mapStateToProps, mapActionToProps)(PageStaff)
