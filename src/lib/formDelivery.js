import { createClient } from "@supabase/supabase-js";

const FORM_DELIVERY_MODE = import.meta.env.VITE_FORM_DELIVERY_MODE || "emailjs";
const CRM_API_BASE_URL = import.meta.env.VITE_CRM_API_BASE_URL || "http://localhost:3000";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_SCHEMA = import.meta.env.VITE_SUPABASE_SCHEMA || "public";
const SUPABASE_LEADS_TABLE = import.meta.env.VITE_SUPABASE_LEADS_TABLE || "leads";

let supabaseClient;

function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables.");
  }

  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      db: { schema: SUPABASE_SCHEMA },
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
  const res = await fetch(`${CRM_API_BASE_URL}/api/intake`, {
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

  const { error } = await client.from(SUPABASE_LEADS_TABLE).insert([leadRow]);

  if (error) {
    throw error;
  }

  return { ok: true };
}

export async function submitLead({ leadPayload, emailPayload, emailConfig }) {
  switch (FORM_DELIVERY_MODE) {
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

export { FORM_DELIVERY_MODE };