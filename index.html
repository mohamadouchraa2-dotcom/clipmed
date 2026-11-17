<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ClipMed — video editing vault</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap" rel="stylesheet" />
<script src="https://cdn.tailwindcss.com/3.4.17"></script>
<script>
  tailwind.config = {
    theme: { extend: {
      fontFamily: { sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'] },
      colors: { ink: '#12142F', panel: '#1B1E47', line: '#2E3270', clip: '#FFC93C', teal: '#3DDBD9', mist: '#A9ADD8' }
    } }
  }
</script>
<style>
  body { background: #12142F; color: #fff; font-family: "Bricolage Grotesque", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
  :focus-visible { outline: 2px solid #FFC93C; outline-offset: 2px; }
  .ruler {
    background-image:
      repeating-linear-gradient(90deg, #2E3270 0 1px, transparent 1px 12px),
      repeating-linear-gradient(90deg, #4A4FA0 0 1px, transparent 1px 60px);
    background-size: 100% 6px, 100% 12px;
    background-repeat: no-repeat;
    background-position: bottom, bottom;
  }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.7/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lucide@0.383.0/dist/umd/lucide.min.js"></script>
</head>
<body>
<div id="root"></div>

<script type="text/babel">
const { useState, useEffect, useMemo, useCallback } = React;

/* ============ CONFIG ============ */
const ADMIN_PASSWORD = 'change-me';   // بدّلها! (حماية فالواجهة غير)
const AI_ENDPOINT = '';               // اختياري: POST {tool,input} -> {result: string[]}

/* ============ ICONS (Lucide) ============ */
const Icon = ({ name, size = 16, className = '' }) => {
  let node = window.lucide && window.lucide.icons && window.lucide.icons[name];
  if (!node) return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  if (typeof node[0] === 'string') node = node[2] || [];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {node.map(([tag, attrs], i) => React.createElement(tag, { ...attrs, key: i }))}
    </svg>
  );
};

/* ============ DATA / STORE ============ */
const CATEGORIES = ['Transitions', 'Intros', 'Color & LUTs', 'Presets', 'Overlays', 'Subtitles'];
const SOFTWARE = ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Alight Motion'];
const KEY = 'clipmed_templates_v1';
const seed = [
  { id: 's1', title: 'Smooth Zoom Transitions Pack', category: 'Transitions', software: 'Premiere Pro', link: 'https://drive.google.com/', desc: '20 drag-and-drop zoom and whip transitions.', tags: ['zoom', 'whip'], featured: true },
  { id: 's2', title: 'Cinematic Teal & Orange LUTs', category: 'Color & LUTs', software: 'DaVinci Resolve', link: 'https://drive.google.com/', desc: '10 LUTs for travel and short films.', tags: ['lut', 'cinematic'], featured: false },
  { id: 's3', title: 'Gaming Intro Template', category: 'Intros', software: 'After Effects', link: 'https://drive.google.com/', desc: 'Editable 8-second intro with glitch text.', tags: ['gaming', 'glitch'], featured: true },
];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const isDriveLink = (u) => /^https:\/\/(drive|docs)\.google\.com\//.test(u.trim());

function useTemplates() {
  const [items, setItems] = useState(() => {
    try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : seed; } catch { return seed; }
  });
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} }, [items]);
  const add = useCallback((t) => setItems((p) => [{ ...t, id: uid() }, ...p]), []);
  const update = useCallback((id, t) => setItems((p) => p.map((x) => (x.id === id ? { ...x, ...t } : x))), []);
  const remove = useCallback((id) => setItems((p) => p.filter((x) => x.id !== id)), []);
  return { items, add, update, remove };
}

