import { AppBar, Box, Button, Checkbox, Grid, List, ListItem, Toolbar, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const styles = {
    checkbox: { 
        mr: 2, 
        display: { sm: 'none' }, 
        '&.Mui-checked': {
            color: 'white',
            '& + .checkbox-box': {
                opacity: 1,
                transform: 'scale(1)'
            }
        } 
    },
    box: {
        '@media (max-width: 600px)': {
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 60,
            right: 0,
            background: '#00000063',
            opacity: 0,
            transition: 'opacity 600ms',
            transform: 'scale(0)',
        },
        '&.checked': {
            opacity: 1,
            transform: 'scale(1)'
          }
    }
}

export const Header = () => {
    const stylesButton = {
        color: 'white',
        '&hover': {
            filter: 'blur(3px)'
        }
    }
    return (
        <Grid>
            <AppBar component="nav" position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                            TEST TASK
                    </Typography>
                    <Checkbox sx={styles.checkbox} 
                        inputProps={{ 'aria-label': 'controlled' }} 
                        icon={<MenuIcon />} 
                        checkedIcon={<MenuOpenIcon />}/>
                    <Box className="checkbox-box" sx={styles.box}>
                        <List sx={{display: {sm: 'flex', xs: 'block'}}}>
                            <ListItem>
                                <Button variant="text" sx={stylesButton} size="small">
                                    Главная
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button sx={{color: 'white'}} size="small">
                                    Меню
                                </Button>
                            </ListItem>
                            <ListItem>
                                <IconButton sx={{display: {xs: 'none', sm: 'block'}}}>
                                    <ShoppingCartIcon />
                                </IconButton>
                                <Button variant="text" sx={{...stylesButton, display: {xs: 'block', sm: 'none'}}} size="small">
                                    Корзина
                                </Button>
                            </ListItem>
                        </List>
                    </Box>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};