import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import styles
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";

const Attendance = ({empId}) => {
    const [attendanceData, setAttendanceData] = useState({});
    const api = useAxios();

    useEffect(() => {
        api.get(`${API_BASE_URL}/crm/admin/attendance/${empId}`)
            .then(response => {
                const data = response.data; // Axios already returns JSON
                if (Array.isArray(data)) {
                    const formattedData = data.reduce((acc, item) => {
                        acc[item.date] = {
                            punchIn: item.punchInImagePresent,
                            punchOut: item.punchOutImagePresent
                        };
                        return acc;
                    }, {});
                    setAttendanceData(formattedData);
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []); // Include `api` in dependencies

    // Function to determine tile color
    const tileClassName = ({ date }) => {
        const dateStr = date.toISOString().split("T")[0]; // Convert date to YYYY-MM-DD format

        if (attendanceData[dateStr]) {
            const { punchIn, punchOut } = attendanceData[dateStr];
            if (punchIn && punchOut) return "green-day"; // ✅ Present (Both punch in & out)
            if (punchIn && !punchOut) return "orange-day"; // ⏳ In Progress (Only punch in)
        }

        return "red-day"; // ❌ Absent (No punch in or out)
    };

    return (
        <div>
            <h2>Attendance Calendar</h2>
            <Calendar tileClassName={tileClassName} />
            <style>
                {`
                    .green-day {
                        background-color: green !important;
                        color: white;
                        border-radius: 50%;
                        padding: 10;
                    }
                    .orange-day {
                        background-color: orange !important;
                        color: white;
                        border-radius: 50%;
                        padding: 10;
                    }
                    .red-day {
                        background-color: grey !important;
                        color: white;
                        border-radius: 50%;
                        padding: 10;
                    }
                `}
            </style>
        </div>
    );
};

export default Attendance;
