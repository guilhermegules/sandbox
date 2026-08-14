"use server";

export async function sayHello(formData: FormData) {
  const name = formData.get("name");
  return `Hello ${name}, from a Server Action!`;
}
