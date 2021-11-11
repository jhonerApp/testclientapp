import React, { useReducer, useEffect } from "react";
import { Button } from "@material-ui/core/";
import * as RIIcons from "react-icons/ri";


import ButtonGroup from '@material-ui/core/ButtonGroup';
export default function ThemeButton(props) {
    let themes = {};
    const initialIconState = null;
    const reducer = (state, action) => {
        switch (action.type) {
            case "searchIcon":
                return <RIIcons.RiSearch2Line fontSize="large" />;
            default:
                return state;
        }
    };



    const [stateIcon, dispatchIcon] = useReducer(reducer, initialIconState);
    useEffect(() => {
        dispatchIcon({ type: props.icon });
    }, [props.icon]);

    if (props.theme === "primary") {
        themes = {
            background: "linear-gradient(45deg, #F7DC6F      30%, #F7DC6F    90%)",
            marginRight: 5,
            width: `${props.width}`,
            color: "black"
        };
    }


    return (
        <ButtonGroup disableElevation variant="contained" color="primary" >
            <Button style={themes} {...props}> {stateIcon}</Button>
        </ButtonGroup>


    )
}
