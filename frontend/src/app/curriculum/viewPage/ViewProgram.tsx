import { DeleteCurriculumReq, GetOneCurriculumReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import CustomAlert from "@/ui/alert";
import ProgramForm from "./form/ProgramForm";
import LogoForm from "./form/LogoForm";
import EditDisplay from "../editPage/editPage";

export default function ViewProgram(props: any) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);

  // Alert
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

  // State
  const { program } = useSelector((state: any) => state.programEntityState)
  const { category, instructor } = useSelector((state: any) => state.categoryCurriculumState);

  // Display Edit
  const [editDisplay, setEditDisplay] = useState(false);
  const [progId, setProgId] = useState('');

  const progEntityId = props.progEntityId

  useEffect(() => {
    dispatch(GetOneCurriculumReq(progEntityId));
    setRefresh(false);
  }, [dispatch, progEntityId, refresh])
  
  const setDisplay = () => {
    setEditDisplay(false);
    setRefresh(true);
  }
  
  const setMainDisplay = () => {
    dispatch(ResetCurriculumState());
    props.setDisplay(false);
    props.handleRefresh();
  }

  const onDelete = () => {
    dispatch(DeleteCurriculumReq(progEntityId));
    props.setDisplay(false);
    props.handleRefresh();
  }

  if (!program || program.length === 0) {
    return <div>Loading...</div>;
  } else if (program.progEntityId && props.progEntityId) {
    return (
      <>
        {editDisplay ? ( !refresh &&
            <EditDisplay progEntityId={progId} setAlertInfo={props.setAlertInfo} setDisplay={setDisplay}/>
          ) : (
            <>
              {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo}/>}
              <>
                <div className='py-2'>
                  <div className='flex justify-between items-center gap-4'>
                    <div className='text-xl font-medium'>Curriculum Details</div>
                    <button onClick={() => setMainDisplay()} className="btn btn-outline btn-square btn-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-300 my-3"></div>
                <div>
                  <div className="grid xl:grid-cols-5 gap-5">
                    <div className="xl:col-span-1 xl:order-last">
                      <div className="card w-full bg-base-100 shadow-xl py-5">
                        <div className="card-body">
                          <LogoForm program={program} setRefresh={setRefresh} setAlertInfo={setAlertInfo}/>
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-4">
                      <div className="card w-full bg-base-100 shadow-lg">
                        <div className="card-body">
                          <ProgramForm program={program} option={{ category, instructor }}/>
                          <div className="modal-action flex justify-between">
                            <button type='button' className='btn btn-error btn-square' onClick={() => onDelete()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
                            <div className="flex gap-x-3">
                              <button type='button' className='btn btn-primary' onClick={() => {setProgId(progEntityId); setEditDisplay(true);}}>Edit Program</button>
                              <button type="button" className="btn btn-neutral" onClick={() => setMainDisplay()}>Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </>
        )}
      </>
    )
  } else {
    return <div>Loading...</div>;
    
  }
}
