import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography, TextField, Button, Box, Paper } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useStyles } from './styles';


const Login = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("formData", formData);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);
            console.log('Submitted:', response.data);
            localStorage.setItem("token", response.data.token);
            toast.success("Login Successfully", { position: "top-right" });
            navigate("/purity");
        } catch (error) {
            toast.error(error?.response?.data?.message, { position: "top-right" });
        }
    };

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <Box className={classes.container}>
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid size={4} className={classes.gridContainer}>
                </Grid>
                <Grid size={4}>
                    <Box className={classes.loginBox}>
                        <Paper className={classes.loginContainer}>
                            <Typography className={classes.loginTitle}>LOGIN</Typography>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                                onChange={handleChange}
                                className={classes.textField}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                onChange={handleChange}
                                className={classes.textField}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                className={classes.loginButton}
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                            <Typography mt={2}>
                                Don't have an account?{" "}
                                <span
                                    className={classes.signupStyle}
                                    onClick={() => navigate("/register")}
                                >
                                    Signup
                                </span>
                            </Typography>
                        </Paper>
                    </Box>
                </Grid>
                <Grid size={4} />

            </Grid>
        </Box>
    );
};

export default Login;