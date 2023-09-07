import { AddSectionRequest } from "@/redux-saga/action/sectionAction";
import { UpdateSectionDetailRequest } from "@/redux-saga/action/sectionDetailAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import config from "@/config/config";

export default function EditSectionDetailPage(props: any) {
    const dispatch = useDispatch();
    const [view, setView] = useState(true);
    
    // File
    const [preview, setPreview] = useState<any>();
    const [previewType, setPreviewType] = useState('');

    const [upload, setUpload] = useState(false);
    const [fileExists, setFileExists] = useState(true);
    const [changeFile, setChangeFile] = useState(false);

    function handleChange() {
        setView(false);
        props.setView()
    }

    const section = props.data;
    const fileType = section.sectionDetailMaterials[0].sedmFiletype

    const formik = useFormik({
        initialValues: {
            secdTitle: section.secdTitle,
            secdMinute: section.secdMinute,
            sedmFiletype: fileType,
            file: '',
        },
        onSubmit: async (values: any) => {
            const payload = new FormData();
            payload.append("file", values.file);
            payload.append("secdTitle", values.secdTitle);
            payload.append("secdMinute", values.secdMinute);
            payload.append("sedmFiletype", values.sedmFiletype);

            const data = {
                secdId: section.secdId,
                data: payload
            }

            dispatch(UpdateSectionDetailRequest(data));
            handleChange();
            props.setRefresh(true)
        },
    });

    // Handle Image Upload
    const uploadConfig = (name: any) => (e: any) => {
        let reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setPreviewType(file.type.split('/')[0]);
        formik.setFieldValue("file", file);
        setUpload(true);
    };

    const onClear = (event: any) => {
        event.preventDefault();
        setPreview('');
        setUpload(false);
    };

    const handleFileError = () => {
        setFileExists(false);
    };

    return (
        <div className="">
            <h3 className="font-bold text-lg">
                Update Section Detail (#{section.secdId})
            </h3>
            <div className="border-t border-gray-300 my-3"></div>
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                    <div className="flex justify-start">
                        <div className="card w-full bg-transparent border-2 shadow-sm">
                            <div className="card-body">
                                {upload === false ? (
                                <>
                                    {section?.sectionDetailMaterials.length !== 0 ? 
                                        (
                                            fileType === null || fileType === '' ? (<>
                                                <div className="avatar mb-3">
                                                    <div className="w-24 m-auto">
                                                        <Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>
                                                    </div>
                                                </div>
                                            </>) : fileType === 'image' ? (
                                                fileExists ? (<>
                                                    <div className="avatar mb-3">
                                                        <div className="w-24 m-auto">
                                                            <Image src={`${config.domain}/program_entity/subsection/get/file/${section?.sectionDetailMaterials[0].sedmFilename}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleFileError}/>
                                                        </div>
                                                    </div>
                                                </>) : 
                                                (<>
                                                    <div className="avatar mb-3">
                                                        <div className="w-24 m-auto">
                                                            <Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>
                                                        </div>
                                                    </div>
                                                </>)
                                            ) : fileType === 'video' ? (<>
                                                <video controls>
                                                    <source src={`${config.domain}/program_entity/subsection/get/file/${section?.sectionDetailMaterials[0].sedmFilename}`}/>
                                                </video>
                                            </>) :
                                            (<></>)
                                        ):(<></>)
                                    }
                                </>
                                ):(
                                <div className="flex justify-center">
                                    {previewType === formik.values.sedmFiletype ? (
                                        formik.values.sedmFiletype === 'image' ? (<>
                                            <div className="avatar mb-3">
                                                <div className="w-24 mask mask-squircle m-auto">
                                                    <Image src={preview} alt={"x"} layout="fill" objectFit="contain"/>
                                                </div>
                                            </div>
                                        </>) : 
                                        formik.values.sedmFiletype === 'video' ? (<>
                                            <video controls>
                                                <source src={`${preview}`}/>
                                            </video>
                                        </>) : (<></>)
                                    ):(<p className="text-center">To Show the preview, Please Select Correct File Type!</p>)}
                                </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                    <div className="mt-3">
                        {!changeFile ? (
                            <div className="flex justify-end">
                                <button onClick={() => setChangeFile(true)} className="btn btn-ghost btn-sm capitalize">edit</button>
                            </div>
                        ):(
                        <div className="flex flex-col items-center">
                            <div className="flex gap-x-3">
                                <input type="file" accept=".png,.jpg,.jpeg,.mp4,.avi,.mov" id="file" name="file" className="file-input file-input-bordered w-full max-w-xs m-auto" onChange={uploadConfig('file')}/>
                                <select className="select select-bordered capitalize" id="sedmFiletype" placeholder="File Type" defaultValue={formik.values.sedmFiletype} onChange={formik.handleChange} required>
                                    <option disabled selected>Pick one</option>
                                    <option className="capitalize">video</option>
                                    <option className="capitalize">image</option>
                                    <option className="capitalize">file</option>
                                </select>
                                </div>
                            <div>
                                <a className="btn btn-error btn-sm text-center mt-5" onClick={(event) => {setChangeFile(false); onClear(event)}}>Cancel</a>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col mb-3">
                        <label htmlFor="secdTitle" className="mb-2 font-medium">Sub Section Name</label>
                        <input type="text" id="secdTitle" placeholder="sub section name" defaultValue={formik.values.secdTitle} onChange={formik.handleChange} className="input input-bordered w-full text-base capitalize"/>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="secdMinute" className="mb-2 font-medium">Duration in minutes</label>
                        <input type="number" id="secdMinute" placeholder="section description" defaultValue={formik.values.secdMinute} onChange={formik.handleChange} className="input input-bordered text-base capitalize"/>
                    </div>
                </div>
            </div>
            <div className="modal-action">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => formik.handleSubmit()}>
                Save
                </button>
                <button type="button" className="btn btn-neutral btn-sm" onClick={handleChange}>
                Close
                </button>
            </div>
        </div>
    )
}
