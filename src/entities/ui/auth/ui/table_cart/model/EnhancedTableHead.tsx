import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    orderBy?: string;
    rowCount: number;
  }
  export const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props
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
                <TableCell>Position</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
            </TableRow>
        </TableHead>
    );
};