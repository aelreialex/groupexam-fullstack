import { type Menu, type Product } from "@app/shared"
import '../models/ingredient.model';
import ProductModel from "../models/product.model";


export const getMenu = async (): Promise<Menu> => {
    
        const result = await ProductModel.find({ onMenu:true }).select("-__v").populate({path: "ingredients extras condiments", select: "-__v"}).lean<Product[]>();
        result.sort((a, b) => a.sortOrder - b.sortOrder);
        const meals: Product[] = result.filter((m) => m.category === "meal")
        const drinks: Product[] = result.filter((d) => d.category === "drink")

        return {
            meals,
            drinks
        }
}