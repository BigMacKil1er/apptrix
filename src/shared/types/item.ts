export interface ICardProps {
    name: string,
    description: string,
    price: number,
    img: string
}
export interface ICartItem extends ICardProps {
    count: number
}