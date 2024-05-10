import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function BreadCrumbs({icon ,recruitment, personnelNeeds}) {
    return (
        <>
            <Breadcrumbs className="breadCrumbs"  separator={<NavigateNextIcon sx={{margin: 0}} fontSize="small" />} aria-label="breadcrumb">
                <Link className="text-decoration-none d-flex  align-item-center grey-text" underline="hover" color="inherit" href="/">
                    {icon}    
                    {recruitment}
                </Link>
                <Typography className="grey-text">{personnelNeeds}</Typography>
            </Breadcrumbs>
        </>
    )
}