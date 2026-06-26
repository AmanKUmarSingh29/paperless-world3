import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FileText,
  Cloud,
  PenTool,
  Zap,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Video,
  Download,
  Star,
  Shield,
  TrendingUp,
  Users,
  Globe,
  Leaf,
} from "lucide-react";

// ─── Reusable animated section wrapper ───────────────────────────────────────
function FadeInSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Counter animation ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const tools = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Document Management Systems",
    description:
      "Manage your documents securely with industry-leading systems like SharePoint, Google Drive, and Dropbox.",
    tags: ["SharePoint", "Google Drive", "Dropbox"],
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Storage",
    description:
      "Store your documents safely in the cloud with enterprise-grade solutions from AWS, Microsoft Azure, and Google Cloud.",
    tags: ["AWS", "Azure", "Google Cloud"],
    color: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Digital Signature Tools",
    description:
      "Sign documents electronically with legally-binding tools like DocuSign, Adobe Sign, and HelloSign.",
    tags: ["DocuSign", "Adobe Sign", "HelloSign"],
    color: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Workflow Automation",
    description:
      "Automate your workflows and eliminate manual tasks with Zapier, Microsoft Power Automate, and Asana.",
    tags: ["Zapier", "Power Automate", "Asana"],
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const steps = [
  {
    step: "01",
    title: "Scan & Upload",
    description:
      "Digitize existing paper documents using smart scanners or mobile camera apps with OCR technology.",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-emerald-500",
  },
  {
    step: "02",
    title: "Organize & Store",
    description:
      "Automatically categorize and index your documents in a secure cloud repository accessible anywhere.",
    icon: <Cloud className="w-6 h-6" />,
    color: "bg-sky-500",
  },
  {
    step: "03",
    title: "Sign & Approve",
    description:
      "Use digital signatures for instant, legally-binding approvals without printing a single page.",
    icon: <PenTool className="w-6 h-6" />,
    color: "bg-violet-500",
  },
  {
    step: "04",
    title: "Automate & Scale",
    description:
      "Set up workflows to route, notify, and process documents automatically as your business grows.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-amber-500",
  },
];

