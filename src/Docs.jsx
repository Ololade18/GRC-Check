import React, { useEffect, useMemo, useState } from 'react';
import { BUILDERS, DOC_LIST, renderDoc, wordFile, docText, placeholderCount } from './docs.js';

const KEY = 'start-here-docs-v1';

const today = () => new Date().toISOString().slice(0, 10);

const fmt = (iso) => {
  const d = new Date(iso + 'T12:00:00');
  if (isNaN(d)) return '[Date]';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const addMonths = (iso, m) => {
  const d = new Date(iso + 'T12:00:00');
  if (isNaN(d)) return '[Date]';
  d.setMonth(d.getMonth() + Number(m));
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

function load() {
  const base = { biz: '', ownerName: '', ownerRole: '', approver: '', date: today(), months: '12', doc: 'isp' };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...base, ...JSON.parse(raw) };
  } catch (e) {
    /* ignore */
  }
  return base;
}

const slug = (s) =>
  String(s || 'my-business')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'my-business';

export default function Docs({ answers, complete, onBack, onIntake }) {
  const [f, setF] = useState(load);
  const [note, setNote] = useState('');
  const [fallback, setFallback] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(f));
    } catch (e) {
      /* ignore */
    }
  }, [f]);

  const details = useMemo(
    () => ({
      biz: f.biz.trim() || '[Business name]',
      ownerName: f.ownerName.trim() || '[Name]',
      ownerRole: f.ownerRole.trim() || '[Role]',
      approver: f.approver.trim() || '[Approver name]',
      dateStr: fmt(f.date),
      nextReview: addMonths(f.date, f.months),
      months: f.months,
    }),
    [f]
  );

  const doc = useMemo(() => (complete ? BUILDERS[f.doc](answers, details) : null), [complete, answers, details, f.doc]);
  const html = useMemo(() => (doc ? renderDoc(doc, false) : ''), [doc]);
  const left = doc ? placeholderCount(doc) : 0;
  const meta = DOC_LIST.find((d) => d.id === f.doc);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const copy = async () => {
    const text = docText(doc);
    try {
      await navigator.clipboard.writeText(text);
      setNote('Copied as plain text.');
      setFallback('');
    } catch (e) {
      setFallback(text);
      setNote('Copy was blocked. Select the text below and copy it.');
    }
  };

  const download = () => {
    try {
      const blob = new Blob(['﻿', wordFile(doc)], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const el = document.createElement('a');
      el.href = url;
      el.download = slug(f.biz) + '-' + meta.file + '.doc';
      document.body.appendChild(el);
      el.click();
      el.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNote('Downloaded. Open it in Word or Google Docs and fill in the highlighted gaps.');
    } catch (e) {
      setFallback(docText(doc));
      setNote('Download was blocked. Copy the text below instead.');
    }
  };

  if (!complete) {
    return (
      <section className="intro">
        <p className="kicker">Starter documents</p>
        <h1>Answer the questions first</h1>
        <p className="lede">
          The documents are tailored to your answers, for example whether you use AI, hold sensitive data or let staff use their own devices. It takes about three minutes.
        </p>
        <div className="row">
          <button className="btn primary" onClick={onIntake}>
            Answer the questions
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="docs">
      <header className="head">
        <p className="kicker">Starter documents</p>
        <h1>Policies written for your business</h1>
        <p className="lede">
          Three documents tailored to your answers. Fill in the highlighted gaps, check every statement is true for you, then get a director to approve them. Guidance to get you started, not legal advice.
        </p>
      </header>

      {Array.isArray(answers.policies) && answers.policies.some((p) => ['infosec', 'acceptable', 'ai', 'incident'].includes(p)) && (
        <section className="todo" aria-label="You already have policies">
          <h3>You already have some of these policies</h3>
          <p>
            Use these starters as a benchmark. Compare each section with your own policy and note anything yours does not cover, instead of replacing what you have.
          </p>
        </section>
      )}

      <section className="detailsbox" aria-labelledby="det-h">
        <h2 id="det-h">Your details</h2>
        <div className="fgrid">
          <label>
            Business name
            <input type="text" value={f.biz} onChange={set('biz')} autoComplete="organization" />
          </label>
          <label>
            Policy owner
            <input type="text" value={f.ownerName} onChange={set('ownerName')} placeholder="Person responsible" />
          </label>
          <label>
            Owner's role
            <input type="text" value={f.ownerRole} onChange={set('ownerRole')} placeholder="For example Operations Manager" />
          </label>
          <label>
            Approved by
            <input type="text" value={f.approver} onChange={set('approver')} placeholder="Director or owner" />
          </label>
          <label>
            Date
            <input type="date" value={f.date} onChange={set('date')} />
          </label>
          <label>
            Review every
            <select value={f.months} onChange={set('months')}>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
            </select>
          </label>
        </div>
      </section>

      <div className="doctabs" role="tablist" aria-label="Documents">
        {DOC_LIST.map((d) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={f.doc === d.id}
            className={'fchip' + (f.doc === d.id ? ' on' : '')}
            onClick={() => {
              setF((s) => ({ ...s, doc: d.id }));
              setNote('');
              setFallback('');
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      <section className="todo" aria-label="Before you use this document">
        <h3>Before you use this document</h3>
        <ul>
          {doc.todo.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="count">
          {left === 0 ? 'No gaps left to fill.' : left + (left === 1 ? ' gap' : ' gaps') + ' left to fill (highlighted below)'}
        </p>
      </section>

      <section className="toolbar" aria-label="Save">
        <button className="btn primary" onClick={download}>
          Download for Word
        </button>
        <button className="btn" onClick={copy}>
          Copy as text
        </button>
        <p className="note" role="status">
          {note}
        </p>
        {fallback && <textarea className="fallback" readOnly rows={8} value={fallback} onFocus={(e) => e.target.select()} />}
      </section>

      <article className="paper" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="row">
        <button className="btn" onClick={onBack}>
          Back to my plan
        </button>
      </div>

      <p className="foot">
        These documents are starting templates, not legal advice. Review them with someone who knows your business, and check the current official guidance, for example from the ICO and the NCSC, before you rely on them. What you type here stays in your browser.
      </p>
    </div>
  );
}
