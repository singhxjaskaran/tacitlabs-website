# Thesis · Magazine edition — content source

> Source of truth for the magazine thesis at `/website/thesis.html`. Edit this file freely, then tell me **"rebuild thesis from md"** (or "update thesis") and I'll port the edits over to the HTML.
>
> **Formatting conventions**
> - Markdown inline: `_word_` → italic emphasis (renders maroon serif on the site); `**word**` → bold (renders maroon).
> - Em-dashes: use `—` directly. Don't worry about HTML entities.
> - Section labels (the `## §` headings below) are scaffolding — they identify which block on the page each chunk belongs to. Editing the label re-labels the field; if you want to rename a section, just edit the label.
> - The closing/footer section uses `→` to indicate the link target. Edit the target after the `→` to change the link.

---

## Page meta

- **html title**: Tacit — The judgment layer for AI agents

---

## Hero

### Banner (top-left announcement strip)

Pre-seed, raising. If you operate inside regulated underwriting or invest in vertical AI infrastructure, the door is open.

- **link text**: Get in touch
- **link href**: mailto:hi@tacitlabs.ai

### Display headline (huge maroon manifesto)

Knowledge
creating
company.

> Three lines, one word each. Each line renders as its own line in the manifesto.

### Lede paragraph (right column body)

Tacit is the expert judgment layer for AI agents that operate in regulated industries. We capture the cognitive process of senior experts — the live decision process that determines what they attend to, how they weight uncertainty, and which heuristic fires when a case is ambiguous — and route it into the agents your organisation is already deploying.

### Vertical links (three chips under the lede)

- Insurance Underwriting → #verticals
- Diagnostics → #verticals
- Nuclear → #verticals

---

## Platform split (the panel + lab-art band)

- **eyebrow**: The Tacit platform
- **panel title**: Built to make / the expert judgement / machine-legible.

> The panel title uses `/` to split into three lines (renders as `<br/>`).

---

## § 01 · Thesis, briefly

- **section number**: § 01 / Thesis
- **section title**: Thesis, briefly.
- **section meta**: A read of ~ 2 minutes

### Aside ("For the reader in a hurry")

**For the reader in a hurry**

AI agents are extraordinary at retrieval and language. They are unreliable at judgement. About 70% of the operational decisions that matter in a regulated organisation have never been written down and the part of expertise that defines the senior expert is not a body of knowledge, it is a runtime. Tacit makes that runtime observable.

runtime = heuristics * situation * decay

- **aside cta text**: Read the full thesis
- **aside cta href**: thesis-full.html

### Prose (the three big paragraphs)

[para 1] _AI agents_ are good at retrieval. They are good at language. In regulated work they fail at the one thing that matters most: _judgement_.

[para 2] The published evidence on enterprise AI is now consistent enough to read as a pattern. BCG and McKinsey report 88% adoption against 5% meaningful returns. Gartner reports 85% of projects never reach production. MIT's 2024 study found 95% of enterprise generative AI pilots produced no measurable ROI. The standard explanation is that the models are immature, that retrieval needs to be better — that explanation has been wrong for at least two years.

[para 3] The agents are failing because the AI industry has been trying to capture expertise as _content_. About 70% of the meta decisions that matter have never been written down. The part of expertise that defines the senior expert is not knowledge that can be made larger or more accessible. It is a runtime construct, a live cognitive process that decides, under uncertainty, which heuristic fires. We make that runtime observable, persistent, and queryable for the agents that will inherit the work.

> The first two words of [para 1] (currently "AI agents") render as a maroon drop-cap-style emphasis. If you change those two words, the emphasis follows.

---

## § 02 · The shape of the problem

- **section number**: § 02 / Diagnosis
- **section title**: The shape of / the problem.
- **section meta**: Eight observations

### Eight observations (numbered list)

1. **Tacit knowledge does not exist on paper.** The documents an LLM can read describe the world after the experts have already left the room.
2. A thirty-year underwriter cannot tell you, in words, why she declined a submission in four seconds. She just declined it.
3. A senior radiologist sees the malignancy before they can articulate why. The _seeing_ is the expertise. The words are a post-hoc reconstruction.
4. A control-room operator detects a drift through a posture, a hum, a feel. The SCADA log shows nothing yet.
5. **These signals do not survive into training data.** So they do not survive into the model. So they do not survive into the agent.
6. What survives is the documentation: the safety bulletins, the discharge summaries, the underwriting guidelines — the thin paper trail of decisions, not the decisions themselves.
7. LLMs trained on that paper trail are fluent but ungrounded. They are plausible at the centre of the distribution and dangerous at the margins.
8. **The margins are where money, lives and licenses live.** Which is exactly where regulated work spends its time.

### Pullquote (the italic serif callout)

> The methods do not ask experts what they do. They observe what experts do.

- **citation**: — Tacit methodology

### Pullquote stat block

At the Brainoscope deployment, **722** behavioural events captured across **54** sessions. Contrastive cohort analysis across three expert tiers produced Cohen's d effect sizes between **0.92 and 1.82** — separation almost nothing in social science research achieves.

---

## § 03 · What we've built

- **section number**: § 03 / Product
- **section title**: What we've built.
- **section meta**: Four primitives

### Primitive 01 — Capture

- **kicker**: 01 — Capture
- **heading**: Five methods
- **body**: Decision archaeology against historical exhaust, contrastive cohort analysis, perturbation probing, the Structured Interview Agent, and live escalation capture in production. The runtime is opaque to self-report and visible only in behaviour.

### Primitive 02 — Structure

