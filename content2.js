
/*
  content2.js
  Edexcel International GCSE Business (4BS1)
  Sections 3, 4 and 5:
  Business Finance, Marketing and Business Operations.

  Load content.js BEFORE this file, and both BEFORE app.js.
*/

window.BUSINESS_TOPICS = window.BUSINESS_TOPICS || [];

window.BUSINESS_TOPICS = window.BUSINESS_TOPICS.concat([
  // =========================================================
  // SECTION 3: BUSINESS FINANCE
  // =========================================================

  {
    id: "sources-finance",
    section: "finance",
    sectionName: "Business Finance",
    title: "Sources of Finance",
    summary: "Internal and external finance, short-term and long-term needs, and choosing suitable funding.",
    definition: "Sources of finance are the ways a business obtains money to start, operate or expand.",
    points: [
      ["Why businesses need finance", "Finance may be needed to start a business, purchase equipment, pay everyday expenses, develop products or expand into new markets."],
      ["Internal finance", "Money obtained from within the business or its owner, including personal savings, retained profit and selling assets."],
      ["Personal savings", "The owner's own money. It does not usually require interest payments, but the amount available may be limited and the owner risks personal funds."],
      ["Retained profit", "Profit kept in the business instead of being distributed to owners. It does not create a new loan, but is only available if the business has generated sufficient profit."],
      ["Selling assets", "Selling unused equipment, vehicles or property can raise funds, but the business loses the future use of those assets."],
      ["Bank loan", "Borrowed money repaid over an agreed period, usually with interest. It can fund major purchases but repayments must be made even if sales are weak."],
      ["Bank overdraft", "Allows a business to withdraw more money than is in its bank account up to an agreed limit. It can help with temporary cash shortages but may have high or variable charges."],
      ["Trade credit", "A supplier allows the business to pay for goods or materials later. It can help short-term cash flow, but late payment may damage supplier relationships."],
      ["Share capital", "Money raised by a company by issuing shares. It does not normally require loan repayments, but ownership and control may be diluted."],
      ["Venture capital", "Investment provided by investors who may accept high risk in exchange for a share of the business and potential future returns."],
      ["Crowdfunding", "Raising smaller contributions from many people, often through an online platform. Success is not guaranteed and the campaign takes time and effort."],
      ["Choosing finance", "Consider the amount required, purpose, urgency, cost, repayment period, risk, existing debt and effect on ownership or control."]
    ],
    example: "A bakery needing an oven for several years might consider a bank loan, while a temporary shortage before customers pay invoices may be better suited to an overdraft.",
    examTip: "Match the source of finance to the need. Long-term equipment may justify long-term finance; a short-term cash shortage may not justify a large long-term loan.",
    keywords: ["sources of finance", "internal finance", "external finance", "retained profit", "loan", "overdraft", "trade credit", "share capital", "crowdfunding"],
    question: "Explain one advantage and one disadvantage of using a bank loan to buy new machinery.",
    answer: "A loan provides money to buy machinery that may increase output. However, interest and repayments increase costs and must be paid even if the machinery does not generate the expected sales."
  },
  {
    id: "cashflow",
    section: "finance",
    sectionName: "Business Finance",
    title: "Cash Flow and Cash-Flow Forecasts",
    summary: "Cash inflows, outflows, net cash flow, balances and managing liquidity.",
    definition: "Cash flow is the movement of money into and out of a business over a period of time.",
    points: [
      ["Cash inflows", "Money received, such as cash sales, customer payments, loans and investment."],
      ["Cash outflows", "Money paid out, such as wages, rent, supplier payments, equipment purchases and loan repayments."],
      ["Net cash flow", "Total cash inflows minus total cash outflows for a period."],
      ["Opening balance", "Cash available at the start of the period."],
      ["Closing balance", "Opening balance plus net cash flow for the period."],
      ["Cash-flow forecast", "An estimate of expected cash inflows, outflows and balances over future periods."],
      ["Why cash matters", "Businesses need cash to pay employees, suppliers, rent, taxes and other obligations. A business can fail if it cannot pay debts when they fall due."],
      ["Cash is not profit", "A sale made on credit may count towards revenue before the customer pays. A loan brings in cash but is not sales revenue or profit."],
      ["Causes of cash-flow problems", "Low sales, late customer payments, seasonal demand, unexpected costs, excessive stock or large payments falling due."],
      ["Improving cash flow", "Chase overdue invoices, encourage prompt payment, manage stock, negotiate payment terms, reduce unnecessary spending or arrange suitable finance."],
      ["Limits of forecasts", "Forecasts rely on estimates. Unexpected events, inaccurate sales predictions or changes in costs can make actual cash flow different."]
    ],
    example: "Opening balance is QAR 2,000, inflows are QAR 7,000 and outflows are QAR 8,500. Net cash flow is −QAR 1,500 and closing balance is QAR 500.",
    examTip: "Show the calculation clearly. If the closing balance is negative, explain the possible difficulty paying obligations and a realistic action the business could take.",
    keywords: ["cash flow", "cash inflows", "cash outflows", "net cash flow", "opening balance", "closing balance", "liquidity"],
    question: "A business has an opening balance of QAR 3,500, inflows of QAR 9,000 and outflows of QAR 10,200. Calculate net cash flow and closing balance.",
    answer: "Net cash flow = QAR 9,000 − QAR 10,200 = −QAR 1,200. Closing balance = QAR 3,500 − QAR 1,200 = QAR 2,300."
  },
  {
    id: "costsrevenueprofit",
    section: "finance",
    sectionName: "Business Finance",
    title: "Costs, Revenue and Profit",
    summary: "Fixed costs, variable costs, total costs, sales revenue and profit calculations.",
    definition: "Revenue is income from sales. Profit is the amount remaining after total costs are deducted from revenue.",
    points: [
      ["Fixed costs", "Costs that do not directly change with output in the short run, such as rent or some insurance costs."],
      ["Variable costs", "Costs that change with the level of output, such as ingredients used to make products."],
      ["Total variable costs", "Variable cost per unit multiplied by the number of units produced."],
      ["Total costs", "Fixed costs plus total variable costs."],
      ["Sales revenue", "Selling price per unit multiplied by the number of units sold."],
      ["Gross profit", "Sales revenue minus cost of sales."],
      ["Operating profit", "Gross profit minus operating expenses, before relevant finance costs and tax."],
      ["Profit or loss", "Profit occurs when revenue exceeds relevant costs; a loss occurs when costs exceed revenue."],
      ["Ways to improve profit", "Increase sales revenue, improve the product mix, reduce waste, negotiate lower input costs or improve productivity."],
      ["Limitations", "Cost reductions may harm quality, and higher prices may reduce demand. Decisions should consider customers and competitors."]
    ],
    example: "A business sells 120 items at QAR 25 each. Revenue is QAR 3,000. If total costs are QAR 2,100, profit is QAR 900.",
    examTip: "Read the question carefully to see which type of profit is required. Do not confuse revenue with profit or gross profit with operating profit.",
    keywords: ["fixed costs", "variable costs", "total costs", "sales revenue", "gross profit", "operating profit", "loss"],
    question: "A business sells 80 units at QAR 15 each. Total costs are QAR 900. Calculate its profit.",
    answer: "Revenue = 80 × QAR 15 = QAR 1,200. Profit = QAR 1,200 − QAR 900 = QAR 300."
  },
  {
    id: "break-even",
    section: "finance",
    sectionName: "Business Finance",
    title: "Break-Even Analysis",
    summary: "Contribution, break-even output, margin of safety and break-even chart limitations.",
    definition: "Break-even is the output level at which total revenue equals total costs, resulting in neither profit nor loss.",
    points: [
      ["Contribution per unit", "Selling price per unit minus variable cost per unit."],
      ["Break-even output", "Fixed costs divided by contribution per unit."],
      ["Margin of safety", "Actual or forecast output minus break-even output."],
      ["Below break-even", "The business makes a loss if the assumptions used in the calculation remain valid."],
      ["Above break-even", "The business makes a profit if output is sold and the underlying assumptions remain valid."],
      ["Break-even chart", "Can show fixed costs, total costs, total revenue and the point where total revenue crosses total costs."],
      ["Changes in selling price", "A higher selling price may increase contribution and lower break-even output, but could reduce demand."],
      ["Changes in costs", "Higher fixed costs raise the break-even output if other factors remain unchanged. Higher variable costs reduce contribution and generally raise break-even output."],
      ["Uses", "Helps estimate the sales needed to cover costs and compare possible prices, costs or output levels."],
      ["Limitations", "Assumes costs and revenue behave predictably; demand, selling prices and variable costs may change. Products may not all sell, and real businesses may sell several products."]
    ],
    example: "Fixed costs are QAR 600, selling price is QAR 20 and variable cost is QAR 8. Contribution is QAR 12, so break-even output is 600 ÷ 12 = 50 units.",
    examTip: "For a decision question, explain the calculation and then consider whether the expected sales are realistic. Break-even analysis is based on assumptions, not a guarantee.",
    keywords: ["break-even", "contribution", "margin of safety", "break-even chart", "fixed costs", "variable costs"],
    question: "Fixed costs are QAR 1,200, selling price is QAR 35 and variable cost is QAR 15. Calculate break-even output.",
    answer: "Contribution per unit = QAR 35 − QAR 15 = QAR 20. Break-even output = QAR 1,200 ÷ QAR 20 = 60 units."
  },
  {
    id: "financial-statements",
    section: "finance",
    sectionName: "Business Finance",
    title: "Financial Documents",
    summary: "Statements of comprehensive income and statements of financial position.",
    definition: "Financial documents summarise a business's financial performance or financial position and help managers make decisions.",
    points: [
      ["Statement of comprehensive income", "Shows financial performance over a period, including sales, cost of sales, gross profit, expenses and operating profit."],
      ["Sales revenue", "Income earned from selling goods or services."],
      ["Cost of sales", "The cost associated with the goods sold during the period."],
      ["Gross profit", "Sales revenue minus cost of sales."],
      ["Expenses", "Operating costs such as wages, rent, utilities and marketing costs."],
      ["Operating profit", "Gross profit minus operating expenses."],
      ["Statement of financial position", "Shows assets, liabilities and capital at a particular date."],
      ["Current assets", "Assets expected to be converted into cash, sold or used within the normal operating cycle or short term, such as cash, inventory and trade receivables."],
      ["Non-current assets", "Longer-term assets used by the business, such as buildings, vehicles and machinery."],
      ["Current liabilities", "Amounts generally due for payment within the short term, such as trade payables and some short-term borrowing."],
      ["Non-current liabilities", "Longer-term obligations, such as a long-term bank loan."],
      ["Capital employed", "A measure of long-term capital used in the business; it can be calculated as total assets minus current liabilities or equity plus non-current liabilities, using consistent definitions."],
      ["Decision-making", "Managers can use financial documents to identify changes in profit, examine liquidity and consider whether costs or assets need to be managed differently."]
    ],
    example: "If sales revenue is QAR 50,000 and cost of sales is QAR 30,000, gross profit is QAR 20,000. If operating expenses are QAR 12,000, operating profit is QAR 8,000.",
    examTip: "A statement of comprehensive income measures performance over a period. A statement of financial position shows the position at a particular date.",
    keywords: ["statement of comprehensive income", "statement of financial position", "cost of sales", "gross profit", "operating profit", "assets", "liabilities", "capital employed"],
    question: "Sales revenue is QAR 70,000, cost of sales is QAR 42,000 and operating expenses are QAR 18,000. Calculate gross profit and operating profit.",
    answer: "Gross profit = QAR 70,000 − QAR 42,000 = QAR 28,000. Operating profit = QAR 28,000 − QAR 18,000 = QAR 10,000."
  },
  {
    id: "financial-ratios",
    section: "finance",
    sectionName: "Business Finance",
    title: "Financial Ratios and Business Performance",
    summary: "Profit margins, markup, return on capital employed and liquidity ratios.",
    definition: "Financial ratios use figures from financial documents to assess profitability, returns or the ability to meet short-term obligations.",
    points: [
      ["Gross profit margin", "Gross profit ÷ sales revenue × 100. Shows gross profit as a percentage of sales."],
      ["Operating profit margin", "Operating profit ÷ sales revenue × 100. Shows operating profit as a percentage of sales."],
      ["Markup", "Gross profit ÷ cost of sales × 100, when using total cost of sales as the cost base. It expresses gross profit relative to cost."],
      ["Return on capital employed (ROCE)", "Operating profit ÷ capital employed × 100. Indicates the operating return generated from capital employed."],
      ["Current ratio", "Current assets ÷ current liabilities. Assesses the relationship between short-term assets and short-term liabilities."],
      ["Acid test ratio", "(Current assets − inventory) ÷ current liabilities. Measures liquidity after excluding inventory."],
      ["Comparisons", "Ratios are more useful when compared with previous years, competitors or industry expectations."],
      ["Profitability changes", "Margins may change because of selling prices, input costs, wages, efficiency or the products sold."],
      ["Liquidity problems", "A business may have profitable sales but insufficient liquid assets to pay bills on time."],
      ["Limitations", "Ratios depend on accurate figures and consistent accounting methods. A ratio alone rarely explains why performance changed."]
    ],
    example: "If gross profit is QAR 12,000 and sales revenue is QAR 40,000, gross profit margin = 12,000 ÷ 40,000 × 100 = 30%.",
    examTip: "When comparing ratios, state the change, calculate or quote the difference where possible, and explain a likely business consequence. Do not assume a higher ratio is always better in every context.",
    keywords: ["gross profit margin", "operating profit margin", "markup", "ROCE", "current ratio", "acid test ratio", "liquidity"],
    question: "A business has operating profit of QAR 15,000 and sales revenue of QAR 75,000. Calculate its operating profit margin.",
    answer: "Operating profit margin = operating profit ÷ sales revenue × 100 = 15,000 ÷ 75,000 × 100 = 20%."
  },

  // =========================================================
  // SECTION 4: MARKETING
  // =========================================================

  {
    id: "market-research",
    section: "marketing",
    sectionName: "Marketing",
    title: "Market Research",
    summary: "Research methods, data, social media, reliability and decision-making.",
    definition: "Market research is the collection and analysis of information about customers, competitors and markets.",
    points: [
      ["Purpose", "Research helps identify customer needs, find gaps in the market, reduce uncertainty and inform decisions."],
      ["Primary research", "New data collected directly for a particular purpose."],
      ["Surveys and questionnaires", "Can gather answers from many people. Results depend on question wording, response rates and sample quality."],
      ["Focus groups", "A small group discusses a product or idea. They can reveal reasons behind opinions, but may not represent the whole market."],
      ["Observation", "Watching what customers do can reveal behaviour, although it may not explain why they behave that way."],
      ["Test marketing", "Launching a product in a limited area or to a limited group before a wider launch. It can identify problems but costs time and may alert competitors."],
      ["Secondary research", "Uses information already collected, such as government reports, market reports, published statistics and internet sources."],
      ["Quantitative data", "Numerical data that can be counted or measured, such as the percentage of respondents who prefer a product."],
      ["Qualitative data", "Descriptive information about opinions, attitudes and reasons."],
      ["Social media", "Can help businesses gather comments, identify trends and target surveys, but online responses may be biased or unrepresentative."],
      ["Reliability", "Research is more useful when the sample is appropriate, questions are clear, information is current and methods reduce bias."],
      ["Using research", "Research can guide product design, pricing, promotion, location and estimates of likely demand."]
    ],
    example: "A sports shop asks local football players about boot preferences before ordering stock. It should include different ages and playing levels if those groups are customers.",
    examTip: "For evaluation, consider cost, speed, detail, reliability and whether the research sample represents the target market.",
    keywords: ["market research", "primary research", "secondary research", "survey", "questionnaire", "focus group", "test marketing", "qualitative", "quantitative", "social media"],
    question: "Explain one limitation of using social media comments as market research.",
    answer: "People who comment online may not represent the wider target market. Decisions based on their opinions could lead the business to choose a product or price that does not appeal to most customers."
  },
  {
    id: "market-and-competition",
    section: "marketing",
    sectionName: "Marketing",
    title: "Markets, Competition and Market Share",
    summary: "Market size, market share, niche and mass markets, loyalty and responding to competition.",
    definition: "A market is where buyers and sellers interact. Market share is the proportion of total market sales achieved by a business.",
    points: [
      ["Market size", "Can be measured by the total quantity sold or the total value of sales in a market over a period."],
      ["Market share by value", "Business sales revenue ÷ total market sales revenue × 100."],
      ["Market share by volume", "Business sales volume ÷ total market sales volume × 100."],
      ["Market growth", "An expanding market may create opportunities for higher sales, while a shrinking market may intensify competition."],
      ["Mass marketing", "Targets a large market with a product intended to appeal to many customers."],
      ["Niche marketing", "Targets a smaller, more specialised customer group. It may face less direct competition but have a limited customer base."],
      ["Market orientation", "The business researches customer needs and develops products to satisfy them."],
      ["Product orientation", "The business focuses strongly on its product or production and may assume customers will value it."],
      ["Customer loyalty", "Loyal customers may purchase repeatedly, recommend the business and be less likely to switch."],
      ["Competition", "Businesses may respond through price, quality, service, product improvements, branding or promotion."],
      ["Changing consumer spending", "Changes in income, confidence and priorities can affect which products customers buy and how much they spend."]
    ],
    example: "A business earns QAR 200,000 in a market worth QAR 1,000,000. Its market share by value is 20%.",
    examTip: "A rise in market share does not automatically mean profit has risen. A business may have reduced prices or increased promotion spending to win customers.",
    keywords: ["market size", "market share", "market growth", "niche market", "mass market", "market orientation", "product orientation", "competition", "loyalty"],
    question: "A business has sales of QAR 150,000 in a market worth QAR 600,000. Calculate its market share by value.",
    answer: "Market share = 150,000 ÷ 600,000 × 100 = 25%."
  },
  {
    id: "marketing-mix",
    section: "marketing",
    sectionName: "Marketing",
    title: "The Marketing Mix: Product, Price, Promotion and Place",
    summary: "The 4Ps and how businesses combine them to satisfy customer needs.",
    definition: "The marketing mix is the combination of product, price, promotion and place decisions used to market a product.",
    points: [
      ["Product", "Includes features, quality, design, branding, packaging, range and after-sales service."],
      ["Branding", "Creates a recognisable identity. A strong brand may build trust, loyalty and willingness to pay, but takes time and money to develop."],
      ["Product life cycle", "Products may pass through development, introduction, growth, maturity and decline. Sales, competition and promotional needs can change at each stage."],
      ["Price", "Should consider costs, demand, competitors, customer perceptions and business objectives."],
      ["Cost-plus pricing", "Adds a chosen amount or percentage to cost. It is straightforward but may ignore competitors and customer willingness to pay."],
      ["Competitive pricing", "Sets prices with reference to competitors. It can help a business remain competitive but may trigger price competition."],
      ["Penetration pricing", "Uses a low initial price to attract customers and gain market share. Profit per unit may initially be low."],
      ["Promotional pricing", "Uses a temporary reduction or special offer to encourage purchases. It may increase short-term sales but reduce revenue per item."],
      ["Promotion", "Includes advertising, sales promotions, public relations, sponsorship, personal selling and digital campaigns."],
      ["Above-the-line promotion", "Promotion through media that reaches a broad audience, such as television, radio or certain forms of mass advertising."],
      ["Below-the-line promotion", "More targeted methods, such as direct marketing, loyalty schemes, sales promotions and some event-based activities."],
      ["Public relations", "Activities intended to build or protect a business's image and relationships with the public."],
      ["Digital promotion", "Targeted online advertising, e-newsletters and social media can reach particular groups, but may create privacy concerns or be ignored."],
      ["Place", "Where and how products reach customers, including shops, online stores, wholesalers, retailers and delivery."],
      ["Consistency", "The four elements should work together. A premium product may need suitable quality, branding, price and distribution."]
    ],
    example: "A premium football boot brand might use innovative materials, a high price, athlete sponsorship and specialist sports retailers.",
    examTip: "Apply the marketing mix to the target market and product. Explain the benefit and any drawback rather than just naming a technique.",
    keywords: ["marketing mix", "product", "price", "promotion", "place", "branding", "product life cycle", "cost-plus pricing", "penetration pricing", "public relations"],
    question: "Explain one reason a new business might use penetration pricing.",
    answer: "A low introductory price can encourage customers to try an unfamiliar product and help the business gain market share. However, the low price may limit profit per unit and could be difficult to increase later."
  },
  {
    id: "promotion-branding",
    section: "marketing",
    sectionName: "Marketing",
    title: "Promotion, Advertising and Branding",
    summary: "Promotion methods, online advertising, public relations and brand development.",
    definition: "Promotion is communication intended to inform, persuade or remind customers about a business or its products. A brand is the identity and image associated with a product or business.",
    points: [
      ["Advertising", "Paid communication through channels such as television, radio, outdoor displays, search engines or social media."],
      ["Sales promotion", "Short-term incentives such as discounts, coupons, competitions or buy-one-get-one offers."],
      ["Personal selling", "Direct interaction between a salesperson and a potential customer. It allows questions and tailored explanations but can be costly per customer."],
      ["Public relations", "Activities such as press releases, community events and responses to public concerns that aim to maintain a positive image."],
      ["Sponsorship", "Supporting a team, event or individual in return for publicity and association with the sponsored activity."],
      ["Targeted online advertising", "Uses information about audience characteristics or interests to show adverts to selected groups. Businesses must consider privacy and advertising rules."],
      ["Viral promotion", "Content spreads rapidly when people share it. Reach can be large, but the business cannot fully control whether people share it or how they interpret it."],
      ["E-newsletters", "Send information or offers to subscribers. They can encourage repeat purchases but may be ignored or unsubscribed from."],
      ["Brand benefits", "A strong brand can distinguish products, support customer loyalty and reduce uncertainty for buyers."],
      ["Brand risks", "Building a brand takes time and money, and negative publicity can damage reputation quickly."]
    ],
    example: "A local football academy sponsors a youth tournament to raise awareness among families likely to use its services.",
    examTip: "Choose a promotional method based on the target audience, budget, product and objective. Explain why the method is suitable and how success might be measured.",
    keywords: ["advertising", "sales promotion", "personal selling", "public relations", "sponsorship", "targeted advertising", "viral promotion", "brand"],
    question: "Explain one advantage of targeted online advertising.",
    answer: "The business can show its adverts to people more likely to be interested in the product. This may reduce wasted promotional spending, although results depend on accurate targeting and the advert's effectiveness."
  },

  // =========================================================
  // SECTION 5: BUSINESS OPERATIONS
  // =========================================================

  {
    id: "economies-scale",
    section: "operations",
    sectionName: "Business Operations",
    title: "Economies and Diseconomies of Scale",
    summary: "How business size affects average costs and why growth may become difficult.",
    definition: "Economies of scale occur when average costs fall as a business increases output. Diseconomies of scale occur when average costs rise as a business grows.",
    points: [
      ["Average cost", "Total costs divided by total output."],
      ["Purchasing economies", "Large businesses may negotiate discounts because they buy large quantities from suppliers."],
      ["Marketing economies", "Advertising costs may be spread over more units sold."],
      ["Technical economies", "Large businesses may afford specialist machinery that lowers unit costs or increases efficiency."],
      ["Managerial economies", "A large business may employ specialists whose expertise improves decisions in particular areas."],
      ["Financial economies", "Larger, established businesses may sometimes obtain finance on more favourable terms because lenders view them as lower risk."],
      ["External economies of scale", "A business may benefit from industry-wide improvements, such as a better-skilled local workforce or improved infrastructure."],
      ["Diseconomies of scale", "Communication may become slower, coordination more difficult and employee motivation weaker as the organisation grows."],
      ["Limits of growth", "Expansion may require substantial finance and can make quality, customer service and management harder to maintain."]
    ],
    example: "A large supermarket chain may obtain lower prices from suppliers by purchasing in bulk, reducing the cost per item.",
    examTip: "Explain how growth affects average costs. Do not assume that a larger business always has lower costs; diseconomies can emerge when coordination becomes difficult.",
    keywords: ["economies of scale", "diseconomies of scale", "average cost", "purchasing economies", "technical economies", "external economies"],
    question: "Explain one way a large manufacturer may benefit from economies of scale.",
    answer: "It may purchase raw materials in bulk at discounted prices. This reduces material cost per unit and may increase profit margins if selling prices and other costs remain unchanged."
  },
  {
    id: "production",
    section: "operations",
    sectionName: "Business Operations",
    title: "Production Methods",
    summary: "Job, batch and flow production, labour intensity and capital intensity.",
    definition: "Production is the process of transforming inputs into goods or services.",
    points: [
      ["Job production", "Makes a product individually to a customer's requirements. It offers customisation but can be slow and costly per unit."],
      ["Batch production", "Makes a group of similar products before changing to another batch. It balances variety and efficiency but may involve storage and changeover costs."],
      ["Flow production", "Produces standardised products continuously or along a production line. It can create high output and low unit costs but may require expensive equipment."],
      ["Labour-intensive production", "Relies heavily on workers. It may be flexible and provide employment, but labour costs can be high."],
      ["Capital-intensive production", "Relies heavily on machinery and equipment. It may increase speed and consistency but requires investment and maintenance."],
      ["Choosing a method", "Depends on product variety, output volume, customisation, worker skills, finance and customer demand."],
      ["Impact on workers", "Automation may reduce repetitive tasks but can require retraining or change the number and type of jobs available."],
      ["Impact on quality", "Standardised processes may improve consistency, while skilled workers may be important for customised products."]
    ],
    example: "A tailor uses job production for a custom suit, a bakery may use batch production for different pastries, and a drinks factory may use flow production for bottled drinks.",
    examTip: "Link the method to the business's output volume and product variety. Explain the effect on cost, flexibility, quality or delivery.",
    keywords: ["job production", "batch production", "flow production", "labour-intensive", "capital-intensive", "automation"],
    question: "Explain one advantage of batch production for a bakery making several types of bread.",
    answer: "The bakery can produce one batch of each bread type before changing equipment or ingredients. This provides variety while making production more efficient than preparing every loaf individually."
  },
  {
    id: "productivity",
    section: "operations",
    sectionName: "Business Operations",
    title: "Productivity and Efficiency",
    summary: "Productivity calculations and methods to improve the use of resources.",
    definition: "Productivity measures output produced per unit of input over a period of time.",
    points: [
      ["Labour productivity", "Output per worker or output per worker per hour, depending on the data given."],
      ["Formula", "Productivity = total output ÷ quantity of input used."],
      ["Improving productivity", "Training, better equipment, improved workflow, motivation, maintenance and reducing waste can raise output per input."],
      ["Benefits", "Higher productivity may lower labour cost per unit, increase capacity, improve delivery times and raise competitiveness."],
      ["Possible drawbacks", "New equipment and training cost money. Pressure to increase output may harm quality or staff wellbeing if poorly managed."],
      ["Efficiency", "Using resources with minimal waste while producing the required output and quality."]
    ],
    example: "If 5 workers produce 200 units in a day, average output per worker is 200 ÷ 5 = 40 units per worker per day.",
    examTip: "Use the units given in the question. If the data is output per hour, include 'per hour' in your answer.",
    keywords: ["productivity", "efficiency", "output", "input", "training", "automation"],
    question: "A factory produces 720 units using 12 workers in one shift. Calculate output per worker per shift.",
    answer: "Productivity = 720 ÷ 12 = 60 units per worker per shift."
  },
  {
    id: "quality",
    section: "operations",
    sectionName: "Business Operations",
    title: "Quality Management",
    summary: "Quality control, quality assurance and the business impact of product standards.",
    definition: "Quality describes how well a product or service meets customer expectations and required standards.",
    points: [
      ["Quality control", "Checks products or output for defects, often through inspection during or after production."],
      ["Quality assurance", "Uses procedures and systems throughout the production process to prevent errors and maintain standards."],
      ["Benefits of good quality", "Can increase customer satisfaction, repeat purchases, reputation and willingness to recommend the business."],
      ["Costs of poor quality", "Defects can cause waste, returns, repairs, refunds, complaints and damage to reputation."],
      ["Costs of quality management", "Inspection, staff training, improved materials and quality systems require time and money."],
      ["Consistency", "Customers are more likely to trust a business when products and services meet expected standards reliably."],
      ["Choosing an approach", "Depends on product safety, complexity, production volume, available resources and customer expectations."]
    ],
    example: "A bicycle manufacturer checks braking systems before delivery to reduce the chance that defective products reach customers.",
    examTip: "Explain both the likely benefit and the cost. Quality systems may increase short-term spending but reduce defects and complaints later.",
    keywords: ["quality", "quality control", "quality assurance", "defects", "customer satisfaction", "waste"],
    question: "Explain one difference between quality control and quality assurance.",
    answer: "Quality control checks output for defects, often through inspection. Quality assurance focuses on processes throughout production to prevent defects from occurring."
  },
  {
    id: "stock-control",
    section: "operations",
    sectionName: "Business Operations",
    title: "Stock Control and Inventory",
    summary: "Why businesses hold stock, stock shortages, storage costs and stock-control methods.",
    definition: "Stock, or inventory, includes materials, work in progress and finished goods held by a business.",
    points: [
      ["Raw materials", "Inputs used to make products."],
      ["Work in progress", "Items that have entered production but are not yet finished."],
      ["Finished goods", "Products ready to be sold or delivered to customers."],
      ["Reasons to hold stock", "Stock allows production to continue and helps meet customer demand when deliveries or production take time."],
      ["Costs of holding stock", "Storage, insurance, damage, theft and the risk that goods become obsolete."],
      ["Too little stock", "May cause production stoppages, missed sales, delayed deliveries and unhappy customers."],
      ["Too much stock", "Ties up cash that could be used elsewhere and increases storage and obsolescence costs."],
      ["Reorder level", "The stock level at which a new order should be placed, allowing time for delivery before stock runs out."],
      ["Just-in-time approach", "Aims to receive materials when they are needed, reducing stockholding costs but increasing dependence on reliable suppliers and deliveries."],
      ["Stock records", "Accurate records help managers monitor stock levels, identify patterns and avoid unnecessary orders."]
    ],
    example: "A restaurant needs enough ingredients to serve customers, but ordering too much fresh food may lead to spoilage and waste.",
    examTip: "Stock decisions involve a trade-off between availability and cost. Consider supplier reliability, demand variability, storage limits and the type of product.",
    keywords: ["stock", "inventory", "raw materials", "work in progress", "finished goods", "reorder level", "just in time"],
    question: "Explain one risk of a business holding too much stock.",
    answer: "Excess stock ties up cash and may increase storage costs. If demand falls or products become outdated, the business may have to discount them or write them off."
  },
  {
    id: "location",
    section: "operations",
    sectionName: "Business Operations",
    title: "Business Location",
    summary: "Customers, labour, suppliers, transport, costs and infrastructure as location factors.",
    definition: "Business location is the place where a business carries out its activities.",
    points: [
      ["Customers", "Retailers may locate near target customers to increase convenience and potential sales."],
      ["Labour", "Businesses consider the availability, skills, productivity and cost of workers."],
      ["Suppliers", "Locating near important suppliers can reduce delivery time, transport costs and disruption."],
      ["Transport and infrastructure", "Roads, ports, airports, utilities and internet access can affect costs and reliability."],
      ["Property costs", "Rent and land prices vary. A prestigious or central location may attract customers but cost more."],
      ["Competition", "Locating near competitors may attract customers to an area, but can also increase competition."],
      ["Government and regulation", "Planning rules, environmental requirements, tax arrangements and restrictions may influence the decision."],
      ["Online businesses", "May need less customer-facing retail space but still require suitable warehouses, delivery networks and digital infrastructure."],
      ["International location", "Businesses expanding abroad may consider market access, labour costs, political stability, logistics, regulations and exchange-rate risk."]
    ],
    example: "A distribution warehouse may locate near a major highway to speed up deliveries and reduce transport time.",
    examTip: "Prioritise location factors based on the type of business. Customer access may dominate for a shop, while transport and supplier access may matter more to a factory.",
    keywords: ["location", "customers", "labour", "suppliers", "transport", "infrastructure", "rent", "international location"],
    question: "Explain why a manufacturer might locate near its main suppliers.",
    answer: "Being near suppliers can reduce transport costs and delivery times. This may lower costs and reduce the risk that production stops because materials arrive late."
  }
]);

