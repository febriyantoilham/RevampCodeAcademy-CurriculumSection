import { createUserEmailRequest } from '@/redux-saga/action/users/userEmailsAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function UserEmailsModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;

    const formik = useFormik({
        initialValues: {
            pmailAddress: undefined,
        },
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            const payload = {
              id: dataUsers.userEntityId,
              data: {
                pmailAddress: values.pmailAddress,
              }
            }

            // console.log(`Payload: ${JSON.stringify(payload)}`);
            
            dispatch(createUserEmailRequest(payload));
            handleChange();
            props.setAlertInfo({ showAlert: true, alertText: 'Waiting...', alertType: 'success'});
        },
    });

  return (
    <>
        <div className="btn btn-sm btn-ghost capitalize" onClick={handleChange}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>

        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className='w-full flex flex-col gap-5'>
                    <h3>Add Email</h3>
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
