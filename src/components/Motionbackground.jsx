import React, { useEffect, useRef } from "react";

/* ---------------- TECH ICONS ---------------- */

const ICONS = [
{
name:"HTML5",
color:"#E34F26",
svg:(c)=>(
<svg viewBox="0 0 100 100">
<path d="M15 8L22 88L50 96L78 88L85 8H15Z" fill={c}/>
<path d="M50 90L72 83L78 20H50V90Z" fill="#fff" opacity="0.2"/>
<text x="28" y="65" fill="#fff" fontSize="32" fontWeight="bold">5</text>
</svg>
)
},

{
name:"CSS3",
color:"#1572B6",
svg:(c)=>(
<svg viewBox="0 0 100 100">
<path d="M15 8L22 88L50 96L78 88L85 8H15Z" fill={c}/>
<path d="M50 90L72 83L78 20H50V90Z" fill="#fff" opacity="0.2"/>
<text x="28" y="65" fill="#fff" fontSize="32" fontWeight="bold">3</text>
</svg>
)
},

{
name:"React",
color:"#61DAFB",
svg:(c)=>(
<svg viewBox="0 0 100 100">
<ellipse cx="50" cy="50" rx="40" ry="16" stroke={c} strokeWidth="4" fill="none"/>
<ellipse cx="50" cy="50" rx="40" ry="16" stroke={c} strokeWidth="4" fill="none" transform="rotate(60 50 50)"/>
<ellipse cx="50" cy="50" rx="40" ry="16" stroke={c} strokeWidth="4" fill="none" transform="rotate(120 50 50)"/>
<circle cx="50" cy="50" r="6" fill={c}/>
</svg>
)
},

{
name:"Node",
color:"#68A063",
svg:(c)=>(
<svg viewBox="0 0 100 100">
<polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill={c}/>
<text x="28" y="60" fill="#fff" fontSize="20" fontWeight="bold">JS</text>
</svg>
)
},

{
name:"MongoDB",
color:"#47A248",
svg:(c)=>(
<svg viewBox="0 0 100 100">
<path d="M50 10C28 32 28 65 50 92C72 65 72 32 50 10Z" fill={c}/>
<rect x="47" y="70" width="6" height="20" fill={c}/>
</svg>
)
},

{
name:"Express",
color:"#ffffff",
svg:(c)=>(
<svg viewBox="0 0 100 100">
<rect x="12" y="20" width="76" height="60" rx="10" stroke={c} strokeWidth="4" fill="none"/>
<text x="18" y="60" fill={c} fontSize="18" fontWeight="bold">express</text>
</svg>
)
}
];


/* ---------------- COMPONENT ---------------- */

const MotionBackground = () => {

const refs = useRef([])
const states = useRef([])
const mouse = useRef({x:-9999,y:-9999})
const raf = useRef()

useEffect(()=>{

const W = window.innerWidth
const H = window.innerHeight
const isMobile = W < 768

/* ---------- INIT STATES ---------- */

states.current = ICONS.map(icon=>{

const size = isMobile ? 28 + Math.random()*10 : 45 + Math.random()*15

return{

icon,
size,

x:Math.random()*(W-size),
y:Math.random()*(H-size),

vx:(Math.random()-0.5)*0.6,
vy:(Math.random()-0.5)*0.6,

rot:Math.random()*360,
rotV:(Math.random()-0.5)*0.2,

phase:Math.random()*Math.PI*2,
fspd:0.006+Math.random()*0.006,

alpha:0.12+Math.random()*0.2

}

})

/* ---------- INITIAL POSITION ---------- */

states.current.forEach((s,i)=>{

const el=refs.current[i]
if(!el) return

el.style.left=s.x+"px"
el.style.top=s.y+"px"
el.style.width=s.size+"px"
el.style.height=s.size+"px"
el.style.opacity=s.alpha

})

/* ---------- MOUSE TRACK ---------- */

const mouseMove=e=>{
mouse.current={x:e.clientX,y:e.clientY}
}

window.addEventListener("mousemove",mouseMove)

/* ---------- LOOP ---------- */

const loop=()=>{

const w=window.innerWidth
const h=window.innerHeight

const mx=mouse.current.x
const my=mouse.current.y

states.current.forEach((s,i)=>{

const el=refs.current[i]
if(!el) return

/* ICON REPULSION */

states.current.forEach((o,j)=>{

if(i===j) return

const dx=s.x-o.x
const dy=s.y-o.y

const dist=Math.sqrt(dx*dx+dy*dy)||1
const MIN=120

if(dist<MIN){

const f=(MIN-dist)/MIN

s.vx+=(dx/dist)*f*0.05
s.vy+=(dy/dist)*f*0.05

}

})

/* FLOAT MOTION */

s.phase+=s.fspd

s.vx+=Math.cos(s.phase)*0.02
s.vy+=Math.sin(s.phase)*0.02

/* MOUSE REPEL */

const cx=s.x+s.size/2
const cy=s.y+s.size/2

const dx=cx-mx
const dy=cy-my

const dist=Math.sqrt(dx*dx+dy*dy)||1
const REPEL=150

if(dist<REPEL){

const pct=1-dist/REPEL

s.vx+=(dx/dist)*pct*0.2
s.vy+=(dy/dist)*pct*0.2

}

/* DAMPING (slow movement) */

s.vx*=0.995
s.vy*=0.995

/* MOVE */

s.x+=s.vx
s.y+=s.vy
s.rot+=s.rotV

/* EDGE PUSH */

const m=50

if(s.x<m) s.vx+=0.1
if(s.x>w-s.size-m) s.vx-=0.1

if(s.y<m) s.vy+=0.1
if(s.y>h-s.size-m) s.vy-=0.1

/* APPLY */

const pulse=1+Math.sin(s.phase*2)*0.03

el.style.left=s.x+"px"
el.style.top=s.y+"px"

el.style.transform=`rotate(${s.rot}deg) scale(${pulse})`

el.style.filter=`drop-shadow(0 0 6px ${s.icon.color}55)`

})

raf.current=requestAnimationFrame(loop)

}

loop()

return()=>{
cancelAnimationFrame(raf.current)
window.removeEventListener("mousemove",mouseMove)
}

},[])

return(

<>
{ICONS.map((icon,i)=>(
<div
key={i}
ref={el=>refs.current[i]=el}
style={{
position:"fixed",
pointerEvents:"none",
transition:"opacity .3s, filter .2s",
willChange:"transform,left,top",
zIndex:0
}}
>
{icon.svg(icon.color)}
</div>
))}
</>

)

}

export default MotionBackground