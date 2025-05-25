import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    container: {
        flexGrow: 1,
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
        background: "#1976d2 !important",
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