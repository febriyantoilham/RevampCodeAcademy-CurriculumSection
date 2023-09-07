import { getUserByIdRequest, updateUserRequest } from '@/redux-saga/action/users/usersAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function UsersModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;

    let birthday;
    if(dataUsers.userBirthDate !== null){
        const date = new Date(dataUsers.userBirthDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        birthday = `${year}-${month}-${day}`;
    } else {
        birthday = undefined;
    }

    const formik = useFormik({
        initialValues: {
            userName: dataUsers.userName,
            userFirstName: dataUsers.userFirstName,
            userLastName: dataUsers.userLastName,
            userBirthDate: birthday,
        },
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            const payload = {
              id: dataUsers.userEntityId,
              data: {
                userName: values.userName,
                userFirstName: values.userFirstName,
                userLastName: values.userLastName,
                userBirthDate: values.userBirthDate,
              }
            }

            console.log(`Payload: ${JSON.stringify(payload)}`);
            
            dispatch(updateUserRequest(payload));
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
                    <h3>Edit Profile</h3>
                    <hr />
                    <div className='flex flex-col w-full gap-2'>
                        <div className="flex flex-col">
                            <label htmlFor="userName" className="mb-2 font-medium">Username</label>
                            <input type="text" id="userName" placeholder="Username" defaultValue={formik.values.userName} onChange={formik.handleChange} className="input input-bordered w-full"/>
                        </div>
                        <div className='flex w-full gap-3'>
                            <div className="flex w-full flex-col">
                                <label htmlFor="userFirstName" className="mb-2 font-medium">First Name</label>
                                <input type="text" id="userFirstName" placeholder="First Name" defaultValue={formik.values.userFirstName} onChange={formik.handleChange} className="input input-bordered w-full capitalize"/>
                            </div>
                            <div className="flex w-full flex-col">
                                <label htmlFor="userLastName" className="mb-2 font-medium">Last Name</label>
                                <input type="text" id="userLastName" placeholder="Last Name" defaultValue={formik.values.userLastName} onChange={formik.handleChange} className="input input-bordered w-full capitalize"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="userBirthDate" className="mb-2 font-medium">Birthday</label>
                            <input type="date" id="userBirthDate" placeholder="Birthday" value={formik.values.userBirthDate} onChange={formik.handleChange} className="input input-bordered w-full"/>
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
