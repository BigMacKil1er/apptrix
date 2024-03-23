import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { LoginForm, RegisterForm } from "../../../../../entities/ui/auth";
import { useTranslation } from "react-i18next";

export const FormsAuth = () => {
    const {t} = useTranslation()
    const loginForm = 'login'
    const registerForm = 'register'
    const [whatForm, setWhatForm] = useState(loginForm)
    function handleSwitchForm(form:string){
        setWhatForm(form)
    }
    return (
        <Grid container gap={5} columns={2} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} sx={{paddingTop: '1rem'}} >
            <Grid item>
                <Button 
                    variant="contained" 
                    sx={{ marginRight: '5px' }} 
                    color={whatForm === loginForm ? 'success' : 'secondary'} 
                    onClick={()=>handleSwitchForm(loginForm) }>{t('main.auth.sign-in')}</Button>
                <Button 
                    variant="contained" 
                    sx={{ marginLeft: '5px' }} 
                    color={whatForm === registerForm ? 'success' : 'secondary'}
                    onClick={()=> handleSwitchForm(registerForm)}>{t('main.auth.sign-up')}</Button>
            </Grid>
            <Grid item>
                {whatForm === loginForm ? <LoginForm/> : <RegisterForm/>}
            </Grid>
        </Grid>
    );
};