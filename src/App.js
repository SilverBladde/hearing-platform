import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lregtucmcpreamgqhhvd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZWd0dWNtY3ByZWFtZ3FoaHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjgzODMsImV4cCI6MjA5MjcwNDM4M30.3mN8JkVZFnxQF66lBS1MbrXiGJQl8H7DKjI-XEzCBZo"
);
const ADMIN_EMAIL = "kzkenbai@gmail.com";
const C = {
  bg:"#0f1923",surface:"#162130",card:"#1e2e40",
  accent:"#00c9a7",accentSoft:"#00c9a720",accentBorder:"#00c9a740",
  gold:"#f5a623",goldSoft:"#f5a62320",text:"#e8f4f2",textMuted:"#7a9eb0",
  success:"#4ade80",error:"#f87171",stage1:"#6366f1",
};

const lesson = {
  title:"A Total Reality Experience", topic:"Virtual Reality",
  vocab:[
    {word:"virtual reality",pos:"noun phrase",ipa:"/ˌvɜːtʃuəl riˈæləti/",definition:"A computer-made world you can experience with a headset",example:"She visited a museum using virtual reality.",emoji:"🥽"},
    {word:"environment",pos:"noun",ipa:"/ɪnˈvaɪrənmənt/",definition:"The place or conditions around you",example:"Fish live in a water environment.",emoji:"🌿"},
    {word:"interactive",pos:"adjective",ipa:"/ˌɪntərˈæktɪv/",definition:"Reacting to what you do; not just watching",example:"The interactive game responds when you move.",emoji:"🖐️"},
    {word:"transform",pos:"verb",ipa:"/trænsˈfɔːm/",definition:"To completely change something",example:"VR will transform the way we learn.",emoji:"🔄"},
    {word:"affordable",pos:"adjective",ipa:"/əˈfɔːdəbl/",definition:"Not too expensive; easy to pay for",example:"Smartphones became affordable for most people.",emoji:"💰"},
    {word:"explore",pos:"verb",ipa:"/ɪkˈsplɔː/",definition:"To look around or discover a new place",example:"They explored the rainforest with VR.",emoji:"🔭"},
    {word:"revolution",pos:"noun",ipa:"/ˌrevəˈluːʃn/",definition:"A huge change that affects everything",example:"The internet was a digital revolution.",emoji:"🌍"},
    {word:"accommodation",pos:"noun",ipa:"/əˌkɒməˈdeɪʃn/",definition:"A place to stay, e.g. a hotel",example:"She booked her accommodation online.",emoji:"🏨"},
    {word:"risk-free",pos:"adjective",ipa:"/ˈrɪsk friː/",definition:"Without any danger",example:"Practising surgery in VR is risk-free.",emoji:"🛡️"},
    {word:"advanced",pos:"adjective",ipa:"/ədˈvɑːnst/",definition:"Very developed; using modern technology",example:"The lab has advanced computers.",emoji:"🚀"},
  ],
  vocabTask1:{
    words:["virtual reality","transform","revolution","affordable","risk-free"],
    definitions:[
      {letter:"a",text:"Without any danger; no one can get hurt"},
      {letter:"b",text:"A huge change that affects everyone"},
      {letter:"c",text:"A computer-made world you experience with a headset"},
      {letter:"d",text:"To completely change something"},
      {letter:"e",text:"Not too expensive for most people"},
    ],
    answers:["c","d","b","e","a"],
  },
  vocabTask2:{
    wordbank:["environment","explore","interactive","advanced","accommodation"],
    sentences:[
      {text:"With VR, students can ___ the Amazon Rainforest without leaving the classroom.",answer:"explore"},
      {text:"The fish lives in a water ___. VR can show you this underwater world.",answer:"environment"},
      {text:"The VR experience is ___ — you can touch and move things inside it.",answer:"interactive"},
      {text:"Before booking a hotel, you will be able to see your ___ in VR first.",answer:"accommodation"},
      {text:"As ___ VR equipment becomes cheaper, more people will be able to use it.",answer:"advanced"},
    ],
  },
  preCheck:{type:"mcq",question:"What is Virtual Reality (VR)?",options:["A type of video game on a normal screen","A computer-made world experienced with a headset","A way to make phone calls","A type of camera used in films"],correct:1},
  paragraphs:[
    {emoji:"🥽",label:"Paragraph 1",text:"Drawing, sculpting, storytelling and even films are some of the different ways that people have tried to recreate reality. But it's only in the past fifty years that technology has advanced enough to allow people to experience other environments using virtual reality (VR) 3D headsets. The next step in VR development will be that users get a complete interactive experience of the environment they are exploring. They will be able to see, touch and hear everything in their VR environment.",
      task:{type:"multi_truefalse",label:"Task 1 — TRUE or FALSE",statements:[
        {text:"People have been using VR 3D headsets for hundreds of years.",correct:false},
        {text:"In the future, VR will give users a complete interactive experience.",correct:true},
        {text:"VR users will be able to see, touch, and hear things in their environment.",correct:true},
      ]}},
    {emoji:"🎮",label:"Paragraph 2",text:"The first use for total experience VR is in the gaming industry. Imagine how gamers could actually play golf on a VR golf course or really drive a Formula 1 racing car! The possibilities are endless. But VR won't just be for fun and games. It will also be a massive leap forward for education. It will transform how people learn different skills and subjects. Learning to drive a car, fly a plane or even perform brain surgery will be absolutely risk-free.",
      task:{type:"multi_mcq",label:"Task 2 — MULTIPLE CHOICE",questions:[
        {question:"What is the FIRST industry to use total experience VR?",options:["Healthcare","The gaming industry","Education","Online shopping"],correct:1},
        {question:"VR will make learning to drive, fly or do brain surgery…",options:["More expensive","Only for experts","Absolutely risk-free","Impossible"],correct:2},
        {question:"According to paragraph 2, what does VR offer education?",options:["A way to replace teachers","A massive leap forward","A cheaper option than books","A way to make students play games"],correct:1},
      ]}},
    {emoji:"🏫",label:"Paragraph 3",text:"Also, students won't need a textbook to learn about life in the Middle Ages as they will be able to visit a medieval village and spend the day living the life of a 14th century peasant or as a nobleman in his castle. Already, there are educational apps which allow students to use VR headsets and go on exciting virtual school trips to museums, coral reefs, rainforests and many more! Imagine seeing space through the eyes of an astronaut — what a lesson that would be! Or going to places like the Amazon Rainforest — without even leaving the classroom.",
      task:{type:"gapfill",label:"Task 3 — GAP FILL",wordbank:["textbook","peasant","astronaut","classroom","coral reefs"],sentences:[
        {text:"In the future, students will not need a ___ to learn history.",answer:"textbook"},
        {text:"With VR, you can live as a ___ in a medieval village.",answer:"peasant"},
        {text:"Students can already visit ___ on virtual school trips.",answer:"coral reefs"},
        {text:"You could see space through the eyes of an ___ using VR.",answer:"astronaut"},
        {text:"All of this can happen without leaving the ___.",answer:"classroom"},
      ]}},
    {emoji:"🛍️",label:"Paragraph 4",text:"Also, it won't be long before we use VR for online shopping. Nowadays, when we buy things online, we can only see photos of products, but with VR devices we will be able to tour virtual shops and even touch the products we are interested in! But that's not all. Have you ever been disappointed by a holiday you booked online? Well, in the future you will be able to take a virtual tour of your accommodation before you make any decisions! There is simply no limit to the ways we will be able to use Virtual Reality.",
      task:{type:"multi_truefalse",label:"Task 4 — TRUE or FALSE",statements:[
        {text:"When we shop online today, we can touch and test the products.",correct:false},
        {text:"With VR shopping, you will be able to tour a virtual shop and touch products.",correct:true},
        {text:"Before booking a holiday, VR will let you visit your accommodation first.",correct:true},
      ]}},
    {emoji:"🌟",label:"Paragraph 5",text:"As advanced VR equipment becomes more affordable, it's going to reach more and more people. It looks set to be a digital revolution that will change the way we live, learn, work and play forever! Virtual Reality is going to completely change the way we see our world and we will even be able to control reality for our own benefit. It's an exciting future. Aren't you looking forward to it?",
      task:{type:"mixed_p5",label:"Task 5 — MULTIPLE CHOICE",questions:[
        {question:"Why will VR reach more people in the future?",options:["Because governments will give it to everyone","Because VR equipment will become more affordable","Because VR is already free","Because schools will make it compulsory"],correct:1},
        {question:"According to the writer, VR will change the way we…",options:["Only play games","Only shop online","Live, learn, work and play","Travel by plane"],correct:2},
      ],shortAnswer:"In your own words, why does the writer think the future is exciting? Write 1–2 sentences."}},
  ],
  postReading:[
    {id:"q1",question:"VR will transform education because… (complete the sentence using your own ideas)",hint:"Think about what VR allows students to do that a normal classroom cannot..."},
    {id:"q2",question:"Using VR, students can explore… without… (complete using your own ideas)",hint:"Think about places students could visit — rainforests, space, museums..."},
    {id:"q3",question:"Choose ONE: A) 'VR will completely change education.' Do you agree? Why? — B) What is the BEST use of VR? — C) Are there dangers with using VR too much? Write 4–6 sentences using at least 3 vocabulary words.",hint:"Use: 'I think / I believe / In my opinion… One reason is… However… To sum up...'"},
  ]
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Btn({children,onClick,color=C.accent,disabled=false,style={}}){
  return <button onClick={onClick} disabled={disabled} style={{background:disabled?C.card:color,color:disabled?C.textMuted:"#0f1923",border:"none",borderRadius:12,padding:"12px 24px",fontFamily:"'Segoe UI',sans-serif",fontWeight:700,fontSize:14,cursor:disabled?"default":"pointer",transition:"all 0.2s ease",...style}}>{children}</button>;
}
function Input({label,type="text",value,onChange,placeholder}){
  return <div style={{marginBottom:16}}>{label&&<div style={{fontSize:13,color:C.textMuted,marginBottom:6}}>{label}</div>}<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",background:C.surface,border:`1.5px solid ${C.accentBorder}`,borderRadius:10,padding:"12px 14px",color:C.text,fontFamily:"'Segoe UI',sans-serif",fontSize:14,outline:"none",boxSizing:"border-box"}}/></div>;
}
function Card({children,style={},onClick}){
  return <div onClick={onClick} style={{background:C.card,borderRadius:20,padding:24,border:`1px solid ${C.accentBorder}`,marginBottom:20,...style}}>{children}</div>;
}
function speakWord(word){
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(word);u.lang="en-GB";u.rate=0.85;
  window.speechSynthesis.speak(u);
}

// ─── VOCAB CARD (student) ─────────────────────────────────────────────────────
function VocabCard({item}){
  const [flipped,setFlipped]=useState(false);
  return <div style={{perspective:1000}}>
    <div onClick={()=>setFlipped(!flipped)} style={{cursor:"pointer",height:150}}>
      <div style={{position:"relative",width:"100%",height:"100%",transformStyle:"preserve-3d",transform:flipped?"rotateY(180deg)":"none",transition:"transform 0.5s ease"}}>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:C.card,borderRadius:16,border:`1px solid ${C.accentBorder}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,padding:8}}>
          <div style={{fontSize:30}}>{item.emoji}</div>
          <div style={{fontSize:13,fontWeight:700,color:C.text,textAlign:"center"}}>{item.word}</div>
          <div style={{fontSize:11,color:C.textMuted,fontFamily:"monospace"}}>{item.ipa}</div>
          <div style={{fontSize:10,color:C.textMuted}}>TAP TO SEE MEANING</div>
        </div>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",background:C.accentSoft,borderRadius:16,border:`1px solid ${C.accent}50`,display:"flex",flexDirection:"column",justifyContent:"center",padding:12,gap:6}}>
          <div style={{fontSize:11,color:C.accent,fontWeight:700,textTransform:"uppercase"}}>{item.pos}</div>
          <div style={{fontSize:12,color:C.text,lineHeight:1.5}}>{item.definition}</div>
          <div style={{fontSize:11,color:C.textMuted,fontStyle:"italic",lineHeight:1.4}}>"{item.example}"</div>
        </div>
      </div>
    </div>
    <button onClick={e=>{e.stopPropagation();speakWord(item.word);}} style={{width:"100%",marginTop:6,padding:"7px 0",background:C.surface,border:`1px solid ${C.accentBorder}`,borderRadius:10,color:C.accent,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'Segoe UI',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>🔊 Listen</button>
  </div>;
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthScreen({onLogin}){
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");const [password,setPassword]=useState("");
  const [name,setName]=useState("");const [msg,setMsg]=useState("");const [loading,setLoading]=useState(false);
  const handleLogin=async()=>{setLoading(true);setMsg("");const{data,error}=await supabase.auth.signInWithPassword({email,password});if(error){setMsg("❌ "+error.message);setLoading(false);return;}onLogin(data.user);setLoading(false);};
  const handleRegister=async()=>{if(!name){setMsg("❌ Please enter your name");return;}setLoading(true);setMsg("");const{data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name}}});if(error){setMsg("❌ "+error.message);setLoading(false);return;}if(data.user)await supabase.from("profiles").upsert({id:data.user.id,full_name:name,email,role:email===ADMIN_EMAIL?"admin":"student"});setMsg("✅ Registered! Now log in.");setMode("login");setLoading(false);};
  return <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{width:"100%",maxWidth:420}}>
      <div style={{textAlign:"center",marginBottom:32}}><div style={{fontSize:52,marginBottom:12}}>🎓</div><h1 style={{fontSize:26,fontWeight:800,color:C.text,fontFamily:"'Segoe UI',sans-serif",marginBottom:6}}>Hearing Platform</h1><p style={{color:C.textMuted,fontSize:14}}>Educational platform for hearing-impaired students</p></div>
      <Card>
        <div style={{display:"flex",marginBottom:24,background:C.surface,borderRadius:10,padding:4}}>{["login","register"].map(m=><button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:mode===m?C.accent:"transparent",color:mode===m?"#0f1923":C.textMuted,fontWeight:700,cursor:"pointer",fontSize:14,transition:"all 0.2s"}}>{m==="login"?"Log In":"Register"}</button>)}</div>
        {mode==="register"&&<Input label="Full Name" value={name} onChange={setName} placeholder="Your name"/>}
        <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com"/>
        <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••"/>
        {msg&&<div style={{marginBottom:14,padding:"10px 14px",borderRadius:10,background:msg.startsWith("✅")?C.success+"20":C.error+"20",color:msg.startsWith("✅")?C.success:C.error,fontSize:13}}>{msg}</div>}
        <Btn onClick={mode==="login"?handleLogin:handleRegister} disabled={loading} style={{width:"100%"}}>{loading?"Please wait...":mode==="login"?"Log In →":"Create Account →"}</Btn>
      </Card>
    </div>
  </div>;
}

// ─── STUDENT TASK COMPONENTS ──────────────────────────────────────────────────
function SingleMCQ({question,options,correct,onResult,disabled}){
  const [sel,setSel]=useState(null);const [checked,setChecked]=useState(false);const isCorrect=sel===correct;
  return <div style={{marginBottom:20}}>
    <div style={{fontWeight:600,color:C.text,marginBottom:10,fontSize:14}}>{question}</div>
    {options.map((opt,i)=>{
      let bg=C.surface,border=C.accentBorder,color=C.text;
      if(checked){if(i===correct){bg=C.success+"20";border=C.success;color=C.success;}else if(i===sel){bg=C.error+"20";border=C.error;color=C.error;}}
      else if(i===sel){bg=C.accentSoft;border=C.accent;color=C.accent;}
      return <button key={i} onClick={()=>!checked&&!disabled&&setSel(i)} style={{display:"block",width:"100%",textAlign:"left",padding:"10px 14px",marginBottom:6,background:bg,border:`1.5px solid ${border}`,borderRadius:10,color,cursor:(checked||disabled)?"default":"pointer",fontSize:13,transition:"all 0.2s",fontFamily:"'Segoe UI',sans-serif"}}>
        {checked&&i===correct?"✓ ":""}{checked&&i===sel&&i!==correct?"✗ ":""}{String.fromCharCode(65+i)}. {opt}
      </button>;
    })}
    {!checked&&!disabled&&<button onClick={()=>{if(sel!==null){setChecked(true);onResult&&onResult(options[sel],options[correct],isCorrect);}}} disabled={sel===null} style={{padding:"8px 18px",background:sel!==null?C.accent:C.surface,color:sel!==null?"#0f1923":C.textMuted,border:`1px solid ${C.accentBorder}`,borderRadius:8,cursor:sel!==null?"pointer":"default",fontWeight:700,fontSize:13,fontFamily:"'Segoe UI',sans-serif"}}>Check →</button>}
    {checked&&<div style={{fontSize:13,color:isCorrect?C.success:C.error,marginTop:6}}>{isCorrect?"✓ Correct!":` ✗ Correct: ${options[correct]}`}</div>}
  </div>;
}

function SingleTF({statement,correct,onResult,disabled}){
  const [sel,setSel]=useState(null);const [checked,setChecked]=useState(false);const isCorrect=sel===correct;
  return <div style={{marginBottom:14}}>
    <div style={{fontSize:14,color:C.text,marginBottom:8,lineHeight:1.5}}>{statement}</div>
    <div style={{display:"flex",gap:10}}>
      {[true,false].map(val=>{
        let bg=C.surface,border=C.accentBorder,color=C.textMuted;
        if(checked){if(val===correct){bg=C.success+"20";border=C.success;color=C.success;}else if(val===sel){bg=C.error+"20";border=C.error;color=C.error;}}
        else if(val===sel){bg=C.accentSoft;border=C.accent;color=C.accent;}
        return <button key={String(val)} onClick={()=>!checked&&!disabled&&setSel(val)} style={{flex:1,padding:"10px",background:bg,border:`1.5px solid ${border}`,borderRadius:10,color,fontWeight:700,fontSize:13,cursor:(checked||disabled)?"default":"pointer",transition:"all 0.2s",fontFamily:"'Segoe UI',sans-serif"}}>{val?"TRUE":"FALSE"}</button>;
      })}
      {!checked&&!disabled&&sel!==null&&<button onClick={()=>{setChecked(true);onResult&&onResult(sel?"TRUE":"FALSE",correct?"TRUE":"FALSE",isCorrect);}} style={{padding:"10px 16px",background:C.accent,color:"#0f1923",border:"none",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Segoe UI',sans-serif"}}>Check →</button>}
    </div>
    {checked&&<div style={{fontSize:12,color:isCorrect?C.success:C.error,marginTop:6}}>{isCorrect?"✓ Correct!":` ✗ Correct: ${correct?"TRUE":"FALSE"}`}</div>}
  </div>;
}

function MultiTrueFalseTask({task,onContinue}){
  const total=task.statements.length;const [results,setResults]=useState({});const allDone=Object.keys(results).length===total;
  return <div>
    <div style={{fontSize:12,color:C.accent,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:14}}>{task.label}</div>
    {task.statements.map((s,i)=><div key={i} style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.accentBorder}`}}>
      <div style={{fontSize:12,color:C.textMuted,marginBottom:6}}>Statement {i+1}</div>
      <SingleTF statement={s.text} correct={s.correct} onResult={(sa,ca,ic)=>setResults(prev=>({...prev,[i]:{sa,ca,ic}}))} disabled={!!results[i]}/>
    </div>)}
    {allDone&&<div style={{marginTop:14}}>
      <div style={{padding:"10px 14px",borderRadius:10,background:C.accentSoft,border:`1px solid ${C.accentBorder}`,fontSize:13,color:C.text,marginBottom:12}}>✅ Score: {Object.values(results).filter(r=>r.ic).length}/{total}</div>
      <Btn onClick={()=>onContinue(Object.values(results).map(r=>r.sa).join(" | "),Object.values(results).map(r=>r.ca).join(" | "),Object.values(results).every(r=>r.ic))} style={{width:"100%"}}>Continue →</Btn>
    </div>}
  </div>;
}

