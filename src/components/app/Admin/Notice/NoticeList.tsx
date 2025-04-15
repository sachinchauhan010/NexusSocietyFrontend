import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MoreVertical } from "lucide-react"
import { NoticeType } from "@/types/noticeType"
import { formatDate } from "@/utils/dateFormate"
import { toast } from "sonner"

export function NoticeLists() {
  const [notices, setNotices] = useState<NoticeType[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editNotice, setEditNotice] = useState<NoticeType | null>(null)
  const [updatedData, setUpdatedData] = useState<Partial<NoticeType>>({})

  const fetchNotices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/notice/get-notices`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      if (!response.ok) throw new Error(`Error: ${response.statusText}`)
      const apiData = await response.json()
    console.log(apiData, "apiData")
      setNotices(apiData.noticesData || [])
    } catch (error) {
      console.error("Error fetching notices:", error)
    }
  }

  const handleUpdate = async () => {
    if (!editNotice) return

    const dataToSend = {
      ...updatedData,
      id: editNotice.id,
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/notice/update-notice/${editNotice.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      )
      if (!response.ok) throw new Error("Failed to update notice")
      toast.success("Notice updated successfully")
      setIsDialogOpen(false)
      setEditNotice(null)
      setUpdatedData({})
      fetchNotices()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/notice/delete-notice/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
      if (!response.ok) throw new Error("Failed to delete notice")
      toast.success("Notice deleted successfully")
      fetchNotices()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const hasChanges = () => {
    if (!editNotice) return false
    return Object.entries(updatedData).some(
      ([key, val]) => val !== (editNotice as any)[key]
    )
  }

  useEffect(() => {
    fetchNotices()
  }, [])

  return (
    <>
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
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setEditNotice(notice)
                        setUpdatedData(notice)
                        setIsDialogOpen(true)
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleDelete(notice.id)}
                    >
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Notice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={updatedData.title || ""}
              onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
              placeholder="Title"
            />
            <Textarea
              value={updatedData.description || ""}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, description: e.target.value })
              }
              placeholder="Description"
            />
            <Input
              value={updatedData.link || ""}
              onChange={(e) => setUpdatedData({ ...updatedData, link: e.target.value })}
              placeholder="Link"
              type="url"
            />
            <Input
              value={updatedData.date || ""}
              onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
              type="date"
            />
            <Button
              onClick={handleUpdate}
              disabled={!hasChanges()}
              className="w-full bg-blue-800"
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
