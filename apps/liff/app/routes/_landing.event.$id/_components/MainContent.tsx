import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { useLineLiff } from "~/contexts/LineLiffContext";

// Mock event data - in production, this would be fetched from API using the eventId
const mockEvents = [
  {
    id: "1",
    title: "กิจกรรมวิ่งการกุศล",
    date: "10 มิถุนายน 2024",
    time: "07:00 - 11:00",
    location: "สวนลุมพินี",
    status: "เปิดรับสมัคร",
    participants: 45,
    maxParticipants: 100,
    description: "กิจกรรมวิ่งการกุศลเพื่อระดมทุนช่วยเหลือผู้ป่วยโรคหัวใจ โดยรายได้หลังหักค่าใช้จ่ายจะนำไปบริจาคให้มูลนิธิหัวใจแห่งประเทศไทย",
    organizerName: "มูลนิธิกิจกรรมเพื่อสังคม",
    requirements: "เสื้อวิ่ง, รองเท้าวิ่งที่เหมาะสม, บัตรประชาชน",
    imageUrl: "https://via.placeholder.com/600x300"
  },
  {
    id: "2",
    title: "เวิร์คช็อปปลูกต้นไม้",
    date: "15 มิถุนายน 2024",
    time: "09:00 - 12:00",
    location: "สวนวชิรเบญจทัศ",
    status: "เปิดรับสมัคร",
    participants: 28,
    maxParticipants: 50,
    description: "เวิร์คช็อปสอนวิธีการปลูกต้นไม้ด้วยวิธีที่ถูกต้อง การดูแลและบำรุงรักษา โดยมีวิทยากรผู้เชี่ยวชาญด้านการเกษตร",
    organizerName: "ชมรมรักษ์ต้นไม้",
    requirements: "กางเกงที่สะดวกต่อการทำงาน, ถุงมือสวน",
    imageUrl: "https://via.placeholder.com/600x300"
  },
  {
    id: "3",
    title: "อบรมการทำอาหาร",
    date: "20 มิถุนายน 2024",
    time: "13:00 - 16:00",
    location: "ศูนย์การเรียนรู้ชุมชน",
    status: "เปิดรับสมัคร",
    participants: 15,
    maxParticipants: 30,
    description: "อบรมการทำอาหารไทยโบราณที่หาทานยาก สูตรดั้งเดิมจากครัวไทยโบราณ โดยเชฟมากประสบการณ์",
    organizerName: "ชุมชนอนุรักษ์อาหารไทย",
    requirements: "ผ้ากันเปื้อน, หมวกครัว",
    imageUrl: "https://via.placeholder.com/600x300"
  },
];

interface MainContentProps {
  eventId?: string;
}

export default function MainContent({ eventId }: MainContentProps) {
  const navigate = useNavigate();
  const { profileQuery } = useLineLiff();
  
  // Find the event by ID
  const event = mockEvents.find(event => event.id === eventId);
  
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  
  // Handle join event button click
  const handleJoinEvent = () => {
    setIsJoining(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsJoining(false);
      setHasJoined(true);
      // In production, make an actual API call to join event
    }, 1000);
  };

  if (!event) {
    return (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen p-4">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-gray-800">ไม่พบกิจกรรม</h2>
          <p className="mt-2 text-gray-600">ไม่พบกิจกรรมที่คุณกำลังค้นหา</p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            onClick={() => navigate("/")}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen p-4">
      <header className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center text-blue-600 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          กลับหน้าหลัก
        </button>
        
        <h1 className="text-2xl font-bold text-gray-800">{event.title}</h1>
        
        <div className="flex items-center mt-1">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            {event.status}
          </span>
        </div>
      </header>

      {/* Event banner image */}
      {/* <div className="mb-4 rounded-lg overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-40 object-cover"
        />
      </div> */}

      {/* Event details */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">รายละเอียดกิจกรรม</h2>
        
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              <strong>วันที่และเวลา:</strong> {event.date} {event.time}
            </span>
          </div>

          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              <strong>สถานที่:</strong> {event.location}
            </span>
          </div>

          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span>
              <strong>ผู้เข้าร่วม:</strong> {event.participants}/{event.maxParticipants} คน
            </span>
          </div>

          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>
              <strong>ผู้จัด:</strong> {event.organizerName}
            </span>
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">สิ่งที่ต้องเตรียม</h2>
        <p className="text-sm text-gray-600">{event.requirements}</p>
      </div>

      {/* Join button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <div className="max-w-sm mx-auto">
          {!hasJoined ? (
            <button
              className={`w-full ${
                isJoining ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white py-3 px-4 rounded-lg font-medium`}
              onClick={handleJoinEvent}
              disabled={isJoining}
            >
              {isJoining ? "กำลังดำเนินการ..." : "เข้าร่วมกิจกรรม"}
            </button>
          ) : (
            <div className="text-center">
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium" disabled>
                สมัครแล้ว
              </button>
              <p className="mt-2 text-sm text-gray-500">คุณได้สมัครเข้าร่วมกิจกรรมนี้แล้ว</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add bottom padding to allow scrolling past the fixed button */}
      <div className="h-24"></div>
    </div>
  );
}
