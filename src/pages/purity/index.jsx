import React, { useEffect, useState } from 'react'
import DynamicForm from '../../components/dynamicForm';
import axios from 'axios';
import DynamicTable from '../../components/dynamicTable';
import classes from "./styles.module.css";
import Header from '../../components/header';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const metals = process.env.REACT_APP_METALS?.split(',');
const token = localStorage.getItem("token");

const Purity = () => {
    const [purities, setPurities] = useState([]);

    const fields = [
        { label: 'Metal', name: 'metal', type: 'select', options: metals },
        { label: 'Purity', name: 'name', type: 'text' },
    ];
    const initialValues = {
        name: '',
        metal: '',
    };

    const tableTitle = [{
        title: "Metal", value: "metal"
    }, {
        title: "Purity", value: "name"
    }]

    const fetchPurities = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/purity`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurities(response?.data?.purityList);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const handleEdit = async (updatedRow) => {
        try {

            await axios.put(`${process.env.REACT_APP_API_URL}/api/purity/update/${updatedRow._id}`, updatedRow, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurities((prev) =>
                prev.map((row) => (row._id === updatedRow._id ? updatedRow : row))
            );
            toast.success("Updated Successfully", { position: "top-right" });
        } catch (error) {
            toast.error(error?.response?.data?.message, { position: "top-right" });
        }
    };

    const handleDelete = async (rowToDelete) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/purity/delete/${rowToDelete._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurities((prev) => prev.filter((row) => row._id !== rowToDelete._id));
            toast.success("Deleted Successfully", { position: "top-right" });
        } catch (error) {
            toast.error(error?.response?.data?.message, { position: "top-right" });
        }
    };

    useEffect(() => {
        fetchPurities();
    }, []);

    return (
        <>
            <Header />
            <div className={classes.purityContainer}>
                <DynamicForm fields={fields} initialValues={initialValues} api={"/api/purity/add"} fetchData={fetchPurities} />
                <DynamicTable tableData={purities} tableTitle={tableTitle} metals={metals}
                    onEdit={handleEdit}
                    onDelete={handleDelete} />
            </div>
        </>

    )
}

export default Purity