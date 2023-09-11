"use client";
import { closeBatchReq, setRunningReq } from "@/redux-saga/action/bootcamp/batchAction";
import { useState } from "react"
import { useDispatch } from "react-redux";

export default function ClosedAlert(props: any) {
  const dispatch = useDispatch();

  function handleChange() {
    // setModal(false);
    props.setBatch(null);
    props.setRefresh(true);
  }

  const batchEntityId = props.batch.batchEntityId;
  const batchId = props.batch.batchId;
  const statusInput = props.statusInput;
  
  // Handle curriculum deletion
  const onClicked = () => {
    const data = {
      progEntityId: batchEntityId,
      id: batchId
    }

    if (statusInput === "close") {
    dispatch(closeBatchReq(data));
    } else if (statusInput === "run") {
      dispatch(setRunningReq(data));
    }

    handleChange();
  };

  return (
    <>
      <input type="checkbox" checked={true} onChange={handleChange} className="modal-toggle"/>
      <div className="modal modal-bottom sm:modal-middle z-10">
        <div className="modal-box">
          <h3 className="font-medium text-lg">
            Are sure to {statusInput === 'close' ? props.batch.batchStatus === "Close" ? "open" : "close" : statusInput === 'run' ? "running" : "Change"} this {props.batch.batchName}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn btn-md btn-neutral" onClick={handleChange}>
              Cancel
            </button>
            <button type="button" className="btn btn-md btn-primary" onClick={onClicked}>yes, i`m sure</button>
          </div>
        </div>
      </div>
    </>
  )
}
