// Small inline-SVG diagrams for each equation (keyed by equation id, e.g. "L43").
// Three drawers: plot (curves), field (arrow map around charges), scene (free sketch).
const DIAG = (function(){
const W=240,H=150; let uid=0;
const f1=n=>Math.round(n*10)/10;
const tcls=c=>(/\bc(\d)\b/.exec(c||'')||[])[1]?'t'+/\bc(\d)\b/.exec(c)[1]:'';
function pxArrow(x1,y1,x2,y2,c){
  const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1,ux=dx/l,uy=dy/l,h=Math.min(5.5,l*0.5),bx=x2-ux*h,by=y2-uy*h,w=h*0.55;
  return `<line class="${c}" x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(bx)}" y2="${f1(by)}"/><polygon class="${c}" points="${f1(x2)},${f1(y2)} ${f1(bx-uy*w)},${f1(by+ux*w)} ${f1(bx+uy*w)},${f1(by-ux*w)}"/>`;
}
function mk(xr,yr,pad){
  const [L,T,R,B]=pad||[0,0,0,0];
  const X=x=>L+(x-xr[0])/(xr[1]-xr[0])*(W-L-R), Y=y=>T+(1-(y-yr[0])/(yr[1]-yr[0]))*(H-T-B);
  const sx=(W-L-R)/(xr[1]-xr[0]), sy=(H-T-B)/(yr[1]-yr[0]);
  const M={X,Y,sx,sy,
    line:(x1,y1,x2,y2,c='ax')=>`<line class="${c}" x1="${f1(X(x1))}" y1="${f1(Y(y1))}" x2="${f1(X(x2))}" y2="${f1(Y(y2))}"/>`,
    arrow:(x1,y1,x2,y2,c='c1',lab='',dx=0,dy=0)=>{
      const a=pxArrow(X(x1),Y(y1),X(x2),Y(y2),c); if(!lab)return a;
      const ux=X(x2)-X(x1),uy=Y(y2)-Y(y1),l=Math.hypot(ux,uy)||1;
      return a+`<text class="${tcls(c)}" x="${f1(X(x2)+ux/l*9+dx)}" y="${f1(Y(y2)+uy/l*9+3.5+dy)}" text-anchor="middle">${lab}</text>`;},
    circ:(x,y,r,c='ax')=>`<ellipse class="${c}" cx="${f1(X(x))}" cy="${f1(Y(y))}" rx="${f1(r*sx)}" ry="${f1(r*sy)}"/>`,
    ell:(x,y,rx,ry,c='ax')=>`<ellipse class="${c}" cx="${f1(X(x))}" cy="${f1(Y(y))}" rx="${f1(rx*sx)}" ry="${f1(ry*sy)}"/>`,
    rect:(x0,y0,x1,y1,c='ax')=>`<rect class="${c}" x="${f1(X(Math.min(x0,x1)))}" y="${f1(Y(Math.max(y0,y1)))}" width="${f1(Math.abs(x1-x0)*sx)}" height="${f1(Math.abs(y1-y0)*sy)}"/>`,
    text:(x,y,s,c='',a='middle')=>`<text class="${c}" x="${f1(X(x))}" y="${f1(Y(y)+3.5)}" text-anchor="${a}">${s}</text>`,
    poly:(pts,c='ax')=>`<polygon class="${c}" points="${pts.map(p=>f1(X(p[0]))+','+f1(Y(p[1]))).join(' ')}"/>`,
    pline:(pts,c='ax')=>`<polyline class="${c}" points="${pts.map(p=>f1(X(p[0]))+','+f1(Y(p[1]))).join(' ')}"/>`,
    qpath:(x1,y1,cx,cy,x2,y2,c='c1')=>`<path class="${c}" d="M${f1(X(x1))},${f1(Y(y1))} Q${f1(X(cx))},${f1(Y(cy))} ${f1(X(x2))},${f1(Y(y2))}"/>`,
    dot:(x,y,c='c1',lab='',dx=0,dy=-9)=>`<circle class="dot ${c}" cx="${f1(X(x))}" cy="${f1(Y(y))}" r="3"/>`+(lab?`<text class="${tcls(c)}" x="${f1(X(x)+dx)}" y="${f1(Y(y)+dy+3.5)}" text-anchor="middle">${lab}</text>`:''),
    charge:(x,y,s,lab='')=>{const p=s==='+';return `<circle class="${p?'qp':'qn'}" cx="${f1(X(x))}" cy="${f1(Y(y))}" r="7.5"/><text class="qs" x="${f1(X(x))}" y="${f1(Y(y)+4)}" text-anchor="middle">${p?'+':'−'}</text>`+(lab?`<text class="lb" x="${f1(X(x)+11)}" y="${f1(Y(y)-8)}">${lab}</text>`:'');}
  };
  return M;
}
const wrap=s=>`<svg class="dg" viewBox="0 0 ${W} ${H}" role="img" aria-hidden="true">${s}</svg>`;

function plot(o){
  const xr=o.x,yr=o.y,M=mk(xr,yr,[24,12,12,20]),id='cp'+(uid++);
  const ay=(yr[0]<=0&&yr[1]>=0)?0:yr[0], axx=(xr[0]<=0&&xr[1]>=0)?0:xr[0];
  let s=`<defs><clipPath id="${id}"><rect x="24" y="6" width="${W-30}" height="${H-26}"/></clipPath></defs>`;
  (o.hl||[]).forEach(h=>{s+=M.line(xr[0],h.y,xr[1],h.y,'ax dash');if(h.label)s+=M.text(xr[1],h.y,h.label,'lb','end').replace(/y="([\d.]+)"/,(m,v)=>`y="${f1(+v-6)}"`);});
  (o.vl||[]).forEach(v=>{s+=M.line(v.x,yr[0],v.x,yr[1],'ax dash');if(v.label)s+=`<text class="lb" x="${f1(M.X(v.x))}" y="${H-5}" text-anchor="middle">${v.label}</text>`;});
  s+=`<g clip-path="url(#${id})">`;
  (o.fns||[]).forEach(fn=>{
    const a=fn.r?fn.r[0]:xr[0],b=fn.r?fn.r[1]:xr[1],N=220,span=yr[1]-yr[0];
    if(fn.fill){const [fa,fb]=fn.fill;let pts=[[fa,ay]];for(let i=0;i<=80;i++){const x=fa+(fb-fa)*i/80,y=fn.f(x);if(isFinite(y))pts.push([x,Math.max(yr[0]-span,Math.min(yr[1]+span,y))]);}pts.push([fb,ay]);s+=M.poly(pts,'f'+(fn.c||'c1').replace(/\D/g,''));}
    let d='',pen=false;
    for(let i=0;i<=N;i++){const x=a+(b-a)*i/N,y=fn.f(x);
      if(!isFinite(y)||y>yr[1]+span*3||y<yr[0]-span*3){pen=false;continue;}
      d+=(pen?'L':'M')+f1(M.X(x))+','+f1(M.Y(y));pen=true;}
    s+=`<path class="${fn.c||'c1'} ${fn.dash?'dash':''} w2" d="${d}"/>`;
  });
  s+='</g>';
  s+=pxArrow(M.X(xr[0]),M.Y(ay),W-6,M.Y(ay),'ax')+pxArrow(M.X(axx),H-20,M.X(axx),5,'ax');
  (o.fns||[]).forEach(fn=>{if(!fn.label)return;const lx=fn.lx??(xr[0]+(xr[1]-xr[0])*0.7);let ly=fn.f(lx);if(!isFinite(ly))return;ly=Math.min(yr[1],Math.max(yr[0],ly));
    s+=`<text class="${tcls(fn.c||'c1')}" x="${f1(M.X(lx)+(fn.dx||3))}" y="${f1(M.Y(ly)+(fn.dy??-6))}" text-anchor="${fn.anchor||'start'}">${fn.label}</text>`;});
  (o.legend||[]).forEach((l,i)=>{s+=`<text class="${tcls(l.c||'c1')}" x="${W-8}" y="${16+i*12}" text-anchor="end">${l.t}</text>`;});
  (o.pts||[]).forEach(p=>{s+=M.dot(p.x,p.y,p.c||'c2',p.label,p.dx||0,p.dy??-9);});
  if(o.xl)s+=`<text class="lb" x="${W-6}" y="${f1(Math.min(H-4,M.Y(ay)+13))}" text-anchor="end">${o.xl}</text>`;
  if(o.yl)s+=`<text class="lb" x="${f1(M.X(axx)+5)}" y="11">${o.yl}</text>`;
  return wrap(s);
}
function field(o){
  const xr=o.xr||[-2,2],yr=o.yr||[-1.25,1.25],M=mk(xr,yr),[nx,ny]=o.n||[13,8],cs=o.charges||[];
  let s=o.under?o.under(M):'';const pts=[];
  for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){
    const x=xr[0]+(i+.5)*(xr[1]-xr[0])/nx,y=yr[0]+(j+.5)*(yr[1]-yr[0])/ny,v=o.f(x,y);
    if(!v)continue;const m=Math.hypot(v[0],v[1]);if(!(m>1e-9)||!isFinite(m))continue;
    if(cs.some(c=>Math.hypot(c[0]-x,c[1]-y)<0.22))continue;pts.push([x,y,v[0]/m,v[1]/m,m]);}
  const ms=pts.map(p=>p[4]).sort((a,b)=>a-b),ref=ms[Math.floor(ms.length/2)]||1;
  pts.forEach(p=>{const len=o.fixed?13:Math.max(5,Math.min(17,11*Math.sqrt(p[4]/ref))),cx=M.X(p[0]),cy=M.Y(p[1]),dx=p[2]*len/2,dy=-p[3]*len/2;
    s+=pxArrow(cx-dx,cy-dy,cx+dx,cy+dy,(o.cls||'c1')+' thin');});
  s+=o.over?o.over(M):'';
  cs.forEach(c=>{s+=M.charge(c[0],c[1],c[2],c[3]||'');});
  return wrap(s);
}
const scene=o=>{const M=mk(o.xr||[0,8],o.yr||[0,5]);return wrap(o.draw(M));};

// field helpers
const pc=list=>(x,y)=>{let u=0,v=0;for(const [cx,cy,q] of list){const dx=x-cx,dy=y-cy,r=Math.hypot(dx,dy);u+=q*dx/r**3;v+=q*dy/r**3;}return[u,v];};
const ln2d=(x,y)=>{const r2=x*x+y*y;return[x/r2,y/r2];};
const plates=(M,a=0.85,labs=['+σ','−σ'])=>M.rect(-a-0.06,-1.1,-a,1.1,'pl')+M.rect(a,-1.1,a+0.06,1.1,'pl')+M.text(-a-0.03,1.17,labs[0],'t2')+M.text(a+0.03,1.17,labs[1],'t1');
const inv=(r,p)=>1/Math.pow(r,p);

const D = {
// ---------- Lecture 0
L00:{cap:"|A| is the arrow's length; â points the same way but has length 1.",svg:()=>scene({draw:M=>M.arrow(0.5,0.5,7.6,0.5,'ax')+M.arrow(0.5,0.5,0.5,4.8,'ax')+M.line(6.5,0.5,6.5,4,'ax dash')+M.text(6.9,2.2,'Aᵧ','lb')+M.text(3.5,0.15,'Aₓ','lb')+M.arrow(0.5,0.5,6.5,4,'c1 w2','A')+M.arrow(0.5,0.5,1.88,1.31,'c2 w3','â',0,-8)})},
L01:{cap:"R₁₂ = r₂ − r₁ starts at point 1 and ends at point 2.",svg:()=>scene({draw:M=>M.dot(1,1,'ax','O',-8,4)+M.arrow(1,1,3,4,'c3')+M.text(1.6,2.8,'r₁','t3')+M.arrow(1,1,6.5,2,'c3')+M.text(3.9,1.15,'r₂','t3')+M.arrow(3,4,6.5,2,'c1 w2')+M.text(5.2,3.5,'R₁₂','t1')+M.dot(3,4,'c2','1')+M.dot(6.5,2,'c2','2',9,4)})},
L02:{cap:"A·B = (shadow of A on B) × |B|. Zero when A ⟂ B.",svg:()=>scene({draw:M=>M.arrow(1,1,7.4,1,'c1 w2','B',0,8)+M.arrow(1,1,4.5,4.2,'c3 w2','A')+M.line(4.5,4.2,4.5,1,'ax dash')+M.line(1,1,4.5,1,'c2 w3')+M.text(2.75,0.45,'|A| cos θ','t2')+M.text(1.95,1.45,'θ','lb')})},
L03:{cap:"A×B is perpendicular to both; its length equals the shaded area.",svg:()=>scene({draw:M=>M.poly([[3,1.4],[7,1.8],[5.4,0.5],[1.4,0.1]],'f1')+M.arrow(3,1.4,7,1.8,'c1 w2','A')+M.arrow(3,1.4,1.6,0.35,'c3 w2')+M.text(1.3,0.75,'B','t3')+M.arrow(3,1.4,3,4.4,'c2 w2')+M.text(3.3,4.3,'A×B','t2','start')})},
L04:{cap:"Cylindrical: distance r from the axis, angle φ around it, height z.",svg:()=>scene({draw:M=>M.ell(3,1.3,2.6,0.6,'ax dash')+M.ell(3,3.6,2.6,0.6,'ax dash')+M.line(0.4,1.3,0.4,3.6,'ax dash')+M.line(5.6,1.3,5.6,3.6,'ax dash')+M.arrow(3,1.3,3,4.55,'ax')+M.text(3.3,4.45,'z','lb')+M.arrow(3,1.3,1.3,0.3,'ax','x')+M.arrow(3,1.3,7.6,1.3,'ax','y',0,-8)+M.arrow(3,1.3,5.3,0.95,'c1 w2','r',0,8)+M.line(5.3,0.95,5.3,3.3,'c2 dash')+M.dot(5.3,3.3,'c2','P',8,0)+M.text(5.65,2.1,'z','t2')+M.text(3.6,0.75,'φ','lb')})},
L05:{cap:"Spherical: distance r from the origin, polar angle θ from +z, azimuth φ.",svg:()=>scene({draw:M=>M.arrow(3,1.3,3,4.55,'ax')+M.text(3.3,4.45,'z','lb')+M.arrow(3,1.3,1.3,0.3,'ax','x')+M.arrow(3,1.3,7.6,1.3,'ax','y',0,-8)+M.arrow(3,1.3,5.5,3.9,'c1 w2')+M.text(4.5,3.2,'r','t1')+M.dot(5.5,3.9,'c2','P',9,4)+M.line(5.5,3.9,5.5,0.8,'ax dash')+M.line(3,1.3,5.5,0.8,'ax dash')+M.text(3.35,2.5,'θ','t1')+M.text(3.9,0.75,'φ','lb')})},
L06:{cap:"∇f points uphill, perpendicular to the contour lines (dashed).",svg:()=>field({f:(x,y)=>[x,y],under:M=>[0.45,0.9,1.35].map(r=>M.circ(0,0,r,'ax dash')).join('')})},
L07:{cap:"Arrows grow outward: more flux leaves each small box than enters ⇒ ∇·A > 0.",svg:()=>field({f:(x,y)=>[x,y],over:M=>M.rect(0.6,0.2,1.2,0.8,'c2 dash')})},
L08:{cap:"A swirling field: ∇×A ≠ 0 (points out of the page by the right-hand rule).",svg:()=>field({f:(x,y)=>[-y,x],over:M=>M.circ(0,0,0.09,'c2 w2')+M.dot(0,0,'c2')})},
L09:{cap:"Purely radial fields: only the ∂(r²D_r)/∂r term survives.",svg:()=>field({f:pc([[0,0,1]]),charges:[[0,0,'+']],over:M=>M.circ(0,0,0.95,'ax dash')})},
L010:{cap:"∇²V measures curvature: V curving upward ⇒ ∇²V > 0.",svg:()=>plot({x:[-2,2],y:[-0.4,4.4],fns:[{f:x=>x*x,label:'V(x)',lx:1.3}],xl:'x'})},
L011:{cap:"A gradient field never swirls, so ∇×(∇V) = 0 always.",svg:()=>field({f:(x,y)=>[x,-y]})},
L012:{cap:"Total flux out of the dashed boundary = sum of all the divergence (sources) inside.",svg:()=>field({f:pc([[-0.4,0,1],[0.45,0.15,1]]),charges:[[-0.4,0,'+'],[0.45,0.15,'+']],over:M=>M.ell(0,0.05,1.25,0.85,'c2 dash')})},
// ---------- Lecture 2
L20:{cap:"F ∝ 1/r²: doubling the distance cuts the force to ¼.",svg:()=>plot({x:[0,3],y:[0,4.2],fns:[{f:r=>inv(r,2),label:'F ∝ 1/r²',lx:0.6,dx:6}],vl:[{x:1,label:'r'},{x:2,label:'2r'}],pts:[{x:1,y:1,label:'F',dx:8},{x:2,y:0.25,label:'F/4',dy:-10}],xl:'r'})},
L21:{cap:"E is the force per unit charge: put q in E and it feels F = qE.",svg:()=>field({f:()=>[1,0],n:[10,6],fixed:1,cls:'c1 faint',charges:[[0,0,'+','q']],over:M=>M.arrow(0.2,0,1.05,0,'c2 w3','F = qE',4,-12)})},
L22:{cap:"Arrows point away from +Q and shrink as 1/R².",svg:()=>field({f:pc([[0,0,1]]),charges:[[0,0,'+','Q']]})},
L23:{cap:"Add each charge's field as vectors. Here they cancel at the midpoint.",svg:()=>field({f:pc([[-0.8,0,1],[0.8,0,1]]),charges:[[-0.8,0,'+'],[0.8,0,'+']]})},
L24:{cap:"The dipole moment p points from −q to +q.",svg:()=>field({f:pc([[-0.6,0,-1],[0.6,0,1]]),charges:[[-0.6,0,'−'],[0.6,0,'+']],cls:'c1 faint',over:M=>M.arrow(-0.6,-0.85,0.6,-0.85,'c2 w3','p',10,4)})},
L25:{cap:"Equal and opposite forces: no net force, but a torque that turns p toward E.",svg:()=>field({f:()=>[1,0],n:[10,6],fixed:1,cls:'c1 faint',charges:[[-0.5,-0.4,'−'],[0.5,0.4,'+']],under:M=>M.line(-0.5,-0.4,0.5,0.4,'ax w2'),over:M=>M.arrow(0.62,0.4,1.35,0.4,'c2 w3','F',8)+M.arrow(-0.62,-0.4,-1.35,-0.4,'c2 w3','F',-8)+M.text(0,-1.05,'τ = p × E','t2')})},
L26:{cap:"Field lines run from + to −; far away the field falls as 1/r³.",svg:()=>field({f:pc([[-0.35,0,-1],[0.35,0,1]]),charges:[[-0.35,0,'−'],[0.35,0,'+']]})},
L27:{cap:"Linear quadrupole: the three fields nearly cancel far away (∝ 1/z⁴).",svg:()=>field({f:pc([[-0.7,0,-1],[0,0,2],[0.7,0,-1]]),charges:[[-0.7,0,'−'],[0,0,'+','2q'],[0.7,0,'−']]})},
L28:{cap:"Zero at the midpoint, peaks at y = d/(2√2), then falls like 1/y².",svg:()=>plot({x:[0,3],y:[0,1.8],fns:[{f:y=>y/Math.pow(y*y+0.25,1.5),label:'E⊥',lx:0.9,dx:4}],vl:[{x:0.354,label:'d/2√2'}],xl:'y'})},
L29:{cap:"+ charges are pushed along E, − charges against it.",svg:()=>field({f:()=>[1,0],n:[10,6],fixed:1,cls:'c1 faint',charges:[[-0.8,0.45,'+'],[0.8,-0.45,'−']],over:M=>M.arrow(-0.6,0.45,0.2,0.45,'c2 w3','F',10,4)+M.arrow(0.6,-0.45,-0.2,-0.45,'c2 w3','F',-10,4)+M.text(1.75,1.05,'E →','t1','end')})},
L210:{cap:"Near the dipole the field is finite; far away it follows p/4πε₀s³ (dashed).",svg:()=>plot({x:[0,3],y:[0,9],fns:[{f:s=>Math.pow(s*s+0.25,-1.5)},{f:s=>inv(s,3),c:'c2',dash:1}],legend:[{t:'exact',c:'c1'},{t:'far field p/4πε₀s³',c:'c2'}],xl:'s'})},
// ---------- Lecture 3
L30:{cap:"Chop the charge into tiny pieces dq: along a line, over a surface or through a volume.",svg:()=>scene({draw:M=>M.qpath(0.4,1,0.6,3.4,2.5,3.6,'c1 w2')+M.qpath(1.05,2.7,1.15,3.15,1.5,3.35,'c2 w4')+M.text(1.4,4.4,'λ dl','t2')+M.poly([[3,1],[5,1],[5.4,3],[3.4,3]],'f1')+M.poly([[4,1.8],[4.5,1.8],[4.6,2.3],[4.1,2.3]],'f2')+M.text(4.2,4.4,'σ dS','t2')+M.rect(6,1,7.4,2.4,'c1')+M.poly([[6,2.4],[6.5,2.9],[7.9,2.9],[7.4,2.4]],'f1')+M.rect(6.5,1.4,6.9,1.8,'f2')+M.text(6.9,4.4,'ρ dV','t2')})},
L31:{cap:"Each piece dq contributes dE along R; integrate over the whole body.",svg:()=>scene({draw:M=>M.ell(2,2.5,1.5,1.1,'f1')+M.dot(2.6,3,'c2','dq',-2,-10)+M.line(2.6,3,6.8,1.4,'c3 dash')+M.text(4.6,2.6,'R','t3')+M.dot(6.2,1.63,'ax','P',0,12)+M.line(2.6,3,6.2,1.63,'c3 dash')+M.arrow(6.2,1.63,7.15,1.27,'c2 w3')+M.text(7.1,1.95,'dE','t2')})},
L32:{cap:"Up close the rod looks like an infinite line (1/r); far away like a point charge (1/r²).",svg:()=>plot({x:[0,3],y:[0,6],fns:[{f:r=>1/(r*Math.sqrt(r*r+0.25))},{f:r=>2/r,c:'c3',dash:1},{f:r=>inv(r,2),c:'c2',dash:1}],legend:[{t:'finite rod',c:'c1'},{t:'infinite line ∝ 1/r',c:'c3'},{t:'point charge ∝ 1/r²',c:'c2'}],xl:'r'})},
L33:{cap:"End-on view of the line: E points radially outward and weakens as 1/r.",svg:()=>field({f:ln2d,charges:[[0,0,'+','λ']]})},
L34:{cap:"Zero at the centre of the ring, maximum at z = ±a/√2, then 1/z² far away.",svg:()=>plot({x:[-3,3],y:[-0.5,0.5],fns:[{f:z=>z/Math.pow(z*z+1,1.5),label:'Ez',lx:1.3}],vl:[{x:0.707,label:'a/√2'}],xl:'z'})},
L35:{cap:"Close to the disk E ≈ σ/2ε₀ (an infinite sheet); far away it falls like a point charge.",svg:()=>plot({x:[0,4],y:[0,1.2],fns:[{f:z=>1-z/Math.sqrt(z*z+1),label:'Ez',lx:1.2}],hl:[{y:1,label:'σ/2ε₀'}],xl:'z'})},
L36:{cap:"An infinite sheet gives a uniform σ/2ε₀ on both sides, pointing away from it.",svg:()=>field({f:x=>[x>0?1:-1,0],n:[12,7],fixed:1,under:M=>M.rect(-0.05,-1.25,0.05,1.25,'pl')+M.text(0.2,1.08,'+σ','t2','start')})},
L37:{cap:"Between the plates the two sheet fields add (σ/ε₀); outside they cancel.",svg:()=>field({f:x=>Math.abs(x)<0.8?[1,0]:null,n:[12,7],fixed:1,under:M=>plates(M)})},
L38:{cap:"The more spread-out the source, the slower its field falls off.",svg:()=>plot({x:[0.3,3],y:[0,3],fns:[{f:r=>inv(r,3),c:'c4',label:'dipole 1/r³',lx:0.72,dx:4,dy:-2},{f:r=>inv(r,2),c:'c2',label:'point 1/r²',lx:1.05,dx:5},{f:r=>1/r,c:'c3',label:'line 1/r',lx:2.0},{f:()=>1.6,c:'c1',label:'plane',lx:2.35}],xl:'r'})},
// ---------- Lecture 4
L40:{cap:"Flux counts how much E passes through the surface: E·dS = E dS cos θ.",svg:()=>scene({draw:M=>[1.3,2.5,3.7].map(y=>M.arrow(0.6,y,7.4,y,'c1 thin faint')).join('')+M.line(3.5,0.6,5,4.4,'c3 w3')+M.arrow(4.25,2.5,5.46,2.02,'c2 w3','dS',8,8)+M.text(5.2,2.9,'θ','lb')+M.text(7.2,4.2,'E','t1')})},
L41:{cap:"Only charge inside the dashed surface counts; the outside charge adds zero net flux.",svg:()=>field({f:pc([[0,0,1],[1.55,0.75,-0.6]]),charges:[[0,0,'+','Q enc'],[1.55,0.75,'−']],over:M=>M.circ(0,0,0.9,'c2 dash w2')})},
L42:{cap:"∇·E is the flux out of a tiny box divided by its volume. It equals ρ/ε₀.",svg:()=>field({f:pc([[0,0,1]]),charges:[[0,0,'+','ρ']],over:M=>M.rect(-0.4,-0.4,0.4,0.4,'c2 dash w2')})},
L43:{cap:"Uniform sphere: E rises linearly inside, then falls as 1/r² outside.",svg:()=>plot({x:[0,3],y:[0,1.2],fns:[{f:r=>r<1?r:inv(r,2),label:'E(r)',lx:1.5}],vl:[{x:1,label:'R'}],xl:'r'})},
L44:{cap:"ρ = ar (dashed): Q_enc ∝ r⁴, so E ∝ r² inside and 1/r² outside.",svg:()=>plot({x:[0,3],y:[0,1.2],fns:[{f:r=>r<1?r*r:inv(r,2),label:'E(r)',lx:1.5},{f:r=>r,r:[0,1],c:'c3',dash:1,label:'ρ = ar',lx:0.3,dy:-8}],vl:[{x:1,label:'R'}],xl:'r'})},
L45:{cap:"Coaxial shells: E = 0 inside, ∝ 1/r between, and it jumps at each charged shell.",svg:()=>plot({x:[0,3],y:[0,1.3],fns:[{f:r=>r<0.8?0:r<1.8?0.8/r:0.3/r,label:'E(r)',lx:1.0}],vl:[{x:0.8,label:'a'},{x:1.8,label:'b'}],xl:'r'})},
L46:{cap:"Pillbox: flux leaves only through the two flat faces, so E·2A = σA/ε₀.",svg:()=>field({f:x=>[x>0?1:-1,0],n:[12,7],fixed:1,cls:'c1 faint',under:M=>M.rect(-0.05,-1.25,0.05,1.25,'pl'),over:M=>M.rect(-0.55,-0.45,0.55,0.45,'c2 dash w2')+M.text(0.95,0.62,'A','t2')})},
L47:{cap:"Inside the hollow E is uniform: E = ρa/3ε₀, parallel to a.",svg:()=>scene({xr:[-2,2],yr:[-1.25,1.25],draw:M=>M.circ(0,0,1.15,'f1 c1')+M.circ(0.45,0.15,0.47,'hole c1 dash')+[-0.18,0.1,0.38].map(d=>M.arrow(0.24-d*0.316,0.08+d*0.949,0.66-d*0.316,0.22+d*0.949,'c2 w2')).join('')+M.arrow(0,0,0.45,0.15,'c3 w2')+M.text(0.15,-0.12,'a','t3')+M.text(-0.6,-0.55,'ρ','t1')})},
L48:{cap:"In vacuum D is just ε₀E, the same picture rescaled. D 'sees' only free charge.",svg:()=>field({f:pc([[0,0,1]]),charges:[[0,0,'+','free Q']],cls:'c3'})},
L49:{cap:"Inside the conductor E = 0. Outside, E is perpendicular to the surface; charge sits on the surface.",svg:()=>field({f:(x,y)=>{const r=Math.hypot(x,y);return r<0.98?null:[x/r**3,y/r**3];},under:M=>M.circ(0,0,0.85,'metal')+M.text(0,0,'E = 0','lb'),over:M=>Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;return M.text(0.72*Math.cos(a),0.72*Math.sin(a),'+','t2');}).join('')})},
L410:{cap:"Facing faces carry equal and opposite charge (σ₂ = −σ₃); outer faces are equal (σ₁ = σ₄).",svg:()=>scene({draw:M=>M.rect(2.2,0.6,2.8,4.4,'metal')+M.rect(5.2,0.6,5.8,4.4,'metal')+M.text(2.5,4.7,'A','lb')+M.text(5.5,4.7,'B','lb')+M.text(1.6,2.5,'σ₁','t2')+M.text(3.3,2.5,'σ₂','t2')+M.text(4.7,2.5,'σ₃','t2')+M.text(6.4,2.5,'σ₄','t2')+[1.3,3.6].map(y=>M.arrow(3.05,y,4.95,y,'c1 w2')).join('')})},
L411:{cap:"Thick slab: E is linear inside (zero at the centre plane) and constant outside.",svg:()=>plot({x:[-2,2],y:[-1.3,1.3],fns:[{f:z=>Math.abs(z)<0.7?z/0.7:Math.sign(z),label:'Ez',lx:1.2}],vl:[{x:-0.7,label:'−D/2'},{x:0.7,label:'D/2'}],xl:'z'})},
L412:{cap:"More flux leaves the top of the box than enters the bottom ⇒ net charge inside.",svg:()=>field({f:(x,y)=>[0,0.4+0.5*(y+1.25)],n:[10,7],over:M=>M.rect(-0.6,-0.6,0.6,0.6,'c2 dash w2')+M.text(0.8,0,'Q = ?','t2','start')})},
// ---------- Lecture 5
L50:{cap:"Only the part of the path along E costs work: W = −q∫E·dl.",svg:()=>field({f:()=>[1,0],n:[10,6],fixed:1,cls:'c1 faint',over:M=>M.qpath(-1.5,-0.8,-0.6,1,1.4,0.7,'c2 w2')+M.dot(-1.5,-0.8,'c2','B',-8,4)+M.dot(1.4,0.7,'c2','A',8,4)+M.arrow(-0.35,0.52,0.05,0.62,'c3 w2','dl',0,-6)})},
L51:{cap:"Potential drops along the field direction. Equipotentials (dashed) are ⟂ to E.",svg:()=>field({f:()=>[1,0],n:[10,6],fixed:1,cls:'c1 faint',under:M=>[-1.2,-0.4,0.4,1.2].map(x=>M.line(x,-1.25,x,1.25,'c2 dash')).join('')+M.text(-1.6,1.1,'high V','t2')+M.text(1.6,1.1,'low V','t2')})},
L52:{cap:"U = qV: a +q charge moves to lower V; a −q charge moves to higher V. Both lower their U.",svg:()=>plot({x:[-2,2],y:[-2,2],fns:[{f:v=>v,label:'U (+q)',lx:1.0,dx:-4,anchor:'end'},{f:v=>-v,c:'c2',label:'U (−q)',lx:-1.5,dx:8,dy:-2}],xl:'V',yl:'U'})},
L53:{cap:"V ∝ 1/r: positive around +Q, negative around −Q, zero at infinity.",svg:()=>plot({x:[0,3],y:[-3,3],fns:[{f:r=>1/r,label:'+Q',lx:1.2},{f:r=>-1/r,c:'c2',label:'−Q',lx:1.2,dy:14}],xl:'r'})},
L54:{cap:"Potential on a ring's axis: a scalar with no directions to track. Maximum at the centre.",svg:()=>plot({x:[-3,3],y:[0,1.15],fns:[{f:z=>1/Math.sqrt(z*z+1),label:'V(z)',lx:0.8}],xl:'z'})},
L55:{cap:"E = −dV/dx: E points downhill, so it is negative where V rises.",svg:()=>plot({x:[-3,3],y:[-1,1.15],fns:[{f:x=>Math.exp(-x*x),label:'V',lx:0.5},{f:x=>2*x*Math.exp(-x*x),c:'c2',label:'E',lx:1.0,dx:4}],xl:'x'})},
L56:{cap:"Any path from B to A takes the same work; around a closed loop the work is zero.",svg:()=>field({f:pc([[0,0,1]]),charges:[[0,0,'+']],cls:'c1 faint',over:M=>M.qpath(-1.5,-0.7,-1.2,1.1,1.3,0.8,'c2 w2')+M.qpath(-1.5,-0.7,0.6,-1.4,1.3,0.8,'c3 w2')+M.dot(-1.5,-0.7,'c2','B',-9,4)+M.dot(1.3,0.8,'c2','A',9,4)+M.text(1.1,-0.95,'same W','t3')})},
L57:{cap:"Poisson: where there is charge (green), V bends downward (∇²V = −ρ/ε₀).",svg:()=>plot({x:[-3,3],y:[-1.5,1.2],fns:[{f:x=>Math.exp(-x*x),c:'c3',label:'ρ',lx:0.55},{f:x=>0.5-0.6*Math.log(Math.cosh(1.3*x)),label:'V',lx:1.6}],xl:'x'})},
L58:{cap:"Add the energy of every pair once: U = Σ kqᵢqⱼ/rᵢⱼ.",svg:()=>scene({draw:M=>M.line(2,1.2,6,1.2,'ax dash')+M.line(2,1.2,4,4,'ax dash')+M.line(6,1.2,4,4,'ax dash')+M.text(4,0.8,'r₁₂','lb')+M.text(2.6,2.8,'r₁₃','lb')+M.text(5.4,2.8,'r₂₃','lb')+M.charge(2,1.2,'+','q₁')+M.charge(6,1.2,'−','q₂')+M.charge(4,4,'+','q₃')})},
L59:{cap:"Energy sits wherever the field is: u ∝ E² for a charged sphere.",svg:()=>plot({x:[0,3],y:[0,1.15],fns:[{f:r=>r<1?r*r:inv(r,4),label:'u ∝ E²',lx:1.25,fill:[0,3]}],vl:[{x:1,label:'R'}],xl:'r'})},
L510:{cap:"u = ½ε₀E²: doubling the field gives 4× the energy density.",svg:()=>plot({x:[0,2],y:[0,2.2],fns:[{f:e=>0.5*e*e,label:'u',lx:1.6,dx:-6,anchor:'end'}],xl:'E',yl:'u'})},
L511:{cap:"C is the slope of the Q–V line: a bigger C stores more charge per volt.",svg:()=>plot({x:[0,2],y:[0,2.2],fns:[{f:v=>1.8*v,label:'large C',lx:0.95,dx:-5,anchor:'end'},{f:v=>0.6*v,c:'c2',label:'small C',lx:1.5,dy:14}],xl:'V',yl:'Q'})},
L512:{cap:"Uniform E = V/d between the plates; C grows with plate area A and shrinks with gap d.",svg:()=>field({f:x=>Math.abs(x)<0.8?[1,0]:null,n:[12,7],fixed:1,under:M=>plates(M,0.85,['+Q','−Q']),over:M=>M.arrow(0,-1.18,-0.85,-1.18,'ax')+M.arrow(0,-1.18,0.85,-1.18,'ax')+M.text(0,-1.0,'d','lb')})},
L513:{cap:"The field exists only between the shells; V = ∫E dr from R₁ to R₂.",svg:()=>field({f:(x,y)=>{const r=Math.hypot(x,y);return r<0.55||r>1.1?null:[x/r**3,y/r**3];},under:M=>M.circ(0,0,1.12,'c1 w2')+M.circ(0,0,0.48,'metal')+M.text(0,0,'+Q','t2')+M.text(1.45,0.95,'−Q','t1'),over:M=>M.text(-1.5,-1.0,'R₁, R₂','lb')})},
L514:{cap:"Coax (end view): E ∝ 1/r between the conductors, which gives the ln(b/a).",svg:()=>field({f:(x,y)=>{const r=Math.hypot(x,y);return r<0.5||r>1.1?null:ln2d(x,y);},under:M=>M.circ(0,0,1.12,'c1 w2')+M.circ(0,0,0.42,'metal')+M.text(0,0,'a','lb')+M.text(1.3,0.95,'b','lb')})},
L515:{cap:"The stored energy is the shaded area under the V–Q line: ½QV.",svg:()=>plot({x:[0,2],y:[0,2.2],fns:[{f:q=>q,label:'V = Q/C',lx:1.2,dx:-6,anchor:'end',fill:[0,1.6]}],vl:[{x:1.6,label:'Q'}],xl:'Q',yl:'V'})},
L516:{cap:"Series (top): same Q, 1/C adds. Parallel (bottom): same V, C adds.",svg:()=>scene({draw:M=>M.line(0.5,3.8,1.9,3.8,'ax w2')+M.line(1.9,3.3,1.9,4.3,'c1 w3')+M.line(2.25,3.3,2.25,4.3,'c1 w3')+M.line(2.25,3.8,3.6,3.8,'ax w2')+M.line(3.6,3.3,3.6,4.3,'c1 w3')+M.line(3.95,3.3,3.95,4.3,'c1 w3')+M.line(3.95,3.8,5.2,3.8,'ax w2')+M.text(6.6,3.8,'series','t1')
  +M.line(0.5,1.5,1.2,1.5,'ax w2')+M.line(1.2,0.8,1.2,2.2,'ax w2')+M.line(1.2,2.2,2.6,2.2,'ax w2')+M.line(1.2,0.8,2.6,0.8,'ax w2')+M.line(2.6,1.85,2.6,2.55,'c1 w3')+M.line(2.95,1.85,2.95,2.55,'c1 w3')+M.line(2.6,0.45,2.6,1.15,'c1 w3')+M.line(2.95,0.45,2.95,1.15,'c1 w3')+M.line(2.95,2.2,4.3,2.2,'ax w2')+M.line(2.95,0.8,4.3,0.8,'ax w2')+M.line(4.3,0.8,4.3,2.2,'ax w2')+M.line(4.3,1.5,5.2,1.5,'ax w2')+M.text(6.6,1.5,'parallel','t1')})},
