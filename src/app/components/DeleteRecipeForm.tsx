'use client'

import {useFormState, useFormStatus} from "react-dom"
import {deleteRecipe} from "@/app/resources/actions";
import {usePathname} from "next/navigation";

function DeleteButton(){
    const { pending } = useFormStatus()

    return(
        <div>
            <button type="submit" className="bg-red-500 disabled:bg-red-200 p-2 m-1" disabled={pending}  >
                Delete
            </button>
        </div>
    )
}

export default function DeleteRecipeForm({id}: {id:number}) {
    const [state, formAction] = useFormState(deleteRecipe, {message: ""})
    return(
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <DeleteButton />
        </form>
    )
}