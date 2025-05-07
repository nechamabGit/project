import Deliver from "./Deliver";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import CreatDeliver from "./CreateDeliver";
import styles from '../../delivers.module.css'; // CSS מודול
import { Button } from 'primereact/button';

const ViewDelivers = () => {
    const { token } = useSelector((state) => state.token);
    const [deliversData, setDeliversData] = useState([]);
    const [visible, setVisible] = useState(false);

    const getDelivers = async () => {
        try {
            const res = await axios.get('http://localhost:7002/api/delivers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setDeliversData(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getDelivers();
    }, []);

    return (
        <>
            <div className={styles['create-button-container']}>
                <button
                    className={styles['create-button']}
                    onClick={() => setVisible(true)}
                >
                    Create
                </button>
            </div>

            <CreatDeliver
                areaDeliver={null}
                visible={visible}
                setVisible={setVisible}
                getDelivers={getDelivers}
            />

            <div className={styles['main-content']}>
                {deliversData.map((deliver, index) => (
                    <div className={styles['custom-card']} key={index}>
                        <Deliver
                            index={index}
                            deliver={deliver}
                            setDeliversData={setDeliversData}
                            getDelivers={getDelivers}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ViewDelivers;