- **kicker**: 02 — Structure
- **heading**: Judgement graph
- **body**: Every captured node carries a confidence score, a decay rate, and a provenance trail to the named expert and source session. Organised against a seven-layer, 103-marker cognitive taxonomy grounded in Naturalistic Decision Making research.

### Primitive 03 — Route

- **kicker**: 03 — Route
- **heading**: Context API
- **body**: Agents hit the graph at decision time through a small set of well-defined endpoints. Queries return judgment ranked by confidence, recency, and relevance — at latency budgets production agents can actually afford.

### Primitive 04 — Audit

- **kicker**: 04 — Audit
- **heading**: Decision provenance
- **body**: Every agent recommendation cites only captured heuristics, with provenance to the named expert who authored it. Regulator-ready for the EU AI Act, SR 11-7, NAIC Model Bulletin, and PRA SS1/23.

---

## § 04 · Why now

- **section number**: § 04 / Timing
- **section title**: Why now.
- **section meta**: Four forces, converging

### Force 01

- **heading**: The technology threshold lifted in 2024.
- **body**: Foundation models can now parse unstructured expert reasoning, tag it against a cognitive taxonomy, and store it with provenance and confidence — at a cost low enough that the methodology is commercially viable for the first time in the forty-year history of expert-systems research.

### Force 02

- **heading**: "RAG over PDFs" is no longer a defensible answer to liability.
- **body**: The EU AI Act enters staged enforcement in August 2026, alongside SR 11-7, the NAIC Model Bulletin, and PRA SS1/23. Auditors, regulators, and trial lawyers now ask the second question: _why did the model decide that?_ Documents alone cannot answer it.

### Force 03

- **heading**: Senior expertise is retiring faster than the next generation can absorb it.
- **body**: Roughly half of senior underwriters and a quarter of claims adjusters will retire within ten years. Ten thousand baby boomers retire every working day in the US and UK. The training cycle is five to ten years; the replacement pipeline runs at 60% of capacity. The window in which the senior cohort can still be observed is open right now — and substantively closed by 2030.

### Force 04

- **heading**: The first generation of agents shipped without judgement. The second won't.
- **body**: The leading buyers in regulated work are no longer asking _can the model write the report?_ They are asking _whose judgement is in this decision?_ That is the question Tacit was built to answer.

---

## § 05 · Where we work

- **section number**: § 05 / Verticals
- **section title**: Where we work.
- **section meta**: One wedge, two expansion paths

### Vertical 01 — Cyber insurance underwriting [warm/featured card]

- **eyebrow**: Cyber insurance underwriting
- **heading**: The wedge. Specialty risk where unwritten judgement is widest.
- **body**: Senior underwriters decline in seconds for reasons they cannot easily write down. We capture the patterns — submission shape, broker history, second-order exposures — and route them into the agent triaging tomorrow's queue. Cyber is where the gap between the model's native capability and the underwriter's judgement is widest, and where the specialty MGAs are moving fastest on AI procurement.
- **stat 1 label**: Override rate
- **stat 1 value**: 25–40%
- **stat 2 label**: Target reduction
- **stat 2 value**: 30–50% @ m6

### Vertical 02 — Clinical decision support

- **eyebrow**: Clinical decision support
- **heading**: The pattern recognition of senior specialists, available at every read.
- **body**: A radiologist sees the malignancy before they can describe it. We encode that _seeing_: the gestalt cues, the comparative anchors, the second-look heuristics. The Brainoscope deployment is where the methodology is being calibrated against three expert cohorts in clinical neurotechnology — a diagnostic agent inherits the eye of the specialist, not the prose of the textbook.
- **stat 1 label**: Capture sessions
- **stat 1 value**: 54 · Brainoscope
- **stat 2 label**: Cohen's d
- **stat 2 value**: 0.92–1.82

### Vertical 03 — Nuclear & industrial control

- **eyebrow**: Nuclear & industrial control
- **heading**: Preserving the control room as a generation of operators retires.
- **body**: A reactor operator hears a drift before any alarm flags it. We capture the felt-sense of the plant — what counts as normal, what counts as worth waking the shift supervisor — before the people who hold it walk out for the last time. The expansion path through years three to five, alongside oil and gas and complex industrial process control.
- **stat 1 label**: Phase
- **stat 1 value**: Expansion
- **stat 2 label**: Horizon
- **stat 2 value**: Year 3–5

---

## Closing

- **kicker**: — The knowledge creating company —

### Manifesto (huge maroon closing line)

Every AI agent inherits someone's judgment. We make sure it's yours
> The italic phrase `_it's_ _yours_` renders in the serif font (Instrument Serif) as a deliberate emphasis.

### CTAs

- **primary**: Talk to us → mailto:hi@tacitlabs.ai
- **secondary**: Read the full thesis → thesis-full.html

---

## Footer

### Colophon

The judgment layer for AI agents in regulated industries.

### Column · Company

- Home → Polaris.html
- Founders → founders.html
- Writing → essays.html
- Contact → mailto:hi@tacitlabs.ai

### Column · Read deeper

- Full thesis → thesis-full.html
- The layer below → the-layer-below.html
- How we capture → how-we-capture.html
- Insurance → insurance.html

### Column · Contact

- hi@tacitlabs.ai · Operator → mailto:hi@tacitlabs.ai?subject=Operator
- hi@tacitlabs.ai · Investor → mailto:hi@tacitlabs.ai?subject=Investor
- hi@tacitlabs.ai · Team → mailto:hi@tacitlabs.ai?subject=Team

### Signoff line

- **left**: © 2026 Tacit Labs, Inc.
