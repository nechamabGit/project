import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import styles from '../../delivers.module.css';
import { useSelector } from 'react-redux';

const CreatDeliver = ({ visible, setVisible, areaDeliver, getDelivers }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        area: areaDeliver?.area || "",
    });
    const { token } = useSelector((state) => state.token);

    const [errors, setErrors] = useState({}); // שמירת שגיאות ולידציה

    useEffect(() => {
        if (areaDeliver?.area) {
            setFormData((prev) => ({ ...prev, area: areaDeliver.area }));
        }
    }, [areaDeliver]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateFields = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.area) newErrors.area = "Area is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createDeliver = async () => {
        // if (!validateFields()) {
        //     return; // אם יש שגיאות - עצור את הפעולה
        // }

        const { username, password, name, email, area } = formData;
        try {
            const res = await axios.post('http://localhost:7002/api/auth/registerDeliver', {
                username, password, name, email, area
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });

            if (res) {
                if (areaDeliver) {
                    console.log("in areaDeliver");
                    await axios.put(`http://localhost:7002/api/machines/updateMachineDeliver/${areaDeliver._id}`, {
                        newId: res.data._id
                    }       ,{ headers: { Authorization: `Bearer ${token}` }}
                );

                    await axios.delete(`http://localhost:7002/api/delivers/${areaDeliver._id}`,{headers: { Authorization: `Bearer ${token}` }});
                    alert("Success");

                }
                getDelivers();


            }
        } catch (error) {
            console.error("Error creating deliver:", error);
            alert("Failed to create deliver. Please try again.");
        }
    };

    // useEffect(() => {
    //     getDelivers();
    // }, [getDelivers]);

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
                {["שם משתמש", "סיסמא", "שם", "אימייל", "area"].map((field) => (
                    <div key={field} className={styles.inputGroup}>
                        <label htmlFor={field}>{field}</label>
                        <InputText
                            id={field}
                            type="text"
                            value={formData[field]}
                            onChange={handleChange}
                            className={`${styles.input} ${errors[field] ? styles.errorInput : ""}`}
                            disabled={field === "area" && areaDeliver}
                        />
                        {errors[field] && <small className={styles.errorText}>{errors[field]}</small>}
                    </div>
                ))}

                <div className={styles.buttonRow}>
                    <Button label="ביטול" onClick={hideDialog} className={styles.cancelButton} />

                    <Button label="הוספה" onClick={() => { createDeliver(); hideDialog(); }} className={styles.addButton} />
                </div>
            </div>
        </Dialog>
    );
};

export default CreatDeliver;