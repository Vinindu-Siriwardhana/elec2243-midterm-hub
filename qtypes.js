// Question types seen in Homework 1–6, the lecture examples and the past papers.
// scope: "mid" = electrostatics (Lectures 0–6e) ; "late" = magnetism and EM (Lectures 7–10e). Both are in the final.
// find = keyword(s) that jump to related equations in the Equations tab
const QTYPES = [
{
 id:"q-vec", icon:"🧭", scope:"mid", freq:2, title:"Vector geometry & unit vectors",
 sources:["HW1 Q1 – unit vectors from centroid of an equilateral triangle to its vertices and to the side midpoints","HW1 Q2 – which point is the endpoint of a given vector","HW1 Q9 – are A+B+C=0 (or +D) vectors coplanar?"],
 steps:["Place the origin and axes to exploit symmetry (centroid at 0, one vertex on +y).","Vertices of an equilateral triangle: angles 90°, 210°, 330° → $\\hat a=(\\cos\\theta,\\sin\\theta)$.","Side-normals point opposite the vertices: angles 270°, 30°, 150°.","Coplanarity: 3 vectors summing to 0 must be coplanar; 4 need not be."],
 find:"unit vector"
},
{
 id:"q-coul", icon:"⚔️", scope:"mid", freq:4, title:"Net Coulomb force on a charge",
 sources:["HW1 Q5 – force on corner charge of a cube with Q at all 8 corners","HW1 Q10 – 3 charges on an equilateral triangle: which feels the largest force?","HW1 Q11 – hydrogen atom: $F_C$ vs $F_G$, orbital speed from $F_C=mv^2/r$","HW1 Q12 – square with Q, q at alternating corners: find Q/q for zero force","2019-20 Q1 – forces on particles along an axis, then at 60°","2023 MCQ 1.2 – double distance → ÷4"],
 steps:["Draw every pairwise force with direction (like repel, unlike attract).","Write each as $\\vec F=\\frac{Q_1Q_2}{4\\pi\\epsilon_0}\\frac{\\vec R}{R^3}$ in components.","Sum components, then magnitude/angle.","Equilibrium problems: set the net component along the line of symmetry to zero. (Square: $Q=-2\\sqrt2\\,q$.)"],
 find:"coulomb"
},
{
 id:"q-pts", icon:"📍", scope:"mid", freq:5, title:"Electric field at a point from point charges",
 sources:["HW1 Q3 – field experienced by $q$ and $-4q$ near $+Q$ (qualitative)","HW1 Q4 – $\\vec E$ at P from 2 charges in 3-D; point on y-axis where $E_x=0$","HW1 Q6 – find $Q$ from $E$ at distance (field points toward origin ⇒ $Q<0$)","2024 B1 – $+5\\,$nC and $-45\\,$nC, field at P 3 m from $Q_1$","2024 MCQ 1 – two equal charges, points on the perpendicular bisector","2021-22 P1 = Lecture 2 example – 11 equal charges on a circle, E and V at centre","Lecture 2 B1–B4 – 4 charges on a square, 8 on a circle, ring: E at height $s$ above the centre"],
 steps:["Field is independent of the test charge: $E=kQ/R^2$ regardless of $q$.","Use $\\vec R=\\vec r_{field}-\\vec r_{source}$ (source → field point).","Sum as vectors; use symmetry to cancel components.","“Where is E=0?”: set the component equation = 0 and solve (quadratic in position).","Circle of equal charges with a missing one: $\\vec E_{centre}=-\\vec E_{missing}$ (complete ring gives 0)."],
 find:"field of a point charge"
},
{
 id:"q-dip", icon:"🧲", scope:"mid", freq:3, title:"Dipoles, quadrupoles & far-field expansions",
 sources:["HW1 Q7 – α particle passing through the centre of a molecule (two nuclei): where is the force max?","HW1 Q8 – linear quadrupole $(-q,+2q,-q)$: show $E=\\frac{3Q}{4\\pi\\epsilon_0z^4}$, $Q=2qa^2$","2019-20 Q2(a) – dipole moment $p$ → charge separation, max torque","2022 MCQ 1.4 – dipole/coil in a field: torque vs net force","Lecture 2 A1/A2 – dipole field on its bisector, then the far-field limit"],
 steps:["Superpose individual charges on the axis, then Taylor expand for $z\\gg a$: $(1\\pm a/z)^{-2}\\approx1\\mp2a/z+3a^2/z^2$.","Dipole field ∝ $1/z^3$, quadrupole ∝ $1/z^4$.","Perpendicular-bisector field of 2 charges: $E=\\frac{2kQ\\,y}{(y^2+(d/2)^2)^{3/2}}$ → maximum at $y=\\frac{d}{2\\sqrt2}$ (HW1 Q7).","Uniform field: net force 0, torque $\\vec p\\times\\vec E$."],
 find:"dipole"
},
{
 id:"q-cont", icon:"〰️", scope:"mid", freq:2, title:"Field from continuous charge (integrate $dq$)",
 sources:["Lecture 3 – rod (finite → infinite), ring, disk, infinite plane","Lecture 3 – E midway between two opposite infinite lines (line-charge dipole, ∝ 1/r²)","Lecture 3 – uniformly charged spherical shell by direct integration (E = 0 inside)","2022 P2 – two perpendicular infinite sheets (superposition)"],
 steps:["Pick $dq=\\lambda\\,dl$ / $\\sigma\\,dS$ / $\\rho\\,dV$.","Write $d\\vec E=\\frac{dq}{4\\pi\\epsilon_0}\\frac{\\vec R}{R^3}$ and cancel components by symmetry.","Parameterise with an angle or $z$, integrate.","Check limits: $L\\to\\infty$ (line), $a\\to\\infty$ (sheet), $z\\gg a$ (point charge)."],
 find:"continuous"
},
{
 id:"q-gs", icon:"🔵", scope:"mid", freq:5, title:"Gauss's law – spherical symmetry",
 sources:["HW2 optional Q2 – thick spherical shell with $\\rho_v=3R\\times10^{-4}$: total charge","HW2 optional Q4 – two concentric shells $Q_1$, $Q_2$: E in all three regions","2023 Q2 – concentric conducting shells ($Q$, $-Q$): E in 3 regions, ΔV, capacitance, energy","2023 Q3 – non-conducting sphere $\\rho=ar$: E inside, outside, potential at surface","2022 P3 – uniform sphere with hollow at offset $a$: E and V at hollow centre","2024 B6 (bonus) – same cavity, prove field uniform in cavity"],
 steps:["Gaussian sphere radius $r$: $E\\,4\\pi r^2=Q_{enc}/\\epsilon_0$.","Non-uniform: $Q_{enc}=\\int_0^r\\rho(r')4\\pi r'^2dr'$ (for $\\rho=ar$: $\\pi ar^4$ ⇒ $E=\\frac{ar^2}{4\\epsilon_0}$ inside).","Potential: integrate $-\\int E\\,dr$ from ∞ inward, region by region.","Cavity: full sphere $+$ sphere of $-\\rho$ ⇒ $\\vec E=\\frac{\\rho}{3\\epsilon_0}\\vec a$ inside, and $V$ by superposing $V=\\frac{\\rho}{6\\epsilon_0}(3R^2-r^2)$ pieces."],
 find:"spherical"
},
{
 id:"q-gc", icon:"🥫", scope:"mid", freq:3, title:"Gauss's law – cylindrical symmetry",
 sources:["HW2 Q1 – coaxial cylindrical shells $\\rho_{s1}$, $\\rho_{s2}$: E everywhere and a plot of $|E|$","HW2 Q2 – $\\rho_v=50\\,r\\,e^{-r}$ in cylindrical coordinates","HW2 optional Q5 – thick cylindrical shell $1<r<3$ m","Lecture 4 – infinite rod with uniform charge, E outside","2021-22 P2 = Lecture 4 Problem 2 – coaxial cylindrical shells $\\rho_{s1},\\rho_{s2}$: E everywhere, plot $|E|(r)$, condition for $E=0$ outside","2024 MCQ 2 – concentric charged cylindrical sheets, flux density inside","Lecture 4 – infinite line charge"],
 steps:["Coaxial Gaussian cylinder of length $L$: $E\\,2\\pi rL=Q_{enc}/\\epsilon_0$.","Surface charge $\\rho_s$ at radius $a$: $\\lambda=2\\pi a\\rho_s$ ⇒ $E=\\rho_sa/(\\epsilon_0r)$.","Inside all shells ⇒ $E=0$. Outside ($E=0$) ⇒ $\\rho_{s1}a+\\rho_{s2}b=0$.","Sketch $|E|$: jumps by $\\rho_s/\\epsilon_0$ at each shell."],
 find:"cylindrical"
},
{
 id:"q-gp", icon:"▭", scope:"mid", freq:3, title:"Infinite sheets & parallel conducting plates",
 sources:["2022 P2 – two infinite sheets $+\\sigma$, $-\\sigma$ meeting at 90°: E in each of 4 regions","2024 B2(a)-(d) – prove $\\sigma_2=-\\sigma_3$, $\\sigma_1=\\sigma_4$; plate A charged, B neutral/grounded; 3 plates with B, C grounded (distances $2d$ and $d$)","2019-20 Q2(d) – parallel-plate capacitor after source removed","Lecture 4 Problem 1 – thick slab of uniform ρ: $E=\\rho z/\\epsilon_0$ inside, $\\rho D/2\\epsilon_0$ outside"],
 steps:["Each sheet contributes $\\sigma/2\\epsilon_0$ on both sides; superpose with directions (sheets at 90° ⇒ add as vectors).","Conductor plates: $E=0$ inside metal ⇒ pillbox ⇒ facing charges equal & opposite.","Isolated pair: outer charges equal $=q_{total}/2S$. Grounded plate: its outer-face charge is 0 and $V=0$.","3-plate grounded problem: $V_{AB}=V_{AC}$ ⇒ $E_{AB}(2d)=E_{AC}(d)$ ⇒ $E_{AC}=2E_{AB}$ ⇒ $q_C=2q_B$ and $q_B+q_C=-q$ ⇒ $q_B=-\\frac13 q$, $q_C=-\\frac23 q$ (closer plate takes more)."],
 find:"conductor"
},
{
 id:"q-pot", icon:"🔋", scope:"mid", freq:4, title:"Potential, potential difference & potential energy",
 sources:["HW2 Q6 – $\\vec E$ and $\\rho_v$ from $V=2xy^2z^3$","HW2 Q7 – charged disc on its axis: V first, then E","HW2 Q8 – $V_{AB}$, $V_{BC}$, $V_{AC}$ between two charged planes","2023 Q2(b) – voltage between concentric shells","2022 MCQ 1.2 – negative charge: moves low→high $V$, high→low $U$","2021-22 P1(2) – V at centre of ring of charges (scalar sum)","2023 Q3 – potential at the surface of a non-uniform sphere"],
 steps:["$V_{AB}=-\\int_B^A\\vec E\\cdot d\\vec l$ – integrate along a radial path, piecewise.","Point charges: $V=\\sum kQ_i/R_i$ – scalars, signs matter.","Charge sign: positive moves high→low $V$ spontaneously; negative the opposite.","$\\vec E=-\\nabla V$ for the reverse direction."],
 find:"potential"
},
{
 id:"q-cap", icon:"⚡", scope:"mid", freq:3, title:"Capacitance & stored energy",
 sources:["HW3 Q6 – coaxial capacitor partly filled with $\\epsilon_r=4$","HW2 optional Q3 – cell-membrane spherical capacitor: C and stored energy","2023 Q2(c),(d) – capacitance & energy of spherical shells, $u=\\frac12\\epsilon_0E^2$","2019-20 Q2(c) – energy and energy density of a charged conducting sphere ($C=4\\pi\\epsilon_0R$)","2019-20 Q2(d) – parallel plates: $C$, $Q$, $E$ via Gauss","2021-22 P3 – capacitor charged by steady current: $E(t),V(t),U(t)$","Lecture 5 example – conducting shell with charge Q: V at surface, C, energy (two ways)","Lecture 6 examples – spherical capacitor filled with dielectric; two dielectric layers"],
 steps:["Get $E$ by Gauss ⇒ $V=-\\int E\\,dl$ ⇒ $C=Q/V$.","Energy two ways: $\\frac12CV^2$ or $\\int\\frac12\\epsilon_0E^2dV$ — they must agree (use as check).","Energy density at a surface: $u=\\frac12\\epsilon_0(\\sigma/\\epsilon_0)^2$ (just outside).","Charging by current $I$: $Q=It$, $E=Q/(\\epsilon_0A)$, $U=\\frac{Q^2}{2C}$."],
 find:"capacitor"
},
{
 id:"q-ops", icon:"∇", scope:"mid", freq:3, title:"Vector calculus identities & ∇ operators",
 sources:["2024 MCQ 3 – which identity is always zero (∇·(∇×V), ∇×(∇V) …)","2019-20 Q6(a) – evaluate ∇×A at the origin","2022-23 MCQs – scalar vs vector quantity","Lecture 4/5 – derive $\\nabla\\cdot\\vec E=\\rho/\\epsilon_0$"],
 steps:["Memorise: $\\nabla\\times\\nabla f=0$ and $\\nabla\\cdot(\\nabla\\times\\vec A)=0$.","Check types: ∇· of a vector is a scalar, ∇ of a scalar is a vector, so $\\nabla\\cdot(\\nabla\\cdot\\vec A)$ or $\\nabla\\times f$ make no sense.","Curl determinant: expand along first row carefully.","Use the correct coordinate form for $\\nabla\\cdot$ in cylinder/sphere."],
 find:"divergence"
},
{
 id:"q-pois", icon:"🧮", scope:"mid", freq:1, title:"Poisson's equation from given $\\rho(z)$",
 sources:["2019-20 Q5(b) – slab $\\rho=\\rho_0\\cos z$ for $-\\pi/2<z<\\pi/2$: find $E$ using symmetry ($E=0$ at $z=0$)"],
 steps:["1-D Gauss: $dE_z/dz=\\rho/\\epsilon_0$ ⇒ integrate.","Use symmetry for the constant ($E(0)=0$).","Outside the slab $E$ is constant (equal to its value at the slab edge)."],
 find:"poisson"
},
{
 id:"q-conc", icon:"❓", scope:"mid", freq:4, title:"Conceptual / multiple-choice",
 sources:["2022 MCQ 1.1 Gauss flux with no enclosed charge","2022 MCQ 1.2 negative charge energy","2023 MCQ 1.1-1.5 Maxwell's equations, force scaling, field lines, Faraday, vector vs scalar","2024 MCQ 1-5 bisector field, concentric cylinders, identities, sources of B, wave direction"],
 steps:["Flux depends only on enclosed charge (not outside charges or shape).","Field lines: electric start/end on charges; magnetic lines form closed loops.","Know the 4 Maxwell equations by name and what each says.","Scalar: charge, potential. Vector: field, force, current density."],
 find:"maxwell"
},
{
 id:"q-qfromE", icon:"🔍", scope:"mid", freq:2, title:"Find the charge from a given field",
 sources:["HW2 Q3 – cube $1<x,y,z<1.2$: flux vs the $\\nabla\\cdot\\vec E$ estimate","HW2 Q4 – $\\rho_v$ everywhere from a piecewise radial $\\vec E$, then total Q","Lecture 4 Problem 3 – total charge in a 4 m cube from a z-directed $\\vec E$","Lecture 4 example – approximate charge in a $10^{-9}$ m³ volume at the origin","Lecture 4/5 – “two types of problems”: E from charges, and charges from E"],
 steps:["Integral route: $Q=\\epsilon_0\\oint\\vec E\\cdot d\\vec S$, adding only the faces the field crosses (watch the outward-normal signs).","Differential route: $\\rho=\\epsilon_0\\nabla\\cdot\\vec E$, then $Q=\\int\\rho\\,dV$.","Tiny volume: $Q\\approx(\\nabla\\cdot\\vec D)\\,\\Delta v$ evaluated at that point.","Both routes must give the same Q (divergence theorem), so use one to check the other."],
 find:"charge from a given field"
},
{
 id:"q-work", icon:"🛤️", scope:"mid", freq:2, title:"Work along a path & potential from graphs",
 sources:["HW2 Q5 – work carrying 2 μC along a parabola, a hyperbola and a line (all equal)","Lecture 5 example – work carrying 2 C from B(1,0) to A(0.8,0.6) along a line, an L-path and an arc (all equal)","Lecture 5 example – sketch $E(x)$ from a $V(x)$ plot; where is the charge?","Lecture 5 – equipotential surfaces, potential landscape","2022 MCQ 1.2 – which way a negative charge moves"],
 steps:["Write $\\vec E\\cdot d\\vec l=E_xdx+E_ydy$; on each path segment substitute the path equation (e.g. $y=0.6$, $dy=0$).","Electrostatic field ⇒ path-independent, so pick the simplest path to check.","$E_x=-dV/dx$: draw slopes. A corner in $V$ ⇒ sheet of charge with $\\sigma=\\epsilon_0\\Delta E$.","$W_{ext}=q(V_A-V_B)$; field lines are perpendicular to equipotentials."],
 find:"path"
},
{
 id:"q-img", icon:"🪞", scope:"mid", freq:1, title:"Method of images & conductors",
 sources:["HW3 Q1 – two point charges near the grounded plane $x=0$: $\\rho_s$ on the plane","Lecture 6 example – line charge 30 nC/m, 3 m above earth: E and σ on the ground 2 m from the base","Lecture 6 – electrostatic induction, Faraday cage, equivalent sources","2024 B2 – conducting plates (see Infinite sheets card)"],
 steps:["Replace the grounded plane by an image charge of opposite sign mirrored below it.","Add the fields of the real and image charges. On the plane only the normal part survives.","Surface charge: $\\sigma=\\epsilon_0E_n$ (negative under a positive charge).","Answers are valid only on the real side of the plane."],
 find:"images"
},
{
 id:"q-capmod", icon:"🔧", scope:"mid", freq:2, title:"Changing a capacitor (slab, dielectric, battery on/off)",
 sources:["HW3 Q7 – two-layer parallel-plate capacitor ($\\epsilon_r=2$ and 6): C, E, D in each layer","Lecture 6 example – conducting slab of thickness 0.6d inserted (isolated): C × 2.5, energy × 0.4","Lecture 6 – dielectric inserted with battery connected (V fixed) vs disconnected (Q fixed)","Lecture 6 – two dielectric layers parallel to the plates; Teflon slab in a field (boundary conditions)"],
 steps:["First decide what is fixed: isolated ⇒ Q fixed; battery connected ⇒ V fixed.","Find the new C (metal slab: $\\epsilon_0A/(d-t)$; dielectric: ×$\\epsilon_r$; layers: series).","Q fixed: $V=Q/C$, $W=Q^2/2C$. V fixed: $Q=CV$, $W=\\frac12CV^2$.","In layers $D$ is the same everywhere, so $E_i=D/\\epsilon_i$."],
 find:"capacitor"
},
{
 id:"q-bc", icon:"🧱", scope:"mid", freq:2, title:"Dielectric boundary conditions & refraction",
 sources:["HW3 Q4 – three dielectric slabs ($\\epsilon_r=3,5,7$): angle of $\\vec E$ in each layer","HW3 Q5 – free space / $\\epsilon_r=4$ interface: $\\vec E_2$, $\\vec D_2$ and the angles from the normal","Lecture 6 slide 34 – given $\\vec E_1$, find $\\vec E_2$, $\\theta_1$ and $\\theta_2$","Lecture 6 slides 35–36 – Teflon slab in a uniform field: D, E and P everywhere","Hayt 5.31 – interface $x=0$ between $\\epsilon_{r1}=3$ and $\\epsilon_{r2}=5$"],
 steps:["Find the interface normal $\\hat n$ and split $\\vec E_1$ into normal and tangential parts.","Tangential: copy across, $E_{2t}=E_{1t}$.","Normal: $D_{2n}=D_{1n}-\\rho_s$; with no free charge $E_{2n}=\\frac{\\epsilon_1}{\\epsilon_2}E_{1n}$.","Recombine. Angles from the normal obey $\\frac{\\tan\\theta_1}{\\tan\\theta_2}=\\frac{\\epsilon_1}{\\epsilon_2}$.","Then $\\vec D=\\epsilon\\vec E$ and $\\vec P=\\vec D-\\epsilon_0\\vec E=\\epsilon_0(\\epsilon_r-1)\\vec E$."],
 find:"boundary"
},
{
 id:"q-res", icon:"🔌", scope:"mid", freq:1, title:"Current, current density & resistance (Lecture 6e)",
 sources:["HW3 Q2 – total and average current from $\\vec J=J_0\\frac{\\rho}{a}\\hat z$","HW3 Q3 – voltage drop along a 100 m wire from $J$ and $\\sigma$","Lecture 6e slides 25–26 – copper conductor (1.524 cm diameter, 365.76 m, 50 A, $\\sigma=5.8\\times10^7$ S/m): find R, J and the voltage","Lecture 6e slides 18–24 – $I=dQ/dt$, $J=I/A$, $J=\\rho v$, $\\vec v=-\\mu\\vec E$, Ohm's law","Hayt 5.10, 5.12, 5.13, 5.14 – composite wires, radial flow between spheres, hollow tube, $E$ from $J$","No past-paper question yet: new this year, so expect something close to the slide example"],
 steps:["Cross-section first: $A=\\pi r^2$ (use the radius, not the diameter). Annulus: $\\pi(r_{out}^2-r_{in}^2)$.","$R=l/(\\sigma A)$, $J=I/A$, $V=IR$ (or $V=El$ with $E=J/\\sigma$). Check units: S/m, A/m², V.","Different materials carrying the same voltage are in parallel: add $\\sigma_iA_i$, then $E=I/\\sum\\sigma_iA_i$ is the same in every layer.","Radial flow (coax, spheres): $J=I/(\\text{area at }r)$, $E=J/\\sigma(r)$, then integrate $E$ for $V$ and divide by $I$ for $R$.","Electrons: $\\vec v$ is opposite $\\vec E$, but conventional current follows the positive charge, so $\\vec J\\parallel\\vec E$."],
 find:"resistance"
},
{
 id:"q-lor", icon:"🌀", scope:"late", freq:2, title:"Charged particles in B: selector, circles, Hall effect",
 sources:["HW4 Q1 – Ar ions: velocity selector ($v=E/B$), semicircle radius and time, isotope separation","HW4 Q2 – Hall effect in a copper strip: drift speed, $E_H$, $V_H$, which edge is higher","HW4 optional Q1 – electron at 30° to $\\vec B$: helix radius, period, pitch","Lecture 7 slides 27–28 – velocity selector; Hall-effect sign of carriers"],
 steps:["Write $\\vec F=q(\\vec E+\\vec v\\times\\vec B)$ and do the cross product with unit vectors — the sign of $q$ matters.","Undeflected ⇒ $qE=qvB$ ⇒ $v=E/B$.","Circle: $qvB=mv^2/r$ ⇒ $r=mv/qB$, $T=2\\pi m/qB$ (speed-independent). Helix: only $v_\\perp$ circles.","Hall: $v_d=J/ne$, then $E_H=v_dB$, $V_H=E_Hw$; find which edge the carriers pile up on."],
 find:"lorentz"
},
{
 id:"q-fw", icon:"🔩", scope:"late", freq:3, title:"Forces and torques on wires and loops",
 sources:["HW4 Q3 – bent wire A→B→C in uniform B; closing it into a triangle (zero force, zero torque)","HW4 Q4 – three wires on a triangle: force per length on each, total = 0","HW5 Q5 – two parallel wires: force per length and direction","HW4 optional Q2 – rectangular loop next to a long wire (net attraction)","HW4 optional Q4 – torque on a loop, $\\vec\\tau=\\vec\\mu\\times\\vec B$ vs $\\sum\\vec r\\times\\vec F$","HW5 optional Q2 – square loop under a long wire","2022 MCQ 1.3 – parallel wires attract; 2022 MCQ 1.4 – coil in uniform B rotates but does not move","2019-20 Q6(b) – work and power to move a wire in $B=6\\times10^{-4}e^{-0.2x}\\hat a_y$"],
 steps:["Straight segment, uniform $\\vec B$: $\\vec F=I\\vec L\\times\\vec B$; only the end points matter.","Two long wires: $F/L=\\mu_0I_1I_2/2\\pi d$; parallel attract, antiparallel repel. Add the pair forces as vectors.","Non-uniform field (loop beside a wire): integrate $I\\,d\\vec l\\times\\vec B$ side by side; near side wins.","Loop: $\\vec\\mu=NIA\\hat n$, $\\vec\\tau=\\vec\\mu\\times\\vec B$, net force 0 in a uniform field.","Work to move: $W=-\\int\\vec F_m\\cdot d\\vec l$ (negative if the field pushes the wire along)."],
 find:"parallel wires"
},
{
 id:"q-bs", icon:"➰", scope:"late", freq:3, title:"Biot–Savart: segments, loops, arcs",
 sources:["2024 B3 – finite straight conductor, $B$ at P: derive $\\frac{\\mu_0I}{4\\pi r}(\\cos\\theta_1-\\cos\\theta_2)$","HW4 Q5 – rectangle (10 μT) vs the same wire bent into a circle (8.5 μT)","HW4 Q6 – Bohr orbit as a current loop; $B$ at the proton; Bohr magneton","HW4 optional Q5 – two concentric arcs ($\\mu_0I\\phi_0/4\\pi R$ each)","HW5 Q1 – infinite wire with a semicircular bump: $\\mu_0I/4R$","HW5 Q2 – Helmholtz coil: on-axis field and its uniformity","HW4 optional Q3 – Earth as a magnetic dipole","Lecture 7/7e – coil centre and axis, finite wire, current sheet by integration"],
 steps:["Split the current into pieces; pieces pointing at P ($d\\vec l\\parallel\\hat R$) contribute zero.","Use the known building blocks: segment $\\frac{\\mu_0I}{4\\pi r}(\\cos\\theta_1-\\cos\\theta_2)$, arc $\\frac{\\mu_0I\\phi_0}{4\\pi R}$, loop axis $\\frac{\\mu_0IR^2}{2(R^2+z^2)^{3/2}}$.","Get each direction by the right-hand rule, then add as vectors (opposite senses subtract).","Check limits: long segment → $\\mu_0I/2\\pi r$; full circle → $\\mu_0I/2R$."],
 find:"biot"
},
{
 id:"q-amp", icon:"⭕", scope:"late", freq:4, title:"Ampère's law: wires, coax, holes, solenoids, sheets",
 sources:["HW5 Q3 – coaxial cable $a,b,c$: B in all four regions","HW5 Q4 – conductor with an off-centre hole: $B=\\mu_0Jd/2$ at P","HW5 optional Q4 – cylinder $3a$ with a hole $a$: $H$ on a plane and uniform $H$ inside the hole","2022 P4 · 2023 Q4 – parallel planes with $\\pm K_0$: $H=K_0$ between, 0 outside","2021-22 P6 – coax filled with two permeabilities","2019-20 Q3(a) – five-layer solenoid at its centre","Lecture 8 – wire of radius $R$, ideal solenoid, current sheet, slab via $\\nabla\\times\\vec B=\\mu_0\\vec J$"],
 steps:["Use symmetry to fix the direction of $\\vec B$ (circles round an axis; parallel to a sheet).","Choose a loop on which $B$ is constant or perpendicular to $d\\vec l$; $\\oint\\vec B\\cdot d\\vec l=B\\times$length.","Find $I_{enc}$ region by region (uniform $J$: scale by area).","Holes: superpose $+J$ (solid) and $-J$ (hole) ⇒ uniform $\\frac{\\mu_0}{2}\\vec J\\times\\vec d$."],
 find:"ampère"
},
{
 id:"q-mbc", icon:"🧱", scope:"late", freq:3, title:"Magnetic materials, boundaries and magnetic circuits",
 sources:["HW6 Q1 – hysteresis loop: remanence, coercivity, saturation (MCQ)","HW5 Q6 – three media: $\\tan\\theta_4=\\frac{\\mu_3}{\\mu_1}\\tan\\theta_1$, independent of $\\mu_2$","HW5 Q7 – C-core electromagnet with an air gap: $B\\approx\\mu_0Ni/d$","HW5 optional Q1 – slab in a normal field; permanent magnet $H_2=H_1-M_i$","HW5 optional Q3 – refraction of $\\vec H$ at the $xy$-plane","2019-20 Q4 – identify para/ferro/antiferro/ferrimagnets; soft vs hard; Curie point; mmf of a gapped iron ring","2021-22 P6 – coax with two media: $B$ continuous (normal), $H$ jumps","Lecture 9e – angle between $\\vec H_1$ and the normal ($\\mu_{r1}=2$, $\\mu_{r2}=8$)"],
 steps:["$\\vec B=\\mu_0(\\vec H+\\vec M)=\\mu\\vec H$; Ampère with free current only: $\\oint\\vec H\\cdot d\\vec l=I_{free}$.","Boundary: $B_{1n}=B_{2n}$, $H_{1t}-H_{2t}=J_s$ ⇒ $\\tan\\theta_1/\\tan\\theta_2=\\mu_1/\\mu_2$.","Magnetic circuit: same $\\Phi$ (same $B$ if same area) everywhere; $NI=\\sum H_kl_k$; the air gap needs most of the mmf.","Loop shape: narrow loop = soft (transformers), wide loop = hard (permanent magnets, storage)."],
 find:"magnetic boundary"
},
{
 id:"q-disp", icon:"🔁", scope:"late", freq:3, title:"Displacement current and the Ampère–Maxwell law",
 sources:["2021-22 P3 – capacitor charged by steady $I$: $E(t)$, $V(t)$, $B(t)$, $U(t)$","2022 MCQ 1.7 – sense of $\\vec B$ tells whether $Q$ is growing","2024 MCQ 4 – $B$ is produced by conduction and displacement current","HW6 optional Q7 – $\\vec J_d=\\partial\\vec D/\\partial t$; find $b$ from $\\nabla\\times\\vec H=\\vec J_d$","Lecture 9e/10 – wire with a gap; finite wire with charges at the ends"],
 steps:["$\\oint\\vec B\\cdot d\\vec l=\\mu_0I_{enc}+\\mu_0\\epsilon_0\\,d\\Phi_E/dt$; in a gap there is no conduction current.","Capacitor: $E=Q/\\epsilon_0\\pi R^2$ ⇒ $B(r)=\\mu_0Ir/2\\pi R^2$ inside, $\\mu_0I/2\\pi r$ outside.","$\\vec B$ circulates round $\\partial\\vec E/\\partial t$ by the right-hand rule (same sense as round the wire while charging)."],
 find:"displacement"
},
{
 id:"q-far", icon:"🔄", scope:"late", freq:4, title:"Faraday's law, EMF, generators",
 sources:["2021-22 P4 = HW6 Q3 – rotating coil generator: peak current, orientation, power","HW6 Q2 – loop with a resistor in $B=0.2\\cos120\\pi t$: $V_{ab}(t)$, $I(t)$","HW6 optional Q6 – evaluate both sides of Faraday's law around a ring","2019-20 Q3(b) – emf in a small coil from a shrinking solenoid current","2019-20 Q6(c) – rotating square coil: 33.9 V, AC at 25 Hz","2022 MCQ 1.5–1.6 – Lenz direction; rod on rails","Lecture 10 – sliding bar: $\\mathcal E=Blv$, force, power; AC generator"],
 steps:["$\\mathcal E=-N\\,d\\Phi/dt$ with $\\Phi=\\int\\vec B\\cdot d\\vec A$ (often $BA\\cos\\theta$).","Ask what changes: $B$ (transformer emf), area (sliding bar, $Blv$) or angle (generator, $NBA\\omega\\sin\\omega t$).","Direction from Lenz: the induced current opposes the change in flux.","Circuit: $I=\\mathcal E/R$; power $\\mathcal E^2/R$, averaged: $\\frac{\\mathcal E_0^2}{2R}$."],
 find:"faraday"
},
{
 id:"q-ind", icon:"🌀", scope:"late", freq:3, title:"Self and mutual inductance",
 sources:["2023 B1 = HW6 Q4 – two attached solenoids: $L=\\mu_0\\pi n^2\\ell(b^2+15a^2)$","2019-20 Q3(c) – coplanar coils: $M=\\mu_0\\pi N_1N_2R_2^2/2R_1$ (8.9 mH)","HW6 Q5 – wire through a toroid: $V_{emf}=5.5\\sin377t$ V","HW6 optional Q8 – wire and circular loop: $M=\\mu_0(d-\\sqrt{d^2-a^2})$","Lecture 10e – solenoid $L=\\mu_0n^2l\\pi R^2$; energy $\\frac12LI^2$; transformer"],
 steps:["Assume a current $I$ and find $B$ everywhere (Ampère or Biot–Savart).","Flux linkage: add $N\\Phi$ over every turn (each turn links all the flux inside it).","$L=N\\Phi/I$ or $M=N_2\\Phi_{21}/I_1$; or from energy $L=2W_m/I^2$.","emf $=-L\\,dI/dt$ or $-M\\,dI_1/dt$."],
 find:"inductance"
},
{
 id:"q-mag", icon:"🧲", scope:"late", freq:4, title:"Parallel planes and coax: B, energy, inductance",
 sources:["2022 P4 · 2023 Q4 – parallel planes with surface currents $K_0$: energy per length, flux through rectangle, inductance/length","2021-22 P6 – coax with two magnetic media: B, energy/length"],
 steps:["Ampère with symmetry: planes ⇒ $H=K_0$ between, 0 outside; coax $B=\\mu I/2\\pi r$.","Energy: $W=\\int\\frac{B^2}{2\\mu}dV$ ⇒ $L=2W/I^2$ (matches $L=\\Phi/I$).","Planes: $W=\\frac12\\mu_0K_0^2wd$, $\\Phi=\\mu_0K_0d$, $L'=\\mu_0d/w$."],
 find:"inductance"
},
{
 id:"q-pnt", icon:"🌊", scope:"late", freq:5, title:"Capacitor + Poynting vector",
 sources:["2022 P5 · 2023 Q5 · 2024 B4 – <b>identical question three years in a row</b>","2021-22 P3 – field, potential, B and energy of a charging capacitor"],
 steps:["$E=\\frac{Q}{\\epsilon_0\\pi R^2}$ (axial); $B$ from Ampère with displacement current: $B=\\frac{\\mu_0 I r}{2\\pi R^2}$ (azimuthal).","$\\vec S=\\frac1{\\mu_0}\\vec E\\times\\vec B$ points radially <b>inward</b>.","Integrate over the side area $2\\pi Rh$: $P=\\frac{QIh}{\\epsilon_0\\pi R^2}=\\frac{d}{dt}\\left(\\frac12\\epsilon_0E^2\\pi R^2h\\right)$."],
 find:"poynting"
},
{
 id:"q-wave", icon:"📡", scope:"late", freq:5, title:"Plane-wave analysis",
 sources:["2022 P6 – $E=3\\cos(2\\pi\\!\\times\\!10^8t-\\frac{2\\pi}{3}x)$: f, λ, direction of propagation, B direction","2021-22 P5 · 2024 MCQ 5 – direction from $B$, full $\\vec E$, time-average energy flux","2024 B5 – wave in ferrite ($\\kappa_m=1000,\\kappa_e=10$): speed, λ, $\\vec B$, λ back in vacuum","2023 Q6 – circular polarisation: verify wave equation, find $B$, instantaneous $\\vec S$","2022 MCQ 1.8 – $\\vec E$ from $\\vec B$","2019-20 Q5(a) – H from E and power on a dish"],
 steps:["Read $\\omega$ and $k$ off the argument: $f=\\omega/2\\pi$, $\\lambda=2\\pi/k$, $v=\\omega/k$.","$(kx-\\omega t)$ ⇒ travels $+x$; $(kx+\\omega t)$ ⇒ $-x$.","Direction: $\\vec E\\times\\vec B\\parallel\\vec k$ (fixes the sign of $B$). $B=E/v$.","Medium: $v=c/\\sqrt{\\kappa_m\\kappa_e}$; frequency unchanged when leaving, wavelength changes.","Average intensity: $\\langle S\\rangle=\\frac{E_0^2}{2\\eta}=\\frac{E_0B_0}{2\\mu_0}$."],
 find:"wave"
},
{
 id:"q-mono", icon:"🧿", scope:"late", freq:4, title:"Magnetic monopoles in Maxwell's equations (bonus)",
 sources:["2022, 2023 and 2024 bonus – the same question every year"],
 steps:["$\\nabla\\cdot\\vec B=\\mu_0\\rho_m$ and $\\nabla\\times\\vec E=-\\mu_0\\vec J_m-\\partial\\vec B/\\partial t$; the other two are unchanged.","Lorentz: $\\vec F=q_e(\\vec E+\\vec v\\times\\vec B)+q_m(\\vec B-\\vec v\\times\\vec E/c^2)$.","Justify the minus sign: the divergence of Faraday's law must give $\\nabla\\cdot\\vec J_m+\\partial\\rho_m/\\partial t=0$."],
 find:"maxwell"
},
];

