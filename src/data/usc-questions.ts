export type SourceQuestion = {
  asker: string;
  question: string;
};

export type QuestionTheme = {
  id: string;
  title: string;
  canonicalQuestion: string;
  summary: string;
  askers: string[];
  questionCount: number;
  sources: SourceQuestion[];
};

export const uscQuestions: { undergrad: QuestionTheme[]; grad: QuestionTheme[] } = {
  "undergrad": [
    {
      "id": "ug-strategy",
      "title": "Product Strategy, Prioritization, and Tradeoffs",
      "canonicalQuestion": "How do you decide what to prioritize, what to defer, and what not to build across competing customer and business needs?",
      "summary": "This group focuses on decision-making frameworks for prioritization, sequencing, and difficult product tradeoffs.",
      "sources": [
        {
          "asker": "Hebe Lu",
          "question": "What is the main difference between being a product manager for physical products versus digital software like Shopify?"
        },
        {
          "asker": "Minh Dau",
          "question": "How would your ideation process be different between now and 10 years ago?"
        },
        {
          "asker": "Mats Mahattanakul",
          "question": "What's been the hardest tradeoff building New Customer Accounts over the past 3 years?"
        },
        {
          "asker": "Mats Mahattanakul",
          "question": "Now that legacy accounts are deprecated, how is Shopify supporting merchants who built deeply around the old system?"
        },
        {
          "asker": "Mats Mahattanakul",
          "question": "How has running Keap Athletics as a Shopify merchant shaped how you build the product at Shopify?"
        },
        {
          "asker": "Ryan Pham",
          "question": "With so many competing ideas and opportunities, how do you personally decide what\u2019s worth prioritizing versus what to push aside?"
        },
        {
          "asker": "Ryan Pham",
          "question": "How has your approach to product management evolved over time?"
        },
        {
          "asker": "Marissa Jing",
          "question": "How do you decide what to build natively vs. leaving to the app ecosystem?"
        },
        {
          "asker": "Marissa Jing",
          "question": "How do you prioritize when enterprise and small merchant needs conflict?"
        },
        {
          "asker": "Aditya Mishra",
          "question": "When shipping a product feature to global markets, how do you decide which markets are worth testing first, and how would you plan that roadmap?"
        },
        {
          "asker": "Casey Zaiqing Wong",
          "question": "Can you share an example of a difficult product tradeoff and how you navigated it?"
        },
        {
          "asker": "Grace Kotsay",
          "question": "What was it like working at Shipper in Indonesia?"
        },
        {
          "asker": "Grace Kotsay",
          "question": "How did you adapt?"
        },
        {
          "asker": "Kayden Wilmoth-Thomas",
          "question": "What were the biggest challenges starting Keap Athletics while working full-time?"
        },
        {
          "asker": "Alex Chanawatr",
          "question": "Since you\u2019ve launched features for both merchants and app partners, what\u2019s been most challenging about building something that works well for so many different users?"
        },
        {
          "asker": "Joe Gitti DiVita",
          "question": "Does running your own Shopify store actually change how you build, or does it mostly just confirm what you already know?"
        },
        {
          "asker": "Dylan D'Agostino",
          "question": "The customer accounts product touches authentication, identity, post-purchase experience, and developer platform all at once. How do you manage stakeholder alignment when your product sits at the intersection of that many teams and priorities inside Shopify?"
        },
        {
          "asker": "Elijah Varela",
          "question": "What\u2019s a user behavior that surprised you, and how did it change your product priorities?"
        },
        {
          "asker": "Leyna Nguyen",
          "question": "How did it change the way you built or prioritized the product?"
        },
        {
          "asker": "Leyna Nguyen",
          "question": "As students looking to break into product management, what is a skill that you would prioritize building, especially with how AI is changing the role?"
        },
        {
          "asker": "Caroline Ross",
          "question": "What did it originally look like, what does it look like know, and do you predict any changes in the future?"
        },
        {
          "asker": "Joonseo Lee",
          "question": "What was an \"aha\" moment you had while being a Shopify user?"
        },
        {
          "asker": "Alessandro Risi",
          "question": "Since you\u2019ve also been a Shopify seller yourself, how did that change the way you prioritize what to build vs what to ignore?"
        }
      ],
      "askers": [
        "Aditya Mishra",
        "Alessandro Risi",
        "Alex Chanawatr",
        "Caroline Ross",
        "Casey Zaiqing Wong",
        "Dylan D'Agostino",
        "Elijah Varela",
        "Grace Kotsay",
        "Hebe Lu",
        "Joe Gitti DiVita",
        "Joonseo Lee",
        "Kayden Wilmoth-Thomas",
        "Leyna Nguyen",
        "Marissa Jing",
        "Mats Mahattanakul",
        "Minh Dau",
        "Ryan Pham"
      ],
      "questionCount": 23
    },
    {
      "id": "ug-customer",
      "title": "Customer Experience and Discovery",
      "canonicalQuestion": "What makes account and sign-in experiences truly valuable for users, and how do you uncover what customers actually need?",
      "summary": "Questions in this theme center on customer discovery, retention, onboarding, and behavioral insights.",
      "sources": [
        {
          "asker": "Karina Young",
          "question": "As Senior Product Lead for Customer Accounts & Sign-In at Shopify, what has been the hardest part of re-imagining the customer login experience from the ground up?"
        },
        {
          "asker": "Minh Dau",
          "question": "What is the most impactful customer feedback that helped any of your products become more successful?"
        },
        {
          "asker": "Jacky Hou",
          "question": "How did your strategy for new customer accounts evolve across each launch?"
        },
        {
          "asker": "Jacky Hou",
          "question": "What makes a customer account experience actually drive retention and repeat purchases?"
        },
        {
          "asker": "Nicole Gutierrez",
          "question": "What's a product design you made on New Customer Accounts that users would never notice, but would have broken the entire experience if done wrong?"
        },
        {
          "asker": "Nicole Gutierrez",
          "question": "If customer accounts were built without Shopify's existing infrastructure, what would you design completely differently?"
        },
        {
          "asker": "Poluk Sharma",
          "question": "Looking back, what\u2019s something you got wrong or underestimated early on with New Customer Accounts, and how did that shape later iterations?"
        },
        {
          "asker": "Isabella Crasto",
          "question": "What would you say the biggest factor is for trying to create a new product - is it usability, feasibility, etc.?"
        },
        {
          "asker": "Isabella Crasto",
          "question": "For your customer product releases and analyzing data beforehand, what kind of metrics are you using?"
        },
        {
          "asker": "Isabella Crasto",
          "question": "For customers to sign into a merchant shop, specifically when adding the feature to sign in with Google or Facebook, what did the partnership and communication look like between you or Shopify and those respective companies?"
        },
        {
          "asker": "Alex Chanawatr",
          "question": "When you\u2019re building something new, how do you figure out what buyers actually want most?"
        },
        {
          "asker": "Elijah Varela",
          "question": "What product insight most changed your approach to onboarding or retention?"
        },
        {
          "asker": "Joseph Towne",
          "question": "How has your experiences of being in the YC Combinator shaped your thinking as being a founder and leader in companies?"
        },
        {
          "asker": "Kaitlyn Min",
          "question": "Has there ever been a small, seemingly insignificant change you made that ended up having a surprisingly large impact on user behavior, specifically for login or accounts?"
        },
        {
          "asker": "Leyna Nguyen",
          "question": "In your role as a Senior Product Lead, what is a user behavior that surprised you?"
        },
        {
          "asker": "Caroline Ross",
          "question": "What are the biggest challenges in managing so many vendors and customers on your platform?"
        },
        {
          "asker": "Caroline Ross",
          "question": "How do you navigate returns and dissatisfaction between supplier and buyer?"
        },
        {
          "asker": "Joonseo Lee",
          "question": "Has you experience as a Shopify user changed how you do your customer discovery?"
        },
        {
          "asker": "Alessandro Risi",
          "question": "With all the work on customer accounts, what was one feature you thought would be huge but actually didn\u2019t matter that much to users?"
        }
      ],
      "askers": [
        "Alessandro Risi",
        "Alex Chanawatr",
        "Caroline Ross",
        "Elijah Varela",
        "Isabella Crasto",
        "Jacky Hou",
        "Joonseo Lee",
        "Joseph Towne",
        "Kaitlyn Min",
        "Karina Young",
        "Leyna Nguyen",
        "Minh Dau",
        "Nicole Gutierrez",
        "Poluk Sharma"
      ],
      "questionCount": 19
    },
    {
      "id": "ug-metrics",
      "title": "Metrics, Data, and Product Signals",
      "canonicalQuestion": "Which metrics and customer signals do you trust most when evaluating feature success and product health?",
      "summary": "Students are asking how to measure success, interpret feedback, and use data to inform product decisions.",
      "sources": [
        {
          "asker": "Thammie Smithangura",
          "question": "What key metrics or indicators do you trust most when evaluating whether or not a feature is successful?"
        },
        {
          "asker": "Isabella Crasto",
          "question": "Are you evaluating different common user touch points?"
        }
      ],
      "askers": [
        "Isabella Crasto",
        "Thammie Smithangura"
      ],
      "questionCount": 2
    },
    {
      "id": "ug-platform",
      "title": "Platform Complexity and Stakeholder Alignment",
      "canonicalQuestion": "How do you lead products that span multiple teams, integrations, and ecosystem partners while staying aligned?",
      "summary": "This theme captures questions about platform boundaries, partner ecosystems, and multi-stakeholder coordination.",
      "sources": [
        {
          "asker": "Joe Gitti DiVita",
          "question": "How do you decide when a platform feature is ready to open up to third-party developers?"
        }
      ],
      "askers": [
        "Joe Gitti DiVita"
      ],
      "questionCount": 1
    },
    {
      "id": "ug-founder",
      "title": "Founder Lens and Career Development",
      "canonicalQuestion": "How has being a founder shaped your product thinking and what principles matter most for long-term PM career growth?",
      "summary": "Questions here connect entrepreneurial experience, career paths, and transferable product lessons across industries.",
      "sources": [
        {
          "asker": "Karina Young",
          "question": "What common product lesson have you learned from different industries (e-commerce, restaurants, and logistics) that applies no matter what business you are building?"
        },
        {
          "asker": "Poluk Sharma",
          "question": "If you were in your early 20s today interested in product management or entrepreneurship, what opportunities would you pursue or look out for?"
        },
        {
          "asker": "Casey Zaiqing Wong",
          "question": "What did you learn from launching your own product/company?"
        },
        {
          "asker": "Kayden Wilmoth-Thomas",
          "question": "Has running your company ever changed a product decision you made at Shopify?"
        },
        {
          "asker": "Dylan D'Agostino",
          "question": "You've had a pretty nonlinear path: US Navy, Disney, about.me, founding companies, YC, Product School instructor, and now Shopify. For someone early in their career trying to figure out their own path, what's the thread that connects all of those for you?"
        },
        {
          "asker": "Joseph Towne",
          "question": "Having founded companies such as Momos and Keap Athletics, what is the number one thing you emphasize for Product Managers and entrepreneurs alike?"
        },
        {
          "asker": "Kaitlyn Min",
          "question": "Having worked in a startup before, what kind of product do you think would thrive in today's market \u2014 AI-related or not?"
        }
      ],
      "askers": [
        "Casey Zaiqing Wong",
        "Dylan D'Agostino",
        "Joseph Towne",
        "Kaitlyn Min",
        "Karina Young",
        "Kayden Wilmoth-Thomas",
        "Poluk Sharma"
      ],
      "questionCount": 7
    },
    {
      "id": "ug-ai",
      "title": "AI and the Future of Product Work",
      "canonicalQuestion": "How should PMs adapt as AI changes product workflows, opportunities, and the skills needed to stay effective?",
      "summary": "This cluster looks at AI-driven workflow changes, bottlenecks, and the skills students should build next.",
      "sources": [
        {
          "asker": "Hebe Lu",
          "question": "What product management skill did you learn at Keap that helps you the most at Shopify?"
        },
        {
          "asker": "Aditya Mishra",
          "question": "What is one pain point as a Product Manager that you wish AI could solve?"
        },
        {
          "asker": "Aditya Mishra",
          "question": "What part of a PM's workflow has the most bottlenecks that need to be addressed from an AI Ops Lead?"
        }
      ],
      "askers": [
        "Aditya Mishra",
        "Hebe Lu"
      ],
      "questionCount": 3
    },
    {
      "id": "ug-execution",
      "title": "Execution at Scale and Global Context",
      "canonicalQuestion": "What changes when you execute products across global markets, operational constraints, and cross-functional complexity?",
      "summary": "Students ask about adoption, go-to-market execution, scaling constraints, and context shifts across regions and business models.",
      "sources": [
        {
          "asker": "Thammie Smithangura",
          "question": "When first putting something out there, what factors do you think is key to kicking off adoption and getting the ball rolling?"
        },
        {
          "asker": "Grace Kotsay",
          "question": "What is a time that tested you most when working on a product?"
        },
        {
          "asker": "Grace Kotsay",
          "question": "How were you able to resolve or overcome it?"
        },
        {
          "asker": "Grace Kotsay",
          "question": "Is the product world very different in unique cultures or countries?"
        },
        {
          "asker": "Eton Yao",
          "question": "What do you think is an exciting opportunity that Shopify can create for businesses?"
        },
        {
          "asker": "Eton Yao",
          "question": "What is your favorite product you have launched?"
        },
        {
          "asker": "Caroline Ross",
          "question": "How has influencer/affiliate marketing on Shopify shifted in the last few years?"
        }
      ],
      "askers": [
        "Caroline Ross",
        "Eton Yao",
        "Grace Kotsay",
        "Thammie Smithangura"
      ],
      "questionCount": 7
    }
  ],
  "grad": [
    {
      "id": "gr-founder-vs-scale",
      "title": "Founder vs. Large-Company Product Leadership",
      "canonicalQuestion": "What mindset and operating changes are most important when transitioning between founder mode and product leadership in large organizations?",
      "summary": "This theme compares startup velocity and ownership with the structure, scale, and coordination needs of enterprise product teams.",
      "sources": [
        {
          "asker": "Kanjan Umashankar",
          "question": "You\u2019ve led products both as a founder at Keap Athletics and within larger organizations like Shopify and Disney. How does your leadership style and decision-making differ when you\u2019re building from scratch versus operating within an established company with existing systems and constraints?"
        },
        {
          "asker": "Maya Cohen",
          "question": "You went from co-founding a YC startup \u2014 where you are the decision-making infrastructure \u2014 to Senior Product Lead inside Shopify Core. What did you have to unlearn to be effective at that scale, and was anything you expected to unlearn actually an advantage?"
        },
        {
          "asker": "Luis Acosta",
          "question": "For someone coming from an MBA background into product, how would you recommend choosing between joining a startup versus a large company like Shopify early in their PM career? What trade-offs matter most for long-term growth as a product leader?"
        },
        {
          "asker": "Anna Keough",
          "question": "How do you keep a startup mentality working inside a large company like Shopify?"
        },
        {
          "asker": "Anna Keough",
          "question": "How has your approach to making decisions under uncertainty changed from your startup days to now?"
        },
        {
          "asker": "Vaisnav Roy",
          "question": "As a YC alum and co-founder of Keap Athletics, you\u2019ve experienced high-velocity decision-making. How did you adapt your 'founder intuition' when moving into large-scale product leadership at Disney or Shopify, and what startup habits should PMs at big companies never lose?"
        },
        {
          "asker": "Bruce Bai",
          "question": "What are the biggest mindset shifts or skills needed to operate effectively across founder and large-scale product leadership roles?"
        },
        {
          "asker": "Min Hyung Kim",
          "question": "What makes it sustainable to maintain a side venture alongside a senior corporate role?"
        },
        {
          "asker": "Min Hyung Kim",
          "question": "What is the biggest asset and blind spot for founders transitioning into PM roles at large companies?"
        },
        {
          "asker": "Prarthana Kakulte",
          "question": "What is one product lesson from building your own startup that you still apply today?"
        },
        {
          "asker": "Tanvi Dhingra",
          "question": "How do founder and corporate product thinking influence each other in your work?"
        },
        {
          "asker": "Tiana Pinto",
          "question": "How do you retain a startup mentality while building products for millions of merchants?"
        },
        {
          "asker": "Ethan Tseng",
          "question": "How has your product decision-making changed between startups and large organizations?"
        },
        {
          "asker": "Connor Anthony",
          "question": "What are the biggest differences between working as a founder and in large organizations?"
        },
        {
          "asker": "Jingwen Liang",
          "question": "What is the biggest day-to-day difference in product management between startups and large companies?"
        },
        {
          "asker": "Jeanette Tlapa",
          "question": "How does product decision-making differ between startups and large organizations?"
        },
        {
          "asker": "Valerie Chang",
          "question": "How do you adjust decision-making frameworks from zero-to-one to scaling products?"
        },
        {
          "asker": "Valerie Chang",
          "question": "How do you balance innovation with operational discipline at scale?"
        },
        {
          "asker": "Misong Kim",
          "question": "What is the biggest mindset shift between founder and product leader roles?"
        },
        {
          "asker": "Yifan Wang",
          "question": "How do you determine if a product direction merits long-term investment?"
        },
        {
          "asker": "Yifan Wang",
          "question": "What startup principles still shape your work today?"
        },
        {
          "asker": "Wenkai Jiang",
          "question": "How does your decision-making change across startups and large companies?"
        },
        {
          "asker": "David Canlas",
          "question": "Was transitioning from startups to corporate environments difficult?"
        },
        {
          "asker": "Celine Wen",
          "question": "Which experience had the most impact on your career?"
        },
        {
          "asker": "Jenny Yang",
          "question": "What are the most important trends in e-commerce today?"
        },
        {
          "asker": "Brian Camilo",
          "question": "How do you switch between founder and product leader modes?"
        },
        {
          "asker": "Brian Camilo",
          "question": "How do you ensure user focus under pressure?"
        }
      ],
      "askers": [
        "Anna Keough",
        "Brian Camilo",
        "Bruce Bai",
        "Celine Wen",
        "Connor Anthony",
        "David Canlas",
        "Ethan Tseng",
        "Jeanette Tlapa",
        "Jenny Yang",
        "Jingwen Liang",
        "Kanjan Umashankar",
        "Luis Acosta",
        "Maya Cohen",
        "Min Hyung Kim",
        "Misong Kim",
        "Prarthana Kakulte",
        "Tanvi Dhingra",
        "Tiana Pinto",
        "Vaisnav Roy",
        "Valerie Chang",
        "Wenkai Jiang",
        "Yifan Wang"
      ],
      "questionCount": 27
    },
    {
      "id": "gr-prioritization",
      "title": "Prioritization Under Uncertainty",
      "canonicalQuestion": "How do you prioritize effectively under uncertainty while balancing speed, rigor, and long-term product value?",
      "summary": "Students want practical frameworks for deciding what to build now, what to defer, and how to navigate ambiguous tradeoffs.",
      "sources": [
        {
          "asker": "Thanaporn Srisuvanunta",
          "question": "How do you adapt product strategy when moving from owning a single product to building platform capabilities, and how do you decide what not to build?"
        },
        {
          "asker": "Charudisha Ashjay",
          "question": "How do you decide when to prioritize rapid experimentation versus long-term scalability?"
        },
        {
          "asker": "Ethan Tseng",
          "question": "How do you balance long-term innovation with reliable execution at scale?"
        },
        {
          "asker": "Jingwen Liang",
          "question": "How do you prioritize when building under uncertainty?"
        },
        {
          "asker": "Makenzie Bradley",
          "question": "How do you distinguish between a product that needs a pivot versus more time?"
        },
        {
          "asker": "Caitlin Chou",
          "question": "How do you prevent feature creep while maintaining a strong user experience?"
        },
        {
          "asker": "Wenkai Jiang",
          "question": "How do you balance incremental improvements vs. big bets?"
        },
        {
          "asker": "Tong Li",
          "question": "How do you balance speed with execution at scale?"
        },
        {
          "asker": "Chia-Yang Huang",
          "question": "How do you balance speed vs. rigor under uncertainty?"
        },
        {
          "asker": "Chia-Yang Huang",
          "question": "How do you decide between exploration and execution?"
        }
      ],
      "askers": [
        "Caitlin Chou",
        "Charudisha Ashjay",
        "Chia-Yang Huang",
        "Ethan Tseng",
        "Jingwen Liang",
        "Makenzie Bradley",
        "Thanaporn Srisuvanunta",
        "Tong Li",
        "Wenkai Jiang"
      ],
      "questionCount": 10
    },
    {
      "id": "gr-data-judgment",
      "title": "Data, Metrics, and Product Judgment",
      "canonicalQuestion": "How do you make high-quality product decisions when data is incomplete, noisy, or conflicting?",
      "summary": "Questions in this group focus on trusted signals, data discrepancies, PMF indicators, and judgment under imperfect information.",
      "sources": [
        {
          "asker": "Bruce Bai",
          "question": "At Shopify, how do you balance reducing friction in onboarding with the need to capture valuable user data for personalization and retention?"
        },
        {
          "asker": "Thanaporn Srisuvanunta",
          "question": "How has your definition of \u2018good product judgment\u2019 evolved over time?"
        },
        {
          "asker": "Prarthana Kakulte",
          "question": "How do you uncover non-obvious customer needs not captured through traditional analytics?"
        },
        {
          "asker": "Charudisha Ashjay",
          "question": "What is the most reliable signal of true product-market fit versus early traction?"
        },
        {
          "asker": "Severus Zhang",
          "question": "How would you approach identifying and filtering bot activity that distorts key product metrics?"
        },
        {
          "asker": "Severus Zhang",
          "question": "How do you decide which data source to trust when analytics tools show discrepancies?"
        },
        {
          "asker": "Misong Kim",
          "question": "What frameworks help you make decisions with incomplete or conflicting data?"
        },
        {
          "asker": "Jung Huang",
          "question": "What does \u2018good product judgment\u2019 mean to you?"
        },
        {
          "asker": "Baobao Ji",
          "question": "What is the biggest mindset shift moving from data-rich to uncertain environments?"
        },
        {
          "asker": "Tong Li",
          "question": "What is the biggest difference in decision-making with less data?"
        }
      ],
      "askers": [
        "Baobao Ji",
        "Bruce Bai",
        "Charudisha Ashjay",
        "Jung Huang",
        "Misong Kim",
        "Prarthana Kakulte",
        "Severus Zhang",
        "Thanaporn Srisuvanunta",
        "Tong Li"
      ],
      "questionCount": 10
    },
    {
      "id": "gr-merchant-platform",
      "title": "Merchant Experience, Trust, and Platform Strategy",
      "canonicalQuestion": "How do you design merchant-facing platform products that reduce friction while preserving trust, security, and long-term ecosystem value?",
      "summary": "This cluster covers merchant needs, onboarding, accessibility, platform strategy, and competitive positioning.",
      "sources": [
        {
          "asker": "Maya Cohen",
          "question": "Your PM background spans social games, health food subscriptions, apparel, and now merchant infrastructure. When you move across domains that different, what actually transfers \u2014 and what turns out to be false pattern-matching?"
        },
        {
          "asker": "Vaisnav Roy",
          "question": "You are currently leading the Core team at Shopify. When managing a product that serves millions of diverse merchants, how do you balance platform stability with the pressure to innovate and ship new features?"
        },
        {
          "asker": "Bruce Bai",
          "question": "How does accessibility and inclusive design factor into your work on accounts and login systems?"
        },
        {
          "asker": "Tiana Pinto",
          "question": "What surprised you most about building for merchants versus consumers?"
        },
        {
          "asker": "Makenzie Bradley",
          "question": "How do you ensure Shopify stays focused on small business needs?"
        },
        {
          "asker": "Jeanette Tlapa",
          "question": "What lessons from building your own brand influence how you think about merchants?"
        },
        {
          "asker": "Caitlin Chou",
          "question": "Do gaming mechanics have a role in future Shopify experiences?"
        },
        {
          "asker": "Yanheng Lu",
          "question": "How do you balance user friction with trust and security?"
        },
        {
          "asker": "Celine Wen",
          "question": "How can Shopify compete with Amazon\u2019s ecosystem?"
        },
        {
          "asker": "Sean O'Kelley",
          "question": "How has Shopify influenced your own business?"
        }
      ],
      "askers": [
        "Bruce Bai",
        "Caitlin Chou",
        "Celine Wen",
        "Jeanette Tlapa",
        "Makenzie Bradley",
        "Maya Cohen",
        "Sean O'Kelley",
        "Tiana Pinto",
        "Vaisnav Roy",
        "Yanheng Lu"
      ],
      "questionCount": 10
    },
    {
      "id": "gr-entrepreneurship",
      "title": "Entrepreneurship, YC, and M&A Lessons",
      "canonicalQuestion": "What lessons from entrepreneurship, YC, and acquisition experiences are most useful when leading products?",
      "summary": "Students ask about venture building, YC learnings, acquisition decisions, and integration-era product development.",
      "sources": [
        {
          "asker": "Min Hyung Kim",
          "question": "How did you navigate product roadmap decisions during Green Chef's acquisition by HelloFresh?"
        },
        {
          "asker": "Tanvi Dhingra",
          "question": "How did the HelloFresh acquisition shape your approach to prioritization and staying close to the customer?"
        },
        {
          "asker": "Connor Anthony",
          "question": "How was your YC experience?"
        },
        {
          "asker": "Rajvir Clair",
          "question": "How do you know when you have a 'purple cow' product?"
        },
        {
          "asker": "Rajvir Clair",
          "question": "How do you decide between growing independently or selling to a larger company?"
        },
        {
          "asker": "Sean O'Kelley",
          "question": "What was the acquisition process for Clutch Coffee Bar like?"
        },
        {
          "asker": "Michael Freedman",
          "question": "What factors led to selling Clutch Coffee Bar?"
        },
        {
          "asker": "Charles Shen",
          "question": "How was your YC experience?"
        },
        {
          "asker": "Charles Shen",
          "question": "What insider insight about YC stands out?"
        },
        {
          "asker": "Charles Shen",
          "question": "What was your process for getting into YC?"
        },
        {
          "asker": "Philip Laxamana",
          "question": "What was your experience with mergers and acquisitions?"
        },
        {
          "asker": "Philip Laxamana",
          "question": "How did product development change during integrations?"
        }
      ],
      "askers": [
        "Charles Shen",
        "Connor Anthony",
        "Michael Freedman",
        "Min Hyung Kim",
        "Philip Laxamana",
        "Rajvir Clair",
        "Sean O'Kelley",
        "Tanvi Dhingra"
      ],
      "questionCount": 12
    },
    {
      "id": "gr-career",
      "title": "Career Development and PM Leadership Skills",
      "canonicalQuestion": "Which skills, habits, and leadership qualities help PMs grow into stronger product leaders over time?",
      "summary": "This theme captures questions about PM growth, mentorship, business skills, and career readiness for new graduates.",
      "sources": [
        {
          "asker": "Prakhar Awasthi",
          "question": "What business skills help product managers stand out as they move into leadership roles?"
        },
        {
          "asker": "Prakhar Awasthi",
          "question": "What mindset shifts are required when moving between entrepreneurship and product leadership?"
        },
        {
          "asker": "Jung Huang",
          "question": "What skills do PMs need to stay relevant with AI?"
        },
        {
          "asker": "Baobao Ji",
          "question": "What qualities will define PMs in the next 5 years?"
        },
        {
          "asker": "Michael Freedman",
          "question": "How important are mentors in making product decisions?"
        },
        {
          "asker": "Chenyi Bao",
          "question": "What mindset shift made you a stronger product leader?"
        },
        {
          "asker": "Chenyi Bao",
          "question": "What advice do you have for graduates entering PM?"
        }
      ],
      "askers": [
        "Baobao Ji",
        "Chenyi Bao",
        "Jung Huang",
        "Michael Freedman",
        "Prakhar Awasthi"
      ],
      "questionCount": 7
    },
    {
      "id": "gr-ai-future",
      "title": "AI and the Future of Product Management",
      "canonicalQuestion": "How is AI changing PM decision-making and what capabilities should PMs prioritize to remain effective?",
      "summary": "This group focuses on AI-driven shifts in product strategy, execution, and future PM capability requirements.",
      "sources": [
        {
          "asker": "Yanheng Lu",
          "question": "How has AI changed product decision-making?"
        }
      ],
      "askers": [
        "Yanheng Lu"
      ],
      "questionCount": 1
    },
    {
      "id": "gr-domain-transfer",
      "title": "Cross-Domain Product Thinking",
      "canonicalQuestion": "What product principles transfer across industries, and how do you avoid false pattern-matching when moving between domains?",
      "summary": "Students are interested in transferable frameworks across games, commerce, physical goods, and infrastructure products.",
      "sources": [
        {
          "asker": "David Canlas",
          "question": "What are the differences between building digital and physical products?"
        }
      ],
      "askers": [
        "David Canlas"
      ],
      "questionCount": 1
    }
  ]
} as const;
