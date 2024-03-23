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
import { useTranslation } from "react-i18next";
export const LoginForm = () => {
    const {t} = useTranslation()
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
                setErrorMessage(t('main.notice.log_in_err_auth'))
            }
        )
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2} alignItems={'center'}>
                    <Typography variant="h5" component="h5">
                    {t('main.auth.sign-in')}
                    </Typography>
                    <Stack spacing={2} width={300}>
                        {errorMessage && 
                            <Typography color='error'>
                                {errorMessage}
                            </Typography>}
                        {isLoading && <LinearProgress color="secondary" />}
                        <TextField 
                            label={t('main.auth.field.email')} 
                            type="email" 
                            required={true} 
                            {...register("email", {required: t('main.notice.email_required'),
                            pattern: validateEmail})}
                            error={!!errors.email}
                            helperText={errors.email?.message}/>
                        <TextField 
                            label={t('main.auth.field.password')} 
                            type="password" 
                            required={true} 
                            {...register("password", {required: t('main.notice.password_required'),
                            pattern: validatePassword})}
                            error={!!errors.password}
                            helperText={errors.password?.message}/>
                        <Button type="submit" variant="contained" disabled={isLoading}>{t('main.auth.sign-in')}</Button>
                    </Stack>
                </Stack>
                
            </form>
        </>
    );
};