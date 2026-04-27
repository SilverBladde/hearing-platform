import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lregtucmcpreamgqhhvd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZWd0dWNtY3ByZWFtZ3FoaHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjgzODMsImV4cCI6MjA5MjcwNDM4M30.3mN8JkVZFnxQF66lBS1MbrXiGJQl8H7DKjI-XEzCBZo"
);
const ADMIN_EMAIL = "kzkenbai@gmail.com";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  // Backgrounds
  bg: "#0a1420",
  bgGradient: "linear-gradient(180deg, #0a1420 0%, #0f1a2a 100%)",
  surface: "#141f2e",
  surfaceHi: "#1a2638",
  card: "#1f2d40",
  cardHi: "#26354a",
  // Brand
  accent: "#10d8b1",
  accentSoft: "rgba(16, 216, 177, 0.12)",
  accentBorder: "rgba(16, 216, 177, 0.28)",
  accentGlow: "rgba(16, 216, 177, 0.4)",
  // Stage colors
  stage1: "#7c83ff",
  stage1Soft: "rgba(124, 131, 255, 0.15)",
  stage1Border: "rgba(124, 131, 255, 0.4)",
  gold: "#fbbf24",
  goldSoft: "rgba(251, 191, 36, 0.15)",
  goldBorder: "rgba(251, 191, 36, 0.4)",
  // Text
  text: "#eef4f3",
  textDim: "#b4c5d3",
  textMuted: "#7c93a8",
  // Status
  success: "#34d399",
  successSoft: "rgba(52, 211, 153, 0.15)",
  error: "#f87171",
  errorSoft: "rgba(248, 113, 113, 0.15)",
  // UI
  divider: "rgba(255, 255, 255, 0.08)",
  shadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
  shadowGlow: "0 8px 32px rgba(16, 216, 177, 0.18)",
};

const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";

// ─── LESSON DATA ──────────────────────────────────────────────────────────────
const lesson = {
  title: "A Total Reality Experience",
  topic: "Virtual Reality",
  vocab: [
    { word: "virtual reality", pos: "noun phrase", ipa: "/ˌvɜːtʃuəl riˈæləti/", definition: "A computer-made world you can experience with a headset", example: "She visited a museum using virtual reality.", emoji: "🥽" },
    { word: "environment", pos: "noun", ipa: "/ɪnˈvaɪrənmənt/", definition: "The place or conditions around you", example: "Fish live in a water environment.", emoji: "🌿" },
    { word: "interactive", pos: "adjective", ipa: "/ˌɪntərˈæktɪv/", definition: "Reacting to what you do; not just watching", example: "The interactive game responds when you move.", emoji: "🖐️" },
    { word: "transform", pos: "verb", ipa: "/trænsˈfɔːm/", definition: "To completely change something", example: "VR will transform the way we learn.", emoji: "🔄" },
    { word: "affordable", pos: "adjective", ipa: "/əˈfɔːdəbl/", definition: "Not too expensive; easy to pay for", example: "Smartphones became affordable for most people.", emoji: "💰" },
    { word: "explore", pos: "verb", ipa: "/ɪkˈsplɔː/", definition: "To look around or discover a new place", example: "They explored the rainforest with VR.", emoji: "🔭" },
    { word: "revolution", pos: "noun", ipa: "/ˌrevəˈluːʃn/", definition: "A huge change that affects everything", example: "The internet was a digital revolution.", emoji: "🌍" },
    { word: "accommodation", pos: "noun", ipa: "/əˌkɒməˈdeɪʃn/", definition: "A place to stay, e.g. a hotel", example: "She booked her accommodation online.", emoji: "🏨" },
    { word: "risk-free", pos: "adjective", ipa: "/ˈrɪsk friː/", definition: "Without any danger", example: "Practising surgery in VR is risk-free.", emoji: "🛡️" },
    { word: "advanced", pos: "adjective", ipa: "/ədˈvɑːnst/", definition: "Very developed; using modern technology", example: "The lab has advanced computers.", emoji: "🚀" },
  ],
  vocabTask1: {
    label: "Vocab Task 1 – Match",
    instruction: "Match each word (1–5) with the correct definition (a–e).",
    words: ["virtual reality", "transform", "revolution", "affordable", "risk-free"],
    definitions: [
      { letter: "a", text: "Without any danger; no one can get hurt" },
      { letter: "b", text: "A huge change that affects everyone" },
      { letter: "c", text: "A computer-made world you experience with a headset" },
      { letter: "d", text: "To completely change something" },
      { letter: "e", text: "Not too expensive for most people" },
    ],
    answers: ["c", "d", "b", "e", "a"],
  },
  vocabTask2: {
    label: "Vocab Task 2 – Gap Fill",
    instruction: "Fill in each gap with a word from the word bank.",
    wordbank: ["environment", "explore", "interactive", "advanced", "accommodation"],
    sentences: [
      { text: "With VR, students can ___ the Amazon Rainforest without leaving the classroom.", answer: "explore" },
      { text: "The fish lives in a water ___. VR can show you this underwater world.", answer: "environment" },
      { text: "The VR experience is ___ — you can touch and move things inside it.", answer: "interactive" },
      { text: "Before booking a hotel, you will be able to see your ___ in VR first.", answer: "accommodation" },
      { text: "As ___ VR equipment becomes cheaper, more people will be able to use it.", answer: "advanced" },
    ],
  },
  preCheck: {
    label: "Pre-Reading Check", type: "mcq",
    question: "What is Virtual Reality (VR)?",
    options: [
      "A type of video game on a normal screen",
      "A computer-made world experienced with a headset",
      "A way to make phone calls",
      "A type of camera used in films",
    ],
    correct: 1,
  },
  paragraphs: [
    {
      emoji: "🥽", label: "Paragraph 1",
      text: "Drawing, sculpting, storytelling and even films are some of the different ways that people have tried to recreate reality. But it's only in the past fifty years that technology has advanced enough to allow people to experience other environments using virtual reality (VR) 3D headsets. The next step in VR development will be that users get a complete interactive experience of the environment they are exploring. They will be able to see, touch and hear everything in their VR environment.",
      task: {
        type: "multi_truefalse", label: "Task 1 — TRUE or FALSE",
        statements: [
          { text: "People have been using VR 3D headsets for hundreds of years.", correct: false },
          { text: "In the future, VR will give users a complete interactive experience.", correct: true },
          { text: "VR users will be able to see, touch, and hear things in their environment.", correct: true },
        ],
      },
    },
    {
      emoji: "🎮", label: "Paragraph 2",
      text: "The first use for total experience VR is in the gaming industry. Imagine how gamers could actually play golf on a VR golf course or really drive a Formula 1 racing car! The possibilities are endless. But VR won't just be for fun and games. It will also be a massive leap forward for education. It will transform how people learn different skills and subjects. Learning to drive a car, fly a plane or even perform brain surgery will be absolutely risk-free.",
      task: {
        type: "multi_mcq", label: "Task 2 — MULTIPLE CHOICE",
        questions: [
          { question: "What is the FIRST industry to use total experience VR?", options: ["Healthcare", "The gaming industry", "Education", "Online shopping"], correct: 1 },
          { question: "VR will make learning to drive, fly or do brain surgery…", options: ["More expensive", "Only for experts", "Absolutely risk-free", "Impossible"], correct: 2 },
          { question: "According to paragraph 2, what does VR offer education?", options: ["A way to replace teachers", "A massive leap forward", "A cheaper option than books", "A way to make students play games"], correct: 1 },
        ],
      },
    },
    {
      emoji: "🏫", label: "Paragraph 3",
      text: "Also, students won't need a textbook to learn about life in the Middle Ages as they will be able to visit a medieval village and spend the day living the life of a 14th century peasant or as a nobleman in his castle. Already, there are educational apps which allow students to use VR headsets and go on exciting virtual school trips to museums, coral reefs, rainforests and many more! Imagine seeing space through the eyes of an astronaut — what a lesson that would be! Or going to places like the Amazon Rainforest — without even leaving the classroom.",
      task: {
        type: "gapfill", label: "Task 3 — GAP FILL",
        wordbank: ["textbook", "peasant", "astronaut", "classroom", "coral reefs"],
        sentences: [
          { text: "In the future, students will not need a ___ to learn history.", answer: "textbook" },
          { text: "With VR, you can live as a ___ in a medieval village.", answer: "peasant" },
          { text: "Students can already visit ___ on virtual school trips.", answer: "coral reefs" },
          { text: "You could see space through the eyes of an ___ using VR.", answer: "astronaut" },
          { text: "All of this can happen without leaving the ___.", answer: "classroom" },
        ],
      },
    },
    {
      emoji: "🛍️", label: "Paragraph 4",
      text: "Also, it won't be long before we use VR for online shopping. Nowadays, when we buy things online, we can only see photos of products, but with VR devices we will be able to tour virtual shops and even touch the products we are interested in! But that's not all. Have you ever been disappointed by a holiday you booked online? Well, in the future you will be able to take a virtual tour of your accommodation before you make any decisions! There is simply no limit to the ways we will be able to use Virtual Reality.",
      task: {
        type: "multi_truefalse", label: "Task 4 — TRUE or FALSE",
        statements: [
          { text: "When we shop online today, we can touch and test the products.", correct: false },
          { text: "With VR shopping, you will be able to tour a virtual shop and touch products.", correct: true },
          { text: "Before booking a holiday, VR will let you visit your accommodation first.", correct: true },
        ],
      },
    },
    {
      emoji: "🌟", label: "Paragraph 5",
      text: "As advanced VR equipment becomes more affordable, it's going to reach more and more people. It looks set to be a digital revolution that will change the way we live, learn, work and play forever! Virtual Reality is going to completely change the way we see our world and we will even be able to control reality for our own benefit. It's an exciting future. Aren't you looking forward to it?",
      task: {
        type: "mixed_p5", label: "Task 5 — MULTIPLE CHOICE + SHORT",
        questions: [
          { question: "Why will VR reach more people in the future?", options: ["Because governments will give it to everyone", "Because VR equipment will become more affordable", "Because VR is already free", "Because schools will make it compulsory"], correct: 1 },
          { question: "According to the writer, VR will change the way we…", options: ["Only play games", "Only shop online", "Live, learn, work and play", "Travel by plane"], correct: 2 },
        ],
        shortAnswer: "In your own words, why does the writer think the future is exciting? Write 1–2 sentences.",
      },
    },
  ],
  postReading: [
    { id: "q1", question: "VR will transform education because… (complete the sentence using your own ideas)", hint: "Think about what VR allows students to do that a normal classroom cannot..." },
    { id: "q2", question: "Using VR, students can explore… without… (complete using your own ideas)", hint: "Think about places students could visit — rainforests, space, museums..." },
    { id: "q3", question: "Choose ONE: A) 'VR will completely change education.' Do you agree? Why? — B) What is the BEST use of VR? — C) Are there dangers with using VR too much? Write 4–6 sentences using at least 3 vocabulary words.", hint: "Use: 'I think / I believe / In my opinion… One reason is… However… To sum up...'" },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const Btn = ({ children, onClick, color = C.accent, disabled = false, style = {}, variant = "solid" }) => {
  const isAccent = color === C.accent;
  const baseStyle = variant === "ghost" ? {
    background: "transparent", color: color, border: `1.5px solid ${color}40`,
  } : disabled ? {
    background: C.cardHi, color: C.textMuted, border: "1.5px solid transparent",
  } : {
    background: isAccent ? `linear-gradient(135deg, ${C.accent} 0%, #0fc8a4 100%)` : color,
    color: "#0a1420",
    border: "1.5px solid transparent",
    boxShadow: isAccent ? `0 4px 20px ${C.accentGlow}` : "none",
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...baseStyle,
      borderRadius: 12, padding: "13px 26px",
      fontFamily: FONT, fontWeight: 700, fontSize: 14,
      letterSpacing: "0.01em",
      cursor: disabled ? "default" : "pointer",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      ...style,
    }}>{children}</button>
  );
};

