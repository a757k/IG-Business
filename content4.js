
/* =====================================================
   content4.js
   Additional Pearson Edexcel International GCSE
   Business (4BS1) syllabus content
   Load after content3.js and before app.js.
   ===================================================== */

(function () {
  window.BUSINESS_TOPICS = window.BUSINESS_TOPICS || [];
  window.BUSINESS_QUIZ = window.BUSINESS_QUIZ || [];

  const topics = [
    {
      id: "types-of-organisations",
      section: "business",
      sectionName: "Business Activity and Influences",
      title: "Types of Business Organisations",
      summary: "Sole traders, partnerships, private and public limited companies.",
      definition: "A business organisation is a way of legally structuring and owning a business.",
      points: [
        ["Sole trader", "A business owned by one person. The owner usually has control but unlimited liability."],
        ["Partnership", "A business owned by two or more partners who share responsibilities, profits and risks according to their agreement."],
        ["Private limited company (Ltd)", "A company whose shares are privately held and cannot be offered to the general public on a stock exchange."],
        ["Public limited company (plc)", "A company that can offer shares to the public, subject to relevant rules."],
        ["Limited liability", "Owners generally risk the money they invested rather than all their personal possessions, subject to legal exceptions."],
        ["Unlimited liability", "The owner may be personally responsible for business debts."],
        ["Choosing a structure", "Consider control, finance, liability, legal requirements and the owner's objectives."]
      ],
      example: "A sole trader may keep full control, while a limited company may be better suited to raising investment from shareholders.",
      examTip: "Compare the advantages and disadvantages for the particular business rather than saying one structure is always best.",
      keywords: ["sole trader", "partnership", "Ltd", "plc", "limited liability"],
      question: "Explain one advantage of a private limited company.",
      answer: "Shareholders generally have limited liability, reducing their personal financial risk if the company fails."
    },
    {
      id: "business-classification",
      section: "business",
      sectionName: "Business Activity and Influences",
      title: "Classification of Businesses",
      summary: "Primary, secondary and tertiary sectors; private and public sectors.",
      definition: "Business classification groups organisations according to the activity they carry out or the sector in which they operate.",
      points: [
        ["Primary sector", "Extracts or obtains natural resources, such as farming, fishing and mining."],
        ["Secondary sector", "Manufactures goods or processes raw materials into products."],
        ["Tertiary sector", "Provides services, such as retail, transport, banking and tourism."],
        ["Private sector", "Organisations owned by private individuals or shareholders."],
        ["Public sector", "Organisations owned or controlled by the government to provide services or meet public needs."],
        ["Changing sectors", "An economy may shift towards services as incomes, technology and consumer demand change."]
      ],
      example: "A farm is in the primary sector, a furniture factory is in the secondary sector and a furniture shop is in the tertiary sector.",
      examTip: "Classify a business by its main activity, not simply by the product it sells.",
      keywords: ["primary sector", "secondary sector", "tertiary sector", "private sector", "public sector"],
      question: "Explain the difference between the secondary and tertiary sectors.",
      answer: "The secondary sector manufactures goods, whereas the tertiary sector provides services to customers or other businesses."
    },
    {
      id: "business-objectives",
      section: "business",
      sectionName: "Business Activity and Influences",
      title: "Business Objectives",
      summary: "Why business objectives change as a business develops.",
      definition: "Business objectives are targets that an organisation aims to achieve.",
      points: [
        ["Survival", "A new business may prioritise earning enough revenue to cover its costs and remain operating."],
        ["Profit", "An established business may aim to maximise the difference between revenue and costs."],
        ["Growth", "A business may aim to increase its size, sales, locations or market share."],
        ["Cash flow", "A business may aim to maintain sufficient cash to pay its bills when they are due."],
        ["Social and environmental objectives", "A business may aim to support communities, reduce waste or lower its environmental impact."],
        ["Changing objectives", "Objectives may change due to competition, economic conditions, business size or owners' priorities."]
      ],
      example: "A new bakery may focus on survival initially, then aim to open more branches once its sales become stable.",
      examTip: "Explain why an objective is appropriate at that particular stage of the business's development.",
      keywords: ["objectives", "survival", "profit", "growth", "cash flow"],
      question: "Explain why a new business may prioritise survival over growth.",
      answer: "A new business may have uncertain demand and limited cash, so covering costs and remaining open may be more important than funding expansion."
    },
    {
      id: "international-economy",
      section: "business",
      sectionName: "Business Activity and Influences",
      title: "The International Economy",
      summary: "Globalisation, imports, exports and exchange rates.",
      definition: "The international economy describes economic relationships and activity between countries.",
      points: [
        ["Globalisation", "The increasing connection of countries through trade, investment, technology and movement of goods and services."],
        ["Imports", "Goods and services purchased from businesses in other countries."],
        ["Exports", "Goods and services sold to customers in other countries."],
        ["Exchange rates", "The value of one currency compared with another currency."],
        ["Currency appreciation", "A stronger domestic currency may make imports cheaper but exports more expensive for foreign customers."],
        ["Currency depreciation", "A weaker domestic currency may make exports cheaper for foreign customers but imports more expensive."],
        ["International competition", "Businesses may gain access to new markets but face more competitors."],
        ["Risks", "Businesses may face transport costs, different regulations, political uncertainty and exchange-rate changes."]
      ],
      example: "If a Qatari business imports equipment priced in US dollars, a change in the exchange rate can affect the amount it pays in Qatari riyals.",
      examTip: "State which currency is strengthening or weakening and explain the effect on the business's costs or sales.",
      keywords: ["globalisation", "imports", "exports", "exchange rates", "competition"],
      question: "Explain one possible effect of a weaker domestic currency on an exporter.",
      answer: "Its products may become cheaper for foreign customers, potentially increasing demand and export sales, depending on competitors and demand."
    },
    {
      id: "government-policies",
      section: "business",
      sectionName: "Business Activity and Influences",
      title: "Government Policies and Businesses",
      summary: "Taxation, interest rates, inflation and government spending.",
      definition: "Government economic policies influence the conditions in which businesses operate.",
      points: [
        ["Taxation", "Higher business taxes may reduce profits after tax; changes to taxes on consumers can also affect demand."],
        ["Interest rates", "Higher borrowing rates may increase loan repayments and discourage investment."],
        ["Inflation", "Rising prices can increase costs and reduce consumers' purchasing power."],
        ["Government spending", "Spending on infrastructure and services can create contracts, improve transport and support demand."],
        ["Unemployment", "High unemployment may make workers easier to recruit but can also indicate weak consumer demand."],
        ["Regulation", "Rules on employment, safety, products and the environment can protect people but may increase compliance costs."]
      ],
      example: "If interest rates rise, a business planning to borrow money for new equipment may postpone its investment.",
      examTip: "Explain the chain of effects. For example: higher interest rates → higher borrowing costs → lower investment → slower growth.",
      keywords: ["taxation", "interest rates", "inflation", "government spending", "regulation"],
      question: "Explain how higher interest rates could affect a business planning to expand.",
      answer: "Higher interest rates increase the cost of borrowing, so the business may decide that expansion is too expensive and delay the investment."
    },
    {
      id: "external-factors",
      section: "business",
      sectionName: "Business Activity and Influences",
      title: "External Factors Affecting Businesses",
      summary: "Competition, technology, laws, social changes and the environment.",
      definition: "External factors are influences outside a business's direct control that can affect its decisions and performance.",
      points: [
        ["Competition", "Competitors may force a business to improve quality, change prices or spend more on promotion."],
        ["Technology", "New technology can improve efficiency but may require investment and employee training."],
        ["Social trends", "Changes in customer lifestyles and preferences can create new opportunities or reduce demand for existing products."],
        ["Legal factors", "Employment, consumer protection and health-and-safety rules affect business operations."],
        ["Environmental factors", "Extreme weather, resource shortages and environmental expectations can affect costs and reputation."],
        ["Responding to change", "Businesses can monitor markets, train employees, adapt products and review plans."]
      ],
      example: "A restaurant may introduce online ordering because more customers prefer ordering food through apps.",
      examTip: "Identify the external factor in the scenario, then explain its effect on the business.",
      keywords: ["external factors", "competition", "technology", "social trends", "legislation"],
      question: "Explain one way technological change could benefit a business.",
      answer: "New technology may automate repetitive tasks, allowing employees to produce more output in the same time and potentially reducing unit costs."
    },
    {
      id: "communication",
      section: "people",
      sectionName: "People in Business",
      title: "Internal and External Communication",
      summary: "Communication methods, barriers and effective communication.",
      definition: "Communication is the transfer of information between people or organisations.",
      points: [
        ["Internal communication", "Information shared within the business, such as instructions from a manager to employees."],
        ["External communication", "Information shared with customers, suppliers, investors or other outside groups."],
        ["Verbal communication", "Spoken communication, including meetings and telephone calls."],
        ["Written communication", "Emails, reports, letters and written instructions can provide a record."],
        ["Digital communication", "Messaging platforms and video meetings can share information quickly across locations."],
        ["Communication barriers", "Unclear wording, language differences, poor technology and information overload can cause misunderstandings."],
        ["Choosing a method", "Urgency, cost, confidentiality, complexity and the audience influence which method is suitable."]
      ],
      example: "A manager may use a quick message for a shift change but a formal written report for an important policy.",
      examTip: "Explain why the communication method suits the audience and purpose.",
      keywords: ["communication", "internal", "external", "barriers", "written", "verbal"],
      question: "Explain one advantage of written communication for important instructions.",
      answer: "Written instructions provide a record that employees can check later, potentially reducing misunderstandings."
    },
    {
      id: "organisation-structure",
      section: "people",
      sectionName: "People in Business",
      title: "Organisation Structure",
      summary: "Hierarchy, chain of command, span of control and delegation.",
      definition: "Organisation structure shows how roles, responsibilities and authority are arranged within a business.",
      points: [
        ["Hierarchy", "The levels of authority from senior management to employees."],
        ["Chain of command", "The route through which instructions and decisions pass."],
        ["Span of control", "The number of employees directly supervised by a manager."],
        ["Delegation", "Giving a subordinate responsibility and authority to complete a task."],
        ["Advantages of delegation", "It can develop employees' skills and free managers to focus on other tasks."],
        ["Disadvantages of delegation", "Work may be completed incorrectly if the employee lacks skills or instructions are unclear."],
        ["Organisational change", "As a business grows, it may need additional management levels or clearer responsibilities."]
      ],
      example: "A store manager delegates stock checks to a trained supervisor, allowing the manager to focus on customer service.",
      examTip: "Distinguish responsibility for completing a task from overall accountability for the outcome.",
      keywords: ["hierarchy", "chain of command", "span of control", "delegation"],
      question: "Explain one advantage of delegation.",
      answer: "Delegation allows a manager to focus on higher-priority work while an employee develops skills by taking responsibility for a task."
    },
    {
      id: "motivation-rewards",
      section: "people",
      sectionName: "People in Business",
      title: "Motivation and Rewards",
      summary: "Financial and non-financial ways to motivate employees.",
      definition: "Motivation is the willingness of employees to work towards business and personal goals.",
      points: [
        ["Wages and salaries", "Financial rewards can provide income and encourage employees to work."],
        ["Commission", "Pay linked to sales can encourage employees to sell more."],
        ["Bonus", "An additional payment may reward performance or achieving a target."],
        ["Promotion", "Moving to a more senior role may provide higher pay and responsibility."],
        ["Job enrichment", "Giving employees more meaningful or challenging tasks may increase satisfaction."],
        ["Training and development", "Learning opportunities can improve skills and help employees progress."],
        ["Limitations", "A reward may not motivate everyone; poorly designed targets can encourage mistakes or unsuitable behaviour."]
      ],
      example: "A salesperson may receive commission for each sale, although the business should ensure that employees do not pressure customers into unsuitable purchases.",
      examTip: "Link motivation to a business outcome such as productivity, quality, staff retention or customer service.",
      keywords: ["motivation", "wages", "salary", "commission", "bonus", "job enrichment"],
      question: "Explain how commission could motivate a salesperson.",
      answer: "Because earnings increase with sales, the employee may put more effort into finding customers, potentially increasing the business's revenue."
    },
    {
      id: "sources-of-finance",
      section: "finance",
      sectionName: "Business Finance",
      title: "Sources of Finance",
      summary: "Internal and external ways to obtain business finance.",
      definition: "A source of finance is a method a business uses to obtain money for its activities or investment.",
      points: [
        ["Retained profit", "Profit kept in the business rather than distributed to owners."],
        ["Owner's savings", "Money invested by the owner; it does not normally require interest payments, but personal savings are limited."],
        ["Bank loan", "Borrowed money repaid over an agreed period, usually with interest."],
        ["Overdraft", "An arrangement allowing a business to spend more than the balance in its bank account up to an agreed limit."],
        ["Trade credit", "Suppliers allow the business to pay for goods later."],
        ["Share capital", "A company raises money by issuing shares to investors."],
        ["Choosing finance", "Consider the amount, purpose, duration, cost, risk, control and repayment requirements."]
      ],
      example: "A business buying machinery for long-term use may consider a long-term loan rather than relying on a short-term overdraft.",
      examTip: "Match the source of finance to the purpose. Explain both the benefit and the possible drawback.",
      keywords: ["retained profit", "loan", "overdraft", "trade credit", "share capital"],
      question: "Explain why a bank loan may suit a business purchasing machinery.",
      answer: "A loan can provide a relatively large amount of finance for a long-term asset, but interest and repayments increase the business's financial commitments."
    },
    {
      id: "break-even-margin-safety",
      section: "finance",
      sectionName: "Business Finance",
      title: "Break-even and Margin of Safety",
      summary: "Calculate break-even output and interpret the margin of safety.",
      definition: "Break-even is the level of output where total revenue equals total costs.",
      points: [
        ["Contribution per unit", "Selling price per unit − variable cost per unit."],
        ["Break-even output", "Fixed costs ÷ contribution per unit."],
        ["Margin of safety", "Actual output or sales − break-even output, using the same units."],
        ["Example", "Fixed costs are QAR 6,000, selling price is QAR 20 and variable cost is QAR 8. Contribution is QAR 12, so break-even output is 500 units."],
        ["Margin of safety example", "If actual sales are 650 units and break-even is 500 units, the margin of safety is 150 units."],
        ["Limitations", "Break-even calculations assume figures such as selling price and variable cost per unit remain constant within the relevant range."]
      ],
      example: "A business selling 650 units with a break-even output of 500 units has a margin of safety of 150 units.",
      examTip: "Show the contribution calculation first, then divide fixed costs by contribution. Follow the rounding instructions in the question.",
      keywords: ["break-even", "contribution", "fixed costs", "variable costs", "margin of safety"],
      question: "Fixed costs are QAR 4,000. Selling price is QAR 15 and variable cost is QAR 5 per unit. Calculate break-even output.",
      answer: "Contribution = QAR 15 − QAR 5 = QAR 10 per unit. Break-even output = QAR 4,000 ÷ QAR 10 = 400 units."
    },
    {
      id: "profitability-ratios",
      section: "finance",
      sectionName: "Business Finance",
      title: "Profitability Ratios",
      summary: "Gross profit margin and net profit margin.",
      definition: "Profitability ratios measure profit in relation to revenue and help assess financial performance.",
      points: [
        ["Gross profit", "Revenue − cost of sales."],
        ["Gross profit margin", "(Gross profit ÷ revenue) × 100."],
        ["Net profit margin", "(Net profit ÷ revenue) × 100."],
        ["Interpretation", "A higher margin means more profit is earned per unit of revenue at that level of calculation."],
        ["Comparisons", "Ratios can be compared over time or with similar businesses, while considering differences in products and costs."],
        ["Limitations", "A ratio alone does not explain why performance changed and should be considered alongside other information."]
      ],
      example: "If gross profit is QAR 30,000 and revenue is QAR 100,000, gross profit margin is 30%.",
      examTip: "When comparing two ratios, state the difference and explain a plausible business reason. Do not assume a higher ratio always means a better business overall.",
      keywords: ["gross profit margin", "net profit margin", "profitability ratio", "revenue"],
      question: "A business has gross profit of QAR 24,000 and revenue of QAR 80,000. Calculate gross profit margin.",
      answer: "Gross profit margin = (QAR 24,000 ÷ QAR 80,000) × 100 = 30%."
    },
    {
      id: "market-segmentation",
      section: "marketing",
      sectionName: "Marketing",
      title: "Market Segmentation",
      summary: "Dividing a market into groups with similar characteristics.",
      definition: "Market segmentation is dividing a market into groups of customers with similar needs or characteristics.",
      points: [
        ["Age", "Products may be designed for children, teenagers, adults or older customers."],
        ["Income", "Customers with different incomes may prefer different prices and product features."],
        ["Location", "Needs may differ by country, city, climate or local culture."],
        ["Lifestyle", "Customers may have different interests, activities and purchasing habits."],
        ["Advantages", "Segmentation can help a business design suitable products and target promotion more effectively."],
        ["Disadvantages", "Research and tailored promotion may cost more, and a chosen segment may be too small."]
      ],
      example: "A sportswear business may target teenagers interested in football with products and advertising suited to their interests.",
      examTip: "Identify the segment clearly and explain how the product or promotion meets that group's needs.",
      keywords: ["segmentation", "target market", "age", "income", "lifestyle"],
      question: "Explain one benefit of market segmentation.",
      answer: "It helps a business tailor products and promotion to a specific group, making its marketing more relevant and potentially increasing sales."
    },
    {
      id: "market-research-primary-secondary",
      section: "marketing",
      sectionName: "Marketing",
      title: "Primary and Secondary Market Research",
      summary: "Methods, advantages and limitations of market research.",
      definition: "Market research collects and analyses information about customers, competitors and markets.",
      points: [
        ["Primary research", "New information collected directly for a particular purpose, such as through surveys, interviews or observation."],
        ["Secondary research", "Information already collected, such as published reports, statistics and existing market data."],
        ["Primary research advantage", "Information can be tailored to the business's specific questions."],
        ["Primary research disadvantage", "It may be expensive and time-consuming to collect."],
        ["Secondary research advantage", "It can be faster and cheaper to obtain."],
        ["Secondary research disadvantage", "Information may be outdated, too general or collected for another purpose."],
        ["Sampling", "A sample should represent the target market as closely as practical; biased samples can produce misleading results."]
      ],
      example: "A café surveys its customers about new menu options and compares the results with published information about local consumer spending.",
      examTip: "Consider the quality, relevance, cost and timing of the information when evaluating research methods.",
      keywords: ["primary research", "secondary research", "survey", "sample", "market research"],
      question: "Explain one limitation of using a customer survey.",
      answer: "Customers may give inaccurate answers or the sample may not represent the wider target market, leading to decisions based on unreliable information."
    },
    {
      id: "product-life-cycle",
      section: "marketing",
      sectionName: "Marketing",
      title: "Product Life Cycle",
      summary: "Introduction, growth, maturity and decline.",
      definition: "The product life cycle describes the typical stages a product may pass through from launch to declining sales.",
      points: [
        ["Introduction", "Sales may be low because customers are still learning about the product; promotional costs may be high."],
        ["Growth", "Sales rise as more customers become aware of and purchase the product."],
        ["Maturity", "Sales growth slows as the product becomes established and competition may be strong."],
        ["Decline", "Sales fall because of changing preferences, new technology or competing products."],
        ["Extension strategies", "A business may update a product, change its packaging, find new markets or promote new uses."],
        ["Limitations", "Not all products follow the same pattern, and the timing of each stage is difficult to predict."]
      ],
      example: "A phone manufacturer may introduce a new model, experience rising sales, then launch updates to maintain interest as competitors release alternatives.",
      examTip: "Link the marketing decision to the product's stage and explain why it may affect sales or profit.",
      keywords: ["product life cycle", "introduction", "growth", "maturity", "decline", "extension strategy"],
      question: "Explain one reason a business may use an extension strategy.",
      answer: "An extension strategy may renew customer interest and slow falling sales, helping the business generate revenue for longer."
    },
    {
      id: "promotion-digital",
      section: "marketing",
      sectionName: "Marketing",
      title: "Digital Marketing",
      summary: "Websites, social media, search and online advertising.",
      definition: "Digital marketing promotes products or services through digital channels and technologies.",
      points: [
        ["Social media", "Businesses can communicate with users and share content targeted at particular audiences."],
        ["Business website", "A website can display product details, prices and purchasing options."],
        ["Search advertising", "Paid search adverts may appear when users search for relevant terms."],
        ["Measuring results", "Businesses can examine visits, clicks, conversions and sales to evaluate campaigns."],
        ["Advantages", "Digital promotion can reach customers across locations and provide measurable results."],
        ["Limitations", "Competition for attention, privacy concerns, negative comments and advertising costs can reduce effectiveness."]
      ],
      example: "An online retailer measures how many visitors buy a product after clicking a social media advert.",
      examTip: "Explain how a particular digital channel reaches the target audience and how the business could measure success.",
      keywords: ["digital marketing", "social media", "website", "online advertising", "conversion"],
      question: "Explain one advantage of measuring digital advertising results.",
      answer: "The business can identify which campaigns generate purchases and focus its marketing budget on methods that perform more effectively."
    },
    {
      id: "quality-control-assurance",
      section: "operations",
      sectionName: "Business Operations",
      title: "Quality Control and Quality Assurance",
      summary: "Checking products and preventing defects.",
      definition: "Quality management aims to ensure that products or services meet required standards and customer expectations.",
      points: [
        ["Quality control", "Products are inspected or tested to identify defects, often during or after production."],
        ["Quality assurance", "Processes are designed and monitored to prevent defects from occurring."],
        ["Quality control advantage", "Defective products can be identified before reaching customers."],
        ["Quality control limitation", "Inspection may discover defects only after time and materials have already been used."],
        ["Quality assurance advantage", "Preventing errors can reduce waste, complaints and rework."],
        ["Costs", "Training, inspection and improved systems may increase costs initially."],
        ["Business impact", "Consistent quality can support customer satisfaction and reputation."]
      ],
      example: "A manufacturer checks finished products for defects while also training employees to follow standard production procedures.",
      examTip: "Distinguish detecting defects from preventing them, then link quality to costs or customer satisfaction.",
      keywords: ["quality control", "quality assurance", "defects", "inspection", "standards"],
      question: "Explain one advantage of quality assurance.",
      answer: "By preventing mistakes during production, a business may reduce waste and rework, lowering costs over time."
    },
    {
      id: "stock-control",
      section: "operations",
      sectionName: "Business Operations",
      title: "Stock Control",
      summary: "Managing inventory, reorder levels and buffer stock.",
      definition: "Stock control ensures that a business has appropriate quantities of materials and products available when needed.",
      points: [
        ["Overstocking", "Holding too much stock ties up cash and may increase storage costs or waste."],
        ["Understocking", "Insufficient stock can cause lost sales, delays and dissatisfied customers."],
        ["Reorder level", "The stock level at which a new order should be placed to help avoid running out."],
        ["Buffer stock", "Extra stock held to reduce the risk of shortages caused by unexpected demand or delivery delays."],
        ["Computerised stock control", "Systems can update stock records as goods are received or sold."],
        ["Just-in-time approach", "Stock is ordered to arrive close to when it is needed, reducing storage requirements but increasing dependence on reliable deliveries."]
      ],
      example: "A shop sets a reorder level for a popular product so that replacement stock is ordered before the shelves become empty.",
      examTip: "When evaluating stock levels, consider both the cost of holding stock and the risk of running out.",
      keywords: ["stock control", "reorder level", "buffer stock", "overstocking", "understocking"],
      question: "Explain one risk of holding too little stock.",
      answer: "The business may run out of products when customers want to buy them, leading to lost sales and potentially damaging customer loyalty."
    },
    {
      id: "technology-in-operations",
      section: "operations",
      sectionName: "Business Operations",
      title: "Technology in Business Operations",
      summary: "Automation, computer systems and their effects on operations.",
      definition: "Operational technology includes equipment and digital systems used to produce goods or deliver services.",
      points: [
        ["Automation", "Machines or software perform tasks that would otherwise require manual work."],
        ["Productivity", "Technology may increase output per worker or per hour."],
        ["Consistency", "Automated processes may produce more consistent results."],
        ["Initial investment", "Equipment, software, installation and training can be expensive."],
        ["Employment effects", "Some tasks may require fewer workers, while new technical skills and roles may be needed."],
        ["Reliability and security", "Breakdowns, cyberattacks and system failures can interrupt operations."]
      ],
      example: "A warehouse uses barcode scanners to update stock records and help staff locate products.",
      examTip: "Balance the potential long-term efficiency gains against purchase costs, training and risks of disruption.",
      keywords: ["technology", "automation", "productivity", "software", "efficiency"],
      question: "Explain one way automation could reduce a business's costs.",
      answer: "Automation may reduce the time needed for repetitive tasks and increase output per worker, potentially lowering labour cost per unit."
    }
  ];

  topics.forEach(function (newTopic) {
    const alreadyExists = window.BUSINESS_TOPICS.some(function (topic) {
      return topic.id === newTopic.id;
    });

    if (!alreadyExists) {
      window.BUSINESS_TOPICS.push(newTopic);
    }
  });

  const quiz = [
    {
      q: "Which organisation can offer shares to the general public?",
      options: ["Sole trader", "Partnership", "Public limited company", "Private limited company"],
      answer: 2,
      explanation: "A public limited company can offer shares to the public, subject to relevant rules."
    },
    {
      q: "Which sector includes a furniture factory?",
      options: ["Primary", "Secondary", "Tertiary", "Public only"],
      answer: 1,
      explanation: "The secondary sector manufactures goods and processes raw materials."
    },
    {
      q: "What is an export?",
      options: [
        "A product purchased from abroad",
        "A product sold to another country",
        "A tax on company profits",
        "A loan from a bank"
      ],
      answer: 1,
      explanation: "Exports are goods and services sold to customers in other countries."
    },
    {
      q: "What does span of control mean?",
      options: [
        "The number of products a business sells",
        "The number of employees directly supervised by a manager",
        "The number of business owners",
        "The number of suppliers used"
      ],
      answer: 1,
      explanation: "Span of control is the number of employees directly supervised by a manager."
    },
    {
      q: "Which is an example of external communication?",
      options: [
        "A manager instructing an employee",
        "A team meeting",
        "A business emailing a customer",
        "An employee reading internal procedures"
      ],
      answer: 2,
      explanation: "External communication takes place between a business and someone outside it, such as a customer."
    },
    {
      q: "A business has fixed costs of QAR 5,000 and contribution of QAR 10 per unit. What is break-even output?",
      options: ["50 units", "500 units", "5,010 units", "50,000 units"],
      answer: 1,
      explanation: "Break-even output = fixed costs ÷ contribution per unit = 5,000 ÷ 10 = 500 units."
    },
    {
      q: "Gross profit is QAR 15,000 and revenue is QAR 60,000. What is gross profit margin?",
      options: ["15%", "25%", "40%", "45%"],
      answer: 1,
      explanation: "(15,000 ÷ 60,000) × 100 = 25%."
    },
    {
      q: "What is the main purpose of market segmentation?",
      options: [
        "To eliminate all competitors",
        "To divide customers into groups with similar characteristics",
        "To guarantee higher profits",
        "To remove the need for market research"
      ],
      answer: 1,
      explanation: "Segmentation groups customers with similar needs or characteristics so marketing can be tailored."
    },
    {
      q: "Which is an example of primary market research?",
      options: [
        "Reading an existing government report",
        "Studying an old industry survey",
        "Interviewing potential customers",
        "Reading a published textbook"
      ],
      answer: 2,
      explanation: "Interviewing potential customers collects new information directly for the research purpose."
    },
    {
      q: "What is the purpose of quality assurance?",
      options: [
        "To prevent defects through processes",
        "To increase selling prices automatically",
        "To guarantee that no costs occur",
        "To advertise products"
      ],
      answer: 0,
      explanation: "Quality assurance aims to prevent defects by designing and monitoring suitable processes."
    },
    {
      q: "What is buffer stock?",
      options: [
        "Stock that has already been sold",
        "Extra stock held to reduce the risk of shortages",
        "Money held in a bank account",
        "Products returned by customers"
      ],
      answer: 1,
      explanation: "Buffer stock helps a business cope with unexpected demand or delivery delays."
    },
    {
      q: "Which is a possible disadvantage of an overdraft?",
      options: [
        "It can never be repaid",
        "It may be withdrawn or become expensive",
        "It always gives ownership to a bank",
        "It cannot help with short-term cash needs"
      ],
      answer: 1,
      explanation: "An overdraft can be useful for short-term cash needs, but charges may be high and the facility may be withdrawn."
    }
  ];

  quiz.forEach(function (newQuestion) {
    const alreadyExists = window.BUSINESS_QUIZ.some(function (question) {
      return question.q === newQuestion.q;
    });

    if (!alreadyExists) {
      window.BUSINESS_QUIZ.push(newQuestion);
    }
  });
})();
