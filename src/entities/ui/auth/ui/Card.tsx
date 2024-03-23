import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { memo} from "react";
import { ICardProps } from "../../../../shared/types/item";
import { useDispatch, useSelector } from "react-redux";
import { checkPosition, setCartItems } from "../../../../app/store/data/cart_slice/cartSlice";
import { CounterItems } from "./table_cart/model/CounterItems";
import { UseControlItemCount } from "./table_cart/lib/UseControlItemCount";
export const CardItem:React.FC<ICardProps> = memo((props) => {
    const dispatch = useDispatch()
    const cartData = useSelector(checkPosition)
    const {handleIncreaseItemCount, handleDecreaseItemCount, currentItem} = UseControlItemCount(props)
    function handleAddToCart() {
        const array = [...cartData]
        array.push({...props, count: 1})
        dispatch(setCartItems({position: array}))
    }

    return (
        <Box>
            <Card sx={{ maxWidth: {sm: 400, xs: 300} }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.img}
                    alt={props.name}
                />
                <CardHeader
                    title={props.name}
                    subheader={props.price + '$'}
                />
                <CardContent>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            Description
                        </AccordionSummary>
                        <AccordionDetails>
                            {props.description}
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
                <CardActions>
                    {!currentItem ? 
                        <Button size="small" onClick={handleAddToCart}>add to cart</Button> 
                        : 
                        <CounterItems count={currentItem?.count} handleIncreaseItemCount={handleIncreaseItemCount} handleDecreaseItemCount={handleDecreaseItemCount} />}
                </CardActions>
            </Card>
        </Box>
        
    );
})