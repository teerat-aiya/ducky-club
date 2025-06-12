import { useState } from "react";
import { useWorkspace } from "~/hooks/workspace/useWorkspace";
import DatePicker from "./DatePicker";
import NumericScroller from "~/components/NumericScroller";
import { useInsertActivity } from "~/hooks/activities/useInsertActivity";
import { Activity } from "~/types/app";
import { randomHexString } from "~/utils/random";
import { useLineLiff } from "~/contexts/LineLiffContext";
import { Loading } from "@repo/preline";
import { useNavigate } from "@remix-run/react";

export default function EventBooking() {
  const { profileQuery } = useLineLiff();
  const navigate = useNavigate();
  const { data: workspaces } = useWorkspace();
  const insertActivity = useInsertActivity();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [attendeeLimit, setAttendeeLimit] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateEvent = () => {
    if (!title || !selectedStartDate || !selectedEndDate) {
      alert("กรุณากรอกข้อมูลที่จำเป็น");
      return;
    }
    
    setIsSubmitting(true);
    const activityData:Activity = {
      id: randomHexString(16),
      workspace: "wks-000",
      start_time: selectedStartDate?.toISOString() || "",
      end_time: selectedEndDate?.toISOString() || "",
      purpose: title,
      line_user_id: profileQuery.data?.displayName || "dummy_user_id", 
      status: "active",
      user_profile: JSON.stringify(profileQuery.data) || "dummy_profile",
      created_at: new Date().toISOString(),
    }
    insertActivity.mutateAsync({ variables: activityData })
      .then(() => {
        alert("สร้างกิจกรรมเรียบร้อยแล้ว!");
        navigate(-1); // Navigate back after successful creation
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("เกิดข้อผิดพลาดในการสร้างกิจกรรม");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (profileQuery.isLoading || !profileQuery.data) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white py-6 px-4 shadow-md">
        <div className="flex items-center mb-2">
          <button 
            onClick={handleGoBack}
            className="mr-2 p-1 rounded-full hover:bg-teal-500 transition-colors"
            aria-label="กลับ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">สร้างกิจกรรมใหม่</h1>
        </div>
        <p className="text-teal-100 text-sm mt-1 ml-8">สร้างกิจกรรมของคุณและเชิญผู้เข้าร่วม</p>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm">
          {/* Event Title */}
          <div className="px-5 pt-5 pb-4">
            <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อกิจกรรม <span className="text-red-500">*</span>
            </label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-3 text-lg text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="ใส่ชื่อกิจกรรม"
            />
          </div>

          {/* Date and Time Section */}
          <div className="px-5 py-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">ระยะเวลา <span className="text-red-500">*</span></h3>
            
            <div className="space-y-4">
              {/* Start Time */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-6 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">เริ่ม</span>
                </div>
                <DatePicker
                  selectedDate={selectedStartDate}
                  onDateSelect={setSelectedStartDate}
                  isOpen={isStartOpen}
                  onToggle={() => {
                    setIsStartOpen(!isStartOpen);
                    setIsEndOpen(false);
                  }}
                  className="bg-white border border-gray-200 shadow-sm rounded-lg"
                />
              </div>

              {/* End Time */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-6 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700 font-medium">สิ้นสุด</span>
                </div>
                <DatePicker
                  selectedDate={selectedEndDate}
                  onDateSelect={setSelectedEndDate}
                  isOpen={isEndOpen}
                  onToggle={() => {
                    setIsEndOpen(!isEndOpen);
                    setIsStartOpen(false);
                  }}
                  className="bg-white border border-gray-200 shadow-sm rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="px-5 py-4 border-t border-gray-100">
            <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-2">
              รายละเอียดกิจกรรม
            </label>
            <textarea
              id="event-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="เพิ่มคำอธิบายหรือรายละเอียดเพิ่มเติมเกี่ยวกับกิจกรรมของคุณ..."
              className="w-full h-24 px-3 py-2 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Attendee Count */}
          <div className="px-5 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                จำนวนผู้เข้าร่วมสูงสุด
              </label>
              <div className="flex items-center">
                <NumericScroller
                  value={attendeeLimit}
                  onChange={setAttendeeLimit}
                  min={1}
                  max={100}
                  unlimited={true}
                  className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {attendeeLimit === null ? 'ไม่จำกัดจำนวนผู้เข้าร่วม' : `จำกัดไว้ที่ ${attendeeLimit} คน`}
            </p>
          </div>
        </div>

        {/* Create Button */}
        <div className="mt-6">
          <button
            onClick={handleCreateEvent}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-lg font-medium shadow-md transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-100' 
                : 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? 'กำลังสร้างกิจกรรม...' : 'สร้างกิจกรรม'}
          </button>
        </div>
      </div>
    </div>
  );
}
