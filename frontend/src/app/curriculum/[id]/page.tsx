"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetCatReq, GetNewIdReq, GetOneCurriculumReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import Form from "./form";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  // State
  const { category, instructor } = useSelector((state: any) => state.categoryCurriculumState);

  // New ProgEntityId
  const { progEntityId } = useSelector((state: any) => state.programEntityState);

  // Program Entity
  const [id, setId] = useState(params.id);
  const { program } = useSelector((state: any) => state.programEntityState);
  
  useEffect(() => {
    dispatch(ResetCurriculumState());
    dispatch(GetCatReq({}));
    if(id === null){
      dispatch(GetNewIdReq());
    } else {
      dispatch(GetOneCurriculumReq(id))
    }
    setRefresh(false);
  }, [dispatch, id, refresh])

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className="card-body">
        <div className='py-2'>
          <div className='flex justify-between items-center gap-4'>
            <div className='text-xl font-medium'>Create Curriculum</div>
            <Link href={'/curriculum'} className="btn btn-ghost btn-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              <span> Back</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-300 my-3"></div>
        {/* form */}
        <div className="flex flex-col gap-5">
          {/* <div>progEntityId: {progEntityId}</div>
          <div>Id: {id}</div>
          <div>program: {JSON.stringify(program)}</div> */}
          {/* <div>category: {JSON.stringify(category)}</div> */}
          {/* <div>instructor: {JSON.stringify(instructor)}</div> */}
        </div>
        <div>
          {(program || progEntityId) && category && instructor && 
          <Form program={program} option={{ category, instructor }} progEntityId={id === null ? progEntityId : id} setId={setId} setRefresh={setRefresh}/>
          }
        </div>
      </div>
    </div>
  )
}
