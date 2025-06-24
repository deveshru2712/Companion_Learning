"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupaBaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupaBaseClient();

  console.log(author, formData);

  const { data, error } = await supabase
    .from("Companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    console.log(error);
    throw new Error(error?.message || "Failed to create a companion");
  }

  return data[0];
};
