// Symbol meanings for every equation. Format per line:  ID: tex :: meaning ; tex :: meaning
// @name expands to a shared entry from COMMON.
const COMMON = {
  eps0: String.raw`\epsilon_0 :: permittivity of free space, $8.854\times10^{-12}$ F/m`,
  mu0:  String.raw`\mu_0 :: permeability of free space, $4\pi\times10^{-7}$ H/m`,
  E:    String.raw`\vec E :: electric field (N/C = V/m)`,
  D:    String.raw`\vec D :: electric flux density (C/m²)`,
  B:    String.raw`\vec B :: magnetic flux density (T)`,
  H:    String.raw`\vec H :: magnetic field intensity (A/m)`,
  dl:   String.raw`d\vec l :: tiny displacement along the path (m)`,
  dS:   String.raw`d\vec S :: tiny surface element, direction = outward normal (m²)`,
  dV:   String.raw`dV :: tiny volume element (m³)`,
  rho:  String.raw`\rho :: volume charge density (C/m³)`,
  sigma:String.raw`\sigma :: surface charge density (C/m²)`,
  lambda:String.raw`\lambda :: line charge density (C/m)`,
  V:    String.raw`V :: electric potential (volts)`,
  Qenc: String.raw`Q_{enc} :: charge enclosed by the Gaussian surface (C)`,
  C:    String.raw`C :: capacitance (farads)`,
  I:    String.raw`I :: current (A)`,
  kappa:String.raw`\epsilon_r :: relative permittivity (dielectric constant), no units`,
  eps:  String.raw`\epsilon :: permittivity of the material, $\epsilon_r\epsilon_0$ (F/m)`,
  hat:  String.raw`\hat a_R :: unit vector pointing from the source to the field point`,
  Rv:   String.raw`\vec R :: vector from source (charge) to the field point (m)`,
  R:    String.raw`R :: distance from source to field point (m)`,
  q:    String.raw`q :: test charge (C)`,
  Q:    String.raw`Q :: source charge (C)`,
  P:    String.raw`\vec P :: polarisation = dipole moment per unit volume (C/m²)`,
  J:    String.raw`\vec J :: current density (A/m²)`,
  c:    String.raw`c :: speed of light, $3\times10^8$ m/s`,
};
const SYMBOL_TABLE = String.raw`
L00: |\vec A| :: length (magnitude) of vector A ; A_x,A_y,A_z :: components of A along x, y, z ; \hat a :: unit vector (length 1) along A
L01: \vec R_{12} :: vector pointing from point 1 to point 2 ; \vec r_1,\vec r_2 :: position vectors of points 1 and 2 (from the origin) ; (x_i,y_i,z_i) :: coordinates of point i
L02: \theta :: angle between A and B ; |A|,|B| :: magnitudes of the vectors ; A_xB_x+… :: component-by-component product, summed. Result is a scalar
L03: \hat n :: unit vector perpendicular to both A and B (right-hand rule) ; \theta :: angle between A and B ; \hat x,\hat y,\hat z :: unit vectors along the axes
L04: r :: distance from the z-axis ; \phi :: angle around the z-axis from +x ; z :: height along the axis ; dV :: volume element in cylindrical coordinates
L05: r :: distance from the origin ; \theta :: polar angle measured from +z ; \phi :: azimuth angle around z from +x ; dV :: volume element in spherical coordinates
L06: \nabla f :: gradient of f, a vector pointing toward fastest increase ; f :: any scalar function (e.g. V) ; \partial f/\partial x :: rate of change of f in the x direction
L07: \nabla\cdot\vec A :: divergence of A, a scalar: net outflow per unit volume ; A_x,A_y,A_z :: components of the vector field A ; \partial_x :: partial derivative with respect to x
L08: \nabla\times\vec A :: curl of A, a vector measuring local circulation ; \partial_x,\partial_y,\partial_z :: partial derivatives ; A_x,A_y,A_z :: components of A
L09: r,\phi,z :: cylindrical coordinates ; r,\theta,\phi :: spherical coordinates ; D_r,D_\theta,D_\phi,D_z :: components of the vector field D along each coordinate direction
L010: \nabla^2 V :: Laplacian of V: sum of second derivatives in x, y, z ; V :: any scalar field, e.g. potential
L011: \nabla\times(\nabla V) :: curl of a gradient ; \nabla\cdot(\nabla\times\vec A) :: divergence of a curl ; V :: any scalar function ; \vec A :: any vector field
L012: \oint_S :: integral over a closed surface ; \int_V :: integral over the volume inside it ; \oint_C :: integral around a closed loop ; \int_S :: integral over a surface bounded by the loop ; d\vec S :: surface element (outward normal) ; d\vec l :: path element along the loop
L20: Q_1,Q_2 :: the two point charges (C) ; R_{12} :: distance between them (m) ; \hat a_{12} :: unit vector from charge 1 toward charge 2 ; \vec F_{12} :: force on charge 2 caused by charge 1 (N) ; @eps0
L21: @E ; \vec F :: force on the test charge (N) ; @q
L22: @E ; @Q ; @R ; \hat a_R :: unit vector pointing away from the source charge ; @eps0
L23: @E ; Q_i :: i-th source charge ; \vec r :: position of the field point ; \vec r_i :: position of charge i ; N :: number of charges ; @eps0
L24: \vec p :: electric dipole moment (C·m) ; Q :: magnitude of each of the two opposite charges (C) ; \vec d :: vector from the negative to the positive charge (m)
L25: \vec\tau :: torque on the dipole (N·m) ; \vec p :: dipole moment ; @E ; U :: potential energy of the dipole (J) ; p,E :: magnitudes of p and E
L26: V :: potential at distance r (V) ; E_r,E_\theta :: radial and tangential field components ; p :: dipole moment magnitude ; r :: distance from the dipole centre ; \theta :: angle from the dipole axis ; @eps0
L27: E_z :: field on the axis, distance z from the centre (N/C) ; q :: size of each end charge (the middle one is 2q) ; a :: spacing between neighbouring charges ; Q :: quadrupole moment, $2qa^2$ ; z :: distance from centre (valid for $z\gg a$) ; @eps0
L28: E_\perp :: field strength along the bisector ; k :: Coulomb constant $1/4\pi\epsilon_0\approx9\times10^9$ ; Q :: size of each of the two equal charges ; y :: distance from the midpoint along the bisector ; d :: separation of the two charges
L29: \vec F :: force on the charge (N) ; q :: charge of the particle ; @E ; \vec a :: acceleration (m/s²) ; m :: mass of the particle (kg)
L30: dq :: tiny bit of charge (C) ; @lambda ; dl :: length element ; @sigma ; dS :: area element ; @rho ; dV :: volume element
L31: @E ; dq :: charge element ; @R ; \hat a_R :: unit vector from dq to the field point ; \vec R :: vector from dq to the field point ; @eps0
L32: E :: field at distance r from the rod (N/C) ; @lambda ; L :: length of the rod (m) ; r :: perpendicular distance from the rod's centre ; (L/2) :: half the rod length ; @eps0
L33: @E ; @lambda ; r :: perpendicular distance from the line (m) ; \hat r :: unit vector pointing radially away from the line ; @eps0
L34: E_z :: field along the ring's axis ; Q :: total charge on the ring ; z :: distance from the ring's centre along the axis ; a :: ring radius ; @eps0
L35: E_z :: field along the disk's axis ; @sigma ; z :: distance from the disk along its axis ; a :: disk radius ; @eps0
L36: @E ; @sigma ; \hat n :: unit vector perpendicular to the sheet, pointing away from it ; @eps0
L37: E :: field strength ; @sigma :: charge density on each plate, +σ and −σ ; @eps0
L40: \Phi_E :: electric flux (N·m²/C) ; @E ; @dS ; S :: the surface the flux is counted through
L41: \oint_S :: integral over the closed Gaussian surface ; @E ; @dS ; @Qenc ; @eps0
L42: \nabla\cdot\vec E :: divergence of E at a point ; @rho :: charge density at that point ; @eps0
L43: E :: field magnitude at radius r ; r :: radius of the Gaussian sphere ; @Qenc ; 4\pi r^2 :: area of the Gaussian sphere ; \rho :: uniform volume charge density ; R :: radius of the charged sphere ; @eps0
L44: @Qenc ; \rho(r') :: charge density at radius r' ; r' :: dummy radius, integrated from 0 to r ; 4\pi r'^2dr' :: volume of a thin shell
L45: E :: field magnitude at radius r ; r :: radius of the Gaussian cylinder ; L :: length of the Gaussian cylinder ; 2\pi rL :: its curved area ; @lambda ; \rho_s :: surface charge density on the charged cylinder ; a :: radius of the charged cylinder ; @eps0
L46: E :: field on each side of the sheet ; A :: area of each pillbox face ; @sigma ; 2A :: total area of the two faces ; @eps0
L47: \vec E_{cavity} :: field inside the hollow ; @rho ; \vec a :: vector from the big sphere's centre to the cavity's centre ; @eps0
L48: @D ; @E ; @eps0 ; Q_{free} :: free charge enclosed ; @dS
L49: @E ; @rho ; V :: potential, constant throughout a conductor ; @sigma ; E_{surface} :: field just outside the surface ; @eps0
L410: \sigma_1…\sigma_4 :: surface charge densities on the 4 faces of the plate pair, left to right ; q_{total} :: total charge on both plates ; S :: plate area
L50: W :: work (J) ; \vec F :: force ; q :: charge moved ; @E ; @dl
L51: V_{AB} :: potential difference between A and B, V ; V_A,V_B :: potential at points A and B ; @E ; @dl ; \int_B^A :: path integral from B to A
L52: U :: electric potential energy of charge q (J) ; q :: the charge ; V :: potential at its position ; \Delta U,\Delta V :: changes in U and V
L53: V :: potential, taking zero at infinity ; Q_i :: i-th point charge ; R_i :: distance from charge i to the field point ; @eps0
L54: V :: potential ; dq :: charge element ; R :: distance from dq to the field point ; @eps0
L55: @E ; \nabla V :: gradient of the potential ; @V ; \text{minus sign} :: field points toward decreasing V
L56: \oint :: integral around any closed loop ; @E ; @dl ; \nabla\times\vec E :: curl of E
L57: \nabla^2V :: Laplacian of the potential ; @rho :: charge density at the point ; @eps0
L58: U :: total energy needed to assemble the charges (J) ; q_i,q_j :: individual charges ; V_i :: potential at charge i due to all the others ; r_{ij} :: distance between charges i and j ; @eps0
L59: U :: total stored energy ; @rho ; V :: potential at each point ; @dV
L510: u :: energy density, energy per unit volume (J/m³) ; @eps0 ; E :: field magnitude ; U :: total energy ; dV :: volume element
L511: @C ; Q :: charge on one plate (the other has −Q) ; V :: potential difference between the plates
L512: @C ; @eps0 ; A :: area of one plate (m²) ; d :: plate separation (m) ; E :: field between the plates ; V :: voltage across the plates ; Q :: charge on a plate
L513: @C ; R_1,R_2 :: inner and outer shell radii (R₂ > R₁) ; R :: radius of an isolated sphere ; @eps0
L514: @C ; @eps :: permittivity of the material between the conductors ; L :: length of the cable ; a,b :: inner and outer conductor radii ; \ln :: natural logarithm
L515: U :: energy stored (J) ; @C ; V :: voltage across the capacitor ; Q :: stored charge
L516: C_{par} :: equivalent capacitance in parallel ; C_{ser} :: equivalent capacitance in series ; C_1,C_2 :: individual capacitances
L517: Q :: charge on the plates ; V :: voltage across the plates ; @C
L518: @I :: current charging the plates (A) ; Q :: charge on a plate ; t :: time ; V(t) :: voltage as a function of time ; E(t) :: field between the plates ; @C ; R :: plate radius ; @eps0
L60: @P ; \Delta V :: small volume ; \sum\vec p :: sum of dipole moments in it ; N :: number of dipoles per unit volume ; \vec p :: dipole moment of one molecule ; \chi_e :: electric susceptibility (no units) ; @eps0 ; @E
L61: \rho_b :: bound (polarisation) volume charge density ; \sigma_b :: bound surface charge density ; @P ; \hat n :: outward unit normal of the surface
L62: @D ; @eps0 ; @E ; @P ; @eps
L63: @eps ; @kappa ; @eps0 ; \chi_e :: electric susceptibility (no units)
L64: @D ; @dS ; Q_{free,enc} :: free charge inside the surface (bound charge not counted) ; \rho_{free} :: free charge density
L65: E_0,V_0,C_0 :: values without the dielectric ; E,V,C :: values with the dielectric ; @kappa
L66: @C ; @eps ; @eps0 ; @kappa ; A :: plate area ; d :: plate separation
L67: C :: total capacitance ; d_1,d_2 :: thicknesses of the layers ; \epsilon_1,\epsilon_2 :: permittivities of the layers ; A,A_1,A_2 :: plate areas ; d :: plate separation
L68: u :: energy density (J/m³) ; @D ; @E ; @eps
L69: E_{1t},E_{2t} :: tangential parts of E on sides 1 and 2 ; D_{1n},D_{2n} :: normal parts of D on sides 1 and 2 ; \sigma_{free} :: free surface charge on the interface
L610: E_t :: tangential field at the surface ; D_n :: normal flux density at the surface ; @sigma ; E_n :: normal field at the surface ; @eps
EM0: @D ; @B ; @E ; @H ; @rho :: free charge density ; @J :: free current density ; \partial/\partial t :: rate of change with time
EM1: @D ; @B ; @E ; @H ; Q :: enclosed free charge ; I :: enclosed current ; \Phi_B :: magnetic flux through the loop (Wb) ; @dS ; @dl
EM2: B :: magnetic flux density at distance r (T) ; @mu0 ; @I ; r :: perpendicular distance from the wire ; \alpha_1,\alpha_2 :: angles from the perpendicular to the wire ends (finite wire)
EM3: v :: wave speed (m/s) ; @mu0 ; \mu,\epsilon :: permeability, permittivity of the medium ; @c ; \kappa_m,\kappa_e :: relative permeability and permittivity ; \lambda :: wavelength (m) ; f :: frequency (Hz) ; k :: wave number (rad/m) ; \omega :: angular frequency, $2\pi f$ (rad/s)
EM4: E,B :: electric and magnetic field amplitudes ; v :: wave speed ; \vec S :: Poynting vector, power flow per area (W/m²) ; @H ; \langle S\rangle :: time-average power flow ; E_0 :: peak electric field ; \eta :: impedance of the medium ($\sqrt{\mu/\epsilon}$, 377 Ω in vacuum)
EM5: u_m :: magnetic energy density (J/m³) ; @B ; \mu :: permeability ; U_m :: stored magnetic energy (J) ; L :: inductance (henries) ; I :: current ; \Phi :: flux linked (Wb)
EM6: \mathcal E :: induced EMF (volts) ; \Phi_B :: magnetic flux through the loop (Wb) ; n :: number of turns ; B :: field strength ; S :: coil area ; \omega :: rotation rate (rad/s)
EM7: \vec F :: force on the charge (N) ; q :: charge ; @E ; \vec v :: velocity of the charge ; @B ; I :: current in the wire ; d\vec l :: wire element, direction of current
L210: q :: size of each charge (+q and −q) ; d :: separation between the charges ; s :: distance from the midpoint along the bisector ; p :: dipole moment $qd$ ; @eps0
L211: e :: elementary charge (magnitude of the electron's charge) ; k :: Coulomb constant ; @eps0 ; \text{N, C, V, J} :: newton, coulomb, volt, joule
L38: r :: distance from the source ; \propto :: “proportional to”
L411: E_z :: field perpendicular to the slab ; @rho :: uniform charge density of the slab ; z :: distance from the slab's central plane ; D :: slab thickness ; @eps0
L412: Q :: charge inside the closed surface S ; @D ; @dS ; \nabla\cdot\vec D :: divergence of D, equal to ρ ; \Delta v :: small volume around point P ; P :: point where the divergence is evaluated
L519: V(r) :: potential at distance r from the centre ; Q :: total charge on the sphere/shell ; a :: radius of the sphere/shell ; r :: distance from the centre ; @eps0
L520: E_x :: x-component of the field ; dV/dx :: slope of the V(x) graph ; @sigma :: charge on a sheet at the kink ; \Delta E_x :: jump in E across the sheet ; @eps0
L521: W :: work done by an external agent moving the charge (J) ; q :: charge moved ; @E ; E_x,E_y,E_z :: field components ; dx,dy,dz :: path steps ; V_{AB} :: potential of A relative to B
L611: Q :: real charge above the plane ; -Q :: image charge, mirrored below the plane ; h :: height above the plane ; @lambda :: line charge running parallel to the plane ; x :: horizontal distance along the plane from directly below the line ; @sigma :: induced surface charge on the plane ; @eps0
L612: @C ; @eps0 ; A :: plate area ; d :: plate separation ; t :: thickness of the metal slab ; Q :: charge on the plates (fixed if isolated) ; W :: stored energy
L613: \vec E :: electric field ; r :: distance from the centre ; a :: radius of the charged object ; Q :: its total charge
L614: @I :: current (A = C/s) ; Q :: charge that has crossed the area (C) ; t :: time (s) ; @J ; A :: cross-section area (m²) ; \hat I :: unit vector along the current ; @dS
L615: \Delta Q :: charge crossing the area in time Δt (C) ; @rho ; v :: speed of the charges (m/s) ; \Delta t :: time interval ; \Delta S :: area element, perpendicular to the flow (m²) ; \Delta I :: current through ΔS ; @J ; \vec v :: velocity of the charges
L616: \vec v_e :: drift velocity of the electrons (m/s) ; \mu_e :: electron mobility, m²/(V·s) ; @E ; @J ; @rho :: charge density of the moving charges (negative for electrons) ; \sigma :: conductivity, S/m
L617: \Delta V :: voltage across the wire (V) ; E :: field along the wire ; l :: length of the wire (m) ; @J ; \sigma :: conductivity (S/m) ; A :: cross-section area (m²) ; I :: current (A) ; R :: resistance (Ω)
L618: v :: voltage (V) ; i :: current (A) ; R :: resistance (Ω) ; q :: charge (C) ; C :: capacitance (F) ; t :: time
L619: \kappa :: dielectric constant (relative permittivity) ; Q_0,V_0,E_0,U_0,C_0 :: values before the dielectric goes in ; Q,V,E,U,C :: values after ; d :: plate separation ; U :: stored energy (J)
`;
const SYMBOLS = {};
SYMBOL_TABLE.trim().split('\n').forEach(line=>{
  const i=line.indexOf(':'); const id=line.slice(0,i).trim();
  SYMBOLS[id]=line.slice(i+1).split(' ; ').map(p=>{
    p=p.trim();
    const at=/^@(\w+)(?:\s*::\s*([\s\S]*))?$/.exec(p);
    if(at&&COMMON[at[1]]){ // "@rho" = shared entry; "@rho :: custom meaning" = shared symbol with its own wording
      const shared=COMMON[at[1]]; p=at[2]?shared.slice(0,shared.indexOf('::')).trim()+' :: '+at[2].trim():shared;
    }
    const j=p.indexOf('::');
    return j<0?[null,p]:[p.slice(0,j).trim(),p.slice(j+2).trim()];
  });
});
