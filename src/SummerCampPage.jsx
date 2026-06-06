import { ArrowRight } from "lucide-react";

const CAMP_URL   = "https://headlinerma.opus1.io/w/summercamp2026";
const PORTAL_URL = "https://headlinerma.opus1.io/login";
const LOGO_URL   = "https://res.cloudinary.com/diy08lj9x/image/upload/v1780713493/Asset_1_2x_a5hm0v.png";

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

const btnRed = {
  display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
  background:C.crimson, color:"#fff",
  fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
  padding:"14px 32px", borderRadius:999, border:"none", cursor:"pointer",
  textDecoration:"none", transition:"background 0.2s",
};

const faqs = [
  {
    q: "My child has never touched an instrument. Is that okay?",
    a: "Absolutely. This camp is built for kids who have never picked up an instrument. Our instructors meet every child where they are and go from there. First-timers are the norm, not the exception."
  },
  {
    q: "How are instruments assigned?",
    a: "When kids arrive, we take a few minutes to talk about what interests them and let them explore the different instruments before we make assignments. We then put together a balanced band, making sure every role is covered. Kids often surprise themselves with what they end up loving."
  },
  {
    q: "Is it co-ed?",
    a: "Yes. Bands are mixed. Boys and girls rehearse and perform together, just like real bands do."
  },
  {
    q: "What happens on the last day?",
    a: "On Friday the band performs the song they have spent the week rehearsing, and we record it. Every family gets that recording to keep. The performance is the milestone, but what builds up to it is the real thing: kids gaining confidence, learning that they can actually do this, making friends along the way, and having a genuinely good week."
  },
  {
    q: "Is lunch provided?",
    a: "Lunch is not included. Camp runs from 9:00 AM to 12:30 PM, so kids are home well before lunch. We recommend packing a light snack for the mid-morning break."
  },
  {
    q: "How small are the groups?",
    a: "Each band has a maximum of 7 kids. Small on purpose. Every child gets real attention from the instructors, and every child has a real role in the band. When a group is full, it closes."
  },
];