const Input = ({ label, type = "text", value, onChange, placeholder }) => (
  <div style={{ marginBottom: 18 }}>
    {label && <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: "100%", background: C.surface, border: `1.5px solid ${C.divider}`,
        borderRadius: 12, padding: "14px 16px", color: C.text, fontFamily: FONT, fontSize: 14,
        outline: "none", boxSizing: "border-box", transition: "all 0.2s",
      }}
      onFocus={e => e.target.style.borderColor = C.accent}
      onBlur={e => e.target.style.borderColor = C.divider}
    />
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.card, borderRadius: 20, padding: 26,
    border: `1px solid ${C.divider}`,
    boxShadow: C.shadow,
    marginBottom: 20, ...style,
  }}>{children}</div>
);

const SectionHeader = ({ icon, label, color, hint, count }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: hint ? 6 : 0 }}>
      <div style={{
        padding: "8px 16px", borderRadius: 24,
        background: color + "20", color, fontWeight: 800, fontSize: 14,
        letterSpacing: "0.02em",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: 18 }}>{icon}</span> {label}
      </div>
      {count && <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 600 }}>{count}</div>}
    </div>
    {hint && <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>{hint}</p>}
  </div>
);

const speakWord = (word) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(word);
  u.lang = "en-GB"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

const fmt = (str) => new Date(str).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const encodePayload = (data) => JSON.stringify(data);
const decodePayload = (str) => { if (!str) return null; try { return JSON.parse(str); } catch { return null; } };

// ─── VOCAB CARD ───────────────────────────────────────────────────────────────
function VocabCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div style={{ perspective: 1000 }}>
      <div
        onClick={() => setFlipped(!flipped)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ cursor: "pointer", height: 170, transform: hover ? "translateY(-3px)" : "none", transition: "transform 0.25s ease" }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none", transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          {/* Front */}
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            background: `linear-gradient(145deg, ${C.card} 0%, ${C.cardHi} 100%)`,
            borderRadius: 18,
            border: `1px solid ${hover ? C.accentBorder : C.divider}`,
            boxShadow: hover ? `0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px ${C.accentBorder}` : "0 4px 16px rgba(0,0,0,0.25)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 8, padding: 12,
            transition: "all 0.25s ease",
          }}>
            <div style={{ fontSize: 36, lineHeight: 1, marginBottom: 2 }}>{item.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, textAlign: "center", letterSpacing: "0.01em" }}>{item.word}</div>
            <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "monospace", padding: "2px 8px", background: C.surface, borderRadius: 12 }}>{item.ipa}</div>
            <div style={{ fontSize: 9, color: C.textMuted, marginTop: 4, opacity: 0.7, letterSpacing: "0.08em" }}>FLIP CARD ↻</div>
          </div>
          {/* Back */}
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)",
            background: `linear-gradient(145deg, ${C.accentSoft} 0%, ${C.card} 100%)`,
            borderRadius: 18, border: `1px solid ${C.accentBorder}`,
            display: "flex", flexDirection: "column", justifyContent: "center", padding: 14, gap: 8,
          }}>
            <div style={{ fontSize: 10, color: C.accent, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.pos}</div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, fontWeight: 500 }}>{item.definition}</div>
            <div style={{ fontSize: 11, color: C.textDim, fontStyle: "italic", lineHeight: 1.4, paddingTop: 6, borderTop: `1px solid ${C.divider}` }}>"{item.example}"</div>
          </div>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); speakWord(item.word); }}
        style={{
          width: "100%", marginTop: 8, padding: "8px 0",
          background: C.surface, border: `1px solid ${C.divider}`, borderRadius: 10,
          color: C.accent, cursor: "pointer", fontSize: 12, fontWeight: 600,
          fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = C.accentSoft; e.currentTarget.style.borderColor = C.accentBorder; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.divider; }}
      >
        🔊 Listen
      </button>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [name, setName] = useState(""); const [msg, setMsg] = useState(""); const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); setMsg("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMsg("❌ " + error.message); setLoading(false); return; }
    onLogin(data.user); setLoading(false);
  };

  const handleRegister = async () => {
    if (!name) { setMsg("❌ Please enter your name"); return; }
    setLoading(true); setMsg("");
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    if (error) { setMsg("❌ " + error.message); setLoading(false); return; }
    if (data.user) await supabase.from("profiles").upsert({ id: data.user.id, full_name: name, email, role: email === ADMIN_EMAIL ? "admin" : "student" });
    setMsg("✅ Registered! Now log in."); setMode("login"); setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bgGradient, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: FONT }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 72, height: 72, borderRadius: 22,
            background: `linear-gradient(135deg, ${C.accent} 0%, ${C.stage1} 100%)`,
            boxShadow: `0 12px 36px ${C.accentGlow}`,
            fontSize: 36, marginBottom: 18,
          }}>🎓</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: "-0.02em" }}>Hearing Platform</h1>
          <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.5 }}>Educational platform for hearing-impaired students</p>
        </div>
        <Card>
          <div style={{ display: "flex", marginBottom: 26, background: C.surface, borderRadius: 12, padding: 4 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "11px", border: "none", borderRadius: 9,
                background: mode === m ? `linear-gradient(135deg, ${C.accent}, #0fc8a4)` : "transparent",
                color: mode === m ? "#0a1420" : C.textMuted,
                fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all 0.2s",
                fontFamily: FONT,
              }}>{m === "login" ? "Log In" : "Register"}</button>
            ))}
          </div>
          {mode === "register" && <Input label="Full Name" value={name} onChange={setName} placeholder="Your name" />}
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          {msg && <div style={{ marginBottom: 16, padding: "12px 16px", borderRadius: 12, background: msg.startsWith("✅") ? C.successSoft : C.errorSoft, color: msg.startsWith("✅") ? C.success : C.error, fontSize: 13, fontWeight: 500 }}>{msg}</div>}
          <Btn onClick={mode === "login" ? handleLogin : handleRegister} disabled={loading} style={{ width: "100%" }}>
            {loading ? "Please wait..." : mode === "login" ? "Log In →" : "Create Account →"}
          </Btn>
        </Card>
      </div>
    </div>
  );
}

