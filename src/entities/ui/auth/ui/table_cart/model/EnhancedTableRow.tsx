import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { ICartItem } from "../../../../../../shared/types/item";
import { CounterItems } from "./CounterItems";
import { UseControlItemCount } from "../lib/UseControlItemCount";
interface IEnhancedTableRowProps {
    onCLick: (num: number)=>void
    checked: boolean
    card: ICartItem
    index: number
}

export const EnhancedTableRow:React.FC<IEnhancedTableRowProps> = ({onCLick, checked, card, index}) => {
    const cardNameSlice = card.name.slice(0, 25) + '...'
    const labelId = `enhanced-table-checkbox-${index}`;
    const {handleIncreaseItemCount, handleDecreaseItemCount } = UseControlItemCount(card)

    return (
        <TableRow>
            <TableCell>
                <Checkbox
                    onChange={() => onCLick(card.price)}
                    color="primary"
                    checked={checked}
                    inputProps={{
                    'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell>{cardNameSlice}</TableCell>
            <TableCell>
                <Box sx={{width: '150px'}} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                    <CounterItems 
                        count={card.count} 
                        handleIncreaseItemCount={handleIncreaseItemCount} 
                        handleDecreaseItemCount={handleDecreaseItemCount} />
                </Box>

            </TableCell>
            <TableCell>{card.price * card.count}$</TableCell>
        </TableRow>
    );
};