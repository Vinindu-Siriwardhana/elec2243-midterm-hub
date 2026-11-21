// Final-exam study plan (whole course, Lectures 0–10e). Each item: [label, detail, pid?]. Ticks are stored under
// 'plan' in localStorage, keyed by pid (default groupId:index). Explicit pids link an item to its card in the
// Practice, Assignments or Past papers tab, so ticking either one ticks both.
const PLAN = [
 {id:"fdays", title:"Final schedule · 14 study days", icon:"📅", c:["#f59e0b","#f97316"], note:"The final covers the whole course: electrostatics (Lectures 0–6e) and magnetism & EM (Lectures 7–10e). Past finals allow ONE A4 sheet, handwritten, both sides, and an approved calculator; 3 hours. Days are numbered so you can start any time; tell me the exam date and I'll pin them to dates. Rule for every day: attempt on paper first, then check the worked answer, and copy every mistake onto the A4 sheet.", items:[
   ["Day 1","Electrostatics refresh I: vectors and coordinates, Coulomb, continuous charge, Gauss. HW1, HW2 Q1–Q4 (redo only what you got wrong), Lecture 2e–4e examples. A4 side 1: check it against the cheat sheet page 1.","fd:1"],
   ["Day 2","Electrostatics refresh II: potential and energy, conductors, images, dielectrics, capacitors, current. HW2 Q5–Q8, HW3 Q1–Q7, Lecture 5e–6e examples.","fd:2"],
   ["Day 3","Electrostatics past-paper questions (Past papers tab): 2023 Q2–Q3, 2024 B1, B2, B6, 2022 P2–P3, May 2022 P1–P2, May 2020 Q1–Q2, Q5(b), Q6(a), and all their MCQs. Timed: 2023 Q2 and 2024 B2 (~15 min each).","fd:3"],
   ["Day 4","Lecture 7 · magnetic force: Lorentz force, velocity selector, circles, Hall effect, force on wires, torque. HW4 Q1–Q4, HW4 optional Q1, Q2, Q4. Start A4 side 2.","fd:4"],
   ["Day 5","Lecture 7 · Biot–Savart: finite wire, loops, arcs, dipole. HW4 Q5–Q6, optional Q3, Q5; HW5 Q1–Q2; 2024 B3; 2022 MCQ 1.3–1.4.","fd:5"],
   ["Day 6","Lecture 8 · Ampère's law and curl: wire, coax, holes, solenoid, sheets. HW5 Q3–Q5, optional Q2, Q4; 2022 P4 / 2023 Q4 (parallel planes); 2019-20 Q3(a).","fd:6"],
   ["Day 7","Lecture 9 · magnetic materials: M, H, μ, hysteresis, boundary conditions, magnetic circuits. HW5 Q6–Q7, optional Q1, Q3; HW6 Q1; May 2020 Q4; May 2022 P6.","fd:7"],
   ["Day 8","Lecture 10 · Faraday and Lenz: changing B, sliding bar, generator. HW6 Q2–Q3, optional Q6; 2022 MCQ 1.5–1.6; May 2022 P4; May 2020 Q3(b), Q6(b)–(c).","fd:8"],
   ["Day 9","Lecture 10e · inductance and energy: self and mutual inductance, ½LI², transformer. HW6 Q4–Q5, optional Q8; 2023 B1; May 2020 Q3(c).","fd:9"],
   ["Day 10","Displacement current, Poynting and EM waves: HW6 optional Q7; 2022 MCQ 1.7–1.8; May 2022 P3; the Poynting capacitor (2022 P5 / 2023 Q5 / 2024 B4); waves 2022 P6, 2023 Q6, 2024 B5 + MCQ 4–5, May 2022 P5, May 2020 Q5(a); monopole bonus.","fd:10"],
   ["Day 11","Mock 1: Final Dec 2024, full paper, 3 hours, closed book except your A4 sheet. Mark it against the Past papers tab and redo every mistake.","fd:11"],
   ["Day 12","Mock 2: Final Dec 2023, 3 hours. Mark, redo mistakes, update the A4 sheet.","fd:12"],
   ["Day 13","Mock 3: Final Dec 2022, 3 hours. Mark, then copy out the final A4 sheet (both sides) neatly.","fd:13"],
   ["Day 14","Light review: skim May 2022 and May 2020 answers, re-read the recurring questions (Poynting capacitor, plane wave, parallel planes, monopoles), sleep early.","fd:14"]]},
 {id:"a4", title:"Tier 1 · Homework 4 (Lecture 7)", icon:"4️⃣", c:["#8b5cf6","#ec4899"], note:"Worked solutions are in the Assignments tab; ticks stay in sync.", items:[
   ["Q1","Velocity selector & mass spectrometer","a4:0"],["Q2","Hall effect in a copper strip","a4:1"],["Q3","Bent wire in uniform B","a4:2"],["Q4","Three wires on a triangle","a4:3"],["Q5","Rectangle vs circle at the centre","a4:4"],["Q6","Bohr orbit as a current loop","a4:5"],
   ["Opt 1","Helical motion","a4o:0"],["Opt 2","Loop next to a long wire","a4o:1"],["Opt 3","Earth's dipole field","a4o:2"],["Opt 4","Torque on a rectangular loop","a4o:3"],["Opt 5","Two arcs","a4o:4"]]},
 {id:"a5", title:"Tier 1 · Homework 5 (Lectures 7–9)", icon:"5️⃣", c:["#0ea5e9","#6366f1"], note:"Worked solutions are in the Assignments tab; ticks stay in sync.", items:[
   ["Q1","Wire with a semicircular bump","a5:0"],["Q2","Helmholtz coil","a5:1"],["Q3","Coaxial cable by Ampère","a5:2"],["Q4","Conductor with an off-centre hole","a5:3"],["Q5","Force between parallel wires","a5:4"],["Q6","Three magnetic media","a5:5"],["Q7","C-core electromagnet","a5:6"],
   ["Opt 1","Slab in a normal H field","a5o:0"],["Opt 2","Square loop under a wire","a5o:1"],["Opt 3","Magnetic refraction","a5o:2"],["Opt 4","Hollow conductor (superposition)","a5o:3"]]},
 {id:"a6", title:"Tier 1 · Homework 6 (Lectures 9–10e)", icon:"6️⃣", c:["#f97316","#ef4444"], note:"Due 26 Nov. Worked solutions are in the Assignments tab; ticks stay in sync.", items:[
   ["Q1","Hysteresis loop MCQ","a6:0"],["Q2","Loop and resistor in a changing B","a6:1"],["Q3","AC generator","a6:2"],["Q4","Two attached solenoids","a6:3"],["Q5","Wire–toroid transformer","a6:4"],
   ["Opt 6","Faraday's law around a ring","a6o:0"],["Opt 7","Displacement current","a6o:1"],["Opt 8","Mutual inductance wire–loop","a6o:2"]]},
 {id:"pf", title:"Tier 1 · Past papers: magnetism & EM questions", icon:"📜", c:["#ef4444","#8b5cf6"], note:"Every magnetism, induction and wave question from the five papers. Full questions and worked answers are in the Past papers tab; ticks stay in sync. Save the full 2024, 2023 and 2022 papers for the Day 11–13 mocks if you can.", items:[
   ["2024 MCQ 4–5","Sources of B; wave direction","x24:m45"],["2024 B3","Finite wire, Biot–Savart","x24:b3"],["2024 B4","Poynting vector of a charging capacitor","x24:b4"],["2024 B5","Plane wave in ferrite","x24:b5"],["2024 B7","Monopoles in Maxwell's equations","x24:b7"],
   ["2023 MCQ 1.3–1.4","Field lines; Faraday","x23:m34"],["2023 Q4","Parallel planes: energy, flux, L","x23:q4"],["2023 Q5","Poynting capacitor","x23:q5"],["2023 Q6","Circularly polarised wave","x23:q6"],["2023 B1","Two attached solenoids","x23:b1"],["2023 B2","Monopoles","x23:b2"],
   ["2022 MCQ 1.3","Parallel wires","x22:m13"],["2022 MCQ 1.4","Coil in uniform B","x22:m14"],["2022 MCQ 1.5","Lenz direction","x22:m15"],["2022 MCQ 1.6","Rod on rails","x22:m16"],["2022 MCQ 1.7","Displacement current sense","x22:m17"],["2022 MCQ 1.8","E from B","x22:m18"],
   ["2022 P4","Parallel planes","x22:p4"],["2022 P5","Poynting capacitor","x22:p5"],["2022 P6","Plane wave f, λ, direction","x22:p6"],["2022 Bonus","Monopoles","x22:bonus"],
   ["May 2022 P4","AC generator","x21:p4"],["May 2022 P5","Wave from B: E and ⟨S⟩","x21:p5"],["May 2022 P6","Coax with two media","x21:p6"],
   ["May 2020 Q3","Solenoids, emf, mutual inductance","x20:q3"],["May 2020 Q4","Magnetic materials, mmf","x20:q4"],["May 2020 Q5(a)","H from E, power on a dish","x20:q5a"],["May 2020 Q6(b)–(c)","Moving wire; rotating coil","x20:q6"]]},
 {id:"sl2", title:"Tier 1 · Lecture 7–10 example slides", icon:"🖥", c:["#10b981","#34d399"], note:"Rework each from a blank page before checking the slide.", items:[
   ["7 / 7e","Coil centre and on-axis field; finite straight wire; current sheet by integration","sl2:0"],
   ["7","Torque on a loop parallel to B; velocity selector; Hall-effect sign question","sl2:1"],
   ["8 / 8e","Wire of radius R; ideal solenoid; current sheet inside and outside; slab By = −μ₀J₀z","sl2:2"],
   ["9e","Angle between H₁ and the normal (μr1 = 2, μr2 = 8)","sl2:3"],
   ["9e / 10","Wire with a gap (displacement current); finite wire: Biot–Savart = Ampère–Maxwell","sl2:4"],
   ["10 / 10e","Sliding bar (emf, current, force, power); AC generator; solenoid L; travelling-wave example","sl2:5"],
   ["8e / 9","Midterm review: Problem 4 (slab in capacitor) and the leaky spherical capacitor bonus","sl2:6"]]},
 {id:"hw", title:"Tier 2 · Homework 1 (electrostatics refresh)", icon:"📝", c:["#6366f1","#8b5cf6"], note:"Redo only the ones you missed before. Q5 and Q8 are the hardest.", items:[
   ["Q1–2","Unit vectors of a triangle; vector endpoint"],["Q3","Field felt by q and −4q"],["Q4","E from two charges; where E_y = 0 (Hayt 2.5)"],
   ["Q5","Net force on a cube corner charge"],["Q6","Charge from a measured field"],["Q7","Max force on the bisector of two nuclei"],
   ["Q8","Linear quadrupole field on axis"],["Opt 10","Equilateral triangle forces"],["Opt 12","Square: Q vs q for zero net force"]]},
 {id:"a2", title:"Tier 2 · Homework 2", icon:"2️⃣", c:["#0ea5e9","#06b6d4"], note:"Worked solutions are in the Assignments tab; ticks stay in sync.", items:[
   ["Q1","Coaxial cylindrical shells: E everywhere"],["Q2","Gauss with ρ = 50 r e^(−r)"],["Q3","Cube flux vs ∇·E estimate"],["Q4","ρ_v from a piecewise E; total Q"],
   ["Q5","Work along three paths"],["Q6","E and ρ_v from V = 2xy²z³"],["Q7","Disc on axis: V first, then E"],["Q8","V between two charged planes"]]},
 {id:"a3", title:"Tier 2 · Homework 3", icon:"3️⃣", c:["#f59e0b","#f97316"], note:"Worked solutions are in the Assignments tab; ticks stay in sync.", items:[
   ["Q1","Image method: two charges near a grounded plane"],["Q2","Total current from J = J₀ρ/a"],["Q3","Ohm's law in a wire"],["Q4","Three dielectric slabs: boundary conditions"],
   ["Q5","Free space / dielectric interface"],["Q6","Coaxial capacitor"],["Q7","Two-layer parallel-plate capacitor"]]},
 {id:"pp", title:"Tier 1 · Past papers: electrostatics questions", icon:"📄", c:["#06b6d4","#3b82f6"], note:"Every electrostatics part of the five papers, each with the full question and a full worked answer (also in the Past papers tab, paper by paper).", items:[
   ["2023 Q2","Concentric shells: E, ΔV, C, U"],
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
   ["2021-22 P3","Capacitor charged by a steady current: E(t), V(t), B(t), U(t)"],
   ["2019 Q5(b)","Slab with ρ = 10⁻⁸ cos z: E from Poisson's equation"],
   ["2019 Q6(a)","Curl of a vector field at the origin"]]},
 {id:"sl", title:"Tier 2 · Lecture 2–6 example slides", icon:"🖥", c:["#10b981","#34d399"], note:"Rework any you are unsure of from a blank page.", items:[
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
 {id:"re", title:"Tier 2 · Lecture 6e: current, capacitors & boundaries", icon:"🔌", c:["#14b8a6","#22c55e"], note:"Work each from a blank page first.", items:[
   ["6e 25–26","Copper conductor: resistance, current density and voltage"],
   ["6e 20–24","Derive J = ρv and Ohm's law R = l/σA"],
   ["6e 10–12","Dielectric inserted: battery connected vs disconnected (Q, V, E, C, U)"],
   ["6e 5","Conductor–dielectric boundary: D and E just outside a charged conductor"]]},
 {id:"h1", title:"Tier 3 · Hayt Ch 1 — coordinate conversions", icon:"📐", c:["#64748b","#334155"], note:"Optional extra practice for weak spots. More Hayt problems are in the Practice tab.", items:[
   ["1.19","Cartesian → cylindrical components","h1:2"],["1.29","a_x in spherical components","h1:4"]]},
 {id:"h2", title:"Tier 3 · Hayt Ch 2 — Coulomb & charge distributions", icon:"⚡", c:["#64748b","#334155"], note:"", items:[
   ["2.19","Finite vs infinite line charge","h2:3"],["2.23","Charged disc on axis","h2:5"],["2.25","Point + line + sheet superposition","h2:6"]]},
 {id:"h3", title:"Tier 3 · Hayt Ch 3 — Gauss & divergence", icon:"🔵", c:["#64748b","#334155"], note:"", items:[
   ["3.12","ρ_v = 120r sphere; surface charge to double D","h3:2"],["3.14","Charged cylinder vs equivalent line charge","h3:4"],["3.25","ρ_v, flux and charge from D","h3:7"]]},
 {id:"h4", title:"Tier 3 · Hayt Ch 4 — potential & energy", icon:"🔋", c:["#64748b","#334155"], note:"", items:[
   ["4.16","V(r) for three charged shells","h4:3"],["4.24","V = 80r² cos θ: E, D, ρ_v","h4:5"],["4.35","Energy of charges on a square","h4:8"]]},
 {id:"h5", title:"Tier 3 · Hayt Ch 5 — conductors, dielectrics, capacitance", icon:"🧱", c:["#64748b","#334155"], note:"", items:[
   ["5.20","Image of a point charge","h5:0"],["5.31","Dielectric boundary conditions","h5:3"],["5.36","Dielectric withdrawn, source removed","h5:5"],["5.44","Three-layer coaxial capacitor","h5:7"]]},
 {id:"h5b", title:"Tier 3 · Hayt Ch 5 — current & resistance", icon:"🔋", c:["#64748b","#334155"], note:"", items:[
   ["5.10","Steel wire with aluminium coating","h5b:1"],["5.12","Radial current between spheres","h5b:2"]]},
];
const PLAN_SKIP = "Not needed: Hayt 5.24–5.26 (semiconductors), Hayt Ch 6 (field mapping) and Hayt 5.1, 5.2, 5.4–5.9 (continuity equation, vacuum tube, nichrome table), which the slides don't teach. If later lectures cover EM waves and the Poynting vector in more depth, the past-paper wave and Poynting questions above already practise them.";
