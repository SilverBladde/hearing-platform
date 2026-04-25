import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lregtucmcpreamgqhhvd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZWd0dWNtY3ByZWFtZ3FoaHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjgzODMsImV4cCI6MjA5MjcwNDM4M30.3mN8JkVZFnxQF66lBS1MbrXiGJQl8H7DKjI-XEzCBZo"
);

const ADMIN_EMAIL = "kzkenbai@gmail.com";

const C = {
  bg: "#0f1923", surface: "#162130", card: "#1e2e40",
  accent: "#00c9a7", accentSoft: "#00c9a720", accentBorder: "#00c9a740",
  gold: "#f5a623", goldSoft: "#f5a62320", text: "#e8f4f2", textMuted: "#7a9eb0",
  success: "#4ade80", error: "#f87171", stage1: "#6366f1",
};

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
  preCheck: {
    type: "mcq",
    question: "Which ocean habitat has the most biodiversity?",
    options: ["Deep ocean trenches", "Coral reefs", "Open ocean surface", "Polar ice regions"],
    correct: 1
  },
  paragraphs: [
    {
      emoji: "🌍",
      text: "The ocean covers more than 70% of Earth's surface and is home to an astonishing variety of life. From the sunlit surface waters to the darkest trenches miles below, marine ecosystems support millions of species.",
      task: { type: "mcq", label: "Paragraph 1", question: "How much of Earth's surface does the ocean cover?", options: ["About 50%", "About 60%", "More than 70%", "About 80%"], correct: 2 }
    },
    {
      emoji: "🪸",
      text: "Coral reefs are often called the 'rainforests of the sea.' Although they cover less than 1% of the ocean floor, coral reefs are home to approximately 25% of all marine species. These reefs provide shelter, food, and nursery grounds for countless creatures.",
      task: { type: "truefalse", label: "Paragraph 2", question: "Coral reefs cover more than 50% of the ocean floor.", correct: false }
    },
    {
      emoji: "🔬",
      text: "Phytoplankton are microscopic plants floating near the ocean's surface. Using sunlight, water, and carbon dioxide, they perform photosynthesis — producing oxygen and forming the base of the marine food web. Phytoplankton produce about half of all the oxygen on Earth!",
      task: { type: "mcq", label: "Paragraph 3", question: "What percentage of Earth's oxygen do phytoplankton produce?", options: ["10%", "25%", "About half", "75%"], correct: 2 }
    },
  ],
  postReading: [
    { id: "q1", question: "Why are coral reefs compared to rainforests?", hint: "Think about biodiversity and importance to the ecosystem..." },
    { id: "q2", question: "What would happen if all phytoplankton disappeared from the ocean?", hint: "Think about oxygen and the food web..." },
    { id: "q3", question: "Name two ways the ocean is important to life on Earth.", hint: "Think about oxygen, food, climate..." },
  ]
};

function Btn({ children, onClick, color = C.accent, disabled = false, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? C.card : color, color: disabled ? C.textMuted : "#0f1923",
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
        style={{ width: "100%", background: C.surface, border: `1.5px solid ${C.accentBorder}`, borderRadius: 10, padding: "12px 14px", color: C.text, fontFamily: "'Segoe UI', sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
    </div>
  );
}

function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{ background: C.card, borderRadius: 20, padding: 24, border: `1px solid ${C.accentBorder}`, marginBottom: 20, ...style }}>{children}</div>
  );
}

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🎓</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, fontFamily: "'Segoe UI', sans-serif", marginBottom: 6 }}>Hearing Platform</h1>
          <p style={{ color: C.textMuted, fontSize: 14 }}>Educational platform for hearing-impaired students</p>
        </div>
        <Card>
          <div style={{ display: "flex", marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: 8, background: mode === m ? C.accent : "transparent", color: mode === m ? "#0f1923" : C.textMuted, fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all 0.2s" }}>{m === "login" ? "Log In" : "Register"}</button>
            ))}
          </div>
          {mode === "register" && <Input label="Full Name" value={name} onChange={setName} placeholder="Your name" />}
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          {msg && <div style={{ marginBottom: 14, padding: "10px 14px", borderRadius: 10, background: msg.startsWith("✅") ? C.success + "20" : C.error + "20", color: msg.startsWith("✅") ? C.success : C.error, fontSize: 13 }}>{msg}</div>}
          <Btn onClick={mode === "login" ? handleLogin : handleRegister} disabled={loading} style={{ width: "100%" }}>
            {loading ? "Please wait..." : mode === "login" ? "Log In →" : "Create Account →"}
          </Btn>
        </Card>
      </div>
    </div>
  );
}

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

