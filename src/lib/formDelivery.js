import { createClient } from "@supabase/supabase-js";

const PULSE_INTAKE_BASE_URL = "/api/intake";

function getFormDeliveryMode() {
  const mode = (process.env.NEXT_PUBLIC_FORM_DELIVERY_MODE || "pulse").trim().toLowerCase();

  if (["pulse", "crm", "shadow", "emailjs", "supabase"].includes(mode)) {
    return mode;
  }

  console.warn(`Unknown form delivery mode "${mode}". Falling back to Pulse.`);
  return "pulse";
}

function getCrmApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_CRM_API_BASE_URL || PULSE_INTAKE_BASE_URL).replace(/\/$/, "");
}

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function getSupabaseSchema() {
  return process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public";
}

function getSupabaseLeadsTable() {
  return process.env.NEXT_PUBLIC_SUPABASE_LEADS_TABLE || "leads";
}

let supabaseClient;

function getSupabaseClient() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabaseAnonKey();

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      db: { schema: getSupabaseSchema() },
    });
  }

  return supabaseClient;
}

export async function submitToEmailJS(templateParams, emailConfig) {
  const { serviceId, templateId, publicKey } = emailConfig;

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    }),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "EmailJS request failed.");
    throw new Error(message || "EmailJS request failed.");
  }

  return res;
}

export async function submitToCrmIntake(payload) {
  const intakeUrl = getCrmApiBaseUrl().endsWith("/api/intake")
    ? getCrmApiBaseUrl()
    : `${getCrmApiBaseUrl()}/api/intake`;
  const res = await fetch(intakeUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(JSON.stringify(data || { message: "CRM intake failed." }));
  }

  return res;
}

export async function submitToSupabase(payload) {
  const client = getSupabaseClient();
  const leadRow = {
    ...payload,
    payload: payload.payload || null,
  };

  const { error } = await client.from(getSupabaseLeadsTable()).insert([leadRow]);

  if (error) {
    throw error;
  }

  return { ok: true };
}

export async function submitLead({ leadPayload, emailPayload, emailConfig }) {
  switch (getFormDeliveryMode()) {
    case "pulse":
    case "crm":
      return submitToCrmIntake(leadPayload);

    case "supabase":
      return submitToSupabase(leadPayload);

    case "shadow": {
      await submitToEmailJS(emailPayload, emailConfig);
      submitToCrmIntake(leadPayload).catch((error) => {
        console.error("CRM shadow submit failed:", error);
      });
      return { ok: true };
    }

    case "emailjs":
    default:
      return submitToEmailJS(emailPayload, emailConfig);
  }
}

export { getFormDeliveryMode as FORM_DELIVERY_MODE };