// Paper-by-paper map: where each topic appeared
const PAPERS = [
 {name:"Lecture 6e (22 Oct)", note:"Last lecture before the midterm: current, resistors, capacitor recap", items:[
   ["Slide 2","Midterm Thu 29 Oct, in class. One A4 sheet, handwritten, one side. Standard calculator."],["3–5","Conductor summary, Gauss in dielectrics, boundary-condition table"],["6","Image theory"],["8–15","Capacitors: parallel plate, dielectric, battery connected vs disconnected, 2-layer, spherical"],["16","Circuit elements: dv = R di, dq = C dv"],["17–24","Resistors: current, J, J = ρv, mobility, Ohm's law"],["25–26","Copper conductor example: R, J, V"]]},
 {name:"Lectures 7–10e (Oct–Nov)", note:"Everything after the midterm: all of it is in the final", items:[
   ["7 / 7e","Lorentz force, velocity selector, Hall effect, force on wires, torque μ×B, Biot–Savart (loop, finite wire, current sheet)"],["8 / 8e","Ampère's law, wire of radius R, solenoid, current sheet, curl and Stokes, slab example"],["9 / 9e","Dielectrics recap, magnetisation, para/dia/ferro, hysteresis, H, magnetic boundary conditions, displacement current"],["10 / 10e","Faraday and Lenz, sliding bar, AC generator, mutual and self inductance, energy ½LI², transformer, travelling waves"]]},
 {name:"HW 6 (due 26 Nov)", note:"Lectures 9–10e – materials, Faraday, inductance", items:[
   ["Q1","Hysteresis loop MCQ"],["Q2","Loop + resistor in B = 0.2 cos 120πt"],["Q3","AC generator (= May 2022 P4)"],["Q4","Two attached solenoids (= 2023 B1)"],["Q5","Wire through an iron toroid: V_emf"],["Opt 6–8","Faraday around a ring, displacement current, M of wire and loop"]]},
 {name:"HW 5 (due 19 Nov)", note:"Lectures 7–9 – Biot–Savart, Ampère, magnetic media", items:[
   ["Q1–2","Semicircle bump; Helmholtz coil"],["Q3–4","Coax by Ampère; conductor with an off-centre hole"],["Q5","Force between parallel wires"],["Q6–7","Three media refraction; C-core electromagnet"],["Opt 1–4","Slab in H, loop under a wire, H refraction, hollow cylinder"]]},
 {name:"HW 4 (due 10 Nov)", note:"Lecture 7 – magnetic force, torque, Biot–Savart", items:[
   ["Q1–2","Velocity selector & mass spectrometer; Hall effect"],["Q3–4","Bent wire in uniform B; three wires on a triangle"],["Q5–6","Rectangle vs circle at the centre; Bohr orbit"],["Opt 1–5","Helix, loop by a wire, Earth's dipole, torque on a loop, two arcs"]]},
 {name:"HW 3 (Fall 2026, due 27 Oct)", note:"Lecture 6/6e – conductors, current, dielectrics, capacitors", items:[
   ["Q1","Image method: two charges near a grounded plane"],["Q2","Total current from J = J₀ρ/a"],["Q3","Ohm's law in a wire"],["Q4","Three dielectric slabs: field angles"],["Q5","Free space / dielectric interface: E₂, D₂, angles"],["Q6","Coaxial capacitor, partly filled"],["Q7","Two-layer parallel-plate capacitor"],["Opt 1–5","Capacitors, spherical layers, σ(z), conductor surface"]]},
 {name:"HW 2 (Fall 2026)", note:"Lectures 4–5 – Gauss, work and potential", items:[
   ["Q1–2","Gauss (integral): coaxial shells, ρ = 50 r e^(−r)"],["Q3–4","Gauss (differential): cube flux, ρ from E"],["Q5","Work along three paths"],["Q6","E and ρ from V"],["Q7","Disc: V on axis, then E"],["Q8","V between two charged planes"],["Opt","Gauss Q1–5, potential Q1–3"]]},
 {name:"HW 1 (Fall 2026)", note:"This year – tells you the lecturer's style", items:[
   ["Q1–2","Vector geometry / unit vectors"],["Q3","Field of point charges (qualitative)"],["Q4","E from 2 charges, find E=0"],["Q5","Net force – cube"],["Q6","Charge from field"],["Q7","Dipole/bisector field maximum"],["Q8","Linear quadrupole"],["Opt 9","Coplanar vectors"],["Opt 10–12","Triangle, hydrogen atom, square equilibrium"]]},
 {name:"Final Dec 2024", note:"Closest in style to your lecturer", items:[
   ["MCQ1","Field on bisector of 2 equal charges"],["MCQ2","Concentric cylindrical sheets (Gauss)"],["MCQ3","Vector identity = 0"],["MCQ4","Sources of B"],["MCQ5","Wave direction from B"],["B1","E at P from +5 nC, −45 nC"],["B2","Parallel conducting plates (4 parts)"],["B3","B of finite wire"],["B4","Capacitor + Poynting"],["B5","Wave in ferrite"],["B6 bonus","Cavity in sphere"],["B7 bonus","Monopoles"]]},
 {name:"Final Dec 2023", note:"", items:[
   ["MCQ1.1–1.5","Maxwell list, force scaling, field lines, Faraday, vectors"],["Q2","Concentric shells: E, ΔV, C, U"],["Q3","Sphere $\\rho=ar$: E in/out, V"],["Q4","Parallel planes: U, Φ, L"],["Q5","Capacitor + Poynting"],["Q6","Wave equation, B, S"],["B1","Two solenoids' inductance"],["B2","Monopoles"]]},
 {name:"Final Dec 2022", note:"", items:[
   ["MCQ1.1–1.8","Gauss flux, potential sign, parallel wires, dipole in field, Lenz, rails, displacement current, EM wave"],["P2","Two perpendicular infinite sheets"],["P3","Sphere with hollow: E and V"],["P4","Parallel planes: U, L, Φ"],["P5","Capacitor + Poynting"],["P6","Wave: f, λ, direction, B"],["Bonus","Monopoles"]]},
 {name:"May 2022 (online)", note:"", items:[
   ["P1","11 point charges on a circle: E, V at centre"],["P2","Coaxial cylindrical shells"],["P3","Charging capacitor: E, V, B, U"],["P4","Generator"],["P5","Plane wave: direction, f, λ, E, ⟨S⟩"],["P6","Coax with two permeabilities"]]},
 {name:"May 2020 (online)", note:"Includes formula sheet", items:[
   ["Q1","Coulomb forces on axis / 60°"],["Q2","Dipole, Gauss flux, sphere energy, parallel-plate C"],["Q3","Solenoid, induced emf, mutual inductance"],["Q4","Magnetic materials, mmf"],["Q5","H from E, power on dish, Poisson slab"],["Q6","Curl, moving conductor, rotating coil"]]},
];
