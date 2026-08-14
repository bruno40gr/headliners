import { useState, useEffect } from "react";
import { MapPin, Mail, Phone, X, ChevronDown, ArrowRight } from "lucide-react";
import ProgramsNav from "./ProgramsNav";
import SummerCampPage from "./SummerCampPage";
import BandProgramPage from "./BandProgramPage";
import TeachersPage from "./TeachersPage";
import CareersPage from "./CareersPage";  
import TinyKeys from "./TinyKeys";
import WonderNotes from "./WonderNotes";
import InternalBandProgram from "./InternalBandProgram";
import { C, fonts } from "./tokens";


const offerings = [
  { icon: "🎸", name: "Guitar", desc: "Acoustic & electric" },
  { icon: "🎹", name: "Piano", desc: "Classical & contemporary" },
  { icon: "🥁", name: "Drums", desc: "Kit & percussion" },
  { icon: "🎸", name: "Bass", desc: "Electric & upright" },
  { icon: "🎤", name: "Vocals", desc: "All styles" },
  { icon: "🎺", name: "Brass", desc: "Trumpet & more" },
  { icon: "🎻", name: "Strings", desc: "Violin & viola" },
  { icon: "🤘", name: "Band Performance", desc: "Live stage experience" },
  { icon: "🎉", name: "Private Parties", desc: "Birthdays & events" },
  { icon: "🎙️", name: "Recording Studio", desc: "Record & produce music" },
];

const DAYS  = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const TIMES = ["Morning (8am–12pm)","Afternoon (12pm–4pm)","Evening (4pm–8pm)"];
const PORTAL_URL  = "https://headlinerma.opus1.io/login";
const CAMP_URL    = "https://headlinerma.opus1.io/w/summercamp2026";

const EMAILJS_SERVICE_ID  = "service_734y6qg";
const EMAILJS_TEMPLATE_ID = "template_czlclec";
const EMAILJS_PUBLIC_KEY  = "FdW-lGbAyQuJZFy-y";

// ── Reusable Button Component ────────────────────────────────────────────────
function Button({ children, variant = "primary", href, disabled, style, className, onClick, ...rest }) {
  const [isHovered, setIsHovered] = useState(false);

  let bg, color, border, hoverBg, hoverColor;

  if (variant === "primary") {
    bg = disabled ? C.border : C.crimson;
    color = disabled ? C.muted : C.white;
    border = "none";
    hoverBg = disabled ? C.border : C.crimsonHover;
    hoverColor = disabled ? C.muted : C.white;
  } else if (variant === "ghost") {
    bg = C.white07;
    color = C.white80;
    border = `1px solid ${C.white15}`;
    hoverBg = C.white10;
    hoverColor = C.white;
  } else if (variant === "yellow") {
    bg = C.yellow;
    color = C.espresso;
    border = "none";
    hoverBg = C.yellowHover;
    hoverColor = C.espresso;
  } else if (variant === "outlineRed") {
    bg = "transparent";
    color = C.crimson;
    border = `1.5px solid ${C.crimson}`;
    hoverBg = C.crimson;
    hoverColor = C.white;
  }

  const baseStyle = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
    padding: "13px 32px", borderRadius: 999, border: border,
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none", transition: "all 0.2s",
    background: isHovered ? hoverBg : bg,
    color: isHovered ? hoverColor : color,
    ...style
  };

  const Element = href ? "a" : "button";

  return (
    <Element
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {children}
    </Element>
  );
}

