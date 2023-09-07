import { EditCurriculumReq, GetCurriculumReq, GetOneCurriculumReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";
import config from "@/config/config";
import CustomAlert from "@/app/ui/alert";

export default function LogoForm(props: any) {
  const [imageExists, setImageExists] = useState(true);
  const program = props.program;
  
  const handleImageError = () => {
    setImageExists(false);
  };

  if (!program || program.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
        <>
          <div className="avatar">
            <div className="w-40">
                {program?.progImage === null || program?.progImage === '' ? (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>) : imageExists ? (<Image src={`${config.domain}/program_entity/getImg/${program?.progImage}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleImageError}/>) : (<Image src="/photo-def.png" alt={""} layout="fill" objectFit="contain"/>)}
            </div>
          </div>
        </>
      )
  }
}