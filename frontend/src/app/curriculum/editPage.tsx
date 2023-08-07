import { EditCurriculumReq, GetOneCurriculumReq } from "@/redux-saga/action/curriculumAction";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";

import CustomAlert from "@/ui/alert";

export default function Edit(props: any) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const [previewImg, setPreviewImg] = useState<any>();
  const [upload, setUpload] = useState(false);
  const [imageExists, setImageExists] = useState(true);
  const [changeImage, setChangeImage] = useState(false);
  
  const category = props.category;
  const instructor = props.instructor;
  const { curriculum } = useSelector((state: any) => state.GetOneCurriculumState);
  
  
  
  let predItemLearning  = ''
  let predDescription = ''

  // if (curriculum && curriculum.programEntityDescription) {
  //   // console.log(`Curriculum: ${JSON.stringify(curriculum.programEntityDescription.predItemLearning.items)}`);
  //   predItemLearning  = curriculum.programEntityDescription.predItemLearning.items
  //   predDescription = curriculum.programEntityDescription.predDescription.items
  // } else {
  //   console.log("Curriculum or programEntityDescription is null or undefined.");
  // }
  
  // Handle form submission
  const formik = useFormik({
    initialValues: {
      // progEntityId: '',
      // progHeadline: '',
      // progTitle: '',
      // progType: '',
      // progLearningType: '',
      // progDuration: '',
      // progDurationType: '',
      // progCateId: '',
      // progLanguage: '',
      // progPrice: '',
      // progTagSkill: '',
      // progCreatedById: '',
      // predItemLearning: '',
      // predDescription: '',
      // file: '',
    },
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      if (values.progType === '') {
        setAlertInfo({ showAlert: true, alertText: 'Please Choose Program Type!', alertType: 'error'});
      } else if (values.progLearningType === '') {
        setAlertInfo({ showAlert: true, alertText: 'Please Choose Program Learning Type!', alertType: 'error'});
      } else if (values.progDuration === '' || values.progDuration === 0) {
        setAlertInfo({ showAlert: true, alertText: 'Duration Cannot be Zero!', alertType: 'error'});
      } else if (values.progDurationType === '') {
        setAlertInfo({ showAlert: true, alertText: 'Please Choose Duration Type!', alertType: 'error'});
      } else if (values.progCateId === '') {
        setAlertInfo({ showAlert: true, alertText: 'Please Choose Program Category!', alertType: 'error'});
      } else if (values.progLanguage === '') {
        setAlertInfo({ showAlert: true, alertText: 'Please Choose Program Language!', alertType: 'error'});
      } else if (values.progPrice === '' || values.progPrice === 0) {
        setAlertInfo({ showAlert: true, alertText: 'Price Cannor be Zero!', alertType: 'error'});
      } else if (values.progCreatedById === '') {
        setAlertInfo({ showAlert: true, alertText: 'Please Select The Instructor!', alertType: 'error'});
      } else {
        // const payload = {
        //   id: props.progId, // Retrieve 'id' field value from formik values
        //   file: values.file,
        //   data: {
        //     progHeadline: values.progHeadline,
        //     progTitle: values.progTitle,
        //     progType: values.progType,
        //     progLearningType: values.progLearningType,
        //     progDuration: values.progDuration,
        //     progDurationType: values.progDurationType,
        //     progCateId: values.progCateId,
        //     progLanguage: values.progLanguage,
        //     progPrice: values.progPrice,
        //     progTagSkill: values.progTagSkill,
        //     progCreatedById: values.progCreatedById,
        //     predItemLearning: values.predItemLearning,
        //     predDescription: values.predDescription,
        //   },
        // };
        const payload = new FormData();
        payload.append("file", values.file);
        payload.append("progEntityId", props.progId);
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

        const data = {
          id: props.progId,
          payload: payload
        }

        console.log(`Payload: ${JSON.stringify(payload)}`);

        dispatch(EditCurriculumReq(payload));
        // setAlertInfo({ showAlert: true, alertText: 'Data Successfully Added!', alertType: 'success'});
        // setRefresh(true)
      }
    },
  });

  useEffect(() => {
    dispatch(GetOneCurriculumReq(props.progId))
    formik.values({...curriculum})
    setRefresh(false);
  }, [curriculum, dispatch, formik, props.progId, refresh]);

  // useEffect(() => {
  //   if (curriculum && curriculum.programEntityDescription){
  //     formik.setValues({
  //       progEntityId: curriculum.progEntityId,
  //       progHeadline: curriculum.progHeadline,
  //       progTitle: curriculum.progTitle,
  //       progType: curriculum.progType,
  //       progLearningType: curriculum.progLearningType,
  //       progDuration: curriculum.progDuration,
  //       progDurationType: curriculum.progDurationType,
  //       progCateId: curriculum.progCateId,
  //       progLanguage: curriculum.progLanguage,
  //       progPrice: curriculum.progPrice,
  //       progTagSkill: curriculum.progTagSkill,
  //       progCreatedById: curriculum.progCreatedById,
  //       predItemLearning: curriculum.programEntityDescription.predItemLearning.items,
  //       predDescription: curriculum.programEntityDescription.predDescription.items,
  //     })
  //   }
  // },)

  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

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

  return (
    <div className='py-10 px-10'>
      {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo}/>}
      <div className='py-2'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex justify-start font-black text-xl my-auto'>Edit Curriculum ({curriculum.progTitle})</div>
          <div className='flex justify-end'><button onClick={() => {props.setDisplay(false); props.setRefresh(true)}} className="btn btn-primary my-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Back</span></button></div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-3"></div>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
              <div className="grid grid-cols-11 gap-3">
                <div className="flex flex-col col-span-1 mb-3">
                  <label htmlFor="progEntityId" className="my-2 mr-5">Id</label>
                  <input type="text" id="progEntityId" placeholder="Id" className="input input-bordered w-full mr-5 my-auto text-center font-extrabold" defaultValue={curriculum.progEntityId} onChange={formik.handleChange} disabled/>
                </div>
                <div className="flex flex-col col-span-10 mb-3">
                  <label htmlFor="progTitle" className="my-2 mr-5">Title</label>
                  <input type="text" id="progTitle" placeholder="Title Program" className="input input-bordered w-full mr-5 my-auto" defaultValue={curriculum.progTitle} onChange={formik.handleChange}/>
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="progHeadline" className="mr-5 my-2">Headline</label>
                <input type="text" id="progHeadline" placeholder="Headline Program" className="input input-bordered w-full mr-5 my-auto" defaultValue={curriculum.progHeadline} onChange={formik.handleChange}/>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col mb-3">
                  <label htmlFor="progType" className="my-2 mr-5">Program Type</label>
                  <select id="progType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={curriculum.progType} onChange={formik.handleChange}>
                    <option disabled>Program Type</option>
                    <option className="capitalize">bootcamp</option>
                    <option className="capitalize">course</option>
                  </select>
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="progLearningType" className="my-2 mr-5">Learning Type</label>
                  <select id="progLearningType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={curriculum.progLearningType} onChange={formik.handleChange}>
                    <option disabled>Learning Type</option>
                    <option className="capitalize">online</option>
                    <option className="capitalize">offline</option>
                  </select>
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="progDuration" className="my-2 mr-5">Duration in Month</label>
                  <div className="flex flex-row">
                    <input type="number" id="progDuration" placeholder="1" className="input input-bordered w-full mr-5 my-auto" defaultValue={curriculum.progDuration} onChange={formik.handleChange}/>
                    <select id="progDurationType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={curriculum.progDurationType} onChange={formik.handleChange}>
                      <option disabled>Duration</option>
                      <option className="capitalize">day</option>
                      <option className="capitalize">week</option>
                      <option className="capitalize">month</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col mb-3">
                  <label htmlFor="progCateId" className="my-2 mr-5">Category</label>
                  <select id="progCateId" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={curriculum.progCateId} onChange={formik.handleChange}>
                    <option disabled>Category</option>
                    {category.map((item: any, index: any) => (
                      <option key={item.cateId} value={item.cateId}>{item.cateName}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="progLanguage" className="my-2 mr-5">Language</label>
                  <select id="progLanguage" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={curriculum.progLanguage} onChange={formik.handleChange}>
                    <option disabled>Language</option>
                    <option className="capitalize">english</option>
                    <option className="capitalize">bahasa</option>
                  </select>
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="progPrice" className="my-2 mr-5">Price in IDR</label>
                  <input type="number" id="progPrice" placeholder="100.000" className="input input-bordered w-full mr-5 my-auto" defaultValue={curriculum.progPrice} onChange={formik.handleChange}/>
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="progTagSkill" className="my-2 mr-5">Tags Skill</label>
                <input type="text" id="progTagSkill" placeholder="Java, Sql, Postress, ..." className="input input-bordered w-full mr-5 my-auto" defaultValue={curriculum.progTagSkill} onChange={formik.handleChange}/>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="flex flex-col col-span-2 mb-3">
                  <label htmlFor="progCreatedBy" className="my-2 mr-5">Instructor</label>
                  <select id="progCreatedById" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={'Instructor'} onChange={formik.handleChange}>
                    <option disabled>Instructor</option>
                    {instructor.map((emp: any, index: any) => (
                      <option key={emp.userEntityId} value={emp.userEntityId}>{`${emp.userFirstName} ${emp.userLastName}`}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col col-span-1 mb-3">
                  <div className="avatar">
                    <div className="w-24 mask mask-squircle m-auto">
                      <Image src="/photo-pic.jpg" alt={"photo-pic"} layout="fill" objectFit="contain"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="predItemLearning" className="mr-5 my-2">What will you learn ?</label>
                <textarea id="predItemLearning" className="textarea textarea-bordered h-24" placeholder="What will you learn ?" defaultValue={predItemLearning} onChange={formik.handleChange}></textarea>
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="predDescription" className="mr-5 my-2">Description</label>
                <textarea id="predDescription" className="textarea textarea-bordered h-24" placeholder="Program Description" defaultValue={predDescription} onChange={formik.handleChange}></textarea>
              </div>
            </div>
            <div className="col-span-2">
              <div className="my-5 flex justify-center">
                {upload === false ? (
                  <>
                    <div className="avatar mb-3">
                      <div className="w-24 m-auto">
                        {curriculum.progImage === null || curriculum.progImage === '' ? (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>) : imageExists ? (<Image src={`/${curriculum.progImage}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleImageError}/>) : (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>)}
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
                  <div className="flex justify-center my-3">
                    <button className="btn btn-outline btn-error btn-xs" onClick={onClear}>
                      Remove Image
                    </button>
                  </div>
                </div>
                )}
              </div>
              <div className="flex justify-center">
                {!changeImage ? (
                  <button onClick={() => setChangeImage(true)} className="btn btn-outline btn-xs">Change Image</button>
                ):(
                  <div className="flex justify-center flex-col">
                    <input type="file" id="file" name="file" className="file-input file-input-bordered w-full max-w-xs m-auto" onChange={uploadConfig('file')}/>
                    <a className="link link-hover link-error text-center my-2" onClick={() => setChangeImage(false)}>Cancel</a>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Program Section Start*/}
              {/* <div>
                <ProgramSections progEntityId={program.progEntityId} setRefresh={setRefresh}/>
              </div> */}
          {/* Program Section End */}
          <button type='submit' className='btn btn-primary my-3'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
