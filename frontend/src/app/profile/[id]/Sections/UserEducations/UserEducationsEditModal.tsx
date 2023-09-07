import { createUserAddressRequest } from '@/redux-saga/action/users/userAddressAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import CustomSelect from "@/app/ui/customSelect";
import { createUserEducationsRequest, editUserEducationsRequest } from '@/redux-saga/action/users/userEducationsConstant';

export default function UserEducationsEditModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;

    function formatDate(date: Date) {
        if (date !== null) {
            const formattedDate = new Date(date);
            const year = formattedDate.getFullYear();
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const day = String(formattedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return undefined;
    }

    const startDate = formatDate(dataUsers.usduStartDate);
    const endDate = formatDate(dataUsers.usduEndDate);

    const formik = useFormik({
        initialValues: {
            usduSchool: dataUsers.usduSchool,
            usduDegree: dataUsers.usduDegree,
            usduFieldStudy: dataUsers.usduFieldStudy,
            usduStartDate: startDate,
            usduEndDate: endDate,
            usduGrade: dataUsers.usduGrade,
            usduActivities: dataUsers.usduActivities,
            usduDescription: dataUsers.usduDescription,
        },
        enableReinitialize: false,
        onSubmit: async (values) => {
            const payload = {
              userEntityId: dataUsers.usduEntityId,
              id: dataUsers.usduId,
              data: {
                usduSchool: values.usduSchool,
                usduDegree: values.usduDegree,
                usduFieldStudy: values.usduFieldStudy,
                usduStartDate: values.usduStartDate,
                usduEndDate: values.usduEndDate,
                usduGrade: values.usduGrade,
                usduActivities: values.usduActivities,
                usduDescription: values.usduDescription,
              }
            }

            dispatch(editUserEducationsRequest(payload));
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
                        <h3>Add Address</h3>
                        <hr />
                        <div className='flex flex-col w-full gap-3'>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduSchool" className="mb-2 font-medium">Schools Name</label>
                                <input type="text" id="usduSchool" placeholder="Schools Name" defaultValue={formik.values.usduSchool} onChange={formik.handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduDegree" className="mb-2 font-medium">Degree</label>
                                <select id="usduDegree" className="select input-bordered w-full capitalize" defaultValue={formik.values.usduDegree || 'Choose'} onChange={formik.handleChange}>
                                    <option value={undefined} disabled>Choose</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduFieldStudy" className="mb-2 font-medium">Field Study</label>
                                <input type="text" id="usduFieldStudy" placeholder="Field Study" defaultValue={formik.values.usduFieldStudy} onChange={formik.handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduGrade" className="mb-2 font-medium">Grade</label>
                                <input type="text" id="usduGrade" placeholder="3.54" defaultValue={formik.values.usduGrade} onChange={formik.handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className='flex justify-between gap-3'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usduStartDate" className="mb-2 font-medium">Start</label>
                                    <input type="date" id="usduStartDate" placeholder="Start" defaultValue={formik.values.usduStartDate} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usduEndDate" className="mb-2 font-medium">Until</label>
                                    <input type="date" id="usduEndDate" placeholder="Until" defaultValue={formik.values.usduEndDate} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduActivities" className="mb-2 font-medium">Activities</label>
                                <input type="text" id="usduActivities" placeholder="Activities" defaultValue={formik.values.usduActivities} onChange={formik.handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduDescription" className="mb-2 font-medium">Descriptions</label>
                                <textarea id="usduDescription" className="textarea textarea-bordered h-24" placeholder="Description" defaultValue={formik.values.usduDescription} onChange={formik.handleChange}></textarea>
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
