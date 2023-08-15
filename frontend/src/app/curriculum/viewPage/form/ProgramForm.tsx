import Image from "next/image";
import MediaShow from "./section/MediaShow";
import { useState } from "react";
import config from "@/config/config";

export default function ProgramForm(props: any) {
    const program = props.program;
    const category = props.option.category;
    const instructor = props.option.instructor;

    // Instructor Image
    const [imageExists, setImageExists] = useState(true);

    const handleImageError = () => {
        setImageExists(false);
    };

    if (!program || program.length === 0) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div id="Edit Program">
                    <div id="program_entity">
                        <div className="grid xl:grid-cols-6 gap-x-2">
                            <div className="xl:col-span-1 flex flex-col mb-3">
                                <label htmlFor="progEntityId" className="mb-2 font-medium">Program ID</label>
                                <input type="text" id="progEntityId" placeholder="Program ID" className="input input-bordered w-full capitalize" value={program.progEntityId} disabled/>
                            </div>
                            <div className="xl:col-span-5 flex flex-col mb-3">
                                <label htmlFor="progTitle" className="mb-2 font-medium">Title</label>
                                <input type="text" id="progTitle" placeholder="Title Program" className="input input-bordered w-full capitalize" value={program.progTitle} disabled/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="progHeadline" className="mb-2 font-medium">Headline</label>
                            <input type="text" id="progHeadline" placeholder="Headline Program" className="input input-bordered w-full capitalize" value={program.progHeadline} disabled/>
                        </div>
                        <div className="grid xl:grid-cols-3 gap-x-3">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progType" className="mb-2 font-medium">Program Type</label>
                                <input type="text" id="progType" placeholder="Program Type" className="input input-bordered w-full capitalize" value={program.progType} disabled/>
                            </div>
                            <div className="flex flex-col mb-3 ">
                                <label htmlFor="progLearningType" className="mb-2 font-medium">Learning Type</label>
                                <input type="text" id="progLearningType" placeholder="Learning Type" className="input input-bordered w-full capitalize" value={program.progLearningType} disabled/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progDuration" className="mb-2 font-medium">Duration in Month</label>
                                <div className="flex flex-row gap-3">
                                    <input type="number" id="progDuration" placeholder="0" className="input input-bordered w-full capitalize" value={program.progDuration} disabled/>
                                    <input type="text" id="progDurationType" placeholder="Period" className="input input-bordered w-full capitalize" value={program.progDurationType} disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="grid xl:grid-cols-3 gap-x-3">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progCateId" className="mb-2 font-medium">Program Category</label>
                                {program.progCateId !== null ? (
                                    category.map((item: any) => (
                                        item.cateId === program.progCateId ? (<input key={item.cateId} type="text" id="progCateId" placeholder="Program Category" className="input input-bordered w-full capitalize" value={item.cateName} disabled/>):(<></>)    
                                    ))
                                ) : (
                                    <input type="text" id="progCateId" placeholder="Program Category" className="input input-bordered w-full capitalize" disabled/>
                                )}
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progLanguage" className="mb-2 font-medium">Program Language</label>
                                <input type="text" id="progLanguage" placeholder="Program Language" className="input input-bordered w-full capitalize" value={program.progLanguage} disabled/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="progPrice" className="mb-2 font-medium">Program Price in IDR</label>
                                <input type="number" id="progPrice" placeholder="Program Price" className="input input-bordered w-full capitalize" value={program.progPrice} disabled/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="progTagSkill" className="mb-2 font-medium">Tags Skill</label>
                            <input type="text" id="progTagSkill" placeholder="Java, Sql, Postress, ..." className="input input-bordered w-full capitalize" value={program.progTagSkill} disabled/>
                        </div>
                        <div className="grid xl:grid-cols-3 gap-3 mt-3">
                            <div className="flex flex-col xl:col-span-1 xl:order-last">
                                <div className="avatar">
                                    <div className="w-24 mask mask-squircle m-auto">
                                    {instructor.map((emp: any) => (
                                        emp.userEntityId == program.progCreatedById ? (
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
                                    ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center xl:col-span-2 mb-3">
                            <label htmlFor="progCreatedBy" className="mb-2 font-medium">Instructor</label>
                                {instructor.map((emp: any, index: any) => (
                                    emp.userEntityId == program.progCreatedById ? (<input key={emp.userE} type="text" id="progCreatedById" placeholder="Program Instructor" className="input input-bordered w-full capitalize" value={`${emp.userFirstName} ${emp.userLastName}` } disabled/>) : (<></>)
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="predItemLearning" className="mb-2 font-medium">What will you learn ?</label>
                            <textarea id="" className="textarea textarea-bordered h-auto textarea-md capitalize" placeholder="What will you learn ?" value={program?.programEntityDescription?.predItemLearning.items} disabled></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="predDescription" className="mb-2 font-medium">Description</label>
                            <textarea id="" className="textarea textarea-bordered h-auto textarea-md capitalize" placeholder="Program Description" value={program?.programEntityDescription?.predDescription.items} disabled></textarea>
                        </div>
                    </div>
                    <div id="sections">
                        <hr className="mt-3 mb-6"/>
                        <div className="flex justify-between items-center">
                            <p className="p-0 m-0 font-medium text-base uppercase">Materi (Section & Sub Section)</p>
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
                                            </div>
                                        </div>
                                        <div className="border border-gray-300 my-2"></div>
                                        <div className="mb-3">
                                            {section?.sectionDetails?.length !== 0 ? (
                                            section?.sectionDetails?.map((item: any, index: any) => {
                                                return (
                                                    <>
                                                        <div key={item.secdId}>
                                                            <ul>
                                                            <MediaShow sectionDetail={item} program={program.progEntityId}/>
                                                            </ul>
                                                        </div>
                                                    </>
                                                )
                                            })
                                            ):(
                                                <div className="flex flex-col gap-3 items-center">
                                                    <div className="">The Section Material are empty, create new!</div>
                                                </div>
                                            )
                                            }
                                        </div>
                                        {section.sectionDetails?.length !== 0 ? (
                                            <div className="flex gap-3 items-center justify-end">
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
                </div>
            </>
        )
    }
}
