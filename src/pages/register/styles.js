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
        width: 550,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        marginTop: "8%",
        borderRadius: "10px !important",
    },
    registerTitle: {
        fontSize: "25px !important",
        fontWeight: "bold !important",
    },
    registerButton: {
        marginTop: "25px !important",
        background: "#1976d2 !important",
        height: "50px !important",
        width: "100% !important",
    },
    registerButtonContainer: {
        width: "100% !important",
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
    },
    textField: {
        marginTop: "20px !important",
    },
    Radio: {
        textAlign: "left",
        width: "100%",
        marginTop: "15px !important",
    },
});