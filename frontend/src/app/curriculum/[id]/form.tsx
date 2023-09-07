import { useEffect, useState } from "react";
import CustomAlert from "@/app/ui/alert";
import { useFormik } from "formik";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AddCurriculumReq, DeleteCurriculumReq, EditCurriculumReq, ResetCurriculumState } from "@/redux-saga/action/curriculumAction";
import { useRouter } from "next/navigation";

// View
import config from "@/config/config";
import CustomSelect from "@/app/ui/customSelect";
import Link from "next/link";
import CreateSectionPage from "./section/createSectionPage";
import EditSectionPage from "./section/editSectionPage";
import CreateSectionDetailPage from "./section/sectionDetail/createSectionDetailPage";
import ViewSecDet from "./section/sectionDetail/viewSectionDetailModal";
import LogoForm from "./formLogo";

export default function Form(props: any) {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });
    const program = props.program;
    const progEntityId = props.progEntityId;
    const category = props.option.category;
    const instructor = props.option.instructor;
    const router = useRouter();

    // Instructor Image
    const [imageExists, setImageExists] = useState(true);
    const [onUpload, setOnUpload] = useState(false);

    useEffect(() => {
        setRefresh(false);
    }, [refresh])

    const loadValue = {
        progHeadline: program?.progHeadline,
        progTitle: program?.progTitle,
        progType: program?.progType,
        progLearningType: program?.progLearningType,
        progDuration: program?.progDuration,
        progDurationType: program?.progDurationType,
        progCateId: program?.progCateId,
        progLanguage: program?.progLanguage,
        progPrice: program?.progPrice,
        progTagSkill: program?.progTagSkill,
        progCreatedById: program?.progCreatedById,
        predItemLearning: program?.programEntityDescription?.predItemLearning.items,
        predDescription: program?.programEntityDescription?.predDescription.items,
    }

    const formik = useFormik({
        initialValues: loadValue,

        enableReinitialize: false,

        onSubmit: async (values: any) => {
            const payload = new FormData();
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

            console.log(`Values: ${JSON.stringify(values)}`);
            

            props.setId(progEntityId);
            dispatch(ResetCurriculumState());
            if(onUpload){
                setAlertInfo({ showAlert: true, alertText: 'Please Submit or Cancel the Image Upload!', alertType: 'error'});
            } else {
                if (program.length === 0) {
                    dispatch(AddCurriculumReq(payload));
                } else {
                    dispatch(EditCurriculumReq(
                    {
                        id: progEntityId,
                        data: payload
                    }
                    ));
                    dispatch(ResetCurriculumState());
                    router.push('/curriculum');
                }
            }
            // formik.setValues(loadValue);
            props.setRefresh(true);
            setRefresh(true);
        }
    });

    const handleImageError = () => {
        setImageExists(false);
    };

    const instructorOptions = instructor?.map((item: any) => ({
        value: item.userEntityId,
        label: `${item.userFirstName} ${item.userLastName}`,
    }))

    const onDelete = () => {
        if (program.length !== 0) {
            console.log('Delete');
            dispatch(DeleteCurriculumReq(progEntityId));
            dispatch(ResetCurriculumState());
            router.push('/curriculum');
        } else {
            console.log('Cancel Aja');
            dispatch(ResetCurriculumState());
            router.push('/curriculum');
        }
    }

    const onCancel = () => {
        dispatch(ResetCurriculumState());
        router.push('/curriculum');
    }

    console.log(JSON.stringify(program.progImage));
    

    return (
        <>
            {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} setRefresh={setRefresh}/>}
            <div className="grid xl:grid-cols-5 gap-5">
                <div id="logo" className="xl:col-span-2 xl:order-last">
                   <LogoForm program={program} setRefresh={props.setRefresh} setOnUpload={setOnUpload}/>
                </div>
                <div id="form" className="xl:col-span-3">
                    <div id="program_entity">
                        <div className="grid xl:grid-cols-6 gap-x-2">
                            <div className="xl:col-span-1 flex flex-col mb-3">
                                <label htmlFor="progEntityId" className="mb-2 font-medium">Program ID</label>
                                <input type="text" id="progEntityId" placeholder="Program ID" className="input input-bordered w-full capitalize" defaultValue={progEntityId} disabled/>
                            </div>
                            <div className="xl:col-span-5 flex flex-col mb-3">
                                <label htmlFor="progTitle" className="mb-2 font-medium">Title</label>
                                <input type="text" id="progTitle" placeholder="Title Program" className="input input-bordered w-full capitalize" defaultValue={formik.values.progTitle} onChange={formik.handleChange} required/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="progHeadline" className="mb-2 font-medium">Headline</label>
                            <input type="text" id="progHeadline" placeholder="Headline Program" className="input input-bordered w-full capitalize" defaultValue={formik.values.progHeadline} onChange={formik.handleChange} required/>
                        </div>
                        <div className="grid xl:grid-cols-3 gap-x-3">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progType" className="mb-2 font-medium">Program Type</label>
                                <select id="progType" className="select input-bordered w-full capitalize" defaultValue={'Program Type'} onChange={formik.handleChange} required>
                                    <option disabled>Program Type</option>
                                    <option className="capitalize">bootcamp</option>
                                    <option className="capitalize">course</option>
                                </select>
                            </div>
                            <div className="flex flex-col mb-3 ">
                                <label htmlFor="progLearningType" className="mb-2 font-medium">Learning Type</label>
                                <select id="progLearningType" className="select input-bordered w-full capitalize" defaultValue={'Learning Type'} onChange={formik.handleChange} required>
                                    <option disabled>Learning Type</option>
                                    <option className="capitalize">online</option>
                                    <option className="capitalize">offline</option>
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progDuration" className="mb-2 font-medium">Duration in Month</label>
                                <div className="flex flex-row gap-x-3">
                                    <input type="number" id="progDuration" min={0} placeholder="0" className="input input-bordered w-full capitalize" defaultValue={formik.values.progDuration} onChange={formik.handleChange}/>
                                    <select id="progDurationType" className="select input-bordered w-full capitalize" defaultValue={'Duration'} onChange={formik.handleChange}>
                                        <option disabled>Duration</option>
                                        <option className="capitalize">days</option>
                                        <option className="capitalize">week</option>
                                        <option className="capitalize">month</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progCateId" className="mb-2 font-medium">Category</label>
                                <select id="progCateId" className="select input-bordered w-full capitalize" defaultValue={'Category'} onChange={formik.handleChange} required>
                                    <option disabled>Category</option>
                                    {category.map((item: any) => {
                                    return (
                                        <option key={item.cateId} value={item.cateId}>{item.cateName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progLanguage" className="mb-2 font-medium">Language</label>
                                <select id="progLanguage" className="select input-bordered w-full capitalize" defaultValue={'Language'} onChange={formik.handleChange}>
                                    <option disabled>Language</option>
                                    <option className="capitalize">english</option>
                                    <option className="capitalize">bahasa</option>
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progPrice" className="mb-2 font-medium">Price in IDR</label>
                                <input type="number" id="progPrice" min={0} placeholder="100.000" className="input input-bordered w-full capitalize" defaultValue={formik.values.progPrice} onChange={formik.handleChange}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="progTagSkill" className="mb-2 font-medium">Tags Skill</label>
                            <input type="text" id="progTagSkill" placeholder="Java, Sql, Postress, ..." className="input input-bordered w-full capitalize" defaultValue={formik.values.progTagSkill} onChange={formik.handleChange}/>
                        </div>
                        <div className="grid xl:grid-cols-3 gap-3 mt-3">
                            <div className="flex flex-col xl:col-span-1 xl:order-last">
                                <div className="avatar">
                                    <div className="w-24 mask mask-circle m-auto">
                                        {
                                        formik.values.progCreatedById < 0 ? (<Image src="/userDefault.png" alt={"photo-pic"} layout="fill" objectFit="contain"/>
                                        ) : ( instructor.map((emp: any, index: any) => (
                                            <div key={index}>
                                            {emp.userEntityId == formik.values.progCreatedById ? (
                                                imageExists ? (
                                                <Image src={`${config.domain}/program_entity/getImg/${emp.userPhoto}`} alt={"dss"} layout="fill" objectFit="contain" onError={handleImageError}/>
                                                ) : ( 
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-24 flex flex-col">
                                                    <span className="text-sm">Image</span>
                                                    <span className="text-sm">Not Found</span>
                                                    </div>
                                                </div> 
                                                )
                                            ) : (<></>)}
                                            </div>
                                        )))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center xl:col-span-2 mb-3 gap-2">
                            <label htmlFor="progCreatedById" className="mb-2 font-medium">Instructor</label>
                            <CustomSelect options={instructorOptions} defaultValue={instructorOptions.find((option: any) => option.value === formik.values.progCreatedById)} onChange={formik.setFieldValue}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="predItemLearning" className="mb-2 font-medium">What will you learn ?</label>
                            <textarea id="predItemLearning" className="textarea textarea-bordered h-24" placeholder="What will you learn ?" defaultValue={formik.values.predItemLearning} onChange={formik.handleChange}></textarea>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="predDescription" className="mb-2 font-medium">Description</label>
                            <textarea id="predDescription" className="textarea textarea-bordered h-24" placeholder="Program Description" defaultValue={formik.values.predDescription} onChange={formik.handleChange}></textarea>
                        </div>
                    </div>
                    <div id="sections">
                        <hr className="mt-3 mb-6"/>
                        <div className="flex justify-between items-center">
                            <p className="p-0 m-0 font-medium text-base uppercase">Materi (Section & Sub Section)</p>
                            <CreateSectionPage program={program} setRefresh={props.setRefresh}/>
                        </div>
                        { program.length !== 0 && 
                            <div className="mt-3">
                                { program.sections.length !== 0 ? (
                                    program.sections.map((section: any)=>(
                                    <>
                                        <div className="card card-compact w-full bg-base-200 mb-5">
                                            <div className="card-body">
                                                <div className="flex justify-between">
                                                    <div className="text-xl font-medium">{section.sectTitle}</div>
                                                    <div className="flex">
                                                        <EditSectionPage section={section} program={program} setRefresh={props.setRefresh}/>
                                                    </div>
                                                </div>
                                                <div className="border border-gray-300 my-2"></div>
                                                <div className="mb-3">
                                                    {section.sectionDetails?.length !== 0 ? (
                                                    section.sectionDetails?.map((item: any, index: any) => {
                                                        return (
                                                            <>
                                                                <ViewSecDet sectionDetail={item} setRefresh={props.setRefresh}/>
                                                            </>
                                                        )
                                                    })
                                                    ):(
                                                        <div className="flex flex-col gap-3 items-center">
                                                            <div className="">The Section Material are empty, create new!</div>
                                                            <CreateSectionDetailPage program={program} section={section} setRefresh={props.setRefresh}/>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                                {section.sectionDetails?.length !== 0 ? (
                                                    <div className="flex gap-3 items-center justify-end">
                                                        <CreateSectionDetailPage program={program} section={section} setRefresh={props.setRefresh}/>
                                                    </div>
                                                ):(<></>)}
                                            </div>
                                        </div>
                                    </>
                                    ))) : (
                                    <div className="flex justify-between items-center">
                                    <div className="">The sections are not added yet, click edit program to add new section!</div>
                                    </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                    <div id="button" className="flex justify-end gap-3">
                        <button type="button" className="btn btn-primary my-3" onClick={() => formik.handleSubmit()}>
                            Submit
                        </button>
                        <button type="button" onClick={onCancel} className="btn btn-neutral my-auto">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    )
}
