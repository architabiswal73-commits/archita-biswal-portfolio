import { useState, useEffect, useRef } from "react";

const TYPING_ROLES = [
    "MCA Student",
    "Data Science Enthusiast",
    "Machine Learning Learner",
    "Data Analyst",
    "Python Developer",
];

const SKILLS = {
    "Programming": [
        { name: "Python", level: 90 },
        { name: "SQL", level: 80 },
        { name: "Java", level: 65 },
    ],
    "Data Analysis": [
        { name: "Pandas & NumPy", level: 88 },
        { name: "Matplotlib / Seaborn", level: 82 },
        { name: "EDA & Data Cleaning", level: 90 },
        { name: "Power BI / Tableau", level: 72 },
    ],
    "Machine Learning": [
        { name: "Scikit-learn", level: 85 },
        { name: "Random Forest / KNN", level: 80 },
        { name: "Feature Engineering", level: 83 },
        { name: "Hyperparameter Tuning", level: 78 },
    ],
    "Deep Learning": [
        { name: "TensorFlow", level: 65 },
        { name: "PyTorch", level: 60 },
        { name: "Neural Networks", level: 63 },
    ],
    "Tools & Databases": [
        { name: "Git & GitHub", level: 85 },
        { name: "Jupyter Notebook", level: 90 },
        { name: "MySQL / SQLite", level: 78 },
        { name: "VS Code", level: 92 },
    ],
};

const PROJECTS = [
    {
        title: "Car Sales Prediction",
        tag: "Machine Learning",
        description:
            "Built and optimized an ML model on 10,000+ sales records, achieving ~85% prediction accuracy. Applied GridSearchCV for hyperparameter tuning and identified key sales trend drivers through correlation analysis.",
        tech: ["Python", "Scikit-learn", "GridSearchCV", "Pandas"],
        icon: "🚗",
        color: "#6366f1",
    },
    {
        title: "Student Performance Prediction",
        tag: "Machine Learning",
        description:
            "Developed an ML model predicting student academic performance using attendance, study hours, previous grades, and assignment completion data.",
        tech: ["Python", "Pandas", "Scikit-learn", "SQLite"],
        icon: "🎓",
        color: "#0ea5e9",
    },
    {
        title: "AI Voice Assistant (Jarvis)",
        tag: "AI / Python",
        description:
            "Designed and built a voice-controlled assistant with speech recognition and task automation. Implemented real-time command parsing and response logic for user interaction.",
        tech: ["Python", "Speech Recognition", "NLP", "Automation"],
        icon: "🤖",
        color: "#10b981",
    },
    {
        title: "Sales Data Analysis",
        tag: "Data Analysis",
        description:
            "Cleaned and transformed raw JSON datasets improving analytical clarity by ~30%. Built interactive dashboards to communicate insights to non-technical stakeholders.",
        tech: ["Python", "Pandas", "Matplotlib", "Dashboard"],
        icon: "📊",
        color: "#f59e0b",
    },
    {
        title: "House Price Prediction",
        tag: "Machine Learning",
        description:
            "Built ML models to estimate house prices using regression algorithms and feature engineering techniques on real-world datasets.",
        tech: ["Python", "Random Forest", "Linear Regression", "Feature Eng."],
        icon: "🏠",
        color: "#8b5cf6",
    },
];

const CERTIFICATIONS = [
    { name: "IBM ICE Day — 2nd Position", detail: "Safe AI Search using Blockchain · Nov 2025", icon: "🏆" },
    { name: "Data Analysis with Python", detail: "Hands-on EDA & visualization", icon: "📈" },
    { name: "Machine Learning Fundamentals", detail: "Scikit-learn & model building", icon: "🧠" },
    { name: "SQL for Data Science", detail: "Querying, joins & aggregations", icon: "🗄️" },
];

