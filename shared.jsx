// Shared components used across pages: header, footer, cart, scroll reveal, icons.

const ICONS = {
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
  ),
  user: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>
  ),
  bed: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 17v-7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7M2 17h20M2 17v3M22 17v3M6 12h4a1 1 0 0 1 1 1v0"/></svg>
  ),
  area: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V3h4M21 7V3h-4M3 17v4h4M21 17v4h-4"/></svg>
  ),
  wifi: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>
  ),
  pool: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5S16 18 18 18s2-1.5 4-1.5M2 14c2 0 2-1.5 4-1.5S8 14 10 14M14 6V3M18 6V3M14 6h4M14 10h4M14 14V8"/></svg>
  ),
  spa: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c1.5 3 1 5-1 7M12 2c-1.5 3-1 5 1 7M3 14c4-3 8-3 9-2M21 14c-4-3-8-3-9-2M12 12v10"/></svg>
  ),
  dining: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 3v18M4 11h4l-2-8M14 3v8a3 3 0 0 0 3 3h0v7M17 14h0"/></svg>
  ),
  gym: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h2M20 12h2M5 8v8M19 8v8M9 6v12M15 6v12M8 12h8"/></svg>
  ),
  concierge: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="3"/><path d="M5 21v-1a7 7 0 0 1 14 0v1M9 14l-2 2M15 14l2 2"/></svg>
  ),
  parking: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>
  ),
  star: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 15 9l7 .6-5.3 4.6L18.5 22 12 18l-6.5 4 1.8-7.8L2 9.6 9 9z"/></svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5L20 7"/></svg>
  ),
  facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v8h4v-8h3l1-4h-4V6.5c0-.5.5-1 1-1h2V2h-3a4 4 0 0 0-4 4z"/></svg>
  ),
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
  ),
  twitter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 4h3l-7 8 8 10h-6l-5-6-6 6H2l8-9L3 4h6l4 5z"/></svg>
  ),
};

function Stars({ n = 5 }) {
  return (
    <span className="stars" aria-label={`${n} of 5 stars`}>
      {Array.from({length: n}).map((_, i) => <span key={i}>{ICONS.star}</span>)}
    </span>
  );
}

// Smooth scroll reveal
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Header
function Header({ active = "home", transparent = false }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header ${transparent ? "transparent" : ""} ${scrolled ? "scrolled" : ""}`}>
      <div className="container-wide header-inner">
        <a href="index.html" className="brand-mark">
          <img src="assets/otel-logo.png" alt="" />
          <span>Otel</span>
        </a>
        <nav className="nav">
          <a href="index.html" className={active === "home" ? "active" : ""}>Home</a>
          <a href="rooms.html" className={active === "rooms" ? "active" : ""}>Rooms</a>
          <div className="nav-dropdown">
            <a href="property.html" className={active === "properties" ? "active" : ""}>
              Properties <span style={{fontSize: 9, opacity: 0.6}}>▾</span>
            </a>
            <div className="nav-menu">
              {window.OtelData.PROPERTIES.map(p => (
                <a key={p.id} href={`property.html?id=${p.id}`}>
                  <span className="nm-name">Otel {p.id[0].toUpperCase() + p.id.slice(1)}</span>
                  <span className="nm-loc">{p.city}, {p.country}</span>
                </a>
              ))}
            </div>
          </div>
          <a href="blog.html" className={active === "blog" ? "active" : ""}>Journal</a>
          <a href="contact.html" className={active === "contact" ? "active" : ""}>Contact</a>
        </nav>
        <div className="header-cta">
          <span className="lang">EN ▾</span>
          <a href="rooms.html" className="reserve">Reserve</a>
        </div>
      </div>
    </header>
  );
}

// Footer
function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container-wide">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="index.html" className="brand-mark">
              <img src="assets/otel-logo.png" alt="" />
              <span>Otel</span>
            </a>
            <p>A small collection of editorially-led hotels in coastal, mountain, and metropolitan destinations. Booked direct, run with care.</p>
          </div>
          <div className="footer-col">
            <h5>Discover</h5>
            <ul>
              <li><a href="rooms.html">Rooms</a></li>
              <li><a href="rooms.html">Properties</a></li>
              <li><a href="#">Special offers</a></li>
              <li><a href="#">Gift cards</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Stay</h5>
            <ul>
              <li><a href="#">Concierge</a></li>
              <li><a href="#">Dining</a></li>
              <li><a href="#">Spa &amp; wellness</a></li>
              <li><a href="#">Events</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="blog.html">Journal</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>
          <div className="footer-col newsletter">
            <h5>Field Notes</h5>
            <p style={{fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 16, lineHeight: 1.6}}>Letters from our concierge — quiet seasons, new openings, the occasional recipe.</p>
            <input type="email" placeholder="Your email" />
            <button>Subscribe →</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Otel Hotels. Crafted in transit.</span>
          <div className="socials">
            <a href="#" aria-label="Facebook">{ICONS.facebook}</a>
            <a href="#" aria-label="Instagram">{ICONS.instagram}</a>
            <a href="#" aria-label="Twitter">{ICONS.twitter}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Booking summary (cart) — uses localStorage
const CART_KEY = "otel-cart-v1";
function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}
function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("otel-cart-changed"));
}
function useCart() {
  const [items, setItems] = React.useState(readCart());
  React.useEffect(() => {
    const handler = () => setItems(readCart());
    window.addEventListener("otel-cart-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("otel-cart-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return [items, (next) => writeCart(next)];
}
function addToCart(item) {
  const items = readCart();
  // merge by id — bump nights if exists
  const existing = items.find(i => i.id === item.id);
  if (existing) { existing.nights = (existing.nights || 1) + 1; }
  else { items.push({ ...item, nights: item.nights || 1 }); }
  writeCart(items);
  showToast(`Added ${item.title} to your reservation`);
}
function showToast(msg) {
  let t = document.querySelector(".otel-toast-host");
  if (!t) {
    t = document.createElement("div");
    t.className = "otel-toast-host";
    document.body.appendChild(t);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="check">✓</span><span></span>`;
  el.querySelector("span:last-child").textContent = msg;
  t.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 320); }, 2400);
}

function BookingSummary() {
  const [items, setItems] = useCart();
  const [open, setOpen] = React.useState(false);
  const total = items.reduce((s, i) => s + i.price * (i.nights || 1), 0);

  // open automatically when item added
  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("otel-cart-changed", handler);
    return () => window.removeEventListener("otel-cart-changed", handler);
  }, []);

  if (items.length === 0 && !open) return null;

  return (
    <>
      <button
        className={`booking-summary-toggle ${open ? "hidden" : ""}`}
        onClick={() => setOpen(true)}
      >
        Reservation
        <span className="count">{items.length}</span>
      </button>
      <aside className={`booking-summary ${open ? "open" : ""}`}>
        <div className="summary-head">
          <h4>Your Reservation</h4>
          <button className="close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>
        <div className="summary-body">
          {items.length === 0 ? (
            <div className="summary-empty">No rooms reserved yet. Browse our collection to start.</div>
          ) : items.map((item, i) => (
            <div className="summary-item" key={item.id + i}>
              <img src={item.image} alt="" />
              <div>
                <div className="name">{item.title}</div>
                <div className="meta">{item.nights} night{item.nights > 1 ? "s" : ""} · {item.location}</div>
                <button className="remove" onClick={() => setItems(items.filter((_, j) => j !== i))}>Remove</button>
              </div>
              <div className="price">${item.price * (item.nights || 1)}</div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="summary-foot">
            <div className="total">
              <span className="lab">Total</span>
              <span className="amount">${total}</span>
            </div>
            <button>Proceed To Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}

window.OtelIcons = ICONS;
window.OtelStars = Stars;
window.OtelHeader = Header;
window.OtelFooter = Footer;
window.OtelBookingSummary = BookingSummary;
window.otelAddToCart = addToCart;
window.otelUseReveal = useReveal;
