import { useState } from "react";
import { useWorkspace } from "~/hooks/workspace/useWorkspace";
import DatePicker from "./DatePicker";
import NumericScroller from "~/components/NumericScroller";
import { useInsertActivity } from "~/hooks/activities/useInsertActivity";
import { Activity } from "~/types/app";
import { randomHexString } from "~/utils/random";
import { useLineLiff } from "~/contexts/LineLiffContext";
import { Loading } from "@repo/preline";

export default function EventBooking() {
  const {  profileQuery } =
    useLineLiff();
  const { data: workspaces } = useWorkspace();
  const insertActivity = useInsertActivity();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("ชื่อกิจกรรม");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [attendeeLimit, setAttendeeLimit] = useState<number | null>(null);

  const handleCreateEvent = () => {
    const activityData:Activity = {
      id: randomHexString(16),
      workspace: "wks-000",
      start_time: selectedStartDate?.toISOString() || "",
      end_time: selectedEndDate?.toISOString() || "",
      purpose: title,
      line_user_id: "dummy_user_id", 
      status: "active",
      user_profile: "dummy_profile",
      created_at: new Date().toISOString(),
    }
    insertActivity.mutateAsync({ variables: activityData })
      .then(() => {
        alert("สร้างกิจกรรมเรียบร้อยแล้ว!");
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("เกิดข้อผิดพลาดในการสร้างกิจกรรม");
      });
    console.log("Creating event:", activityData);
  };

  if (profileQuery.isLoading || !profileQuery.data) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
      {/* Event Image */}
      {/* <div className="relative">
        <div className="h-48 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-30">🚀</div>
          </div>
          <div className="absolute bottom-4 right-4">
            <button className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white">
              📷
            </button>
          </div>
        </div>
      </div> */}

      {/* Event Title */}
      <div className="bg-white px-4 py-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-medium text-gray-800 bg-transparent border-none outline-none"
          placeholder="ชื่อกิจกรรม"
        />
      </div>

      {/* Date and Time Section */}
      <div className="bg-white px-4 py-4 border-t border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-0.5 h-8 bg-gray-300"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>

          <div className="flex-1 space-y-4">
            {/* Start Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">เริ่ม</span>
              </div>
              <div className="flex items-center space-x-4">
                <DatePicker
                  selectedDate={selectedStartDate}
                  onDateSelect={setSelectedStartDate}
                  isOpen={isStartOpen}
                  onToggle={() => setIsStartOpen(!isStartOpen)}
                />
              </div>
            </div>

            {/* End Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">จบ</span>
              </div>
              <div className="flex items-center space-x-4">
                <DatePicker
                  selectedDate={selectedEndDate}
                  onDateSelect={setSelectedEndDate}
                  isOpen={isEndOpen}
                  onToggle={() => setIsEndOpen(!isEndOpen)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      {/* <div className="bg-white px-4 py-4 border-t border-gray-100">
        <div className="flex items-start space-x-3">
          <span className="text-gray-400 mt-1">📍</span>
          <div className="flex-1">
            <div className="font-medium text-gray-800 mb-1">เพิ่มสถานที่จัดงาน</div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="สถานที่จัดงานหรือลิงก์แล้วไป"
              className="w-full text-gray-600 text-sm bg-transparent border-none outline-none"
            />
          </div>
        </div>
      </div> */}

      {/* Description Section */}
      <div className="bg-white px-4 py-4 border-t border-gray-100">
        <div className="flex items-start space-x-3">
          <span className="text-gray-400 mt-1">📝</span>
          <div className="flex-1">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="เพิ่มคำอธิบาย"
              className="w-full text-gray-800 font-medium bg-transparent border-none outline-none"
            />
          </div>
        </div>
      </div>

      {/* Event Options */}
      <div className="bg-white px-4 py-4 border-t border-gray-100">
        {/* <div className="text-gray-700 font-medium mb-4">ตัวเลือกกิจกรรม</div> */}

        {/* Attendees */}
        {/* <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">👥</span>
            <span className="text-gray-700">บัตร</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">ฟรี</span>
            <button className="text-gray-400">📎</button>
          </div>
        </div> */}

        {/* Guest Invites */}
        {/* <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">👤</span>
            <span className="text-gray-700">ต้อง ได้รับการอนุมัติ</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={guestInvites}
              onChange={(e) => setGuestInvites(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div> */}

        {/* Attendee Count */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">👥</span>
            <span className="text-gray-700">จำนวนผู้เข้าร่วม</span>
          </div>
          <div className="flex items-center space-x-2">
            <NumericScroller
              value={attendeeLimit}
              onChange={setAttendeeLimit}
              min={1}
              max={100}
              unlimited={true}
            />
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="p-4">
        <button
          onClick={handleCreateEvent}
          className="w-full bg-teal-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors duration-200"
        >
          สร้างกิจกรรม
        </button>
      </div>
    </div>
  );
}