// ─── INTERACTIVE TASK COMPONENTS ──────────────────────────────────────────────
function SingleMCQ({ question, options, correct, onResult, disabled }) {
  const [sel, setSel] = useState(null); const [checked, setChecked] = useState(false);
  const isCorrect = sel === correct;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: 600, color: C.text, marginBottom: 14, fontSize: 14, lineHeight: 1.5 }}>{question}</div>
      {options.map((opt, i) => {
        let bg = C.surface, border = C.divider, color = C.text;
        if (checked) {
          if (i === correct) { bg = C.successSoft; border = C.success; color = C.success; }
          else if (i === sel) { bg = C.errorSoft; border = C.error; color = C.error; }
        } else if (i === sel) { bg = C.accentSoft; border = C.accent; color = C.accent; }
        return (
          <button key={i} onClick={() => !checked && !disabled && setSel(i)} style={{
            display: "block", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8,
            background: bg, border: `1.5px solid ${border}`, borderRadius: 12, color,
            cursor: (checked || disabled) ? "default" : "pointer", fontSize: 14, fontFamily: FONT,
            transition: "all 0.2s", fontWeight: 500,
          }}>
            {checked && i === correct ? "✓ " : ""}{checked && i === sel && i !== correct ? "✗ " : ""}{String.fromCharCode(65 + i)}. {opt}
          </button>
        );
      })}
      {!checked && !disabled && (
        <Btn onClick={() => { if (sel !== null) { setChecked(true); onResult && onResult(sel, isCorrect); } }} disabled={sel === null} style={{ marginTop: 4 }}>
          Check →
        </Btn>
      )}
      {checked && <div style={{ fontSize: 13, color: isCorrect ? C.success : C.error, marginTop: 10, fontWeight: 600 }}>{isCorrect ? "✓ Correct!" : `✗ Correct: ${options[correct]}`}</div>}
    </div>
  );
}

function SingleTF({ statement, correct, onResult, disabled }) {
  const [sel, setSel] = useState(null); const [checked, setChecked] = useState(false);
  const isCorrect = sel === correct;
  return (
    <div>
      <div style={{ fontSize: 14, color: C.text, marginBottom: 12, lineHeight: 1.6 }}>{statement}</div>
      <div style={{ display: "flex", gap: 10 }}>
        {[true, false].map(val => {
          let bg = C.surface, border = C.divider, color = C.textMuted;
          if (checked) {
            if (val === correct) { bg = C.successSoft; border = C.success; color = C.success; }
            else if (val === sel) { bg = C.errorSoft; border = C.error; color = C.error; }
          } else if (val === sel) { bg = C.accentSoft; border = C.accent; color = C.accent; }
          return (
            <button key={String(val)} onClick={() => !checked && !disabled && setSel(val)}
              style={{
                flex: 1, padding: "12px", background: bg, border: `1.5px solid ${border}`,
                borderRadius: 12, color, fontWeight: 700, fontSize: 14,
                cursor: (checked || disabled) ? "default" : "pointer", fontFamily: FONT,
                transition: "all 0.2s",
              }}>
              {val ? "TRUE" : "FALSE"}
            </button>
          );
        })}
        {!checked && !disabled && sel !== null && (
          <Btn onClick={() => { setChecked(true); onResult && onResult(sel, isCorrect); }} style={{ padding: "12px 18px" }}>
            Check →
          </Btn>
        )}
      </div>
      {checked && <div style={{ fontSize: 13, color: isCorrect ? C.success : C.error, marginTop: 10, fontWeight: 600 }}>{isCorrect ? "✓ Correct!" : `✗ Correct: ${correct ? "TRUE" : "FALSE"}`}</div>}
    </div>
  );
}

const ScoreBadge = ({ correct, total }) => (
  <div style={{
    padding: "12px 18px", borderRadius: 14,
    background: `linear-gradient(135deg, ${C.accentSoft}, ${C.successSoft})`,
    border: `1px solid ${C.accentBorder}`, fontSize: 14, fontWeight: 700, color: C.text,
    marginBottom: 14, display: "flex", alignItems: "center", gap: 10,
  }}>
    <span style={{ fontSize: 20 }}>✅</span> Score: <span style={{ color: C.accent, fontSize: 18 }}>{correct}/{total}</span>
  </div>
);

function MultiTrueFalseTask({ task, onContinue }) {
  const total = task.statements.length;
  const [results, setResults] = useState({});
  const allDone = Object.keys(results).length === total;
  const score = Object.values(results).filter(r => r.ic).length;
  return (
    <div>
      <div style={{ fontSize: 11, color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16, fontWeight: 800 }}>{task.label}</div>
      {task.statements.map((s, i) => (
        <div key={i} style={{ background: C.surface, borderRadius: 14, padding: "16px 18px", marginBottom: 12, border: `1px solid ${C.divider}` }}>
          <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 8, fontWeight: 600, letterSpacing: "0.05em" }}>STATEMENT {i + 1}</div>
          <SingleTF statement={s.text} correct={s.correct}
            onResult={(sel, ic) => setResults(p => ({ ...p, [i]: { sel, ic } }))}
            disabled={!!results[i]} />
        </div>
      ))}
      {allDone && (
        <div style={{ marginTop: 14 }}>
          <ScoreBadge correct={score} total={total} />
          <Btn onClick={() => onContinue({
            type: "multi_truefalse",
            answers: task.statements.map((s, i) => ({ chosen: results[i]?.sel, correct: s.correct })),
            score: { correct: score, total },
          })} style={{ width: "100%" }}>Continue →</Btn>
        </div>
      )}
    </div>
  );
}

function MultiMCQTask({ task, onContinue }) {
  const total = task.questions.length;
  const [results, setResults] = useState({});
  const allDone = Object.keys(results).length === total;
  const score = Object.values(results).filter(r => r.ic).length;
  return (
    <div>
      <div style={{ fontSize: 11, color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16, fontWeight: 800 }}>{task.label}</div>
      {task.questions.map((q, i) => (
        <div key={i} style={{ background: C.surface, borderRadius: 14, padding: "16px 18px", marginBottom: 12, border: `1px solid ${C.divider}` }}>
          <SingleMCQ question={`${i + 1}. ${q.question}`} options={q.options} correct={q.correct}
            onResult={(sel, ic) => setResults(p => ({ ...p, [i]: { sel, ic } }))}
            disabled={!!results[i]} />
        </div>
      ))}
      {allDone && (
        <div style={{ marginTop: 14 }}>
          <ScoreBadge correct={score} total={total} />
          <Btn onClick={() => onContinue({
            type: "multi_mcq",
            answers: task.questions.map((q, i) => ({ chosen: results[i]?.sel, correct: q.correct })),
            score: { correct: score, total },
          })} style={{ width: "100%" }}>Continue →</Btn>
        </div>
      )}
    </div>
  );
}

