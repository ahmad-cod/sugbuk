"use server"
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
// import { redirect } from "next/navigation";

type AuthFormData = {
  email: string;
  password: string;
};

export const signIn = async (formData: AuthFormData) => {
  const { email, password } = formData
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  // return redirect("/");
};

export const signUp = async (formData: AuthFormData) => {
  const { email, password } = formData;
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

 if (error) {
  return { status: "error", message: error.message };
}

return { status: "success", message: "Thanks for signing up!" };

};
