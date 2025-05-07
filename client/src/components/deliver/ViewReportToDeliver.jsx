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
            const res = await axios.get("http://127.0.0.1:7002/api/reportToDeliver/byid", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200 && Array.isArray(res.data)) {
                setReportsTodeliversData(res.data);
            } else {
                console.warn("Unexpected response format", res.data);
                alert("Failed to fetch reports. Please try again later.");
                setReportsTodeliversData([]); // Reset state in case of unexpected format
            }
        } catch (e) {
            console.error("Error fetching reports:", e.message);
            alert("Error fetching reports. Please try again later.");
            setReportsTodeliversData([]); // Reset state in case of failure
        }
    };

    useEffect(() => {
        getReportsToDelivers();
    }, []);

    return (
        <>  
         <RandomWayToDeliver reportsTodeliversData={reportsTodeliversData} />
        
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            {reportsTodeliversData.length === 0 ? (
                <p>No reports available.</p>
            ) : (
                reportsTodeliversData.map((report, index) => (
                    <div style={{ margin: "10px" }} key={index}>
                        <ReportToDeliver
                            index={index}
                            report={report}
                            setreportsTodeliversData={setReportsTodeliversData}
                            getReportsToDelivers={getReportsToDelivers}
                        />
                    </div>
                ))
            )}
        </div>
        </>
    );
};

export default ViewReportToDeliver;