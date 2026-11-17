// Starter document builders. Each builder returns a document object:
// { title, meta: [[label, value]], todo: [string], sections: [{ title, why?, blocks }] }
// Block types: p, ul, ol, table. Square brackets mark text the user must fill in.
// Guidance only, not legal advice.

const P = (text) => ({ t: 'p', text });
const H = (text) => ({ t: 'h', text });
const UL = (items) => ({ t: 'ul', items });
const OL = (items) => ({ t: 'ol', items });
const T = (head, rows) => ({ t: 'table', head, rows });
const S = (title, blocks, why) => ({ title, blocks, why });

const has = (a, k, v) => (a[k] || []).includes(v);

export const DOC_LIST = [
  { id: 'isp', label: 'Information security policy', file: 'information-security-policy' },
  { id: 'ai', label: 'AI use policy', file: 'ai-use-policy' },
  { id: 'irp', label: 'Incident and breach plan', file: 'incident-and-breach-plan' },
];

const metaRows = (d) => [
  ['Document owner', d.ownerName + ', ' + d.ownerRole],
  ['Approved by', d.approver],
  ['Version', '1.0'],
  ['Date', d.dateStr],
  ['Next review', d.nextReview],
];

export function buildISP(a, d) {
  const byod = a.devices === 'yes';
  const cloud = a.cloud === 'yes';
  const suppliers = a.suppliers === 'yes' || cloud;
  const special = a.special === 'yes';
  const personal = a.data !== 'none';
  const usesAI = a.ai !== 'none';
  const wantsCE = a.certs === 'none' && (has(a, 'sells', 'public') || a.asked === 'yes');

  const sections = [
    S('Purpose', [
      P(
        `This policy sets out how ${d.biz} protects the information it holds and the systems it relies on. It exists so that everyone who works for us knows what is expected, so that customers and partners can trust us with their information, and so that we meet our legal duties, including under UK GDPR.`
      ),
    ]),
    S('Scope', [
      P(
        `This policy applies to everyone who works for ${d.biz}, including employees, directors, contractors and temporary staff. It covers all information we hold, in any form, and all devices, accounts, networks and online services used to work with it${
          byod ? ', including personal devices used for work' : ''
        }.`
      ),
    ]),
    S('Roles and responsibilities', [
      UL([
        `${d.ownerName} (${d.ownerRole}) is responsible for information security and data protection, and for keeping this policy up to date.`,
        'Directors approve this policy and make sure the time and money needed to follow it are available.',
        'Everyone is responsible for following this policy and for reporting any security concern straight away.',
      ]),
    ]),
    S('Accounts, passwords and access', [
      UL([
        'Every person has their own account. Accounts and passwords are never shared.',
        'Multi-factor authentication is turned on for email, cloud services and all administrator accounts.',
        'Passwords are long and unique, and are kept in an approved password manager. They are never written down or reused between systems.',
        'People receive only the access they need to do their job.',
        'Administrator accounts are used for administration only, not for everyday email or browsing.',
        'Administrator access is reviewed every three months, and all other access at least once a year.',
      ]),
    ]),
    S('Devices', [
      UL([
        'Every device used for work is kept up to date, has malware protection switched on, locks automatically after a short period of inactivity, and uses disk encryption where the device supports it.',
        'Default passwords are changed on all devices and equipment, and software and accounts that are no longer needed are removed.',
        'A lost or stolen device is reported immediately so that access can be removed.',
      ]),
    ]),
  ];

  if (byod) {
    sections.push(
      S(
        'Personal devices used for work',
        [
          P('Personal phones and laptops may be used for work only if they meet the device rules in this policy.'),
          UL([
            'Work information is accessed through approved apps or a work profile wherever possible.',
            'Client information is not stored on a personal device unless a director has approved it.',
            'We may remove work information and access from a personal device if it is lost, or when the person leaves.',
          ]),
        ],
        'staff use their own devices for work'
      )
    );
  }

  sections.push(
    S('Software updates', [
      P(
        'Operating systems, browsers, apps and firmware are set to update automatically wherever possible. Updates that fix critical or high-risk security flaws are installed within 14 days of release. Software that no longer receives security updates is replaced or removed.'
      ),
    ]),
    S('Network and firewall', [
      UL([
        'A firewall is switched on for our network and on every device.',
        'Default passwords on routers and network equipment are changed, and administration pages are not exposed to the internet.',
        'Office Wi-Fi uses strong encryption and a strong password, and guests use a separate network where possible.',
        'When working on public Wi-Fi, people use mobile data or a trusted VPN for anything confidential.',
      ]),
    ])
  );

  if (cloud) {
    sections.push(
      S(
        'Cloud services',
        [
          UL([
            'Only approved cloud services are used for business information.',
            'Each service is recorded in our asset list with a named owner.',
            'Sharing links are restricted to named people wherever possible.',
            'Administrator settings for each important service are reviewed at least twice a year.',
          ]),
        ],
        'you use cloud services'
      )
    );
  }

  const handling = [
    P('We use three simple levels so that people know how careful to be.'),
    T(
      ['Level', 'Meaning', 'Examples', 'Handling'],
      [
        ['Public', 'Meant for anyone to see', 'Website content, published marketing', 'No special handling'],
        ['Internal', 'For people working here only', 'Internal procedures, plans', 'Share only inside the business'],
        [
          'Confidential',
          'Would cause harm if disclosed',
          'Client information, personal data, contracts, financial records',
          'Limit access to those who need it and share only through approved services',
        ],
      ]
    ),
  ];
  if (personal) {
    handling.push(P('Personal data is handled in line with UK GDPR and our privacy information, and is kept only as long as we need it.'));
  }
  if (usesAI) {
    handling.push(P('Staff use of AI tools follows our AI Use Policy.'));
  }
  sections.push(S('Handling information', handling));

  if (special) {
    sections.push(
      S(
        'Sensitive information',
        [
          P(
            `We hold sensitive information, such as health information, data about children or biometric data. This is always treated as Confidential. Access is limited to named people, and any new use of it needs approval from ${d.ownerName} and, where required, a data protection impact assessment.`
          ),
        ],
        'you handle sensitive data'
      )
    );
  }

  sections.push(
    S('Backups', [
      UL([
        'Important information is backed up automatically to a separate location.',
        'At least one backup copy cannot be changed or deleted from our main network.',
        'We test restoring from backup at least twice a year and record the result.',
      ]),
    ])
  );

  if (suppliers) {
    sections.push(
      S(
        'Suppliers',
        [
          UL([
            'We keep a list of suppliers that handle our information or look after our systems.',
            'Suppliers that process personal data on our behalf sign a written data processing agreement.',
            'Before we start with an important supplier, and at least once a year after that, we check their security, for example through certificates or a short questionnaire.',
            'Suppliers are told how to report an incident to us.',
          ]),
        ],
        a.suppliers === 'yes' ? 'outside suppliers handle your data or systems' : 'you use cloud services'
      )
    );
  }

  sections.push(
    S('People joining, moving and leaving', [
      UL([
        'New starters receive their accounts, equipment, a copy of this policy and security training in their first week.',
        'When someone changes role, their access is reviewed.',
        'When someone leaves, their access is removed on their last day and all equipment is returned.',
      ]),
    ]),
    S('Training and awareness', [
      P(
        `Everyone receives security awareness training when they join and at least once a year. It covers spotting phishing, passwords, handling information safely${
          usesAI ? ', using AI tools safely' : ''
        } and how to report a problem. We keep a record of who has attended.`
      ),
    ]),
    S('Working away from the office', [
      UL([
        'Screens are locked when left unattended.',
        'Confidential information is not worked on where others can see the screen.',
        'Paper records containing confidential information are kept secure and shredded when no longer needed.',
        'Visitors to our premises are supervised.',
      ]),
    ]),
    S('Reporting problems', [
      P(
        `Anyone who suspects a security incident, a lost device or a mistake involving information must tell ${d.ownerName} straight away. Nobody will be blamed for reporting a concern in good faith. Our Incident and Data Breach Response Plan sets out what happens next.`
      ),
    ])
  );

  if (wantsCE) {
    sections.push(
      S(
        'Certification',
        [
          P(
            'We intend to obtain Cyber Essentials certification by [target date] and to renew it every 12 months. This policy is written to support those requirements.'
          ),
        ],
        'clients or tenders are asking for security assurance'
      )
    );
  }

  sections.push(
    S('Review and compliance', [
      P(
        `This policy is reviewed at least every ${d.months} months, and sooner if something significant changes, such as a new system, a serious incident or a change in the law. Failure to follow it may lead to disciplinary action. Questions go to ${d.ownerName}.`
      ),
    ])
  );

  return {
    title: 'Information Security Policy',
    meta: metaRows(d),
    todo: [
      'Fill in every highlighted [placeholder].',
      'Check each statement is true for your business today. A policy that promises multi-factor authentication or tested backups must match what you actually do. If something is not yet true, put it in your plan and adjust the wording until it is.',
      'Ask a director to approve it, then record the date and version.',
      'Tell all staff where to find it and keep a record that they have read it.',
    ],
    sections,
  };
}

