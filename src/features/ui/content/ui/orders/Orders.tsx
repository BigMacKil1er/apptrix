import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../../../../../app/firebase";
import { listItems } from "../../../../types";
import { useTranslation } from "react-i18next";
export const Orders = () => {
    const {t} = useTranslation()
    const [listItems, setListItems] = useState<listItems[]>([])
    const getItems = useCallback(()=>{
        const dishesCollection = collection(db, 'orders')
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(dishesCollection, where('author', '==', user.uid));
                getDocs(q).then((response) => {
                    const items = response.docs.map(doc => ({ data: doc.data(), id: doc.id }));
                    setListItems(items)
                }).catch((error) => {
                    console.log(error);
                });
            }
        })

    },[])
    
    const ids = listItems.map(item=>{
        return item.id
    })
    const orders = listItems.map(item=>{
        return item.data
    })
    useEffect(()=>{
        getItems()
    },[])
    return (
        <Box>
                <Toolbar>
                    <Typography>{t('main.cart.table_history.title')}</Typography>
                </Toolbar>
                <TableContainer component={Paper} sx={{maxWidth: '1000px'}}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>{t('main.cart.table_history.indentifier')}</TableCell>
                            <TableCell align="right">{t('main.cart.table_history.address')}</TableCell>
                            <TableCell align="right">{t('main.cart.table_history.status')}</TableCell>
                            <TableCell align="right">{t('main.cart.table_history.price')}</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orders.map((order, index) => (
                            <TableRow
                                key={ids[index]}>
                                <TableCell >{ids[index]}</TableCell>
                                <TableCell align="right">{order.address}</TableCell>
                                <TableCell align="right">Done</TableCell>
                                <TableCell align="right">{order.price}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Box>
    );
};