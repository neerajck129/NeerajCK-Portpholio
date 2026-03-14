import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CYAN   = '#42C5C9';
const PURPLE = '#a761ff';
const AMBER  = '#FFA048';

const education = [
  {
    year: '2025 – 2026',
    degree: 'MERN Full-Stack Development',
    school: 'Luminar Technolab',
    location: 'Kochi',
    label: 'Certification + Internship',
    stat: null,
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT'],
    icon: '⚡',
    color: CYAN,
    colorRgb: '66,197,201',
    bg: 'linear-gradient(160deg, #0e2022 0%, #081516 100%)',
    progress: 90,
  },
  {
    year: '2022 – 2025',
    degree: 'B.Tech — Computer Science & Technology',
    school: 'KMCT College of Engineering',
    location: 'Kozhikode',
    label: 'Undergraduate Degree',
    stat: 'Result Awaiting',
    tags: ['DSA', 'OOP', 'OS', 'Networks', 'DBMS', 'Software Engg.'],
    icon: '🖥️',
    color: PURPLE,
    colorRgb: '167,97,255',
    bg: 'linear-gradient(160deg, #130e22 0%, #0c0815 100%)',
    progress: 96,
  },
  {
    year: '2019 – 2022',
    degree: 'Diploma in Computer Hardware Engg.',
    school: 'JDT Islam Polytechnic College',
    location: 'Kozhikode',
    label: 'Polytechnic Diploma',
    stat: 'CGPA: 8.21 / 10',
    tags: ['Hardware', 'Networking', 'Electronics', 'Troubleshooting'],
    icon: '💾',
    color: AMBER,
    colorRgb: '255,160,72',
    bg: 'linear-gradient(160deg, #1a1208 0%, #130d05 100%)',
    progress: 82,
  },
];

/* ── Individual Card ── */
const EduCard = ({ item }) => {
  const cardRef    = useRef();
  const spotRef    = useRef();
  const glowRef    = useRef();
  const progRef    = useRef();
  const triggered  = useRef(false);

  /* 3-D tilt + spotlight — mirrors ProjectCard exactly */
  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx   = rect.width  / 2;
    const cy   = rect.height / 2;
    const dx   = e.clientX - rect.left - cx;
    const dy   = e.clientY - rect.top  - cy;

    gsap.to(card, {
      rotateX: (-dy / cy) * 8,
      rotateY: ( dx / cx) * 8,
      transformPerspective: 900,
      ease: 'power1.out',
      duration: 0.25,
    });

    const px = ((e.clientX - rect.left) / rect.width)  * 100;
    const py = ((e.clientY - rect.top)  / rect.height) * 100;
    if (spotRef.current) {
      spotRef.current.style.background =
        `radial-gradient(circle at ${px}% ${py}%, rgba(${item.colorRgb},0.18) 0%, transparent 65%)`;
    }
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    if (spotRef.current) spotRef.current.style.background = 'transparent';
    if (glowRef.current)  gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  const onMouseEnter = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
  };

  /* Progress bar animates when card scrolls into view */
  useEffect(() => {
    const el = progRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (!triggered.current) {
          triggered.current = true;
          gsap.to(el, {
            width: `${item.progress}%`,
            duration: 1.3,
            ease: 'power3.out',
            delay: 0.2,
          });
        }
      },
    });
    return () => trigger.kill();
  }, [item.progress]);

  return (
    <article
      ref={cardRef}
      className="edu-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{
        flexShrink: 0,
        width: 'clamp(300px, 78vw, 360px)',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        background: item.bg,
        border: `1px solid rgba(${item.colorRgb},0.2)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'default',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* Mouse spotlight layer */}
      <div ref={spotRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
        transition: 'background 0.08s linear', borderRadius: '20px',
      }} />

      {/* Outer glow ring on hover */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: '-1px', borderRadius: '21px',
        opacity: 0, pointerEvents: 'none', zIndex: 4,
        background: 'transparent',
        boxShadow: `0 0 0 1.5px ${item.color}, 0 0 40px rgba(${item.colorRgb},0.25)`,
      }} />

      {/* Top colour bar */}
      <div style={{
        height: '3px',
        background: `linear-gradient(90deg, ${item.color}, rgba(${item.colorRgb},0.2))`,
      }} />

      {/* Card body */}
      <div style={{ padding: '22px 22px 24px', position: 'relative', zIndex: 2 }}>

        {/* Year badge + icon */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '16px',
        }}>
          <span style={{
            background: `rgba(${item.colorRgb},0.1)`,
            border: `1px solid rgba(${item.colorRgb},0.3)`,
            color: item.color,
            fontSize: '10px', fontWeight: '700',
            letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: '20px',
          }}>{item.year}</span>

          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: `rgba(${item.colorRgb},0.1)`,
            border: `1px solid rgba(${item.colorRgb},0.25)`,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '18px',
          }}>{item.icon}</div>
        </div>

        {/* Category line — same as Projects.jsx */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '18px', height: '1.5px', background: item.color, borderRadius: '2px' }} />
          <span style={{
            color: item.color, fontSize: '10px', fontWeight: '700',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>{item.label}</span>
        </div>

        {/* Degree */}
        <h2 style={{
          color: '#f0fafa',
          fontSize: 'clamp(15px, 2.5vw, 18px)',
          fontWeight: '700',
          marginBottom: '6px',
          lineHeight: 1.25,
          letterSpacing: '-0.3px',
        }}>{item.degree}</h2>

        {/* School · Location */}
        <p style={{
          color: '#6b8a8d',
          fontSize: '13px',
          lineHeight: '1.6',
          marginBottom: '18px',
          fontWeight: '300',
        }}>
          {item.school}
          <span style={{ color: `rgba(${item.colorRgb},0.5)`, margin: '0 6px' }}>·</span>
          {item.location}
        </p>

        {/* Progress bar (shown when stat exists) */}
        {item.stat && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: '10.5px', color: '#6b8a8d', marginBottom: '6px',
            }}>
              <span>Score</span>
              <span style={{ color: item.color, fontWeight: '600' }}>{item.stat}</span>
            </div>
            <div style={{
              height: '3px', borderRadius: '3px',
              background: 'rgba(255,255,255,0.07)', overflow: 'hidden',
            }}>
              <div ref={progRef} style={{
                height: '100%', borderRadius: '3px', width: '0%',
                background: `linear-gradient(90deg, rgba(${item.colorRgb},0.5), ${item.color})`,
                boxShadow: `0 0 8px rgba(${item.colorRgb},0.6)`,
              }} />
            </div>
          </div>
        )}

        {/* Divider — same gradient style as Projects.jsx */}
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, rgba(${item.colorRgb},0.3), transparent)`,
          marginBottom: '16px',
        }} />

        {/* Tech / skill pills — same style as Projects.jsx */}
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
      </div>
    </article>
  );
};

