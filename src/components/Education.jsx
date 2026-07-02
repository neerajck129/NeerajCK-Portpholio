// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';

// gsap.registerPlugin(ScrollTrigger);

// const CYAN   = '#42C5C9';
// const PURPLE = '#a761ff';
// const AMBER  = '#FFA048';

// const education = [
//   {
//     year: '2025 – 2026',
//     degree: 'MERN Full-Stack Development',
//     school: 'Luminar Technolab',
//     location: 'Kochi',
//     label: 'Certification + Internship',
//     stat: null,
//     tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT'],
//     icon: '⚡',
//     color: CYAN,
//     colorRgb: '66,197,201',
//     bg: 'linear-gradient(160deg, #0e2022 0%, #081516 100%)',
//     progress: 90,
//   },
//   {
//     year: '2022 – 2025',
//     degree: 'B.Tech — Computer Science & Technology',
//     school: 'KMCT College of Engineering',
//     location: 'Kozhikode',
//     label: null,
//     stat: null,
//     tags: ['DSA', 'OOP', 'OS', 'Networks', 'DBMS', 'Software Engg.'],
//     icon: '🖥️',
//     color: CYAN,
//     colorRgb: '167,97,255',
//     bg: 'linear-gradient(160deg, #130e22 0%, #0c0815 100%)',
//     progress: 96,
//   },
//   {
//     year: '2019 – 2022',
//     degree: 'Diploma in Computer Hardware Engg.',
//     school: 'JDT Islam Polytechnic College',
//     location: 'Kozhikode',
//     label: null,
//     stat: null,
//     tags: ['Hardware', 'Networking', 'Electronics', 'Troubleshooting'],
//     icon: '💾',
//     color: CYAN,
//     colorRgb: '255,160,72',
//     bg: 'linear-gradient(160deg, #1a1208 0%, #130d05 100%)',
//     progress: 82,
//   },
// ];

// /* ── Individual Card ── */
// const EduCard = ({ item }) => {
//   const cardRef    = useRef();
//   const spotRef    = useRef();
//   const glowRef    = useRef();
//   const progRef    = useRef();
//   const triggered  = useRef(false);

//   /* 3-D tilt + spotlight — mirrors ProjectCard exactly */
//   const onMouseMove = (e) => {
//     const card = cardRef.current;
//     if (!card) return;
//     const rect = card.getBoundingClientRect();
//     const cx   = rect.width  / 2;
//     const cy   = rect.height / 2;
//     const dx   = e.clientX - rect.left - cx;
//     const dy   = e.clientY - rect.top  - cy;

//     gsap.to(card, {
//       rotateX: (-dy / cy) * 8,
//       rotateY: ( dx / cx) * 8,
//       transformPerspective: 900,
//       ease: 'power1.out',
//       duration: 0.25,
//     });

//     const px = ((e.clientX - rect.left) / rect.width)  * 100;
//     const py = ((e.clientY - rect.top)  / rect.height) * 100;
//     if (spotRef.current) {
//       spotRef.current.style.background =
//         `radial-gradient(circle at ${px}% ${py}%, rgba(${item.colorRgb},0.18) 0%, transparent 65%)`;
//     }
//   };

//   const onMouseLeave = () => {
//     gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
//     if (spotRef.current) spotRef.current.style.background = 'transparent';
//     if (glowRef.current)  gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
//   };

//   const onMouseEnter = () => {
//     if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
//   };

//   /* Progress bar animates when card scrolls into view */
//   useEffect(() => {
//     const el = progRef.current;
//     if (!el) return;
//     const trigger = ScrollTrigger.create({
//       trigger: el,
//       start: 'top 90%',
//       onEnter: () => {
//         if (!triggered.current) {
//           triggered.current = true;
//           gsap.to(el, {
//             width: `${item.progress}%`,
//             duration: 1.3,
//             ease: 'power3.out',
//             delay: 0.2,
//           });
//         }
//       },
//     });
//     return () => trigger.kill();
//   }, [item.progress]);

//   return (
//     <article
//       ref={cardRef}
//       className="edu-card"
//       onMouseMove={onMouseMove}
//       onMouseLeave={onMouseLeave}
//       onMouseEnter={onMouseEnter}
//       style={{
//         flexShrink: 0,
//         width: 'clamp(300px, 78vw, 360px)',
//         borderRadius: '20px',
//         overflow: 'hidden',
//         position: 'relative',
//         background: item.bg,
//         border: `1px solid rgba(${item.colorRgb},0.2)`,
//         transformStyle: 'preserve-3d',
//         willChange: 'transform',
//         cursor: 'default',
//         boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
//       }}
//     >
//       {/* Mouse spotlight layer */}
//       <div ref={spotRef} style={{
//         position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
//         transition: 'background 0.08s linear', borderRadius: '20px',
//       }} />

