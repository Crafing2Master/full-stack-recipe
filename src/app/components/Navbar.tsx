import Link from "next/link";

export default function Navbar() {
    return(
        <div className="bg-gradient-to-r from-teal-600 to-violet-800 p-3 m-3 rounded-xl flex gap-2">
            <Link href="/recipes" >All Recipes</Link>
            <Link href={"/recipes/new"}>New Recipe</Link>
        </div>
    )
}