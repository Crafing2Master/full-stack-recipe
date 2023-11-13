'use client'

import {useFormState, useFormStatus} from "react-dom"
import {deleteIngredient} from "@/app/resources/actions";
import {usePathname} from "next/navigation";

function DeleteButton(){
    const { pending } = useFormStatus()

    return(
        <div>
            <button type="submit" className="bg-rose-700 disabled:bg-rose-200 p-2 m-1" disabled={pending}  >
                Delete
            </button>
        </div>
    )
}

export default function DeleteIngredientForm({id}: {id:number}) {
    const [state, formAction] = useFormState(deleteIngredient, {message: ""})
    return(
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <DeleteButton />
        </form>
    )
}