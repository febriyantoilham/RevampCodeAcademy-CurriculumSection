import CustomSelect from '@/app/ui/customSelect';
import { createUserAddressRequest, editUserAddressRequest } from '@/redux-saga/action/users/userAddressAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

export default function UserAddressEditModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;
    const addressType = props.addressType.data.result;
    const city = props.city.data.result;

    const formik = useFormik({
        initialValues: {
            addrLine1: dataUsers.etadAddr.addrLine1,
            addrLine2: dataUsers.etadAddr.addrLine2,
            addrPostalCode: dataUsers.etadAddr.addrPostalCode,
            addrCityId: dataUsers.etadAddr.addrCityId,
            etadAdtyId: dataUsers.etadAdtyId,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const payload = {
                userEntityId: dataUsers.etadEntityId,
                id: dataUsers.etadAddrId,
                data: {
                    addrLine1: values.addrLine1,
                    addrLine2: values.addrLine2 === undefined ? '-' : values.addrLine2,
                    addrPostalCode: values.addrPostalCode,
                    etadAdtyId: values.etadAdtyId,
                    addrCityId: values.addrCityId,
                }
            }

            dispatch(editUserAddressRequest(payload));
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
                                <label htmlFor="addrLine1" className="mb-2 font-medium">Address 1</label>
                                <textarea id="addrLine1" className="textarea textarea-bordered h-24" placeholder="Address 1" defaultValue={formik.values.addrLine1} onChange={formik.handleChange}></textarea>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="addrLine2" className="mb-2 font-medium">Address 2</label>
                                <textarea id="addrLine2" className="textarea textarea-bordered h-24" placeholder="Address 2" defaultValue={formik.values.addrLine2} onChange={formik.handleChange}></textarea>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="addrPostalCode" className="mb-2 font-medium">Postal Code</label>
                                    <input type="number" id="addrPostalCode" placeholder="Postal Code" defaultValue={formik.values.addrPostalCode} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                </div>
                                {/* City */}
                                <div className="flex flex-col w-full">
                                    <label htmlFor="addrCityId" className="mb-2 font-medium">City</label>
                                    <CustomSelect options={cityOptions} defaultValue={cityOptions.find((option: any) => option.value === formik.values.addrCityId)} onChange={formik.setFieldValue} id={'addrCityId'}/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="etadAdtyId" className="mb-2 font-medium">Address Type</label>
                                <select id="etadAdtyId" className="select input-bordered w-full capitalize" defaultValue={formik.values.etadAdtyId || 'Choose'} onChange={formik.handleChange}>
                                    <option value={undefined} disabled>Choose</option>
                                    {addressType.map((item: any, index:any) => (
                                        <option className="capitalize" key={index} value={item.adtyId}>{item.adtyName}</option>
                                    ))}
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
