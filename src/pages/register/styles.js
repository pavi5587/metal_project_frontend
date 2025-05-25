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
    registerBox: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    registerContainer: {
        width: 500,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        marginTop: "5%",
        borderRadius: "10px !important",
    },
    registerTitle: {
        fontSize: "25px !important",
        fontWeight: "bold !important",
    },
    registerButton: {
        marginTop: "10px !important",
        background: "#1976d2 !important",
        height: "50px !important",
        width: "97% !important",
    },
    registerButtonContainer: {
        width: "100% !important",
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
    },
    textField: {
        marginTop: "10px !important",
    },
    textField1: {
        marginTop: "20px !important",
    },
    Radio: {
        textAlign: "left",
        width: "100%",
        marginTop: "10px !important",
    },
});