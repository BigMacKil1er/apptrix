import { useDispatch, useSelector } from "react-redux";
import { checkPosition, setCartItems } from "../../../../../../app/store/data/cart_slice/cartSlice";
import { ICardProps } from "../../../../../../shared/types/item";

export const UseControlItemCount = (props: ICardProps) => {
    const dispatch = useDispatch()
    const cartData = useSelector(checkPosition)
    const index = cartData.findIndex(item => item.price === props.price);
    const currentItem = index !== -1 ? cartData[index] : null
    function handleIncreaseItemCount() {
        if (index !== -1 && cartData[index].count) {
            const newCartData = cartData.map((item, idx)=> {
                return idx === index ? {...item, count: item.count + 1} : item
            })
            dispatch(setCartItems({position: newCartData}))
        }
    }
    function handleDecreaseItemCount() {
        if (index !== -1 && cartData[index].count) {
            const newCartData = cartData.map((item, idx)=> {
                return idx === index ? {...item, count: item.count - 1} : item
            })
            if (newCartData[index].count === 0) {
                const cartDataFiltered = newCartData.filter(item => item.count !== 0)
                dispatch(setCartItems({position: cartDataFiltered}))
            } else {
                dispatch(setCartItems({position: newCartData}))
            }
            
        }
    }

    return {
        handleIncreaseItemCount,
        handleDecreaseItemCount,
        currentItem
    }
};