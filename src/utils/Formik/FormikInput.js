import React, { Fragment } from 'react'
import {
    Field,
    ErrorMessage
}
    from "formik"
import { InputText } from 'primereact/inputtext';
import TextError from './TextError';

function FormikInput(props) {
    const { label, name, ...rest } = props
    return (
        <Field name={name}>
            {({ field, form }) => {
               
                return (
                    < Fragment >
                        {/* <label htmlFor={label}>{label}</label> */}
                        <InputText id={name} {...rest} {...field} className={form.errors[name] && form.touched[name] ? "p-invalid" : null} placeholder={label}></InputText>
                        { form.errors[name] && form.touched[name] ? <ErrorMessage name={name} component={TextError}></ErrorMessage> : null}
                    </Fragment>
                )
            }}
        </Field >
    )
}

export default FormikInput
