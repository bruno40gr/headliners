import { useState } from "react";
import SummerCampPage from "./SummerCampPage";
import { ArrowRight, MapPin, Mail, Phone, Menu, X, ChevronDown } from "lucide-react";

const offerings = [
  { icon: "🎸", name: "Guitar", desc: "Acoustic & electric" },
  { icon: "🎹", name: "Piano", desc: "Classical & contemporary" },
  { icon: "🥁", name: "Drums", desc: "Kit & percussion" },
  { icon: "🎸", name: "Bass", desc: "Electric & upright" },
  { icon: "🎤", name: "Vocals", desc: "All styles" },
  { icon: "🎺", name: "Brass", desc: "Trumpet & more" },
  { icon: "🎻", name: "Strings", desc: "Violin & viola" },
  { icon: "🤘", name: "Band Performance", desc: "Live stage experience" },
  { icon: "🧸", name: "Piano for Kids", desc: "Fun early learning" },
  { icon: "🎉", name: "Private Parties", desc: "Birthdays & events" },
  { icon: "🎙️", name: "Recording Studio", desc: "Record & produce music" },
];

const DAYS  = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const TIMES = ["Morning (8am–12pm)","Afternoon (12pm–4pm)","Evening (4pm–8pm)"];
const PORTAL_URL  = "https://headlinerma.opus1.io/login";
const CAMP_URL    = "https://headlinerma.opus1.io/w/summercamp2026";
const CAMP_PAGE   = "/summer-camp";

const EMAILJS_SERVICE_ID  = "service_734y6qg";
const EMAILJS_TEMPLATE_ID = "template_czlclec";
const EMAILJS_PUBLIC_KEY  = "FdW-lGbAyQuJZFy-y";

const LOGO_URL     = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png";
const LOGO_URL_INV = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png";

// ── tokens ──────────────────────────────────────────────────────────────────
const C = {
  espresso: "#1e130e",
  crimson:  "#FF0044",
  cream:    "#FDFBF7",
  white:    "#FFFFFF",
  teal:     "#00C4B5",
  yellow:   "#FFD166",
  muted:    "#7A6A5A",
  border:   "#F0EBE1",
};

// ── shared styles ────────────────────────────────────────────────────────────
const btnRed = {
  display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
  background: C.crimson, color:"#fff",
  fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
  padding:"13px 32px", borderRadius:999, border:"none", cursor:"pointer",
  textDecoration:"none", transition:"all 0.2s",
};
const btnGhost = {
  display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
  background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.8)",
  fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
  padding:"13px 32px", borderRadius:999,
  border:"1px solid rgba(255,255,255,0.15)", cursor:"pointer",
  textDecoration:"none", transition:"background 0.2s",
};
const btnOutlineRed = {
  display:"inline-flex", alignItems:"center", gap:8,
  border:`1.5px solid ${C.crimson}`, color:C.crimson,
  fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
  padding:"10px 22px", borderRadius:999, background:"transparent",
  cursor:"pointer", textDecoration:"none", transition:"all 0.2s",
};

