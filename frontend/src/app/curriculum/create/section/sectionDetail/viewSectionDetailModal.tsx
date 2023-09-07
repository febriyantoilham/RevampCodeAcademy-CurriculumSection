import { useEffect, useState } from "react";
import CustomAlert from "@/app/ui/alert";
import { useFormik } from "formik";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { EditCurriculumReq } from "@/redux-saga/action/curriculumAction";

// View
import ViewSectionDetailPage from "./viewSectionDetail";

export default function ViewSecDet(props: any) {
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }
        return (
            <div>
                <a onClick={handleChange} className="link link-hover capitalize">
                    <li className="group hover:bg-base-300 flex flex-row justify-between p-2 rounded-lg">
                            <div className="flex gap-x-3 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                                <p className="text-base">{props.sectionDetail.secdTitle}</p>
                            </div>
                            <div>
                                    <span className="invisible group-hover:visible font-medium underline">View More</span>
                            </div>
                            <div className="flex gap-5"> 
                                <p className="text-base">{props.sectionDetail.secdMinute} Minutes</p>
                                {props.sectionDetail?.sectionDetailMaterials[0].sedmFiletype === 'image' ? (<>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                                </>) : props.sectionDetail?.sectionDetailMaterials[0].sedmFiletype === 'video' ? (<>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                                </>) : (<></>)}
                            </div>
                    </li>
                </a>
                

                <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box sm:w-8/12 sm:max-w-full">
                        <ViewSectionDetailPage setView={handleChange} setRefresh={props.setRefresh} section={props.sectionDetail} view={false} alert={props.alert}/>
                    </div>
                </div>
            </div>
        )
}