export function buildAI(a, d) {
  const ai = a.ai;
  const special = a.special === 'yes';
  const asked = has(a, 'sells', 'business') || has(a, 'sells', 'public') || a.asked === 'yes';

  if (ai === 'none') {
    return {
      title: 'AI Use Policy',
      meta: metaRows(d),
      todo: [
        'Fill in every highlighted [placeholder].',
        'Review this policy when anyone proposes using an AI tool. Many everyday tools now include AI features that are switched on by default, so check your settings.',
        'Ask a director to approve it, then tell all staff.',
      ],
      sections: [
        S('Purpose', [
          P(
            `At the time of writing, ${d.biz} does not use AI tools for business work. This short policy sets the rule that applies until that changes.`
          ),
        ]),
        S('Rules', [
          UL([
            'Staff must not enter business, client or personal information into any AI tool, including free chatbots, unless it has been approved.',
            'AI features inside tools we already use, such as writing assistants or meeting summaries, count as AI tools and need approval before they are switched on.',
            `To request a tool, send ${d.ownerName} the name of the tool, what it is for and what information it would see. The request is assessed using our AI supplier checks before a decision is made.`,
          ]),
        ]),
        S('Review', [
          P(`This policy is reviewed at least every ${d.months} months, and whenever we decide to start using AI. Questions go to ${d.ownerName}.`),
        ]),
      ],
    };
  }

  const sections = [
    S('Purpose', [
      P(
        `This policy explains how ${d.biz} uses artificial intelligence safely. We want the benefits of AI tools while protecting our clients, our people and our reputation. A person remains responsible for everything that leaves the business, whether or not AI helped to produce it.`
      ),
    ]),
    S('Scope', [
      P(
        'This policy applies to everyone who works for us. It covers generative AI chatbots and assistants, AI features built into other software, browser extensions and plug-ins that use AI, and AI agents that can act on our behalf.'
      ),
    ]),
    S('Approved tools', [
      P(
        'Only tools on our AI tool register may be used for business work. The register records each tool, what it is used for, what information it may see and who approved it.'
      ),
      T(
        ['Tool', 'Used for', 'Information allowed', 'Approved by', 'Date'],
        [['[Tool name]', '[Purpose]', '[Public or internal only]', '[Name]', '[Date]']]
      ),
    ]),
    S('What must never be entered', [
      UL([
        'Client information, or anything covered by a contract or confidentiality agreement, unless the tool has been approved for that information.',
        'Personal data such as names, contact details or account details, unless the tool has been approved for it and a data processing agreement is in place.',
        ...(special
          ? ['Sensitive information we hold, such as health information or data about children. This is never entered into an AI tool without written approval from a director.']
          : []),
        'Passwords, access keys or security details.',
        'Source code, designs or financial information that is not public, unless the tool has been approved for it.',
      ]),
    ]),
    S('Using AI output responsibly', [
      UL([
        'Check AI output for accuracy before using it. AI can produce confident answers that are wrong.',
        'Look out for bias and unfair assumptions, especially in anything that affects people.',
        'Do not present AI output as expert advice without review by a suitably qualified person.',
        'Be careful with copyright and ownership. The rules on AI-generated material are still developing, so check before publishing it commercially.',
      ]),
    ]),
    S('Accounts and settings', [
      UL([
        'Use business accounts, not personal accounts, and turn on multi-factor authentication.',
        'Where the setting exists, turn off the option that lets the provider train its models on our information.',
        'Do not install unapproved plug-ins, extensions or agents, especially any that can read email or files.',
      ]),
    ]),
    S('Approving a new AI tool', [
      OL([
        'Describe the tool, what it is for and what information it would see.',
        'Check the provider: where information is stored, whether it is used for training, how long it is kept, the security certificates held and the contract terms. Our AI supplier checks help with this.',
        `${d.ownerName} decides, and the decision is recorded in the AI tool register.`,
        'Approved tools are reviewed at least once a year.',
      ]),
    ]),
  ];

  if (asked) {
    sections.push(
      S(
        'Telling clients',
        [
          P(
            'If a client contract or tender requires us to say when AI is used on their work, we do so. We answer client questions about our use of AI honestly, using this policy and our AI tool register as the source.'
          ),
        ],
        'you sell to businesses or the public sector, or clients ask for assurance'
      )
    );
  }

  if (ai === 'build') {
    const eu = a.region === 'ukeu';
    sections.push(
      S(
        'AI in the products and services we sell',
        [
          UL([
            'Before release, each AI feature has a written purpose, a named owner, and a risk and impact assessment covering errors, bias, misuse and leakage of information.',
            'Each feature is tested on realistic data before release and again after significant changes.',
            'We decide where a person can review, override or switch off the AI, and we build that in.',
            'Data used to train or test AI is used lawfully, is documented, and does not include information we have no right to use.',
            'Customers are told in plain language when they are dealing with AI and what its limits are.',
            'We monitor performance and complaints after release, and serious problems are handled as incidents.',
            'Where AI processes personal data in a way likely to be high risk, we complete a data protection impact assessment first. Where AI makes decisions with legal or similarly significant effects on people, we take advice on the UK GDPR rules on automated decisions.',
            ...(eu
              ? ['Because we operate in the EU, we check whether the EU AI Act applies to each AI system we place on the EU market or whose output is used there, and we record the result.']
              : []),
          ]),
        ],
        'you build or add AI into what you sell'
      )
    );
  }

  sections.push(
    S('If something goes wrong', [
      P(
        `If information is entered into an AI tool by mistake, or AI output causes harm or a complaint, tell ${d.ownerName} straight away. It is handled as an incident under our Incident and Data Breach Response Plan.`
      ),
    ]),
    S('Roles and review', [
      P(
        `${d.ownerName} (${d.ownerRole}) owns this policy and the AI tool register. The policy is reviewed at least every ${d.months} months, and sooner when we adopt a significant new tool or the law changes.`
      ),
    ])
  );

  return {
    title: 'AI Use Policy',
    meta: metaRows(d),
    todo: [
      'Fill in every highlighted [placeholder], and add each approved tool to the register table.',
      'Check the rules match how your team works. If people already use tools that are not on the register, decide whether to approve them or stop using them.',
      'Ask a director to approve it, then tell all staff and keep a record that they have read it.',
    ],
    sections,
  };
}

