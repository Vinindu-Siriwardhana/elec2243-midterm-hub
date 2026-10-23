// Midterm study plan (Lectures 0–6). Each item: [label, detail]. Ticks are stored under 'plan' in localStorage.
const PLAN = [
 {id:"days", title:"Schedule: Fri 23 → Thu 29 Oct", icon:"📅", c:["#f59e0b","#f97316"], note:"Midterm Thu 29 Oct in class: Lectures 1–6 including 6e (resistors). Lecture 7 is not included. One A4 sheet, handwritten, one side; standard calculator.", items:[
   ["Fri 23","Vectors, point charges, continuous charge: HW1, 2e/3e slides, 2019 Q1, 2024 B1, Hayt Ch 1–2 picks"],
   ["Sat 24","Gauss: 4e slides, 2021-22 P2, 2022 P2, 2024 MCQ 1–3, Hayt Ch 3 picks"],
   ["Sun 25","Potential + energy: 5e slides, 2023 Q2–Q3, 2022 P3, 2024 B6, Hayt Ch 4 picks"],
   ["Mon 26","Conductors, images, dielectrics, capacitors: Lecture 6 + 6e examples, 2024 B2, 2019 Q2(c)–(d), Hayt Ch 5 picks"],
   ["Tue 27","6e resistors (current, J, Ohm's law): 6e slides, Hayt 5.10–5.14. Homework 3 is due at midnight tonight."],
   ["Wed 28","Timed mock (~75 min): 2023 Q2 + Q3, 2024 B2 + MCQ 1–3, plus one resistance question. Then finalise the A4 sheet and redo mistakes."],
   ["Thu 29","Midterm. Bring calculator, A4 sheet, ID."]]},
 {id:"hw", title:"Tier 1 · Homework 1", icon:"📝", c:["#6366f1","#8b5cf6"], note:"Redo without looking at your submission. Q5 and Q8 are the hardest.", items:[
   ["Q1–2","Unit vectors of a triangle; vector endpoint"],["Q3","Field felt by q and −4q"],["Q4","E from two charges; where E_y = 0 (Hayt 2.5)"],
   ["Q5","Net force on a cube corner charge"],["Q6","Charge from a measured field"],["Q7","Max force on the bisector of two nuclei"],
   ["Q8","Linear quadrupole field on axis"],["Opt 10","Equilateral triangle forces"],["Opt 12","Square: Q vs q for zero net force"]]},
 {id:"pp", title:"Tier 1 · Past-paper questions in scope", icon:"📄", c:["#06b6d4","#3b82f6"], note:"All five papers are finals, so only these parts are midterm material.", items:[
   ["2023 Q2","Concentric shells: E, ΔV, C, U — the most typical midterm question"],
   ["2023 Q3","Sphere with ρ = αr: E in/out, V at the surface"],
   ["2023 MCQ 1.2, 1.5","Force scaling, vector quantities"],
   ["2024 B2","Parallel conducting plates: σ on each face, grounding (a)–(d)"],
   ["2024 B1","E at P from +5 nC and −45 nC"],
   ["2024 MCQ 1–3","Bisector field, cylindrical sheets, vector identity"],
   ["2024 B6","Cavity in a charged sphere — field is uniform"],
   ["2022 P2","Two perpendicular infinite sheets"],
   ["2022 P3","Sphere with an off-centre hollow: E and V"],
   ["2022 MCQ 1.1–1.2","Gauss flux, potential sign"],
   ["2021-22 P1","11 charges on a circle: E and V at the centre"],
   ["2021-22 P2","Coaxial cylindrical shells"],
   ["2019 Q1","Coulomb forces on an axis / at 60°"],
   ["2019 Q2","Dipole torque, flux, sphere energy, parallel-plate C"]]},
 {id:"sl", title:"Tier 1 · Lecture example slides", icon:"🖥", c:["#10b981","#34d399"], note:"Rework each from a blank page before checking the slide.", items:[
   ["2e A1–A2","Dipole on the bisector; far-field limit"],
   ["2e B2–B4","Square, 8 charges on a circle, ring of charge"],
   ["3e","Finite line → infinite line; disc → infinite plane"],
   ["3e","Line-charge dipole; spherical shell by integration"],
   ["4e","Infinite rod, thick slab, coaxial shells"],
   ["4e","Find Q from E; charge in a small volume via divergence"],
   ["5e","Spherical shell: V, C, energy"],
   ["5e","Configuration energy; dipole problem"],
   ["6","Line charge above the earth (image method)"],
   ["6","Conducting slab in an isolated capacitor (C → 2.5×, energy → 0.4×)"],
   ["6","Spherical capacitor; boundary-condition examples"]]},
 {id:"re", title:"Tier 1 · Lecture 6e: current, capacitors & boundaries", icon:"🔌", c:["#14b8a6","#22c55e"], note:"New slides (22 Oct). Resistors are in the midterm. Work each from a blank page first.", items:[
   ["6e 25–26","Copper conductor: resistance, current density and voltage"],
   ["6e 20–24","Derive J = ρv and Ohm's law R = l/σA"],
   ["6e 10–12","Dielectric inserted: battery connected vs disconnected (Q, V, E, C, U)"],
   ["6e 5","Conductor–dielectric boundary: D and E just outside a charged conductor"]]},
 {id:"h5b", title:"Tier 2 · Hayt Ch 5 — current & resistance (Lecture 6e)", icon:"🔋", c:["#64748b","#334155"], note:"", items:[
   ["5.3","J through part of a sphere"],["5.10","Steel wire with aluminium coating"],["5.12","Radial current between spheres, σ constant and σ ∝ 1/r"],["5.13","Hollow brass tube"],["5.14","E in a conductor from J, mobility or resistivity"]]},
 {id:"h1", title:"Tier 2 · Hayt Ch 1 — vectors & coordinates", icon:"📐", c:["#64748b","#334155"], note:"", items:[
   ["1.4",""],["1.13",""],["1.19",""],["1.21",""],["1.29",""]]},
 {id:"h2", title:"Tier 2 · Hayt Ch 2 — Coulomb & charge distributions", icon:"⚡", c:["#64748b","#334155"], note:"", items:[
   ["2.1",""],["2.6",""],["2.15",""],["2.19",""],["2.21",""],["2.23",""],["2.25",""]]},
 {id:"h3", title:"Tier 2 · Hayt Ch 3 — Gauss & divergence", icon:"🔵", c:["#64748b","#334155"], note:"", items:[
   ["3.4",""],["3.9",""],["3.12",""],["3.13",""],["3.14",""],["3.17",""],["3.21",""],["3.25",""],["3.27",""]]},
 {id:"h4", title:"Tier 2 · Hayt Ch 4 — potential & energy", icon:"🔋", c:["#64748b","#334155"], note:"", items:[
   ["4.4",""],["4.6",""],["4.9",""],["4.16",""],["4.19",""],["4.24",""],["4.27",""],["4.33",""],["4.35",""]]},
 {id:"h5", title:"Tier 2 · Hayt Ch 5 — conductors, dielectrics, capacitance", icon:"🧱", c:["#64748b","#334155"], note:"", items:[
   ["5.20","Image of a point charge"],["5.21","Image of line charges"],["5.28",""],["5.31","Dielectric boundary conditions"],["5.34",""],["5.36",""],["5.41",""],["5.44",""],["5.45",""]]},
];
const PLAN_SKIP = "Not in the midterm: Lecture 7 onward, so every past-paper part on magnetism, induction, EM waves/Poynting and inductance; Hayt 5.24–5.26 (semiconductors); Hayt Ch 6 (field mapping); and Hayt 5.1, 5.2, 5.4–5.9 (continuity equation, vacuum tube, nichrome table), which the slides don't teach.";
