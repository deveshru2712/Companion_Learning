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

export const getAllCompanion = async ({
  limit = 10,
  subject,
  topic,
  page = 1,
}: GetAllCompanions) => {
  const supabase = createSupaBaseClient();

  let query = supabase.from("Companions").select();
  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupaBaseClient();

  const { data, error } = await supabase
    .from("Companions")
    .select()
    .eq("id", id);

  if (error) {
    return console.log(error);
  }

  return data[0];
};
