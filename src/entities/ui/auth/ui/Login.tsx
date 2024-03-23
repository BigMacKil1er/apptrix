import { Button, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import {useForm} from 'react-hook-form'
import { IFormValues } from "../types";
import { validateEmail, validatePassword } from "../lib/validationPatterns";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../app/firebase";
import { useState } from "react";
import { useIsLoading } from "./table_cart/lib/UseIsLoading";
import { useNavigate } from "react-router-dom";
import { MENU_PAGE } from "../../../../app/routes";
export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const {isLoading, setIsloading} = useIsLoading()
    const navigate = useNavigate()
    const form = useForm<IFormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { register, handleSubmit, formState } = form
    const {errors} = formState
    function onSubmit(data:IFormValues){
        setIsloading(true)
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((user)=>{
            console.log(user.user.uid)
            setIsloading(false)
            setErrorMessage('')
            navigate(MENU_PAGE)
        }).catch(
            (err)=> {
                console.log(err);
                setIsloading(false)
                setErrorMessage('incorrect login or password')
            }
        )
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2} alignItems={'center'}>
                    <Typography variant="h5" component="h5">
                        Login
                    </Typography>
                    <Stack spacing={2} width={300}>
                        {errorMessage && 
                            <Typography color='error'>
                                {errorMessage}
                            </Typography>}
                        {isLoading && <LinearProgress color="secondary" />}
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
                        <Button type="submit" variant="contained" disabled={isLoading}>Login</Button>
                    </Stack>
                </Stack>
                
            </form>
        </>
    );
};