const WordChip = ({ word, used, selected, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    style={{
      padding: "7px 14px",
      background: selected ? `linear-gradient(135deg, ${C.accent}, #0fc8a4)` : used ? C.card : C.accentSoft,
      border: `1.5px solid ${selected ? C.accent : used ? C.divider : C.accentBorder}`,
      borderRadius: 24, color: selected ? "#0a1420" : used ? C.textMuted : C.accent,
      fontSize: 13, fontWeight: 600, cursor: disabled ? "default" : "pointer",
      fontFamily: FONT, transition: "all 0.2s",
    }}>
    {word}
  </button>
);

function GapFillTask({ task, onContinue }) {
  const [answers, setAnswers] = useState({});
  const [usedWords, setUsedWords] = useState([]);
  const [checked, setChecked] = useState(false);
  const total = task.sentences.length;
  const allFilled = Object.keys(answers).length === total;
  const score = task.sentences.filter((s, i) => answers[i] === s.answer).length;

  const handleSelect = (sentIdx, word) => {
    if (checked) return;
    if (answers[sentIdx] === word) {
      setAnswers(p => { const n = { ...p }; delete n[sentIdx]; return n; });
      setUsedWords(p => p.filter(w => w !== word));
    } else {
      if (answers[sentIdx]) setUsedWords(p => p.filter(w => w !== answers[sentIdx]));
      setAnswers(p => ({ ...p, [sentIdx]: word }));
      setUsedWords(p => [...p.filter(w => w !== word), word]);
    }
  };

  return (
    <div>
      <div style={{ fontSize: 11, color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14, fontWeight: 800 }}>{task.label}</div>
      <div style={{ background: C.surface, borderRadius: 14, padding: "14px 18px", marginBottom: 16, border: `1px solid ${C.divider}` }}>
        <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10, fontWeight: 700, letterSpacing: "0.06em" }}>📖 WORD BANK</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {task.wordbank.map(w => <WordChip key={w} word={w} used={usedWords.includes(w)} />)}
        </div>
      </div>
      {task.sentences.map((s, i) => {
        const parts = s.text.split("___"); const userAns = answers[i];
        const isCorrect = checked ? userAns === s.answer : null;
        return (
          <div key={i} style={{
            background: C.surface, borderRadius: 14, padding: "16px 18px", marginBottom: 12,
            border: `1.5px solid ${checked ? (isCorrect ? C.success + "60" : C.error + "60") : C.divider}`,
          }}>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7, marginBottom: 10 }}>
              <span style={{ fontWeight: 700, color: C.textMuted, marginRight: 6 }}>{i + 1}.</span>{parts[0]}
              <span style={{
                display: "inline-block", minWidth: 110, textAlign: "center",
                borderBottom: `2px solid ${checked ? (isCorrect ? C.success : C.error) : C.accent}`,
                margin: "0 6px", padding: "2px 10px",
                color: checked ? (isCorrect ? C.success : C.error) : C.accent, fontWeight: 700,
                background: checked ? (isCorrect ? C.successSoft : C.errorSoft) : C.accentSoft,
                borderRadius: "8px 8px 0 0",
              }}>
                {userAns || "_____"}
              </span>
              {parts[1]}
            </div>
            {!checked && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {task.wordbank.filter(w => !usedWords.includes(w) || answers[i] === w).map(w => (
                  <WordChip key={w} word={w} selected={answers[i] === w} onClick={() => handleSelect(i, w)} />
                ))}
              </div>
            )}
            {checked && <div style={{ fontSize: 12, color: isCorrect ? C.success : C.error, marginTop: 6, fontWeight: 600 }}>{isCorrect ? "✓ Correct!" : `✗ Correct: ${s.answer}`}</div>}
          </div>
        );
      })}
      {!checked && <Btn onClick={() => setChecked(true)} disabled={!allFilled} style={{ marginTop: 8 }}>Check All →</Btn>}
      {checked && (
        <div style={{ marginTop: 14 }}>
          <ScoreBadge correct={score} total={total} />
          <Btn onClick={() => onContinue({
            type: "gapfill",
            answers: task.sentences.map((s, i) => ({ chosen: answers[i] || "", correct: s.answer })),
            score: { correct: score, total },
          })} style={{ width: "100%" }}>Continue →</Btn>
        </div>
      )}
    </div>
  );
}

function MixedP5Task({ task, onContinue }) {
  const [mcqResults, setMcqResults] = useState({});
  const [shortAnswer, setShortAnswer] = useState("");
  const [shortSubmitted, setShortSubmitted] = useState(false);
  const mcqDone = Object.keys(mcqResults).length === task.questions.length;
  const allDone = mcqDone && shortSubmitted;
  const score = Object.values(mcqResults).filter(r => r.ic).length;
  return (
    <div>
      <div style={{ fontSize: 11, color: C.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16, fontWeight: 800 }}>{task.label}</div>
      {task.questions.map((q, i) => (
        <div key={i} style={{ background: C.surface, borderRadius: 14, padding: "16px 18px", marginBottom: 12, border: `1px solid ${C.divider}` }}>
          <SingleMCQ question={`${i + 1}. ${q.question}`} options={q.options} correct={q.correct}
            onResult={(sel, ic) => setMcqResults(p => ({ ...p, [i]: { sel, ic } }))}
            disabled={!!mcqResults[i]} />
        </div>
      ))}
      {mcqDone && (
        <div style={{ background: C.surface, borderRadius: 14, padding: "16px 18px", marginBottom: 12, border: `1px solid ${C.goldBorder}` }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 12 }}>3. {task.shortAnswer}</div>
          <textarea value={shortAnswer} onChange={e => setShortAnswer(e.target.value)} disabled={shortSubmitted} placeholder="Write 1–2 sentences here..."
            style={{
              width: "100%", minHeight: 90, background: C.bg, border: `1.5px solid ${shortSubmitted ? C.success + "60" : C.divider}`,
              borderRadius: 12, padding: 14, color: C.text, fontFamily: FONT, fontSize: 14,
              resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.6,
            }} />
          {!shortSubmitted && <Btn onClick={() => { if (shortAnswer.trim()) setShortSubmitted(true); }} disabled={!shortAnswer.trim()} color={C.gold} style={{ marginTop: 12 }}>Save Answer →</Btn>}
          {shortSubmitted && <div style={{ marginTop: 10, color: C.success, fontSize: 13, fontWeight: 600 }}>✅ Saved</div>}
        </div>
      )}
      {allDone && (
        <div style={{ marginTop: 14 }}>
          <ScoreBadge correct={score} total={task.questions.length} />
          <Btn onClick={() => onContinue({
            type: "mixed_p5",
            mcqAnswers: task.questions.map((q, i) => ({ chosen: mcqResults[i]?.sel, correct: q.correct })),
            shortAnswer,
            score: { correct: score, total: task.questions.length },
          })} style={{ width: "100%" }}>Continue →</Btn>
        </div>
      )}
    </div>
  );
}

function VocabMatchTask({ task, onDone }) {
  const [selections, setSelections] = useState({});
  const [checked, setChecked] = useState(false);
  const allSelected = Object.keys(selections).length === task.words.length;
  const score = task.words.filter((_, i) => selections[i] === task.answers[i]).length;
  return (
    <Card>
      <SectionHeader icon="📋" label={task.label} color={C.stage1} hint={task.instruction} />
      <div style={{
        background: C.surface, borderRadius: 14, padding: "16px 20px", marginBottom: 18,
        border: `1px solid ${C.divider}`,
      }}>
        {task.definitions.map(d => (
          <div key={d.letter} style={{ fontSize: 13, color: C.text, marginBottom: 8, lineHeight: 1.5, display: "flex", gap: 10 }}>
            <span style={{
              width: 26, height: 26, borderRadius: "50%",
              background: C.stage1Soft, color: C.stage1, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
              flexShrink: 0,
            }}>{d.letter}</span>
            <span>{d.text}</span>
          </div>
        ))}
      </div>
      {task.words.map((word, i) => {
        const sel = selections[i]; const isCorrect = checked ? sel === task.answers[i] : null;
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 10, padding: "12px 16px",
            background: C.surface, borderRadius: 14,
            border: `1.5px solid ${checked ? (isCorrect ? C.success + "60" : C.error + "60") : C.divider}`,
            flexWrap: "wrap",
          }}>
            <div style={{ fontWeight: 700, color: C.text, fontSize: 14, minWidth: 130 }}>
              <span style={{ color: C.textMuted, marginRight: 6 }}>{i + 1}.</span>{word}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {task.definitions.map(d => (
                <button key={d.letter} onClick={() => !checked && setSelections(p => ({ ...p, [i]: d.letter }))}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: sel === d.letter ? `linear-gradient(135deg, ${C.stage1}, #6770ff)` : C.card,
                    color: sel === d.letter ? "#fff" : C.textMuted,
                    border: `1.5px solid ${sel === d.letter ? C.stage1 : C.divider}`,
                    fontWeight: 800, fontSize: 13,
                    cursor: checked ? "default" : "pointer", fontFamily: FONT,
                    transition: "all 0.2s",
                    boxShadow: sel === d.letter ? `0 4px 12px ${C.stage1}40` : "none",
                  }}>{d.letter}</button>
              ))}
            </div>
            {checked && <div style={{ fontSize: 13, color: isCorrect ? C.success : C.error, marginLeft: "auto", fontWeight: 700 }}>{isCorrect ? "✓" : `✗ → ${task.answers[i]}`}</div>}
          </div>
        );
      })}
      {!checked && <Btn onClick={() => setChecked(true)} disabled={!allSelected} style={{ marginTop: 12, width: "100%" }}>Check Answers →</Btn>}
      {checked && (
        <div style={{ marginTop: 14 }}>
          <ScoreBadge correct={score} total={task.words.length} />
          <Btn onClick={() => onDone({
            type: "vocab_match",
            answers: task.words.map((_, i) => ({ chosen: selections[i] || "", correct: task.answers[i] })),
            score: { correct: score, total: task.words.length },
          })} style={{ width: "100%" }}>Continue to Vocabulary Task 2 →</Btn>
        </div>
      )}
    </Card>
  );
}

