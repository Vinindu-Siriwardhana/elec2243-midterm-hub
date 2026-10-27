// Midterm study plan (Lectures 0–6). Each item: [label, detail, pid?]. Ticks are stored under 'plan' in localStorage,
// keyed by pid (default groupId:index). An explicit pid keeps a trimmed item linked to its Practice card.
const PLAN = [
 {id:"days", title:"Schedule: Tue 27 → Thu 29 Oct", icon:"📅", c:["#f59e0b","#f97316"], note:"Midterm Thu 29 Oct in class: Lectures 1–6 including 6e (resistors). Lecture 7 is not included. One A4 sheet, handwritten, one side; standard calculator. Today is homework and past papers; tomorrow is everything else. Review mode: read the question, say the method out loud, and only write it out in full if you're unsure, then check against the worked answer. Add every mistake to the A4 sheet as you go.", items:[
   ["Tue 27 · 1","Homework review: HW1 Q1–Q8 + Opt 10, 12 (Practice tab); HW2 Q1–Q8 and HW3 Q1–Q7 (Assignments tab). Fully redo only HW1 Q5, HW1 Q8, HW2 Q7 and anything you got wrong. Submit Homework 3 by midnight.","days:tue27-hw"],
   ["Tue 27 · 2","Past papers, charges → fields → Gauss: 2019 Q1, 2024 B1, 2021-22 P1, 2023 MCQ 1.1, 1.2, 1.5, 2024 MCQ 1–3, 2022 MCQ 1.1, 2019 Q6(a), 2021-22 P2, 2022 P2, 2019 Q5(b).","days:tue27-pp1"],
   ["Tue 27 · 3","Past papers, potential → energy → conductors → capacitors: 2022 MCQ 1.2, 2023 Q3, 2023 Q2, 2022 P3, 2024 B6, 2019 Q2, 2024 B2, 2021-22 P3. Do 2023 Q2 and 2024 B2 timed (~15 min each); they are the most midterm-like.","days:tue27-pp2"],
   ["Tue 27 · 4","A4 sheet, first pass: Coulomb and E of line / ring / disc / sheet, Gauss surfaces, V of standard shapes, C of plate / coax / sphere, plus every trap you hit today.","days:tue27-a4"],
   ["Wed 28 · 1","Lecture example slides (2e, 3e, 4e, 5e, 6) and Lecture 6e: current, J = σE, R = l/σA, dielectric with battery connected vs disconnected, conductor boundary conditions, image method. Work each from a blank page.","days:wed28-sl"],
   ["Wed 28 · 2","Tier 2 Hayt picks (Ch 1–5) for any topic that felt shaky yesterday. Skip the ones you're confident on.","days:wed28-hayt"],
   ["Wed 28 · 3","Timed mock (~60 min), all unseen: Hayt 5.20 (image), Hayt 5.36 (dielectric, source removed), Hayt 5.12 (resistance), 6e copper example. Mark it and redo mistakes.","days:wed28-mock"],
   ["Wed 28 · 4","Copy out the final A4 sheet. Re-read the past-paper answers you marked wrong yesterday. Early night.","days:wed28-a4"],
   ["Thu 29","Midterm. Bring calculator, A4 sheet, ID.","days:thu29"]]},
 {id:"hw", title:"Tier 1 · Homework 1", icon:"📝", c:["#6366f1","#8b5cf6"], note:"Redo without looking at your submission. Q5 and Q8 are the hardest.", items:[
   ["Q1–2","Unit vectors of a triangle; vector endpoint"],["Q3","Field felt by q and −4q"],["Q4","E from two charges; where E_y = 0 (Hayt 2.5)"],
   ["Q5","Net force on a cube corner charge"],["Q6","Charge from a measured field"],["Q7","Max force on the bisector of two nuclei"],
   ["Q8","Linear quadrupole field on axis"],["Opt 10","Equilateral triangle forces"],["Opt 12","Square: Q vs q for zero net force"]]},
 {id:"a2", title:"Tier 1 · Homework 2", icon:"2️⃣", c:["#0ea5e9","#06b6d4"], note:"Same instructor as the midterm, so this is the closest guide to its style. Worked solutions are in the Assignments tab; ticks stay in sync.", items:[
   ["Q1","Coaxial cylindrical shells: E everywhere"],["Q2","Gauss with ρ = 50 r e^(−r)"],["Q3","Cube flux vs ∇·E estimate"],["Q4","ρ_v from a piecewise E; total Q"],
   ["Q5","Work along three paths"],["Q6","E and ρ_v from V = 2xy²z³"],["Q7","Disc on axis: V first, then E"],["Q8","V between two charged planes"]]},
 {id:"a3", title:"Tier 1 · Homework 3", icon:"3️⃣", c:["#f59e0b","#f97316"], note:"Due Tue 27 Oct. Worked solutions are in the Assignments tab; ticks stay in sync.", items:[
   ["Q1","Image method: two charges near a grounded plane"],["Q2","Total current from J = J₀ρ/a"],["Q3","Ohm's law in a wire"],["Q4","Three dielectric slabs: boundary conditions"],
   ["Q5","Free space / dielectric interface"],["Q6","Coaxial capacitor"],["Q7","Two-layer parallel-plate capacitor"]]},
 {id:"pp", title:"Tier 1 · Past-paper questions in scope", icon:"📄", c:["#06b6d4","#3b82f6"], note:"All five papers are finals, so these are every part in midterm scope (Lectures 0–6e), each with the full question and a full worked answer. Work through all of them today (Tue 27).", items:[
   ["2023 Q2","Concentric shells: E, ΔV, C, U — the most typical midterm question"],
   ["2023 Q3","Sphere with ρ = αr: E in/out, V at the surface"],
   ["2023 MCQ 1.1, 1.2, 1.5","Maxwell's equations, force scaling, vector quantities"],
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
   ["2019 Q2","Dipole torque, flux, sphere energy, parallel-plate C"],
   ["2021-22 P3","Capacitor charged by a steady current: E(t), V(t), U(t) (B(t) is Lecture 7+)"],
   ["2019 Q5(b)","Slab with ρ = 10⁻⁸ cos z: E from Poisson's equation"],
   ["2019 Q6(a)","Curl of a vector field at the origin"]]},
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
 {id:"h1", title:"Tier 2 · Hayt Ch 1 — coordinate conversions", icon:"📐", c:["#64748b","#334155"], note:"Must-do picks only. The other Hayt problems are still in the Practice tab if you have spare time.", items:[
   ["1.19","Cartesian → cylindrical components","h1:2"],["1.29","a_x in spherical components","h1:4"]]},
 {id:"h2", title:"Tier 2 · Hayt Ch 2 — Coulomb & charge distributions", icon:"⚡", c:["#64748b","#334155"], note:"", items:[
   ["2.19","Finite vs infinite line charge","h2:3"],["2.23","Charged disc on axis","h2:5"],["2.25","Point + line + sheet superposition","h2:6"]]},
 {id:"h3", title:"Tier 2 · Hayt Ch 3 — Gauss & divergence", icon:"🔵", c:["#64748b","#334155"], note:"Hayt 3.17 is the same as HW2 Q3, so it is not repeated here.", items:[
   ["3.12","ρ_v = 120r sphere; surface charge to double D","h3:2"],["3.14","Charged cylinder vs equivalent line charge","h3:4"],["3.25","ρ_v, flux and charge from D","h3:7"]]},
 {id:"h4", title:"Tier 2 · Hayt Ch 4 — potential & energy", icon:"🔋", c:["#64748b","#334155"], note:"", items:[
   ["4.16","V(r) for three charged shells","h4:3"],["4.24","V = 80r² cos θ: E, D, ρ_v","h4:5"],["4.35","Energy of charges on a square","h4:8"]]},
 {id:"h5", title:"Tier 2 · Hayt Ch 5 — conductors, dielectrics, capacitance", icon:"🧱", c:["#64748b","#334155"], note:"5.20 and 5.36 are saved for Wednesday's mock.", items:[
   ["5.20","Image of a point charge (mock)","h5:0"],["5.31","Dielectric boundary conditions","h5:3"],["5.36","Dielectric withdrawn, source removed (mock)","h5:5"],["5.44","Three-layer coaxial capacitor","h5:7"]]},
 {id:"h5b", title:"Tier 2 · Hayt Ch 5 — current & resistance (Lecture 6e)", icon:"🔋", c:["#64748b","#334155"], note:"5.12 is saved for Wednesday's mock.", items:[
   ["5.10","Steel wire with aluminium coating","h5b:1"],["5.12","Radial current between spheres (mock)","h5b:2"]]},
];
const PLAN_SKIP = "Not in the midterm: Lecture 7 onward, so every past-paper part on magnetism, induction, EM waves/Poynting and inductance; Hayt 5.24–5.26 (semiconductors); Hayt Ch 6 (field mapping); and Hayt 5.1, 5.2, 5.4–5.9 (continuity equation, vacuum tube, nichrome table), which the slides don't teach.";
