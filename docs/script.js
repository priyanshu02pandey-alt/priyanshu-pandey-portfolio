// Ye wala typing amimation ko handle karega
const typingEl = document.getElementById("typing");
const roles = [
  "Computer Science Engineer",
  "MBA Business Analytics",
  "AI • Analytics • Full-Stack",
  "Healthcare Tech • Fraud • Vision"
];
let r = 0, i = 0, deleting = false;

function typeLoop(){
  const word = roles[r];
  if(!deleting){
    typingEl.textContent = word.slice(0, i++);
    if(i > word.length + 10) deleting = true;
  } else {
    typingEl.textContent = word.slice(0, i--);
    if(i < 0){
      deleting = false;
      r = (r + 1) % roles.length;
      i = 0;
    }
  }
  const speed = deleting ? 35 : 55;
  setTimeout(typeLoop, speed);
}
typeLoop();

// ====== Year ======
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll karte hi appear in animation display hoga
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries)=>{
  for(const e of entries){
    if(e.isIntersecting) e.target.classList.add("show");
  }
},{threshold:0.12});
reveals.forEach(el=>io.observe(el));

//ye wala skill section mei animation dalega
const bars = document.querySelectorAll(".bar span");
const barIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const w = e.target.getAttribute("data-width") || "80";
      e.target.style.width = w + "%";
      barIO.unobserve(e.target);
    }
  });
},{threshold:0.35});
bars.forEach(b=>barIO.observe(b));

//ye function cursor mei glowing animation daalega
const glow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (ev)=>{
  glow.style.left = ev.clientX + "px";
  glow.style.top  = ev.clientY + "px";
  glow.style.opacity = "1";
});
window.addEventListener("mouseleave", ()=> glow.style.opacity = "0");

// jaise hi button pe click karenge magnetic effect animation aaega
document.querySelectorAll(".magnetic").forEach(btn=>{
  btn.addEventListener("mousemove", (e)=>{
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    btn.style.transform = `translate(${x*0.14}px, ${y*0.18}px)`;
  });
  btn.addEventListener("mouseleave", ()=>{
    btn.style.transform = "translate(0,0)";
  });
});

// ====== 3D Tilt cards ======
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove", (e)=>{
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rx = (0.5 - y) * 10; // rotateX
    const ry = (x - 0.5) * 12; // rotateY
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
});

// ====== Copy number toast ======
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");
copyBtn?.addEventListener("click", async ()=>{
  try{
    await navigator.clipboard.writeText("9310098474");
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"), 1400);
  }catch{
    alert("Copy failed. Number: 9310098474");
  }
});

// ====== Modal content ======
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

const modalData = {
  p1: {
    title: "Hospital Application: 3D Navigation + AI Healthbot",
    body: `
      <p><b>Developed a hospital application</b> having a <b>3D navigation</b> feature and an <b>AI healthbot</b> that can:
      give advice and <b>book appointments & tests automatically</b>.</p>
      <p><b>Highlights</b></p>
      <ul>
        <li>Indoor navigation experience for complex layouts</li>
        <li>AI assistant for guidance + automation</li>
        <li>Workflow for appointments and lab tests</li>
      </ul>
    `
  },
  p2: {
    title: "Credit Card Fraud Detection",
    body: `
      <p>Detects fraud in credit card transactions using <b>past data</b> to learn suspicious patterns and flag risky transactions.</p>
      <p><b>Highlights</b></p>
      <ul>
        <li>Data preprocessing and feature handling</li>
        <li>Model training + evaluation pipeline</li>
        <li>Focus on reducing false positives</li>
      </ul>
    `
  },
  p3: {
    title: "Object Detection (CIFAR-10)",
    body: `
      <p>Built a computer vision pipeline using the <b>CIFAR-10 dataset</b> for object classification/detection style workflow.</p>
      <p><b>Highlights</b></p>
      <ul>
        <li>Dataset preparation and model training</li>
        <li>Validation and performance checks</li>
        <li>Clean structure to extend further</li>
      </ul>
    `
  }
};

document.querySelectorAll("[data-modal]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const key = btn.getAttribute("data-modal");
    const d = modalData[key];
    modalContent.innerHTML = `<h3>${d.title}</h3>${d.body}`;
    modal.classList.add("open");
  });
});

modalClose?.addEventListener("click", ()=> modal.classList.remove("open"));
modal?.addEventListener("click", (e)=>{
  if(e.target === modal) modal.classList.remove("open");
});

// ====== Mobile drawer ======
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("backdrop");

function closeDrawer(){
  drawer.classList.remove("open");
  backdrop.classList.remove("show");
}
menuBtn?.addEventListener("click", ()=>{
  drawer.classList.toggle("open");
  backdrop.classList.toggle("show");
});
backdrop?.addEventListener("click", closeDrawer);
document.querySelectorAll(".drawer-link").forEach(a=>{
  a.addEventListener("click", closeDrawer);
});

// ====== Particles (canvas) ======
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W, H, DPR;
let pts = [];

function resize(){
  DPR = Math.min(2, window.devicePixelRatio || 1);
  W = canvas.width = Math.floor(window.innerWidth * DPR);
  H = canvas.height = Math.floor(window.innerHeight * DPR);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  initPoints();
}
window.addEventListener("resize", resize);

function initPoints(){
  const count = Math.floor((window.innerWidth * window.innerHeight) / 22000);
  pts = Array.from({length: count}, ()=>({
    x: Math.random()*W,
    y: Math.random()*H,
    vx: (Math.random()-.5)*0.35*DPR,
    vy: (Math.random()-.5)*0.35*DPR,
    r: (Math.random()*1.6 + 0.8)*DPR,
    a: Math.random()*0.6 + 0.25
  }));
}

function step(){
  ctx.clearRect(0,0,W,H);

  // points
  for(const p of pts){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>W) p.vx *= -1;
    if(p.y<0||p.y>H) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(234,241,255,${p.a})`;
    ctx.fill();
  }

  // lines
  for(let i=0;i<pts.length;i++){
    for(let j=i+1;j<pts.length;j++){
      const a = pts[i], b = pts[j];
      const dx = a.x-b.x, dy = a.y-b.y;
      const d = Math.sqrt(dx*dx+dy*dy);
      const max = 150*DPR;
      if(d < max){
        const alpha = (1 - d/max) * 0.18;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.strokeStyle = `rgba(120,100,255,${alpha})`;
        ctx.lineWidth = 1*DPR;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(step);
}

resize();
step();
window.addEventListener("load",()=>{
  const l=document.getElementById("loader");
  l.style.opacity="0";
  setTimeout(()=>l.remove(),500);
});


