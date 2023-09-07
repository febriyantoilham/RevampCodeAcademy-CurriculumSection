import { createUserEmailRequest, deleteUserEmailRequest } from '@/redux-saga/action/users/userEmailsAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function UserEmailsDeleteModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;

    const onDelete = () => {
        const payload = {
            userEntityId: dataUsers.pmailEntityId,
            id: dataUsers.pmailId,
        }
        dispatch(deleteUserEmailRequest(payload));
        handleChange();
        props.setAlertInfo({ showAlert: true, alertText: 'Waiting...', alertType: 'success'});
    }

  return (
    <>
        <div className="flex-none btn btn-sm btn-error btn-square capitalize text-white" onClick={handleChange}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
        </div>

        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className='w-full flex flex-col gap-5'>
                    <h1 className='capitalize'>are you sure delete this email?</h1>
                    <div className="flex justify-end gap-x-2">
                        <button type="button" className="btn btn-error btn-sm" onClick={()=> onDelete()}>Delete</button>
                        <button type="button" className="btn btn-neutral btn-sm" onClick={handleChange}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
