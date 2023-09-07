import { createUserEmailRequest } from '@/redux-saga/action/users/userEmailsAction';
import { createUserPhoneRequest } from '@/redux-saga/action/users/userPhonesAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function UserPhonesModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;

    const formik = useFormik({
        initialValues: {
            uspoNumber: undefined,
            uspoPontyCodeValue: undefined,
        },
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            const payload = {
              id: dataUsers.userEntityId,
              data: {
                uspoNumber: values.uspoNumber,
                uspoPontyCodeValue: values.uspoPontyCodeValue,
              }
            }

            dispatch(createUserPhoneRequest(payload));
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
                    <h3>Add Number</h3>
                    <hr />
                    <div className='flex w-full gap-3'>
                        <div className="flex flex-col w-full">
                            <label htmlFor="uspoNumber" className="mb-2 font-medium">Number</label>
                            <input type="text" id="uspoNumber" placeholder="eg. 083219876541" defaultValue={formik.values.uspoNumber} onChange={formik.handleChange} className="input input-bordered w-full"/>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="uspoPontyCodeValue" className="mb-2 font-medium">Number Type</label>
                            <select id="uspoPontyCodeValue" className="select input-bordered w-full capitalize" defaultValue={'Choose'} onChange={formik.handleChange}>
                                <option disabled>Choose</option>
                                <option className="capitalize">Cell</option>
                                <option className="capitalize">Home</option>
                            </select>
                        </div>
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