function useTypingEffect(words, speed = 80, pause = 1800) {
    const [display, setDisplay] = useState("");
    const [idx, setIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[idx % words.length];
        let timeout;
        if (!deleting && display === current) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && display === "") {
            setDeleting(false);
            setIdx((i) => (i + 1) % words.length);
        } else {
            timeout = setTimeout(() => {
                setDisplay(deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1));
            }, deleting ? speed / 2 : speed);
        }
        return () => clearTimeout(timeout);
    }, [display, deleting, idx, words, speed, pause]);

    return display;
}

function useCountUp(target, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

function StatCard({ value, suffix, label, start }) {
    const count = useCountUp(value, 1600, start);
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "#6366f1", lineHeight: 1 }}>
                {count}{suffix}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: 4, letterSpacing: "0.05em" }}>{label}</div>
        </div>
    );
}

function SkillBar({ name, level }) {
    const [animated, setAnimated] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div ref={ref} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: "0.84rem" }}>
                <span style={{ color: "var(--text)" }}>{name}</span>
                <span style={{ color: "#6366f1", fontWeight: 600 }}>{level}%</span>
            </div>
            <div style={{ background: "var(--bar-bg)", borderRadius: 99, height: 7, overflow: "hidden" }}>
                <div
                    style={{
                        width: animated ? `${level}%` : "0%",
                        height: "100%",
                        borderRadius: 99,
                        background: "linear-gradient(90deg,#6366f1,#818cf8)",
                        transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
                    }}
                />
            </div>
        </div>
    );
}

function useReveal() {
    const ref = useRef();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

function Section({ id, children, style }) {
    const [ref, vis] = useReveal();
    return (
        <section
            id={id}
            ref={ref}
            style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                ...style,
            }}
        >
            {children}
        </section>
    );
}

function SectionTitle({ title, sub }) {
    return (
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0, color: "var(--heading)" }}>{title}</h2>
            {sub && <p style={{ color: "#94a3b8", marginTop: 8, fontSize: "0.95rem" }}>{sub}</p>}
            <div style={{ width: 56, height: 4, background: "linear-gradient(90deg,#6366f1,#818cf8)", borderRadius: 99, margin: "14px auto 0" }} />
        </div>
    );
}

