// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
};

const stationStyle = {
    padding: "10px 20px",
    borderRadius: "20px",
    backgroundColor: "#007bff", // Blue background
    color: "#fff", // White text
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const routeStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333", // Dark grey color
};

const RandomWayToDeliver = (props) => {
    const { token } = useSelector((state) => state.token);
    const [reportsToRandomWay, setReportsToRandomWay] = useState([]);
    const [names, setNames] = useState([]);
    const [show, setShow] = useState(false);

    const getReportsToDelivers = async () => {
        try {
            if (!token) {
                console.warn("Token is missing");
                return;
            }

            console.log("Fetching reports...");
            const res = await axios.get("http://localhost:7002/api/reportToDeliver/byid", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200 && Array.isArray(res.data)) {
                setReportsToRandomWay(res.data);
            } else {
                console.warn("Unexpected response format", res.data);
                setReportsToRandomWay([]);
            }
        } catch (e) {
            console.error("Error fetching reports:", e.message);
            setReportsToRandomWay([]);
        }
    };

    // פונקציה שמערבבת את המערך
    const shuffleArray = (array) => {
        if (!Array.isArray(array) || array.length === 0) {
            console.warn("Array is empty or invalid");
            return [];
        }

        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // מוודא שכל אובייקט במערך מכיל את המפתח הנדרש `idMachine.machineName`
        shuffled = shuffled.map((e) => {
            if (e && e.idMachine && e.idMachine.machineName) {
                return "שם: "+e.idMachine.machineName+" כתובת: "+e.idMachine.address;
            } else {
                console.warn("Invalid data structure for element:", e);
                return "Unknown Station"; // ערך ברירת מחדל במקרה של נתונים חסרים
            }
        });

        console.log("Shuffled array:", shuffled);
        return shuffled;
    };

    const makeRandomWay = () => {
        if (!reportsToRandomWay || reportsToRandomWay.length === 0) {
            console.warn("No reports available for randomization");
            setNames([]);
            setShow(false);
            return;
        }

        const shuffledReports = shuffleArray(reportsToRandomWay);
        setShow(true);
        setNames(shuffledReports);
    };

    useEffect(() => {
        getReportsToDelivers();
    }, []);

    return (
        <>
            <br />
            <div style={containerStyle}>
    <button onClick={makeRandomWay} style={stationStyle}>הגרל מסלול</button>
</div>
            {show && names.length > 0 ? (
                <div style={containerStyle}>
                    {names.map((station, index) => (
                        <React.Fragment key={index}>
                            {/* Station */}
                            <div style={stationStyle}>{station}</div>

                            {/* Route (except after the last station) */}
                            {index < names.length - 1 && <div style={routeStyle}>➔</div>}
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                show && <div>No stations to display</div> // הודעה במקרה שאין נתונים
            )}
        </>
    );
};

export default RandomWayToDeliver;