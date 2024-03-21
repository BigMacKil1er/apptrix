export interface IFormValues {
    email: string,
    password: string
}
export interface IFormValuesRegister extends IFormValues {
    confirmPassword: string
}