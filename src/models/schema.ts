import {pgTable, varchar, serial, integer} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";

const recipeSchema = pgTable("recipe", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length:255}),
    duration: integer("duration")
})

const ingredientSchema = pgTable("ingredents", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 255}),
    recipe_id: integer("recipe_id").references(() => recipeSchema.id)
})

const selectRecipeSchema = createSelectSchema(recipeSchema)
const selectIngredientSchema = createSelectSchema(ingredientSchema)
const insertRecipeSchema = createInsertSchema(recipeSchema)
const insertIngredientSchema = createInsertSchema(ingredientSchema)

export {recipeSchema,ingredientSchema,selectRecipeSchema,selectIngredientSchema,insertIngredientSchema,insertRecipeSchema}