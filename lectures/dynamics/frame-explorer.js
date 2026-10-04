/* One throw, two Galilean frames. No animation: the reader controls time. */
(() => {
  "use strict";
  const root = document.getElementById("frame-explorer");
  if (!root) return;
  const speed = document.getElementById("frame-speed");
  const time = document.getElementById("frame-time");
  const g = 9.8, vx = 12, vy0 = 16, mass = 1;
  const duration = 2 * vy0 / g;
  const maxHeight = vy0 * vy0 / (2 * g);
  const svgNS = "http://www.w3.org/2000/svg";
  const fmt = (n) => (Math.abs(n) < .005 ? 0 : n).toFixed(2);
  const point = (x, y) => [130 + 3.5 * x, 220 - 10 * y];
  function element(name, attributes, text) {
    const node = document.createElementNS(svgNS, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function plot(id, u, t) {
    const svg = document.getElementById(id);
    svg.replaceChildren();
    svg.append(element("title", {}, u === 0 ? "Projectile in the ground frame" : `Projectile in a frame moving at ${u} metres per second`));
    svg.append(element("desc", {}, `At ${fmt(t)} seconds: horizontal position ${fmt((vx-u)*t)} metres; height ${fmt(vy0*t-g*t*t/2)} metres. Maximum height ${fmt(maxHeight)} metres.`));
    svg.append(element("line", {x1:30,y1:220,x2:430,y2:220,class:"axis"}));
    svg.append(element("line", {x1:130,y1:35,x2:130,y2:230,class:"axis"}));
    for (const x of [-20, 0, 20, 40, 60, 80]) {
      const [px] = point(x, 0);
      svg.append(element("line", {x1:px,y1:220,x2:px,y2:225,class:"axis"}));
      svg.append(element("text", {x:px,y:244,"text-anchor":"middle"}, x));
    }
    const [, peakY] = point(0, maxHeight);
    svg.append(element("line", {x1:30,y1:peakY,x2:430,y2:peakY,class:"height-guide"}));
    svg.append(element("text", {x:32,y:peakY-8}, `${fmt(maxHeight)} m`));
    svg.append(element("text", {x:425,y:267,"text-anchor":"end"}, "horizontal position (m)"));
    svg.append(element("text", {x:138,y:30}, "height"));
    const path = Array.from({length:81}, (_, i) => {
      const tau = duration * i / 80;
      const [x, y] = point((vx-u)*tau, vy0*tau-g*tau*tau/2);
      return `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
    svg.append(element("path", {d:path,class:"trajectory"}));
    const [cx,cy] = point((vx-u)*t,vy0*t-g*t*t/2);
    svg.append(element("circle", {cx,cy,r:6,class:"particle"}));
  }
  function update() {
    const u = Number(speed.value);
    const t = duration * Number(time.value) / 1000;
    const vy = vy0-g*t;
    const y = Math.max(0,vy0*t-g*t*t/2);
    const k = mass*(vx*vx+vy*vy)/2;
    const kp = mass*((vx-u)*(vx-u)+vy*vy)/2;
    const k0 = mass*(vx*vx+vy0*vy0)/2;
    const kp0 = mass*((vx-u)*(vx-u)+vy0*vy0)/2;
    const work = -mass*g*y;
    document.getElementById("frame-speed-value").value = `${u} m/s`;
    document.getElementById("frame-time-value").value = `${fmt(t)} s${Number(time.value) === 500 ? " · highest point" : ""}`;
    plot("ground-plot", 0, t);
    plot("moving-plot", u, t);
    const rows = [
      ["Velocity (m/s)", `(${fmt(vx)}, ${fmt(vy)})`, `(${fmt(vx-u)}, ${fmt(vy)})`, false],
      ["Kinetic energy (J)", fmt(k), fmt(kp), false],
      ["Energy change since launch (J)", fmt(k-k0), fmt(kp-kp0), true],
      ["Gravity’s work since launch (J)", fmt(work), fmt(work), true],
      ["Acceleration (m/s²)", "(0, −9.80)", "(0, −9.80)", true],
      ["Maximum height (m)", fmt(maxHeight), fmt(maxHeight), true]
    ];
    const table = document.createElement("table");
    const caption = table.createCaption();
    caption.textContent = "Measurements at the selected time";
    const header = table.createTHead().insertRow();
    ["Quantity", "Ground", "Moving"].forEach(label => {
      const th = document.createElement("th"); th.scope = "col"; th.textContent = label; header.append(th);
    });
    const body = table.createTBody();
    rows.forEach(([name,a,b,shared]) => {
      const row = body.insertRow();
      if (shared) row.className = "shared";
      const th = document.createElement("th"); th.scope = "row"; th.textContent = name; row.append(th);
      row.insertCell().textContent = a;
      row.insertCell().textContent = b;
    });
    document.getElementById("frame-results").replaceChildren(table);
  }
  speed.addEventListener("input", update);
  time.addEventListener("input", update);
  document.getElementById("frame-match").addEventListener("click", () => { speed.value = vx; update(); });
  document.getElementById("frame-apex").addEventListener("click", () => { time.value = 500; update(); });
  update();
})();
