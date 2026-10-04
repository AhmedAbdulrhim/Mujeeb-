/* مُجيب — قاموس الترجمة (العربية / الإنجليزية) */
const I18N = {
ar: {
  dir: "rtl", langLabel: "EN",
  langAria: "تغيير اللغة", qAria: "سؤالك", navAria: "التنقل الرئيسي",
  navLogo: "مُجيب", navHow: "كيف يعمل", navFaq: "الأسئلة الشائعة", navAbout: "من نحن", navContact: "تواصل معنا",
  badge: "مساعدك الذكي للمعرفة الإسلامية الموثوقة",
  tagline1: "عندك سؤال ديني أو تاريخي؟", tagline2: "الإجابة الموثقة هنا", gold: "لا إجابة بلا دليل",
  placeholder: "اكتب سؤالك… مثال: متى كانت غزوة بدر؟", askBtn: "اسأل مُجيب",
  samplesLabel: "جرّب:", s1: "أركان الصلاة", s2: "فتح القسطنطينية", s3: "عدد سور القرآن", s4: "صلاح الدين",
  q1: "ما هي أركان الصلاة؟", q2: "متى فتحت القسطنطينية؟", q3: "كم عدد سور القرآن؟", q4: "من هو صلاح الدين الأيوبي؟",
  scrollHint: "مرر للأسفل لتعرف كيف يعمل مُجيب",
  howTitle: "كيف يعمل مُجيب؟",
  st1t: "تطرح سؤالك", st1d: "اكتب سؤالك الديني أو التاريخي بلغتك الطبيعية",
  st2t: "نبحث في المصادر الموثقة", st2d: "نطابق سؤالك مع قاعدة معرفية إسلامية موثقة",
  st3t: "إجابة بالدليل", st3d: "إجابة واضحة مع ذكر المصادر والمراجع لكل معلومة",
  st4t: "لا دليل = لا إجابة", st4d: "إن لم نجد دليلًا موثوقًا، نصارحك بدل التخمين",
  catsTitle: "ماذا يغطي مُجيب؟",
  c1: "الصلاة والعبادات", c2: "الصيام والزكاة والحج", c3: "السيرة النبوية", c4: "التاريخ الإسلامي", c5: "القرآن والعقيدة",
  faqTitle: "الأسئلة الشائعة", faqSub: "إجابات مختصرة من قاعدة مُجيب الموثقة — اسأل أي سؤال آخر في الأعلى",
  fq1: "ما هي أركان الإيمان؟", fa1: "أركان الإيمان ستة: الإيمان بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، والقدر خيره وشره.",
  fq2: "ما هي بيعة العقبة؟", fa2: "بيعتا العقبة لقاءان تمّا بين النبي ﷺ ووفود من أهل يثرب قبل الهجرة، بايعوه فيهما على الإسلام والنصرة.",
  fq3: "ما مقدار زكاة الفطر؟", fa3: "زكاة الفطر صاع من طعام (نحو ثلاثة كيلوغرامات)، تجب على كل مسلم قبل صلاة عيد الفطر.",
  fq4: "متى فرض صيام رمضان؟", fa4: "فرض صيام رمضان في السنة الثانية للهجرة.",
  fq5: "ما هو نصاب زكاة المال؟", fa5: "نصاب زكاة المال ما يعادل 85 غرامًا من الذهب، فمن ملكه وحال عليه الحول وجبت فيه الزكاة ربع العشر (2.5%).",
  fq6: "ما الفرق بين السور المكية والمدنية؟", fa6: "السور المكية نزلت قبل الهجرة وغالب موضوعاتها العقيدة والتوحيد، والسور المدنية نزلت بعد الهجرة وغالب موضوعاتها الأحكام والتشريع.",
  fq7: "متى فرض الحج؟", fa7: "فرض الحج في السنة التاسعة للهجرة على قول جمهور العلماء.",
  fq8: "هل إجابات مُجيب فتاوى ملزمة؟", fa8: "لا. إجابات مُجيب استرشادية من مصادر معتمدة، وللفتاوى الملزمة راجع أهل العلم.",
  aboutTitle: "من نحن",
  aboutP1: "مُجيب مساعد ذكي متخصص في الإجابة عن الأسئلة الدينية وموضوعات التاريخ الإسلامي — بُني لمواجهة مشكلة حقيقية: نماذج الذكاء الاصطناعي العامة تُهلوس عند الإجابة عن الأسئلة الدينية، وتنتشر إجابات غير موثوقة في المحتوى الرقمي.",
  aboutMt: "منهجيتنا",
  aboutM1: "قاعدة معرفية موثقة أولًا:", aboutM1d: "134 سؤالًا وجوابًا من مصادر معتمدة (القرآن الكريم، صحيح البخاري ومسلم، السنن، كتب السيرة والتفسير).",
  aboutM2: "ذكاء اصطناعي مُوجَّه:", aboutM2d: "للأسئلة خارج القاعدة، يلتزم النموذج بذكر مصادره أو الاعتذار.",
  aboutM3: "لا إجابة بلا دليل:", aboutM3d: "عند غياب الدليل الموثوق نمتنع عن الإجابة بدل التخمين.",
  aboutSt: "مصادرنا",
  aboutSp: "القرآن الكريم، صحيح البخاري، صحيح مسلم، السنن الأربعة، سيرة ابن هشام، تفسير ابن كثير والطبري، وكتب التاريخ الإسلامي الموثوقة.",
  aboutDev: "المطور: Ahmed Mohamed Ahmed — مهندس اتصالات واستراتيجي محتوى بالذكاء الاصطناعي.",
  contactTitle: "تواصل معنا", contactSub: "عندك اقتراح، تصحيح، أو سؤال عن مُجيب؟ يسعدنا نسمع منك",
  contactBtn: "راسلنا عبر البريد",
  footerTag: "مُجيب — إجابات دينية وتاريخية موثوقة بالذكاء الاصطناعي",
  footerFollow: "تابعنا:",
  footerDisclaimer: "الإجابات استرشادية من مصادر معتمدة — للفتاوى الملزمة راجع أهل العلم",
  verifiedBadge: "✓ إجابة موثقة", sourcesTitle: "المصادر والمراجع", confLabel: "ثقة الإجابة",
  aiBadge: "✦ إجابة ذكية",
  aiDisclaimer: "أُنتجت هذه الإجابة بالذكاء الاصطناعي من مصادر إسلامية معتمدة — المصادر مذكورة أعلاه، واستشر أهل العلم في الفتاوى.",
  refusalTitle: "لا إجابة بلا دليل", refusalFor: "لم أجد إجابة موثقة لسؤالك:",
  refusalDefault: "أفضّل الصمت على التخمين — جرّب صياغة أخرى أو سؤالًا في الصلاة، السيرة، أو التاريخ الإسلامي.",
  refusalNoEvidence: "لم يُعثر على دليل موثوق — فضّل مُجيب الصمت على التخمين.",
  refusalConn: "تعذر الاتصال بخدمة الذكاء الاصطناعي — حاول مجددًا بعد قليل.",
  loadingTitle: "مُجيب يبحث في المصادر…", loadingSub: "لحظات ويأتيك الجواب الموثق",
  docTitle: "مُجيب | إجابات دينية موثوقة بالذكاء الاصطناعي",
  docDesc: "مُجيب مساعد ذكي يجيب عن أسئلتك الدينية وأسئلة التاريخ الإسلامي بإجابات موثقة بالمصادر. اسأل الآن مجانًا — لا إجابة بلا دليل."
},
en: {
  dir: "ltr", langLabel: "عربي",
  langAria: "Change language", qAria: "Your question", navAria: "Main navigation",
  navLogo: "Mujeeb", navHow: "How it works", navFaq: "FAQ", navAbout: "About", navContact: "Contact",
  badge: "Your smart assistant for trusted Islamic knowledge",
  tagline1: "Have a religious or history question?", tagline2: "The documented answer is here", gold: "No answer without evidence",
  placeholder: "Ask your question… e.g. When was the conquest of Constantinople?", askBtn: "Ask Mujeeb",
  samplesLabel: "Try:", s1: "Pillars of prayer", s2: "Constantinople conquest", s3: "Quran chapters count", s4: "Saladin",
  q1: "What are the pillars of prayer?", q2: "When was Constantinople conquered?", q3: "How many chapters are in the Quran?", q4: "Who was Saladin?",
  scrollHint: "Scroll down to see how Mujeeb works",
  howTitle: "How does Mujeeb work?",
  st1t: "You ask", st1d: "Type your religious or history question in your own words",
  st2t: "We search trusted sources", st2d: "We match your question against a documented Islamic knowledge base",
  st3t: "Evidence-based answer", st3d: "A clear answer citing sources and references for every fact",
  st4t: "No evidence = no answer", st4d: "If no reliable evidence exists, we tell you honestly instead of guessing",
  catsTitle: "What does Mujeeb cover?",
  c1: "Prayer & worship", c2: "Fasting, zakat & Hajj", c3: "Prophet's biography", c4: "Islamic history", c5: "Quran & creed",
  faqTitle: "Frequently asked questions", faqSub: "Short answers from Mujeeb's documented base — ask anything else above",
  fq1: "What are the pillars of faith?", fa1: "The six pillars of faith: belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree, good and bad.",
  fq2: "What was the Pledge of al-Aqaba?", fa2: "The two pledges of al-Aqaba were meetings between the Prophet ﷺ and delegations from Yathrib before the Hijra, pledging allegiance to Islam and support.",
  fq3: "How much is Zakat al-Fitr?", fa3: "Zakat al-Fitr is one sa' of food (about 3 kg), obligatory on every Muslim before the Eid prayer.",
  fq4: "When was fasting Ramadan ordained?", fa4: "Fasting Ramadan was ordained in the second year after the Hijra.",
  fq5: "What is the nisab for zakat on wealth?", fa5: "The nisab equals 85 grams of gold; whoever owns it for a full lunar year owes 2.5%.",
  fq6: "What is the difference between Makki and Madani surahs?", fa6: "Makki surahs were revealed before the Hijra, mostly about creed; Madani surahs after the Hijra, mostly about rulings.",
  fq7: "When was Hajj ordained?", fa7: "Hajj was ordained in the 9th year after the Hijra, according to the majority of scholars.",
  fq8: "Are Mujeeb's answers binding fatwas?", fa8: "No. Mujeeb's answers are guidance from trusted sources; consult qualified scholars for binding fatwas.",
  aboutTitle: "About us",
  aboutP1: "Mujeeb is an AI assistant specialized in answering religious questions and Islamic history topics — built to solve a real problem: general AI models hallucinate on religious questions, and unreliable answers spread across digital content.",
  aboutMt: "Our methodology",
  aboutM1: "Documented knowledge base first:", aboutM1d: "134 Q&As from trusted sources (Holy Quran, Sahih al-Bukhari & Muslim, Sunan, seerah and tafsir books).",
  aboutM2: "Guided AI:", aboutM2d: "For questions outside the base, the model must cite sources or decline.",
  aboutM3: "No answer without evidence:", aboutM3d: "Without reliable evidence we decline to answer rather than guess.",
  aboutSt: "Our sources",
  aboutSp: "The Holy Quran, Sahih al-Bukhari, Sahih Muslim, the four Sunan, Ibn Hisham's seerah, tafsir of Ibn Kathir and al-Tabari, and trusted Islamic history books.",
  aboutDev: "Developer: Ahmed Mohamed Ahmed — Telecom Engineer & AI Content Strategist.",
  contactTitle: "Contact us", contactSub: "Have a suggestion, correction, or question about Mujeeb? We'd love to hear from you",
  contactBtn: "Email us",
  footerTag: "Mujeeb — trusted religious & historical answers with AI",
  footerFollow: "Follow us:",
  footerDisclaimer: "Answers are guidance from trusted sources — consult qualified scholars for binding fatwas",
  verifiedBadge: "✓ Verified answer", sourcesTitle: "Sources & references", confLabel: "Answer confidence",
  aiBadge: "✦ Smart answer",
  aiDisclaimer: "This answer was generated by AI from trusted Islamic sources — sources are listed above; consult qualified scholars for fatwas.",
  refusalTitle: "No answer without evidence", refusalFor: "No documented answer found for your question:",
  refusalDefault: "We prefer silence over guessing — try rephrasing, or ask about prayer, seerah, or Islamic history.",
  refusalNoEvidence: "No reliable evidence found — Mujeeb preferred silence over guessing.",
  refusalConn: "Could not reach the AI service — please try again shortly.",
  loadingTitle: "Mujeeb is searching the sources…", loadingSub: "Your documented answer is on its way",
  docTitle: "Mujeeb | Trusted religious answers with AI",
  docDesc: "Mujeeb is a smart assistant answering your religious and Islamic history questions with sourced answers. Ask now for free — no answer without evidence."
}
};

/* تطبيق اللغة على الصفحة */
function applyI18n(lang){
  const L = I18N[lang] || I18N.ar;
  document.documentElement.lang = lang;
  document.documentElement.dir = L.dir;
  document.title = L.docTitle;
  const md = document.querySelector('meta[name="description"]');
  if(md) md.setAttribute("content", L.docDesc);
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if(L[k] !== undefined) el.textContent = L[k];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    const k = el.getAttribute("data-i18n-ph");
    if(L[k] !== undefined) el.setAttribute("placeholder", L[k]);
  });
  document.querySelectorAll("[data-i18n-q]").forEach(el=>{
    const k = el.getAttribute("data-i18n-q");
    if(L[k] !== undefined) el.setAttribute("data-q", L[k]);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el=>{
    const k = el.getAttribute("data-i18n-aria");
    if(L[k] !== undefined) el.setAttribute("aria-label", L[k]);
  });
  try{ localStorage.setItem("mujeeb_lang", lang); }catch(e){}
}
function getLang(){
  try{ return localStorage.getItem("mujeeb_lang") || "ar"; }catch(e){ return "ar"; }
}
