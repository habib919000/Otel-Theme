import React from 'react';

// Contact, Blog Single, Property pages

const ICONS = window.OtelIcons;
const { PROPERTIES, ROOMS, POSTS } = window.OtelData;

// ============================================================
// CONTACT PAGE
// ============================================================
function ContactPage() {
  window.otelUseReveal();
  const [property, setProperty] = React.useState("maris");
  const [form, setForm] = React.useState({ name: "", email: "", subject: "Reservation enquiry", message: "" });
  const [sent, setSent] = React.useState(false);

  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name: "", email: "", subject: "Reservation enquiry", message: "" }); };
  const p = PROPERTIES.find(x => x.id === property);

  return (
    <div data-screen-label="05 Contact">
      <window.OtelHeader active="contact" />
      <section className="page-header">
        <div className="container-wide">
          <div style={{display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end"}}>
            <div>
              <span className="section-num">Reach Our Team · 24/7</span>
              <h1 className="display-l" style={{marginTop: 14}}>Get in<br/><span className="serif-italic">touch.</span></h1>
            </div>
            <p className="lead" style={{maxWidth: 420}}>Reservations, special requests, or simply a question — our team replies within an hour during local working times.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div style={{display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start"}}>
            <div className="reveal">
              <span className="section-num">01 / Direct Contact</span>
              <h2 className="display-m" style={{margin: "16px 0 32px"}}>Speak with our<br/>concierge.</h2>
              <div style={{borderTop: "1px solid var(--border-soft)"}}>
                {[
                  {l: "Reservations", v: "+1 (646) 555-0142", sub: "Mon — Sun, 06:00 — 23:00 local"},
                  {l: "Concierge", v: "concierge@otel.travel", sub: "Replies within the hour"},
                  {l: "Press & Media", v: "press@otel.travel", sub: "For editorial enquiries"},
                  {l: "Group Stays", v: "groups@otel.travel", sub: "Six rooms or more, bespoke pricing"},
                ].map(c => (
                  <div key={c.l} style={{padding: "24px 0", borderBottom: "1px solid var(--border-soft)", display: "grid", gridTemplateColumns: "140px 1fr", gap: 16}}>
                    <span style={{fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg-3)", fontWeight: 700, paddingTop: 4}}>{c.l}</span>
                    <div>
                      <div style={{fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-1)", marginBottom: 4}}>{c.v}</div>
                      <div style={{fontSize: 13, color: "var(--fg-3)"}}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop: 40}}>
                <span className="section-num">02 / Visit a Property</span>
                <h3 className="display-m" style={{margin: "12px 0 20px", fontSize: 24}}>Choose a house</h3>
                <div style={{display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24}}>
                  {PROPERTIES.map(prop => (
                    <button key={prop.id} onClick={() => setProperty(prop.id)} style={{padding: "8px 14px", border: "1px solid " + (property === prop.id ? "var(--fg-1)" : "var(--border-soft)"), background: property === prop.id ? "var(--fg-1)" : "transparent", color: property === prop.id ? "white" : "var(--fg-1)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "all 200ms"}}>Otel {prop.id[0].toUpperCase() + prop.id.slice(1)}</button>
                  ))}
                </div>
                <div style={{padding: 28, background: "var(--bg-soft)", borderRadius: 6}}>
                  <div style={{fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg-3)", fontWeight: 700, marginBottom: 8}}>Otel {p.id[0].toUpperCase() + p.id.slice(1)}</div>
                  <div style={{fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--fg-1)", marginBottom: 12}}>{p.city}, {p.country}</div>
                  <div style={{fontSize: 14, lineHeight: 1.7, color: "var(--fg-2)"}}>
                    {p.id === "maris" && "12 Chemin du Phare, 06230 Saint-Jean-Cap-Ferrat"}
                    {p.id === "verde" && "Chesa Sur Eva, 7524 Engadin Valley, Graubünden"}
                    {p.id === "brondo" && "Rua das Flores 38, 1200-194 Lisboa"}
                    {p.id === "noor" && "Derb Sidi Ahmed Soussi 14, Médina, 40000 Marrakech"}
                    {p.id === "haven" && "Higashiyama-ku, 605-0073 Kyoto-shi"}
                    {p.id === "marina" && "Carretera Tulum-Boca Paila km 7, 77780 Tulum"}
                    <div style={{marginTop: 12, color: "var(--fg-3)"}}>{p.climate} · {p.description}</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="reveal" onSubmit={submit} style={{padding: 40, background: "var(--ink)", color: "white", borderRadius: 8, position: "sticky", top: 100}}>
              <span className="section-num on-dark">03 / Send a Message</span>
              <h2 className="display-m" style={{color: "white", margin: "16px 0 32px"}}>Or write to us<br/><span className="serif-italic">directly.</span></h2>

              <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                {[
                  {k: "name", label: "Your Name", type: "text", placeholder: "Camille Vorel"},
                  {k: "email", label: "Email", type: "email", placeholder: "you@example.com"},
                ].map(f => (
                  <label key={f.k} style={{display: "flex", flexDirection: "column", gap: 8}}>
                    <span style={{fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700}}>{f.label}</span>
                    <input required type={f.type} value={form[f.k]} onChange={e => setForm({...form, [f.k]: e.target.value})} placeholder={f.placeholder}
                      style={{background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "10px 0", fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 700, outline: "none"}} />
                  </label>
                ))}
                <label style={{display: "flex", flexDirection: "column", gap: 8}}>
                  <span style={{fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700}}>Subject</span>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                    style={{background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "10px 0", fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 700, outline: "none", cursor: "pointer"}}>
                    {["Reservation enquiry", "Group stay", "Press & media", "Careers", "Other"].map(s => <option key={s} value={s} style={{color: "var(--fg-1)"}}>{s}</option>)}
                  </select>
                </label>
                <label style={{display: "flex", flexDirection: "column", gap: 8}}>
                  <span style={{fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700}}>Message</span>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your trip..."
                    style={{background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, color: "white", padding: 14, fontSize: 15, fontFamily: "var(--font-body)", outline: "none", resize: "vertical"}} />
                </label>
                <button type="submit" style={{background: "white", color: "var(--ink)", border: "none", padding: "16px", borderRadius: 4, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", marginTop: 12}}>
                  {sent ? "Message Sent ✓" : "Send Message →"}
                </button>
                <p style={{fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0, textAlign: "center"}}>We reply within an hour during working times.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="section soft tight">
        <div className="container-wide">
          <div className="section-head reveal">
            <div className="left">
              <span className="section-num">04 / Frequently Asked</span>
              <h2 className="display-m">Before you write</h2>
            </div>
            <div className="right">A handful of answers we give every week. If yours isn't here, the form is just up there.</div>
          </div>
          <div className="reveal" style={{borderTop: "1px solid var(--border-soft)"}}>
            {[
              {q: "What time can I check in?", a: "From 3pm. Earlier on request — we'll always try to accommodate, no charge."},
              {q: "Do you take dogs?", a: "Well-mannered dogs are welcome at Verde and Maris. We provide a bed and a bowl. Let us know at booking."},
              {q: "Can I cancel my reservation?", a: "Free cancellation up to 7 days before arrival. Within 7 days, the first night is non-refundable."},
              {q: "Is breakfast included?", a: "Continental breakfast is included at all properties. Full breakfast is available for a small charge."},
              {q: "Do you arrange airport transfers?", a: "Yes — direct transfers from the nearest airport or station, in our own vehicles. Ask the concierge."},
            ].map((f, i) => <FaqRow key={i} {...f} />)}
          </div>
        </div>
      </section>

      <window.OtelFooter />
      <window.OtelBookingSummary />
    </div>
  );
}

function FaqRow({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{borderBottom: "1px solid var(--border-soft)"}}>
      <button onClick={() => setOpen(!open)} style={{width: "100%", padding: "24px 0", background: "none", border: "none", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 24}}>
        <span style={{fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--fg-1)"}}>{q}</span>
        <span style={{fontSize: 22, color: "var(--fg-3)", transition: "transform 200ms", transform: open ? "rotate(45deg)" : "none"}}>+</span>
      </button>
      {open && <div style={{paddingBottom: 24, fontSize: 15, lineHeight: 1.7, color: "var(--fg-2)", maxWidth: "70ch"}}>{a}</div>}
    </div>
  );
}

window.OtelContactPage = ContactPage;

// ============================================================
// PROPERTY PAGE
// ============================================================
const PROP_IMAGERY = {
  maris: { hero: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=85", lead: "A cliffside house above the Mediterranean", year: 2014, rooms: 12, story: "Built around the bones of a 1920s lighthouse-keeper's cottage, Otel Maris was opened in 2014 with twelve suites carved into the limestone cliff. The terrace is the centre of the house — long lunches under the pines, a saltwater pool fed from the cove, and a stretch of coastline that empties from October." },
  verde: { hero: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1800&q=85", lead: "An alpine wellness house in the Engadin Valley", year: 2017, rooms: 14, story: "Otel Verde sits at 1,800m, in a clearing of larch and stone pine. Fourteen rooms across two timber pavilions, all with fireplaces and copper baths. The spa was designed around three pools — a hammam, a cold plunge, and a saltwater bath fed from a rooftop catchment." },
  brondo: { hero: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1800&q=85", lead: "An architect's house in the heart of Lisbon", year: 2019, rooms: 9, story: "A nineteenth-century townhouse on the Rua das Flores, restored by the Lisbon studio Aires Mateus and opened in 2019. Nine rooms, an azulejo-tiled stairwell, and a rooftop with one of the better views of the Tejo." },
  noor: { hero: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1800&q=85", lead: "A riad in the Marrakech medina", year: 2016, rooms: 11, story: "Hidden behind a cedar door in the medina's quietest derb, Otel Noor is a traditional riad arranged around an orange-tree courtyard. Eleven rooms, a hammam, and a rooftop that looks across the medina to the Atlas mountains." },
  haven: { hero: "https://images.unsplash.com/photo-1545569310-d04c19a7e3e6?w=1800&q=85", lead: "A wooden house on the eastern hills of Kyoto", year: 2020, rooms: 8, story: "Otel Haven occupies a 19th-century townhouse in Higashiyama, restored by the Kyoto carpentry workshop Nakamura-Sotoji. Eight tatami rooms, a hinoki-wood bath, and a moss garden tended by a single gardener for thirty years." },
  marina: { hero: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1800&q=85", lead: "A reef-side hideaway south of Tulum", year: 2021, rooms: 10, story: "Ten palm-thatched bungalows on a private stretch of the Sian Ka'an reef. The kitchen sources from a five-mile radius — fish from the lagoon, vegetables from the Maya cooperative inland — and dinner is candle-lit on the sand." },
};

function PropertyPage() {
  window.otelUseReveal();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "maris";
  const prop = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];
  const meta = PROP_IMAGERY[prop.id];
  const propRooms = ROOMS.filter(r => r.property === prop.id);

  return (
    <div data-screen-label={`06 Property — ${prop.id}`}>
      <window.OtelHeader active="properties" transparent />
      <section className="hero" style={{minHeight: "85vh"}}>
        <div className="hero-bg" style={{backgroundImage: `url(${meta.hero})`}} />
        <div className="hero-scrim" />
        <div className="hero-inner">
          <div className="hero-meta-row">
            <div>
              <div className="eyebrow-dot on-dark" style={{marginBottom: 28}}>The Collection · Property {String(PROPERTIES.findIndex(p => p.id === prop.id) + 1).padStart(2, "0")} of 06</div>
              <h1 className="hero-title">Otel<br/><span className="italic">{prop.id[0].toUpperCase() + prop.id.slice(1)}.</span></h1>
            </div>
            <div className="hero-meta">
              <div className="label">{prop.city}, {prop.country}</div>
              <div className="body">{meta.lead}. Opened {meta.year}, {meta.rooms} rooms.</div>
            </div>
          </div>
          <div className="hero-bottom-row">
            <div className="hero-stats">
              <div className="hero-stat"><div className="num">{meta.rooms}</div><div className="lab">Rooms</div></div>
              <div className="hero-stat"><div className="num">{meta.year}</div><div className="lab">Opened</div></div>
              <div className="hero-stat"><div className="num">{prop.climate}</div><div className="lab">Climate</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div style={{display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start"}} className="reveal">
            <div>
              <span className="section-num">01 / The House</span>
              <h2 className="display-l" style={{marginTop: 16}}>{meta.lead.replace(/^A/, "Our").replace(/^An/, "Our")}.</h2>
            </div>
            <div>
              <p className="lead" style={{marginBottom: 24}}>{meta.story}</p>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, marginTop: 32, paddingTop: 32, borderTop: "1px solid var(--border-soft)"}}>
                <div><div style={{fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, letterSpacing: "-0.01em"}}>{meta.rooms}</div><div style={{fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginTop: 6}}>Rooms &amp; Suites</div></div>
                <div><div style={{fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, letterSpacing: "-0.01em"}}>{2026 - meta.year}<span style={{fontSize: 16, color: "var(--fg-3)"}}>yrs</span></div><div style={{fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginTop: 6}}>In operation</div></div>
                <div><div style={{fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, letterSpacing: "-0.01em"}}>4.9</div><div style={{fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginTop: 6}}>Guest score</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft tight">
        <div className="container-wide">
          <div className="section-head-row reveal">
            <div className="heading-block">
              <span className="section-num">02 / Rooms at this house</span>
              <h2 className="display-m">{propRooms.length > 0 ? `${propRooms.length} room${propRooms.length>1?"s":""} on offer` : "Rooms across the collection"}</h2>
            </div>
            <a href="rooms.html" className="btn-link">View All Rooms</a>
          </div>
          <div className="rooms-grid reveal">
            {(propRooms.length > 0 ? propRooms : ROOMS.slice(0, 3)).slice(0, 3).map(r => <window.OtelHome.RoomCard key={r.id} room={r} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="section-head reveal">
            <div className="left">
              <span className="section-num">03 / Around the House</span>
              <h2 className="display-l">A neighbourhood<br/><span className="serif-italic">guide.</span></h2>
            </div>
            <div className="right">Five things our concierge would point you toward, on foot or a short drive.</div>
          </div>
          <div className="reveal" style={{borderTop: "1px solid var(--border-soft)"}}>
            {[
              { dist: "2 min", title: "Morning coffee", desc: "A small espresso bar with the best pastries in walking distance.", cat: "Café" },
              { dist: "8 min", title: "The harbour walk", desc: "A coastal path that loops out to the lighthouse and back, best at golden hour.", cat: "Walk" },
              { dist: "14 min", title: "Local market", desc: "Open Tuesday and Saturday — fish, cheese, and the better stone fruit.", cat: "Market" },
              { dist: "22 min", title: "Hidden chapel", desc: "12th-century, frescoed, almost always empty. Ask reception for the key.", cat: "Heritage" },
              { dist: "35 min", title: "An evening swim", desc: "A small cove the locals keep to themselves. We'll lend you a towel.", cat: "Swim" },
            ].map((g, i) => (
              <div key={i} style={{display: "grid", gridTemplateColumns: "60px 100px 1fr 120px", gap: 32, padding: "28px 0", borderBottom: "1px solid var(--border-soft)", alignItems: "center"}}>
                <div style={{fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--fg-3)"}}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--otel-logo-red)", fontWeight: 700}}>{g.cat}</div>
                <div>
                  <div style={{fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--fg-1)", marginBottom: 4}}>{g.title}</div>
                  <div style={{fontSize: 14, color: "var(--fg-2)"}}>{g.desc}</div>
                </div>
                <div style={{textAlign: "right", fontSize: 13, color: "var(--fg-3)", letterSpacing: "0.06em", textTransform: "uppercase"}}>{g.dist} away</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container-wide">
          <div className="section-head reveal">
            <div className="left">
              <span className="section-num on-dark">04 / Plan your stay</span>
              <h2 className="display-l" style={{color: "white"}}>Reserve at<br/><span className="serif-italic">Otel {prop.id[0].toUpperCase() + prop.id.slice(1)}.</span></h2>
            </div>
            <div className="right" />
          </div>
          <div className="reveal" style={{display: "flex", gap: 16, flexWrap: "wrap"}}>
            <a href="rooms.html" className="btn btn-primary">Browse Rooms {ICONS.arrow}</a>
            <a href="contact.html" className="btn btn-ghost on-dark">Contact Concierge</a>
          </div>
        </div>
      </section>

      <window.OtelFooter />
      <window.OtelBookingSummary />
    </div>
  );
}

window.OtelPropertyPage = PropertyPage;

// ============================================================
// BLOG SINGLE PAGE
// ============================================================
function BlogSinglePage() {
  window.otelUseReveal();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || POSTS[0].id;
  const post = POSTS.find(p => p.id === id) || POSTS[0];
  const related = POSTS.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div data-screen-label="07 Blog Single">
      <window.OtelHeader active="blog" />
      <section style={{paddingTop: 140, paddingBottom: 60}}>
        <div className="container-narrow reveal">
          <div style={{display: "flex", gap: 12, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", fontWeight: 700, marginBottom: 24}}>
            <span style={{color: "var(--otel-logo-red)"}}>{post.cat}</span>
            <span>·</span>
            <span>{post.date}, 2026</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h1 className="display-l" style={{marginBottom: 32, maxWidth: "20ch"}}>{post.title}</h1>
          <div style={{display: "flex", alignItems: "center", gap: 16, paddingBottom: 28, borderBottom: "1px solid var(--border-soft)"}}>
            <img src="assets/avatar-1.png" alt="" style={{width: 48, height: 48, borderRadius: "50%", objectFit: "cover"}} />
            <div>
              <div style={{fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg-1)"}}>Written by Edith Marlowe</div>
              <div style={{fontSize: 12, color: "var(--fg-3)", letterSpacing: "0.06em", textTransform: "uppercase"}}>Editor at large</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding: "0 0 60px"}}>
        <div className="container-wide reveal">
          <img src={post.image} alt="" style={{width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 4}} />
        </div>
      </section>

      <section className="section tight" style={{paddingTop: 0}}>
        <div className="container-narrow reveal">
          <p style={{fontSize: 22, lineHeight: 1.55, color: "var(--fg-1)", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid var(--border-soft)"}}>
            {post.excerpt} What follows is half a memory, half a recommendation — written from the terrace of the property in question, on the kind of afternoon this place is named for.
          </p>

          <div style={{fontSize: 18, lineHeight: 1.75, color: "var(--fg-2)", display: "flex", flexDirection: "column", gap: 24}}>
            <p>The first time we visited, the receptionist apologised for the weather — a fine drizzle off the sea. She handed us towels, said nothing more about it, and pointed us up a stone staircase to a room with a window that opened onto the cypresses.</p>
            <p>That was three years ago. We've come back twice since, both times in the same week of October, both times when most of the coast has packed up its umbrellas and gone home. There's a stretch of about ten days here when the light goes thin and the cypresses turn from olive to something close to gold, and you can have whole stretches of the cliff path to yourself.</p>

            <h3 style={{fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--fg-1)", margin: "16px 0 8px"}}>What changes in the quiet seasons</h3>

            <p>The kitchen, mostly. With fewer guests, the chefs cook smaller — three courses instead of four, the menu rewritten weekly rather than monthly. Breakfast moves from the terrace into a smaller corner of the dining room with a wood stove, and the staff have time for a longer chat about where to walk that day.</p>

            <blockquote style={{margin: "16px 0", padding: "0 0 0 28px", borderLeft: "3px solid var(--otel-logo-red)", fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.4, color: "var(--fg-1)", fontStyle: "italic", fontWeight: 400}}>
              "There's a stretch of about ten days here when the light goes thin, and the cypresses turn from olive to something close to gold."
            </blockquote>

            <p>What doesn't change: the towels, the linens, the pots of jam, the small attentions. Whatever the room rate is doing in any given month, the inside of the house keeps its own steady weather.</p>

            <h3 style={{fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--fg-1)", margin: "16px 0 8px"}}>How to plan it</h3>

            <p>The shoulder weeks are mid-October to early November, and again the second half of March. Rates are roughly thirty per cent lower than the high season, the dining room is more leisurely, and you can almost certainly secure a corner suite on a week's notice. The concierge maps out walks of varying severity — there's a six-hour loop that ends at a cove with a single café, which we cannot recommend enough.</p>

            <p>A note: pack layers. Off-season here is mild, not warm. A linen jacket for the evenings, a pair of well-broken-in shoes, and you're set.</p>
          </div>

          <div style={{marginTop: 60, paddingTop: 32, borderTop: "1px solid var(--border-soft)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20}}>
            <div style={{fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", fontWeight: 700}}>Share this letter</div>
            <div style={{display: "flex", gap: 10}}>
              {["facebook", "instagram", "twitter"].map(s => (
                <a key={s} href="#" style={{width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--border-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-1)", textDecoration: "none"}}>{ICONS[s]}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container-wide">
          <div className="section-head-row reveal">
            <div className="heading-block">
              <span className="section-num">More from the journal</span>
              <h2 className="display-m">Continue reading</h2>
            </div>
            <a href="blog.html" className="btn-link">All Letters</a>
          </div>
          <div className="rooms-grid reveal">
            {related.map(p => (
              <a className="room-card" href={`blog-single.html?id=${p.id}`} key={p.id}>
                <div className="img-wrap"><img src={p.image} alt="" /></div>
                <div className="meta">
                  <span style={{color: "var(--otel-logo-red)"}}>{p.cat}</span>
                  <span>{p.date}</span>
                </div>
                <h3>{p.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <window.OtelFooter />
      <window.OtelBookingSummary />
    </div>
  );
}

window.OtelBlogSinglePage = BlogSinglePage;
