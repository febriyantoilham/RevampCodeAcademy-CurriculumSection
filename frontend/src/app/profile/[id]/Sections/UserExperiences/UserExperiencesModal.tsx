import { createUserAddressRequest } from '@/redux-saga/action/users/userAddressAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import CustomSelect from "@/app/ui/customSelect";
import { createUserExperiencesRequest } from '@/redux-saga/action/users/userExperiencesAction';

export default function UserExperiencesModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const validationSchema = yup.object().shape({
        usexTitle: yup.string().required("This is required!"),
        usexEmploymentType: yup.string().required("This is required!"),
        usexCompanyName: yup.string().required("This is required!"),
        usexStartDate: yup.string().required("This is required!"),
    });


    function handleChange() {
        setModal(!modal);
    }

    
    const dataUsers = props.dataUsers;
    const city = props.city.data.result;

    const formik = useFormik({
        initialValues: {
            usexTitle: undefined,
            usexProfileHeadline: undefined,
            usexEmploymentType: undefined,
            usexCompanyName: undefined,
            usexIsCurrent: undefined,
            usexStartDate: undefined,
            usexEndDate: undefined,
            usexIndustry: undefined,
            usexDescription: undefined,
            usexExperienceType: undefined,
            usexCityId: undefined,
        },
        enableReinitialize: false,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload = {
              id: dataUsers.userEntityId,
              data: {
                usexTitle: values.usexTitle,
                usexProfileHeadline: values.usexProfileHeadline,
                usexEmploymentType: values.usexEmploymentType,
                usexCompanyName: values.usexCompanyName,
                usexIsCurrent: isChecked ? 1 : 0,
                usexStartDate: values.usexStartDate,
                usexEndDate: isChecked ? null : values.usexEndDate,
                usexIndustry: values.usexIndustry,
                usexDescription: values.usexDescription,
                usexExperienceType: values.usexExperienceType,
                usexCityId: values.usexCityId,
              }
            }

            // console.log(`Valus: ${JSON.stringify(payload)}`);
            

            dispatch(createUserExperiencesRequest(payload));
            handleChange();
            props.setAlertInfo({ showAlert: true, alertText: 'Waiting...', alertType: 'success'});
        },
    });
    
    const cityOptions = city?.map((item: any) => ({
        value: item.cityId,
        label: item.cityName,
    }))

    // console.log(isChecked);

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
                                <label htmlFor="usexTitle" className="mb-2 font-medium">Job Title</label>
                                <input type="text" id="usexTitle" placeholder="Job Title" defaultValue={formik.values.usexTitle} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                {formik.touched.usexTitle && formik.errors.usexTitle && (
                                    <p className="text-red-500 text-sm">{formik.errors.usexTitle}</p>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usexProfileHeadline" className="mb-2 font-medium">Job Headline</label>
                                <input type="text" id="usexProfileHeadline" placeholder="Job Headline" defaultValue={formik.values.usexProfileHeadline} onChange={formik.handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usexCompanyName" className="mb-2 font-medium">Company</label>
                                <input type="text" id="usexCompanyName" placeholder="Company Name" defaultValue={formik.values.usexCompanyName} onChange={formik.handleChange} className="input input-bordered w-full"/>
                            </div>
                            {/* City */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="usexCityId" className="mb-2 font-medium">City</label>
                                <CustomSelect options={cityOptions} defaultValue={cityOptions?.find((option: any) => option.value === formik.values.usexCityId)} onChange={formik.setFieldValue} id={'usexCityId'}/>
                            </div>
                            <div className='flex justify-between gap-3'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usexStartDate" className="mb-2 font-medium">Start</label>
                                    <input type="date" id="usexStartDate" placeholder="Start" defaultValue={formik.values.usexStartDate} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                    {formik.touched.usexStartDate && formik.errors.usexStartDate && (
                                        <p className="text-red-500 text-sm">{formik.errors.usexStartDate}</p>
                                    )}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usexEndDate" className="mb-2 font-medium">Until</label>
                                    <div className='flex gap-2 items-center'>
                                        <input type="date" id="usexEndDate" placeholder="Until" defaultValue={formik.values.usexEndDate} onChange={formik.handleChange} className="input input-bordered w-full" disabled = {isChecked && true}/>
                                        <div className='flex gap-3'>
                                        <input type="checkbox" className="checkbox" onChange={(event) => {
                                            setIsChecked(event.target.checked ? true : false);
                                        }} checked={ isChecked === true}/>
                                        <label htmlFor="usexEndDate" className="mb-2 font-medium">Current</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usexIndustry" className="mb-2 font-medium">Company Industry</label>
                                <input type="text" id="usexIndustry" placeholder="Company Industry" defaultValue={formik.values.usexIndustry} onChange={formik.handleChange} className="input input-bordered w-full"/>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usexEmploymentType" className="mb-2 font-medium">Employment Type</label>
                                {/* <input type="text" id="usexEmploymentType" placeholder="Employment Type" defaultValue={formik.values.usexEmploymentType} onChange={formik.handleChange} className="input input-bordered w-full"/> */}
                                <select id="usexEmploymentType" className="select input-bordered w-full capitalize" defaultValue={formik.values.usexEmploymentType || 'Choose'} onChange={formik.handleChange}>
                                    <option value={undefined} disabled>Choose</option>
                                    <option value={'fulltime'}>Fulltime</option>                                    
                                    <option value={'freelance'}>Freelance</option>                                    
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usexDescription" className="mb-2 font-medium">Description</label>
                                <textarea id="usexDescription" className="textarea textarea-bordered h-24" placeholder="Description" defaultValue={formik.values.usexDescription} onChange={formik.handleChange}></textarea>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="usexExperienceType" className="mb-2 font-medium">Experience Type</label>
                                <select id="usexExperienceType" className="select input-bordered w-full capitalize" defaultValue={formik.values.usexExperienceType || 'Choose'} onChange={formik.handleChange}>
                                    <option value={undefined} disabled>Choose</option>
                                    <option value={'company'}>Company</option>
                                    <option value={'certified'}>Certified</option>
                                    <option value={'voluntering'}>Voluntering</option>
                                    <option value={'organization'}>Organization</option>
                                    <option value={'reward'}>Reward</option>
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
