export const data =   [
    {
      "strMeal": "Beef Lo Mein",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529444830.jpg",
      "idMeal": "52952"
    },
    {
      "strMeal": "Chicken Congee",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529446352.jpg",
      "idMeal": "52956"
    },
    {
      "strMeal": "Egg Drop Soup",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529446137.jpg",
      "idMeal": "52955"
    },
    {
      "strMeal": "General Tso's Chicken",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529444113.jpg",
      "idMeal": "52951"
    },
    {
      "strMeal": "Hot and Sour Soup",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529445893.jpg",
      "idMeal": "52954"
    },
    {
      "strMeal": "Kung Pao Chicken",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1525872624.jpg",
      "idMeal": "52945"
    },
    {
      "strMeal": "Kung Po Prawns",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1525873040.jpg",
      "idMeal": "52946"
    },
    {
      "strMeal": "Ma Po Tofu",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1525874812.jpg",
      "idMeal": "52947"
    },
    {
      "strMeal": "Shrimp Chow Fun",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529445434.jpg",
      "idMeal": "52953"
    },
    {
      "strMeal": "Sweet and Sour Pork",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529442316.jpg",
      "idMeal": "52949"
    },
    {
      "strMeal": "Szechuan Beef",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529443236.jpg",
      "idMeal": "52950"
    },
    {
      "strMeal": "Wontons",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1525876468.jpg",
      "idMeal": "52948"
    }
  ]
export const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat est ad id veritatis non saepe consequuntur animi neque corrupti iste. Reprehenderit id dolorum accusantium quisquam vitae alias amet quis neque.'

export class Dishes {
    name: string
    description: string
    price: number
    img: string
    constructor(name: string, description: string, price: number, img: string){
        this.name = name,
        this.description = description,
        this.price = price,
        this.img = img
    }
}

export const newData = data.map(item => new Dishes(item.strMeal, description, +item.idMeal, item.strMealThumb))

// const dishesConverter = {
//     toFirestore: (dishes) => {
//         return {
//             name: dishes.name,
//             description: dishes.description,
//             price: dishes.price,
//             img: dishes.img
//             };
//     },
//     fromFirestore: (snapshot, options) => {
//         const data = snapshot.data(options);
//         return new Dishes(data.name, data.description, data.price, data.img);
//     }
// };

// function setDishes() {
//     newData.forEach(async(item)=>{
//         try {
//             const ref = doc(db, 'products', item.name+item.price).withConverter(dishesConverter)
//             const response = await setDoc(ref, item)
//             console.log(response);
//         } catch (error) {
//             console.log(error);
//         }
//     })
// }