import CustomSelect from '@/app/ui/customSelect';
import { createUserAddressRequest, editUserAddressRequest } from '@/redux-saga/action/users/userAddressAction';
import { editUserExperiencesRequest } from '@/redux-saga/action/users/userExperiencesAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

export default function UserExperiencesEditModal(props: any) {
    const dispatch = useDispatch();
    const dataUsers = props.dataUsers;
    const city = props.city.data.result;
    const [modal, setModal] = useState(false);
    const [isChecked, setIsChecked] = useState(dataUsers.usexIsCurrent === '1' ? true : false);

    function handleChange() {
        setModal(!modal);
    }

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

    const startDate = formatDate(dataUsers.usexStartDate);
    const endDate = formatDate(dataUsers.usexEndDate);

    const formik = useFormik({
        initialValues: {
            usexTitle: dataUsers.usexTitle,
            usexProfileHeadline: dataUsers.usexProfileHeadline,
            usexEmploymentType: dataUsers.usexEmploymentType,
            usexCompanyName: dataUsers.usexCompanyName,
            usexStartDate: startDate,
            usexEndDate: endDate,
            usexIndustry: dataUsers.usexIndustry,
            usexDescription: dataUsers.usexDescription,
            usexExperienceType: dataUsers.usexExperienceType,
            usexCityId: dataUsers.usexCityId,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const payload = {
                userEntityId: dataUsers.usexEntityId,
                id: dataUsers.usexId,
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

            console.log(JSON.stringify(payload));
            

            dispatch(editUserExperiencesRequest(payload));
            handleChange();
            props.setAlertInfo({ showAlert: true, alertText: 'Waiting...', alertType: 'success'});
        },
    });
    
    const cityOptions = city.map((item: any) => ({
        value: item.cityId,
        label: item.cityName,
    }))

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
                                <label htmlFor="usexTitle" className="mb-2 font-medium">Job Title</label>
                                <input type="text" id="usexTitle" placeholder="Job Title" defaultValue={formik.values.usexTitle} onChange={formik.handleChange} className="input input-bordered w-full"/>
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
                                <CustomSelect options={cityOptions} defaultValue={cityOptions.find((option: any) => option.value === formik.values.usexCityId)} onChange={formik.setFieldValue} id={'usexCityId'}/>
                            </div>
                            <div className='flex justify-between gap-3'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usexStartDate" className="mb-2 font-medium">Start</label>
                                    <input type="date" id="usexStartDate" placeholder="Start" defaultValue={formik.values.usexStartDate} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                    
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usexEndDate" className="mb-2 font-medium">Until</label>
                                    <div className='flex gap-2 items-center'>
                                        <input type="date" id="usexEndDate" placeholder="Until" defaultValue={isChecked ? undefined : formik.values.usexEndDate} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                        <div className='flex gap-3'>
                                        <input type="checkbox" className="checkbox" onChange={(event) => {
                                            setIsChecked(event.target.checked ? true : false);
                                        }} checked={ isChecked }/>
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