// Add a separate set of practice questions without replacing the first quiz.
window.BUSINESS_QUIZ = window.BUSINESS_QUIZ || [];

window.BUSINESS_QUIZ = window.BUSINESS_QUIZ.concat([
  {
    q: "Which is an internal source of finance?",
    options: ["Bank loan", "Retained profit", "Venture capital", "Crowdfunding"],
    answer: 1,
    explanation: "Retained profit is profit kept in the business instead of being distributed to owners."
  },
  {
    q: "A business has inflows of QAR 12,000 and outflows of QAR 9,500. What is net cash flow?",
    options: ["QAR 2,500", "QAR 9,500", "QAR 12,000", "QAR 21,500"],
    answer: 0,
    explanation: "Net cash flow = QAR 12,000 − QAR 9,500 = QAR 2,500."
  },
  {
    q: "What does a statement of comprehensive income show?",
    options: ["Only cash held today", "Financial performance over a period", "Only the number of employees", "The business's location"],
    answer: 1,
    explanation: "It shows revenue, cost of sales, gross profit, expenses and operating profit over a period."
  },
  {
    q: "A business has gross profit of QAR 18,000 and sales revenue of QAR 60,000. What is gross profit margin?",
    options: ["18%", "30%", "42%", "60%"],
    answer: 1,
    explanation: "Gross profit margin = 18,000 ÷ 60,000 × 100 = 30%."
  },
  {
    q: "Which method allows a business to gather detailed opinions from a small group?",
    options: ["Focus group", "Flow production", "Bank overdraft", "Stock control"],
    answer: 0,
    explanation: "Focus groups allow participants to discuss views and explain their preferences."
  },
  {
    q: "A business has sales of QAR 80,000 in a market worth QAR 400,000. What is its market share by value?",
    options: ["5%", "20%", "25%", "50%"],
    answer: 1,
    explanation: "Market share = 80,000 ÷ 400,000 × 100 = 20%."
  },
  {
    q: "Which promotion method is designed to provide a short-term incentive to buy?",
    options: ["Sales promotion", "Quality assurance", "Job production", "Retained profit"],
    answer: 0,
    explanation: "Discounts and coupons are examples of sales promotions."
  },
  {
    q: "Which production method is generally suited to large quantities of standardised products?",
    options: ["Job production", "Flow production", "One-off custom production", "Individual craft production only"],
    answer: 1,
    explanation: "Flow production can produce large quantities of standardised goods efficiently."
  },
  {
    q: "What is one possible disadvantage of just-in-time stock management?",
    options: ["It always requires more storage", "A delayed delivery may stop production", "It guarantees excess stock", "It removes the need for suppliers"],
    answer: 1,
    explanation: "With little stock held, the business may be unable to continue production if supplies are delayed."
  },
  {
    q: "What happens when diseconomies of scale occur?",
    options: ["Average costs rise as the business grows", "Average costs always fall", "Revenue must become zero", "The business stops employing workers"],
    answer: 0,
    explanation: "Diseconomies of scale occur when increasing size causes average costs to rise."
  }
]);
