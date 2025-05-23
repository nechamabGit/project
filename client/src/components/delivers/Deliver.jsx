import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { Card } from "primereact/card";
import { useSelector } from "react-redux";
import CreatDeliver from "./CreateDeliver";
import { Toast } from 'primereact/toast';
import styles from '../../delivers.module.css';
import DeliverImage from './profil.jpg';

const Deliver = ({ getDelivers, deliver, setDeliversData, index }) => {
    const { token } = useSelector((state) => state.token);
    const [visible, setVisible] = useState(false);
    const [areaDeliver, setAreaDeliver] = useState(null);
    const [visible1, setVisible1] = useState(false);
    const toastBC = useRef(null);

    // Clear the toast and set visibility
    const clear = () => {
        toastBC.current.clear();
        setVisible1(false);
        deletAndCreate();
    };

    // Confirm deletion of the deliver
    const confirm = () => {
        if (!visible) {
            setVisible1(true);
            toastBC.current.clear();
            toastBC.current.show({
                severity: 'success',
                summary: 'To delete you need to enter a new deliver to this area',
                sticky: true,
                content: () => (
                    <div className={styles['toast-content']}>
                        <div className={styles['toast-message']}>
כדי למחוק עליך להכניס משלוחן חדש לאזור  </div>
                        <Button
                            className={styles['toast-button']}
                            label="אישור"
                            severity="success"
                            onClick={clear}
                        />
                    </div>
                )
            });
        }
    };

    // Handle deletion and creation of a new deliver
    const deletAndCreate = () => {
        setAreaDeliver(deliver); // First, set the areaDeliver
        setVisible(true);       // Then, set the visible state
    };

    // Custom footer for the Card component
    const footer = (
        <>
            <Toast ref={toastBC} position="top-center" onRemove={clear} />
            <Button
                label="מחיקה"
                severity="secondary"
                icon="pi pi-times"
                className={styles['delete-button']}
                onClick={confirm}
            />
        </>
    );

    // Custom header for the Card component
    const header = () => {
        return (
            <div className="custom-header-container">
                <div className="custom-header-wrapper">
                    <img src={DeliverImage} className="custom-header" alt="Deliver" />
                </div>
            </div>
        );
    };

    return (
        <>
            <Card
                title={deliver.username}
                footer={footer}
                header={header}
                className={styles['custom-card']}
            >
                <p>{deliver.name}</p>
                <h4>{deliver.email}</h4>
                <h4>{deliver.area}</h4>
                
            </Card>

            {/* Render the CreatDeliver component only if areaDeliver is set */}
            {visible && areaDeliver && (
                <CreatDeliver
                    visible={visible}
                    setVisible={setVisible}
                    areaDeliver={areaDeliver}
                    getDelivers={getDelivers}
                />
            )}
        </>
    );
};

export default Deliver;