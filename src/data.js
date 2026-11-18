// Content for "Where do I start?". Guidance only, not legal advice.
// Framework mappings are kept at theme level on purpose.

export const FRAMEWORKS = [
  { id: 'ukgdpr', name: 'UK GDPR', short: 'UK GDPR', kind: 'The law on personal data' },
  { id: 'ce', name: 'Cyber Essentials', short: 'Cyber Essentials', kind: 'Government-backed security baseline' },
  { id: 'ndpa', name: 'Nigeria Data Protection Act', short: 'NDPA', kind: 'Nigerian law on personal data' },
  { id: 'iso27001', name: 'ISO 27001', short: 'ISO 27001', kind: 'International security management standard' },
  { id: 'iso42001', name: 'ISO 42001', short: 'ISO 42001', kind: 'International AI management standard' },
];

export const QUESTIONS = [
  {
    id: 'size',
    q: 'How many people work in your business?',
    help: 'Include staff, directors and regular contractors. Larger organisations get a plan that checks existing controls instead of building from scratch.',
    type: 'single',
    options: [
      { v: 's1', label: '1 to 5' },
      { v: 's2', label: '6 to 25' },
      { v: 's3', label: '26 to 100' },
      { v: 's4', label: '101 to 500' },
      { v: 's5', label: '501 to 2,000' },
      { v: 's6', label: 'More than 2,000' },
    ],
  },
  {
    id: 'data',
    q: 'What personal data and records do you hold?',
    help: 'Choose all that apply. Records about people count as personal data, including contacts at other organisations and at suppliers.',
    type: 'multi',
    exclusive: 'none',
    options: [
      { v: 'staff', label: 'Staff records' },
      { v: 'individuals', label: 'Customers, clients or members of the public (individuals)' },
      { v: 'orgs', label: 'Other organisations and their contacts' },
      { v: 'suppliers', label: 'Third-party suppliers and their contacts' },
      { v: 'none', label: 'None that I know of' },
    ],
  },
  {
    id: 'special',
    q: 'Do you handle sensitive data, such as health information, data about children, or biometrics?',
    help: 'This kind of data carries stricter rules and usually needs a closer look.',
    type: 'single',
    options: [
      { v: 'yes', label: 'Yes' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    id: 'ai',
    q: 'How does your business use AI?',
    help: 'For example ChatGPT, Copilot or an AI feature inside a tool you use.',
    type: 'single',
    options: [
      { v: 'none', label: 'We do not use AI' },
      { v: 'use', label: 'Staff use AI tools such as ChatGPT or Copilot' },
      { v: 'build', label: 'We build or add AI into a product or service we sell' },
    ],
  },
  {
    id: 'sells',
    q: 'Who do you sell to?',
    help: 'Choose all that apply.',
    type: 'multi',
    exclusive: 'none',
    options: [
      { v: 'consumers', label: 'Consumers' },
      { v: 'business', label: 'Other businesses' },
      { v: 'public', label: 'Public sector or government' },
      { v: 'none', label: 'We do not sell to anyone yet' },
    ],
  },
  {
    id: 'asked',
    q: 'Have clients or tenders asked you for a security certificate or questionnaire?',
    help: 'For example "do you have Cyber Essentials or ISO 27001?"',
    type: 'single',
    options: [
      { v: 'yes', label: 'Yes' },
      { v: 'no', label: 'No' },
      { v: 'unsure', label: 'Not sure' },
    ],
  },
  {
    id: 'devices',
    q: 'Do staff use their own phones or laptops for work?',
    help: 'Personal devices that open work email or files are in scope for most security schemes.',
    type: 'single',
    options: [
      { v: 'yes', label: 'Yes' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    id: 'cloud',
    q: 'Do you use cloud services such as Microsoft 365, Google Workspace or similar?',
    help: 'This includes cloud email, file storage and online business tools.',
    type: 'single',
    options: [
      { v: 'yes', label: 'Yes' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    id: 'suppliers',
    q: 'Do outside suppliers handle your data or look after your systems?',
    help: 'For example IT support, payroll, accountants, or software providers.',
    type: 'single',
    options: [
      { v: 'yes', label: 'Yes' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    id: 'owner',
    q: 'Does anyone own security and data protection in your business today?',
    help: 'Being responsible for it, even as part of another job.',
    type: 'single',
    options: [
      { v: 'none', label: 'Nobody in particular' },
      { v: 'part', label: 'Someone, as part of their job' },
      { v: 'ded', label: 'A person or team dedicated to it' },
    ],
  },
  {
    id: 'policies',
    q: 'Which policies do you already have in place?',
    help: 'Choose all that apply, or None. Those policies are marked in your plan for review instead of being treated as missing.',
    type: 'multi',
    exclusive: 'none',
    options: [
      { v: 'none', label: 'None of these' },
      { v: 'infosec', label: 'Information security policy for staff' },
      { v: 'acceptable', label: 'Acceptable use or corporate IT policy' },
      { v: 'privacy', label: 'Data protection and privacy policy' },
      { v: 'vendor', label: 'Third-party or vendor policy' },
      { v: 'incident', label: 'Incident and breach response plan' },
      { v: 'ai', label: 'AI use policy' },
    ],
  },
  {
    id: 'certs',
    q: 'Which certifications do you already hold?',
    help: 'Choose all that apply, or None.',
    type: 'multi',
    required: true,
    exclusive: 'none',
    options: [
      { v: 'none', label: 'None' },
      { v: 'ce', label: 'Cyber Essentials' },
      { v: 'cep', label: 'Cyber Essentials Plus' },
      { v: 'iso27001', label: 'ISO 27001' },
      { v: 'iso42001', label: 'ISO 42001' },
    ],
  },
  {
    id: 'region',
    q: 'Where do you operate?',
    help: 'Choose all that apply. This decides which laws and schemes appear in your plan.',
    type: 'multi',
    options: [
      { v: 'uk', label: 'United Kingdom' },
      { v: 'nigeria', label: 'Nigeria' },
      { v: 'eu', label: 'EU countries' },
      { v: 'other', label: 'Elsewhere' },
    ],
  },
  {
    id: 'goal',
    q: 'What is your main goal over the next 12 months?',
    help: 'Choose all that apply. This shapes the headline of your plan.',
    type: 'multi',
    required: true,
    options: [
      { v: 'clients', label: 'Win or keep bigger clients' },
      { v: 'tender', label: 'Qualify for tenders and public contracts' },
      { v: 'law', label: 'Make sure we meet our legal duties' },
      { v: 'tidy', label: 'Get organised and reduce risk' },
    ],
  },
];

const has = (a, k, v) => (Array.isArray(a[k]) ? a[k] : []).includes(v);

export const holdsPersonal = (a) => ['staff', 'individuals', 'orgs', 'suppliers'].some((v) => has(a, 'data', v));
export const holdsClientData = (a) => has(a, 'data', 'individuals') || has(a, 'data', 'orgs');

export function visibleFrameworks(a) {
  return FRAMEWORKS.filter((f) => {
    if (f.id === 'ukgdpr' || f.id === 'ce') return has(a, 'region', 'uk');
    if (f.id === 'ndpa') return has(a, 'region', 'nigeria');
    return true;
  });
}

export const isLarge = (a) => a.size === 's5' || a.size === 's6';
const midOrAbove = (a) => ['s3', 's4', 's5', 's6'].includes(a.size);

export function assessFrameworks(a) {
  const out = {};

  // UK GDPR
  if (holdsPersonal(a)) {
    const what = holdsClientData(a)
      ? 'You hold personal data about customers, clients or their organisations, so UK GDPR applies to you.'
      : 'You hold personal data about staff or suppliers, so UK GDPR applies to you.';
    out.ukgdpr = {
      tone: 'now',
      label: 'Required by law',
      why: what + (isLarge(a) ? ' At your scale, check whether you must appoint a Data Protection Officer (Art. 37) and keep full records of processing.' : ''),
    };
  } else {
    out.ukgdpr = {
      tone: 'now',
      label: 'Probably applies',
      why: 'Almost every business holds some personal data, even just staff records and customer emails. Check before assuming it does not apply.',
    };
  }

  // Nigeria Data Protection Act
  if (holdsPersonal(a)) {
    out.ndpa = {
      tone: 'now',
      label: 'Required by law',
      why:
        'You operate in Nigeria and hold personal data, so the NDPA applies to you.' +
        (isLarge(a)
          ? ' At your scale, check whether you count as a data controller or processor of major importance, which brings registration with the NDPC, a Data Protection Officer and annual compliance audit returns.'
          : ' Check the NDPC guidance on whether you must register as a data controller or processor of major importance.'),
    };
  } else {
    out.ndpa = {
      tone: 'now',
      label: 'Probably applies',
      why: 'Almost every organisation holds some personal data, even staff records and contacts. Check before assuming the NDPA does not apply.',
    };
  }

  // Cyber Essentials
  if (has(a, 'certs', 'ce') || has(a, 'certs', 'cep')) {
    out.ce = {
      tone: 'held',
      label: 'Already held',
      why: has(a, 'certs', 'cep')
        ? 'Keep it current. Cyber Essentials Plus needs renewing every 12 months.'
        : 'Keep it current. It needs renewing every 12 months, and Cyber Essentials Plus is the next level if clients ask for tested evidence.',
    };
  } else if (has(a, 'sells', 'public') || a.asked === 'yes') {
    out.ce = {
      tone: 'now',
      label: 'Do now',
      why: has(a, 'sells', 'public')
        ? 'It is often required for public sector contracts, and it is the quickest recognised certificate to win.'
        : 'Clients are asking for security assurance, and this is the quickest recognised certificate to win.',
    };
  } else if (isLarge(a) && !has(a, 'certs', 'iso27001')) {
    out.ce = {
      tone: 'later',
      label: 'Optional',
      why: 'At your size, ISO 27001 is the more usual route. Cyber Essentials is still worth holding if public sector or smaller customers ask for it.',
    };
  } else if (has(a, 'certs', 'iso27001')) {
    out.ce = {
      tone: 'later',
      label: 'Optional',
      why: 'ISO 27001 covers these controls, but some clients still ask for the Cyber Essentials certificate itself.',
    };
  } else if (holdsClientData(a) || a.cloud === 'yes') {
    out.ce = {
      tone: 'next',
      label: 'Smart first step',
      why: 'It covers the basics that stop most common attacks, and it gives clients something concrete to trust.',
    };
  } else {
    out.ce = { tone: 'later', label: 'Optional', why: 'Useful if clients start asking, and a good base for anything bigger.' };
  }

  // ISO 27001
  const sellsToBusiness = has(a, 'sells', 'business') || has(a, 'sells', 'public');
  if (has(a, 'certs', 'iso27001')) {
    out.iso27001 = { tone: 'held', label: 'Already held', why: 'Keep surveillance audits and your Statement of Applicability up to date.' };
  } else if (isLarge(a)) {
    out.iso27001 = {
      tone: 'next',
      label: 'Plan next',
      why: 'Larger customers and regulators often expect it at your size. If you already run an information security programme, use the readiness check and the SoA builder to test it against the standard.',
    };
  } else if ((a.asked === 'yes' && sellsToBusiness && midOrAbove(a)) || (a.asked === 'yes' && (has(a, 'certs', 'ce') || has(a, 'certs', 'cep')))) {
    out.iso27001 = {
      tone: 'next',
      label: 'Plan next',
      why: 'Larger clients are asking for assurance, and ISO 27001 is the standard they recognise. Do the basics first, then build up to it.',
    };
  } else {
    out.iso27001 = {
      tone: 'later',
      label: 'Later',
      why: 'It is a bigger commitment. Cyber Essentials and good data protection come first, and they are a head start on ISO 27001.',
    };
  }

  // ISO 42001
  if (has(a, 'certs', 'iso42001')) {
    out.iso42001 = { tone: 'held', label: 'Already held', why: 'Keep surveillance audits and your AI management system up to date.' };
  } else if (a.ai === 'build') {
    out.iso42001 = {
      tone: 'next',
      label: 'Worth planning',
      why:
        'You build or sell AI, so clients may start asking how you govern it.' +
        (has(a, 'region', 'eu') ? ' You operate in the EU, so check whether the EU AI Act applies to what you sell.' : ''),
    };
  } else if (a.ai === 'use' && isLarge(a)) {
    out.iso42001 = {
      tone: 'next',
      label: 'Worth planning',
      why: 'With AI used across a large workforce, a formal AI management system, a tool register and supplier checks become worthwhile.',
    };
  } else if (a.ai === 'use') {
    out.iso42001 = {
      tone: 'later',
      label: 'Not needed yet',
      why: 'A clear AI use policy and a list of approved tools cover most of what you need today.',
    };
  } else {
    out.iso42001 = { tone: 'none', label: 'Not needed', why: 'You do not use AI, so this can wait.' };
  }

  return out;
}

export const PHASES = [
  { id: 30, title: 'First 30 days', sub: 'Quick wins and foundations' },
  { id: 60, title: 'Days 31 to 60', sub: 'Build the habits' },
  { id: 90, title: 'Days 61 to 90', sub: 'Prove it and prepare' },
];

const always = () => true;

// fw: theme-level reference per framework. Empty string means no direct mapping.
export const ACTIONS = [
  {
    id: 'owner',
    basic: true,
    title: 'Name one person responsible for security and data protection',
    phase: 30,
    effort: 'Small',
    owner: 'Owner or director',
    why: 'Clients, auditors and the ICO all ask who is in charge. Without a named person, tasks slip.',
    how: [
      'Pick one person, even if it is only part of their job.',
      'Write their name and role into your security policy.',
      'Agree how often they report to the owner or directors.',
    ],
    evidence: 'A short note or policy section naming the role.',
    fw: {
      ndpa: 'Data processors and cross-border transfers',
      ndpa: 'Data Protection Officer and accountability',
      ukgdpr: 'Accountability (Art. 5(2) and Art. 24)',
      ce: '',
      iso27001: 'Clause 5.3 and Annex A 5.2',
      iso42001: 'AI roles and responsibilities (Annex A.3)',
    },
    when: always,
  },
  {
    id: 'policy',
    basic: true,
    covers: ['infosec', 'acceptable'],
    title: 'Write a short information security policy',
    phase: 30,
    effort: 'Small',
    owner: 'Security lead',
    why: 'A one or two page policy shows you have decided how to protect information, and gives staff clear rules.',
    how: [
      'Cover passwords and MFA, device use, handling client data, and reporting problems.',
      'Keep it short and in plain language so people read it.',
      'Have a director approve it and tell staff where to find it.',
    ],
    evidence: 'The approved policy with a date and version.',
    fw: {
      ndpa: 'Appropriate technical and organisational measures',
      ukgdpr: 'Appropriate measures (Art. 24 and Art. 32)',
      ce: '',
      iso27001: 'Clause 5.2 and Annex A 5.1',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'assets',
    basic: true,
    title: 'List your devices, systems and where your data lives',
    phase: 30,
    effort: 'Medium',
    owner: 'IT lead or owner',
    why: 'You cannot protect what you have not listed. This list also decides what is in scope for any certificate.',
    how: [
      'List laptops, phones, servers and network equipment.',
      'List the software and cloud services you use.',
      'Note which of them hold personal or client data.',
    ],
    evidence: 'A simple spreadsheet, reviewed at least once a year.',
    fw: {
      ndpa: 'Supports your records of processing',
      ukgdpr: 'Supports your records of processing (Art. 30)',
      ce: 'Scoping: every device and service in scope',
      iso27001: 'Annex A 5.9 Inventory of information and assets',
      iso42001: 'Resources for AI systems (Annex A.4)',
    },
    when: always,
  },
  {
    id: 'mfa',
    basic: true,
    title: 'Turn on multi-factor authentication for email and cloud services',
    phase: 30,
    effort: 'Small',
    owner: 'IT lead',
    why: 'Stolen passwords are one of the most common ways in. A second step stops most of those attacks.',
    how: [
      'Enable MFA for email, file storage and any admin account first.',
      'Use an authenticator app or security key where you can.',
      'Check that every user is enrolled, not just the admins.',
    ],
    evidence: 'Screenshot or report showing MFA enforced for all users.',
    fw: {
      ndpa: 'Security of personal data',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: 'User access control (MFA on cloud services)',
      iso27001: 'Annex A 8.5 Secure authentication',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'admin',
    basic: true,
    title: 'Limit admin rights and use separate admin accounts',
    phase: 30,
    effort: 'Small',
    owner: 'IT lead',
    why: 'If an everyday account has admin power, one bad click can give an attacker everything.',
    how: [
      'List who has admin rights and remove any that are not needed.',
      'Give admins a separate account for admin tasks only.',
      'Review the list every quarter.',
    ],
    evidence: 'List of admin accounts with the reason for each, dated.',
    fw: {
      ndpa: 'Security of personal data',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: 'User access control (admin accounts)',
      iso27001: 'Annex A 8.2 Privileged access rights and A.5.15 Access control',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'updates',
    basic: true,
    title: 'Switch on automatic updates and patch quickly',
    phase: 30,
    effort: 'Small',
    owner: 'IT lead',
    why: 'Attackers use known flaws that already have fixes. Updating closes them.',
    how: [
      'Turn on automatic updates for operating systems, browsers and apps.',
      'Install critical and high-risk security fixes within 14 days.',
      'Retire software that no longer receives updates.',
    ],
    evidence: 'Update settings screenshots or a patch report.',
    fw: {
      ndpa: 'Security of personal data',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: 'Security update management',
      iso27001: 'Annex A 8.8 Management of technical vulnerabilities',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'malware',
    basic: true,
    title: 'Make sure every device has malware protection',
    phase: 30,
    effort: 'Small',
    owner: 'IT lead',
    why: 'Malware protection catches many of the threats that arrive by email and downloads.',
    how: [
      'Confirm built-in or third-party anti-malware is on and updating.',
      'Check phones and tablets used for work as well as laptops.',
      'Keep a record of what protects each device type.',
    ],
    evidence: 'Screenshot or console report showing protection active.',
    fw: {
      ndpa: 'Security of personal data',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: 'Malware protection',
      iso27001: 'Annex A 8.7 Protection against malware',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'firewall',
    basic: true,
    title: 'Check your firewall and change default router passwords',
    phase: 30,
    effort: 'Small',
    owner: 'IT lead',
    why: 'A firewall controls what can reach your devices. Default passwords on routers are widely known.',
    how: [
      'Make sure the firewall is turned on, on routers and on devices.',
      'Change any default admin password on routers and network equipment.',
      'Do not expose admin pages to the internet.',
    ],
    evidence: 'Router or firewall settings screenshot and a note of the date checked.',
    fw: {
      ndpa: 'Security of personal data',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: 'Firewalls',
      iso27001: 'Annex A 8.20 Networks security',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'personaldata',
    title: 'Map the personal data you hold',
    phase: 30,
    effort: 'Medium',
    owner: 'Data protection lead',
    why: 'Knowing what personal data you hold, why, and who sees it is the starting point for UK GDPR.',
    how: [
      'List each type of personal data, such as customers, staff and enquiries.',
      'Note why you hold it, where it is kept, and who it is shared with.',
      'Note how long you keep it and when it is deleted.',
    ],
    evidence: 'A record of processing activities (a simple table is fine).',
    fw: {
      ndpa: 'Principles of processing and records',
      ukgdpr: 'Records of processing (Art. 30) and principles (Art. 5)',
      ce: '',
      iso27001: 'Annex A 5.34 Privacy and protection of PII and A.5.12 Classification',
      iso42001: 'Data for AI systems (Annex A.7)',
    },
    when: (a) => holdsPersonal(a),
  },
  {
    id: 'ndpcreg',
    title: 'Check whether you must register with the NDPC and file annual returns',
    phase: 30,
    effort: 'Small',
    owner: 'Data protection lead',
    why: 'Organisations that handle enough personal data, or work in certain sectors, can be classed as data controllers or processors of major importance. Those have extra duties such as registering with the Nigeria Data Protection Commission, appointing a Data Protection Officer and filing annual compliance audit returns.',
    how: [
      'Check the NDPC\u2019s current criteria for \u201cmajor importance\u201d against your own activities.',
      'If you qualify, register and keep the confirmation on file.',
      'Confirm a Data Protection Officer is named, and diarise the annual compliance audit return.',
    ],
    evidence: 'Registration confirmation, the Data Protection Officer appointment and the filed return.',
    fw: {
      ukgdpr: '',
      ce: '',
      ndpa: 'Registration, Data Protection Officer and compliance audit returns',
      iso27001: '',
      iso42001: '',
    },
    when: (a) => has(a, 'region', 'nigeria') && holdsPersonal(a),
  },
  {
    id: 'aipolicy',
    covers: ['ai'],
    title: 'Agree an AI use policy for staff',
    phase: 30,
    effort: 'Small',
    owner: 'Owner or security lead',
    why: 'Staff pasting client or personal data into public AI tools is a real risk. A clear rule prevents it.',
    how: [
      'List which AI tools are approved and which are not.',
      'Say what data must never be entered, such as client or personal data.',
      'Require a human to check AI output before it goes to a client.',
    ],
    evidence: 'The approved policy and a record that staff have read it.',
    fw: {
      ndpa: 'Security and processor duties',
      ukgdpr: 'Security and processors (Art. 5(1)(f) and Art. 28)',
      ce: '',
      iso27001: 'Annex A 5.10 Acceptable use of information and other assets',
      iso42001: 'AI policy (clause 5.2 and Annex A.2) and use of AI systems (Annex A.9)',
    },
    when: (a) => a.ai !== 'none',
  },
  {
    id: 'secureconfig',
    basic: true,
    title: 'Remove what you do not need and change default settings',
    phase: 60,
    effort: 'Medium',
    owner: 'IT lead',
    why: 'Unused software, old accounts and default settings are easy ways in.',
    how: [
      'Delete or disable unused accounts and software.',
      'Change default passwords and turn on screen locks.',
      'Turn on built-in disk encryption on laptops and phones.',
    ],
    evidence: 'A short build checklist per device type, with dates.',
    fw: {
      ndpa: 'Security of personal data',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: 'Secure configuration',
      iso27001: 'Annex A 8.9 Configuration management and A.8.1 User endpoint devices',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'jml',
    basic: true,
    title: 'Set up a process for people joining, moving and leaving',
    phase: 60,
    effort: 'Small',
    owner: 'HR or manager',
    why: 'Former staff keeping access is a common cause of incidents. A checklist closes that gap.',
    how: [
      'Create a joiner checklist: accounts, devices, training.',
      'Create a leaver checklist: remove access the same day, collect devices.',
      'Review access when someone changes role.',
    ],
    evidence: 'Completed checklists for recent joiners and leavers.',
    fw: {
      ndpa: 'Security of personal data',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: 'User access control (remove accounts no longer needed)',
      iso27001: 'Annex A 6.1 Screening, 5.18 Access rights and 6.5 After termination',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'byod',
    basic: true,
    title: 'Set rules for personal devices used for work',
    phase: 60,
    effort: 'Small',
    owner: 'IT lead',
    why: 'Personal phones and laptops that open work email or files count as part of your systems.',
    how: [
      'Require a screen lock, updates and malware protection on personal devices.',
      'Use work profiles or app protection where you can.',
      'Agree what happens to work data if a device is lost or someone leaves.',
    ],
    evidence: 'A short device policy and a list of devices that connect.',
    fw: {
      ndpa: 'Security of personal data',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: 'Scoping: personal devices used for work are in scope',
      iso27001: 'Annex A 8.1 User endpoint devices and A.6.7 Remote working',
      iso42001: '',
    },
    when: (a) => a.devices === 'yes',
  },
  {
    id: 'backups',
    basic: true,
    title: 'Set up backups and test that you can restore them',
    phase: 60,
    effort: 'Medium',
    owner: 'IT lead',
    why: 'Backups only help if they work. Testing a restore is the part most people skip.',
    how: [
      'Back up important data to a separate location.',
      'Keep at least one copy that an attacker on your network cannot change.',
      'Test a restore twice a year and record the result.',
    ],
    evidence: 'Backup schedule and a dated test restore result.',
    fw: {
      ndpa: 'Availability and security of personal data',
      ukgdpr: 'Availability and resilience (Art. 32(1))',
      ce: '',
      iso27001: 'Annex A 8.13 Information backup',
      iso42001: '',
    },
    when: always,
  },
  {
    id: 'training',
    basic: true,
    title: 'Run short security awareness training for all staff',
    phase: 60,
    effort: 'Small',
    owner: 'Security lead',
    why: 'Most attacks start with a person clicking something. A short, regular session helps.',
    how: [
      'Cover phishing, passwords, safe use of AI tools and how to report a problem.',
      'Run it at joining and then every year.',
      'Keep a list of who attended.',
    ],
    evidence: 'Training material and an attendance record.',
    fw: {
      ndpa: 'Staff awareness and accountability',
      ukgdpr: 'Security of processing (Art. 32)',
      ce: '',
      iso27001: 'Annex A 6.3 Awareness, education and training',
      iso42001: 'Competence and awareness (clauses 7.2 and 7.3)',
    },
    when: always,
  },
  {
    id: 'privacynotice',
    covers: ['privacy'],
    title: 'Publish a clear privacy notice',
    phase: 60,
    effort: 'Medium',
    owner: 'Data protection lead',
    why: 'People have a right to know what you do with their data. It must be easy to find and easy to read.',
    how: [
      'Say what you collect, why, the lawful basis, who you share it with and how long you keep it.',
      'Explain people’s rights and how to contact you.',
      'Link to it from your website and sign-up forms.',
    ],
    evidence: 'The published notice with a review date.',
    fw: {
      ndpa: 'Transparency and privacy information',
      ukgdpr: 'Transparency (Arts 13 and 14)',
      ce: '',
      iso27001: 'Annex A 5.34 Privacy and protection of PII',
      iso42001: '',
    },
    when: (a) => holdsClientData(a),
  },
  {
    id: 'rights',
    covers: ['privacy'],
    title: 'Record your lawful basis and plan for people’s data requests',
    phase: 60,
    effort: 'Medium',
    owner: 'Data protection lead',
    why: 'People can ask for a copy of their data or ask you to delete it. You normally have one month to respond.',
    how: [
      'Record the lawful basis for each type of data you hold.',
      'Decide who handles requests and how they are logged.',
      'Write a simple step list for finding, checking and sending data.',
    ],
    evidence: 'Lawful basis record and a request log.',
    fw: {
      ndpa: 'Lawful basis and rights of data subjects',
      ukgdpr: 'Lawful basis (Art. 6) and individual rights (Arts 15 to 22)',
      ce: '',
      iso27001: 'Annex A 5.34 Privacy and protection of PII',
      iso42001: '',
    },
    when: (a) => holdsPersonal(a),
  },
  {
    id: 'incident',
    covers: ['incident'],
    title: 'Write an incident and data breach plan',
    phase: 60,
    effort: 'Medium',
    owner: 'Security lead',
    why: 'When something goes wrong, a plan saves hours. Some breaches must be reported to the ICO within 72 hours.',
    how: [
      'Say who to tell, who decides, and how staff report a problem.',
      'Add a quick test for whether a breach must be reported to the ICO.',
      'Keep a log of every incident, including small ones.',
    ],
    evidence: 'The plan, an incident log, and notes from a practice run.',
    fw: {
      ndpa: 'Breach notification to the NDPC and affected people',
      ukgdpr: 'Breach reporting (Arts 33 and 34)',
      ce: '',
      iso27001: 'Annex A 5.24 to 5.28 Incident management',
      iso42001: 'Reporting and incident communication (Annex A.8)',
    },
    when: always,
  },
  {
    id: 'suppliers',
    covers: ['vendor'],
    title: 'List your suppliers and check the ones that handle your data',
    phase: 60,
    effort: 'Medium',
    owner: 'Owner or procurement',
    why: 'If a supplier is breached, your customers’ data may be affected, and you are still responsible.',
    how: [
      'List every supplier that touches your data or systems.',
      'Make sure there is a written data processing agreement with each one that handles personal data.',
      'Ask for their security certificates or answers to a short questionnaire.',
    ],
    evidence: 'Supplier list, signed agreements and the checks you made.',
    fw: {
      ukgdpr: 'Processors (Art. 28)',
      ce: 'Cloud services are in scope',
      iso27001: 'Annex A 5.19 to 5.22 Supplier relationships',
      iso42001: 'Third-party and customer relationships (Annex A.10)',
    },
    when: (a) => a.suppliers === 'yes' || a.cloud === 'yes' || has(a, 'data', 'suppliers'),
  },
  {
    id: 'aiinventory',
    title: 'Keep a list of AI tools in use and who approved them',
    phase: 60,
    effort: 'Small',
    owner: 'Security lead',
    why: 'Teams adopt AI tools quickly. A list shows what is used and that someone checked the risks.',
    how: [
      'Record each AI tool, who uses it and what data goes into it.',
      'Check each tool’s terms on data use and training.',
      'Use the AI Vendor Due Diligence Checker for tools that handle client data.',
    ],
    evidence: 'An AI tool register with approval dates.',
    fw: {
      ndpa: 'Supports your records of processing',
      ukgdpr: 'Supports records of processing (Art. 30)',
      ce: '',
      iso27001: 'Annex A 5.9 Inventory of information and assets',
      iso42001: 'Resources and use of AI systems (Annex A.4 and A.9)',
    },
    when: (a) => a.ai !== 'none',
  },
  {
    id: 'dpia',
    title: 'Carry out a data protection impact assessment',
    phase: 90,
    effort: 'Larger',
    owner: 'Data protection lead',
    why: 'Sensitive data, large-scale use or AI that affects people often needs a formal risk assessment before you start.',
    how: [
      'Describe what you plan to do with the data and why.',
      'Identify the risks to people and how you will reduce them.',
      'Record the outcome and review it when things change.',
    ],
    evidence: 'A completed assessment signed off by a director.',
    fw: {
      ndpa: 'Data privacy impact assessment',
      ukgdpr: 'Data protection impact assessment (Art. 35)',
      ce: '',
      iso27001: '',
      iso42001: 'AI system impact assessment (Annex A.5)',
    },
    when: (a) => a.special === 'yes' || a.ai === 'build',
  },
  {
    id: 'airisk',
    title: 'Assess the risks of the AI you build or sell',
    phase: 90,
    effort: 'Larger',
    owner: 'Product or technical lead',
    why: 'Clients and regulators increasingly ask how you test, monitor and control AI that affects people.',
    how: [
      'Describe each AI system, its purpose and who it affects.',
      'Record risks such as bias, errors, misuse and data leakage, with controls.',
      'Decide how you will monitor and review it after release.',
    ],
    evidence: 'An AI risk and impact assessment for each system.',
    fw: {
      ndpa: 'Automated decision-making and impact assessment',
      ukgdpr: 'Automated decisions (Art. 22) and impact assessment (Art. 35)',
      ce: '',
      iso27001: '',
      iso42001: 'Risk (clause 6.1), impact assessment (Annex A.5) and lifecycle (Annex A.6)',
    },
    when: (a) => a.ai === 'build',
  },
  {
    id: 'riskreg',
    title: 'Start a simple risk register',
    phase: 90,
    effort: 'Medium',
    owner: 'Security lead',
    why: 'A risk register shows you have thought about what could go wrong and what you are doing about it.',
    how: [
      'List your top 10 risks, such as phishing, lost devices and supplier failure.',
      'Score each by likelihood and impact.',
      'Record the action, the owner and a review date for each.',
    ],
    evidence: 'The register, reviewed at least twice a year.',
    fw: {
      ndpa: 'Risk-based security of personal data',
      ukgdpr: 'Risk-based security (Art. 32)',
      ce: '',
      iso27001: 'Clauses 6.1.2 and 8.2 Risk assessment',
      iso42001: 'Clause 6.1.2 AI risk assessment',
    },
    when: always,
  },
  {
    id: 'questionnaire',
    title: 'Prepare reusable answers for client security questionnaires',
    phase: 90,
    effort: 'Medium',
    owner: 'Security lead',
    why: 'Clients send long questionnaires. A bank of answers saves hours and keeps your replies consistent.',
    how: [
      'Collect the questions you have been asked so far.',
      'Write one accurate answer for each, with the policy or evidence behind it.',
      'Review the answers every six months.',
    ],
    evidence: 'An answer bank linked to your policies and evidence.',
    fw: {
      ukgdpr: 'Assurance for controllers (Art. 28)',
      ce: '',
      iso27001: 'Documented information (clause 7.5)',
      iso42001: '',
    },
    when: (a) => a.asked === 'yes' || has(a, 'sells', 'business') || has(a, 'sells', 'public'),
  },
  {
    id: 'cecert',
    title: 'Complete the Cyber Essentials self-assessment',
    phase: 90,
    effort: 'Medium',
    owner: 'IT lead',
    why: 'Once the technical basics are in place, the certificate gives clients a recognised proof of them.',
    how: [
      'Choose a certification body and check its current price for your size.',
      'Answer the questionnaire using the evidence you gathered in the first 60 days.',
      'Diarise renewal for 12 months later.',
    ],
    evidence: 'The certificate and the answers you submitted.',
    fw: {
      ukgdpr: '',
      ce: 'Certification',
      iso27001: '',
      iso42001: '',
    },
    when: (a) => has(a, 'region', 'uk') && !has(a, 'certs', 'ce') && !has(a, 'certs', 'cep'),
  },
  {
    id: 'review',
    title: 'Set review dates and check your readiness',
    phase: 90,
    effort: 'Small',
    owner: 'Security lead',
    why: 'Evidence goes stale. Review dates and a named reviewer are what turn good intentions into proof.',
    how: [
      'Put a review date and a named reviewer on every policy and register.',
      'Run the Audit Readiness Check and note your score.',
      'Repeat it every six months and track the trend.',
    ],
    evidence: 'Dated reviews and your readiness scores over time.',
    fw: {
      ndpa: 'Periodic review and compliance audit returns where required',
      ukgdpr: 'Reviewing measures (Art. 24)',
      ce: 'Annual renewal',
      iso27001: 'Clauses 7.5, 9.1 and 9.3',
      iso42001: 'Performance evaluation (clause 9)',
    },
    when: always,
  },
];

export function buildPlan(a) {
  return ACTIONS.filter((x) => x.when(a));
}

export const GOAL_LINES = {
  clients: 'Win or keep bigger clients',
  tender: 'Qualify for tenders and public contracts',
  law: 'Meet your legal duties',
  tidy: 'Get organised and reduce risk',
};