function MultiMCQTask({task,onContinue}){
  const total=task.questions.length;const [results,setResults]=useState({});const allDone=Object.keys(results).length===total;
  return <div>
    <div style={{fontSize:12,color:C.accent,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:14}}>{task.label}</div>
    {task.questions.map((q,i)=><div key={i} style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.accentBorder}`}}>
      <SingleMCQ question={`${i+1}. ${q.question}`} options={q.options} correct={q.correct} onResult={(sa,ca,ic)=>setResults(prev=>({...prev,[i]:{sa,ca,ic}}))} disabled={!!results[i]}/>
    </div>)}
    {allDone&&<div style={{marginTop:14}}>
      <div style={{padding:"10px 14px",borderRadius:10,background:C.accentSoft,border:`1px solid ${C.accentBorder}`,fontSize:13,color:C.text,marginBottom:12}}>✅ Score: {Object.values(results).filter(r=>r.ic).length}/{total}</div>
      <Btn onClick={()=>onContinue(Object.values(results).map(r=>r.sa).join(" | "),Object.values(results).map(r=>r.ca).join(" | "),Object.values(results).every(r=>r.ic))} style={{width:"100%"}}>Continue →</Btn>
    </div>}
  </div>;
}

function GapFillTask({task,onContinue}){
  const [answers,setAnswers]=useState({});const [usedWords,setUsedWords]=useState([]);const [checked,setChecked]=useState(false);
  const total=task.sentences.length;const allFilled=Object.keys(answers).length===total;
  const score=task.sentences.filter((s,i)=>answers[i]===s.answer).length;
  const handleSelect=(sentIdx,word)=>{
    if(checked)return;
    if(answers[sentIdx]===word){setAnswers(prev=>{const n={...prev};delete n[sentIdx];return n;});setUsedWords(prev=>prev.filter(w=>w!==word));}
    else{if(answers[sentIdx])setUsedWords(prev=>prev.filter(w=>w!==answers[sentIdx]));setAnswers(prev=>({...prev,[sentIdx]:word}));setUsedWords(prev=>[...prev.filter(w=>w!==word),word]);}
  };
  return <div>
    <div style={{fontSize:12,color:C.accent,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>{task.label}</div>
    <div style={{background:C.surface,borderRadius:12,padding:"12px 16px",marginBottom:14,fontSize:13,color:C.text}}>
      📖 Word Bank: {task.wordbank.map(w=><span key={w} style={{display:"inline-block",margin:"3px 4px",padding:"3px 10px",borderRadius:20,background:usedWords.includes(w)?C.card:C.accentSoft,border:`1px solid ${usedWords.includes(w)?C.accentBorder:C.accent}`,color:usedWords.includes(w)?C.textMuted:C.accent,fontWeight:600,fontSize:12}}>{w}</span>)}
    </div>
    {task.sentences.map((s,i)=>{
      const parts=s.text.split("___");const userAns=answers[i];const isCorrect=checked?userAns===s.answer:null;
      return <div key={i} style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${checked?(isCorrect?C.success+"40":C.error+"40"):C.accentBorder}`}}>
        <div style={{fontSize:14,color:C.text,lineHeight:1.6,marginBottom:8}}>
          {i+1}. {parts[0]}<span style={{display:"inline-block",minWidth:100,borderBottom:`2px solid ${checked?(isCorrect?C.success:C.error):C.accent}`,margin:"0 6px",padding:"0 6px",color:checked?(isCorrect?C.success:C.error):C.accent,fontWeight:700}}>{userAns||"_____"}</span>{parts[1]}
        </div>
        {!checked&&<div style={{display:"flex",flexWrap:"wrap",gap:6}}>{task.wordbank.filter(w=>!usedWords.includes(w)||answers[i]===w).map(w=><button key={w} onClick={()=>handleSelect(i,w)} style={{padding:"5px 12px",background:answers[i]===w?C.accentSoft:C.card,border:`1px solid ${answers[i]===w?C.accent:C.accentBorder}`,borderRadius:20,color:answers[i]===w?C.accent:C.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Segoe UI',sans-serif"}}>{w}</button>)}</div>}
        {checked&&<div style={{fontSize:12,color:isCorrect?C.success:C.error}}>{isCorrect?"✓ Correct!":` ✗ Correct: ${s.answer}`}</div>}
      </div>;
    })}
    {!checked&&<Btn onClick={()=>setChecked(true)} disabled={!allFilled} style={{marginTop:8}}>Check All →</Btn>}
    {checked&&<div style={{marginTop:14}}><div style={{padding:"10px 14px",borderRadius:10,background:C.accentSoft,border:`1px solid ${C.accentBorder}`,fontSize:13,color:C.text,marginBottom:12}}>✅ Score: {score}/{total}</div><Btn onClick={()=>onContinue(task.sentences.map((s,i)=>answers[i]||"—").join(" | "),task.sentences.map(s=>s.answer).join(" | "),score===total)} style={{width:"100%"}}>Continue →</Btn></div>}
  </div>;
}

function MixedP5Task({task,onContinue}){
  const [mcqResults,setMcqResults]=useState({});const [shortAnswer,setShortAnswer]=useState("");const [shortSubmitted,setShortSubmitted]=useState(false);
  const mcqDone=Object.keys(mcqResults).length===task.questions.length;const allDone=mcqDone&&shortSubmitted;
  return <div>
    <div style={{fontSize:12,color:C.accent,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:14}}>{task.label}</div>
    {task.questions.map((q,i)=><div key={i} style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.accentBorder}`}}>
      <SingleMCQ question={`${i+1}. ${q.question}`} options={q.options} correct={q.correct} onResult={(sa,ca,ic)=>setMcqResults(prev=>({...prev,[i]:{sa,ca,ic}}))} disabled={!!mcqResults[i]}/>
    </div>)}
    {mcqDone&&<div style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.accentBorder}`}}>
      <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:10}}>3. {task.shortAnswer}</div>
      <textarea value={shortAnswer} onChange={e=>setShortAnswer(e.target.value)} disabled={shortSubmitted} placeholder="Write 1–2 sentences here..." style={{width:"100%",minHeight:80,background:C.card,border:`1.5px solid ${shortSubmitted?C.success+"60":C.accentBorder}`,borderRadius:10,padding:12,color:C.text,fontFamily:"'Segoe UI',sans-serif",fontSize:14,resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
      {!shortSubmitted&&<Btn onClick={()=>{if(shortAnswer.trim())setShortSubmitted(true);}} disabled={!shortAnswer.trim()} color={C.gold} style={{marginTop:10}}>Save Answer →</Btn>}
      {shortSubmitted&&<div style={{marginTop:8,color:C.success,fontSize:13}}>✅ Saved</div>}
    </div>}
    {allDone&&<div style={{marginTop:14}}><div style={{padding:"10px 14px",borderRadius:10,background:C.accentSoft,border:`1px solid ${C.accentBorder}`,fontSize:13,color:C.text,marginBottom:12}}>✅ All answered!</div><Btn onClick={()=>onContinue([...Object.values(mcqResults).map(r=>r.sa),shortAnswer].join(" | "),[...Object.values(mcqResults).map(r=>r.ca),"(open)"].join(" | "),Object.values(mcqResults).every(r=>r.ic))} style={{width:"100%"}}>Continue →</Btn></div>}
  </div>;
}