function VocabGapFillTask({ task, onDone }) {
  const [answers, setAnswers] = useState({});
  const [usedWords, setUsedWords] = useState([]);
  const [checked, setChecked] = useState(false);
  const total = task.sentences.length;
  const allFilled = Object.keys(answers).length === total;
  const score = task.sentences.filter((s, i) => answers[i] === s.answer).length;
  const handleSelect = (sentIdx, word) => {
    if (checked) return;
    if (answers[sentIdx] === word) {
      setAnswers(p => { const n = { ...p }; delete n[sentIdx]; return n; });
      setUsedWords(p => p.filter(w => w !== word));
    } else {
      if (answers[sentIdx]) setUsedWords(p => p.filter(w => w !== answers[sentIdx]));
      setAnswers(p => ({ ...p, [sentIdx]: word }));
      setUsedWords(p => [...p.filter(w => w !== word), word]);
    }
  };
  return (
    <Card>
      <SectionHeader icon="📋" label={task.label} color={C.stage1} hint={task.instruction} />
      <div style={{ background: C.surface, borderRadius: 14, padding: "14px 18px", marginBottom: 16, border: `1px solid ${C.divider}` }}>
        <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10, fontWeight: 700, letterSpacing: "0.06em" }}>📖 WORD BANK</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {task.wordbank.map(w => <WordChip key={w} word={w} used={usedWords.includes(w)} />)}
        </div>
      </div>
      {task.sentences.map((s, i) => {
        const parts = s.text.split("___"); const userAns = answers[i];
        const isCorrect = checked ? userAns === s.answer : null;
        return (
          <div key={i} style={{
            background: C.surface, borderRadius: 14, padding: "16px 18px", marginBottom: 12,
            border: `1.5px solid ${checked ? (isCorrect ? C.success + "60" : C.error + "60") : C.divider}`,
          }}>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7, marginBottom: 10 }}>
              <span style={{ fontWeight: 700, color: C.textMuted, marginRight: 6 }}>{i + 1}.</span>{parts[0]}
              <span style={{
                display: "inline-block", minWidth: 110, textAlign: "center",
                borderBottom: `2px solid ${checked ? (isCorrect ? C.success : C.error) : C.accent}`,
                margin: "0 6px", padding: "2px 10px",
                color: checked ? (isCorrect ? C.success : C.error) : C.accent, fontWeight: 700,
                background: checked ? (isCorrect ? C.successSoft : C.errorSoft) : C.accentSoft,
                borderRadius: "8px 8px 0 0",
              }}>{userAns || "_____"}</span>
              {parts[1]}
            </div>
            {!checked && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {task.wordbank.filter(w => !usedWords.includes(w) || answers[i] === w).map(w => (
                  <WordChip key={w} word={w} selected={answers[i] === w} onClick={() => handleSelect(i, w)} />
                ))}
              </div>
            )}
            {checked && <div style={{ fontSize: 12, color: isCorrect ? C.success : C.error, marginTop: 6, fontWeight: 600 }}>{isCorrect ? "✓ Correct!" : `✗ Correct: ${s.answer}`}</div>}
          </div>
        );
      })}
      {!checked && <Btn onClick={() => setChecked(true)} disabled={!allFilled} style={{ marginTop: 12, width: "100%" }}>Check Answers →</Btn>}
      {checked && (
        <div style={{ marginTop: 14 }}>
          <ScoreBadge correct={score} total={total} />
          <Btn onClick={() => onDone({
            type: "gapfill",
            answers: task.sentences.map((s, i) => ({ chosen: answers[i] || "", correct: s.answer })),
            score: { correct: score, total },
          })} style={{ width: "100%" }}>Continue to Knowledge Check →</Btn>
        </div>
      )}
    </Card>
  );
}

// ─── TEACHER REVIEW COMPONENTS (read-only) ────────────────────────────────────
function ReviewMCQ({ question, options, payload }) {
  return (
    <div style={{ marginBottom: 14, background: C.card, borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.divider}` }}>
      <div style={{ fontWeight: 600, color: C.text, marginBottom: 12, fontSize: 14, lineHeight: 1.5 }}>{question}</div>
      {options.map((opt, i) => {
        const chosen = payload?.chosen === i; const isCorrect = payload?.correct === i;
        let bg = C.surface, border = C.divider, color = C.textDim, prefix = "";
        if (isCorrect) { bg = C.successSoft; border = C.success + "60"; color = C.success; prefix = "✓ "; }
        if (chosen && !isCorrect) { bg = C.errorSoft; border = C.error + "60"; color = C.error; prefix = "✗ "; }
        return (
          <div key={i} style={{ padding: "10px 14px", marginBottom: 6, background: bg, border: `1.5px solid ${border}`, borderRadius: 10, color, fontSize: 13, display: "flex", alignItems: "center", gap: 10, fontWeight: 500 }}>
            <span style={{ minWidth: 18 }}>{prefix}</span>
            <span style={{ flex: 1 }}>{String.fromCharCode(65 + i)}. {opt}</span>
            {chosen && <span style={{ fontSize: 9, padding: "3px 9px", borderRadius: 20, background: isCorrect ? C.success + "30" : C.error + "30", color: isCorrect ? C.success : C.error, fontWeight: 800, letterSpacing: "0.05em" }}>STUDENT</span>}
          </div>
        );
      })}
    </div>
  );
}

function ReviewTF({ statement, payload }) {
  const chosen = payload?.chosen; const correctVal = payload?.correct;
  return (
    <div style={{ marginBottom: 12, background: C.card, borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.divider}` }}>
      <div style={{ fontSize: 13, color: C.text, marginBottom: 12, lineHeight: 1.5 }}>{statement}</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[true, false].map(val => {
          const isChosen = chosen === val; const isCorrect = correctVal === val;
          let bg = C.surface, border = C.divider, color = C.textMuted, prefix = "";
          if (isCorrect) { bg = C.successSoft; border = C.success + "60"; color = C.success; prefix = "✓ "; }
          if (isChosen && !isCorrect) { bg = C.errorSoft; border = C.error + "60"; color = C.error; prefix = "✗ "; }
          return (
            <div key={String(val)} style={{
              flex: 1, padding: "10px", background: bg, border: `1.5px solid ${border}`,
              borderRadius: 10, color, fontWeight: 700, fontSize: 13, textAlign: "center",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              {prefix}{val ? "TRUE" : "FALSE"}
              {isChosen && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: isCorrect ? C.success + "30" : C.error + "30", color: isCorrect ? C.success : C.error, fontWeight: 800 }}>STUDENT</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewGapFill({ wordbank, sentences, payload }) {
  const answers = payload?.answers || [];
  return (
    <div>
      <div style={{ background: C.card, borderRadius: 12, padding: "12px 16px", marginBottom: 12, fontSize: 12, color: C.textDim, border: `1px solid ${C.divider}` }}>
        <strong style={{ color: C.textMuted, letterSpacing: "0.05em" }}>📖 WORD BANK:</strong> {wordbank.join(", ")}
      </div>
      {sentences.map((s, i) => {
        const ans = answers[i] || {}; const userAns = ans.chosen || "—"; const correctAns = ans.correct || s.answer;
        const isCorrect = userAns === correctAns; const parts = s.text.split("___");
        return (
          <div key={i} style={{ background: C.card, borderRadius: 14, padding: "14px 18px", marginBottom: 10, border: `1.5px solid ${isCorrect ? C.success + "60" : C.error + "60"}` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              <span style={{ fontWeight: 700, color: C.textMuted, marginRight: 6 }}>{i + 1}.</span>{parts[0]}
              <span style={{
                display: "inline-block", minWidth: 90, textAlign: "center",
                background: isCorrect ? C.successSoft : C.errorSoft,
                borderBottom: `2px solid ${isCorrect ? C.success : C.error}`,
                margin: "0 6px", padding: "2px 10px", borderRadius: "6px 6px 0 0",
                color: isCorrect ? C.success : C.error, fontWeight: 700,
              }}>{userAns}</span>
              {parts[1]}
            </div>
            {!isCorrect && <div style={{ fontSize: 12, color: C.success, marginTop: 8, fontWeight: 600 }}>✓ Correct: <strong>{correctAns}</strong></div>}
          </div>
        );
      })}
    </div>
  );
}

function ReviewVocabMatch({ task, payload }) {
  const answers = payload?.answers || [];
  return (
    <div>
      <div style={{ background: C.card, borderRadius: 12, padding: "12px 16px", marginBottom: 12, fontSize: 12, color: C.textDim, border: `1px solid ${C.divider}` }}>
        {task.definitions.map(d => (
          <div key={d.letter} style={{ marginBottom: 4, display: "flex", gap: 8 }}>
            <strong style={{ color: C.stage1, minWidth: 16 }}>{d.letter}.</strong>
            <span>{d.text}</span>
          </div>
        ))}
      </div>
      {task.words.map((word, i) => {
        const ans = answers[i] || {}; const userAns = ans.chosen || "—"; const correctAns = ans.correct || task.answers[i];
        const isCorrect = userAns === correctAns;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, padding: "10px 14px", background: C.card, borderRadius: 12, border: `1.5px solid ${isCorrect ? C.success + "60" : C.error + "60"}`, flexWrap: "wrap" }}>
            <div style={{ fontWeight: 600, color: C.text, fontSize: 13, minWidth: 130 }}>
              <span style={{ color: C.textMuted, marginRight: 6 }}>{i + 1}.</span>{word}
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: "0.06em" }}>STUDENT:</span>
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: isCorrect ? C.success + "30" : C.error + "30", color: isCorrect ? C.success : C.error, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{userAns}</span>
            </div>
            {!isCorrect && (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: "0.06em" }}>CORRECT:</span>
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: C.success + "30", color: C.success, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{correctAns}</span>
              </div>
            )}
            <div style={{ marginLeft: "auto", fontSize: 18, color: isCorrect ? C.success : C.error, fontWeight: 800 }}>{isCorrect ? "✓" : "✗"}</div>
          </div>
        );
      })}
    </div>
  );
}

