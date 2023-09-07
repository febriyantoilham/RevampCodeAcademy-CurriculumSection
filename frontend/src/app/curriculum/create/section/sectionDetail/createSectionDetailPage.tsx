import { AddSectionRequest, GetSectionRequest } from "@/redux-saga/action/sectionAction";
import { CreateSectionDetailRequest } from "@/redux-saga/action/sectionDetailAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreateSectionDetailPage(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const progEntityId = props.program.progEntityId;
    const sectId = props.section.sectId;

    const formik = useFormik({
        initialValues: {
            secdTitle: '',
            secdMinute: '',
            sedmFiletype: '',
            file: '',
        },
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            const payload = new FormData();
            payload.append("file", values.file);
            payload.append("sectProgEntityId", progEntityId);
            payload.append("sectId", sectId);
            payload.append("secdTitle", values.secdTitle);
            payload.append("secdMinute", values.secdMinute);
            payload.append("sedmFiletype", values.sedmFiletype);

            dispatch(CreateSectionDetailRequest(payload))
            handleChange();
            props.alert({ showAlert: true, alertText: 'Successfully Added Material', alertType: 'success'});
            // props.setRefresh(true);
        },
    });

    // Handle Image Upload
    const uploadConfig = (name: any) => (e: any) => {
        const image = e.target.files[0];        
        formik.setFieldValue("file", image);
    };

    return (
        <>
            <a className="btn btn-neutral btn-sm" onClick={handleChange}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Create New</span>
            </a>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="">
                        <h3 className="font-bold text-lg">
                            Create Section Detail
                        </h3>
                        <div className="border-t border-gray-300 my-3"></div>
                        <div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="secdTitle" className="mb-2 font-medium">Sub Section Name</label>
                                <input type="text" id="secdTitle" placeholder="sub section name" defaultValue={formik.values.secdTitle} onChange={formik.handleChange} className="input input-bordered w-full text-base capitalize"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="secdMinute" className="mb-2 font-medium">Duration in minutes</label>
                                <input type="number" id="secdMinute" placeholder="section description" defaultValue={formik.values.secdMinute} onChange={formik.handleChange} className="input input-bordered text-base capitalize"/>
                            </div>
                            <div className="flex items-end gap-3">
                                <div className="flex flex-col">
                                    <label htmlFor="sedmFiletype" className="mb-2 font-medium">Attachment Type</label>
                                    <select className="select select-bordered capitalize" id="sedmFiletype" placeholder="File Type" defaultValue={"Pick one"} onChange={formik.handleChange}>
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
                            <div className="modal-action">
                                <button type="button" className="btn btn-primary btn-sm" onClick={() => formik.handleSubmit()}>
                                Save
                                </button>
                                <button type="button" className="btn btn-neutral btn-sm" onClick={handleChange}>
                                Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
