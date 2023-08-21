import { useEffect, useState } from "react";
import CustomAlert from "@/ui/alert";
import { useFormik } from "formik";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { EditCurriculumReq } from "@/redux-saga/action/curriculumAction";


// View
import CreateSectionPage from "./section/createSectionPage";
import EditSectionPage from "./section/editSectionPage";
import DeleteSection from "./section/deleteSectionPage";
import CreateSectionDetailPage from "./section/sectionDetail/createSectionDetailPage";
import ViewSecDet from "./section/sectionDetail/viewSectionDetailModal";
import config from "@/config/config";
import CustomSelect from "@/ui/customSelect";

export default function EditForm(props: any) {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(props.refresh);
    const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });
    const program = props.program;
    const category = props.option.category;
    const instructor = props.option.instructor;

    // Instructor Image
    const [imageExists, setImageExists] = useState(true);

    useEffect(() => {
        setRefresh(false);
    }, [refresh])

    const formik = useFormik({
        initialValues: {
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
        predItemLearning: program?.programEntityDescription?.predItemLearning?.items,
        predDescription: program?.programEntityDescription?.predDescription?.items,
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
            const payload = {
            id: program.progEntityId,
            data: {
                progHeadline: values.progHeadline,
                progTitle: values.progTitle,
                progType: values.progType,
                progLearningType: values.progLearningType,
                progDuration: values.progDuration,
                progDurationType: values.progDurationType,
                progCateId: values.progCateId,
                progLanguage: values.progLanguage,
                progPrice: values.progPrice,
                progTagSkill: values.progTagSkill,
                progCreatedById: values.progCreatedById,
                predItemLearning: values.predItemLearning,
                predDescription: values.predDescription,
            }
            }

            if(props.onUpload){
                props.setAlertInfo({ showAlert: true, alertText: 'Please Submit or Cancel the Image Upload!', alertType: 'error'});
            } else {
                dispatch(EditCurriculumReq(payload));
                props.setView();
                props.setAlertInfoView({ showAlert: true, alertText: 'Edit Success!', alertType: 'success'});
            }

        }
        },
    });

    const handleImageError = () => {
        setImageExists(false);
    };

    const instructorOptions = instructor.map((item: any) => ({
        value: item.userEntityId,
        label: `${item.userFirstName} ${item.userLastName}`,
    }))

    if (!program || program.length === 0) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div id="Edit Program">
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div id="program_entity">
                            <div className="grid xl:grid-cols-6 gap-x-2">
                                <div className="xl:col-span-1 flex flex-col mb-3">
                                    <label htmlFor="progEntityId" className="mb-2 font-medium">Program ID</label>
                                    <input type="text" id="progEntityId" placeholder="Program ID" className="input input-bordered w-full capitalize" value={program.progEntityId} disabled/>
                                </div>
                                <div className="xl:col-span-5 flex flex-col mb-3">
                                    <label htmlFor="progTitle" className="mb-2 font-medium">Title</label>
                                    <input type="text" id="progTitle" placeholder="Title Program" className="input input-bordered w-full capitalize" defaultValue={formik.values.progTitle} onChange={formik.handleChange}/>
                                </div>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progHeadline" className="mb-2 font-medium">Headline</label>
                                <input type="text" id="progHeadline" placeholder="Headline Program" className="input input-bordered w-full capitalize" defaultValue={formik.values.progHeadline} onChange={formik.handleChange}/>
                                </div>
                            <div className="grid xl:grid-cols-3 gap-x-3">
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="progType" className="mb-2 font-medium">Program Type</label>
                                    <select id="progType" className="select input-bordered w-full capitalize font-normal" defaultValue={formik.values.progType} onChange={formik.handleChange}>
                                        <option disabled>Program Type</option>
                                        <option className="capitalize">bootcamp</option>
                                        <option className="capitalize">course</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3 ">
                                    <label htmlFor="progLearningType" className="mb-2 font-medium">Learning Type</label>
                                    <select id="progLearningType" className="select input-bordered w-full capitalize font-normal" defaultValue={formik.values.progLearningType} onChange={formik.handleChange}>
                                        <option disabled>Learning Type</option>
                                        <option className="capitalize">online</option>
                                        <option className="capitalize">offline</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="progDuration" className="mb-2 font-medium">Duration in Month</label>
                                        <div className="flex flex-row gap-x-3">
                                            <input type="number" id="progDuration" placeholder="0" className="input input-bordered w-full capitalize" defaultValue={formik.values.progDuration} onChange={formik.handleChange}/>
                                            <select id="progDurationType" className="select input-bordered w-full capitalize font-normal" defaultValue={formik.values.progDurationType} onChange={formik.handleChange}>
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
                                    <select id="progCateId" className="select input-bordered w-full capitalize font-normal" defaultValue={formik.values.progCateId} onChange={formik.handleChange} required>
                                        <option value={-1} disabled>Category</option>
                                        {category.map((item: any) => {
                                        return (
                                        <option key={item.cateId} value={item.cateId}>{item.cateName}</option>
                                        );
                                        })}
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="progLanguage" className="mb-2 font-medium">Language</label>
                                    <select id="progLanguage" className="select input-bordered w-full capitalize font-normal" defaultValue={formik.values.progLanguage} onChange={formik.handleChange}>
                                    <option disabled>Language</option>
                                    <option className="capitalize">english</option>
                                    <option className="capitalize">bahasa</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="progPrice" className="mb-2 font-medium">Price in IDR</label>
                                    <input type="number" id="progPrice" placeholder="100.000" className="input input-bordered w-full capitalize" defaultValue={formik.values.progPrice} onChange={formik.handleChange}/>
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
                                            ) : ( instructor.map((emp: any) => (
                                            emp.userEntityId == formik.values.progCreatedById ? (
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
                                            ) : (<></>)
                                            )))
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center xl:col-span-2 mb-3">
                                    <label htmlFor="progCreatedBy" className="mb-2 font-medium">Instructor</label>
                                    {/* <select id="progCreatedById" className="select input-bordered w-full capitalize font-normal" defaultValue={formik.values.progCreatedById} onChange={formik.handleChange}>
                                    <option value={-1} disabled>Instructor</option>
                                    {instructor.map((emp: any) => (
                                        <option key={emp.userEntityId} value={emp.userEntityId}>{`${emp.userFirstName} ${emp.userLastName}`}</option>
                                    ))}
                                    </select> */}
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
                                <CreateSectionPage progId={program.progEntityId} refreshForm={setRefresh} setAlertInfo={props.setAlertInfo}/>
                            </div>
                            <div className="mt-3">
                                { program.sections.length !== 0 ? (
                                program.sections.map((section: any)=>(
                                <>
                                    <div className="card card-compact w-full bg-base-200 mb-5">
                                        <div className="card-body">
                                            <div className="flex justify-between">
                                                <div className="text-xl font-medium">{section.sectTitle}</div>
                                                <div className="flex">
                                                    <EditSectionPage section={section} progId={program.progEntityId} refreshForm={setRefresh} setAlertInfo={props.setAlertInfo}/>
                                                </div>
                                            </div>
                                            <div className="border border-gray-300 my-2"></div>
                                            <div className="mb-3">
                                                {section.sectionDetails?.length !== 0 ? (
                                                section.sectionDetails?.map((item: any, index: any) => {
                                                    return (
                                                        <>
                                                            <div key={item.secdId} className="flex flex-row justify-between">
                                                                <ViewSecDet sectionDetail={item} refreshPage={props.setRefresh} refreshForm={setRefresh} setAlertInfo={props.setAlertInfo}/>
                                                                <div className="flex gap-5"> 
                                                                    <p className="text-base">{item.secdMinute} Minutes</p>
                                                                    {item.sectionDetailMaterials[0].sedmFiletype === 'image' ? (<>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                                                                    </>) : item.sectionDetailMaterials[0].sedmFiletype === 'video' ? (<>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                                                                    </>) : (<></>)}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                                ):(
                                                    <div className="flex flex-col gap-3 items-center">
                                                        <div className="">The Section Material are empty, create new!</div>
                                                        <CreateSectionDetailPage progEntityId={program.progEntityId} section={section.sectId} refreshForm={setRefresh} setAlertInfo={props.setAlertInfo}/>
                                                    </div>
                                                )
                                                }
                                            </div>
                                            {section.sectionDetails?.length !== 0 ? (
                                                <div className="flex gap-3 items-center justify-end">
                                                    <CreateSectionDetailPage progEntityId={program.progEntityId} section={section.sectId} refreshForm={setRefresh} setAlertInfo={props.setAlertInfo}/>
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
                        </div>
                        <div className="modal-action">
                            <button type='submit' className='btn btn-primary'>
                            Save
                            </button>
                            <button type="button" className="btn btn-neutral" onClick={() => props.setView()}>
                                {props.create ? (<>Close</>):(<>Cancel</>)}
                            </button>
                        </div>
                    </form> 
                </div>
            </>
        )
    }
}
