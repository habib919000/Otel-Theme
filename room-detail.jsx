// Room detail page

const { ROOMS } = window.OtelData;
const ICONS = window.OtelIcons;

function RoomDetailPage() {
  window.otelUseReveal();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || ROOMS[0].id;
  const room = ROOMS.find(r => r.id === id) || ROOMS[0];

  const [tab, setTab] = React.useState("overview");
  const [activeImg, setActiveImg] = React.useState(0);
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guests, setGuests] = React.useState(2);
  const [nights, setNights] = React.useState(3);

  React.useEffect(() => {
    if (checkIn && checkOut) {
      const ms = new Date(checkOut) - new Date(checkIn);
      const n = Math.max(1, Math.round(ms / 86400000));
      if (!isNaN(n)) setNights(n);
    }
  }, [checkIn, checkOut]);

  const subtotal = room.price * nights;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  const reserve = () => {
    window.otelAddToCart({ id: room.id, title: room.title, location: room.location, image: room.image, price: room.price, nights });
  };

  const amenIcons = {
    wifi: { icon: ICONS.wifi, label: "Resilient Wi-Fi" },
    pool: { icon: ICONS.pool, label: "Pool access" },
    spa: { icon: ICONS.spa, label: "Spa & wellness" },
    dining: { icon: ICONS.dining, label: "In-room dining" },
    gym: { icon: ICONS.gym, label: "Daily movement" },
    concierge: { icon: ICONS.concierge, label: "Concierge" },
    parking: { icon: ICONS.parking, label: "Valet parking" },
  };

  return (
    <div data-screen-label={`03 Room — ${room.title}`}>
      <window.OtelHeader active="rooms" />
      <div className="container-wide">
        <div className="room-hero">
          <div className="main"><img src={room.gallery[activeImg]} alt="" /></div>
          {room.gallery.slice(0, 4).filter((_, i) => i !== activeImg).slice(0, 2).map((src, i) => {
            const realIdx = room.gallery.findIndex(x => x === src);
            return (
              <div className="side" key={i} style={{cursor: "pointer"}} onClick={() => setActiveImg(realIdx)}>
                <img src={src} alt="" />
              </div>
            );
          })}
        </div>
      </div>

      <section className="container-wide">
        <div className="room-detail-layout">
          <div className="room-detail-main">
            <div className="reveal">
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap"}}>
                <div>
                  <h1 className="display-l" style={{marginBottom: 12}}>{room.title}</h1>
                  <div style={{display: "flex", gap: 18, alignItems: "center", color: "var(--fg-2)", fontSize: 14}}>
                    <window.OtelStars n={room.rating} />
                    <span>·</span>
                    <span>{room.location}</span>
                  </div>
                </div>
                <div style={{display: "flex", gap: 20, fontSize: 13, color: "var(--fg-3)", letterSpacing: "0.06em", textTransform: "uppercase", flexWrap: "wrap"}}>
                  <div><strong style={{color: "var(--fg-1)", fontFamily: "var(--font-display)", fontSize: 18, display: "block", marginBottom: 2}}>{room.people}</strong>Guests</div>
                  <div><strong style={{color: "var(--fg-1)", fontFamily: "var(--font-display)", fontSize: 18, display: "block", marginBottom: 2}}>{room.bed}</strong>Bed</div>
                  <div><strong style={{color: "var(--fg-1)", fontFamily: "var(--font-display)", fontSize: 18, display: "block", marginBottom: 2}}>{room.area}m²</strong>Area</div>
                </div>
              </div>
            </div>

            <div className="room-tabs reveal">
              <button className={`room-tab ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>Overview</button>
              <button className={`room-tab ${tab === "amenities" ? "active" : ""}`} onClick={() => setTab("amenities")}>Amenities</button>
              <button className={`room-tab ${tab === "reviews" ? "active" : ""}`} onClick={() => setTab("reviews")}>Reviews</button>
              <button className={`room-tab ${tab === "policies" ? "active" : ""}`} onClick={() => setTab("policies")}>Policies</button>
            </div>

            <div className="tab-content reveal">
              {tab === "overview" && (
                <div>
                  <p>{room.description}</p>
                  <p style={{marginTop: 16}}>The room has been recently refreshed with new linens, restored woodwork, and a discreet sound system. Daily housekeeping included; turndown service on request.</p>
                  <div style={{marginTop: 24, padding: 24, background: "var(--bg-tinted)", borderRadius: 6, fontSize: 14, lineHeight: 1.6}}>
                    <strong style={{color: "var(--fg-1)", fontFamily: "var(--font-display)"}}>A note from our concierge —</strong><br/>
                    Mornings are quieter than evenings here. If you're sensitive to sound, we'd suggest the rooms above the second floor. Ask for "the corner room" at check-in.
                  </div>
                </div>
              )}
              {tab === "amenities" && (
                <div>
                  <p>The room includes:</p>
                  <div className="amen-grid">
                    {room.amenities.map(k => amenIcons[k] && (
                      <div key={k}>{amenIcons[k].icon}{amenIcons[k].label}</div>
                    ))}
                    <div>{ICONS.check}Air conditioning</div>
                    <div>{ICONS.check}Minibar (curated)</div>
                    <div>{ICONS.check}Daily housekeeping</div>
                    <div>{ICONS.check}Cotton bathrobes</div>
                    <div>{ICONS.check}Reading library</div>
                    <div>{ICONS.check}Welcome amenity</div>
                  </div>
                </div>
              )}
              {tab === "reviews" && (
                <div>
                  <div style={{display: "flex", gap: 32, alignItems: "baseline", marginBottom: 16}}>
                    <div>
                      <div style={{fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: "var(--fg-1)"}}>4.9</div>
                      <div style={{fontSize: 12, color: "var(--fg-3)", letterSpacing: "0.12em", textTransform: "uppercase"}}>From 142 reviews</div>
                    </div>
                    <div style={{flex: 1}}>
                      {[
                        {l: "Cleanliness", v: 5.0},
                        {l: "Comfort", v: 4.9},
                        {l: "Location", v: 4.8},
                        {l: "Service", v: 5.0},
                      ].map(s => (
                        <div key={s.l} style={{display: "grid", gridTemplateColumns: "100px 1fr 30px", gap: 12, alignItems: "center", marginBottom: 6, fontSize: 13}}>
                          <span style={{color: "var(--fg-2)"}}>{s.l}</span>
                          <div style={{height: 4, background: "var(--neutral-200)", borderRadius: 2, position: "relative"}}>
                            <div style={{position: "absolute", inset: 0, width: `${s.v / 5 * 100}%`, background: "var(--fg-1)", borderRadius: 2}} />
                          </div>
                          <span style={{color: "var(--fg-1)", fontFamily: "var(--font-display)", fontWeight: 700}}>{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="review-list">
                    <div className="review">
                      <img src="assets/avatar-1.png" alt="" />
                      <div>
                        <div className="head"><span className="name">Alex Dobson</span><span className="date">02 Apr 2026</span></div>
                        <div className="rating">★★★★★</div>
                        <p>Stayed five nights and didn't want to leave. The terrace at sunset is worth the trip alone — and the staff are the kind that remember small things on day three.</p>
                      </div>
                    </div>
                    <div className="review">
                      <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" alt="" />
                      <div>
                        <div className="head"><span className="name">Sara Lindholm</span><span className="date">14 Mar 2026</span></div>
                        <div className="rating">★★★★★</div>
                        <p>The room is just as the photos suggest — perhaps quieter. We particularly liked the breakfast on the terrace and the recommended walks the concierge mapped out.</p>
                      </div>
                    </div>
                    <div className="review">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" alt="" />
                      <div>
                        <div className="head"><span className="name">Marcus Wei</span><span className="date">28 Feb 2026</span></div>
                        <div className="rating">★★★★☆</div>
                        <p>An excellent stay overall. The bed was as good as anything we've slept in. Slightly slow to-room dining one evening, but otherwise nothing to fault.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {tab === "policies" && (
                <div>
                  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32}}>
                    <div>
                      <h4 style={{marginBottom: 8, fontSize: 18}}>Check In / Out</h4>
                      <p style={{fontSize: 14}}>Check-in from 3:00 pm. Check-out by 12:00 pm. Early arrival or late departure on request, complimentary when available.</p>
                    </div>
                    <div>
                      <h4 style={{marginBottom: 8, fontSize: 18}}>Cancellation</h4>
                      <p style={{fontSize: 14}}>Free cancellation up to 7 days before arrival. Within 7 days, the first night is non-refundable.</p>
                    </div>
                    <div>
                      <h4 style={{marginBottom: 8, fontSize: 18}}>Children</h4>
                      <p style={{fontSize: 14}}>Children of all ages are welcome. Cots and extra beds available on request, no charge for under-twos.</p>
                    </div>
                    <div>
                      <h4 style={{marginBottom: 8, fontSize: 18}}>Pets</h4>
                      <p style={{fontSize: 14}}>Well-mannered dogs welcome at Verde and Maris. We provide a bed and a bowl. Please tell us at booking.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside>
            <div className="booking-card">
              <div className="price-line">
                <span className="num">${room.price}</span>
                <span className="per"> / night</span>
              </div>
              <div className="booking-row">
                <div className="booking-field">
                  <label>Check In</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                </div>
                <div className="booking-field">
                  <label>Check Out</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                </div>
              </div>
              <div className="booking-field">
                <label>Guests</label>
                <select value={guests} onChange={e => setGuests(+e.target.value)}>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} guest{n>1?"s":""}</option>)}
                </select>
              </div>
              <div className="booking-summary-rows">
                <div className="row"><span>${room.price} × {nights} nights</span><span>${subtotal}</span></div>
                <div className="row"><span>Taxes &amp; fees (12%)</span><span>${tax}</span></div>
                <div className="row total"><span>Total</span><span>${total}</span></div>
              </div>
              <button className="reserve-btn" onClick={reserve}>Reserve Now</button>
              <p style={{fontSize: 12, color: "var(--fg-3)", textAlign: "center", margin: 0}}>You won't be charged yet</p>
            </div>
          </aside>
        </div>
      </section>

      <window.OtelFooter />
      <window.OtelBookingSummary />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<RoomDetailPage />);
