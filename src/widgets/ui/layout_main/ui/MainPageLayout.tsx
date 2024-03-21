import {Grid} from '@mui/material'
import { Header } from '../../../../features/ui/header';
import { MainContent } from '../../../../features/ui/content';
export const MainPageLayout = () => {
    return (
        <Grid>
            <Header/>
            <MainContent/>
        </Grid>
    );
};