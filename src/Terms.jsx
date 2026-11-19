import React, { useMemo, useState } from 'react';

// Plain-English definitions for people who are new to compliance.
// Guidance only. Legal references are kept at topic level.
export const TERMS = [
  ['Accountability', 'Being able to show, not just say, that you looked after personal data and security. Data protection law expects you to keep evidence of what you decided and why.'],
  ['Annex A', 'The list of 93 security controls at the back of ISO 27001. You decide which apply to you and record the reasons in your Statement of Applicability.'],
  ['Asset', 'Anything of value to your organisation that you need to protect: laptops, phones, software, cloud services and the information on them.'],
  ['Asset inventory', 'A list of your assets, who owns each one and what data it holds. Auditors usually ask to see it first.'],
  ['Audit', 'A structured check that you do what you say you do. An internal audit is done by your own people. An external audit is done by an independent body, for example to award a certificate.'],
  ['Auditor', 'A person who checks your evidence against a standard. They look for proof, not promises.'],
  ['Backup', 'A copy of your files kept somewhere else so you can recover after a loss or attack. A backup you have never tested is a hope, not a plan.'],
  ['Certification body', 'An independent organisation that audits you and issues a certificate, for example for ISO 27001 or Cyber Essentials.'],
  ['Controller', 'The organisation that decides why and how personal data is used. Most businesses are controllers of their staff and customer data.'],
  ['Cyber Essentials', 'A UK government-backed scheme that checks five technical basics: firewalls, secure settings, updates, user access and malware protection. Cyber Essentials Plus adds a hands-on technical test.'],
  ['Data Protection Impact Assessment (DPIA)', 'A written check, done before you start, of the risks to people from a new or high-risk use of personal data, and what you will do about them.'],
  ['Data Protection Officer (DPO)', 'A person responsible for advising on and monitoring data protection. Some organisations must appoint one, depending on size and what they do.'],
  ['Data subject', 'The person the personal data is about, such as a customer, an employee or a supplier’s contact.'],
  ['Evidence', 'Proof that something is true: a signed policy, a dated record, a screenshot of a setting, a log. If it is not written down or recorded, an auditor treats it as not done.'],
  ['Framework', 'A set of rules or good practice that you can follow and be checked against. This tool covers five: UK GDPR, the NDPA, Cyber Essentials, ISO 27001 and ISO 42001.'],
  ['Gap analysis', 'Comparing what you have today with what a standard or law requires, to see what is missing.'],
  ['ICO', 'The Information Commissioner’s Office. The UK regulator for data protection. It handles complaints, investigations and fines.'],
  ['Incident', 'Anything that threatens the security of your information or systems, including near misses. Not every incident is a breach.'],
  ['Information security management system (ISMS)', 'The set of policies, roles, risk checks and routines that an organisation uses to look after its information. ISO 27001 is the standard for one.'],
  ['ISO 27001', 'The international standard for managing information security. You can be audited against it and receive a certificate that clients recognise.'],
  ['ISO 42001', 'The international standard for managing artificial intelligence responsibly. It is newer than ISO 27001 and works in a similar way.'],
  ['Lawful basis', 'The legal reason that lets you use personal data, such as a contract, a legal duty, consent or a legitimate interest. You need one for each use and should record it.'],
  ['Multi-factor authentication (MFA)', 'Logging in with something more than a password, such as a code on your phone. It stops most account takeovers even if the password is stolen.'],
  ['NCSC', 'The National Cyber Security Centre. The UK authority that publishes practical security guidance and runs the Cyber Essentials scheme with its partners.'],
  ['NDPA', 'The Nigeria Data Protection Act 2023. Nigeria’s law on personal data.'],
  ['NDPC', 'The Nigeria Data Protection Commission. The regulator that enforces the NDPA.'],
  ['Nonconformity', 'An audit finding that you do not meet a requirement. A major nonconformity usually blocks certification until it is fixed.'],
  ['Patching', 'Installing updates that fix security flaws in software. Attackers often use flaws that already have a fix.'],
  ['Personal data', 'Anything that identifies a living person, alone or with other information: a name, an email address, an account number, a photo. Staff records count.'],
  ['Phishing', 'A message designed to trick someone into clicking a link, opening a file or giving away a password.'],
  ['Policy', 'A short statement of the rules people must follow. A procedure says how to do it step by step.'],
  ['Processor', 'An organisation that handles personal data on your behalf, such as a payroll provider or cloud service. You stay responsible for what it does with your data.'],
  ['Questionnaire (security)', 'A list of questions that a client or tender sends to check how you protect information. Reusable answers save a lot of time.'],
  ['Ransomware', 'Malware that locks or steals your files and demands payment. Good backups and updated software are the best defences.'],
  ['Records of processing', 'A register of what personal data you hold, why, who sees it and how long you keep it.'],
  ['Regulator', 'The public body that enforces a law. For data protection that is the ICO in the UK and the NDPC in Nigeria.'],
  ['Risk register', 'A list of the things that could go wrong, how likely and how serious each is, who owns it and what you are doing about it.'],
  ['Special category data', 'More sensitive personal data, such as health, ethnicity, religion, biometric data or trade union membership. It has stricter rules.'],
  ['Statement of Applicability (SoA)', 'A document for ISO 27001 that lists each Annex A control, whether it applies to you, why, and whether it is in place.'],
  ['Subject access request', 'When a person asks to see the personal data you hold about them. You normally have one month to respond.'],
  ['Supplier (third party)', 'Any outside organisation you rely on, such as a software provider, a payroll company or a contractor.'],
  ['Surveillance audit', 'A shorter audit each year after an ISO certificate is awarded, to check you are keeping up the standard.'],
  ['Tender', 'A formal bid for a contract, often for public sector work. Tenders frequently ask for security certificates and policies.'],
];

export default function Terms({ onBack }) {
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return TERMS.filter(([t, d]) => !n || t.toLowerCase().includes(n) || d.toLowerCase().includes(n));
  }, [q]);
  return (
    <section className="terms">
      <p className="kicker">Plain-English terms</p>
      <h1>What the words mean</h1>
      <p className="lede">
        New to security and data protection? These are the words you will meet in the plan and the documents, explained without jargon.
      </p>
      <label className="termsearch">
        Search the terms
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="For example MFA, DPIA or processor" />
      </label>
      <dl className="termlist">
        {list.map(([t, d]) => (
          <div key={t}>
            <dt>{t}</dt>
            <dd>{d}</dd>
          </div>
        ))}
      </dl>
      {list.length === 0 && <p className="note-line">No match. Try a shorter word.</p>}
      <p className="disclaimer" role="note">
        <strong>Guidance, not legal advice.</strong> These definitions are simplified to help you get started. Check current official guidance before you rely on them.
      </p>
      <div className="row">
        <button className="btn" onClick={onBack}>
          Back
        </button>
      </div>
    </section>
  );
}
