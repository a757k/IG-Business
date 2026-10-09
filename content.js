
/* Starter learning library. Expand and verify every subtopic against the official Pearson 4BS1 specification before publishing as a complete course. */

window.BUSINESS_SECTIONS = [
  {id:'all',label:'All sections'},
  {id:'business',label:'1. Business activity'},
  {id:'people',label:'2. People in business'},
  {id:'finance',label:'3. Business finance'},
  {id:'marketing',label:'4. Marketing'},
  {id:'operations',label:'5. Business operations'}
];

window.BUSINESS_TOPICS = [
  {
    id:'objectives',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Business aims and objectives',
    summary:'Understand financial and non-financial objectives and why they change.',
    definition:'Business objectives are the specific goals a business aims to achieve.',
    points:[
      ['Financial objectives','Survival, profit, sales, market share and financial security.'],
      ['Non-financial objectives','Social aims, personal satisfaction, challenge, independence and control.'],
      ['Why objectives change','Market conditions, technology, business performance, legislation and internal factors can change priorities.']
    ],
    example:'A new local bakery may initially focus on survival and building a customer base. Once established, it may aim to increase profit or open another branch.',
    examTip:'Apply the point to the business in the question. Explain the consequence: objective → decision/action → likely effect on the business.',
    keywords:['objectives','aims','profit','survival','market share'],
    question:'Why might a new business prioritise survival over profit?',
    answer:'A new business may prioritise survival because sales are uncertain and it needs enough cash to pay its costs while building a customer base. If it survives the early stages, it can focus more on profit later.'
  },
  {
    id:'ownership',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Types of business ownership',
    summary:'Compare sole traders, partnerships, limited companies and public corporations.',
    definition:'Ownership describes who legally owns and controls a business or organisation.',
    points:[
      ['Sole trader','Owned by one person. The owner usually keeps the profit but has unlimited liability.'],
      ['Partnership','Owned by two or more partners who share responsibilities and profits according to their agreement.'],
      ['Limited company','A separate legal entity. Shareholders generally have limited liability. Private companies restrict share transfers; public companies can offer shares to the public.'],
      ['Public corporation','An organisation owned by the state and established to provide a public service or meet public objectives.']
    ],
    example:'A self-employed plumber may choose sole-trader status for simplicity, while a growing company seeking investment may incorporate as a limited company.',
    examTip:'Do not just list a feature. Link it to the owner’s needs, such as control, risk, finance or continuity.',
    keywords:['sole trader','partnership','limited liability','private limited company','public limited company','public corporation'],
    question:'Give one advantage to an owner of setting up a limited company.',
    answer:'Shareholders generally have limited liability, so their personal assets are protected from business debts beyond the amount they invested, subject to legal exceptions.'
  },
  {
    id:'stakeholders',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Stakeholders and business influences',
    summary:'Identify stakeholder groups and how external changes affect decisions.',
    definition:'A stakeholder is a person or group with an interest in, or affected by, the activities of a business.',
    points:[
      ['Internal stakeholders','Owners, managers and employees.'],
      ['External stakeholders','Customers, suppliers, lenders, government and the local community.'],
      ['Conflicting interests','Employees may want higher wages while owners may want to reduce costs and increase profit.'],
      ['External influences','Economic conditions, technology, laws, competition and social or environmental expectations can affect decisions.']
    ],
    example:'If interest rates rise, a business with a variable-rate loan may face higher repayments, reducing the cash available for expansion.',
    examTip:'Name the stakeholder or influence, explain how it changes a business decision, then develop the impact on a relevant objective.',
    keywords:['stakeholder','government','competition','technology','interest rates'],
    question:'Explain one possible conflict between employees and owners.',
    answer:'Employees may want higher wages to improve their living standards. Higher wages increase the business’s labour costs, which may reduce profit unless productivity or sales also rise.'
  },
  {
    id:'recruitment',
    section:'people',
    sectionName:'People in business',
    title:'Recruitment and selection',
    summary:'Learn why businesses recruit and the main steps in selecting staff.',
    definition:'Recruitment is the process of attracting suitable applicants for a job vacancy; selection is choosing the most suitable applicant.',
    points:[
      ['Job analysis and description','Identify duties, responsibilities and working conditions.'],
      ['Person specification','Sets out the qualifications, skills and personal qualities required.'],
      ['Internal recruitment','Filling a vacancy with an existing employee; may be quicker and motivate staff.'],
      ['External recruitment','Hiring from outside; can bring new skills but may cost more and take longer.']
    ],
    example:'A shop opening a second branch might promote an experienced supervisor internally, while recruiting externally for specialist skills it does not have.',
    examTip:'When evaluating internal versus external recruitment, consider cost, speed, skills, motivation and the specific vacancy.',
    keywords:['recruitment','selection','job description','person specification','internal','external'],
    question:'State one advantage of internal recruitment.',
    answer:'It can be quicker and cheaper because the business already knows the employee’s performance and may need less induction training.'
  },
  {
    id:'motivation',
    section:'people',
    sectionName:'People in business',
    title:'Motivation and training',
    summary:'Explore how businesses motivate employees and improve their skills.',
    definition:'Motivation is the willingness of an employee to make an effort to achieve work goals.',
    points:[
      ['Financial methods','Wages, salaries, commission, bonuses and profit sharing.'],
      ['Non-financial methods','Praise, responsibility, promotion opportunities, job rotation and improved working conditions.'],
      ['Training','Induction introduces a new employee; on-the-job training happens while working; off-the-job training takes place away from the normal workplace.'],
      ['Possible effects','Motivation and training can improve productivity, quality and staff retention, but involve costs.']
    ],
    example:'Sales commission may encourage a salesperson to sell more, but poorly designed targets could encourage unsuitable sales or harm customer service.',
    examTip:'Explain the mechanism: incentive or training → employee behaviour/skill → productivity, quality, costs or customer satisfaction.',
    keywords:['motivation','commission','bonus','training','productivity'],
    question:'Explain how training could benefit a business.',
    answer:'Training can improve employees’ skills, allowing them to work more efficiently and make fewer mistakes. This may reduce waste and costs, improving profitability.'
  },
  {
    id:'leadership',
    section:'people',
    sectionName:'People in business',
    title:'Organisation and leadership',
    summary:'Understand organisational structure, communication and leadership styles.',
    definition:'Organisational structure shows how roles, responsibilities and authority are arranged in a business.',
    points:[
      ['Hierarchy','The levels of authority in an organisation.'],
      ['Span of control','The number of employees directly managed by one manager.'],
      ['Delegation','Passing authority to a subordinate to carry out tasks while the manager retains overall accountability.'],
      ['Leadership styles','Autocratic leaders make decisions centrally; democratic leaders involve employees; laissez-faire leaders give employees substantial independence.']
    ],
    example:'A fast-moving emergency may require quick central decisions, while a creative team may benefit from employee input.',
    examTip:'Avoid claiming one leadership style is always best. Match it to the workforce, task, urgency and business culture.',
    keywords:['hierarchy','span of control','delegation','autocratic','democratic','laissez-faire'],
    question:'What is one possible benefit of delegation?',
    answer:'Delegation can free managers to focus on strategic tasks and can develop employees’ skills and confidence.'
  },
  {
    id:'cashflow',
    section:'finance',
    sectionName:'Business finance',
    title:'Cash flow and cash-flow forecasts',
    summary:'Distinguish cash from profit and understand why cash-flow planning matters.',
    definition:'Cash flow is the movement of money into and out of a business over a period of time.',
    points:[
      ['Inflows','Cash received, such as cash sales, payments from credit customers or loans.'],
      ['Outflows','Cash paid, such as wages, rent, suppliers and loan repayments.'],
      ['Net cash flow','Cash inflows minus cash outflows for a period.'],
      ['Cash-flow forecast','An estimate of future cash inflows and outflows used to anticipate shortages or surpluses.']
    ],
    example:'A business may make sales on credit and record revenue, but if customers pay late it may not have cash available to pay wages.',
    examTip:'Profit is not the same as cash. In a calculation, show the formula and use the figures for the correct period.',
    keywords:['cash flow','cash inflow','cash outflow','net cash flow','forecast','liquidity'],
    question:'Why can a profitable business still experience cash-flow problems?',
    answer:'It may have made sales on credit but not received the cash yet. Bills and wages may be due before customers pay, leaving insufficient cash to meet short-term payments.'
  },
  {
    id:'costsrevenueprofit',
    section:'finance',
    sectionName:'Business finance',
    title:'Revenue, costs and profit',
    summary:'Use core financial terms and calculate profit from revenue and costs.',
    definition:'Revenue is income from selling goods or services. Profit is what remains when total costs are subtracted from revenue.',
    points:[
      ['Revenue','Selling price per unit × quantity sold.'],
      ['Fixed costs','Costs that do not change directly with output in the short term, such as rent.'],
      ['Variable costs','Costs that change with output, such as ingredients used to make products.'],
      ['Total costs','Fixed costs + variable costs.'],
      ['Profit','Total revenue − total costs.']
    ],
    example:'If a business earns QAR 8,000 in revenue and has total costs of QAR 5,500, its profit is QAR 2,500.',
    examTip:'Check whether a question asks for revenue, gross profit, profit for the period or net cash flow; these are not interchangeable.',
    keywords:['revenue','fixed cost','variable cost','total cost','profit','calculation'],
    question:'A business earns QAR 12,000 in revenue and has total costs of QAR 9,250. Calculate its profit.',
    answer:'Profit = total revenue − total costs = QAR 12,000 − QAR 9,250 = QAR 2,750.'
  },
  {
    id:'break-even',
    section:'finance',
    sectionName:'Business finance',
    title:'Break-even analysis',
    summary:'Understand break-even output, margin of safety and the limits of break-even analysis.',
    definition:'Break-even output is the level of output at which total revenue equals total costs, so the business makes neither a profit nor a loss.',
    points:[
      ['Contribution per unit','Selling price per unit − variable cost per unit.'],
      ['Break-even output','Fixed costs ÷ contribution per unit.'],
      ['Margin of safety','Actual or planned output − break-even output.'],
      ['Uses and limitations','It supports planning, but depends on assumptions and estimates that may change in reality.']
    ],
    example:'If fixed costs are QAR 2,000 and contribution is QAR 5 per unit, break-even output is 400 units.',
    examTip:'For break-even output, calculate contribution first. Use consistent units and explain what the result means for the business.',
    keywords:['break-even','contribution','margin of safety','fixed costs'],
    question:'Fixed costs are QAR 3,000. Selling price is QAR 20 and variable cost is QAR 8 per unit. Calculate break-even output.',
    answer:'Contribution per unit = QAR 20 − QAR 8 = QAR 12. Break-even output = QAR 3,000 ÷ QAR 12 = 250 units.'
  },
  {
    id:'market-research',
    section:'marketing',
    sectionName:'Marketing',
    title:'Market research',
    summary:'Compare primary and secondary research and quantitative and qualitative data.',
    definition:'Market research is collecting and analysing information about customers, competitors and a market to support business decisions.',
    points:[
      ['Primary research','New information collected directly, such as surveys, interviews or focus groups.'],
      ['Secondary research','Existing information, such as government statistics, reports or published market data.'],
      ['Quantitative data','Numerical information that can be measured or counted.'],
      ['Qualitative data','Opinions, reasons and attitudes that help explain why people behave as they do.']
    ],
    example:'Before launching a new drink, a business might survey potential customers about preferred flavours and examine existing market reports to estimate demand.',
    examTip:'Discuss whether the research is relevant, reliable, up to date and representative of the target market.',
    keywords:['market research','primary','secondary','quantitative','qualitative','survey'],
    question:'Give one advantage of primary market research.',
    answer:'It can be designed around the business’s exact research question and target customers, making the information highly relevant.'
  },
  {
    id:'marketing-mix',
    section:'marketing',
    sectionName:'Marketing',
    title:'The marketing mix: 4Ps',
    summary:'Apply product, price, promotion and place to a target market.',
    definition:'The marketing mix is the combination of product, price, promotion and place decisions used to market a product.',
    points:[
      ['Product','Features, quality, design, branding and packaging.'],
      ['Price','The amount customers pay; decisions may consider costs, competitors and customer perceptions.'],
      ['Promotion','Methods used to inform and persuade customers, including advertising and sales promotions.'],
      ['Place','How and where a product is distributed and made available to customers.']
    ],
    example:'A premium product may use high-quality packaging, a higher price, targeted promotion and selected retailers to support its positioning.',
    examTip:'Show how the 4Ps fit together and suit the target customer rather than discussing each P in isolation.',
    keywords:['marketing mix','product','price','promotion','place','4Ps'],
    question:'Why should a business consider its target market when setting price?',
    answer:'The target market affects customers’ willingness and ability to pay. A price that matches the target customers’ expectations can support sales and the product’s intended image.'
  },
  {
    id:'segmentation',
    section:'marketing',
    sectionName:'Marketing',
    title:'Market segmentation',
    summary:'Learn how businesses divide markets and target customer groups.',
    definition:'Market segmentation divides a market into groups of customers with similar characteristics or needs.',
    points:[
      ['Demographic','Age, income, occupation or family size.'],
      ['Geographic','Country, region, climate or location.'],
      ['Psychographic','Lifestyle, interests, attitudes and values.'],
      ['Benefits','Marketing can be tailored to a group, although research and separate campaigns may increase costs.']
    ],
    example:'A sportswear business may market lightweight clothing to customers in hot climates and insulated products to customers in colder regions.',
    examTip:'Identify the segment, explain the need shared by that group, and connect it to a marketing decision or business outcome.',
    keywords:['segmentation','target market','demographic','geographic','psychographic'],
    question:'Explain one benefit of market segmentation.',
    answer:'It helps a business tailor its product and promotion to a specific group’s needs, making marketing more relevant and potentially increasing sales.'
  },
  {
    id:'production',
    section:'operations',
    sectionName:'Business operations',
    title:'Methods of production',
    summary:'Compare job, batch and flow production.',
    definition:'Production is the process of turning inputs, such as labour and materials, into goods or services.',
    points:[
      ['Job production','One item or a small customised order is made at a time. It can offer flexibility but may be costly and slow.'],
      ['Batch production','A group of identical products is made before switching to another batch. It offers variety but may involve downtime.'],
      ['Flow production','Standardised products move continuously through stages. It can achieve high output and low unit costs but requires substantial investment and can be inflexible.']
    ],
    example:'A tailor may use job production, a bakery may produce batches of pastries, and a factory may use flow production for standardised bottled drinks.',
    examTip:'Recommend a method based on product type, demand volume, variety, cost, skills and flexibility.',
    keywords:['job production','batch production','flow production','productivity'],
    question:'Which production method is often suitable for large volumes of standardised products?',
    answer:'Flow production is often suitable because products move through a sequence of stages, supporting high output and potentially low unit costs.'
  },
  {
    id:'quality',
    section:'operations',
    sectionName:'Business operations',
    title:'Quality and customer service',
    summary:'Understand quality control, quality assurance and the impact of quality.',
    definition:'Quality means how well a product or service meets customer expectations and required standards.',
    points:[
      ['Quality control','Products or output are checked for defects, often during or after production.'],
      ['Quality assurance','Processes are designed to prevent defects and maintain standards throughout production.'],
      ['Benefits of quality','Fewer returns and complaints, stronger reputation and repeat purchases.'],
      ['Trade-offs','Quality systems and staff training can add costs, but poor quality can be more expensive over time.']
    ],
    example:'A food producer may check samples for defects and train staff to follow consistent hygiene and production procedures.',
    examTip:'Link quality to customer satisfaction, reputation, repeat sales, waste, costs and competitiveness.',
    keywords:['quality control','quality assurance','customer service','defects','reputation'],
    question:'Give one possible benefit of improving product quality.',
    answer:'Higher quality may reduce complaints and returns, helping protect the business’s reputation and encourage repeat purchases.'
  },
  {
    id:'location',
    section:'operations',
    sectionName:'Business operations',
    title:'Business location and production costs',
    summary:'Explore factors that influence where a business operates.',
    definition:'Business location is the place where a business carries out its activities.',
    points:[
      ['Customers and market','Retailers may need to be near customers; online businesses may prioritise distribution access.'],
      ['Costs','Rent, wages, transport and utilities affect operating costs.'],
      ['Labour and suppliers','Businesses may locate near suitable workers, raw materials or suppliers.'],
      ['Other factors','Infrastructure, competitors, laws, government incentives and environmental impacts can matter.']
    ],
    example:'A warehouse may choose a site near major roads to speed up deliveries, even if rent is slightly higher.',
    examTip:'Prioritise the most important factor for the business in the question and explain the effect on costs, sales or service.',
    keywords:['location','transport','labour','suppliers','costs'],
    question:'Why might a manufacturer locate near its suppliers?',
    answer:'It may reduce the time and cost of transporting raw materials, helping production run reliably and potentially reducing total costs.'
  }
];