// ─── VOCAB TASK 1 (student) ───────────────────────────────────────────────────
function VocabMatchTask({task,onDone}){
  const [selections,setSelections]=useState({});const [checked,setChecked]=useState(false);
  const allSelected=Object.keys(selections).length===task.words.length;
  const score=task.words.filter((_,i)=>selections[i]===task.answers[i]).length;
  return <Card>
    <h3 style={{color:C.stage1,marginBottom:6,fontSize:16}}>📋 Vocabulary Task 1: Match the Word to its Definition</h3>
    <p style={{color:C.textMuted,fontSize:13,marginBottom:16}}>Match each word (1–5) with the correct definition (a–e).</p>
    <div style={{background:C.surface,borderRadius:12,padding:"12px 16px",marginBottom:16}}>
      {task.definitions.map(d=><div key={d.letter} style={{fontSize:13,color:C.text,marginBottom:6,lineHeight:1.5}}><span style={{fontWeight:700,color:C.accent}}>{d.letter}.</span> {d.text}</div>)}
    </div>
    {task.words.map((word,i)=>{
      const sel=selections[i];const isCorrect=checked?sel===task.answers[i]:null;
      return <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10,padding:"12px 16px",background:C.surface,borderRadius:12,border:`1px solid ${checked?(isCorrect?C.success+"50":C.error+"50"):C.accentBorder}`}}>
        <div style={{fontWeight:700,color:C.text,fontSize:14,minWidth:130}}>{i+1}. {word}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {task.definitions.map(d=><button key={d.letter} onClick={()=>!checked&&setSelections(prev=>({...prev,[i]:d.letter}))} style={{width:32,height:32,borderRadius:"50%",background:sel===d.letter?C.accent:C.card,color:sel===d.letter?"#0f1923":C.textMuted,border:`1.5px solid ${sel===d.letter?C.accent:C.accentBorder}`,fontWeight:700,fontSize:13,cursor:checked?"default":"pointer",fontFamily:"'Segoe UI',sans-serif"}}>{d.letter}</button>)}
        </div>
        {checked&&<div style={{fontSize:13,color:isCorrect?C.success:C.error,marginLeft:"auto"}}>{isCorrect?"✓":`✗ → ${task.answers[i]}`}</div>}
      </div>;
    })}
    {!checked&&<Btn onClick={()=>setChecked(true)} disabled={!allSelected} style={{marginTop:8}}>Check Answers →</Btn>}
    {checked&&<div style={{marginTop:14}}><div style={{padding:"10px 14px",borderRadius:10,background:C.accentSoft,border:`1px solid ${C.accentBorder}`,fontSize:13,color:C.text,marginBottom:12}}>✅ Score: {score}/{task.words.length}</div><Btn onClick={()=>onDone(score,task.words.length)} style={{width:"100%"}}>Continue to Vocabulary Task 2 →</Btn></div>}
  </Card>;
}