export default function SummerCampPage() {
  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:C.cream,color:C.espresso,minHeight:"100vh",overflowX:"hidden",maxWidth:"100vw"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,700;0,800;0,900;1,700;1,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&display=swap');
        *, *::before, *::after { box-sizing:border-box; }
        ::selection { background:rgba(255,0,68,0.12); color:#1e130e; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        @keyframes marquee { from{transform:translateX(0);}to{transform:translateX(-50%);} }
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.3;} }
        .sc-fu  { animation:fadeUp 0.65s ease both; }
        .sc-d1  { animation-delay:0.06s; }
        .sc-d2  { animation-delay:0.16s; }
        .sc-d3  { animation-delay:0.26s; }
        .sc-d4  { animation-delay:0.36s; }
        .sc-marquee { animation:marquee 22s linear infinite; display:flex; width:max-content; }
        .sc-dot { animation:pulse 2s ease-in-out infinite; }
        .sc-pill {
          display:inline-flex; align-items:center; gap:8px;
          padding:10px 20px; border-radius:999px;
          font-size:14px; font-weight:600;
          color:#1e130e; background:#fff;
          box-shadow:0 4px 12px rgba(30,19,14,0.06);
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .sc-pill:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(30,19,14,0.1); }
        .sc-enroll:hover   { background:#CC0036 !important; }
        .sc-enroll-teal:hover { background:#00A99B !important; }
        .sc-faq-item { border-bottom:1px solid #F0EBE1; padding:28px 0; }
        .sc-faq-item:first-child { border-top:1px solid #F0EBE1; }
        .sc-nav-link {
          font-size:12px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase;
          color:#7A6A5A; text-decoration:none; position:relative; padding-bottom:2px; transition:color 0.2s;
        }
        .sc-nav-link::after {
          content:''; position:absolute; bottom:0; left:0; right:0;
          height:1px; background:#FF0044;
          transform:scaleX(0); transform-origin:left; transition:transform 0.2s;
        }
        .sc-nav-link:hover { color:#1e130e; }
        .sc-nav-link:hover::after { transform:scaleX(1); }
        @media (max-width:768px) {
          .sc-hero-grid  { grid-template-columns:1fr !important; }
          .sc-split      { grid-template-columns:1fr !important; gap:48px !important; }
          .sc-details    { grid-template-columns:1fr 1fr !important; }
          section, header, nav { padding-left:20px !important; padding-right:20px !important; }
          .sc-marquee-wrap { overflow:hidden !important; max-width:100vw !important; }
        }
        /* Prevent any horizontal overflow globally */
        html, body { overflow-x:hidden !important; max-width:100vw !important; }
        * { min-width:0; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(253,251,247,0.95)",backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${C.border}`,
        height:68,display:"flex",alignItems:"center",
        justifyContent:"space-between",
        padding:"0 20px",
        boxSizing:"border-box",
        width:"100%",
        overflow:"hidden",
      }}>
        <a href="/" style={{display:"flex",alignItems:"center",textDecoration:"none",flexShrink:0}}>
          <img src={LOGO_URL} alt="Headliner Music Academy" style={{height:36,width:"auto",maxWidth:160}}/>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:16,flexShrink:0}}>
          <a href={PORTAL_URL} target="_blank" rel="noreferrer" className="sc-nav-link" style={{whiteSpace:"nowrap"}}>
            Parent Portal
          </a>
          <a href={CAMP_URL} target="_blank" rel="noreferrer" className="sc-enroll" style={{...btnRed,padding:"9px 18px",fontSize:11,whiteSpace:"nowrap"}}>
            Enroll Now <ArrowRight size={12}/>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header style={{
        background:C.espresso, padding:"72px 20px 64px",
        position:"relative", overflow:"hidden",
        borderBottom:`3px solid ${C.crimson}`,
        boxSizing:"border-box", width:"100%",
      }}>
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:`
            radial-gradient(at 0% 0%, rgba(255,0,68,0.12) 0px, transparent 55%),
            radial-gradient(at 100% 100%, rgba(0,196,181,0.09) 0px, transparent 55%)`,
        }}/>
        <div style={{
          position:"absolute",right:"-2vw",top:"50%",transform:"translateY(-50%)",
          fontFamily:"'Raleway',sans-serif",fontWeight:900,fontSize:"36vw",
          lineHeight:1,color:C.crimson,opacity:0.03,pointerEvents:"none",userSelect:"none",
        }}>H</div>

        <div className="sc-hero-grid" style={{
          maxWidth:1160,margin:"0 auto",position:"relative",zIndex:1,
          display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:48,alignItems:"center",
          width:"100%",boxSizing:"border-box",
        }}>
          {/* Text */}
          <div>
            <h1 className="sc-fu sc-d1" style={{
              fontFamily:"'Raleway',sans-serif",fontWeight:900,
              fontSize:"clamp(3rem,7vw,6rem)",lineHeight:0.93,
              letterSpacing:-2,color:"#fff",margin:"0 0 20px",
            }}>
              Summer<br/>Band <em style={{fontStyle:"italic",color:C.crimson}}>Camp.</em>
            </h1>

            <p className="sc-fu sc-d2" style={{
              fontFamily:"'Raleway',sans-serif",fontWeight:700,
              fontSize:"clamp(1rem,2vw,1.4rem)",color:C.yellow,margin:"0 0 40px",
            }}>
              Your kid will be in a real band by Friday.
            </p>

            <div className="sc-fu sc-d3" style={{display:"flex",gap:28,flexWrap:"wrap",marginBottom:48}}>
              {[
                {label:"Dates",    value:"June 22–26, 2026"},
                {label:"Schedule", value:"9 AM – 12:30 PM"},
                {label:"Ages",     value:"8–12 years old"},
              ].map(({label,value})=>(
                <div key={label} style={{display:"flex",flexDirection:"column",gap:4}}>
                  <span style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"0.16em"}}>{label}</span>
                  <span style={{fontSize:15,fontWeight:600,color:"#fff"}}>{value}</span>
                </div>
              ))}
            </div>

            <div className="sc-fu sc-d4">
              <a href={CAMP_URL} target="_blank" rel="noreferrer" className="sc-enroll" style={{...btnRed,fontSize:14,padding:"15px 36px",boxShadow:`0 4px 20px rgba(255,0,68,0.3)`}}>
                Enroll Now <ArrowRight size={16}/>
              </a>
            </div>
          </div>

          {/* Details grid */}
          <div className="sc-details" style={{
            display:"grid",gridTemplateColumns:"1fr 1fr",
            gap:1,background:"rgba(255,255,255,0.07)",
            border:"1px solid rgba(255,255,255,0.07)",
          }}>
            {[
              {label:"Dates",      value:"June 22–26, 2026",               color:C.white},
              {label:"Hours",      value:"9:00 AM – 12:30 PM",             color:C.white},
              {label:"Ages",       value:"8–12 years old",                  color:C.white},
              {label:"Band Size",  value:"Max 7 kids",                      color:C.yellow},
              {label:"Experience", value:"None required",                   color:C.teal},
              {label:"Final Day",  value:"Live performance + recording",    color:C.crimson},
            ].map(({label,value,color})=>(
              <div key={label} style={{background:C.espresso,padding:"28px 24px"}}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",margin:"0 0 8px"}}>{label}</p>
                <p style={{fontFamily:"'Raleway',sans-serif",fontWeight:800,fontSize:16,color,lineHeight:1.3,margin:0}}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="sc-marquee-wrap" style={{background:C.crimson,padding:"13px 0",overflow:"hidden",width:"100%",boxSizing:"border-box"}}>
        <div className="sc-marquee">
          {[
            "Electric Guitar","•","Bass Guitar","•","Drums","•","Keyboard","•","Vocals","•",
            "No Experience Needed","•","Max 7 Kids Per Band","•","June 22–26","•",
            "Electric Guitar","•","Bass Guitar","•","Drums","•","Keyboard","•","Vocals","•",
            "No Experience Needed","•","Max 7 Kids Per Band","•","June 22–26","•",
          ].map((item,i)=>(
            <span key={i} style={{
              fontFamily:"'Raleway',sans-serif",fontWeight:900,fontSize:11,
              letterSpacing:"0.2em",textTransform:"uppercase",
              color: item==="•" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)",
              padding: item==="•" ? "0 8px" : "0 24px",
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* THE CAMP */}
      <section style={{background:C.white,padding:"72px 20px",borderBottom:`1px solid ${C.border}`,boxSizing:"border-box",width:"100%"}}>
        <div className="sc-split" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:96,alignItems:"start"}}>
          <div>
            <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:C.teal,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
              <span style={{display:"block",width:24,height:2,background:C.teal,borderRadius:2}}/>
              The Camp
            </p>
            <h2 style={{
              fontFamily:"'Raleway',sans-serif",fontWeight:900,
              fontSize:"clamp(2.2rem,4.5vw,3.4rem)",letterSpacing:-1,
              color:C.espresso,margin:"0 0 28px",lineHeight:0.95,
            }}>
              Show up curious.<br/>Leave as a <em style={{fontStyle:"italic",color:C.crimson}}>band.</em>
            </h2>
            <p style={{fontSize:16,color:C.muted,lineHeight:1.85,marginBottom:20}}>
              Your child walks in on Monday and walks out on Friday as a member of a real band — one that has rehearsed together all week and will perform an actual song at the end of it.
            </p>
            <p style={{fontSize:16,color:C.muted,lineHeight:1.85,marginBottom:20}}>
              Each small group of up to 7 kids is assigned instruments, learns the basics from our instructors, and spends the week rehearsing together.
            </p>
            <p style={{fontSize:16,color:C.muted,lineHeight:1.85}}>
              On the final day, we record the band performing their song and share that recording with every family.
            </p>

            <div style={{marginTop:48}}>
              <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:C.crimson,marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
                <span style={{display:"block",width:24,height:2,background:C.crimson,borderRadius:2}}/>
                Instruments Available
              </p>
              <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                {["🎸 Electric Guitar","🎸 Bass Guitar","🥁 Drums","🎹 Keyboard","🎤 Vocals"].map(item=>(
                  <span key={item} className="sc-pill">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:C.muted,marginBottom:24}}>
              Camp Details
            </p>
            <div style={{display:"flex",flexDirection:"column",border:`1px solid ${C.border}`}}>
              {[
                {label:"Dates",      value:"June 22–26, 2026",                          accent:null},
                {label:"Daily Hours",value:"9:00 AM – 12:30 PM",                        accent:null},
                {label:"Ages",       value:"8–12 years old",                             accent:null},
                {label:"Band Size",  value:"Max 7 kids — co-ed",                        accent:"yellow"},
                {label:"Experience", value:"None required at all",                       accent:"teal"},
                {label:"Lunch",      value:"Not included — bring a snack",               accent:null},
                {label:"Final Day",  value:"Performance recorded and shared with every family", accent:"crimson"},
              ].map(({label,value,accent},i,arr)=>(
                <div key={label} style={{
                  padding:"20px 24px",
                  borderBottom: i < arr.length-1 ? `1px solid ${C.border}` : "none",
                  background: accent==="yellow" ? "rgba(255,209,102,0.08)"
                            : accent==="teal"   ? "rgba(0,196,181,0.06)"
                            : accent==="crimson" ? "rgba(255,0,68,0.04)"
                            : C.white,
                }}>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,margin:"0 0 6px"}}>{label}</p>
                  <p style={{
                    fontFamily:"'Raleway',sans-serif",fontWeight:800,fontSize:16,
                    color: accent==="teal"    ? C.teal
                         : accent==="crimson" ? C.crimson
                         : C.espresso,
                    margin:0,lineHeight:1.3,
                  }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{background:C.espresso,padding:"72px 20px",borderBottom:"1px solid rgba(255,255,255,0.07)",position:"relative",overflow:"hidden",boxSizing:"border-box",width:"100%"}}>
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:`radial-gradient(at 0% 100%, rgba(0,196,181,0.1) 0px, transparent 55%), radial-gradient(at 100% 0%, rgba(255,209,102,0.06) 0px, transparent 55%)`,
        }}/>
        <div className="sc-split" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:96,alignItems:"center",position:"relative",zIndex:1}}>
          <div>
            <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:C.yellow,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
              <span style={{display:"block",width:24,height:2,background:C.yellow,borderRadius:2}}/>
              Our Story
            </p>
            <h2 style={{
              fontFamily:"'Raleway',sans-serif",fontWeight:900,
              fontSize:"clamp(2.2rem,4.5vw,3.4rem)",letterSpacing:-1,
              color:"#fff",margin:"0 0 28px",lineHeight:0.95,
            }}>
              10 Years.<br/><em style={{fontStyle:"italic",color:C.teal}}>Our own path.</em>
            </h2>
            <p style={{fontSize:16,color:"rgba(255,255,255,0.52)",lineHeight:1.85,marginBottom:20}}>
              For 10 years we were part of a franchise and now we are ready to make our own path. Same teachers, same people, same location. The difference is that we are finally free to run things the way we have always known they should be run.
            </p>
            <p style={{fontSize:16,color:"rgba(255,255,255,0.75)",fontWeight:500,lineHeight:1.85}}>
              A decade of know-how. Finally done our way.
            </p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.07)"}}>
            {[
              {value:"10",   label:"Years Running",     color:C.crimson},
              {value:"100%", label:"Same Teachers",     color:C.teal},
              {value:"7",    label:"Kids Max Per Band", color:C.yellow},
              {value:"0",    label:"Experience Needed", color:"#fff"},
            ].map(({value,label,color})=>(
              <div key={label} style={{background:C.espresso,padding:"36px 28px",textAlign:"center"}}>
                <p style={{fontFamily:"'Raleway',sans-serif",fontWeight:900,fontSize:"3.2rem",color,lineHeight:1,margin:"0 0 8px"}}>{value}</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",margin:0}}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:C.white,padding:"72px 20px",borderBottom:`1px solid ${C.border}`,boxSizing:"border-box",width:"100%"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:C.crimson,marginBottom:16,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <span style={{display:"block",width:24,height:2,background:C.crimson,borderRadius:2}}/>
            FAQ
            <span style={{display:"block",width:24,height:2,background:C.crimson,borderRadius:2}}/>
          </p>
          <h2 style={{
            fontFamily:"'Raleway',sans-serif",fontWeight:900,
            fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:-1,
            color:C.espresso,margin:"0 0 56px",textAlign:"center",lineHeight:0.95,
          }}>
            Good questions.<br/><em style={{fontStyle:"italic",color:C.crimson}}>Real answers.</em>
          </h2>
          <div>
            {faqs.map(({q,a})=>(
              <div key={q} className="sc-faq-item">
                <p style={{fontFamily:"'Raleway',sans-serif",fontWeight:800,fontSize:18,color:C.espresso,margin:"0 0 12px",lineHeight:1.3}}>{q}</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:C.muted,lineHeight:1.85,margin:0,maxWidth:660}}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section style={{background:C.cream,padding:"72px 20px",boxSizing:"border-box",width:"100%"}}>
        <div className="sc-split" style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
          <div>
            <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:C.crimson,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
              <span style={{display:"block",width:24,height:2,background:C.crimson,borderRadius:2}}/>
              Registration
            </p>
            <h2 style={{
              fontFamily:"'Raleway',sans-serif",fontWeight:900,
              fontSize:"clamp(2.2rem,4vw,3.4rem)",letterSpacing:-1,
              color:C.espresso,margin:"0 0 20px",lineHeight:0.95,
            }}>
              Reserve your <em style={{fontStyle:"italic",color:C.crimson}}>spot.</em>
            </h2>
            <p style={{fontSize:16,color:C.muted,lineHeight:1.85,marginBottom:16}}>
              Payment holds the spot. Each band is limited to 7 kids — when a band is full, it closes. Spots go quickly.
            </p>
            <p style={{fontSize:16,color:C.muted,lineHeight:1.85,marginBottom:40}}>
              A confirmation email will be sent within a few minutes of completing your registration.
            </p>
            <a href={CAMP_URL} target="_blank" rel="noreferrer" className="sc-enroll-teal" style={{...btnRed,fontSize:15,padding:"16px 40px",display:"inline-flex",boxShadow:`0 4px 20px rgba(255,0,68,0.25)`}}>
              Enroll Now <ArrowRight size={16}/>
            </a>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,marginTop:20}}>
              Questions?{" "}
              <a href="mailto:camp@headlinermusicacademy.com" style={{color:C.crimson,textDecoration:"none",fontWeight:700}}>
                camp@headlinermusicacademy.com
              </a>
            </p>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:1,background:C.border,border:`1px solid ${C.border}`}}>
            {[
              {label:"Camp Dates",    value:"June 22–26, 2026",  highlight:null},
              {label:"Daily Hours",   value:"9:00 AM – 12:30 PM",highlight:null},
              {label:"Ages",          value:"8–12 years old",    highlight:null},
              {label:"Experience",    value:"None required",      highlight:"teal"},
              {label:"Band Capacity", value:"Maximum 7 kids",    highlight:"yellow"},
            ].map(({label,value,highlight})=>(
              <div key={label} style={{
                background: highlight==="yellow" ? "rgba(255,209,102,0.12)"
                          : highlight==="teal"   ? "rgba(0,196,181,0.08)"
                          : C.white,
                padding:"22px 28px",
              }}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,margin:"0 0 6px"}}>{label}</p>
                <p style={{
                  fontFamily:"'Raleway',sans-serif",fontWeight:800,fontSize:20,
                  color: highlight==="teal" ? C.teal : C.espresso,
                  margin:0,
                }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}