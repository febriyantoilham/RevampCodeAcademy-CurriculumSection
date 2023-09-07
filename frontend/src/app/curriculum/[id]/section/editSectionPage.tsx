import { UpdateSectionRequest } from "@/redux-saga/action/sectionAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteSection from "./deleteSectionPage";

export default function EditSectionPage(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    // Delete Section
    const [deleteAlert, setDeleteAlert] = useState(false);

    function handleChange() {
        if(deleteAlert){
            setDeleteAlert(!deleteAlert);
        }
        setModal(!modal);
    }
    
    const section = props.section
    const program = props.program
    
    const formik = useFormik({
        initialValues: {
            sectId: section.sectId,
            sectTitle: section.sectTitle,
            sectDescription: section.sectDescription,
        },
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            const data = {
              sectId: section.sectId,
              progEntityId: program.progEntityId,
              data: {
                sectTitle: values.sectTitle,
                sectDescription: values.sectDescription,
              }
            }
            dispatch(UpdateSectionRequest(data));
            handleChange();
            props.setRefresh(true);
        },
    });

    return (
        <>
            <button type="button" className="btn btn-ghost btn-sm btn-square" onClick={handleChange}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {deleteAlert ? (<DeleteSection setView={handleChange} progId={program.progEntityId} section={section.sectId} setRefresh={props.setRefresh}/>
                    ):(
                        <>
                            <div className="">
                                <h3 className="font-bold text-lg">
                                    Section (#{section.sectId})
                                </h3>
                                <div className="border-t border-gray-300 my-3"></div>
                                <div>
                                    <div className="flex flex-col mb-3">
                                        <label htmlFor="sectTitle" className="mb-2 font-medium">Section Name</label>
                                        <input type="text" id="sectTitle" placeholder="section name" defaultValue={formik.values.sectTitle} onChange={formik.handleChange} className="input input-bordered w-full capitalize"/>
                                    </div>
                                    <div className="flex flex-col mb-3">
                                        <label htmlFor="sectDescription" className="mb-2 font-medium">Section Description</label>
                                        <textarea id="sectDescription" placeholder="section description" defaultValue={formik.values.sectDescription} onChange={formik.handleChange} className="textarea textarea-bordered h-24"/>
                                    </div>
                                    <div className="modal-action justify-between items-center">
                                        <button type="button" className="btn btn-outline btn-sm btn-error" onClick={() => setDeleteAlert(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                            <span>Delete</span>
                                        </button>
                                        <div className="flex justify-end gap-x-2">
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
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
