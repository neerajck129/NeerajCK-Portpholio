import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CYAN = '#42C5C9';

const About = () => {
  const container = useRef();

  useGSAP(() => {
    /* heading — identical timing to all other sections */
    gsap.from('.about-heading', {
      scrollTrigger: { trigger: '.about-heading', start: 'top 88%' },
      y: 36, opacity: 0, duration: 0.85, ease: 'power3.out',
    });

    /* each text line staggers up */
    gsap.from('.about-line', {
      scrollTrigger: { trigger: '.about-line', start: 'top 90%' },
      y: 24, opacity: 0, duration: 0.75,
      ease: 'power3.out', stagger: 0.14, delay: 0.1,
    });
  }, { scope: container });

  return (
    <div ref={container} id="about" style={{ paddingTop: '70px' }}>

      {/* Header — identical padding & structure to all other sections */}
      <div style={{ padding: '0 clamp(24px, 8vw, 100px) 60px' }}>
        <h1 className="about-heading" style={{
          color: '#ffffff',
          fontSize: 'clamp(28px, 5vw, 55px)',
          fontWeight: '500',
          lineHeight: 1.1,
          opacity: 1,
          marginBottom: '32px',
        }}>
          About <span style={{ color: CYAN }}>Me</span>
        </h1>

        <p className="about-line" style={{
          color: '#6b8a8d',
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          lineHeight: '1.9',
          fontWeight: '300',
          width: '100%',
          marginBottom: '20px',
        }}>
          I'm a{' '}
          <span style={{ color: '#f0fafa', fontWeight: '500' }}>MERN Full Stack Developer</span>
          {' '}passionate about building modern, scalable, and user-friendly web applications.
          I specialise in{' '}
          <span style={{ color: CYAN, fontWeight: '500' }}>React.js, Node.js, Express.js</span>
          {' '}and{' '}
          <span style={{ color: CYAN, fontWeight: '500' }}>MongoDB</span>
          , developing full-stack solutions with clean and efficient code.
        </p>

        <p className="about-line" style={{
          color: '#6b8a8d',
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          lineHeight: '1.9',
          fontWeight: '300',
          width: '100%',
          marginBottom: '20px',
        }}>
          During my internship at{' '}
          <span style={{ color: '#f0fafa', fontWeight: '500' }}>Luminar Technolab</span>
          , I worked on building responsive interfaces, developing RESTful APIs, and implementing
          secure authentication systems. I enjoy turning complex problems into simple and intuitive
          digital experiences.
        </p>

        <p className="about-line" style={{
          color: '#6b8a8d',
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          lineHeight: '1.9',
          fontWeight: '300',
          width: '100%',
        }}>
          With a strong focus on{' '}
          <span style={{ color: '#f0fafa', fontWeight: '500' }}>performance, usability, and clean architecture</span>
          , I continuously strive to improve my skills and stay updated with the latest technologies.
          I'm always excited to work on challenging projects and create impactful web solutions.
        </p>
      </div>
    </div>
  );
};

export default About;