// ── BookingModal ─────────────────────────────────────────────────────────────
function BookingModal({ instrument, onClose }) {
  const [form, setForm] = useState({
    name:"", age:"", email:"", instrument: instrument||"",
    level:"", days:[], times:[], notes:"",
  });
  const [status, setStatus] = useState("idle");

  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const toggleArr = (k,v) => setForm(f=>({
    ...f,[k]: f[k].includes(v) ? f[k].filter(x=>x!==v) : [...f[k],v],
  }));

  const handleSubmit = async () => {
    if (!form.name.trim()||!form.instrument.trim()||!form.level||!form.email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID, template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params:{
            student_name: form.name, age: form.age||"Not provided",
            email: form.email, instrument: form.instrument,
            experience_level: form.level,
            days: form.days.join(", ")||"Not specified",
            time_of_day: form.times.join(", ")||"Not specified",
            message: form.notes||"None",
          },
        }),
      });
      const text = await res.text();
      setStatus(res.ok ? "success" : "error");
      if (!res.ok) console.error("EmailJS:", text);
    } catch { setStatus("error"); }
  };

  const valid = form.name.trim()&&form.email.trim()&&form.instrument.trim()&&form.level&&status==="idle";

  return (
    <div
      onClick={e=>e.target===e.currentTarget&&status!=="sending"&&onClose()}
      style={{
        position:"fixed",inset:0,zIndex:200,
        background:"rgba(10,5,3,0.75)", backdropFilter:"blur(8px)",
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:16, overflowY:"auto",
      }}
    >
      <div style={{
        background:C.white, borderRadius:24, width:"100%", maxWidth:520,
        padding:"40px 36px", position:"relative", boxSizing:"border-box",
        margin:"auto", boxShadow:"0 24px 64px rgba(0,0,0,0.2)",
        border:`1px solid ${C.border}`,
      }}>
        {status!=="sending"&&(
          <button onClick={onClose} style={{
            position:"absolute",top:16,right:16,
            background:C.border,border:"none",borderRadius:"50%",
            width:34,height:34,display:"flex",alignItems:"center",
            justifyContent:"center",cursor:"pointer",color:C.muted,
          }}><X size={16}/></button>
        )}

        {status==="success" ? (
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{fontSize:52,marginBottom:16}}>🎶</div>
            <h2 style={{
              fontFamily:"'Raleway',sans-serif",fontWeight:900,
              fontSize:36,color:C.espresso,letterSpacing:-1,
              margin:"0 0 12px",lineHeight:1.1,
            }}>
              We'll be in touch <span style={{color:C.crimson}}>soon!</span>
            </h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",color:C.muted,fontSize:15,lineHeight:1.7,maxWidth:360,margin:"0 auto 8px"}}>
              We'll get back to you within the next 24 hours — expect a call from us to get everything set up.
            </p>
            <p style={{fontFamily:"'DM Sans',sans-serif",color:"#aaa",fontSize:13,margin:"0 auto 28px"}}>
              Keep an eye on your phone. 📞
            </p>
            <button onClick={onClose} style={{...btnRed,padding:"13px 32px"}}>Back to site</button>
          </div>
        ):(
          <>
            <div style={{marginBottom:28}}>
              <h2 style={{
                fontFamily:"'Raleway',sans-serif",fontWeight:900,
                fontSize:34,letterSpacing:-1,color:C.espresso,
                margin:"0 0 6px",lineHeight:1.1,
              }}>
                Let's find your <span style={{color:C.crimson}}>sound.</span>
              </h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:C.muted,margin:0,lineHeight:1.6}}>
                Tell us a little about your musician and we'll call you to set things up.
              </p>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              <Field label="Student name *">
                <input type="text" placeholder="e.g. Jordan Smith" value={form.name} onChange={e=>set("name",e.target.value)}/>
              </Field>
              <Field label="Your email *">
                <input type="email" placeholder="e.g. parent@email.com" value={form.email} onChange={e=>set("email",e.target.value)}/>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#aaa",margin:"4px 0 0"}}>
                  We'll only use this to confirm your inquiry. No spam, ever.
                </p>
              </Field>
              <Field label="Age (optional)">
                <input type="number" placeholder="e.g. 14" min={4} max={99} value={form.age} onChange={e=>set("age",e.target.value)} style={{maxWidth:120}}/>
              </Field>
              <Field label="Instrument or program *">
                <div style={{position:"relative"}}>
                  <select value={form.instrument} onChange={e=>set("instrument",e.target.value)} style={{paddingRight:36}}>
                    <option value="">Select one…</option>
                    {offerings.map(o=>(
                      <option key={o.name} value={o.name}>{o.icon} {o.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#aaa"}}/>
                </div>
              </Field>
              <Field label="Experience level *">
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {["Beginner","Intermediate","Advanced","I don't know"].map(lvl=>(
                    <PillToggle key={lvl} label={lvl} active={form.level===lvl} onClick={()=>set("level",lvl)}/>
                  ))}
                </div>
              </Field>
              <Field label="Days that work best">
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {DAYS.map(d=>(
                    <PillToggle key={d} label={d} active={form.days.includes(d)} onClick={()=>toggleArr("days",d)}/>
                  ))}
                </div>
              </Field>
              <Field label="Preferred time of day">
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {TIMES.map(t=>(
                    <PillToggle key={t} label={t} active={form.times.includes(t)} onClick={()=>toggleArr("times",t)}/>
                  ))}
                </div>
              </Field>
              <Field label="Anything else? (optional)">
                <textarea placeholder="Goals, questions, previous experience…" value={form.notes} onChange={e=>set("notes",e.target.value)} rows={3}/>
              </Field>

              {status==="error"&&(
                <p style={{
                  fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#dc2626",
                  background:"#fef2f2",border:"1px solid #fecaca",
                  borderRadius:10,padding:"10px 14px",margin:0,
                }}>
                  Something went wrong — please try again or reach us at (916) 435-1300.
                </p>
              )}

              <button
                onClick={handleSubmit} disabled={!valid}
                style={{
                  marginTop:4,
                  background: valid ? C.crimson : C.border,
                  border:"none",borderRadius:999,
                  padding:"15px 28px",
                  fontFamily:"'DM Sans',sans-serif",
                  fontWeight:700,fontSize:15,
                  cursor: valid?"pointer":"not-allowed",
                  color: valid?"#fff":C.muted,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  gap:8,transition:"all 0.2s",width:"100%",
                }}
                onMouseEnter={e=>valid&&(e.currentTarget.style.background=C.teal)}
                onMouseLeave={e=>valid&&(e.currentTarget.style.background=C.crimson)}
              >
                {status==="sending" ? "Sending…" : <>Let's make music <ArrowRight size={16}/></>}
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        select { appearance:none !important; -webkit-appearance:none !important; }
        input, select, textarea {
          background: #fafaf8 !important;
          border: 1px solid ${C.border} !important;
          border-radius: 10px !important;
          color: ${C.espresso} !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          padding: 10px 14px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          outline: none !important;
          transition: border-color 0.2s !important;
        }
        input:focus, select:focus, textarea:focus {
          border-color: ${C.crimson} !important;
          background: #fff !important;
        }
        input::placeholder, textarea::placeholder { color: #bbb !important; }
        textarea { resize: vertical; }
        input[type="number"] { max-width:120px !important; width:120px !important; }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label style={{
        fontFamily:"'DM Sans',sans-serif",
        fontSize:10,fontWeight:700,
        letterSpacing:"0.14em",textTransform:"uppercase",color:C.muted,
      }}>{label}</label>
      {children}
    </div>
  );
}

function PillToggle({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"7px 14px",borderRadius:999,
      border: active ? `1.5px solid ${C.crimson}` : `1px solid ${C.border}`,
      background: active ? "rgba(255,0,68,0.06)" : "#fafaf8",
      color: active ? C.crimson : C.muted,
      fontFamily:"'DM Sans',sans-serif",
      fontSize:13,fontWeight: active?700:400,
      cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

function PrivacyPolicyPage() {
  return (
    <div style={{paddingTop:120,paddingBottom:80,paddingLeft:24,paddingRight:24,maxWidth:720,margin:"0 auto",minHeight:"100vh"}}>
      <h1 style={{fontFamily:"'Raleway',sans-serif",fontWeight:900,fontSize:"clamp(2.4rem,6vw,3.4rem)",color:C.espresso,letterSpacing:-1,margin:"0 0 8px",lineHeight:1}}>
        Privacy Policy
      </h1>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,marginBottom:40}}>Last updated: May 18, 2026</p>
      <div style={{fontFamily:"'DM Sans',sans-serif",color:C.muted,lineHeight:1.8,display:"flex",flexDirection:"column",gap:24,fontSize:15}}>
        <p>Headliner Music Academy (a DBA of Marchena &amp; Papadhima LLC) is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information.</p>
        {[
          ["Information we collect","We collect information you provide when enrolling a student or contacting us, including name, phone number, email address, and payment information. We also collect attendance and lesson history as part of our normal operations."],
          ["How we use your information","We use your information to manage enrollments, process payments, communicate about lessons and scheduling, and send you updates about Headliner Music Academy programs and events."],
          ["SMS and email communications","By providing your phone number or email address, you consent to receive SMS and email communications from Headliner Music Academy. You may opt out of SMS messages at any time by replying STOP. You may opt out of email communications by clicking unsubscribe in any email we send."],
          ["Information sharing","We do not sell or share your personal information with third parties for marketing purposes. We may share information with service providers who help us operate our business (such as payment processors and messaging platforms) under strict confidentiality agreements."],
          ["Data security","We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure."],
        ].map(([title,body])=>(
          <div key={title}>
            <strong style={{color:C.espresso,display:"block",marginBottom:4}}>{title}:</strong>
            {body}
          </div>
        ))}
        <div>
          <strong style={{color:C.espresso,display:"block",marginBottom:4}}>Contact us:</strong>
          <a href="mailto:admin@headlinermusicacademy.com" style={{color:C.crimson,textDecoration:"none"}}>admin@headlinermusicacademy.com</a> or <a href="tel:916-435-1300" style={{color:C.crimson,textDecoration:"none"}}>(916) 435-1300</a>.
        </div>
      </div>
    </div>
  );
}

function TermsAndConditionsPage() {
  return (
    <div style={{paddingTop:120,paddingBottom:80,paddingLeft:24,paddingRight:24,maxWidth:720,margin:"0 auto",minHeight:"100vh"}}>
      <h1 style={{fontFamily:"'Raleway',sans-serif",fontWeight:900,fontSize:"clamp(2.4rem,6vw,3.4rem)",color:C.espresso,letterSpacing:-1,margin:"0 0 8px",lineHeight:1}}>
        Terms and Conditions
      </h1>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,marginBottom:40}}>Last updated: May 18, 2026</p>
      <div style={{fontFamily:"'DM Sans',sans-serif",color:C.muted,lineHeight:1.8,display:"flex",flexDirection:"column",gap:24,fontSize:15}}>
        <p>These terms govern your enrollment and participation at Headliner Music Academy (a DBA of Marchena &amp; Papadhima LLC), located at 2311 Sunset Blvd, Rocklin, CA 95765.</p>
        {[
          ["Enrollment and billing","Enrollment is on a monthly subscription basis. Billing occurs automatically each month on your billing date. You are responsible for keeping payment information current."],
          ["Cancellations and holds",`You may cancel or place your account on hold by contacting us at (916) 435-1300 or admin@headlinermusicacademy.com. Cancellations require notice before your next billing date to avoid being charged for the following month.`],
          ["24-Hour Absence Notice","If, for any reason, your student is unable to attend a lesson, please note that we have a strict 24-hour cancellation policy out of respect for our teachers' schedules and how they are compensated. If you call, email, or leave a voicemail at least 24 hours before the reserved lesson, even if Headliner is closed at the time you contact us, we would be happy to reschedule it within 30 days."],
          ["Communications","By enrolling, you agree to receive operational and promotional communications from Headliner Music Academy via SMS and email. You may opt out at any time by replying STOP to any SMS or contacting us directly."],
          ["Code of conduct","We are committed to maintaining a respectful and safe environment for all students, families, and staff. Headliner Music Academy reserves the right to terminate enrollment for conduct that disrupts the learning environment."],
          ["Limitation of liability","Headliner Music Academy is not responsible for lost, stolen, or damaged personal property on academy premises."],
          ["Changes to these terms","We may update these terms from time to time. Continued enrollment constitutes acceptance of any updated terms."],
        ].map(([title,body])=>(
          <div key={title}>
            <strong style={{color:C.espresso,display:"block",marginBottom:4}}>{title}:</strong>
            {body}
          </div>
        ))}
        <div>
          <strong style={{color:C.espresso,display:"block",marginBottom:4}}>Contact us:</strong>
          <a href="mailto:admin@headlinermusicacademy.com" style={{color:C.crimson,textDecoration:"none"}}>admin@headlinermusicacademy.com</a> or <a href="tel:916-435-1300" style={{color:C.crimson,textDecoration:"none"}}>(916) 435-1300</a>.
        </div>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingFor, setBookingFor]  = useState(null);

  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",background:C.cream,color:C.espresso,overflowX:"hidden",maxWidth:"100vw"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,700;0,800;0,900;1,700;1,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        ::selection { background: rgba(255,0,68,0.15); color: ${C.espresso}; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.65s ease both; }
        .delay-1   { animation-delay: 0.08s; }
        .delay-2   { animation-delay: 0.18s; }
        .delay-3   { animation-delay: 0.28s; }
        .delay-4   { animation-delay: 0.38s; }
        .delay-5   { animation-delay: 0.48s; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 24s linear infinite; display:flex; width:max-content; }

        @keyframes driftSpot {
          0%   { transform:translate(-50%,-50%) scale(1);    opacity:0.10; }
          33%  { transform:translate(-48%,-53%) scale(1.06); opacity:0.14; }
          66%  { transform:translate(-52%,-47%) scale(0.96); opacity:0.09; }
          100% { transform:translate(-50%,-50%) scale(1);    opacity:0.10; }
        }
        .crimson-spot {
          position:absolute; top:50%; left:50%;
          width:700px; height:500px; border-radius:50%;
          background: radial-gradient(ellipse at center, rgba(255,0,68,0.45) 0%, transparent 70%);
          animation: driftSpot 9s ease-in-out infinite;
          pointer-events:none; mix-blend-mode:screen; filter:blur(40px);
        }
        .vignette {
          background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%);
        }
        .stage-line {
          position:absolute; bottom:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg, transparent, ${C.crimson} 30%, ${C.crimson} 70%, transparent);
          opacity:0.85;
        }
        @keyframes pulse {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }
        .tag-dot {
          width:6px; height:6px; border-radius:50%; background:${C.crimson};
          animation: pulse 2s ease-in-out infinite;
        }
        .offering-card {
          cursor:pointer;
          transition: background 0.2s, transform 0.15s;
          position:relative;
        }
        .offering-card:hover { background: rgba(255,0,68,0.04) !important; transform:translateY(-2px); z-index:1; }
        .offering-card:hover .card-hint { opacity:1; }
        .card-hint {
          opacity:0; transition:opacity 0.2s;
          font-size:10px; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase;
          color:${C.crimson}; margin-top:8px;
          font-family:'DM Sans',sans-serif;
        }
        .nav-link {
          font-size:12px; font-weight:600;
          letter-spacing:0.1em; text-transform:uppercase;
          color:${C.muted}; text-decoration:none;
          transition:color 0.2s; position:relative; padding-bottom:2px;
        }
        .nav-link::after {
          content:''; position:absolute; bottom:0; left:0; right:0;
          height:1px; background:${C.crimson};
          transform:scaleX(0); transform-origin:left; transition:transform 0.2s;
        }
        .nav-link:hover { color:${C.espresso}; }
        .nav-link:hover::after { transform:scaleX(1); }
        .btn-red-hover:hover { background: #CC0036 !important; }
        .portal-btn:hover { background: #CC0036 !important; transform:translateY(-1px); }
        .mobile-cta:hover { background: #CC0036 !important; }

        /* ── Global mobile fixes ── */
        html, body { overflow-x:hidden !important; max-width:100vw !important; }
        * { min-width:0; box-sizing:border-box; }

        @media (max-width:768px) {
          nav { padding:0 16px !important; }
          .desktop-nav { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
          section { padding-left:20px !important; padding-right:20px !important; }
          header  { padding-left:20px !important; padding-right:20px !important; }
          .camp-grid    { grid-template-columns:1fr !important; gap:40px !important; }
          .camp-details { grid-template-columns:1fr 1fr !important; }
          .offerings-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media (min-width:769px) {
          .mobile-menu-btn { display:none !important; }
        }
      `}</style>

      {bookingFor !== null && (
        <BookingModal instrument={bookingFor} onClose={()=>setBookingFor(null)}/>
      )}

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed",top:0,width:"100%",zIndex:100,
        background:`rgba(253,251,247,0.95)`,
        backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${C.border}`,
        height:68,display:"flex",alignItems:"center",
        padding:"0 40px",justifyContent:"space-between",
        boxSizing:"border-box",overflow:"hidden",
      }}>
        <a href="/" style={{display:"flex",alignItems:"center",textDecoration:"none"}}>
          <img src={LOGO_URL} alt="Headliner Music Academy" style={{height:44,width:"auto",maxWidth:160,flexShrink:0}}/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:24}} className="desktop-nav">
          <a
            href={PORTAL_URL} target="_blank" rel="noreferrer"
            className="nav-link"
            style={{fontFamily:"'DM Sans',sans-serif",textDecoration:"none"}}
          >
            Parent Portal
          </a>
          <button
            onClick={()=>setBookingFor("")}
            className="btn-red-hover"
            style={{...btnRed,padding:"10px 22px",fontSize:12}}
          >
            Request Lessons <ArrowRight size={13}/>
          </button>
        </div>
        <button
          style={{display:"none",background:"none",border:"none",cursor:"pointer",color:C.muted,padding:8}}
          className="mobile-menu-btn"
          onClick={()=>setMobileOpen(v=>!v)}
        >
          {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </nav>

      {mobileOpen && (
        <div style={{
          position:"fixed",top:68,left:0,right:0,zIndex:99,
          background:C.cream,borderBottom:`1px solid ${C.border}`,
          padding:"20px 24px",display:"flex",flexDirection:"column",gap:12,
          boxShadow:"0 8px 24px rgba(0,0,0,0.08)",
        }}>
          <a
            href={PORTAL_URL} target="_blank" rel="noreferrer"
            style={{
              fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,
              color:C.muted,textDecoration:"none",
              padding:"8px 0",borderBottom:`1px solid ${C.border}`,display:"block",
            }}
            onClick={()=>setMobileOpen(false)}
          >
            Parent Portal
          </a>
          <button
            onClick={()=>{setBookingFor("");setMobileOpen(false);}}
            className="mobile-cta"
            style={{...btnRed,justifyContent:"center",padding:"13px 24px",border:"none"}}
          >
            Request Lessons <ArrowRight size={14}/>
          </button>
        </div>
      )}

      {path==="/privacy-policy" ? <PrivacyPolicyPage/> :
       path==="/terms-and-conditions" ? <TermsAndConditionsPage/> : 
       path === "/summer-camp" ? <SummerCampPage/> :(
        <>
          {/* ── HERO ── */}
          <section style={{
            position:"relative",display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",textAlign:"center",
            minHeight:"100vh",overflow:"hidden",
            background:C.espresso,paddingTop:68,
            width:"100%",boxSizing:"border-box",
          }}>
            <div style={{position:"absolute",inset:0,zIndex:0}}>
              <div style={{position:"absolute",inset:0,background:"rgba(10,5,3,0.6)",zIndex:10}}/>
              <div className="crimson-spot" style={{zIndex:20}}/>
              <div className="vignette" style={{position:"absolute",inset:0,zIndex:25,pointerEvents:"none"}}/>
              <video autoPlay loop muted playsInline style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.45,filter:"grayscale(0.3)"}}>
                <source src="https://assets.mixkit.co/videos/preview/mixkit-band-playing-on-a-stage-in-front-of-a-crowd-32771-large.mp4" type="video/mp4"/>
              </video>
              <div className="stage-line" style={{zIndex:30}}/>
            </div>

            <div style={{position:"relative",zIndex:30,maxWidth:780,padding:"64px 24px"}}>
              <div className="fade-up delay-1" style={{display:"flex",justifyContent:"center",marginBottom:28}}>
                <span style={{
                  display:"inline-flex",alignItems:"center",gap:8,
                  padding:"6px 16px",border:"1px solid rgba(255,255,255,0.15)",
                  borderRadius:999,
                  fontSize:10,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",
                  color:"rgba(255,255,255,0.65)",
                }}>
                  <span className="tag-dot"/>
                  Summer Camp 2026 · Enrolling Now
                </span>
              </div>

              <h1 className="fade-up delay-2" style={{
                fontFamily:"'Raleway',sans-serif",fontWeight:900,
                fontSize:"clamp(56px,10vw,90px)",lineHeight:0.93,
                letterSpacing:-2,color:"#fff",margin:"0 0 16px",
              }}>
                Every musician<br/>deserves a <span style={{color:C.crimson,fontStyle:"italic"}}>stage.</span>
              </h1>

              <p className="fade-up delay-3" style={{
                fontFamily:"'DM Sans',sans-serif",
                color:"rgba(255,255,255,0.65)",fontSize:18,
                lineHeight:1.75,maxWidth:520,margin:"0 auto 40px",fontWeight:300,
              }}>
                Private, semi-private, and group lessons in music and performance, taught by passionate instructors in a welcoming atmosphere.
              </p>

              <div className="fade-up delay-4" style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",marginBottom:48}}>
                <button
                  onClick={()=>setBookingFor("")}
                  style={{...btnRed,fontSize:14,padding:"15px 36px",boxShadow:`0 4px 20px rgba(255,0,68,0.3)`}}
                  onMouseEnter={e=>e.currentTarget.style.background="#CC0036"}
                  onMouseLeave={e=>e.currentTarget.style.background=C.crimson}
                >
                  Request Lessons <ArrowRight size={17}/>
                </button>
                <a
                  href={CAMP_URL} target="_blank" rel="noreferrer"
                  style={{
                    ...btnGhost,
                    borderColor:"rgba(255,209,102,0.5)",
                    color:C.yellow,
                    fontSize:14, padding:"15px 36px",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,209,102,0.12)";e.currentTarget.style.borderColor=C.yellow;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,209,102,0.5)";}}
                >
                  Summer Camp 2026 <ArrowRight size={17}/>
                </a>
              </div>

              <div className="fade-up delay-5" style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px 24px"}}>
                {[
                  {href:"tel:916-435-1300",Icon:Phone,label:"(916) 435-1300"},
                  {href:"mailto:admin@headlinermusicacademy.com",Icon:Mail,label:"admin@headlinermusicacademy.com"},
                  {href:"https://maps.google.com/?q=2311+Sunset+Blvd,+Rocklin,+CA+95765",Icon:MapPin,label:"2311 Sunset Blvd, Rocklin, CA 95765",external:true},
                ].map(({href,Icon,label,external})=>(
                  <a key={label} href={href} target={external?"_blank":undefined} rel={external?"noreferrer":undefined}
                    style={{
                      display:"flex",alignItems:"center",gap:6,
                      fontSize:13,color:"rgba(255,255,255,0.45)",
                      textDecoration:"none",fontFamily:"'DM Sans',sans-serif",
                      transition:"color 0.2s",
                    }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.teal}
                    onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.45)"}
                  >
                    <Icon size={13}/>{label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── OFFERINGS ── */}
          <section style={{padding:"72px 20px",maxWidth:1200,margin:"0 auto",boxSizing:"border-box",width:"100%"}}>
            <div style={{marginBottom:40}}>
              <p style={{
                fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",
                color:C.teal,marginBottom:12,display:"flex",alignItems:"center",gap:8,
              }}>
                <span style={{display:"block",width:24,height:2,background:C.teal,borderRadius:2}}/>
                What we offer
              </p>
              <h2 style={{
                fontFamily:"'Raleway',sans-serif",fontWeight:900,
                fontSize:"clamp(2.4rem,5vw,3.6rem)",letterSpacing:-1,
                color:C.espresso,lineHeight:0.95,margin:0,
              }}>
                Pick your <em style={{fontStyle:"italic",color:C.crimson}}>instrument.</em>
              </h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:C.muted,marginTop:12}}>
                Click any tile to request lessons.
              </p>
            </div>

            <div className="offerings-grid" style={{
              borderRadius:20,overflow:"hidden",
              border:`1px solid ${C.border}`,
              display:"grid",gap:1,background:C.border,
              gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",
              width:"100%",
            }}>
              {offerings.map((item,i)=>(
                <div
                  key={i}
                  className="offering-card"
                  style={{
                    background:C.white,padding:"36px 24px",
                    display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",
                  }}
                  onClick={()=>setBookingFor(item.name)}
                  role="button" tabIndex={0}
                  onKeyDown={e=>e.key==="Enter"&&setBookingFor(item.name)}
                >
                  <span style={{fontSize:36,marginBottom:16}}>{item.icon}</span>
                  <h3 style={{
                    fontFamily:"'Raleway',sans-serif",fontWeight:800,
                    fontSize:14,letterSpacing:"0.1em",textTransform:"uppercase",
                    color:C.espresso,margin:"0 0 4px",
                  }}>{item.name}</h3>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.muted,margin:0}}>{item.desc}</p>
                  <span className="card-hint">Request lessons →</span>
                </div>
              ))}
            </div>
          </section>


          {/* ── SUMMER CAMP ── */}
          <section style={{background:C.espresso,padding:"72px 20px",position:"relative",overflow:"hidden",boxSizing:"border-box",width:"100%"}}>
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`radial-gradient(at 0% 100%, rgba(0,196,181,0.12) 0px, transparent 55%),
                               radial-gradient(at 100% 0%, rgba(255,209,102,0.08) 0px, transparent 55%)`,
              pointerEvents:"none",
            }}/>
            <div className="camp-grid" style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center",width:"100%"}}>
              <div>
                <p style={{
                  fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",
                  color:C.teal,marginBottom:16,display:"flex",alignItems:"center",gap:8,
                }}>
                  <span style={{display:"block",width:24,height:2,background:C.teal,borderRadius:2}}/>
                  Summer 2026
                </p>
                <h2 style={{
                  fontFamily:"'Raleway',sans-serif",fontWeight:900,
                  fontSize:"clamp(2.4rem,5vw,3.8rem)",letterSpacing:-1,
                  color:"#fff",lineHeight:0.95,margin:"0 0 24px",
                }}>
                  Your kid will be in a<br/>real band by <em style={{fontStyle:"italic",color:C.crimson}}>Friday.</em>
                </h2>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,color:"rgba(255,255,255,0.55)",lineHeight:1.8,marginBottom:36,maxWidth:420}}>
                  One week. No experience needed. Every kid gets an instrument, joins a band, and performs a real song on the last day.
                </p>
                <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                  <a
                    href={CAMP_URL} target="_blank" rel="noreferrer"
                    style={{...btnRed,boxShadow:`0 4px 20px rgba(255,0,68,0.3)`}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.teal}
                    onMouseLeave={e=>e.currentTarget.style.background=C.crimson}
                  >
                    Enroll Now <ArrowRight size={15}/>
                  </a>
                  <a
                    href="/summer-camp"
                    style={{...btnGhost,borderColor:"rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.7)"}}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.07)"}}>
                {[
                  {label:"Dates",     value:"June 22–26, 2026",  color:"#fff"},
                  {label:"Ages",      value:"8–12 years old",    color:"#fff"},
                  {label:"Schedule",  value:"9 AM – 12:30 PM",   color:"#fff"},
                  {label:"Band Size", value:"Max 7 kids",        color:C.yellow},
                  {label:"Experience",value:"None required",     color:C.teal},
                  {label:"Final Day", value:"Live performance + recording", color:C.crimson},
                ].map(({label,value,color})=>(
                  <div key={label} style={{background:C.espresso,padding:"28px 24px"}}>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:8}}>{label}</p>
                    <p style={{fontFamily:"'Raleway',sans-serif",fontWeight:800,fontSize:16,color,lineHeight:1.3}}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TESTIMONIAL ── */}
          <section style={{padding:"0 20px 72px",maxWidth:900,margin:"0 auto",boxSizing:"border-box",width:"100%"}}>
            <a
              href="https://m.yelp.com/biz/headliner-music-academy-rocklin"
              target="_blank" rel="noreferrer"
              style={{
                display:"block",background:C.white,
                borderRadius:20,padding:"48px 56px",
                border:`1px solid ${C.border}`,textDecoration:"none",textAlign:"center",
                boxShadow:"0 4px 24px rgba(30,19,14,0.06)",
                transition:"box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 32px rgba(30,19,14,0.1)";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 4px 24px rgba(30,19,14,0.06)";e.currentTarget.style.transform="translateY(0)";}}
            >
              <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:24}}>
                {[1,2,3,4,5].map(s=>(
                  <svg key={s} width={18} height={18} viewBox="0 0 24 24" fill={C.yellow}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p style={{
                fontFamily:"'Raleway',sans-serif",fontWeight:700,fontStyle:"italic",
                fontSize:"clamp(1.1rem,2.5vw,1.5rem)",color:C.espresso,
                lineHeight:1.55,maxWidth:640,margin:"0 auto 24px",
              }}>
                "Love this place!! It's unique!!! Amicable and well organized. Amazing diverse and integrative for kids, young or adults."
              </p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,fontFamily:"'DM Sans',sans-serif",fontSize:13}}>
                <span style={{fontWeight:700,color:C.espresso}}>Socorro Baez G.</span>
                <span style={{color:C.border}}>|</span>
                <span style={{display:"flex",alignItems:"center",gap:6,fontWeight:700,color:C.crimson}}>
                  <svg width={16} height={16} viewBox="0 0 384 512" fill="currentColor">
                    <path d="M42.5 192.1c-19.4 0-38.6 15.6-41.9 34.6-3 17.5 7.1 36.3 23 44.3l85.8 43.2c10.3 5.2 23.3 1.1 28.5-9.1 5.2-10.2 1.3-22.9-8.9-28.1l-86.5-84.9zm294.6 63.8l-83-48.4c-9.9-5.8-22.8-2.6-28.7 7.2-5.9 9.8-2.7 22.5 7.2 28.3l82.8 48.6c16.3 9.6 36.8 5 43.6-11.4 6.7-16.1-3.6-33.8-21.9-24.3zm-131.6-9.5c-4.9-10.4-17.1-15-27.5-10.3L97.7 274.6c-16.1 7.2-22.7 26.6-14.7 41.8 7.8 14.8 26.2 19.8 41.6 11.2l83.6-46.7c10-5.6 14.4-18 9.3-28.5zm165 140.5l-85.1-44.5c-10.1-5.3-22.8-1.5-28.2 8.5-5.4 10-1.6 22.5 8.5 27.8l85.1 44.5c16.1 8.4 36.1 1.2 41.5-14.7 5.2-15.6-5.8-31.2-21.8-21.6zm-177.3 18.2c-5.5-10-18.2-13.9-28.3-8.8L37.1 442.2c-15.8 8-20.9 27.4-11.5 42.1 9.2 14.4 28.4 17.9 43.3 8L163.6 432c10.2-6.7 13.5-19.9 8.2-30.1z"/>
                  </svg>
                  Yelp
                </span>
              </div>
            </a>
          </section>
        </>
      )}

      {/* ── FOOTER ── */}
      <footer style={{background:C.espresso,color:"#fff",padding:"64px 40px 40px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,paddingBottom:48,borderBottom:"1px solid rgba(255,255,255,0.08)",marginBottom:28}}>
            <div>
              <a href="/" style={{display:"inline-block",marginBottom:20}}>
                <img src={LOGO_URL_INV} alt="Headliner Music Academy" style={{height:48,width:"auto",filter:"brightness(0) invert(1)"}}/>
              </a>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(255,255,255,0.38)",lineHeight:1.75,maxWidth:280,marginBottom:24}}>
                Inspiring the next generation of musicians through premium, personalized education.
              </p>
              <button
                onClick={()=>setBookingFor("")}
                className="btn-red-hover"
                style={{...btnOutlineRed,fontSize:12}}
              >
                Request Lessons <ArrowRight size={13}/>
              </button>
            </div>

            <div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:20}}>
                Contact &amp; Location
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <a href="tel:916-435-1300" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.crimson}
                  onMouseLeave={e=>e.currentTarget.style.color="#fff"}
                >
                  <Phone size={16} color={C.crimson}/>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:20,fontWeight:600,color:"#fff",letterSpacing:-0.5}}>(916) 435-1300</span>
                </a>
                <a href="mailto:admin@headlinermusicacademy.com" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:"rgba(255,255,255,0.38)",fontFamily:"'DM Sans',sans-serif",fontSize:13}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.crimson}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.38)"}
                >
                  <Mail size={15} color={C.crimson}/>
                  admin@headlinermusicacademy.com
                </a>
                <div style={{display:"flex",alignItems:"flex-start",gap:10,color:"rgba(255,255,255,0.25)",fontFamily:"'DM Sans',sans-serif",fontSize:13,lineHeight:1.6}}>
                  <MapPin size={15} color="rgba(255,255,255,0.2)" style={{marginTop:2,flexShrink:0}}/>
                  2311 Sunset Blvd<br/>Rocklin, CA 95765
                </div>
              </div>
            </div>
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.1em",color:"rgba(255,255,255,0.18)"}}>
              © {new Date().getFullYear()} Headliner Music Academy. All rights reserved.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:20}}>
              {[
                {href:"/privacy-policy",label:"Privacy Policy"},
                {href:"/terms-and-conditions",label:"Terms & Conditions"},
              ].map(({href,label})=>(
                <a key={label} href={href} style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.1em",color:"rgba(255,255,255,0.28)",textDecoration:"none",textTransform:"uppercase"}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.crimson}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.28)"}
                >{label}</a>
              ))}
              <a href="https://m.yelp.com/biz/headliner-music-academy-rocklin" target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"center",gap:6,fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"rgba(255,255,255,0.28)",textDecoration:"none",textTransform:"uppercase",letterSpacing:"0.1em"}}
                onMouseEnter={e=>e.currentTarget.style.color=C.crimson}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.28)"}
              >
                <svg width={14} height={14} viewBox="0 0 384 512" fill="currentColor">
                  <path d="M42.5 192.1c-19.4 0-38.6 15.6-41.9 34.6-3 17.5 7.1 36.3 23 44.3l85.8 43.2c10.3 5.2 23.3 1.1 28.5-9.1 5.2-10.2 1.3-22.9-8.9-28.1l-86.5-84.9zm294.6 63.8l-83-48.4c-9.9-5.8-22.8-2.6-28.7 7.2-5.9 9.8-2.7 22.5 7.2 28.3l82.8 48.6c16.3 9.6 36.8 5 43.6-11.4 6.7-16.1-3.6-33.8-21.9-24.3zm-131.6-9.5c-4.9-10.4-17.1-15-27.5-10.3L97.7 274.6c-16.1 7.2-22.7 26.6-14.7 41.8 7.8 14.8 26.2 19.8 41.6 11.2l83.6-46.7c10-5.6 14.4-18 9.3-28.5zm165 140.5l-85.1-44.5c-10.1-5.3-22.8-1.5-28.2 8.5-5.4 10-1.6 22.5 8.5 27.8l85.1 44.5c16.1 8.4 36.1 1.2 41.5-14.7 5.2-15.6-5.8-31.2-21.8-21.6zm-177.3 18.2c-5.5-10-18.2-13.9-28.3-8.8L37.1 442.2c-15.8 8-20.9 27.4-11.5 42.1 9.2 14.4 28.4 17.9 43.3 8L163.6 432c10.2-6.7 13.5-19.9 8.2-30.1z"/>
                </svg>
                Yelp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 