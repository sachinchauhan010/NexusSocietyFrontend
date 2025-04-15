import { useEffect, useState } from "react"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { NoticeType } from "@/types/noticeType"
import { formatDate } from "@/utils/dateFormate"

export function NoticeLists() {
  const [notices, setNotices] = useState<NoticeType[]>([]);

  const fetchNotices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/notice/get-notices`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const apiData = await response.json()
      setNotices(apiData.noticesData || [])
    } catch (error) {
      console.error("Error fetching notices:", error)
    }
  }

  useEffect(() => {
    fetchNotices()
  }, [])

  return (
    <Accordion type="single" collapsible className="w-full">
      {notices.map((notice) => (
        <AccordionItem key={notice.id} value={notice.id}>
          <AccordionTrigger>{notice.title}</AccordionTrigger>
          <AccordionContent className="relative">
            <div className="absolute top-0 right-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => alert(`Update ${notice.id}`)}>
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert(`Delete ${notice.id}`)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="pt-6">
              {Object.entries(notice).map(([key, value]) => {
                if (key === "title" || key === "id") return null
                return (
                  <p key={key}>
                   <strong>{key}:</strong>{" "}
                   {key === "date" ? formatDate(String(value)) : String(value)}
                  </p>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
