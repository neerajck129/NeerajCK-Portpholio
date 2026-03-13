import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

gsap.registerPlugin(ScrollTrigger);

const CYAN = '#42C5C9';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    tag: 'MERN',
    description: 'Shopping platform with cart, JWT auth & Razorpay payments. Deployed on Vercel.',
    tech: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    github: 'https://github.com/neerajck129',
    live: '#',
    image: './screenshots/ecommerce.png',
  },
  {
    title: 'Blog Application',
    category: 'Full Stack',
    tag: 'MERN',
    description: 'Rich-text blogging with auth, user profiles & Cloudinary image uploads.',
    tech: ['React', 'Express', 'MongoDB', 'Cloudinary'],
    github: 'https://github.com/neerajck129',
    live: '#',
    image: './screenshots/blog.png',
  },
  {
    title: 'Task Manager',
    category: 'Productivity',
    tag: 'App',
    description: 'Drag-and-drop task tracker with priorities, deadlines & full CRUD.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    github: 'https://github.com/neerajck129',
    live: '#',
    image: './screenshots/taskmanager.png',
  },
  {
    title: 'Auth System',
    category: 'Backend',
    tag: 'API',
    description: 'JWT + bcrypt auth boilerplate with refresh tokens & protected routes.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/neerajck129',
    live: '#',
    image: './screenshots/auth.png',
  },
  {
    title: 'Portfolio Website',
    category: 'Frontend',
    tag: 'React',
    description: 'This portfolio — React, GSAP animations, cursor glow & ScrollTrigger.',
    tech: ['React', 'GSAP', 'Tailwind', 'Vite'],
    github: 'https://github.com/neerajck129',
    live: '#',
    image: './screenshots/portfolio.png',
  },
];

