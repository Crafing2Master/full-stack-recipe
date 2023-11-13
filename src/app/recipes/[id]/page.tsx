import db from "@/models/db";
import {ingredientSchema, recipeSchema} from "@/models/schema";
import {eq} from "drizzle-orm";
import DeleteRecipeForm from "@/components/DeleteRecipeForm";
import Link from "next/link";
import NewIngredientForm from "@/components/NewIngredientForm";
import DeleteIngredientForm from "@/components/DeleteIngredientForm";

export default async function Page({params}: { params: { id: string } }) {
    const byId = Number(params.id);
    console.log(byId);
    console.log(typeof byId);
    const data = await db.select({
        name: recipeSchema.name,
        duration: recipeSchema.duration
    }).from(recipeSchema)
        .where(eq(recipeSchema.id, byId))
    const ingredients = await db.select({
        id: ingredientSchema.id,
        name: ingredientSchema.name
    }).from(ingredientSchema)
        .where(eq(ingredientSchema.recipe_id, byId))
    const hours = Math.floor(data[0].duration as number / 60);
    const minutes = data[0].duration as number % 60;
    const formattedDuration = hours === 0 ? `${minutes} minutes` :`${hours} hours ${minutes} minutes`
    return(
        <div className="m-3 p-3 bg-green-200 rounded-xl shadow-xl transition-all duration-700 hover:shadow-2xl ">
            <div className="flex justify-between">
                <div>
                    <h1>{data[0].name}</h1>
                    <p>Takes: {formattedDuration}</p>
                </div>
                <NewIngredientForm id={byId} />
                <div>
                    <DeleteRecipeForm id={byId} />
                    <Link href={`/recipes/${byId}/edit`} className="bg-blue-500 p-2 m-2" >Edit</Link>
                </div>
            </div>
            <div>
                <ul>
                    {ingredients.map((item)=>(
                        <div key={item.id} className="flex">
                            <li>{item.name}</li>
                            <DeleteIngredientForm id={item.id} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}