function MCQTaskWithCapture({ task, onContinue }) {
  const [sel, setSel] = useState(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = sel === task.correct;
  return (
    <div>
      <div style={{ fontWeight: 600, color: C.text, marginBottom: 14, fontSize: 15 }}>{task.question}</div>
      {task.options.map((opt, i) => {
        let bg = C.surface, border = C.accentBorder, color = C.text;
        if (checked) {
          if (i === task.correct) { bg = C.success + "20"; border = C.success; color = C.success; }
          else if (i === sel) { bg = C.error + "20"; border = C.error; color = C.error; }
        } else if (i === sel) { bg = C.accentSoft; border = C.accent; color = C.accent; }
        return (
          <button key={i} onClick={() => !checked && setSel(i)} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", marginBottom: 8, background: bg, border: `1.5px solid ${border}`, borderRadius: 10, color, cursor: checked ? "default" : "pointer", fontSize: 14, transition: "all 0.2s", fontFamily: "'Segoe UI', sans-serif" }}>
            {checked && i === task.correct ? "✓ " : ""}{checked && i === sel && i !== task.correct ? "✗ " : ""}{String.fromCharCode(65 + i)}. {opt}
          </button>
        );
      })}
      {!checked && <Btn onClick={() => { if (sel !== null) setChecked(true); }} disabled={sel === null}>Check my answer →</Btn>}
      {checked && (
        <div style={{ marginTop: 14 }}>
          <div style={{ padding: "12px 16px", borderRadius: 12, marginBottom: 14, background: isCorrect ? C.success + "15" : C.error + "15", border: `1px solid ${isCorrect ? C.success : C.error}40`, color: isCorrect ? C.success : C.error, fontSize: 14 }}>
            {isCorrect ? "✓ Correct! Well done." : `✗ Not quite. The correct answer is: ${task.options[task.correct]}`}
          </div>
          <Btn onClick={() => onContinue(task.options[sel], task.options[task.correct], isCorrect)} style={{ width: "100%" }}>Continue →</Btn>
        </div>
      )}
    </div>
  );
}

function TrueFalseTaskWithCapture({ task, onContinue }) {
  const [sel, setSel] = useState(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = sel === task.correct;
  return (
    <div>
      <div style={{ fontWeight: 600, color: C.text, marginBottom: 14, fontSize: 15 }}>True or False: {task.question}</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        {[true, false].map(val => {
          let bg = C.surface, border = C.accentBorder, color = C.textMuted;
          if (checked) {
            if (val === task.correct) { bg = C.success + "20"; border = C.success; color = C.success; }
            else if (val === sel) { bg = C.error + "20"; border = C.error; color = C.error; }
          } else if (val === sel) { bg = C.accentSoft; border = C.accent; color = C.accent; }
          return <button key={String(val)} onClick={() => !checked && setSel(val)} style={{ flex: 1, padding: "14px", background: bg, border: `1.5px solid ${border}`, borderRadius: 12, color, fontWeight: 700, fontSize: 15, cursor: checked ? "default" : "pointer", transition: "all 0.2s", fontFamily: "'Segoe UI', sans-serif" }}>{val ? "TRUE" : "FALSE"}</button>;
        })}
      </div>
      {!checked && <Btn onClick={() => { if (sel !== null) setChecked(true); }} disabled={sel === null}>Check my answer →</Btn>}
      {checked && (
        <div style={{ marginTop: 4 }}>
          <div style={{ padding: "12px 16px", borderRadius: 12, marginBottom: 14, background: isCorrect ? C.success + "15" : C.error + "15", border: `1px solid ${isCorrect ? C.success : C.error}40`, color: isCorrect ? C.success : C.error, fontSize: 14 }}>
            {isCorrect ? "✓ Correct! Well done." : `✗ Not quite. The correct answer is: ${task.correct ? "TRUE" : "FALSE"}`}
          </div>
          <Btn onClick={() => onContinue(sel ? "TRUE" : "FALSE", task.correct ? "TRUE" : "FALSE", isCorrect)} style={{ width: "100%" }}>Continue →</Btn>
        </div>
      )}
    </div>
  );
}

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

  const createAttempt = async () => {
    const { data } = await supabase.from("attempts").insert({
      user_id: user.id, lesson_title: lesson.title, started_at: new Date().toISOString()
    }).select().single();
    if (data) setAttemptId(data.id);
  };

  useEffect(() => { createAttempt(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000); };

  const saveTaskResult = async (stageLabel, taskLabel, question, studentAnswer, correctAnswer, isCorrect) => {
    if (!attemptId) return;
    await supabase.from("task_results").insert({
      user_id: user.id, attempt_id: attemptId, lesson_title: lesson.title,
      stage: stageLabel, task_label: taskLabel, question,
      student_answer: studentAnswer, correct_answer: correctAnswer,
      is_correct: isCorrect, answered_at: new Date().toISOString()
    });
  };

  const handlePreCheckContinue = async (studentAnswer, correctAnswer, isCorrect) => {
    await saveTaskResult("pre", "Pre-Reading Check", lesson.preCheck.question, studentAnswer, correctAnswer, isCorrect);
    setStage(1);
  };

  const handleParaContinue = async (paraIdx, studentAnswer, correctAnswer, isCorrect) => {
    const para = lesson.paragraphs[paraIdx];
    await saveTaskResult("while", para.task.label, para.task.question, studentAnswer, correctAnswer, isCorrect);
    showToast(isCorrect ? "🎉 Correct!" : "📖 Keep going!");
    setParasDone(prev => [...prev, paraIdx]);
    if (paraIdx < lesson.paragraphs.length - 1) setParaIndex(paraIdx + 1);
    else setStage(2);
  };

  const submitPostAnswer = async (i) => {
    if (!postAnswers[i]?.trim() || !attemptId) return;
    setSaving(true);
    await supabase.from("student_responses").insert({
      user_id: user.id, attempt_id: attemptId,
      question_id: lesson.postReading[i].id,
      question: lesson.postReading[i].question,
      answer: postAnswers[i],
    });
    setPostSubmitted(prev => ({ ...prev, [i]: true }));
    setSaving(false);
    showToast("✅ Answer saved!");
  };

  const restartLesson = async () => {
    setStage(0);
    setPreStep(0);
    setParaIndex(0);
    setParasDone([]);
    setPostAnswers({});
    setPostSubmitted({});
    setAttemptId(null);
    const { data } = await supabase.from("attempts").insert({
      user_id: user.id, lesson_title: lesson.title, started_at: new Date().toISOString()
    }).select().single();
    if (data) setAttemptId(data.id);
  };

  const allSubmitted = lesson.postReading.every((_, i) => postSubmitted[i]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', sans-serif" }}>
      {toast && <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: C.accent, color: "#0f1923", padding: "12px 28px", borderRadius: 50, fontWeight: 800, zIndex: 1000, fontSize: 15, whiteSpace: "nowrap" }}>{toast}</div>}

      <div style={{ background: C.surface, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.accentBorder}` }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>🎓 Hearing Platform</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Welcome, {user.user_metadata?.full_name || user.email}</div>
        </div>
        <button onClick={onLogout} style={{ background: "none", border: `1px solid ${C.accentBorder}`, borderRadius: 8, padding: "8px 16px", color: C.textMuted, cursor: "pointer", fontSize: 13 }}>Log out</button>
      </div>

      <div style={{ background: C.surface, padding: "12px 24px", display: "flex", gap: 8, borderBottom: `1px solid ${C.accentBorder}` }}>
        {[["📖", "Pre-Reading", C.stage1], ["🔍", "While Reading", C.accent], ["✍️", "Post-Reading", C.gold]].map(([icon, label, color], i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px", borderRadius: 10, background: stage === i ? color + "20" : "transparent", border: `1px solid ${stage === i ? color : "transparent"}`, fontSize: 13, color: stage === i ? color : stage > i ? C.success : C.textMuted, fontWeight: stage === i ? 700 : 400 }}>
            {icon} {label}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px" }}>

        {/* PRE-READING */}
        {stage === 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{lesson.title}</h2>
            <p style={{ color: C.textMuted, marginBottom: 28, fontSize: 14 }}>{lesson.topic}</p>
            {preStep === 0 && (
              <>
                <h3 style={{ marginBottom: 8, color: C.stage1 }}>📚 Key Vocabulary</h3>
                <p style={{ color: C.textMuted, fontSize: 13, marginBottom: 18 }}>Tap each card to see the definition</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12, marginBottom: 28 }}>
                  {lesson.vocab.map(v => <VocabCard key={v.word} item={v} />)}
                </div>
                <Btn onClick={() => setPreStep(1)} style={{ width: "100%" }}>I know these words →</Btn>
              </>
            )}
            {preStep === 1 && (
              <Card>
                <h3 style={{ marginBottom: 16, color: C.stage1 }}>🧠 Quick Knowledge Check</h3>
                <MCQTaskWithCapture task={lesson.preCheck} onContinue={handlePreCheckContinue} />
              </Card>
            )}
          </div>
        )}

        {/* WHILE READING */}
        {stage === 1 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h3 style={{ color: C.accent, fontSize: 18 }}>🔍 While Reading</h3>
              <div style={{ fontSize: 13, color: C.textMuted }}>{parasDone.length}/{lesson.paragraphs.length} completed</div>
            </div>
            {lesson.paragraphs.map((para, i) => {
              if (i > paraIndex) return null;
              const isActive = i === paraIndex;
              const isDone = parasDone.includes(i) && !isActive;
              return (
                <div key={i}>
                  <Card>
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 40, flexShrink: 0 }}>{para.emoji}</div>
                      <p style={{ fontSize: 15, lineHeight: 1.8, color: C.text, margin: 0 }}>{para.text}</p>
                    </div>
                  </Card>
                  {isActive && (
                    <Card style={{ borderColor: C.accent + "60" }}>
                      <div style={{ fontSize: 11, color: C.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>✏️ Comprehension Check</div>
                      {para.task.type === "mcq" && <MCQTaskWithCapture task={para.task} onContinue={(sa, ca, ic) => handleParaContinue(i, sa, ca, ic)} />}
                      {para.task.type === "truefalse" && <TrueFalseTaskWithCapture task={para.task} onContinue={(sa, ca, ic) => handleParaContinue(i, sa, ca, ic)} />}
                    </Card>
                  )}
                  {isDone && <div style={{ color: C.success, fontSize: 12, marginBottom: 16, marginTop: -10 }}>✓ Completed</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* POST-READING */}
        {stage === 2 && (
          <div>
            <h3 style={{ color: C.gold, marginBottom: 6, fontSize: 18 }}>✍️ Post-Reading Questions</h3>
            <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 24 }}>Write your answers. Your teacher will review them.</p>
            {lesson.postReading.map((item, i) => (
              <Card key={i}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.goldSoft, border: `1.5px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: C.text, lineHeight: 1.5 }}>{item.question}</div>
                </div>
                <div style={{ fontSize: 12, color: C.gold, marginBottom: 14, paddingLeft: 44 }}>💡 {item.hint}</div>
                <textarea value={postAnswers[i] || ""} onChange={e => setPostAnswers(p => ({ ...p, [i]: e.target.value }))} disabled={postSubmitted[i]}
                  placeholder="Write your answer here..."
                  style={{ width: "100%", minHeight: 100, background: C.surface, border: `1.5px solid ${postSubmitted[i] ? C.success + "60" : C.accentBorder}`, borderRadius: 10, padding: 14, color: C.text, fontFamily: "'Segoe UI', sans-serif", fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.6 }} />
                {!postSubmitted[i]
                  ? <Btn onClick={() => submitPostAnswer(i)} color={C.gold} disabled={saving || !postAnswers[i]?.trim()} style={{ marginTop: 12 }}>{saving ? "Saving..." : "Save Answer →"}</Btn>
                  : <div style={{ marginTop: 12, color: C.success, fontSize: 13 }}>✅ Saved — your teacher will review it</div>
                }
              </Card>
            ))}

            {allSubmitted && (
              <div style={{ textAlign: "center", padding: 36, background: C.accentSoft, borderRadius: 24, border: `1px solid ${C.accentBorder}` }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>🏆</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Lesson Complete!</div>
                <div style={{ color: C.textMuted, fontSize: 14, marginBottom: 24 }}>All answers saved. Great work!</div>
                <Btn onClick={restartLesson} style={{ width: "100%" }}>🔄 Restart Lesson</Btn>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPanel({ user, onLogout }) {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStudent, setLoadingStudent] = useState(false);

  useEffect(() => {
    supabase.from("profiles").select("*").eq("role", "student").order("created_at", { ascending: false })
      .then(({ data }) => { setStudents(data || []); setLoading(false); });
  }, []);

  const loadStudent = async (student) => {
    setSelected(student);
    setAttempts([]);
    setLoadingStudent(true);
    const { data: atts } = await supabase.from("attempts").select("*").eq("user_id", student.id).order("started_at", { ascending: false });
    if (!atts || atts.length === 0) { setAttempts([]); setLoadingStudent(false); return; }
    const enriched = await Promise.all(atts.map(async (att) => {
      const [{ data: tasks }, { data: responses }] = await Promise.all([
        supabase.from("task_results").select("*").eq("attempt_id", att.id).order("answered_at", { ascending: true }),
        supabase.from("student_responses").select("*").eq("attempt_id", att.id).order("created_at", { ascending: true }),
      ]);
      return { ...att, tasks: tasks || [], responses: responses || [] };
    }));
    setAttempts(enriched);
    setLoadingStudent(false);
  };

  const fmt = (str) => new Date(str).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const stageColor = (s) => s === "pre" ? C.stage1 : C.accent;
  const stageLabel = (s) => s === "pre" ? "Pre-Reading" : "While Reading";
  const scoreOf = (att) => {
    if (!att.tasks.length) return null;
    return `${att.tasks.filter(t => t.is_correct).length}/${att.tasks.length}`;
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: C.surface, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.accentBorder}` }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>⚙️ Admin Panel</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>{user.email}</div>
        </div>
        <button onClick={onLogout} style={{ background: "none", border: `1px solid ${C.accentBorder}`, borderRadius: 8, padding: "8px 16px", color: C.textMuted, cursor: "pointer", fontSize: 13 }}>Log out</button>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>
        {/* LEFT: student list */}
        <div style={{ width: 260, background: C.surface, borderRight: `1px solid ${C.accentBorder}`, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.accentBorder}` }}>
            <div style={{ fontWeight: 700, color: C.accent, fontSize: 14 }}>👥 Students ({students.length})</div>
          </div>
          {loading && <div style={{ padding: 20, color: C.textMuted, fontSize: 13 }}>Loading...</div>}
          {!loading && students.length === 0 && <div style={{ padding: 20, color: C.textMuted, fontSize: 13 }}>No students yet.</div>}
          {students.map(s => (
            <div key={s.id} onClick={() => loadStudent(s)} style={{ padding: "14px 20px", cursor: "pointer", borderBottom: `1px solid ${C.accentBorder}20`, background: selected?.id === s.id ? C.accentSoft : "transparent", borderLeft: `3px solid ${selected?.id === s.id ? C.accent : "transparent"}`, transition: "all 0.15s" }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{s.full_name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{s.email}</div>
            </div>
          ))}
        </div>

        {/* RIGHT: attempts */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {!selected && (
            <div style={{ textAlign: "center", padding: 60, color: C.textMuted }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>👈</div>
              <div style={{ fontSize: 16 }}>Select a student to see their attempts</div>
            </div>
          )}

          {selected && loadingStudent && <div style={{ color: C.textMuted, padding: 20 }}>Loading...</div>}

          {selected && !loadingStudent && (
            <div>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{selected.full_name}</h2>
                <div style={{ fontSize: 13, color: C.textMuted }}>{selected.email} · {attempts.length} attempt{attempts.length !== 1 ? "s" : ""}</div>
              </div>

              {attempts.length === 0 && (
                <div style={{ color: C.textMuted, padding: "20px", background: C.surface, borderRadius: 16, textAlign: "center" }}>This student hasn't started the lesson yet.</div>
              )}

              {attempts.map((att, ai) => (
                <div key={att.id} style={{ background: C.surface, borderRadius: 20, marginBottom: 28, border: `1px solid ${C.accentBorder}`, overflow: "hidden" }}>

                  {/* Attempt header */}
                  <div style={{ padding: "16px 24px", background: C.card, borderBottom: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: C.accentSoft, border: `1.5px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📋</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>Attempt #{attempts.length - ai}</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{fmt(att.started_at)}</div>
                    </div>
                    {scoreOf(att) && (
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 2 }}>Test score</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>{scoreOf(att)}</div>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "20px 24px" }}>

                    {/* Test tasks */}
                    {att.tasks.length > 0 && (
                      <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>📊 Test Questions</div>
                        {att.tasks.map((tr, ti) => (
                          <div key={ti} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 16px", borderRadius: 12, marginBottom: 10, background: C.card, border: `1px solid ${tr.is_correct ? C.success + "30" : C.error + "30"}` }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: tr.is_correct ? C.success + "20" : C.error + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: tr.is_correct ? C.success : C.error, fontWeight: 800, flexShrink: 0 }}>
                              {tr.is_correct ? "✓" : "✗"}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: stageColor(tr.stage) + "25", color: stageColor(tr.stage), fontWeight: 700 }}>{stageLabel(tr.stage)}</span>
                                <span style={{ fontSize: 11, color: C.textMuted }}>{tr.task_label}</span>
                              </div>
                              <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 6 }}>{tr.question}</div>
                              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                                <div style={{ fontSize: 13 }}>
                                  <span style={{ color: C.textMuted }}>Answered: </span>
                                  <span style={{ fontWeight: 700, color: tr.is_correct ? C.success : C.error }}>{tr.student_answer}</span>
                                </div>
                                {!tr.is_correct && (
                                  <div style={{ fontSize: 13 }}>
                                    <span style={{ color: C.textMuted }}>Correct: </span>
                                    <span style={{ fontWeight: 700, color: C.success }}>{tr.correct_answer}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {att.tasks.length === 0 && (
                      <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>No test answers recorded yet.</div>
                    )}

                    {/* Open-ended answers */}
                    {att.responses.length > 0 && (
                      <div>
                        <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>✍️ Open-Ended Answers</div>
                        {att.responses.map((r, ri) => (
                          <div key={ri} style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>Q{ri + 1}. {r.question}</div>
                            <div style={{ background: C.card, borderRadius: 10, padding: "12px 16px", fontSize: 14, lineHeight: 1.7, color: C.text, borderLeft: `3px solid ${C.gold}` }}>{r.answer}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {att.responses.length === 0 && att.tasks.length > 0 && (
                      <div style={{ fontSize: 13, color: C.textMuted }}>Student hasn't submitted post-reading answers yet.</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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

  if (checking) return <div style={{ minHeight: "100vh", background: "#0f1923", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c9a7", fontSize: 18 }}>Loading...</div>;
  if (!user) return <AuthScreen onLogin={handleLogin} />;
  if (profile?.role === "admin" || user.email === ADMIN_EMAIL) return <AdminPanel user={user} onLogout={handleLogout} />;
  return <StudentPanel user={user} onLogout={handleLogout} />;
}