export function buildIRP(a, d) {
  const special = a.special === 'yes';
  const usesAI = a.ai !== 'none';
  const suppliers = a.suppliers === 'yes';
  const eu = a.region === 'ukeu';
  const public_ = has(a, 'sells', 'public');
  const personal = a.data !== 'none';

  const examples = [
    'A lost or stolen laptop, phone or storage device.',
    'An email containing personal or confidential information sent to the wrong person.',
    'A phishing email that someone clicked or replied to, or an account that may have been taken over.',
    'Malware or ransomware on a device or system.',
    'Someone accessing information they should not be able to see.',
    'A supplier telling us they have been breached.',
    ...(usesAI ? ['Confidential or personal information entered into an AI tool by mistake.'] : []),
    'A system failure that stops us working or makes information unavailable.',
  ];

  const notify = [
    `The ICO: if a breach of personal data is likely to result in a risk to people's rights and freedoms, we report it to the Information Commissioner's Office without undue delay and within 72 hours of becoming aware of it. Reports are made at ico.org.uk, or by calling the ICO helpline.`,
    'The people affected: if the breach is likely to result in a high risk to them, we tell them without undue delay, in clear language. We explain what happened, the likely consequences, what we have done and what they can do to protect themselves.',
    'If we decide not to report, we record the reasons.',
    'Our clients: where we handle personal data on behalf of a client, we tell them without undue delay and follow our contract with them. Contracts can set shorter deadlines, so we check each one.',
    ...(public_ ? ['Public sector contracts often require notice of a security incident within a set time. We check the contract straight away.'] : []),
    'Our insurer: if we have cyber insurance, we contact the insurer early, because policies often set conditions on notice. Insurer and policy number: [insurer and policy number].',
    'The police: serious cyber crime and fraud are reported to the police through the national reporting service.',
    ...(eu ? ['Because we operate in the EU, we may also have to notify an EU data protection authority. We take advice promptly.'] : []),
  ];

  const sections = [
    S('Purpose and scope', [
      P(
        `This plan sets out what ${d.biz} does when something goes wrong with information or systems. It applies to everyone who works for us. Its aim is to limit harm, meet our legal duties and learn from what happened.`
      ),
    ]),
    S('What counts as an incident', [
      P('An incident is anything that threatens the security of our information or systems, or that might have. This includes near misses. Examples:'),
      UL(examples),
    ]),
    S('Roles', [
      T(
        ['Role', 'Who', 'What they do'],
        [
          ['Incident lead', `${d.ownerName}`, 'Leads the response, makes decisions and keeps the record'],
          ['Deputy', '[Name]', 'Covers when the lead is not available'],
          ['Director', `${d.approver}`, 'Approves notifications to the ICO, clients and affected people'],
          ...(suppliers ? [['IT support', '[Supplier name and contact]', 'Helps with technical containment and recovery']] : []),
        ]
      ),
      P('Contact details for these people are kept in [location, for example a printed sheet and a shared contact list that does not depend on our systems].'),
    ]),
    S(
      'Response steps',
      [
        H('1. Report straight away'),
        UL([
          `Tell ${d.ownerName} by [phone number or messaging channel] as soon as you notice a problem. Do not wait to be sure.`,
          'Say what happened, when, and what information or systems are involved.',
          'Do not delete anything or try to fix it alone. Evidence matters.',
        ]),
        H('2. Contain'),
        UL([
          'Disconnect affected devices from the network, but do not switch them off unless told to.',
          'Change passwords and remove access for any affected account.',
          'Recall or block messages where possible, and ask recipients of wrongly sent information to delete it.',
        ]),
        H('3. Assess'),
        UL([
          'What information is involved, and does it include personal data?',
          'How many people could be affected, and who are they?',
          'Is any of it sensitive, such as health information or data about children?',
          'Could it cause harm, such as identity theft, financial loss, distress or discrimination?',
          'Was the information protected, for example by encryption, and is the problem still happening?',
        ]),
        H('4. Decide who must be told'),
        UL(notify),
        H('5. Recover'),
        UL([
          'Restore from backups where needed and check the restored systems before using them.',
          'Watch closely for repeat activity.',
          `${d.ownerName} confirms when normal working can resume.`,
        ]),
        H('6. Learn'),
        UL([
          'Hold a review within 14 days: what happened, why, and what worked and did not.',
          'Update policies, training and our risk register, and record each action with an owner and a date.',
        ]),
      ]
    ),
  ];

  if (personal) {
    sections.push(
      S('Timeline', [
        P('These are our own targets. The legal deadline for reporting a notifiable personal data breach to the ICO is 72 hours from becoming aware of it.'),
        T(
          ['When', 'What'],
          [
            ['Straight away', 'Report to the incident lead and start containing'],
            ['Within 24 hours', 'Assess the incident and decide whether the ICO must be told'],
            ['Within 72 hours', 'Report to the ICO if required, and tell affected people if the risk is high'],
            ['Within 14 days', 'Complete the review and agree actions'],
          ]
        ),
      ])
    );
  }

  if (special) {
    sections.push(
      S(
        'Sensitive information',
        [
          P(
            'An incident involving sensitive information, such as health information or data about children, is treated as high priority. We assume the risk to people is higher and tell the directors straight away.'
          ),
        ],
        'you handle sensitive data'
      )
    );
  }

  if (usesAI) {
    sections.push(
      S(
        'AI incidents',
        [
          P(
            'Entering confidential or personal information into an AI tool by mistake, or AI output that causes harm or a complaint, is an incident. Report it in the same way. We check what the tool provider keeps and whether the information can be deleted.'
          ),
        ],
        'you use AI'
      )
    );
  }

  sections.push(
    S('Keeping records', [
      P('We record every incident, including small ones and near misses, in an incident log kept by the incident lead.'),
      T(
        ['Field', 'Record'],
        [
          ['Date and time found', '[Date and time]'],
          ['Reported by', '[Name]'],
          ['What happened', '[Description]'],
          ['Information and systems involved', '[Details]'],
          ['Personal data involved?', '[Yes or no, and how many people]'],
          ['Action taken', '[Details]'],
          ['ICO told?', '[Yes or no, date and reference]'],
          ['Individuals told?', '[Yes or no, date]'],
          ['Lessons and actions', '[Details, owner and date]'],
          ['Closed', '[Date]'],
        ]
      ),
    ]),
    S('Practice and review', [
      P(
        `We practise this plan at least once a year with a short scenario exercise. The plan is reviewed at least every ${d.months} months and after every serious incident. Please check the current ICO reporting guidance at ico.org.uk when you review it.`
      ),
    ])
  );

  return {
    title: 'Incident and Data Breach Response Plan',
    meta: metaRows(d),
    todo: [
      'Fill in every highlighted [placeholder], especially the contact details and who covers for the incident lead.',
      'Check the current ICO reporting guidance and contact details at ico.org.uk before you adopt this plan.',
      'Check your client and public sector contracts for earlier notification deadlines than 72 hours.',
      'Ask a director to approve it, then make sure everyone knows how to report a problem. Keep a copy somewhere that does not depend on your own systems.',
    ],
    sections,
  };
}