function TeacherTaskBlock({ taskRecord }) {
  const stageColor = taskRecord.stage === "pre" ? C.stage1 : C.accent;
  const stageLabel = taskRecord.stage === "pre" ? "Pre-Reading" : "While Reading";
  const score = taskRecord.score_correct != null && taskRecord.score_total != null
    ? `${taskRecord.score_correct}/${taskRecord.score_total}` : null;
  const payload = decodePayload(taskRecord.student_answer);
  return (
    <div style={{ marginBottom: 22, background: C.surface, borderRadius: 18, padding: "20px 22px", border: `1px solid ${C.divider}` }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, padding: "4px 12px", borderRadius: 20, background: stageColor + "25", color: stageColor, fontWeight: 800, letterSpacing: "0.05em" }}>{stageLabel}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{taskRecord.task_label}</span>
        {score && (
          <span style={{
            marginLeft: "auto", fontSize: 13, fontWeight: 800,
            color: taskRecord.is_correct ? C.success : C.gold,
            background: taskRecord.is_correct ? C.successSoft : C.goldSoft,
            padding: "4px 12px", borderRadius: 20,
          }}>
            {score}
          </span>
        )}
      </div>
      <TeacherTaskRender taskRecord={taskRecord} payload={payload} />
    </div>
  );
}

function TeacherTaskRender({ taskRecord, payload }) {
  const label = taskRecord.task_label;
  if (label === lesson.vocabTask1.label) return <ReviewVocabMatch task={lesson.vocabTask1} payload={payload} />;
  if (label === lesson.vocabTask2.label) return <ReviewGapFill wordbank={lesson.vocabTask2.wordbank} sentences={lesson.vocabTask2.sentences} payload={payload} />;
  if (label === lesson.preCheck.label) return <ReviewMCQ question={lesson.preCheck.question} options={lesson.preCheck.options} payload={payload} />;
  const para = lesson.paragraphs.find(p => p.task.label === label);
  if (para) {
    const t = para.task;
    if (t.type === "multi_truefalse") {
      const answers = payload?.answers || [];
      return <div>{t.statements.map((s, i) => <ReviewTF key={i} statement={`${i + 1}. ${s.text}`} payload={answers[i] || { correct: s.correct }} />)}</div>;
    }
    if (t.type === "multi_mcq") {
      const answers = payload?.answers || [];
      return <div>{t.questions.map((q, i) => <ReviewMCQ key={i} question={`${i + 1}. ${q.question}`} options={q.options} payload={answers[i] || { correct: q.correct }} />)}</div>;
    }
    if (t.type === "gapfill") return <ReviewGapFill wordbank={t.wordbank} sentences={t.sentences} payload={payload} />;
    if (t.type === "mixed_p5") {
      const mcq = payload?.mcqAnswers || [];
      return (
        <div>
          {t.questions.map((q, i) => <ReviewMCQ key={i} question={`${i + 1}. ${q.question}`} options={q.options} payload={mcq[i] || { correct: q.correct }} />)}
          <div style={{ marginTop: 8, background: C.card, borderRadius: 14, padding: "16px 18px", border: `1.5px solid ${C.goldBorder}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>3. {t.shortAnswer}</div>
            <div style={{ background: C.surface, borderRadius: 10, padding: "12px 16px", color: C.text, fontSize: 13, lineHeight: 1.7, borderLeft: `3px solid ${C.gold}` }}>
              {payload?.shortAnswer || "—"}
            </div>
          </div>
        </div>
      );
    }
  }
  return <div style={{ fontSize: 12, color: C.textMuted }}>Raw answer: {taskRecord.student_answer}</div>;
}

function TeacherAttemptView({ att, attemptNumber }) {
  const preTasks = att.tasks.filter(t => t.stage === "pre");
  const whileTasks = att.tasks.filter(t => t.stage === "while");
  const totalCorrect = att.tasks.filter(t => t.is_correct).length;
  const totalQ = att.tasks.length;
  return (
    <div style={{ background: C.surface, borderRadius: 22, marginBottom: 32, border: `1px solid ${C.divider}`, overflow: "hidden", boxShadow: C.shadow }}>
      <div style={{
        padding: "20px 26px",
        background: `linear-gradient(135deg, ${C.surfaceHi}, ${C.card})`,
        borderBottom: `1px solid ${C.divider}`,
        display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: `linear-gradient(135deg, ${C.accent}, ${C.stage1})`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          boxShadow: `0 4px 14px ${C.accentGlow}`,
        }}>📋</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: C.text }}>Attempt #{attemptNumber}</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>Started: {fmt(att.started_at)}</div>
        </div>
        {totalQ > 0 && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, letterSpacing: "0.05em" }}>SCORE</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: C.accent, letterSpacing: "-0.02em" }}>{totalCorrect}<span style={{ color: C.textMuted, fontSize: 18 }}>/{totalQ}</span></div>
          </div>
        )}
      </div>
      <div style={{ padding: "26px" }}>
        {preTasks.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <SectionHeader icon="📖" label="Pre-Reading" color={C.stage1} />
            {preTasks.map((tr, i) => <TeacherTaskBlock key={i} taskRecord={tr} />)}
          </section>
        )}
        {whileTasks.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <SectionHeader icon="🔍" label="While Reading" color={C.accent} />
            {lesson.paragraphs.map((para, pi) => {
              const tr = whileTasks.find(t => t.task_label === para.task.label);
              if (!tr) return null;
              return (
                <div key={pi} style={{ marginBottom: 24 }}>
                  <div style={{ background: C.card, borderRadius: 16, padding: "16px 20px", marginBottom: 12, border: `1px solid ${C.divider}` }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 30, flexShrink: 0 }}>{para.emoji}</div>
                      <div>
                        <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{para.label}</div>
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: C.textDim, margin: 0 }}>{para.text}</p>
                      </div>
                    </div>
                  </div>
                  <TeacherTaskBlock taskRecord={tr} />
                </div>
              );
            })}
          </section>
        )}
        {att.tasks.length === 0 && <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>No test answers recorded yet.</div>}
        {att.responses.length > 0 && (
          <section>
            <SectionHeader icon="✍️" label="Post-Reading" color={C.gold} />
            {att.responses.map((r, ri) => (
              <div key={ri} style={{ marginBottom: 14, background: C.surface, borderRadius: 16, padding: "18px 20px", border: `1px solid ${C.goldBorder}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10, lineHeight: 1.5 }}>Q{ri + 1}. {r.question}</div>
                <div style={{ background: C.card, borderRadius: 12, padding: "14px 18px", fontSize: 14, lineHeight: 1.7, color: C.text, borderLeft: `3px solid ${C.gold}` }}>
                  {r.answer}
                </div>
              </div>
            ))}
          </section>
        )}
        {att.responses.length === 0 && att.tasks.length > 0 && (
          <div style={{ fontSize: 13, color: C.textMuted, padding: "12px 0" }}>Student hasn't submitted post-reading answers yet.</div>
        )}
      </div>
    </div>
  );
}

