import React, { useState } from 'react'
import { Formik, Form } from "formik"
import * as Yup from "yup";

import { Button } from 'primereact/button';
import PanelControl from '../../../utils/Control/PanelControl'

import FormikInput from "../../../utils/Formik/FormikInput";

function BranchForm({ ...props }) {




    const onSubmit = (values, { resetForm, setSubmitting }) => {
    }
    let [initialValues, setInitialValues] = useState({
        // isActive: null,

    });

    const validationSchema = Yup.object({
        // lname: Yup.string().required("Required!"),
        // fname: Yup.string().required("Required!"),
        // mname: Yup.string().required("Required!"),
        // bdate: Yup.date().required("Required").nullable(),
        // isActive: Yup.string().required("Required!").nullable(),
    });

    return (
        <div>


            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form>
                        <div className="p-fluid p-formgrid p-grid p-justify-even">
                            <div className="p-field p-col-12 p-md-6">
                                <FormikInput type="text" id="fname" name="fname" label="Client Address" />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <FormikInput type="text" id="fname" name="fname" label="Client Address" />
                            </div>
                        </div>
                        <div className="p-grid p-fluid p-justify-end">
                            <div className="p-col-offset-5 p-mr-2  p-mb-2">
                                <Button type="button" label="Cancel" icon="fas fa-window-close" className="p-button-primary  "></Button>
                            </div>
                            <div className="p-col-offset-5 p-mr-2  p-mb-2">
                                <Button type="button" label="Cancel" icon="fas fa-window-close" className="p-button-cancel"></Button>
                            </div>
                        </div>



                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BranchForm