//       {/* Outer glow ring on hover */}
//       <div ref={glowRef} style={{
//         position: 'absolute', inset: '-1px', borderRadius: '21px',
//         opacity: 0, pointerEvents: 'none', zIndex: 4,
//         background: 'transparent',
//         boxShadow: `0 0 0 1.5px ${item.color}, 0 0 40px rgba(${item.colorRgb},0.25)`,
//       }} />

//       {/* Top colour bar */}
//       <div style={{
//         height: '3px',
//         background: `linear-gradient(90deg, ${item.color}, rgba(${item.colorRgb},0.2))`,
//       }} />

//       {/* Card body */}
//       <div style={{ padding: '22px 22px 24px', position: 'relative', zIndex: 2 }}>

//         {/* Year badge + icon */}
//         <div style={{
//           display: 'flex', alignItems: 'center',
//           justifyContent: 'space-between', marginBottom: '16px',
//         }}>
//           <span style={{
//             background: `rgba(${item.colorRgb},0.1)`,
//             border: `1px solid rgba(${item.colorRgb},0.3)`,
//             color: item.color,
//             fontSize: '10px', fontWeight: '700',
//             letterSpacing: '1.5px', textTransform: 'uppercase',
//             padding: '4px 12px', borderRadius: '20px',
//           }}>{item.year}</span>

//           <div style={{
//             width: '40px', height: '40px', borderRadius: '12px',
//             background: `rgba(${item.colorRgb},0.1)`,
//             border: `1px solid rgba(${item.colorRgb},0.25)`,
//             display: 'flex', alignItems: 'center',
//             justifyContent: 'center', fontSize: '18px',
//           }}>{item.icon}</div>
//         </div>

//         {/* Category line — same as Projects.jsx */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
//           <div style={{ width: '18px', height: '1.5px', background: item.color, borderRadius: '2px' }} />
//           <span style={{
//             color: item.color, fontSize: '10px', fontWeight: '700',
//             letterSpacing: '2px', textTransform: 'uppercase',
//           }}>{item.label}</span>
//         </div>

//         {/* Degree */}
//         <h2 style={{
//           color: '#f0fafa',
//           fontSize: 'clamp(15px, 2.5vw, 18px)',
//           fontWeight: '700',
//           marginBottom: '6px',
//           lineHeight: 1.25,
//           letterSpacing: '-0.3px',
//         }}>{item.degree}</h2>

//         {/* School · Location */}
//         <p style={{
//           color: '#6b8a8d',
//           fontSize: '13px',
//           lineHeight: '1.6',
//           marginBottom: '18px',
//           fontWeight: '300',
//         }}>
//           {item.school}
//           <span style={{ color: `rgba(${item.colorRgb},0.5)`, margin: '0 6px' }}>·</span>
//           {item.location}
//         </p>

//         {/* Progress bar (shown when stat exists) */}
//         {item.stat && (
//           <div style={{ marginBottom: '16px' }}>
//             <div style={{
//               display: 'flex', justifyContent: 'space-between',
//               fontSize: '10.5px', color: '#6b8a8d', marginBottom: '6px',
//             }}>
//               <span>Score</span>
//               <span style={{ color: item.color, fontWeight: '600' }}>{item.stat}</span>
//             </div>
//             <div style={{
//               height: '3px', borderRadius: '3px',
//               background: 'rgba(255,255,255,0.07)', overflow: 'hidden',
//             }}>
//               <div ref={progRef} style={{
//                 height: '100%', borderRadius: '3px', width: '0%',
//                 background: `linear-gradient(90deg, rgba(${item.colorRgb},0.5), ${item.color})`,
//                 boxShadow: `0 0 8px rgba(${item.colorRgb},0.6)`,
//               }} />
//             </div>
//           </div>
//         )}

//         {/* Divider — same gradient style as Projects.jsx */}
//         <div style={{
//           height: '1px',
//           background: `linear-gradient(90deg, rgba(${item.colorRgb},0.3), transparent)`,
//           marginBottom: '16px',
//         }} />

//         {/* Tech / skill pills — same style as Projects.jsx */}
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
//           {item.tags.map((t, i) => (
//             <span key={i} style={{
//               fontSize: '11px',
//               color: item.color,
//               background: `rgba(${item.colorRgb},0.07)`,
//               border: `1px solid rgba(${item.colorRgb},0.22)`,
//               borderRadius: '5px',
//               padding: '3px 10px',
//               fontWeight: '600',
//               letterSpacing: '0.2px',
//             }}>{t}</span>
//           ))}
//         </div>
//       </div>
//     </article>
//   );
// };

// /* ── Section ── */
// const Education = () => {
//   const container = useRef();
//   const trackRef  = useRef();