export const BUILDERS = { isp: buildISP, ai: buildAI, irp: buildIRP };

// ----- rendering -----

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const hl = (s, word) => {
  const e = esc(s);
  return e.replace(/\[[^\]]+\]/g, (m) =>
    word ? `<span style="background:#FFF2A8">${m}</span>` : `<mark class="ph">${m}</mark>`
  );
};

export function renderBlocks(blocks, word) {
  return blocks
    .map((b) => {
      if (b.t === 'h') return `<h3>${esc(b.text)}</h3>`;
      if (b.t === 'p') return `<p>${hl(b.text, word)}</p>`;
      if (b.t === 'ul') return `<ul>${b.items.map((i) => `<li>${hl(i, word)}</li>`).join('')}</ul>`;
      if (b.t === 'ol') return `<ol>${b.items.map((i) => `<li>${hl(i, word)}</li>`).join('')}</ol>`;
      if (b.t === 'table') {
        return `<table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows
          .map((r) => `<tr>${r.map((c) => `<td>${hl(c, word)}</td>`).join('')}</tr>`)
          .join('')}</tbody></table>`;
      }
      return '';
    })
    .join('');
}

export function renderDoc(doc, word) {
  const meta = `<table class="meta"><tbody>${doc.meta
    .map(([k, v]) => `<tr><th>${esc(k)}</th><td>${hl(v, word)}</td></tr>`)
    .join('')}</tbody></table>`;
  const body = doc.sections
    .map((s, i) => {
      const why = !word && s.why ? `<p class="why-note">Included because ${esc(s.why)}</p>` : '';
      return `<h2>${i + 1}. ${esc(s.title)}</h2>${why}${renderBlocks(s.blocks, word)}`;
    })
    .join('');
  return `<h1>${esc(doc.title)}</h1>${meta}${body}`;
}

