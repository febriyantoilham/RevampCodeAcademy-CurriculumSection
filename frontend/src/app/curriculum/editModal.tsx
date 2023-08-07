import { useEffect, useState } from "react";
import EditSectionPage from "./section/editSectionPage";
import CustomAlert from "@/ui/alert";
import { useFormik } from "formik";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { EditCurriculumReq } from "@/redux-saga/action/curriculumAction";

// View
import CreateSectionPage from "./section/createSectionPage";
import DeleteSection from "./section/deleteSectionPage";

export default function EditModal(props: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });
    // const { program } = useSelector((state: any) => state.curriculumState);
    const program = props.program;
    const category = props.option.category;
    const instructor = props.option.instructor;

    const [sectId, setSectId] = useState('');

    // View
    const [sectionAddView, setSectionAddView] = useState(false);
    const [sectionDeleteView, setSectionDeleteView] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    useEffect(() => {
        setRefresh(false);
    }, [refresh]);

    // console.log(`Props: ${JSON.stringify(props.program)}`);
    // console.log(`Programs: ${JSON.stringify(program)}`);
    

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

        console.log(`Payload: ${JSON.stringify(payload)}`);

        dispatch(EditCurriculumReq(payload));
        props.setAlertInfo({ showAlert: true, alertText: 'Data Successfully Added!', alertType: 'success'});
        props.setRefresh(true);
        setRefresh(true);
        handleChange();
      }
    },
  });
    if (!program || program.length === 0) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <a onClick={handleChange} className="btn btn-primary btn-sm capitalize">Edit Program</a>

                <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box sm:w-8/12 sm:max-w-full">
                        {sectionAddView ? (
                        <CreateSectionPage setAlertInfo={setAlertInfo} setview={setSectionAddView} progId={program.progEntityId} setRefreshView={props.setRefresh} setRefreshEdit={setRefresh}/>
                        ) : sectionDeleteView ?
                        (
                            <DeleteSection setAlertInfo={setAlertInfo} setview={setSectionDeleteView} progId={program.progEntityId} sectId={sectId} setRefreshView={props.setRefresh} setRefreshEdit={setRefresh}/>
                        ):(
                            <div id="Edit Program">
                                {refresh === false ? (
                                alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo}/>) : (<></>)}
                                <h3 className="font-bold text-lg">
                                    Edit Program ( #{program.progEntityId} )
                                </h3>
                                <div className="border-t border-gray-300 my-3"></div>

                                <div className="py-5">
                                    <form action="" onSubmit={formik.handleSubmit}>
                                        <div id="program_entity">
                                            <p className="p-0 m-0 font-medium text-base uppercase">Program Details</p>
                                            <div className="ml-3 my-3">
                                                <div className="flex flex-col mb-3">
                                                    <label htmlFor="progTitle" className="mb-2 font-medium">Title</label>
                                                    <input type="text" id="progTitle" placeholder="Title Program" className="input input-bordered text-sm capitalize" defaultValue={program?.progTitle} onChange={formik.handleChange}/>
                                                </div>
                                                <div className="flex flex-col mb-3">
                                                    <label htmlFor="progHeadline" className="mb-2 font-medium">Headline</label>
                                                    <input type="text" id="progHeadline" placeholder="Headline Program" className="input input-bordered text-sm capitalize" defaultValue={program?.progHeadline} onChange={formik.handleChange}/>
                                                </div>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="flex flex-col mb-3">
                                                    <label htmlFor="progType" className="mb-2 font-medium">Program Type</label>
                                                    <select id="progType" className="select input-bordered w-full text-sm capitalize font-normal" defaultValue={program?.progType} onChange={formik.handleChange}>
                                                        <option disabled>Program Type</option>
                                                        <option className="capitalize">bootcamp</option>
                                                        <option className="capitalize">course</option>
                                                    </select>
                                                    </div>
                                                    <div className="flex flex-col mb-3">
                                                    <label htmlFor="progLearningType" className="mb-2 font-medium">Learning Type</label>
                                                    <select id="progLearningType" className="select input-bordered w-full text-sm capitalize font-normal" defaultValue={program?.progLearningType} onChange={formik.handleChange}>
                                                        <option disabled>Learning Type</option>
                                                        <option className="capitalize">online</option>
                                                        <option className="capitalize">offline</option>
                                                    </select>
                                                    </div>
                                                    <div className="flex flex-col mb-3">
                                                    <label htmlFor="progDuration" className="mb-2 font-medium">Duration in Month</label>
                                                    <div className="flex flex-row gap-2">
                                                        <input type="number" id="progDuration" placeholder="1" className="input input-bordered text-sm capitalize" defaultValue={program?.progDuration} onChange={formik.handleChange}/>
                                                        <select id="progDurationType" className="select input-bordered w-full text-sm capitalize font-normal" defaultValue={program?.progDurationType} onChange={formik.handleChange}>
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
                                                    <label htmlFor="progCateId" className="mb-2 font-medium">Category</label>
                                                    <select id="progCateId" className="select input-bordered w-full text-sm capitalize font-normal" defaultValue={program?.progCateId} onChange={formik.handleChange}>
                                                        <option disabled>Category</option>
                                                        {category.map((item: any, index: any) => (
                                                        <option key={item.cateId} value={item.cateId}>{item.cateName}</option>
                                                        ))}
                                                    </select>
                                                    </div>
                                                    <div className="flex flex-col mb-3">
                                                    <label htmlFor="progLanguage" className="mb-2 font-medium">Language</label>
                                                    <select id="progLanguage" className="select input-bordered w-full text-sm capitalize font-normal" defaultValue={program?.progLanguage} onChange={formik.handleChange}>
                                                        <option disabled>Language</option>
                                                        <option className="capitalize">english</option>
                                                        <option className="capitalize">bahasa</option>
                                                    </select>
                                                    </div>
                                                    <div className="flex flex-col mb-3">
                                                    <label htmlFor="progPrice" className="mb-2 font-medium">Price in IDR</label>
                                                    <input type="number" id="progPrice" placeholder="100.000" className="input input-bordered text-sm capitalize" defaultValue={program?.progPrice} onChange={formik.handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col mb-3">
                                                    <label htmlFor="progTagSkill" className="mb-2 font-medium">Tags Skill</label>
                                                    <input type="text" id="progTagSkill" placeholder="Java, Sql, Postress, ..." className="input input-bordered text-sm capitalize" defaultValue={program?.progTagSkill} onChange={formik.handleChange}/>
                                                </div>
                                                <div className="grid grid-cols-3 gap-3 mt-3">
                                                    <div className="flex flex-col col-span-2 mb-3">
                                                    <label htmlFor="progCreatedBy" className="mb-2 font-medium">Instructor</label>
                                                    <select id="progCreatedById" className="select input-bordered w-full text-sm capitalize font-normal" defaultValue={'Instructor'} onChange={formik.handleChange}>
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
                                                    <label htmlFor="predItemLearning" className="mb-2 font-medium">What will you learn ?</label>
                                                    <textarea id="predItemLearning" className="textarea textarea-bordered h-24" placeholder="What will you learn ?" defaultValue={program?.programEntityDescription?.predItemLearning?.items} onChange={formik.handleChange}></textarea>
                                                </div>
                                                <div className="flex flex-col mb-3">
                                                    <label htmlFor="predDescription" className="mb-2 font-medium">Description</label>
                                                    <textarea id="predDescription" className="textarea textarea-bordered h-24" placeholder="Program Description" defaultValue={program?.programEntityDescription?.predDescription?.items} onChange={formik.handleChange}></textarea>
                                                </div>
                                                <div id="sections">
                                                <hr className="mt-3 mb-6"/>
                                                <div className="flex justify-between items-center">
                                                    <p className="p-0 m-0 font-medium text-base uppercase">Materi (Section & Sub Section)</p>
                                                    <a className="btn btn-primary btn-sm" onClick={ ()=> setSectionAddView(true) }>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Add New</span>
                                                    </a>
                                                </div>
                                                <div className="mt-3">
                                                    { program?.sections?.length !== 0 ? (
                                                    program?.sections?.map((section: any)=>(
                                                    <>
                                                        <div className="card card-compact w-full bg-base-200 mb-5 py-3">
                                                            <div className="flex justify-between px-5">
                                                                <div className="text-xl font-medium my-auto">{section.sectTitle}</div>
                                                                <div className="flex">
                                                                    <EditSectionPage/>
                                                                    <button className="btn btn-error btn-sm" onClick={()=>{setSectionDeleteView(true); setSectId(section.sectId)}}>Delete</button>
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <div>
                                                                    <div className="border border-gray-300 mb-3"></div>
                                                                    {section.sectionDetails?.length !== 0 ? (
                                                                    section.sectionDetails?.map((item: any, index: any) => {
                                                                        return (
                                                                            <>
                                                                                <div key={item.secdId} className="flex flex-row justify-between my-1">
                                                                                    <div className="text-base">{item.secdMinute} Minutes</div>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    })
                                                                    ):(
                                                                    <div className="text-center">The Section Material are empty, add new!</div>
                                                                    )
                                                                    }
                                                                </div>
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
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-300 my-3"></div>
                                        <div className="modal-action">
                                            <button type="button" className="btn btn-error" onClick={()=>{handleChange(); setRefresh(true);}}>
                                            Cancel
                                            </button>
                                            <button type='submit' className='btn btn-primary'>
                                                Submit
                                            </button>
                                        </div>
                                    </form> 
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
