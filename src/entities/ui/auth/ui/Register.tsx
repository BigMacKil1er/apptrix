import { Button, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import {useForm} from 'react-hook-form'
import { IFormValuesRegister } from "../types";
import { validateEmail, validatePassword } from "../lib/validationPatterns";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../app/firebase";
import { useIsLoading } from "./table_cart/lib/UseIsLoading";
import { useNavigate } from "react-router-dom";
import { MENU_PAGE } from "../../../../app/routes";
import { useTranslation } from "react-i18next";
export const RegisterForm = () => {
    const {t} = useTranslation()
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
                    {t('main.auth.sign-up')}
                </Typography>
                <Stack spacing={2} width={300}>
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
                    <TextField 
                        label={t('main.auth.field.confirm_pass')} 
                        type="password" 
                        required={true} 
                        {...register("confirmPassword", {required: t('main.notice.confirm_password_required'),
                        validate: (value)=>{
                            const password = watch("password")
                            return value === password || t('main.notice.passwords_not_match')
                        } })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}/>
                    <Button type="submit" variant="contained">{t('main.auth.sign-up')}</Button>
                </Stack>
            </Stack>
            </form>
        </>
    );
};