/* ============ AI (local fallback + optional endpoint) ============ */
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const localAI = {
  hooks: (t) => [`Nobody tells you this about ${t}...`, `I tried ${t} for 7 days. Here's what happened.`, `Stop doing ${t} like this.`, `3 seconds. That's all you need to get ${t} right.`, `${t}: the mistake I made so you don't have to.`],
  titles: (t) => [`${t} — Full Guide`, `How I Edit ${t} Like a Pro`, `${t}: Before vs After`, `The Only ${t} Tutorial You Need`, `${t} in 60 Seconds`],
  hashtags: (t) => { const w = t.toLowerCase().split(/\s+/).filter(Boolean).join(''); return [`#${w}`, '#videoediting', '#editor', '#shorts', '#reels', '#fyp', '#cinematic', '#transitions']; },
  shots: (t) => ['1. Hook: close-up, 2s — "' + t + '"', '2. Wide establishing shot, 3s', '3. Detail insert / B-roll, 2s', '4. Medium shot with on-screen text, 4s', `5. Payoff shot — ${pick(['zoom-in', 'whip transition', 'speed ramp'])}, 3s`, '6. Call to action + end card, 2s'],
};
async function runTool(tool, input) {
  if (AI_ENDPOINT) {
    const res = await fetch(AI_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tool, input }) });
    if (!res.ok) throw new Error('The AI service returned an error.');
    const d = await res.json();
    return Array.isArray(d.result) ? d.result : String(d.result).split('\n').filter(Boolean);
  }
  await new Promise((r) => setTimeout(r, 400));
  return localAI[tool](input);
}

/* ============ HEADER ============ */
const TABS = [
  { id: 'browse', label: 'Templates', icon: 'LayoutGrid' },
  { id: 'ai', label: 'AI tools', icon: 'Sparkles' },
  { id: 'admin', label: 'Admin', icon: 'ShieldCheck' },
];
function Header({ view, setView, isAdmin, onLogout }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <button onClick={() => setView('browse')} className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-clip text-ink"><Icon name="Film" size={18} /></span>
          ClipMed
        </button>
        <nav className="flex items-center gap-1" aria-label="Main">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setView(t.id)} aria-current={view === t.id ? 'page' : undefined}
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${view === t.id ? 'bg-clip text-ink' : 'text-mist hover:bg-panel hover:text-white'}`}>
              <Icon name={t.icon} /> <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
          {isAdmin && (
            <button onClick={onLogout} title="Log out" className="ml-1 rounded-md p-2 text-mist hover:bg-panel hover:text-white"><Icon name="LogOut" /></button>
          )}
        </nav>
      </div>
    </header>
  );
}

/* ============ TEMPLATE CARD ============ */
function TemplateCard({ t }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(t.link); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <article className="flex flex-col rounded-lg border border-line bg-panel p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="rounded bg-ink px-2 py-1 text-xs font-semibold text-teal">{t.category}</span>
        {t.featured && <Icon name="Star" className="fill-clip text-clip" />}
      </div>
      <h3 className="text-lg font-bold leading-snug">{t.title}</h3>
      <p className="mt-1 flex-1 text-sm text-mist">{t.desc}</p>
      <p className="mt-3 text-xs text-mist">Works in {t.software}</p>
      {t.tags && t.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {t.tags.map((g) => <span key={g} className="rounded-full border border-line px-2 py-0.5 text-xs text-mist">#{g}</span>)}
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <a href={t.link} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-md bg-clip px-3 py-2 text-sm font-bold text-ink hover:brightness-110">
          <Icon name="ExternalLink" /> Open in Drive
        </a>
        <button onClick={copy} title="Copy link" className="rounded-md border border-line px-3 text-mist hover:text-white">
          {copied ? <Icon name="Check" className="text-teal" /> : <Icon name="Copy" />}
        </button>
      </div>
    </article>
  );
}

/* ============ BROWSE ============ */
function Browse({ items }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sw, setSw] = useState('All');
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((t) => (cat === 'All' || t.category === cat) && (sw === 'All' || t.software === sw) &&
      (!s || [t.title, t.desc, ...(t.tags || [])].join(' ').toLowerCase().includes(s)));
  }, [items, q, cat, sw]);
  return (
    <>
      <section className="ruler pb-8 pt-12">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Every template your edit needs, in one vault.</h1>
        <p className="mt-3 max-w-xl text-mist">Transitions, intros, LUTs and presets. Find one, open it in Drive, drop it on your timeline.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search templates</span>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mist"><Icon name="Search" size={18} /></span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates or tags"
              className="w-full rounded-md border border-line bg-panel py-3 pl-10 pr-3 text-white placeholder:text-mist/70" />
          </label>
          <select value={sw} onChange={(e) => setSw(e.target.value)} aria-label="Software" className="rounded-md border border-line bg-panel px-3 py-3 text-white">
            <option>All</option>{SOFTWARE.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </section>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Categories">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors ${cat === c ? 'border-clip bg-clip text-ink' : 'border-line text-mist hover:text-white'}`}>{c}</button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div className="mt-16 grid place-items-center gap-2 text-center text-mist"><Icon name="FolderOpen" size={32} /><p>No templates match. Clear the search or pick another category.</p></div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shown.map((t) => <TemplateCard key={t.id} t={t} />)}</div>
      )}
    </>
  );
}