L517:{cap:"Isolated (Q fixed): V falls as C rises. Battery connected (V fixed): Q rises with C.",svg:()=>plot({x:[0,3],y:[0,2.2],fns:[{f:c=>1/c,r:[0.45,3],label:'V (Q fixed)',lx:1.7,dy:-6},{f:c=>0.65*c,c:'c2',label:'Q (V fixed)',lx:2.3,dx:-4,anchor:'end',dy:-8}],xl:'C'})},
L518:{cap:"Constant current: Q, V and E grow linearly with time; the energy grows as t².",svg:()=>plot({x:[0,2],y:[0,2.2],fns:[{f:t=>t,label:'V, E ∝ t',lx:1.55,dx:-4,anchor:'end',dy:-8},{f:t=>0.5*t*t,c:'c2',label:'U ∝ t²',lx:1.7,dy:14}],xl:'t'})},
L519:{cap:"V is flat inside the conductor because E = 0 there (dashed); outside V falls as 1/r.",svg:()=>plot({x:[0,3],y:[0,1.2],fns:[{f:r=>r<1?1:1/r,label:'V(r)',lx:1.7},{f:r=>r<1?0:inv(r,2),c:'c2',dash:1,label:'E(r)',lx:1.25,dx:4,dy:14}],vl:[{x:1,label:'a'}],xl:'r'})},
L520:{cap:"A corner in V(x) marks a sheet of charge: E jumps there by σ/ε₀.",svg:()=>plot({x:[-2,2],y:[-1.2,1.2],fns:[{f:x=>1-Math.abs(x),label:'V',lx:-1.3,dy:-6},{f:x=>Math.sign(x),c:'c2',label:'E',lx:1.2}],xl:'x'})},
L521:{cap:"Straight line, L-shaped path or arc from B to A: the work is identical.",svg:()=>scene({xr:[-0.2,1.4],yr:[-0.15,0.85],draw:M=>M.arrow(-0.1,0,1.35,0,'ax')+M.arrow(0,-0.1,0,0.82,'ax')+M.line(1,0,0.8,0.6,'c1 w2')+M.pline([[1,0],[1,0.6],[0.8,0.6]],'c3 w2')+M.pline(Array.from({length:21},(_,i)=>{const a=i/20*Math.atan2(0.6,0.8);return[Math.cos(a),Math.sin(a)];}),'c2 w2')+M.dot(1,0,'ax','B(1,0)',8,10)+M.dot(0.8,0.6,'ax','A(0.8,0.6)',-10,-8)})},
// ---------- Lecture 6
L60:{cap:"An applied E lines up tiny dipoles: P is the dipole moment per unit volume.",svg:()=>scene({draw:M=>M.rect(1.5,0.5,6.5,4.0,'f1')+[1,2,3].map(r=>[0,1,2,3].map(c=>M.arrow(2.1+c*1.2,0.65+r*0.95,2.85+c*1.2,0.65+r*0.95,'c2 w2')).join('')).join('')+M.arrow(1.5,4.5,6.5,4.5,'c1 w2','E',10,4)})},
L61:{cap:"Polarisation leaves bound charge on the faces (σ_b = P·n̂), which weakens E inside.",svg:()=>scene({draw:M=>M.rect(2.6,0.6,5.4,4.4,'f1')+[1.1,2,2.9,3.8].map(y=>M.text(2.85,y,'−','t1')+M.text(5.15,y,'+','t2')).join('')+[1.5,3.5].map(y=>M.arrow(0.3,y,2.3,y,'c1 w2')+M.arrow(5.7,y,7.7,y,'c1 w2')+M.arrow(3.4,y,4.6,y,'c1 thin')).join('')+M.text(4,2.5,'E weaker','lb')})},
L62:{cap:"D = ε₀E + P: the field part plus the material's polarisation.",svg:()=>scene({draw:M=>M.arrow(0.6,3.2,4.2,3.2,'c1 w3','ε₀E',-60,-12)+M.arrow(4.2,3.2,6.6,3.2,'c2 w3','P',-14,-12)+M.arrow(0.6,1.6,6.6,1.6,'c3 w3','D',-90,-12)})},
L63:{cap:"Field inside a dielectric is reduced by 1/εr (Teflon ≈ 2.1, glass ≈ 5).",svg:()=>plot({x:[0,10],y:[0,1.1],fns:[{f:k=>1/k,r:[1,10],label:'E/E₀',lx:6}],pts:[{x:2.1,y:1/2.1,label:'Teflon',dx:20,dy:-4},{x:5,y:0.2,label:'glass',dy:-9}],xl:'εr'})},
L64:{cap:"Charge inside a dielectric shell: D (dashed) is smooth; E drops by εr inside the material.",svg:()=>plot({x:[0,3],y:[0,3],fns:[{f:r=>inv(r,2),c:'c3',dash:1,label:'D/ε₀',lx:0.72,dx:4},{f:r=>r>=0.9&&r<=1.8?1/(3*r*r):inv(r,2),label:'E',lx:2.2}],vl:[{x:0.9,label:'εr'},{x:1.8}],xl:'r'})},
L65:{cap:"Same Q: E inside the dielectric is cut by εr, so V drops and C rises.",svg:()=>field({f:x=>Math.abs(x)<0.8?[Math.abs(x)<0.5?0.3:1,0]:null,n:[12,7],under:M=>M.rect(-0.5,-1.1,0.5,1.1,'f1')+M.text(0,-1.18,'εr','t1')+plates(M)})},
L66:{cap:"Filling the gap multiplies C by εr.",svg:()=>plot({x:[0,6],y:[0,6.5],fns:[{f:k=>k,r:[1,6],label:'C/C₀',lx:3.5,dx:-5,anchor:'end'}],xl:'εr'})},
L67:{cap:"Layers parallel to the plates act in series; side-by-side regions act in parallel.",svg:()=>scene({draw:M=>M.rect(0.5,0.9,3.5,2.6,'f1')+M.rect(0.5,2.6,3.5,4.3,'f2')+M.text(2,1.75,'ε₁','t1')+M.text(2,3.45,'ε₂','t2')+M.rect(4.5,0.9,6,4.3,'f1')+M.rect(6,0.9,7.5,4.3,'f2')+M.text(5.25,2.6,'ε₁','t1')+M.text(6.75,2.6,'ε₂','t2')+[0.5,4.5].map(x=>M.line(x,4.4,x+3,4.4,'ax w4')+M.line(x,0.8,x+3,0.8,'ax w4')).join('')+M.text(2,0.3,'series','lb')+M.text(6,0.3,'parallel','lb')})},
L68:{cap:"At the same E, a dielectric stores εr times more energy per volume.",svg:()=>plot({x:[0,2],y:[0,2.2],fns:[{f:e=>0.5*e*e,label:'vacuum',lx:1.6,dy:14},{f:e=>1.5*e*e,c:'c2',label:'εr = 3',lx:1.0,dx:-5,anchor:'end'}],xl:'E',yl:'u'})},
L69:{cap:"E∥ and D⊥ are continuous, so field lines bend at the interface between two media.",svg:()=>scene({draw:M=>M.rect(0,2.5,8,5,'f1')+M.rect(0,0,8,2.5,'f2')+M.line(0,2.5,8,2.5,'ax w2')+M.line(4,0.2,4,4.8,'ax dash')+M.arrow(2,4.6,4,2.5,'c1 w3','E₁',-16,-4)+M.arrow(4,2.5,6.2,1.45,'c2 w3','E₂',10,-4)+M.text(0.7,4.4,'ε₁','t1')+M.text(0.7,0.5,'ε₂ > ε₁','t2','start')})},
L610:{cap:"At a conductor's surface E is perpendicular, with E = σ/ε₀.",svg:()=>field({f:(x,y)=>y>-0.3?[0,1]:null,n:[11,6],fixed:1,under:M=>M.rect(-2,-1.25,2,-0.38,'metal')+M.text(0,-0.85,'conductor (E = 0)','lb')+[-1.6,-0.8,0,0.8,1.6].map(x=>M.text(x,-0.48,'+','t2')).join('')})},
L611:{cap:"Replace the grounded plane by an opposite image charge. The field above the plane is unchanged.",svg:()=>field({f:(x,y)=>y>0.02?pc([[0,0.6,1],[0,-0.6,-1]])(x,y):null,charges:[[0,0.6,'+','Q'],[0,-0.6,'−','image']],under:M=>M.rect(-2,-1.25,2,0,'ghost')+M.line(-2,0,2,0,'ax w3')})},
L612:{cap:"E = 0 inside the metal slab; field exists only in the gaps, so the effective gap is d − t.",svg:()=>field({f:x=>Math.abs(x)<0.8&&Math.abs(x)>0.35?[1,0]:null,n:[14,7],fixed:1,under:M=>M.rect(-0.3,-1.1,0.3,1.1,'metal')+M.text(0,0,'t','lb')+plates(M)})},
L613:{cap:"A closed conducting shell shields its inside: E = 0 in the cavity.",svg:()=>field({f:(x,y)=>Math.hypot(x,y)<1.18?null:[1,0],n:[13,8],fixed:1,under:M=>M.circ(0,0,1.08,'metal')+M.circ(0,0,0.8,'hole')+M.text(0,0,'E = 0','lb')})},
// ---------- Maxwell / later
EM0:{cap:"Curl equations: a current (⊙, out of the page) or a changing field makes a swirling field.",svg:()=>field({f:(x,y)=>{const r2=x*x+y*y;return r2<0.04?null:[-y/r2,x/r2];},over:M=>M.circ(0,0,0.11,'c2 w2')+M.dot(0,0,'c2','I',12,-8)})},
EM1:{cap:"∮H·dl around the dashed loop equals the current passing through it.",svg:()=>field({f:(x,y)=>{const r2=x*x+y*y;return r2<0.04?null:[-y/r2,x/r2];},cls:'c1 faint',over:M=>M.circ(0,0,0.85,'c2 dash w2')+M.circ(0,0,0.11,'c2 w2')+M.dot(0,0,'c2')})},
EM2:{cap:"B around a long straight wire falls off as 1/r.",svg:()=>plot({x:[0,3],y:[0,3],fns:[{f:r=>1/r,label:'B ∝ 1/r',lx:1.0,dx:5}],xl:'r'})},
EM3:{cap:"cos(kx − ωt): the crest moves toward +x as time passes. One wavelength is crest to crest.",svg:()=>plot({x:[0,4],y:[-1.3,1.3],fns:[{f:x=>Math.cos(Math.PI*x),label:'t = 0',lx:0.05,dy:-6},{f:x=>Math.cos(Math.PI*(x-0.35)),c:'c2',dash:1,label:'later →',lx:2.4,dy:-8}],vl:[{x:2,label:'λ'}],xl:'x'})},
EM4:{cap:"E and B oscillate in phase and perpendicular to each other; S = E × H points along the travel direction.",svg:()=>plot({x:[0,4],y:[-1.3,1.3],fns:[{f:x=>Math.sin(Math.PI*x),label:'E',lx:0.5,dy:-4},{f:x=>0.55*Math.sin(Math.PI*x),c:'c2',label:'B',lx:1.5,dy:14}],xl:'x'})},
EM5:{cap:"Magnetic energy grows with the square of the current: U = ½LI².",svg:()=>plot({x:[0,2],y:[0,2.2],fns:[{f:i=>0.5*i*i,label:'U',lx:1.6,dx:-6,anchor:'end'}],xl:'I',yl:'U'})},
EM6:{cap:"The EMF peaks when the flux passes through zero, which is when it is changing fastest.",svg:()=>plot({x:[0,4],y:[-1.3,1.3],fns:[{f:t=>Math.cos(Math.PI*t),label:'Φ',lx:0.08,dy:-4},{f:t=>Math.sin(Math.PI*t),c:'c2',label:'EMF',lx:0.5,dy:-4}],xl:'t'})},
EM7:{cap:"The magnetic force is perpendicular to v, so a charge circles in a uniform B (× = into the page).",svg:()=>scene({xr:[-2,2],yr:[-1.25,1.25],draw:M=>{let s='';for(let i=-3;i<=3;i++)for(let j=-2;j<=2;j++)s+=M.text(i*0.6,j*0.5,'×','lb faint');return s+M.circ(0,0,0.8,'ax dash')+M.arrow(0,-0.8,0.75,-0.8,'c1 w3','v',8,4)+M.arrow(0,-0.8,0,-0.15,'c2 w3','F',10,6)+M.charge(0,-0.8,'+');}})},
};
return D;
})();
