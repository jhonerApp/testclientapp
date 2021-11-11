import React, { useReducer, useEffect } from "react";
import { red, blueGrey } from "@material-ui/core/colors";
import * as FIIcons from "react-icons/fi";
import * as BIIcons from "react-icons/bi";

import IconButton from "@material-ui/core/IconButton";

export default function IconThemeButton(props) {
    const initialIconState = null;
    const reducer = (state, action) => {
        switch (action.type) {
            case "deleteIcon":
                return <FIIcons.FiTrash2 fontSize="large" />;
            case "editIcon":
                return <FIIcons.FiEdit fontSize="large" />;
            case "assignIcon":
                return <BIIcons.BiNavigation fontSize="large" />;
            default:
                return state;
        }
    };

    const [stateIcon, dispatchIcon] = useReducer(reducer, initialIconState);

    useEffect(() => {
        dispatchIcon({ type: props.icon });
    }, [props.icon]);

    let themes = {};
    if (props.theme === "primary") {
        themes = {
            background: "linear-gradient(45deg, #1A5276 30%, #1A5276      90%)",
            marginRight: 5,
            color: "white",

        };
    }
    if (props.theme === "danger") {
        themes = {
            background: "linear-gradient(45deg, #A93226   30%, #A93226     90%)",
            marginRight: 5,
            color: "white",
        };
    }

    if (props.theme === "info") {
        themes = {
            background: "linear-gradient(45deg, #1ABC9C    30%, #1ABC9C      90%)",
            marginRight: 5,
            color: "white",
        };
    }


    return (
        <IconButton
            {...props}
            style={themes}
        >
            {stateIcon}
        </IconButton>


    );
}
