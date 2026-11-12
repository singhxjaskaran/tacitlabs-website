/* Shared pieces for the three directions. Everything drawn here is the product's own picture,
   on the demo's illustrative data (Northwind Finance, Wed 9 Dec, 09:31). */

export function rng(seed) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** The ink filter every .hand uses: a slight wobble, so a font stops looking like a font. */
export function ink() {
  if (/^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent)) document.documentElement.classList.add('is-safari')
  document.body.insertAdjacentHTML(
    'beforeend',
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <filter id="ink" x="-5%" y="-20%" width="110%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="2" seed="7" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="rough" x="-5%" y="-30%" width="110%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.09" numOctaves="2" seed="11" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="5"/>
      </filter>
    </defs></svg>`,
  )
}

/** Things with .rise or .write get .in when they come into view. */
export function arrive() {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
    { threshold: 0.25 },
  )
  document.querySelectorAll('.rise, .write').forEach((el) => io.observe(el))
}

const NS = 'http://www.w3.org/2000/svg'
const el = (tag, attrs, parent) => {
  const e = document.createElementNS(NS, tag)
  for (const k in attrs) e.setAttribute(k, attrs[k])
  parent?.appendChild(e)
  return e
}

export const YOURS = [
  ['4133', 'svc_deploy into FIN-DB-03, a first'],
  ['4142', 'Scanner QSCAN-01 across 40 hosts'],
  ['4149', 'PsExec by it_ops on HR-APP-01'],
  ['4157', 'RDP from a new workstation'],
  ['4165', 'A scanner nobody listed, SCAN-02'],
  ['4166', 'svc_report added to Domain Admins'],
  ['4170', 'Vendor sign-in, same window'],
  ['4173', 'A reason that names no hosts'],
  ['4152', 'New admin account, Northwind asked'],
  ['4126', 'Audit sample of a Tacit close'],
]

/**
 * The shift field: one dot per alert since 07:00, at the minute it fired, in a row by severity.
 * Black dots Tacit closed, rings are learning in shadow, white dots need a person.
 */
export function shiftField(host, { seed = 4, height = 260, onHover, tone = 'ground' } = {}) {
  const W = 1200
  const H = height
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img' }, host)
  svg.setAttribute(
    'aria-label',
    'Every alert since 07:00 as a dot. 148 closed by Tacit, 54 learning in shadow, 10 need a person.',
  )
  const r = rng(seed)
  const rows = ['High', 'Medium', 'Low', 'Info']
  const top = 14
  const bot = H - 30
  const rowH = (bot - top) / 4
  const fg = tone === 'wall' ? '#fff' : '#0a0a0a'
  rows.forEach((name, i) => {
    if (i === 0)
      el('rect', { x: 62, y: top, width: W - 62, height: rowH, fill: '#ff4a1c', opacity: 0.2 }, svg)
    el('line', { x1: 62, x2: W, y1: top + i * rowH, y2: top + i * rowH, stroke: fg, 'stroke-opacity': 0.28 }, svg)
    const t = el('text', { x: 0, y: top + i * rowH + rowH / 2 + 4, fill: fg, 'fill-opacity': 0.75 }, svg)
    t.textContent = name
  })
  el('line', { x1: 62, x2: W, y1: bot, y2: bot, stroke: fg }, svg)
  ;['07:00', '07:30', '08:00', '08:30', '09:00', '09:31'].forEach((h, i, a) => {
    const x = 62 + (i / (a.length - 1)) * (W - 62 - 8)
    el('line', { x1: x, x2: x, y1: bot, y2: bot + 6, stroke: fg }, svg)
    const t = el('text', { x, y: H - 6, fill: fg, 'fill-opacity': 0.75, 'text-anchor': i === 0 ? 'start' : i === a.length - 1 ? 'end' : 'middle' }, svg)
    t.textContent = h
  })
  const pts = []
  const push = (kind, n, sev) => {
    for (let i = 0; i < n; i++) {
      const q = r()
      pts.push({ kind, t: Math.pow(r(), 0.85), s: sev(q), j: r() })
    }
  }
  push('closed', 148, (q) => (q < 0.03 ? 0 : q < 0.2 ? 1 : q < 0.62 ? 2 : 3))
  push('shadow', 54, (q) => (q < 0.06 ? 0 : q < 0.3 ? 1 : q < 0.7 ? 2 : 3))
  push('yours', 10, (q) => (q < 0.4 ? 0 : q < 0.8 ? 1 : 2))
  pts.sort((a, b) => a.t - b.t)
  let yi = 0
  pts.forEach((p, i) => {
    const cx = 74 + p.t * (W - 62 - 26)
    const cy = top + p.s * rowH + 10 + p.j * (rowH - 20)
    const g = el('g', { class: 'dot-g' }, svg)
    let c
    if (p.kind === 'closed') c = el('circle', { cx, cy, r: 4.2, fill: fg, class: 'dot' }, g)
    else if (p.kind === 'shadow')
      c = el('circle', { cx, cy, r: 3.6, fill: 'none', stroke: fg, 'stroke-width': 1.4, class: 'dot' }, g)
    else {
      const first = yi === 0
      c = el(
        'circle',
        {
          cx,
          cy,
          r: 7,
          fill: first ? '#ff4a1c' : '#fff',
          stroke: '#0a0a0a',
          'stroke-width': 1.6,
          class: 'dot',
          tabindex: 0,
        },
        g,
      )
      const y = YOURS[yi++ % YOURS.length]
      const say = () => onHover?.(`${y[0]} · ${y[1]}`)
      c.addEventListener('mouseenter', say)
      c.addEventListener('focus', say)
      c.addEventListener('mouseleave', () => onHover?.(null))
      c.addEventListener('blur', () => onHover?.(null))
      c.style.cursor = 'pointer'
    }
    c.style.opacity = 0
    c.style.transition = `opacity .4s ${Math.round(p.t * 1400)}ms`
    requestAnimationFrame(() => requestAnimationFrame(() => (c.style.opacity = 1)))
  })
  return svg
}

export const CUES = [
  ['Which rule fired', 'RDP to several hosts', '', 'The rule is rdp-multi. Sentinel, 4 minutes ago.'],
  ['What the target is', 'Finance database', '', 'Both targets sit in the finance database group.'],
  ['Kind of account', 'Service account', 'lean-close', 'A service account, not a person.'],
  ['Its rights', 'Service rights', '', 'No admin rights on the targets.'],
  ['On a known-bad list', 'No', 'lean-close', 'Nothing in threat intelligence matches.'],
  ['Other alerts nearby', 'None', 'lean-close', 'No other alert on this source in two hours.'],
  ['Where it came from', 'Inside the network', 'lean-close', 'JUMP-01, 10.30.4.17.'],
  ['This account from this host', '37 times', 'close', 'svc_deploy has come from JUMP-01 37 times in 90 days.'],
  ['This account on this target', 'First time', 'look', 'FIN-DB-03 has never seen svc_deploy. This is the one to look at.'],
  ['Did it work', 'Yes', 'lean-look', 'All three sign-ins succeeded.'],
]

export function cueWall(host, line) {
  const rest = line?.textContent
  CUES.forEach(([ask, says, tone, fact]) => {
    const b = document.createElement('button')
    b.className = `cue ${tone}`
    b.innerHTML = `<small>${ask}</small><b>${says}</b>`
    b.setAttribute('aria-label', `${ask}: ${says}. ${fact}`)
    if (line) {
      const show = () => (line.innerHTML = `<b>${ask}.</b> ${fact}`)
      const hide = () => (line.textContent = rest)
      b.addEventListener('mouseenter', show)
      b.addEventListener('focus', show)
      b.addEventListener('mouseleave', hide)
      b.addEventListener('blur', hide)
    }
    host.appendChild(b)
  })
}

/** The approval ruler: the client's yes as a blue bar on four days of ticks, the alert as a marker. */
export function ruler(host) {
  host.innerHTML = `
  <div class="rl" role="img" aria-label="Vendor patching is approved from Tuesday 11:02 to Thursday 19:00. The alert is at Wednesday 09:15.">
    <div class="rl-win write"><span>Vendor patching · R-0031</span><span>ends Thu 19:00</span></div>
    <div class="rl-ticks"></div>
    <div class="rl-now"><b>09:15</b></div>
    <div class="rl-days"><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
  </div>`
}
