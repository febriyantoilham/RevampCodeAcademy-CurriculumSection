import { createUserAddressRequest } from '@/redux-saga/action/users/userAddressAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import CustomSelect from "@/app/ui/customSelect";
import { createUserEducationsRequest } from '@/redux-saga/action/users/userEducationsConstant';

export default function UserEducationsModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const validationSchema = yup.object().shape({
        usduSchool: yup.string().required("This is required!"),
        usduDegree: yup.string().required("This is required!"),
        usduFieldStudy: yup.string().required("This is required!"),
        usduStartDate: yup.string().required("This is required!"),
        usduEndDate: yup.string().required("This is required!"),
        usduGrade: yup.string().required("This is required!"),
    });


    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;

    const formik = useFormik({
        initialValues: {
            usduSchool: undefined,
            usduDegree: undefined,
            usduFieldStudy: undefined,
            usduStartDate: undefined,
            usduEndDate: undefined,
            usduGrade: undefined,
            usduActivities: undefined,
            usduDescription: undefined,
        },
        enableReinitialize: false,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload = {
              id: dataUsers.userEntityId,
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

            console.log(`Payload: ${JSON.stringify(payload)}`);
            
            dispatch(createUserEducationsRequest(payload));
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
                        <h3>Add Address</h3>
                        <hr />
                        <div className='flex flex-col w-full gap-3'>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduSchool" className="mb-2 font-medium">Schools Name</label>
                                <input type="text" id="usduSchool" placeholder="Schools Name" defaultValue={formik.values.usduSchool} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                {formik.touched.usduSchool && formik.errors.usduSchool && (
                                    <p className="text-red-500 text-sm">{formik.errors.usduSchool}</p>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduDegree" className="mb-2 font-medium">Degree</label>
                                <select id="usduDegree" className="select input-bordered w-full capitalize" defaultValue={formik.values.usduDegree || 'Choose'} onChange={formik.handleChange}>
                                    <option value={undefined} disabled>Choose</option>
                                    <option>Diploma</option>
                                    <option>Bachelor</option>
                                </select>
                                {formik.touched.usduDegree && formik.errors.usduDegree && (
                                    <p className="text-red-500 text-sm">{formik.errors.usduDegree}</p>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduFieldStudy" className="mb-2 font-medium">Field Study</label>
                                <input type="text" id="usduFieldStudy" placeholder="Field Study" defaultValue={formik.values.usduFieldStudy} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                {formik.touched.usduFieldStudy && formik.errors.usduFieldStudy && (
                                    <p className="text-red-500 text-sm">{formik.errors.usduFieldStudy}</p>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usduGrade" className="mb-2 font-medium">Grade</label>
                                <input type="text" id="usduGrade" placeholder="3.54" defaultValue={formik.values.usduGrade} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                {formik.touched.usduGrade && formik.errors.usduGrade && (
                                    <p className="text-red-500 text-sm">{formik.errors.usduGrade}</p>
                                )}
                            </div>
                            <div className='flex justify-between gap-3'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usduStartDate" className="mb-2 font-medium">Start</label>
                                    <input type="date" id="usduStartDate" placeholder="Start" defaultValue={formik.values.usduStartDate} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                    {formik.touched.usduStartDate && formik.errors.usduStartDate && (
                                        <p className="text-red-500 text-sm">{formik.errors.usduStartDate}</p>
                                    )}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usduEndDate" className="mb-2 font-medium">Until</label>
                                    <input type="date" id="usduEndDate" placeholder="Until" defaultValue={formik.values.usduEndDate} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                    {formik.touched.usduEndDate && formik.errors.usduEndDate && (
                                        <p className="text-red-500 text-sm">{formik.errors.usduEndDate}</p>
                                    )}
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
