'use client'

import {useFormState, useFormStatus} from "react-dom"
import {createRecipe} from "@/app/resources/actions";
import {usePathname} from "next/navigation";

function NewButton(){
    const { pending } = useFormStatus()

    return(
        <div>
            <input type="submit" className="bg-green-500 disabled:bg-green-200 p-2 m-1" disabled={pending} />
        </div>
    )
}

export default function NewRecipeForm() {
    const [state, formAction] = useFormState(createRecipe, { path: usePathname() })
 return(
     <form action={formAction}>
        <label htmlFor="name">Recipe Name: </label>
         <input type="text" id="name" name="name" />
         <label htmlFor="duration">Duration in minutes: </label>
         <input type="number" id="duration" name="duration" />
         <NewButton />
     </form>
 )
}