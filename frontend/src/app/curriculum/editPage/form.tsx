import { useEffect, useState } from "react";
import CustomAlert from "@/ui/alert";
import { useFormik } from "formik";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { EditCurriculumReq } from "@/redux-saga/action/curriculumAction";

// View
import CreateSectionPage from "../section/createSectionPage";
import EditSectionPage from "../section/editSectionPage";
import DeleteSection from "../section/deleteSectionPage";
import CreateSectionDetailPage from "../section/sectionDetail/createSectionDetailPage";
import ViewSecDet from "../section/sectionDetail/viewSectionDetailModal";

export default function EditForm(props: any) {
    const dispatch = useDispatch();
    // const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });
    const program = props.program;
    const category = props.option.category;
    const instructor = props.option.instructor;

    // sectionDetailView
    const [sectDetView, setSectDetView] = useState(false);
    const [editSectDetView, setEditSectDetView] = useState(false);

    // SectionWiev
    const [editSectionView, setEditSectionView] = useState(false);
    const [section, setSection] = useState('');
    const [sectionDeleteView, setSectionDeleteView] = useState(false);
    
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

            // console.log(`Payload: ${JSON.stringify(payload)}`);

            dispatch(EditCurriculumReq(payload));
            props.setView();
            props.setAlertInfo({ showAlert: true, alertText: 'Changed Image Successfully!', alertType: 'success'});
        }
        },
    });

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
                                <label htmlFor="progEntityId" className="my-2 mr-5">Program ID</label>
                                <input type="text" id="progEntityId" placeholder="Program ID" className="input input-bordered w-full mr-5 my-auto" value={program.progEntityId} disabled/>
                                </div>
                                <div className="xl:col-span-5 flex flex-col mb-3">
                                <label htmlFor="progTitle" className="my-2 mr-5">Title</label>
                                <input type="text" id="progTitle" placeholder="Title Program" className="input input-bordered w-full mr-5 my-auto" defaultValue={formik.values.progTitle} onChange={formik.handleChange}/>
                                </div>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progHeadline" className="mr-5 my-2">Headline</label>
                                <input type="text" id="progHeadline" placeholder="Headline Program" className="input input-bordered w-full mr-5 my-auto" defaultValue={formik.values.progHeadline} onChange={formik.handleChange}/>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col mb-3">
                                <label htmlFor="progType" className="my-2 mr-5">Program Type</label>
                                <select id="progType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={formik.values.progType} onChange={formik.handleChange}>
                                    <option disabled>Program Type</option>
                                    <option className="capitalize">bootcamp</option>
                                    <option className="capitalize">course</option>
                                </select>
                                </div>
                                <div className="flex flex-col mb-3 ">
                                <label htmlFor="progLearningType" className="my-2 mr-5">Learning Type</label>
                                <select id="progLearningType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={formik.values.progLearningType} onChange={formik.handleChange}>
                                    <option disabled>Learning Type</option>
                                    <option className="capitalize">online</option>
                                    <option className="capitalize">offline</option>
                                </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                <label htmlFor="progDuration" className="my-2 mr-5">Duration in Month</label>
                                <div className="flex flex-row">
                                    <input type="number" id="progDuration" placeholder="0" className="input input-bordered w-full mr-5 my-auto" defaultValue={formik.values.progDuration} onChange={formik.handleChange}/>
                                    <select id="progDurationType" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={formik.values.progDurationType} onChange={formik.handleChange}>
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
                                <select id="progCateId" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={formik.values.progCateId} onChange={formik.handleChange} required>
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
                                <select id="progLanguage" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={formik.values.progLanguage} onChange={formik.handleChange}>
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
                                <select id="progCreatedById" className="select input-bordered w-full mr-5 my-auto capitalize" defaultValue={formik.values.progCreatedById} onChange={formik.handleChange}>
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
                        </div>
                        <div id="sections">
                            <hr className="mt-3 mb-6"/>
                            <div className="flex justify-between items-center">
                                <p className="p-0 m-0 font-medium text-base uppercase">Materi (Section & Sub Section)</p>
                                <CreateSectionPage progId={program.progEntityId} refreshPage={props.setRefresh} refreshForm={setRefresh}/>
                            </div>
                            <div className="mt-3">
                                { program?.sections?.length !== 0 ? (
                                program?.sections?.map((section: any)=>(
                                <>
                                    <div className="card card-compact w-full bg-base-200 mb-5">
                                        <div className="card-body">
                                            <div className="flex justify-between">
                                                <div className="text-xl font-medium">{section.sectTitle}</div>
                                                <div className="flex">
                                                    <EditSectionPage section={section} progId={program.progEntityId} refreshPage={props.setRefresh} refreshForm={setRefresh}/>
                                                </div>
                                            </div>
                                            <div className="border border-gray-300 my-2"></div>
                                            <div className="mb-3">
                                                {section.sectionDetails?.length !== 0 ? (
                                                section.sectionDetails?.map((item: any, index: any) => {
                                                    return (
                                                        <>
                                                            <div key={item.secdId} className="flex flex-row justify-between">
                                                                {/* <a className="link link-hover" onClick={() => {setEditSectDetView(true); setSection(item);}}>{item.secdTitle}</a> */}
                                                                <ViewSecDet sectionDetail={item} refreshPage={props.setRefresh} refreshForm={setRefresh}/>
                                                                <div className="text-base">{item.secdMinute} Minutes</div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                                ):(
                                                    <div className="flex flex-col gap-3 items-center">
                                                        <div className="">The Section Material are empty, create new!</div>
                                                        <CreateSectionDetailPage progEntityId={program.progEntityId} section={section.sectId} refreshPage={props.setRefresh} refreshForm={setRefresh}/>
                                                    </div>
                                                )
                                                }
                                            </div>
                                            {section.sectionDetails?.length !== 0 ? (
                                                <div className="flex gap-3 items-center justify-end">
                                                    <CreateSectionDetailPage progEntityId={program.progEntityId} section={section.sectId} refreshPage={props.setRefresh} refreshForm={setRefresh}/>
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
                            Submit
                            </button>
                            <button type="button" className="btn btn-neutral" onClick={() => props.setView()}>
                            Cancel
                            </button>
                        </div>
                    </form> 
                </div>
            </>
        )
    }
}
