/* مُجيب — دالة Netlify: وسيط Gemini
   المفتاح يُقرأ من متغير البيئة GEMINI_KEY (يُضبط في لوحة Netlify فقط)
   لا يوضع المفتاح أبدًا في الكود أو في GitHub */

const MODEL = "gemini-flash-lite-latest";

const SYSTEM_PROMPT_AR =
  "أنت «مُجيب»، مساعد متخصص في الأسئلة الدينية والتاريخ الإسلامي. التزم بهذه القواعد بصرامة:\n" +
  "1) أجب بالعربية الفصحى المبسطة، باختصار (3-6 جمل).\n" +
  "2) اعتمد فقط على: القرآن الكريم، صحيح البخاري وصحيح مسلم، السنن المعتمدة، كتب السيرة (ابن هشام)، وكتب التاريخ الموثوقة (الطبري، ابن كثير).\n" +
  "3) اذكر مصدر كل معلومة بين قوسين بعدها مباشرة.\n" +
  "4) إن لم تجد دليلًا موثوقًا فقل بوضوح: «لا أعلم — لم أجد دليلًا موثوقًا». لا تخترع أحاديث أو آيات أو وقائع تاريخية أبدًا.\n" +
  "5) في الفتاوى والقضايا الخلافية المعاصرة: اذكر القول الراجح باختصار وأحِل السائل إلى أهل العلم.\n" +
  "6) ابدأ الإجابة مباشرة دون مقدمات.\n" +
  "7) اختم إجابتك دائمًا بقسم مستقل بهذا الشكل حرفيًا:\n" +
  "المصادر:\n" +
  "- [المصدر الأول]\n" +
  "- [المصدر الثاني]\n" +
  "اذكر كل مصدر استخدمته فعلًا في الإجابة، ولا تذكر مصادر لم تستخدمها.";

const SYSTEM_PROMPT_EN =
  "You are \"Mujeeb\", an assistant specialized in Islamic religious questions and Islamic history. Follow these rules strictly:\n" +
  "1) Answer in clear simple English, briefly (3-6 sentences).\n" +
  "2) Rely only on: the Holy Quran, Sahih al-Bukhari and Sahih Muslim, the canonical Sunan collections, seerah books (Ibn Hisham), and trusted history books (al-Tabari, Ibn Kathir).\n" +
  "3) Cite the source of each fact in parentheses right after it.\n" +
  "4) If you find no reliable evidence, say clearly: \"I don't know — I found no reliable evidence.\" Never invent hadiths, verses, or historical events.\n" +
  "5) For fatwas and contemporary disputed matters: mention the preponderant view briefly and refer the asker to qualified scholars.\n" +
  "6) Start the answer directly without introductions.\n" +
  "7) Always end your answer with a standalone section in exactly this format:\n" +
  "Sources:\n" +
  "- [first source]\n" +
  "- [second source]\n" +
  "List every source you actually used in the answer, and list no source you did not use.";

/* حماية بسيطة: 20 طلبًا في الدقيقة لكل زائر */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < 60000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 20;
}

/* استدعاء Gemini مع إعادة محاولة فورية عند الضغط المؤقت (503/429) —
   مهلة 9 ثوانٍ لكل محاولة لتناسب حدود الاستضافة */
async function geminiWithRetry(url, payload, tries) {
  tries = tries || 2;
  for (let i = 0; i < tries; i++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (r.ok) return r;
      if (r.status === 429 || (r.status >= 500 && r.status < 600)) continue;
      return r; // خطأ نهائي لا تُعاد محاولته
    } catch (e) {
      clearTimeout(timer);
    }
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const ip = req.headers["x-forwarded-for"] || "unknown";
  if (rateLimited(ip)) return res.status(429).json({ error: "too many requests" });

  const key = process.env.GEMINI_KEY;
  if (!key) return res.status(500).json({ error: "server not configured" });

  let q = "";
  let lang = "ar";
  try {
    q = (req.body && req.body.question) || "";
    lang = (req.body && req.body.lang) || "ar";
  } catch (e) { /* ignore */ }
  q = q.toString().trim().slice(0, 500);
  if (!q) return res.status(400).json({ error: "empty question" });
  const SYSTEM_PROMPT = lang === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_AR;

  const url = "https://generativelanguage.googleapis.com/v1beta/models/" +
    MODEL + ":generateContent?key=" + encodeURIComponent(key);

  try {
    const r = await geminiWithRetry(url, {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: q }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 1000 },
    });
    if (!r) return res.status(502).json({ error: "gemini busy" });
    if (!r.ok) return res.status(502).json({ error: "gemini error" });
    const j = await r.json();
    const parts = j.candidates && j.candidates[0] && j.candidates[0].content &&
      j.candidates[0].content.parts;
    const text = parts ? parts.map(p => p.text || "").join("").trim() : "";
    if (!text) return res.status(502).json({ error: "empty answer" });
    return res.status(200).json({ answer: text });
  } catch (e) {
    return res.status(502).json({ error: "upstream unreachable" });
  }
}