//   useGSAP(() => {
//     /* heading animations — identical to Projects.jsx */
//     gsap.from('.edu-label', {
//       scrollTrigger: { trigger: '.edu-label', start: 'top 88%' },
//       y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
//     });
//     gsap.from('.edu-heading', {
//       scrollTrigger: { trigger: '.edu-heading', start: 'top 88%' },
//       y: 36, opacity: 0, duration: 0.85, delay: 0.12, ease: 'power3.out',
//     });

//     /* card stagger — identical to Projects.jsx */
//     gsap.from('.edu-card', {
//       scrollTrigger: { trigger: trackRef.current, start: 'top 82%' },
//       y: 60, opacity: 0, duration: 0.7,
//       ease: 'power3.out', stagger: 0.12,
//     });
//   }, { scope: container });

//   return (
//     <div ref={container} id="education" style={{ paddingTop: '70px' }}>

//       {/* Header — identical padding & structure as Projects.jsx */}
//       <div style={{ padding: '0 clamp(24px, 8vw, 100px) 32px' }}>
//         <p className="edu-label" style={{
//           color: CYAN, fontSize: '11px', letterSpacing: '3.5px',
//           textTransform: 'uppercase', fontWeight: '700',
//           marginBottom: '10px', opacity: 1,
//           display: 'flex', alignItems: 'center', gap: '10px',
//         }}>
//           <span style={{
//             display: 'inline-block', width: '30px', height: '1.5px',
//             background: CYAN, borderRadius: '2px',
//           }} />
//           Academic Journey
//         </p>
//         <h1 className="edu-heading" style={{
//           color: '#ffffff',
//           fontSize: 'clamp(28px, 5vw, 55px)',
//           fontWeight: '500',
//           lineHeight: 1.1,
//           opacity: 1,
//         }}>
//           My <span style={{ color: CYAN }}>Education</span>
//         </h1>
//       </div>

//       {/* Horizontal scroll track — identical to Projects.jsx */}
//       <div
//         ref={trackRef}
//         style={{
//           display: 'flex',
//           gap: '22px',
//           overflowX: 'auto',
//           overflowY: 'visible',
//           padding: '10px clamp(24px, 8vw, 100px) 36px',
//           WebkitOverflowScrolling: 'touch',
//           scrollbarWidth: 'thin',
//           scrollbarColor: `${CYAN} transparent`,
//         }}
//       >
//         {education.map((item, i) => <EduCard key={i} item={item} />)}
//       </div>

//       <style>{`
//         #education > div:last-child::-webkit-scrollbar { height: 3px; }
//         #education > div:last-child::-webkit-scrollbar-track { background: transparent; }
//         #education > div:last-child::-webkit-scrollbar-thumb { background: ${CYAN}; border-radius: 10px; }
//       `}</style>
//     </div>
//   );
// };

// export default Education;

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CYAN   = '#42C5C9';
const PURPLE = '#a761ff';
const AMBER  = '#FFA048';

/*
  NOTE: `stat` is null for all three entries below — fill in your actual
  score/CGPA (e.g. "8.7 CGPA" or "84%") and the score row will render
  automatically. Leave it null to omit the row entirely.
*/
const education = [
  {
    year: '2025 – 2026',
    degree: 'MERN Full-Stack Development',
    school: 'Luminar Technolab',
    location: 'Kochi',
    label: 'Certification + Internship',
    stat: null,
    tags: [null],
    icon: '⚡',
    color: CYAN,
    colorRgb: '66,197,201',
  },
  {
    year: '2022 – 2025',
    degree: 'B.Tech — Computer Science & Technology',
    school: 'KMCT College of Engineering',
    location: 'Kozhikode',
    label: null,
    stat: null,
    tags: null,
    icon: '🖥️',
    color: PURPLE,
    colorRgb: '167,97,255',
  },
  {
    year: '2019 – 2022',
    degree: 'Diploma in Computer Hardware Engg.',
    school: 'JDT Islam Polytechnic College',
    location: 'Kozhikode',
    label: null,
    stat: null,
    tags: null,
    icon: '💾',
    color: AMBER,
    colorRgb: '255,160,72',
  },
];

