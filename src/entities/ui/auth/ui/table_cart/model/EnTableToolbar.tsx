import { IconButton, Theme, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { checkPosition, setCartItems } from "../../../../../../app/store/data/cart_slice/cartSlice";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
interface EnhancedTableToolbarProps {
    selected: readonly number[]
    setSelected: Dispatch<SetStateAction<readonly number[]>>
  }
export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const {t} = useTranslation()
    const { selected, setSelected } = props;
    const numSelected = selected.length
    const cartData = useSelector(checkPosition)
    const dispatch = useDispatch()
    function handleDeleteItems() {
        const filteredItems = cartData.filter(item=> !selected.includes(item.price))
        dispatch(setCartItems({position: filteredItems}))
        setSelected([])
    }
    return (
        <Toolbar
            sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
                bgcolor: (theme: Theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
            }}
        >
        {numSelected > 0 ? (
            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                {t('main.cart.table_order.selected', {count: numSelected})}
            </Typography>
            ) : (
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {t('main.cart.table_order.title')}
            </Typography>
            )}
            {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton onClick={handleDeleteItems}>
                <DeleteIcon />
                </IconButton>
            </Tooltip>
            ) }
      </Toolbar>
    );
  }