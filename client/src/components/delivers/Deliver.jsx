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

    const clear = () => {
        toastBC.current.clear();
        setVisible1(false);
        deletAndCreate();
    };

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
                            To delete you need to enter a new deliver to this area
                        </div>
                        <Button
                            className={styles['toast-button']}
                            label="OK"
                            severity="success"
                            onClick={clear}
                        />
                    </div>
                )
            });
        }
    };

    const deletAndCreate = async () => {
        setVisible(true);
        setAreaDeliver(deliver);
    };

    const footer = (
        <>
            <Toast ref={toastBC} position="top-center" onRemove={clear} />
            <Button
                label="Delete"
                severity="secondary"
                icon="pi pi-times"
                className={styles['delete-button']}
                onClick={confirm}
            />
        </>
    );


    const header = () => {
        return (
            <div className="custom-header-container">
                <div className="custom-header-wrapper">
                    <img src={DeliverImage} className="custom-header" alt="Deliver" />
                </div>
            </div>
        );
    }

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
            </Card>

            {areaDeliver && (
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
