import { createUserEmailRequest, editUserEmailRequest } from '@/redux-saga/action/users/userEmailsAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function UserEmailsEditModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;

    const formik = useFormik({
        initialValues: {
            pmailAddress: dataUsers.pmailAddress,
        },
        onSubmit: async (values: any) => {
            const payload = {
              userEntityId: dataUsers.pmailEntityId,
              id: dataUsers.pmailId,
              data: {
                pmailAddress: values.pmailAddress,
              }
            }
            dispatch(editUserEmailRequest(payload));
            handleChange();
            props.setAlertInfo({ showAlert: true, alertText: 'Waiting...', alertType: 'success'});
        },
    });

  return (
    <>
        <div className="flex-none btn btn-sm btn-neutral btn-square capitalize" onClick={handleChange}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
        </div>

        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className='w-full flex flex-col gap-5'>
                    <h3>Edit Email</h3>
                    <hr />
                    <div className="flex flex-col">
                        <label htmlFor="pmailAddress" className="mb-2 font-medium">Email</label>
                        <input type="text" id="pmailAddress" placeholder="Email" defaultValue={formik.values.pmailAddress} onChange={formik.handleChange} className="input input-bordered w-full"/>
                    </div>
                    <hr />
                    <div className="flex justify-end gap-x-2">
                        <button type="button" className="btn btn-primary btn-sm" onClick={()=> formik.handleSubmit()}>Save</button>
                        <button type="button" className="btn btn-neutral btn-sm" onClick={handleChange}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
