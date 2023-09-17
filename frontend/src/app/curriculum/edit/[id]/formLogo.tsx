import { EditProgramReq} from "@/redux-saga/action/curriculum/programEntityAction";
import Image from "next/image"
import { useState } from "react";
import { useDispatch } from "react-redux"
import { useFormik } from "formik";
import config from "@/config/config";

export default function LogoForm(props: any) {
  const dispatch = useDispatch(); // Dispatch
  const [previewImg, setPreviewImg] = useState<any>(); // Set Image Preview
  const [upload, setUpload] = useState(false); // Set On Upload Status
  const [imageExists, setImageExists] = useState(true); // Set Image Status
  const [changeImage, setChangeImage] = useState(false); // Set Change Image Status
  const program = props.program; // Program Data
  
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
      
      dispatch(EditProgramReq(data));
      setPreviewImg('');
      setChangeImage(false);
      setUpload(false);
      props.setRefresh(true);
      props.setOnUpload(false);
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

  return (
    <div className=''>
      <div className="card-body flex justify-center">
      <div className="my-5 flex justify-center">
        {upload === false ? (
          <div className="avatar mb-3">
            <div className="w-24 m-auto">
                {program?.progImage === null || program?.progImage === '' ? (<Image src="/photo-def.png" alt={""} width={1000} height={1000}/>) : imageExists ? (<Image src={`${config.domain}/program_entity/getImg/${program?.progImage}`} alt={"dss"} width={1000} height={1000} onError={handleImageError}/>) : (<Image src="/photo-def.png" alt={""} width={1000} height={1000}/>)}
            </div>
          </div>
        ):(
          <div className="flex flex-col">
            <div className="avatar mb-3">
                <div className="w-24 mask mask-squircle m-auto">
                    <Image src={previewImg} alt={"x"} width={1000} height={1000}/>
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
            <a className="btn btn-error btn-outline btn-sm text-center mt-5 mx-2" onClick={(event) => {setChangeImage(false); onClear(event)}}>Cancel</a>
            {upload === true ? (
              <a className='btn btn-primary btn-sm mt-5 mx-2' onClick={() => formik.handleSubmit()}>
                  Submit
              </a>
            ) : (<></>)}
          </div>
        </div>
        )}
      </div>
      </div>
    </div>
  )
}