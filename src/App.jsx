import { useEffect, useMemo, useState } from 'react';

const navItems = [
  { id: 'command-center', label: 'مركز القيادة', icon: '🏠' },
  { id: 'ziko-chat', label: 'زيكو تشات', icon: '💬' },
  { id: 'agents', label: 'مركز الوكلاء', icon: '🤖' },
  { id: 'creator-studio', label: 'استوديو المبدع', icon: '🎬' },
  { id: 'music-lab', label: 'مختبر الموسيقى', icon: '🎵' },
  { id: 'video-lab', label: 'مختبر الفيديو', icon: '🎥' },
  { id: 'script-studio', label: 'استوديو السيناريو', icon: '✍️' },
  { id: 'voice-studio', label: 'استوديو الصوت', icon: '🎙️' },
  { id: 'visual-effects', label: 'مكتبة المؤثرات', icon: '✨' },
  { id: 'campaign-studio', label: 'استوديو الحملة', icon: '📣' },
  { id: 'social-studio', label: 'منصات التواصل', icon: '📱' },
  { id: 'library', label: 'المكتبة', icon: '📚' },
  { id: 'analytics', label: 'التحليلات', icon: '📊' },
  { id: 'creator-profile', label: 'الملف الشخصي', icon: '👤' },
  { id: 'brand-center', label: 'مركز العلامة', icon: '🏷️' },
  { id: 'activity-log', label: 'سجل النشاط', icon: '🧭' },
  { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
];

const initialChat = [
  { id: 1, from: 'ziko', text: 'صباح الخير يا أحمد 👋 زيكو جاهز اليوم نعمل فكرة مختلفة ومفاجئة. إيه اللي عايز نشتغل عليه؟' },
  { id: 2, from: 'user', text: 'عايز إعلان سياحي عن شرم الشيخ بشكل سينمائي ومميز' },
  { id: 3, from: 'ziko', text: 'كويس. هبدأ من فكرة “الشاطئ بعد منتصف الليل” مع إيقاع بطيء بطيء وفتح بصري متوتر، وبعدها نعمل تحول لملامح البحر والضحك والدخان. هديك 3 اتجاهات في ثانية.' },
];

const demoProjects = [
  { title: 'Egypt After Midnight', status: 'قيد الإنتاج', score: 91 },
  { title: '48 Hours in Cairo', status: 'مكتمل', score: 94 },
  { title: 'Nile Dream', status: 'قيد المراجعة', score: 88 },
  { title: 'Desert Pulse', status: 'جاهز للنشر', score: 96 },
];

const recentCampaigns = [
  { name: 'Red Sea Escape', platform: 'TikTok', reach: '1.2M' },
  { name: 'Cairo Nights', platform: 'Instagram', reach: '860K' },
  { name: 'Desert Romance', platform: 'YouTube', reach: '740K' },
];

const recentMusic = [
  { title: 'Cairo Street + Cinematic Trap', bpm: 118 },
  { title: 'Nubian + Afro House', bpm: 124 },
  { title: 'Desert Cinematic + Oriental Electronic', bpm: 110 },
];

const recentVideos = [
  { title: 'Nile Stories', length: '00:48' },
  { title: 'Late Cairo', length: '00:32' },
  { title: 'Sharm After Dark', length: '00:52' },
];

const agentData = [
  { name: 'زيكو', role: 'منسق إبداعي', status: 'ناشط', activity: 'يفكر في فكرة جديدة' },
  { name: 'المدير الإبداعي', role: 'Creative Director', status: 'مستعد', activity: 'بنيت مفهوم بصري' },
  { name: 'كاتب السيناريو', role: 'Scriptwriter', status: 'مستعد', activity: 'يكتب الـ hook' },
  { name: 'مهندس الموسيقى', role: 'Music Architect', status: 'يعمل', activity: 'اختبر Fusion جديد' },
  { name: 'مخرج الفيديو', role: 'Video Producer', status: 'متوقف', activity: 'يبدأ التتابع' },
  { name: 'مستشار السياحة', role: 'Tourism Expert', status: 'مستعد', activity: 'يضيف مشاهد مصرية' },
];

const libraryExamples = [
  { type: 'مشروع', title: 'Egypt After Midnight', tag: 'سياحة', favorite: true },
  { type: 'موسيقى', title: 'Cairo Street Fusion', tag: 'Cinematic Trap', favorite: false },
  { type: 'سيناريو', title: '48 Hours in Cairo', tag: 'Documentary', favorite: true },
  { type: 'حملة', title: 'Red Sea Escape', tag: 'Travel', favorite: false },
];

const analyticsData = [
  { label: 'يناير', views: 80, growth: 30 },
  { label: 'فبراير', views: 110, growth: 40 },
  { label: 'مارس', views: 150, growth: 55 },
  { label: 'أبريل', views: 175, growth: 68 },
  { label: 'مايو', views: 230, growth: 80 },
  { label: 'يونيو', views: 260, growth: 92 },
];

const musicHistory = [
  { genre: 'Cairo Street + Cinematic Trap', bpm: 118, instruments: ['الدرام', 'باس', 'Qanun', 'برس'], mood: 'مثير', structure: 'Intro-Build-Drop', fusion: 'Street + Cinematic' },
  { genre: 'Nubian + Afro House', bpm: 124, instruments: ['طبلة', 'Synth', 'Bass', 'Perc'], mood: 'إيجابي', structure: 'Intro-Build-Drop', fusion: 'Nubian + House' },
  { genre: 'Desert Cinematic + Oriental Electronic', bpm: 110, instruments: ['سيمفوني', 'أنغام', 'طبل', 'مؤثرات'], mood: 'داخلي', structure: 'Slow-Build-Drop', fusion: 'Desert + Oriental' },
];

const defaultCreatorForm = {
  contentType: 'إعلان',
  audience: 'سياح',
  platform: 'Instagram',
  language: 'مصرى + إنجليزي',
  mood: 'سينمائي',
};

const defaultScriptForm = {
  subject: 'رحلة ليلة في القاهرة',
  audience: 'أزواج وسياح',
  duration: '30 ثانية',
  platform: 'TikTok',
  language: 'مصري عربي',
  tone: 'سينمائي',
  style: 'POV',
  cta: 'احجز رحلتك اليوم',
};

const defaultMusicForm = {
  style: 'Cairo Street + Cinematic Trap',
  bpm: '118',
  key: 'Dm',
  mood: 'مثير',
  duration: '00:35',
  purpose: 'إعلان سياحي',
};

const defaultCampaignForm = {
  name: 'Red Sea Escape',
  objective: 'زيادة حجوزات العطلات',
  audience: 'عائلات + شاب',
  budget: '150000 جنيه',
  platforms: 'Instagram, TikTok',
  duration: '4 أسابيع',
  tone: 'Luxury',
  offer: 'خصم 20% على الحجوزات',
  location: 'شرم الشيخ',
  cta: 'احجز الآن',
};

const brandSettings = {
  name: 'Ziko AI Creative Studio',
  primary: '#1845D8',
  secondary: '#31d1c7',
  accent: '#e7c77b',
  audience: 'المسوقون، المبدعون، الشركات السياحية',
  tone: 'داخلي، سينمائي، أنيق',
};

const platformMeta = {
  Facebook: { ratio: '1:1', duration: '00:25', hashtags: '#Cairo #Travel', hook: 'حالة جديدة في القاهرة' },
  Instagram: { ratio: '4:5', duration: '00:20', hashtags: '#Egypt #Story', hook: 'أول 3 ثواني تشتغل' },
  TikTok: { ratio: '9:16', duration: '00:18', hashtags: '#EgyptVibes', hook: 'بدأت من ضجيج الشارع' },
  YouTube: { ratio: '16:9', duration: '00:45', hashtags: '#TravelStory', hook: 'قصة 48 ساعة في القاهره' },
  LinkedIn: { ratio: '1:1', duration: '00:35', hashtags: '#LuxuryTourism', hook: 'العلامة التجارية تدور' },
  X: { ratio: '16:9', duration: '00:18', hashtags: '#Travel', hook: 'من مشهد لآخر' },
};

const generateSurpriseMusic = (history) => {
  const pool = [
    'Cairo Street + Cinematic Trap',
    'Saidi + Melodic Techno',
    'Nubian + Afro House',
    'Mahraganat + Orchestral',
    'Arabic Jazz + Lo-Fi',
    'Desert Cinematic + Oriental Electronic',
    'Cairo Night + Deep House',
    'Acoustic Egyptian + Ambient',
    'Egyptian Shaabi + Phonk',
    'Retro 80s + Synthwave',
    'Experimental + Nubian',
    'Cairo Ritual + Desert Hybrid',
  ];

  const used = new Set(history.map((item) => item.genre));
  const available = pool.filter((item) => !used.has(item));
  const genre = available[Math.floor(Math.random() * (available.length || pool.length))] || pool[Math.floor(Math.random() * pool.length)];

  const bpm = (Math.floor(Math.random() * 25) + 96).toString();
  const instruments = ['Analog Bass', 'Percussion', 'Qanun', 'Breaks', 'Brass', 'Field Recordings'];
  const structure = ['Intro-Build-Drop-Break-Second Drop-Outro', 'Minimal Start-Rise-Crescendo-Exit'][Math.floor(Math.random() * 2)];

  return {
    genre,
    bpm,
    key: ['Bm', 'Dm', 'F#m', 'Gm', 'A#'][Math.floor(Math.random() * 5)],
    instruments: instruments.slice(0, 4),
    rhythm: ['4/4', 'Half-time', 'Syncopated'][Math.floor(Math.random() * 3)],
    mood: ['مهيب', 'حلو', 'مثير', 'مظلم', 'طارد'][Math.floor(Math.random() * 5)],
    structure,
    soundDesign: 'granular vocal chops + analog tape glow + street ambience',
    visualRelation: 'الصور تتحول من ضجيج شارع القاهرة إلى ضوء ناعم في الصحراء',
    suggestedVideo: 'تستخدم في teaser 20 ثانية عن رحلة الليل في مصر',
  };
};

function App() {
  const [activeTab, setActiveTab] = useState('command-center');
  const [chatMessages, setChatMessages] = useState(() => {
    const stored = localStorage.getItem('ziko-chat');
    return stored ? JSON.parse(stored) : initialChat;
  });
  const [zikoInput, setZikoInput] = useState('');
  const [creatorForm, setCreatorForm] = useState(defaultCreatorForm);
  const [scriptForm, setScriptForm] = useState(defaultScriptForm);
  const [musicForm, setMusicForm] = useState(defaultMusicForm);
  const [campaignForm, setCampaignForm] = useState(defaultCampaignForm);
  const [creativeIdea, setCreativeIdea] = useState('مشهد يبدأ من ضجيج شارع القاهرة، ثم يفتح على ضوء القمر فوق النيل، ثم يترك القصة تروي نفسها كأنها فيلم رومانسي وثقافي مع لمسة انفجار.');
  const [scriptOutput, setScriptOutput] = useState('Hook: "في مصر، كل زاوية بتحكي قصة."\n\nالمشهد 1: ...');
  const [musicPrompt, setMusicPrompt] = useState('Create a 118 BPM cinematic Egyptian street-fusion track combining Saidi percussion, distorted analog bass, qanun textures, percussion fills and orchestral brass.');
  const [selectedPlatform, setSelectedPlatform] = useState('Instagram');
  const [musicHistoryState, setMusicHistoryState] = useState(musicHistory);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [activityList, setActivityList] = useState([
    'زيكو راجع الـ Creative Memory وقارن الـ genre مع آخر مشروع',
    'تم توليد فكرة جديدة لـ Cairo Street Energy',
    'تم إعداد نسخة TikTok تفاعلية من الحملة',
    'تم نسخ الـ music prompt إلى الحافظة',
  ]);

  useEffect(() => {
    localStorage.setItem('ziko-chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('ziko-brand', JSON.stringify(brandSettings));
  }, []);

  const contentPerformance = useMemo(() => [
    { label: 'المشاهدات', value: '2.4M', delta: '+18%' },
    { label: 'التفاعل', value: '8.7%', delta: '+3.2%' },
    { label: 'الاحتفاظ', value: '61%', delta: '+11%' },
    { label: 'التحويل', value: '3.4%', delta: '+1.1%' },
  ], []);

  const handleQuickAction = (label) => {
    const messages = [
      ...chatMessages,
      { id: Date.now(), from: 'user', text: label },
      { id: Date.now() + 1, from: 'ziko', text: 'حاضر. هعمل لك مسار إبداعي جديد وهنفصل الـ steps: الفكرة، السيناريو، الموسيقى، اللمسة البصرية، والنسخة المناسبة لكل منصة.' },
    ];
    setChatMessages(messages);
    setActiveTab('ziko-chat');
  };

  const handleChatSend = () => {
    if (!zikoInput.trim()) return;
    const userMessage = zikoInput.trim();
    let zikoReply = 'تمام، خلّيها في الـ creative engine وهاعمل لك كتيبة أفكار جديدة. أول حاجة: أبدأ من hook قوي يضرب في أول 3 ثواني.';

    if (userMessage.includes('فاجئني') || userMessage.includes('surprise')) {
      const generated = generateSurpriseMusic(musicHistoryState);
      zikoReply = `فاجئتك! خلّينا نعمل ${generated.genre} بـ ${generated.bpm} BPM، مع ${generated.instruments.join(', ')}، ومزاج ${generated.mood}. ده هيخدم إعلان ${generated.suggestedVideo}.`;
      setMusicHistoryState((current) => [{ genre: generated.genre, bpm: Number(generated.bpm), instruments: generated.instruments, mood: generated.mood, structure: generated.structure, fusion: generated.genre }, ...current].slice(0, 8));
    } else if (userMessage.includes('موسيقى')) {
      zikoReply = 'هجهّز لك موسيقى خليط بين Cairo Street و Cinematic Trap، مع إيقاع سريع، باس مائل، وأوتار قانون تدعم المشهد.';
    } else if (userMessage.includes('TikTok')) {
      zikoReply = 'حاضر، هعمل نسخة TikTok زى الـ short-form: hook من أول ثانيتين، نص سيرة سريع، وcta في آخر 3 ثواني.';
    } else if (userMessage.includes('شرم')) {
      zikoReply = 'أحسن فكرة: “شرم الشيخ بعد منتصف الليل” — بداية من صوت الأمواج، ثم قفزة للحركة في الشواطئ، وبعدها cinematic reveal للواجهة البحرية.';
    }

    setChatMessages((current) => [
      ...current,
      { id: Date.now(), from: 'user', text: userMessage },
      { id: Date.now() + 1, from: 'ziko', text: zikoReply },
    ]);
    setZikoInput('');
  };

  const handleGenerateCreative = () => {
    const hook = `بص يا أحمد، عندنا فكرة أحسن من الإعلان التقليدي بكتير. نبدأ بـ ${creatorForm.audience} في ${creatorForm.platform}، مع ${creatorForm.mood} tone، وبعدها نعمل reveal على ${creatorForm.contentType.toLowerCase()} بشكل سينمائي.`;
    setCreativeIdea(hook);
    setActivityList((current) => [
      `تم توليد فكرة جديدة ل${creatorForm.contentType} عبر Ziko`,
      ...current,
    ].slice(0, 5));
  };

  const handleMusicGenerate = () => {
    const generated = generateSurpriseMusic(musicHistoryState);
    const prompt = `Create a ${generated.bpm} BPM ${generated.genre} track with ${generated.instruments.join(', ')}, ${generated.rhythm} rhythm, ${generated.soundDesign}, and a ${generated.structure} structure. Keep the mood ${generated.mood} and use ${generated.visualRelation}.`;
    setMusicPrompt(prompt);
    setMusicHistoryState((current) => [{ genre: generated.genre, bpm: Number(generated.bpm), instruments: generated.instruments, mood: generated.mood, structure: generated.structure, fusion: generated.genre }, ...current].slice(0, 8));
  };

  const handleSurpriseMusic = () => {
    const generated = generateSurpriseMusic(musicHistoryState);
    setMusicPrompt(`🔥 فاجئني: ${generated.genre} • ${generated.bpm} BPM • ${generated.key} • ${generated.soundDesign} • ${generated.structure}`);
    setMusicHistoryState((current) => [{ genre: generated.genre, bpm: Number(generated.bpm), instruments: generated.instruments, mood: generated.mood, structure: generated.structure, fusion: generated.genre }, ...current].slice(0, 8));
    setActivityList((current) => ['تم توليد فاجأة موسيقية جديدة من محرك زيكو', ...current].slice(0, 5));
  };

  const handleGenerateScript = () => {
    const output = `Hook: "${scriptForm.subject}… في أول 3 ثواني بتدفعك على الاستمرار."\n\nScene 1 — ${scriptForm.audience}: مشهد أولي في ${scriptForm.platform} مع ضجيج طبيعي.\nScene 2 — ${scriptForm.style}: يفتح على الحركة، تصوير قريب، إضاءة مكسوة باللون ${scriptForm.tone}.\nNarration: "في مصر، كل زاوية بتحكي قصة..."\nDialogue: "خلّيها تجربة لا تُنسى."\nVisuals: حركة كاميرا بطيئة + overlay + light leak.\nMusic: منخفض، يزداد إحساساً مع كل مشهد.\nCTA: ${scriptForm.cta}`;
    setScriptOutput(output);
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const renderCommandCenter = () => (
    <div className="screen-block">
      <div className="hero-panel glass-card">
        <div>
          <p className="eyebrow">صباح الخير يا أحمد 👋</p>
          <h1>زيكو جاهز نعمل حاجة مختلفة النهارده.</h1>
          <p>التعاون بين الفكرة، الموسيقى، الصور، الفيديو، والحملة بيمشي كوحدة واحدة.</p>
          <div className="quick-actions">
            {['ابتكر فكرة', 'اعمل إعلان', 'ابتكر موسيقى', 'اكتب سيناريو', 'اعمل فيديو', 'فاجئني'].map((label) => (
              <button key={label} className="action-pill" onClick={() => handleQuickAction(label)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="ziko-live">
          <div className="pulse-ring" />
          <div className="ziko-avatar">Z</div>
          <div className="status-badge">زيكو متصل</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-card">
          <div className="section-head">
            <h3>المشروعات النشطة</h3>
            <span>Live</span>
          </div>
          <div className="stack-list">
            {demoProjects.map((project) => (
              <div className="mini-project" key={project.title}>
                <div>
                  <strong>{project.title}</strong>
                  <small>{project.status}</small>
                </div>
                <span>{project.score}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="section-head">
            <h3>أحدث الحملات</h3>
            <span>Demo</span>
          </div>
          <div className="stack-list">
            {recentCampaigns.map((campaign) => (
              <div className="mini-row" key={campaign.name}>
                <span>{campaign.name}</span>
                <small>{campaign.platform}</small>
                <b>{campaign.reach}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="section-head">
            <h3>آخر الموسيقى</h3>
            <span>Studio</span>
          </div>
          <div className="stack-list">
            {recentMusic.map((music) => (
              <div className="mini-row" key={music.title}>
                <span>{music.title}</span>
                <b>{music.bpm} BPM</b>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="section-head">
            <h3>أحدث الفيديوهات</h3>
            <span>Video</span>
          </div>
          <div className="stack-list">
            {recentVideos.map((video) => (
              <div className="mini-row" key={video.title}>
                <span>{video.title}</span>
                <b>{video.length}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="insights-grid">
        <div className="glass-card wide">
          <div className="section-head">
            <h3>أداء المحتوى</h3>
            <span>Demo Data</span>
          </div>
          <div className="metric-row">
            {contentPerformance.map((metric) => (
              <div className="metric-box" key={metric.label}>
                <small>{metric.label}</small>
                <strong>{metric.value}</strong>
                <span>{metric.delta}</span>
              </div>
            ))}
          </div>
          <div className="chart-bars">
            {analyticsData.map((point) => (
              <div key={point.label} className="bar-col">
                <div className="bar" style={{ height: `${point.views / 3}%` }} />
                <label>{point.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="section-head">
            <h3>نشاط الوكلاء</h3>
            <span>Live</span>
          </div>
          <div className="stack-list compact">
            {agentData.map((agent) => (
              <div className="agent-row" key={agent.name}>
                <div className="dot" />
                <div>
                  <strong>{agent.name}</strong>
                  <small>{agent.activity}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="suggestion-grid">
        <div className="glass-card">
          <div className="section-head">
            <h3>اقتراحات زيكو</h3>
          </div>
          <ul className="idea-list">
            <li>استخدم “Egypt After Midnight” كـ concept opener في الإعلان السياحي.</li>
            <li>أضف نسختين لثيمات Luxor و Aswan في نفس الحملة.</li>
            <li>استخدم الصوت الهادئ في الـ hook ثم أوقفه عند الـ reveal.</li>
          </ul>
        </div>

        <div className="glass-card">
          <div className="section-head">
            <h3>النشاط الأخير</h3>
          </div>
          <ul className="idea-list">
            {activityList.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="screen-block">
      <div className="chat-shell glass-card">
        <div className="chat-header">
          <div>
            <p className="eyebrow">زيكو / Ziko</p>
            <h3>المساعد الإبداعي الرئيسي</h3>
          </div>
          <span className="status-badge small">جاهز</span>
        </div>

        <div className="chat-window">
          {chatMessages.map((message) => (
            <div key={message.id} className={`chat-bubble ${message.from === 'user' ? 'user' : 'ziko'}`}>
              <span>{message.from === 'user' ? 'أحمد' : 'زيكو'}</span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input value={zikoInput} onChange={(e) => setZikoInput(e.target.value)} placeholder="اكتب طلبك الإبداعي..." />
          <button onClick={handleChatSend}>إرسال</button>
        </div>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">AI Agents Hub</p>
          <h2>مركز الوكلاء</h2>
        </div>
      </div>

      <div className="agent-grid">
        {agentData.map((agent) => (
          <div className="glass-card agent-card" key={agent.name}>
            <div className="agent-avatar">{agent.name.slice(0, 1)}</div>
            <div>
              <h4>{agent.name}</h4>
              <p>{agent.role}</p>
            </div>
            <div className="agent-meta">
              <span className="status-pill">{agent.status}</span>
              <small>{agent.activity}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card flow-card">
        <div className="flow-line">
          <span>زيكو</span>
          <span>↓</span>
          <span>المدير الإبداعي</span>
          <span>↓</span>
          <span>كاتب السيناريو</span>
          <span>↓</span>
          <span>مهندس الموسيقى</span>
          <span>↓</span>
          <span>مخرج الفيديو</span>
          <span>↓</span>
          <span>المنصة</span>
        </div>
      </div>
    </div>
  );

  const renderCreatorStudio = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Creator Studio</p>
          <h2>استوديو المبدع</h2>
        </div>
      </div>

      <div className="two-col-grid">
        <div className="glass-card form-panel">
          <div className="field-group">
            <label>نوع المحتوى</label>
            <select value={creatorForm.contentType} onChange={(e) => setCreatorForm({ ...creatorForm, contentType: e.target.value })}>
              <option>إعلان</option>
              <option>حملة سياحية</option>
              <option>منشور سوشيال</option>
              <option>Reel</option>
              <option>TikTok</option>
              <option>إعلان سينمائي</option>
              <option>فيديو منتج</option>
            </select>
          </div>

          <div className="field-group">
            <label>الجمهور</label>
            <select value={creatorForm.audience} onChange={(e) => setCreatorForm({ ...creatorForm, audience: e.target.value })}>
              <option>سياح</option>
              <option>عرب</option>
              <option>أجانب</option>
              <option>عائلات</option>
              <option>شباب</option>
              <option>مؤسسات</option>
            </select>
          </div>

          <div className="field-group">
            <label>المنصة</label>
            <select value={creatorForm.platform} onChange={(e) => setCreatorForm({ ...creatorForm, platform: e.target.value })}>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>TikTok</option>
              <option>YouTube</option>
              <option>LinkedIn</option>
              <option>X</option>
            </select>
          </div>

          <div className="field-group">
            <label>اللغة</label>
            <select value={creatorForm.language} onChange={(e) => setCreatorForm({ ...creatorForm, language: e.target.value })}>
              <option>مصرى + إنجليزي</option>
              <option>عربي</option>
              <option>إنجليزي</option>
              <option>مصرى</option>
            </select>
          </div>

          <div className="field-group">
            <label>المزاج</label>
            <select value={creatorForm.mood} onChange={(e) => setCreatorForm({ ...creatorForm, mood: e.target.value })}>
              <option>سينمائي</option>
              <option>مثير</option>
              <option>فكاهي</option>
              <option>فخم</option>
              <option>درامي</option>
            </select>
          </div>

          <button className="primary-btn" onClick={handleGenerateCreative}>ابتكر</button>
        </div>

        <div className="glass-card creative-output">
          <h3>اتجاه زيكو الإبداعي</h3>
          <p>{creativeIdea}</p>
          <div className="mini-pills">
            <span>Hook</span>
            <span>Visual</span>
            <span>Music</span>
            <span>CTA</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMusicLab = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Music Lab</p>
          <h2>مختبر الموسيقى</h2>
        </div>
      </div>

      <div className="two-col-grid">
        <div className="glass-card form-panel">
          <div className="field-group">
            <label>الأسلوب</label>
            <input value={musicForm.style} onChange={(e) => setMusicForm({ ...musicForm, style: e.target.value })} />
          </div>
          <div className="field-group">
            <label>BPM</label>
            <input value={musicForm.bpm} onChange={(e) => setMusicForm({ ...musicForm, bpm: e.target.value })} />
          </div>
          <div className="field-group">
            <label>المفتاح</label>
            <input value={musicForm.key} onChange={(e) => setMusicForm({ ...musicForm, key: e.target.value })} />
          </div>
          <div className="field-group">
            <label>المزاج</label>
            <input value={musicForm.mood} onChange={(e) => setMusicForm({ ...musicForm, mood: e.target.value })} />
          </div>
          <div className="field-group">
            <label>الغرض</label>
            <select value={musicForm.purpose} onChange={(e) => setMusicForm({ ...musicForm, purpose: e.target.value })}>
              <option>إعلان سياحي</option>
              <option>تريلر سينمائي</option>
              <option>سوشيال</option>
              <option>فيديو وثائقي</option>
              <option>أكشن</option>
              <option>فخم</option>
            </select>
          </div>

          <div className="button-stack">
            <button className="primary-btn" onClick={handleMusicGenerate}>إنشاء</button>
            <button className="secondary-btn" onClick={handleSurpriseMusic}>🎲 فاجئني</button>
            <button className="secondary-btn">🔥 ابتكر شكل جديد</button>
          </div>
        </div>

        <div className="glass-card creative-output">
          <h3>AI Music Prompt</h3>
          <p>{musicPrompt}</p>
          <div className="button-stack compact-stack">
            <button className="secondary-btn">نسخ الـ Prompt</button>
            <button className="secondary-btn">تجديد</button>
            <button className="secondary-btn">أغرب</button>
            <button className="secondary-btn">أكثر مصرية</button>
          </div>
        </div>
      </div>

      <div className="music-history-grid">
        {musicHistoryState.slice(0, 4).map((item) => (
          <div className="glass-card mini-music-card" key={`${item.genre}-${item.bpm}`}>
            <h4>{item.genre}</h4>
            <p>{item.bpm} BPM • {item.mood}</p>
            <small>{item.instruments.join(' • ')}</small>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScriptStudio = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Script Studio</p>
          <h2>استوديو السيناريو</h2>
        </div>
      </div>

      <div className="two-col-grid">
        <div className="glass-card form-panel">
          <div className="field-group">
            <label>الموضوع</label>
            <input value={scriptForm.subject} onChange={(e) => setScriptForm({ ...scriptForm, subject: e.target.value })} />
          </div>
          <div className="field-group">
            <label>الجمهور</label>
            <input value={scriptForm.audience} onChange={(e) => setScriptForm({ ...scriptForm, audience: e.target.value })} />
          </div>
          <div className="field-group">
            <label>المدة</label>
            <input value={scriptForm.duration} onChange={(e) => setScriptForm({ ...scriptForm, duration: e.target.value })} />
          </div>
          <div className="field-group">
            <label>المنصة</label>
            <input value={scriptForm.platform} onChange={(e) => setScriptForm({ ...scriptForm, platform: e.target.value })} />
          </div>
          <div className="field-group">
            <label>الأسلوب</label>
            <input value={scriptForm.style} onChange={(e) => setScriptForm({ ...scriptForm, style: e.target.value })} />
          </div>
          <div className="field-group">
            <label>الـ CTA</label>
            <input value={scriptForm.cta} onChange={(e) => setScriptForm({ ...scriptForm, cta: e.target.value })} />
          </div>
          <button className="primary-btn" onClick={handleGenerateScript}>إنشاء سيناريو</button>
        </div>

        <div className="glass-card creative-output">
          <h3>السيناريو الناتج</h3>
          <pre>{scriptOutput}</pre>
        </div>
      </div>
    </div>
  );

  const renderVideoLab = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Video Lab</p>
          <h2>مختبر الفيديو</h2>
        </div>
      </div>

      <div className="video-layout">
        <div className="glass-card timeline-card">
          <div className="timeline-header">
            <span>Scenes</span>
            <span>Clips</span>
            <span>Audio</span>
          </div>
          <div className="timeline-rows">
            <div className="timeline-row"><span>01</span><b>Opening Hook</b><small>0:00-0:04</small></div>
            <div className="timeline-row"><span>02</span><b>City Reveal</b><small>0:04-0:12</small></div>
            <div className="timeline-row"><span>03</span><b>Nile Motion</b><small>0:12-0:25</small></div>
            <div className="timeline-row"><span>04</span><b>CTA</b><small>0:25-0:30</small></div>
          </div>
        </div>

        <div className="glass-card form-panel">
          <div className="waveform-box">
            <div className="wave" /><div className="wave" /><div className="wave" /><div className="wave" />
            <div className="wave" /><div className="wave" /><div className="wave" /><div className="wave" />
            <div className="wave" /><div className="wave" /><div className="wave" /><div className="wave" />
          </div>
          <div className="mini-pills">
            <span>Captions</span>
            <span>Transitions</span>
            <span>Voice Track</span>
            <span>Music Track</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaignStudio = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Campaign Studio</p>
          <h2>استوديو الحملة</h2>
        </div>
      </div>

      <div className="two-col-grid">
        <div className="glass-card form-panel">
          <div className="field-group">
            <label>اسم الحملة</label>
            <input value={campaignForm.name} onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })} />
          </div>
          <div className="field-group">
            <label>الهدف</label>
            <input value={campaignForm.objective} onChange={(e) => setCampaignForm({ ...campaignForm, objective: e.target.value })} />
          </div>
          <div className="field-group">
            <label>المستخدم</label>
            <input value={campaignForm.audience} onChange={(e) => setCampaignForm({ ...campaignForm, audience: e.target.value })} />
          </div>
          <div className="field-group">
            <label>الميزانية</label>
            <input value={campaignForm.budget} onChange={(e) => setCampaignForm({ ...campaignForm, budget: e.target.value })} />
          </div>
          <div className="field-group">
            <label>المنصات</label>
            <input value={campaignForm.platforms} onChange={(e) => setCampaignForm({ ...campaignForm, platforms: e.target.value })} />
          </div>
          <button className="primary-btn">توليد الحملة</button>
        </div>

        <div className="glass-card creative-output">
          <h3>النتيجة</h3>
          <p>Campaign Idea: <strong>{campaignForm.name}</strong> — افتتاحية سينمائية عن {campaignForm.location}، مع CTA: {campaignForm.cta}</p>
          <div className="mini-pills">
            <span>Scripts</span>
            <span>Posts</span>
            <span>Music</span>
            <span>Schedule</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocialStudio = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Social Media Studio</p>
          <h2>استوديو المنصات</h2>
        </div>
      </div>

      <div className="platform-grid">
        {Object.entries(platformMeta).map(([platform, meta]) => (
          <button className={`platform-card ${selectedPlatform === platform ? 'active' : ''}`} key={platform} onClick={() => handlePlatformSelect(platform)}>
            <strong>{platform}</strong>
            <small>{meta.ratio} • {meta.duration}</small>
            <span>{meta.hook}</span>
          </button>
        ))}
      </div>

      <div className="glass-card creative-output">
        <h3>نسخة {selectedPlatform}</h3>
        <p>Hook: {platformMeta[selectedPlatform].hook}</p>
        <p>Hashtags: {platformMeta[selectedPlatform].hashtags}</p>
        <p>CTA: احجز الآن</p>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Content Library</p>
          <h2>المكتبة الإبداعية</h2>
        </div>
      </div>

      <div className="library-toolbar">
        <input placeholder="ابحث في ال��شاريع أو الأفكار..." />
        <button className="secondary-btn">بحث</button>
      </div>

      <div className="library-grid">
        {libraryExamples.map((item) => (
          <div className="glass-card library-item" key={item.title}>
            <span className="tag">{item.type}</span>
            <h4>{item.title}</h4>
            <small>{item.tag}</small>
            <div className="item-actions">
              <button>Preview</button>
              <button>Duplicate</button>
              <button>Archive</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>لوحة التحليلات</h2>
        </div>
        <span className="status-badge small">Demo Data</span>
      </div>

      <div className="analytics-grid">
        {contentPerformance.map((metric) => (
          <div className="glass-card metric-analytics" key={metric.label}>
            <small>{metric.label}</small>
            <strong>{metric.value}</strong>
            <span>{metric.delta}</span>
          </div>
        ))}
      </div>

      <div className="glass-card chart-panel">
        <div className="chart-bars">
          {analyticsData.map((point) => (
            <div key={point.label} className="bar-col big">
              <div className="bar blue" style={{ height: `${point.views / 2.7}%` }} />
              <label>{point.label}</label>
            </div>
          ))}
        </div>
        <div className="analysis-notes">
          <p>زيكو شايف إن الـ Hook أول 3 ثواني محتاج يبقى أقوى.</p>
          <p>الفيديوهات اللي فيها إيقاع أسرع حققت تفاعل أعلى في العينة الحالية.</p>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Creator Profile</p>
          <h2>الملف الشخصي للمبدع</h2>
        </div>
      </div>

      <div className="profile-layout">
        <div className="glass-card profile-panel">
          <div className="profile-avatar-wrap">
            {profilePhoto ? <img src={profilePhoto} alt="Ahmed Hamdy" className="profile-photo" /> : <div className="profile-avatar big">أ</div>}
          </div>
          <div className="profile-meta">
            <h3>أحمد حمدي</h3>
            <p>AI Creative Director / Developer</p>
            <label className="upload-box">
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setProfilePhoto(String(reader.result));
                  reader.readAsDataURL(file);
                }
              }} />
              رفع صورة شخصية
            </label>
          </div>
        </div>

        <div className="glass-card profile-card">
          <h3>AI Presenter</h3>
          <p>الـ Presenter بيستخدم أسلوب محترف، حيوي، وصوت كأنه مخرج إبداعي في الاستوديو.</p>
          <div className="mini-pills">
            <span>Hero Profile</span>
            <span>Agent Profile</span>
            <span>Creator Avatar</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrand = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Brand Center</p>
          <h2>مركز العلامة التجارية</h2>
        </div>
      </div>

      <div className="brand-grid">
        <div className="glass-card brand-box">
          <h3>Brand Settings</h3>
          <p>الاسم: {brandSettings.name}</p>
          <p>لون أساسي: {brandSettings.primary}</p>
          <p>اللون الثانوي: {brandSettings.secondary}</p>
          <p>اللغة: عربي + إنجليزي</p>
        </div>
        <div className="glass-card brand-box">
          <h3>Brand Rules</h3>
          <p>المتحدث: محترف + سينمائي + مشرق.</p>
          <p>التجربة: premium + Egyptian tourism + agency feel.</p>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Activity Log</p>
          <h2>سجل النشاط</h2>
        </div>
      </div>

      <div className="glass-card log-card">
        {activityList.map((item, index) => (
          <div key={`${item}-${index}`} className="log-row">
            <span className="dot" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>الإعدادات</h2>
        </div>
      </div>

      <div className="settings-grid">
        <div className="glass-card small-panel">
          <h3>AI Integrations</h3>
          <ul>
            <li>LLM: Connected</li>
            <li>TTS: Demo Mode</li>
            <li>Image Generation: Not Connected</li>
            <li>Video Generation: Demo Mode</li>
          </ul>
        </div>
        <div className="glass-card small-panel">
          <h3>System Status</h3>
          <ul>
            <li>RTL: Active</li>
            <li>Demo Data: Active</li>
            <li>Local persistence: Active</li>
            <li>Security: Env-based ready</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderVisualEffects = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Visual Effects Lab</p>
          <h2>معمل المؤثرات البصرية</h2>
        </div>
      </div>

      <div className="effects-grid">
        {['cinematic light leaks', 'film grain', 'parallax', 'depth blur', 'camera zoom', 'camera shake', 'speed ramp', 'glitch', 'chromatic aberration', 'lens flare', 'vignette', 'waveform overlays'].map((effect) => (
          <div className="chip" key={effect}>{effect}</div>
        ))}
      </div>

      <div className="glass-card creative-output">
        <h3>Preset: Cairo Night</h3>
        <p>أضف Light leak + film grain + vignette + parallax، مع درجة ألوان زرقاء وبيضاء تدعم طابع القاهرة الليلية.</p>
      </div>
    </div>
  );

  const renderVoiceStudio = () => (
    <div className="screen-block">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Voice Studio</p>
          <h2>استوديو الصوت</h2>
        </div>
      </div>

      <div className="voice-layout">
        <div className="glass-card form-panel">
          <div className="field-group">
            <label>الأسلوب</label>
            <select>
              <option>محادثة عادية</option>
              <option>إعلاني</option>
              <option>سينمائي</option>
              <option>كوميدي</option>
              <option>مثير</option>
              <option>فخم</option>
            </select>
          </div>
          <div className="field-group">
            <label>السرعة</label>
            <input defaultValue="1.0x" />
          </div>
          <div className="field-group">
            <label>الطاقة</label>
            <input defaultValue="78%" />
          </div>
          <button className="primary-btn">Demo Voice</button>
        </div>

        <div className="glass-card creative-output">
          <h3>Voice Demo</h3>
          <p>“صباح الخير يا مصر، خلّينا نبدأ من أول لقطة...”</p>
          <div className="waveform-box small">
            <div className="wave" /><div className="wave" /><div className="wave" /><div className="wave" />
            <div className="wave" /><div className="wave" /><div className="wave" /><div className="wave" />
          </div>
          <small>Demo Mode — actual TTS not connected.</small>
        </div>
      </div>
    </div>
  );

  const renderContentByTab = () => {
    switch (activeTab) {
      case 'command-center': return renderCommandCenter();
      case 'ziko-chat': return renderChat();
      case 'agents': return renderAgents();
      case 'creator-studio': return renderCreatorStudio();
      case 'music-lab': return renderMusicLab();
      case 'video-lab': return renderVideoLab();
      case 'script-studio': return renderScriptStudio();
      case 'voice-studio': return renderVoiceStudio();
      case 'visual-effects': return renderVisualEffects();
      case 'campaign-studio': return renderCampaignStudio();
      case 'social-studio': return renderSocialStudio();
      case 'library': return renderLibrary();
      case 'analytics': return renderAnalytics();
      case 'creator-profile': return renderProfile();
      case 'brand-center': return renderBrand();
      case 'activity-log': return renderActivity();
      case 'settings': return renderSettings();
      default: return renderCommandCenter();
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar glass-panel">
        <div className="brand-block">
          <div className="brand-icon">Z</div>
          <div>
            <strong>Ziko</strong>
            <small>Creative Studio</small>
          </div>
        </div>

        <div className="search-box">
          <span>⌕</span>
          <input placeholder="بحث..." />
        </div>

        <div className="status-strip">
          <div className="tiny-flag" />
          <span>زيكو متصل</span>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="creator-mini">
            <div className="mini-avatar">أ</div>
            <div>
              <strong>أحمد حمدي</strong>
              <small>AI Creative Director</small>
            </div>
          </div>
          <div className="footer-credit">
            <small>تصميم وتطوير وتنفيذ المهندس أحمد حمدي</small>
            <small>واتساب / فون: 01008013940</small>
            <small>Divelangel2@gmail.com</small>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar glass-panel">
          <div className="topbar-left">
            <button className="tiny-btn">🔔</button>
            <button className="tiny-btn">⚙️</button>
          </div>
          <div className="topbar-right">
            <div className="profile-pill">
              <div className="mini-avatar alt">أ</div>
              <span>أحمد حمدي</span>
            </div>
          </div>
        </header>

        {renderContentByTab()}

        <footer className="page-footer">
          <div>
            <strong>تصميم وتطوير وتنفيذ المهندس أحمد حمدي</strong>
          </div>
          <div>
            <small>واتساب / فون: 01008013940 • 01274011228</small>
            <small>البريد الإلكتروني: Divelangel2@gmail.com</small>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
