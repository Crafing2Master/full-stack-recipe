import db from "@/models/db";
import {recipeSchema} from "@/models/schema";
import Card from "@/app/components/Card";
import Link from "next/link";
import DeleteRecipeForm from "@/app/components/DeleteRecipeForm";

export default async function Page() {
    const allRecipes = await db.select()
        .from(recipeSchema)

    return(
        <main className="flex justify-center">
            <div className="grid grid-cols-5">
                {allRecipes.map((item)=> (
                    <div key={item.id}>
                        <Link href={"/recipes/"+item.id} >
                            <Card data={item} />
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    )
}