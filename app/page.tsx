// @ts-nocheck
"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  Bell,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Database,
  ChevronDown,
  ChevronRight,
  Copy,
  LayoutDashboard,
  Lock,
  Menu,
  Moon,
  DollarSign,
  Eye,
  Image as ImageIcon,
  LineChart,
  MousePointerClick,
  ShieldCheck,
  Search,
  Settings,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  UserCircle2,
  Users,
  Wand2,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({ children, className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
    ghost: "bg-transparent hover:bg-slate-100",
  };
  return (
    <button className={cn(base, variants[variant] || variants.default, className)} {...props}>
      {children}
    </button>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100",
        className
      )}
      {...props}
    />
  );
}

function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold leading-none transition",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "", ...props }) {
  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white", className)} {...props}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "", ...props }) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

const TabsContext = createContext({ value: "", onValueChange: () => {} });

function Tabs({ value, onValueChange, children, className = "" }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function TabsTrigger({ value, children, className = "" }) {
  const context = useContext(TabsContext);
  const active = context.value === value;
  return (
    <button
      onClick={() => context.onValueChange(value)}
      data-state={active ? "active" : "inactive"}
      className={cn("px-3 py-2 text-sm font-semibold", className)}
      type="button"
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children, className = "" }) {
  const context = useContext(TabsContext);
  if (context.value !== value) return null;
  return <div className={className}>{children}</div>;
}

const defaultInputs = {
  workspace: "",
  project: "",
  product: "",
  angle: "",
  sellingPrice: 0,
  cogs: 0,
  shipping: 0,
  fulfillment: 0,
  packaging: 0,
  insurance: 0,
  vatRate: 0,
  opexRate: 0,
  codRate: 0,
  adSpend: 0,
  impressions: 0,
  clicks: 0,
  atc: 0,
  checkouts: 0,
  orders: 0,
  deliveredRate: 0,
  rtsRate: 0,
};

const formatPeso = (value) => {
  return "₱" + Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const formatPercent = (value) => {
  return Number(value || 0).toFixed(2) + "%";
};

function InputField({ label, value, onChange, type = "number" }) {
  const safeValue = value ?? (type === "number" ? 0 : "");

  return (
    <label className="space-y-1">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <Input
        type={type}
        value={safeValue}
        onChange={(e) => {
          if (type === "number") {
            onChange(e.target.value === "" ? 0 : Number(e.target.value));
          } else {
            onChange(e.target.value);
          }
        }}
        className="rounded-xl border-slate-200 bg-white"
      />
    </label>
  );
}

function StatCard({ icon: Icon, label, value, sub, tone = "blue" }) {
  const tones = {
    blue: "from-blue-50 to-cyan-50 border-blue-100 text-blue-700",
    green: "from-emerald-50 to-green-50 border-emerald-100 text-emerald-700",
    amber: "from-amber-50 to-orange-50 border-amber-100 text-amber-700",
    red: "from-rose-50 to-red-50 border-rose-100 text-rose-700",
    violet: "from-violet-50 to-indigo-50 border-violet-100 text-violet-700",
  };

  return (
    <Card className={"rounded-2xl border bg-gradient-to-br shadow-sm " + tones[tone]}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium opacity-70">{label}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
            {sub ? <p className="mt-1 text-xs opacity-75">{sub}</p> : null}
          </div>
          <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
            <Icon size={22} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionItem({ title, body, priority = "HIGH" }) {
  const colors = {
    HIGH: "bg-rose-50 text-rose-700 border-rose-100",
    MEDIUM: "bg-amber-50 text-amber-700 border-amber-100",
    LOW: "bg-slate-50 text-slate-600 border-slate-100",
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <Badge className={colors[priority] || colors.LOW}>{priority}</Badge>
      </div>
      <p className="text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function GeneratorButton({ id, label, active, onClick }) {
  const activeClass = "rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700";
  const inactiveClass = "rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700";

  return (
    <Button onClick={() => onClick(id)} variant={active ? "default" : "outline"} className={active ? activeClass : inactiveClass}>
      {label}
    </Button>
  );
}

function ScoreBar({ label, value, note }) {
  const score = Math.max(0, Math.min(10, Number(value || 0)));
  const width = score * 10;
  const tone = score >= 8 ? "bg-emerald-500" : score >= 6 ? "bg-blue-500" : score >= 4 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-900">{label}</p>
          {note ? <p className="text-xs text-slate-500">{note}</p> : null}
        </div>
        <span className="text-lg font-black text-slate-900">{score.toFixed(1)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={"h-full rounded-full " + tone} style={{ width: width + "%" }} />
      </div>
    </div>
  );
}

function AwarenessPill({ label, active }) {
  return (
    <div className={active ? "rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white" : "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500"}>
      {label}
    </div>
  );
}

const clampScore = (value) => Math.max(0, Math.min(10, value));

const dynamicGenerateAsset = ({ type, awareness, diagnosis, product, angle, rtsRate }) => {
  const fearMode = awareness.includes("Problem") || angle.toLowerCase().includes("takot") || angle.toLowerCase().includes("mabulag");
  const skepticalMode = rtsRate >= 30;

  const heroHeadline = fearMode
    ? `Akala mo simpleng sintomas lang?`
    : `Bakit maraming Pilipino ang naghahanap ng support para sa ${product}?`;

  const heroSub = skepticalMode
    ? `Build trust first. Emotional concern + believable support positioning ang kailangan ng buyers ngayon.`
    : `Designed for buyers looking for daily support and better confidence.`;

  const softCTA = skepticalMode
    ? "Alagaan Ang Paningin Habang Maaga Pa"
    : `Try ${product} Today`;

  const outputs = {
    hero: {
      title: "AI Generated Hero Section",
      type: "Dynamic LP Asset",
      content: [
        `Headline: ${heroHeadline}`,
        "",
        `Subheadline: ${heroSub}`,
        "",
        `CTA: ${softCTA}`,
        "",
        "Suggested Structure:",
        "• Emotional headline",
        "• Symptom-focused subheadline",
        "• Product image lower-right",
        "• Soft medical trust design",
        "",
        `Psychology Strategy: ${awareness} buyers need emotional interruption before selling.`
      ].join("\n"),
      imagePrompt: `Create a premium mobile-first ecommerce hero section for ${product}. Awareness level: ${awareness}. Diagnosis: ${diagnosis}. Emotional style based on angle: ${angle}. Use realistic Filipino buyers, premium SaaS-style healthcare design, deep blue and cyan palette, emotional but trustworthy visual tone, vertical 9:16 layout, clean conversion-focused spacing.`
    },

    pain: {
      title: "AI Generated Pain Section",
      type: "Dynamic Psychology Asset",
      content: [
        "Headline:",
        fearMode
          ? "Unti-unti mo bang napapansin na lumalabo na paningin mo?"
          : "Hindi lang simpleng eye discomfort ang epekto nito.",
        "",
        "Pain Points:",
        "• Hirap magbasa ng maliit na text",
        "• Madaling masilaw sa ilaw",
        "• Nahihilo habang gumagamit ng cellphone",
        "• Takot na baka lumala habang tumatagal",
        "",
        "Transition:",
        "Habang tumatagal, mas lalong naaapektuhan ang araw-araw na buhay kapag napapabayaan ang paningin.",
        "",
        "Suggested Layout:",
        "• Emotional headline",
        "• Pain bullets",
        "• Consequence statement",
        "• Transition to education section"
      ].join("\n"),
      imagePrompt: `Create a mobile-first pain section for ${product}. Show an emotional senior Filipino struggling to read text on a cellphone. Realistic home environment, emotional but clean ecommerce design, premium medical blue color palette, soft shadows, vertical 9:16 layout.`
    },

    education: {
      title: "AI Generated Education Section",
      type: "Mechanism Builder",
      content: [
        "Headline:",
        "Hindi lahat ng panlalabo ay simpleng pagod lang.",
        "",
        "Educational Copy:",
        "Habang tumatanda, maaaring maapektuhan ang comfort at moisture support ng mata. Dahil dito, mas madaling makaranas ng eye discomfort, panlalabo, at sensitivity.",
        "",
        "Section Goal:",
        "Build belief before introducing the product.",
        "",
        "Suggested Layout:",
        "• Problem explanation",
        "• Simple mechanism graphic",
        "• Transition into support solution",
        "• Trust-focused visual spacing"
      ].join("\n"),
      imagePrompt: `Create an educational healthcare landing page section for ${product}. Show eye comfort explanation visuals, clean infographic style, premium healthcare ecommerce design, blue and cyan palette, realistic but simple educational layout.`
    },

    trust: {
      title: "AI Generated Trust Section",
      type: "Trust Builder",
      content: [
        "Headline:",
        "Marami nang Pilipino ang nagsisimulang mag-alaga ng kanilang paningin habang maaga pa.",
        "",
        "Trust Elements:",
        "• Filipino testimonials",
        "• COD reassurance",
        "• Delivery proof",
        "• Local support messaging",
        "• Senior-friendly positioning",
        "",
        "Suggested Structure:",
        "• 3 testimonial cards",
        "• Before/after emotional story",
        "• COD badges",
        "• Support reassurance section"
      ].join("\n"),
      imagePrompt: `Create a testimonial and trust-building section for ${product}. Include Filipino testimonial cards, COD icons, delivery proof, healthcare trust design, emotional but clean ecommerce layout, vertical mobile-first design.`
    },

    offer: {
      title: "AI Generated Offer Stack",
      type: "Offer Psychology",
      content: [
        "Headline:",
        "Alagaan ang paningin habang maaga pa.",
        "",
        "Offer Stack:",
        "• Buy 1 — ₱499",
        "• Buy 2 — ₱699 FREE SHIPPING",
        "• Buy 4 — ₱999 BEST VALUE",
        "",
        "Trust Layer:",
        "✔ COD Available",
        "✔ Nationwide Shipping",
        "✔ Local Customer Support",
        "",
        "Suggested Layout:",
        "• Pricing cards",
        "• Highlight best seller package",
        "• Large CTA button",
        "• COD reassurance below CTA"
      ].join("\n"),
      imagePrompt: `Create a premium ecommerce offer section for ${product}. Mobile-first pricing cards, highlighted best seller package, deep blue and cyan healthcare palette, COD reassurance, clean modern ecommerce UI.`
    },

    cta: {
      title: "AI Generated Final CTA Section",
      type: "Closing Psychology",
      content: [
        "Headline:",
        "Habang maaga pa, alagaan mo na ang iyong paningin.",
        "",
        "Closing Copy:",
        "Huwag hintayin na mas lalong mahirapan bago kumilos. Simulan ang daily eye support habang maaga pa.",
        "",
        "CTA:",
        "ORDER NOW — COD AVAILABLE",
        "",
        "Trust Reinforcement:",
        "✔ COD",
        "✔ Nationwide Delivery",
        "✔ Senior-Friendly Support"
      ].join("\n"),
      imagePrompt: `Create a final CTA ecommerce section for ${product}. Emotional senior-focused healthcare design, strong CTA button, premium blue healthcare palette, emotional trust-building ending section, mobile-first vertical layout.`
    }
  };

  return outputs[type] || outputs.hero;
};

const generatedAssets = {
  hero: {
    title: "Generated Hero Section",
    type: "LP Asset",
    content: [
      "Headline: Akala mo simpleng panlalabo lang... pero paano kung lumalala na pala?",
      "",
      "Subheadline: Suportahan ang iyong paningin habang maaga pa. ClearSight+ Drops is made for Filipinos na hirap sa malabong paningin, silaw, at eye discomfort.",
      "",
      "CTA: Alagaan Ang Paningin Ngayon - COD Available",
      "",
      "Visual: Emotional senior Filipino holding reading glasses, product bottle near lower-right, clean blue medical background."
    ].join("\n"),
    imagePrompt:
      "Create a mobile-first landing page hero section for ClearSight+ Drops using the attached product image as the exact product. Brand colors: deep medical blue, sky blue, white, soft cyan accents. Layout: premium healthcare ecommerce design, 9:16 vertical mobile section. Main visual: emotional senior Filipino woman around 58-65 years old, natural skin texture, wearing reading glasses, worried while reading a phone because of blurry vision. Product bottle placed clearly in the lower-right area with clean glow, not distorted. Headline text: Akala mo simpleng panlalabo lang? Subheadline: Alagaan ang paningin habang maaga pa. CTA button: ORDER NOW - COD AVAILABLE. Style: clean, trustworthy, senior-friendly, large readable sans-serif text, soft shadows, rounded cards, realistic but polished, not cluttered."
  },
  hooks: {
    title: "Generated Ad Hooks",
    type: "Copy Asset",
    content: [
      "1. Takot ka bang dumating yung araw na hindi mo na mabasa ang text ng anak mo?",
      "2. Akala ni Nanay normal lang ang panlalabo... hanggang halos hindi na siya makabasa.",
      "3. Bago mo isipin ang mahal na operation, alagaan muna ang mata habang maaga pa.",
      "4. Para sa mga senior na ayaw maging pabigat dahil sa paningin."
    ].join("\n")
  },
  faq: {
    title: "AI Generated FAQ Section",
    type: "Objection Handling Engine",
    content: [
      "Headline:",
      "Mga Madalas Itanong",
      "",
      "Q: Safe ba ito sa senior?",
      "A: ClearSight+ Drops is positioned as daily eye support. Para sa may serious eye condition, always consult a professional.",
      "",
      "Q: COD ba?",
      "A: Yes, available ang Cash on Delivery para mas kampante ka bago magbayad.",
      "",
      "Q: Kailan dapat gamitin?",
      "A: Best gamitin consistently as part of daily eye care support.",
      "",
      "Q: Pwede ba ito sa malabong paningin?",
      "A: Designed as daily eye comfort and support positioning.",
      "",
      "Suggested Structure:",
      "• Accordion FAQ layout",
      "• Senior-friendly font size",
      "• FAQ before final CTA",
      "• Soft reassurance tone"
    ].join("\n"),
    imagePrompt: "Create a mobile-first FAQ section for ClearSight+ Drops. Premium healthcare ecommerce design, accordion style FAQ cards, deep blue and cyan palette, clean and senior-friendly spacing, trustworthy ecommerce layout."
  },
  ugc: {
    title: "Generated UGC Script",
    type: "Video Asset",
    content: [
      "Scene 1: Nanay squinting while reading phone. Akala ko normal lang na lumalabo mata ko...",
      "Scene 2: Close-up worried face. Pero natakot ako nung nahirapan na akong magbasa.",
      "Scene 3: Product shot. Kaya sinubukan ko ang ClearSight+ as daily eye support.",
      "Scene 4: Soft CTA. Habang maaga pa, alagaan mo na paningin mo."
    ].join("\n")
  }
};

export default function MarkuzConversionIntelligenceV2() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [authProfile, setAuthProfile] = useState(null);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [currentWorkspaceMembership, setCurrentWorkspaceMembership] = useState(null);
  const [needsWorkspaceSetup, setNeedsWorkspaceSetup] = useState(false);
  const [setupWorkspaceName, setSetupWorkspaceName] = useState("");
  const [setupSaving, setSetupSaving] = useState(false);
  const [setupError, setSetupError] = useState("");
  const [inputs, setInputs] = useState(defaultInputs);
  const [generated, setGenerated] = useState("hero");
  const [copied, setCopied] = useState(false);
  const [copiedAsset, setCopiedAsset] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedLibrary, setGeneratedLibrary] = useState([]);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [imageGenerating, setImageGenerating] = useState(false);
  const [imageGenerationMessage, setImageGenerationMessage] = useState("API route not connected yet. Current mode prepares the request and saves the image job.");
  const [referenceImage, setReferenceImage] = useState(null);
  const [layoutReferenceImage, setLayoutReferenceImage] = useState(null);
  const [showManualCopy, setShowManualCopy] = useState(false);
  const [fullLPOutput, setFullLPOutput] = useState("");
  const [imageStyleMode, setImageStyleMode] = useState("Premium Medical");
  const [variationMode, setVariationMode] = useState("Fear Based");
  const [savedTests, setSavedTests] = useState([]);
  const [workspaceMembers, setWorkspaceMembers] = useState([]);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [inviteHasFullAccess, setInviteHasFullAccess] = useState(false);
  const [memberInviteLoading, setMemberInviteLoading] = useState(false);
  const [memberInviteMessage, setMemberInviteMessage] = useState("");
  const [superInviteEmail, setSuperInviteEmail] = useState("");
  const [superInviteRole, setSuperInviteRole] = useState("founder_partner");
  const [superInviteLoading, setSuperInviteLoading] = useState(false);
  const [superInviteMessage, setSuperInviteMessage] = useState("");
  const [superInviteTempPassword, setSuperInviteTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState("");
  const [pendingInvites, setPendingInvites] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Media Buyer");
  const [projectNotes, setProjectNotes] = useState([]);
  const [performanceAlerts, setPerformanceAlerts] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState("");
  const [adTestDraft, setAdTestDraft] = useState({
    campaignName: "",
    adsetName: "",
    creativeName: "",
    audience: "Broad PH 35+",
    creativeFormat: "Static Image",
    hook: "",
    landingPage: "Main WebCake LP",
    offer: "Buy 2 Get 2",
  });
  const [dashboardRange, setDashboardRange] = useState("Today");
  const [leaderboardFilter, setLeaderboardFilter] = useState("All");

  const [activityLogs, setActivityLogs] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [teamTasks, setTeamTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskRole, setNewTaskRole] = useState("Media Buyer");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("HIGH");
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [taskProductFilter, setTaskProductFilter] = useState("All");
  const [currentUser, setCurrentUser] = useState("Mark");
  const [taskViewMode, setTaskViewMode] = useState("All Tasks");
  const [exportText, setExportText] = useState("");
  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [campaignNameInput, setCampaignNameInput] = useState("");
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [reportProduct, setReportProduct] = useState("");
  const [dailyReports, setDailyReports] = useState([]);
  const [mediaBuyerReport, setMediaBuyerReport] = useState({ spend: 0, ctr: 0, cpc: 0, cpp: 0, roas: 0, winningAngle: "", action: "", notes: "" });
  const [reportExportText, setReportExportText] = useState("");
  const [designerReport, setDesignerReport] = useState({ creativeType: "", angle: "", versions: 0, status: "", assetLink: "", notes: "" });
  const [productAssets, setProductAssets] = useState([]);
  const [assetTitle, setAssetTitle] = useState("");
  const [assetType, setAssetType] = useState("Creative");
  const [assetLink, setAssetLink] = useState("");
  const [assetStatus, setAssetStatus] = useState("For Review");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("diagnosis");
  const [collapsedSections, setCollapsedSections] = useState({
    "Command Center": false,
    "Performance Lab": false,
    "Workspace": false,
  });
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user || null;

      if (!sessionUser) {
        router.replace("/login");
        return;
      }

      setAuthUser(sessionUser);
      setAuthLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user || null;
      setAuthUser(sessionUser);
      setAuthLoading(false);
      if (!sessionUser) router.replace("/login");
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const completePasswordChange = async () => {
    setPasswordUpdateError("");

    if (!newPassword || newPassword.length < 8) {
      setPasswordUpdateError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordUpdateError("Passwords do not match.");
      return;
    }

    setPasswordUpdateLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
        data: { force_password_change: false },
      });

      if (error) throw error;

      const { data } = await supabase.auth.getUser();
      setAuthUser(data?.user || authUser);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setPasswordUpdateError(error?.message || "Unable to update password.");
    } finally {
      setPasswordUpdateLoading(false);
    }
  };

  useEffect(() => {
    if (!authUser?.id) return;

    const loadUserWorkspace = async () => {
      setWorkspaceLoading(true);
      setSetupError("");

      try {
        const { data: existingProfile, error: profileLoadError } = await supabase
          .from("profiles")
          .select("id, email, full_name, global_role")
          .eq("id", authUser.id)
          .maybeSingle();

        if (profileLoadError) throw profileLoadError;

        if (!existingProfile) {
          const { data: createdProfile, error: profileInsertError } = await supabase
            .from("profiles")
            .insert({
              id: authUser.id,
              email: authUser.email || "",
              global_role: authUser.user_metadata?.global_role || "founder_partner",
            })
            .select("id, email, full_name, global_role")
            .single();

          if (profileInsertError) throw profileInsertError;
          setAuthProfile(createdProfile);
        } else {
          setAuthProfile(existingProfile);
        }

        const invitedWorkspaceId = authUser.user_metadata?.workspace_id;
        const invitedWorkspaceRole = authUser.user_metadata?.workspace_role || authUser.user_metadata?.global_role;
        const invitedFullAccess = Boolean(authUser.user_metadata?.has_full_access);

        if (invitedWorkspaceId && invitedWorkspaceRole) {
          await supabase.from("workspace_members").upsert({
            workspace_id: invitedWorkspaceId,
            user_id: authUser.id,
            role: invitedWorkspaceRole,
            has_full_access: invitedFullAccess,
          });
        }

        const { data: memberships, error: memberError } = await supabase
          .from("workspace_members")
          .select("workspace_id, role, has_full_access")
          .eq("user_id", authUser.id);

        if (memberError) throw memberError;

        const workspaceIds = (memberships || []).map((item) => item.workspace_id).filter(Boolean);
        let foundWorkspaces = [];

        if (workspaceIds.length > 0) {
          const { data: workspaceData, error: workspaceError } = await supabase
            .from("workspaces")
            .select("id, name, owner_id")
            .in("id", workspaceIds);

          if (workspaceError) throw workspaceError;
          foundWorkspaces = workspaceData || [];
        }

        if (foundWorkspaces.length === 0) {
          const { data: ownedWorkspaces, error: ownedError } = await supabase
            .from("workspaces")
            .select("id, name, owner_id")
            .eq("owner_id", authUser.id);

          if (ownedError) throw ownedError;
          foundWorkspaces = ownedWorkspaces || [];
        }

        setUserWorkspaces(foundWorkspaces);

        const firstMembership = (memberships || [])[0] || null;
        setCurrentWorkspaceMembership(firstMembership);

        if (foundWorkspaces.length === 0) {
          setNeedsWorkspaceSetup(true);
          setActiveWorkspace(null);
        } else {
          const firstWorkspace = foundWorkspaces[0];
          setActiveWorkspace(firstWorkspace);
          setNeedsWorkspaceSetup(false);
          setInputs((previous) => ({ ...previous, workspace: firstWorkspace.name }));
          setReportProduct((previous) => previous || inputs.product);
        }
      } catch (error) {
        console.error("Workspace load failed", error);
        setSetupError(error?.message || "Unable to load workspace access.");
      } finally {
        setWorkspaceLoading(false);
      }
    };

    loadUserWorkspace();
  }, [authUser?.id]);

  const createFounderWorkspace = async () => {
    const cleanName = setupWorkspaceName.trim();
    if (!cleanName) {
      setSetupError("Workspace name is required.");
      return;
    }

    setSetupSaving(true);
    setSetupError("");

    try {
      const { data: workspace, error: workspaceError } = await supabase
        .from("workspaces")
        .insert({ name: cleanName, owner_id: authUser.id })
        .select("id, name, owner_id")
        .single();

      if (workspaceError) throw workspaceError;

      const { error: memberError } = await supabase
        .from("workspace_members")
        .insert({
          workspace_id: workspace.id,
          user_id: authUser.id,
          role: "founder_partner",
          has_full_access: true,
        });

      if (memberError) throw memberError;

      setActiveWorkspace(workspace);
      setCurrentWorkspaceMembership({ workspace_id: workspace.id, role: "founder_partner", has_full_access: true });
      setUserWorkspaces([workspace]);
      setNeedsWorkspaceSetup(false);
      setInputs((previous) => ({ ...previous, workspace: workspace.name, project: "First Product Campaign" }));
      setActivityLogs([]);
      setSavedTests([]);
      setDailyReports([]);
      setTeamTasks([]);
      setProductAssets([]);
    } catch (error) {
      console.error("Workspace setup failed", error);
      setSetupError(error?.message || "Unable to create workspace.");
    } finally {
      setSetupSaving(false);
    }
  };

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("spryve-intelligence-state-v3");
      if (!saved) {
        setStorageReady(true);
        return;
      }

      const parsed = JSON.parse(saved);
      if (parsed.inputs) setInputs({ ...defaultInputs, ...parsed.inputs });
      if (Array.isArray(parsed.savedTests)) setSavedTests(parsed.savedTests);
      if (Array.isArray(parsed.savedCampaigns)) setSavedCampaigns(parsed.savedCampaigns);
      if (Array.isArray(parsed.products)) setProducts(parsed.products);
      if (Array.isArray(parsed.dailyReports)) setDailyReports(parsed.dailyReports);
      if (Array.isArray(parsed.teamTasks)) setTeamTasks(parsed.teamTasks);
      if (Array.isArray(parsed.productAssets)) setProductAssets(parsed.productAssets);
      if (Array.isArray(parsed.projectNotes)) setProjectNotes(parsed.projectNotes);
      if (Array.isArray(parsed.activityLogs)) setActivityLogs(parsed.activityLogs);
      if (Array.isArray(parsed.workspaceMembers)) setWorkspaceMembers(parsed.workspaceMembers);
      if (Array.isArray(parsed.generatedLibrary)) setGeneratedLibrary(parsed.generatedLibrary);
      if (Array.isArray(parsed.generatedImages)) setGeneratedImages(parsed.generatedImages);
      if (parsed.adTestDraft) setAdTestDraft({ ...adTestDraft, ...parsed.adTestDraft });
      if (parsed.reportProduct) setReportProduct(parsed.reportProduct);
      if (parsed.lastSavedAt) setLastSavedAt(parsed.lastSavedAt);
      setStorageReady(true);
    } catch (error) {
      console.error("Failed to load Spryve Intelligence local state", error);
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      const snapshot = {
        inputs,
        savedTests,
        savedCampaigns,
        products,
        dailyReports,
        teamTasks,
        productAssets,
        projectNotes,
        activityLogs,
        workspaceMembers,
        generatedLibrary,
        generatedImages,
        adTestDraft,
        reportProduct,
        lastSavedAt,
      };
      window.localStorage.setItem("spryve-intelligence-state-v3", JSON.stringify(snapshot));
    } catch (error) {
      console.error("Failed to save Spryve Intelligence local state", error);
    }
  }, [storageReady, inputs, savedTests, savedCampaigns, products, dailyReports, teamTasks, productAssets, projectNotes, activityLogs, workspaceMembers, generatedLibrary, generatedImages, adTestDraft, reportProduct, lastSavedAt]);

  const currentUserProfile = workspaceMembers.find((member) => member.name === currentUser) || workspaceMembers[0];
  const systemRole = currentWorkspaceMembership?.role || authProfile?.global_role || authUser?.user_metadata?.workspace_role || authUser?.user_metadata?.global_role || "viewer";
  const hasFullWorkspaceAccess = Boolean(currentWorkspaceMembership?.has_full_access || authProfile?.global_role === "super_admin");
  const currentUserRole = systemRole === "founder_partner" ? "Owner" : systemRole === "graphic_artist" ? "Designer" : systemRole === "marketer" ? "Media Buyer" : currentUserProfile?.role || "Viewer";
  const isWorkspaceOwner = systemRole === "founder_partner" || authProfile?.global_role === "super_admin";

  const tabPermissions = {
    diagnosis: ["founder_partner"],
    plan: ["founder_partner", "marketer"],
    test: ["founder_partner", "marketer"],
    learning: ["founder_partner", "marketer"],
    flow: ["founder_partner", "marketer", "graphic_artist"],
    variation: ["founder_partner", "marketer", "graphic_artist"],
    profitability: ["founder_partner"],
    team: ["founder_partner"],
    campaigns: ["founder_partner", "marketer"],
    dailyops: ["founder_partner", "marketer", "graphic_artist"],
    tasks: ["founder_partner", "marketer", "graphic_artist"],
    workspace: ["founder_partner", "marketer", "graphic_artist"],
    cloud: ["founder_partner"],
    helpcenter: ["founder_partner", "marketer", "graphic_artist"],
  };

  const canAccessTab = (tabValue) => {
    if (hasFullWorkspaceAccess || isWorkspaceOwner) return true;
    return (tabPermissions[tabValue] || []).includes(systemRole);
  };

  const hasAccess = (allowedTabsOrRoles) => {
    if (!allowedTabsOrRoles || allowedTabsOrRoles.includes("All")) return true;
    if (hasFullWorkspaceAccess || isWorkspaceOwner) return true;
    if (allowedTabsOrRoles.includes(systemRole)) return true;
    return allowedTabsOrRoles.includes(currentUserRole);
  };

  const sidebarSections = [
    {
      section: "Command Center",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, hint: "KPIs + diagnosis", value: "diagnosis", roles: ["founder_partner"] },
        { label: "AI Strategist", icon: BrainCircuit, hint: "Decision engine", value: "plan", roles: ["founder_partner", "marketer"] },
        { label: "Scaling Center", icon: TrendingUp, hint: "Scale signals", value: "test", roles: ["founder_partner", "marketer"] },
      ],
    },
    {
      section: "Performance Lab",
      items: [
        { label: "Ads Testing Lab", icon: Target, hint: "Test data + checkpoints", value: "learning", roles: ["founder_partner", "marketer"] },
        { label: "Landing Page Analyzer", icon: MousePointerClick, hint: "LP conversion fixes", value: "flow", roles: ["founder_partner", "marketer", "graphic_artist"] },
        { label: "Creative Intelligence", icon: Sparkles, hint: "Angles + fatigue", value: "variation", roles: ["founder_partner", "marketer", "graphic_artist"] },
        { label: "Profitability Engine", icon: DollarSign, hint: "CPP + ROAS safety", value: "profitability", roles: ["founder_partner"] },
      ],
    },
    {
      section: "Workspace",
      items: [
        { label: "Reporting Center", icon: LineChart, hint: "Daily marketing reports", value: "dailyops", roles: ["founder_partner", "marketer", "graphic_artist"] },
        { label: "Tasks", icon: CheckCircle2, hint: "Execution board", value: "tasks", roles: ["founder_partner", "marketer", "graphic_artist"] },
        { label: "Products", icon: Target, hint: "Product memory", value: "workspace", roles: ["founder_partner", "marketer", "graphic_artist"] },
        { label: "Marketing Team", icon: Users, hint: "Members + roles", value: "team", roles: ["founder_partner"] },
        { label: "Campaign Memory", icon: Database, hint: "Saved snapshots", value: "campaigns", roles: ["founder_partner", "marketer"] },
        { label: "System Setup", icon: Cloud, hint: "Cloud database plan", value: "cloud", roles: ["founder_partner"] },
        { label: "Help Center", icon: ShieldCheck, hint: "SOPs + user guides", value: "helpcenter", roles: ["founder_partner", "marketer", "graphic_artist"] },
      ],
    },
  ];

  const visibleSidebarSections = sidebarSections
    .map((section) => ({ ...section, items: section.items.filter((item) => hasAccess(item.roles) && canAccessTab(item.value)) }))
    .filter((section) => section.items.length > 0);

  useEffect(() => {
    if (!authUser?.id || workspaceLoading) return;
    if (canAccessTab(activeMainTab)) return;

    const firstAllowedTab = sidebarSections
      .flatMap((section) => section.items)
      .find((item) => hasAccess(item.roles) && canAccessTab(item.value))?.value;

    if (firstAllowedTab) setActiveMainTab(firstAllowedTab);
  }, [authUser?.id, workspaceLoading, activeMainTab, systemRole, hasFullWorkspaceAccess]);

  const showTestInputPanel = ["plan", "test", "flow", "variation", "learning", "profitability"].includes(activeMainTab);
  const activeScope = [inputs.workspace, reportProduct || inputs.project].filter(Boolean).join(" / ");
  const activeProductReports = dailyReports.filter((report) => report.workspace === inputs.workspace && report.product === reportProduct);
  const activeProductAssets = productAssets.filter((asset) => asset.workspace === inputs.workspace && asset.product === reportProduct);
  const activeWorkspaceMembers = workspaceMembers.filter((member) => member.workspace === inputs.workspace);
  const activeProjectTasks = teamTasks.filter((task) => task.workspace === inputs.workspace && task.project === inputs.project);
  const activeWorkspaceTasks = teamTasks.filter((task) => task.workspace === inputs.workspace);
  const filteredTaskBoardTasks = activeWorkspaceTasks.filter((task) => {
    const productMatch = taskProductFilter === "All" || task.project === taskProductFilter;
    const userMatch = taskViewMode === "All Tasks" || task.assignee === currentUser;
    return productMatch && userMatch;
  });
  const myTasks = activeWorkspaceTasks.filter((task) => task.assignee === currentUser);
  const activeProjectNotes = projectNotes.filter((note) => note.workspace === inputs.workspace && note.project === inputs.project);
  const copyBoxRef = useRef(null);
  const metrics = useMemo(() => {
    const ctr = inputs.impressions ? (inputs.clicks / inputs.impressions) * 100 : 0;
    const cvr = inputs.clicks ? (inputs.orders / inputs.clicks) * 100 : 0;
    const atcRate = inputs.clicks ? (Number(inputs.atc || 0) / inputs.clicks) * 100 : 0;
    const checkoutRate = inputs.clicks ? (Number(inputs.checkouts || 0) / inputs.clicks) * 100 : 0;
    const noAtcMode = Number(inputs.atc || 0) === 0 && Number(inputs.checkouts || 0) === 0;
    const revenue = inputs.orders * inputs.sellingPrice;
    const roas = inputs.adSpend ? revenue / inputs.adSpend : 0;
    const deliveredOrders = inputs.orders * (inputs.deliveredRate / 100);
    const codFee = inputs.sellingPrice * (inputs.codRate / 100);
    const vatFee = inputs.sellingPrice * (Number(inputs.vatRate || 0) / 100);
    const opexFee = inputs.sellingPrice * (Number(inputs.opexRate || 0) / 100);
    const fixedCosts = inputs.cogs + inputs.shipping + inputs.fulfillment + Number(inputs.packaging || 0) + Number(inputs.insurance || 0);
    const totalCostPerOrder = fixedCosts + codFee + vatFee + opexFee;
    const grossPerOrder = inputs.sellingPrice - totalCostPerOrder;
    const projectedProfit = deliveredOrders * grossPerOrder - inputs.adSpend;
    const profitPerDeliveredOrder = grossPerOrder - (inputs.orders ? inputs.adSpend / Math.max(deliveredOrders, 1) : 0);
    const netMargin = inputs.sellingPrice ? (grossPerOrder / inputs.sellingPrice) * 100 : 0;
    const breakEvenCPP = grossPerOrder * (inputs.deliveredRate / 100);
    const safeCPP = breakEvenCPP * 0.8;
    const maxScaleCPP = breakEvenCPP * 0.9;
    const currentCPP = inputs.orders ? inputs.adSpend / inputs.orders : 0;
    const beRoas = inputs.sellingPrice / Math.max(breakEvenCPP, 1);

    return { ctr, cvr, atcRate, checkoutRate, noAtcMode, revenue, roas, deliveredOrders, codFee, vatFee, opexFee, fixedCosts, totalCostPerOrder, grossPerOrder, profitPerDeliveredOrder, netMargin, projectedProfit, breakEvenCPP, safeCPP, maxScaleCPP, currentCPP, beRoas };
  }, [inputs]);

  const diagnosis = useMemo(() => {
    if (metrics.noAtcMode && metrics.ctr >= 2.5 && metrics.cvr < 3) {
      return {
        status: "No-ATC Mode: High Click Interest, Weak Conversion",
        area: "Landing Page + Offer + Order Form Visibility",
        insight: "Malakas ang click interest pero walang ATC/Checkout tracking. Gamitin ang orders-based CVR, trust flow, and offer clarity para mag diagnose.",
        priority: "Audit LP trust, offer stack, and order form friction before changing creative.",
      };
    }

    if (metrics.ctr >= 2.5 && metrics.cvr < 3) {
      return {
        status: "High Click Interest, Weak Conversion",
        area: "Landing Page + Trust Progression",
        insight: "Malakas ang hook ng ad, pero hindi pa sapat ang belief-building bago bumili. Buyer is curious, pero skeptical pa.",
        priority: "Fix LP trust flow before changing the winning creative.",
      };
    }

    if (metrics.ctr < 1.5) {
      return {
        status: "Weak Attention / Hook Problem",
        area: "Ad Creative + Buyer Psychology Angle",
        insight: "Hindi sapat ang emotional interruption. Kailangan ng stronger fear, hope, curiosity, or identity hook.",
        priority: "Create 3 new hooks before touching the landing page.",
      };
    }

    if (metrics.roas < metrics.beRoas) {
      return {
        status: "Profitability Risk",
        area: "Offer + CPP + RTS Control",
        insight: "May sales pero hindi pa safe i-scale. Kailangan taasan perceived value or bawasan cost per purchase / RTS.",
        priority: "Improve offer stack and buyer qualification.",
      };
    }

    return {
      status: "Promising Test",
      area: "Controlled Scaling",
      insight: "Healthy early signals. Keep structure and test controlled budget increase.",
      priority: "Scale gradually while monitoring RTS and delivered profit.",
    };
  }, [metrics]);

  const awareness = useMemo(() => {
    const text = (inputs.product + " " + inputs.angle).toLowerCase();
    let stage = "Problem Aware";
    let confidence = 72;
    let flow = "Fear -> Education -> Proof -> Offer";
    let reason = [
      "Buyer already recognizes a clear pain or problem.",
      "Ad angle is focused on fear, consequence, or discomfort.",
      "Best LP flow should validate the problem before introducing the product."
    ];

    if (text.includes("buy") || text.includes("discount") || text.includes("sale") || text.includes("b1t1") || text.includes("offer")) {
      stage = "Most Aware";
      confidence = 84;
      flow = "Offer -> Proof -> Urgency -> Checkout";
      reason = ["Ad angle is offer-driven.", "Buyer likely needs price, urgency, and COD reassurance.", "Page should reduce friction and push immediate action."];
    } else if (text.includes("review") || text.includes("testimonial") || text.includes("legit") || text.includes("scam") || text.includes("proof")) {
      stage = "Product Aware";
      confidence = 80;
      flow = "Proof -> Trust -> Differentiation -> Offer";
      reason = ["Buyer is already evaluating the product or trust level.", "Main resistance is skepticism.", "Page should focus on proof, reviews, and risk reversal."];
    } else if (text.includes("how") || text.includes("why") || text.includes("root") || text.includes("natural") || text.includes("solution")) {
      stage = "Solution Aware";
      confidence = 76;
      flow = "Mechanism -> Differentiation -> Proof -> Offer";
      reason = ["Angle suggests buyer is looking for a solution.", "They need to understand why this mechanism is believable.", "Page should explain how it works before selling."];
    } else if (text.includes("akala") || text.includes("signs") || text.includes("normal") || text.includes("hindi mo napapansin")) {
      stage = "Unaware to Problem Aware";
      confidence = 78;
      flow = "Pattern Interrupt -> Symptom Recognition -> Consequence -> Education";
      reason = ["Hook creates awareness from a hidden problem.", "Buyer may not fully realize the seriousness yet.", "Page should awaken concern before product introduction."];
    } else if (text.includes("takot") || text.includes("mahal") || text.includes("hirap") || text.includes("lumala") || text.includes("burden") || text.includes("mabulag")) {
      stage = "Problem Aware";
      confidence = 86;
      flow = "Fear -> Education -> Proof -> Offer";
      reason = ["Fear and consequence angle is clear.", "Buyer already feels or understands the problem.", "Page must build trust before asking for purchase."];
    }

    return { stage, confidence, flow, reason };
  }, [inputs.product, inputs.angle]);

  const funnelScores = useMemo(() => {
    const hookStrength = clampScore(metrics.ctr * 2.2);
    const conversionStrength = clampScore(metrics.cvr * 2.5);
    const profitStrength = clampScore((metrics.roas / Math.max(metrics.beRoas, 1)) * 7);
    const rtsRiskScore = clampScore(10 - inputs.rtsRate / 5);
    const awarenessMatch = awareness.confidence / 10;
    const trustStrength = metrics.ctr >= 2.5 && metrics.cvr < 3 ? 5.2 : 7.4;
    const offerStrength = metrics.roas < metrics.beRoas ? 5.5 : 7.8;
    const buyerIntent = inputs.rtsRate >= 30 ? 5.4 : 7.5;
    const overall = (hookStrength + conversionStrength + profitStrength + rtsRiskScore + awarenessMatch + trustStrength + offerStrength + buyerIntent) / 8;

    return {
      hookStrength,
      conversionStrength,
      profitStrength,
      rtsRiskScore,
      awarenessMatch,
      trustStrength,
      offerStrength,
      buyerIntent,
      overall: clampScore(overall)
    };
  }, [metrics, inputs.rtsRate, awareness.confidence]);

  const intelligenceScore = useMemo(() => {
    const healthScore = Math.round(funnelScores.overall * 10);
    const trafficScore = Math.round(clampScore((metrics.ctr * 2.5 + (metrics.clicks > 0 ? 3 : 0))) * 10);
    const conversionScore = Math.round(funnelScores.conversionStrength * 10);
    const profitScore = Math.round(funnelScores.profitStrength * 10);
    const buyerQualityScore = Math.round(funnelScores.buyerIntent * 10);

    let scalingStatus = "Fix First";
    let scalingTone = "red";
    let decision = "Do not scale yet.";

    if (metrics.ctr >= 2.5 && metrics.roas >= metrics.beRoas && inputs.rtsRate < 25) {
      scalingStatus = "Safe To Test Scale";
      scalingTone = "green";
      decision = "Scale carefully with controlled budget increase.";
    } else if (metrics.ctr >= 2 && metrics.roas >= metrics.beRoas * 0.85) {
      scalingStatus = "Promising";
      scalingTone = "amber";
      decision = "Do not scale aggressively. Run one controlled improvement test first.";
    }

    return { healthScore, trafficScore, conversionScore, profitScore, buyerQualityScore, scalingStatus, scalingTone, decision };
  }, [funnelScores, metrics, inputs.rtsRate]);

  const smartActionEngine = useMemo(() => {
    const actions = [];

    if (metrics.ctr < 1.5) {
      actions.push({ title: "Replace Weak Hook", owner: "Copywriter + Designer", priority: "HIGH", reason: "CTR is below safe threshold. The ad is not stopping enough buyers.", action: "Create 3 new first-3-second hooks using fear, family concern, and curiosity angles." });
    }

    if (metrics.ctr >= 2.5 && metrics.cvr < 3) {
      actions.push({ title: "Fix Landing Page Trust Gap", owner: "LP Builder / Copywriter", priority: "HIGH", reason: "Strong ad interest but weak conversion means the page is not building enough belief.", action: "Move testimonials and COD reassurance before the offer section." });
    }

    if (metrics.roas < metrics.beRoas) {
      actions.push({ title: "Protect Profitability", owner: "Media Buyer", priority: "HIGH", reason: "ROAS is below breakeven. Scaling now can increase losses.", action: "Pause aggressive scaling. Improve CPP, offer stack, or conversion rate before budget increase." });
    }

    if (inputs.rtsRate >= 30) {
      actions.push({ title: "Reduce RTS Risk", owner: "Ops + Copywriter", priority: "HIGH", reason: "RTS is high. Buyer quality and expectations may be weak.", action: "Add expectation-setting copy and COD confirmation before fulfillment." });
    }

    if (actions.length === 0) {
      actions.push({ title: "Controlled Scaling Test", owner: "Media Buyer", priority: "MEDIUM", reason: "Core signals look healthy enough for careful movement.", action: "Increase budget by 15% to 20% while monitoring RTS, CPP, and delivered profit." });
    }

    return actions;
  }, [metrics, inputs.rtsRate]);

  const selectedAsset = useMemo(() => {
    const dynamicTypes = ["hero", "pain", "education", "trust", "offer", "cta"];

    if (dynamicTypes.includes(generated)) {
      return dynamicGenerateAsset({
        type: generated,
        awareness: awareness.stage,
        diagnosis: diagnosis.status,
        product: inputs.product,
        angle: inputs.angle,
        rtsRate: inputs.rtsRate
      });
    }

    return generatedAssets[generated];
  }, [generated, awareness.stage, diagnosis.status, inputs.product, inputs.angle, inputs.rtsRate]);

  const copyTextToClipboard = async (text, label = "asset") => {
    const cleanText = String(text || "");
    if (!cleanText.trim()) return;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(cleanText);
        setCopiedAsset(true);
        addActivityLog(`Copied ${label}.`);
        setTimeout(() => setCopiedAsset(false), 1800);
        return;
      }
    } catch (error) {
      console.warn("Clipboard API blocked, using fallback.", error);
    }

    const textarea = document.createElement("textarea");
    textarea.value = cleanText;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      setCopiedAsset(true);
      addActivityLog(`Copied ${label}.`);
      setTimeout(() => setCopiedAsset(false), 1800);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const copyPrompt = () => {
    const promptText = selectedAsset?.imagePrompt || generatedAssets.hero.imagePrompt;
    copyTextToClipboard(promptText, "image prompt");
    setShowManualCopy(true);

    setTimeout(() => {
      const copyBox = copyBoxRef.current;
      if (!copyBox) return;
      copyBox.focus();
      copyBox.select();
      copyBox.setSelectionRange(0, copyBox.value.length);
    }, 50);
  };

  const saveGeneratedAsset = () => {
    const asset = {
      id: Date.now(),
      workspace: inputs.workspace,
      project: inputs.project,
      product: inputs.product,
      assetType: generated,
      title: selectedAsset.title,
      content: selectedAsset.content,
      imagePrompt: selectedAsset.imagePrompt || "",
      createdAt: new Date().toLocaleString(),
      diagnosis: diagnosis.status,
      awareness: awareness.stage,
    };

    setGeneratedLibrary((prev) => [asset, ...prev].slice(0, 50));
    addActivityLog(`Saved generated asset: ${selectedAsset.title}`);
  };

  const simulateAIGenerate = () => {
    setAiGenerating(true);
    setTimeout(() => {
      saveGeneratedAsset();
      setAiGenerating(false);
    }, 700);
  };

  const getCurrentImagePrompt = () => {
    const basePrompt = selectedAsset.imagePrompt || "No image prompt available.";

    return [
      basePrompt,
      "",
      "Spryve Landing Page Strategy Rules:",
      "OUTPUT MUST LOOK LIKE A MOBILE LANDING PAGE SCREENSHOT, NOT A SINGLE AD POSTER.",
      "Use a complete 9:16 WebCake-style landing page section with multiple stacked areas.",
      "Required layout blocks: top logo/product name area, headline block, product showcase, benefit cards, trust/COD bar, large CTA button, and lower pain/relate cards when appropriate.",
      "Use clean white and medical blue background, large readable hierarchy, rounded cards, soft shadows, premium healthcare ecommerce style.",
      "Create a section that feels like it can be pasted directly into a landing page, not just a Facebook creative.",
      "Text must be readable, short, and Filipino ecommerce friendly. Avoid too much copy.",
      "Use the exact product name from the project and avoid changing the product category.",
      "Use Philippine COD ecommerce trust cues when relevant: Cash on Delivery, 100% Original, Secure Packaging, Nationwide Delivery.",
      "Preserve the uploaded product as the product reference only: bottle shape, label color, label placement, cap, and packaging must stay close to the uploaded image.",
      "If a layout reference image is uploaded, follow its landing-page composition, spacing, section hierarchy, and visual rhythm, but replace content with the current product and prompt.",
      "Avoid generic poster composition, random extra bottles, unreadable text, fake logos, distorted labels, distorted hands, and unrelated product packaging.",
      "Brand direction: Spryve premium direct-response ecommerce, white/blue/cyan palette, clean cards, trust bar, strong CTA, mobile-first layout.",
      `Selected style mode: ${imageStyleMode}.`,
      `Product: ${inputs.product}.`,
      `Buyer angle: ${inputs.angle}.`,
      `Detected awareness: ${awareness.stage}.`,
      `Diagnosis: ${diagnosis.status}.`,
    ].join("\n");
  };

  const downloadLatestImage = () => {
    if (!latestGeneratedImage?.imageUrl) return;
    const link = document.createElement("a");
    link.href = latestGeneratedImage.imageUrl;
    link.download = `${inputs.product || "spryve"}-${generated}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addActivityLog(`Downloaded generated image for ${generated}.`);
  };

  const handleReferenceUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const uploaded = {
        name: file.name,
        dataUrl: reader.result,
        uploadedAt: new Date().toLocaleString(),
      };
      setReferenceImage(uploaded);
      setImageGenerationMessage("Product reference uploaded. Next generation will preserve this product image.");
      addActivityLog(`Uploaded product reference image: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleLayoutReferenceUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const uploaded = {
        name: file.name,
        dataUrl: reader.result,
        uploadedAt: new Date().toLocaleString(),
      };
      setLayoutReferenceImage(uploaded);
      setImageGenerationMessage("Layout reference uploaded. Next generation will follow this landing-page layout style.");
      addActivityLog(`Uploaded layout reference image: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const clearReferenceImage = () => {
    setReferenceImage(null);
    setImageGenerationMessage("Product reference removed. Next generation will use prompt-only mode unless a layout reference is uploaded.");
  };

  const clearLayoutReferenceImage = () => {
    setLayoutReferenceImage(null);
    setImageGenerationMessage("Layout reference removed.");
  };

  const generateImageInsideApp = async () => {
    const referenceInstructions = [
      referenceImage
        ? `IMPORTANT PRODUCT REFERENCE: Use uploaded product image named ${referenceImage.name}. Preserve bottle shape, label color, cap, label placement, and packaging. Do not invent a different product.`
        : "",
      layoutReferenceImage
        ? `IMPORTANT LAYOUT REFERENCE: Use uploaded layout reference named ${layoutReferenceImage.name}. Follow its landing page screenshot composition, section hierarchy, white/blue palette, trust bar, benefit cards, CTA button, and mobile-first WebCake layout rhythm.`
        : "",
    ].filter(Boolean).join("\n");

    const prompt = referenceInstructions
      ? getCurrentImagePrompt() + "\n\n" + referenceInstructions
      : getCurrentImagePrompt();

    setImageGenerating(true);
    setImageGenerationMessage("Preparing image generation request...");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          product: inputs.product,
          workspace: inputs.workspace,
          project: inputs.project,
          section: generated,
          style: imageStyleMode,
          referenceImage,
          layoutReferenceImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Image API route returned an error.");
      }

      const imageUrl = data.imageUrl || data.url || data.b64_json;
      if (!imageUrl) {
        throw new Error("No image returned from API.");
      }

      const imageJob = {
        id: Date.now(),
        workspace: inputs.workspace,
        project: inputs.project,
        product: inputs.product,
        section: generated,
        style: imageStyleMode,
        prompt,
        imageUrl,
        status: "Generated",
        createdAt: new Date().toLocaleString(),
      };

      setGeneratedImages((prev) => [imageJob, ...prev].slice(0, 30));
      setImageGenerationMessage("Image generated successfully inside the app.");
      addActivityLog(`Generated image for ${selectedAsset.title}`);
    } catch (error) {
      const cleanError = error?.message || "Failed to generate image.";
      const imageJob = {
        id: Date.now(),
        workspace: inputs.workspace,
        project: inputs.project,
        product: inputs.product,
        section: generated,
        style: imageStyleMode,
        prompt,
        imageUrl: "",
        status: "API Pending",
        createdAt: new Date().toLocaleString(),
      };

      setGeneratedImages((prev) => [imageJob, ...prev].slice(0, 30));
      setImageGenerationMessage(`Image generation failed: ${cleanError}`);
      addActivityLog(`Prepared image generation job for ${selectedAsset.title}`);
    } finally {
      setImageGenerating(false);
    }
  };

  const variationDatabase = {
    hero: {
      "Fear Based": "Focus on fear of worsening symptoms, emotional tension, and consequence awareness.",
      "Hope Based": "Focus on hope, confidence, and improving daily life slowly.",
      "Family Concern": "Focus on family members noticing the struggle and wanting to help.",
      "Doctor Style": "Focus on medical trust, educational tone, and healthcare positioning.",
      "Soft Senior Style": "Gentle tone, comforting visuals, larger readable typography.",
      "Curiosity Style": "Pattern interrupt and hidden symptom angle."
    },
    offer: {
      "Bundle Heavy": "Push larger bundle as best value with shipping advantage.",
      "Soft CTA": "Less aggressive offer presentation focused on support.",
      "Urgency": "Add limited stock and stronger urgency positioning.",
      "Risk Reversal": "Increase reassurance and COD confidence.",
      "Best Seller": "Highlight most popular package with visual emphasis."
    },
    cta: {
      "Emotional": "Focus on emotional reassurance and future protection.",
      "Urgent": "Push immediate action before symptoms worsen.",
      "Gentle": "Soft supportive healthcare tone.",
      "Senior Friendly": "Large readable text and comforting tone.",
      "Fear Continuation": "Continue the fear-based emotional tension from the ad."
    }
  };

  const generateFullLPFlow = () => {
    const sections = ["hero", "pain", "education", "trust", "offer", "faq", "cta"];

    const output = sections
      .map((section, index) => {
        const asset = section === "faq"
          ? generatedAssets.faq
          : dynamicGenerateAsset({
              type: section,
              awareness: awareness.stage,
              diagnosis: diagnosis.status,
              product: inputs.product,
              angle: inputs.angle,
              rtsRate: inputs.rtsRate,
            });

        return [
          `SECTION ${index + 1} — ${asset.title.toUpperCase()}`,
          "",
          asset.content,
          "",
          "IMAGE PROMPT:",
          asset.imagePrompt || "No image prompt available.",
          "",
          "------------------------------------------------------------",
          "",
        ].join("\n");
      })
      .join("\n");

    setFullLPOutput(output);
  };

  const addProductAsset = () => {
    const cleanTitle = assetTitle.trim();
    if (!cleanTitle) return;

    const newAsset = {
      id: Date.now(),
      workspace: inputs.workspace,
      product: reportProduct,
      title: cleanTitle,
      type: assetType,
      link: assetLink,
      status: assetStatus,
      addedAt: new Date().toLocaleString()
    };

    setProductAssets((prev) => [newAsset, ...prev]);
    setAssetTitle("");
    setAssetLink("");
    setAssetType("Creative");
    setAssetStatus("For Review");
    addActivityLog(`Added ${assetType} asset for ${reportProduct}: ${cleanTitle}`);
  };

  const addProduct = () => {
    const cleanProduct = newProductName.trim();
    if (!cleanProduct) return;

    setProducts((prev) => prev.includes(cleanProduct) ? prev : [cleanProduct, ...prev]);
    setReportProduct(cleanProduct);
    setNewProductName("");
    addActivityLog(`Added product: ${cleanProduct}`);
  };

  const submitMediaBuyerReport = () => {
    const report = {
      id: Date.now(),
      workspace: inputs.workspace,
      product: reportProduct,
      type: "Media Buyer",
      date: new Date().toLocaleDateString(),
      data: { ...mediaBuyerReport }
    };

    setDailyReports((prev) => [report, ...prev]);
    update("project", reportProduct);
    update("product", reportProduct);
    update("adSpend", Number(mediaBuyerReport.spend || 0));
    addActivityLog(`Submitted media buyer report for ${reportProduct}`);
  };

  const submitDesignerReport = () => {
    const report = {
      id: Date.now(),
      workspace: inputs.workspace,
      product: reportProduct,
      type: "Designer",
      date: new Date().toLocaleDateString(),
      data: { ...designerReport }
    };

    setDailyReports((prev) => [report, ...prev]);
    addActivityLog(`Submitted designer report for ${reportProduct}`);
  };

  const generateDailyMarketingReport = () => {
    const productTests = savedTests.filter((test) => test.workspace === inputs.workspace && test.product === reportProduct);
    const latestTests = productTests.slice(0, 5);
    const bestProfitTest = [...productTests].sort((a, b) => Number(b.projectedProfit || 0) - Number(a.projectedProfit || 0))[0];
    const bestCtrTest = [...productTests].sort((a, b) => Number(b.ctr || 0) - Number(a.ctr || 0))[0];
    const activeTasks = teamTasks.filter((task) => task.workspace === inputs.workspace && task.project === reportProduct && task.status !== "Done");

    const roasStatus = Number(mediaBuyerReport.roas || 0) >= 3 ? "Scaling watchlist" : Number(mediaBuyerReport.roas || 0) >= 2 ? "Needs optimization" : "High risk";
    const ctrStatus = Number(mediaBuyerReport.ctr || 0) >= 2.5 ? "Creative is getting attention" : "Creative hook needs improvement";
    const cppStatus = Number(mediaBuyerReport.cpp || 0) <= metrics.safeCPP ? "CPP is inside safe zone" : "CPP is above safe zone";

    const report = [
      `SPR YVE INTELLIGENCE DAILY MARKETING REPORT`.replace("SPR YVE", "SPRYVE"),
      `Date: ${new Date().toLocaleDateString()}`,
      `Workspace: ${inputs.workspace}`,
      `Product: ${reportProduct}`,
      "",
      "1. PERFORMANCE SUMMARY",
      `Spend: ${formatPeso(mediaBuyerReport.spend)}`,
      `ROAS: ${Number(mediaBuyerReport.roas || 0).toFixed(2)} — ${roasStatus}`,
      `CTR: ${Number(mediaBuyerReport.ctr || 0).toFixed(2)}% — ${ctrStatus}`,
      `CPP: ${formatPeso(mediaBuyerReport.cpp)} — ${cppStatus}`,
      `Winning Angle: ${mediaBuyerReport.winningAngle || "No winning angle logged yet"}`,
      `Action Taken: ${mediaBuyerReport.action || "No action logged yet"}`,
      "",
      "2. AI DIAGNOSIS",
      `Main Diagnosis: ${diagnosis.status}`,
      `Problem Area: ${diagnosis.area}`,
      `Priority Move: ${diagnosis.priority}`,
      `Scaling Signal: ${getScalingSignal()}`,
      "",
      "3. WINNER PATTERN SIGNALS",
      `Best CTR Creative: ${bestCtrTest?.creativeName || "No saved tests yet"}`,
      `Best Profit Creative: ${bestProfitTest?.creativeName || "No saved tests yet"}`,
      `Best Audience: ${testComparison.bestAudience}`,
      `Best Hook: ${testComparison.bestHook}`,
      `Recommended Next Test: ${testComparison.nextTestSuggestion}`,
      "",
      "4. TOMORROW ACTION PLAN",
      ...smartActionEngine.map((item, index) => `${index + 1}. ${item.title} — ${item.action}`),
      "",
      "5. OPEN TASKS",
      ...(activeTasks.length ? activeTasks.slice(0, 8).map((task) => `- [${task.status}] ${task.title} | ${task.assignee || "Unassigned"}`) : ["- No open tasks for this product."]),
      "",
      "6. LATEST TEST SNAPSHOTS",
      ...(latestTests.length ? latestTests.map((test) => `- ${test.creativeName || test.angle}: ${test.scalingSignal || test.result} | CTR ${formatPercent(test.ctr)} | CPP ${formatPeso(test.cpp)} | Profit ${formatPeso(test.projectedProfit)}`) : ["- No saved tests yet."]),
      "",
      "NOTES",
      mediaBuyerReport.notes || "No additional notes.",
    ].join("\n");

    setReportExportText(report);
    addActivityLog(`Generated daily marketing report for ${reportProduct}`);
  };

  const addActivityLog = (message) => {
    const newLog = {
      id: Date.now(),
      workspace: inputs.workspace,
      project: inputs.project,
      message,
      time: new Date().toLocaleString()
    };

    setActivityLogs((prev) => [newLog, ...prev].slice(0, 30));
  };

  const sendSuperAdminInvite = async () => {
    const cleanEmail = superInviteEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setSuperInviteMessage("Please enter founder/partner email.");
      return;
    }

    setSuperInviteLoading(true);
    setSuperInviteMessage("");
    setSuperInviteTempPassword("");

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      const response = await fetch("/api/invite-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ email: cleanEmail, role: superInviteRole }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Invite failed.");
      }

      setPendingInvites((prev) => [
        {
          id: Date.now(),
          workspace: "Super Admin",
          email: cleanEmail,
          role: superInviteRole,
          status: "Founder Invite Sent",
        },
        ...prev,
      ]);
      setSuperInviteEmail("");
      setSuperInviteTempPassword(data?.tempPassword || "");
      setSuperInviteMessage("Temporary account created successfully. Share the email and temporary password securely. User will be forced to change password after login.");
      addActivityLog(`Super Admin invited founder/partner: ${cleanEmail}`);
    } catch (error) {
      setSuperInviteMessage(error?.message || "Invite failed.");
    } finally {
      setSuperInviteLoading(false);
    }
  };

  const mapWorkspaceRoleToSystemRole = (roleLabel) => {
    if (roleLabel === "Owner") return "founder_partner";
    if (roleLabel === "Designer") return "graphic_artist";
    return "marketer";
  };

  const addWorkspaceMember = async () => {
    const cleanName = newMemberName.trim();
    const cleanEmail = inviteEmail.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      setMemberInviteMessage("Member name and email are required.");
      return;
    }

    if (!activeWorkspace?.id) {
      setMemberInviteMessage("No active workspace found. Please reload and try again.");
      return;
    }

    setMemberInviteLoading(true);
    setMemberInviteMessage("");

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      const systemRole = mapWorkspaceRoleToSystemRole(newMemberRole);

      const response = await fetch("/api/invite-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: cleanEmail,
          role: systemRole,
          workspaceId: activeWorkspace.id,
          workspaceName: inputs.workspace,
          workspaceRole: systemRole,
          roleLabel: newMemberRole,
          hasFullAccess: inviteHasFullAccess,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Invite failed.");
      }

      const newMember = {
        id: Date.now(),
        workspace: inputs.workspace,
        name: cleanName,
        role: inviteHasFullAccess ? `${newMemberRole} + Full Access` : newMemberRole,
        email: cleanEmail,
        status: "Pending Invite",
        hasFullAccess: inviteHasFullAccess,
      };

      setWorkspaceMembers((prev) => [newMember, ...prev]);
      setPendingInvites((prev) => [
        { id: Date.now() + 1, workspace: inputs.workspace, email: cleanEmail, role: newMemberRole, status: "Pending Invite" },
        ...prev,
      ]);
      addActivityLog(`Invited workspace member: ${cleanName} (${newMemberRole})`);
      setMemberInviteMessage("Invite email sent successfully. Member will enter this workspace after accepting and setting password.");
      setNewMemberName("");
      setInviteEmail("");
      setInvitePassword("");
      setInviteHasFullAccess(false);
      setNewMemberRole("Media Buyer");
      setShowInviteForm(false);
    } catch (error) {
      setMemberInviteMessage(error?.message || "Invite failed.");
    } finally {
      setMemberInviteLoading(false);
    }
  };

  const activateMember = (memberId) => {
    setWorkspaceMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, status: member.status === "Active" ? "Pending" : "Active" } : member
      )
    );
  };

  const addProjectNote = () => {
    const cleanNote = noteInput.trim();
    if (!cleanNote) return;

    const newNote = {
      id: Date.now(),
      text: cleanNote,
      workspace: inputs.workspace,
      project: inputs.project,
    };

    setProjectNotes((prev) => [newNote, ...prev]);
    addActivityLog(`Added project note.`);
    setNoteInput("");
  };

  const addManualTask = () => {
    const cleanTitle = newTaskTitle.trim();
    if (!cleanTitle) return;

    const newTask = {
      id: Date.now(),
      workspace: inputs.workspace,
      project: reportProduct || inputs.project,
      role: newTaskRole,
      assignee: newTaskAssignee || "Unassigned",
      title: cleanTitle,
      priority: newTaskPriority,
      status: newTaskStatus,
      dueDate: newTaskDueDate || "No due date"
    };

    setTeamTasks((prev) => [newTask, ...prev]);
    addActivityLog(`Created task: ${cleanTitle}`);
    setNewTaskTitle("");
    setNewTaskAssignee("");
    setNewTaskRole("Media Buyer");
    setNewTaskPriority("HIGH");
    setNewTaskStatus("To Do");
    setNewTaskDueDate("");
  };

  const toggleTaskStatus = (taskId) => {
    setTeamTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "Done" ? "To Do" : "Done"
            }
          : task
      )
    );
  };

  const generateAITasks = () => {
    const generatedTasks = [
      {
        id: Date.now(),
        workspace: inputs.workspace,
        project: inputs.project,
        role: "Copywriter",
        assignee: activeWorkspaceMembers.find((member) => member.role === "Copywriter")?.name || "Unassigned",
        title: "Rewrite headline using softer emotional positioning",
        priority: "HIGH",
        status: "Pending"
      },
      {
        id: Date.now() + 1,
        workspace: inputs.workspace,
        project: inputs.project,
        role: "Designer",
        assignee: activeWorkspaceMembers.find((member) => member.role === "Designer")?.name || "Unassigned",
        title: "Create testimonial-focused trust section visual",
        priority: "MEDIUM",
        status: "Pending"
      },
      {
        id: Date.now() + 2,
        workspace: inputs.workspace,
        project: inputs.project,
        role: "Media Buyer",
        assignee: activeWorkspaceMembers.find((member) => member.role === "Media Buyer")?.name || "Unassigned",
        title: "Test Family Concern angle against Fear Based angle",
        priority: "HIGH",
        status: "Pending"
      }
    ];

    setTeamTasks((prev) => [...generatedTasks, ...prev]);
  };

  const exportWorkspaceReport = () => {
    const tasksText = activeProjectTasks
      .map((task) => `- [${task.status}] ${task.title} | ${task.role} | ${task.assignee}`)
      .join("\n");

    const notesText = activeProjectNotes
      .map((note) => `- ${note.text}`)
      .join("\n");

    const report = `Workspace: ${inputs.workspace}
Project: ${inputs.project}
Diagnosis: ${diagnosis.status}
Awareness: ${awareness.stage}
ROAS: ${metrics.roas.toFixed(2)}
CTR: ${formatPercent(metrics.ctr)}
CVR: ${formatPercent(metrics.cvr)}

Tasks:
${tasksText}

Notes:
${notesText}`;

    setExportText(report);
  };

  const saveCampaignSnapshot = () => {
    const cleanName = campaignNameInput.trim() || `${inputs.project} Snapshot`;

    const newCampaign = {
      id: Date.now(),
      workspace: inputs.workspace,
      project: inputs.project,
      name: cleanName,
      savedAt: new Date().toLocaleString(),
      metrics: {
        ctr: metrics.ctr,
        cvr: metrics.cvr,
        roas: metrics.roas,
        profit: metrics.projectedProfit,
      },
      diagnosis: diagnosis.status,
      awareness: awareness.stage,
      angle: inputs.angle,
      tasks: activeProjectTasks.length,
      notes: activeProjectNotes.length,
    };

    setSavedCampaigns((prev) => [newCampaign, ...prev]);
    addActivityLog(`Saved campaign snapshot: ${cleanName}`);
    setCampaignNameInput("");
  };

  const currentWorkspaceCampaigns = savedCampaigns.filter(
    (campaign) => campaign.workspace === inputs.workspace
  );

  const removeMember = (memberId) => {
    setWorkspaceMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  const getScalingSignal = () => {
    if (metrics.projectedProfit > 0 && metrics.currentCPP <= metrics.safeCPP) return "SAFE TO SCALE";
    if (metrics.projectedProfit > 0 && metrics.currentCPP <= metrics.maxScaleCPP) return "PROFITABLE BUT SCALE SLOWLY";
    if (metrics.projectedProfit > 0) return "PROFITABLE BUT CPP RISK";
    if (metrics.ctr >= 2.5 && metrics.cvr < 3) return "FIX LANDING PAGE";
    if (metrics.ctr < 1.5) return "CHANGE CREATIVE";
    return "NOT PROFITABLE YET";
  };

  const updateAdTestDraft = (key, value) => {
    setAdTestDraft((previous) => ({ ...previous, [key]: value }));
  };

  const saveCurrentTest = () => {
    const now = new Date().toLocaleString();
    const newTest = {
      workspace: inputs.workspace,
      project: inputs.project,
      product: inputs.product,
      id: Date.now(),
      campaignName: adTestDraft.campaignName || inputs.project,
      adsetName: adTestDraft.adsetName || "Main Adset",
      creativeName: adTestDraft.creativeName || "Creative Test",
      audience: adTestDraft.audience || "Broad",
      creativeFormat: adTestDraft.creativeFormat || "Static Image",
      hook: adTestDraft.hook || inputs.angle,
      landingPage: adTestDraft.landingPage || "Main LP",
      offer: adTestDraft.offer || "Main Offer",
      savedAt: now,
      angle: inputs.angle || variationMode,
      variationMode,
      trackingMode: metrics.noAtcMode ? "No-ATC Mode" : "Full Funnel",
      ctr: metrics.ctr,
      cvr: metrics.cvr,
      atcRate: metrics.atcRate,
      checkoutRate: metrics.checkoutRate,
      roas: metrics.roas,
      cpp: metrics.currentCPP,
      breakEvenCPP: metrics.breakEvenCPP,
      safeCPP: metrics.safeCPP,
      projectedProfit: metrics.projectedProfit,
      netMargin: metrics.netMargin,
      rts: inputs.rtsRate,
      diagnosis: diagnosis.status,
      recommendation: diagnosis.priority,
      scalingSignal: getScalingSignal(),
      result: metrics.projectedProfit > 0 && metrics.currentCPP <= metrics.safeCPP ? "WINNER" : metrics.projectedProfit > 0 ? "PROMISING" : "WEAK"
    };

    setSavedTests((prev) => [newTest, ...prev].slice(0, 50));
    setLastSavedAt(now);
    addActivityLog(`Saved test snapshot: ${newTest.scalingSignal}`);
  };

  const loadSavedTest = (test) => {
    setInputs((previous) => ({
      ...previous,
      workspace: test.workspace || previous.workspace,
      project: test.project || previous.project,
      product: test.product || previous.product,
      angle: test.angle || previous.angle,
    }));
    setActiveMainTab("diagnosis");
    addActivityLog(`Loaded saved test: ${test.scalingSignal || test.result}`);
  };

  const clearSavedTests = () => {
    setSavedTests([]);
    setLastSavedAt(new Date().toLocaleString());
    addActivityLog("Cleared saved test history.");
  };

  const resetLocalWorkspace = () => {
    const confirmed = window.confirm("Reset local Spryve Intelligence data on this browser?");
    if (!confirmed) return;
    window.localStorage.removeItem("spryve-intelligence-state-v3");
    window.location.reload();
  };

  const currentProjectActivityLogs = useMemo(() => {
    return activityLogs.filter((log) => log.workspace === inputs.workspace && log.project === inputs.project);
  }, [activityLogs, inputs.workspace, inputs.project]);

  const currentProjectTests = useMemo(() => {
    return savedTests.filter((test) => test.workspace === inputs.workspace && test.project === inputs.project);
  }, [savedTests, inputs.workspace, inputs.project]);

  const latestGeneratedImage = useMemo(() => {
    return generatedImages.find(
      (image) =>
        image.workspace === inputs.workspace &&
        image.project === inputs.project &&
        image.section === generated &&
        image.status === "Generated" &&
        image.imageUrl
    ) || generatedImages.find(
      (image) =>
        image.workspace === inputs.workspace &&
        image.project === inputs.project &&
        image.status === "Generated" &&
        image.imageUrl
    );
  }, [generatedImages, inputs.workspace, inputs.project, generated]);

  const dashboardProducts = useMemo(() => {
    const seededProducts = products.map((product, index) => {
      const tests = savedTests.filter((test) => test.workspace === inputs.workspace && test.product === product);
      const bestTest = [...tests].sort((a, b) => Number(b.projectedProfit || 0) - Number(a.projectedProfit || 0))[0];
      const demoMultiplier = index + 1;
      const revenue = bestTest ? Number(bestTest.roas || 0) * Number(inputs.adSpend || 0) : metrics.revenue * (demoMultiplier === 1 ? 1 : demoMultiplier * 0.42);
      const spend = bestTest ? Number(bestTest.cpp || 0) * Number(inputs.orders || 1) : inputs.adSpend * (demoMultiplier === 1 ? 1 : demoMultiplier * 0.38);
      const roas = spend ? revenue / spend : 0;
      const cpp = bestTest?.cpp || (inputs.orders ? spend / Math.max(1, inputs.orders * (demoMultiplier === 1 ? 1 : 0.55)) : 0);
      const ctr = bestTest?.ctr || (metrics.ctr - index * 0.35);
      const delivered = product === inputs.product ? inputs.deliveredRate : Math.max(54, inputs.deliveredRate - index * 4);
      const rts = 100 - delivered;
      const netProfit = bestTest?.projectedProfit ?? (revenue * 0.32 - spend);
      const status = roas >= 3 && netProfit > 0 ? "Winner" : roas >= 2.2 ? "Stable" : roas >= 1.5 ? "Testing" : "Kill";
      const trend = roas >= 3 ? "Up" : roas >= 2 ? "Flat" : "Down";
      return { product, revenue, spend, roas, cpp, ctr, delivered, rts, netProfit, status, trend, tests };
    });

    return seededProducts;
  }, [products, savedTests, inputs.workspace, inputs.product, inputs.adSpend, inputs.orders, inputs.deliveredRate, metrics.revenue, metrics.ctr]);

  const globalDashboard = useMemo(() => {
    const revenue = dashboardProducts.reduce((sum, item) => sum + Number(item.revenue || 0), 0);
    const spend = dashboardProducts.reduce((sum, item) => sum + Number(item.spend || 0), 0);
    const profit = dashboardProducts.reduce((sum, item) => sum + Number(item.netProfit || 0), 0);
    const orders = Math.max(1, inputs.orders * Math.max(1, dashboardProducts.length));
    const deliveredRevenue = revenue * (inputs.deliveredRate / 100);
    const pendingRevenue = Math.max(0, revenue - deliveredRevenue);
    const blendedRoas = spend ? revenue / spend : 0;
    const averageCpp = orders ? spend / orders : 0;
    const avgCtr = dashboardProducts.length ? dashboardProducts.reduce((sum, item) => sum + Number(item.ctr || 0), 0) / dashboardProducts.length : 0;
    const activeWinners = dashboardProducts.filter((item) => ["Winner", "Scaling"].includes(item.status)).length;
    const winRate = dashboardProducts.length ? (activeWinners / dashboardProducts.length) * 100 : 0;
    const scalingStatus = blendedRoas >= 3 && profit > 0 ? "Stable" : blendedRoas >= 2.2 ? "Warning" : "Dangerous";

    return { revenue, spend, profit, orders, deliveredRevenue, pendingRevenue, blendedRoas, averageCpp, avgCtr, activeWinners, winRate, scalingStatus };
  }, [dashboardProducts, inputs.orders, inputs.deliveredRate]);

  const intelligenceSignals = useMemo(() => {
    const topProduct = [...dashboardProducts].sort((a, b) => Number(b.netProfit || 0) - Number(a.netProfit || 0))[0];
    const weakProduct = [...dashboardProducts].sort((a, b) => Number(a.roas || 0) - Number(b.roas || 0))[0];
    return [
      { level: "Opportunity", title: "Scaling Opportunity", message: `${topProduct?.product || inputs.product} is showing the strongest profit and scaling signal.`, action: "Analyze Product" },
      { level: "Warning", title: "Creative Fatigue Watch", message: metrics.ctr < 2 ? "CTR is below safe attention level. Refresh hook or creative angle." : "CTR is healthy, but monitor creative fatigue if frequency rises.", action: "Fix Creative" },
      { level: "Stable", title: "Profitability Signal", message: globalDashboard.profit > 0 ? "Overall system is profitable based on current estimate." : "Profit is not yet safe. Protect budget before scaling.", action: "Generate Recommendation" },
      { level: "Critical", title: "Risk Detection", message: weakProduct?.roas < 1.8 ? `${weakProduct.product} may need kill/retest decision.` : "No critical product risk detected right now.", action: "View Risk" },
    ];
  }, [dashboardProducts, inputs.product, metrics.ctr, globalDashboard.profit]);

  const performanceTrend = useMemo(() => {
    const baseRevenue = globalDashboard.revenue || metrics.revenue || 1;
    const baseSpend = globalDashboard.spend || inputs.adSpend || 1;
    return ["D1", "D2", "D3", "D4", "D5", "D6", "D7"].map((day, index) => {
      const factor = 0.72 + index * 0.055;
      const revenue = baseRevenue * factor;
      const spend = baseSpend * (0.8 + index * 0.035);
      const roas = spend ? revenue / spend : 0;
      return {
        day,
        revenue,
        roas,
        cpp: Math.max(1, globalDashboard.averageCpp * (1.15 - index * 0.025)),
        delivered: Math.min(92, inputs.deliveredRate + index * 1.4),
        rts: Math.max(8, inputs.rtsRate - index * 1.2),
      };
    });
  }, [globalDashboard, metrics.revenue, inputs.adSpend, inputs.deliveredRate, inputs.rtsRate]);

  const testComparison = useMemo(() => {
    const tests = currentProjectTests;
    if (tests.length === 0) {
      return {
        bestCTR: null,
        bestCPP: null,
        bestROAS: null,
        bestProfit: null,
        winners: 0,
        promising: 0,
        weak: 0,
        bestAudience: "No data",
        bestCreative: "No data",
        bestHook: "No data",
        nextTestSuggestion: "Save at least one test snapshot to start comparing angles, CPP, ROAS, and profitability.",
        recommendation: "Save at least one test snapshot to start comparing angles, CPP, ROAS, and profitability.",
      };
    }

    const bestCTR = [...tests].sort((a, b) => Number(b.ctr || 0) - Number(a.ctr || 0))[0];
    const bestCPP = [...tests].sort((a, b) => Number(a.cpp || 999999) - Number(b.cpp || 999999))[0];
    const bestROAS = [...tests].sort((a, b) => Number(b.roas || 0) - Number(a.roas || 0))[0];
    const bestProfit = [...tests].sort((a, b) => Number(b.projectedProfit || 0) - Number(a.projectedProfit || 0))[0];
    const winners = tests.filter((test) => test.result === "WINNER").length;
    const promising = tests.filter((test) => test.result === "PROMISING").length;
    const weak = tests.filter((test) => test.result === "WEAK").length;

    const scoreGroup = (key) => {
      const groups = {};
      tests.forEach((test) => {
        const value = test[key] || "Unknown";
        if (!groups[value]) groups[value] = { label: value, count: 0, profit: 0, roas: 0, ctr: 0 };
        groups[value].count += 1;
        groups[value].profit += Number(test.projectedProfit || 0);
        groups[value].roas += Number(test.roas || 0);
        groups[value].ctr += Number(test.ctr || 0);
      });
      return Object.values(groups).sort((a, b) => (b.profit / b.count + b.roas / b.count * 100) - (a.profit / a.count + a.roas / a.count * 100))[0]?.label || "No data";
    };

    const bestAudience = scoreGroup("audience");
    const bestCreative = scoreGroup("creativeName");
    const bestHook = scoreGroup("hook");

    let recommendation = "Keep saving tests so the system can detect a stronger winning pattern.";
    let nextTestSuggestion = "Run one controlled test where only one variable changes: creative, hook, audience, offer, or landing page.";

    if (bestProfit?.id === bestROAS?.id && bestProfit?.id === bestCPP?.id) {
      recommendation = `Strong winner detected: ${bestProfit.angle}. It has the best profitability balance across ROAS, CPP, and projected profit.`;
      nextTestSuggestion = `Controlled scale test: keep ${bestProfit.creativeName || "the winning creative"}, keep ${bestProfit.audience || "the winning audience"}, and increase budget carefully while monitoring CPP.`;
    } else if (bestCTR?.id !== bestProfit?.id) {
      recommendation = `Attention and profit are not aligned yet. ${bestCTR?.angle || "One angle"} gets attention, but ${bestProfit?.angle || "another angle"} creates better profit. Test a hybrid angle next.`;
      nextTestSuggestion = `Hybrid test: combine the hook style from ${bestCTR?.creativeName || "the best CTR creative"} with the offer/audience setup from ${bestProfit?.creativeName || "the best profit creative"}.`;
    } else if (winners > 0) {
      recommendation = `Winner pattern detected. Prioritize scaling or controlled retest around ${bestProfit?.angle || "the best angle"}.`;
      nextTestSuggestion = `Retest winner against one new creative variation. Do not change audience and offer yet.`;
    }

    return { bestCTR, bestCPP, bestROAS, bestProfit, winners, promising, weak, bestAudience, bestCreative, bestHook, nextTestSuggestion, recommendation };
  }, [currentProjectTests]);

  const aiLearningInsight = useMemo(() => {
    if (currentProjectTests.length < 2) {
      return {
        summary: "Not enough test history yet.",
        recommendation: "Save more tests so the AI can detect patterns and winning psychology.",
      };
    }

    const winners = currentProjectTests.filter((test) => test.result === "WINNER");
    const fearWins = winners.filter((test) => test.angle === "Fear Based").length;
    const familyWins = winners.filter((test) => test.angle === "Family Concern").length;
    const hopeWins = winners.filter((test) => test.angle === "Hope Based").length;

    let bestAngle = "Fear Based";
    let highest = fearWins;

    if (familyWins > highest) {
      bestAngle = "Family Concern";
      highest = familyWins;
    }

    if (hopeWins > highest) {
      bestAngle = "Hope Based";
    }

    return {
      summary: `Detected strongest response from ${bestAngle} psychology angle.`,
      recommendation: `Recommended next move: keep the ${bestAngle} emotional direction, then test softer CTA and stronger trust progression.`
    };
  }, [currentProjectTests]);

  const update = (key, value) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };

  if (authLoading || workspaceLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
            <BrainCircuit size={28} />
          </div>
          <h1 className="text-2xl font-black">Spryve Intelligence System</h1>
          <p className="mt-2 text-sm text-slate-400">Checking account and workspace access...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return null;
  }

  if (authUser?.user_metadata?.force_password_change) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900 shadow-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Lock size={28} />
          </div>
          <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-50">Security Required</Badge>
          <h1 className="text-3xl font-black">Change your temporary password</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Your account was created using a temporary password. Please create your own password before accessing the workspace.
          </p>

          <div className="mt-6 space-y-4">
            <Input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="New password"
              className="h-12 rounded-xl border-slate-200 bg-white"
            />
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
              placeholder="Confirm new password"
              className="h-12 rounded-xl border-slate-200 bg-white"
            />

            {passwordUpdateError ? <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{passwordUpdateError}</p> : null}

            <Button onClick={completePasswordChange} disabled={passwordUpdateLoading} className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700">
              {passwordUpdateLoading ? "Updating password..." : "Save New Password"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (needsWorkspaceSetup) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white p-8 text-slate-900 shadow-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <BrainCircuit size={28} />
          </div>
          <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-50">First Workspace Setup</Badge>
          <h1 className="text-3xl font-black">Create your Spryve workspace</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This workspace will store your own ads reports, products, creatives, tests, and team access. Other teams cannot see this workspace.
          </p>

          <div className="mt-6 space-y-4">
            <label className="space-y-1 block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Workspace Name</span>
              <Input
                value={setupWorkspaceName}
                onChange={(event) => setSetupWorkspaceName(event.target.value)}
                placeholder="Example: Markuz Team / Partner Brand Name"
                className="h-12 rounded-xl border-slate-200 bg-white"
              />
            </label>

            {setupError ? <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{setupError}</p> : null}

            <Button onClick={createFounderWorkspace} disabled={setupSaving} className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700">
              {setupSaving ? "Creating workspace..." : "Create Workspace"}
            </Button>

            <div className="rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
              <b>Next after setup:</b> add products, submit ad reports, save test snapshots, and invite marketers/graphic artists from Marketing Team.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "min-h-screen bg-slate-950 text-slate-100" : "min-h-screen bg-slate-100 text-slate-900"}>
      <div className="flex min-h-screen">
        <aside className={(sidebarOpen ? "translate-x-0" : "-translate-x-full") + " fixed inset-y-0 left-0 z-40 w-80 border-r border-white/10 bg-slate-950/95 p-4 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0"}>
          <div className="mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-emerald-500/10 p-5 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
              <BrainCircuit size={28} />
            </div>
            <h2 className="text-xl font-black text-white">Spryve Intelligence System</h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">Ads data → diagnosis → actions → scaling decisions</p>
          </div>

          <div className="space-y-5">
            {visibleSidebarSections.map((section) => (
              <div key={section.section}>
                <button
                  onClick={() => section.section !== "Command" && setCollapsedSections((prev) => ({ ...prev, [section.section]: !prev[section.section] }))}
                  className="mb-2 flex w-full items-center justify-between rounded-xl px-2 py-1 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 hover:bg-white/5"
                >
                  <span>{section.section}</span>
                  {section.section === "Command" ? null : collapsedSections[section.section] ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                </button>
                <div className={(collapsedSections[section.section] && section.section !== "Command") ? "hidden" : "space-y-2"}>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeMainTab === item.value;
                    return (
                      <button key={item.label} onClick={() => { setActiveMainTab(item.value); setSidebarOpen(false); }} className={isActive ? "group flex w-full items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-left text-cyan-100 shadow-lg" : "group flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-left text-slate-300 hover:bg-white/[0.07]"}>
                        <div className={isActive ? "rounded-xl bg-cyan-400/20 p-2 text-cyan-200" : "rounded-xl bg-white/5 p-2 text-slate-400 group-hover:text-cyan-200"}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.hint}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-200">Active Workspace</p>
            <p className="mt-2 font-black text-white">{inputs.workspace}</p>
            {reportProduct ? <p className="mt-1 text-xs text-slate-400">{reportProduct}</p> : null}
          </div>
        </aside>

        {sidebarOpen ? <button className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden" onClick={() => setSidebarOpen(false)} /> : null}

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl md:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Button onClick={() => setSidebarOpen(true)} variant="outline" className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 lg:hidden">
                  <Menu size={18} />
                </Button>
                <div>
                  <p className="text-xs text-slate-400">Performance Intelligence Layout</p>
                  <h1 className="text-lg font-black text-white md:text-xl">Spryve Intelligence System</h1>
                </div>
              </div>

              <div className="hidden min-w-[260px] items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-slate-400 md:flex">
                <Search size={16} />
                <span className="text-xs">Search projects, tasks, products...</span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10">
                  <Bell size={17} />
                </Button>
                <Button onClick={() => setIsDarkMode((current) => !current)} variant="outline" className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10">
                  {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
                </Button>
                <Button onClick={logout} variant="outline" className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10">
                  Logout
                </Button>
                <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 md:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/20 text-cyan-100">
                    <UserCircle2 size={20} />
                  </div>
                  <div>
                    <select value={currentUser} onChange={(event) => setCurrentUser(event.target.value)} className="bg-transparent text-xs font-bold text-white outline-none">
                      {activeWorkspaceMembers.map((member) => <option key={member.id} value={member.name} className="text-slate-900">{member.name}</option>)}
                    </select>
                    <p className="text-[10px] text-slate-400">{currentUserRole} View</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 p-6 shadow-2xl"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              {(inputs.workspace || reportProduct) ? (
                <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-100">
                  Active: {inputs.workspace || "No workspace"}{reportProduct ? ` / ${reportProduct}` : " / No product selected"}
                </div>
              ) : null}
              <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">Spryve Intelligence System</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                AI strategist for ecommerce ads, landing page optimization, profitability checks, creative intelligence, and systematic scaling decisions based on actual data.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><Brain size={18} /> AI Strategist</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><LineChart size={18} /> Ads Testing Lab</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><DollarSign size={18} /> Profitability Engine</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><TrendingUp size={18} /> Scaling Center</div>
            </div>
          </div>
        </motion.div>

        <div className={showTestInputPanel ? "grid gap-5 lg:grid-cols-[360px_1fr]" : "grid gap-5"}>
          {showTestInputPanel ? (
          <Card className="rounded-[2rem] border-white/10 bg-white text-slate-900 shadow-xl">
            <CardContent className="p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold"><DollarSign size={20} /> Test Inputs</h2>
              <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-blue-700">Workspace / Project Scope</p>
                <div className="grid gap-3">
                  <InputField label="Workspace" type="text" value={inputs.workspace} onChange={(value) => update("workspace", value)} />
                  <InputField label="Project" type="text" value={inputs.project} onChange={(value) => update("project", value)} />
                </div>
                <p className="mt-3 text-xs leading-5 text-blue-800">Saved tests are grouped by this scope, so different teams/products stay separated.</p>
              </div>
              <div className="grid gap-3">
                <InputField label="Product" type="text" value={inputs.product} onChange={(value) => update("product", value)} />
                <InputField label="Ad Angle" type="text" value={inputs.angle} onChange={(value) => update("angle", value)} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Selling Price" value={inputs.sellingPrice} onChange={(value) => update("sellingPrice", value)} />
                  <InputField label="COGS" value={inputs.cogs} onChange={(value) => update("cogs", value)} />
                  <InputField label="Shipping" value={inputs.shipping} onChange={(value) => update("shipping", value)} />
                  <InputField label="Fulfillment" value={inputs.fulfillment} onChange={(value) => update("fulfillment", value)} />
                  <InputField label="Packaging" value={inputs.packaging} onChange={(value) => update("packaging", value)} />
                  <InputField label="Insurance" value={inputs.insurance} onChange={(value) => update("insurance", value)} />
                  <InputField label="COD %" value={inputs.codRate} onChange={(value) => update("codRate", value)} />
                  <InputField label="VAT %" value={inputs.vatRate} onChange={(value) => update("vatRate", value)} />
                  <InputField label="OPEX %" value={inputs.opexRate} onChange={(value) => update("opexRate", value)} />
                  <InputField label="Ad Spend" value={inputs.adSpend} onChange={(value) => update("adSpend", value)} />
                  <InputField label="Impressions" value={inputs.impressions} onChange={(value) => update("impressions", value)} />
                  <InputField label="Clicks" value={inputs.clicks} onChange={(value) => update("clicks", value)} />
                  <InputField label="ATC" value={inputs.atc} onChange={(value) => update("atc", value)} />
                  <InputField label="Checkout" value={inputs.checkouts} onChange={(value) => update("checkouts", value)} />
                  <InputField label="Orders" value={inputs.orders} onChange={(value) => update("orders", value)} />
                  <InputField label="Delivered %" value={inputs.deliveredRate} onChange={(value) => update("deliveredRate", value)} />
                </div>
              </div>
            </CardContent>
          </Card>
          ) : null}

          <div className="space-y-5">
            {showTestInputPanel ? (
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard icon={MousePointerClick} label="CTR" value={formatPercent(metrics.ctr)} sub="Attention signal" tone={metrics.ctr >= 2.5 ? "green" : "amber"} />
              <StatCard icon={TrendingUp} label="CVR" value={formatPercent(metrics.cvr)} sub={metrics.noAtcMode ? "No-ATC order CVR" : "Click to order"} tone={metrics.cvr >= 3 ? "green" : "red"} />
              <StatCard icon={DollarSign} label="ROAS" value={metrics.roas.toFixed(2)} sub={"BE ROAS: " + metrics.beRoas.toFixed(2)} tone={metrics.roas >= metrics.beRoas ? "green" : "red"} />
              <StatCard icon={LineChart} label="Projected Profit" value={formatPeso(metrics.projectedProfit)} sub="After RTS estimate" tone={metrics.projectedProfit >= 0 ? "green" : "red"} />
            </div>
            ) : null}

            <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
              <TabsList className="hidden">
                <TabsTrigger value="diagnosis" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Diagnosis</TabsTrigger>
                <TabsTrigger value="plan" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Action Plan</TabsTrigger>
                <TabsTrigger value="test" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Next Test</TabsTrigger>
                <TabsTrigger value="profitability" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Profitability Engine</TabsTrigger>
                <TabsTrigger value="flow" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Landing Page Analyzer</TabsTrigger>
                <TabsTrigger value="variation" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Variations</TabsTrigger>
                <TabsTrigger value="learning" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">AI Learning</TabsTrigger>
                <TabsTrigger value="team" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Team OS</TabsTrigger>
                <TabsTrigger value="campaigns" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Campaigns</TabsTrigger>
                <TabsTrigger value="dailyops" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Daily Ops</TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Tasks</TabsTrigger>
                <TabsTrigger value="workspace" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Product Workspace</TabsTrigger>
                <TabsTrigger value="cloud" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Cloud Setup</TabsTrigger>
                <TabsTrigger value="helpcenter" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900">Help Center</TabsTrigger>
              </TabsList>

              <TabsContent value="diagnosis" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div>
                          <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-50">1. Global Performance Overview</Badge>
                          <h2 className="text-3xl font-black">Founder Dashboard</h2>
                          <p className="mt-2 max-w-3xl text-slate-600">Quick answer: profitable ba, healthy ba, may problema ba, at may pwede bang i-scale across all products.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["Today", "7 Days", "15 Days", "30 Days"].map((range) => (
                            <Button key={range} onClick={() => setDashboardRange(range)} variant={dashboardRange === range ? "default" : "outline"} className={dashboardRange === range ? "rounded-xl bg-blue-600" : "rounded-xl bg-white"}>{range}</Button>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard icon={DollarSign} label="Gross Revenue" value={formatPeso(globalDashboard.revenue)} sub={`${dashboardRange} • delivered ${formatPeso(globalDashboard.deliveredRevenue)}`} tone="green" />
                        <StatCard icon={TrendingUp} label="Estimated Net" value={formatPeso(globalDashboard.profit)} sub={`Net margin ${formatPercent(globalDashboard.revenue ? (globalDashboard.profit / globalDashboard.revenue) * 100 : 0)}`} tone={globalDashboard.profit >= 0 ? "green" : "red"} />
                        <StatCard icon={LineChart} label="Blended ROAS" value={globalDashboard.blendedRoas.toFixed(2)} sub={`Spend ${formatPeso(globalDashboard.spend)}`} tone={globalDashboard.blendedRoas >= 3 ? "green" : globalDashboard.blendedRoas >= 2 ? "amber" : "red"} />
                        <StatCard icon={MousePointerClick} label="Average CPP" value={formatPeso(globalDashboard.averageCpp)} sub={`CTR ${formatPercent(globalDashboard.avgCtr)}`} tone={globalDashboard.averageCpp <= metrics.safeCPP ? "green" : "amber"} />
                        <StatCard icon={ShieldCheck} label="Delivered %" value={formatPercent(inputs.deliveredRate)} sub={`Pending revenue ${formatPeso(globalDashboard.pendingRevenue)}`} tone={inputs.deliveredRate >= 70 ? "green" : "amber"} />
                        <StatCard icon={AlertTriangle} label="RTS %" value={formatPercent(inputs.rtsRate)} sub="COD health risk" tone={inputs.rtsRate <= 20 ? "green" : inputs.rtsRate <= 30 ? "amber" : "red"} />
                        <StatCard icon={CheckCircle2} label="Confirmation Rate" value={formatPercent(Math.max(0, 100 - inputs.rtsRate))} sub="Buyer quality proxy" tone={inputs.rtsRate <= 25 ? "green" : "amber"} />
                        <StatCard icon={BrainCircuit} label="Scaling Status" value={globalDashboard.scalingStatus} sub={`${globalDashboard.activeWinners} active winners • ${formatPercent(globalDashboard.winRate)} win rate`} tone={globalDashboard.scalingStatus === "Stable" ? "green" : globalDashboard.scalingStatus === "Warning" ? "amber" : "red"} />
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-4">
                        <Button onClick={() => setActiveMainTab("learning")} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">View Winners</Button>
                        <Button onClick={() => setActiveMainTab("learning")} className="rounded-xl bg-blue-600 hover:bg-blue-700">Launch Testing</Button>
                        <Button onClick={() => setActiveMainTab("variation")} className="rounded-xl bg-violet-600 hover:bg-violet-700">Analyze Creatives</Button>
                        <Button onClick={() => setActiveMainTab("test")} className="rounded-xl bg-slate-900 hover:bg-slate-800">Open Scaling Center</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
                    <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-cyan-50 text-cyan-700 hover:bg-cyan-50">4. Performance Trend Charts</Badge>
                        <h2 className="text-2xl font-black">Visual Intelligence</h2>
                        <p className="mt-2 text-sm text-slate-600">Revenue, ROAS, CPP, Delivered, and RTS movement snapshot.</p>

                        <div className="mt-5 grid gap-4 lg:grid-cols-2">
                          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                            <p className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-500">Revenue Trend</p>
                            <div className="flex h-40 items-end gap-2">
                              {performanceTrend.map((item) => (
                                <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                                  <div className="w-full rounded-t-xl bg-blue-500" style={{ height: `${Math.max(16, Math.min(150, (item.revenue / Math.max(...performanceTrend.map((x) => x.revenue))) * 135))}px` }} />
                                  <span className="text-[10px] text-slate-500">{item.day}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                            <p className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-500">ROAS / CPP / COD Health</p>
                            <div className="space-y-3">
                              {performanceTrend.slice(-5).map((item) => (
                                <div key={item.day} className="rounded-2xl bg-white p-3 shadow-sm">
                                  <div className="mb-2 flex items-center justify-between text-xs"><b>{item.day}</b><span>ROAS {item.roas.toFixed(2)} • CPP {formatPeso(item.cpp)}</span></div>
                                  <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.max(10, Math.min(100, item.delivered))}%` }} /></div>
                                  <p className="mt-1 text-[10px] text-slate-500">Delivered {formatPercent(item.delivered)} • RTS {formatPercent(item.rts)}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-violet-50 text-violet-700 hover:bg-violet-50">2. AI Intelligence Signals</Badge>
                        <h2 className="text-2xl font-black">AI Founder Assistant</h2>
                        <div className="mt-5 space-y-3">
                          {intelligenceSignals.map((signal, index) => (
                            <div key={index} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <p className="font-black text-slate-900">{signal.title}</p>
                                <Badge className={signal.level === "Critical" ? "bg-rose-50 text-rose-700" : signal.level === "Warning" ? "bg-amber-50 text-amber-700" : signal.level === "Opportunity" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}>{signal.level}</Badge>
                              </div>
                              <p className="text-sm leading-6 text-slate-600">{signal.message}</p>
                              <Button variant="outline" className="mt-3 rounded-xl bg-white px-3 py-2 text-xs">{signal.action}</Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                        <div>
                          <Badge className="mb-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">3. Product Leaderboard</Badge>
                          <h2 className="text-2xl font-black">Product Intelligence Ranking</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Winner", "Stable", "Testing", "Kill"].map((filter) => (
                            <Button key={filter} onClick={() => setLeaderboardFilter(filter)} variant={leaderboardFilter === filter ? "default" : "outline"} className={leaderboardFilter === filter ? "rounded-xl bg-emerald-600" : "rounded-xl bg-white"}>{filter}</Button>
                          ))}
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-slate-100">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50 text-slate-500">
                            <tr>
                              <th className="px-4 py-3 text-left">Product</th><th className="px-4 py-3 text-left">Revenue</th><th className="px-4 py-3 text-left">Spend</th><th className="px-4 py-3 text-left">ROAS</th><th className="px-4 py-3 text-left">CPP</th><th className="px-4 py-3 text-left">CTR</th><th className="px-4 py-3 text-left">Delivered / RTS</th><th className="px-4 py-3 text-left">AI Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dashboardProducts.filter((item) => leaderboardFilter === "All" || item.status === leaderboardFilter).map((item) => (
                              <tr key={item.product} className="border-t border-slate-100">
                                <td className="px-4 py-3"><p className="font-black text-slate-900">{item.product}</p><p className="text-xs text-slate-500">Trend: {item.trend}</p></td>
                                <td className="px-4 py-3">{formatPeso(item.revenue)}</td><td className="px-4 py-3">{formatPeso(item.spend)}</td><td className="px-4 py-3 font-bold">{item.roas.toFixed(2)}</td><td className="px-4 py-3">{formatPeso(item.cpp)}</td><td className="px-4 py-3">{formatPercent(item.ctr)}</td><td className="px-4 py-3">{formatPercent(item.delivered)} / {formatPercent(item.rts)}</td>
                                <td className="px-4 py-3"><Badge className={item.status === "Winner" ? "bg-emerald-50 text-emerald-700" : item.status === "Stable" ? "bg-blue-50 text-blue-700" : item.status === "Testing" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}>{item.status}</Badge></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-5 lg:grid-cols-2">
                    <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-50">5. AI Decision Engine</Badge>
                        <h2 className="text-2xl font-black">Founder Decision Assistant</h2>
                        <div className="mt-5 space-y-3">
                          {dashboardProducts.slice(0, 3).map((item) => {
                            const decision = item.status === "Winner" ? "SCALE" : item.status === "Stable" ? "HOLD" : item.status === "Testing" ? "RETEST" : "KILL PRODUCT";
                            return (
                              <div key={item.product} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                                <div className="flex items-center justify-between gap-3"><p className="text-lg font-black text-slate-900">{item.product}</p><Badge className={decision === "SCALE" ? "bg-emerald-50 text-emerald-700" : decision === "HOLD" ? "bg-blue-50 text-blue-700" : decision === "RETEST" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}>{decision}</Badge></div>
                                <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                                  <p>• ROAS {item.roas.toFixed(2)} with CPP {formatPeso(item.cpp)}</p>
                                  <p>• Delivered {formatPercent(item.delivered)} and RTS {formatPercent(item.rts)}</p>
                                  <p>• Recommended: {decision === "SCALE" ? "Increase budget 20%, duplicate to CBO, launch new hooks." : decision === "HOLD" ? "Monitor CPM and refresh opening hook." : decision === "RETEST" ? "Test new angle and improve LP trust flow." : "Stop spend or rebuild offer/creative from scratch."}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-violet-50 text-violet-700 hover:bg-violet-50">6. Creative Intelligence</Badge>
                        <h2 className="text-2xl font-black">Creative AI Analysis</h2>
                        <div className="mt-5 grid gap-3 md:grid-cols-2">
                          {["Winning Hook", "Emotional", "Authority", "Curiosity", "Fear", "UGC", "Native Style", "Soft Sell"].map((tag, index) => (
                            <div key={tag} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                              <p className="font-bold text-slate-900">{tag}</p>
                              <p className="mt-1 text-xs text-slate-500">Score {Math.max(61, 92 - index * 4)}%</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 rounded-3xl bg-violet-50 p-5 text-sm leading-6 text-slate-700">
                          <b>AI Insight:</b> Emotional nanay/family concern angle is currently the strongest creative direction. UGC native style should be tested against fear-based hook.
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-amber-50 text-amber-700 hover:bg-amber-50">7. Testing Control Center</Badge>
                      <h2 className="text-2xl font-black">Testing Management System</h2>
                      <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {[
                          { title: "₱300/day Testing", desc: "1 campaign • 1 adset • 5 creatives", checks: "₱150 / ₱300 / ₱500 checkpoints" },
                          { title: "₱500/day Testing", desc: "More aggressive creative validation", checks: "₱250 / ₱500 / ₱750 checkpoints" },
                          { title: "₱1000/day Testing", desc: "Fast scaling environment", checks: "₱500 / ₱1000 / ₱1500 checkpoints" },
                        ].map((mode) => (
                          <div key={mode.title} className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                            <h3 className="font-black text-slate-900">{mode.title}</h3>
                            <p className="mt-2 text-sm text-slate-600">{mode.desc}</p>
                            <p className="mt-3 rounded-2xl bg-white p-3 text-xs font-bold text-amber-800">{mode.checks}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 grid gap-3 md:grid-cols-4">
                        <ScoreBar label="Testing Score" value={funnelScores.overall} note="Overall test quality" />
                        <ScoreBar label="Scale Score" value={funnelScores.profitStrength} note="Profit + ROAS safety" />
                        <ScoreBar label="Stability Score" value={funnelScores.buyerIntent} note="Buyer quality" />
                        <ScoreBar label="Risk Score" value={10 - funnelScores.rtsRiskScore} note="Lower is safer" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="plan" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-violet-50 text-violet-700 hover:bg-violet-50">AI Strategic Recommendation Engine</Badge>
                          <h2 className="text-2xl font-black">Dynamic Action Plan</h2>
                          <p className="mt-2 text-slate-600">The system analyzes awareness, metrics, buyer psychology, and profitability to generate strategic fixes.</p>
                        </div>
                        <div className="rounded-3xl bg-violet-50 p-4 text-violet-700"><Sparkles size={30} /></div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                        <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-violet-600">Detected Strategic Weakness</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">{diagnosis.status}</h3>
                            </div>
                            <Badge className="bg-white text-violet-700 hover:bg-white">AI Consultant Mode</Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Likely Root Cause</p>
                              <p className="mt-2 text-sm leading-6 text-slate-700">{metrics.ctr >= 2.5 && metrics.cvr < 3 ? "The ad creates emotional curiosity, but the landing page is not building enough trust and belief before asking for purchase." : metrics.ctr < 1.5 ? "The ad hook is not emotionally interrupting the target buyer strongly enough." : metrics.roas < metrics.beRoas ? "Current profitability is weak because perceived value and buyer quality are not strong enough." : "The funnel is healthy but still needs controlled optimization before aggressive scaling."}</p>
                            </div>

                            <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Buyer Psychology Insight</p>
                              <p className="mt-2 text-sm leading-6 text-slate-700">{awareness.stage.includes("Problem") ? "Buyer is emotionally affected already, but still needs reassurance and proof before buying." : awareness.stage.includes("Solution") ? "Buyer is actively looking for a believable solution and needs mechanism clarity." : awareness.stage.includes("Product") ? "Buyer already knows the product and is now evaluating legitimacy and proof." : awareness.stage.includes("Most") ? "Buyer is ready to purchase but needs urgency and friction reduction." : "Buyer still needs awareness awakening before selling aggressively."}</p>
                            </div>

                            <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Expected Improvement</p>
                              <p className="mt-2 text-sm leading-6 text-slate-700">Potential lift: <b>{metrics.ctr >= 2.5 && metrics.cvr < 3 ? "+15% to +30% CVR" : metrics.ctr < 1.5 ? "+20% CTR potential" : metrics.roas < metrics.beRoas ? "Higher profitability stability" : "Safer scaling performance"}</b> if recommended changes are implemented properly.</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">AI Priority Focus</p>
                          <div className="mt-4 space-y-3">
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs text-slate-500">Primary Optimization</p>
                              <p className="mt-1 font-bold text-slate-900">{metrics.ctr >= 2.5 && metrics.cvr < 3 ? "Trust Progression" : metrics.ctr < 1.5 ? "Hook Engineering" : metrics.roas < metrics.beRoas ? "Offer Optimization" : "Scaling Control"}</p>
                            </div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs text-slate-500">Recommended LP Flow</p>
                              <p className="mt-1 font-bold text-slate-900">{awareness.flow}</p>
                            </div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs text-slate-500">Risk Level</p>
                              <p className="mt-1 font-bold text-slate-900">{inputs.rtsRate >= 30 ? "High RTS Risk" : "Controlled Risk"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <ActionItem title="Fix Trust Progression" priority="HIGH" body="Move testimonials and proof before the pricing section. Add senior-friendly testimonial cards, COD badge, and clear local support line." />
                    <ActionItem title="Adjust CTA Psychology" priority="HIGH" body="Replace hard CTA like ORDER NOW with softer health CTA: Alagaan Ang Paningin Ngayon. Keep COD visible beside the CTA." />
                    <ActionItem title="Strengthen Awareness Match" priority="MEDIUM" body="If the ad uses fear of blindness, the landing page should continue with fear to education to proof to offer, not product pitch agad." />
                    <ActionItem title="Protect Buyer Quality" priority="MEDIUM" body="Add expectation-setting copy before checkout to reduce impulse buyers and RTS." />
                  </div>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                          <h2 className="text-2xl font-black">Exact Recommended Actions</h2>
                          <p className="mt-2 text-sm text-slate-600">Step-by-step strategic fixes generated by the AI consultant engine.</p>
                        </div>
                        <Button className="rounded-xl bg-violet-600 hover:bg-violet-700"><Sparkles size={16} className="mr-2" /> Generate More Fixes</Button>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 font-black">1</div>
                            <div>
                              <h3 className="font-bold text-slate-900">Rebuild Trust Immediately After Hero</h3>
                              <p className="text-sm text-slate-500">Priority: High Impact</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm leading-6 text-slate-700">
                            <p>• Add emotional testimonial section directly after hero.</p>
                            <p>• Use senior-focused visuals and local Filipino proof.</p>
                            <p>• Add COD reassurance beside first CTA.</p>
                            <p>• Add “Hindi kailangan agad operation” soft expectation-setting angle.</p>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 font-black">2</div>
                            <div>
                              <h3 className="font-bold text-slate-900">Align The Landing Page With The Ad Emotion</h3>
                              <p className="text-sm text-slate-500">Psychology Continuity</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm leading-6 text-slate-700">
                            <p>• Continue the fear/emotional tension from the ad before introducing the product.</p>
                            <p>• Add “possible consequence” storytelling section.</p>
                            <p>• Delay aggressive selling until belief is built.</p>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-black">3</div>
                            <div>
                              <h3 className="font-bold text-slate-900">Reduce RTS Risk</h3>
                              <p className="text-sm text-slate-500">Buyer Qualification Layer</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm leading-6 text-slate-700">
                            <p>• Add “What To Expect” section before checkout.</p>
                            <p>• Add realistic support positioning instead of miracle claims.</p>
                            <p>• Add expectation copy to filter impulsive buyers.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="flow" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-cyan-50 text-cyan-700 hover:bg-cyan-50">Conversion Timing Intelligence</Badge>
                          <h2 className="text-2xl font-black">Landing Page Strategy Analyzer</h2>
                          <p className="mt-2 text-slate-600">The system analyzes landing page flow, product timing, CTA timing, trust progression, and order form placement based on buyer psychology and actual ad performance.</p>
                        </div>
                        <div className="rounded-3xl bg-cyan-50 p-4 text-cyan-700"><Brain size={30} /></div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
                        <div className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-5">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Detected Ideal LP Flow</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">{awareness.stage} Conversion Structure</h3>
                            </div>
                            <Badge className="bg-white text-cyan-700 hover:bg-white">AI Flow Engine</Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 font-black text-blue-700">1</div>
                              <div>
                                <p className="font-bold text-slate-900">Pattern Interrupt Hero</p>
                                <p className="text-sm text-slate-500">Emotional interruption + symptom awareness</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 font-black text-rose-700">2</div>
                              <div>
                                <p className="font-bold text-slate-900">Pain + Consequence Section</p>
                                <p className="text-sm text-slate-500">Increase emotional seriousness</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 font-black text-amber-700">3</div>
                              <div>
                                <p className="font-bold text-slate-900">Education / Root Cause</p>
                                <p className="text-sm text-slate-500">Build belief before selling</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border-2 border-cyan-300 bg-cyan-50 p-4 shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-100 font-black text-cyan-700">4</div>
                              <div>
                                <p className="font-bold text-slate-900">RECOMMENDED PRODUCT INTRODUCTION</p>
                                <p className="text-sm text-slate-600">Best timing to reveal the product</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-700">5</div>
                              <div>
                                <p className="font-bold text-slate-900">Proof + Testimonials</p>
                                <p className="text-sm text-slate-500">Reduce skepticism before pricing</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-700">6</div>
                              <div>
                                <p className="font-bold text-slate-900">RECOMMENDED OFFER + ORDER FORM</p>
                                <p className="text-sm text-slate-600">Safest conversion timing</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 font-black text-violet-700">7</div>
                              <div>
                                <p className="font-bold text-slate-900">FAQ + Objection Handling</p>
                                <p className="text-sm text-slate-500">Final belief reinforcement</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Product Placement Timing</p>
                            <h3 className="mt-2 text-xl font-black text-slate-900">Section 4</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Buyer still needs emotional validation and education before seeing the product. Early product placement may reduce emotional buildup.</p>
                          </div>

                          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Order Form Timing</p>
                            <h3 className="mt-2 text-xl font-black text-slate-900">After Testimonials + FAQ</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Current awareness level still has skepticism risk. Product pricing and checkout should only appear after proof and trust reinforcement.</p>
                          </div>

                          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                            <div className="mb-3 flex items-center gap-2 text-amber-800">
                              <AlertTriangle size={18} />
                              <p className="font-bold">Conversion Risk Warning</p>
                            </div>
                            <p className="text-sm leading-6 text-amber-800">Placing the pricing or order form too early may reduce trust progression and increase impulsive COD orders.</p>
                          </div>

                          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">AI Recommendation</p>
                            <p className="mt-2 text-sm leading-6 text-blue-900">Delay aggressive selling until emotional concern, education, and proof are established. This structure is optimized for Problem Aware Filipino COD buyers.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                          <h2 className="text-2xl font-black">LP Improvement Planner</h2>
                          <p className="mt-2 text-sm text-slate-600">Generate strategic improvement notes for each landing page section based on the detected psychology flow.</p>
                        </div>
                        <Button onClick={generateFullLPFlow} className="rounded-xl bg-cyan-600 hover:bg-cyan-700"><Sparkles size={16} className="mr-2" /> Generate Full LP Flow</Button>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Button onClick={() => setGenerated("hero")} className="h-20 rounded-2xl bg-blue-600 text-left hover:bg-blue-700"><div><p className="text-xs opacity-80">Generate</p><p className="font-bold">Hero Section</p></div></Button>
                        <Button onClick={() => setGenerated("pain")} className="h-20 rounded-2xl bg-rose-600 text-left hover:bg-rose-700"><div><p className="text-xs opacity-80">Generate</p><p className="font-bold">Pain Section</p></div></Button>
                        <Button onClick={() => setGenerated("education")} className="h-20 rounded-2xl bg-amber-600 text-left hover:bg-amber-700"><div><p className="text-xs opacity-80">Generate</p><p className="font-bold">Education Section</p></div></Button>
                        <Button onClick={() => setGenerated("hero")} className="h-20 rounded-2xl bg-cyan-600 text-left hover:bg-cyan-700"><div><p className="text-xs opacity-80">Generate</p><p className="font-bold">Product Intro</p></div></Button>
                        <Button onClick={() => setGenerated("trust")} className="h-20 rounded-2xl bg-emerald-600 text-left hover:bg-emerald-700"><div><p className="text-xs opacity-80">Generate</p><p className="font-bold">Trust Section</p></div></Button>
                        <Button onClick={() => setGenerated("offer")} className="h-20 rounded-2xl bg-violet-600 text-left hover:bg-violet-700"><div><p className="text-xs opacity-80">Generate</p><p className="font-bold">Offer Stack</p></div></Button>
                        <Button onClick={() => setGenerated("faq")} className="h-20 rounded-2xl bg-slate-800 text-left hover:bg-slate-700"><div><p className="text-xs opacity-80">Generate</p><p className="font-bold">FAQ</p></div></Button>
                        <Button onClick={() => setGenerated("cta")} className="h-20 rounded-2xl bg-cyan-800 text-left hover:bg-cyan-900"><div><p className="text-xs opacity-80">Generate</p><p className="font-bold">Final CTA</p></div></Button>
                      </div>

                      {fullLPOutput ? (
                        <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50/70 p-5">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Full LP Output</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">AI Generated Full Landing Page Structure</h3>
                            </div>
                            <Badge className="bg-white text-blue-700 hover:bg-white">Full LP Engine</Badge>
                          </div>
                          <textarea
                            readOnly
                            value={fullLPOutput}
                            className="min-h-[500px] w-full resize-none rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm outline-none"
                          />
                        </div>
                      ) : null}

                      <div className="mt-5 rounded-3xl border border-cyan-100 bg-cyan-50/70 p-5">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Generated Section Preview</p>
                            <h3 className="mt-1 text-xl font-black text-slate-900">{selectedAsset.title}</h3>
                          </div>
                          <Badge className="bg-white text-cyan-700 hover:bg-white">{selectedAsset.type}</Badge>
                        </div>
                        <pre className="whitespace-pre-wrap rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">{selectedAsset.content}</pre>
                        {selectedAsset.imagePrompt ? (
                          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Image Prompt</p>
                            <p className="text-xs leading-5 text-slate-600">{selectedAsset.imagePrompt}</p>
                          </div>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="variation" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-violet-50 text-violet-700 hover:bg-violet-50">Creative Intelligence Engine</Badge>
                          <h2 className="text-2xl font-black">Creative Intelligence Tracker</h2>
                          <p className="mt-2 text-slate-600">Track and compare buyer psychology directions, winning angles, hooks, and creative fatigue signals.</p>
                        </div>
                        <div className="rounded-3xl bg-violet-50 p-4 text-violet-700"><Sparkles size={30} /></div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Variation Type</p>
                          <div className="grid gap-2">
                            {[
                              "Fear Based",
                              "Hope Based",
                              "Family Concern",
                              "Doctor Style",
                              "Soft Senior Style",
                              "Curiosity Style"
                            ].map((mode) => (
                              <Button
                                key={mode}
                                onClick={() => setVariationMode(mode)}
                                variant={variationMode === mode ? "default" : "outline"}
                                className={variationMode === mode ? "justify-start rounded-xl bg-violet-600 text-white" : "justify-start rounded-xl bg-white text-slate-700"}
                              >
                                {mode}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Current Variation Mode</p>
                              <h3 className="mt-1 text-2xl font-black text-slate-900">{variationMode}</h3>
                            </div>
                            <Badge className="bg-white text-violet-700 hover:bg-white">Testing Ready</Badge>
                          </div>

                          <div className="space-y-4">
                            <div className="rounded-2xl bg-white p-5 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Psychology Direction</p>
                              <p className="mt-3 text-sm leading-6 text-slate-700">{variationDatabase.hero[variationMode] || "Multiple variation testing strategy."}</p>
                            </div>

                            <div className="rounded-2xl bg-white p-5 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Suggested Hero Hook</p>
                              <p className="mt-3 text-lg font-bold text-slate-900">
                                {variationMode === "Fear Based" && "Baka hindi mo namamalayan... lumalala na pala ang paningin mo."}
                                {variationMode === "Hope Based" && "Mas malinaw na araw-araw starts with better eye support."}
                                {variationMode === "Family Concern" && "Napansin din ba ng pamilya mo na hirap ka nang magbasa?"}
                                {variationMode === "Doctor Style" && "Eye comfort support matters more habang tumatanda."}
                                {variationMode === "Soft Senior Style" && "Dahan-dahang suportahan ang iyong paningin habang maaga pa."}
                                {variationMode === "Curiosity Style" && "Akala mo simpleng pagod lang... pero paano kung hindi?"}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-white p-5 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Recommended Testing Strategy</p>
                              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                                <p>• Test this angle against your current winning creative.</p>
                                <p>• Keep audience and offer unchanged during testing.</p>
                                <p>• Focus on CTR and LP conversion behavior.</p>
                                <p>• Monitor if this angle affects RTS quality.</p>
                              </div>
                            </div>

                            <Button className="w-full rounded-xl bg-violet-600 hover:bg-violet-700">
                              <Sparkles size={16} className="mr-2" />
                              Generate Testing Recommendations
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="learning" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Ads Testing Lab</Badge>
                          <h2 className="text-2xl font-black">Ads Test History & Winner Pattern Detection</h2>
                          <p className="mt-2 text-slate-600">Input and save actual ad test results per workspace/product so the system can compare angles, CPP, ROAS, profit, and scaling signals.</p>
                        </div>
                        <div className="rounded-3xl bg-emerald-50 p-4 text-emerald-700"><Brain size={30} /></div>
                      </div>

                      <div className="mb-5 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Ads Testing Lab V2</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">Campaign / Adset / Creative Input</h3>
                              <p className="mt-1 text-sm text-slate-600">Tag every test properly so Spryve can compare winning angles, creatives, audiences, offers, and landing pages.</p>
                            </div>
                            <Badge className="bg-white text-blue-700 hover:bg-white">Structured Test Record</Badge>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                            <InputField label="Campaign Name" type="text" value={adTestDraft.campaignName} onChange={(value) => updateAdTestDraft("campaignName", value)} />
                            <InputField label="Adset Name" type="text" value={adTestDraft.adsetName} onChange={(value) => updateAdTestDraft("adsetName", value)} />
                            <InputField label="Creative Name" type="text" value={adTestDraft.creativeName} onChange={(value) => updateAdTestDraft("creativeName", value)} />
                            <InputField label="Audience" type="text" value={adTestDraft.audience} onChange={(value) => updateAdTestDraft("audience", value)} />
                            <InputField label="Creative Format" type="text" value={adTestDraft.creativeFormat} onChange={(value) => updateAdTestDraft("creativeFormat", value)} />
                            <InputField label="Hook" type="text" value={adTestDraft.hook} onChange={(value) => updateAdTestDraft("hook", value)} />
                            <InputField label="Landing Page" type="text" value={adTestDraft.landingPage} onChange={(value) => updateAdTestDraft("landingPage", value)} />
                            <InputField label="Offer" type="text" value={adTestDraft.offer} onChange={(value) => updateAdTestDraft("offer", value)} />
                          </div>

                          <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                            <b>Current Test:</b> {adTestDraft.campaignName || inputs.project} • {adTestDraft.creativeName || "Creative Test"} • {adTestDraft.audience || "Audience"} • {adTestDraft.offer || "Offer"}
                          </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
                          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Saved Test Results</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">{inputs.project} Performance History</h3>
                              <p className="mt-1 text-xs text-slate-500">Workspace: {inputs.workspace}</p>
                              {lastSavedAt ? <p className="mt-1 text-xs font-semibold text-emerald-700">Last saved: {lastSavedAt}</p> : null}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button onClick={saveCurrentTest} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                                <Sparkles size={16} className="mr-2" />
                                Save Current Test
                              </Button>
                              <Button onClick={clearSavedTests} variant="outline" className="rounded-xl bg-white text-rose-600">
                                Clear Tests
                              </Button>
                            </div>
                          </div>

                          <div className="mb-5 grid gap-3 md:grid-cols-4">
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Best CTR Angle</p>
                              <p className="mt-2 text-sm font-black text-slate-900">{testComparison.bestCTR?.angle || "No data"}</p>
                              <p className="text-xs text-slate-500">{testComparison.bestCTR ? formatPercent(testComparison.bestCTR.ctr) : "Save tests first"}</p>
                            </div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Best CPP</p>
                              <p className="mt-2 text-sm font-black text-slate-900">{testComparison.bestCPP?.angle || "No data"}</p>
                              <p className="text-xs text-slate-500">{testComparison.bestCPP ? formatPeso(testComparison.bestCPP.cpp || 0) : "Save tests first"}</p>
                            </div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Best ROAS</p>
                              <p className="mt-2 text-sm font-black text-slate-900">{testComparison.bestROAS?.angle || "No data"}</p>
                              <p className="text-xs text-slate-500">{testComparison.bestROAS ? Number(testComparison.bestROAS.roas || 0).toFixed(2) : "Save tests first"}</p>
                            </div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Best Profit</p>
                              <p className="mt-2 text-sm font-black text-slate-900">{testComparison.bestProfit?.angle || "No data"}</p>
                              <p className="text-xs text-slate-500">{testComparison.bestProfit ? formatPeso(testComparison.bestProfit.projectedProfit || 0) : "Save tests first"}</p>
                            </div>
                          </div>

                          <div className="mb-5 rounded-3xl border border-blue-100 bg-blue-50 p-5">
                            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Saved Test Comparison Engine</p>
                                <h3 className="mt-1 text-xl font-black text-slate-900">Angle Winner Detection</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-700">{testComparison.recommendation}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                <div className="rounded-2xl bg-white p-3 shadow-sm"><p className="font-black text-emerald-700">{testComparison.winners}</p><p className="text-slate-500">Winner</p></div>
                                <div className="rounded-2xl bg-white p-3 shadow-sm"><p className="font-black text-blue-700">{testComparison.promising}</p><p className="text-slate-500">Promising</p></div>
                                <div className="rounded-2xl bg-white p-3 shadow-sm"><p className="font-black text-rose-700">{testComparison.weak}</p><p className="text-slate-500">Weak</p></div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-5 rounded-3xl border border-violet-100 bg-violet-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Winner Pattern Summary</p>
                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                              <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Best Audience</p><p className="mt-1 font-black text-slate-900">{testComparison.bestAudience}</p></div>
                              <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Best Creative</p><p className="mt-1 font-black text-slate-900">{testComparison.bestCreative}</p></div>
                              <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Best Hook</p><p className="mt-1 font-black text-slate-900">{testComparison.bestHook}</p></div>
                            </div>
                            <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                              <b>Recommended Next Test:</b> {testComparison.nextTestSuggestion}
                            </div>
                          </div>

                          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                  <th className="px-4 py-3 text-left">Saved Test</th>
                                  <th className="px-4 py-3 text-left">Campaign / Creative</th>
                                  <th className="px-4 py-3 text-left">Signal</th>
                                  <th className="px-4 py-3 text-left">CTR</th>
                                  <th className="px-4 py-3 text-left">CPP</th>
                                  <th className="px-4 py-3 text-left">Profit</th>
                                  <th className="px-4 py-3 text-left">Result</th>
                                  <th className="px-4 py-3 text-left">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentProjectTests.length === 0 ? (
                                  <tr>
                                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                                      No saved tests yet for this project.
                                    </td>
                                  </tr>
                                ) : (
                                  currentProjectTests.map((test) => (
                                    <tr key={test.id} className="border-t border-slate-100">
                                      <td className="px-4 py-3">
                                        <p className="font-semibold text-slate-900">{test.angle}</p>
                                        <p className="text-xs text-slate-500">{test.savedAt || "Saved snapshot"}</p>
                                      </td>
                                      <td className="px-4 py-3">
                                        <p className="font-semibold text-slate-900">{test.campaignName || test.project}</p>
                                        <p className="text-xs text-slate-500">{test.creativeName || "Creative"} • {test.audience || "Audience"}</p>
                                      </td>
                                      <td className="px-4 py-3">
                                        <p className="font-bold text-slate-900">{test.scalingSignal || test.result}</p>
                                        <p className="text-xs text-slate-500">{test.trackingMode || "Tracking"}</p>
                                      </td>
                                      <td className="px-4 py-3">{formatPercent(test.ctr)}</td>
                                      <td className="px-4 py-3">{formatPeso(test.cpp || 0)}</td>
                                      <td className="px-4 py-3">{formatPeso(test.projectedProfit || 0)}</td>
                                      <td className="px-4 py-3">
                                        <Badge className={test.result === "WINNER" ? "bg-emerald-50 text-emerald-700" : test.result === "PROMISING" ? "bg-blue-50 text-blue-700" : "bg-rose-50 text-rose-700"}>
                                          {test.result}
                                        </Badge>
                                      </td>
                                      <td className="px-4 py-3">
                                        <Button onClick={() => loadSavedTest(test)} variant="outline" className="rounded-xl bg-white px-3 py-2 text-xs">Load</Button>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Optimization Task Generator</p>
                                <h3 className="mt-1 text-lg font-black text-slate-900">Operational Task Queue</h3>
                              </div>
                              <Button onClick={generateAITasks} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                                <Sparkles size={16} className="mr-2" />
                                Generate Tasks
                              </Button>
                            </div>

                            <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
                                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-emerald-700">Add Manual Task</p>
                                <div className="grid gap-2">
                                  <Input
                                    value={newTaskTitle}
                                    onChange={(event) => setNewTaskTitle(event.target.value)}
                                    placeholder="Task title"
                                    className="rounded-xl border-slate-200 bg-white"
                                  />
                                  <div className="grid gap-2 md:grid-cols-3">
                                    <select
                                      value={newTaskRole}
                                      onChange={(event) => setNewTaskRole(event.target.value)}
                                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                                    >
                                      <option>Media Buyer</option>
                                      <option>Designer</option>
                                      <option>Copywriter</option>
                                      <option>VA</option>
                                      <option>Owner</option>
                                    </select>
                                    <select
                                      value={newTaskAssignee}
                                      onChange={(event) => setNewTaskAssignee(event.target.value)}
                                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                                    >
                                      <option value="">Unassigned</option>
                                      {activeWorkspaceMembers.map((member) => (
                                        <option key={member.id} value={member.name}>{member.name}</option>
                                      ))}
                                    </select>
                                    <select
                                      value={newTaskPriority}
                                      onChange={(event) => setNewTaskPriority(event.target.value)}
                                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                                    >
                                      <option>HIGH</option>
                                      <option>MEDIUM</option>
                                      <option>LOW</option>
                                    </select>
                                  </div>
                                  <Button onClick={addManualTask} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">Add Task</Button>
                                </div>
                              </div>

                              <div className="space-y-3">
                              {activeProjectTasks.map((task) => (
                                <div key={task.id} className="rounded-2xl bg-white p-4 shadow-sm">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="font-bold text-slate-900">{task.title}</p>
                                      <p className="mt-1 text-sm text-slate-500">Role: {task.role}</p>
                                      <p className="text-sm text-slate-500">Assigned to: {task.assignee || "Unassigned"}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge className={task.priority === "HIGH" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}>
                                        {task.priority}
                                      </Badge>
                                      <Button onClick={() => toggleTaskStatus(task.id)} variant="outline" className="rounded-xl bg-white text-xs">
                                        {task.status}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Winner Pattern Detection</p>
                            <h3 className="mt-2 text-lg font-black text-slate-900">{aiLearningInsight.summary}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-700">{aiLearningInsight.recommendation}</p>
                          </div>

                          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Save / Load Status</p>
                            <h3 className="mt-2 text-lg font-black text-slate-900">Browser Memory Active</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Saved tests, products, tasks, reports, campaign snapshots, assets, and notes now persist in this browser after refresh.</p>
                            <Button onClick={resetLocalWorkspace} variant="outline" className="mt-4 rounded-xl bg-white text-rose-600">Reset Local Data</Button>
                          </div>

                          <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Future Marketing Intelligence</p>
                            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                              <p>• Detect winning psychology patterns</p>
                              <p>• Detect creative fatigue</p>
                              <p>• Detect scaling readiness</p>
                              <p>• Detect high RTS risk patterns</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="team" className="mt-5">
                <div className="mb-5 grid gap-4 md:grid-cols-4">
                  <StatCard icon={Users} label="Workspace Members" value={String(activeWorkspaceMembers.length)} sub="Active collaboration layer" tone="violet" />
                  <StatCard icon={CheckCircle2} label="Open Tasks" value={String(activeProjectTasks.filter((task) => task.status !== "Done").length)} sub="Pending operational tasks" tone="amber" />
                  <StatCard icon={Sparkles} label="Completed Tasks" value={String(activeProjectTasks.filter((task) => task.status === "Done").length)} sub="Execution progress" tone="green" />
                  <StatCard icon={Brain} label="Project Health" value={funnelScores.overall.toFixed(1) + "/10"} sub="AI detected project status" tone="blue" />
                </div>
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-50">Workspace Collaboration System</Badge>
                          <h2 className="text-2xl font-black">Team Collaboration & Role Engine</h2>
                          <p className="mt-2 text-slate-600">Manage members, assign roles, and separate access based on responsibilities inside each workspace.</p>
                        </div>
                        <div className="rounded-3xl bg-indigo-50 p-4 text-indigo-700"><Users size={30} /></div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
                        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Workspace Members</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">{inputs.workspace}</h3>
                              <p className="mt-1 text-xs text-slate-500">{activeWorkspaceMembers.length} member(s) in this workspace</p>
                            </div>
                            <Button onClick={() => setShowInviteForm((current) => !current)} className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
                              <Users size={16} className="mr-2" />
                              {showInviteForm ? "Close Form" : "Invite Member"}
                            </Button>
                          </div>

                          {showInviteForm ? (
                            <div className="mb-4 rounded-3xl border border-indigo-100 bg-white p-4 shadow-sm">
                              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-indigo-700">Add Member To {inputs.workspace}</p>
                              <div className="grid gap-3">
                                <div className="grid gap-3 md:grid-cols-2">
                                  <Input
                                    value={newMemberName}
                                    onChange={(event) => setNewMemberName(event.target.value)}
                                    placeholder="Member name"
                                    className="rounded-xl border-slate-200 bg-white"
                                  />
                                  <Input
                                    value={inviteEmail}
                                    onChange={(event) => setInviteEmail(event.target.value)}
                                    placeholder="Email invite"
                                    className="rounded-xl border-slate-200 bg-white"
                                  />
                                </div>
                                <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                                    <input
                                      type="checkbox"
                                      checked={inviteHasFullAccess}
                                      onChange={(event) => setInviteHasFullAccess(event.target.checked)}
                                      className="h-4 w-4 rounded border-slate-300"
                                    />
                                    Full access inside workspace
                                  </label>
                                  <select
                                    value={newMemberRole}
                                    onChange={(event) => setNewMemberRole(event.target.value)}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                                  >
                                    <option>Owner</option>
                                    <option>Media Buyer</option>
                                    <option>Designer</option>
                                    <option>Copywriter</option>
                                    <option>VA</option>
                                  </select>
                                  <Button onClick={addWorkspaceMember} disabled={memberInviteLoading} className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
                                    {memberInviteLoading ? "Sending..." : "Send Invite"}
                                  </Button>
                                </div>
                                <p className="text-xs leading-5 text-slate-500">Owner sends an email invite, assigns role access, and can optionally give full workspace access to selected members.</p>
                                {memberInviteMessage ? (
                                  <div className={memberInviteMessage.toLowerCase().includes("success") ? "rounded-2xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-700" : "rounded-2xl bg-amber-50 p-3 text-xs font-semibold text-amber-700"}>
                                    {memberInviteMessage}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : null}

                          <div className="space-y-3">
                            {activeWorkspaceMembers.map((member) => (
                              <div key={member.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                                    <UserCircle2 size={24} />
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900">{member.name}</p>
                                    <p className="text-sm text-slate-500">{member.role}</p>
                                    {member.email ? <p className="text-xs text-slate-400">{member.email}</p> : null}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button onClick={() => activateMember(member.id)} variant="outline" className="rounded-xl bg-white px-3 py-2 text-xs">
                                    {member.status === "Active" ? "Set Pending" : "Activate"}
                                  </Button>
                                  <Button onClick={() => removeMember(member.id)} variant="outline" className="rounded-xl bg-white px-3 py-2 text-xs text-rose-600">
                                    Remove
                                  </Button>
                                  <Badge className={member.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}>
                                    {member.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
                            <div className="mb-3 flex items-center gap-2 text-indigo-700">
                              <Lock size={18} />
                              <p className="font-bold">Invite-Only Account Flow</p>
                            </div>
                            <div className="space-y-3 text-sm leading-6 text-slate-700">
                              <div className="rounded-2xl bg-white p-3 shadow-sm"><b>1.</b> Owner invites user by email.</div>
                              <div className="rounded-2xl bg-white p-3 shadow-sm"><b>2.</b> Owner assigns role: Media Buyer, Designer, Copywriter, VA.</div>
                              <div className="rounded-2xl bg-white p-3 shadow-sm"><b>3.</b> User sees only allowed modules based on role.</div>
                              <div className="rounded-2xl bg-white p-3 shadow-sm"><b>4.</b> Future backend: email invite + password + workspace access.</div>
                            </div>
                          </div>

                          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                            <div className="mb-3 flex items-center gap-2 text-blue-700">
                              <ShieldCheck size={18} />
                              <p className="font-bold">Role Access Matrix</p>
                            </div>
                            <div className="space-y-3 text-sm leading-6 text-slate-700">
                              <div className="rounded-2xl bg-white p-3 shadow-sm">
                                <p className="font-bold text-slate-900">Owner</p>
                                <p>Full analytics, profitability, scaling alerts, all projects.</p>
                              </div>
                              <div className="rounded-2xl bg-white p-3 shadow-sm">
                                <p className="font-bold text-slate-900">Media Buyer</p>
                                <p>Ad diagnostics, test history, AI recommendations.</p>
                              </div>
                              <div className="rounded-2xl bg-white p-3 shadow-sm">
                                <p className="font-bold text-slate-900">Designer</p>
                                <p>Image prompts, LP sections, creative assets.</p>
                              </div>
                              <div className="rounded-2xl bg-white p-3 shadow-sm">
                                <p className="font-bold text-slate-900">Copywriter</p>
                                <p>Hooks, CTA optimization, awareness psychology.</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Pending Invites</p>
                            <div className="mt-3 space-y-2">
                              {pendingInvites.filter((invite) => invite.workspace === inputs.workspace).length === 0 ? (
                                <div className="rounded-2xl bg-white p-4 text-sm text-slate-400 shadow-sm">No pending invites.</div>
                              ) : (
                                pendingInvites.filter((invite) => invite.workspace === inputs.workspace).map((invite) => (
                                  <div key={invite.id} className="rounded-2xl bg-white p-4 shadow-sm">
                                    <p className="font-bold text-slate-900">{invite.email}</p>
                                    <p className="text-xs text-slate-500">{invite.role} • {invite.status}</p>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Project Notes & Collaboration</p>
                                <h3 className="mt-1 text-lg font-black text-slate-900">Team Notes</h3>
                              </div>
                              <Button onClick={exportWorkspaceReport} className="rounded-xl bg-cyan-600 hover:bg-cyan-700">
                                <Copy size={16} className="mr-2" />
                                Generate Export
                              </Button>
                            </div>

                            <div className="mb-3 flex gap-2">
                              <Input
                                value={noteInput}
                                onChange={(event) => setNoteInput(event.target.value)}
                                placeholder="Add project note"
                                className="rounded-xl border-slate-200 bg-white"
                              />
                              <Button onClick={addProjectNote} className="rounded-xl bg-cyan-600 hover:bg-cyan-700">Add</Button>
                            </div>

                            {exportText ? (
                              <div className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
                                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-cyan-700">Export Report</p>
                                <textarea
                                  readOnly
                                  value={exportText}
                                  onFocus={(event) => event.target.select()}
                                  className="min-h-40 w-full resize-none rounded-xl border border-cyan-100 bg-cyan-50 p-3 text-xs leading-5 text-slate-700 outline-none"
                                />
                                <p className="mt-2 text-xs text-slate-500">Click the box and press Ctrl+C to copy. Clipboard auto-copy is blocked in this preview environment.</p>
                              </div>
                            ) : null}

                            <div className="space-y-2">
                              {activeProjectNotes.length === 0 ? (
                                <div className="rounded-2xl bg-white p-4 text-sm text-slate-400 shadow-sm">
                                  No project notes yet.
                                </div>
                              ) : (
                                activeProjectNotes.map((note) => (
                                  <div key={note.id} className="rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                                    {note.text}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Activity Timeline</p>

                            <div className="mt-4 space-y-3 max-h-72 overflow-auto pr-1">
                              {currentProjectActivityLogs.length === 0 ? (
                                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-400">
                                  No activity yet.
                                </div>
                              ) : (
                                currentProjectActivityLogs.map((log) => (
                                  <div key={log.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-900">{log.message}</p>
                                    <p className="mt-1 text-xs text-slate-500">{log.time}</p>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Future AI Collaboration Layer</p>
                            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                              <p>• AI-generated team tasks</p>
                              <p>• Designer handoff system</p>
                              <p>• Copy approval workflow</p>
                              <p>• Media buying activity logs</p>
                              <p>• Scaling approval alerts</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="campaigns" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Campaign Save Engine</Badge>
                          <h2 className="text-2xl font-black">Workspace Campaign Memory</h2>
                          <p className="mt-2 text-slate-600">Save campaign states, metrics, diagnostics, and operational progress per workspace.</p>
                        </div>
                        <div className="rounded-3xl bg-emerald-50 p-4 text-emerald-700"><Brain size={30} /></div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
                        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Save Current Campaign</p>

                          <div className="mt-4 space-y-3">
                            <Input
                              value={campaignNameInput}
                              onChange={(event) => setCampaignNameInput(event.target.value)}
                              placeholder="Campaign snapshot name"
                              className="rounded-xl border-slate-200 bg-white"
                            />

                            <Button onClick={saveCampaignSnapshot} className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700">
                              <Sparkles size={16} className="mr-2" />
                              Save Campaign Snapshot
                            </Button>
                          </div>

                          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Current Snapshot Data</p>

                            <div className="mt-3 space-y-2 text-sm text-slate-700">
                              <p><b>Workspace:</b> {inputs.workspace}</p>
                              <p><b>Project:</b> {inputs.project}</p>
                              <p><b>Diagnosis:</b> {diagnosis.status}</p>
                              <p><b>ROAS:</b> {metrics.roas.toFixed(2)}</p>
                              <p><b>CTR:</b> {formatPercent(metrics.ctr)}</p>
                              <p><b>CVR:</b> {formatPercent(metrics.cvr)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Saved Campaign History</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">{inputs.workspace} Campaigns</h3>
                            </div>
                            <Badge className="bg-white text-slate-700 hover:bg-white">
                              {currentWorkspaceCampaigns.length} Saved
                            </Badge>
                          </div>

                          <div className="space-y-3 max-h-[600px] overflow-auto pr-1">
                            {currentWorkspaceCampaigns.length === 0 ? (
                              <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-400 shadow-sm">
                                No saved campaigns yet.
                              </div>
                            ) : (
                              currentWorkspaceCampaigns.map((campaign) => (
                                <div key={campaign.id} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="text-lg font-black text-slate-900">{campaign.name}</p>
                                      <p className="mt-1 text-xs text-slate-500">{campaign.savedAt}</p>
                                    </div>

                                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                                      {campaign.awareness}
                                    </Badge>
                                  </div>

                                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                                    <div className="rounded-2xl bg-slate-50 p-3">
                                      <p className="text-xs text-slate-500">CTR</p>
                                      <p className="font-black text-slate-900">{formatPercent(campaign.metrics.ctr)}</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-50 p-3">
                                      <p className="text-xs text-slate-500">CVR</p>
                                      <p className="font-black text-slate-900">{formatPercent(campaign.metrics.cvr)}</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-50 p-3">
                                      <p className="text-xs text-slate-500">ROAS</p>
                                      <p className="font-black text-slate-900">{campaign.metrics.roas.toFixed(2)}</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-50 p-3">
                                      <p className="text-xs text-slate-500">Profit</p>
                                      <p className="font-black text-slate-900">{formatPeso(campaign.metrics.profit)}</p>
                                    </div>
                                  </div>

                                  <div className="mt-4 rounded-2xl bg-blue-50 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700">AI Diagnosis</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-700">{campaign.diagnosis}</p>
                                  </div>

                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge className="bg-violet-50 text-violet-700 hover:bg-violet-50">
                                      {campaign.tasks} Tasks
                                    </Badge>
                                    <Badge className="bg-cyan-50 text-cyan-700 hover:bg-cyan-50">
                                      {campaign.notes} Notes
                                    </Badge>
                                    <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                                      {campaign.angle}
                                    </Badge>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="dailyops" className="mt-5">
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-4">
                    <StatCard icon={TrendingUp} label="Media Buyer Reports" value={String(activeProductReports.filter((report) => report.type === "Media Buyer").length)} sub="For selected product" tone="blue" />
                    <StatCard icon={ImageIcon} label="Designer Reports" value={String(activeProductReports.filter((report) => report.type === "Designer").length)} sub="Creative submissions" tone="violet" />
                    <StatCard icon={AlertTriangle} label="Critical Alerts" value={Number(mediaBuyerReport.roas || 0) < 2 ? "High" : "Low"} sub="Based on report data" tone={Number(mediaBuyerReport.roas || 0) < 2 ? "red" : "green"} />
                    <StatCard icon={CheckCircle2} label="Selected Product" value={reportProduct} sub="Daily report scope" tone="green" />
                  </div>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-cyan-50 text-cyan-700 hover:bg-cyan-50">Marketing Reports Intelligence</Badge>
                          <h2 className="text-2xl font-black">Product-Based Marketing Reporting System</h2>
                          <p className="mt-2 text-slate-600">Every report is connected to a product, campaign role, date, and workspace so ads, creatives, and landing page decisions do not get mixed together.</p>
                        </div>
                        <div className="rounded-3xl bg-cyan-50 p-4 text-cyan-700"><Brain size={30} /></div>
                      </div>

                      <div className="mb-5 grid gap-4 lg:grid-cols-[340px_1fr]">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Product Database</p>
                          <div className="mb-3 flex gap-2">
                            <Input value={newProductName} onChange={(event) => setNewProductName(event.target.value)} placeholder="Add product name" className="rounded-xl border-slate-200 bg-white" />
                            <Button onClick={addProduct} className="rounded-xl bg-cyan-600 hover:bg-cyan-700">Add</Button>
                          </div>
                          <select value={reportProduct} onChange={(event) => setReportProduct(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                            {products.map((product) => <option key={product}>{product}</option>)}
                          </select>
                          <p className="mt-3 text-xs leading-5 text-slate-500">All media buyer, designer, copywriter, and ops reports should be tagged to one product.</p>
                        </div>

                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Selected Product Summary</p>
                          <h3 className="mt-1 text-2xl font-black text-slate-900">{reportProduct}</h3>
                          <div className="mt-4 grid gap-3 md:grid-cols-4">
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Today Spend</p><p className="text-xl font-black text-slate-900">{formatPeso(mediaBuyerReport.spend)}</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">ROAS</p><p className="text-xl font-black text-emerald-700">{Number(mediaBuyerReport.roas || 0).toFixed(2)}</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">CTR</p><p className="text-xl font-black text-slate-900">{Number(mediaBuyerReport.ctr || 0).toFixed(2)}%</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Winning Angle</p><p className="text-sm font-bold text-slate-900">{mediaBuyerReport.winningAngle}</p></div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div><p className="text-xs font-bold uppercase tracking-wide text-blue-700">Submit Media Buyer Report</p><h3 className="mt-1 text-xl font-black text-slate-900">Ad Performance Input</h3></div>
                            <Badge className="bg-white text-blue-700 hover:bg-white">{reportProduct}</Badge>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <InputField label="Spend" value={mediaBuyerReport.spend} onChange={(value) => setMediaBuyerReport((prev) => ({ ...prev, spend: value }))} />
                            <InputField label="ROAS" value={mediaBuyerReport.roas} onChange={(value) => setMediaBuyerReport((prev) => ({ ...prev, roas: value }))} />
                            <InputField label="CTR %" value={mediaBuyerReport.ctr} onChange={(value) => setMediaBuyerReport((prev) => ({ ...prev, ctr: value }))} />
                            <InputField label="CPC" value={mediaBuyerReport.cpc} onChange={(value) => setMediaBuyerReport((prev) => ({ ...prev, cpc: value }))} />
                            <InputField label="CPP" value={mediaBuyerReport.cpp} onChange={(value) => setMediaBuyerReport((prev) => ({ ...prev, cpp: value }))} />
                            <InputField label="Winning Angle" type="text" value={mediaBuyerReport.winningAngle} onChange={(value) => setMediaBuyerReport((prev) => ({ ...prev, winningAngle: value }))} />
                            <InputField label="Scaling Action" type="text" value={mediaBuyerReport.action} onChange={(value) => setMediaBuyerReport((prev) => ({ ...prev, action: value }))} />
                            <InputField label="Notes" type="text" value={mediaBuyerReport.notes} onChange={(value) => setMediaBuyerReport((prev) => ({ ...prev, notes: value }))} />
                          </div>
                          <Button onClick={submitMediaBuyerReport} className="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700">Submit Media Buyer Report</Button>
                        </div>

                        <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div><p className="text-xs font-bold uppercase tracking-wide text-violet-700">Submit Designer Report</p><h3 className="mt-1 text-xl font-black text-slate-900">Creative Production Input</h3></div>
                            <Badge className="bg-white text-violet-700 hover:bg-white">{reportProduct}</Badge>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <InputField label="Creative Type" type="text" value={designerReport.creativeType} onChange={(value) => setDesignerReport((prev) => ({ ...prev, creativeType: value }))} />
                            <InputField label="Angle" type="text" value={designerReport.angle} onChange={(value) => setDesignerReport((prev) => ({ ...prev, angle: value }))} />
                            <InputField label="Versions Created" value={designerReport.versions} onChange={(value) => setDesignerReport((prev) => ({ ...prev, versions: value }))} />
                            <InputField label="Status" type="text" value={designerReport.status} onChange={(value) => setDesignerReport((prev) => ({ ...prev, status: value }))} />
                            <InputField label="Asset Link" type="text" value={designerReport.assetLink} onChange={(value) => setDesignerReport((prev) => ({ ...prev, assetLink: value }))} />
                            <InputField label="Notes" type="text" value={designerReport.notes} onChange={(value) => setDesignerReport((prev) => ({ ...prev, notes: value }))} />
                          </div>
                          <Button onClick={submitDesignerReport} className="mt-4 w-full rounded-xl bg-violet-600 hover:bg-violet-700">Submit Designer Report</Button>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Product Report History</p>
                          <div className="mt-4 space-y-3 max-h-96 overflow-auto pr-1">
                            {activeProductReports.length === 0 ? (
                              <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-400 shadow-sm">No reports yet for this product.</div>
                            ) : (
                              activeProductReports.map((report) => (
                                <div key={report.id} className="rounded-2xl bg-white p-4 shadow-sm">
                                  <div className="flex items-center justify-between gap-3">
                                    <div><p className="font-bold text-slate-900">{report.type} Report</p><p className="text-xs text-slate-500">{report.date} • {report.product}</p></div>
                                    <Badge className={report.type === "Media Buyer" ? "bg-blue-50 text-blue-700" : "bg-violet-50 text-violet-700"}>{report.type}</Badge>
                                  </div>
                                  <p className="mt-2 text-sm leading-6 text-slate-600">{report.type === "Media Buyer" ? `Spend ${formatPeso(report.data.spend)} • ROAS ${Number(report.data.roas || 0).toFixed(2)} • Angle ${report.data.winningAngle}` : `${report.data.versions} ${report.data.creativeType} creative(s) • ${report.data.angle} • ${report.data.status}`}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                            <div className="mb-3 flex items-center gap-2 text-emerald-700"><Sparkles size={18} /><p className="font-bold">AI Report Analysis</p></div>
                            <p className="text-sm leading-6 text-slate-700">{Number(mediaBuyerReport.roas || 0) >= 3 ? "ROAS is near scaling-ready. Check RTS and buyer quality before increasing budget." : "ROAS is not yet safe for aggressive scaling. Prioritize offer strength, trust section, or creative testing."}</p>
                            <Button onClick={generateDailyMarketingReport} className="mt-4 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700">
                              <Copy size={16} className="mr-2" /> Generate Daily Report
                            </Button>
                          </div>

                          {reportExportText ? (
                            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                              <div className="mb-3 flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Copy-Ready Report</p>
                                  <h3 className="mt-1 text-lg font-black text-slate-900">Daily Marketing Summary</h3>
                                </div>
                                <Button onClick={() => copyTextToClipboard(reportExportText, "daily marketing report")} variant="outline" className="rounded-xl bg-white px-3 py-2 text-xs">
                                  {copiedAsset ? "Copied" : "Copy"}
                                </Button>
                              </div>
                              <textarea
                                readOnly
                                value={reportExportText}
                                onFocus={(event) => event.target.select()}
                                className="min-h-80 w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs leading-5 text-slate-700 outline-none"
                              />
                            </div>
                          ) : null}
                          <div className="rounded-3xl border border-rose-100 bg-rose-50 p-5">
                            <div className="mb-3 flex items-center gap-2 text-rose-700"><AlertTriangle size={18} /><p className="font-bold">Operational Alert</p></div>
                            <p className="text-sm leading-6 text-slate-700">If multiple products are running, always select the correct product before submitting reports. This keeps campaign history and AI recommendations clean.</p>
                          </div>
                          <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
                            <div className="mb-3 flex items-center gap-2 text-cyan-700"><LineChart size={18} /><p className="font-bold">Daily KPI Board</p></div>
                            <div className="space-y-3">
                              <div className="rounded-2xl bg-white p-4 shadow-sm flex items-center justify-between"><span className="text-sm text-slate-600">CTR Goal</span><span className="font-black text-slate-900">3.0%+</span></div>
                              <div className="rounded-2xl bg-white p-4 shadow-sm flex items-center justify-between"><span className="text-sm text-slate-600">ROAS Goal</span><span className="font-black text-slate-900">3.0+</span></div>
                              <div className="rounded-2xl bg-white p-4 shadow-sm flex items-center justify-between"><span className="text-sm text-slate-600">RTS Safe Zone</span><span className="font-black text-slate-900">Below 20%</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-slate-900 text-white shadow-xl">
                    <CardContent className="p-5">
                      <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:items-center">
                        <div>
                          <Badge className="mb-3 bg-white/10 text-cyan-100 hover:bg-white/10">Kanban Operating Mode</Badge>
                          <h2 className="text-2xl font-black">My Tasks + Team Kanban</h2>
                          <p className="mt-2 text-sm leading-6 text-slate-300">Owner or team lead creates the tasks. Team members update their own task status from To Do → In Progress → For Review → Done.</p>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <label className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Viewing As</span>
                            <select value={currentUser} onChange={(event) => setCurrentUser(event.target.value)} className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none">
                              {activeWorkspaceMembers.map((member) => <option key={member.id} value={member.name} className="text-slate-900">{member.name}</option>)}
                            </select>
                          </label>
                          <label className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Task View</span>
                            <select value={taskViewMode} onChange={(event) => setTaskViewMode(event.target.value)} className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none">
                              <option className="text-slate-900">All Tasks</option>
                              <option className="text-slate-900">My Tasks</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-4">
                    <StatCard icon={UserCircle2} label="My Assigned Tasks" value={String(myTasks.length)} sub={currentUser + " workload"} tone="blue" />
                    <StatCard icon={AlertTriangle} label="My Open Tasks" value={String(myTasks.filter((task) => task.status !== "Done").length)} sub="Needs action" tone="amber" />
                    <StatCard icon={Eye} label="My Review Items" value={String(myTasks.filter((task) => task.status === "For Review").length)} sub="Waiting approval" tone="violet" />
                    <StatCard icon={CheckCircle2} label="My Completed" value={String(myTasks.filter((task) => task.status === "Done").length)} sub="Finished work" tone="green" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <StatCard icon={CheckCircle2} label="To Do" value={String(filteredTaskBoardTasks.filter((task) => task.status === "To Do" || task.status === "Pending").length)} sub="Ready for execution" tone="amber" />
                    <StatCard icon={TrendingUp} label="In Progress" value={String(filteredTaskBoardTasks.filter((task) => task.status === "In Progress").length)} sub="Currently moving" tone="blue" />
                    <StatCard icon={Eye} label="For Review" value={String(filteredTaskBoardTasks.filter((task) => task.status === "For Review").length)} sub="Needs approval" tone="violet" />
                    <StatCard icon={Sparkles} label="Done" value={String(filteredTaskBoardTasks.filter((task) => task.status === "Done").length)} sub="Completed tasks" tone="green" />
                  </div>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-slate-100 text-slate-700 hover:bg-slate-100">Task Management System</Badge>
                          <h2 className="text-2xl font-black">Team Dashboard & Task Board</h2>
                          <p className="mt-2 text-slate-600">Manage product-based tasks for media buyers, designers, copywriters, and operations team members.</p>
                        </div>
                        <div className="rounded-3xl bg-slate-100 p-4 text-slate-700"><CheckCircle2 size={30} /></div>
                      </div>

                      <div className="mb-5 grid gap-4 lg:grid-cols-[360px_1fr]">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Create New Task</p>
                          <div className="grid gap-3">
                            <Input value={newTaskTitle} onChange={(event) => setNewTaskTitle(event.target.value)} placeholder="Task title" className="rounded-xl border-slate-200 bg-white" />
                            <select value={reportProduct} onChange={(event) => setReportProduct(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                              {products.map((product) => <option key={product}>{product}</option>)}
                            </select>
                            <div className="grid gap-2 md:grid-cols-2">
                              <select value={newTaskRole} onChange={(event) => setNewTaskRole(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                                <option>Media Buyer</option>
                                <option>Designer</option>
                                <option>Copywriter</option>
                                <option>VA</option>
                                <option>Owner</option>
                              </select>
                              <select value={newTaskAssignee} onChange={(event) => setNewTaskAssignee(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                                <option value="">Unassigned</option>
                                {activeWorkspaceMembers.map((member) => <option key={member.id} value={member.name}>{member.name}</option>)}
                              </select>
                            </div>
                            <div className="grid gap-2 md:grid-cols-2">
                              <select value={newTaskPriority} onChange={(event) => setNewTaskPriority(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                                <option>HIGH</option>
                                <option>MEDIUM</option>
                                <option>LOW</option>
                              </select>
                              <select value={newTaskStatus} onChange={(event) => setNewTaskStatus(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                                <option>To Do</option>
                                <option>In Progress</option>
                                <option>For Review</option>
                                <option>Done</option>
                              </select>
                            </div>
                            <Input type="date" value={newTaskDueDate} onChange={(event) => setNewTaskDueDate(event.target.value)} className="rounded-xl border-slate-200 bg-white" />
                            <Button onClick={addManualTask} className="rounded-xl bg-slate-900 hover:bg-slate-800">Create Task</Button>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Team Performance Dashboard</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">{inputs.workspace}</h3>
                            </div>
                            <select value={taskProductFilter} onChange={(event) => setTaskProductFilter(event.target.value)} className="rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                              <option>All</option>
                              {products.map((product) => <option key={product}>{product}</option>)}
                            </select>
                          </div>
                          <div className="grid gap-3 md:grid-cols-3">
                            {activeWorkspaceMembers.map((member) => {
                              const assignedCount = filteredTaskBoardTasks.filter((task) => task.assignee === member.name).length;
                              const doneCount = filteredTaskBoardTasks.filter((task) => task.assignee === member.name && task.status === "Done").length;
                              return (
                                <div key={member.id} className="rounded-2xl bg-white p-4 shadow-sm">
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><UserCircle2 size={20} /></div>
                                    <div>
                                      <p className="font-bold text-slate-900">{member.name}</p>
                                      <p className="text-xs text-slate-500">{member.role}</p>
                                    </div>
                                  </div>
                                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                    <div className="rounded-xl bg-slate-50 p-2"><p className="text-slate-500">Assigned</p><p className="font-black text-slate-900">{assignedCount}</p></div>
                                    <div className="rounded-xl bg-slate-50 p-2"><p className="text-slate-500">Done</p><p className="font-black text-slate-900">{doneCount}</p></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-4">
                        {["To Do", "In Progress", "For Review", "Done"].map((column) => (
                          <div key={column} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                            <div className="mb-4 flex items-center justify-between gap-2">
                              <h3 className="font-black text-slate-900">{column}</h3>
                              <Badge className="bg-white text-slate-700 hover:bg-white">{filteredTaskBoardTasks.filter((task) => (column === "To Do" ? task.status === "To Do" || task.status === "Pending" : task.status === column)).length}</Badge>
                            </div>
                            <div className="space-y-3">
                              {filteredTaskBoardTasks
                                .filter((task) => column === "To Do" ? task.status === "To Do" || task.status === "Pending" : task.status === column)
                                .map((task) => (
                                  <div key={task.id} className="rounded-2xl bg-white p-4 shadow-sm">
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                      <p className="font-bold leading-5 text-slate-900">{task.title}</p>
                                      <Badge className={task.priority === "HIGH" ? "bg-rose-50 text-rose-700" : task.priority === "MEDIUM" ? "bg-amber-50 text-amber-700" : "bg-slate-50 text-slate-600"}>{task.priority}</Badge>
                                    </div>
                                    <div className="space-y-1 text-xs text-slate-500">
                                      <p>Product: {task.project}</p>
                                      <p>Role: {task.role}</p>
                                      <p>Assignee: {task.assignee || "Unassigned"}</p>
                                      <p>Due: {task.dueDate || "No due date"}</p>
                                    </div>
                                    <select value={task.status} onChange={(event) => setTeamTasks((prev) => prev.map((item) => item.id === task.id ? { ...item, status: event.target.value } : item))} className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none">
                                      <option>To Do</option>
                                      <option>In Progress</option>
                                      <option>For Review</option>
                                      <option>Done</option>
                                    </select>
                                  </div>
                                ))}
                              {filteredTaskBoardTasks.filter((task) => column === "To Do" ? task.status === "To Do" || task.status === "Pending" : task.status === column).length === 0 ? (
                                <div className="rounded-2xl bg-white p-4 text-center text-sm text-slate-400 shadow-sm">No tasks</div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="workspace" className="mt-5">
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-4">
                    <StatCard icon={ImageIcon} label="Assets" value={String(activeProductAssets.length)} sub="Product files & links" tone="violet" />
                    <StatCard icon={CheckCircle2} label="Product Tasks" value={String(activeWorkspaceTasks.filter((task) => task.project === reportProduct).length)} sub="All linked tasks" tone="blue" />
                    <StatCard icon={TrendingUp} label="Daily Reports" value={String(activeProductReports.length)} sub="Submitted logs" tone="green" />
                    <StatCard icon={Brain} label="AI Focus" value={Number(mediaBuyerReport.roas || 0) >= 3 ? "Scale" : "Improve"} sub="Current product direction" tone={Number(mediaBuyerReport.roas || 0) >= 3 ? "green" : "amber"} />
                  </div>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-50">Product Workspace</Badge>
                          <h2 className="text-2xl font-black">{reportProduct} Operating Hub</h2>
                          <p className="mt-2 text-slate-600">Central hub for product test memory, creative links, landing page links, tasks, reports, and AI product decisions.</p>
                        </div>
                        <div className="rounded-3xl bg-blue-50 p-4 text-blue-700"><Target size={30} /></div>
                      </div>

                      <div className="mb-5 grid gap-4 lg:grid-cols-[340px_1fr]">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Select Product Workspace</p>
                          <select value={reportProduct} onChange={(event) => setReportProduct(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                            {products.map((product) => <option key={product}>{product}</option>)}
                          </select>
                          <p className="mt-3 text-xs leading-5 text-slate-500">Everything on this page is filtered by the selected product.</p>
                        </div>

                        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">AI Product Direction</p>
                          <h3 className="mt-2 text-xl font-black text-slate-900">{Number(mediaBuyerReport.roas || 0) >= 3 ? "Controlled Scaling Candidate" : "Needs Conversion Improvement"}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-700">{Number(mediaBuyerReport.roas || 0) >= 3 ? "ROAS is close to scale-ready. Validate RTS and buyer quality before increasing budget." : "Prioritize new creatives, stronger trust section, better offer stack, and daily reporting consistency."}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
                        <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
                          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-violet-700">Add Product Asset</p>
                          <div className="grid gap-3">
                            <Input value={assetTitle} onChange={(event) => setAssetTitle(event.target.value)} placeholder="Asset title" className="rounded-xl border-slate-200 bg-white" />
                            <select value={assetType} onChange={(event) => setAssetType(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                              <option>Creative</option>
                              <option>Landing Page</option>
                              <option>Ad Copy</option>
                              <option>UGC Script</option>
                              <option>Image Prompt</option>
                              <option>Report Link</option>
                            </select>
                            <Input value={assetLink} onChange={(event) => setAssetLink(event.target.value)} placeholder="Canva / Drive / WebCake link" className="rounded-xl border-slate-200 bg-white" />
                            <select value={assetStatus} onChange={(event) => setAssetStatus(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none">
                              <option>For Review</option>
                              <option>Approved</option>
                              <option>Needs Revision</option>
                              <option>Live</option>
                              <option>Archived</option>
                            </select>
                            <Button onClick={addProductAsset} className="rounded-xl bg-violet-600 hover:bg-violet-700">Add Asset</Button>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Asset Library</p>
                              <h3 className="mt-1 text-xl font-black text-slate-900">{reportProduct} Assets</h3>
                            </div>
                            <Badge className="bg-white text-slate-700 hover:bg-white">{activeProductAssets.length} items</Badge>
                          </div>

                          <div className="space-y-3 max-h-96 overflow-auto pr-1">
                            {activeProductAssets.length === 0 ? (
                              <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-400 shadow-sm">No product assets yet.</div>
                            ) : (
                              activeProductAssets.map((asset) => (
                                <div key={asset.id} className="rounded-2xl bg-white p-4 shadow-sm">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="font-bold text-slate-900">{asset.title}</p>
                                      <p className="mt-1 text-xs text-slate-500">{asset.type} • {asset.addedAt}</p>
                                      {asset.link ? <p className="mt-2 break-all text-xs text-blue-700">{asset.link}</p> : null}
                                    </div>
                                    <Badge className={asset.status === "Approved" || asset.status === "Live" ? "bg-emerald-50 text-emerald-700" : asset.status === "Needs Revision" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}>{asset.status}</Badge>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Product Task Snapshot</p>
                          <div className="mt-4 space-y-3">
                            {activeWorkspaceTasks.filter((task) => task.project === reportProduct).slice(0, 5).map((task) => (
                              <div key={task.id} className="rounded-2xl bg-white p-4 shadow-sm">
                                <p className="font-bold text-slate-900">{task.title}</p>
                                <p className="mt-1 text-xs text-slate-500">{task.assignee} • {task.status}</p>
                              </div>
                            ))}
                            {activeWorkspaceTasks.filter((task) => task.project === reportProduct).length === 0 ? <div className="rounded-2xl bg-white p-4 text-sm text-slate-400 shadow-sm">No tasks for this product yet.</div> : null}
                          </div>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Latest Product Reports</p>
                          <div className="mt-4 space-y-3">
                            {activeProductReports.slice(0, 5).map((report) => (
                              <div key={report.id} className="rounded-2xl bg-white p-4 shadow-sm">
                                <p className="font-bold text-slate-900">{report.type} Report</p>
                                <p className="mt-1 text-xs text-slate-500">{report.date} • {report.product}</p>
                              </div>
                            ))}
                            {activeProductReports.length === 0 ? <div className="rounded-2xl bg-white p-4 text-sm text-slate-400 shadow-sm">No reports for this product yet.</div> : null}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="cloud" className="mt-5">
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-4">
                    <StatCard icon={Cloud} label="Cloud Mode" value="Active" sub="Supabase connected" tone="blue" />
                    <StatCard icon={Database} label="Database Tables" value="Ready" sub="Workspace schema" tone="violet" />
                    <StatCard icon={Lock} label="Auth" value="Invite Only" sub="Private access" tone="green" />
                    <StatCard icon={ShieldCheck} label="Data Scope" value="Workspace" sub="Team data isolation" tone="amber" />
                  </div>

                  {authProfile?.global_role === "super_admin" ? (
                    <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                      <CardContent className="p-6">
                        <div className="mb-5 flex items-start justify-between gap-4">
                          <div>
                            <Badge className="mb-3 bg-rose-50 text-rose-700 hover:bg-rose-50">Super Admin Only</Badge>
                            <h2 className="text-2xl font-black">Invite Founder / Partner</h2>
                            <p className="mt-2 text-slate-600">Send an invite to a founder/partner. After they accept, they will create their own workspace and manage their own team access.</p>
                          </div>
                          <div className="rounded-3xl bg-rose-50 p-4 text-rose-700"><ShieldCheck size={30} /></div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-[1fr_260px_auto]">
                          <Input
                            value={superInviteEmail}
                            onChange={(event) => setSuperInviteEmail(event.target.value)}
                            placeholder="founder@email.com"
                            className="h-12 rounded-xl border-slate-200 bg-white"
                          />
                          <select
                            value={superInviteRole}
                            onChange={(event) => setSuperInviteRole(event.target.value)}
                            className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none"
                          >
                            <option value="founder_partner">Founder / Partner</option>
                            <option value="marketer">Marketer</option>
                            <option value="graphic_artist">Graphic Artist</option>
                          </select>
                          <Button onClick={sendSuperAdminInvite} disabled={superInviteLoading} className="h-12 rounded-xl bg-rose-600 hover:bg-rose-700">
                            {superInviteLoading ? "Sending..." : "Send Invite"}
                          </Button>
                        </div>

                        {superInviteMessage ? (
                          <div className={superInviteMessage.toLowerCase().includes("success") || superInviteMessage.toLowerCase().includes("created") ? "mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700" : "mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-700"}>
                            {superInviteMessage}
                          </div>
                        ) : null}

                        {superInviteTempPassword ? (
                          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Temporary Password</p>
                            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                              <code className="rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm">{superInviteTempPassword}</code>
                              <Button onClick={() => copyTextToClipboard(superInviteTempPassword, "temporary password")} variant="outline" className="rounded-xl bg-white">Copy Password</Button>
                            </div>
                            <p className="mt-3 text-xs leading-5 text-blue-800">Send this securely to the user. After first login, they must change this password before using the app.</p>
                          </div>
                        ) : null}

                        <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Founder Onboarding Flow</p>
                          <div className="mt-3 grid gap-3 md:grid-cols-4">
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>1.</b> Super Admin sends invite.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>2.</b> Founder accepts and sets password.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>3.</b> Founder creates workspace.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>4.</b> Founder invites marketer / graphic artist.</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : null}

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-50">Cloudbase Upgrade Plan</Badge>
                          <h2 className="text-3xl font-black">Spryve Intelligence System Cloud Setup</h2>
                          <p className="mt-2 max-w-3xl text-slate-600">This converts Spryve Intelligence from browser memory into a real cloud-based marketing intelligence app with login, workspaces, roles, saved test history, campaign memory, and team collaboration.</p>
                        </div>
                        <div className="rounded-3xl bg-blue-50 p-4 text-blue-700"><Cloud size={34} /></div>
                      </div>

                      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Recommended Cloud Stack</p>
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="font-bold text-slate-900">Frontend</p><p className="mt-1 text-sm text-slate-600">Vite / React first, Next.js later if needed</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="font-bold text-slate-900">Database</p><p className="mt-1 text-sm text-slate-600">Supabase PostgreSQL</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="font-bold text-slate-900">Auth</p><p className="mt-1 text-sm text-slate-600">Supabase Auth + invite-only access</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="font-bold text-slate-900">Hosting</p><p className="mt-1 text-sm text-slate-600">Vercel for live deployment</p></div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Cloudbase Status</p>
                          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Current:</b> prototype data only, stored in browser memory.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Next:</b> connect forms to Supabase database.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Result:</b> users can login, save reports, tasks, products, and campaign history online.</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Core Database Tables</p>
                          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                            <div className="rounded-2xl bg-white p-3 shadow-sm">workspaces — company/team accounts</div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm">profiles — users, roles, status</div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm">products — product/campaign workspaces</div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm">ad_tests — saved test snapshots, CPP, ROAS, scaling signals</div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm">campaign_snapshots — campaign memory and historical diagnostics</div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm">daily_reports — media buyer/designer/copywriter reports</div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm">tasks — marketing team task board</div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm">assets — Canva, Drive, WebCake, creative links</div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm">activity_logs — workspace audit trail</div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Multi-User Access Plan</p>
                          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Owner:</b> full access to dashboard, profitability, tests, team, system setup.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Media Buyer:</b> ad tests, daily reports, campaigns, AI learning, scaling signals.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Designer:</b> creative assets, LP improvement tasks, assigned tasks.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Copywriter:</b> hooks, LP copy fixes, AI strategist, assigned tasks.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Friend/Partner:</b> own workspace, own saved tests, own campaign history.</div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Cloud Build Sequence</p>
                          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Step 1:</b> Create marketing-specific Supabase tables for tests, campaigns, reports, assets, and tasks.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Step 2:</b> Add invite-only login and workspace session.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Step 3:</b> Replace localStorage saves with database inserts.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Step 4:</b> Add workspace_id and role-based visibility so each team/friend has separated access.</div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><b>Step 5:</b> Deploy to Vercel so your team can access the live Spryve Intelligence app.</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="helpcenter" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6 md:p-8">
                      <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-50">Spryve Intelligence SOP</Badge>
                      <h2 className="text-3xl font-black">Help Center</h2>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                        Use this as the official operating manual for Spryve Intelligence System. Follow the workflow daily so ads data, reports, tasks, products, creatives, and scaling decisions stay organized per workspace.
                      </p>

                      <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                          <h3 className="text-xl font-black text-slate-900">1. Daily Owner Workflow</h3>
                          <ol className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                            <li>1. Login and confirm the correct workspace.</li>
                            <li>2. Select the correct product before reviewing reports.</li>
                            <li>3. Open Dashboard to check revenue, ROAS, CPP, RTS, and scaling status.</li>
                            <li>4. Open Reporting Center to review daily media buyer and designer reports.</li>
                            <li>5. Open Tasks to check execution progress.</li>
                            <li>6. Decide: scale, hold, improve, pause, or create a new test.</li>
                          </ol>
                        </div>

                        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                          <h3 className="text-xl font-black text-slate-900">2. Media Buyer SOP</h3>
                          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                            <li>• Submit daily spend, ROAS, CTR, CPC, CPP, winning angle, action, and notes.</li>
                            <li>• Use Reporting Center at the end of every testing day.</li>
                            <li>• Save important test results inside Ads Testing Lab or Campaign Memory.</li>
                            <li>• Do not scale without checking CPP, ROAS, delivered rate, and RTS risk.</li>
                            <li>• Create tasks for creatives, LP fixes, or retesting when signals are weak.</li>
                          </ul>
                        </div>

                        <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
                          <h3 className="text-xl font-black text-slate-900">3. Designer / Creative SOP</h3>
                          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                            <li>• Submit creative type, angle, versions created, status, asset link, and notes.</li>
                            <li>• Use Creative Intelligence for new angles and fatigue checks.</li>
                            <li>• Prioritize creative versions based on winning ad angles.</li>
                            <li>• Use clear naming: Product - Angle - Version - Date.</li>
                            <li>• Move task status to For Review once creative is ready.</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6 md:p-8">
                      <Badge className="mb-3 bg-cyan-50 text-cyan-700 hover:bg-cyan-50">Module Manual</Badge>
                      <h2 className="text-2xl font-black">How To Use Every Module</h2>
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {[
                          { title: "Dashboard", body: "Founder view for overall performance. Use this first to see revenue, estimated net, blended ROAS, CPP, delivered %, RTS %, confirmation rate, and scaling status. This answers: profitable ba, risky ba, or scalable ba?" },
                          { title: "AI Strategist", body: "Use this after checking performance. It explains the likely root cause, buyer psychology issue, and recommended next actions. Best for deciding whether to fix creative, LP, offer, or buyer quality." },
                          { title: "Scaling Center", body: "Use this before increasing budget. It checks CTR, CVR, ROAS, CPP, delivered rate, RTS, and gives a final testing decision like change creative, fix LP, protect profit, or controlled scale." },
                          { title: "Ads Testing Lab", body: "Use this to save test snapshots. Input campaign, adset, creative, audience, hook, LP, offer, and test metrics. This creates memory so Spryve can compare winners over time." },
                          { title: "Landing Page Analyzer", body: "Use this when CTR is good but conversion is weak. It gives the ideal landing page flow: hero, pain, education, product intro, proof, offer, FAQ, and CTA." },
                          { title: "Creative Intelligence", body: "Use this to create and compare creative angles such as Fear Based, Hope Based, Family Concern, Doctor Style, Soft Senior Style, and Curiosity Style." },
                          { title: "Profitability Engine", body: "Use this to check if the product is safe to scale. Input selling price, COGS, shipping, fulfillment, COD, VAT, OPEX, ad spend, orders, delivered %, and RTS %." },
                          { title: "Reporting Center", body: "Use this daily. Add/select product, submit media buyer report, submit designer report, generate daily marketing report, and review product report history." },
                          { title: "Tasks", body: "Use this as the execution board. Create tasks, assign role/member, choose priority, due date, and move cards from To Do to In Progress to For Review to Done." },
                          { title: "Products", body: "Use this as product operating hub. Store product assets, creative links, LP links, reports, tasks, and AI product direction per selected product." },
                          { title: "Marketing Team", body: "Owner/admin module for inviting members, assigning roles, viewing pending invites, and managing workspace collaboration." },
                          { title: "Campaign Memory", body: "Use this to save campaign snapshots after important test decisions. It stores diagnosis, awareness stage, metrics, tasks, and notes for future review." },
                          { title: "System Setup", body: "Owner/admin module for cloud setup, invite-only account flow, Supabase status, database plan, and future backend connection steps." },
                        ].map((item) => (
                          <div key={item.title} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                            <h3 className="font-black text-slate-900">{item.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6 md:p-8">
                      <Badge className="mb-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Go-Live Checklist</Badge>
                      <h2 className="text-2xl font-black">Recommended Daily Operating Flow</h2>
                      <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                          <h3 className="text-lg font-black text-slate-900">Before Running Ads</h3>
                          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                            <li>✅ Workspace is correct.</li>
                            <li>✅ Product is added and selected.</li>
                            <li>✅ Selling price, COGS, shipping, fulfillment, COD, VAT, and OPEX are entered.</li>
                            <li>✅ Campaign/adset/creative names are prepared.</li>
                            <li>✅ Landing page and offer are clear.</li>
                          </ul>
                        </div>
                        <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                          <h3 className="text-lg font-black text-slate-900">End Of Day Reporting</h3>
                          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                            <li>✅ Media buyer submits spend, ROAS, CTR, CPC, CPP, winning angle, action, and notes.</li>
                            <li>✅ Designer submits creatives produced and asset links.</li>
                            <li>✅ Owner reviews Dashboard, AI Strategist, and Scaling Center.</li>
                            <li>✅ New tasks are created based on findings.</li>
                            <li>✅ Important results are saved in Campaign Memory or Ads Testing Lab.</li>
                          </ul>
                        </div>
                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                          <h3 className="text-lg font-black text-slate-900">Scaling Rules</h3>
                          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                            <li>• Scale only if ROAS is above breakeven and CPP is inside safe zone.</li>
                            <li>• Do not scale if RTS is high or delivered rate is weak.</li>
                            <li>• Do not change creative, offer, and landing page all at once.</li>
                            <li>• One major variable per test only.</li>
                            <li>• Increase budget gradually, usually 15% to 20% first.</li>
                          </ul>
                        </div>
                        <div className="rounded-3xl border border-rose-100 bg-rose-50 p-5">
                          <h3 className="text-lg font-black text-slate-900">Common Mistakes To Avoid</h3>
                          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                            <li>• Submitting reports under the wrong product.</li>
                            <li>• Scaling based only on ROAS without checking CPP and RTS.</li>
                            <li>• Forgetting to save winning test snapshots.</li>
                            <li>• Letting tasks stay without status updates.</li>
                            <li>• Mixing team reports from different workspaces/products.</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="profitability" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Profitability Engine</Badge>
                          <h2 className="text-2xl font-black">Markuz Golden Calculator</h2>
                          <p className="mt-2 text-slate-600">CPP, ROAS, margin, RTS, and scale safety calculator for ecommerce testing decisions.</p>
                        </div>
                        <div className="rounded-3xl bg-emerald-50 p-4 text-emerald-700"><DollarSign size={30} /></div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-4">
                        <StatCard icon={DollarSign} label="Selling Price" value={formatPeso(inputs.sellingPrice)} sub="Current product price" tone="blue" />
                        <StatCard icon={TrendingUp} label="ROAS" value={metrics.roas.toFixed(2)} sub={"Breakeven ROAS " + metrics.beRoas.toFixed(2)} tone={metrics.roas >= metrics.beRoas ? "green" : "red"} />
                        <StatCard icon={MousePointerClick} label="Current CPP" value={formatPeso(metrics.currentCPP)} sub={"Safe CPP " + formatPeso(metrics.safeCPP)} tone={metrics.currentCPP <= metrics.safeCPP ? "green" : metrics.currentCPP <= metrics.maxScaleCPP ? "amber" : "red"} />
                        <StatCard icon={LineChart} label="Projected Profit" value={formatPeso(metrics.projectedProfit)} sub="After RTS estimate" tone={metrics.projectedProfit >= 0 ? "green" : "red"} />
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
                        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Profit Breakdown</p>
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Revenue</p><p className="text-xl font-black text-slate-900">{formatPeso(metrics.revenue)}</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Delivered Orders</p><p className="text-xl font-black text-slate-900">{Number(metrics.deliveredOrders || 0).toFixed(1)}</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Gross Per Order</p><p className="text-xl font-black text-slate-900">{formatPeso(metrics.grossPerOrder)}</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Net Margin</p><p className="text-xl font-black text-slate-900">{formatPercent(metrics.netMargin)}</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Breakeven CPP</p><p className="text-xl font-black text-slate-900">{formatPeso(metrics.breakEvenCPP)}</p></div>
                            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Max Scale CPP</p><p className="text-xl font-black text-slate-900">{formatPeso(metrics.maxScaleCPP)}</p></div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Scaling Signal</p>
                          <h3 className="mt-2 text-3xl font-black text-slate-900">{getScalingSignal()}</h3>
                          <p className="mt-3 text-sm leading-6 text-slate-600">This signal compares projected profit, current CPP, safe CPP, ROAS, and RTS risk.</p>
                          <div className="mt-4 space-y-3">
                            <ScoreBar label="Profit Score" value={funnelScores.profitStrength} note="ROAS vs breakeven" />
                            <ScoreBar label="Buyer Quality" value={funnelScores.buyerIntent} note="RTS / delivered risk" />
                            <ScoreBar label="Overall Safety" value={funnelScores.overall} note="Combined funnel score" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 rounded-3xl border border-amber-100 bg-amber-50 p-5">
                        <div className="flex gap-3">
                          <AlertTriangle className="mt-1 shrink-0 text-amber-700" size={22} />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Calculator Note</p>
                            <p className="mt-2 text-sm leading-6 text-amber-900">Use the input panel on the left to adjust price, COGS, shipping, fulfillment, COD %, VAT, ad spend, orders, and delivered %. This module is now separate from the main dashboard.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="test" className="mt-5">
                <div className="space-y-5">
                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-50">Spryve Intelligence Core V1</Badge>
                          <h2 className="text-2xl font-black">Testing Decision Engine</h2>
                          <p className="mt-2 text-slate-600">Dynamic decision system for ads, landing page conversion, ROAS safety, CPP risk, and next test recommendation.</p>
                        </div>
                        <div className="rounded-3xl bg-blue-50 p-4 text-blue-700"><BrainCircuit size={30} /></div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-4">
                        <StatCard icon={MousePointerClick} label="Traffic Signal" value={metrics.ctr >= 2.5 ? "Strong" : metrics.ctr >= 1.5 ? "Acceptable" : "Weak"} sub={formatPercent(metrics.ctr) + " CTR"} tone={metrics.ctr >= 2.5 ? "green" : metrics.ctr >= 1.5 ? "amber" : "red"} />
                        <StatCard icon={TrendingUp} label="Conversion Signal" value={metrics.cvr >= 3 ? "Healthy" : metrics.cvr >= 1.5 ? "Needs Work" : "Weak"} sub={formatPercent(metrics.cvr) + " CVR"} tone={metrics.cvr >= 3 ? "green" : metrics.cvr >= 1.5 ? "amber" : "red"} />
                        <StatCard icon={DollarSign} label="Profit Safety" value={metrics.roas >= metrics.beRoas ? "Safe" : metrics.roas >= metrics.beRoas * 0.85 ? "Watch" : "Risk"} sub={"ROAS " + metrics.roas.toFixed(2) + " / BE " + metrics.beRoas.toFixed(2)} tone={metrics.roas >= metrics.beRoas ? "green" : metrics.roas >= metrics.beRoas * 0.85 ? "amber" : "red"} />
                        <StatCard icon={ShieldCheck} label="Tracking Mode" value={metrics.noAtcMode ? "No ATC" : "Full Funnel"} sub={metrics.noAtcMode ? "ATC/Checkout unavailable" : formatPercent(metrics.atcRate) + " ATC"} tone={metrics.noAtcMode ? "amber" : "green"} />
                        <StatCard icon={ShieldCheck} label="COD Quality" value={inputs.rtsRate <= 20 ? "Good" : inputs.rtsRate <= 30 ? "Caution" : "High Risk"} sub={inputs.rtsRate + "% RTS"} tone={inputs.rtsRate <= 20 ? "green" : inputs.rtsRate <= 30 ? "amber" : "red"} />
                      </div>

                      {metrics.noAtcMode ? (
                      <div className="mt-5 rounded-3xl border border-amber-100 bg-amber-50 p-5">
                        <div className="flex gap-3">
                          <AlertTriangle className="mt-1 shrink-0 text-amber-700" size={22} />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">No-ATC Mode Active</p>
                            <h3 className="mt-1 text-xl font-black text-slate-900">ATC and Checkout events are not available.</h3>
                            <p className="mt-2 text-sm leading-6 text-amber-900">The engine will diagnose using CTR, order CVR, ROAS, CPP, RTS, and profit safety. This is useful for WebCake/order-form setups where Meta does not capture Add to Cart or Initiate Checkout properly.</p>
                          </div>
                        </div>
                      </div>
                      ) : null}

                      <div className="mt-5 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Final Testing Decision</p>
                            <h3 className="mt-1 text-3xl font-black text-slate-900">
                              {metrics.ctr < 1.5 ? "CHANGE CREATIVE" : metrics.ctr >= 2.5 && metrics.cvr < 3 ? "FIX LANDING PAGE" : metrics.roas < metrics.beRoas ? "PROTECT PROFIT" : inputs.rtsRate >= 30 ? "REDUCE RTS RISK" : "CONTROLLED SCALE TEST"}
                            </h3>
                          </div>
                          <Badge className={metrics.ctr < 1.5 || metrics.roas < metrics.beRoas || inputs.rtsRate >= 30 ? "bg-rose-50 text-rose-700" : metrics.ctr >= 2.5 && metrics.cvr < 3 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}>
                            {metrics.ctr < 1.5 || metrics.roas < metrics.beRoas || inputs.rtsRate >= 30 ? "Needs Fix" : metrics.ctr >= 2.5 && metrics.cvr < 3 ? "Promising But Blocked" : "Scale Candidate"}
                          </Badge>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                          <div className="space-y-3">
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Why this decision?</p>
                              <p className="mt-2 text-sm leading-6 text-slate-700">
                                {metrics.ctr < 1.5
                                  ? "CTR is below the safe attention threshold. The current hook or creative is not stopping enough buyers, so landing page changes are not the first priority."
                                  : metrics.ctr >= 2.5 && metrics.cvr < 3
                                  ? "The ad is getting attention, but the landing page is not converting enough of that traffic. This usually means trust, offer, or belief progression problem."
                                  : metrics.roas < metrics.beRoas
                                  ? "Revenue is not safely above breakeven. Scaling now can increase losses even if the campaign has some sales activity."
                                  : inputs.rtsRate >= 30
                                  ? "The funnel may be creating orders, but buyer quality is risky. COD expectation-setting and trust reinforcement should be improved before aggressive scaling."
                                  : "Core signals are healthy enough for a controlled scale test. Budget should increase carefully while monitoring CPP, ROAS, CVR, and RTS."}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Recommended next action</p>
                              <p className="mt-2 text-sm leading-6 text-slate-700">
                                {metrics.ctr < 1.5
                                  ? "Create 3 new creatives using different hooks: fear angle, family concern angle, and curiosity angle. Keep landing page and offer unchanged for clean testing."
                                  : metrics.ctr >= 2.5 && metrics.cvr < 3
                                  ? "Move testimonials, COD reassurance, and trust proof before the offer. Do not change the winning creative yet."
                                  : metrics.roas < metrics.beRoas
                                  ? "Improve offer stack, reduce CPP, or increase conversion rate before increasing budget. Keep spend controlled."
                                  : inputs.rtsRate >= 30
                                  ? "Add expectation-setting copy, COD confirmation language, and realistic product positioning before checkout."
                                  : "Increase budget by 15% to 20% only. Do not duplicate too aggressively until results stay stable for another checkpoint."}
                              </p>
                            </div>
                          </div>

                          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Decision Confidence</p>
                            <h3 className="mt-2 text-4xl font-black text-slate-900">
                              {Math.round(Math.min(96, Math.max(55, intelligenceScore.healthScore + (metrics.ctr >= 2.5 ? 7 : 0) - (inputs.rtsRate >= 30 ? 10 : 0))))}%
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Confidence is based on traffic strength, conversion strength, ROAS safety, awareness match, and RTS risk.</p>
                            <div className="mt-4 space-y-2">
                              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm"><b>Spend Checkpoint:</b> {formatPeso(inputs.adSpend)}</div>
                              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm"><b>CPP:</b> {formatPeso(inputs.orders ? inputs.adSpend / inputs.orders : 0)}</div>
                              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm"><b>Breakeven CPP:</b> {formatPeso(metrics.breakEvenCPP)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-[2rem] bg-white text-slate-900 shadow-xl">
                    <CardContent className="p-6">
                      <h2 className="mb-4 flex items-center gap-2 text-2xl font-black"><CheckCircle2 className="text-emerald-600" /> Next Test Plan</h2>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-100 p-4"><p className="text-xs font-bold text-slate-500">KEEP</p><p className="mt-2 text-sm">Keep the strongest winning variable unchanged so the next test stays clean.</p></div>
                        <div className="rounded-2xl border border-slate-100 p-4"><p className="text-xs font-bold text-slate-500">CHANGE</p><p className="mt-2 text-sm">Change only the weakest detected variable: creative, LP trust flow, offer, or RTS protection.</p></div>
                        <div className="rounded-2xl border border-slate-100 p-4"><p className="text-xs font-bold text-slate-500">MEASURE</p><p className="mt-2 text-sm">Track CTR, CVR, ROAS, CPP, projected profit, and RTS after the next spend checkpoint.</p></div>
                      </div>
                      <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                        <div className="flex gap-2"><AlertTriangle size={18} /><span><b>Rule:</b> Huwag sabay-sabay palitan creative, offer, and LP. One major variable per test lang.</span></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
