import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";
interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    orderBy?: string;
    rowCount: number;
  }
  export const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props
    const {t} = useTranslation()
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        onChange={onSelectAllClick}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                <TableCell>{t('main.cart.table_order.position')}</TableCell>
                <TableCell>{t('main.cart.table_order.quantity')}</TableCell>
                <TableCell>{t('main.cart.table_order.price')}</TableCell>
            </TableRow>
        </TableHead>
    );
};