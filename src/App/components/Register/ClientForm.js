import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { connect } from "react-redux"
import { Formik, Form } from "formik"
import * as Yup from "yup";
import dateformat from 'dateformat';



import * as ClientAction from "../../../store/Action/Register/client"
import FormikInput from "../../../utils/Formik/FormikInput";
import FormikDropdown from "../../../utils/Formik/FormikDropdown";
import FormikDatePicker from '../../../utils/Formik/FormikDatePicker';

import { Calendar } from 'primereact/calendar';

function ClientForm({ ...props }) {


    const [statetRef, setRef] = useState([]);
    let [stateFilename, setFilename] = useState('');
    let [stateImageValue, setImageValue] = useState('');



    const [stateEditBtn, setEditBtn] = useState({
        className: "p-button-primary ",
        icon: "fas fa-save",
        label: "SAVE"
    })




    useEffect(() => {
        if (props.stateEditData.length !== 0) {
            setInitialValues({ ...props.stateEditData })
            setEditBtn({
                className: "p-button-edit",
                icon: "fas fa-edit",
                label: "UPDATE"
            })
        }
        console.log("useEffect stateEditData", props.stateEditData)


    }, [props.stateEditData])

    useEffect(() => {
        setTimeout(() => {
            if (props.stateRefreshData.reset) {
                resetFields()
                props.setRefreshData({ ...props.stateRefreshData, value: [], reset: false })
            }
        }, 100)

    }, [props.stateRefreshData])


    const onChangeFilename = () => {
        setFilename({ ...stateFilename, ...stateFilename })

    }

    const onUpload = ({ files }) => {


        const [file] = files;
        setFilename(files[0].name)

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            setImageValue(e.target.result)
        };
        fileReader.readAsDataURL(file);

        //Clear Files
        statetRef.fileInput = [];
        statetRef.clear();

    }

    const onSubmit = (values, { resetForm, setSubmitting }) => {
        console.log("onSubmit ", values)
        values = {
            ...values, bdate: dateformat(values.bdate, "yyyy-mm-dd"),
            client_logo: stateImageValue
        };

        if (initialValues.clientid !== undefined) {
            props.updateClients(values);
            props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfuly Updated', life: 3000 });
        } else {
            props.createClient(values)
            props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfuly Inserted', life: 3000 });

        }



        resetFields();
        resetForm();
        setSubmitting(false);
        props.setRefreshData({ ...props.stateRefreshData, value: props.clientList, reset: false })

    }

    const isStatus = [
        { name: "Active", value: 1 },
        { name: "In-active", value: 0 },
    ];

    const validationSchema = Yup.object({
        lname: Yup.string().required("Required!"),
        fname: Yup.string().required("Required!"),
        mname: Yup.string().required("Required!"),
        bdate: Yup.date().required("Required").nullable(),
        isActive: Yup.string().required("Required!").nullable(),
    });

    let [initialValues, setInitialValues] = useState({
        lname: '',
        fname: '',
        mname: '',
        bdate: null,
        address: '',
        country: '',
        contact_no: '',
        email_address: '',
        client_name: '',
        client_address: '',
        client_logo: '',
        isActive: null
    });



    const selectedTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }


    const onCancel = (formik) => {
        resetFields();
        formik.handleReset();
        props.setRefreshData({ ...props.stateRefreshData, value: [], reset: false })
    }

    const resetFields = () => {
        setInitialValues({
            lname: '',
            fname: '',
            mname: '',
            bdate: null,
            address: '',
            country: '',
            contact_no: '',
            email_address: '',
            client_name: '',
            client_address: '',
            client_logo: '',
            isActive: null
        })

        setEditBtn({
            className: "p-button-primary ",
            icon: "fas fa-save",
            label: "SAVE"
        })

        props.setOption({ ...props.stateOption, isActive: null });
        props.setDate({ ...props.stateDate, dateValue: '' });
        setFilename('');

    }


    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >

            {(formik) => (
                <Form>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6  p-lg-4">
                            <FormikInput type="text" id="lname" name="lname" label="Lastname" />
                        </div>
                        <div className="p-field p-col-12 p-md-6  p-lg-4">
                            <FormikInput type="text" id="fname" name="fname" label="Firstname" />
                        </div>
                        <div className="p-field p-col-12 p-md-12  p-lg-4">
                            <FormikInput type="text" id="mname" name="mname" label="Middlename" />
                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">

                        <div className="p-field p-col-12 p-md-6   p-lg-4">
                            <FormikInput type="text" id="address" name="address" label="Address" />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-lg-4 ">
                            <FormikInput type="text" id="country" name="country" label="Country" />
                        </div>
                        <div className="p-field p-col-12 p-md-12  p-lg-4">
                            <FormikInput type="text" id="contact_no" name="contact_no" label="Contact no" />
                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">

                        <div className="p-field p-col-12 p-md-6   p-lg-6">
                            <FormikInput type="email" id="email_address" name="email_address" label="Email Address" />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-lg-3 ">
                            <FormikDropdown array={isStatus} id="isActive" name="isActive" filteryBy="name" placeholder="Select status" valueTemplate={selectedTemplate} valuestate={props.stateOption} />
                        </div>
                        <div className="p-field p-col-12 p-md-6   p-lg-3">
                            <FormikDatePicker id="bdate" name="bdate" label="Birthdate" valuestate={props.stateDate} />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">

                        <div className="p-field p-col-12 p-md-6 p-lg-4 ">
                            <FormikInput type="text" id="client_name" name="client_name" label="Client name" />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-lg-4">
                            <FormikInput type="text" id="client_address" name="client_address" label="Client address" />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-lg-4 ">

                            <div className="p-inputgroup">
                                <InputText placeholder="Filename" value={stateFilename} onChange={onChangeFilename} disabled />
                                <FileUpload mode="basic" ref={(el) => setRef(el)} name="demo[]" url="./upload" customUpload uploadHandler={onUpload} accept="image/*" auto maxFileSize={1000000} chooseLabel="FILE" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="p-grid p-fluid p-justify-end">
                        <div className="p-col-offset-5 p-mr-2  p-mb-2">
                            <Button type="button" label="Cancel" icon="fas fa-window-close" className="p-button-cancel" onClick={() => onCancel(formik)}></Button>
                        </div>
                        <div className="p-col-offset-5 p-mr-2  p-mb-2">
                            <Button type="submit" {...stateEditBtn} ></Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

const mapStateToProps = state => {

    return {
        clientList: state.client
    }

}

const mapActionToProps = {

    createClient: ClientAction.Create,
    fetchClients: ClientAction.GetData,
    updateClients: ClientAction.Update
    // fetchAssignStudent: AssignStudentAction.GetData
}

export default connect(mapStateToProps, mapActionToProps)(ClientForm)
