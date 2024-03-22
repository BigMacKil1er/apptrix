import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface ICardProps {
    name: string,
    description: string,
    price: number,
    img: string
}

export const CardItem:React.FC<ICardProps> = ({name, description, price, img}) => {
    return (
        <Box>
            <Card sx={{ maxWidth: {sm: 400, xs: 300} }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={name}
                />
                <CardHeader
                    title={name}
                    subheader={price + '$'}
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
                            {description}
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
                <CardActions>
                    <Button size="small">add to cart</Button>
                </CardActions>
            </Card>
        </Box>
        
    );
};