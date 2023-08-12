import { AddCurriculumReq, GetNewIdReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";

import CustomAlert from "@/ui/alert";
import EditDisplay from "../editPage/editPage";

export default function Create(props: any) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  // Upload Image Config
  const [previewImg, setPreviewImg] = useState<any>();
  const [upload, setUpload] = useState(false);

  // Alert
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

  // State
  const { progEntityId } = useSelector((state: any) => state.programEntityState)
  const { category, instructor } = useSelector((state: any) => state.categoryCurriculumState);

  useEffect(() => {
    dispatch(GetNewIdReq());
    setRefresh(false);
  }, [dispatch, refresh])

  // Handle form submission
  const formik = useFormik({
    initialValues: {
      progHeadline: '',
      progTitle: '',
      progType: '',
      progLearningType: '',
      progDuration: '',
      progDurationType: '',
      progCateId: '',
      progLanguage: '',
      progPrice: '',
      progTagSkill: '',
      progCreatedById: '',
      predItemLearning: '',
      predDescription: '',
      file: '',
    },

    onSubmit: async (values: any) => {
      // if (values.progType === '') {
      //   setAlertInfo({ showAlert: true, alertText: 'Please Choose Program Type!', alertType: 'error'});
      // } else if (values.progLearningType === '') {
      //   setAlertInfo({ showAlert: true, alertText: 'Please Choose Program Learning Type!', alertType: 'error'});
      // } else if (values.progDuration === '' || values.progDuration === 0) {
      //   setAlertInfo({ showAlert: true, alertText: 'Duration Cannot be Zero!', alertType: 'error'});
      // } else if (values.progDurationType === '') {
      //   setAlertInfo({ showAlert: true, alertText: 'Please Choose Duration Type!', alertType: 'error'});
      // } else if (values.progCateId === '') {
      //   setAlertInfo({ showAlert: true, alertText: 'Please Choose Program Category!', alertType: 'error'});
      // } else if (values.progLanguage === '') {
      //   setAlertInfo({ showAlert: true, alertText: 'Please Choose Program Language!', alertType: 'error'});
      // } else if (values.progPrice === '' || values.progPrice === 0) {
      //   setAlertInfo({ showAlert: true, alertText: 'Price Cannor be Zero!', alertType: 'error'});
      // } else if (values.progCreatedById === '') {
      //   setAlertInfo({ showAlert: true, alertText: 'Please Select The Instructor!', alertType: 'error'});
      // } else if (values.file === '') {
      //   setAlertInfo({ showAlert: true, alertText: 'Please Upload Program Image!', alertType: 'error'});
      // } else {
        const payload = new FormData();
        payload.append("file", values.file);
        payload.append("progHeadline", values.progHeadline);
        payload.append("progTitle", values.progTitle);
        payload.append("progType", values.progType);
        payload.append("progLearningType", values.progLearningType);
        payload.append("progDuration", values.progDuration);
        payload.append("progDurationType", values.progDurationType);
        payload.append("progCateId", values.progCateId);
        payload.append("progLanguage", values.progLanguage);
        payload.append("progPrice", values.progPrice);
        payload.append("progTagSkill", values.progTagSkill);
        payload.append("progCreatedById", values.progCreatedById);
        payload.append("predItemLearning", values.predItemLearning);
        payload.append("predDescription", values.predDescription);

        props.setRefresh(true);
        dispatch(AddCurriculumReq(payload));
        dispatch(ResetCurriculumState());
        props.setProgId(progEntityId);
        // setAlertInfo({ showAlert: true, alertText: 'Data Successfully Added!', alertType: 'success'});
        props.setEditDisplay(true);
        props.setDisplay(false);
      }
    // },
  });

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

  return (
        <>
          {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo}/>}
          <div className=''>
            <div className='py-2'>
              <div className='flex justify-between items-center gap-4'>
                <div className='text-xl font-medium'>Create Curriculum</div>
                <button onClick={() => {props.setDisplay(false); props.setRefresh(true)}} className="btn btn-outline btn-square btn-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3"></div>
            <div>
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="grid xl:grid-cols-5 gap-5">
                  <div className="xl:col-span-2 xl:order-last">
                    <div className="flex flex-col my-5">
                      {upload === false ? (
                        <>
                          <div className="avatar mb-3">
                            <div className="w-24 m-auto">
                              <Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>
                            </div>
                          </div>
                        </>
                      ):(
                      <>
                        <div className="avatar mb-3">
                            <div className="w-24 mask mask-squircle m-auto">
                              <Image src={previewImg} alt={""} layout="fill" objectFit="contain"/>
                            </div>
                        </div>
                        <div className="flex justify-center my-3">
                          <button className="btn btn-outline btn-error btn-xs" onClick={onClear}>
                            Remove Image
                          </button>
                        </div>
                      </>
                      )}
                      {/* <input type="file" id="file" name="file" className="file-input file-input-bordered w-full max-w-xs m-auto" onChange={uploadConfig('file')}/> */}
                      <input type="file" id="file" name="file" className="file-input file-input-bordered w-full max-w-xs m-auto" onChange={uploadConfig('file')}/>
                    </div>
                  </div>
                  <div className="xl:col-span-3">
                    <div className="grid xl:grid-cols-6 gap-x-2">
                      <div className="xl:col-span-1 flex flex-col mb-3">
                        <label htmlFor="progEntityId" className="my-2 mr-5">Program ID</label>
                        <input type="text" id="progEntityId" placeholder="Program ID" className="input input-bordered w-full mr-5 my-auto" value={progEntityId} disabled/>
                      </div>
                      <div className="xl:col-span-5 flex flex-col mb-3">
                        <label htmlFor="progTitle" className="my-2 mr-5">Title</label>
                        <input type="text" id="progTitle" placeholder="Title Program" className="input input-bordered w-full mr-5 my-auto" defaultValue={formik.values.progTitle} onChange={formik.handleChange}/>
                      </div>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="progHeadline" className="mr-5 my-2">Headline</label>
                      <input type="text" id="progHeadline" placeholder="Headline Program" className="input input-bordered w-full mr-5 my-auto" value={formik.values.progHeadline} onChange={formik.handleChange}/>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col mb-3">
                        <label htmlFor="progType" className="my-2 mr-5">Program Type</label>
                        <select id="progType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={'Program Type'} onChange={formik.handleChange}>
                          <option disabled>Program Type</option>
                          <option className="capitalize">bootcamp</option>
                          <option className="capitalize">course</option>
                        </select>
                      </div>
                      <div className="flex flex-col mb-3 ">
                        <label htmlFor="progLearningType" className="my-2 mr-5">Learning Type</label>
                        <select id="progLearningType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={'Learning Type'} onChange={formik.handleChange}>
                          <option disabled>Learning Type</option>
                          <option className="capitalize">online</option>
                          <option className="capitalize">offline</option>
                          {/* <options>Hybrid</option> */}
                        </select>
                      </div>
                      <div className="flex flex-col mb-3">
                        <label htmlFor="progDuration" className="my-2 mr-5">Duration in Month</label>
                        <div className="flex flex-row">
                          <input type="number" id="progDuration" placeholder="0" className="input input-bordered w-full mr-5 my-auto" defaultValue={formik.values.progDuration} onChange={formik.handleChange}/>
                          <select id="progDurationType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={'Duration'} onChange={formik.handleChange}>
                            <option disabled>Duration</option>
                            {/* <option className="capitalize">day</option> */}
                            <option className="capitalize">week</option>
                            <option className="capitalize">month</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col mb-3">
                        <label htmlFor="progCateId" className="my-2 mr-5">Category</label>
                        <select id="progCateId" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={'Category'} onChange={formik.handleChange} required>
                          <option disabled>Category</option>
                          {category.map((item: any) => {
                            return (
                              <option key={item.cateId} value={item.cateId}>{item.cateName}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col mb-3">
                        <label htmlFor="progLanguage" className="my-2 mr-5">Language</label>
                        <select id="progLanguage" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={'Language'} onChange={formik.handleChange}>
                          <option disabled>Language</option>
                          <option className="capitalize">english</option>
                          <option className="capitalize">bahasa</option>
                        </select>
                      </div>
                      <div className="flex flex-col mb-3">
                        <label htmlFor="progPrice" className="my-2 mr-5">Price in IDR</label>
                        <input type="number" id="progPrice" placeholder="100.000" className="input input-bordered w-full mr-5 my-auto" defaultValue={formik.values.progPrice} onChange={formik.handleChange}/>
                      </div>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="progTagSkill" className="my-2 mr-5">Tags Skill</label>
                      <input type="text" id="progTagSkill" placeholder="Java, Sql, Postress, ..." className="input input-bordered w-full mr-5 my-auto" defaultValue={formik.values.progTagSkill} onChange={formik.handleChange}/>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <div className="flex flex-col col-span-2 mb-3">
                        <label htmlFor="progCreatedBy" className="my-2 mr-5">Instructor</label>
                        <select id="progCreatedById" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={'Instructor'} onChange={formik.handleChange}>
                          <option disabled>Instructor</option>
                          {instructor.map((emp: any, index: any) => (
                            <option key={emp.userEntityId} value={emp.userEntityId}>{`${emp.userEntityId}. ${emp.userFirstName} ${emp.userLastName}`}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col col-span-1 mb-3">
                        <div className="avatar">
                          <div className="w-24 mask mask-squircle m-auto">
                            <Image src="/photo-pic.jpg" alt={""} layout="fill" objectFit="contain"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="predItemLearning" className="mr-5 my-2">What will you learn ?</label>
                      <textarea id="predItemLearning" className="textarea textarea-bordered h-24" placeholder="What will you learn ?" defaultValue={formik.values.predItemLearning} onChange={formik.handleChange}></textarea>
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="predDescription" className="mr-5 my-2">Description</label>
                      <textarea id="predDescription" className="textarea textarea-bordered h-24" placeholder="Program Description" defaultValue={formik.values.predDescription} onChange={formik.handleChange}></textarea>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button type='submit' className='btn btn-primary my-3'>
                        Submit
                      </button>
                      <button onClick={() => props.setDisplay(false)} className="btn btn-neutral my-auto">
                        Cancel
                      </button>
                    </div>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </>
  )
}
