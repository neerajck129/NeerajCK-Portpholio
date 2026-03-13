import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSquarePhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    icon: faEnvelope,
    label: 'Email',
    value: 'neerajck129@gmail.com',
    href: 'mailto:neerajck129@gmail.com',
    external: false,
  },
  {
    icon: faSquarePhone,
    label: 'Phone',
    value: '+91 9645015578',
    href: 'tel:9645015578',
    external: false,
  },
  {
    icon: faLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/neerajck',
    href: 'https://www.linkedin.com/in/neerajck',
    external: true,
  },
  {
    icon: faSquareGithub,
    label: 'GitHub',
    value: 'github.com/neerajck129',
    href: 'https://github.com/neerajck129',
    external: true,
  },
];

const inputBase =
  'w-full bg-white/[0.03] border border-[#42C5C9]/20 rounded-xl px-4 py-3 text-[#e2f0f1] text-sm outline-none transition-all duration-200 placeholder-[#3d5a5c] focus:border-[#42C5C9] focus:shadow-[0_0_0_3px_rgba(66,197,201,0.08)]';

const labelBase =
  'block text-[#6b8a8d] text-[10px] font-bold tracking-[1px] uppercase mb-2';

const Contact = () => {

  const container = useRef();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // EMAIL SEND FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs.send(
      "service_zj276x9",          // <-- replace with your service ID
      "template_7j2m3a7",         // <-- replace with your template ID
      {
        name: form.name,
        email: form.email,
        message: form.message
      },
      "04acbWPT_2Zj19hWM"       // your public key
    )
    .then(() => {

      setLoading(false);
      setSent(true);

      setForm({
        name: "",
        email: "",
        message: ""
      });

      setTimeout(() => {
        setSent(false);
      }, 3000);

    })
    .catch((error) => {
      console.log("EmailJS Error:", error);
      setLoading(false);
    });
  };


  useGSAP(() => {

    gsap.from('.ct-label', {
      scrollTrigger: { trigger: '.ct-label', start: 'top 88%' },
      x: -30,
      opacity: 0,
      duration: 0.7
    });

    gsap.from('.ct-heading', {
      scrollTrigger: { trigger: '.ct-heading', start: 'top 88%' },
      y: 36,
      opacity: 0,
      duration: 0.85
    });

    gsap.from('.ct-divider', {
      scrollTrigger: { trigger: '.ct-divider', start: 'top 88%' },
      scaleX: 0,
      opacity: 0,
      duration: 1,
      transformOrigin: 'left center'
    });

    gsap.from('.ct-tagline', {
      scrollTrigger: { trigger: '.ct-tagline', start: 'top 88%' },
      y: 20,
      opacity: 0,
      duration: 0.7
    });

    gsap.from('.ct-link-card', {
      scrollTrigger: { trigger: '.ct-links', start: 'top 85%' },
      x: -40,
      opacity: 0,
      duration: 0.55,
      stagger: 0.1
    });

    gsap.from('.ct-form-box', {
      scrollTrigger: { trigger: '.ct-form-box', start: 'top 82%' },
      x: 50,
      opacity: 0,
      duration: 0.9
    });

  }, { scope: container });


  return (
    <div
      ref={container}
      id="contact"
      className="px-5 md:px-[100px] pt-[70px] pb-10 overflow-hidden"
    >

      <div className="ct-label flex items-center gap-3 mb-4">
        <span className="inline-block w-8 h-[1.5px] bg-[#42C5C9]" />
        <span className="text-[#42C5C9] text-[11px] font-bold tracking-[3px] uppercase">
          Get In Touch
        </span>
      </div>

      <h1 className="ct-heading text-white text-[30px] md:text-[55px] font-medium mb-5">
        Contact <span className="text-[#42C5C9]">Me</span>
      </h1>

      <div
        className="ct-divider h-[2px] w-full mb-4"
        style={{ background: 'linear-gradient(90deg,#42C5C9,transparent)' }}
      />

      <p className="ct-tagline text-[#6b8a8d] mb-10">
        Have a project in mind or just want to say hi? My inbox is always open.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* CONTACT LINKS */}

        <div className="ct-links flex flex-col gap-4">
          {contactLinks.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noreferrer' : undefined}
              className="ct-link-card flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#42C5C9]/20"
            >

              <div className="w-11 h-11 rounded-xl bg-[#42C5C9]/10 flex items-center justify-center">
                <FontAwesomeIcon icon={c.icon} className="text-[#42C5C9]" />
              </div>

              <div>
                <p className="text-[#6b8a8d] text-[10px] uppercase">
                  {c.label}
                </p>

                <p className="text-[#e2f0f1] text-sm">
                  {c.value}
                </p>
              </div>

            </a>
          ))}
        </div>


        {/* CONTACT FORM */}

        <div className="ct-form-box rounded-2xl border border-[#42C5C9]/20 p-6 md:p-8">

          <p className="text-[#42C5C9] text-[11px] font-bold uppercase mb-6">
            Send a Message
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className={labelBase}>Your Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className={inputBase}
              />
            </div>

            <div>
              <label className={labelBase}>Email Address</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className={inputBase}
              />
            </div>

            <div>
              <label className={labelBase}>Message</label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Let's build something together..."
                className={`${inputBase} resize-none`}
              />
            </div>


            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#42C5C9] font-bold text-sm bg-[#42C5C9] text-black"
            >

              {loading
                ? "Sending..."
                : sent
                  ? "Message Sent ✓"
                  : <>
                      <FontAwesomeIcon icon={faPaperPlane}/>
                      Send Message
                    </>
              }

            </button>

          </form>
        </div>

      </div>

      <div className="mt-16 pt-6 border-t border-[#42C5C9]/10 flex justify-center">
        <p className="text-[#3d5a5c] text-[13px]">
          Designed & Built by <span className="text-[#42C5C9]">Neeraj CK</span>
        </p>
      </div>

    </div>
  );
};

export default Contact;