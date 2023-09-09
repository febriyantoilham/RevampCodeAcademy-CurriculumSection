import { getUserByIdRequest, updateUserPhotoRequest, updateUserRequest } from '@/redux-saga/action/users/usersAction';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import config from '@/config/config';

export default function UserPhotoModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    // Image
    const [previewImg, setPreviewImg] = useState<any>();
    const [upload, setUpload] = useState(false);
    const [imageExists, setImageExists] = useState(true);
    const [changeImage, setChangeImage] = useState(false);
    const handleImageError = () => {
        setImageExists(false);
    };

    let dataUsers = props.dataUsers;

    function handleChange() {
        setModal(!modal);
        dataUsers = null;
    }


    const formik = useFormik({
        initialValues: {
            file: '',
        },
        onSubmit: async (values: any) => {
            const payload = new FormData();
            payload.append("file", values.file);

            const data = {
                id: dataUsers.userEntityId,
                data: payload
            }
            
            dispatch(updateUserPhotoRequest(data));
            handleChange();
            setPreviewImg('');
            setChangeImage(false);
            setUpload(false);
            props.setAlertInfo({ showAlert: true, alertText: 'Waiting...', alertType: 'success'});
        },
    });

    // Handle Image Upload
    const uploadConfig = (name: any) => (e: any) => {
        let reader = new FileReader();
        const image = e.target.files[0];
        reader.onload = () => {
        setPreviewImg(reader.result);
        };
        reader.readAsDataURL(image);
        formik.setFieldValue("file", image);
        setUpload(true);
    };
    
    const onClear = (event: any) => {
        event.preventDefault();
        setPreviewImg('');
        setUpload(false);
    };

  return (
    <>
        <button className="group btn btn-circle w-32 h-32 relative overflow-hidden" type='button' onClick={handleChange}>
              <div className="w-full h-full absolute">
                {dataUsers?.userPhoto === null || dataUsers?.userPhoto === '' ? (<>
                <Image src="/userDefault.png" alt={""} layout="fill" objectFit="contain"/>
                </>
                ) : imageExists ? (<Image src={`${config.domain}/users/users/profile/photo/${dataUsers.userPhoto}`} alt={""} layout="fill" objectFit="contain" onError={handleImageError}/>) : (<div className="w-full h-full bg-black flex flex-col justify-center items-center">
                    <span className="text-white">Image</span>
                    <span className="text-white">Not Found/</span>
                    <span className="text-white">Error</span>
                  </div>)}
              </div>
              <div className="invisible group-hover:visible z-10 w-full h-full flex justify-center items-center relative">
                <div className="bg-black opacity-50 w-full h-full absolute"></div>
                <div className="z-10 text-base text-white capitalize">Change</div>
              </div>
            </button>

        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className='w-full flex flex-col gap-5'>
                    <h3>Photo Profile</h3>
                    <hr />
                    <div className='flex flex-col w-full gap-y-5'>
                        <div className="flex justify-center avatar">
                            <div className="w-60 mask mask-squircle">
                                {!upload ? (
                                    dataUsers.userPhoto === null || dataUsers.userPhoto === '' ?
                                        (<Image src="/userDefault.png" alt={"x"} layout="fill" objectFit="contain"/>) :
                                        imageExists ?
                                            (<Image src={`${config.domain}/users/users/profile/photo/${dataUsers.userPhoto}`} alt={""} layout="fill" objectFit="contain" onError={handleImageError}/>):
                                            (<div className="w-full h-full bg-black flex flex-col justify-center items-center">
                                                <span className="text-white">Image</span>
                                                <span className="text-white">Not Found/</span>
                                                <span className="text-white">Error</span>
                                            </div>)
                                ):(<Image src={previewImg} alt={"x"} layout="fill" objectFit="contain"/>)}
                            </div>
                        </div>
                        <hr />
                        <div className="flex">
                            {!changeImage ? (
                                <div className="w-full flex justify-end gap-x-2">
                                    <button onClick={() => setChangeImage(true)} className="btn btn-primary btn-sm">Change Image</button>
                                    <button type="button" className="btn btn-neutral btn-sm" onClick={handleChange}>Cancel</button>
                                </div>
                            ):(
                                <div className="w-full flex justify-center flex-col">
                                    <input type="file" id="file" name="file" className="file-input file-input-bordered w-full max-w-xs m-auto" onChange={uploadConfig('file')}/>
                                    <div className="flex justify-center">
                                    <a className="btn btn-error btn-outline btn-sm text-center mt-5 mx-2" onClick={(event) => {setChangeImage(false); onClear(event)}}>Cancel</a>
                                    {upload === true ? (
                                    <>
                                    <a className='btn btn-primary btn-sm mt-5 mx-2' onClick={() => formik.handleSubmit()}>
                                        Submit
                                    </a>
                                    </>
                                    ) : (<></>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
