/* مُجيب — دالة Netlify: وسيط Gemini
   المفتاح يُقرأ من متغير البيئة GEMINI_KEY (يُضبط في لوحة Netlify فقط)
   لا يوضع المفتاح أبدًا في الكود أو في GitHub */

const MODEL = "gemini-3.6-flash";

const SYSTEM_PROMPT =
  "أنت «مُجيب»، مساعد متخصص في الأسئلة الدينية والتاريخ الإسلامي. التزم بهذه القواعد بصرامة:\n" +
  "1) أجب بالعربية الفصحى المبسطة، باختصار (3-6 جمل).\n" +
  "2) اعتمد فقط على: القرآن الكريم، صحيح البخاري وصحيح مسلم، السنن المعتمدة، كتب السيرة (ابن هشام)، وكتب التاريخ الموثوقة (الطبري، ابن كثير).\n" +
  "3) اذكر مصدر كل معلومة بين قوسين بعدها مباشرة.\n" +
  "4) إن لم تجد دليلًا موثوقًا فقل بوضوح: «لا أعلم — لم أجد دليلًا موثوقًا». لا تخترع أحاديث أو آيات أو وقائع تاريخية أبدًا.\n" +
  "5) في الفتاوى والقضايا الخلافية المعاصرة: اذكر القول الراجح باختصار وأحِل السائل إلى أهل العلم.\n" +
  "6) ابدأ الإجابة مباشرة دون مقدمات.";

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

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const reply = (statusCode, body) => ({ statusCode, headers: HEADERS, body: JSON.stringify(body) });

/* استدعاء Gemini مع إعادة محاولة تلقائية عند الضغط المؤقت (503/429) */
async function geminiWithRetry(url, payload, tries) {
  tries = tries || 3;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (r.ok) return r;
      if (r.status === 429 || (r.status >= 500 && r.status < 600)) {
        await new Promise(res => setTimeout(res, 1500 * (i + 1)));
        continue;
      }
      return r; // خطأ نهائي لا تُعاد محاولته
    } catch (e) {
      await new Promise(res => setTimeout(res, 1500 * (i + 1)));
    }
  }
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });

  const ip = (event.headers && (event.headers["client-ip"] || event.headers["x-forwarded-for"])) || "unknown";
  if (rateLimited(ip)) return reply(429, { error: "too many requests" });

  const key = process.env.GEMINI_KEY;
  if (!key) return reply(500, { error: "server not configured" });

  let q = "";
  try { q = JSON.parse(event.body || "{}").question || ""; } catch (e) { /* ignore */ }
  q = q.toString().trim().slice(0, 500);
  if (!q) return reply(400, { error: "empty question" });

  const url = "https://generativelanguage.googleapis.com/v1beta/models/" +
    MODEL + ":generateContent?key=" + encodeURIComponent(key);

  try {
    const r = await geminiWithRetry(url, {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: q }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 4000 },
    });
    if (!r) return reply(502, { error: "gemini busy" });
    if (!r.ok) return reply(502, { error: "gemini error" });
    const j = await r.json();
    const parts = j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts;
    const text = parts ? parts.map(p => p.text || "").join("").trim() : "";
    if (!text) return reply(502, { error: "empty answer" });
    return reply(200, { answer: text });
  } catch (e) {
    return reply(502, { error: "upstream unreachable" });
  }
};
