/* مُجيب — محرك هجين: قاعدة معرفية موثقة أولًا، ثم ذكاء اصطناعي منضبط */
(function(){
  "use strict";

  /* ---------- تطبيع النص العربي ---------- */
  function norm(s){
    return (s||"")
      .replace(/[ً-ٰٟ]/g,"")
      .replace(/[أإآٱ]/g,"ا")
      .replace(/ة/g,"ه")
      .replace(/ى/g,"ي")
      .replace(/ؤ/g,"و").replace(/ئ/g,"ي")
      .replace(/[^ء-غف-يa-zA-Z0-9 ]/g," ")
      .replace(/\s+/g," ").trim();
  }
  const STOP = new Set(("ما هو هي هل كم متى أين كيف لماذا ومن وما وهل في على إلى من عن أن إن كان كانت يكون التي الذي الذين ما".split(" ")).map(norm));
  function tokens(s){
    return norm(s).split(" ").filter(t=>t.length>1 && !STOP.has(t));
  }

  /* ---------- المطابقة المحلية (القاعدة الموثقة) ---------- */
  const DF = {};
  for(const e of KNOWLEDGE){
    const s = new Set(tokens(e.q+" "+e.kw.join(" ")));
    for(const t of s){ DF[t]=(DF[t]||0)+1; }
  }
  function findLocal(q){
    const qTok = tokens(q);
    if(qTok.length===0) return null;
    let best=null, bestS=0;
    for(const e of KNOWLEDGE){
      const eTok = new Set(tokens(e.q+" "+e.kw.join(" ")));
      const eKw  = new Set(tokens(e.kw.join(" ")));
      const matched = qTok.filter(t=>eTok.has(t));
      if(matched.length===0) continue;
      let ok = matched.length>=2;
      if(!ok && matched.length===1){
        const t=matched[0];
        if(eKw.has(t) && (DF[t]||99)<=3) ok=true;
      }
      if(!ok) continue;
      let s = matched.length;
      for(const t of matched){ if(eKw.has(t)) s+=1; }
      if(s>bestS){ bestS=s; best=e; }
    }
    if(!best) return null;
    return {entry:best, conf:Math.min(98, 70+Math.round(bestS*6))};
  }

  /* ---------- طبقة الذكاء الاصطناعي ---------- */
  const MODEL = "gemini-2.0-flash";

  /* ضع هنا رابط الـ Worker بعد نشره على Cloudflare، مثال:
     const PROXY_URL = "https://mujeeb-xxx.workers.dev";
     عند وجوده يستخدم الزوار مفتاحك دون الحاجة لمفاتيح خاصة بهم.
     على Netlify: الدالة المنشورة في netlify/functions/ask.js تعمل تلقائيًا
     على المسار /.netlify/functions/ask — والمفتاح يُضبط كمتغير بيئة
     GEMINI_KEY في لوحة Netlify (لا يوضع في GitHub أبدًا). */
  const PROXY_URL = "/.netlify/functions/ask";

  let apiKey = null;
  try{ apiKey = localStorage.getItem("mujeeb_gemini_key") || null; }catch(e){}

  const SYSTEM_PROMPT =
    "أنت «مُجيب»، مساعد متخصص في الأسئلة الدينية والتاريخ الإسلامي. التزم بهذه القواعد بصرامة:\n"+
    "1) أجب بالعربية الفصحى المبسطة، باختصار (3-6 جمل).\n"+
    "2) اعتمد فقط على: القرآن الكريم، صحيح البخاري وصحيح مسلم، السنن المعتمدة، كتب السيرة (ابن هشام)، وكتب التاريخ الموثوقة (الطبري، ابن كثير).\n"+
    "3) اذكر مصدر كل معلومة بين قوسين بعدها مباشرة.\n"+
    "4) إن لم تجد دليلًا موثوقًا فقل بوضوح: «لا أعلم — لم أجد دليلًا موثوقًا». لا تخترع أحاديث أو آيات أو وقائع تاريخية أبدًا.\n"+
    "5) في الفتاوى والقضايا الخلافية المعاصرة: اذكر القول الراجح باختصار وأحِل السائل إلى أهل العلم.\n"+
    "6) ابدأ الإجابة مباشرة دون مقدمات.";

  async function askProxy(q){
    const r = await fetch(PROXY_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({question:q})
    });
    if(!r.ok) throw new Error("proxy "+r.status);
    const j = await r.json();
    if(!j.answer) throw new Error("empty");
    return j.answer.trim();
  }

  async function askGemini(q){
    const url = "https://generativelanguage.googleapis.com/v1beta/models/"+MODEL+":generateContent?key="+encodeURIComponent(apiKey);
    const body = {
      systemInstruction:{ parts:[{text:SYSTEM_PROMPT}] },
      contents:[{ parts:[{text:q}] }],
      generationConfig:{ temperature:0.3, maxOutputTokens:600 }
    };
    const r = await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    if(!r.ok) throw new Error("api "+r.status);
    const j = await r.json();
    const t = j.candidates && j.candidates[0] && j.candidates[0].content &&
              j.candidates[0].content.parts.map(p=>p.text||"").join("");
    if(!t) throw new Error("empty");
    return t.trim();
  }

  /* ---------- العرض ---------- */
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  function show(html){
    const box = document.getElementById("answerCard");
    box.innerHTML = html;
    const sec = document.getElementById("answerSection");
    sec.classList.remove("hidden");
    sec.scrollIntoView({behavior:"smooth",block:"center"});
  }

  function verifiedCard(res){
    const e=res.entry;
    const srcs=e.src.map(s=>"<li>"+esc(s)+"</li>").join("");
    return '<div class="card"><span class="cat">'+esc(e.cat)+'</span> '+
      '<span class="cat verified">✓ إجابة موثقة</span>'+
      "<h2>"+esc(e.q)+"</h2>"+
      '<p class="ans">'+esc(e.a)+"</p>"+
      '<div class="srcs"><h4>المصادر والمراجع</h4><ul>'+srcs+"</ul></div>"+
      '<div class="conf"><span>ثقة الإجابة</span><div class="bar"><i style="width:'+res.conf+'%"></i></div><span>'+res.conf+'%</span></div></div>';
  }

  function aiCard(text, q){
    const paras = esc(text).split(/\n+/).map(p=>"<p>"+p+"</p>").join("");
    return '<div class="card ai"><span class="cat ai-badge">✦ إجابة ذكية</span>'+
      "<h2>"+esc(q)+"</h2>"+
      '<div class="ans ai-text">'+paras+"</div>"+
      '<p class="disclaimer">أُنتجت هذه الإجابة بالذكاء الاصطناعي من مصادر إسلامية معتمدة — تحقق من المصادر المذكورة، واستشر أهل العلم في الفتاوى.</p></div>';
  }

  function refusalCard(q, extra){
    return '<div class="card refusal"><div class="big">🔍</div>'+
      "<h2>لا إجابة بلا دليل</h2>"+
      "<p>لم أجد إجابة موثقة لسؤالك: «"+esc(q)+"»<br>"+
      (extra||"أفضّل الصمت على التخمين — جرّب صياغة أخرى أو سؤالًا في الصلاة، السيرة، أو التاريخ الإسلامي.")+"</p></div>";
  }

  function loadingCard(){
    return '<div class="card refusal"><div class="spinner"></div>'+
      "<h2>مُجيب يبحث في المصادر…</h2>"+
      "<p>لحظات ويأتيك الجواب الموثق</p></div>";
  }

  async function answer(q){
    const local = findLocal(q);
    if(local){ show(verifiedCard(local)); return; }
    // الوضع 1: وسيط الخادم — الزوار يستخدمون مفتاح المالك
    if(PROXY_URL){
      show(loadingCard());
      try{
        const text = await askProxy(q);
        if(/لا أعلم|لم أجد دليل/i.test(text.slice(0,80))){
          show(refusalCard(q, "لم يُعثر على دليل موثوق — فضّل مُجيب الصمت على التخمين."));
        }else{
          show(aiCard(text, q));
        }
      }catch(err){
        show(refusalCard(q, "تعذر الاتصال بخدمة الذكاء الاصطناعي — حاول مجددًا بعد قليل."));
      }
      return;
    }
    // الوضع 2: مفتاح شخصي مباشر
    if(!apiKey){
      show(refusalCard(q));
      return;
    }
    show(loadingCard());
    try{
      const text = await askGemini(q);
      if(/لا أعلم|لم أجد دليل/i.test(text.slice(0,80))){
        show(refusalCard(q, "الذكاء الاصطناعي لم يجد دليلًا موثوقًا — فضّل الصمت على التخمين."));
      }else{
        show(aiCard(text, q));
      }
    }catch(err){
      show(refusalCard(q, "تعذر الاتصال بخدمة الذكاء الاصطناعي — تحقق من مفتاح API وحاول مجددًا."));
    }
  }

  /* ---------- الإعدادات (مفتاح Gemini) ---------- */
  function openSettings(){
    document.getElementById("settingsModal").classList.remove("hidden");
    const keyRow = document.getElementById("keyRow");
    const srvNote = document.getElementById("serverNote");
    if(PROXY_URL){
      if(keyRow) keyRow.style.display="none";
      if(srvNote) srvNote.classList.remove("hidden");
    }else{
      if(keyRow) keyRow.style.display="";
      if(srvNote) srvNote.classList.add("hidden");
      document.getElementById("apiKey").value = apiKey||"";
    }
  }
  function closeSettings(){
    document.getElementById("settingsModal").classList.add("hidden");
  }
  function saveKey(){
    const v=document.getElementById("apiKey").value.trim();
    apiKey = v||null;
    try{
      if(v) localStorage.setItem("mujeeb_gemini_key", v);
      else localStorage.removeItem("mujeeb_gemini_key");
    }catch(e){}
    closeSettings();
    const st=document.getElementById("keyStatus");
    if(st) st.textContent = apiKey ? "متصل" : "غير مضاف";
  }

  document.getElementById("askForm").addEventListener("submit",function(ev){
    ev.preventDefault();
    const q=document.getElementById("q").value.trim();
    if(q) answer(q);
  });
  document.querySelectorAll(".samples button").forEach(function(b){
    b.addEventListener("click",function(){
      const q=b.getAttribute("data-q");
      document.getElementById("q").value=q;
      answer(q);
    });
  });
  const sb=document.getElementById("settingsBtn");
  if(sb) sb.addEventListener("click", openSettings);
  const sc=document.getElementById("settingsClose");
  if(sc) sc.addEventListener("click", closeSettings);
  const sv=document.getElementById("saveKey");
  if(sv) sv.addEventListener("click", saveKey);
  const st0=document.getElementById("keyStatus");
  if(st0) st0.textContent = PROXY_URL ? "متصل عبر الخادم" : (apiKey ? "متصل" : "غير مضاف");
})();