// ─── STUDENT PANEL ────────────────────────────────────────────────────────────
function StudentPanel({ user, onLogout }) {
  const [stage, setStage] = useState(0);
  const [preStep, setPreStep] = useState(0);
  const [paraIndex, setParaIndex] = useState(0);
  const [parasDone, setParasDone] = useState([]);
  const [postAnswers, setPostAnswers] = useState({});
  const [postSubmitted, setPostSubmitted] = useState({});
  const [attemptId, setAttemptId] = useState(null);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("attempts").insert({ user_id: user.id, lesson_title: lesson.title, started_at: new Date().toISOString() }).select().single();
      if (data) setAttemptId(data.id);
    })();
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000); };

  const saveResult = async ({ stage, taskLabel, question, payload, scoreCorrect, scoreTotal, isCorrect }) => {
    if (!attemptId) return;
    const row = {
      user_id: user.id, attempt_id: attemptId, lesson_title: lesson.title,
      stage, task_label: taskLabel, question,
      student_answer: encodePayload(payload),
      correct_answer: "",
      is_correct: isCorrect,
      answered_at: new Date().toISOString(),
    };
    if (scoreCorrect != null) row.score_correct = scoreCorrect;
    if (scoreTotal != null) row.score_total = scoreTotal;
    await supabase.from("task_results").insert(row);
  };

  const handleVocabTask1Done = async (payload) => {
    await saveResult({ stage: "pre", taskLabel: lesson.vocabTask1.label, question: lesson.vocabTask1.instruction, payload, scoreCorrect: payload.score.correct, scoreTotal: payload.score.total, isCorrect: payload.score.correct === payload.score.total });
    setPreStep(2);
  };

  const handleVocabTask2Done = async (payload) => {
    await saveResult({ stage: "pre", taskLabel: lesson.vocabTask2.label, question: lesson.vocabTask2.instruction, payload, scoreCorrect: payload.score.correct, scoreTotal: payload.score.total, isCorrect: payload.score.correct === payload.score.total });
    setPreStep(3);
  };

  const handlePreCheckResult = async (sel, ic) => {
    await saveResult({ stage: "pre", taskLabel: lesson.preCheck.label, question: lesson.preCheck.question, payload: { type: "mcq", chosen: sel, correct: lesson.preCheck.correct }, scoreCorrect: ic ? 1 : 0, scoreTotal: 1, isCorrect: ic });
    setStage(1);
  };

  const handleParaContinue = async (paraIdx, payload) => {
    const para = lesson.paragraphs[paraIdx];
    const isCorrect = payload.score ? payload.score.correct === payload.score.total : false;
    await saveResult({ stage: "while", taskLabel: para.task.label, question: para.label, payload, scoreCorrect: payload.score?.correct, scoreTotal: payload.score?.total, isCorrect });
    showToast(isCorrect ? "🎉 Well done!" : "📖 Keep going!");
    setParasDone(p => [...p, paraIdx]);
    if (paraIdx < lesson.paragraphs.length - 1) setParaIndex(paraIdx + 1);
    else setStage(2);
  };

  const submitPostAnswer = async (i) => {
    if (!postAnswers[i]?.trim() || !attemptId) return;
    setSaving(true);
    await supabase.from("student_responses").insert({ user_id: user.id, attempt_id: attemptId, question_id: lesson.postReading[i].id, question: lesson.postReading[i].question, answer: postAnswers[i] });
    setPostSubmitted(p => ({ ...p, [i]: true }));
    setSaving(false);
    showToast("✅ Answer saved!");
  };

  const restartLesson = async () => {
    setStage(0); setPreStep(0); setParaIndex(0); setParasDone([]);
    setPostAnswers({}); setPostSubmitted({}); setAttemptId(null);
    const { data } = await supabase.from("attempts").insert({ user_id: user.id, lesson_title: lesson.title, started_at: new Date().toISOString() }).select().single();
    if (data) setAttemptId(data.id);
  };

  const allSubmitted = lesson.postReading.every((_, i) => postSubmitted[i]);

  const renderWhileTask = (para, i) => {
    const props = { onContinue: (payload) => handleParaContinue(i, payload) };
    if (para.task.type === "multi_truefalse") return <MultiTrueFalseTask task={para.task} {...props} />;
    if (para.task.type === "multi_mcq") return <MultiMCQTask task={para.task} {...props} />;
    if (para.task.type === "gapfill") return <GapFillTask task={para.task} {...props} />;
    if (para.task.type === "mixed_p5") return <MixedP5Task task={para.task} {...props} />;
    return null;
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bgGradient, color: C.text, fontFamily: FONT }}>
      {toast && (
        <div style={{
          position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
          background: `linear-gradient(135deg, ${C.accent}, #0fc8a4)`, color: "#0a1420",
          padding: "13px 30px", borderRadius: 50, fontWeight: 800, zIndex: 1000, fontSize: 14,
          whiteSpace: "nowrap", boxShadow: `0 12px 36px ${C.accentGlow}`,
        }}>{toast}</div>
      )}

      {/* HEADER */}
      <div style={{ background: C.surface, padding: "18px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.divider}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${C.accent}, ${C.stage1})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: `0 4px 14px ${C.accentGlow}` }}>🎓</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>Hearing Platform</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>Welcome, {user.user_metadata?.full_name || user.email}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ background: "transparent", border: `1px solid ${C.divider}`, borderRadius: 10, padding: "9px 18px", color: C.textMuted, cursor: "pointer", fontSize: 13, fontFamily: FONT, fontWeight: 600, transition: "all 0.2s" }}>Log out</button>
      </div>

      {/* STAGE TABS */}
      <div style={{ background: C.surface, padding: "14px 26px", display: "flex", gap: 8, borderBottom: `1px solid ${C.divider}` }}>
        {[["📖", "Pre-Reading", C.stage1], ["🔍", "While Reading", C.accent], ["✍️", "Post-Reading", C.gold]].map(([icon, label, color], i) => {
          const active = stage === i; const done = stage > i;
          return (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "10px 8px", borderRadius: 12,
              background: active ? color + "20" : "transparent",
              border: `1.5px solid ${active ? color + "60" : "transparent"}`,
              fontSize: 13, color: active ? color : done ? C.success : C.textMuted,
              fontWeight: active ? 700 : 500, transition: "all 0.25s",
            }}>
              {icon} {label}{done && " ✓"}
            </div>
          );
        })}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 60px" }}>
        {stage === 0 && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>{lesson.topic.toUpperCase()}</div>
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{lesson.title}</h2>
            </div>

            {preStep === 0 && (
              <>
                <SectionHeader icon="📚" label="Key Vocabulary" color={C.stage1} hint="Tap a card to see the meaning. Press 🔊 Listen to hear pronunciation." />
                {/* CENTERED GRID with auto-fit so 10 cards lay out neatly with leftover row centered */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 160px))",
                  gap: 16, marginBottom: 32,
                  justifyContent: "center", // ← centers the grid items horizontally
                }}>
                  {lesson.vocab.map(v => <VocabCard key={v.word} item={v} />)}
                </div>
                <Btn onClick={() => setPreStep(1)} style={{ width: "100%" }}>Continue to Vocabulary Tasks →</Btn>
              </>
            )}
            {preStep === 1 && <VocabMatchTask task={lesson.vocabTask1} onDone={handleVocabTask1Done} />}
            {preStep === 2 && <VocabGapFillTask task={lesson.vocabTask2} onDone={handleVocabTask2Done} />}
            {preStep === 3 && (
              <Card>
                <SectionHeader icon="🧠" label="Quick Knowledge Check" color={C.stage1} />
                <SingleMCQ question={lesson.preCheck.question} options={lesson.preCheck.options} correct={lesson.preCheck.correct}
                  onResult={handlePreCheckResult} disabled={false} />
              </Card>
            )}
          </div>
        )}

        {stage === 1 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
              <SectionHeader icon="🔍" label="While Reading" color={C.accent} />
              <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 600, padding: "6px 14px", background: C.surface, borderRadius: 20, border: `1px solid ${C.divider}` }}>
                {parasDone.length}/{lesson.paragraphs.length} done
              </div>
            </div>
            {lesson.paragraphs.map((para, i) => {
              if (i > paraIndex) return null;
              const isActive = i === paraIndex; const isDone = parasDone.includes(i) && !isActive;
              return (
                <div key={i}>
                  <Card style={{ borderColor: isActive ? C.accentBorder : C.divider, boxShadow: isActive ? C.shadowGlow : C.shadow }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 38, flexShrink: 0, lineHeight: 1 }}>{para.emoji}</div>
                      <div>
                        <div style={{ fontSize: 11, color: isActive ? C.accent : C.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{para.label}</div>
                        <p style={{ fontSize: 15, lineHeight: 1.8, color: C.text, margin: 0 }}>{para.text}</p>
                      </div>
                    </div>
                  </Card>
                  {isActive && <Card style={{ borderColor: C.accentBorder, background: C.surfaceHi }}>{renderWhileTask(para, i)}</Card>}
                  {isDone && <div style={{ color: C.success, fontSize: 12, marginBottom: 18, marginTop: -10, fontWeight: 600 }}>✓ Completed</div>}
                </div>
              );
            })}
          </div>
        )}

        {stage === 2 && (
          <div>
            <SectionHeader icon="✍️" label="Post-Reading Questions" color={C.gold} hint="Write your answers. Your teacher will review them." />
            {lesson.postReading.map((item, i) => (
              <Card key={i} style={{ borderColor: postSubmitted[i] ? C.success + "60" : C.divider }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${C.gold}, #f59e0b)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#0a1420", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: C.text, lineHeight: 1.6, flex: 1 }}>{item.question}</div>
                </div>
                <div style={{ fontSize: 12, color: C.gold, marginBottom: 14, paddingLeft: 50, lineHeight: 1.5 }}>💡 {item.hint}</div>
                <textarea value={postAnswers[i] || ""} onChange={e => setPostAnswers(p => ({ ...p, [i]: e.target.value }))} disabled={postSubmitted[i]}
                  placeholder="Write your answer here..."
                  style={{ width: "100%", minHeight: 110, background: C.surface, border: `1.5px solid ${postSubmitted[i] ? C.success + "60" : C.divider}`, borderRadius: 12, padding: 16, color: C.text, fontFamily: FONT, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.7 }} />
                {!postSubmitted[i]
                  ? <Btn onClick={() => submitPostAnswer(i)} color={C.gold} disabled={saving || !postAnswers[i]?.trim()} style={{ marginTop: 14 }}>{saving ? "Saving..." : "Save Answer →"}</Btn>
                  : <div style={{ marginTop: 14, color: C.success, fontSize: 13, fontWeight: 600 }}>✅ Saved — your teacher will review it</div>
                }
              </Card>
            ))}
            {allSubmitted && (
              <div style={{
                textAlign: "center", padding: 44, marginTop: 12,
                background: `linear-gradient(135deg, ${C.accentSoft}, ${C.successSoft})`,
                borderRadius: 24, border: `1px solid ${C.accentBorder}`,
                boxShadow: C.shadowGlow,
              }}>
                <div style={{ fontSize: 60, marginBottom: 14 }}>🏆</div>
                <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.01em" }}>Lesson Complete!</div>
                <div style={{ color: C.textDim, fontSize: 14, marginBottom: 26, lineHeight: 1.6 }}>All your answers have been saved.<br />Great work! 🎉</div>
                <Btn onClick={restartLesson} style={{ width: "100%" }}>🔄 Restart Lesson</Btn>
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
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStudent, setLoadingStudent] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("profiles").select("*").eq("role", "student").order("created_at", { ascending: false });
      setStudents(data || []); setLoading(false);
    })();
  }, []);

  const loadStudent = async (student) => {
    setSelected(student); setAttempts([]); setLoadingStudent(true);
    const { data: atts } = await supabase.from("attempts").select("*").eq("user_id", student.id).order("started_at", { ascending: false });
    if (!atts || atts.length === 0) { setAttempts([]); setLoadingStudent(false); return; }
    const enriched = await Promise.all(atts.map(async (att) => {
      const [{ data: tasks }, { data: responses }] = await Promise.all([
        supabase.from("task_results").select("*").eq("attempt_id", att.id).order("answered_at", { ascending: true }),
        supabase.from("student_responses").select("*").eq("attempt_id", att.id).order("created_at", { ascending: true }),
      ]);
      return { ...att, tasks: tasks || [], responses: responses || [] };
    }));
    setAttempts(enriched); setLoadingStudent(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bgGradient, color: C.text, fontFamily: FONT }}>
      <div style={{ background: C.surface, padding: "18px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.divider}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${C.gold}, #f59e0b)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⚙️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Admin Panel</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{user.email}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ background: "transparent", border: `1px solid ${C.divider}`, borderRadius: 10, padding: "9px 18px", color: C.textMuted, cursor: "pointer", fontSize: 13, fontFamily: FONT, fontWeight: 600 }}>Log out</button>
      </div>
      <div style={{ display: "flex", height: "calc(100vh - 73px)" }}>
        {/* SIDEBAR */}
        <div style={{ width: 280, background: C.surface, borderRight: `1px solid ${C.divider}`, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.divider}` }}>
            <div style={{ fontWeight: 700, color: C.accent, fontSize: 13, letterSpacing: "0.08em" }}>👥 STUDENTS ({students.length})</div>
          </div>
          {loading && <div style={{ padding: 22, color: C.textMuted, fontSize: 13 }}>Loading...</div>}
          {!loading && students.length === 0 && <div style={{ padding: 22, color: C.textMuted, fontSize: 13 }}>No students yet.</div>}
          {students.map(s => (
            <div key={s.id} onClick={() => loadStudent(s)} style={{
              padding: "16px 22px", cursor: "pointer", borderBottom: `1px solid ${C.divider}`,
              background: selected?.id === s.id ? C.accentSoft : "transparent",
              borderLeft: `3px solid ${selected?.id === s.id ? C.accent : "transparent"}`,
              transition: "all 0.15s",
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{s.full_name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>{s.email}</div>
            </div>
          ))}
        </div>
        {/* MAIN */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
          {!selected && (
            <div style={{ textAlign: "center", padding: 80, color: C.textMuted }}>
              <div style={{ fontSize: 56, marginBottom: 18, opacity: 0.5 }}>👈</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Select a student to see their lesson</div>
            </div>
          )}
          {selected && loadingStudent && <div style={{ color: C.textMuted, padding: 22 }}>Loading...</div>}
          {selected && !loadingStudent && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>{selected.full_name}</h2>
                <div style={{ fontSize: 13, color: C.textMuted, display: "flex", gap: 14, alignItems: "center" }}>
                  <span>{selected.email}</span>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.textMuted }} />
                  <span>{attempts.length} attempt{attempts.length !== 1 ? "s" : ""}</span>
                </div>
              </div>
              {attempts.length === 0 && <div style={{ color: C.textMuted, padding: 24, background: C.surface, borderRadius: 18, textAlign: "center", border: `1px solid ${C.divider}` }}>This student hasn't started the lesson yet.</div>}
              {attempts.map((att, ai) => (
                <TeacherAttemptView key={att.id} att={att} attemptNumber={attempts.length - ai} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
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

  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); setProfile(null); };

  if (checking) return <div style={{ minHeight: "100vh", background: C.bgGradient, display: "flex", alignItems: "center", justifyContent: "center", color: C.accent, fontSize: 18, fontFamily: FONT }}>Loading...</div>;
  if (!user) return <AuthScreen onLogin={handleLogin} />;
  if (profile?.role === "admin" || user.email === ADMIN_EMAIL) return <AdminPanel user={user} onLogout={handleLogout} />;
  return <StudentPanel user={user} onLogout={handleLogout} />;
}
