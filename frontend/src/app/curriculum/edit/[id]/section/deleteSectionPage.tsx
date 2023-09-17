"use client";
import { DeleteSectionRequest } from "@/redux-saga/action/curriculum/sectionAction";
import { useFormik } from "formik";
import { useState } from "react"
import { useDispatch } from "react-redux";

export default function DeleteSection(props: any) {
  const dispatch = useDispatch();
  const [view, setview] = useState(true);

  function handleChange() {
      setview(!view);
      props.setView()
  }

  const progEntityId = props.progEntityId
  const sectId = props.sectId
  
  // Handle curriculum deletion
  const onDelete = () => {
    const data = {
      sectProgEntityId: progEntityId,
      sectId: sectId
    }

    dispatch(DeleteSectionRequest(data))
    props.setRefresh(true);
    handleChange();
  };

  return (
    <div className="">
      <h3 className="font-medium text-lg">
        Are sure to delete this section material?
      </h3>
      <div className="modal-action">
        <button type="button" className="btn" onClick={handleChange}>
          Cancel
        </button>
        <button type="button" className="btn btn-outline btn-error" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
