import { useEffect, useState } from "react";
import CustomAlert from "@/app/ui/alert";
import { useFormik } from "formik";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { CreateProgramReq, DeleteProgramReq, EditProgramReq, ResetProgram } from "@/redux-saga/action/curriculum/programEntityAction";
import { useRouter } from "next/navigation";

// View
import config from "@/config/config";
import CustomSelect from "@/app/ui/customSelect";
import Link from "next/link";
import CreateSectionPage from "./section/createSectionPage";
import EditSectionPage from "./section/editSectionPage";
import CreateSectionDetailPage from "./section/sectionDetail/createSectionDetailPage";
import ViewSecDet from "./section/sectionDetail/viewSectionDetailModal";
import { GetAllSectionRequest } from "@/redux-saga/action/curriculum/sectionAction";

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
    const [previewImg, setPreviewImg] = useState<any>();
    const [upload, setUpload] = useState(false);
    const sectionList = useSelector((state: any) => state.sectionState.sectionList); // sectionList State (sectionReducer)

    useEffect(() => {
        setRefresh(false);
    }, [refresh])

    const {
        progHeadline,
        progTitle,
        progType,
        progLearningType,
        progDuration,
        progDurationType,
        progCateId,
        progLanguage,
        progPrice,
        progTagSkill,
        progCreatedById = -1,
        programEntityDescription = {},
    } = program || {};

    const {
        predItemLearning: { items: predItemLearning = [] } = {},
        predDescription: { items: predDescription = [] } = {},
    } = programEntityDescription || {};


    const loadValue = {
        progHeadline,
        progTitle,
        progType,
        progLearningType,
        progDuration,
        progDurationType,
        progCateId,
        progLanguage,
        progPrice,
        progTagSkill,
        progCreatedById,
        predItemLearning,
        predDescription,
        file: '',
    };


    const formik = useFormik({
        initialValues: loadValue,

        enableReinitialize: false,

        onSubmit: async (values: any) => {
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

            if (props.onEdit === false) {
                console.log(`Create`);
                dispatch(CreateProgramReq(payload));
                props.setOnEdit(false);
                props.setOnEdit(true);
                props.setRefresh(false);
                props.setRefresh(true);
            } else {
                console.log(`Update`);
                dispatch(EditProgramReq(
                    {
                        id: progEntityId,
                        data: payload
                    }
                ));
                props.setOnEdit(false);
                router.push('/curriculum');
            }
            formik.setValues(loadValue);
            setRefresh(true);
        }
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

    const handleImageError = () => {
        setImageExists(false);
    };

    const instructorOptions = instructor?.map((item: any) => ({
        value: item.userEntityId,
        label: `${item.userFirstName} ${item.userLastName}`,
    }))

    const onDelete = () => {
        if (props.onEdit === true) {
            console.log('Delete');
            dispatch(DeleteProgramReq(progEntityId));
            router.push('/curriculum');
        } else {
            console.log('Cancel Aja');
            router.push('/curriculum');
        }
    }

    return (
        <>
            <div className="grid xl:grid-cols-5 gap-5">
                <div id="logo" className="xl:col-span-2 xl:order-last">
                    <div className="flex flex-col my-5">
                        {upload === false ? (
                        <>
                            <div className="avatar mb-3">
                                <div className="w-24 m-auto">
                                    <Image src="/photo-def.png" alt={""} width={500} height={500}/>
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
                        <input type="file" id="file" name="file" className="file-input file-input-bordered w-full max-w-xs m-auto" onChange={uploadConfig('file')}/>
                    </div>
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
                                            formik.values.progCreatedById < 0 ? (<Image src="/userDefault.png" alt={"photo-pic"} width={1000} height={1000}/>
                                            ) : ( instructor.map((emp: any, index: any) => (
                                                <div key={index}>
                                                {emp.userEntityId == formik.values.progCreatedById ? (
                                                    imageExists ? (
                                                    <Image src={`${config.domain}/program_entity/getImg/${emp.userPhoto}`} alt={"dss"} width={1000} height={1000} onError={handleImageError}/>
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
                            <CustomSelect options={instructorOptions} defaultValue={instructorOptions.find((option: any) => option.value === formik.values.progCreatedById)} onChange={formik.setFieldValue} id={'progCreatedById'}/>
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
                            <CreateSectionPage progEntityId={progEntityId} onEdit={props.onEdit} setRefresh={props.setRefresh}/>
                        </div>
                        { program && 
                            <div className="mt-3">
                                { program.sections.length !== 0 && sectionList ? (
                                    sectionList.map((section: any, index: any)=>(
                                        <div key={index} className="card card-compact w-full bg-base-200 mb-5">
                                            <div className="card-body">
                                                <div className="flex justify-between">
                                                    <div className="text-xl font-medium">{section.sectTitle}</div>
                                                    <div className="flex">
                                                        <EditSectionPage section={section} progEntityId={progEntityId} onEdit={props.onEdit} setRefresh={props.setRefresh}/>
                                                    </div>
                                                </div>
                                                <div className="border border-gray-300 my-2"></div>
                                                <div className="mb-3">
                                                    {section.sectionDetails.length !== 0 ? (
                                                    section.sectionDetails.length !== 0 && section.sectionDetails?.map((item: any, index: any) => {
                                                        return (
                                                            <div key={index}>
                                                                <ViewSecDet sectionDetail={item} setRefresh={props.setRefresh}/>
                                                            </div>
                                                        )
                                                    })
                                                    ):(
                                                        <div className="flex flex-col gap-3 items-center">
                                                            <div className="">The Section Material are empty, create new!</div>
                                                            <CreateSectionDetailPage progEntityId={progEntityId} sectId={section.sectId} setRefresh={props.setRefresh}/>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                                {section.sectionDetails?.length !== 0 ? (
                                                    <div className="flex gap-3 items-center justify-end">
                                                        <CreateSectionDetailPage progEntityId={progEntityId} sectId={section.sectId} setRefresh={props.setRefresh}/>
                                                    </div>
                                                ):(<></>)}
                                            </div>
                                        </div>
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
                            {props.onEdit ? 'Submit' : 'Continue'}
                        </button>
                        <button type="button" onClick={onDelete} className="btn btn-neutral my-auto">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    )
}
