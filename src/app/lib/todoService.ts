import { supabase } from "./supabaseClient";

// Fetch all todos
export async function fetchTodos() {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
  return data || [];
}

// Add a new todo
export async function addTodo(task: string, user_email:string) {
  const { data, error } = await supabase.from("todos").insert([
    { task, completed: false, user_email },
  ]);
  if (error) {
    console.error("Error adding todo:", error);
    return null;
  }
  return data;
}

// Update (mark completed)
export async function updateTodo(id: string, completed: boolean) {
  const { data, error } = await supabase
    .from("todos")
    .update({ completed })
    .eq("id", id);
  if (error) {
    console.error("Error updating todo:", error);
    return null;
  }
  return data;
}

// Delete a todo
export async function deleteTodo(id: string) {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    console.error("Error deleting todo:", error);
    return null;
  }
  return data;
}


// Sign up
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  
  if (error) throw error;
  return data;
}

// Sign in
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

