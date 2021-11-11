import React, { useState, useEffect } from 'react'
import TextError from './TextError';
import {
    Field,
    ErrorMessage,

}
    from "formik";
import dateformat from 'dateformat';
import { Calendar } from 'primereact/calendar';
function FormikDatePicker(props) {
    const { label, name, ...rest } = props;
    const [stateDate, setDate] = useState({
        dateValue: new Date('')
    });


    useEffect(() => {
        setDate({ dateValue: new Date(props.valuestate) })
    }, [props.valuestate])

    const onChangeValueDate = (e, setFieldValue) => {
        setFieldValue(name, e.value)
        setDate({ dateValue: e.value })

        console.log("onChangeValueDate", e.value)
    }

    return (
        <div>
            <Field name={name}>
                {({ form, field }) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    return (

                        <Calendar id="icon" {...field} {...rest} mask="99/99/9999" value={stateDate.dateValue} onChange={(e) => onChangeValueDate(e, setFieldValue)} placeholder={label} showIcon
                            className={form.errors[name] && form.touched[name] ? "p-invalid" : null} />
                        // <Calendar id="icon" {...field} {...rest} value={dateformat(value, "yyyy-mm-dd")} onChange={({ value }) => setFieldValue(name, value)} placeholder={label} showIcon
                        //     className={form.errors[name] && form.touched[name] ? "p-invalid" : null} />

                        // <Calendar  id="basic" {...field} {...rest} value={stateDate.date} onChange={(e) => setDate({ date: e.value })}  placeholder={label} className={form.errors[name] && form.touched[name] ? "p-invalid" : null}/> 
                    );
                }}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default FormikDatePicker
