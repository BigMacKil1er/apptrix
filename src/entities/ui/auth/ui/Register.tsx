import { Button, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import {useForm} from 'react-hook-form'
import { IFormValuesRegister } from "../types";
import { validateEmail, validatePassword } from "../lib/validationPatterns";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../app/firebase";
import { useIsLoading } from "./table_cart/lib/UseIsLoading";
import { useNavigate } from "react-router-dom";
import { MENU_PAGE } from "../../../../app/routes";
export const RegisterForm = () => {
    const {isLoading, setIsloading} = useIsLoading()
    const navigate = useNavigate()
    const form = useForm<IFormValuesRegister>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    })
    const { register, handleSubmit, watch, formState } = form
    const {errors} = formState
    function onSubmit(data:IFormValuesRegister){
        setIsloading(true)
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(()=>{
                navigate(MENU_PAGE)
            }).catch(
                (err)=> {
                    console.log(err);
                }
            ).finally(()=>{
                setIsloading(false)
            })
    }
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} alignItems={'center'}>
                <Typography variant="h5" component="h5">
                    Register
                </Typography>
                <Stack spacing={2} width={300}>
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
                    <TextField 
                        label={'confirm password'} 
                        type="password" 
                        required={true} 
                        {...register("confirmPassword", {required: 'Confirm Password is required',
                        validate: (value)=>{
                            const password = watch("password")
                            return value === password || 'Entered passwords do not match'
                        } })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}/>
                    <Button type="submit" variant="contained">Register</Button>
                </Stack>
            </Stack>
            </form>
        </>
    );
};