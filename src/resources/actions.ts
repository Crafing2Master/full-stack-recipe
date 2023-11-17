'use server'

import db from "@/models/db";
import {ingredientSchema, insertRecipeSchema, recipeSchema} from "@/models/schema";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {eq} from "drizzle-orm";
import * as z from "zod"

export async function createRecipe(prevState: { path: string }, formData: FormData) {

    const data = insertRecipeSchema.omit({id:true}).parse({
        name: formData.get("name"),
        duration: parseInt(formData.get('duration') as string,10),
    })
    const insertedSelect = await db.insert(recipeSchema)
        .values({
            name: data.name,
            duration: data.duration
        }).returning({
            id: recipeSchema.id
        })
    revalidatePath("/recipes/new")
    redirect(`/recipes/${insertedSelect[0].id}`)
}

export async function deleteRecipe(prevState: any, formData: FormData) {
    const data = insertRecipeSchema.parse({
        id: parseInt(formData.get("id") as string,10)
    })
    const insertedSelect = await db.delete(recipeSchema)
        .where(eq(data.id, recipeSchema.id))
    revalidatePath("/recipes/"+data.id)
    redirect("/recipes")
}

export async function editRecipe(prevState: any, formData: FormData) {

    const data = insertRecipeSchema.parse({
        id: parseInt(formData.get('id') as string,10),
        name: formData.get("name"),
        duration: parseInt(formData.get('duration') as string,10)
    })
    await db.update(recipeSchema)
        .set({
            name: data.name,
            duration: data.duration
        }).where(eq(data.id,recipeSchema.id))
    revalidatePath("/recipes/new")
    redirect(`/recipes/${data.id}`)
}

export async function createIngredient(prevState: { path: string }, formData: FormData) {
    console.log(formData.get("ingredient")+ " rec_id")
        const data = insertRecipeSchema.omit({id:true}).extend({
        recipe_id: z.number()
    }).parse({
        name: formData.get("ingredient"),
        duration: Number(formData.get('duration')),
        recipe_id: Number(formData.get("recipe_id"))
    })
    const insertedSelect = await db.insert(ingredientSchema)
        .values({
            name: data.name,
            recipe_id: data.recipe_id
        }).returning({
            id: recipeSchema.id
        })
    revalidatePath(`/recipes/${insertedSelect[0].id}`)
}

export async function deleteIngredient(prevState: any, formData: FormData) {
    const data = insertRecipeSchema.parse({
        id: parseInt(formData.get("id") as string,10)
    })
    const insertedSelect = await db.delete(ingredientSchema)
        .where(eq(data.id, ingredientSchema.id))
    revalidatePath("/recipes/"+data.id)
}