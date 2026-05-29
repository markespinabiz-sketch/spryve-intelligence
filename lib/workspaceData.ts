import { supabase } from "@/lib/supabaseClient";

export async function loadWorkspaceProducts(workspaceId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createWorkspaceProduct(workspaceId: string, name: string) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      workspace_id: workspaceId,
      name,
      status: "Active",
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function loadWorkspaceReports(workspaceId: string) {
  const { data, error } = await supabase
    .from("daily_reports")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createMediaBuyerReport({
  workspaceId,
  productName,
  reportData,
  userId,
}: {
  workspaceId: string;
  productName: string;
  reportData: any;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("daily_reports")
    .insert({
      workspace_id: workspaceId,
      product_name: productName,
      report_type: "Media Buyer",
      role_type: "Media Buyer",
      report_data: reportData,
      created_by: userId,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function createDesignerReport({
  workspaceId,
  productName,
  reportData,
  userId,
}: {
  workspaceId: string;
  productName: string;
  reportData: any;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("daily_reports")
    .insert({
      workspace_id: workspaceId,
      product_name: productName,
      report_type: "Designer",
      role_type: "Designer",
      report_data: reportData,
      created_by: userId,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function loadWorkspaceTasks(workspaceId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createWorkspaceTask({
  workspaceId,
  productId,
  title,
  role,
  assigneeId,
  assignedToName,
  priority,
  status,
  taskData,
  userId,
}: {
  workspaceId: string;
  productId?: string | null;
  title: string;
  role: string;
  assigneeId?: string | null;
  assignedToName?: string;
  priority: string;
  status: string;
  taskData?: any;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      workspace_id: workspaceId,
      product_id: productId || null,
      title,
      role,
      assignee_id: assigneeId || null,
      assigned_to_name: assignedToName || "",
      priority,
      status,
      task_data: taskData || {},
      created_by: userId,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function updateWorkspaceTaskStatus(taskId: string, status: string) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
