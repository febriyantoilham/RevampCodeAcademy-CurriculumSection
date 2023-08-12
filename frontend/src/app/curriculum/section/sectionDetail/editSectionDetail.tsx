import { AddSectionRequest } from "@/redux-saga/action/sectionAction";
import { AddSectionDetailRequest, UpdateSectionDetailRequest } from "@/redux-saga/action/sectionDetailAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import config from "@/config/config";

export default function EditSectionDetailPage(props: any) {
    const dispatch = useDispatch();
    const [view, setview] = useState(true);
    
    // File
    const [preview, setPreview] = useState<any>();
    const [upload, setUpload] = useState(false);
    const [fileExists, setFileExists] = useState(true);
    const [changeFile, setChangeFile] = useState(false);

    function handleChange() {
        setview(!view);
        props.setview(false)
    }

    const section = props.data;

    console.log(`section: ${JSON.stringify(section)}`);
    

    const formik = useFormik({
        initialValues: {
            secdTitle: section.secdTitle,
            secdMinute: section.secdMinute,
            sedmFiletype: '',
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

            // console.log(`Data: ${JSON.stringify(data)}`);
            

            dispatch(UpdateSectionDetailRequest(data));
            props.setRefreshView(true);
            props.setRefreshEdit(true);
            handleChange();
            props.setViewEdit()
            props.setAlertInfo({ showAlert: true, alertText: 'Data Successfully Added!', alertType: 'success'});
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
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="secdTitle" className="mb-2 font-medium">Sub Section Name</label>
                            <input type="text" id="secdTitle" placeholder="sub section name" defaultValue={formik.values.secdTitle} onChange={formik.handleChange} className="input input-bordered w-full text-base capitalize"/>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="secdMinute" className="mb-2 font-medium">Duration in minutes</label>
                            <input type="number" id="secdMinute" placeholder="section description" defaultValue={formik.values.secdMinute} onChange={formik.handleChange} className="input input-bordered text-base capitalize"/>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="card w-full bg-transparent border-2 shadow-sm">
                            <div className="card-body">
                                {upload === false ? (
                                <>
                                    <div className="avatar mb-3">
                                    <div className="w-24 m-auto">
                                        {section?.sectionDetailMaterials.length !== 0 ? 
                                        (
                                            section?.sectionDetailMaterials[0].sedmFilename === null || section?.sectionDetailMaterials[0].sedmFilename === '' ? (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>) : fileExists ? (<Image src={`${config.domain}/curriculum/getImage/${section?.sectionDetailMaterials[0].sedmFilename}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleFileError}/>) : (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>)
                                        ):(<></>)
                                        }
                                    </div>
                                    </div>
                                </>
                                ):(
                                <div className="flex flex-col">
                                <div className="avatar mb-3">
                                    <div className="w-24 mask mask-squircle m-auto">
                                        <Image src={preview} alt={"x"} layout="fill" objectFit="contain"/>
                                    </div>
                                </div>
                                </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                    <div className="">
                        {!changeFile ? (
                            <div className="flex justify-end">
                                <button onClick={() => setChangeFile(true)} className="btn btn-ghost btn-sm capitalize">edit</button>
                            </div>
                        ):(
                        <div className="flex flex-col items-center">
                            <div className="flex items-end gap-3">
                                <div className="flex flex-col">
                                    <label htmlFor="sedmFiletype" className="mb-2 font-medium">Attachment Type</label>
                                    <select className="select select-bordered capitalize" id="sedmFiletype" placeholder="File Type" defaultValue={'Pick one'} onChange={formik.handleChange} required>
                                        <option disabled selected>Pick one</option>
                                        <option className="capitalize">video</option>
                                        <option className="capitalize">image</option>
                                        <option className="capitalize">file</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="file" id="file" name="file" className="file-input file-input-bordered w-full max-w-xs m-auto" onChange={uploadConfig('file')}/>
                                </div>
                            </div>
                            <div>
                                <a className="btn btn-error btn-sm text-center mt-5" onClick={(event) => {setChangeFile(false); onClear(event)}}>Cancel</a>
                            </div>
                        </div>
                        )}
                    </div>
                    
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                        Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                        Save
                        </button>
                    </div>
                </form> 
            </div>
        </div>
    )
}
