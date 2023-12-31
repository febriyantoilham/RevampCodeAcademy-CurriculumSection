import { CreateSectionRequest } from "@/redux-saga/action/curriculum/sectionAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreateSectionPage(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [modalKey, setModalKey] = useState(0);

    function handleChange() {
        formik.setValues({sectTitle: '', sectDescription: '',});
        setModal(!modal);
        setModalKey((key) => key + 1);
    }
    
    const formik = useFormik({
        initialValues: {
            sectTitle: '',
            sectDescription: '',
        },
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            const data = {
              progEntityId: props.progEntityId,
              payload: {
                sectTitle: values.sectTitle,
                sectDescription: values.sectDescription,
            }
        }
        
        dispatch(CreateSectionRequest(data));
        props.setRefresh(false);
        props.setRefresh(true);
        handleChange();
        },
    });

    
    return (
        <>
            <button type="button" className="btn btn-neutral btn-sm" onClick={handleChange} disabled={!props.onEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Add New Section</span>
            </button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle" key={modalKey}>
                <div className="modal-box">
                    <div className="">
                        <h3 className="font-medium text-lg">
                            Create Section
                        </h3>
                        <div className="border-t border-gray-300 my-3"></div>
                        <div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="sectTitle" className="mb-2 font-medium">Section Name</label>
                                <input type="text" id="sectTitle" placeholder="section name" defaultValue={formik.values.sectTitle} onChange={formik.handleChange} className="input input-bordered w-full capitalize text-base"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="sectDescription" className="mb-2 font-medium">Section Description</label>
                                <textarea id="sectDescription" placeholder="Section Description" defaultValue={formik.values.sectDescription} onChange={formik.handleChange} className="textarea textarea-bordered h-24 text-base"/>
                            </div>
                            <div className="modal-action">
                                <button type="button" className="btn btn-primary btn-sm" onClick={()=> formik.handleSubmit()}>
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
