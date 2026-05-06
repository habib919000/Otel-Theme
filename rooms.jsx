// Rooms list page

const { ROOMS, PROPERTIES } = window.OtelData;

function RoomsListPage() {
  window.otelUseReveal();

  const params = new URLSearchParams(window.location.search);
  const initialDestination = params.get("destination") || "";

  const [destination, setDestination] = React.useState(initialDestination);
  const [types, setTypes] = React.useState([]);
  const [priceMax, setPriceMax] = React.useState(600);
  const [guests, setGuests] = React.useState(0);
  const [sort, setSort] = React.useState("recommended");
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    let list = [...ROOMS];
    if (destination) list = list.filter(r => r.property === destination);
    if (types.length) list = list.filter(r => types.includes(r.type));
    if (guests) list = list.filter(r => r.people >= guests);
    list = list.filter(r => r.price <= priceMax);
    if (search) list = list.filter(r => (r.title + " " + r.location).toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-asc") list.sort((a,b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a,b) => b.price - a.price);
    else if (sort === "rating") list.sort((a,b) => b.rating - a.rating);
    return list;
  }, [destination, types, priceMax, guests, sort, search]);

  const allTypes = Array.from(new Set(ROOMS.map(r => r.type)));
  const typeCounts = allTypes.map(t => ({ t, n: ROOMS.filter(r => r.type === t).length }));

  return (
    <div data-screen-label="02 Rooms">
      <window.OtelHeader active="rooms" />
      <section className="page-header">
        <div className="container-wide">
          <div style={{display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end"}}>
            <div>
              <span className="section-num">All Properties · 64 Rooms</span>
              <h1 className="display-l" style={{marginTop: 14}}>Rooms &amp;<br/><span className="serif-italic">Suites.</span></h1>
            </div>
            <p className="lead" style={{maxWidth: 420}}>Filter by property, type, capacity, or price. Each room is editor-selected and described in plain language.</p>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container-wide">
          <div className="rooms-layout">
            <aside className="filters reveal">
              <div className="filter-block">
                <h5>Search</h5>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Find a room..."
                  style={{width: "100%", padding: "10px 12px", border: "1px solid var(--border-soft)", borderRadius: 4, fontSize: 13, fontFamily: "var(--font-body)"}}
                />
              </div>
              <div className="filter-block">
                <h5>Property</h5>
                <div className="filter-options">
                  <label className="filter-option">
                    <input type="radio" checked={destination === ""} onChange={() => setDestination("")} name="dest" />
                    <span>All Properties</span>
                    <span className="count">{ROOMS.length}</span>
                  </label>
                  {PROPERTIES.map(p => (
                    <label className="filter-option" key={p.id}>
                      <input type="radio" checked={destination === p.id} onChange={() => setDestination(p.id)} name="dest" />
                      <span>{p.city}</span>
                      <span className="count">{ROOMS.filter(r => r.property === p.id).length}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="filter-block">
                <h5>Room Type</h5>
                <div className="filter-options">
                  {typeCounts.map(({t, n}) => (
                    <label className="filter-option" key={t}>
                      <input
                        type="checkbox"
                        checked={types.includes(t)}
                        onChange={(e) => setTypes(e.target.checked ? [...types, t] : types.filter(x => x !== t))}
                      />
                      <span>{t}</span>
                      <span className="count">{n}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="filter-block">
                <h5>Price Per Night</h5>
                <div className="price-range">
                  <input type="range" min="100" max="700" step="20" value={priceMax} onChange={e => setPriceMax(+e.target.value)} />
                  <div className="vals">
                    <span>$100</span>
                    <span>Up to <strong style={{color: "var(--fg-1)"}}>${priceMax}</strong></span>
                  </div>
                </div>
              </div>
              <div className="filter-block">
                <h5>Capacity</h5>
                <div className="filter-options">
                  {[0, 2, 3, 4].map(g => (
                    <label className="filter-option" key={g}>
                      <input type="radio" checked={guests === g} onChange={() => setGuests(g)} name="g" />
                      <span>{g === 0 ? "Any" : `${g}+ guests`}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <div className="rooms-results">
              <div className="rooms-toolbar">
                <div className="count"><strong style={{color: "var(--fg-1)"}}>{filtered.length}</strong> rooms match your filters</div>
                <div className="sort">
                  <span style={{color: "var(--fg-3)"}}>Sort by</span>
                  <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
              {filtered.length === 0 ? (
                <div style={{padding: "80px 0", textAlign: "center", color: "var(--fg-3)"}}>
                  <p style={{fontSize: 18}}>No rooms match — try adjusting filters.</p>
                  <button className="btn btn-ghost" style={{marginTop: 16}} onClick={() => { setDestination(""); setTypes([]); setPriceMax(700); setGuests(0); setSearch(""); }}>Reset Filters</button>
                </div>
              ) : (
                <div className="rooms-grid-list">
                  {filtered.map(r => <window.OtelHome.RoomCard key={r.id} room={r} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <window.OtelFooter />
      <window.OtelBookingSummary />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<RoomsListPage />);