function VocabGapFillTask({task,onDone}){
  const [answers,setAnswers]=useState({});const [usedWords,setUsedWords]=useState([]);const [checked,setChecked]=useState(false);
  const total=task.sentences.length;const allFilled=Object.keys(answers).length===total;
  const score=task.sentences.filter((s,i)=>answers[i]===s.answer).length;
  const handleSelect=(sentIdx,word)=>{
    if(checked)return;
    if(answers[sentIdx]===word){setAnswers(prev=>{const n={...prev};delete n[sentIdx];return n;});setUsedWords(prev=>prev.filter(w=>w!==word));}
    else{if(answers[sentIdx])setUsedWords(prev=>prev.filter(w=>w!==answers[sentIdx]));setAnswers(prev=>({...prev,[sentIdx]:word}));setUsedWords(prev=>[...prev.filter(w=>w!==word),word]);}
  };
  return <Card>
    <h3 style={{color:C.stage1,marginBottom:6,fontSize:16}}>📋 Vocabulary Task 2: Fill in the Gaps</h3>
    <div style={{background:C.surface,borderRadius:12,padding:"10px 14px",marginBottom:14,fontSize:13,color:C.text}}>
      📖 Word Bank: {task.wordbank.map(w=><span key={w} style={{display:"inline-block",margin:"3px 4px",padding:"3px 10px",borderRadius:20,background:usedWords.includes(w)?C.card:C.accentSoft,border:`1px solid ${usedWords.includes(w)?C.accentBorder:C.accent}`,color:usedWords.includes(w)?C.textMuted:C.accent,fontWeight:600,fontSize:12}}>{w}</span>)}
    </div>
    {task.sentences.map((s,i)=>{
      const parts=s.text.split("___");const userAns=answers[i];const isCorrect=checked?userAns===s.answer:null;
      return <div key={i} style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${checked?(isCorrect?C.success+"40":C.error+"40"):C.accentBorder}`}}>
        <div style={{fontSize:14,color:C.text,lineHeight:1.6,marginBottom:8}}>{i+1}. {parts[0]}<span style={{display:"inline-block",minWidth:100,borderBottom:`2px solid ${checked?(isCorrect?C.success:C.error):C.accent}`,margin:"0 6px",padding:"0 6px",color:checked?(isCorrect?C.success:C.error):C.accent,fontWeight:700}}>{userAns||"_____"}</span>{parts[1]}</div>
        {!checked&&<div style={{display:"flex",flexWrap:"wrap",gap:6}}>{task.wordbank.filter(w=>!usedWords.includes(w)||answers[i]===w).map(w=><button key={w} onClick={()=>handleSelect(i,w)} style={{padding:"5px 12px",background:answers[i]===w?C.accentSoft:C.card,border:`1px solid ${answers[i]===w?C.accent:C.accentBorder}`,borderRadius:20,color:answers[i]===w?C.accent:C.textMuted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Segoe UI',sans-serif"}}>{w}</button>)}</div>}
        {checked&&<div style={{fontSize:12,color:isCorrect?C.success:C.error}}>{isCorrect?"✓ Correct!":` ✗ Correct: ${s.answer}`}</div>}
      </div>;
    })}
    {!checked&&<Btn onClick={()=>setChecked(true)} disabled={!allFilled} style={{marginTop:8}}>Check Answers →</Btn>}
    {checked&&<div style={{marginTop:14}}><div style={{padding:"10px 14px",borderRadius:10,background:C.accentSoft,border:`1px solid ${C.accentBorder}`,fontSize:13,color:C.text,marginBottom:12}}>✅ Score: {score}/{total}</div><Btn onClick={()=>onDone(score,total)} style={{width:"100%"}}>Continue to Knowledge Check →</Btn></div>}
  </Card>;
}

// ─── TEACHER MIRROR COMPONENTS (read-only with student answers shown) ─────────
function TeacherMirrorTask({taskRecord}){
  // taskRecord: { task_label, question, student_answer, correct_answer, is_correct, stage }
  const sa=taskRecord.student_answer||"";
  const ca=taskRecord.correct_answer||"";
  const ic=taskRecord.is_correct;
  const stageColor=taskRecord.stage==="pre"?C.stage1:C.accent;
  const stageLabel=taskRecord.stage==="pre"?"Pre-Reading":"While Reading";

  // For multi-answer tasks the answers are pipe-separated
  const studentParts=sa.split(" | ");
  const correctParts=ca.split(" | ");
  const isMulti=studentParts.length>1;

  return <div style={{background:C.surface,borderRadius:14,padding:"16px 20px",marginBottom:14,border:`1px solid ${ic?C.success+"40":C.error+"40"}`}}>
    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
      <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:stageColor+"25",color:stageColor,fontWeight:700}}>{stageLabel}</span>
      <span style={{fontSize:12,color:C.textMuted,fontWeight:600}}>{taskRecord.task_label}</span>
      <span style={{marginLeft:"auto",fontSize:18,color:ic?C.success:C.error}}>{ic?"✓":"✗"}</span>
    </div>
    <div style={{fontWeight:600,fontSize:14,color:C.text,marginBottom:10}}>{taskRecord.question}</div>
    {isMulti ? (
      <div>
        {studentParts.map((ans,i)=>{
          const partCorrect=ans===correctParts[i];
          return <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"8px 12px",borderRadius:10,marginBottom:6,background:C.card,border:`1px solid ${partCorrect?C.success+"30":C.error+"30"}`}}>
            <span style={{fontSize:12,color:C.textMuted,minWidth:16}}>{i+1}.</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13}}><span style={{color:C.textMuted}}>Student: </span><span style={{fontWeight:700,color:partCorrect?C.success:C.error}}>{ans}</span></div>
              {!partCorrect&&<div style={{fontSize:12,marginTop:2}}><span style={{color:C.textMuted}}>Correct: </span><span style={{fontWeight:700,color:C.success}}>{correctParts[i]}</span></div>}
            </div>
            <span style={{color:partCorrect?C.success:C.error,fontSize:16}}>{partCorrect?"✓":"✗"}</span>
          </div>;
        })}
      </div>
    ) : (
      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
        <div style={{fontSize:13}}><span style={{color:C.textMuted}}>Student answered: </span><span style={{fontWeight:700,color:ic?C.success:C.error}}>{sa}</span></div>
        {!ic&&<div style={{fontSize:13}}><span style={{color:C.textMuted}}>Correct: </span><span style={{fontWeight:700,color:C.success}}>{ca}</span></div>}
      </div>
    )}
  </div>;
}

function TeacherAttemptView({att}){
  const fmt=(str)=>new Date(str).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
  const scoreOf=()=>att.tasks.length?`${att.tasks.filter(t=>t.is_correct).length}/${att.tasks.length}`:null;

  // Group tasks by stage
  const preTasks=att.tasks.filter(t=>t.stage==="pre");
  const whileTasks=att.tasks.filter(t=>t.stage==="while");

  return <div style={{background:C.surface,borderRadius:20,marginBottom:28,border:`1px solid ${C.accentBorder}`,overflow:"hidden"}}>
    {/* Header */}
    <div style={{padding:"16px 24px",background:C.card,borderBottom:`1px solid ${C.accentBorder}`,display:"flex",alignItems:"center",gap:16}}>
      <div style={{width:40,height:40,borderRadius:12,background:C.accentSoft,border:`1.5px solid ${C.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📋</div>
      <div style={{flex:1}}>
        <div style={{fontWeight:800,fontSize:16,color:C.text}}>Attempt started: {fmt(att.started_at)}</div>
        <div style={{fontSize:12,color:C.textMuted,marginTop:2}}>{lesson.title}</div>
      </div>
      {scoreOf()&&<div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.textMuted,marginBottom:2}}>Overall score</div><div style={{fontSize:22,fontWeight:800,color:C.accent}}>{scoreOf()}</div></div>}
    </div>

    <div style={{padding:"24px"}}>

      {/* ── PRE-READING section ── */}
      {preTasks.length>0&&<div style={{marginBottom:28}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:10,borderBottom:`2px solid ${C.stage1}30`}}>
          <span style={{fontSize:16,padding:"4px 14px",borderRadius:20,background:C.stage1+"20",color:C.stage1,fontWeight:800,fontSize:13}}>📖 Pre-Reading Tasks</span>
        </div>
        {preTasks.map((tr,i)=><TeacherMirrorTask key={i} taskRecord={tr}/>)}
      </div>}

      {/* ── WHILE READING section ── */}
      {whileTasks.length>0&&<div style={{marginBottom:28}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:10,borderBottom:`2px solid ${C.accent}30`}}>
          <span style={{fontSize:13,padding:"4px 14px",borderRadius:20,background:C.accent+"20",color:C.accent,fontWeight:800}}>🔍 While Reading Tasks</span>
        </div>
        {/* Show paragraph text + task result side by side */}
        {lesson.paragraphs.map((para,pi)=>{
          const tr=whileTasks.find(t=>t.task_label===para.task.label);
          if(!tr)return null;
          return <div key={pi} style={{marginBottom:20}}>
            {/* Paragraph text */}
            <div style={{background:C.card,borderRadius:14,padding:"14px 18px",marginBottom:10,border:`1px solid ${C.accentBorder}`}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{fontSize:28,flexShrink:0}}>{para.emoji}</div>
                <div>
                  <div style={{fontSize:11,color:C.textMuted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{para.label}</div>
                  <p style={{fontSize:13,lineHeight:1.7,color:C.text,margin:0}}>{para.text}</p>
                </div>
              </div>
            </div>
            {/* Task result */}
            <TeacherMirrorTask taskRecord={tr}/>
          </div>;
        })}
      </div>}

      {att.tasks.length===0&&<div style={{fontSize:13,color:C.textMuted,marginBottom:20}}>No test answers recorded yet.</div>}

      {/* ── POST-READING section ── */}
      {att.responses.length>0&&<div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:10,borderBottom:`2px solid ${C.gold}30`}}>
          <span style={{fontSize:13,padding:"4px 14px",borderRadius:20,background:C.gold+"20",color:C.gold,fontWeight:800}}>✍️ Post-Reading Open Answers</span>
        </div>
        {att.responses.map((r,ri)=><div key={ri} style={{marginBottom:14,background:C.card,borderRadius:14,padding:"16px 18px",border:`1px solid ${C.gold}30`}}>
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Q{ri+1}. {r.question}</div>
          <div style={{background:C.surface,borderRadius:10,padding:"12px 16px",fontSize:14,lineHeight:1.7,color:C.text,borderLeft:`3px solid ${C.gold}`}}>{r.answer}</div>
        </div>)}
      </div>}

      {att.responses.length===0&&att.tasks.length>0&&<div style={{fontSize:13,color:C.textMuted,padding:"12px 0"}}>Student hasn't submitted post-reading answers yet.</div>}
    </div>
  </div>;
}

// ─── STUDENT PANEL ────────────────────────────────────────────────────────────
function StudentPanel({user,onLogout}){
  const [stage,setStage]=useState(0);const [preStep,setPreStep]=useState(0);
  const [paraIndex,setParaIndex]=useState(0);const [parasDone,setParasDone]=useState([]);
  const [postAnswers,setPostAnswers]=useState({});const [postSubmitted,setPostSubmitted]=useState({});
  const [attemptId,setAttemptId]=useState(null);const [toast,setToast]=useState("");const [saving,setSaving]=useState(false);

  const createAttempt=async()=>{const{data}=await supabase.from("attempts").insert({user_id:user.id,lesson_title:lesson.title,started_at:new Date().toISOString()}).select().single();if(data)setAttemptId(data.id);};
  useEffect(()=>{createAttempt();},[]);
  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(""),2000);};
  const saveTask=async(stageLabel,taskLabel,question,sa,ca,ic)=>{if(!attemptId)return;await supabase.from("task_results").insert({user_id:user.id,attempt_id:attemptId,lesson_title:lesson.title,stage:stageLabel,task_label:taskLabel,question,student_answer:sa,correct_answer:ca,is_correct:ic,answered_at:new Date().toISOString()});};

  const handleVocabTask1Done=async(score,total)=>{await saveTask("pre","Vocab Task 1 – Match","Match word to definition (5 words)",`Score: ${score}/${total}`,`Score: ${total}/${total}`,score===total);setPreStep(2);};
  const handleVocabTask2Done=async(score,total)=>{await saveTask("pre","Vocab Task 2 – Gap Fill","Fill in the gaps (5 sentences)",`Score: ${score}/${total}`,`Score: ${total}/${total}`,score===total);setPreStep(3);};
  const handlePreCheckContinue=async(sa,ca,ic)=>{await saveTask("pre","Pre-Reading Check",lesson.preCheck.question,sa,ca,ic);setStage(1);};
  const handleParaContinue=async(paraIdx,sa,ca,ic)=>{const para=lesson.paragraphs[paraIdx];await saveTask("while",para.task.label,para.label+" task",sa,ca,ic);showToast(ic?"🎉 Well done!":"📖 Keep going!");setParasDone(prev=>[...prev,paraIdx]);if(paraIdx<lesson.paragraphs.length-1)setParaIndex(paraIdx+1);else setStage(2);};
  const submitPostAnswer=async(i)=>{if(!postAnswers[i]?.trim()||!attemptId)return;setSaving(true);await supabase.from("student_responses").insert({user_id:user.id,attempt_id:attemptId,question_id:lesson.postReading[i].id,question:lesson.postReading[i].question,answer:postAnswers[i]});setPostSubmitted(prev=>({...prev,[i]:true}));setSaving(false);showToast("✅ Answer saved!");};
  const restartLesson=async()=>{setStage(0);setPreStep(0);setParaIndex(0);setParasDone([]);setPostAnswers({});setPostSubmitted({});setAttemptId(null);const{data}=await supabase.from("attempts").insert({user_id:user.id,lesson_title:lesson.title,started_at:new Date().toISOString()}).select().single();if(data)setAttemptId(data.id);};
  const allSubmitted=lesson.postReading.every((_,i)=>postSubmitted[i]);

  const renderWhileTask=(para,i)=>{
    const props={onContinue:(sa,ca,ic)=>handleParaContinue(i,sa,ca,ic)};
    if(para.task.type==="multi_truefalse")return <MultiTrueFalseTask task={para.task} {...props}/>;
    if(para.task.type==="multi_mcq")return <MultiMCQTask task={para.task} {...props}/>;
    if(para.task.type==="gapfill")return <GapFillTask task={para.task} {...props}/>;
    if(para.task.type==="mixed_p5")return <MixedP5Task task={para.task} {...props}/>;
    return null;
  };

  return <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Segoe UI',sans-serif"}}>
    {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:C.accent,color:"#0f1923",padding:"12px 28px",borderRadius:50,fontWeight:800,zIndex:1000,fontSize:15,whiteSpace:"nowrap"}}>{toast}</div>}
    <div style={{background:C.surface,padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.accentBorder}`}}>
      <div><div style={{fontWeight:800,fontSize:18}}>🎓 Hearing Platform</div><div style={{fontSize:12,color:C.textMuted}}>Welcome, {user.user_metadata?.full_name||user.email}</div></div>
      <button onClick={onLogout} style={{background:"none",border:`1px solid ${C.accentBorder}`,borderRadius:8,padding:"8px 16px",color:C.textMuted,cursor:"pointer",fontSize:13}}>Log out</button>
    </div>
    <div style={{background:C.surface,padding:"12px 24px",display:"flex",gap:8,borderBottom:`1px solid ${C.accentBorder}`}}>
      {[["📖","Pre-Reading",C.stage1],["🔍","While Reading",C.accent],["✍️","Post-Reading",C.gold]].map(([icon,label,color],i)=>(
        <div key={i} style={{flex:1,textAlign:"center",padding:"8px",borderRadius:10,background:stage===i?color+"20":"transparent",border:`1px solid ${stage===i?color:"transparent"}`,fontSize:13,color:stage===i?color:stage>i?C.success:C.textMuted,fontWeight:stage===i?700:400}}>{icon} {label}</div>
      ))}
    </div>
    <div style={{maxWidth:700,margin:"0 auto",padding:"28px 20px"}}>
      {stage===0&&<div>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:4}}>{lesson.title}</h2>
        <p style={{color:C.textMuted,marginBottom:28,fontSize:14}}>{lesson.topic}</p>
        {preStep===0&&<>
          <h3 style={{marginBottom:4,color:C.stage1}}>📚 Key Vocabulary</h3>
          <p style={{color:C.textMuted,fontSize:13,marginBottom:18}}>Tap a card to see the meaning. Press 🔊 Listen to hear pronunciation.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:14,marginBottom:28}}>{lesson.vocab.map(v=><VocabCard key={v.word} item={v}/>)}</div>
          <Btn onClick={()=>setPreStep(1)} style={{width:"100%"}}>Continue to Vocabulary Tasks →</Btn>
        </>}
        {preStep===1&&<VocabMatchTask task={lesson.vocabTask1} onDone={handleVocabTask1Done}/>}
        {preStep===2&&<VocabGapFillTask task={lesson.vocabTask2} onDone={handleVocabTask2Done}/>}
        {preStep===3&&<Card>
          <h3 style={{marginBottom:16,color:C.stage1}}>🧠 Quick Knowledge Check</h3>
          <SingleMCQ question={lesson.preCheck.question} options={lesson.preCheck.options} correct={lesson.preCheck.correct} onResult={(sa,ca,ic)=>handlePreCheckContinue(sa,ca,ic)} disabled={false}/>
        </Card>}
      </div>}
      {stage===1&&<div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <h3 style={{color:C.accent,fontSize:18}}>🔍 While Reading</h3>
          <div style={{fontSize:13,color:C.textMuted}}>{parasDone.length}/{lesson.paragraphs.length} completed</div>
        </div>
        {lesson.paragraphs.map((para,i)=>{
          if(i>paraIndex)return null;
          const isActive=i===paraIndex;const isDone=parasDone.includes(i)&&!isActive;
          return <div key={i}>
            <Card><div style={{display:"flex",gap:14,alignItems:"flex-start"}}><div style={{fontSize:36,flexShrink:0}}>{para.emoji}</div><div><div style={{fontSize:11,color:C.textMuted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>{para.label}</div><p style={{fontSize:15,lineHeight:1.8,color:C.text,margin:0}}>{para.text}</p></div></div></Card>
            {isActive&&<Card style={{borderColor:C.accent+"60"}}>{renderWhileTask(para,i)}</Card>}
            {isDone&&<div style={{color:C.success,fontSize:12,marginBottom:16,marginTop:-10}}>✓ Completed</div>}
          </div>;
        })}
      </div>}
      {stage===2&&<div>
        <h3 style={{color:C.gold,marginBottom:6,fontSize:18}}>✍️ Post-Reading Questions</h3>
        <p style={{color:C.textMuted,fontSize:14,marginBottom:24}}>Write your answers. Your teacher will review them.</p>
        {lesson.postReading.map((item,i)=><Card key={i}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:C.goldSoft,border:`1.5px solid ${C.gold}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold,fontWeight:800,fontSize:14,flexShrink:0}}>{i+1}</div>
            <div style={{fontWeight:600,fontSize:15,color:C.text,lineHeight:1.5}}>{item.question}</div>
          </div>
          <div style={{fontSize:12,color:C.gold,marginBottom:14,paddingLeft:44}}>💡 {item.hint}</div>
          <textarea value={postAnswers[i]||""} onChange={e=>setPostAnswers(p=>({...p,[i]:e.target.value}))} disabled={postSubmitted[i]} placeholder="Write your answer here..." style={{width:"100%",minHeight:100,background:C.surface,border:`1.5px solid ${postSubmitted[i]?C.success+"60":C.accentBorder}`,borderRadius:10,padding:14,color:C.text,fontFamily:"'Segoe UI',sans-serif",fontSize:14,resize:"vertical",outline:"none",boxSizing:"border-box",lineHeight:1.6}}/>
          {!postSubmitted[i]?<Btn onClick={()=>submitPostAnswer(i)} color={C.gold} disabled={saving||!postAnswers[i]?.trim()} style={{marginTop:12}}>{saving?"Saving...":"Save Answer →"}</Btn>:<div style={{marginTop:12,color:C.success,fontSize:13}}>✅ Saved — your teacher will review it</div>}
        </Card>)}
        {allSubmitted&&<div style={{textAlign:"center",padding:36,background:C.accentSoft,borderRadius:24,border:`1px solid ${C.accentBorder}`}}>
          <div style={{fontSize:52,marginBottom:12}}>🏆</div>
          <div style={{fontSize:24,fontWeight:800,marginBottom:8}}>Lesson Complete!</div>
          <div style={{color:C.textMuted,fontSize:14,marginBottom:24}}>All answers saved. Great work!</div>
          <Btn onClick={restartLesson} style={{width:"100%"}}>🔄 Restart Lesson</Btn>
        </div>}
      </div>}
    </div>
  </div>;
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({user,onLogout}){
  const [students,setStudents]=useState([]);const [selected,setSelected]=useState(null);
  const [attempts,setAttempts]=useState([]);const [loading,setLoading]=useState(true);const [loadingStudent,setLoadingStudent]=useState(false);

  useEffect(()=>{supabase.from("profiles").select("*").eq("role","student").order("created_at",{ascending:false}).then(({data})=>{setStudents(data||[]);setLoading(false);});},[]); 

  const loadStudent=async(student)=>{
    setSelected(student);setAttempts([]);setLoadingStudent(true);
    const{data:atts}=await supabase.from("attempts").select("*").eq("user_id",student.id).order("started_at",{ascending:false});
    if(!atts||atts.length===0){setAttempts([]);setLoadingStudent(false);return;}
    const enriched=await Promise.all(atts.map(async(att)=>{
      const [{data:tasks},{data:responses}]=await Promise.all([
        supabase.from("task_results").select("*").eq("attempt_id",att.id).order("answered_at",{ascending:true}),
        supabase.from("student_responses").select("*").eq("attempt_id",att.id).order("created_at",{ascending:true}),
      ]);
      return{...att,tasks:tasks||[],responses:responses||[]};
    }));
    setAttempts(enriched);setLoadingStudent(false);
  };

  return <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Segoe UI',sans-serif"}}>
    <div style={{background:C.surface,padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.accentBorder}`}}>
      <div><div style={{fontWeight:800,fontSize:18}}>⚙️ Admin Panel</div><div style={{fontSize:12,color:C.textMuted}}>{user.email}</div></div>
      <button onClick={onLogout} style={{background:"none",border:`1px solid ${C.accentBorder}`,borderRadius:8,padding:"8px 16px",color:C.textMuted,cursor:"pointer",fontSize:13}}>Log out</button>
    </div>
    <div style={{display:"flex",height:"calc(100vh - 65px)"}}>
      {/* LEFT: student list */}
      <div style={{width:260,background:C.surface,borderRight:`1px solid ${C.accentBorder}`,overflowY:"auto",flexShrink:0}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.accentBorder}`}}><div style={{fontWeight:700,color:C.accent,fontSize:14}}>👥 Students ({students.length})</div></div>
        {loading&&<div style={{padding:20,color:C.textMuted,fontSize:13}}>Loading...</div>}
        {!loading&&students.length===0&&<div style={{padding:20,color:C.textMuted,fontSize:13}}>No students yet.</div>}
        {students.map(s=><div key={s.id} onClick={()=>loadStudent(s)} style={{padding:"14px 20px",cursor:"pointer",borderBottom:`1px solid ${C.accentBorder}20`,background:selected?.id===s.id?C.accentSoft:"transparent",borderLeft:`3px solid ${selected?.id===s.id?C.accent:"transparent"}`,transition:"all 0.15s"}}>
          <div style={{fontWeight:600,fontSize:14,color:C.text}}>{s.full_name}</div>
          <div style={{fontSize:12,color:C.textMuted,marginTop:2}}>{s.email}</div>
        </div>)}
      </div>
      {/* RIGHT: attempt mirror view */}
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
        {!selected&&<div style={{textAlign:"center",padding:60,color:C.textMuted}}><div style={{fontSize:48,marginBottom:16}}>👈</div><div style={{fontSize:16}}>Select a student to see their lesson</div></div>}
        {selected&&loadingStudent&&<div style={{color:C.textMuted,padding:20}}>Loading...</div>}
        {selected&&!loadingStudent&&<div>
          <div style={{marginBottom:28}}>
            <h2 style={{fontSize:22,fontWeight:800,marginBottom:4}}>{selected.full_name}</h2>
            <div style={{fontSize:13,color:C.textMuted}}>{selected.email} · {attempts.length} attempt{attempts.length!==1?"s":""}</div>
          </div>
          {attempts.length===0&&<div style={{color:C.textMuted,padding:"20px",background:C.surface,borderRadius:16,textAlign:"center"}}>This student hasn't started the lesson yet.</div>}
          {attempts.map((att,ai)=><div key={att.id}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{fontSize:15,fontWeight:800,color:C.text}}>Attempt #{attempts.length-ai}</div>
              {att.tasks.length>0&&<div style={{fontSize:13,color:C.accent,fontWeight:600}}>Score: {att.tasks.filter(t=>t.is_correct).length}/{att.tasks.length}</div>}
            </div>
            <TeacherAttemptView att={att}/>
          </div>)}
        </div>}
      </div>
    </div>
  </div>;
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);const [profile,setProfile]=useState(null);const [checking,setChecking]=useState(true);
  useEffect(()=>{supabase.auth.getSession().then(async({data})=>{if(data.session?.user){setUser(data.session.user);const{data:p}=await supabase.from("profiles").select("*").eq("id",data.session.user.id).single();setProfile(p);}setChecking(false);});},[]); 
  const handleLogin=async(u)=>{setUser(u);const{data:p}=await supabase.from("profiles").select("*").eq("id",u.id).single();if(!p){await supabase.from("profiles").upsert({id:u.id,email:u.email,full_name:u.user_metadata?.full_name||u.email,role:u.email===ADMIN_EMAIL?"admin":"student"});const{data:p2}=await supabase.from("profiles").select("*").eq("id",u.id).single();setProfile(p2);}else setProfile(p);};
  const handleLogout=async()=>{await supabase.auth.signOut();setUser(null);setProfile(null);};
  if(checking)return <div style={{minHeight:"100vh",background:"#0f1923",display:"flex",alignItems:"center",justifyContent:"center",color:"#00c9a7",fontSize:18}}>Loading...</div>;
  if(!user)return <AuthScreen onLogin={handleLogin}/>;
  if(profile?.role==="admin"||user.email===ADMIN_EMAIL)return <AdminPanel user={user} onLogout={handleLogout}/>;
  return <StudentPanel user={user} onLogout={handleLogout}/>;
}