/* ── Single timeline entry ── */
const EduEntry = ({ item, index, isLast }) => {
  const rowRef  = useRef();
  const nodeRef = useRef();

  return (
    <div
      ref={rowRef}
      className="edu-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(64px, 8vw, 96px) 1fr',
        columnGap: 'clamp(14px, 3vw, 28px)',
        position: 'relative',
      }}
    >
      {/* Rail: node + connecting line */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div
          ref={nodeRef}
          className="edu-node"
          style={{
            width: 'clamp(44px, 6vw, 56px)',
            height: 'clamp(44px, 6vw, 56px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(18px, 2.4vw, 22px)',
            background: `rgba(${item.colorRgb},0.1)`,
            border: `1.5px solid rgba(${item.colorRgb},0.4)`,
            boxShadow: `0 0 22px rgba(${item.colorRgb},0.18)`,
            flexShrink: 0,
            zIndex: 2,
          }}
        >
          {item.icon}
        </div>
        {!isLast && (
          <div className="edu-line" style={{
            width: '2px',
            flex: 1,
            marginTop: '6px',
            background: `linear-gradient(180deg, rgba(${item.colorRgb},0.5), rgba(255,255,255,0.06))`,
            transformOrigin: 'top',
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 'clamp(32px, 5vw, 52px)' }}>
        <span style={{
          display: 'inline-block',
          color: item.color,
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>{item.year}</span>

        {item.label && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '16px', height: '1.5px', background: item.color, borderRadius: '2px' }} />
            <span style={{
              color: item.color, fontSize: '10px', fontWeight: '700',
              letterSpacing: '1.8px', textTransform: 'uppercase',
            }}>{item.label}</span>
          </div>
        )}

        <h2 style={{
          color: '#f0fafa',
          fontSize: 'clamp(17px, 2.6vw, 22px)',
          fontWeight: '700',
          lineHeight: 1.25,
          letterSpacing: '-0.3px',
          marginBottom: '6px',
        }}>{item.degree}</h2>

        <p style={{
          color: '#6b8a8d',
          fontSize: '13.5px',
          lineHeight: '1.6',
          fontWeight: '300',
          marginBottom: item.stat || item.tags ? '16px' : 0,
        }}>
          {item.school}
          <span style={{ color: `rgba(${item.colorRgb},0.5)`, margin: '0 6px' }}>·</span>
          {item.location}
        </p>

        {/* Score — only renders once `stat` is filled in */}
        {item.stat && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: item.tags ? '14px' : 0,
            background: `rgba(${item.colorRgb},0.08)`,
            border: `1px solid rgba(${item.colorRgb},0.25)`,
            borderRadius: '8px',
            padding: '6px 14px',
          }}>
            <span style={{ color: '#6b8a8d', fontSize: '10.5px', letterSpacing: '1px', textTransform: 'uppercase' }}>Score</span>
            <span style={{ color: item.color, fontSize: '13px', fontWeight: '700' }}>{item.stat}</span>
          </div>
        )}

        {/* Tags — Luminar only, per the content brief */}
        {item.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {item.tags.map((t, i) => (
              <span key={i} style={{
                fontSize: '11px',
                color: item.color,
                background: `rgba(${item.colorRgb},0.07)`,
                border: `1px solid rgba(${item.colorRgb},0.22)`,
                borderRadius: '5px',
                padding: '3px 10px',
                fontWeight: '600',
                letterSpacing: '0.2px',
              }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Section ── */
const Education = () => {
  const container = useRef();
  const trackRef  = useRef();

  useGSAP(() => {
    gsap.from('.edu-label', {
      scrollTrigger: { trigger: '.edu-label', start: 'top 88%' },
      y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
    });
    gsap.from('.edu-heading', {
      scrollTrigger: { trigger: '.edu-heading', start: 'top 88%' },
      y: 36, opacity: 0, duration: 0.85, delay: 0.12, ease: 'power3.out',
    });

    /* Rows fade/slide in */
    gsap.utils.toArray('.edu-row').forEach((row) => {
      gsap.from(row, {
        scrollTrigger: { trigger: row, start: 'top 85%' },
        x: -24, opacity: 0, duration: 0.7, ease: 'power3.out',
      });
    });

    /* Connecting line "draws" as you scroll past each node */
    gsap.utils.toArray('.edu-line').forEach((line) => {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: line,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 0.6,
        },
      });
    });
  }, { scope: container });

  return (
    <div ref={container} id="education" style={{ paddingTop: '70px' }}>

      <div style={{ padding: '0 clamp(24px, 8vw, 100px) 48px' }}>
        <p className="edu-label" style={{
          color: CYAN, fontSize: '11px', letterSpacing: '3.5px',
          textTransform: 'uppercase', fontWeight: '700',
          marginBottom: '10px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{
            display: 'inline-block', width: '30px', height: '1.5px',
            background: CYAN, borderRadius: '2px',
          }} />
          Academic Journey
        </p>
        <h1 className="edu-heading" style={{
          color: '#ffffff',
          fontSize: 'clamp(28px, 5vw, 55px)',
          fontWeight: '500',
          lineHeight: 1.1,
        }}>
          My <span style={{ color: CYAN }}>Education</span>
        </h1>
      </div>

      <div
        ref={trackRef}
        style={{ padding: '0 clamp(24px, 8vw, 100px) 40px' }}
      >
        {education.map((item, i) => (
          <EduEntry key={i} item={item} index={i} isLast={i === education.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default Education;