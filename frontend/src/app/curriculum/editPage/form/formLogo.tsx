import { EditCurriculumReq, GetCurriculumReq, GetOneCurriculumReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";
import config from "@/config/config";
import CustomAlert from "@/ui/alert";

export default function LogoForm(props: any) {
  const dispatch = useDispatch();

  const [previewImg, setPreviewImg] = useState<any>();
  const [upload, setUpload] = useState(false);
  const [imageExists, setImageExists] = useState(true);
  const [changeImage, setChangeImage] = useState(false);

  const program = props.program;
  
  const formik = useFormik({
    initialValues: {
      file: '',
    },
    onSubmit: async (values: any) => {
      const payload = new FormData();
      payload.append("file", values.file);

      const data = {
        id: program.progEntityId,
        data: payload
      }
      
      console.log(`data: ${JSON.stringify(data)}`);
      

      dispatch(EditCurriculumReq(data));
      setPreviewImg('');
      setChangeImage(false);
      setUpload(false);
      props.setOnUpload(false);
      props.setAlertInfo({ showAlert: true, alertText: 'Changed Image Successfully!', alertType: 'success'});
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
    props.setOnUpload(true);
  };
  
  const onClear = (event: any) => {
    event.preventDefault();
    setPreviewImg('');
    setUpload(false);
    props.setOnUpload(false);
  };

  const handleImageError = () => {
    setImageExists(false);
  };

  if (!program || program.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
        <>
            <div className=''>
                    <div className="card-body flex justify-center">
                    <div className="my-5 flex justify-center">
                        {upload === false ? (
                        <>
                            <div className="avatar mb-3">
                            <div className="w-24 m-auto">
                                {program?.progImage === null || program?.progImage === '' ? (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>) : imageExists ? (<Image src={`${config.domain}/program_entity/getImg/${program?.progImage}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleImageError}/>) : (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>)}
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
        </>
      )
  }
}