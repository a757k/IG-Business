
/* =====================================================
   content3.js
   Extra Edexcel International GCSE Business content
   Load after content.js and content2.js
   ===================================================== */

(function () {
  window.BUSINESS_TOPICS = window.BUSINESS_TOPICS || [];
  window.BUSINESS_QUIZ = window.BUSINESS_QUIZ || [];

  const extraTopics = [
    {
      id: "business-growth-methods",
      section: "business",
      sectionName: "Business Activity and Influences",
      title: "Business Growth",
      summary: "Internal and external methods of business growth.",
      definition: "Business growth occurs when a business increases its size, sales, output or market share.",
      points: [
        ["Internal growth", "A business expands using its own resources, for example by opening another shop or selling to more customers."],
        ["External growth", "A business expands by joining with or taking over another business."],
        ["Merger", "Two businesses agree to combine to form one business."],
        ["Takeover", "One business purchases control of another business."],
        ["Advantages", "Growth may increase sales, market share and economies of scale."],
        ["Disadvantages", "Growth may require large investment and make the business more difficult to manage."]
      ],
      example: "A Qatar-based café opens three additional branches. This is internal growth.",
      examTip: "Explain how growth affects the specific business. Do not simply state that sales will increase.",
      keywords: ["growth", "merger", "takeover", "internal growth", "external growth"],
      question: "Explain one advantage of business growth.",
      answer: "Growth may allow a business to buy ingredients in larger quantities, reducing the average cost per item and potentially increasing profit."
    },
    {
      id: "business-location-factors",
      section: "business",
      sectionName: "Business Activity and Influences",
      title: "Factors Affecting Business Location",
      summary: "How businesses choose suitable locations.",
      definition: "Business location is the place where a business operates.",
      points: [
        ["Proximity to customers", "Retailers may locate near their target market to make purchasing convenient."],
        ["Cost", "Rent, land prices and operating costs affect the cost of a location."],
        ["Labour", "Businesses need workers with suitable skills at affordable wages."],
        ["Transport", "Good roads, ports and airports can make deliveries easier."],
        ["Competition", "A business may avoid an area with many competitors or choose it because it attracts customers."],
        ["Online businesses", "A business selling online may prioritise warehouse access and delivery networks rather than a busy shopping street."]
      ],
      example: "A supermarket may choose a residential area with many potential customers and convenient parking.",
      examTip: "Link the factor to the type of business. A factory and a clothes shop may have different location priorities.",
      keywords: ["location", "rent", "labour", "transport", "customers"],
      question: "Explain why access to customers may influence a retailer's location.",
      answer: "A location close to its target customers may attract more visitors, increasing sales revenue."
    },
    {
      id: "recruitment-selection",
      section: "people",
      sectionName: "People in Business",
      title: "Recruitment and Selection",
      summary: "How businesses find and choose suitable employees.",
      definition: "Recruitment is the process of attracting candidates to apply for a job. Selection is choosing the most suitable candidate.",
      points: [
        ["Job description", "Explains the duties and responsibilities of the job."],
        ["Person specification", "Lists the qualifications, skills and personal qualities required."],
        ["Internal recruitment", "Filling a vacancy with an existing employee."],
        ["External recruitment", "Hiring someone from outside the business."],
        ["Interviews", "Allow employers to assess candidates' communication skills and suitability."],
        ["Choosing candidates", "A suitable selection process can reduce the risk of hiring an unsuitable employee."]
      ],
      example: "A hotel advertises a receptionist vacancy, interviews applicants and selects the candidate with the best relevant skills.",
      examTip: "Distinguish recruitment from selection: attracting applicants is different from choosing one.",
      keywords: ["recruitment", "selection", "job description", "person specification", "interview"],
      question: "Explain one advantage of internal recruitment.",
      answer: "An existing employee already understands the business, so less time may be needed to familiarise them with its procedures."
    },
    {
      id: "training-methods",
      section: "people",
      sectionName: "People in Business",
      title: "Employee Training",
      summary: "Induction, on-the-job and off-the-job training.",
      definition: "Training develops employees' knowledge, skills and ability to perform their jobs.",
      points: [
        ["Induction", "Introduces a new employee to the workplace, colleagues, rules and procedures."],
        ["On-the-job training", "Employees learn while performing tasks at work, often with help from an experienced colleague."],
        ["Off-the-job training", "Employees learn away from their normal workplace, such as at a training centre."],
        ["Advantages", "Training may improve productivity, quality, confidence and customer service."],
        ["Costs", "Training may require fees, equipment and time away from normal duties."]
      ],
      example: "A restaurant trains new staff in food hygiene and how to use its ordering system.",
      examTip: "For evaluation, compare the cost and time of training with its possible long-term benefits.",
      keywords: ["training", "induction", "on-the-job", "off-the-job", "productivity"],
      question: "Explain how training could improve productivity.",
      answer: "Trained employees may complete tasks more efficiently and make fewer mistakes, allowing more output to be produced in the same amount of time."
    },
    {
      id: "cashflow-management",
      section: "finance",
      sectionName: "Business Finance",
      title: "Managing Cash Flow",
      summary: "Ways to improve a business's cash position.",
      definition: "Cash flow management involves monitoring and controlling money entering and leaving a business.",
      points: [
        ["Encourage prompt payment", "Credit customers may be offered reminders or incentives to pay on time."],
        ["Delay payments carefully", "Negotiating longer payment periods with suppliers may help preserve cash in the short term."],
        ["Reduce unnecessary costs", "Cutting avoidable spending can reduce cash outflows."],
        ["Arrange finance", "An overdraft or loan may help cover a temporary cash shortage, but finance can involve costs."],
        ["Manage inventory", "Avoiding excessive stock can reduce the amount of cash tied up in unsold goods."],
        ["Limitations", "Reducing spending or delaying payments too aggressively may damage operations or supplier relationships."]
      ],
      example: "A shop introduces payment reminders to encourage customers who bought on credit to pay sooner.",
      examTip: "Cash flow and profit are different. A profitable business can still run out of cash if customers pay late.",
      keywords: ["cash flow", "cash inflow", "cash outflow", "overdraft", "credit"],
      question: "Explain one way a business could improve its cash flow.",
      answer: "It could encourage customers to pay sooner, bringing cash into the business earlier so that it can pay wages and suppliers on time."
    },
    {
      id: "profitability",
      section: "finance",
      sectionName: "Business Finance",
      title: "Profitability",
      summary: "Understanding profit and how businesses can improve it.",
      definition: "Profit is the amount remaining when total costs are subtracted from total revenue.",
      points: [
        ["Revenue", "Revenue = selling price per unit × quantity sold."],
        ["Total costs", "Total costs = fixed costs + variable costs."],
        ["Profit", "Profit = total revenue − total costs."],
        ["Increase sales", "A business may increase revenue through promotion, improved products or reaching new customers."],
        ["Control costs", "Reducing waste or negotiating lower input prices may increase profit if revenue stays the same."],
        ["Consider consequences", "Cost reductions that lower quality or service could reduce future sales."]
      ],
      example: "A business earns QAR 20,000 in revenue and has total costs of QAR 15,000. Its profit is QAR 5,000.",
      examTip: "Use the figures provided in the question and show your working. Explain why a proposed change may or may not increase profit.",
      keywords: ["profit", "revenue", "fixed costs", "variable costs", "total costs"],
      question: "A business has revenue of QAR 12,000 and total costs of QAR 8,500. Calculate its profit.",
      answer: "Profit = revenue − total costs = QAR 12,000 − QAR 8,500 = QAR 3,500."
    },
    {
      id: "marketing-pricing",
      section: "marketing",
      sectionName: "Marketing",
      title: "Pricing Strategies",
      summary: "How pricing decisions influence sales and profit.",
      definition: "A pricing strategy is the method a business uses to set the selling price of its products.",
      points: [
        ["Cost-plus pricing", "Adds a mark-up to the cost of producing or purchasing a product."],
        ["Competitive pricing", "Sets prices with reference to competitors' prices."],
        ["Penetration pricing", "Uses a low introductory price to attract customers and gain market share."],
        ["Price skimming", "Sets a high initial price for a new or distinctive product, often reducing it later."],
        ["Promotional pricing", "Temporarily reduces prices to encourage purchases."],
        ["Factors affecting price", "Costs, customer demand, competitors, product quality and the business's objectives all matter."]
      ],
      example: "A new streaming service offers a low introductory subscription price to attract customers.",
      examTip: "Do not assume the lowest price is always best. Consider profit margins, customer expectations and competitors.",
      keywords: ["pricing", "cost-plus", "competitive pricing", "penetration", "skimming"],
      question: "Explain one risk of using penetration pricing.",
      answer: "The low price may produce a small profit margin, so the business may struggle to cover its costs if sales volumes are lower than expected."
    },
    {
      id: "promotion-methods",
      section: "marketing",
      sectionName: "Marketing",
      title: "Methods of Promotion",
      summary: "How businesses inform customers and encourage sales.",
      definition: "Promotion is communication used to inform customers about products and encourage them to buy.",
      points: [
        ["Advertising", "Uses media such as websites, social media, television or posters to reach customers."],
        ["Sales promotions", "Temporary offers, discounts or vouchers encourage purchases."],
        ["Sponsorship", "A business supports an event or team to increase awareness of its brand."],
        ["Personal selling", "A salesperson communicates directly with a potential customer."],
        ["Public relations", "Activities aim to create and maintain a positive image of the business."],
        ["Choosing a method", "The target market, budget, product and campaign objectives influence the best method."]
      ],
      example: "A sports shop advertises football boots on social media to reach younger football players.",
      examTip: "Explain how the chosen method reaches the target market and how this could affect sales.",
      keywords: ["promotion", "advertising", "sales promotion", "sponsorship", "target market"],
      question: "Explain why social media advertising may suit a business targeting teenagers.",
      answer: "Teenagers who use social media may see the advert frequently, increasing awareness of the product and potentially encouraging purchases."
    },
    {
      id: "production-methods",
      section: "operations",
      sectionName: "Business Operations",
      title: "Methods of Production",
      summary: "Job, batch and flow production.",
      definition: "A method of production is the way a business organises the process of making goods or providing services.",
      points: [
        ["Job production", "Makes one item at a time, often to meet specific customer requirements."],
        ["Batch production", "Produces a group of identical products before switching to another batch."],
        ["Flow production", "Uses a continuous sequence of stages to produce standardised goods."],
        ["Job production advantage", "Can provide customisation and high levels of attention to individual products."],
        ["Batch production advantage", "Allows some variety while sharing equipment and setup costs across a group of products."],
        ["Flow production advantage", "Can produce large quantities quickly and reduce average costs."],
        ["Choosing a method", "Demand, product variety, available finance, skills and equipment affect suitability."]
      ],
      example: "A bakery may use batch production to make 100 loaves before switching to another type of bread.",
      examTip: "Link the production method to the quantity and variety of products the business needs to make.",
      keywords: ["job production", "batch production", "flow production", "output", "customisation"],
      question: "Explain one advantage of flow production for a large manufacturer.",
      answer: "Flow production can produce large quantities efficiently, potentially lowering the average cost per unit."
    },
    {
      id: "customer-service",
      section: "operations",
      sectionName: "Business Operations",
      title: "Customer Service",
      summary: "How good service can support business success.",
      definition: "Customer service is the support and assistance a business provides before, during and after a purchase.",
      points: [
        ["Responding promptly", "Quick responses can help customers resolve problems and complete purchases."],
        ["Helpful employees", "Knowledgeable and polite staff can improve the customer's experience."],
        ["Handling complaints", "Resolving problems fairly may help retain customers."],
        ["Customer loyalty", "Satisfied customers may return and recommend the business to others."],
        ["Costs", "Providing excellent service may require staff training and additional employees."],
        ["Measuring service", "Businesses may use customer feedback, complaints, reviews and repeat-purchase rates."]
      ],
      example: "An online shop quickly replaces a damaged item and keeps the customer informed.",
      examTip: "Connect customer service to outcomes such as repeat sales, reputation and costs.",
      keywords: ["customer service", "loyalty", "complaints", "reputation", "repeat purchases"],
      question: "Explain how good customer service could increase sales.",
      answer: "Satisfied customers may return to buy again and recommend the business to others, increasing repeat purchases and attracting new customers."
    }
  ];

  // Add new topics without replacing existing topics or progress IDs.
  extraTopics.forEach(function (newTopic) {
    const exists = window.BUSINESS_TOPICS.some(function (topic) {
      return topic.id === newTopic.id;
    });

    if (!exists) {
      window.BUSINESS_TOPICS.push(newTopic);
    }
  });

  const extraQuiz = [
    {
      q: "Which is an example of internal business growth?",
      options: [
        "Taking over a competitor",
        "Opening another branch",
        "Merging with a supplier",
        "Buying another company"
      ],
      answer: 1,
      explanation: "Opening another branch expands the business using its own operations."
    },
    {
      q: "What is the main purpose of a person specification?",
      options: [
        "To list the duties of a job",
        "To advertise the company's products",
        "To describe the skills and qualities needed for a job",
        "To calculate business profit"
      ],
      answer: 2,
      explanation: "A person specification identifies the qualifications, skills and qualities required."
    },
    {
      q: "Which is an example of off-the-job training?",
      options: [
        "Learning from a colleague while working",
        "Attending a course at a training centre",
        "Completing a normal shift",
        "Serving a customer without guidance"
      ],
      answer: 1,
      explanation: "Off-the-job training takes place away from the employee's normal work duties."
    },
    {
      q: "A business has revenue of QAR 9,000 and total costs of QAR 6,500. What is its profit?",
      options: ["QAR 2,000", "QAR 2,500", "QAR 3,500", "QAR 15,500"],
      answer: 1,
      explanation: "Profit = revenue − total costs = QAR 9,000 − QAR 6,500 = QAR 2,500."
    },
    {
      q: "Which pricing strategy starts with a low price to attract customers?",
      options: ["Price skimming", "Penetration pricing", "Cost-plus pricing", "Premium pricing"],
      answer: 1,
      explanation: "Penetration pricing uses a low introductory price to attract customers and gain market share."
    },
    {
      q: "Which production method is most suitable for a unique, customised product?",
      options: ["Flow production", "Mass production", "Job production", "Continuous production"],
      answer: 2,
      explanation: "Job production allows a product to be made individually to meet a customer's specific requirements."
    },
    {
      q: "Why might good customer service improve profitability?",
      options: [
        "It always removes fixed costs",
        "It guarantees that competitors leave the market",
        "It may encourage repeat purchases",
        "It eliminates the need for promotion"
      ],
      answer: 2,
      explanation: "Repeat purchases can increase revenue, although the overall effect on profit depends on costs too."
    },
    {
      q: "Which action may improve cash flow?",
      options: [
        "Allowing customers to pay later without limits",
        "Holding unnecessary amounts of stock",
        "Encouraging credit customers to pay sooner",
        "Buying equipment that is not needed"
      ],
      answer: 2,
      explanation: "Receiving customer payments sooner increases cash inflows earlier."
    },
    {
      q: "What is batch production?",
      options: [
        "Making one unique item only",
        "Making groups of products before switching to another batch",
        "Producing goods continuously in a fixed sequence",
        "Selling goods without making them"
      ],
      answer: 1,
      explanation: "Batch production makes a group of products before production switches to a different batch."
    },
    {
      q: "Which factor is particularly important when choosing a retail shop location?",
      options: [
        "Access to target customers",
        "Distance from every road",
        "Having no access to public transport",
        "Avoiding all potential customers"
      ],
      answer: 0,
      explanation: "A convenient location near target customers may attract more visitors and increase sales."
    }
  ];

  extraQuiz.forEach(function (question) {
    const exists = window.BUSINESS_QUIZ.some(function (existing) {
      return existing.q === question.q;
    });

    if (!exists) {
      window.BUSINESS_QUIZ.push(question);
    }
  });
})();
