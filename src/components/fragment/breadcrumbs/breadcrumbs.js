import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function BreadCrumbs() {
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
        </>
    )
}