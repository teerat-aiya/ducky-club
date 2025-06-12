import { Calendar, Clock, Users, CreditCard, Star } from 'lucide-react';

const MainContent = () => {
  const events = [
    {
      id: 'ai-customer-service',
      name: 'AI for Customer Service',
      description: 'เรียนรู้การใช้ AI เพื่อปรับปรุงการบริการลูกค้า และเพิ่มประสิทธิภาพในการตอบสนองลูกค้า',
      datetime: '15 มิ.ย. 2567 เวลา 14:00-17:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop'
    },
    {
      id: 'aibots',
      name: 'AiBots',
      description: 'สร้างและพัฒนา AI Chatbots สำหรับธุรกิจ พร้อมเทคนิคการปรับแต่งให้เข้ากับงาน',
      datetime: '16 มิ.ย. 2567 เวลา 09:00-12:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop'
    },
    {
      id: 'ai-crm',
      name: 'AI for CRM',
      description: 'ประยุกต์ใช้ AI ในระบบ CRM เพื่อเพิ่มประสิทธิภาพการจัดการลูกค้าและการขาย',
      datetime: '17 มิ.ย. 2567 เวลา 13:00-16:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop'
    },
    {
      id: 'directus',
      name: 'Directus Workshop',
      description: 'Workshop การใช้งาน Directus สำหรับจัดการฐานข้อมูลและสร้าง API อย่างมืออาชีพ',
      datetime: '18 มิ.ย. 2567 เวลา 10:00-17:00 น.',
      price: '2,500 บาท',
      isFree: false,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop'
    },
    {
      id: 'ai-business',
      name: 'AI for Business',
      description: 'กลยุทธ์การนำ AI มาใช้ในธุรกิจอย่างมีประสิทธิภาพ และการวางแผนการใช้งาน AI',
      datetime: '19 มิ.ย. 2567 เวลา 09:00-12:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
    },
    {
      id: 'agentic-cloud',
      name: 'Agentic Cloud',
      description: 'สร้าง AI Agent บน Cloud Platform ด้วยเทคโนโลยีล้อมุมที่ทันสมัย',
      datetime: '20 มิ.ย. 2567 เวลา 13:00-18:00 น.',
      price: '3,000 บาท',
      isFree: false,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
    },
    {
      id: 'ai-location',
      name: 'AI Location Based',
      description: 'AI สำหรับบริการที่ใช้ข้อมูลตำแหน่ง และการประยุกต์ใช้ในธุรกิจต่างๆ',
      datetime: '21 มิ.ย. 2567 เวลา 14:00-17:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&h=200&fit=crop'
    },
    {
      id: 'aibeacon',
      name: 'AiBeacon',
      description: 'เทคโนโลยี AI กับ Beacon สำหรับ Smart Location และ IoT Applications',
      datetime: '22 มิ.ย. 2567 เวลา 10:00-16:00 น.',
      price: '2,800 บาท',
      isFree: false,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop'
    },
    {
      id: 'ai-voice',
      name: 'AI Voice',
      description: 'พัฒนาแอปพลิเคชันด้วยเทคโนโลยี AI Voice และ Speech Recognition',
      datetime: '23 มิ.ย. 2567 เวลา 09:00-12:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=200&fit=crop'
    },
    {
      id: 'ai-agent',
      name: 'AI Agent',
      description: 'สร้าง AI Agent อัจฉริยะสำหรับงานต่างๆ และการปรับแต่งให้เข้ากับความต้องการ',
      datetime: '24 มิ.ย. 2567 เวลา 13:00-16:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop'
    },
    {
      id: 'ai-vibe-coding',
      name: 'AI Vibe Coding',
      description: 'เขียนโปรแกรมร่วมกับ AI อย่างสร้างสรรค์ และเทคนิคการใช้ AI ในการพัฒนา',
      datetime: '25 มิ.ย. 2567 เวลา 14:00-18:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop'
    },
    {
      id: 'ai-seo',
      name: 'AI SEO Automation',
      description: 'ใช้ AI และ N8N สำหรับ SEO อัตโนมัติ เพิ่มอันดับเว็บไซต์อย่างมีประสิทธิภาพ',
      datetime: '26 มิ.ย. 2567 เวลา 10:00-15:00 น.',
      price: 'ฟรี',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop'
    }
  ];

  const handleRegister = (eventId: string) => {
    // ลิงก์ไปยังหน้าลงทะเบียน
    console.log(`Redirecting to registration for event: ${eventId}`);
    alert(`เปิดหน้าลงทะเบียนสำหรับ ${events.find(e => e.id === eventId)?.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white">
          <div className="px-4 py-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-blue-600">AI</div>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                AI Ignite Club
              </h1>
              <p className="text-sm mb-4 text-blue-100 px-4">
                ร่วมเรียนรู้และพัฒนาทักษะ AI ที่จะเปลี่ยนโลกในอนาคต
              </p>
              <div className="flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>12 Workshop</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>มิ.ย. 67</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>9 งานฟรี</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Workshop & Events
          </h2>
          <p className="text-sm text-gray-600">
            เลือกงานที่คุณสนใจและเริ่มต้นการเรียนรู้ AI
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="p-3">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2">
                  {event.name}
                </h3>
                
                <p className="text-gray-600 text-xs mb-3 line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span className="line-clamp-1">{event.datetime.split(' เวลา ')[0]}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span className="line-clamp-1">{event.datetime.split(' เวลา ')[1]}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs">
                    <CreditCard className="w-3 h-3 text-gray-500" />
                    <span className={`font-semibold ${event.isFree ? 'text-green-600' : 'text-orange-600'}`}>
                      {event.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRegister(event.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-1.5 px-2 rounded-md font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 text-xs"
                >
                  ลงทะเบียน
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;