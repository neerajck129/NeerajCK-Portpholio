
// import React, { useRef } from 'react'
// import { gsap } from "gsap";
// import { useGSAP } from '@gsap/react';

// const Skills = () => {

//   const container = useRef();

//   useGSAP(() => {
//     let tl = gsap.timeline({repeat: -1, repeatDelay: 1, yoyo: true})

// tl.to(".box1", { rotation: 360 });
// tl.to(".box2", { rotation: 360 });
// tl.to(".box3", { rotation: 360 });
// tl.to(".box4", { rotation: 360 });
// tl.to(".box5", { rotation: 360 });
// tl.to(".box6", { rotation: 360 });


//   },{ scope: container });


//   return (
//     <>
//       <div ref={container} id="skills" className='px-6 md:px-[100px] overflow-x-hidden'>

//         <h1 className='head1 text-white text-[30px] md:text-[55px] font-medium mt-[60px]'>
//           Skill<span className='text-[#42C5C9]'>s</span>
//         </h1>

//         <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 mt-6 justify-items-center glow-disabled'>

//           <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300  '>
//             <img className='w-[80px] md:w-[100px] box1' src="./logo/html.png" alt="HTML" />
//             <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>HTML5</h3>
//           </div>

//           <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
//             <img className='box2 w-[80px] md:w-[100px]' src="./logo/css.png" alt="CSS" />
//             <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>CSS3</h3>
//           </div>

//           <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
//             <img className='box3 w-[80px] md:w-[100px]' src="./logo/njs.png" alt="NodeJS" />
//             <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>NodeJS</h3>
//           </div>

//           <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
//             <img className='box4 w-[80px] md:w-[100px]' src="./logo/react.png" alt="React" />
//             <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>ReactJS</h3>
//           </div>

//           <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
//             <img className='box5 w-[80px] md:w-[100px]' src="./logo/ejs.png" alt="Express" />
//             <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>ExpressJS</h3>
//           </div>

//           <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
//             <img className='box6 w-[80px] md:w-[100px]' src="./logo/mongo.png" alt="MongoDB" />
//             <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>MongoDB</h3>
//           </div>

//         </div>

//       </div>
//     </>
//   )
// }

// export default Skills

import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CYAN = '#42C5C9';

