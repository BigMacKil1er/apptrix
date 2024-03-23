import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import { EnhancedTableToolbar } from "./model/EnTableToolbar";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { checkPosition } from "../../../../../app/store/data/cart_slice/cartSlice";
import { EnhancedTableHead } from "./model/EnhancedTableHead";
import { EnhancedTableRow } from "./model/EnhancedTableRow";
import { ControlForm } from "./model/ControlForm";

export const TableCart = () => {
    const [selected, setSelected] = useState<readonly number[]>([]);
    const isSelected = (id: number) => selected.indexOf(id) !== -1;
    const cartData = useSelector(checkPosition)
    
    const subtotal = useMemo(()=>{
        return cartData.map(( item ) => item.price * item.count).reduce((sum, i) => sum + i, 0);
      }, [cartData])

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelected = cartData.map((n) => n.price);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
      };

      const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
        setSelected(newSelected);
      };



    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%' }}>
                <EnhancedTableToolbar selected={selected} setSelected={setSelected} />
                <TableContainer>
                    <Table>
                        <EnhancedTableHead onSelectAllClick={handleSelectAllClick} numSelected={selected.length} rowCount={cartData.length} />
                        <TableBody>
                            {cartData.map((card, index)=> {
                                const isItemSelected = isSelected(card.price);
                                return (
                                    <EnhancedTableRow key={card.price} checked={isItemSelected} onCLick={handleClick} card={card} index={index} />
                                )
                            })}
                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align="right">{subtotal}$</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <ControlForm subtotal={subtotal} />
            </Paper>
        </Box>
    );
};