type Audience = "undergrad" | "grad";

type UscAnswer = {
  audience: Audience;
  asker: string;
  question: string;
  answer: string;
};

const uscAnswers: UscAnswer[] = [
  {
    audience: "undergrad",
    asker: "Hebe Lu",
    question:
      "What is the main difference between being a product manager for physical products versus digital software like Shopify?",
    answer:
      "The biggest difference is iteration speed and the cost of being wrong. In software, you can launch in the morning and ship improvements the same day, then instantly distribute updates to users. In physical products, you have to commit earlier through sourcing and manufacturing, and mistakes are expensive and slow to fix. For example, at Keap Athletics, a production run once came back with drawstrings all the same size. You cannot push a software patch for that. The fix required replacement parts and manual rework across 1,000 units, which was costly and time-consuming.",
  },
  {
    audience: "undergrad",
    asker: "Minh Dau",
    question: "How would your ideation process be different between now and 10 years ago?",
    answer:
      "The core ideation process has not changed: use the product yourself to do the job, and talk directly to people doing the job with the product. The best ideas usually come from one of those two sources. What has changed most is validation speed. Previously, validation relied heavily on rounds of interviews and deeper manual analysis before action. Today, agentic workflows let you test and pressure-check ideas much faster while still grounding the work in real user problems.",
  },
  {
    audience: "undergrad",
    asker: "Mats Mahattanakul",
    question: "What's been the hardest tradeoff building New Customer Accounts over the past 3 years?",
    answer:
      "The hardest tradeoff was at the very beginning: whether to fully replace legacy accounts in one big switch or run both systems in parallel. There was pressure to build quickly, but no safe path to get everything into merchants' hands all at once. We chose to operate both systems at the same time, even though that meant supporting something we were no longer heavily investing in. That decision was painful, but it reduced migration risk and gave merchants time to transition. In general, the hardest tradeoffs are not between two obviously good ideas; they are between very different paths where alignment matters most. The key is to surface tradeoffs explicitly, discuss them openly, and make sure the team is aligned so you are right together or wrong together.",
  },
  {
    audience: "undergrad",
    asker: "Mats Mahattanakul",
    question:
      "Now that legacy accounts are deprecated, how is Shopify supporting merchants who built deeply around the old system?",
    answer:
      "The core support approach is clear communication and fast partner support while both systems can still coexist during transition. Most cases fall into three buckets: (1) merchants are missing a capability that already exists, and we point them to it; (2) we know the gap and it is already on the roadmap; or (3) we did not know about the gap, and their early feedback helps us prioritize and close it. Support means being very responsive about what exists now, what is coming, and what needs to be newly addressed.",
  },
  {
    audience: "undergrad",
    asker: "Mats Mahattanakul",
    question: "How has running Keap Athletics as a Shopify merchant shaped how you build the product at Shopify?",
    answer:
      "It has shaped almost everything. Being an actual merchant gives direct intuition for how merchants make decisions, how buyers behave, and where day-to-day operational friction really is. That lived context speeds up judgment and increases confidence in prioritization. Some decisions can look risky from the outside, but with merchant experience they can feel obvious because you have seen the problem firsthand.",
  },
  {
    audience: "undergrad",
    asker: "Ryan Pham",
    question:
      "With so many competing ideas and opportunities, how do you personally decide what’s worth prioritizing versus what to push aside?",
    answer:
      "The key is putting strategy in place before individual requests show up. I write a strategy every six months tied to our core goals, such as adoption of new customer accounts, product-market fit, easier sign-in, stronger self-serve experiences, and better customer data. Then we use a clear priority stack: Tier 1 removes blockers that prevent merchants from using the new system; Tier 2 makes migration from legacy easier; Tier 3 adds compelling new capabilities that create pull toward the new system. With that structure, incoming ideas can be bucketed quickly and consistently.",
  },
  {
    audience: "undergrad",
    asker: "Ryan Pham",
    question: "How has your approach to product management evolved over time?",
    answer:
      "Early in my career I focused more on proving I was a strong PM. Over time, that shifted toward focusing on the best idea and the outcomes that matter, instead of how my individual contribution is perceived. I also think PM has evolved to include more external communication. The person who understands the real tradeoffs and can defend the product decisions should often be part of communicating the product publicly, not just handing that off after the work is done.",
  },
  {
    audience: "undergrad",
    asker: "Marissa Jing",
    question: "How do you decide what to build natively vs. leaving to the app ecosystem?",
    answer:
      "A practical rule is to build natively when most merchants need the same capability most of the time. If the ecosystem shows near-universal demand for a function, that is a strong signal the core platform should likely handle more of that workflow directly. The goal is to reduce repeated friction for merchants while still leaving specialized use cases to ecosystem partners.",
  },
  {
    audience: "undergrad",
    asker: "Marissa Jing",
    question: "How do you prioritize when enterprise and small merchant needs conflict?",
    answer:
      "The key is understanding how these segments are different and designing intentionally for both. At Shopify, we explicitly prioritize many small merchant needs because the base layer experience matters and many large businesses started as small merchants. Small merchants are often resource-constrained and sometimes in existential situations, so they need simplified, point-and-click workflows that reduce complexity. Enterprise merchants usually have more resources and often need advanced flexibility and extensibility, such as deeper APIs and more configurable systems. The right prioritization balances urgency, impact, and the type of solution each segment can realistically adopt.",
  },
  {
    audience: "undergrad",
    asker: "Aditya Mishra",
    question:
      "When shipping a product feature to global markets, how do you decide which markets are worth testing first, and how would you plan that roadmap?",
    answer:
      "Start by deeply understanding real behavior in each target market instead of forcing a one-size-fits-all rollout. For example, market-specific requirements such as local identity providers can be hard blockers, so broad enforcement before local readiness can create friction. In practice, you combine quantitative signals (market size, revenue concentration, penetration gaps) with qualitative learning from merchants in each region. That helps determine whether gaps are awareness-driven or product-capability gaps. A pragmatic roadmap is to launch broadly where possible, allow exceptions where required, listen closely, then sequence market-specific investments over time.",
  },
  {
    audience: "undergrad",
    asker: "Casey Zaiqing Wong",
    question: "Can you share an example of a difficult product tradeoff and how you navigated it?",
    answer:
      "A concrete example was deciding where the order status page should live. In the legacy world, there were effectively two order status surfaces, and we believed there should be one. The key tradeoff was whether that experience should be owned in checkout or in customer accounts, and each option had different implications for architecture, ownership, and merchant experience. The way I navigated it was to document everything: constraints, stakeholder positions, technical implications, and user impact. Once the facts were explicit, we could frame clear options, review them with smart partners, and drive toward a decision people could buy into. If disagreement remained, we used a clean escalation path to an arbiter so the team could move forward with clarity.",
  },
  {
    audience: "undergrad",
    asker: "Grace Kotsay",
    question: "What was it like working at Shipper in Indonesia?",
    answer:
      "It was intense and extremely eye-opening. It forced true first-principles product thinking because assumptions that are common in US markets did not hold. You have to design e-commerce for realities like users without credit cards and inconsistent address systems, while still making the purchase and delivery experience work end to end. It also highlighted talent-shape differences by market: in Southeast Asia I saw especially strong engineering, data science, and operations talent, while product/design maturity looked different than what I was used to in the US. The way I adapted was direct immersion: meeting people in-market, talking constantly, and grounding decisions in local context rather than imported assumptions.",
  },
  {
    audience: "undergrad",
    asker: "Kayden Wilmoth-Thomas",
    question: "What were the biggest challenges starting Keap Athletics while working full-time?",
    answer:
      "The biggest challenge is energy and focus. A full-time role can consume most of your creative bandwidth, and when you are tired you also have fewer resources than you do at work. Two things help: choose projects that genuinely energize you, and build with people who energize you. Also be thoughtful about scope and conflict boundaries. It is best to keep side projects non-competing, frame them clearly as separate from your core role, and make sure your team knows they are not a distraction.",
  },
  {
    audience: "undergrad",
    asker: "Alex Chanawatr",
    question:
      "Since you’ve launched features for both merchants and app partners, what’s been most challenging about building something that works well for so many different users?",
    answer:
      "The hardest part is unseating systems that have worked a certain way for a long time while coordinating many hidden stakeholder groups. Publishing plans and product intent helps because the people who care most become a magnet and provide critical context early. You then have to think deeply about enablement for each group: what merchants need, what partners need, and what each group must do to adopt. A recurring challenge is the chicken-and-egg dynamic: merchants want partner support before adopting, while partners want adoption before investing. Managing that sequencing is usually the toughest part.",
  },
  {
    audience: "undergrad",
    asker: "Joe Gitti DiVita",
    question:
      "Does running your own Shopify store actually change how you build, or does it mostly just confirm what you already know?",
    answer:
      "It changes how you build in a major way. Running a store gives direct understanding of the merchant-buyer relationship, and merchants make decisions based on buyer outcomes. That first-hand context improves judgment and often lets you see around corners faster. It can also increase confidence in certain decisions that might look risky to others, because you have personally lived the workflow. In general, the strongest product vision tends to come from people who deeply experience the customer reality themselves.",
  },
  {
    audience: "undergrad",
    asker: "Dylan D'Agostino",
    question:
      "The customer accounts product touches authentication, identity, post-purchase experience, and developer platform all at once. How do you manage stakeholder alignment when your product sits at the intersection of that many teams and priorities inside Shopify?",
    answer:
      "Alignment starts with publishing strategy and plans clearly, then proactively identifying dependencies so roadmap conversations happen early. Once execution begins, you need to stay agile and adapt quickly as other teams change priorities. That requires knowing your space deeply so you can represent tradeoffs and implications at a moment's notice. When priorities shift, over-communicate quickly to every affected group. A clear strategic framework makes this much easier because everyone can evaluate changes against shared priorities.",
  },
  {
    audience: "undergrad",
    asker: "Elijah Varela",
    question: "What’s a user behavior that surprised you, and how did it change your product priorities?",
    answer:
      "I try to minimize true surprises by talking to users early and often before committing to scope, so unexpected behavior is less about shock and more about signal strength. Most directional bets are right, but occasionally user pain is more urgent than expected and we have to move faster than planned. The lesson is to keep discovery tight and stay ready to accelerate when real-world feedback reveals higher urgency.",
  },
  {
    audience: "undergrad",
    asker: "Leyna Nguyen",
    question: "How did it change the way you built or prioritized the product?",
    answer:
      "When feedback shows a problem is more severe than expected, it shifts prioritization toward fast remediation and clearer execution focus. In practice, that means tightening scope around the highest-friction issues first and re-ordering work to protect user outcomes before secondary improvements.",
  },
  {
    audience: "undergrad",
    asker: "Leyna Nguyen",
    question:
      "As students looking to break into product management, what is a skill that you would prioritize building, especially with how AI is changing the role?",
    answer:
      "Prioritize storytelling, relationship building with real users, and rapid prototyping. Strong prototypes communicate intent far better than long explanations and make feedback loops faster. With AI, PM work is moving up a level: less emphasis on managing every execution detail and more emphasis on asking the right questions, choosing what to build, and confidently showing work early to gather signal. In short, think more like a strategic product leader earlier in your career.",
  },
];

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

export function getUscAnswer(
  audience: Audience,
  asker: string,
  question: string,
): string | null {
  const normalizedAsker = normalize(asker);
  const normalizedQuestion = normalize(question);

  const match = uscAnswers.find(
    (entry) =>
      entry.audience === audience &&
      normalize(entry.asker) === normalizedAsker &&
      normalize(entry.question) === normalizedQuestion,
  );

  return match?.answer ?? null;
}
