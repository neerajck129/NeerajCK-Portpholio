import React, { useRef, useEffect, useState } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import Cursorglow from "./Cursorglow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';

const CYAN = '#42C5C9';
const FULL_TEXT = 'MERN Fullstack Developer';

/* ── Simple one-shot typewriter — types once, then blinks cursor ── */
const useTypewriter = (text, speed = 75) => {
  const [display, setDisplay] = useState('');
  const [done, setDone]       = useState(false);

  useEffect(() => {
    if (done) return;
    if (display.length === text.length) { setDone(true); return; }
    const t = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), speed);
    return () => clearTimeout(t);
  }, [display, done, text, speed]);

  return { display, done };
};

const Intro = () => {
  const container = useRef();
  const { display, done } = useTypewriter(FULL_TEXT);

  useGSAP(() => {
    gsap.from(".head", {
      x: 300,
      opacity: 0,
      duration: 3,
      ease: "power3.out"
    });

    gsap.from(".name", {
      scale: 1.5,
      duration: 4,
      ease: "power3.out",
      delay: 0.5,
      transformOrigin: "left center"
    }, { scope: container });

    gsap.from(".contact", {
      duration: 4,
      x: 100
    }, { scope: container });

    gsap.from(".img1", {
      scale: 1.5,
      duration: 3,
      transformOrigin: "left center"
    }, { scope: container });

  });

  return (
    <div id="home" ref={container} className='home flex flex-col-reverse md:grid md:grid-cols-3 md:pl-[100px] md:pr-[100px] ml-6 md:ml-0 overflow-x-hidden'>

      <div className='col-span-2'>
        <Cursorglow />

        <h1 className='head text-white md:mt-[60px] text-[50px] md:text-[100px] font-thin'>
          Hi
        </h1>

        <h1 className='name text-white text-[37px] md:text-[75px] font-medium'>
          <span className='font-thin'>I'm</span>{' '}
          <span style={{ color: CYAN }}> Neeraj CK </span>
        </h1>

        {/* Typewriter on job title */}
        <h1 className='name text-white text-[25px] md:text-[55px] font-medium'>
          {display}
          <span style={{
            display: 'inline-block',
            width: '3px',
            height: '0.8em',
            background: CYAN,
            marginLeft: '4px',
            verticalAlign: 'middle',
            borderRadius: '2px',
            animation: done ? 'twBlink 1s step-end infinite' : 'none',
            opacity: done ? undefined : 1,
          }} />
          <style>{`
            @keyframes twBlink {
              0%,100% { opacity: 1; }
              50%      { opacity: 0; }
            }
          `}</style>
        </h1>

        <a href='./NeerajCK.pdf' download>
          <button className='glow-disabled ml-6 px-8 py-3 rounded-3xl border-2 border-[#318a8d] bg-black hover:bg-[#0F3F41] text-[#42C5C9] font-bold text-[15px] mt-5'>
            Resume
          </button>
        </a>

        <div className='md:flex items-center mt-10 md:text-[25px] text-[15px] font-thin contact'>

          <a href='https://mail.google.com/mail/?view=cm&fs=1&to=neerajck129@gmail.com'>
            <h6 className='text-white flex items-center gap-2'>
              <FontAwesomeIcon className='text-[#42C5C9] text-xl md:text-2xl' icon={faEnvelope} />
              neerajck129@gmail.com
            </h6>
          </a>

          <a href='tel:9645015578'>
            <h6 className='text-white flex items-center gap-2'>
              <FontAwesomeIcon className='text-[#42C5C9] text-xl md:text-2xl md:ml-6' icon={faSquarePhone} />
              9645015578
            </h6>
          </a>

          <a href='https://www.linkedin.com/in/neerajck' target="_blank" rel="noreferrer">
            <h6 className='text-white flex items-center gap-2'>
              <FontAwesomeIcon className='text-[#42C5C9] text-xl md:text-2xl md:ml-6' icon={faLinkedin} />
              neerajck
            </h6>
          </a>

          <a href='https://github.com/neerajck129' target="_blank" rel="noreferrer">
            <h6 className='text-white flex items-center gap-2'>
              <FontAwesomeIcon className='text-[#42C5C9] text-xl md:text-2xl md:ml-6' icon={faSquareGithub} />
              neerajck129
            </h6>
          </a>

        </div>
      </div>

      <div className='flex items-center justify-center'>
        <img className='img1 w-[250px] md:w-full' src="./IMG_20241006_224320_228.jpg" alt="Neeraj CK" />
      </div>

    </div>
  );
};

export default Intro;