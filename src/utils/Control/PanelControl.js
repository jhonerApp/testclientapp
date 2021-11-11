import React, { useReducer, useEffect, Fragment } from "react";



import * as FAIcons from "react-icons/fa";
import * as IOIcons from "react-icons/io5";
import * as GOIcons from "react-icons/go";
import * as MDIcons from "react-icons/md";
import * as RIIcons from "react-icons/ri";
import * as CGIcons from "react-icons/cg";
import * as IOOIcons from "react-icons/io";

import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';



function PanelControl(props) {

    const initialIconState = null;
    const reducer = (state, action) => {
        switch (action.type) {
            case "studentIcon":
                return <FAIcons.FaRegUserCircle />;
            case "teachertIcon":
                return <CGIcons.CgUserList />;
            case "studentListIcon":
                return <IOOIcons.IoMdList />;
            case "subjectIcon":
                return <FAIcons.FaClipboardList />;
            case "teacherListIcon":
                return <IOIcons.IoListCircleSharp />;
            case "attachmodule":
                return <GOIcons.GoFileSubmodule />;
            case "assignmodule":
                return <MDIcons.MdAssignmentLate />;
            case "exammodule":
                return <FAIcons.FaBookReader />;
            case "sectionmodule":
                return <RIIcons.RiNewspaperFill />;
            case "selectBranch":
                return <IOIcons.IoAlbums/>;
            case "selectFile":
                return <IOIcons.IoDocuments />;


            default:
                return state;
        }
    };
    const [stateIcon, dispatchIcon] = useReducer(reducer, initialIconState);
    useEffect(() => {
        dispatchIcon({ type: props.icon });
    }, [props.icon]);

    return (
        <Panel header={props.header} icons={<Avatar className="p-mr-2" shape="circle" style={{ backgroundColor: '#2E4053', color: '#ffffff' }} >{stateIcon}</Avatar>}>
            {props.children}
        </Panel>
    )
}

export default PanelControl
