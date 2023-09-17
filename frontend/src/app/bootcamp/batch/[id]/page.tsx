"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ResetBatch, getBatchByIdReq, getCandidateReq, getInstructorsReq, getProgramReq } from "@/redux-saga/action/bootcamp/batchAction";
import { hasCookie } from "cookies-next";
import BatchForm from "./batchForm";
import CustomAlert from "@/app/ui/alert";

export default function Page({ params }: { params: { id: string } }) {
  // Refresh
  const [refresh, setRefresh] = useState(false);
  // Dispatch
  const dispatch = useDispatch();
  // Router
  const router = useRouter();
  // Batch ID
  const [id, setId] = useState(params.id);
  // Selected Batch State
  const selectedBatch = useSelector((state: any) => state.batchState.currentSelectedBatch);
  const program = useSelector((state: any) => state.batchState.programList);
  const instructors = useSelector((state: any) => state.batchState.instructors);
  const candidate = useSelector((state: any) => state.batchState.candidateList);
  const batchResponse = useSelector((state: any) => state.batchState.response);

  // Alert
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

  // UseEffect
  useEffect(() => {
    if (batchResponse === null) {
        if (!hasCookie('access_token')) {
        router.push('/signin');
      } else {
        dispatch(getProgramReq());
        dispatch(getInstructorsReq());
        dispatch(getCandidateReq());
        if (id) {
          dispatch(getBatchByIdReq(id));
        }
      }
    } else if ( batchResponse.success === true) {
      dispatch(ResetBatch());
      router.push('/bootcamp/batch');
    } else if ( batchResponse.success === false) {
      setAlertInfo({ showAlert: true, alertText: batchResponse.error, alertType: 'error'});
      dispatch(ResetBatch());
    }
    
    setRefresh(false);
  }, [batchResponse, dispatch, id, router])
  
  
  console.log(`Response: ${ batchResponse?.success }`);
  

  return (
    (selectedBatch &&
      <div className='bg-base-100 rounded-xl shadow-xl max-md:p-5 p-8 h-full flex flex-col gap-y-10'>
        {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} refresh={refresh} setRefresh={setRefresh}/>}
        <div className="flex justify-between">
            <div className='text-xl font-bold'>Edit {selectedBatch.batchName}</div>
            <Link href={'/bootcamp/batch'} onClick={() => dispatch(ResetBatch())} className="uppercase btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              <span>Back</span>
            </Link>
        </div>
        { program && instructors && candidate && <BatchForm selectedBatch={selectedBatch} program={program} instructors={instructors} candidate={candidate} setRefresh={setRefresh} batchResponse={batchResponse}/> }
      </div>
    )
  )
}
