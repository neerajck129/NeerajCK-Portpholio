// import React, { useState } from 'react'
// import { faBars } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { gsap } from "gsap";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// gsap.registerPlugin(ScrollToPlugin);

// const Header = () => {

//   const [status, setStatus] = useState(false)

//   const handleScroll = (e, target) => {
//     e.preventDefault()

//     gsap.to(window, {
//       duration: 1,
//       scrollTo: target,
//       ease: "power2.out"
//     })

//     setStatus(false) // close mobile menu
//   }

//   return (
//     <>
//       <nav className='mx:auto bg-black'>
//         <div className='grid grid-cols-4 w-full'>

//           {/* Logo */}
//           <div className='inline-flex items-center h-[70px]'>
//             <img className='w-10 mx-1' src="/RentEase_Logo-01.png" alt="" />
//             <h1 className='text-3xl font-extrabold text-[#42C5C9]'>Portfolio</h1>
//           </div>

//           {/* Menu */}
//           <div className='col-span-2 flex justify-center items-center text-white text-xl md:text-[20px]'>
//             <ul className={status ? "md:flex gap-6" : "md:flex gap-6 justify-center hidden"}>

//               <li>
//                 <a href="#home"
//                    onClick={(e)=>handleScroll(e,"#home")}
//                    className='mt-15 md:m-0 hover:font-extrabold hover:text-amber-300'>
//                    Home
//                 </a>
//               </li>

//               <li>
//                 <a href="#about"
//                    onClick={(e)=>handleScroll(e,"#about")}
//                    className='mt-1 md:m-0 hover:font-extrabold hover:text-amber-300'>
//                    About Me
//                 </a>
//               </li>

//               <li>
//                 <a href="#projects"
//                    onClick={(e)=>handleScroll(e,"#projects")}
//                    className='mt-1 md:m-0 hover:font-extrabold hover:text-amber-300'>
//                    Projects
//                 </a>
//               </li>

//               <li>
//                 <a href="#contact"
//                    onClick={(e)=>handleScroll(e,"#contact")}
//                    className='mt-1 md:m-0 hover:font-extrabold hover:text-amber-300'>
//                    Contact
//                 </a>
//               </li>

//             </ul>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className='flex items-center justify-center h-[60px] text-white'>
//             <button
//               onClick={() => setStatus(!status)}
//               className="rounded-lg h-8 w-fit p-3 flex justify-center items-center text-xl md:text-3xl md:hidden hover:text-amber-300">

//               <FontAwesomeIcon icon={faBars} />

//             </button>
//           </div>

//         </div>
//       </nav>
//     </>
//   )
// }

// export default Header


import React, { useState, useEffect } from 'react'
import { faBars, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {

  const [status, setStatus]   = useState(false)
  const [isDark, setIsDark]   = useState(true)   // default dark

  // Apply theme to <html> element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light-mode')
      document.body.style.background = '#000000'
      document.body.style.transition = 'background 0.4s ease'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light-mode')
      document.body.style.background = '#f0fafa'
      document.body.style.transition = 'background 0.4s ease'
    }
  }, [isDark])

  const handleScroll = (e, target) => {
    e.preventDefault()
    gsap.to(window, { duration: 1, scrollTo: target, ease: "power2.out" })
    setStatus(false)
  }

  const toggleTheme = () => {
    // Animate the icon before switching
    gsap.fromTo('.theme-icon', 
      { rotate: 0, scale: 1 },
      { rotate: 360, scale: 1.3, duration: 0.4, ease: 'power2.out',
        onComplete: () => {
          gsap.to('.theme-icon', { scale: 1, duration: 0.2 })
          setIsDark(prev => !prev)
        }
      }
    )
  }

  const navLinks = [
    { label: 'Home',    href: '#home'     },
    { label: 'About Me',href: '#about'    },
    { label: 'Skills',  href: '#skills'   },
    { label: 'Projects',href: '#projects' },
    { label: 'Contact', href: '#contact'  },
  ]

  return (
    <>
      {/* Mobile dropdown menu */}
      <div className={`
        md:hidden fixed top-[70px] left-0 right-0 z-40
        border-b border-[#42C5C9]/20 shadow-lg
        transition-all duration-300 ease-in-out overflow-hidden
        ${status ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}
        ${isDark ? 'bg-black' : 'bg-[#f0fafa]'}
      `}>
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`
                  block text-[16px] font-medium py-1
                  transition-colors duration-200
                  ${isDark
                    ? 'text-white hover:text-[#42C5C9]'
                    : 'text-gray-800 hover:text-[#42C5C9]'
                  }
                `}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav className={`
        fixed top-0 left-0 right-0 z-50
        border-b border-[#42C5C9]/10
        backdrop-blur-md
        transition-colors duration-400
        ${isDark ? 'bg-black/80' : 'bg-[#f0fafa]/90'}
      `}>
        <div className='flex items-center justify-between h-[70px] px-5 md:px-[100px]'>

          {/* ── Logo ── */}
          <div className='flex items-center gap-2'>
            <img className='w-9' src="/IMG_20241006_224320_228.jpg" alt="logo" />
            <h1 className='text-2xl md:text-3xl font-extrabold text-[#42C5C9]'>
              Portfolio
            </h1>
          </div>

          {/* ── Desktop Nav ── */}
          <ul className='hidden md:flex items-center gap-8 text-[16px]'>
            {navLinks.map((link, i) => (
              <li key={i} className='relative group'>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`
                    font-medium transition-colors duration-200
                    ${isDark ? 'text-white hover:text-[#42C5C9]' : 'text-gray-800 hover:text-[#42C5C9]'}
                  `}
                >
                  {link.label}
                </a>
                {/* underline on hover */}
                <span className='absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#42C5C9] rounded-full transition-all duration-300 group-hover:w-full' />
              </li>
            ))}
          </ul>

          {/* ── Right side: theme toggle + hamburger ── */}
          <div className='flex items-center gap-3'>

            {/* Theme toggle */}
            {/* <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                transition-all duration-300
                ${isDark
                  ? 'border-[#42C5C9]/30 bg-[#42C5C9]/10 hover:bg-[#42C5C9]/20 hover:border-[#42C5C9]'
                  : 'border-gray-300 bg-white hover:bg-gray-100 hover:border-[#42C5C9]'
                }
              `}
            >
              <FontAwesomeIcon
                icon={isDark ? faSun : faMoon}
                className={`theme-icon text-base transition-colors duration-300 ${isDark ? 'text-[#42C5C9]' : 'text-gray-600'}`}
              />
            </button> */}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setStatus(!status)}
              aria-label="Toggle menu"
              className={`
                md:hidden w-10 h-10 rounded-xl flex items-center justify-center
                border transition-all duration-300 text-base
                ${isDark
                  ? 'border-[#42C5C9]/30 bg-[#42C5C9]/10 hover:bg-[#42C5C9]/20 text-white border-[#42C5C9]/30'
                  : 'border-gray-300 bg-white hover:bg-gray-100 text-gray-800'
                }
                ${status ? 'rotate-90' : 'rotate-0'}
                transition-transform duration-300
              `}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

          </div>
        </div>
      </nav>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div className='h-[70px]' />
    </>
  )
}

export default Header