import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";

const Attendance = ({ empId }) => {
    const [attendanceData, setAttendanceData] = useState({});
    const [counts, setCounts] = useState({ green: 0, yellow: 0, red: 0 });
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateInfo, setSelectedDateInfo] = useState(null);
    const api = useAxios();

    // Helper function to format "HH:MM:SS" to 12-hour AM/PM format
    const formatTime = (timeString) => {
        if (!timeString || timeString === "null") return "Not Available";
        
        try {
            const [hours, minutes] = timeString.split(':');
            const hourNum = parseInt(hours, 10);
            const period = hourNum >= 12 ? 'PM' : 'AM';
            const displayHour = hourNum % 12 || 12; // Convert 0 to 12 for 12-hour format
            
            return `${displayHour}:${minutes} ${period}`;
        } catch (e) {
            console.error("Error formatting time:", e);
            return timeString; // Return original if formatting fails
        }
    };

    useEffect(() => {
        api.get(`${API_BASE_URL}/crm/admin/attendance/${empId}`)
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    const formattedData = data.reduce((acc, item) => {
                        if (item.punchInImagePresent || item.punchOutImagePresent) {
                            acc[item.date] = {
                                punchIn: item.punchInTime || null,
                                punchOut: item.punchOutTime || null
                            };
                        }
                        return acc;
                    }, {});
                    setAttendanceData(formattedData);
                    calculateCounts(formattedData, selectedMonth);
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [empId, selectedMonth]);

    const calculateCounts = (data, month) => {
        let green = 0, yellow = 0, red = 0;
        let dates = Object.keys(data).sort().filter(date => {
            const dateObj = new Date(date);
            return dateObj.getMonth() === month.getMonth() && dateObj.getFullYear() === month.getFullYear();
        });

        dates.forEach((date, index) => {
            const { punchIn, punchOut } = data[date];
            const prevDate = dates[index - 1];

            if (punchIn && punchOut) {
                green++;
            } else if (punchIn && !punchOut) {
                yellow++;
            } else {
                red++;
            }

            if (prevDate && data[prevDate]?.punchIn && !data[prevDate]?.punchOut) {
                red++;
            }
        });

        setCounts({ green, yellow, red });
    };

    const tileClassName = ({ date }) => {
        const dateStr = date.toLocaleDateString("en-CA");
        if (!attendanceData[dateStr]) return null;

        const { punchIn, punchOut } = attendanceData[dateStr];
        if (punchIn && punchOut) return "green-day";
        if (punchIn && !punchOut) return "yellow-day";
        return "red-day";
    };

    const handleDateClick = (date) => {
        const dateStr = date.toLocaleDateString("en-CA");
        setSelectedDate(date.toDateString());
        setSelectedDateInfo(attendanceData[dateStr] || { punchIn: null, punchOut: null });
    };

    return (
        <div className="attendance-container">
            <h2>Attendance Calendar</h2>

            <div className="attendance-summary">
                <div className="status-item">
                    <span className="status-indicator green"></span>
                    <span>Present: {counts.green}</span>
                </div>
                <div className="status-item">
                    <span className="status-indicator yellow"></span>
                    <span>Not Punched Out: {counts.yellow}</span>
                </div>
                <div className="status-item">
                    <span className="status-indicator red"></span>
                    <span>Absent: {counts.red}</span>
                </div>
            </div>
            <div className="calendar-wrapper">
                <Calendar
                    tileClassName={tileClassName}
                    onActiveStartDateChange={({ activeStartDate }) => setSelectedMonth(activeStartDate)}
                    onClickDay={handleDateClick}
                />
            </div>
            
            

            {selectedDateInfo && (
                <div className="attendance-details">
                    <h3>Attendance Details for {selectedDate}</h3>
                    <div className="detail-row">
                        <strong>Punch In Time:</strong>
                        <span>{formatTime(selectedDateInfo.punchIn)}</span>
                    </div>
                    <div className="detail-row">
                        <strong>Punch Out Time:</strong>
                        <span>{formatTime(selectedDateInfo.punchOut)}</span>
                    </div>
                </div>
            )}

            <style jsx>{`
                .attendance-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                h2 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 20px;
                }
                
                .calendar-wrapper {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                }
                
                .attendance-summary {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                    background: white;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                
                .status-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .status-indicator {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                }
                
                .green { background-color: #4CAF50; }
                .yellow { background-color: #FFEB3B; }
                .red { background-color: #F44336; }
                
                .attendance-details {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                
                .attendance-details h3 {
                    margin-top: 0;
                    color: #333;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                }
                
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                }
                
                /* Calendar day styles */
                .green-day { 
                    background-color: #4CAF50 !important; 
                    color: white !important; 
                    border-radius: 50% !important; 
                }
                .yellow-day { 
                    background-color: #FFEB3B !important; 
                    color: black !important; 
                    border-radius: 50% !important; 
                }
                .red-day { 
                    background-color: #F44336 !important; 
                    color: white !important; 
                    border-radius: 50% !important; 
                }
                
                /* Calendar navigation styles */
                .react-calendar__navigation button {
                    min-width: 44px;
                    background: none;
                }
                
                .react-calendar__tile--now {
                    background: #e6f7ff;
                }
                
                .react-calendar__tile--active {
                    background: #1890ff;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default Attendance;