import React, { useRef } from 'react'
// import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

function DialogMessage(deleteItem, stateFilter, setRefreshData, stateRefreshData) {

    const toast = useRef(null);
    const accept = (id, rowIndex) => {
        stateFilter.splice(rowIndex, 1);
        deleteItem(id);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Deleted', life: 3000 });
        setRefreshData({ ...stateRefreshData, value: id, reset: true })
        //  fetchData();
    }


    const confirmDelete = (index, id, itemName) => {
        confirmDialog({
            message: <p>Are you sure you want to delete Item: <b>{[itemName]}</b>?</p>,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => accept(id, index.rowIndex)
        });

    };

    return {
        toast,
        confirmDelete
    }
}

export default DialogMessage
