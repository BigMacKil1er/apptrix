import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { LoginForm, RegisterForm } from "../../../../../entities/ui/auth";

export const FormsAuth = () => {
    const loginForm = 'login'
    const registerForm = 'register'
    const [whatForm, setWhatForm] = useState(loginForm)
    function handleSwitchForm(form:string){
        setWhatForm(form)
    }
    return (
        <Grid container gap={5} columns={2} alignItems={'center'} justifyContent={'center'} sx={{paddingTop: '1rem'}} >
            <Grid item>
                <Button 
                    variant="contained" 
                    sx={{ marginRight: '5px' }} 
                    color={whatForm === loginForm ? 'success' : 'secondary'} 
                    onClick={()=>handleSwitchForm(loginForm) }>Login</Button>
                <Button 
                    variant="contained" 
                    sx={{ marginLeft: '5px' }} 
                    color={whatForm === registerForm ? 'success' : 'secondary'}
                    onClick={()=> handleSwitchForm(registerForm)}>Register</Button>
            </Grid>
            <Grid item>
                {whatForm === loginForm ? <LoginForm/> : <RegisterForm/>}
            </Grid>
        </Grid>
    );
};