/* ── Tilt + Spotlight Card ── */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef();
  const spotRef = useRef();
  const glowRef = useRef();
  const imgRef  = useRef();

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect  = card.getBoundingClientRect();
    const cx    = rect.width  / 2;
    const cy    = rect.height / 2;
    const dx    = e.clientX - rect.left  - cx;
    const dy    = e.clientY - rect.top   - cy;
    const rotX  = (-dy / cy) * 10;
    const rotY  = ( dx / cx) * 10;

    // 3-D tilt
    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 900,
      ease: 'power1.out',
      duration: 0.25,
    });

    // spotlight follows cursor
    const px = ((e.clientX - rect.left) / rect.width)  * 100;
    const py = ((e.clientY - rect.top)  / rect.height) * 100;
    if (spotRef.current) {
      spotRef.current.style.background =
        `radial-gradient(circle at ${px}% ${py}%, rgba(66,197,201,0.18) 0%, transparent 65%)`;
    }

    // subtle img parallax
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        x: (dx / cx) * 6,
        y: (dy / cy) * 4,
        duration: 0.3,
        ease: 'power1.out',
      });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    if (spotRef.current) spotRef.current.style.background = 'transparent';
    if (imgRef.current) gsap.to(imgRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
  }, []);

  return (
    <article
      ref={cardRef}
      className="proj-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{
        flexShrink: 0,
        width: 'clamp(300px, 78vw, 390px)',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(160deg, #0e2022 0%, #081516 100%)',
        border: '1px solid rgba(66,197,201,0.2)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'default',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* Mouse spotlight layer */}
      <div
        ref={spotRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'background 0.08s linear',
          borderRadius: '20px',
        }}
      />

      {/* Outer glow ring on hover */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: '21px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 4,
          background: 'transparent',
          boxShadow: `0 0 0 1.5px ${CYAN}, 0 0 40px rgba(66,197,201,0.25)`,
        }}
      />

      {/* ── 16:9 Image ── */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        position: 'relative',
        background: '#071314',
        flexShrink: 0,
      }}>
        {/* macOS bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '26px',
          background: 'rgba(15,25,26,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(66,197,201,0.12)',
          display: 'flex', alignItems: 'center', gap: '5px', padding: '0 12px', zIndex: 2,
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e', display: 'block' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840', display: 'block' }} />
          <div style={{
            flex: 1, marginLeft: '8px', height: '11px',
            background: 'rgba(255,255,255,0.06)', borderRadius: '3px', maxWidth: '160px',
          }} />
          {/* live dot */}
          <span style={{
            fontSize: '9px', color: CYAN, letterSpacing: '1px',
            fontWeight: '700', opacity: 0.7,
          }}>LIVE</span>
        </div>

        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          style={{
            position: 'absolute', top: '26px', left: 0, right: 0,
            width: '100%', height: 'calc(100% - 26px)',
            objectFit: 'cover', objectPosition: 'top', display: 'block',
            willChange: 'transform',
          }}
          onError={e => {
            e.target.style.display = 'none';
            if (!e.target.parentNode.querySelector('.fb')) {
              const fb = document.createElement('div');
              fb.className = 'fb';
              fb.style.cssText = `
                position:absolute;top:26px;left:0;right:0;bottom:0;
                display:flex;flex-direction:column;align-items:center;
                justify-content:center;gap:10px;
                background:linear-gradient(135deg,#0e2022,#071314);
              `;
              fb.innerHTML = `
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(66,197,201,0.4)" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
                <span style="color:rgba(66,197,201,0.4);font-size:10px;
                  letter-spacing:2px;text-transform:uppercase;font-weight:600;">
                  Add Screenshot
                </span>`;
              e.target.parentNode.appendChild(fb);
            }
          }}
        />

        {/* Category badge over image */}
        <div style={{
          position: 'absolute', top: '36px', right: '12px', zIndex: 3,
          display: 'flex', gap: '5px',
        }}>
          <span style={{
            background: 'rgba(8,21,22,0.75)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${CYAN}`,
            color: CYAN,
            fontSize: '9px', fontWeight: '700',
            letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '3px 9px', borderRadius: '20px',
          }}>{project.tag}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '20px 22px 22px', position: 'relative', zIndex: 2 }}>

        {/* Category line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '18px', height: '1.5px', background: CYAN, borderRadius: '2px' }} />
          <span style={{
            color: CYAN, fontSize: '10px', fontWeight: '700',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h2 style={{
          color: '#f0fafa',
          fontSize: 'clamp(16px, 3vw, 20px)',
          fontWeight: '700',
          marginBottom: '9px',
          lineHeight: 1.25,
          letterSpacing: '-0.3px',
        }}>
          {project.title}
        </h2>

        {/* Description */}
        <p style={{
          color: '#6b8a8d',
          fontSize: '13px',
          lineHeight: '1.7',
          marginBottom: '14px',
          fontWeight: '300',
        }}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              fontSize: '11px',
              color: CYAN,
              background: 'rgba(66,197,201,0.07)',
              border: '1px solid rgba(66,197,201,0.22)',
              borderRadius: '5px',
              padding: '3px 10px',
              fontWeight: '600',
              letterSpacing: '0.2px',
            }}>{t}</span>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, rgba(66,197,201,0.3), transparent)',
          marginBottom: '18px',
        }} />

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '7px',
              padding: '10px 0',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#94a3b0',
              fontSize: '12px', fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.22s ease',
              background: 'rgba(255,255,255,0.03)',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(66,197,201,0.55)';
              e.currentTarget.style.color = CYAN;
              e.currentTarget.style.background = 'rgba(66,197,201,0.07)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#94a3b0';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
          >
            <FontAwesomeIcon icon={faGithub} style={{ fontSize: '14px' }} />
            Code
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '6px',
              padding: '10px 0',
              background: CYAN,
              border: `1px solid ${CYAN}`,
              borderRadius: '10px',
              color: '#000',
              fontSize: '12px', fontWeight: '700',
              textDecoration: 'none',
              letterSpacing: '0.3px',
              transition: 'all 0.22s ease',
              boxShadow: `0 4px 20px rgba(66,197,201,0.3)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = CYAN;
              e.currentTarget.style.boxShadow = `0 0 0 1px ${CYAN}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = CYAN;
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(66,197,201,0.3)`;
            }}
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: '10px' }} />
            Live
          </a>
        </div>
      </div>
    </article>
  );
};

/* ── Section ── */
const Projects = () => {
  const container = useRef();
  const trackRef  = useRef();

  useGSAP(() => {
    // heading
    gsap.from('.proj-label', {
      scrollTrigger: { trigger: '.proj-label', start: 'top 88%' },
      y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
    });
    gsap.from('.proj-heading', {
      scrollTrigger: { trigger: '.proj-heading', start: 'top 88%' },
      y: 36, opacity: 0, duration: 0.85, delay: 0.12, ease: 'power3.out',
    });

    // cards stagger slide-up
    gsap.from('.proj-card', {
      scrollTrigger: { trigger: trackRef.current, start: 'top 82%' },
      y: 60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
    });
  }, { scope: container });

  return (
    <div ref={container} id="projects" style={{ paddingTop: '70px' }}>

      {/* Header */}
      <div style={{ padding: '0 clamp(24px, 8vw, 100px) 32px' }}>
        <p className="proj-label" style={{
          color: CYAN, fontSize: '11px', letterSpacing: '3.5px',
          textTransform: 'uppercase', fontWeight: '700',
          marginBottom: '10px', opacity: 1,
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{
            display: 'inline-block', width: '30px', height: '1.5px',
            background: CYAN, borderRadius: '2px',
          }} />
          Selected Work
        </p>
        <h1 className="proj-heading" style={{
          color: '#ffffff',
          fontSize: 'clamp(28px, 5vw, 55px)',
          fontWeight: '500',
          lineHeight: 1.1,
          opacity: 1,
        }}>
          My <span style={{ color: CYAN }}>Projects</span>
        </h1>
      </div>

      {/* Track */}
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
        {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
      </div>

      <style>{`
        #projects > div:last-child::-webkit-scrollbar { height: 3px; }
        #projects > div:last-child::-webkit-scrollbar-track { background: transparent; }
        #projects > div:last-child::-webkit-scrollbar-thumb { background: ${CYAN}; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Projects;
