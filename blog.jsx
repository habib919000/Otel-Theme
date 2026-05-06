// Blog page

const { POSTS } = window.OtelData;

function BlogPage() {
  window.otelUseReveal();
  const featured = POSTS[0];
  const others = POSTS.slice(1, 3);
  const list = POSTS.slice(3);

  return (
    <div data-screen-label="04 Journal">
      <window.OtelHeader active="blog" />
      <section className="page-header">
        <div className="container-wide">
          <div style={{display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end"}}>
            <div>
              <span className="section-num">Field Notes · Travel Letters</span>
              <h1 className="display-l" style={{marginTop: 14}}>The Otel<br/><span className="serif-italic">Journal.</span></h1>
            </div>
            <form className="ph-newsletter" onSubmit={(e) => { e.preventDefault(); const i = e.target.querySelector("input"); if (i.value) { i.dataset.done = "1"; i.value = ""; i.placeholder = "✓ Subscribed — letters incoming"; } }}>
              <label>Subscribe to the Journal</label>
              <div className="ph-newsletter-row">
                <input type="email" placeholder="your@email.com" required />
                <button type="submit">Subscribe →</button>
              </div>
              <p className="ph-newsletter-fine">Quiet, monthly. Recipes, openings, off-season prices. Unsubscribe any time.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="blog-grid reveal">
            <a className="blog-card large" href={`blog-single.html?id=${featured.id}`}>
              <div className="img-wrap"><img src={featured.image} alt="" /></div>
              <div className="meta">
                <span className="cat">{featured.cat}</span>
                <span>{featured.date}</span>
                <span>{featured.readTime} min read</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <div className="btn-link" style={{marginTop: 8}}>Read</div>
            </a>
            {others.map(p => (
              <a className="blog-card" href={`blog-single.html?id=${p.id}`} key={p.id}>
                <div className="img-wrap"><img src={p.image} alt="" /></div>
                <div className="meta">
                  <span className="cat">{p.cat}</span>
                  <span>{p.date}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft tight">
        <div className="container-wide">
          <div className="section-head reveal">
            <div className="left">
              <span className="section-num">Recent</span>
              <h2 className="display-m">Other letters</h2>
            </div>
            <div className="right" />
          </div>
          <div className="blog-list-row reveal">
            {list.map(p => (
              <a className="blog-list-item" href={`blog-single.html?id=${p.id}`} key={p.id}>
                <img src={p.image} alt="" />
                <div>
                  <div style={{display: "flex", gap: 12, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", fontWeight: 700, marginBottom: 8}}>
                    <span style={{color: "var(--otel-logo-red)"}}>{p.cat}</span>
                    <span>{p.date}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p style={{fontSize: 14, color: "var(--fg-2)", margin: 0, maxWidth: "60ch"}}>{p.excerpt}</p>
                </div>
                <div className="btn-link">Read</div>
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

ReactDOM.createRoot(document.getElementById("root")).render(<BlogPage />);
