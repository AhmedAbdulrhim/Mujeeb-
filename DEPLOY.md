# نشر مُجيب على Netlify (مجاني بالكامل)

## الخطوات

1. أنشئ حسابًا على **github.com** (مجاني، دقيقتان).
2. أنشئ مستودعًا (Repository) جديدًا عامًا باسم `mujeeb` وارفع إليه كل ملفات هذا المجلد:
   `index.html`، `styles.css`، `app.js`، `knowledge.js`، `functions/ask.js`،
   `netlify.toml`، `README.md`، `DEPLOY.md`، `.gitignore`، `.env.example`.
   ⚠️ لا ترفع أي ملف `.env` حقيقي — المفتاح لا يوضع في GitHub أبدًا.
3. سجّل حسابًا مجانيًا على **netlify.com** (يمكن الدخول بحساب GitHub مباشرة).
4. في Netlify: **Add new site → Import an existing project** واختر مستودع `mujeeb`.
   سيتعرف Netlify تلقائيًا على الإعدادات من `netlify.toml` — اضغط **Deploy**.
5. بعد النشر: **Site settings → Environment variables → Add a variable**:
   - Key: `GEMINI_KEY`
   - Value: مفتاحك المجاني من https://aistudio.google.com/apikey (زر Create API Key)
   ثم **Save** وأعد النشر (Deploys → Trigger deploy).
6. افتح رابط موقعك (مثل `https://mujeeb.netlify.app`) واسأل أي سؤال ديني.

## ملاحظات

- الخطة المجانية في Netlify وGemini كافية تمامًا للعرض والتحكيم.
- الدالة المنشورة على `/.netlify/functions/ask` مربوطة تلقائيًا من كود الموقع.
- ملف `mujeeb-deck.pdf` هو ملف العرض التقديمي المستخدم في التسجيل (للأرشفة).
