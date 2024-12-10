import React, { useState } from "react";
import axios from "axios";
import './index.css';

const TimeLogForm = () => {
    const [status, setStatus] = useState("");

    const fetchTimeLogs = async () => {
        try {
            setStatus("Fetching time logs...");
            const response = await axios.get("http://localhost:5000/time-logs");
            console.log("Time Logs:", response.data);
            setStatus("Time logs fetched successfully!");
        } catch (error) {
            setStatus("Error fetching time logs.");
            console.error("Error:", error.response?.data || error.message);
        }
    };

    const handleAddTimeLogs = async () => {
        try {
            setStatus("Checking authentication...");

            const tokenCheckResponse = await axios.get("http://localhost:5000/check-token");
            if (tokenCheckResponse.data.error) {
                setStatus("You need to authenticate first.");
                return;
            }

            const response = await axios.post("http://localhost:5000/add-time-logs");
            setStatus(response.data.message || "Time logs added successfully!");
        } catch (error) {
            setStatus("Error adding time logs.");
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
                <h2 className="text-xl font-bold mb-4">Zoho Time Log Automation</h2>
                <p className="text-gray-600 mb-4">Status: {status}</p>
                <div className="flex space-x-4 justify-center">
                    <button
                        onClick={fetchTimeLogs}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Fetch Time Logs
                    </button>
                    <button
                        onClick={handleAddTimeLogs}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Add Time Logs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeLogForm;
