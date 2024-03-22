import { Box, CircularProgress, Grid } from "@mui/material";
import {DocumentData, QueryDocumentSnapshot, collection, getDocs, limit, query, startAfter} from 'firebase/firestore'
import { db } from "../../../../../app/firebase";
import { useEffect, useRef, useState } from "react";
import { CardItem } from "../../../../../entities/ui/auth/ui/Card";

type listItems = {
    data: DocumentData;
    id: string;
}
export const MenuList = () => {
    const [listItems, setListItems] = useState<listItems[]>([])
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null);
    
    const boxRef = useRef<IntersectionObserver | undefined>()
    function getDishes() {
        const dishesCollection = collection(db, 'products');
        const q = query(dishesCollection, limit(10));
        getDocs(q).then((response) => {
            const items = response.docs.map(doc => ({ data: doc.data(), id: doc.id }));
            setListItems(items);
            const lastDoc1 = response.docs[response.docs.length - 1];
            console.log(lastDoc1);
            
            setLastDoc(lastDoc1);
        }).catch((error) => {
            console.log(error);
        });
    }
function loadNextPage(lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null) {
    console.log('call', lastDoc);
    if (!lastDoc) return;
    const dishesCollection = collection(db, 'products');
    const q = query(dishesCollection, startAfter(lastDoc), limit(10)); 
    getDocs(q).then((response) => {
        const items = response.docs.map(doc => ({ data: doc.data(), id: doc.id }));
        setListItems(prevItems => [...prevItems, ...items]); 
        const newLastDoc = response.docs[response.docs.length - 1];
        setLastDoc(newLastDoc); // Обновляем lastDoc с помощью нового значения
    }).catch((error) => {
        console.log(error);
    });
}
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    }

    
    useEffect(()=>{
        getDishes()
        const observer = new IntersectionObserver(() => loadNextPage(lastDoc), options)
        if (boxRef.current) {
            observer.observe(boxRef.current)
        }
        return ()=>{
            if (boxRef.current) observer.unobserve(boxRef.current)
        }
    },[])
    return (
        <Grid container gap={2} alignItems={'center'} justifyContent={'center'} marginTop={2}>
            {listItems.map(item => 
                <CardItem 
                    key={item.id} 
                    name={item.data.name} 
                    description={item.data.description} 
                    price={item.data.price}
                    img={item.data.img}/>)}
            <Box ref={boxRef} sx={{ maxWidth: {sm: 400, xs: 300}, width: '100%', display: listItems.length > 0 ? 'flex' : 'none'}} marginBottom={2} alignItems={'center'} justifyContent={'center'}>
                <CircularProgress />
            </Box>
            
        </Grid>
    );
};