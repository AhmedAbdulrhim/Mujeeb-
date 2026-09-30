# نشر مُجيب (مجاني بالكامل) — اختر Netlify أو Vercel

## على Netlify

1. سجّل حسابًا مجانيًا على **netlify.com** (يمكن الدخول بحساب GitHub مباشرة).
2. **Add new site → Import an existing project** واختر مستودع المشروع.
   سيتعرف Netlify تلقائيًا على الإعدادات من `netlify.toml` — اضغط **Deploy**.
3. بعد النشر: **Site settings → Environment variables → Add a variable**:
   - Key: `GEMINI_KEY`
   - Value: مفتاحك المجاني من https://aistudio.google.com/apikey (زر Create API Key)
   ثم **Save** وأعد النشر (Deploys → Trigger deploy).
4. افتح رابط موقعك (مثل `https://mujeeb.netlify.app`) واسأل أي سؤال ديني.

## على Vercel

1. سجّل حسابًا مجانيًا على **vercel.com** (الدخول بحساب GitHub).
2. **Add New → Project** واختر مستودع المشروع — اضغط **Deploy**
   (Vercel يكتشف دالة `api/ask.js` تلقائيًا، لا حاجة لإعدادات).
3. بعد النشر: **Settings → Environment Variables** وأضف:
   - Key: `GEMINI_KEY` — Value: مفتاحك من https://aistudio.google.com/apikey
   ثم أعد النشر من تبويب **Deployments**.
4. افتح رابط موقعك (مثل `https://mujeeb.vercel.app`) واسأل أي سؤال ديني.

## ملاحظات

- ارفع ملفات هذا المجلد إلى مستودع GitHub عام أولًا
  (`index.html`، `styles.css`، `app.js`، `knowledge.js`، `functions/ask.js`،
  `api/ask.js`، `netlify.toml`، `README.md`، `DEPLOY.md`، `.gitignore`، `.env.example`).
  ⚠️ لا ترفع أي ملف `.env` حقيقي — المفتاح لا يوضع في GitHub أبدًا.
- الخطط المجانية في Netlify وVercel وGemini كافية تمامًا للعرض والتحكيم.
- ملف `mujeeb-deck.pdf` هو ملف العرض التقديمي المستخدم في التسجيل (للأرشفة).
