"use client";

import { EditCurriculumReq, GetCurriculumReq, GetOneCurriculumReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";
import config from "@/config/config";
import CustomAlert from "@/ui/alert";
import EditModal from "./editModal";

export default function ViewProgram(props: any) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const [previewImg, setPreviewImg] = useState<any>();
  const [upload, setUpload] = useState(false);
  const [imageExists, setImageExists] = useState(true);
  const [changeImage, setChangeImage] = useState(false);
  
  const { program } = useSelector((state: any) => state.getOneCurriculumState);
  const { category, instructor } = useSelector((state: any) => state.categoryCurriculumState);

  useEffect(() => {
    dispatch(GetOneCurriculumReq(props.progId))
    // setRefresh(false);
  }, [dispatch, props.progId, refresh]);

  const handleResetState = () => {
    dispatch(ResetCurriculumState());
  }
  
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });
  
  const formik = useFormik({
    initialValues: {
      file: '',
    },
    // enableReinitialize: true,
    onSubmit: async (values: any) => {
      const payload = new FormData();
      payload.append("file", values.file);

      const data = {
        id: props.progId,
        data: payload
      }
      
      console.log(`data: ${JSON.stringify(data)}`);
      

      dispatch(EditCurriculumReq(data));
      setPreviewImg('');
      setChangeImage(false);
      setUpload(false);
      setAlertInfo({ showAlert: true, alertText: 'Changed Image Successfully!', alertType: 'success'});
      setRefresh(true);
    }
  });

  // Handle Image Upload
  const uploadConfig = (name: any) => (e: any) => {
    let reader = new FileReader();
    const image = e.target.files[0];
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(image);
    formik.setFieldValue("file", image);
    setUpload(true);
  };

  const onClear = (event: any) => {
    event.preventDefault();
    setPreviewImg('');
    setUpload(false);
  };

  const handleImageError = () => {
    setImageExists(false);
  };

  if (!program || program.length === 0) {
    return <div>Loading...</div>;
  } else if (program.progEntityId && props.progId) {
    return (
      // <></>
      <div className=''>
        {refresh === false ? (alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo}/>):(<></>)}
        <div className='py-2'>
          <div className='grid grid-cols-2 gap-4'>
              <div className='flex justify-start font-extrabold text-xl my-auto'>{program.progTitle} ({program.progEntityId})</div>
            <div className='flex justify-end'><button onClick={() => {handleResetState(); props.setDisplay(false);}} className="btn btn-primary btn-sm my-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Back</span></button></div>
          </div>
        </div>

        <div className="grid xl:grid-rows-3 xl:grid-flow-col gap-5 py-5">
          <div className="xl:order-last card w-full shadow-xl">
            <div className="card-body flex justify-center">
              <div className="my-5 flex justify-center">
                {upload === false ? (
                  <>
                    <div className="avatar mb-3">
                      <div className="w-24 m-auto">
                        {program?.progImage === null || program?.progImage === '' ? (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>) : imageExists ? (<Image src={`${config.domain}/curriculum/getImage/${program?.progImage}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleImageError}/>) : (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>)}
                      </div>
                    </div>
                  </>
                ):(
                <div className="flex flex-col">
                  <div className="avatar mb-3">
                      <div className="w-24 mask mask-squircle m-auto">
                        <Image src={previewImg} alt={"x"} layout="fill" objectFit="contain"/>
                      </div>
                  </div>
                </div>
                )}
              </div>
              <div className="flex justify-center">
                {!changeImage ? (
                  <button onClick={() => setChangeImage(true)} className="btn btn-md">Change Image</button>
                ):(
                  <div className="flex justify-center flex-col">
                    <input type="file" id="file" name="file" className="file-input file-input-bordered w-full max-w-xs m-auto" onChange={uploadConfig('file')}/>
                    <div className="flex justify-center">
                    <a className="btn btn-error btn-sm text-center mt-5 mx-2" onClick={(event) => {setChangeImage(false); onClear(event)}}>Cancel</a>
                    {upload === true ? (
                    <>
                      <a className='btn btn-primary btn-sm mt-5 mx-2' onClick={() => formik.handleSubmit()}>
                        Submit
                      </a>
                    </>
                    ) : (<></>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="xl:row-span-full card card-compact w-full shadow-xl">
            <div className="py-5 px-5 flex justify-between">
              <h2 className="card-title">Curriculum Detail</h2>
              <EditModal program={program} option={{ category, instructor }} setRefresh={setRefresh} setAlertInfo={setAlertInfo}/>
            </div>
            <hr />
            <div className="card-body">
              <div id="program_entity">
                <p className="p-0 m-0 font-medium text-base uppercase">Program Details</p>
                <div className="ml-3 my-3">
                  <div className="flex flex-col mb-3">
                    <label htmlFor="progTitle" className="mb-2 font-medium">Program Title</label>
                    <input type="text" id="progTitle" placeholder="Program Title" className="input input-bordered text-sm capitalize" value={program?.progTitle} disabled/>
                  </div>
                  <div className="flex flex-col mb-3">
                    <label htmlFor="progHeadline" className="mb-2 font-medium">Headline</label>
                    <input type="text" id="progHeadline" placeholder="Headline Program" className="input input-bordered w-full text-sm capitalize" value={program?.progHeadline} disabled/>
                  </div>
                  <div className="grid xl:grid-cols-3 gap-x-3">
                    <div className="flex flex-col mb-3">
                      <label htmlFor="progType" className="mb-2 font-medium">Program Type</label>
                      <input type="text" id="progType" placeholder="Program Type" className="input input-bordered w-full text-sm capitalize" value={program?.progType} disabled/>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="progLearningType" className="mb-2 font-medium">Learning Type</label>
                      <input type="text" id="progLearningType" placeholder="Learning Type" className="input input-bordered w-full text-sm capitalize" value={program?.progLearningType} disabled/>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="progDuration" className="mb-2 font-medium">Duration in Month</label>
                      <div className="grid md:grid-cols-2 gap-2">
                        <input type="number" id="progDuration" placeholder="Duration" className="input input-bordered w-full text-sm capitalize" value={program?.progDuration} disabled/>
                        <input type="text" id="progDurationType" placeholder="Duration Type" className="input input-bordered w-full text-sm capitalize" value={program?.progDurationType} disabled/>
                      </div>
                    </div>
                  </div>
                  <div className="grid xl:grid-cols-3 gap-x-3">
                    <div className="flex flex-col mb-3">
                      <label htmlFor="progCateId" className="mb-2 font-medium">Program Category</label>
                        {program?.progCateId !== null ? (
                          category.map((item: any) => (
                          item.cateId === program?.progCateId ? (<input key={item.cateId} type="text" id="progCateId" placeholder="Program Category" className="input input-bordered w-full text-sm capitalize" value={item.cateName} disabled/>):(<></>)    
                          ))
                          ) : (
                          <input type="text" id="progCateId" placeholder="Program Category" className="input input-bordered w-full text-sm capitalize" disabled/>
                          )}
                        
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="progLanguage" className="mb-2 font-medium">Program Language</label>
                      <input type="text" id="progLanguage" placeholder="Program Language" className="input input-bordered w-full text-sm capitalize" value={program?.progLanguage} disabled/>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="progPrice" className="mb-2 font-medium">Program Price in IDR</label>
                      <input type="number" id="progPrice" placeholder="Program Price" className="input input-bordered w-full text-sm capitalize" value={program?.progPrice} disabled/>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <label htmlFor="progTagSkill" className="mb-2 font-medium">Tags Skill</label>
                    <input type="text" id="progTagSkill" placeholder="Java, Sql, Postress, ..." className="input input-bordered w-full text-sm capitalize" value={program?.progTagSkill} disabled/>
                  </div>
                  <div className="grid xl:grid-cols-3 gap-3 mt-3">
                    <div className="flex flex-col xl:col-span-1 xl:order-last">
                      <div className="avatar">
                        <div className="w-24 mask mask-squircle m-auto">
                          <Image src="/photo-pic.jpg" alt={"photo-pic"} layout="fill" objectFit="contain"/>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center xl:col-span-2 mb-3">
                      <label htmlFor="progCreatedBy" className="mb-2 font-medium">Instructor</label>
                        {instructor.map((emp: any, index: any) => (
                          emp.userEntityId === program?.progCreatedById ? (<input key={emp.userE} type="text" id="progCreatedById" placeholder="Program Instructor" className="input input-bordered w-full text-sm capitalize" value={`${emp.userFirstName} ${emp.userLastName}` } disabled/>) : (<></>)
                          ))}
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <label htmlFor="predItemLearning" className="mb-2 font-medium">What will you learn ?</label>
                    <textarea id="" className="textarea textarea-bordered h-auto textarea-md capitalize" placeholder="What will you learn ?" value={program.programEntityDescription.predItemLearning.items} disabled></textarea>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="predDescription" className="mb-2 font-medium">Description</label>
                    <textarea id="" className="textarea textarea-bordered h-auto textarea-md capitalize" placeholder="Program Description" value={program.programEntityDescription.predDescription.items} disabled></textarea>
                  </div>
                </div>
              </div>
              <div id="sections">
                <hr className="mt-3 mb-6"/>
                <p className="p-0 m-0 font-medium text-base uppercase">Materi (Section & Sub Section)</p>
                <div className="ml-3 mt-3">
                  { program.sections.length !== 0 ? (
                  program.sections.map((section: any)=>(
                    <>
                      <div tabIndex={0} className="collapse border border-base-300 bg-base-200 mb-3">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-base font-medium">
                          {section.sectTitle}
                        </div>
                        <div className="collapse-content"> 
                          {
                            section.sectionDetails.length !== 0 ? (
                              section.sectionDetails.map((item: any) => (
                                <div key={item.secdId} className="flex flex-row justify-between my-1">
                                    <div className="text-sm capitalize">{item.secdTitle}</div>
                                    <div className="text-sm">{item.secdMinute} Minutes</div>
                                </div>
                              ))
                            ) : (<></>)
                          }
                        </div>
                      </div>
                    </>
                  ))) : (
                  <div className="flex justify-between items-center">
                    <div className="">The sections are not added yet, click edit program to add new section!</div>
                    <EditModal program={program} option={{ category, instructor }} setRefresh={setRefresh} setAlertInfo={setAlertInfo}/>
                  </div>
                  )
                }
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      )
  } else {
    return <div>Loading...</div>;
    
  }
}
