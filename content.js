
/*
  Edexcel International GCSE Business (4BS1)
  Learning library — Part 1: Business activity and influences on business.
  Original revision explanations. Verify coverage against the current
  official Pearson specification before describing the course as complete.
*/

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
    id:'business-activity',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Business activity and adding value',
    summary:'Understand business activity, factors of production and how businesses add value.',
    definition:'Business activity involves combining resources to produce goods or provide services that satisfy customer needs and wants.',
    points:[
      ['Needs and wants','Needs are essentials for living, such as food and shelter. Wants are things people would like to have but do not necessarily need. Businesses identify customer needs and wants to develop products.'],
      ['Goods and services','Goods are physical products, such as clothes or furniture. Services are activities provided to customers, such as transport, haircuts or education.'],
      ['Factors of production','Land includes natural resources; labour is human effort; capital includes manufactured resources such as machinery; enterprise is the ability to organise resources and take business risks.'],
      ['Adding value','Added value is the difference between the selling price of a product and the cost of bought-in materials and components. A business can increase it through branding, quality, convenience, design or customer service.'],
      ['Why businesses exist','Businesses supply products that customers want, create employment, generate income for owners and may contribute to economic growth.']
    ],
    example:'A bakery buys flour, eggs and sugar for QAR 20 and sells the finished cake for QAR 65. Its added value is QAR 45 before considering other costs such as wages, rent and electricity.',
    examTip:'Do not confuse added value with profit. Added value subtracts bought-in materials and components from the selling price; profit subtracts total business costs from revenue.',
    keywords:['business activity','needs','wants','goods','services','factors of production','land','labour','capital','enterprise','added value'],
    question:'A business buys materials for QAR 12 and sells the finished product for QAR 40. Calculate the added value.',
    answer:'Added value = selling price − cost of bought-in materials = QAR 40 − QAR 12 = QAR 28.'
  },
  {
    id:'classification',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Classification of businesses',
    summary:'Understand primary, secondary and tertiary sectors and how businesses are classified.',
    definition:'Business classification groups businesses according to the type of economic activity they carry out.',
    points:[
      ['Primary sector','Businesses extract or obtain natural resources, such as farming, fishing, forestry and mining.'],
      ['Secondary sector','Businesses manufacture goods or construct buildings, often using materials obtained from the primary sector.'],
      ['Tertiary sector','Businesses provide services, including retail, transport, banking, tourism and hairdressing.'],
      ['Interdependence','Businesses in different sectors often depend on each other. A farm supplies a food manufacturer, which supplies a supermarket.'],
      ['Changes in sector importance','Economic development, technology, consumer demand and outsourcing can change the relative importance of sectors in a country.']
    ],
    example:'A farmer grows wheat in the primary sector, a mill turns it into flour in the secondary sector, and a shop sells flour to customers in the tertiary sector.',
    examTip:'Identify the actual activity being carried out. A company may operate in more than one sector, so classify the activity described in the question.',
    keywords:['classification','primary sector','secondary sector','tertiary sector','manufacturing','services','interdependence'],
    question:'A company manufactures furniture from timber. Which sector is this activity in, and why?',
    answer:'It is in the secondary sector because the company transforms a natural resource into a manufactured product.'
  },
  {
    id:'enterprise',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Enterprise and entrepreneurship',
    summary:'Explore entrepreneurs, business ideas, risk, reward and the skills needed to start a business.',
    definition:'An entrepreneur identifies a business opportunity, organises resources and takes risks to establish or develop a business.',
    points:[
      ['Identifying opportunities','Entrepreneurs may spot an unmet customer need, a gap in the market or a way to improve an existing product.'],
      ['Common skills','Useful skills include communication, decision-making, planning, organisation, problem-solving and managing money.'],
      ['Risk and reward','An entrepreneur may earn profit, gain independence and achieve personal satisfaction, but may also lose invested money or face long working hours.'],
      ['Innovation','Developing a new product, service or way of working can help a business stand out from competitors. Innovation does not guarantee success.'],
      ['Why new businesses fail','Possible causes include weak demand, poor cash-flow management, strong competition, inadequate planning and insufficient finance.']
    ],
    example:'An entrepreneur notices that students near a school struggle to find affordable healthy lunches. They test demand and create a small lunch-delivery service, but must assess costs, competitors and likely sales.',
    examTip:'When discussing an entrepreneur’s success, link the skill or decision to a business outcome. For example, research may reduce uncertainty by identifying what customers are willing to buy.',
    keywords:['enterprise','entrepreneur','risk','reward','innovation','business idea','opportunity','business failure'],
    question:'Explain one risk an entrepreneur faces when starting a business.',
    answer:'The entrepreneur may invest personal savings but attract fewer customers than expected. Revenue may then be insufficient to cover costs, causing financial losses and possibly forcing the business to close.'
  },
  {
    id:'business-plans',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Business plans',
    summary:'Learn the purpose, contents, benefits and limitations of a business plan.',
    definition:'A business plan is a document setting out a business idea, its objectives and how the business intends to operate and achieve those objectives.',
    points:[
      ['Business idea and objectives','The plan explains what the business will sell, its intended customers and what it wants to achieve.'],
      ['Market information','Research about customer demand, competitors and the target market helps assess whether the idea is viable.'],
      ['Marketing and operations','The plan may explain pricing, promotion, location, suppliers, staffing and how products will be delivered.'],
      ['Financial forecasts','Expected sales, costs, cash flow and finance requirements help estimate whether the business can meet its payments and may make a profit.'],
      ['Benefits','Planning can identify problems early, clarify priorities and help persuade lenders or investors that the idea has been considered carefully.'],
      ['Limitations','Forecasts can be inaccurate, market conditions can change, and a detailed plan cannot guarantee success.']
    ],
    example:'Before opening a café, an owner estimates daily sales, calculates rent and wage costs, researches nearby competitors and forecasts whether enough cash will be available during the first few months.',
    examTip:'A business plan is only as reliable as its assumptions and information. Explain how a particular part of the plan helps the business make a better decision.',
    keywords:['business plan','objectives','market research','forecast','cash flow','sales forecast','financial planning'],
    question:'Explain one reason why a business plan may help a new business obtain finance.',
    answer:'A business plan can show a lender how the business expects to generate sales and repay borrowing. This may increase the lender’s confidence, although finance is not guaranteed.'
  },
  {
    id:'objectives',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Business aims and objectives',
    summary:'Understand financial and non-financial objectives and why they change.',
    definition:'Business objectives are the specific goals a business aims to achieve.',
    points:[
      ['Survival','A new or struggling business may prioritise remaining in operation and generating enough cash to pay its bills.'],
      ['Profit','Profit is the amount remaining when total costs are deducted from total revenue. Owners may seek to increase profit to earn a return on their investment.'],
      ['Sales and market share','A business may aim to increase sales revenue or gain a larger proportion of total sales in its market. Increasing sales does not automatically increase profit.'],
      ['Financial security','A business may aim to manage borrowing, maintain sufficient cash and reduce financial uncertainty.'],
      ['Non-financial objectives','These may include independence, personal satisfaction, social or environmental aims, and providing a particular service.'],
      ['Why objectives change','Business size, market conditions, competition, technology, financial performance and owners’ priorities can change the objectives a business pursues.']
    ],
    example:'A new local bakery may initially focus on survival and building a customer base. Once established, it may aim to increase profit or open another branch.',
    examTip:'Apply the point to the business in the question. Explain the consequence: objective → decision or action → likely effect on the business.',
    keywords:['objectives','aims','profit','survival','sales','market share','financial security','non-financial'],
    question:'Why might a new business prioritise survival over profit?',
    answer:'A new business may have uncertain sales and needs enough cash to pay its costs while building a customer base. Prioritising survival may help it establish itself before pursuing higher profit.'
  },
  {
    id:'ownership',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Types of business ownership',
    summary:'Compare sole traders, partnerships, limited companies and public corporations.',
    definition:'Ownership describes who legally owns and controls a business or organisation.',
    points:[
      ['Sole trader','Owned by one person. The owner usually makes decisions independently and keeps the profit after costs and taxes, but normally has unlimited liability for business debts.'],
      ['Partnership','Owned by two or more partners who share responsibilities and profits according to their agreement. In a traditional partnership, partners may have unlimited liability.'],
      ['Private limited company','A company that is legally separate from its owners. Shares are generally held privately and cannot be freely offered to the public. Shareholders generally have limited liability.'],
      ['Public limited company','A company that can offer shares to the public, subject to legal requirements. It may be able to raise substantial share capital, but faces greater regulation and reporting requirements.'],
      ['Limited liability','Shareholders generally risk the amount invested in their shares rather than being personally responsible for all company debts, subject to legal exceptions.'],
      ['Choosing ownership','Owners may consider control, finance, liability, continuity, administration costs and plans for growth.']
    ],
    example:'A self-employed plumber may choose sole-trader status for simplicity, while a growing business seeking investment from shareholders may incorporate as a limited company.',
    examTip:'Do not just list a feature. Link it to the owner’s needs, such as control, risk, finance or future growth. Avoid saying a limited company can never fail.',
    keywords:['sole trader','partnership','private limited company','public limited company','limited liability','unlimited liability','shareholder'],
    question:'Give one advantage to an owner of setting up a limited company.',
    answer:'Shareholders generally have limited liability, so their personal assets are protected from company debts beyond the amount invested, subject to legal exceptions.'
  },
  {
    id:'stakeholders',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Stakeholders and business influences',
    summary:'Identify stakeholder groups, their objectives and possible conflicts of interest.',
    definition:'A stakeholder is a person or group with an interest in, or affected by, the activities of a business.',
    points:[
      ['Owners and shareholders','May want profit, growth, dividends, business survival or an increase in the value of their investment.'],
      ['Employees and managers','May want fair pay, job security, safe conditions, promotion opportunities and a manageable workload.'],
      ['Customers','Usually want products that offer suitable quality, price, reliability and customer service.'],
      ['Suppliers and lenders','Suppliers may want prompt payment and continuing orders. Lenders want the business to repay borrowing and interest according to the agreement.'],
      ['Government and local community','Government may be concerned with tax revenue, employment and compliance with laws. Local communities may value jobs but be concerned about noise, traffic or pollution.'],
      ['Conflicting interests','Employees may want higher wages while owners want to control costs. Customers may want lower prices while owners want higher profit margins.']
    ],
    example:'If a factory increases wages, employees may become more motivated, but labour costs may rise and reduce profit unless productivity or sales also increase.',
    examTip:'Identify the stakeholder, explain what they want, and develop how meeting that interest affects the business or another stakeholder.',
    keywords:['stakeholder','owners','shareholders','employees','customers','suppliers','lenders','government','community','conflict'],
    question:'Explain one possible conflict between employees and owners.',
    answer:'Employees may want higher wages to improve their living standards. Higher wages increase labour costs, which may reduce profit unless productivity or sales also rise.'
  },
  {
    id:'business-growth',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'Business growth',
    summary:'Understand why businesses grow and compare internal and external growth.',
    definition:'Business growth occurs when a business increases its size or scale of operations, such as by increasing sales, output, employees or the number of locations.',
    points:[
      ['Reasons for growth','A business may seek higher profit, a larger market share, economies of scale, greater market power or access to new customers.'],
      ['Internal growth','The business expands its own operations, for example by opening another branch, increasing capacity or developing new products.'],
      ['External growth','The business grows by combining with or taking over another business, such as through a merger or acquisition.'],
      ['Potential benefits','Growth can increase sales, spread fixed costs over more output, strengthen bargaining power and reduce dependence on one product or market.'],
      ['Potential problems','Expansion may require finance, create communication difficulties, increase management workloads or lead to diseconomies of scale.'],
      ['Choosing a growth method','A business should consider its finances, management skills, objectives, market conditions and the risks of expanding too quickly.']
    ],
    example:'A successful café may grow internally by opening a second branch. Alternatively, it could acquire another café, which may provide an existing customer base but bring integration challenges.',
    examTip:'Growth is not automatically beneficial. Explain how the chosen method suits the business and consider its costs, risks and ability to manage expansion.',
    keywords:['growth','internal growth','external growth','merger','acquisition','takeover','economies of scale','diseconomies of scale'],
    question:'Explain one possible disadvantage of a business growing too quickly.',
    answer:'Rapid growth may make it harder for managers to supervise employees and maintain consistent quality. Customer complaints could increase, damaging the business’s reputation and reducing repeat sales.'
  },
  {
    id:'external-influences',
    section:'business',
    sectionName:'Business activity and influences on business',
    title:'External influences on businesses',
    summary:'Understand how economic, legal, technological, competitive and social changes affect decisions.',
    definition:'External influences are factors outside a business that can affect its decisions, costs, sales and performance.',
    points:[
      ['Economic conditions','Changes in inflation, interest rates, unemployment and economic growth can affect business costs, borrowing and customer spending.'],
      ['Competition','Competitors may force a business to improve quality, change prices, invest in promotion or develop new products.'],
      ['Technology','New technology can improve productivity, communication and customer convenience, but may require investment and employee training.'],
      ['Laws and regulation','Businesses must comply with relevant rules, such as employment, consumer protection, health and safety and environmental requirements.'],
      ['Social and environmental expectations','Changes in customer lifestyles, preferences and environmental awareness may affect demand and business practices.'],
      ['Responding to change','Businesses can monitor markets, research customer needs, plan for risks and adapt their products or operations.']
    ],
    example:'If inflation increases ingredient and electricity costs, a bakery may consider reducing waste, negotiating with suppliers or adjusting prices. Raising prices too much could reduce demand.',
    examTip:'Do not merely name an external factor. Explain the chain of impact on costs, demand, cash flow, profit or a specific business objective.',
    keywords:['external influences','inflation','interest rates','competition','technology','legislation','environment','economic growth'],
    question:'Explain how an increase in interest rates could affect a business with a variable-rate loan.',
    answer:'Higher interest rates may increase the business’s loan repayments. This leaves less cash available for other spending or expansion and may reduce profit if other factors remain unchanged.'
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
    examTip:'Explain the mechanism: incentive or training → employee behaviour or skill → productivity, quality, costs or customer satisfaction.',
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
