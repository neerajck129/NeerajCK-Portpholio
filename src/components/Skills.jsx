
import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

const Skills = () => {

  const container = useRef();

  useGSAP(() => {
    // gsap.to(".box1", {
    //   rotation: 360,
    //   duration: 1,
    // });

    //  gsap.to(".box2", {
    //   rotation: 360,
    //   duration: 1,
    //   delay:1
    // });
    let tl = gsap.timeline({repeat: -1, repeatDelay: 1, yoyo: true})

tl.to(".box1", { rotation: 360 });
tl.to(".box2", { rotation: 360 });
tl.to(".box3", { rotation: 360 });
tl.to(".box4", { rotation: 360 });
tl.to(".box5", { rotation: 360 });
tl.to(".box6", { rotation: 360 });


  },{ scope: container });


  return (
    <>
      <div ref={container} id="skills" className='px-6 md:px-[100px] overflow-x-hidden'>

        <h1 className='head1 text-white text-[30px] md:text-[55px] font-medium mt-[60px]'>
          Skill<span className='text-[#42C5C9]'>s</span>
        </h1>

        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 mt-6 justify-items-center glow-disabled'>

          <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300  '>
            <img className='w-[80px] md:w-[100px] box1' src="./logo/html.png" alt="HTML" />
            <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>HTML5</h3>
          </div>

          <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
            <img className='box2 w-[80px] md:w-[100px]' src="./logo/css.png" alt="CSS" />
            <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>CSS3</h3>
          </div>

          <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
            <img className='box3 w-[80px] md:w-[100px]' src="./logo/njs.png" alt="NodeJS" />
            <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>NodeJS</h3>
          </div>

          <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
            <img className='box4 w-[80px] md:w-[100px]' src="./logo/react.png" alt="React" />
            <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>ReactJS</h3>
          </div>

          <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
            <img className='box5 w-[80px] md:w-[100px]' src="./logo/ejs.png" alt="Express" />
            <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>ExpressJS</h3>
          </div>

          <div className='group flex flex-col items-center w-[120px] hover:scale-105 transition duration-300'>
            <img className='box6 w-[80px] md:w-[100px]' src="./logo/mongo.png" alt="MongoDB" />
            <h3 className='text-white text-[16px] md:text-[20px] font-medium text-center mt-2 group-hover:text-[#42C5C9]'>MongoDB</h3>
          </div>

        </div>

      </div>
    </>
  )
}

export default Skills