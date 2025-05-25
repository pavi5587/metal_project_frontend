import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import LoginImg from "../assets/images/loginImg.jpg";
import Grid from "@mui/material/Grid";
import { Typography, TextField, Button, Box, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        background: "",
        width: "100%",
        height: "100vh",
    },
    gridContainer: {
        height: "99vh",
    },
    loginBox: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    loginContainer: {
        width: 500,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        marginTop: "30%",
        borderRadius: "10px !important",
    },
    loginTitle: {
        fontSize: "25px !important",
        fontWeight: "bold !important",
    },
    loginButton: {
        marginTop: "25px !important",
        background: "#1f2f68 !important",
        height: "50px !important",
    },
    signupStyle: {
        color: "#1976d2",
        cursor: "pointer",
        fontWeight: "bold",
    },
    textField: {
        marginTop: "20px !important",
    },
});

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
                    {/* <img src={LoginImg} height={"100%"} width={"100%"} /> */}
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