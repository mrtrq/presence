/**
 * Content panels.
 *
 * The panel bodies are static content, which is why this file is a server
 * component: the copy ships as HTML and only the shell and the panel store
 * reach the browser.
 */

import Link from "next/link";
import { ArrowUpRight, Book, ExternalLink, Grid, Mail, Pencil, Puzzle, Sprout, Telescope } from "lucide-react";

import {
  about,
  featuredPost,
  hobbies,
  hobbiesIntro,
  identity,
  links,
  posts,
  socials,
  workGroups,
  writingIntro,
  contactIntro,
  type Work,
} from "./content";
import { Card, SectionTitle } from "@/app/components/ui";
import { Panel } from "./Panel";
import { CircleAround, Sparkle, Squiggle } from "@/app/components/draw/Doodles";
import { closePanel } from "./usePanel";

/* -------------------------------------------------------------------------- */

const doodleIcons = {
  telescope: Telescope,
  sprout: Sprout,
  puzzle: Puzzle,
  grid: Grid,
  book: Book,
} as const;

function DoodleBadge({ name, tone }: { name: keyof typeof doodleIcons; tone: string }) {
  const Icon = doodleIcons[name];
  return (
    <span className="badge" data-tone={tone} aria-hidden="true">
      <Icon size={26} strokeWidth={1.8} />
    </span>
  );
}

function external(href: string) {
  return href.startsWith("http") ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}

/* -------------------------------------------------------------------------- */

export function AboutPanel() {
  return (
    <Panel
      id="about"
      title="About"
      kicker="Hello"
      tone="sprout"
      icon={<Sparkle size={26} className="doodle-sun" />}
      onClose={closePanel}
    >
      <div className="prose-block">
        <p className="lede">{identity.tagline}</p>
        <Squiggle className="rule-squiggle" seed="about" />
        {about.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="body-copy">
            {paragraph}
          </p>
        ))}
      </div>

      <SectionTitle as="h3" kicker="What I hold to">
        Three beliefs
      </SectionTitle>

      <ul className="belief-grid">
        {about.beliefs.map((belief) => (
          <li key={belief.title}>
            <Card tone={belief.tone} seed={`belief:${belief.title}`} className="belief-card">
              <h4 className="card-title">{belief.title}</h4>
              <p className="card-body">{belief.body}</p>
            </Card>
          </li>
        ))}
      </ul>

      <SectionTitle as="h3" kicker="In brief">
        The short version
      </SectionTitle>

      <dl className="fact-list">
        {about.facts.map((fact) => (
          <div key={fact.label} className="fact-row">
            <dt className="label">{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */

function WorkCard({ work }: { work: Work }) {
  return (
    <Card tone={work.tone} seed={`work:${work.id}`} className="work-card">
      <div className="work-head">
        <DoodleBadge name={work.doodle} tone={work.tone} />
        <div className="work-head-text">
          <p className="label">{work.topic}</p>
          <h3 className="card-title">{work.title}</h3>
        </div>
      </div>

      <p className="card-body work-summary">{work.summary}</p>
      <p className="card-body work-detail">{work.detail}</p>

      <ul className="tag-row" aria-label="Topics">
        {work.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>

      <div className="work-foot">
        <span className="faint small">{work.year}</span>
        {work.href ? (
          <Link className="btn btn-sm btn-ghost" href={work.href} {...external(work.href)}>
            {work.hrefLabel ?? "Open"}
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        ) : null}
      </div>
    </Card>
  );
}

export function WorkPanel() {
  return (
    <Panel
      id="work"
      title="Work"
      kicker="Selected"
      tone="sky"
      icon={<Pencil size={26} className="doodle-sky" />}
      onClose={closePanel}
    >
      {workGroups.map((group) => (
        <section key={group.id} className="work-group">
          <SectionTitle as="h3" kicker={group.kicker}>
            {group.title}
          </SectionTitle>
          <ul className="work-grid">
            {group.items.map((work) => (
              <li key={work.id}>
                <WorkCard work={work} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */

export function WritingPanel() {
  return (
    <Panel
      id="writing"
      title="Writing"
      kicker="Notes & essays"
      tone="sun"
      icon={<Pencil size={26} className="doodle-sun" />}
      onClose={closePanel}
    >
      <p className="lede">{writingIntro}</p>

      <article className="featured-post">
        <p className="label">Start here</p>
        <h3 className="display-md">
          <a href={featuredPost.href} target="_blank" rel="noopener noreferrer" className="no-underline">
            {featuredPost.title}
          </a>
        </h3>
        <p className="body-copy">{featuredPost.excerpt}</p>
        <a className="btn btn-sm btn-sun" href={featuredPost.href} target="_blank" rel="noopener noreferrer">
          Read on Medium
          <ExternalLink aria-hidden="true" size={15} />
        </a>
      </article>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Card tone={post.tone} seed={`post:${post.id}`} className="post-card">
              <div className="post-meta">
                <span className="label">{post.tag}</span>
                <span className="faint small">{post.readTime}</span>
              </div>
              <h3 className="card-title">
                <Link href={post.href} {...external(post.href)} className="no-underline">
                  {post.title}
                </Link>
              </h3>
              <p className="card-body">{post.excerpt}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */

export function PlayPanel() {
  return (
    <Panel
      id="play"
      title="Interests"
      kicker="Off the clock"
      tone="forest"
      icon={<Sparkle size={26} className="doodle-sprout" />}
      onClose={closePanel}
    >
      <p className="lede">{hobbiesIntro}</p>

      <ul className="hobby-grid">
        {hobbies.map((hobby) => (
          <li key={hobby.id}>
            <Card tone={hobby.tone} seed={`hobby:${hobby.id}`} className="hobby-card">
              <div className="hobby-head">
                <DoodleBadge name={hobby.doodle} tone={hobby.tone} />
                <div className="hobby-head-text">
                  <h3 className="card-title">{hobby.title}</h3>
                  <p className="label">{hobby.meta}</p>
                </div>
              </div>
              <p className="card-body">{hobby.body}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* -------------------------------------------------------------------------- */

export function ContactPanel() {
  return (
    <Panel
      id="contact"
      title="Say hello"
      kicker="Contact"
      tone="sprout"
      icon={<Mail size={26} className="doodle-sprout" />}
      onClose={closePanel}
    >
      <p className="lede">{contactIntro}</p>

      <a className="email-plate" href={links.email}>
        <span className="email-label">Email</span>
        <span className="email-value">{identity.email}</span>
      </a>

      <ul className="social-list">
        {socials.map((social) => (
          <li key={social.label}>
            <a className="social-row" href={social.href} {...external(social.href)}>
              <span className="label">{social.label}</span>
              <span className="social-value">{social.value}</span>
              <ArrowUpRight aria-hidden="true" size={18} className="faint" />
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
