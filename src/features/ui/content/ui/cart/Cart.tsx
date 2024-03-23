import { Grid } from "@mui/material";
import { Orders, TableCart } from "../../../../../entities/ui/auth";


export const Cart = () => {
    return (
        <Grid>
            <TableCart/>
            <Orders/>
        </Grid>
    );
};