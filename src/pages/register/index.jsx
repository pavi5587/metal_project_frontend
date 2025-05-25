import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    TextField,
    Button,
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
    Grid
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useStyles } from './styles';

const Register = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        password: "",
        country: "",
        city: "",
        state: "",
        gender: "",
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };



    const handleSubmit = async () => {
        console.log("Form Data:", formData);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, formData);
            console.log('Submitted:', response.data);
            toast.success("Registered Successfully", { position: "top-right" });
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message, { position: "top-right" });
        }
    };

    return (
        <Box className={classes.container}>
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid size={3} />
                <Grid size={6}>
                    <Box className={classes.registerBox}>
                        <Paper className={classes.registerContainer}>
                            <Typography className={classes.registerTitle}>
                                REGISTER
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size xs={6}>
                                    <TextField
                                        label="Enter Name"
                                        name="name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                        className={classes.textField}
                                        sx={{
                                            width: "100%"
                                        }}
                                    />
                                </Grid>
                                <Grid size xs={6}>
                                    <TextField
                                        label="Enter Email"
                                        name="email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid size xs={6}>
                                    <TextField
                                        label="Enter Mobile Number"
                                        name="mobileNumber"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid size xs={6}>
                                    <TextField
                                        label="Enter Password"
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid size xs={6}>
                                    <TextField
                                        label="Enter City Name"
                                        name="city"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid size xs={6}>
                                    <TextField
                                        label="Enter State Name"
                                        name="state"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid size xs={6}>
                                    <TextField
                                        label="Enter Country Name"
                                        name="country"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid size xs={6}>
                                    <FormControl className={classes.Radio}>
                                        <FormLabel>Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            value={formData?.gender}
                                            name="gender"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="other"
                                                control={<Radio />}
                                                label="Other"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <div className={classes.registerButtonContainer}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    className={classes.registerButton}
                                    onClick={handleSubmit}
                                >
                                    Register
                                </Button>
                            </div>
                        </Paper>
                    </Box>
                </Grid>
                <Grid size={3} />
            </Grid>
        </Box>
    );
};

export default Register;