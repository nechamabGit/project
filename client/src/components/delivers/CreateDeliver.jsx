import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import styles from '../../delivers.module.css';

const CreatDeliver = ({ visible, setVisible, areaDeliver, getDelivers }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        area: areaDeliver?.area || "",
    });

    useEffect(() => {
        if (areaDeliver?.area) {
            setFormData((prev) => ({ ...prev, area: areaDeliver.area }));
        }
    }, [areaDeliver]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const createDeliver = async () => {
        const { username, password, name, email, area } = formData;

        try {
            const res = await axios.post('http://localhost:7002/api/auth/registerDeliver', {
                username, password, name, email, area
            });

            if (res.status === 201) {
                if (areaDeliver) {
                    await axios.put(`http://localhost:7002/api/machines/updateMachineDeliver/${areaDeliver._id}`, {
                        newId: res.data._id
                    });

                    await axios.delete(`http://localhost:7002/api/delivers/${areaDeliver._id}`);
                    alert("Success");
                }

                getDelivers();
            }
        } catch (error) {
            console.error("Error creating deliver:", error);
        }
    };

    const hideDialog = () => {
        setVisible(false);
    };

    return (
        <Dialog
            visible={visible}
            modal
            className={styles.dialog}
            onHide={hideDialog}
        >
            <div className={styles.dialogContent}>
                {["username", "password", "name", "email", "area"].map((field) => (
                    <div key={field} className={styles.inputGroup}>
                        <label htmlFor={field}>{field}</label>
                        <InputText
                            id={field}
                            type="text"
                            value={formData[field]}
                            onChange={handleChange}
                            className={styles.input}
                            disabled={field === "area" && areaDeliver}
                        />
                    </div>
                ))}

                <div className={styles.buttonRow}>
                    <Button label="Cancel" onClick={hideDialog} className={styles.cancelButton} />
                    <Button label="Add" onClick={() => { createDeliver(); hideDialog(); }} className={styles.addButton} />
                </div>
            </div>
        </Dialog>
    );
};

export default CreatDeliver;