/* ── Hex → "r,g,b" helper ── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ].join(',');
}

/* ─────────────────────────────────────────────────────────────
   Skill groups — devicons CDN for crisp original brand logos
───────────────────────────────────────────────────────────── */
const skillGroups = [
  {
    category: 'Frontend',
    sub: 'UI & Styling',
    color: CYAN,
    skills: [
      { name: 'HTML5',      bg: '#e34c26', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3',       bg: '#264de4', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', bg: '#f7df1e', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React.js',   bg: '#20232a', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Redux',      bg: '#764abc', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'Tailwind',   bg: '#0f172a', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    category: 'Backend',
    sub: 'Server & API',
    color: '#a761ff',
    skills: [
      { name: 'Node.js',    bg: '#3c873a', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', bg: '#2d2d2d', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', logoBorder: 'rgba(255,255,255,0.15)' },
      { name: 'MongoDB',    bg: '#13aa52', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'JWT',        bg: '#1a1a2e', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jsonwebtokens/jsonwebtokens-original.svg' },
      { name: 'REST APIs',  bg: '#85ea2d', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg' },
    ],
  },
  {
    category: 'Tools',
    sub: 'Dev Workflow',
    color: '#FFA048',
    skills: [
      { name: 'Git',     bg: '#f1502f', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub',  bg: '#24292e', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', logoBorder: 'rgba(255,255,255,0.12)' },
      { name: 'Postman', bg: '#ff6c37', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      { name: 'VS Code', bg: '#0078d4', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Vercel',  bg: '#1a1a1a', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', logoBorder: 'rgba(255,255,255,0.18)' },
    ],
  },
  {
    category: 'Design',
    sub: 'Creative Suite',
    color: '#ff6b9d',
    skills: [
      { name: 'Figma',       bg: '#1e1e1e', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Photoshop',   bg: '#001e36', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' },
      { name: 'Illustrator', bg: '#330000', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
    ],
  },
];

/* ── Single skill chip ── */
const SkillChip = ({ skill, color }) => {
  const chipRef = useRef();
  const rgb     = hexToRgb(color);

  const onEnter = useCallback(() => {
    gsap.to(chipRef.current, {
      y: -3, scale: 1.05,
      borderColor: `rgba(${rgb},0.55)`,
      backgroundColor: `rgba(${rgb},0.08)`,
      duration: 0.2, ease: 'power2.out',
    });
  }, [rgb]);

  const onLeave = useCallback(() => {
    gsap.to(chipRef.current, {
      y: 0, scale: 1,
      borderColor: 'rgba(255,255,255,0.07)',
      backgroundColor: 'rgba(255,255,255,0.03)',
      duration: 0.4, ease: 'elastic.out(1,0.5)',
    });
  }, []);

  return (
    <div
      ref={chipRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 10px 12px',
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.03)',
        cursor: 'default',
        willChange: 'transform',
        flexShrink: 0,
        width: 'calc(25% - 6px)',
        minWidth: '80px',
      }}
    >
      {/* Brand logo */}
      <div style={{
        width: '36px', height: '36px',
        borderRadius: '10px',
        background: skill.bg,
        border: `1px solid ${skill.logoBorder || 'rgba(255,255,255,0.08)'}`,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden', flexShrink: 0,
      }}>
        <img
          src={skill.src}
          alt={skill.name}
          style={{ width: '24px', height: '24px', objectFit: 'contain', display: 'block' }}
          onError={e => {
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML =
              `<span style="font-size:9px;font-weight:800;color:rgba(255,255,255,0.9)">
                ${skill.name.slice(0, 2).toUpperCase()}
              </span>`;
          }}
        />
      </div>

      {/* Name */}
      <span style={{
        fontSize: '12px', fontWeight: '600',
        color: 'rgba(255,255,255,0.78)',
        letterSpacing: '0.2px',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}>{skill.name}</span>
    </div>
  );
};

/* ── Skill category card — magnetic 3D tilt + spotlight ── */
const SkillCard = ({ group, cardIndex }) => {
  const cardRef = useRef();
  const spotRef = useRef();
  const glowRef = useRef();
  const rgb     = hexToRgb(group.color);

  /* same magnetic tilt pattern as ProjectCard */
  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx   = rect.width  / 2;
    const cy   = rect.height / 2;
    const dx   = e.clientX - rect.left - cx;
    const dy   = e.clientY - rect.top  - cy;

    gsap.to(card, {
      rotateX: (-dy / cy) * 10,
      rotateY: ( dx / cx) * 10,
      scale: 1.03,
      transformPerspective: 800,
      ease: 'power1.out',
      duration: 0.25,
    });

    const px = ((e.clientX - rect.left) / rect.width)  * 100;
    const py = ((e.clientY - rect.top)  / rect.height) * 100;
    if (spotRef.current) {
      spotRef.current.style.background =
        `radial-gradient(circle at ${px}% ${py}%, rgba(${rgb},0.18) 0%, transparent 65%)`;
    }
  }, [rgb]);

  const onMouseEnter = useCallback(() => {
    gsap.to(glowRef.current, { opacity: 1, duration: 0.25 });
    if (cardRef.current) cardRef.current.style.borderColor = `rgba(${rgb},0.4)`;
  }, [rgb]);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0, rotateY: 0, scale: 1,
      duration: 0.6, ease: 'elastic.out(1,0.5)',
    });
    card.style.borderColor = 'rgba(255,255,255,0.07)';
    if (spotRef.current) spotRef.current.style.background = 'transparent';
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`skill-card skill-card-${cardIndex}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'linear-gradient(160deg, #0e1a1b 0%, #080f10 100%)',
        padding: '22px 20px 20px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* Cursor spotlight */}
      <div ref={spotRef} style={{
        position: 'absolute', inset: 0, borderRadius: '20px',
        pointerEvents: 'none', zIndex: 3,
        transition: 'background 0.06s linear',
      }} />

      {/* Glow ring on hover */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: '-1px', borderRadius: '21px',
        opacity: 0, pointerEvents: 'none', zIndex: 4,
        boxShadow: `0 0 0 1.5px ${group.color}, 0 0 40px rgba(${rgb},0.25)`,
      }} />

      {/* Corner ambient orb */}
      <div style={{
        position: 'absolute', width: '100px', height: '100px',
        borderRadius: '50%', top: '-30px', right: '-30px',
        background: group.color, opacity: 0.06,
        filter: 'blur(30px)', pointerEvents: 'none',
      }} />

      {/* Top colour bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2.5px', borderRadius: '20px 20px 0 0',
        background: `linear-gradient(90deg, ${group.color}, rgba(${rgb},0.2))`,
      }} />

      {/* Card header — same category-line style as Projects & Education */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        marginBottom: '16px', position: 'relative', zIndex: 2,
      }}>
        <div style={{
          width: '18px', height: '1.5px',
          background: group.color, borderRadius: '2px', flexShrink: 0,
        }} />
        <span style={{
          color: group.color, fontSize: '10px', fontWeight: '700',
          letterSpacing: '2px', textTransform: 'uppercase',
        }}>{group.category}</span>
        <span style={{
          color: 'rgba(255,255,255,0.2)', fontSize: '10px',
          letterSpacing: '1px', textTransform: 'uppercase',
        }}>— {group.sub}</span>
      </div>

      {/* Chips */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        gap: '8px', position: 'relative', zIndex: 2,
      }}>
        {group.skills.map((skill, i) => (
          <SkillChip key={i} skill={skill} color={group.color} />
        ))}
      </div>
    </div>
  );
};

/* ── Section ── */
const Skills = () => {
  const container = useRef();

  useGSAP(() => {
    /* heading — identical timing to Projects & Education */
    gsap.from('.skills-label', {
      scrollTrigger: { trigger: '.skills-label', start: 'top 88%' },
      y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
    });
    gsap.from('.skills-heading', {
      scrollTrigger: { trigger: '.skills-heading', start: 'top 88%' },
      y: 36, opacity: 0, duration: 0.85, delay: 0.12, ease: 'power3.out',
    });

    /* cards stagger slide-up — identical to Projects.jsx */
    gsap.from('.skill-card', {
      scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' },
      y: 60, opacity: 0, duration: 0.7,
      ease: 'power3.out', stagger: 0.12,
    });

    /* chips pop in per card */
    skillGroups.forEach((_, i) => {
      gsap.from(`.skill-card-${i} .skill-chip`, {
        scrollTrigger: { trigger: `.skill-card-${i}`, start: 'top 88%' },
        y: 14, opacity: 0, scale: 0.82,
        duration: 0.38, ease: 'back.out(1.5)',
        stagger: 0.06, delay: i * 0.1 + 0.2,
      });
    });
  }, { scope: container });

  return (
    <div ref={container} id="skills" style={{ paddingTop: '70px' }}>

      {/* Header — identical to Projects & Education */}
      <div style={{ padding: '0 clamp(24px, 8vw, 100px) 32px' }}>
        <p className="skills-label" style={{
          color: CYAN, fontSize: '11px', letterSpacing: '3.5px',
          textTransform: 'uppercase', fontWeight: '700',
          marginBottom: '10px', opacity: 1,
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{
            display: 'inline-block', width: '30px', height: '1.5px',
            background: CYAN, borderRadius: '2px',
          }} />
          Tech Stack
        </p>
        <h1 className="skills-heading" style={{
          color: '#ffffff',
          fontSize: 'clamp(28px, 5vw, 55px)',
          fontWeight: '500',
          lineHeight: 1.1,
          opacity: 1,
        }}>
          My <span style={{ color: CYAN }}>Skills</span>
        </h1>
      </div>

      {/* 2-col grid on desktop, horizontal scroll on mobile — same as Projects.jsx */}
      <div
        className="skills-grid"
        style={{
          display: 'flex',
          gap: '22px',
          overflowX: 'auto',
          overflowY: 'visible',
          padding: '10px clamp(24px, 8vw, 100px) 36px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: `${CYAN} transparent`,
        }}
      >
        {skillGroups.map((group, i) => (
          <SkillCard key={i} group={group} cardIndex={i} />
        ))}
      </div>

      <style>{`
        .skills-grid::-webkit-scrollbar { height: 3px; }
        .skills-grid::-webkit-scrollbar-track { background: transparent; }
        .skills-grid::-webkit-scrollbar-thumb { background: ${CYAN}; border-radius: 10px; }
        .skill-card { width: clamp(300px, 78vw, 420px); flex-shrink: 0; }
        @media (min-width: 900px) {
          .skills-grid { flex-wrap: wrap; overflow-x: visible; }
          .skill-card { width: calc(50% - 11px); }
        }
      `}</style>
    </div>
  );
};

export default Skills;