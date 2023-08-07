import { useState } from "react";

export default function EditSectionDetail(props: any) {
    const [modal, setModal] = useState(false);

    function handleChange() {
        setModal(!modal);
    }

    const item = props.item

    return (
        <div>
            <a onClick={handleChange} className="link link-hover text-base m-0 p-0">{item.secdTitle}</a>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                <h3 className="font-bold text-lg">
                    Material ({item.secdTitle})
                </h3>
                <div className="border-t border-gray-300 my-3"></div>
                <div>
                    <form>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="progEntityId" className="my-2 mr-5">Section Name</label>
                            <input type="text" id="progEntityId" placeholder="section name" className="input input-bordered w-full text-base"/>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="progEntityId" className="my-2 mr-5">Section Description</label>
                            <textarea id="progEntityId" placeholder="section description" className="textarea textarea-bordered h-24 w-full text-base"/>
                        </div>
                    </form> 
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>
                    Close
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}