export default function Portfolio() {
    const [dark, setDark] = useState(true);
    const [activeSkill, setActiveSkill] = useState("Programming");
    const [activeFilter, setActiveFilter] = useState("All");
    const [statsVisible, setStatsVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const typed = useTypingEffect(TYPING_ROLES);
    const statsRef = useRef();

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    const colors = dark
        ? {
            "--bg": "#0f0f17",
            "--surface": "#16161f",
            "--card": "#1c1c2a",
            "--border": "#2a2a3d",
            "--text": "#c8c8e0",
            "--heading": "#f0f0ff",
            "--muted": "#64647a",
            "--bar-bg": "#2a2a3d",
        }
        : {
            "--bg": "#f8f8fc",
            "--surface": "#ffffff",
            "--card": "#f0f0f8",
            "--border": "#e0e0f0",
            "--text": "#3a3a55",
            "--heading": "#0f0f22",
            "--muted": "#8888a0",
            "--bar-bg": "#e0e0f0",
        };

    const tags = ["All", ...new Set(PROJECTS.map((p) => p.tag))];
    const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === activeFilter);

    const navLinks = ["About", "Skills", "Projects", "Education", "Certifications", "Contact"];

    return (
        <div style={{ ...colors, background: "var(--bg)", color: "var(--text)", fontFamily: "'Inter',sans-serif", minHeight: "100vh", transition: "background 0.3s,color 0.3s" }}>
            <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: dark ? "rgba(15,15,23,0.85)" : "rgba(248,248,252,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
                <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#818cf8", letterSpacing: "-0.02em" }}>AB<span style={{ color: "var(--heading)" }}>.</span></span>
                <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        {navLinks.map((l) => (
                            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "var(--text)", textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, transition: "color 0.2s" }}
                                onMouseEnter={e => e.target.style.color = "#818cf8"} onMouseLeave={e => e.target.style.color = "var(--text)"}>{l}</a>
                        ))}
                    </div>
                    <button onClick={() => setDark(!dark)} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 99, padding: "5px 12px", cursor: "pointer", fontSize: "0.85rem", color: "var(--text)" }}>
                        {dark ? "☀️" : "🌙"}
                    </button>
                </div>
            </nav>

            <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 5% 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)", top: "10%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
                    <div style={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#818cf8)", margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem", boxShadow: "0 0 0 4px var(--bg), 0 0 0 6px #6366f1" }}>
                        AB
                    </div>
                    <p style={{ color: "#818cf8", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Hello, I'm</p>
                    <h1 style={{ fontSize: "clamp(2.2rem,6vw,3.8rem)", fontWeight: 800, color: "var(--heading)", margin: "0 0 0.5rem", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                        Archita Biswal
                    </h1>
                    <div style={{ fontSize: "clamp(1.1rem,3vw,1.5rem)", fontWeight: 600, minHeight: 40, marginBottom: "1.2rem" }}>
                        <span style={{ color: "#818cf8" }}>{typed}</span>
                        <span style={{ color: "#6366f1", animation: "blink 1s step-end infinite" }}>|</span>
                    </div>
                    <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.75, maxWidth: 600, margin: "0 auto 2.2rem" }}>
                        Transforming data into meaningful insights through Data Science, Analytics, and Machine Learning.
                    </p>
                    <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", justifyContent: "center" }}>
                        {[
                            { label: "View Projects", href: "#projects", primary: true },
                            { label: "Contact Me", href: "#contact", primary: false },
                            { label: "⬇ Resume", href: "#contact", primary: false },
                        ].map((b) => (
                            <a key={b.label} href={b.href} style={{
                                padding: "0.7rem 1.6rem", borderRadius: 99, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", cursor: "pointer",
                                background: b.primary ? "linear-gradient(135deg,#6366f1,#818cf8)" : "transparent",
                                color: b.primary ? "#fff" : "#818cf8",
                                border: b.primary ? "none" : "1.5px solid #818cf8",
                                transition: "opacity 0.2s,transform 0.2s",
                            }}
                                onMouseEnter={e => { e.target.style.opacity = 0.85; e.target.style.transform = "translateY(-2px)"; }}
                                onMouseLeave={e => { e.target.style.opacity = 1; e.target.style.transform = "translateY(0)"; }}
                            >{b.label}</a>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.8rem" }}>
                        {[
                            { label: "LinkedIn", url: "https://linkedin.com/in/archita-biswal", emoji: "💼" },
                            { label: "GitHub", url: "https://github.com/Archita-Biswal", emoji: "🐙" },
                            { label: "Email", url: "mailto:architabiswal73@gmail.com", emoji: "✉️" },
                        ].map((s) => (
                            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{
                                display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 99,
                                background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)",
                                textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, transition: "border-color 0.2s",
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = "#818cf8"}
                                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                            >{s.emoji} {s.label}</a>
                        ))}
                    </div>
                    <div style={{ marginTop: "3rem", color: "var(--muted)", fontSize: "0.8rem" }}>
                        <div style={{ animation: "bounce 2s infinite", display: "inline-block" }}>↓ scroll to explore</div>
                    </div>
                </div>
                <style>{`
          @keyframes blink { 50% { opacity: 0; } }
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        `}</style>
            </section>

            <Section id="about" style={{ padding: "5rem 5%", background: "var(--surface)" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <SectionTitle title="About Me" sub="A little bit about who I am" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
                        <div>
                            <p style={{ lineHeight: 1.85, marginBottom: "1rem", color: "var(--text)" }}>
                                I'm <strong style={{ color: "var(--heading)" }}>Archita Biswal</strong>, an MCA student specialising in <strong style={{ color: "#818cf8" }}>Data Science and Analytics</strong> at Ajeenkya D.Y. Patil University, Pune. My background spans machine learning model building, exploratory data analysis, and data pipeline development.
                            </p>
                            <p style={{ lineHeight: 1.85, marginBottom: "1rem", color: "var(--text)" }}>
                                I have hands-on experience delivering ~85% prediction accuracy on a 10,000-record ML project, and I have interned as a <strong style={{ color: "var(--heading)" }}>Data Analyst</strong> where I processed 5,000+ records using Python, reducing data inconsistencies by ~20%.
                            </p>
                            <p style={{ lineHeight: 1.85, color: "var(--text)" }}>
                                My goal is to build a career in Data Science, Machine Learning, and AI-driven technologies — turning raw data into decisions that matter.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            {[
                                { icon: "🎓", label: "MCA Student", sub: "Data Science Spec." },
                                { icon: "🤖", label: "ML Enthusiast", sub: "Scikit-learn, TF" },
                                { icon: "📊", label: "Data Analyst", sub: "EDA & Visualization" },
                                { icon: "🐍", label: "Python Dev", sub: "Pandas, NumPy" },
                            ].map((card) => (
                                <div key={card.label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.1rem", textAlign: "center", transition: "border-color 0.25s,transform 0.25s", cursor: "default" }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                                >
                                    <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{card.icon}</div>
                                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--heading)" }}>{card.label}</div>
                                    <div style={{ fontSize: "0.77rem", color: "var(--muted)", marginTop: 2 }}>{card.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", marginTop: "3rem", background: "var(--card)", borderRadius: 16, padding: "2rem", border: "1px solid var(--border)" }}>
                        <StatCard value={5} suffix="+" label="Projects Built" start={statsVisible} />
                        <StatCard value={85} suffix="%" label="ML Accuracy" start={statsVisible} />
                        <StatCard value={10} suffix="K+" label="Records Processed" start={statsVisible} />
                        <StatCard value={2} suffix="+" label="Years Experience" start={statsVisible} />
                    </div>
                </div>
            </Section>

            <Section id="skills" style={{ padding: "5rem 5%" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <SectionTitle title="Skills" sub="Technologies and tools I work with" />
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem", justifyContent: "center" }}>
                        {Object.keys(SKILLS).map((cat) => (
                            <button key={cat} onClick={() => setActiveSkill(cat)} style={{
                                padding: "0.45rem 1.1rem", borderRadius: 99, fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                                borderColor: activeSkill === cat ? "#6366f1" : "var(--border)",
                                background: activeSkill === cat ? "linear-gradient(135deg,#6366f1,#818cf8)" : "var(--card)",
                                color: activeSkill === cat ? "#fff" : "var(--text)",
                                transition: "all 0.2s",
                            }}>{cat}</button>
                        ))}
                    </div>
                    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
                        {SKILLS[activeSkill].map((s) => <SkillBar key={s.name} {...s} />)}
                    </div>
                </div>
            </Section>

            <Section id="projects" style={{ padding: "5rem 5%", background: "var(--surface)" }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <SectionTitle title="Projects" sub="Things I've built and shipped" />
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.2rem", justifyContent: "center" }}>
                        {tags.map((t) => (
                            <button key={t} onClick={() => setActiveFilter(t)} style={{
                                padding: "0.4rem 1rem", borderRadius: 99, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                                borderColor: activeFilter === t ? "#6366f1" : "var(--border)",
                                background: activeFilter === t ? "rgba(99,102,241,0.12)" : "transparent",
                                color: activeFilter === t ? "#818cf8" : "var(--muted)",
                                transition: "all 0.2s",
                            }}>{t}</button>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.4rem" }}>
                        {filtered.map((p) => (
                            <div key={p.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", transition: "border-color 0.25s,transform 0.25s", cursor: "default" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = "translateY(-5px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.8rem" }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{p.icon}</div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--heading)" }}>{p.title}</div>
                                        <div style={{ fontSize: "0.74rem", color: p.color, fontWeight: 600, marginTop: 1 }}>{p.tag}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: "0.86rem", lineHeight: 1.7, color: "var(--text)", marginBottom: "1rem" }}>{p.description}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                    {p.tech.map((t) => (
                                        <span key={t} style={{ fontSize: "0.73rem", background: `${p.color}18`, color: p.color, borderRadius: 99, padding: "3px 9px", fontWeight: 600 }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section id="education" style={{ padding: "5rem 5%" }}>
                <div style={{ maxWidth: 760, margin: "0 auto" }}>
                    <SectionTitle title="Education" sub="My academic journey" />
                    <div style={{ position: "relative", paddingLeft: "2rem" }}>
                        <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom,#6366f1,#818cf8)" }} />
                        {[
                            {
                                degree: "Master of Computer Applications (MCA)",
                                spec: "Specialisation: Data Science and Analytics",
                                institution: "Ajeenkya D.Y. Patil University, Pune",
                                period: "2025 – 2027",
                                status: "Currently Pursuing",
                                icon: "🎓",
                                color: "#6366f1",
                            },
                            {
                                degree: "Bachelor of Science (B.Sc.)",
                                spec: "",
                                institution: "Institute for Excellence in Higher Education (IEHE), Bhopal",
                                period: "2021 – 2024",
                                status: "Completed",
                                icon: "📚",
                                color: "#0ea5e9",
                            },
                        ].map((edu, i) => (
                            <div key={i} style={{ position: "relative", marginBottom: i === 0 ? "2.5rem" : 0 }}>
                                <div style={{ position: "absolute", left: -29, top: 4, width: 18, height: 18, borderRadius: "50%", background: edu.color, border: "3px solid var(--bg)", zIndex: 2 }} />
                                <div style={{ background: "var(--surface)", border: `1px solid var(--border)`, borderLeft: `3px solid ${edu.color}`, borderRadius: "0 14px 14px 0", padding: "1.4rem 1.5rem", transition: "border-color 0.25s" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                                        <div>
                                            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--heading)" }}>{edu.degree}</div>
                                            {edu.spec && <div style={{ fontSize: "0.83rem", color: edu.color, fontWeight: 600, marginTop: 2 }}>{edu.spec}</div>}
                                            <div style={{ fontSize: "0.87rem", color: "var(--muted)", marginTop: 4 }}>📍 {edu.institution}</div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>{edu.period}</div>
                                            <span style={{ fontSize: "0.72rem", background: `${edu.color}20`, color: edu.color, borderRadius: 99, padding: "3px 9px", fontWeight: 600, display: "inline-block", marginTop: 4 }}>{edu.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section id="certifications" style={{ padding: "5rem 5%", background: "var(--surface)" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <SectionTitle title="Certifications & Awards" sub="Recognition and credentials" />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.2rem" }}>
                        {CERTIFICATIONS.map((c) => (
                            <div key={c.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.4rem", textAlign: "center", transition: "border-color 0.25s,transform 0.25s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "#818cf8"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                            >
                                <div style={{ fontSize: "2rem", marginBottom: "0.7rem" }}>{c.icon}</div>
                                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--heading)", marginBottom: 4 }}>{c.name}</div>
                                <div style={{ fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.5 }}>{c.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section id="experience" style={{ padding: "5rem 5%" }}>
                <div style={{ maxWidth: 760, margin: "0 auto" }}>
                    <SectionTitle title="Experience" sub="Professional roles and leadership" />
                    {[
                        {
                            role: "Data Analyst Intern",
                            org: "Industry Internship",
                            period: "Feb 2024 – Mar 2024",
                            color: "#10b981",
                            bullets: [
                                "Processed and analysed 5,000+ structured records with Python (Pandas, NumPy), reducing inconsistencies by ~20%.",
                                "Performed EDA to identify trends; translated findings into actionable business recommendations.",
                                "Automated repetitive data-cleaning tasks, improving team productivity.",
                                "Collaborated cross-functionally to present insights to stakeholders.",
                            ],
                        },
                        {
                            role: "Event Coordinator",
                            org: "University Leadership",
                            period: "2025",
                            color: "#f59e0b",
                            bullets: [
                                "Coordinated university convocation for 500+ participants.",
                                "Led team coordination for smooth event execution.",
                            ],
                        },
                    ].map((exp, i) => (
                        <div key={i} style={{ background: "var(--surface)", border: `1px solid var(--border)`, borderLeft: `3px solid ${exp.color}`, borderRadius: "0 14px 14px 0", padding: "1.5rem", marginBottom: "1.4rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: "1rem" }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--heading)" }}>{exp.role}</div>
                                    <div style={{ fontSize: "0.84rem", color: exp.color, fontWeight: 600, marginTop: 2 }}>{exp.org}</div>
                                </div>
                                <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 500, background: "var(--card)", padding: "4px 10px", borderRadius: 99, border: "1px solid var(--border)" }}>{exp.period}</span>
                            </div>
                            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                                {exp.bullets.map((b, j) => (
                                    <li key={j} style={{ fontSize: "0.86rem", lineHeight: 1.7, color: "var(--text)", marginBottom: 4 }}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="contact" style={{ padding: "5rem 5%", background: "var(--surface)" }}>
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <SectionTitle title="Contact" sub="Let's connect and build something great" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                        {[
                            { icon: "✉️", label: "Email", val: "architabiswal73@gmail.com", href: "mailto:architabiswal73@gmail.com" },
                            { icon: "📞", label: "Phone", val: "+91 70007 90468", href: "tel:+917000790468" },
                            { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/archita-biswal", href: "https://linkedin.com/in/archita-biswal" },
                            { icon: "🐙", label: "GitHub", val: "github.com/Archita-Biswal", href: "https://github.com/Archita-Biswal" },
                        ].map((c) => (
                            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.8rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.2rem", textDecoration: "none", transition: "border-color 0.25s,transform 0.25s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "#818cf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                            >
                                <span style={{ fontSize: "1.4rem" }}>{c.icon}</span>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</div>
                                    <div style={{ fontSize: "0.84rem", color: "var(--heading)", fontWeight: 500, marginTop: 1 }}>{c.val}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <ContactForm dark={dark} />
                </div>
            </Section>

            <footer style={{ background: dark ? "#09090f" : "#f0f0f8", borderTop: "1px solid var(--border)", padding: "2rem 5%", textAlign: "center" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#818cf8", marginBottom: "0.8rem" }}>Archita Biswal</div>
                <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
                    {navLinks.map((l) => (
                        <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.82rem", transition: "color 0.2s" }}
                            onMouseEnter={e => e.target.style.color = "#818cf8"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</a>
                    ))}
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.78rem" }}>© {new Date().getFullYear()} Archita Biswal · Built with ❤️ using React</p>
            </footer>
        </div>
    );
}

function ContactForm({ dark }) {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const submit = () => {
        if (!form.name || !form.email || !form.message) return;
        setSent(true);
    };

    const inputStyle = {
        width: "100%", padding: "0.7rem 0.9rem", borderRadius: 10, border: "1px solid var(--border)",
        background: "var(--card)", color: "var(--heading)", fontSize: "0.9rem", boxSizing: "border-box",
        outline: "none", fontFamily: "inherit", marginBottom: "0.9rem", transition: "border-color 0.2s",
    };

    if (sent) return (
        <div style={{ textAlign: "center", padding: "2.5rem", background: "rgba(99,102,241,0.08)", borderRadius: 14, border: "1px solid #6366f1" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.6rem" }}>✅</div>
            <div style={{ fontWeight: 700, color: "var(--heading)", marginBottom: 4 }}>Message sent!</div>
            <div style={{ color: "var(--muted)", fontSize: "0.88rem" }}>Thanks for reaching out, Archita will get back to you soon.</div>
        </div>
    );

    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <input name="name" placeholder="Your name" value={form.name} onChange={handle} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#818cf8"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                <input name="email" placeholder="Your email" value={form.email} onChange={handle} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#818cf8"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
            </div>
            <textarea name="message" placeholder="Your message..." rows={5} value={form.message} onChange={handle}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "#818cf8"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
            <button onClick={submit} style={{
                width: "100%", padding: "0.8rem", borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#818cf8)",
                color: "#fff", border: "none", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "opacity 0.2s",
            }}
                onMouseEnter={e => e.target.style.opacity = 0.88}
                onMouseLeave={e => e.target.style.opacity = 1}
            >Send Message →</button>
        </div>
    );
}
