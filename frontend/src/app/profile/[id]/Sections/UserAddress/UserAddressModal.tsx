import { createUserAddressRequest } from '@/redux-saga/action/users/userAddressAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import CustomSelect from "@/app/ui/customSelect";

export default function UserAddressModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const validationSchema = yup.object().shape({
        addrLine1: yup.string().required("This is required!"),
        addrPostalCode: yup.string().required("This is required!"),
        addrCityId: yup.string().required("This is required!"),
        etadAdtyId: yup.string().required("This is required!"),
    });


    function handleChange() {
        setModal(!modal);
    }

    const dataUsers = props.dataUsers;
    const addressType = props.addressType.data.result;
    const city = props.city.data.result;

    const formik = useFormik({
        initialValues: {
            addrLine1: undefined,
            addrLine2: undefined,
            addrPostalCode: undefined,
            addrCityId: undefined,
            etadAdtyId: undefined,
        },
        enableReinitialize: false,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const payload = {
              id: dataUsers.userEntityId,
              data: {
                addrLine1: values.addrLine1,
                addrLine2: values.addrLine2 === undefined ? '-' : values.addrLine2,
                addrPostalCode: values.addrPostalCode,
                etadAdtyId: values.etadAdtyId,
                addrCityId: values.addrCityId,
              }
            }

            dispatch(createUserAddressRequest(payload));
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
                                <label htmlFor="addrLine1" className="mb-2 font-medium">Address 1</label>
                                <textarea id="addrLine1" className="textarea textarea-bordered h-24" placeholder="Address 1" defaultValue={formik.values.addrLine1} onChange={formik.handleChange}></textarea>
                                {formik.touched.addrLine1 && formik.errors.addrLine1 && (
                                    <p className="text-red-500 text-sm">{formik.errors.addrLine1}</p>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="addrLine2" className="mb-2 font-medium">Address 2</label>
                                <textarea id="addrLine2" className="textarea textarea-bordered h-24" placeholder="Address 2" defaultValue={formik.values.addrLine2} onChange={formik.handleChange}></textarea>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="addrPostalCode" className="mb-2 font-medium">Postal Code</label>
                                    <input type="number" id="addrPostalCode" placeholder="Postal Code" defaultValue={formik.values.addrPostalCode} onChange={formik.handleChange} className="input input-bordered w-full"/>
                                    {formik.touched.addrPostalCode && formik.errors.addrPostalCode && (
                                        <p className="text-red-500 text-sm">{formik.errors.addrPostalCode}</p>
                                    )}
                                </div>
                                {/* City */}
                                <div className="flex flex-col w-full">
                                    <label htmlFor="addrCityId" className="mb-2 font-medium">City</label>
                                    <CustomSelect options={cityOptions} defaultValue={cityOptions.find((option: any) => option.value === formik.values.addrCityId)} onChange={formik.setFieldValue} id={'addrCityId'}/>
                                    {formik.touched.addrCityId && formik.errors.addrCityId && (
                                        <p className="text-red-500 text-sm">{formik.errors.addrCityId}</p>
                                    )}
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
                                {formik.touched.etadAdtyId && formik.errors.etadAdtyId && (
                                        <p className="text-red-500 text-sm">{formik.errors.etadAdtyId}</p>
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
