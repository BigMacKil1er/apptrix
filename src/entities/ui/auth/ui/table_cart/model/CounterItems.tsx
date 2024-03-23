import { Chip, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
interface ICounteritemsProps {
    count: number,
    handleIncreaseItemCount: ()=>void
    handleDecreaseItemCount: ()=>void
}
export const CounterItems:React.FC<ICounteritemsProps> = ({count, handleIncreaseItemCount, handleDecreaseItemCount}) => {
    return (
        <>
            <Chip label={count} color="primary" />
            <IconButton onClick={handleIncreaseItemCount}>
                <AddIcon />
            </IconButton>
            <IconButton onClick={handleDecreaseItemCount}>
                <RemoveIcon />
            </IconButton>
        </>
    );
};