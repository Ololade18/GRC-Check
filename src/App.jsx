import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FRAMEWORKS,
  QUESTIONS,
  PHASES,
  GOAL_LINES,
  assessFrameworks,
  buildPlan,
} from './data.js';
import Docs from './Docs.jsx';

const KEY = 'start-here-v1';
const THEME_KEY = 'grc-theme';

// Older saved answers stored certs and goal as a single value. Convert them to lists.
function migrate(a) {
  const out = { ...a };
  ['certs', 'goal'].forEach((k) => {
    if (typeof out[k] === 'string') out[k] = [out[k] === 'iso' ? 'iso27001' : out[k]];
  });
  return out;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && typeof s === 'object') {
        return { a: migrate(s.a || {}), d: s.d || {}, step: s.step || 'intro', qi: s.qi || 0 };
      }
    }
  } catch (e) {
    /* storage unavailable */
  }
  return { a: {}, d: {}, step: 'intro', qi: 0 };
}

function save(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch (e) {
    /* ignore */
  }
}

const systemTheme = () => {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch (e) {
    return 'dark';
  }
};

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || systemTheme());
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* ignore */
    }
    setTheme(next);
  };
  return [theme, toggle];
}

const safe = (v) => {
  const s = String(v == null ? '' : v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
};

const csvCell = (v) => '"' + safe(v).replace(/"/g, '""') + '"';

function Nav({ theme, onTheme, page }) {
  const links = [
    ['/readiness-check', 'Readiness check'],
    ['/soa-builder', 'SoA builder'],
    ['/documents', 'Document checklist'],
    ['/ai-vendor', 'AI vendor check'],
  ];
  return (
    <nav className="nav" aria-label="ÌLÀNÀ tools">
      <span className="lbl">ÌLÀNÀ</span>
      <a href="/" aria-current={page === 'start' ? 'page' : undefined}>
        Start here
      </a>
      <a href="/#policies" aria-current={page === 'docs' ? 'page' : undefined}>
        Policy generator
      </a>
      {links.map(([h, t]) => (
        <a key={h} href={h}>
          {t}
        </a>
      ))}
      <button type="button" className="tt" onClick={onTheme} aria-label={'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme'}>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>
    </nav>
  );
}

function Intro({ onStart, hasAnswers, onResume }) {
  return (
    <section className="intro">
      <div className="dict">
        <p className="dict-head">
          <span className="word">ÌLÀNÀ</span> <span className="pron">/ee-LAH-nah/</span> <span className="pos">noun, Yoruba</span>
        </p>
        <ol className="dict-defs">
          <li>A path; a way forward.</li>
          <li>Guidance; direction.</li>
        </ol>
        <p className="dict-use">
          <em>In use:</em> &ldquo;Her business found its ÌLÀNÀ: one plan, four frameworks.&rdquo;
        </p>
      </div>
      <h1>Do it once, cover many.</h1>
      <p className="sub">Where do I start with security, data protection and AI?</p>
      <p className="lede">
        UK GDPR, Cyber Essentials, ISO 27001 and AI governance sound like four separate mountains. They overlap heavily.
        Answer 13 plain questions and get one 90-day plan that shows which of them you need, and which actions cover
        several at once.
      </p>
      <ul className="points">
        <li>No jargon, no sign-up, and nothing leaves your browser.</li>
        <li>Takes about three minutes.</li>
        <li>Guidance to get you moving, not legal advice.</li>
      </ul>
      <div className="row">
        <button className="btn primary" onClick={onStart}>
          {hasAnswers ? 'Start again' : 'Start'}
        </button>
        {hasAnswers && (
          <button className="btn" onClick={onResume}>
            Continue where I left off
          </button>
        )}
      </div>
      <section className="aims" aria-labelledby="aims-h">
        <h2 id="aims-h">What ÌLÀNÀ aims to do</h2>
        <ul>
          <li>
            <strong>Make it understandable.</strong> Plain English for people who have never read a standard.
          </li>
          <li>
            <strong>Show the overlap.</strong> One plan that covers UK GDPR, Cyber Essentials, ISO 27001 and AI governance together, so work is never done twice.
          </li>
          <li>
            <strong>Keep your information yours.</strong> No sign-up, and nothing you enter leaves your browser.
          </li>
          <li>
            <strong>Be honest.</strong> Say what can wait, and be clear that this is guidance, not legal advice.
          </li>
        </ul>
      </section>
    </section>
  );
}

function Intake({ state, setState, onDone }) {
  const q = QUESTIONS[state.qi];
  const val = state.a[q.id];
  const answered = q.type === 'multi' ? !q.required || (val || []).length > 0 : Boolean(val);
  const total = QUESTIONS.length;
  const headRef = useRef(null);

  useEffect(() => {
    if (headRef.current) headRef.current.focus();
  }, [state.qi]);

  const choose = (v) => {
    setState((s) => {
      let next;
      if (q.type === 'multi') {
        const cur = s.a[q.id] || [];
        if (cur.includes(v)) next = cur.filter((x) => x !== v);
        else if (q.exclusive && v === q.exclusive) next = [v];
        else next = [...cur.filter((x) => x !== q.exclusive), v];
      } else {
        next = v;
      }
      return { ...s, a: { ...s.a, [q.id]: next } };
    });
  };

  const isOn = (v) => (q.type === 'multi' ? (val || []).includes(v) : val === v);

  return (
    <section className="intake" aria-labelledby="q-title">
      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={state.qi + 1}>
        <div className="progress-fill" style={{ width: ((state.qi + 1) / total) * 100 + '%' }} />
      </div>
      <p className="kicker">
        Question {state.qi + 1} of {total}
      </p>
      <h2 id="q-title" tabIndex={-1} ref={headRef}>
        {q.q}
      </h2>
      <p className="help">{q.help}</p>
      <div className="opts" role={q.type === 'multi' ? 'group' : 'radiogroup'} aria-labelledby="q-title">
        {q.options.map((o) => (
          <button
            key={o.v}
            type="button"
            className={'opt' + (isOn(o.v) ? ' on' : '')}
            role={q.type === 'multi' ? 'checkbox' : 'radio'}
            aria-checked={isOn(o.v)}
            onClick={() => choose(o.v)}
          >
            <span className="mark" aria-hidden="true" />
            {o.label}
          </button>
        ))}
      </div>
      <div className="row">
        <button
          className="btn"
          onClick={() => (state.qi === 0 ? setState((s) => ({ ...s, step: 'intro' })) : setState((s) => ({ ...s, qi: s.qi - 1 })))}
        >
          Back
        </button>
        <button
          className="btn primary"
          disabled={!answered}
          onClick={() => (state.qi === total - 1 ? onDone() : setState((s) => ({ ...s, qi: s.qi + 1 })))}
        >
          {state.qi === total - 1 ? 'See my plan' : 'Next'}
        </button>
      </div>
    </section>
  );
}

function FwTag({ id }) {
  const f = FRAMEWORKS.find((x) => x.id === id);
  return <span className={'tag t-' + id}>{f.short}</span>;
}

function ActionItem({ item, done, onToggle }) {
  const mapped = FRAMEWORKS.filter((f) => item.fw[f.id]);
  return (
    <li className={'act' + (done ? ' done' : '')}>
      <div className="act-top">
        <input
          type="checkbox"
          id={'c-' + item.id}
          checked={done}
          onChange={onToggle}
          aria-label={'Mark done: ' + item.title}
        />
        <details>
          <summary>
            <span className="act-title">{item.title}</span>
            <span className="meta">
              <span className="chip">{item.effort}</span>
              <span className="chip">{item.owner}</span>
              {mapped.map((f) => (
                <FwTag key={f.id} id={f.id} />
              ))}
            </span>
          </summary>
          <div className="act-body">
            <p>{item.why}</p>
            <h4>How to do it</h4>
            <ol>
              {item.how.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
            <h4>Evidence to keep</h4>
            <p>{item.evidence}</p>
            <h4>Where this fits</h4>
            <dl className="refs">
              {mapped.map((f) => (
                <React.Fragment key={f.id}>
                  <dt>{f.short}</dt>
                  <dd>{item.fw[f.id]}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </details>
      </div>
    </li>
  );
}

function Plan({ state, setState, onEdit }) {
  const [filter, setFilter] = useState('all');
  const [armed, setArmed] = useState(false);
  const [note, setNote] = useState('');
  const [fallback, setFallback] = useState('');
  const a = state.a;
  const fw = useMemo(() => assessFrameworks(a), [a]);
  const plan = useMemo(() => buildPlan(a), [a]);
  const doneCount = plan.filter((x) => state.d[x.id]).length;
  const pct = plan.length ? Math.round((doneCount / plan.length) * 100) : 0;
  const nowList = FRAMEWORKS.filter((f) => fw[f.id].tone === 'now').map((f) => f.short);
  const goals = (Array.isArray(a.goal) ? a.goal : []).map((g) => GOAL_LINES[g]).filter(Boolean);
  const goalText = goals.length ? goals.map((g, i) => (i === 0 ? g : g.charAt(0).toLowerCase() + g.slice(1))).join('; ') : 'Get organised';
  const overlap = plan.filter((x) => FRAMEWORKS.filter((f) => x.fw[f.id]).length >= 2).length;

  const shown = filter === 'all' ? plan : plan.filter((x) => x.fw[filter]);

  const toggle = (id) => setState((s) => ({ ...s, d: { ...s.d, [id]: !s.d[id] } }));

  const planText = () => {
    const lines = ['My 90-day plan', ''];
    PHASES.forEach((p) => {
      lines.push(p.title.toUpperCase());
      plan
        .filter((x) => x.phase === p.id)
        .forEach((x) => lines.push((state.d[x.id] ? '[x] ' : '[ ] ') + x.title + ' (' + x.owner + ', ' + x.effort.toLowerCase() + ')'));
      lines.push('');
    });
    lines.push('Guidance only, not legal advice.');
    return lines.join('\n');
  };

  const csv = () => {
    const head = ['Phase', 'Action', 'Effort', 'Suggested owner', 'Done', 'Evidence to keep', 'UK GDPR', 'Cyber Essentials', 'ISO 27001', 'ISO 42001'];
    const rows = plan.map((x) =>
      [
        PHASES.find((p) => p.id === x.phase).title,
        x.title,
        x.effort,
        x.owner,
        state.d[x.id] ? 'Yes' : 'No',
        x.evidence,
        x.fw.ukgdpr,
        x.fw.ce,
        x.fw.iso27001,
        x.fw.iso42001,
      ]
        .map(csvCell)
        .join(',')
    );
    return '﻿' + [head.map(csvCell).join(','), ...rows].join('\r\n');
  };

  const download = () => {
    try {
      const blob = new Blob([csv()], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const el = document.createElement('a');
      el.href = url;
      el.download = 'my-90-day-plan.csv';
      document.body.appendChild(el);
      el.click();
      el.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNote('CSV downloaded.');
    } catch (e) {
      setFallback(csv());
      setNote('Download was blocked. Copy the text below instead.');
    }
  };

  const copy = async () => {
    const text = planText();
    try {
      await navigator.clipboard.writeText(text);
      setNote('Plan copied.');
      setFallback('');
    } catch (e) {
      setFallback(text);
      setNote('Copy was blocked. Select the text below and copy it.');
    }
  };

  const reset = () => {
    if (!armed) {
      setArmed(true);
      setTimeout(() => setArmed(false), 4000);
      return;
    }
    setState({ a: {}, d: {}, step: 'intro', qi: 0 });
  };

  return (
    <div className="plan">
      <header className="head">
        <p className="kicker">Your plan</p>
        <h1>
          {nowList.length
            ? 'Start with ' + nowList.join(' and ') + '.'
            : 'You are in good shape. Keep it current.'}
        </h1>
        <p className="lede">
          {goals.length > 1 ? 'Your priorities: ' : 'Your priority: '}<strong>{goalText}</strong>. Below is what applies to you, then one
          sequenced plan. {overlap} of your {plan.length} actions help with two or more frameworks at once.
        </p>
      </header>

      <section aria-labelledby="fw-h">
        <h2 id="fw-h">What applies to you</h2>
        <div className="fws">
          {FRAMEWORKS.map((f) => (
            <article key={f.id} className={'fw tone-' + fw[f.id].tone}>
              <p className="fw-kind">{f.kind}</p>
              <h3>{f.name}</h3>
              <p className="verdict">{fw[f.id].label}</p>
              <p className="why">{fw[f.id].why}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="plan-h">
        <div className="sumrow">
          <h2 id="plan-h">Your 90-day plan</h2>
          <div className="meter-wrap" aria-label={doneCount + ' of ' + plan.length + ' actions done'}>
            <div className="meter">
              <div style={{ width: pct + '%' }} />
            </div>
            <span className="count">
              {doneCount} of {plan.length} done
            </span>
          </div>
        </div>

        <div className="filters" role="group" aria-label="Filter by framework">
          <button className={'fchip' + (filter === 'all' ? ' on' : '')} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            All actions
          </button>
          {FRAMEWORKS.map((f) => (
            <button
              key={f.id}
              className={'fchip' + (filter === f.id ? ' on' : '')}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.short}
            </button>
          ))}
        </div>

        {PHASES.map((p) => {
          const items = shown.filter((x) => x.phase === p.id);
          if (!items.length) return null;
          return (
            <div key={p.id} className="phase">
              <h3>
                {p.title} <span className="sub">{p.sub}</span>
              </h3>
              <ul className="acts">
                {items.map((x) => (
                  <ActionItem key={x.id} item={x} done={Boolean(state.d[x.id])} onToggle={() => toggle(x.id)} />
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section aria-labelledby="gen-h" className="gen">
        <h2 id="gen-h">Turn the plan into documents</h2>
        <p className="lede">
          Generate a starter information security policy, AI use policy and incident plan, tailored to your answers.
        </p>
        <div className="row">
          <a className="btn primary linkbtn" href="/#policies">
            Generate starter documents
          </a>
        </div>
      </section>

      <section aria-labelledby="next-h" className="next">
        <h2 id="next-h">Go deeper with the other tools</h2>
        <div className="tools">
          <a href="/readiness-check">
            <strong>Readiness check</strong>
            <span>Score yourself against 47 ISO 27001 requirements.</span>
          </a>
          <a href="/soa-builder">
            <strong>SoA builder</strong>
            <span>Build your Statement of Applicability for all 93 controls.</span>
          </a>
          <a href="/documents">
            <strong>Document checklist</strong>
            <span>Track the documents auditors expect to see.</span>
          </a>
          <a href="/ai-vendor">
            <strong>AI vendor check</strong>
            <span>Check an AI supplier before you rely on it.</span>
          </a>
        </div>
      </section>

      <section className="toolbar" aria-label="Save and share">
        <button className="btn" onClick={copy}>
          Copy plan as text
        </button>
        <button className="btn" onClick={download}>
          Download CSV
        </button>
        <button className="btn" onClick={onEdit}>
          Edit my answers
        </button>
        <button className={'btn' + (armed ? ' danger' : '')} onClick={reset}>
          {armed ? 'Click again to clear everything' : 'Start over'}
        </button>
        <p className="note" role="status">
          {note}
        </p>
        {fallback && <textarea className="fallback" readOnly value={fallback} rows={8} onFocus={(e) => e.target.select()} />}
      </section>

      <p className="foot">
        Guidance to help you get started, not legal advice. Framework references are kept at topic level on purpose, so
        check the current official requirements before you certify. Your answers and progress stay in this browser and are
        never sent anywhere.
      </p>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState(load);
  const [theme, toggleTheme] = useTheme();
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const h = () => setHash(window.location.hash);
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  useEffect(() => {
    save(state);
  }, [state]);

  const hasAnswers = Object.keys(state.a).length > 0;
  const complete = QUESTIONS.every((q) => {
    const v = state.a[q.id];
    if (q.type === 'multi') return Array.isArray(v) && (!q.required || v.length > 0);
    return Boolean(v);
  });

  const docsView = hash === '#policies';
  const leaveDocs = () => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setHash('');
  };

  let view;
  if (docsView) {
    view = (
      <Docs
        answers={state.a}
        complete={complete}
        onBack={leaveDocs}
        onIntake={() => {
          leaveDocs();
          setState((s) => ({ ...s, step: 'intake', qi: 0 }));
        }}
      />
    );
  } else if (state.step === 'plan' && complete) {
    view = <Plan state={state} setState={setState} onEdit={() => setState((s) => ({ ...s, step: 'intake', qi: 0 }))} />;
  } else if (state.step === 'intake') {
    view = <Intake state={state} setState={setState} onDone={() => setState((s) => ({ ...s, step: 'plan' }))} />;
  } else {
    view = (
      <Intro
        hasAnswers={hasAnswers}
        onStart={() => setState({ a: {}, d: {}, step: 'intake', qi: 0 })}
        onResume={() => setState((s) => ({ ...s, step: complete ? 'plan' : 'intake' }))}
      />
    );
  }

  return (
    <div className="wrap">
      <Nav theme={theme} onTheme={toggleTheme} page={docsView ? 'docs' : 'start'} />
      <main>{view}</main>
    </div>
  );
}
