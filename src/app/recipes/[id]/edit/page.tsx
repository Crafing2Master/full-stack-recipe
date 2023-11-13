import db from "@/models/db";
import {recipeSchema} from "@/models/schema";
import {eq} from "drizzle-orm";
import EditRecipeForm from "@/app/components/EditRecipeForm";

export default async function Page({params}: { params: { id: string } }) {
    const byId = Number(params.id);
    console.log(byId);
    console.log(typeof byId);
    const data = await db.select({
        id: recipeSchema.id,
        name: recipeSchema.name,
        duration: recipeSchema.duration
    }).from(recipeSchema)
        .where(eq(recipeSchema.id, byId))
    return(
        <div className="m-3 p-3 bg-green-200 rounded-xl shadow-xl transition-all duration-700 hover:shadow-2xl flex justify-between">
            <EditRecipeForm recipe={data[0]} />
        </div>
    )
}