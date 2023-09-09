import { useFormik } from "formik"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch } from "react-redux";
import { createBatchReq } from "@/redux-saga/action/bootcamp/batchAction";

export default function BatchForm(props: any) {
  // dispatch
  const dispatch = useDispatch();
  // setSelectedProgram
  const [selectedProgram, setSelectedProgram] = useState(
    {
      "progEntityId": null,
      "progTitle": null,
      "progLearningType": null,
      "progCreatedBy": {
        "empEntityId": null,
        "empEntity": {
          "userFirstName": null,
          "userLastName": null
        }
      }
    }
  );
  // setTrainer
  const [trainer, setTrainer] = useState(undefined);
  // setCoTrainer
  const [coTrainer, setCoTrainer] = useState(undefined);
  // programList
  const programList = props.program;

  // Formik
  const formik = useFormik({
    initialValues: {
      batchName: undefined,
      batchStartDate: undefined,
      batchEndDate: undefined,
      trainer: trainer,
      coTrainer: coTrainer,
    },
    onSubmit: async (values: any) => {
      const payload = {
        // from program_entity
        batchEntityId: selectedProgram.progEntityId,
        batchType: selectedProgram.progLearningType,
        batchPicId: selectedProgram.progCreatedBy.empEntityId,
        // inForm
        batchName: values.batchName,
        batchStartDate: values.batchStartDate,
        batchEndDate: values.batchEndDate,
        trainer: trainer,
        coTrainer: coTrainer,
      }
      console.log(`payload: ${JSON.stringify(payload)}`);
      dispatch(createBatchReq(payload));
    }
  })

  const handleSetSelectedProgram = (event: any) => {
    const selectedValue = event.target.value;
    const selectedItem = programList.find((item: any) => item.progTitle === selectedValue);
    setSelectedProgram(selectedItem);
  }

  // console.log(`selectedProgram: ${JSON.stringify(selectedProgram)}`);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-5 h-full">
          {/* First Section */}
          <div className="grid grid-cols-7 gap-5">
            {/* Form */}
            <div className="col-span-5 flex flex-col gap-5">
              {/* Name, Tech */}
              <div className="flex w-full gap-2 ">
                <div className="flex flex-col w-full">
                    <label className="mb-2 font-medium capitalize">Batch Name</label>
                    <input type="text" id="batchName" placeholder="Batch Name" className="input input-bordered w-full capitalize" defaultValue={formik.values.batchName} onChange={formik.handleChange}/>
                </div>
                <div className="flex flex-col w-full">
                    <label className="mb-2 font-medium capitalize">Technology</label>
                    <select id="progTitle" className="select input-bordered w-full capitalize" defaultValue={'Choose'} onChange={handleSetSelectedProgram}>
                      <option disabled>Choose</option>
                      { programList.map((item: any, index: any) => (
                        <option key={index} value={item.progTitle}>{item.progTitle}</option>
                      ))}
                    </select>
                </div>
              </div>
              {/* Periods */}
              <div className="flex w-full gap-2 ">
                <div className="flex flex-col w-full">
                    <label className="mb-2 font-medium capitalize">Start Date</label>
                    <input type="date" id="batchStartDate" placeholder="Start Date" className="input input-bordered w-full" defaultValue={formik.values.batchStartDate} onChange={formik.handleChange}/>
                </div>
                <div className="flex flex-col w-full">
                    <label className="mb-2 font-medium capitalize">End Date</label>
                    <input type="date" id="batchEndDate" placeholder="End Date" className="input input-bordered w-full" defaultValue={formik.values.batchEndDate} onChange={formik.handleChange}/>
                </div>
              </div>
              {/* Trainer */}
              <div className="flex w-full gap-2 ">
                <div className="flex flex-col w-full">
                    <label className="mb-2 font-medium capitalize">Trainer</label>
                    <input type="text" id="trainer" placeholder="Batch Name" className="input input-bordered w-full capitalize" defaultValue={formik.values.trainer} onChange={formik.handleChange}/>
                </div>
                <div className="flex flex-col w-full">
                    <label className="mb-2 font-medium capitalize">Co-Trainer</label>
                    <input type="text" id="coTrainer" placeholder="Co-Trainer" className="input input-bordered w-full capitalize" defaultValue={formik.values.coTrainer} onChange={formik.handleChange}/>
                </div>
              </div>
            </div>
            {/* Members Count Display */}
            <div className="col-span-2 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
            </div>
          </div>
          {/* Second Section */}
          <div className="flex flex-col">
            <div className="text-base font-medium uppercase">Remommended Bootcamp Members</div>
          </div>
          {/* Button Actions */}
          <div className="flex justify-end gap-4">
            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            <Link href={'/bootcamp/batch'} className="btn btn-neutral btn-sm">Cancel</Link>
          </div>
      </div>
    </form>
  )
}
