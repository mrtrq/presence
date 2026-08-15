export type CaseStudySection = {
  label: string;
  title: string;
  paragraphs: string[];
};

export type CaseStudy = {
  slug: string;
  topic: string;
  title: string;
  description: string;
  focus: string[];
  supportingLink: {
    href: string;
    label: string;
  };
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "remote-sensing",
    topic: "Thesis research",
    title: "Remote Sensing",
    description:
      "A multi-scenario pipeline comparing super-resolution methods and spectral indices to predict water quality from Sentinel-2 imagery over Jakarta's rivers.",
    focus: ["Satellite imagery", "Water quality", "Method comparison"],
    supportingLink: {
      href: "https://drive.google.com/file/d/1f0mQ08DmmCkrgantM24Aau_bQzDZN7Uo/view?usp=drive_link",
      label: "Open thesis slides",
    },
    sections: [
      {
        label: "Starting point",
        title: "Turning a technical question into an environmental one",
        paragraphs: [
          "This thesis began with a practical question: how can satellite imagery help us describe water quality in Jakarta's rivers when on-the-ground observation is limited? The challenge was not only to make an image look sharper, but to understand whether that extra detail would be useful for the environmental signal we cared about.",
          "That framing kept the work grounded. Rather than treating each method as an isolated technical result, the study compared how different choices affected the final interpretation of water quality.",
        ],
      },
      {
        label: "The work",
        title: "Comparing the pipeline, not just a single output",
        paragraphs: [
          "I built a multi-scenario pipeline around Sentinel-2 imagery, pairing super-resolution approaches with spectral indices that are useful for reading water conditions. Each scenario made the trade-offs between detail, consistency, and interpretability easier to see.",
          "The process moved between data preparation, image treatment, index calculation, and comparison. It was a reminder that an analytical result is shaped by every decision that comes before the final map.",
        ],
      },
      {
        label: "Reflection",
        title: "Keeping the method accountable to the question",
        paragraphs: [
          "The work taught me to be careful with the promise of a more sophisticated method. Better resolution is only meaningful when it improves the judgment someone can make with the data.",
          "It also gave me a deeper appreciation for research as a sequence of small, testable decisions: define the question clearly, show the uncertainty, and make the comparison understandable to someone beyond the technical process.",
        ],
      },
    ],
  },
  {
    slug: "bem-fasilkom-ui",
    topic: "Organization",
    title: "BEM Fasilkom UI",
    description:
      "Student governance and advocacy shaped around wellbeing systems, collaborative infrastructure, and campus life that works for everyone.",
    focus: ["Student life", "Collaboration", "Community systems"],
    supportingLink: {
      href: "https://drive.google.com/file/d/1yhmhCl2-L0ZD8DY8aUZ60iO9hrP0uPgm/view?usp=sharing",
      label: "Open grand design",
    },
    sections: [
      {
        label: "Starting point",
        title: "Treating campus life as a system people share",
        paragraphs: [
          "BEM Fasilkom UI was an opportunity to think about student life beyond individual programmes. A campus is a network of people, routines, information, and support systems; when one part is unclear or inaccessible, the effect is felt far beyond a single event.",
          "The work started from a simple intention: make participation, support, and collaboration easier to find and more meaningful to take part in.",
        ],
      },
      {
        label: "The work",
        title: "Making room for care, coordination, and participation",
        paragraphs: [
          "The organisation's direction brought together wellbeing systems, collaborative infrastructure, and campus initiatives. It meant listening across different needs, translating broad concerns into things people could actually use, and keeping many moving parts connected.",
          "The experience was less about a single deliverable and more about creating conditions for people to contribute: clearer pathways, shared context, and a sense that campus life could be shaped together.",
        ],
      },
      {
        label: "Reflection",
        title: "Useful leadership is often quiet infrastructure",
        paragraphs: [
          "This work reinforced the idea that leadership can be infrastructural. It can look like a better handover, a clearer way to ask for help, or a space where more people can take part with confidence.",
          "It continues to influence how I approach digital products and communities: start with the people already doing the work, then make the system around them a little easier to navigate.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