// ── BookingModal ─────────────────────────────────────────────────────────────
function BookingModal({ instrument, onClose }) {
  const [form, setForm] = useState({
    name:"", age:"", email:"", instrument: instrument||"",
    level:"", days:[], times:[], notes:"",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

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
            form_type: "Lesson Inquiry",
            name: form.name, age: form.age||"Not provided",
            email: form.email, instrument: form.instrument,
            experience_level: form.level,
            days: form.days.join(", ")||"Not specified",
            time_of_day: form.times.join(", ")||"Not specified",
            message: form.notes||"None",
            preferred_date: "N/A",
            time_window: "N/A",
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
      style={{
        position:"fixed",inset:0,zIndex:200,
        background: C.espresso75, backdropFilter:"blur(8px)",
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:16, overflowY:"auto",
      }}
    >
      <div style={{
        background:C.white, borderRadius:24, width:"100%", maxWidth:520,
        padding:"40px 36px", position:"relative", boxSizing:"border-box",
        margin:"auto", boxShadow:`0 24px 64px ${C.black20}`,
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
              fontFamily:fonts.display,fontWeight:800,
              fontSize:28,color:C.crimson,
              margin:"0 0 6px",lineHeight:1.1,
            }}>
              We'll be in touch soon!
            </h2>
            <p style={{fontFamily:fonts.body,color:C.muted,fontSize:14,lineHeight:1.5,maxWidth:360,margin:"0 auto 24px"}}>
              We'll get back to you within the next 24 hours. Expect a call from us to get everything set up.
            </p>
            <Button onClick={onClose}>Back to site</Button>
          </div>
        ):(
          <>
            <div style={{marginBottom:20}}>
              <h2 style={{
                fontFamily:fonts.display,fontWeight:800,
                fontSize:28,color:C.crimson,
                margin:"0 0 4px",lineHeight:1.1,
              }}>
                Let's find your sound.
              </h2>
              <p style={{fontFamily:fonts.body,fontSize:14,color:C.muted,margin:0,lineHeight:1.5}}>
                Tell us a little about your musician and we'll call you to set things up.
              </p>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              <Field label="Student name *">
                <input type="text" placeholder="e.g. Jordan Smith" value={form.name} onChange={e=>set("name",e.target.value)}/>
              </Field>
              <Field label="Your email *">
                <input type="email" placeholder="e.g. parent@email.com" value={form.email} onChange={e=>set("email",e.target.value)}/>
                <p style={{fontFamily:fonts.body,fontSize:11,color:C.subtext,margin:"4px 0 0"}}>
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
                  <ChevronDown size={14} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:C.subtext}}/>
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
                  fontFamily:fonts.body,fontSize:13,color:C.errorText,
                  background:C.errorBg,border:`1px solid ${C.errorBorder}`,
                  borderRadius:10,padding:"10px 14px",margin:0,
                }}>
                  Something went wrong. Please try again or reach us at (916) 435-1300.
                </p>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!valid}
                style={{ width: "100%", marginTop: 4, fontSize: 15 }}
              >
                {status === "sending" ? "Sending…" : "Let's make music"}
              </Button>
            </div>
          </>
        )}
      </div>

      <style>{`
        select { appearance:none !important; -webkit-appearance:none !important; }
        input, select, textarea {
          background: ${C.inputBg} !important;
          border: 1px solid ${C.border} !important;
          border-radius: 10px !important;
          color: ${C.espresso} !important;
          font-family: ${fonts.body} !important;
          font-size: 14px !important;
          padding: 10px 14px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          outline: none !important;
          transition: border-color 0.2s !important;
        }
        input:focus, select:focus, textarea:focus {
          border-color: ${C.crimson} !important;
          background: ${C.white} !important;
        }
        input::placeholder, textarea::placeholder { color: ${C.placeholder} !important; }
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
        fontFamily:fonts.body,
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
      background: active ? C.crimson06 : C.inputBg,
      color: active ? C.crimson : C.muted,
      fontFamily:fonts.body,
      fontSize:13,fontWeight: active?700:400,
      cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

function PrivacyPolicyPage() {
  return (
    <div style={{paddingTop:120,paddingBottom:80,paddingLeft:24,paddingRight:24,maxWidth:720,margin:"0 auto",minHeight:"100vh"}}>
      <h1 style={{fontFamily:fonts.display,fontWeight:800,fontSize:"clamp(2.4rem,6vw,3.4rem)",color:C.espresso,letterSpacing:-1,margin:"0 0 8px",lineHeight:1}}>
        Privacy Policy
      </h1>
      <p style={{fontFamily:fonts.body,fontSize:13,color:C.muted,marginBottom:40}}>Last updated: May 18, 2026</p>
      <div style={{fontFamily:fonts.body,color:C.muted,lineHeight:1.8,display:"flex",flexDirection:"column",gap:24,fontSize:15}}>
        <p>Headliner Music Academy (a DBA of Marchena & Papadhima LLC) is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information.</p>
        {[
          ["Information we collect","We collect information you provide when enrolling a student or contacting us, including name, phone number, email address, and payment information. We also collect attendance and lesson history as part of our normal operations."],
          ["How we use your information","We use your information to manage enrollments, process payments, communicate about lessons and scheduling, and send you updates about Headliner Music Academy programs and events."],
          ["SMS and email communications","By providing your phone number or email address, you consent to receive SMS and email communications from Headliner Music Academy, including scheduling, billing, reminders, account updates, and promotional messages about programs and events. You may opt out of SMS messages at any time by replying STOP. You may opt out of email communications by clicking unsubscribe in any email we send."],
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
      <h1 style={{fontFamily:fonts.display,fontWeight:800,fontSize:"clamp(2.4rem,6vw,3.4rem)",color:C.espresso,letterSpacing:-1,margin:"0 0 8px",lineHeight:1}}>
        Terms and Conditions
      </h1>
      <p style={{fontFamily:fonts.body,fontSize:13,color:C.muted,marginBottom:40}}>Last updated: May 18, 2026</p>
      <div style={{fontFamily:fonts.body,color:C.muted,lineHeight:1.8,display:"flex",flexDirection:"column",gap:24,fontSize:15}}>
        <p>These terms govern your enrollment and participation at Headliner Music Academy (a DBA of Marchena & Papadhima LLC), located at 2311 Sunset Blvd, Rocklin, CA 95765.</p>
        {[
          ["Enrollment and billing","Enrollment is on a monthly subscription basis. Billing occurs automatically each month on your billing date. You are responsible for keeping payment information current."],
          ["Cancellations and holds","You may cancel or place your account on hold by contacting us at (916) 435-1300 or admin@headlinermusicacademy.com. Cancellations require notice before your next billing date to avoid being charged for the following month."],
          ["24-Hour Absence Notice","If, for any reason, your student is unable to attend a lesson, please note that we have a strict 24-hour cancellation policy out of respect for our teachers' schedules and how they are compensated. If you call, email, or leave a voicemail at least 24 hours before the reserved lesson, even if Headliner is closed at the time you contact us, we would be happy to reschedule it within 30 days."],
          ["Communications","By enrolling, you agree to receive operational and promotional communications from Headliner Music Academy via SMS and email. You may opt out at any time by replying STOP to any SMS or contacting us directly."],
          ["SMS Communications","By enrolling, you agree to receive SMS messages from Headliner Music Academy regarding scheduling, billing, reminders, account updates, and promotional messages about programs and events. Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP. For assistance, reply HELP or contact us at (916) 435-1300 or admin@headlinermusicacademy.com."],
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

// ── Hero media — the real student journey, first lesson to live stage ────────
const HERO_SLIDES = [
  
  { type: "image", src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781715525/PXL_20260615_232703074.PORTRAIT_mqdiam.jpg", caption: "Learning the keys", focal: "center 35%" },
  { type: "image", src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781715525/PXL_20260616_002552898.PORTRAIT_anjebq.jpg", caption: "Behind the kit", focal: "center 35%" },
  { type: "image", src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781716115/PXL_20260524_010310811_tzpycp.jpg", caption: "Songwriting", focal: "center 28%" },
  { type: "image", src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781716216/PXL_20260524_011455107_slssdi.jpg", caption: "Finding the sound", focal: "center 30%" },
  { type: "image", src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781715525/PXL_20260615_232322116.MP_zhbrns.jpg", caption: "Building a band", focal: "center 30%" },
  { type: "video", src: "https://res.cloudinary.com/diy08lj9x/video/upload/v1781715526/PXL_20260615_232512279_erwjfj.mp4", poster: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781715524/PXL_20260616_021959694.PORTRAIT.ORIGINAL_b7nfj5.jpg", caption: "Rehearsing together", focal: "center 30%" },
  { type: "image", src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781716216/PXL_20260524_013313165.PORTRAIT.ORIGINAL_bpckwf.jpg", caption: "Taking the mic", focal: "center 25%" },
  { type: "image", src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781715554/20250726_102536_w42awv.jpg", caption: "Performing live", focal: "center 25%" },
  { type: "image", src: "https://res.cloudinary.com/diy08lj9x/image/upload/v1781715554/20250628_153338_srnhk2.jpg", caption: "On the big stage", focal: "center 30%" },
];

// Unifies mixed photo/video sources (different cameras, lighting, days) into
// one cohesive, sober palette — warm, slightly desaturated, contrast-lifted.
const HERO_PHOTO_FILTER = "sepia(0.18) saturate(0.85) contrast(1.08) brightness(0.97)";

function HeroSection({ navigate, setBookingFor }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  useEffect(() => {
    const current = HERO_SLIDES[active];
    const duration = current.type === "video" ? 9200 : 3800;
    const t = setTimeout(() => {
      setActive(a => (a + 1) % HERO_SLIDES.length);
    }, duration);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section style={{
      position: "relative",
      paddingTop: 68,
      width: "100%",
      boxSizing: "border-box",
      background: C.espresso,
      overflow: "hidden",
    }}>
      <div className="hero-split" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "calc(100vh - 68px)",
        width: "100%",
      }}>
        {/* ── Left: copy ── */}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px clamp(28px, 6vw, 80px)",
          zIndex: 2,
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(${C.white} 1px, transparent 1px)`,
            backgroundSize: "26px 26px",
            opacity: 0.025,
            pointerEvents: "none",
          }} />

          <p className={loaded ? "fade-up delay-1" : ""} style={{
            fontFamily: fonts.body,
            fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.teal, margin: "0 0 22px",
            display: "flex", alignItems: "center", gap: 10,
            position: "relative", zIndex: 1,
          }}>
            <span className="tag-dot" />
            Rocklin, CA · Est. 2026
          </p>

          <h1 className={loaded ? "fade-up delay-2" : ""} style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: "clamp(42px, 6.4vw, 72px)", lineHeight: 0.96,
            letterSpacing: -2, color: C.white, margin: "0 0 22px",
            position: "relative", zIndex: 1,
          }}>
            From first lesson<br/>to <span style={{ color: C.crimson, fontStyle: "italic" }}>real stage.</span>
          </h1>

          <p className={loaded ? "fade-up delay-3" : ""} style={{
            fontFamily: fonts.body,
            color: C.white70, fontSize: 17, lineHeight: 1.75,
            maxWidth: 460, margin: "0 0 36px", fontWeight: 300,
            position: "relative", zIndex: 1,
          }}>
            Private, semi-private, and group lessons taught by passionate instructors.
          </p>

          <div className={loaded ? "fade-up delay-4" : ""} style={{
            display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40,
            position: "relative", zIndex: 1,
          }}>
            <Button
              onClick={() => setBookingFor("")}
              style={{ fontSize: 14, padding: "16px 38px", boxShadow: `0 4px 24px ${C.crimson30}` }}
            >
              Request Lessons
            </Button>
            <Button
              variant="ghost"
              href="/summer-camp"
              onClick={e => { e.preventDefault(); navigate("/summer-camp"); }}
              style={{ fontSize: 14, padding: "16px 32px" }}
            >
              Summer Camp 2026
            </Button>
          </div>

          <div className={loaded ? "fade-up delay-5" : ""} style={{
            display: "flex", flexWrap: "wrap", gap: "10px 22px",
            position: "relative", zIndex: 1,
          }}>
            {[
              { href: "tel:916-435-1300", Icon: Phone, label: "(916) 435-1300" },
              { href: "mailto:admin@headlinermusicacademy.com", Icon: Mail, label: "admin@headlinermusicacademy.com" },
              { href: "https://maps.google.com/?q=2311+Sunset+Blvd,+Rocklin,+CA+95765", Icon: MapPin, label: "2311 Sunset Blvd, Rocklin, CA", external: true },
            ].map(({ href, Icon, label, external }) => (
              <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 14, color: C.white45,
                  textDecoration: "none", fontFamily: fonts.body,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.teal}
                onMouseLeave={e => e.currentTarget.style.color = C.white45}
              >
                <Icon size={14} />{label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: media ── */}
        <div className="hero-media" style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 360,
          background: C.espresso,
        }}>
          {/* Photo stack — masked on the left edge so it fades into the espresso
              panel with a soft edge instead of a hard seam. This only affects
              opacity at the edge; it never distorts the image itself. */}
          <div style={{
            position: "absolute", inset: 0,
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 18%)",
          }}>
            {HERO_SLIDES.map((slide, i) => (
              <div
                key={i}
                style={{
                  position: "absolute", inset: 0,
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 1.1s ease",
                  pointerEvents: "none",
                }}
              >
                {slide.type === "video" ? (
                  <video
                    src={slide.src}
                    poster={slide.poster}
                    autoPlay={i === active}
                    muted
                    loop={false}
                    playsInline
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      objectPosition: slide.focal, display: "block",
                      filter: HERO_PHOTO_FILTER,
                    }}
                  />
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.caption}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      objectPosition: slide.focal, display: "block",
                      filter: HERO_PHOTO_FILTER,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Extra darkening right at the seam for a smoother blend with the mask above */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(100deg, ${C.espresso} 0%, rgba(26,19,15,0.65) 6%, rgba(26,19,15,0.18) 14%, transparent 26%)`,
            pointerEvents: "none",
          }} />

          {/* Bottom readability gradient for caption legibility */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(26,19,15,0.6) 0%, transparent 30%)",
            pointerEvents: "none",
          }} />

          {/* Caption + progress dots */}
          <div style={{
            position: "absolute", bottom: 28, left: 32, right: 32,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            zIndex: 2,
          }}>
            <p key={active} style={{
              fontFamily: fonts.body, fontSize: 13,
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.white, margin: 0,
              animation: "fadeUp 0.5s ease both",
            }}>
              {HERO_SLIDES[active].caption}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", maxWidth: 220, justifyContent: "flex-end" }}>
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show slide ${i + 1}`}
                  style={{
                    width: i === active ? 20 : 6, height: 6, borderRadius: 999,
                    background: i === active ? C.crimson : "rgba(255,255,255,0.35)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="stage-line" style={{ zIndex: 30 }} />

      <style>{`
        @media (max-width: 860px) {
          .hero-split { grid-template-columns: 1fr !important; }
          .hero-media { min-height: 360px !important; order: -1; }
        }
      `}</style>
    </section>
  );
}
// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [bookingFor, setBookingFor] = useState(null);
  const [path, setPath] = useState(typeof window !== "undefined" ? window.location.pathname : "/");

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const navigate = (p) => { window.history.pushState({}, "", p); setPath(p); };

  return (
    <div style={{fontFamily:fonts.body,minHeight:"100vh",background:C.white,color:C.espresso,overflowX:"hidden",maxWidth:"100vw"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        ::selection { background: ${C.crimson15}; color: ${C.espresso}; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up  { animation: fadeUp 0.65s ease both; }
        .delay-1  { animation-delay: 0.08s; }
        .delay-2  { animation-delay: 0.18s; }
        .delay-3  { animation-delay: 0.28s; }
        .delay-4  { animation-delay: 0.38s; }
        .delay-5  { animation-delay: 0.48s; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 24s linear infinite; display:flex; width:max-content; }
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
          display:inline-block; flex-shrink:0;
        }
        .offering-card {
          background: ${C.white};
          cursor:pointer;
          transition: background 0.2s, transform 0.15s;
          position:relative;
        }
        .offering-card:hover { background: ${C.lightCream}; transform:translateY(-2px); z-index:1; }
        .offering-card:hover .card-hint { opacity:1; }
        .card-hint {
          opacity:0; transition:opacity 0.2s;
          font-size:10px; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase;
          color:${C.crimson}; margin-top:8px;
          font-family:${fonts.body};
        }
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          background-repeat: repeat;
        }
        html, body { overflow-x:hidden !important; max-width:100vw !important; }
        * { min-width:0; box-sizing:border-box; }
        @media (max-width:768px) {
          section { padding-left:20px !important; padding-right:20px !important; }
          header  { padding-left:20px !important; padding-right:20px !important; }
          .camp-grid    { grid-template-columns:1fr !important; gap:40px !important; }
          .camp-details { grid-template-columns:1fr 1fr !important; }
          .offerings-grid { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      {bookingFor !== null && (
        <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />
      )}

      <header>
        <ProgramsNav
          variant="dark"
          navigate={navigate}
          ctaLabel="Request Lessons"
          onCtaClick={() => setBookingFor("")}
        />
      </header>

      <main>
      {path === "/privacy-policy"       ? <PrivacyPolicyPage /> :
       path === "/terms-and-conditions" ? <TermsAndConditionsPage /> :
       path === "/summer-camp"          ? <SummerCampPage setPath={setPath} /> :
       path === "/teachers"             ? <TeachersPage setPath={setPath} onRequestLessons={setBookingFor} /> :
       path === "/careers"              ? <CareersPage setPath={setPath} onRequestLessons={setBookingFor} /> :
       path === "/tiny-keys"            ? <TinyKeys navigate={navigate} setPath={setPath} onRequestLessons={setBookingFor} /> :
       path === "/wonder-notes"       ? <WonderNotes navigate={navigate} setPath={setPath} onRequestLessons={setBookingFor} /> :
       path === "/internal/band-program" ? <InternalBandProgram /> :
       path === "/programs/band"        ? <BandProgramPage onRequestLessons={(i) => setBookingFor(i || "")} setPath={setPath} /> : (
        <>
          {/* ── HERO ── */}
          <HeroSection
            navigate={navigate}
            setBookingFor={setBookingFor}
          />

          {/* ── OFFERINGS ── */}
          <section style={{padding:"72px 20px",maxWidth:1200,margin:"0 auto",boxSizing:"border-box",width:"100%"}}>
            <div style={{marginBottom:40}}>
              <p style={{
                fontSize:12,fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",
                color:C.teal,marginBottom:12,display:"flex",alignItems:"center",gap:8,
              }}>
                <span style={{display:"block",width:28,height:3,background:C.teal,borderRadius:2}}/>
                What we offer
              </p>
              <h2 style={{
                fontFamily:fonts.display,fontWeight:800,
                fontSize:"clamp(2.4rem,5vw,3.6rem)",letterSpacing:-1,
                color:C.espresso,lineHeight:0.95,margin:0,
              }}>
                Pick your <em style={{fontStyle:"italic",color:C.crimson}}>instrument.</em>
              </h2>
              <p style={{fontFamily:fonts.body,fontSize:14,color:C.muted,marginTop:12}}>
                Click any tile to request lessons.
              </p>
            </div>

            <div className="offerings-grid" style={{
              borderRadius:20,overflow:"hidden",
              border:`1px solid ${C.border}`,
              display:"grid",gap:1,background:C.border,
              gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",
              width:"100%",
            }}>
              {offerings.map((item,i)=>(
                <div
                  key={i}
                  className="offering-card"
                  style={{
                    padding:"36px 24px",
                    display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",
                  }}
                  onClick={()=>{
                    if(item.name==="Band Performance"){
                      navigate("/programs/band");
                    } else {
                      setBookingFor(item.name);
                    }
                  }}
                  role="button" tabIndex={0}
                  onKeyDown={e=>e.key==="Enter"&&setBookingFor(item.name)}
                >
                  <span style={{fontSize:36,marginBottom:16}}>{item.icon}</span>
                  <h3 style={{
                    fontFamily:fonts.display,fontWeight:800,
                    fontSize:16,letterSpacing:"0.1em",textTransform:"uppercase",
                    color:C.espresso,margin:"0 0 4px",
                  }}>{item.name}</h3>
                  <p style={{fontFamily:fonts.body,fontSize:16,color:C.muted,margin:0}}>{item.desc}</p>
                  <span className="card-hint">Request lessons →</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── SUMMER CAMP ── */}
          <section style={{background:C.espresso,padding:"72px 20px",position:"relative",overflow:"hidden",boxSizing:"border-box",width:"100%"}}>
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`radial-gradient(at 100% 0%, ${C.yellow05} 0px, transparent 55%)`,
              pointerEvents:"none",
            }}/>
            <div className="camp-grid" style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center",width:"100%"}}>
              <div>
                <p style={{
                  fontSize:12,fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",
                  color:C.teal,marginBottom:16,display:"flex",alignItems:"center",gap:8,
                }}>
                  <span style={{display:"block",width:28,height:3,background:C.teal,borderRadius:2}}/>
                  Summer 2026
                </p>
                <h1 style={{
                  fontFamily:fonts.display,fontWeight:800,
                  fontSize:"clamp(2.4rem,5vw,3.8rem)",letterSpacing:-1,
                  color:C.white,lineHeight:0.95,margin:"0 0 16px",
                }}>
                  Summer Camp <em style={{fontStyle:"italic",color:C.crimson}}>2026.</em>
                </h1>
                <h2 style={{
                  fontFamily:fonts.display,fontWeight:700,
                  fontSize:"clamp(1.1rem,2vw,1.5rem)",letterSpacing:-0.5,
                  color:C.white70,lineHeight:1.3,margin:"0 0 24px",fontStyle:"italic",
                }}>
                  Your kid will be in a real band by Friday.
                </h2>
                <p style={{fontFamily:fonts.body,fontSize:16,color:C.white80,lineHeight:1.8,marginBottom:36,maxWidth:420}}>
                  One week. No experience needed. Every kid gets an instrument, joins a band, and performs a real song on the last day.
                </p>
                <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                  <Button
                    href={CAMP_URL} target="_blank" rel="noreferrer"
                    style={{boxShadow:`0 4px 20px ${C.crimson30}`}}
                  >
                    Enroll Now
                  </Button>
                  <Button
                    variant="ghost"
                    href="/summer-camp"
                    onClick={e=>{ e.preventDefault(); navigate("/summer-camp"); }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:C.white07,border:`1px solid ${C.white07}`}}>
                {[
                  {label:"Dates",     value:"June 22–26, 2026",  color:C.white},
                  {label:"Ages",      value:"8–12 years old",    color:C.white},
                  {label:"Schedule",  value:"9 AM – 12:30 PM",   color:C.white},
                  {label:"Band Size", value:"Max 7 kids",        color:C.white},
                  {label:"Experience",value:"None required",     color:C.teal},
                  {label:"Final Day", value:"Live performance + recording", color:C.crimson},
                ].map(({label,value,color})=>(
                  <div key={label} style={{background:C.espresso,padding:"28px 24px"}}>
                    <p style={{fontFamily:fonts.body,fontSize:12,fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",color:C.lightCream,marginBottom:8}}>{label}</p>
                    <p style={{fontFamily:fonts.display,fontWeight:800,fontSize:16,color,lineHeight:1.3}}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TESTIMONIAL ── */}
          <section style={{padding:"72px 20px 88px",maxWidth:900,margin:"0 auto",boxSizing:"border-box",width:"100%"}}>
            <a
              href="https://m.yelp.com/biz/headliner-music-academy-rocklin"
              target="_blank" rel="noreferrer"
              style={{
                display:"block",background:C.white,
                borderRadius:20,padding:"48px 56px",
                border:`1px solid ${C.border}`,textDecoration:"none",textAlign:"center",
                boxShadow:`0 4px 24px ${C.espresso06}`,
                transition:"box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 32px ${C.espresso10}`;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow=`0 4px 24px ${C.espresso06}`;e.currentTarget.style.transform="translateY(0)";}}
            >
              <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:24}}>
                {[1,2,3,4,5].map(s=>(
                  <svg key={s} width={18} height={18} viewBox="0 0 24 24" fill={C.yellow}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p style={{
                fontFamily:fonts.display,fontWeight:700,fontStyle:"italic",
                fontSize:"clamp(1.1rem,2.5vw,1.5rem)",color:C.espresso,
                lineHeight:1.55,maxWidth:640,margin:"0 auto 24px",
              }}>
                "Love this place!! It's unique!!! Amicable and well organized. Amazing diverse and integrative for kids, young or adults."
              </p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,fontFamily:fonts.body,fontSize:16}}>
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

      </main>

      {/* ── FOOTER ── */}
      <footer style={{background:C.espresso,color:C.white,padding:"64px 40px 40px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,paddingBottom:48,borderBottom:`1px solid ${C.white08}`,marginBottom:28}}>
            <div>
              <a href="/" style={{display:"block",marginBottom:20,lineHeight:0}}>
                <img src="https://res.cloudinary.com/diy08lj9x/image/upload/v1780714085/logo_white_2x_ypk002.png" alt="Headliner Music Academy" style={{display:"block",height:"auto",maxHeight:44,width:"auto",maxWidth:220,objectFit:"contain"}}/>
              </a>
              <p style={{fontFamily:fonts.body,fontSize:16,color:C.white70,lineHeight:1.75,maxWidth:480,marginBottom:24}}>
                Inspiring the next generation of musicians through premium, personalized education.
              </p>
              <Button variant="outlineRed" onClick={() => setBookingFor("")} style={{fontSize:12}}>
                Request Lessons
              </Button>
            </div>
            <div>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <a href="tel:916-435-1300" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.crimson}
                  onMouseLeave={e=>e.currentTarget.style.color=C.white}
                >
                  <Phone size={16} color={C.crimson}/>
                  <span style={{fontFamily:fonts.body,fontSize:20,fontWeight:600,color:C.white,letterSpacing:-0.5}}>(916) 435-1300</span>
                </a>
                <a href="mailto:admin@headlinermusicacademy.com" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:C.white70,fontFamily:fonts.body,fontSize:14,wordBreak:"break-all",overflowWrap:"break-word",minWidth:0}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.crimson}
                  onMouseLeave={e=>e.currentTarget.style.color=C.white38}
                >
                  <Mail size={15} color={C.crimson}/>
                  admin@headlinermusicacademy.com
                </a>
                <div style={{display:"flex",alignItems:"flex-start",gap:10,color:C.white70,fontFamily:fonts.body,fontSize:14,lineHeight:1.6}}>
                  <MapPin size={15} color={C.crimson} style={{marginTop:2,flexShrink:0}}/>
                  2311 Sunset Blvd<br/>Rocklin, CA 95765
                </div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
            <p style={{fontFamily:fonts.body,fontSize:10,letterSpacing:"0.1em",color:C.white18}}>
              © {new Date().getFullYear()} Headliner Music Academy. All rights reserved.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:20}}>
              {[
                {href:"/privacy-policy.html",label:"Privacy Policy"},
                {href:"/terms-and-conditions.html",label:"Terms & Conditions"},
              ].map(({href,label})=>(
                <a key={label} href={href} style={{fontFamily:fonts.body,fontSize:10,letterSpacing:"0.1em",color:C.white28,textDecoration:"none",textTransform:"uppercase"}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.crimson}
                  onMouseLeave={e=>e.currentTarget.style.color=C.white28}
                >{label}</a>
              ))}
              <a href="https://m.yelp.com/biz/headliner-music-academy-rocklin" target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"center",gap:6,fontFamily:fonts.body,fontSize:10,color:C.white28,textDecoration:"none",textTransform:"uppercase",letterSpacing:"0.1em"}}
                onMouseEnter={e=>e.currentTarget.style.color=C.crimson}
                onMouseLeave={e=>e.currentTarget.style.color=C.white28}
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