window.BUSINESS_QUIZ = [
  {
    q:'Which of the following is a non-financial business objective?',
    options:['Increase market share','Achieve survival','Improve personal satisfaction','Increase profit'],
    answer:2,
    explanation:'Personal satisfaction is a non-financial objective. Profit, market share and survival are commonly classified as financial objectives in this specification.'
  },
  {
    q:'What is net cash flow for a period?',
    options:['Revenue minus total costs','Cash inflows minus cash outflows','Fixed costs plus variable costs','Selling price minus variable cost'],
    answer:1,
    explanation:'Net cash flow is calculated by subtracting cash outflows from cash inflows for the period.'
  },
  {
    q:'A product sells for QAR 15 and has a variable cost of QAR 9 per unit. What is contribution per unit?',
    options:['QAR 6','QAR 9','QAR 15','QAR 24'],
    answer:0,
    explanation:'Contribution per unit = selling price − variable cost = QAR 15 − QAR 9 = QAR 6.'
  },
  {
    q:'Which is an example of secondary market research?',
    options:['Interviewing 20 customers','Running a new focus group','Observing shoppers in a store','Reading a published industry report'],
    answer:3,
    explanation:'A published report already exists, so using it is secondary research.'
  },
  {
    q:'Which production method is usually most suitable for customised one-off products?',
    options:['Flow production','Job production','Mass production only','Continuous production'],
    answer:1,
    explanation:'Job production is suited to one-off or highly customised work, although it can be slower and more expensive per unit.'
  },
  {
    q:'What does limited liability generally mean for shareholders?',
    options:['They must pay all company debts personally','They cannot lose any money invested','Their personal liability is generally limited to their investment','They are guaranteed a dividend'],
    answer:2,
    explanation:'Shareholders generally risk the amount invested in their shares rather than being personally responsible for all company debts, subject to legal exceptions.'
  },
  {
    q:'Which is an example of a variable cost?',
    options:['Monthly rent under a fixed lease','Annual insurance premium','Raw materials used for each unit','A fixed licence fee'],
    answer:2,
    explanation:'Raw material costs usually rise as more units are produced, so they are variable costs.'
  },
  {
    q:'What is one purpose of a person specification?',
    options:['Describe the qualities and skills needed for a job','Calculate business profit','Set the product price','Forecast cash inflows'],
    answer:0,
    explanation:'A person specification outlines the qualifications, skills and personal qualities required for a role.'
  },
  {
    q:'Which part of the marketing mix concerns distribution?',
    options:['Product','Price','Promotion','Place'],
    answer:3,
    explanation:'Place concerns where and how the product reaches customers, including distribution channels.'
  },
  {
    q:'Why might a business use a cash-flow forecast?',
    options:['To guarantee future profit','To anticipate periods when cash may be insufficient','To remove all business risk','To calculate employee motivation'],
    answer:1,
    explanation:'A cash-flow forecast estimates future receipts and payments, helping a business identify potential cash shortages in advance.'
  }
];