/* ============ ADMIN ============ */
const emptyForm = { title: '', category: CATEGORIES[0], software: SOFTWARE[0], link: '', desc: '', tags: '', featured: false };
const field = 'w-full rounded-md border border-line bg-ink px-3 py-2 text-white';

function Login({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const submit = () => (pw === ADMIN_PASSWORD ? onLogin() : setErr('Wrong password. Try again.'));
  return (
    <div className="mx-auto mt-16 max-w-sm rounded-lg border border-line bg-panel p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold"><Icon name="Lock" size={18} /> Admin sign in</h2>
      <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder="Password" className={`${field} mt-4`} />
      {err && <p className="mt-2 text-sm text-red-300">{err}</p>}
      <button onClick={submit} className="mt-4 w-full rounded-md bg-clip py-2 font-bold text-ink">Sign in</button>
    </div>
  );
}

function AdminPanel({ store, isAdmin, onLogin }) {
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  if (!isAdmin) return <Login onLogin={onLogin} />;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const reset = () => { setForm(emptyForm); setEditId(null); setError(''); };
  const save = () => {
    if (!form.title.trim()) return setError('Add a title.');
    if (!isDriveLink(form.link)) return setError('Paste a Google Drive link that starts with https://drive.google.com/');
    const data = { ...form, title: form.title.trim(), link: form.link.trim(), tags: form.tags.split(',').map((x) => x.trim().replace(/^#/, '')).filter(Boolean) };
    editId ? store.update(editId, data) : store.add(data);
    reset();
  };
  const edit = (t) => { setEditId(t.id); setForm({ ...t, tags: (t.tags || []).join(', ') }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
      <section className="h-fit rounded-lg border border-line bg-panel p-5">
        <h2 className="mb-4 text-lg font-bold">{editId ? 'Edit template' : 'Add template'}</h2>
        <div className="space-y-3">
          <input className={field} placeholder="Title" value={form.title} onChange={set('title')} />
          <input className={field} placeholder="Google Drive link" value={form.link} onChange={set('link')} />
          <textarea className={field} rows={3} placeholder="Short description" value={form.desc} onChange={set('desc')} />
          <div className="grid grid-cols-2 gap-3">
            <select className={field} value={form.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
            <select className={field} value={form.software} onChange={set('software')}>{SOFTWARE.map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <input className={field} placeholder="Tags, separated by commas" value={form.tags} onChange={set('tags')} />
          <label className="flex items-center gap-2 text-sm text-mist"><input type="checkbox" checked={form.featured} onChange={set('featured')} /> Mark as featured</label>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <div className="flex gap-2">
            <button onClick={save} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-clip py-2 font-bold text-ink">
              <Icon name={editId ? 'Save' : 'Plus'} /> {editId ? 'Save changes' : 'Add template'}
            </button>
            {editId && <button onClick={reset} className="rounded-md border border-line px-3" title="Cancel"><Icon name="X" /></button>}
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-bold">All templates ({store.items.length})</h2>
        <ul className="space-y-2">
          {store.items.map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-md border border-line bg-panel p-3">
              <div className="min-w-0 flex-1"><p className="truncate font-semibold">{t.title}</p><p className="truncate text-xs text-mist">{t.category} · {t.software}</p></div>
              <button onClick={() => edit(t)} title="Edit" className="rounded p-2 text-mist hover:text-white"><Icon name="Pencil" /></button>
              <button onClick={() => window.confirm(`Delete "${t.title}"?`) && store.remove(t.id)} title="Delete" className="rounded p-2 text-mist hover:text-red-300"><Icon name="Trash2" /></button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ============ AI TOOLS ============ */
const TOOLS = [
  { id: 'hooks', label: 'Hook ideas', icon: 'Wand2', ph: 'What is the video about?' },
  { id: 'titles', label: 'Titles', icon: 'Type', ph: 'Video topic' },
  { id: 'hashtags', label: 'Hashtags', icon: 'Hash', ph: 'Main keyword' },
  { id: 'shots', label: 'Shot list', icon: 'ListVideo', ph: 'Describe the video idea' },
];
function AiTools() {
  const [tool, setTool] = useState(TOOLS[0]);
  const [input, setInput] = useState('');
  const [out, setOut] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const run = async () => {
    if (!input.trim()) return setError('Enter a topic first.');
    setError(''); setLoading(true);
    try { setOut(await runTool(tool.id, input.trim())); }
    catch (e) { setError(e.message || 'Something went wrong. Try again.'); }
    finally { setLoading(false); }
  };
  const copy = (text) => { try { navigator.clipboard.writeText(text); } catch {} };
  return (
    <section className="mt-10">
      <h1 className="text-3xl font-extrabold tracking-tight">AI tools for editors</h1>
      <p className="mt-2 text-mist">Pick a tool, describe your video, and copy what you like.</p>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist">
        {TOOLS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tool.id === t.id} onClick={() => { setTool(t); setOut([]); setError(''); }}
            className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${tool.id === t.id ? 'border-clip bg-clip text-ink' : 'border-line text-mist hover:text-white'}`}>
            <Icon name={t.icon} /> {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && run()} placeholder={tool.ph}
          className="flex-1 rounded-md border border-line bg-panel px-3 py-3 text-white placeholder:text-mist/70" />
        <button onClick={run} disabled={loading} className="flex items-center justify-center gap-2 rounded-md bg-clip px-5 py-3 font-bold text-ink disabled:opacity-60">
          {loading ? <Icon name="Loader2" className="animate-spin" /> : <Icon name={tool.icon} />} Generate
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
      <ul className="mt-6 space-y-2">
        {out.map((line, i) => (
          <li key={i} className="flex items-center justify-between gap-3 rounded-md border border-line bg-panel px-4 py-3">
            <span>{line}</span>
            <button onClick={() => copy(line)} title="Copy" className="text-mist hover:text-white"><Icon name="Copy" /></button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ============ APP ============ */
function App() {
  const [view, setView] = useState('browse');
  const [isAdmin, setIsAdmin] = useState(() => { try { return sessionStorage.getItem('clipmed_admin') === '1'; } catch { return false; } });
  const store = useTemplates();
  const login = () => { try { sessionStorage.setItem('clipmed_admin', '1'); } catch {} setIsAdmin(true); };
  const logout = () => { try { sessionStorage.removeItem('clipmed_admin'); } catch {} setIsAdmin(false); setView('browse'); };
  return (
    <div className="min-h-screen">
      <Header view={view} setView={setView} isAdmin={isAdmin} onLogout={logout} />
      <main className="mx-auto max-w-6xl px-4 pb-20">
        {view === 'browse' && <Browse items={store.items} />}
        {view === 'ai' && <AiTools />}
        {view === 'admin' && <AdminPanel store={store} isAdmin={isAdmin} onLogin={login} />}
      </main>
      <footer className="border-t border-line py-6 text-center text-sm text-mist">ClipMed — templates are hosted on Google Drive by their owners.</footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>

