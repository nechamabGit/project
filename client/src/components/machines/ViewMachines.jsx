import Machine from "./Machine";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

const ViewMachines = () => {
    const { token } = useSelector((state) => state.token);
    const [machinesData, setMachinesData] = useState([]);
    const [error, setError] = useState(null);

    const getMachines = async () => {
        try {
            if (!token) {
                console.warn("Token is missing. Cannot fetch machines.");
                setError("Authentication token is missing. Please log in again.");
                return;
            }

            console.log("Fetching machines with token:", token);
            const res = await axios.get('http://localhost:7002/api/machines', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200 && Array.isArray(res.data)) {
                setMachinesData(res.data); // Update state with fetched data
                setError(null); // Clear previous errors
            } else {
                console.warn("Unexpected response from server:", res.status, res.data);
                setError("Failed to fetch machines. Please try again later.");
            }
        } catch (e) {
            console.error("Error fetching machines:", e.message);
            setError("An error occurred while fetching machines. Please try again later.");
        }
    };

    useEffect(() => {
        getMachines();
    }, []);

    return (
        <div>
            {/* Error Message */}
            {error && (
                <div style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
                    {error}
                </div>
            )}

            {/* Machines Data */}
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                {machinesData && machinesData.length > 0 ? (
                    machinesData.map((machine, index) => (
                        <div style={{ margin: "10px" }} key={index}>
                            <Machine index={index} machine={machine} getMachines={getMachines} />
                        </div>
                    ))
                ) : (
                    !error && (
                        <div style={{ textAlign: "center", width: "100%" }}>
                            No machines available to display.
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ViewMachines;