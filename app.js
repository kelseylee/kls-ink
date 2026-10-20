  // Four-pointed star path centred on 0,0 with radius r.
  const star = (r) => { const k = r * .16;
    return `M0 ${-r}L${k} ${-k}L${r} 0L${k} ${k}L0 ${r}L${-k} ${k}L${-r} 0L${-k} ${-k}Z`; };
  const NS = "http://www.w3.org/2000/svg";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tw = (n, o) => { n.setAttribute("class", "twinkle"); n.style.setProperty("--o", o); n.style.setProperty("--d", (2.5 + rnd()*5).toFixed(1) + "s"); n.style.setProperty("--dl", (-rnd()*6).toFixed(1) + "s"); };

  // Stars drawn like real ones: a hot soft core, a faint halo, and thin diffraction spikes on the brightest.
  const gdefs = document.getElementById("gdefs"), gradIds = {};
  const gradFor = tint => gradIds[tint] || (gradIds[tint] = (() => {
    const id = "sg" + Object.keys(gradIds).length, g = document.createElementNS(NS, "radialGradient"); g.setAttribute("id", id);
    [[0, .5], [.2, .24], [.55, .07], [1, 0]].forEach(([o, a]) => { const s = document.createElementNS(NS, "stop"); s.setAttribute("offset", o); s.setAttribute("stop-color", tint); s.setAttribute("stop-opacity", a); g.appendChild(s); });
    gdefs.appendChild(g); return id; })());
  function buildStar(m, tint, tilt) {
    const g = document.createElementNS(NS, "g"), mk = (tag, a) => { const e = document.createElementNS(NS, tag); Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v)); g.appendChild(e); return e; };
    g.setAttribute("class", "star");
    mk("circle", { class: "glow", r: (4.5 + 17 * m).toFixed(1), fill: `url(#${gradFor(tint)})` });
    if (m > .4) { const L = 4 + 20 * m, k = L * (.035 + .03 * m);              // slim, concave four-point star with tapering arms
      mk("path", { d: `M0 ${-L}C${k} ${-k} ${k} ${-k} ${L} 0C${k} ${k} ${k} ${k} 0 ${L}C${-k} ${k} ${-k} ${k} ${-L} 0C${-k} ${-k} ${-k} ${-k} 0 ${-L}Z`, fill: tint, opacity: .85, transform: `rotate(${tilt.toFixed(1)})` }); }
    mk("circle", { r: ((.9 + 2.6 * m) * 1.8).toFixed(2), fill: "url(#sg-core)" });
    return g;
  }

  // Constellation geometry, taken from the brand book artwork. Stars are neurons, lines are axons.
  const GRAPH = {"nodes":[["s",722.1,202.0,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 -0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 -0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["s",647.3,202.0,11.9,0,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 -0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 -0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["s",632.1,269.2,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["s",638.1,288.1,11.9,0,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["s",721.5,168.4,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["s",715.3,243.4,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["s",713.1,478.9,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["d",703.1,465.9,3.3],["d",680.9,430.7,3.3],["d",644.1,432.3,3.3],["d",630.0,452.9,3.3],["d",634.8,482.1,3.3],["d",660.9,498.4,3.3],["s",680.9,490.8,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["s",713.1,356.4,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["d",730.1,495.7,3.3],["d",757.6,499.5,3.3],["s",647.3,355.9,11.9,0,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["s",632.1,168.4,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["s",757.6,272.4,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["d",687.9,250.2,3.3],["d",632.7,335.3,3.3],["s",632.7,393.8,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["d",634.3,371.0,3.3],["s",632.7,236.1,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["d",719.4,309.8,3.3],["s",793.1,202.0,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 -0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 -0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["s",867.9,202.0,11.9,0,"M-0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 -0.00C1.90 1.90 1.90 1.90 -0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 -0.00C-1.90 -1.90 -1.90 -1.90 -0.00 -11.92Z"],["s",883.0,269.2,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["s",877.1,288.1,11.9,0,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["s",793.6,168.4,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["s",799.8,243.4,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["s",802.0,478.9,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["d",812.0,465.9,3.3],["d",834.3,430.7,3.3],["d",871.1,432.3,3.3],["d",885.2,452.9,3.3],["d",880.3,482.1,3.3],["d",854.3,498.4,3.3],["s",834.3,490.8,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["s",802.0,356.4,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"],["d",785.1,495.7,3.3],["s",867.9,355.9,11.9,0,"M-0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 -0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 -0.00 -11.92Z"],["s",883.0,168.4,7.6,0,"M0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 0.00 -7.59Z"],["d",827.2,250.2,3.3],["d",882.5,335.3,3.3],["s",882.5,393.8,7.6,0,"M-0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 -0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 -0.00 -7.59Z"],["d",880.9,371.0,3.3],["s",882.5,236.1,7.6,0,"M-0.00 -7.59C1.19 -1.19 1.19 -1.19 7.59 0.00C1.19 1.19 1.19 1.19 -0.00 7.59C-1.19 1.19 -1.19 1.19 -7.59 0.00C-1.19 -1.19 -1.19 -1.19 -0.00 -7.59Z"],["d",795.8,309.8,3.3],["s",757.6,417.6,11.9,1,"M0.00 -11.92C1.90 -1.90 1.90 -1.90 11.92 0.00C1.90 1.90 1.90 1.90 0.00 11.92C-1.90 1.90 -1.90 1.90 -11.92 0.00C-1.90 -1.90 -1.90 -1.90 0.00 -11.92Z"]],"edges":[[0,1],[0,4],[0,5],[1,18],[1,24],[2,3],[3,20],[3,21],[5,19],[5,20],[6,7],[6,15],[6,50],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[14,17],[14,25],[14,40],[14,50],[15,16],[16,41],[17,21],[17,23],[19,25],[19,31],[19,49],[22,23],[26,27],[26,30],[26,31],[27,43],[27,48],[28,29],[29,44],[29,45],[31,44],[32,33],[32,41],[32,50],[33,34],[34,35],[35,36],[36,37],[37,38],[38,39],[40,42],[40,49],[40,50],[42,45],[42,47],[46,47]]};
  const gA = document.getElementById("axons"), gD = document.getElementById("dots"), gH = document.getElementById("halos"),
        gS = document.getElementById("stars"), gP = document.getElementById("pulses");
  const el = {}, adj = {}, edgePath = {}, pos = {}, proj = {}, p3 = {}, sf = {}, vary = {}, wraps = {}, edgeList = [];
  let vs = 29; const vr = () => (vs = (vs * 16807) % 2147483647) / 2147483647;
  let zs = 5; const zr = () => (zs = (zs * 16807) % 2147483647) / 2147483647;   // seeded, so the depths are the same every load
  const SMALL = GRAPH.nodes.find(n => n[0] === "s" && n[3] < 10)[5];     // the small-star shape, reused for every dot
  GRAPH.nodes.forEach(([t, x, y, r, rose, d], id) => {
    if (t === "d") { d = SMALL; r = 4.2; rose = 0; sf[id] = .55; }
    pos[id] = [x, y, r]; proj[id] = [x, y, r]; adj[id] = [];
    // Depth by role, with a little symmetric jitter so the logo's mirror symmetry still reads: big stars forward, dots behind.
    const jit = (((Math.round(Math.abs(x - 757.5) / 3) * 7919 + Math.round(y / 3) * 104729) % 1000) / 1000 * 2 - 1) * 7;
    // Each star gets its own brightness (magnitude), tint and spike tilt: a few bright, most faint.
    const m = t === "d" ? (.14 + vr() * .26) : r > 10 ? .62 + vr() * .38 : .32 + vr() * .34;
    const tint = rose ? ["#CE9393", "#D9A3A0", "#E0B3AC"][Math.floor(vr() * 3)] : ["#FFFFFF", "#EAF0FA", "#DCE6F5", "#F7EEE2"][Math.floor(vr() * 4)];
    vary[id] = { b: .72 + vr() * .28, rot: 0, s: 1, e: 0 };
    p3[id] = [x, y, Math.round((t === "d" ? -22 : r > 10 ? (rose ? 8 : 24) : (rose ? 2 : -12)) + jit)];
    el[id] = {};
    const wrap = document.createElementNS(NS, "g"), star = buildStar(m, tint, (vr() - .5) * 24);
    if (!reduce) { wrap.setAttribute("class", "twinkle"); wrap.style.setProperty("--d", (3 + Math.random()*4).toFixed(1) + "s"); wrap.style.setProperty("--dl", (-Math.random()*6).toFixed(1) + "s"); wrap.style.setProperty("--o", "1"); }
    wrap.appendChild(star); gS.appendChild(wrap); el[id].star = star; wraps[id] = wrap;
  });
  GRAPH.edges.forEach(([a, b]) => {
    const path = document.createElementNS(NS, "path");
    gA.appendChild(path); edgeList.push([a, b, path]);
    adj[a].push(b); adj[b].push(a); edgePath[a + ">" + b] = [path, false]; edgePath[b + ">" + a] = [path, true];
  });
  const N = new Proxy({}, { get: (_, id) => proj[id] });

  const sulci = [];
  // Brain underlay: a top-down hemisphere outline with meandering sulci, tone on tone.
  (function brain() {
    let s = 11; const rn = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const cx = 757.5, cy = 333, A = 152, B = 192, f1 = v => v.toFixed(1);
    const outline = [];
    for (let i = 0; i < 120; i++) {
      const t = i / 120 * Math.PI * 2, bump = 1 + .018 * Math.sin(t * 9 + 1) + .012 * Math.sin(t * 15 + 2);
      const w = 1 + .1 * Math.sin(t);                                   // narrower toward the frontal pole (top)
      outline.push([cx + Math.cos(t) * A * w * bump * (1 - .06 * Math.pow(Math.sin(t), 8)), cy + Math.sin(t) * B * bump]);
    }
    const poly = pts => pts.map((p, i) => (i ? "L" : "M") + f1(p[0]) + " " + f1(p[1])).join("") + "Z";
    const smoothOpen = pts => pts.map((p, i) => {
      if (!i) return `M${f1(p[0])} ${f1(p[1])}`;
      const a = pts[i-2] || pts[i-1], b = pts[i-1], c = p, d = pts[i+1] || c;
      return `C${f1(b[0] + (c[0]-a[0])/6)} ${f1(b[1] + (c[1]-a[1])/6)} ${f1(c[0] - (d[0]-b[0])/6)} ${f1(c[1] - (d[1]-b[1])/6)} ${f1(c[0])} ${f1(c[1])}`;
    }).join("");
    const g = document.getElementById("brain"), mk = (d, cls) => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("class", cls); g.appendChild(p); return p; };
    document.getElementById("brainclipPath").setAttribute("d", poly(outline));
    mk(poly(outline), "brain-fill");
    const inner = document.createElementNS(NS, "g"); inner.setAttribute("clip-path", "url(#brainclip)"); g.appendChild(inner);
    const add = pts => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", smoothOpen(pts)); p.setAttribute("class", "sulcus"); inner.appendChild(p); sulci.push(p); };
    // longitudinal fissure
    add(Array.from({length: 14}, (_, i) => [cx + Math.sin(i * 1.3) * 3, cy - B - 4 + i * (2 * B + 8) / 13]));
    // sulci: wander in from each side, never joining, never branching
    for (const side of [-1, 1]) {
      for (let k = 0; k < 15; k++) {
        const y0 = cy - B + 14 + k * (2 * B - 28) / 14 + (rn() - .5) * 8;
        const reach = 34 + rn() * 70, phase = rn() * 6.28, amp = 7 + rn() * 9, drift = (rn() - .5) * 30;
        const pts = Array.from({length: 9}, (_, i) => { const u = i / 8, x = cx + side * (A * 1.05 - u * reach - 4);
          return [x, y0 + drift * u + Math.sin(phase + u * 5.5) * amp * (.4 + u)]; });
        add(pts);
        if (rn() < .55) {   // a second, shorter fold deeper in the hemisphere
          const y1 = y0 + 12 + rn() * 8, r2 = 22 + rn() * 30, ph = rn() * 6.28;
          add(Array.from({length: 6}, (_, i) => { const u = i / 5; return [cx + side * (22 + r2 * (1 - u) + 20), y1 + Math.sin(ph + u * 4) * 8]; }));
        }
      }
    }
    mk(poly(outline), "brain-edge");
    sulci.forEach(p => { const b = p.getBBox(); p.dataset.cx = b.x + b.width / 2; p.dataset.cy = b.y + b.height / 2; });
  })();

  const lastFired = {};
  const retrigger = (node, cls) => { node.classList.remove(cls); void node.getBoundingClientRect(); node.classList.add(cls); };

  function fire(id, depth = 0) {
    const now = performance.now();
    if (now - (lastFired[id] || -1e9) < 1400) return;          // refractory period
    lastFired[id] = now;
    if (el[id]) {
      retrigger(el[id].star, "fire"); 
      const [x,y,r] = N[id], rip = document.createElementNS(NS, "circle");
      rip.setAttribute("class", "ripple"); rip.setAttribute("cx", x); rip.setAttribute("cy", y); rip.setAttribute("r", r);
      const anim = (attr, from, to) => { const a = document.createElementNS(NS, "animate"); a.setAttribute("attributeName", attr); a.setAttribute("from", from); a.setAttribute("to", to); a.setAttribute("dur", "1.1s"); a.setAttribute("fill", "freeze"); return a; };
      rip.appendChild(anim("r", r, r + 26)); rip.appendChild(anim("opacity", ".55", "0"));
      gP.appendChild(rip); setTimeout(() => rip.remove(), 1200);
    }
    if (el[id]) {            // the brain beneath lights up around the firing star, rippling outward
      const [x, y] = N[id];
      sulci.forEach(p => { const d = Math.hypot(p.dataset.cx - x, p.dataset.cy - y);
        if (d < 80) { p.style.animationDelay = Math.round(d * 7) + "ms"; retrigger(p, "lit"); } });
    }
    if (depth > 4) return;
    adj[id].forEach(nb => { if (Math.random() < (depth === 0 ? .9 : .6)) send(id, nb, depth); });
  }

  function send(from, to, depth) {
    const [path, rev] = edgePath[from + ">" + to], len = path.getTotalLength(), dur = 380 + len * 3.2;
    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("r", 2.6); dot.setAttribute("fill", "#CE9393");
    gP.appendChild(dot);
    const t0 = performance.now();
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur), e = k * k * (3 - 2 * k), pt = path.getPointAtLength(len * (rev ? 1 - e : e));
      dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y); dot.setAttribute("opacity", 1 - .5 * k);
      if (k < 1) return requestAnimationFrame(step);
      dot.remove(); fire(to, depth + 1);
    })(t0);
  }

  if (!reduce) {
    const ids = Object.keys(el);
    const spark = () => { setTimeout(spark, 1200 + Math.random() * 2200); fire(ids[Math.floor(Math.random() * ids.length)]); };
    setTimeout(spark, 900);
  }

  // Depth: turn the constellation a little with the pointer so the stars separate in space (perspective, parallax, haze).
  const FOCAL = 700, brainG = document.getElementById("brain"), lineG = document.getElementById("axons");
  let yaw = 0, pitch = 0, frozen = false;
  const f1 = v => v.toFixed(1);
  function render() {
    const cy_ = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), CXc = 757.5, CYc = 333;
    GRAPH.nodes.forEach(([t, , , r], id) => {
      const x = p3[id][0] - CXc, y = p3[id][1] - CYc, z = p3[id][2];
      const x1 = x * cy_ + z * sy, z1 = -x * sy + z * cy_, y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, k = FOCAL / (FOCAL - z2);
      let px = CXc + x1 * k, py = CYc + y1 * k; const haze = Math.max(.6, Math.min(1, .8 + z2 / 300));
      const kk = k;
      proj[id] = [px, py, (t === "d" ? 4.2 : r) * kk];
      wraps[id].setAttribute("transform", `translate(${f1(px)} ${f1(py)}) scale(${kk.toFixed(3)})`);
      el[id].star.style.opacity = (haze * vary[id].b).toFixed(2);
    });
    edgeList.forEach(([a, b, path]) => { path.setAttribute("d", `M${f1(proj[a][0])} ${f1(proj[a][1])}L${f1(proj[b][0])} ${f1(proj[b][1])}`);
      path.style.opacity = Math.max(.3, Math.min(.8, .58 + (p3[a][2] + p3[b][2]) / 520)).toFixed(2); });
    brainG.setAttribute("transform", `translate(${f1(-120 * sy * .5)} ${f1(120 * sp * .5)})`);   // the brain sits furthest back
  }
  (function spin() {
    let tx = 0, ty = 0;
    if (reduce) { yaw = .14; pitch = -.07; render(); return; }
    addEventListener("pointermove", e => { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; });
    document.addEventListener("pointerleave", () => { tx = ty = 0; });
    (function loop(t) {
      if (!frozen) {
      yaw += (tx * .17 + Math.sin(t / 3400) * .07 - yaw) * .06;
      pitch += (-ty * .11 + Math.sin(t / 4300 + 1) * .045 - pitch) * .06;
      }
      render(); requestAnimationFrame(loop);
    })(0);
  })();

  // Background sky: seeded so it's stable between loads
  const sky = document.getElementById("sky");
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const W = 1600, H = 1000; sky.setAttribute("viewBox", `0 0 ${W} ${H}`); sky.setAttribute("preserveAspectRatio", "xMidYMid slice");
  const layers = [10, 22, 40].map(depth => { const g = document.createElementNS(NS, "g"); g.dataset.depth = depth; sky.appendChild(g); return g; });
  const span = (n, v) => (rnd()*1.12 - .06) * n;           // overscan so parallax never shows an edge
  for (let i = 0; i < 480; i++) {
    const c = document.createElementNS(NS, "circle"), r = .3 + Math.pow(rnd(), 2.4) * 1.5;
    c.setAttribute("cx", span(W)); c.setAttribute("cy", span(H));
    c.setAttribute("r", r.toFixed(2));
    const o = (rnd()*.5 + .2).toFixed(2); c.setAttribute("fill", "#F6F3EE"); c.setAttribute("opacity", o); if (!reduce) tw(c, o);
    layers[r < .7 ? 0 : r < 1.1 ? 1 : 2].appendChild(c);
  }
  for (let i = 0; i < 24; i++) {                                         // brighter sky stars: soft glow, a few with spikes
    const m = Math.pow(rnd(), 1.7) * .75 + .05, rose = i % 6 === 0, tilt = (rnd() - .5) * 24;
    const tint = rose ? "#E0B3AC" : ["#FFFFFF", "#EAF0FA", "#DCE6F5", "#F7EEE2"][i % 4];
    const g = buildStar(m, tint, tilt); g.setAttribute("transform", `translate(${span(W)} ${span(H)}) scale(.7)`);
    const o = (.55 + rnd() * .45).toFixed(2); if (!reduce) tw(g, o); else g.setAttribute("opacity", o);
    layers[m < .3 ? 1 : 2].appendChild(g);
  }

  // Telescope: the sky drifts at three depths and the optics split colour toward the edge of view.
  if (!reduce && matchMedia("(hover: hover)").matches) {
    const con = document.querySelector(".constellation");
    const sf = document.getElementById("ca-sky"), cf = document.getElementById("ca-con");
    const setCA = (f, x, y) => { f.querySelector(".ro").setAttribute("dx", x); f.querySelector(".ro").setAttribute("dy", y);
                                 f.querySelector(".bo").setAttribute("dx", -x); f.querySelector(".bo").setAttribute("dy", -y); };
    let tx = 0, ty = 0, cx = 0, cy = 0, px = 0, py = 0, vel = 0, live = false;
    addEventListener("pointermove", e => { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; live = true; start(); });
    document.addEventListener("pointerleave", () => { tx = ty = 0; });
    let running = false;
    function start() { if (!running) { running = true; requestAnimationFrame(frame); } }
    function frame() {
      cx += (tx - cx) * .07; cy += (ty - cy) * .07;
      vel += (Math.hypot(cx - px, cy - py) * 60 - vel) * .15; px = cx; py = cy;   // how fast the scope is swinging
      layers.forEach(g => g.setAttribute("transform", `translate(${-cx * g.dataset.depth} ${-cy * g.dataset.depth})`));
      const k = 1 + Math.min(vel, 4);                                  // aberration swells while moving
      setCA(sf, cx * 1.6 * k, cy * 1.6 * k);
      setCA(cf, cx * 1.2 * k, cy * 1.2 * k);
      if (Math.abs(tx - cx) + Math.abs(ty - cy) + vel > .002) requestAnimationFrame(frame); else running = false;
    }
    sky.style.filter = "url(#ca-sky)"; con.style.filter = "url(#ca-con)";
  }
