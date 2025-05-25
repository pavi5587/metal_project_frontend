import { Link } from "react-router-dom";
import classes from "./styles.module.css";
import { Grid, Typography } from "@mui/material";

export default function Header() {
    return (
        <div className={classes.headerContainer}>
            <Grid container spacing={2}>
                <Grid size={6} className={classes.headerTitle}>
                    <Typography variant="h6">Metal & Purity Rate Management System</Typography>
                </Grid>
                <Grid size={6} className={classes.headerNav}>
                    <ul className={classes.navList}>
                        <Link to={"/"}>
                            <li>Purity</li>
                        </Link>
                        <Link to={"/metalRate"}>
                            <li>Metal Rate</li>
                        </Link>
                    </ul>
                </Grid>
            </Grid>

        </div>
    );
}
