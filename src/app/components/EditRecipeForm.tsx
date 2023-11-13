'use client'

import {useFormState, useFormStatus} from "react-dom"
import {createRecipe, editRecipe} from "@/app/resources/actions";
import {usePathname} from "next/navigation";

function EditButton(){
    const { pending } = useFormStatus()

    return(
        <div>
            <input type="submit" className="bg-blue-500 disabled:bg-blue-200 p-2 m-1" disabled={pending} />
        </div>
    )
}

export default function EditRecipeForm({recipe}:{recipe: {name:string, duration:number, id: number}}) {
    const [state, formAction] = useFormState(editRecipe, { path: usePathname() })
    return(
        <form action={formAction}>
            <input type="hidden" name="id" value={recipe.id} />
            <label htmlFor="name">Recipe Name: </label>
            <input type="text" id="name" name="name" defaultValue={recipe.name} />
            <label htmlFor="duration">Duration in minutes: </label>
            <input type="number" id="duration" name="duration" defaultValue={recipe.duration} />
            <EditButton />
        </form>
    )
}