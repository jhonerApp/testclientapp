import React, { useState, useEffect, useRef } from 'react'
import Aux from "../../hoc/_Aux";
import { Formik, Form } from "formik"
import * as Yup from "yup";

import { Row, Col } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from "react-redux"
import { Toast } from 'primereact/toast';


import BranchForm from '../../App/components/Register/BranchForm';
import PanelControl from '../../utils/Control/PanelControl'

import SearchControl from '../../utils/Control/SearchControl'
import DialogMessage from '../../utils/Control/DialogMessage'

import FormikDropdown from "../../utils/Formik/FormikDropdown";
import FormikInput from "../../utils/Formik/FormikInput";

import { Divider } from 'primereact/divider';
import { Modal } from 'bootstrap';
import * as BranchAction from "../../store/Action/Register/branch"
import * as ClientAction from "../../store/Action/Register/client"


function PageBranch({ ...props }) {

    const [stateRefreshData, setRefreshData] = useState({
        value: [],
        reset: false
    });

    const removeToFilterColumn = ["stafftid", "staff_guid", "mname", "bdate", "address", "country", "contact_no", "email_address", "isActive", "isDelete", "date_created", "client_id"];
    const { onSearchClick, onInputChange, DataValue, stateFilter } = SearchControl(props.BranchList.list, null)
    const { toast, confirmDelete } = DialogMessage(props.deleteStaff, stateFilter, setRefreshData, stateRefreshData)
    const [stateEditData, setEditData] = useState([])



    const [stateOption, setOption] = useState({
        client: null
    })


    let [initialValues, setInitialValues] = useState({
        client: null,

    });

    const validationSchema = Yup.object({
        client: Yup.string().required("Required!").nullable(),
    });

    const isStatus = [
        { name: "Active", value: 1 },
        { name: "In-active", value: 0 },
    ];

    const selectedTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.client_name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }


    useEffect(() => {
        props.fetchBranch()
    }, [])
    // const editSection = (data) => {
    //     setEditData({ ...data });
    //     setOption(data.isActive)
    //     setDate(data.bdate);

    //     setRefreshData({ ...stateRefreshData, value: data, reset: false })
    //     props.fetchStaff()

    // }

    const actionBodyTemplate = (rowData, index) => {
        // return (
        //     <React.Fragment>
        //         <Button icon="pi pi-pencil" className="p-button-rounded p-button-edit p-mr-2" onClick={() => editSection(rowData)} />
        //         <Button icon="pi pi-trash" className="p-button-rounded p-button-delete" onClick={() => confirmDelete(index, rowData.stafftid, rowData.fname)} />
        //     </React.Fragment>
        // );
    }



    return (
        <Aux>
            <Row>
                <Col md={12} xl={12}>
                    {/* <Toast ref={toast} /> */}

                    <PanelControl header="SELECT CLIENT" icon="selectFile">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                        >
                            {(formik) => (
                                <div className="p-fluid p-formgrid p-grid p-justify-even">
                                    <div className="p-field p-col-12 p-md-10">
                                        <FormikDropdown array={props.BranchList.list} id="client" name="client" filteryBy="client_name" placeholder="Select client" valueTemplate={selectedTemplate} valuestate={stateOption} />
                                    </div>
                                    <div className="p-field p-col-12 p-md-2">
                                        <Button label="Search" className="p-button-rounded p-button-raised p-button-primary " icon="pi pi-search" />
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </PanelControl>


                    {/* <PanelControl header="SELECT CLIENT" icon="selectFile">

                    </PanelControl> */}
                    <hr />
                    <PanelControl header="BRANCH REGISTRATION FORM" icon="selectBranch">
                        <BranchForm {...({ stateEditData, stateOption, setOption, stateRefreshData, setRefreshData, toast })} />
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
                                <Column field="branch_name" header="BRANCH NAME" style={{ textAlign: 'center', fontWeight: 'normal' }}></Column>
                                <Column field="branch_address" header="ADDRESS" style={{ textAlign: 'center', fontWeight: 'normal' }}></Column>
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
        BranchList: state.branch
    }
}

const mapActionToProps = {
    fetchBranch: BranchAction.GetData,
    fetchClients: ClientAction.GetData,
}



export default connect(mapStateToProps, mapActionToProps)(PageBranch)
