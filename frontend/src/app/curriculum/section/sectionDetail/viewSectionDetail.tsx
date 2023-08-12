import { AddSectionRequest } from "@/redux-saga/action/sectionAction";
import { AddSectionDetailRequest, DeleteSectionDetailRequest } from "@/redux-saga/action/sectionDetailAction";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import config from "@/config/config";
import EditSectionDetailPage from "./editSectionDetail";

export default function ViewSectionDetailPage(props: any) {
    const dispatch = useDispatch();
    const [view, setview] = useState(true);
    const [imageExists, setImageExists] = useState(true);

    const [editView, setEditView] = useState(false);

    function handleChange() {
        setview(!view);
        props.setview()
    }

    const progEntityId = props.progEntityId;
    const section = props.section;

    console.log(`progEntityId: ${progEntityId}, section: ${JSON.stringify(section)}`);

    const handleImageError = () => {
        setImageExists(false);
    };
    
    const onDelete = () => {
        dispatch(DeleteSectionDetailRequest(section.secdId));
        props.setview();
    }

    return (
        <>
            {editView ? (<>
                <EditSectionDetailPage data = {section} setview = {setEditView} setViewEdit = {handleChange} setRefreshView={props.setRefreshView} setRefreshEdit={props.setRefreshEdit} setAlertInfo={props.setAlertInfo}/>
            </>)
            :(<>    
                <div className="">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-lg">
                            Create Section Detail
                        </h3>
                        <button type="button" className="btn btn-sm" onClick={handleChange}>
                            Close
                        </button>
                    </div>
                    <div className="border-t border-gray-300 my-3"></div>
                    <div className="flex">
                        <div className="card w-full bg-base-100 border-2 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title capitalize">{section.secdTitle}</h2>
                                {section.sectionDetailMaterials.length !== 0 ? (
                                    section.sectionDetailMaterials[0].sedmFiletype === 'image' ? (<>
                                        <div className="avatar mb-3">
                                            <div className="w-24 m-auto">
                                                {section?.sectionDetailMaterials[0].sedmFilename === null || section?.sectionDetailMaterials[0].sedmFilename === '' ? (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>) : imageExists ? (<Image src={`${config.domain}/curriculum/getImage/${section?.sectionDetailMaterials[0].sedmFilename}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleImageError}/>) : (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>)}
                                            </div>
                                        </div>
                                    </>) : (<></>)
                                ) : (<></>)}
                            </div>
                        </div>
                    </div>
                        {props.view ? (<></>):(
                        <div className="modal-action">
                            <button type="button" className="btn btn-error btn-sm" onClick={onDelete}>
                                Delete
                            </button>
                            <button type="button" className="btn btn-neutral btn-sm" onClick={()=>{setEditView(true)}}>
                                Edit
                            </button>
                        </div>
                        )}
                </div>
            </>)}
        </>
    )
}
