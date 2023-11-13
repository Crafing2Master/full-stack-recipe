'use client'

import {useFormState, useFormStatus} from "react-dom"
import {createIngredient} from "@/resources/actions";
import {usePathname} from "next/navigation";

function NewButton(){
    const { pending } = useFormStatus()

    return(
        <div>
            <input type="submit" className="bg-green-500 disabled:bg-green-200 p-2 m-1" disabled={pending} />
        </div>
    )
}

export default function NewIngredientForm({id}:{id:number}) {
    const [state, formAction] = useFormState(createIngredient, { path: usePathname() })
    return(
        <form action={formAction} className="flex">
            <input type="hidden" name="recipe_id" value={id} />
            <label htmlFor="ingredient">Add Ingredient: </label>
            <input type="text" id="ingredient" name="ingredient" placeholder="e.g. Cheese" className="h-[1.5rem]" />
            <NewButton />
        </form>
    )
}