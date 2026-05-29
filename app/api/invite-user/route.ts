import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const { data: requesterData, error: requesterError } =
      await supabaseAdmin.auth.getUser(token);

    if (requesterError || !requesterData?.user) {
      return NextResponse.json({ success: false, error: "Invalid session." }, { status: 401 });
    }

    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    const role = body.role || "founder_partner";
    const workspaceId = body.workspaceId || null;
    const workspaceRole = body.workspaceRole || role;
    const hasFullAccess = Boolean(body.hasFullAccess);

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const { data: requesterProfile } = await supabaseAdmin
      .from("profiles")
      .select("global_role")
      .eq("id", requesterData.user.id)
      .single();

    let canInvite = requesterProfile?.global_role === "super_admin";

    if (workspaceId && !canInvite) {
      const { data: memberAccess } = await supabaseAdmin
        .from("workspace_members")
        .select("role, has_full_access")
        .eq("workspace_id", workspaceId)
        .eq("user_id", requesterData.user.id)
        .maybeSingle();

      canInvite =
        memberAccess?.role === "founder_partner" ||
        memberAccess?.has_full_access === true;
    }

    if (!canInvite) {
      return NextResponse.json(
        { success: false, error: "You do not have permission to invite users." },
        { status: 403 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${siteUrl}/auth/callback`,
      data: {
        global_role: role,
        workspace_id: workspaceId,
        workspace_role: workspaceRole,
        has_full_access: hasFullAccess,
        force_password_change: false,
      },
    });

    if (error) throw error;

    if (data?.user?.id) {
      await supabaseAdmin.from("profiles").upsert({
        id: data.user.id,
        email,
        global_role: role,
      });

      if (workspaceId) {
        await supabaseAdmin.from("workspace_members").upsert({
          workspace_id: workspaceId,
          user_id: data.user.id,
          role: workspaceRole,
          has_full_access: hasFullAccess,
        });
      }
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      message: "Invite email sent successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Invite failed." },
      { status: 500 }
    );
  }
}