/* ── Section ── */
const Education = () => {
  const container = useRef();
  const trackRef  = useRef();

  useGSAP(() => {
    /* heading animations — identical to Projects.jsx */
    gsap.from('.edu-label', {
      scrollTrigger: { trigger: '.edu-label', start: 'top 88%' },
      y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
    });
    gsap.from('.edu-heading', {
      scrollTrigger: { trigger: '.edu-heading', start: 'top 88%' },
      y: 36, opacity: 0, duration: 0.85, delay: 0.12, ease: 'power3.out',
    });

    /* card stagger — identical to Projects.jsx */
    gsap.from('.edu-card', {
      scrollTrigger: { trigger: trackRef.current, start: 'top 82%' },
      y: 60, opacity: 0, duration: 0.7,
      ease: 'power3.out', stagger: 0.12,
    });
  }, { scope: container });

  return (
    <div ref={container} id="education" style={{ paddingTop: '70px' }}>

      {/* Header — identical padding & structure as Projects.jsx */}
      <div style={{ padding: '0 clamp(24px, 8vw, 100px) 32px' }}>
        <p className="edu-label" style={{
          color: CYAN, fontSize: '11px', letterSpacing: '3.5px',
          textTransform: 'uppercase', fontWeight: '700',
          marginBottom: '10px', opacity: 1,
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
          opacity: 1,
        }}>
          My <span style={{ color: CYAN }}>Education</span>
        </h1>
      </div>

      {/* Horizontal scroll track — identical to Projects.jsx */}
      <div
        ref={trackRef}
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
        {education.map((item, i) => <EduCard key={i} item={item} />)}
      </div>

      <style>{`
        #education > div:last-child::-webkit-scrollbar { height: 3px; }
        #education > div:last-child::-webkit-scrollbar-track { background: transparent; }
        #education > div:last-child::-webkit-scrollbar-thumb { background: ${CYAN}; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Education;