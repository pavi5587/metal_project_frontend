import React, { useState, useEffect } from 'react'
import DynamicForm from '../../components/dynamicForm';
import axios from 'axios';
import DynamicTable from '../../components/dynamicTable';
import { TextField, Grid, MenuItem, Pagination } from '@mui/material';
import Header from '../../components/header';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';

const metals = process.env.REACT_APP_METALS?.split(',');
const token = localStorage.getItem("token");

const MetalRate = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const [purityList, setPurityList] = useState([]);
    const [metal, setMetal] = useState('');
    const [purity, setPurity] = useState('');
    const [purities, setPurities] = useState([])
    const [rates, setRates] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    const fetchRates = async () => {
        try {

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/rate`, {
                params: { metal, purity, page, limit },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("res", res);

            setRates(res.data.data);
            setTotal(res.data.totalPages);
        } catch (error) {
            console.error('Error', error);
            toast.error(error?.response?.data?.message, { position: "top-right" });
        }
    };

    useEffect(() => {
        fetchRates();
    }, [metal, purity, page]);



    const fields = [
        { label: 'Metal', name: 'metal', type: 'select', options: metals },
        { label: 'Purity', name: 'purity', type: 'select' },
        { label: 'rate', name: 'rate', type: 'text' },
        { label: 'date', name: 'rateDate', type: 'date' },
    ];
    const initialValues = {
        name: '',
        metal: '',
        rate: "",
        rateDate: ""
    };



    const tableTitle = [
        { title: 'Metal', value: 'metal' },
        { title: 'Purity', value: 'purity' },
        { title: 'Rate', value: 'rate' },
        { title: 'Date', value: 'rateDate' },
    ];


    const fetchPurities = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/purity`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurityList(response?.data?.purityList);
            const goldPurities = response?.data?.purityList
                .filter(item => item.metal === metal)
                .map(item => item.name);
            setPurities(goldPurities)
        } catch (error) {
            console.error('Error', error);
            toast.error(error?.response?.data?.message, { position: "top-right" });
        }
    };

    const handleEdit = async (updatedRow) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/rate/update/${updatedRow._id}`, updatedRow, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRates((prev) =>
                prev.map((row) => (row._id === updatedRow._id ? updatedRow : row))
            );
            toast.success("Updated Successfully", { position: "top-right" });
        } catch (error) {
            toast.error(error?.response?.data?.message, { position: "top-right" });
        }
    };

    const handleDelete = async (rowToDelete) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/rate/delete/${rowToDelete._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRates((prev) => prev.filter((row) => row._id !== rowToDelete._id));
            toast.success("Deleted Successfully", { position: "top-right" });
        } catch (error) {
            toast.error(error?.response?.data?.message, { position: "top-right" });
        }
    };

    useEffect(() => {
        fetchPurities();
    }, [metal]);

    const handleChange = (event, value) => {
        setPage(value);
        console.log('Current Page:', value);
    };
    return (
        <>
            <Header />
            <div className={classes.container}>
                <DynamicForm fields={fields} initialValues={initialValues} api={"/api/rate/add"} purityList={purityList} fetchData={fetchRates} />
                <Grid container spacing={2}>
                    <Grid size={5}>
                        <TextField
                            select
                            label="Metal"
                            value={metal}
                            onChange={(e) => setMetal(e.target.value)}
                            fullWidth
                            margin="normal"
                        >

                            {metals.map((m) => (
                                <MenuItem key={m} value={m}>{m}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={5}>
                        <TextField
                            select
                            label="Purity"
                            value={purity}
                            onChange={(e) => setPurity(e.target.value)}
                            fullWidth
                            margin="normal"
                        >

                            {purities.map((m) => (
                                <MenuItem key={m} value={m}>{m}</MenuItem>
                            ))}
                        </TextField>

                    </Grid>
                </Grid>
                <div className={classes.tableContainer}>
                    <DynamicTable tableData={rates} tableTitle={tableTitle} metals={metals}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <Pagination
                        count={total}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                        size="large"
                        sx={{ mt: 2 }}
                    />
                </div>
            </div>
        </>
    )
}

export default MetalRate