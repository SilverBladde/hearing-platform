import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lregtucmcpreamgqhhvd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZWd0dWNtY3ByZWFtZ3FoaHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjgzODMsImV4cCI6MjA5MjcwNDM4M30.3mN8JkVZFnxQF66lBS1MbrXiGJQl8H7DKjI-XEzCBZo"
);

const ADMIN_EMAIL = "kzkenbai@gmail.com";

// ─── COLORS ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#0f1923", surface: "#162130", card: "#1e2e40",
  accent: "#00c9a7", accentSoft: "#00c9a720", accentBorder: "#00c9a740",
  gold: "#f5a623", text: "#e8f4f2", textMuted: "#7a9eb0",
  success: "#4ade80", error: "#f87171",
};

// ─── LESSON DATA ──────────────────────────────────────────────────────────────
const lesson = {
  title: "The Ocean Ecosystem",
  topic: "Marine Biology",
  vocab: [
    { word: "Ecosystem", emoji: "🌊", definition: "A community of living things interacting with their environment" },
    { word: "Coral Reef", emoji: "🪸", definition: "A structure made of coral polyps, home to thousands of sea creatures" },
    { word: "Predator", emoji: "🦈", definition: "An animal that hunts other animals for food" },
    { word: "Biodiversity", emoji: "🐠", definition: "The variety of life in a particular habitat or ecosystem" },
    { word: "Photosynthesis", emoji: "☀️", definition: "How plants use sunlight to make food from water and CO₂" },
  ],
  paragraphs: [
    {
      emoji: "🌍",
      text: "The ocean covers more than 70% of Earth's surface and is home to an astonishing variety of life. From the sunlit surface waters to the darkest trenches miles below, marine ecosystems support millions of species.",
      task: { type: "mcq", question: "How much of Earth's surface does the ocean cover?", options: ["About 50%", "About 60%", "More than 70%", "About 80%"], correct: 2 }
    },
    {
      emoji: "🪸",
      text: "Coral reefs are often called the 'rainforests of the sea.' Although they cover less than 1% of the ocean floor, coral reefs are home to approximately 25% of all marine species. These reefs provide shelter, food, and nursery grounds for countless creatures.",
      task: { type: "truefalse", question: "Coral reefs cover more than 50% of the ocean floor.", correct: false }
    },
    {
      emoji: "🔬",
      text: "Phytoplankton are microscopic plants floating near the ocean's surface. Using sunlight, water, and carbon dioxide, they perform photosynthesis — producing oxygen and forming the base of the marine food web. Phytoplankton produce about half of all the oxygen on Earth!",
      task: { type: "mcq", question: "What percentage of Earth's oxygen do phytoplankton produce?", options: ["10%", "25%", "About half", "75%"], correct: 2 }
    },
  ],
  postReading: [
    { question: "Why are coral reefs compared to rainforests?", hint: "Think about biodiversity..." },
    { question: "What would happen if all phytoplankton disappeared?", hint: "Think about oxygen and the food web..." },
  ]
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Btn({ children, onClick, color = C.accent, disabled = false, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? C.card : color, color: disabled ? C.textMuted : (color === C.accent || color === C.gold) ? "#0f1923" : C.text,
      border: "none", borderRadius: 12, padding: "12px 24px",
      fontFamily: "'Segoe UI', sans-serif", fontWeight: 700, fontSize: 14,
      cursor: disabled ? "default" : "pointer", transition: "all 0.2s ease", ...style
    }}>{children}</button>
  );
}

function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 6 }}>{label}</div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", background: C.surface, border: `1.5px solid ${C.accentBorder}`,
          borderRadius: 10, padding: "12px 14px", color: C.text,
          fontFamily: "'Segoe UI', sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box"
        }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.card, borderRadius: 20, padding: 24,
      border: `1px solid ${C.accentBorder}`, marginBottom: 20, ...style
    }}>{children}</div>
  );
}

// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); setMsg("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMsg("❌ " + error.message); setLoading(false); return; }
    onLogin(data.user);
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!name) { setMsg("❌ Please enter your name"); return; }
    setLoading(true); setMsg("");
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    if (error) { setMsg("❌ " + error.message); setLoading(false); return; }
    // save to profiles
    if (data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id, full_name: name, email, role: email === ADMIN_EMAIL ? "admin" : "student" });
    }
    setMsg("✅ Registered! Check your email to confirm, then log in.");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, fontFamily: "'Segoe UI', sans-serif", marginBottom: 6 }}>Hearing Platform</h1>
          <p style={{ color: C.textMuted, fontSize: 14 }}>Educational platform for hearing-impaired students</p>
        </div>

        <Card>
          <div style={{ display: "flex", marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "10px", border: "none", borderRadius: 8,
                background: mode === m ? C.accent : "transparent",
                color: mode === m ? "#0f1923" : C.textMuted,
                fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all 0.2s"
              }}>{m === "login" ? "Log In" : "Register"}</button>
            ))}
          </div>

          {mode === "register" && <Input label="Full Name" value={name} onChange={setName} placeholder="Your name" />}
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

          {msg && <div style={{ marginBottom: 14, padding: "10px 14px", borderRadius: 10, background: msg.startsWith("✅") ? C.success + "20" : C.error + "20", color: msg.startsWith("✅") ? C.success : C.error, fontSize: 13 }}>{msg}</div>}

          <Btn onClick={mode === "login" ? handleLogin : handleRegister} disabled={loading} style={{ width: "100%" }}>
            {loading ? "Please wait..." : mode === "login" ? "Log In →" : "Create Account →"}
          </Btn>

          <div style={{ marginTop: 16, padding: "12px", background: C.accentSoft, borderRadius: 10, fontSize: 12, color: C.textMuted }}>
            <strong style={{ color: C.accent }}>Admin:</strong> use email <code style={{ color: C.gold }}>{ADMIN_EMAIL}</code> to get admin access
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── VOCAB CARD ───────────────────────────────────────────────────────────────
function VocabCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onClick={() => setFlipped(!flipped)} style={{ cursor: "pointer", height: 130, perspective: 1000 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none", transition: "transform 0.5s ease" }}>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: C.card, borderRadius: 16, border: `1px solid ${C.accentBorder}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ fontSize: 36 }}>{item.emoji}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{item.word}</div>
          <div style={{ fontSize: 11, color: C.textMuted }}>TAP TO SEE</div>
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: C.accentSoft, borderRadius: 16, border: `1px solid ${C.accent}50`, display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
          <div style={{ fontSize: 13, color: C.text, textAlign: "center", lineHeight: 1.5 }}>{item.definition}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TASK COMPONENTS ──────────────────────────────────────────────────────────
function MCQTask({ task, onCorrect }) {
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const submit = () => { if (sel === null) return; setDone(true); if (sel === task.correct) setTimeout(onCorrect, 1000); };
  return (
    <div>
      <div style={{ fontWeight: 600, color: C.text, marginBottom: 14, fontSize: 15 }}>{task.question}</div>
      {task.options.map((opt, i) => {
        let bg = C.surface, border = C.accentBorder, color = C.text;
        if (done) { if (i === task.correct) { bg = C.success + "20"; border = C.success; color = C.success; } else if (i === sel) { bg = C.error + "20"; border = C.error; color = C.error; } }
        else if (i === sel) { bg = C.accentSoft; border = C.accent; color = C.accent; }
        return <button key={i} onClick={() => !done && setSel(i)} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", marginBottom: 8, background: bg, border: `1.5px solid ${border}`, borderRadius: 10, color, cursor: done ? "default" : "pointer", fontSize: 14, transition: "all 0.2s" }}>{String.fromCharCode(65 + i)}. {opt}</button>;
      })}
      {!done && <Btn onClick={submit} disabled={sel === null}>Check →</Btn>}
      {done && <div style={{ marginTop: 10, color: sel === task.correct ? C.success : C.error, fontSize: 13 }}>{sel === task.correct ? "✓ Correct! Well done." : `✗ The correct answer is: ${task.options[task.correct]}`}</div>}
    </div>
  );
}

function TrueFalseTask({ task, onCorrect }) {
  const [sel, setSel] = useState(null);
  const handle = (val) => {
    if (sel !== null) return;
    setSel(val);
    if (val === task.correct) setTimeout(onCorrect, 1000);
  };
  return (
    <div>
      <div style={{ fontWeight: 600, color: C.text, marginBottom: 14, fontSize: 15 }}>True or False: {task.question}</div>
      <div style={{ display: "flex", gap: 12 }}>
        {[true, false].map(val => {
          let bg = C.surface, border = C.accentBorder, color = C.textMuted;
          if (sel !== null) { if (val === task.correct) { bg = C.success + "20"; border = C.success; color = C.success; } else if (val === sel) { bg = C.error + "20"; border = C.error; color = C.error; } }
          return <button key={String(val)} onClick={() => handle(val)} style={{ flex: 1, padding: "14px", background: bg, border: `1.5px solid ${border}`, borderRadius: 12, color, fontWeight: 700, fontSize: 15, cursor: sel !== null ? "default" : "pointer", transition: "all 0.2s" }}>{val ? "TRUE ✓" : "FALSE ✗"}</button>;
        })}
      </div>
      {sel !== null && <div style={{ marginTop: 10, color: sel === task.correct ? C.success : C.error, fontSize: 13 }}>{sel === task.correct ? "✓ Correct!" : `✗ The answer is ${task.correct ? "TRUE" : "FALSE"}`}</div>}
    </div>
  );
}

// ─── STUDENT PANEL ────────────────────────────────────────────────────────────
function StudentPanel({ user, onLogout }) {
  const [stage, setStage] = useState(0); // 0=pre, 1=while, 2=post
  const [preStep, setPreStep] = useState(0); // 0=vocab, 1=question
  const [paraIndex, setParaIndex] = useState(0);
  const [parasDone, setParasDone] = useState([]);
  const [postAnswers, setPostAnswers] = useState({});
  const [postSubmitted, setPostSubmitted] = useState({});
  const [postFeedback, setPostFeedback] = useState({});
  const [loading, setLoading] = useState({});
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const handleParaDone = (i) => {
    if (parasDone.includes(i)) return;
    const next = [...parasDone, i];
    setParasDone(next);
    showToast("🎉 Correct! Great job!");
    setTimeout(() => {
      if (i < lesson.paragraphs.length - 1) setParaIndex(i + 1);
      else { setStage(2); }
    }, 1500);
  };

  const submitPost = async (i) => {
    if (!postAnswers[i]?.trim()) return;
    setLoading(prev => ({ ...prev, [i]: true }));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `You are a kind teacher. Question: "${lesson.postReading[i].question}". Student answered: "${postAnswers[i]}". Give 2-3 sentences of warm, constructive feedback.` }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "Great effort!";
      setPostFeedback(prev => ({ ...prev, [i]: text }));
      // save to supabase
      await supabase.from("student_responses").insert({ user_id: user.id, question: lesson.postReading[i].question, answer: postAnswers[i], feedback: text });
    } catch {
      setPostFeedback(prev => ({ ...prev, [i]: "Great effort! Keep exploring the topic." }));
    }
    setPostSubmitted(prev => ({ ...prev, [i]: true }));
    setLoading(prev => ({ ...prev, [i]: false }));
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', sans-serif" }}>
      {toast && <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: C.accent, color: "#0f1923", padding: "12px 28px", borderRadius: 50, fontWeight: 800, zIndex: 1000, fontSize: 15 }}>{toast}</div>}

      {/* Header */}
      <div style={{ background: C.surface, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.accentBorder}` }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>🎓 Hearing Platform</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Welcome, {user.user_metadata?.full_name || user.email}</div>
        </div>
        <button onClick={onLogout} style={{ background: "none", border: `1px solid ${C.accentBorder}`, borderRadius: 8, padding: "8px 16px", color: C.textMuted, cursor: "pointer", fontSize: 13 }}>Log out</button>
      </div>

      {/* Progress */}
      <div style={{ background: C.surface, padding: "12px 24px", display: "flex", gap: 8, borderBottom: `1px solid ${C.accentBorder}` }}>
        {["📖 Pre-Reading", "🔍 While Reading", "✍️ Post-Reading"].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px", borderRadius: 10, background: stage === i ? C.accentSoft : "transparent", border: `1px solid ${stage === i ? C.accent : "transparent"}`, fontSize: 13, color: stage === i ? C.accent : stage > i ? C.success : C.textMuted, fontWeight: stage === i ? 700 : 400 }}>{s}</div>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px" }}>

        {/* ── PRE-READING ── */}
        {stage === 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{lesson.title}</h2>
            <p style={{ color: C.textMuted, marginBottom: 24, fontSize: 14 }}>{lesson.topic}</p>

            {preStep === 0 && (
              <>
                <h3 style={{ marginBottom: 16, color: C.accent }}>📚 Key Vocabulary — Tap each card!</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12, marginBottom: 28 }}>
                  {lesson.vocab.map(v => <VocabCard key={v.word} item={v} />)}
                </div>
                <Btn onClick={() => setPreStep(1)} style={{ width: "100%" }}>I know these words — Continue →</Btn>
              </>
            )}

            {preStep === 1 && (
              <Card>
                <h3 style={{ marginBottom: 16, color: C.accent }}>🧠 Quick Check — What do you already know?</h3>
                <MCQTask
                  task={{ question: "Which ocean habitat has the most biodiversity?", options: ["Deep ocean trenches", "Coral reefs", "Open ocean surface", "Polar ice regions"], correct: 1 }}
                  onCorrect={() => { showToast("🌟 Let's start reading!"); setTimeout(() => setStage(1), 1500); }}
                />
                <button onClick={() => setStage(1)} style={{ marginTop: 16, background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 13, textDecoration: "underline" }}>Skip and start reading</button>
              </Card>
            )}
          </div>
        )}

        {/* ── WHILE READING ── */}
        {stage === 1 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h3 style={{ color: C.accent }}>🔍 While Reading</h3>
              <div style={{ fontSize: 13, color: C.textMuted }}>{parasDone.length}/{lesson.paragraphs.length} done</div>
            </div>
            {lesson.paragraphs.slice(0, paraIndex + 1).map((para, i) => (
              <div key={i}>
                <Card>
                  <div style={{ display: "flex", gap: 14 }}>
                    <div style={{ fontSize: 40 }}>{para.emoji}</div>
                    <p style={{ fontSize: 15, lineHeight: 1.8, color: C.text }}>{para.text}</p>
                  </div>
                </Card>
                {i === paraIndex && (
                  <Card style={{ borderColor: C.accent + "60" }}>
                    <div style={{ fontSize: 11, color: C.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>✏️ Comprehension Check</div>
                    {para.task.type === "mcq" && <MCQTask task={para.task} onCorrect={() => handleParaDone(i)} />}
                    {para.task.type === "truefalse" && <TrueFalseTask task={para.task} onCorrect={() => handleParaDone(i)} />}
                  </Card>
                )}
                {parasDone.includes(i) && i < paraIndex && <div style={{ color: C.success, fontSize: 12, marginBottom: 16 }}>✓ Completed</div>}
              </div>
            ))}
          </div>
        )}

        {/* ── POST READING ── */}
        {stage === 2 && (
          <div>
            <h3 style={{ color: C.gold, marginBottom: 8 }}>✍️ Post-Reading Questions</h3>
            <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 24 }}>Write your answers — you'll get AI feedback! 🤖</p>
            {lesson.postReading.map((item, i) => (
              <Card key={i}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Q{i + 1}. {item.question}</div>
                <div style={{ fontSize: 12, color: C.gold, marginBottom: 12 }}>💡 Hint: {item.hint}</div>
                <textarea value={postAnswers[i] || ""} onChange={e => setPostAnswers(p => ({ ...p, [i]: e.target.value }))} disabled={postSubmitted[i]}
                  placeholder="Write your answer here..."
                  style={{ width: "100%", minHeight: 90, background: C.surface, border: `1.5px solid ${postSubmitted[i] ? C.success + "50" : C.accentBorder}`, borderRadius: 10, padding: 12, color: C.text, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "'Segoe UI', sans-serif" }} />
                {!postSubmitted[i] && <Btn onClick={() => submitPost(i)} color={C.gold} disabled={loading[i] || !postAnswers[i]?.trim()} style={{ marginTop: 12 }}>{loading[i] ? "Getting feedback..." : "Submit →"}</Btn>}
                {postFeedback[i] && <div style={{ marginTop: 14, padding: "14px", borderRadius: 12, background: C.success + "12", border: `1px solid ${C.success}30`, fontSize: 14, lineHeight: 1.6 }}><strong style={{ color: C.success }}>✨ Feedback:</strong><br />{postFeedback[i]}</div>}
              </Card>
            ))}
            {Object.keys(postSubmitted).length === lesson.postReading.length && (
              <div style={{ textAlign: "center", padding: 32, background: C.accentSoft, borderRadius: 20, border: `1px solid ${C.accentBorder}` }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Lesson Complete!</div>
                <div style={{ color: C.textMuted, fontSize: 14 }}>Excellent work! Your responses have been saved.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ user, onLogout }) {
  const [tab, setTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: profiles } = await supabase.from("profiles").select("*").eq("role", "student");
      const { data: resp } = await supabase.from("student_responses").select("*").order("created_at", { ascending: false });
      setStudents(profiles || []);
      setResponses(resp || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.surface, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.accentBorder}` }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>⚙️ Admin Panel</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>{user.email}</div>
        </div>
        <button onClick={onLogout} style={{ background: "none", border: `1px solid ${C.accentBorder}`, borderRadius: 8, padding: "8px 16px", color: C.textMuted, cursor: "pointer", fontSize: 13 }}>Log out</button>
      </div>

      {/* Tabs */}
      <div style={{ background: C.surface, padding: "0 24px", display: "flex", gap: 4, borderBottom: `1px solid ${C.accentBorder}` }}>
        {[["students", "👥 Students"], ["responses", "📝 Responses"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ padding: "14px 20px", background: "none", border: "none", borderBottom: `3px solid ${tab === key ? C.accent : "transparent"}`, color: tab === key ? C.accent : C.textMuted, cursor: "pointer", fontWeight: tab === key ? 700 : 400, fontSize: 14, transition: "all 0.2s" }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
        {loading && <div style={{ color: C.textMuted, textAlign: "center", padding: 40 }}>Loading data...</div>}

        {!loading && tab === "students" && (
          <div>
            <h3 style={{ marginBottom: 20, color: C.accent }}>Registered Students ({students.length})</h3>
            {students.length === 0 && <div style={{ color: C.textMuted, padding: 20 }}>No students registered yet. Share the platform link with your students!</div>}
            {students.map((s, i) => (
              <Card key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👤</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{s.full_name}</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>{s.email}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 12, color: C.textMuted }}>
                  {new Date(s.created_at).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        )}

        {!loading && tab === "responses" && (
          <div>
            <h3 style={{ marginBottom: 20, color: C.accent }}>Student Responses ({responses.length})</h3>
            {responses.length === 0 && <div style={{ color: C.textMuted, padding: 20 }}>No responses yet.</div>}
            {responses.map((r, i) => (
              <Card key={i}>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>{new Date(r.created_at).toLocaleString()}</div>
                <div style={{ fontWeight: 600, marginBottom: 8, color: C.gold }}>Q: {r.question}</div>
                <div style={{ fontSize: 14, marginBottom: 10, padding: "10px", background: C.surface, borderRadius: 8 }}>{r.answer}</div>
                {r.feedback && <div style={{ fontSize: 13, color: C.accent, borderLeft: `3px solid ${C.accent}`, paddingLeft: 12 }}>AI Feedback: {r.feedback}</div>}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
        const { data: p } = await supabase.from("profiles").select("*").eq("id", data.session.user.id).single();
        setProfile(p);
      }
      setChecking(false);
    });
  }, []);

  const handleLogin = async (u) => {
    setUser(u);
    const { data: p } = await supabase.from("profiles").select("*").eq("id", u.id).single();
    if (!p) {
      await supabase.from("profiles").upsert({ id: u.id, email: u.email, full_name: u.user_metadata?.full_name || u.email, role: u.email === ADMIN_EMAIL ? "admin" : "student" });
      const { data: p2 } = await supabase.from("profiles").select("*").eq("id", u.id).single();
      setProfile(p2);
    } else setProfile(p);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setProfile(null);
  };

  if (checking) return <div style={{ minHeight: "100vh", background: "#0f1923", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c9a7", fontSize: 18 }}>Loading...</div>;
  if (!user) return <AuthScreen onLogin={handleLogin} />;
  if (profile?.role === "admin" || user.email === ADMIN_EMAIL) return <AdminPanel user={user} onLogout={handleLogout} />;
  return <StudentPanel user={user} onLogout={handleLogout} />;
}
