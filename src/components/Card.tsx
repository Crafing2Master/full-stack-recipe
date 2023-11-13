import {selectRecipeSchema} from "@/models/schema";
import * as z from "zod";

export default function Card({ data }: { data: z.infer<typeof selectRecipeSchema> }) {
    const hours = Math.floor(data.duration as number / 60);
    const minutes = data.duration as number % 60;
    const formattedDuration = hours === 0 ? `${minutes} minutes` :`${hours} hours ${minutes} minutes`
    return(
        <div className="m-3 p-3 bg-teal-200 rounded-xl shadow-xl transition-all duration-700 hover:shadow-2xl">
            <h1>{data.name}</h1>
            <p>Takes: {formattedDuration} </p>
        </div>
    )
}