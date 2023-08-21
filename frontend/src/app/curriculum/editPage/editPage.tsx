import { AddCurriculumReq, EditCurriculumReq, GetNewIdReq, GetOneCurriculumReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";

import CustomAlert from "@/ui/alert";
import EditForm from "./form/form";
import LogoForm from "./form/formLogo";

export default function Edit(props: any) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  // status
  const [create] = useState(props.create || false);

  // Alert
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

  // State
  const { program } = useSelector((state: any) => state.programEntityState)
  const { category, instructor } = useSelector((state: any) => state.categoryCurriculumState);

  const [onUpload, setOnUpload] = useState(false);

  const progEntityId = props.progEntityId

  useEffect(() => {
    dispatch(GetOneCurriculumReq(progEntityId));
    setRefresh(false);
  }, [dispatch, progEntityId, refresh])
  
  const handleBackBtn = () => {
    dispatch(ResetCurriculumState());
    props.setDisplay();
  }
  
  console.log(`Program: ${JSON.stringify(program)}`);
  console.log(`ProgramEntityID: ${progEntityId}`);
  

  // return <div>Loading...</div>;
  if (!program || program.length === 0) {
    // return <div>Loading...</div>;
    return <CustomAlert alertInfo={{ showAlert: true, alertText: 'Waiting...', alertType: 'success' }} setAlert={setAlertInfo} setRefresh={setRefresh}/>
  } else if (program.progEntityId && props.progEntityId) {
    return (
      <>
        {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} setRefresh={setRefresh}/>}
        <div className=''>
          <div className='py-2'>
            <div className='flex justify-between items-center gap-4'>
                <div className='text-xl font-medium'>{create ? (<>Create</>):(<>Edit</>)} Curriculum</div>
              <button onClick={() => handleBackBtn()} className="btn btn-outline btn-square btn-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-300 my-3"></div>
          <div>
            <div className="grid xl:grid-cols-5 gap-5">
              <div className="xl:col-span-2 xl:order-last">
                <LogoForm program={program} setRefresh={setRefresh} setAlertInfo={setAlertInfo} setOnUpload={setOnUpload}/>
              </div>
              <div className="xl:col-span-3">
                <EditForm program={program} option={{ category, instructor }} setAlertInfo={setAlertInfo} setAlertInfoView={props.setAlertInfo} setView={handleBackBtn} setRefresh={setRefresh} refresh={refresh} create={create} onUpload={onUpload}/>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <div>Loading...</div>;
    
  }
}
