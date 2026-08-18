import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { productType } from "./productTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType],
};
