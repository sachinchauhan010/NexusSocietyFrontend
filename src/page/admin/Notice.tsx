import CreateNotice from "@/components/app/Admin/Notice/CreateNotice"
import { NoticeLists } from "@/components/app/Admin/Notice/NoticeList"

function Notice() {
  return (
    <div>
      <CreateNotice/>
      <h1 className="text-2xl font-semibold text-indigo-700">All Notice</h1>
      <NoticeLists/>
    </div>
  )
}

export default Notice
