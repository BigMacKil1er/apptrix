import { Grid } from "@mui/material";
import { Header } from "../../../../features/ui/header";

interface LayoutProps {
    children: React.ReactNode
}
export const Layout:React.FC<LayoutProps> = ({children}) => {
    return (
        <Grid>
            <Header/>
            {children}
        </Grid>
    );
};