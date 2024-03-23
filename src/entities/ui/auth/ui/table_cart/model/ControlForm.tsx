import { Backdrop, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar, TextField, Theme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ICartItem } from "../../../../../../shared/types/item";
import { useDispatch, useSelector } from "react-redux";
import { checkPosition, setCartItems } from "../../../../../../app/store/data/cart_slice/cartSlice";
import { QueryDocumentSnapshot, SnapshotOptions, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../../../app/firebase";
import { onAuthStateChanged } from "firebase/auth";
interface IFormOrderValues {
    payment: string,
    address: string,
    order: ICartItem[],
    author: string,
    price: number
}
export const ControlForm: React.FC<{subtotal: number}> = ({subtotal}) => {
    const cartData = useSelector(checkPosition)
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const orderId = useRef('')
    
    const form = useForm<IFormOrderValues>({
        defaultValues: {
            payment: '',
            address: '',
            order: [],
            author: '',
            price: 0
        }
    })
    
    const { register, handleSubmit, formState, setValue, setError } = form
    const {errors, isValid} = formState


    const orderConverter = {
        toFirestore: (order:IFormOrderValues) => {
            return {
                payment: order.payment,
                address: order.address,
                order: order.order,
                author: order.author,
                price: order.price
                };
        },
        fromFirestore: (snapshot: QueryDocumentSnapshot<IFormOrderValues>, options: SnapshotOptions) => {
            const data = snapshot.data(options);
            return {
                payment: data?.payment,
                address: data?.address,
                order: data?.order,
                author: data?.author,
                price: data?.price
            };
        }
    };

    async function submitData(data: IFormOrderValues){
        try {
            setLoading(true)
            const ref = doc( collection(db, 'orders')).withConverter(orderConverter)
            await setDoc(ref, data)
            orderId.current = ref.id
            setOpen(true)
            dispatch(setCartItems({position: []}))
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    function handleClose(_event: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setValue('author', user.uid) 
                setValue('price', subtotal)
            }
        })
        if (cartData.length !== 0) {
            setValue('order', cartData)
        } else {
            setError('order', { type : 'custom' , message : 'No products available' })
        }
    },[cartData])
    return (
        <>
            <form action="" noValidate onSubmit={handleSubmit(submitData)}>
                <FormControl sx={{ m: 1, minWidth: 120, display: 'flex', flexDirection: 'row', gap: '10px', paddingBottom: '10px' }} size="small">
                    <InputLabel id="select-autowidth-label">Payment method</InputLabel>
                    <Select
                        sx={{width: '100%'}}
                        labelId="select-autowidth-label"
                        id="select-autowidth"
                        label="Payment method"
                        error={!!errors.payment?.message}
                        value={paymentMethod}
                        {...register('payment', {
                            required: 'The address is required',
                            onChange: (event)=> {
                                setPaymentMethod(event.target.value)
                            }
                        })}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'card'}>Card</MenuItem>
                        <MenuItem value={'cash'}>Cash</MenuItem>
                        <MenuItem value={'cryptocurrency'}>Сryptocurrency</MenuItem>
                    </Select>
                    
                    <TextField 
                        error={!!errors.address?.message}
                        label={'delivery address'} {...register('address', {
                        required: 'The address is required',
                    })}/>
                    <Button type='submit'>order</Button>
                </FormControl>
                
                <FormHelperText error={!isValid}>{errors.order?.message || errors.payment?.message || errors.address?.message}</FormHelperText>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                message={`Order successfully created, order identifier ${orderId.current}`}
                />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleClose}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};