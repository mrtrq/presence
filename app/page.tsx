import Image from "next/image";
import { Section } from "./components/Section";
import { ProjectCard } from "./components/ProjectCard";
import { NewProjectCard } from "./components/NewProjectCard";
import { ExternalLink } from "lucide-react";


export default function Page() {
  return (
    <>
      {/* Hero */}
      <section id="home" className="py-28 md:py-40">
        <div className="container-swiss grid-12 items-center">
          <div className="col-span-12 md:col-span-7">
            <h1 className="mb-6">
              Navigating Through
            </h1>
            <p className="max-w-[60ch] text-lg text-[--color-muted] mb-8 text-left">
               My name is Muhammad Tarreq. I studied at Universitas Indonesia, majoring in computer science 💻. I believe that challenges should be translated into possibilities.
            </p>
            <div className="flex gap-4">
              <a className="btn" href="#projects">View Work</a>
              <a className="btn" href="#contact">Contact</a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 mt-10 md:mt-0">
            <Image src="/avatar.jpg" alt="Tarreq's portrait" width={640} height={800} className="w-full h-auto border border-[--color-fg]" />
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About" kicker="Profile">
        <div className="grid md:grid-cols-2 gap-8">
          <p>
            I find fulfillment in making someone's day easier and better. Sometimes it can be done through products and technology, and often times it's through communities and student organizations.
          </p>
          <p>
            I’m excited to continue the pursuit of making this world a better place, with approaches that rekindle the light in every challenge.
          </p>
        </div>
      </Section>

      {/* Work */}
      <Section id="projects" title="Selected Work" kicker="Projects">
        <div className="grid md:grid-cols-3 gap-6">
          {/* research */}
          <NewProjectCard topic="Campus" title="Thesis Research" preview="We built a multi‑scenario pipeline comparing super‑resolution methods (bicubic, SRCNN) and feature sets from spectral indices to predict water quality parameters (TSS, TDS, and DO) from Sentinel‑2 imagery for Jakarta’s rivers." viewtype="slide" href="https://drive.google.com/file/d/1f0mQ08DmmCkrgantM24Aau_bQzDZN7Uo/view?usp=drive_link" /> 
          {/* project from competition */}
          <NewProjectCard topic="Competition" title="L'Oreal Proreve" desc="We submit an idea to pair a hair stylist’s tool with a mobile app to ensure accurate shade matching for color‑blind clients. We built the app protoype to demonstrate the flows and features." viewtype="prototype" href="https://www.figma.com/proto/mBzgjzKw9M1w1pnWoeM4pm/Brainstorm?node-id=8-627&p=f&t=PuvC8o6ToOqNFInw-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1" />
          {/* student organization */}
          <NewProjectCard topic="Organization" title="BEM Fasilkom UI" desc="We extend the importance of student wellbeing, advocacy, and collaborative systems to create everyday campus life easier, fairer, and more connected." viewtype="grand design" href="https://drive.google.com/file/d/1yhmhCl2-L0ZD8DY8aUZ60iO9hrP0uPgm/view?usp=sharing" />
        </div>
      </Section>


      {/* Writing */}
      <Section id="writing" title="Writing" kicker="Notes">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a
              href="https://medium.com/@tarreq.maulana/live-your-life-at-full-power-c9c55bd51a42"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              Live Your Life at Full Power
              <ExternalLink className="w-4 h-4" />
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@tarreq.maulana/market-research-guest-lecture-836a52c66510"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              Market Research Guest Lecture
              <ExternalLink className="w-4 h-4" />
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@tarreq.maulana/achieving-goals-through-pitch-846bf774cdc7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              Achieving Goals through Pitch
              <ExternalLink className="w-4 h-4" />
            </a>
          </li>
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" kicker="Get in touch">
        <p className="mb-2">I'm all ears for discussions, collaborations, and experiments.</p>
        <p className="text-xl font-bold">tarreq.maulana {"{at}"} gmail.com</p>
      </Section>
    </>
  );
}