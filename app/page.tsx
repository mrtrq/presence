import Image from "next/image";
import { Section } from "./components/Section";
import { ProjectCard } from "./components/ProjectCard";
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
            <p className="max-w-[60ch] text-lg text-[--color-muted] mb-8">
               {/* I studied computer science at Universitas Indonesia. I believe that challenges should be translated into possibilities. In the realm of uncertainties, I can be the navigator.  */}
               I studied computer science at Universitas Indonesia. I believe that challenges should be translated into possibilities. I also enjoy navigating through the uncertainties
            </p>
            <div className="flex gap-4">
              <a className="btn" href="#work">View Work</a>
              <a className="btn" href="#contact">Contact</a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 mt-10 md:mt-0">
            <Image src="/avatar.jpg" alt="Tarreq portrait" width={640} height={800} className="w-full h-auto border border-[--color-fg]" />
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
            Pak Karim Siregar once told me that learning is one thing, but unlearning is the thing that most cannot do. This is a message that I want to remember closely
          </p>
        </div>
      </Section>

      {/* Work */}
      <Section id="work" title="Selected Work" kicker="Projects">
        <div className="grid md:grid-cols-3 gap-6">
          {/* research */}
          <ProjectCard title="Project 1" desc="description" href="#" /> 
          {/* project from competition */}
          <ProjectCard title="Project 2 (proreve)" desc="description" href="#" />
          {/* student organization */}
          <ProjectCard title="Project 3 (bem fasilkomui)" desc="description" href="#" />
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
        <p className="mb-6">Open to discussions, collaborations, and experiments.</p>
        <a className="btn" href="mailto:tarreq.maulana@gmail.com">Mail me</a>
      </Section>
    </>
  );
}