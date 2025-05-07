// import React from "react";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button'
//import { useNavigate } from "react-router";
import ReportToDeliver from "./ReportToDeliver";
import RandomWay from "./RandomWay";



const RandomWayToDeliver = (props) => {
    const { token, user } = useSelector((state) => state.token);
    const [reportsToRandomWay, setreportsToRandomWay] = useState([]);
    // const { reportsTodeliversData } = props;
// console.log(reportsTodeliversData);

    const getReportsToDelivers = async () => {
        //const username=token.user
       try {
          // console.log(token);
           console.log("iiiiiiiiiiiiiiii");
           const res = await axios.get("http://127.0.0.1:7002/api/reportToDeliver/byid", {
               headers: { Authorization: `Bearer ${token}` }
           });
           if (res.status === 200) {
            setreportsToRandomWay(res.data);
           }
       } catch (e) {
           console.error(e);
       }
   };
   const formatCurrency = (value) => {
       console.log(value);
       return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
   };
   useEffect(() => {
       getReportsToDelivers();
   }, []);


    // פונקציה שמערבבת את המערך
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const makeRandomWay = () => {
        const shuffledReports = shuffleArray(reportsToRandomWay);
        setreportsToRandomWay(shuffledReports);
    };

    return (
        <>
            <button onClick={makeRandomWay}>ערבב דוחות</button>

            <ul>
                {reportsToRandomWay.map((report, index) => (
                    <li key={index}>
                        {report.message || report.massage || JSON.stringify(report)}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default RandomWayToDeliver;