const resources = [
  {
    type: "Guide",
    icon: <BookOpen className="w-5 h-5" />,
    title: "The Complete Paperless Transition Guide",
    description: "A step-by-step walkthrough to help businesses go fully paperless in 30 days.",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    type: "Video",
    icon: <Video className="w-5 h-5" />,
    title: "DocuSign Tutorial for Beginners",
    description: "Learn how to set up and send your first digital signature request in under 10 minutes.",
    color: "text-sky-600",
    bg: "bg-sky-100",
  },
  {
    type: "Download",
    icon: <Download className="w-5 h-5" />,
    title: "Paperless ROI Calculator",
    description: "Calculate how much time and money your organization can save by ditching paper.",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

const stats = [
  { value: 50000, suffix: "+", label: "Businesses Transformed", icon: <Users className="w-6 h-6" /> },
  { value: 98, suffix: "%", label: "Customer Satisfaction", icon: <Star className="w-6 h-6" /> },
  { value: 2, suffix: "M+", label: "Documents Processed", icon: <FileText className="w-6 h-6" /> },
  { value: 40, suffix: "%", label: "Cost Reduction", icon: <TrendingUp className="w-6 h-6" /> },
];

const benefits = [
  "Reduce operational costs by up to 40%",
  "Access documents from anywhere, anytime",
  "Enhanced security & compliance",
  "Faster approval & signing workflows",
  "Eco-friendly — save trees & the planet",
  "Seamless team collaboration",
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "tools", label: "Tools" },
    { id: "how-it-works", label: "How It Works" },
    { id: "resources", label: "Resources" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    setActive(id);
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-800">
              Paperless<span className="text-emerald-500">World</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === l.id
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-full shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 hover:scale-105 transition-all duration-200"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-xl"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-emerald-400/5 blur-2xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-8"
        >
          <Leaf className="w-4 h-4" />
          <span>Go Green. Go Paperless.</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          Transform Your{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Business
          </span>{" "}
          &{" "}
          <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Life
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Go paperless with the world's best tools. Save time, reduce costs, and help the planet — all from one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("tools")}
            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            Explore Tools
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            How It Works
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-slate-400 text-sm"
        >
          {["No credit card required", "Free 14-day trial", "Cancel anytime"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("tools")}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section className="bg-white py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeInSection key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  {s.icon}
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-1">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-slate-500 text-sm font-medium">{s.label}</div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tools ────────────────────────────────────────────────────────────────────
function Tools() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="tools" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
              Our Tools
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              Everything You Need to Go{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Paperless
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Discover the best-in-class tools to digitize, store, sign, and automate your documents.
            </p>
          </div>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <FadeInSection key={tool.title} delay={i * 0.1}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl p-6 bg-white border ${tool.border} shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden h-full flex flex-col`}
              >
                {/* Gradient accent top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color}`} />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-5 shadow-md`}
                >
                  {tool.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-3">{tool.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{tool.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${tool.bg} text-slate-700`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover arrow */}
                <motion.div
                  animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -10 }}
                  className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-4">
              Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              From scattered paper to a fully digital operation in four simple steps.
            </p>
          </div>
        </FadeInSection>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-200 via-teal-300 to-amber-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg mb-6 relative z-10`}
                  >
                    {step.icon}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-xs font-bold text-slate-700 flex items-center justify-center shadow border border-slate-100">
                      {i + 1}
                    </span>
                  </motion.div>

                  <div className="text-5xl font-black text-slate-100 mb-2 leading-none">{step.step}</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left */}
          <FadeInSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold mb-4">
              Why Paperless?
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Real Benefits for{" "}
              <span className="text-emerald-200">Real Businesses</span>
            </h2>
            <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
              Thousands of businesses have already made the switch. Join the movement and experience the difference paperless operations can make.
            </p>
            <div className="grid gap-3">
              {benefits.map((b, i) => (
                <FadeInSection key={b} delay={i * 0.08}>
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    <span className="text-white font-medium">{b}</span>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>

          {/* Right — visual card */}
          <FadeInSection delay={0.3} className="mt-12 lg:mt-0">
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 text-lg">Your Impact Dashboard</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    Live
                  </span>
                </div>
                {[
                  { label: "Trees Saved", value: "1,240", icon: <Leaf className="w-4 h-4" />, color: "text-emerald-600 bg-emerald-50", bar: "w-4/5" },
                  { label: "Cost Saved", value: "$18,400", icon: <TrendingUp className="w-4 h-4" />, color: "text-sky-600 bg-sky-50", bar: "w-3/4" },
                  { label: "Time Saved", value: "320 hrs", icon: <Zap className="w-4 h-4" />, color: "text-amber-600 bg-amber-50", bar: "w-2/3" },
                  { label: "Team Members", value: "48 users", icon: <Users className="w-4 h-4" />, color: "text-violet-600 bg-violet-50", bar: "w-1/2" },
                ].map((item) => (
                  <div key={item.label} className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center`}>
                          {item.icon}
                        </span>
                        <span className="text-sm text-slate-600 font-medium">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.bar.replace("w-", "") === "4/5" ? "80%" : item.bar.replace("w-", "") === "3/4" ? "75%" : item.bar.replace("w-", "") === "2/3" ? "66%" : "50%" }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-emerald-50 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Environmental Impact</div>
                    <div className="text-sm font-bold text-slate-800">Top 10% of green businesses 🌿</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-amber-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
              >
                🏆 Eco-Certified
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ─── Resources ────────────────────────────────────────────────────────────────
function Resources() {
  return (
    <section id="resources" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
              Resources
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              Learn &{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                Grow
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Free guides, tutorials, and tools to help you on your paperless journey.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <FadeInSection key={r.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl ${r.bg} ${r.color} flex items-center justify-center mb-4`}>
                  {r.icon}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${r.color}`}>{r.type}</span>
                <h3 className="text-slate-800 font-bold text-lg mt-1 mb-2">{r.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{r.description}</p>
                <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${r.color}`}>
                  Access Resource <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold mb-4">
              Contact
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              Get in{" "}
              <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Have a question or ready to start your paperless journey? We'd love to hear from you.
            </p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <FadeInSection delay={0.1}>
            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email Us",
                  value: "hello@paperlessworld.com",
                  color: "bg-sky-50 text-sky-600",
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: "Call Us",
                  value: "+1 (800) 555-PAPER",
                  color: "bg-emerald-50 text-emerald-600",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Visit Us",
                  value: "123 Green Street, San Francisco, CA 94102",
                  color: "bg-violet-50 text-violet-600",
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  label: "Security",
                  value: "SOC 2 Type II & ISO 27001 Certified",
                  color: "bg-amber-50 text-amber-600",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-slate-700 font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Form */}
          <FadeInSection delay={0.2}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      placeholder="Tell us how we can help…"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-md shadow-emerald-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    Send Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Paperless<span className="text-emerald-400">World</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Helping businesses and individuals transform their operations by going fully paperless — better for you, better for the planet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["home", "tools", "how-it-works", "resources", "contact"].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="hover:text-emerald-400 transition-colors capitalize"
                  >
                    {id.replace("-", " ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">Top Tools</h4>
            <ul className="space-y-2 text-sm">
              {["SharePoint", "Google Drive", "DocuSign", "Zapier", "Adobe Sign", "Microsoft Azure"].map((t) => (
                <li key={t}>
                  <span className="hover:text-emerald-400 transition-colors cursor-pointer">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2025 Paperless World. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-emerald-400">
            <Leaf className="w-4 h-4" />
            <span>Carbon neutral website</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <Stats />
      <Tools />
      <HowItWorks />
      <Benefits />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
}
