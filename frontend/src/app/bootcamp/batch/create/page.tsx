"use client";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCandidateReq, getInstructorsReq, getProgramReq } from "@/redux-saga/action/bootcamp/batchAction";

// Form
import BatchForm from "./batchForm";
import { hasCookie } from "cookies-next";

export default function Page() {
  // dispatch
  const dispatch = useDispatch();
  // setRefresh
  const [refresh, setRefresh] = useState(false);
  // router
  const router = useRouter();
  // State
  const program = useSelector((state: any) => state.batchState.programList);
  const instructors = useSelector((state: any) => state.batchState.instructors);
  const candidate = useSelector((state: any) => state.batchState.candidateList);
  // useEffect
  useEffect (() => {
    if (!hasCookie('access_token')) {
      router.push('/signin');
    } else {
      dispatch(getProgramReq());
      dispatch(getInstructorsReq());
      dispatch(getCandidateReq());
    }
    setRefresh(false);
  }, [dispatch, refresh, router])

  return (
    <div className='bg-base-100 rounded-xl shadow-xl max-md:p-5 p-8 h-full flex flex-col gap-y-10'>
      <div className="flex justify-between">
          <div className='text-xl font-bold'>Create Batch</div>
          <Link href={'/bootcamp/batch'} className="uppercase btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            <span>Back</span>
          </Link>
      </div>
      { program && instructors && candidate && <BatchForm program={program} instructors={instructors} candidate={candidate}/> }
    </div>
  )
}
