import { useDispatch, useSelector } from "react-redux";
import CreateSectionPage from "./createSectionPage";
import EditSectionPage from "./editSectionPage";
import DeleteSection from "./deleteSectionPage";
import CreateSectionDetailPage from "./sectionDetail/createSectionDetailPage";
import EditSectionDetailPage from "./sectionDetail/editSectionDetail";
import { useEffect } from "react";
import { GetSectionRequest } from "@/redux-saga/action/sectionAction";

export default function SectionPage(props: any) {
    const dispatch = useDispatch();
    const { section } = useSelector((state: any) => state.sectionState);

    const sections = props.section;

    useEffect(() => {
        dispatch(GetSectionRequest(props.progEntityId))
    }, [dispatch, props.progEntityId, sections]);

  return (
    <div className="my-5">
        <div className="my-3">
            <div className="border-t border-gray-300 my-3"></div>
            <div className="flex justify-between">
                <div className="flex justify-start font-black text-xl my-auto">Materi (Section & Sub Section)</div>
                <CreateSectionPage/>
            </div>
        </div>
        <div>
            {section.map((section: any, index: any) => {
                return(
                    <>  
                        <div className="card card-compact w-full bg-base-100 shadow-xl mb-5 py-3">
                            <div className="flex justify-between px-5">
                                <div className="text-xl font-medium my-auto">{section.sectTitle}</div>
                                <div className="flex">
                                    <EditSectionPage/>
                                    <DeleteSection sectId={section.sectId} sectProgEntityId={section.sectProgEntityId} setRefresh={props.setRefresh}/>
                                </div>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="border-t border-gray-300 mb-3"></div>
                                    <CreateSectionDetailPage/>
                                    {section.sectionDetails.length !== 0 ? (
                                    section.sectionDetails.map((item: any, index: any) => {
                                        return (
                                            <>
                                                <div key={item.secdId} className="flex flex-row justify-between my-1">
                                                    <EditSectionDetailPage item={item}/>
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
                )
            })}
        </div>
    </div>
  )
}
