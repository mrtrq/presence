import Image from "next/image";
import { Section } from "./components/Section";
import { NewProjectCard } from "./components/NewProjectCard";
import { WebsiteCard } from "./components/WebsiteCard";
import { WritingCard } from "./components/WritingCard";
import { NowCard } from "./components/NowCard";


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
              My name is Muhammad Tarreq. I am navigating the uncertainties through the process of learning and unlearning.
              Still redescovering myself in my early 20s in order to have a fulfilling life ahead.
            </p>
            <div className="flex gap-4">
              <a className="btn" href="#projects">See What&apos;s New</a>
              <a className="btn" href="#contact">Contact</a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 mt-10 md:mt-0">
            <Image
              src="/avatar.jpg"
              alt="Tarreq's portrait"
              width={640}
              height={800}
              className="w-full h-auto border border-[--color-fg]"
            />
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

      {/* Now */}
      {/* <Section id="now" title="Currently" kicker="Now">
        <NowCard
          type="Work in Progress"
          title="New Project"
          desc="A project is underway. The work comes before the announcement — this page will reflect it once there's something worth showing. In the meantime, the foundations are being laid."
          since="2025"
        />
      </Section> */}

      {/* Selected Works */}
      <Section id="projects" title="Selected Works" kicker="Projects">
        <div className="grid md:grid-cols-2 gap-6">
          <NewProjectCard
            topic="Thesis Research"
            title="Remote Sensing"
            preview="A multi-scenario pipeline comparing super-resolution methods (bicubic, SRCNN) and feature sets from spectral indices to predict water quality parameters — TSS, TDS, and DO — from Sentinel-2 imagery over Jakarta's rivers."
            viewtype="slide"
            href="https://drive.google.com/file/d/1f0mQ08DmmCkrgantM24Aau_bQzDZN7Uo/view?usp=drive_link"
          />
          <NewProjectCard
            topic="Organization"
            title="BEM Fasilkom UI"
            desc="Student governance and advocacy — extending wellbeing systems, collaborative infrastructure, and campus life that works for everyone."
            viewtype="grand design"
            href="https://drive.google.com/file/d/1yhmhCl2-L0ZD8DY8aUZ60iO9hrP0uPgm/view?usp=sharing"
          />
        </div>
      </Section>

      {/* Websites */}
      <Section id="websites" title="Websites" kicker="Built">
        <div className="grid md:grid-cols-3 gap-6">
          <WebsiteCard
            topic="Initiative"
            title="Nitip Doa"
            desc="Send your du'a, someone will read it at Mecca / Medina"
            href="https://nitipdoa.com/"
            image="/nitipdoa.png"
            imageAlt="Nitip Doa website"
          />
          <WebsiteCard
            topic="Portfolio Page"
            title="Bali Blueprint"
            desc="Portfolio for an architecture studio"
            href="https://bali-blueprint.com/"
            image="/bali-blueprint.jpeg"
            imageAlt="Bali Blueprint website"
          />
          <WebsiteCard
            topic="Book Listing"
            title="Imakata Library"
            desc="List of books available at Imakata Library"
            href="https://imakata.netlify.app/"
            image="/imakata.jpg"
            imageAlt="Imakata Library website"
          />
        </div>
      </Section>

      {/* Writing */}
      <Section id="writing" title="Writings" kicker="Notes">
        <div className="border-t border-[--color-fg] divide-y divide-[--color-fg]">
          <WritingCard
            title="Live Your Life at Full Power"
            excerpt="On operating at full capacity — not just in work, but in presence, attention, and the everyday moments that compound into a life."
            href="https://medium.com/@tarreq.maulana/live-your-life-at-full-power-c9c55bd51a42"
          />
          <WritingCard
            title="Refactor: A Forge to The Structure"
            excerpt="What the discipline of code refactoring teaches about confronting complexity — and why restructuring what already exists is often the most creative act."
            href="https://medium.com/@tarreq.maulana/refactor-a-forge-to-the-structure-4b5911753f43"
          />
          <WritingCard
            title="Market Research Guest Lecture"
            excerpt="Notes and synthesis from a guest lecture on how market research actually operates — beyond surveys and into the architecture of real decisions."
            href="https://medium.com/@tarreq.maulana/market-research-guest-lecture-836a52c66510"
          />
          <WritingCard
            title="Achieving Goals through Pitch"
            excerpt="How framing a goal as a pitch — to yourself and to others — sharpens both the objective and the path toward it."
            href="https://medium.com/@tarreq.maulana/achieving-goals-through-pitch-846bf774cdc7"
          />
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" kicker="Get in touch">
        <p className="mb-2">I&apos;m all ears for discussions, collaborations, and experiments.</p>
        <p className="text-xl font-bold">tarreq.maulana {"{at}"} gmail.com</p>
      </Section>
    </>
  );
}