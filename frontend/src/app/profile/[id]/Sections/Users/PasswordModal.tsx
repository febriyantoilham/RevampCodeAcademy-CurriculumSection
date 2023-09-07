import { getUserByIdRequest, updatePasswordRequest, updateUserRequest } from '@/redux-saga/action/users/usersAction';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { useRouter } from 'next/navigation';

export default function PasswordModal(props: any) {
    const dispatch = useDispatch();
    const route = useRouter();
    const [modal, setModal] = useState(false);
    const user = useSelector((state: any) => state.usersState.response);
    const validationSchema = yup.object().shape({
        oldPassword: yup.string().min(3, "Password must be at least 3 characters").max(10, "Password must not exceed 10 characters").required("Password is required"),
        newPassword: yup.string().min(3, "Password must be at least 3 characters").max(10, "Password must not exceed 10 characters").required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), undefined], "Passwords must match").required("Confirm Password is required"),
    });

    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;

    const formik = useFormik({
        initialValues: {
            oldPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload = {
              id: dataUsers.userEntityId,
              data: {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
              }
            }
            dispatch(updatePasswordRequest(payload));
        },
    });
    
    
    useEffect(() => {
        if(user && user.success){
            setModal(false);
            route.refresh();
            props.setAlertInfo({ showAlert: true, alertText: 'Waiting...', alertType: 'success'});
        }
    }, [props, route, user]);

  return (
    <>
        <div className="flex-1 link link-hover capitalize font-medium text-sm" onClick={handleChange}>Edit Password</div>

        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className='w-full flex flex-col gap-5'>
                    <h3>Edit Profile</h3>
                    <hr />
                    <div className='flex flex-col w-full gap-2'>
                        <div className="flex w-full flex-col gap-1">
                            <label className="mb-2 font-medium">Old Password</label>
                            <input type="password" id="oldPassword" placeholder="Old Password" className="input input-bordered input-md w-full" defaultValue={formik.values.oldPassword} onChange={formik.handleChange} required/>
                            {formik.touched.oldPassword && formik.errors.oldPassword && (
                                <p className="text-red-500 text-sm">{formik.errors.oldPassword}</p>
                            )}
                            {user && !user.success && (
                                <p className="text-red-500 text-sm">Wrong Password</p>
                            )}
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label className="mb-2 font-medium">New Password</label>
                            <input type="password" id="newPassword" placeholder="New Password" className="input input-bordered input-md w-full" defaultValue={formik.values.newPassword} onChange={formik.handleChange} required/>
                            {formik.touched.newPassword && formik.errors.newPassword && (
                                <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
                            )}
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label className="mb-2 font-medium">Confirm Password</label>
                            <input type="password" id="confirmPassword" placeholder="Confirm Password" className="input input-bordered input-md w-full" defaultValue={formik.values.confirmPassword} onChange={formik.handleChange} required/>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                            )}
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
