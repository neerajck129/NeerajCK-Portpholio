import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {

    const container = useRef();
    useGSAP(()=>{
         gsap.from(".head1", {
               scale: 1.5,
               duration: 4,
               ease: "power3.out",
               delay: 0.5,
               transformOrigin: "left center"
             }, { scope: container });

    })

  
  return (
    <>
    <div  ref={container} id="about" className='md:pl-[100px] md:pr-[100px] md:ml-0 ml-6 ' >
       
            <h1 className='head1 text-white text-[30px] md:text-[55px] font-medium mt-[60px] ' >
                About <span className='text-[#42C5C9]' >Me</span>
            </h1>
            <h6 className='text-white md:text-[20px] md:hidden '>MERN Full Stack Developer with hands-on experience in React.js, Node.js, Express.js, MongoDB, and REST APIs.Experienced in building scalable web applications, implementing authentication, and deploying applications using Vercel. Strong problem-solving skills with a focus on performance, usability, and clean code practices.</h6>
            <h6 className='text-white md:text-[20px] hidden md:block ' > I’m a MERN Full Stack Developer passionate about building modern, scalable, and user-friendly web applications. I specialize in React.js, Node.js, Express.js, and MongoDB, developing full-stack solutions with clean and efficient code. During my internship at Luminar Technolab, I worked on building responsive interfaces, developing RESTful APIs, and implementing secure authentication systems. I enjoy turning complex problems into simple and intuitive digital experiences. With a strong focus on performance, usability, and clean architecture, I continuously strive to improve my skills and stay updated with the latest technologies. I’m always excited to work on challenging projects and create impactful web solutions.</h6>

       
    </div>
    </>
  )
}

export default About