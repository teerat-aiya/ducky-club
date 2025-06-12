import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  popupClassName?: string;
}

export default function DatePicker({
  selectedDate,
  onDateSelect,
  isOpen,
  onToggle,
  className = "",
  popupClassName = "",
}: DatePickerProps) {
  const [time, setTime] = useState("12:00");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0, right: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of day for proper comparison

  // Initialize time from the selected date if it exists
  useEffect(() => {
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }
  }, [selectedDate]);

  // Handle client-side only rendering for the portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate popup position when button position changes or when opened
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Check if there's enough space to the right, otherwise align to right
      const alignRight = rect.right > viewportWidth / 2;
      
      setPopupPosition({
        top: rect.bottom + window.scrollY,
        left: alignRight ? rect.left : rect.left,
        right: alignRight ? viewportWidth - rect.right : 'auto'
      });
    }
  }, [isOpen]);

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "เลือกวันที่";
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    return date.toLocaleDateString('th-TH', options);
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "00:00";
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Handle date selection with calendar
  const handleCalendarDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Set time from input
    const [hours, minutes] = time.split(":").map(Number);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    
    onDateSelect(newDate);
    onToggle();
  };

  // Handle time change
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      const [hours, minutes] = e.target.value.split(":").map(Number);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      onDateSelect(newDate);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Functions to navigate between months
  const prevMonth = () => {
    const previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    // Only allow navigating to months that contain today or future dates
    if (previousMonth.getMonth() >= today.getMonth() && 
        previousMonth.getFullYear() >= today.getFullYear()) {
      setCurrentMonth(previousMonth);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Check if a day is in the past (before today)
  const isPastDay = (day: number | null) => {
    if (!day) return false;
    
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate < today;
  };

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const daysArray = [];
    const weeks = Math.ceil((startDay + totalDays) / 7);
    
    for (let i = 0; i < weeks * 7; i++) {
      const dayNumber = i - startDay + 1;
      if (dayNumber > 0 && dayNumber <= totalDays) {
        daysArray.push(dayNumber);
      } else {
        daysArray.push(null);
      }
    }
    
    return daysArray;
  };

  // Get month name
  const getMonthName = () => {
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    return `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear() + 543}`;
  };

  const isCurrentDay = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isSelectedDay = (day: number | null) => {
    if (!day || !selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  // Create popup component
  const DatePickerPopup = () => (
    <div 
      ref={datePickerRef}
      style={{
        position: 'absolute',
        top: `${popupPosition.top}px`,
        left: typeof popupPosition.right === 'number' ? 'auto' : `${popupPosition.left}px`,
        right: typeof popupPosition.right === 'number' ? `${popupPosition.right}px` : 'auto',
        zIndex: 1000,
      }}
      className={`bg-white rounded-lg shadow-lg p-4 ${popupClassName}`}
    >
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          disabled={currentMonth.getMonth() === today.getMonth() && 
                   currentMonth.getFullYear() === today.getFullYear()}
          className={`p-1 rounded-full ${
            currentMonth.getMonth() === today.getMonth() && 
            currentMonth.getFullYear() === today.getFullYear()
              ? 'text-gray-300 cursor-not-allowed' 
              : 'hover:bg-gray-100'
          }`}
        >
          ◀
        </button>
        <div className="font-medium">{getMonthName()}</div>
        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          ▶
        </button>
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 mb-4 text-center">
        {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
          <div key={day} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {generateCalendar().map((day, i) => {
          const isDisabled = !day || isPastDay(day);
          return (
            <button
              key={i}
              onClick={() => !isDisabled && handleCalendarDateSelect(day!)}
              disabled={isDisabled}
              className={`h-8 w-8 flex items-center justify-center rounded-full text-sm
                ${isDisabled 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'hover:bg-teal-100'}
                ${isCurrentDay(day) ? 'bg-teal-100' : ''}
                ${isSelectedDay(day) ? 'bg-teal-500 text-white hover:bg-teal-600' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      
      {/* Quick Selection */}
      <div className="text-sm font-medium mb-2">ทางเลือกด่วน</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button 
          onClick={() => handleCalendarDateSelect(new Date().getDate())} 
          className="py-2 px-3 bg-gray-100 rounded-lg hover:bg-teal-100 text-sm"
        >
          วันนี้
        </button>
        <button 
          onClick={() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            handleCalendarDateSelect(tomorrow.getDate());
            setCurrentMonth(tomorrow);
          }} 
          className="py-2 px-3 bg-gray-100 rounded-lg hover:bg-teal-100 text-sm"
        >
          พรุ่งนี้
        </button>
        <button 
          onClick={() => {
            const dayAfter = new Date();
            dayAfter.setDate(dayAfter.getDate() + 2);
            handleCalendarDateSelect(dayAfter.getDate());
            setCurrentMonth(dayAfter);
          }} 
          className="py-2 px-3 bg-gray-100 rounded-lg hover:bg-teal-100 text-sm"
        >
          มะรืนนี้
        </button>
      </div>
      
      {/* Time Selection */}
      <div className="text-sm font-medium mb-2">เลือกเวลา</div>
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );

  return (
    <div className={className}>
      <button
        ref={buttonRef}
        onClick={onToggle}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
      >
        <div className="text-right">
          <div className="text-sm font-medium">{selectedDate ? formatDate(selectedDate) : "วันที่"}</div>
          <div className="text-xs text-gray-500">{selectedDate ? formatTime(selectedDate) : "เวลา"}</div>
        </div>
        <span className="text-gray-400">▼</span>
      </button>
      
      {/* Render popup using portal to avoid overflow issues */}
      {isOpen && isMounted && createPortal(
        <DatePickerPopup />,
        document.body
      )}
    </div>
  );
}
