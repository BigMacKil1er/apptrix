import { AppBar, Box, Button, Checkbox, Grid, List, ListItem, Snackbar, Toolbar, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../../app/firebase";
import { styles } from "../styles";
import { StyledBadge } from "../lib/StyledBadge";
import { useNavigate } from "react-router-dom";
import { CART_PAGE, MAIN_PAGE, MENU_PAGE } from "../../../../app/routes";
import { useSelector } from "react-redux";
import { checkPosition } from "../../../../app/store/data/cart_slice/cartSlice";
import { useTranslation } from "react-i18next";
import { SwitchLocale } from "../../../../entities/ui/switch_locale/SwitchLocale";

export const Header = () => {
    const stylesButton = {
        color: 'white',
        '&hover': {
            filter: 'blur(3px)'
        }
    }

    const {t} = useTranslation()
    const [isAuth, setIsAuth] = useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const cartCount = useSelector(checkPosition).length
    function handleClose(_event: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    function handleLogOut() {
        signOut(auth).then(()=>{
            setIsAuth(false)
            setOpen(true)
            navigate(MAIN_PAGE)
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        const hasAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true)
            }
        })
        return () => hasAuth()
    },[])
    return (
        <Grid>
            <AppBar component="nav" position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                            {t('main.title')}
                    </Typography>
                    <Checkbox sx={styles.checkbox} 
                        inputProps={{ 'aria-label': 'controlled' }} 
                        icon={<MenuIcon />} 
                        checkedIcon={<MenuOpenIcon />}/>
                    <Box className="checkbox-box" sx={styles.box}>
                        
                        <List sx={{display: {sm: 'flex', xs: 'block'}}}>
                            <ListItem sx={styles.listItem}>
                                <SwitchLocale/>
                            </ListItem>
                            <ListItem sx={styles.listItem}>
                                <Button 
                                    variant="text" 
                                    sx={stylesButton} 
                                    size="small" 
                                    onClick={()=>navigate(MAIN_PAGE)}>
                                    {t('main.navigation.log_in')}
                                </Button>
                            </ListItem>
                            {isAuth && <ListItem sx={styles.listItem}>
                                <Button 
                                    sx={{color: 'white'}} 
                                    size="small" 
                                    onClick={()=>navigate(MENU_PAGE)}>
                                    {t('main.navigation.menu')}
                                </Button>
                            </ListItem>}
                            <ListItem sx={styles.listItem}>
                                <IconButton  onClick={()=>navigate(CART_PAGE)}>
                                    <StyledBadge badgeContent={cartCount} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                            </ListItem>
                            {isAuth && <ListItem sx={styles.listItem}>
                                <Button 
                                    variant="text" 
                                    sx={{...stylesButton}} 
                                    size="small"
                                    onClick={handleLogOut}>
                                    {t('main.navigation.logout')}
                                </Button>
                            </ListItem>}
                        </List>
                    </Box>
                </Toolbar>
            </AppBar>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message="You're logged out"
                />
        </Grid>
    );
};