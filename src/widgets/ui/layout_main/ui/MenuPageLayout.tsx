import {Grid} from '@mui/material'
import { Header } from '../../../../features/ui/header';
import { MenuList } from '../../../../features/ui/content';
export const MenuPageLayout = () => {
    return (
        <Grid>
            <Header/>
            <MenuList/>
        </Grid>
    );
};