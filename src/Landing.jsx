import React from 'react';

// Front page. Shown before the questions. Start buttons open the intake.
export default function Landing({ onStart, hasAnswers, onResume, region }) {
  const r = Array.isArray(region) ? region : [];
  const uk = r.length === 0 || r.includes('uk');
  const ng = r.length === 0 || r.includes('nigeria');
  const fws = [];
  if (uk) fws.push({ k: 'ukgdpr', n: 'UK GDPR', long: 'UK GDPR' });
  if (ng) fws.push({ k: 'ndpa', n: 'NDPA', long: 'the Nigeria Data Protection Act' });
  if (uk) fws.push({ k: 'ce', n: 'Cyber Essentials', long: 'Cyber Essentials' });
  fws.push({ k: 'iso27001', n: 'ISO 27001', long: 'ISO 27001' }, { k: 'iso42001', n: 'ISO 42001', long: 'ISO 42001' });
  const words = ['zero', 'one', 'two', 'three', 'four', 'five'];
  const n = fws.length + 0;
  const count = words[n];
  const names = fws.map((f) => f.long);
  const joined = names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  const Count = count.charAt(0).toUpperCase() + count.slice(1);

  const go = (id) => () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const startLabel = hasAnswers ? 'Start again' : 'Start the 14 questions →';

  const Cta = () => (
    <div className="cta">
      <button type="button" className="btn primary" onClick={onStart}>
        {startLabel}
      </button>
      {hasAnswers ? (
        <button type="button" className="btn" onClick={onResume}>
          Continue where I left off
        </button>
      ) : (
        <button type="button" className="btn" onClick={go('how')}>
          See how it works
        </button>
      )}
    </div>
  );

  return (
    <div className="lp">
      {/* Hero */}
      <section className="hero">
        <div className="lpw">
          <div>
            <p className="dictpill">
              <b>ÌLÀNÀ</b> <span className="mono">/ee-LAH-nah/</span> <em>noun, Yoruba</em> <span>A path; a way forward. Guidance.</span>
            </p>
            <h1>
              Do it once, <span>cover many.</span>
            </h1>
            <p className="ask">Where do I start with security, data protection and AI?</p>
            <p className="lede">
              {joined.charAt(0).toUpperCase() + joined.slice(1)} overlap heavily. Answer 14 plain questions and get one 90-day plan that shows which you need and which actions cover several at once.
            </p>
            <Cta />
            <ul className="proof">
              <li>Free</li>
              <li>No sign-up</li>
              <li>About 3 minutes</li>
              <li>Nothing leaves your browser</li>
            </ul>
          </div>

          <div className="mock" aria-label="Example of the plan">
            <div className="panel">
              <div className="panel-head">
                <h3>What applies to you</h3>
                <span>Example</span>
              </div>
              <div className="verdicts">
                {uk && (
                  <div className="v" style={{ '--c': 'var(--t-ukgdpr)' }}>
                    <small>UK law</small>
                    <b>UK GDPR</b>
                    <i>Required by law</i>
                  </div>
                )}
                {ng && (
                  <div className="v" style={{ '--c': 'var(--t-ndpa)' }}>
                    <small>Nigerian law</small>
                    <b>NDPA</b>
                    <i>Required by law</i>
                  </div>
                )}
                {uk && (
                  <div className="v" style={{ '--c': 'var(--t-ce)' }}>
                    <small>UK scheme</small>
                    <b>Cyber Essentials</b>
                    <i>Do now</i>
                  </div>
                )}
                <div className="v" style={{ '--c': 'var(--t-iso27001)' }}>
                  <small>Standard</small>
                  <b>ISO 27001</b>
                  <i>Plan next</i>
                </div>
              </div>
              <div className="actmock">
                <strong>Turn on multi-factor authentication</strong>
                <div className="tags">
                  <span className="tag basis" style={{ '--c': 'var(--t-ukgdpr)' }}>
                    Supports a legal duty
                  </span>
                  <span className="tag basis" style={{ '--c': 'var(--t-iso27001)' }}>
                    Contract, tender or audit
                  </span>
                  <span className="tag" style={{ '--c': 'var(--t-ukgdpr)' }}>
                    UK GDPR
                  </span>
                  <span className="tag" style={{ '--c': 'var(--t-ce)' }}>
                    Cyber Essentials
                  </span>
                  <span className="tag" style={{ '--c': 'var(--t-iso27001)' }}>
                    ISO 27001
                  </span>
                </div>
                <p>
                  <b>If you do not do it:</b> one stolen password can hand over email or cloud accounts.
                </p>
              </div>
              <div className="phasebar" aria-hidden="true">
                <div style={{ '--c': 'var(--gold)' }}>First 30 days</div>
                <div style={{ '--c': 'var(--wine-ink)' }}>Days 31 to 60</div>
                <div style={{ '--c': 'var(--line)' }}>Days 61 to 90</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <div className="fwstrip">
        <div className="lpw">
          <p>One plan covers</p>
          {fws.map((f) => (
            <span key={f.k} className="pill" style={{ '--c': 'var(--t-' + f.k + ')' }}>
              {f.n}
            </span>
          ))}
        </div>
      </div>

      {/* Overlap */}
      <section className="s">
        <div className="lpw overlap">
          <div className="head">
            <p className="eyebrow">The idea</p>
            <h2>{Count} mountains that are really one hill.</h2>
            <p>
              The frameworks look separate, but they overlap heavily. ÌLÀNÀ does not hand you {count} checklists. It gives you one list of actions and shows which frameworks each action supports, so work is never done twice.
            </p>
          </div>
          <div className="flow" aria-label="One action serving several frameworks">
            <div className="one">
              <small>One piece of work</small>
              Turn on multi-factor authentication
            </div>
            <div className="arrow" aria-hidden="true">
              ↓
            </div>
            {uk && (
              <div className="frow" style={{ '--c': 'var(--t-ukgdpr)' }}>
                <b>UK GDPR</b>
                <span>Security of processing (Art. 32)</span>
              </div>
            )}
            {ng && (
              <div className="frow" style={{ '--c': 'var(--t-ndpa)' }}>
                <b>NDPA</b>
                <span>Appropriate security measures</span>
              </div>
            )}
            {uk && (
              <div className="frow" style={{ '--c': 'var(--t-ce)' }}>
                <b>Cyber Essentials</b>
                <span>User access control</span>
              </div>
            )}
            <div className="frow" style={{ '--c': 'var(--t-iso27001)' }}>
              <b>ISO 27001</b>
              <span>A.8.5 Secure authentication</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="s alt" id="how">
        <div className="lpw">
          <div className="head">
            <p className="eyebrow">How it works</p>
            <h2>From “where do I start?” to a plan in three minutes.</h2>
          </div>
          <ol className="steps">
            <li>
              <h3>Answer 14 plain questions</h3>
              <p>How big you are, what data you hold, whether you use AI, who you sell to and where you operate. Nothing needs a glossary.</p>
            </li>
            <li>
              <h3>See what applies to you</h3>
              <p>Each framework gets a verdict and a one-line reason. It says “not yet” as often as “do now”.</p>
            </li>
            <li>
              <h3>Follow your 90-day plan</h3>
              <p>Actions in three phases, each marked as a legal requirement, a contract or audit expectation, or good practice, with what happens if you skip it.</p>
            </li>
            <li>
              <h3>Turn it into documents</h3>
              <p>Starter policies tailored to your answers: information security, AI use, and incident and breach response. Open them in Word.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* What you get */}
      <section className="s" id="get">
        <div className="lpw">
          <div className="head">
            <p className="eyebrow">What you get</p>
            <h2>Practical, not theoretical.</h2>
            <p>Everything is written for someone who has never read a standard, with the technical references tucked behind each action for people who want them.</p>
          </div>
          <div className="grid">
            <article className="card" style={{ '--c': 'var(--gold)' }}>
              <div className="ic">1</div>
              <h3>A clear verdict per framework</h3>
              <p>Required by law, do now, plan next, later or not needed, each with the reason.</p>
            </article>
            <article className="card" style={{ '--c': 'var(--t-ukgdpr)' }}>
              <div className="ic">2</div>
              <h3>Why each action matters</h3>
              <p>Legal, contractual or good practice, plus the consequence of leaving it undone.</p>
            </article>
            <article className="card" style={{ '--c': 'var(--t-ndpa)' }}>
              <div className="ic">3</div>
              <h3>UK and Nigeria</h3>
              <p>Choose either or both. The plan, documents and breach steps name the right regulator, the ICO or the NDPC.</p>
            </article>
            <article className="card" style={{ '--c': 'var(--t-iso27001)' }}>
              <div className="ic">4</div>
              <h3>Larger organisations too</h3>
              <p>With 500 or more staff, the plan checks what you already have instead of starting from scratch.</p>
            </article>
            <article className="card" style={{ '--c': 'var(--t-iso42001)' }}>
              <div className="ic">5</div>
              <h3>Starter policies</h3>
              <p>With “who this is for”, an asset inventory, review triggers and a calendar reminder you can download.</p>
            </article>
            <article className="card" style={{ '--c': 'var(--gold)' }}>
              <div className="ic">6</div>
              <h3>Tools to go deeper</h3>
              <p>Audit readiness check, Statement of Applicability builder, document checklist and AI vendor check.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="s alt" id="for">
        <div className="lpw">
          <div className="head">
            <p className="eyebrow">Who it is for</p>
            <h2>Built for people who have to figure it out.</h2>
          </div>
          <div className="aud">
            <div>
              <h3>Small business owners</h3>
              <p>A client sent a security questionnaire and nobody owns security. Start here and know what to do on Monday.</p>
            </div>
            <div>
              <h3>Larger organisations</h3>
              <p>You have policies and a team. Use it as a gap check against the frameworks, then go deeper with the tools.</p>
            </div>
            <div>
              <h3>Consultants and auditors</h3>
              <p>Hand it to a client who is just starting out, and challenge the verdicts where you disagree.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Honesty */}
      <section className="s">
        <div className="lpw honest">
          <div className="head">
            <p className="eyebrow">Straight talk</p>
            <h2>Honest about what it is.</h2>
            <p>A compliance tool that oversells itself is worse than none, so here are the limits up front.</p>
          </div>
          <ul>
            <li>
              <b>Guidance, not legal advice.</b>
              <span>It helps you decide where to start. Check current guidance from the ICO, the NCSC and the NDPC before you rely on it.</span>
            </li>
            <li>
              <b>Your answers stay with you.</b>
              <span>No sign-up and no backend. Everything is saved in your own browser and never sent anywhere.</span>
            </li>
            <li>
              <b>It does not replace an audit.</b>
              <span>The plan tells you where to look. It cannot tell you whether you would pass.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="s final">
        <div className="lpw">
          <div className="box">
            <p className="eyebrow">Ready?</p>
            <h2 style={{ marginTop: '0.8rem' }}>Find your path.</h2>
            <p>14 questions, about three minutes, and one plan you can start on today.</p>
            <Cta />
          </div>
        </div>
      </section>

      <p className="lpfine">
        Guidance to help you get started, not legal advice. Framework references are kept at topic level on purpose, so check the current official requirements before you certify. Not sure what a word means? See the <a href="/#terms">plain-English terms</a>.
      </p>
    </div>
  );
}
