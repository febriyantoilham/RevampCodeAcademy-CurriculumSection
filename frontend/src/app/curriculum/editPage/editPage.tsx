import { AddCurriculumReq, EditCurriculumReq, GetNewIdReq, GetOneCurriculumReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";

import CustomAlert from "@/ui/alert";
import EditForm from "./form";
import LogoForm from "./formLogo";

export default function Edit(props: any) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);

  // Upload Image Config
  const [previewImg, setPreviewImg] = useState<any>();
  const [upload, setUpload] = useState(false);

  // Alert
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

  // State
  const { program } = useSelector((state: any) => state.programEntityState)
  const { category, instructor } = useSelector((state: any) => state.categoryCurriculumState);
  const progEntityId = props.progEntityId

  const initialValues = program

  useEffect(() => {
    dispatch(GetOneCurriculumReq(progEntityId));
    setRefresh(false);
  }, [dispatch, progEntityId, refresh])

  

  // const uploadConfig = (name: any) => (e: any) => {
  //   let reader = new FileReader();
  //   const image = e.target.files[0];
  //   reader.onload = () => {
  //     setPreviewImg(reader.result);
  //   };
  //   reader.readAsDataURL(image);
  //   formik.setFieldValue("file", image);
  //   setUpload(true);
  // };

  const onClear = (event: any) => {
    event.preventDefault();
    setPreviewImg('');
    setUpload(false);
  };

  const handleBackBtn = () => {
    dispatch(ResetCurriculumState());
    props.setDisplay(false);
    props.setRefresh(true);
  }

  // console.log(`Initial Value: ${JSON.stringify(formik.initialValues)}`);
  
  if (!program || program.length === 0) {
    return <div>Loading...</div>;
  } else if (program.progEntityId && props.progEntityId) {
    return (
      <>
        {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo}/>}
        <div className=''>
          <div className='py-2'>
            <div className='flex justify-between items-center gap-4'>
              <div className='text-xl font-medium'>Edit Curriculum</div>
              <button onClick={() => handleBackBtn()} className="btn btn-outline btn-square btn-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-300 my-3"></div>
          <div>
            <div className="grid xl:grid-cols-5 gap-5">
              <div className="xl:col-span-2 xl:order-last">
                <LogoForm program={program} setRefresh={setRefresh} setAlertInfo={setAlertInfo}/>
              </div>
              <div className="xl:col-span-3">
                <EditForm program={program} option={{ category, instructor }} setAlert={props.setAlertInfo} setView={handleBackBtn} setRefresh={setRefresh}/>
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
