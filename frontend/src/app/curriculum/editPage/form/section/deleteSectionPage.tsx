"use client";
import { DeleteSectionRequest } from "@/redux-saga/action/sectionAction";
import { useFormik } from "formik";
import { useState } from "react"
import { useDispatch } from "react-redux";

export default function DeleteSection(props: any) {
  const dispatch = useDispatch();
  const [view, setview] = useState(true);

  function handleChange() {
      setview(!view);
      props.setview()
  }

  const sectProgEntityId = props.progId
  const sectId = props.section
  
  // Handle curriculum deletion
  const onDelete = () => {
    const data = {
      sectProgEntityId: sectProgEntityId,
      sectId: sectId
    }

    dispatch(DeleteSectionRequest(data))
    props.refreshForm(true);
    handleChange();
    props.setAlertInfo({ showAlert: true, alertText: 'Delete Section Success!', alertType: 'success'});
  };

  return (
    <div className="">
      <h3 className="font-bold text-lg">
        Are sure to delete this section material?
      </h3>
      <div className="modal-action">
        <button type="button" className="btn" onClick={handleChange}>
          Close
        </button>
        <button type="button" className="btn btn-error" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
