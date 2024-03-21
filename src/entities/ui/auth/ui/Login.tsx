import { Button, Stack, TextField, Typography } from "@mui/material";
import {useForm} from 'react-hook-form'
import { IFormValues } from "../types";
import { validateEmail, validatePassword } from "../lib/validationPatterns";
export const LoginForm = () => {
    const form = useForm<IFormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { register, handleSubmit, formState } = form
    const {errors} = formState
    function onSubmit(data:IFormValues){
        console.log(data);
        
    }
    console.log('login render');
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2} alignItems={'center'}>
                    <Typography variant="h5" component="h5">
                        Login
                    </Typography>
                    <Stack spacing={2} width={400}>
                    
                        <TextField 
                            label={'email'} 
                            type="email" 
                            required={true} 
                            {...register("email", {required: 'Email is required',
                            pattern: validateEmail})}
                            error={!!errors.email}
                            helperText={errors.email?.message}/>
                        <TextField 
                            label={'password'} 
                            type="password" 
                            required={true} 
                            {...register("password", {required: 'Password is required',
                            pattern: validatePassword})}
                            error={!!errors.password}
                            helperText={errors.password?.message}/>
                        <Button type="submit" variant="contained">Login</Button>
                    </Stack>
                </Stack>
                
            </form>
        </>
    );
};