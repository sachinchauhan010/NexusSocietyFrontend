import CreateNotice from "@/components/app/Admin/Notice/CreateNotice"
import { NoticeLists } from "@/components/app/Admin/Notice/NoticeList"

function Notice() {
  return (
    <div>
      <CreateNotice/>
      <NoticeLists/>
    </div>
  )
}

export default Notice
