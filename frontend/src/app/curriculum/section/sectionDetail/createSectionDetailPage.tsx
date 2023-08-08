import { AddSectionRequest } from "@/redux-saga/action/sectionAction";
import { AddSectionDetailRequest } from "@/redux-saga/action/sectionDetailAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreateSectionDetailPage(props: any) {
    const dispatch = useDispatch();
    const [view, setview] = useState(true);

    function handleChange() {
        setview(!view);
        props.setview(false)
    }

    const progEntityId = props.progEntityId;
    const sectId = props.section;

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
            payload.append("secdTitle", values.secdTitle);
            payload.append("secdMinute", values.secdMinute);
            payload.append("sedmFiletype", values.sedmFiletype);

            const data = {
                sectProgEntityId: progEntityId,
                sectId: sectId,
                data: payload
            }

            console.log(`Data: ${JSON.stringify(data)}`);
            

            dispatch(AddSectionDetailRequest(data));
            props.setRefreshView(true);
            props.setRefreshEdit(true);
            handleChange();
            props.setAlertInfo({ showAlert: true, alertText: 'Data Successfully Added!', alertType: 'success'});
        },
    });

    // Handle Image Upload
    const uploadConfig = (name: any) => (e: any) => {
        const image = e.target.files[0];        
        formik.setFieldValue("file", image);
    };

    return (
        <div className="">
            <h3 className="font-bold text-lg">
                Create Section Detail
            </h3>
            <div className="border-t border-gray-300 my-3"></div>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
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
                        <button type="button" className="btn" onClick={handleChange}>
                        Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                    </div>
                </form> 
            </div>
        </div>
    )
}
