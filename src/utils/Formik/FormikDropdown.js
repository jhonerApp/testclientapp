import React, { useState, useEffect, useRef, Fragment } from 'react'
import TextError from './TextError';
import {
    Field,
    ErrorMessage,

}
    from "formik";
import { Dropdown } from 'primereact/dropdown';


function DropdownSelect(props) {
    const [selectedArray, setSelectedArray] = useState();
    // const [stateValue, setValue] = useState([]);
    const { label, name, array, filteryBy, ...rest } = props;


    useEffect(() => {
        
        if (props.valuestate[name] === null) {
            setSelectedArray(null)
        } else {
            setSelectedArray(props.valuestate);
        }
    }, [props.valuestate])


    const onArrayChange = (e, setFieldValue) => {

        if (e.value !== undefined) {
            setSelectedArray(e.value);
            setFieldValue(name, e.value);
        } else {

            setSelectedArray(undefined);
            setFieldValue(name, '');
        }
    }


    return (
        <div>

            <Field as='select' name={name} value={selectedArray}>
                {({ form, form: { setFieldValue } }) => {


                    return (
                        <Dropdown id={name} value={selectedArray} options={array} onChange={(e) => onArrayChange(e, setFieldValue)} optionLabel={filteryBy} filter showClear filterBy={filteryBy}
                            {...props} className={form.errors[name] && form.touched[name] ? "p-invalid" : null} />
                    )
                }}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default DropdownSelect
