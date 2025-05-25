import React, { useState, useMemo, useEffect } from 'react';
import { TextField, MenuItem, Button, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const token = localStorage.getItem("token");

export default function DynamicForm({ fields, initialValues, api, purityList, fetchData }) {

    const [formData, setFormData] = useState(initialValues || {});
    const [existingRate, setExistingRate] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'metal' && { purity: '' }),
        }));
    };

    const filteredPurityOptions = useMemo(() => {
        return purityList
            ?.filter((item) => item.metal === formData.metal)
            .map((item) => item.name);
    }, [formData.metal, purityList]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(`${process.env.REACT_APP_API_URL}${api}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log('Submitted:', response.data);
            fetchData();
            setFormData({});
            setExistingRate(null);
            toast.success("Added Successfully", { position: "top-right" });
        } catch (error) {
            toast.error(error?.response?.data?.message, { position: "top-right" });
            console.log(error?.response);


        }
    };
    useEffect(() => {
        const fetchLatestRate = async () => {
            if (formData.metal && formData.purity) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rate/latest`, {
                        params: {
                            metal: formData.metal,
                            purity: formData.purity,
                        },

                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    console.log("response", response);

                    setExistingRate(response.data?.rate || null);
                } catch (err) {
                    console.error('Error fetching latest rate:', err);
                    setExistingRate(null);

                }
            } else {
                setExistingRate(null);
            }
        };

        fetchLatestRate();
    }, [formData.metal, formData.purity]);
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                {fields.map(({ label, name, type, options }) => {
                    let fieldOptions = options;

                    if (name === 'purity') {
                        fieldOptions = filteredPurityOptions;
                    }
                    console.log("fieldOptions", fieldOptions);

                    return (
                        <Grid size={2} key={name}>
                            {type === 'select' ? (
                                <TextField
                                    select
                                    label={label}
                                    name={name}
                                    value={formData[name] || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                >
                                    {(fieldOptions || []).map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : type === 'date' ? (
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DesktopDatePicker
                                        label={label}
                                        value={formData[name] ? dayjs(formData[name]) : null}
                                        onChange={(date) =>
                                            handleChange({
                                                target: {
                                                    name,
                                                    value: date?.toISOString() || '',
                                                },
                                            })
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth margin="normal" />
                                        )}
                                    />
                                </LocalizationProvider>
                            ) : (
                                <TextField
                                    label={label}
                                    name={name}
                                    type={type}
                                    value={formData[name] || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        </Grid>
                    );
                })}


                {existingRate && (
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                            Latest Rate for selected Metal & Purity: <strong>{existingRate}</strong>
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={2}>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ width: "100%" }}>
                        ADD
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