export function wordFile(doc) {
  const todo = `<table style="border:1px solid #999;background:#F2F2F2;margin-bottom:18pt"><tr><td style="padding:8pt"><p><b>Before you use this document (delete this box)</b></p><ul>${doc.todo
    .map((t) => `<li>${hl(t, true)}</li>`)
    .join('')}</ul><p>Guidance to help you get started, not legal advice.</p></td></tr></table>`;
  return (
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><meta charset="utf-8"><title>' +
    esc(doc.title) +
    '</title><style>' +
    'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.4}' +
    'h1{font-size:20pt;margin-bottom:8pt}h2{font-size:13pt;margin-top:16pt;margin-bottom:4pt}' +
    'table{border-collapse:collapse;margin:6pt 0}th,td{border:1px solid #999;padding:4pt 6pt;text-align:left;vertical-align:top;font-size:10pt}' +
    'th{background:#EAF0F6}table.meta th{white-space:nowrap;width:110pt}table.meta td{width:300pt}' +
    '</style></head><body>' +
    todo +
    renderDoc(doc, true) +
    '</body></html>'
  );
}

const textOfBlocks = (blocks) =>
  blocks
    .map((b) => {
      if (b.t === 'h') return b.text.toUpperCase();
      if (b.t === 'p') return b.text;
      if (b.t === 'ul') return b.items.map((i) => '- ' + i).join('\n');
      if (b.t === 'ol') return b.items.map((i, n) => n + 1 + '. ' + i).join('\n');
      if (b.t === 'table') return [b.head.join(' | '), ...b.rows.map((r) => r.join(' | '))].join('\n');
      return '';
    })
    .join('\n\n');

export function docText(doc) {
  const lines = [doc.title.toUpperCase(), '', ...doc.meta.map(([k, v]) => k + ': ' + v), ''];
  doc.sections.forEach((s, i) => {
    lines.push(i + 1 + '. ' + s.title.toUpperCase(), '', textOfBlocks(s.blocks), '');
  });
  return lines.join('\n');
}

export function placeholderCount(doc) {
  const m = docText(doc).match(/\[[^\]]+\]/g);
  return m ? m.length : 0;
}
