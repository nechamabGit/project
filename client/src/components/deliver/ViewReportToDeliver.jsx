import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import ReportToDeliver from "./ReportToDeliver";
import RandomWayToDeliver from "./RandomWay";

const ViewReportToDeliver = () => {
    const { token } = useSelector((state) => state.token);
    const [reportsTodeliversData, setReportsTodeliversData] = useState([]);
    const [visible, setVisible] = useState(false);

    // Fetch reports from the server
    const getReportsToDelivers = async () => {
        try {
            if (!token) {
                console.warn("Token is missing, cannot fetch reports");
                return;
            }

            const res = await axios.get("http://127.0.0.1:7002/api/reportToDeliver/byid", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200 && Array.isArray(res.data)) {
                setReportsTodeliversData(res.data);
            } else {
                console.warn("Unexpected response format", res.data);
                setReportsTodeliversData([]); // Ensure the state is reset
            }
        } catch (e) {
            console.error("Error fetching reports:", e.message);
            setReportsTodeliversData([]); // Reset state in case of failure
        }
    };

    // Format currency with validation
    const formatCurrency = (value) => {
        if (typeof value !== "number") {
            console.warn("Invalid value passed to formatCurrency:", value);
            return "N/A"; // Return "N/A" for invalid values
        }
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    useEffect(() => {
        getReportsToDelivers();
    }, []);

    return (
        <>
            {/* Button to trigger random way */}
            <RandomWayToDeliver reportsTodeliversData={reportsTodeliversData} />

            {/* Display reports */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap"
            }}>
                {reportsTodeliversData.length > 0 ? (
                    reportsTodeliversData.map((report, index) => (
                        <div style={{ margin: "10px" }} key={index}>
                            <ReportToDeliver
                                index={index}
                                report={report}
                                setReportsTodeliversData={setReportsTodeliversData}
                                getReportsToDelivers={getReportsToDelivers}
                            />
                        </div>
                    ))
                ) : (
                    <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
                        No reports available to display
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewReportToDeliver;