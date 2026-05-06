import React from 'react';

// Home page sections.

const { PROPERTIES, ROOMS, POSTS } = window.OtelData;

function Hero({ tweaks }) {
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [guests, setGuests] = React.useState(2);
  const [rooms, setRooms] = React.useState(1);

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    window.location.href = `rooms.html?${params.toString()}`;
  };

  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero-bg" style={{backgroundImage: `url(${tweaks.heroImage})`}} />
      <div className="hero-scrim" />
      <div className="hero-inner">
        <div className="hero-meta-row">
          <div>
            <div className="eyebrow-dot on-dark" style={{marginBottom: 28}}>A small collection · Six properties</div>
            <h1 className="hero-title">
              Slow stays,<br/>
              <span className="italic">honestly</span> made.
            </h1>
          </div>
          <div className="hero-meta">
            <div className="label">Now Open</div>
            <div className="body">A new wing at Otel Maris — opening this June with twelve cliffside suites and a saltwater pool carved into the limestone.</div>
            <a href="rooms.html" className="btn-link on-dark" style={{marginTop: 8}}>Discover Maris</a>
          </div>
        </div>
        <div className="hero-bottom-row">
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">06</div><div className="lab">Properties</div></div>
            <div className="hero-stat"><div className="num">14</div><div className="lab">Years</div></div>
            <div className="hero-stat"><div className="num">4.9</div><div className="lab">Guest Score</div></div>
          </div>
        </div>
      </div>
      <form className="search-bar" onSubmit={submit}>
        <div className="search-field">
          <label>Destination</label>
          <select value={destination} onChange={e => setDestination(e.target.value)}>
            <option value="">All Properties</option>
            {PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.city}, {p.country}</option>)}
          </select>
        </div>
        <div className="search-field">
          <label>Check In</label>
          <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} placeholder="Add date" />
        </div>
        <div className="search-field">
          <label>Check Out</label>
          <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} placeholder="Add date" />
        </div>
        <div className="search-field">
          <label>Guests</label>
          <select value={guests} onChange={e => setGuests(+e.target.value)}>
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} guest{n>1?"s":""}</option>)}
          </select>
        </div>
        <div className="search-field">
          <label>Rooms</label>
          <select value={rooms} onChange={e => setRooms(+e.target.value)}>
            {[1,2,3,4].map(n => <option key={n} value={n}>{n} room{n>1?"s":""}</option>)}
          </select>
        </div>
        <div className="search-cta-cell">
          <button className="search-cta" type="submit">
            Check Availability {window.OtelIcons.arrow}
          </button>
        </div>
      </form>
    </section>
  );
}

function Properties() {
  return (
    <section className="section tight">
      <div className="container-wide">
        <div className="property-strip reveal">
          {PROPERTIES.map(p => (
            <a className="property-cell" key={p.id} href={`property.html?id=${p.id}`}>
              <div className="city">Otel {p.id.charAt(0).toUpperCase() + p.id.slice(1)}</div>
              <div className="country">{p.city}, {p.country}</div>
              <div className="climate">
                <span className="climate-dot" style={{background: p.climateColor}} />
                {p.climate}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedRooms() {
  const featured = ROOMS.slice(0, 3);
  return (
    <section className="section" data-screen-label="Featured Rooms">
      <div className="container-wide">
        <div className="section-head reveal">
          <div className="left">
            <span className="section-num">01 / Rooms</span>
            <h2 className="display-l">The rooms,<br/><span className="serif-italic">considered.</span></h2>
          </div>
          <div className="right">
            Each room is selected by our editor for its character, light, and proximity to a story worth telling. View all sixty-four across our six properties.
            <div style={{marginTop: 24}}>
              <a href="rooms.html" className="btn-link">View All Rooms</a>
            </div>
          </div>
        </div>
        <div className="rooms-grid">
          {featured.map(r => <RoomCard key={r.id} room={r} />)}
        </div>
      </div>
    </section>
  );
}

function RoomCard({ room }) {
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.otelAddToCart({ id: room.id, title: room.title, location: room.location, image: room.image, price: room.price });
  };
  return (
    <a className="room-card reveal" href={`room-detail.html?id=${room.id}`}>
      <div className="img-wrap">
        <img src={room.image} alt={room.title} />
        {room.badge && <div className="badge">{room.badge}</div>}
        <div className="price-tag"><span className="num">${room.price}</span><span className="per">/ night</span></div>
      </div>
      <div className="meta">
        <span>{room.type} · {room.area}m²</span>
        <window.OtelStars n={room.rating} />
      </div>
      <h3>{room.title}</h3>
      <div className="room-feats">
        <span>{window.OtelIcons.user} {room.people} Guests</span>
        <span>{window.OtelIcons.bed} {room.bed}</span>
        <span>{window.OtelIcons.area} {room.area}m²</span>
      </div>
      <button className="btn-link" onClick={handleAdd} style={{marginTop: 4, alignSelf: "flex-start"}}>Add To Reservation</button>
    </a>
  );
}

function About() {
  return (
    <section className="section" data-screen-label="About">
      <div className="container-wide">
        <div className="about-split reveal">
          <div className="img"><img src="assets/about-room.jpg" alt="" /></div>
          <div className="copy">
            <span className="section-num">02 / Our Approach</span>
            <h2 className="display-l">Six houses,<br/><span className="serif-italic">one philosophy.</span></h2>
            <p className="lead">We don't run a chain. We run six small houses across coastal cliffs, alpine forests, walled medinas, and quiet city streets — each shaped to the place it sits in, never to a brand template.</p>
            <p style={{fontSize: 16, lineHeight: 1.7, color: "var(--fg-2)"}}>What links them: a long-serving local team, breakfast that takes its time, books on the shelves you'd actually read, and a concierge who has been there for a decade.</p>
            <div style={{display: "flex", gap: 16, marginTop: 8}}>
              <a href="rooms.html" className="btn btn-dark">Our Properties {window.OtelIcons.arrow}</a>
              <a href="blog.html" className="btn btn-ghost">Read The Journal</a>
            </div>
            <div className="stats">
              <div><div className="num">06</div><div className="lab">Destinations</div></div>
              <div><div className="num">14<span style={{fontSize: 18, color: "var(--fg-3)"}}>yrs</span></div><div className="lab">Hosting</div></div>
              <div><div className="num">340<span style={{fontSize: 18, color: "var(--fg-3)"}}>+</span></div><div className="lab">Team Members</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const AMENITY_LIST = [
  { icon: "wifi", title: "Resilient Wi-Fi", desc: "Fibre across every property — fast enough for a video call from a cabin." },
  { icon: "pool", title: "Pools & Hammams", desc: "Saltwater, copper, hinoki — each pool tuned to the climate it sits in." },
  { icon: "spa", title: "Quiet Spa Rituals", desc: "Locally-trained therapists, no piped-in flute music, treatments that end on time." },
  { icon: "dining", title: "Restaurants of Place", desc: "Six kitchens, six chefs — each cooking from within an hour's drive." },
  { icon: "gym", title: "Daily Movement", desc: "Open gyms, morning yoga on the deck, hiking and snorkelling kits at reception." },
  { icon: "concierge", title: "Long-Serving Concierge", desc: "Our concierge teams have been in place for an average of nine years." },
  { icon: "parking", title: "Valet & Transfers", desc: "Direct transfers from the nearest airport or station, in our own vehicles." },
  { icon: "check", title: "Direct Booking Promise", desc: "Best price guaranteed, complimentary upgrades when available, no fees." },
];

function Amenities() {
  return (
    <section className="section dark" data-screen-label="Amenities">
      <div className="container-wide">
        <div className="section-head reveal">
          <div className="left">
            <span className="section-num on-dark">03 / What's Included</span>
            <h2 className="display-l" style={{color: "white"}}>The small things,<br/><span className="serif-italic">done well.</span></h2>
          </div>
          <div className="right">A list of what every Otel guest can rely on, regardless of which property they stay at. We don't write everything down — but we wrote these.</div>
        </div>
        <div className="amenities reveal">
          {AMENITY_LIST.map((a, i) => (
            <div className="amenity" key={a.title}>
              <div className="amenity-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="amenity-icon">{window.OtelIcons[a.icon]}</div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const OFFERS = [
  { id: "maris-spring", num: "01", title: "Spring on the Riviera", desc: "Three nights at Otel Maris with a private boat afternoon.", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", nights: "3 Nights", from: "Apr — Jun", price: 1290, was: 1620 },
  { id: "verde-wellness", num: "02", title: "Forest Wellness Retreat", desc: "Five nights at Otel Verde — full board, daily spa, dawn hikes.", image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80", nights: "5 Nights", from: "Year-round", price: 2150, was: 2480 },
  { id: "haven-bloom", num: "03", title: "Sakura Week, Kyoto", desc: "Seven nights at Otel Haven during the cherry-blossom bloom.", image: "https://images.unsplash.com/photo-1545569310-d04c19a7e3e6?w=800&q=80", nights: "7 Nights", from: "Late March", price: 3340, was: 3860 },
  { id: "marina-reef", num: "04", title: "Reef Stay, Tulum", desc: "Four nights at Otel Marina with two guided reef snorkels.", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80", nights: "4 Nights", from: "Sep — Nov", price: 1980, was: 2240 },
];

function Offers() {
  return (
    <section className="section soft" data-screen-label="Offers">
      <div className="container-wide">
        <div className="section-head reveal">
          <div className="left">
            <span className="section-num">04 / Special Offers</span>
            <h2 className="display-l">Stays we have<br/><span className="serif-italic">put together.</span></h2>
          </div>
          <div className="right">Curated multi-night packages, with the small touches arranged in advance. Bookable directly with our reservations team or online.</div>
        </div>
        <div className="offers-list reveal">
          {OFFERS.map(o => (
            <div className="offer-row" key={o.id}>
              <div className="o-num">{o.num}</div>
              <div className="o-img"><img src={o.image} alt="" /></div>
              <div>
                <div className="o-title">{o.title}</div>
                <div className="o-desc">{o.desc}</div>
              </div>
              <div className="o-meta">
                <span><strong>{o.nights}</strong></span>
                <span>{o.from}</span>
              </div>
              <div className="o-price">
                <span className="strike">${o.was}</span>
                ${o.price}
              </div>
              <a href="rooms.html" className="btn-link">Book</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { quote: "We've stayed at Otel Verde three winters in a row. The cabin smells of cedar and woodsmoke, the spa is empty before nine, and the team remembers our coffee order.", name: "Camille & Marco Vasquez", where: "Brooklyn, NY", avatar: "assets/avatar-1.png" },
  { quote: "The Cap-Ferrat suite is the closest I've come to feeling like a guest in someone's home rather than a customer. We came for a weekend and stayed eleven days.", name: "Yuki Tanaka", where: "Berlin, DE", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { quote: "I've spent fifteen years writing about hotels for a living. Otel Haven is one of three I would actually go back to on my own time, with my own money.", name: "Edith Marlowe", where: "London, UK", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
];

function Testimonials() {
  const [i, setI] = React.useState(0);
  const t = TESTIMONIALS[i];
  return (
    <section className="section">
      <div className="container-wide">
        <div className="section-head reveal" style={{marginBottom: 32}}>
          <div className="left">
            <span className="section-num">05 / Guests</span>
            <h2 className="display-l">In their<br/><span className="serif-italic">own words.</span></h2>
          </div>
          <div className="right" />
        </div>
        <div className="testimonial reveal">
          <div className="photo"><img src={t.avatar.startsWith("http") ? t.avatar : t.avatar} alt="" /></div>
          <div>
            <blockquote>{t.quote}</blockquote>
            <cite>
              <span className="name">{t.name}</span>
              <span className="where">{t.where}</span>
            </cite>
            <div className="testimonial-nav">
              <button onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous">←</button>
              <button onClick={() => setI((i + 1) % TESTIMONIALS.length)} aria-label="Next">→</button>
              <div style={{marginLeft: 16, alignSelf: "center", fontSize: 13, color: "var(--fg-3)", letterSpacing: "0.08em"}}>
                {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const [active, setActive] = React.useState("maris");
  const p = PROPERTIES.find(x => x.id === active);
  return (
    <section className="section soft" style={{padding: 0}} data-screen-label="Map">
      <div className="map-section">
        <div className="map-info">
          <div style={{padding: "60px 0 40px"}}>
            <span className="section-num">06 / Where We Are</span>
            <h2 className="display-l" style={{margin: "16px 0 24px"}}>Six places,<br/><span className="serif-italic">six climates.</span></h2>
            <p className="lead" style={{marginBottom: 32}}>Hover the map to step between our properties. Each one shaped by its place — coastal, alpine, walled, tropical.</p>
          </div>
          <div className="item">
            <span className="lab">Property</span>
            <span className="val" style={{fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22}}>Otel {p.id[0].toUpperCase() + p.id.slice(1)}</span>
          </div>
          <div className="item">
            <span className="lab">Location</span>
            <span className="val">{p.city}, {p.country}</span>
          </div>
          <div className="item">
            <span className="lab">Climate</span>
            <span className="val">{p.climate} · {p.description}</span>
          </div>
          <div className="item" style={{borderBottom: "none", paddingTop: 24}}>
            <span className="lab" />
            <a href="rooms.html" className="btn btn-dark" style={{justifySelf: "start"}}>View Rooms {window.OtelIcons.arrow}</a>
          </div>
        </div>
        <div className="map-canvas">
          <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" style={{width: "100%", height: "100%"}}>
            <defs>
              <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.1"/>
              </pattern>
            </defs>
            <rect width="100" height="60" fill="#EEEAE3"/>
            <rect width="100" height="60" fill="url(#grid)"/>
            {/* Stylized continents */}
            <path d="M2 18 Q 8 14 14 16 L 22 12 L 30 14 L 36 10 L 44 14 L 48 18 L 42 22 L 34 24 L 28 22 L 20 26 L 14 24 L 8 22 Z" fill="#D9D2C3" opacity="0.85"/>
            <path d="M50 14 L 60 12 L 70 14 L 78 18 L 82 24 L 78 30 L 72 32 L 66 30 L 60 28 L 54 24 L 50 18 Z" fill="#D9D2C3" opacity="0.85"/>
            <path d="M82 32 L 92 36 L 96 44 L 90 50 L 82 48 L 78 42 L 80 36 Z" fill="#D9D2C3" opacity="0.85"/>
            <path d="M14 36 L 22 38 L 28 42 L 30 50 L 24 54 L 16 52 L 12 46 Z" fill="#D9D2C3" opacity="0.85"/>
            <path d="M62 36 L 70 38 L 72 44 L 68 48 L 62 46 L 60 42 Z" fill="#D9D2C3" opacity="0.85"/>
          </svg>
          {PROPERTIES.map(prop => (
            <div
              key={prop.id}
              className={`map-pin ${prop.id === active ? "active" : ""}`}
              style={{left: `${prop.lng}%`, top: `${prop.lat}%`}}
              onMouseEnter={() => setActive(prop.id)}
              onClick={() => window.location.href = `property.html?id=${prop.id}`}
            >
              <div className="pin-dot" />
              <div className="pin-label">Otel {prop.id[0].toUpperCase() + prop.id.slice(1)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.OtelHome = { Hero, Properties, FeaturedRooms, RoomCard, About, Amenities, Offers, Testimonials, MapSection };
