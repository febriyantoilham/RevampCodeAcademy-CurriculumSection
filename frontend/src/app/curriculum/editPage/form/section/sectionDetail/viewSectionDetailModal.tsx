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
        props.refreshPage(true);
        props.refreshForm(true);
        setModal(!modal);
    }
        return (
            <div>
                <a onClick={handleChange} className="link link-hover capitalize">{props.sectionDetail.secdTitle}</a>

                <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box sm:w-8/12 sm:max-w-full">
                        <ViewSectionDetailPage setview={handleChange} section={props.sectionDetail} setAlertInfo={props.setAlertInfo} view={false}/>
                    </div>
                </div>
            </div>
        )
}
