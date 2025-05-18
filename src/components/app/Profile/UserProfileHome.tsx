
import { useEffect, useState } from "react"
import { Bell, Mail, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "@/types/userType"
import { useAuth } from "@/context/AuthContext"

export default function UserProfileHome() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const {authState} = useAuth()

  useEffect(() => {
    fetchUserData()
  }, [])


  const fetchUserData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/${authState.email}`, {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setUser(data.userData)
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }


  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-gray-800">
              Welcome, {user ? user.name.split(" ")[0] : "Guest"}
            </h1>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search" className="pl-10 w-[240px] bg-white border-gray-200" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-gray-500" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src={user?.profileimage || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Banner */}
        <div className="w-full h-[150px] bg-gradient-to-r from-blue-200 to-yellow-100 rounded-lg mb-6"></div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={user?.profileimage || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback className="text-2xl">{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600">Edit</Button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <Input value={user?.name} className="bg-gray-50 border-gray-200" placeholder="Your Full Name" readOnly />
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <Input value={user?.id} className="bg-gray-50 border-gray-200" placeholder="Your Student ID" readOnly />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <Select defaultValue={user?.department}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <Select defaultValue={user?.year}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Year</SelectItem>
                  <SelectItem value="2nd">2nd Year</SelectItem>
                  <SelectItem value="3rd">3rd Year</SelectItem>
                  <SelectItem value="4th">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <Select defaultValue={user?.course}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B.Tech">B.Tech</SelectItem>
                  <SelectItem value="M.Tech">M.Tech</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="MCA">MCA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <Select defaultValue={user?.branch}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Email Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">My Email Address</h3>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{user?.email}</p>
                <p className="text-sm text-gray-500">1 month ago</p>
              </div>
            </div>
            <Button variant="outline" className="text-blue-500">
              + Add Email Address
            </Button>
          </div>

          {/* Phone Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Phone Number</h3>
            <Input value={user?.phone} className="bg-gray-50 border-gray-200 max-w-md" placeholder="Your Phone Number" />
          </div>

          {/* Roles Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Roles</h3>
            <div className="flex flex-wrap gap-2">
              {user?.role.map((role, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Events Section (if any) */}
          {user?.eventApply && user?.eventApply.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Registered Events</h3>
              <div className="space-y-2">
                {user?.eventApply.map((event) => (
                  <div key={event.eventId} className="p-3 bg-gray-50 rounded-md">
                    <p className="font-medium">{event.eventName}</p>
                    <p className="text-sm text-gray-500">Event ID: {event.eventId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
