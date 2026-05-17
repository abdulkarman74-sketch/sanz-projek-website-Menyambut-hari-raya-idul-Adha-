import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Copy, Play, Pause, CheckCircle2, ChevronUp, Moon, Star, BookOpen, Quote, Info, Crown, Sparkles, Heart, Share2 } from 'lucide-react';

export default function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="relative min-h-screen text-cream font-playfair bg-green-dark selection:bg-gold/30">
            {/* 2px Scroll Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-[2px] bg-[length:200%_100%] bg-gradient-to-r from-gold-dark via-gold to-gold-light origin-left z-[9999] shadow-[0_0_10px_rgba(201,168,76,0.6)]"
                style={{ scaleX, backgroundImage: 'linear-gradient(90deg, #8b6914, #c9a84c, #f5d98b, #c9a84c, #8b6914)', animation: 'shimmerBar 3s linear infinite' }}
            />

            <AnimatePresence>
                {showSplash && <Splash />}
            </AnimatePresence>

            {/* Background Layers */}
            <div className="bg-parallax-main" />
            <div className="bg-overlay-dark" />
            <div className="bg-overlay-vignette" />
            <div className="bg-overlay-pattern" />

            {!showSplash && (
                <>
                    <StickyNav />
                    
                    <main className="relative z-10 w-full mx-auto flex flex-col gap-32 pt-24 pb-32">
                        {/* Wrapper for constrained sections */}
                        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col gap-32 w-full">
                            <SectionHero />
                            <SectionCountdown />
                            <SectionMakna />
                            <SectionKisah />
                            <SectionTakbir />
                            <SectionDoa />
                            <SectionAmalan />
                            <SectionFakta />
                            <SectionUcapan />
                            <SectionAudio />
                        </div>
                        
                        {/* Full width section */}
                        <SectionKeutamaan />
                        
                        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col gap-32 w-full">
                            <SectionPesan />
                            <SectionCreator />
                        </div>
                    </main>

                    <Footer />

                    {/* Back to Top */}
                    <AnimatePresence>
                        {scrolled && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                onClick={scrollToTop}
                                className="fixed bottom-8 right-8 w-14 h-14 rounded-full glass-card flex items-center justify-center text-gold hover:text-green-dark hover:bg-gold transition-all z-50 cursor-pointer shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                            >
                                <ChevronUp size={28} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
}

// ----------------------------------------------------
// COMPONENTS
// ----------------------------------------------------
const Splash = () => (
    <motion.div 
        initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
        className="fixed inset-0 bg-[#06120b] z-[10000] flex flex-col justify-center items-center pointer-events-none"
    >
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 2 }}
            className="font-amiri text-6xl md:text-9xl text-gold drop-shadow-[0_0_30px_rgba(201,168,76,0.6)]"
        >
            بِسْمِ اللهِ
        </motion.div>
        <div className="mt-8 flex gap-2">
            {[0,1,2].map(i => (
                <motion.div 
                    key={i}
                    animate={{ opacity: [0,1,0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-gold"
                />
            ))}
        </div>
    </motion.div>
);

const GlassCard = ({ children, className = "", noPad = false, ...props }: any) => (
    <div className={`glass-card ${noPad ? '' : 'p-6 md:p-10'} ${className}`} {...props}>
        {children}
    </div>
);

const SectionHeading = ({ children, arabic, subtitle }: any) => (
    <div className="text-center mb-16 px-4">
        {arabic && <div className="font-amiri text-4xl md:text-5xl text-gold/80 mb-6 drop-shadow-md">{arabic}</div>}
        <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-gold tracking-widest uppercase mb-6 leading-tight max-w-3xl mx-auto">{children}</h2>
        <div className="flex justify-center items-center gap-4 mb-4">
            <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-gold/50">
                <path d="M0 10H80M120 10H200" stroke="currentColor" strokeWidth="1" />
                <path d="M100 0L110 10L100 20L90 10L100 0Z" fill="currentColor" opacity="0.8" />
                <circle cx="85" cy="10" r="2" fill="currentColor" />
                <circle cx="115" cy="10" r="2" fill="currentColor" />
            </svg>
        </div>
        {subtitle && <p className="text-cream-dark opacity-80 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
);

const Reveal = ({ children, delay = 0, className = "" }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        className={className}
    >
        {children}
    </motion.div>
);

function CopyBtn({ text, label = "Salin" }: { text: string, label?: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={handleCopy} className="flex items-center justify-center gap-2 w-full py-3 border border-gold/50 text-gold text-xs font-bold rounded-xl uppercase tracking-widest hover:bg-gold hover:text-green-dark transition-all active:scale-95 cursor-pointer">
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            {copied ? "Tersalin" : label}
        </button>
    );
}

// ----------------------------------------------------
// SECTIONS
// ----------------------------------------------------

function StickyNav() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Beranda', href: '#beranda' },
        { name: 'Countdown', href: '#countdown' },
        { name: 'Kisah', href: '#kisah' },
        { name: 'Doa', href: '#doa' },
        { name: 'Ucapan', href: '#ucapan' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-green-dark/75 backdrop-blur-[20px] py-4 border-b border-gold/15' : 'bg-transparent py-6'}`}>
            <div className="max-w-6xl mx-auto px-6 flex justify-center md:justify-between items-center relative">
                <div className="hidden md:block font-cinzel text-gold text-xl tracking-[0.3em] font-bold">1447 H</div>
                <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar">
                    {links.map((link) => (
                        <a key={link.name} href={link.href} className="text-xs md:text-sm font-cinzel text-cream hover:text-gold uppercase tracking-[0.2em] transition-colors whitespace-nowrap">
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

function StarsCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let stars = Array.from({length: 60}, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.3 + 0.05,
            opacity: Math.random() * 0.6 + 0.2,
            color: Math.random() > 0.5 ? '#c9a84c' : '#ffffff'
        }));
        let animationFrameId: number;

        function render() {
            if(!canvas) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            ctx!.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(s => {
                ctx!.beginPath();
                ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx!.fillStyle = s.color;
                ctx!.globalAlpha = s.opacity;
                ctx!.fill();
                s.y -= s.speed;
                if (s.y < -5) { s.y = canvas.height + 5; s.x = Math.random() * canvas.width; }
            });
            ctx!.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(render);
        }
        render();

        return () => { cancelAnimationFrame(animationFrameId); };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0" />;
}

function SectionHero() {
    return (
        <section id="beranda" className="hero min-h-screen flex flex-col justify-center items-center text-center pt-20 relative hero-vignette">
            <StarsCanvas />
            <Reveal className="relative z-10 w-full">
                <div className="relative mb-8 flex justify-center items-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute text-gold moon-icon">
                        <Moon size={160} strokeWidth={0.5} />
                    </motion.div>
                    <Star size={60} className="text-gold mt-6 fill-gold/20" />
                </div>
            </Reveal>
            <Reveal delay={0.2} className="relative z-10 w-full">
                <h1 className="arabic-main mb-8 font-amiri text-[clamp(3.2rem,9vw,6.5rem)] text-[#c9a84c] leading-[1.4] text-center drop-shadow-2xl">
                    عِيدُ الأَضْحَى مُبَارَك
                </h1>
                <h2 className="hero-title font-cinzel text-[clamp(1.8rem,5vw,4rem)] font-black uppercase tracking-[0.08em] text-white mb-6 py-4 max-w-4xl mx-auto">
                    Selamat Hari Raya<br className="md:hidden" /> Idul Adha 1447 H
                </h2>
                <p className="text-xl md:text-2xl text-gold-light italic tracking-wide mb-14 drop-shadow-md">
                    10 Dzulhijjah 1447 H • Kamis, 28 Mei 2026
                </p>
                <div className="takbir-marquee max-w-2xl mx-auto relative">
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[rgba(2,12,5,0.9)] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[rgba(2,12,5,0.9)] to-transparent z-10" />
                    <div className="animate-marquee font-amiri text-3xl md:text-4xl text-gold drop-shadow-md">
                        اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ لَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

function SectionCountdown() {
    const targetDate = new Date("May 28, 2026 00:00:00").getTime();
    const startDate = new Date("May 18, 2026 00:00:00").getTime(); // Reference internal calculation
    const [timeLeft, setTimeLeft] = useState<any>(null);

    useEffect(() => {
        const update = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance < 0) return setTimeLeft("EID");
            setTimeLeft({
                d: Math.floor(distance / (1000 * 60 * 60 * 24)),
                h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                s: Math.floor((distance % (1000 * 60)) / 1000),
                p: Math.min(Math.max(((now - startDate) / (targetDate - startDate)) * 100, 0), 100)
            });
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="countdown">
            <Reveal>
                <GlassCard className="flex flex-col items-center islamic-arch shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-gold/40">
                    <div className="text-gold text-sm tracking-[0.4em] uppercase mb-10 border-b border-gold/20 pb-2">Menghitung Hari Menuju Kemenangan</div>
                    {timeLeft === "EID" ? (
                        <div className="text-center py-10">
                            <h2 className="font-cinzel text-5xl md:text-6xl text-gold mb-6">Hari Raya Telah Tiba</h2>
                            <div className="font-amiri text-5xl md:text-7xl text-cream drop-shadow-[0_0_20px_rgba(201,168,76,0.3)]">تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ</div>
                        </div>
                    ) : timeLeft ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-4xl mb-14">
                                {Object.entries({ Hari: timeLeft.d, Jam: timeLeft.h, Menit: timeLeft.m, Detik: timeLeft.s }).map(([label, val]) => (
                                    <div key={label} className="bg-black/40 border-2 border-gold/30 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
                                        <div className="font-cinzel text-5xl md:text-8xl font-bold text-cream mb-2 drop-shadow-md z-10">{val.toString().padStart(2, '0')}</div>
                                        <div className="text-xs md:text-sm uppercase text-gold tracking-[0.4em] font-bold z-10">{label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full max-w-3xl bg-black/60 rounded-full h-3 overflow-hidden border border-gold/20 shadow-inner p-[1px]">
                                <div className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(201,168,76,0.5)]" style={{ width: `${timeLeft.p}%` }}></div>
                            </div>
                            <div className="mt-6 font-cinzel text-sm md:text-base tracking-[0.3em] text-cream-dark uppercase">10 Dzulhijjah 1447 H • 28 Mei 2026</div>
                        </>
                    ) : null}
                </GlassCard>
            </Reveal>
        </section>
    );
}

function SectionMakna() {
    return (
        <section>
            <Reveal>
                <SectionHeading>Makna Idul Adha</SectionHeading>
                <GlassCard className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <p className="text-lg leading-relaxed text-cream/90 text-justify font-serif">
                            Idul Adha bukan sekadar perayaan menyembelih hewan kurban, melainkan momentum introspeksi diri untuk merefleksikan kembali nilai ketulusan dan kepatuhan mutlak kepada Sang Pencipta, mengambil ibrah dari kisah agung bapak Tauhid, Nabi Ibrahim Alaihissalam.
                        </p>
                        <p className="text-lg leading-relaxed text-cream/90 text-justify font-serif">
                            Ini adalah hari dimana umat Islam di seluruh dunia menyembelih keangkuhan, ego, dan sifat-sifat kebinatangan di dalam diri, mengubahnya menjadi rasa syukur mendalam dan kepedulian sosial yang nyata bagi sesama.
                        </p>
                    </div>
                    <div className="flex-1 lg:border-l border-t lg:border-t-0 border-gold/30 pt-8 lg:pt-0 lg:pl-12 w-full flex flex-col items-center">
                        <div className="text-center text-4xl mb-6 text-gold/50"><BookOpen className="mx-auto" size={48} strokeWidth={1} /></div>
                        <div className="font-amiri text-4xl md:text-5xl leading-loose text-gold text-center mb-6">
                            إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ
                        </div>
                        <p className="text-sm italic text-center text-gold-light mb-4 px-4 leading-relaxed">
                            "Innaa a'thaynaakal kautsar. Fashalli lirabbika wanhar. Inna syaani'aka huwal abtar."
                        </p>
                        <p className="text-sm text-center text-cream/70 px-4 leading-relaxed">
                            "Sesungguhnya Kami telah memberikan kepadamu nikmat yang banyak. Maka dirikanlah shalat karena Tuhanmu; dan berkorbanlah. Sesungguhnya orang-orang yang membenci kamu dialah yang terputus." <br/><span className="text-gold font-bold mt-2 block">(QS. Al-Kautsar: 1-3)</span>
                        </p>
                    </div>
                </GlassCard>
            </Reveal>
        </section>
    );
}

function SectionKisah() {
    return (
        <section id="kisah">
            <Reveal>
                <SectionHeading arabic="قِصَّةُ إِبْرَاهِيمَ وَإِسْمَاعِيلَ">Kisah Pengorbanan</SectionHeading>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <GlassCard className="lg:col-span-7 flex flex-col justify-center border-l-4 border-l-gold !p-8 md:!p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Quote size={100} />
                        </div>
                        <div className="space-y-6 relative z-10 font-serif">
                            <p className="text-lg leading-relaxed text-cream/90 text-justify">
                                Di sebuah padang tandus, ujian terberat bagi seorang ayah diwahyukan. Melalui mimpinya yang benar, Nabi Ibrahim AS diperintahkan oleh Allah SWT untuk menyembelih putra kesayangannya, Nabi Ismail AS yang telah lama dinantinya.
                            </p>
                            <p className="text-lg leading-relaxed text-cream/90 text-justify">
                                Tanpa keraguan, beliau menyampaikan wahyu tersebut kepada Ismail. Dengan penuh ketundukan seorang anak saleh menjawab, "Wahai ayahku, kerjakanlah apa yang diperintahkan kepadamu; insya Allah kamu akan mendapatiku termasuk orang-orang yang sabar." (QS. Ash-Shaffat: 102).
                            </p>
                            <p className="text-lg leading-relaxed text-cream/90 text-justify">
                                Saat pedang telah bersiap dan ketaatan telah dibuktikan ke puncaknya, Allah menggantikan Ismail dengan seekor domba sembelihan yang besar. Sebuah monumen abadi atas pengorbanan, kepatuhan, dan cinta tulus di atas segala cinta duniawi.
                            </p>
                        </div>
                    </GlassCard>
                    <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
                        {['Ketaatan Tanpa Syarat Batas', 'Pengorbanan Harta Tertinggi', 'Kasih Sayang Allah'].map((hikmah, i) => (
                            <GlassCard key={i} className="flex items-center gap-6 !p-6 transform transition-transform duration-300 hover:scale-[1.03] hover:bg-gold/10 group cursor-default">
                                <div className="text-5xl text-gold font-cinzel opacity-40 group-hover:opacity-80 transition-opacity">0{i+1}</div>
                                <div className="text-xl font-cinzel font-bold tracking-wider text-cream-dark group-hover:text-gold transition-colors">{hikmah}</div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

function SectionTakbir() {
    return (
        <section>
            <Reveal>
                <GlassCard className="text-center !p-10 md:!p-16 islamic-arch relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                    
                    <h3 className="font-cinzel text-sm md:text-lg text-gold uppercase tracking-[0.4em] mb-12 font-bold border-b border-gold/10 inline-block pb-2">Gema Takbiran</h3>
                    <div className="font-amiri text-5xl md:text-6xl lg:text-7xl leading-[1.6] md:leading-[1.8] text-gold mb-10 drop-shadow-[0_0_15px_rgba(201,168,76,0.3)] select-all">
                        اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ<br/>
                        لَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ<br/>
                        اَللّٰهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ
                    </div>
                    <p className="text-lg md:text-xl text-gold-light italic mb-8 max-w-4xl mx-auto px-4 font-serif">
                        "Allahu Akbar Allahu Akbar Allahu Akbar, Laa idaaha illallahu wallahu akbar, Allahu Akbar walillahil hamd"
                    </p>
                    <p className="text-cream/80 max-w-3xl mx-auto mb-12 text-sm md:text-base leading-relaxed px-4 font-serif">
                        “Allah Maha Besar, Allah Maha Besar, Allah Maha Besar. Tiada Tuhan selain Allah dan Allah Maha Besar. Allah Maha Besar dan segala puji bagi Allah.”
                    </p>
                    <div className="max-w-sm mx-auto">
                        <CopyBtn text="اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ لَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ" label="Salin Teks Takbir" />
                    </div>
                </GlassCard>
            </Reveal>
        </section>
    );
}

function SectionDoa() {
    const doas = [
        {
            title: "Doa Menjelang Kurban",
            arab: "بِسْمِ اللهِ وَاللهُ أَكْبَرُ، اَللَّهُمَّ مِنْكَ وَلَكَ، فَتَقَبَّلْ مِنِّي",
            latin: "Bismillahi wallahu akbar, Allahumma minka wa laka, fataqabbal minni.",
            arti: "Dengan nama Allah dan Allah Maha Besar, Ya Allah, kurban ini dari-Mu dan untuk-Mu, maka terimalah dariku."
        },
        {
            title: "Doa Memohon Penerimaan (Hari Raya)",
            arab: "تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ",
            latin: "Taqabbalallahu minna wa minkum.",
            arti: "Semoga Allah menerima (amal ibadah) kami dan kalian."
        },
        {
            title: "Doa Sapu Jagad (Tasyrik)",
            arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
            latin: "Rabbanaa aatinaa fiddunyaa hasanah wa fil aakhirati hasanah wa qinaa 'adzaaban naar.",
            arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka."
        }
    ];

    return (
        <section id="doa">
            <Reveal>
                <SectionHeading subtitle="Memohon keberkahan dan keridhaan Allah SWT di hari yang suci.">Doa-Doa Idul Adha</SectionHeading>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {doas.map((doa, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <GlassCard className="flex flex-col h-full !p-8 border-t-4 border-t-gold hover:border-gold-light transition-all relative group">
                                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Sparkles size={24} className="text-gold" />
                                </div>
                                <h3 className="font-cinzel text-lg font-bold text-gold mb-6 border-b border-gold/20 pb-4">{doa.title}</h3>
                                <div className="flex-grow flex flex-col text-center">
                                    <p className="font-amiri text-2xl md:text-3xl text-gold-light mb-6 leading-loose">{doa.arab}</p>
                                    <p className="text-sm italic text-cream-dark mb-4">{doa.latin}</p>
                                    <p className="text-sm text-cream/70 mb-8 flex-grow">"{doa.arti}"</p>
                                </div>
                                <CopyBtn text={doa.arab} label="Salin Doa" />
                            </GlassCard>
                        </Reveal>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function SectionAmalan() {
    const amalans = [
        { icon: "🌙", title: "Puasa Tarwiyah", target: "8 Dzulhijjah", desc: "Berpuasa pada hari raya Tarwiyah untuk mendekatkan diri kepada Allah." },
        { icon: "☀️", title: "Puasa Arafah", target: "9 Dzulhijjah", desc: "Puasa yang dipercaya menghapuskan dosa tahun lalu dan tahun yang akan datang." },
        { icon: "🕌", title: "Sholat Idul Adha", target: "10 Dzulhijjah", desc: "Menunaikan sholat sunnah muakkad secara berjamaah di lapangan atau masjid." },
        { icon: "🐑", title: "Ibadah Kurban", target: "10-13 Dzulhijjah", desc: "Menyembelih hewan ternak sebagai bentuk rasa syukur dan ketaatan." },
        { icon: "📿", title: "Dzikir & Takbir", target: "Sepanjang Hari", desc: "Memperbanyak lantunan takbir, tahlil, dan tahmid, terutama setelah sholat fardhu." },
        { icon: "🤝", title: "Berbagi Daging", target: "Hari Tasyrik", desc: "Mendistribusikan daging kurban kepada kerabat, tetangga, dan fakir miskin." }
    ];

    return (
        <section>
            <Reveal>
                <SectionHeading>Amalan 10 Hari Dzulhijjah</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amalans.map((amalan, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <GlassCard className="!p-6 flex flex-col group hover:bg-gold/5 transition-colors border-l-4 border-l-transparent hover:border-l-gold">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                        {amalan.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-cinzel text-lg font-bold text-cream group-hover:text-gold transition-colors">{amalan.title}</h3>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark px-2 py-1 bg-gold/10 rounded-full mt-1 inline-block">{amalan.target}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-cream/80 text-justify">{amalan.desc}</p>
                            </GlassCard>
                        </Reveal>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function SectionFakta() {
    const faktas = [
        { q: "Haram Berpuasa", a: "Di Hari Raya Idul Adha (10 Dzulhijjah) dan Hari Tasyrik (11, 12, 13 Dzulhijjah) umat Islam diharamkan untuk berpuasa." },
        { q: "Asal Usul Kurban", a: "Berawal dari mimpi yang benar (wahyu) Nabi Ibrahim AS yang diperintahkan untuk menyembelih putra kesayangannya, Ismail AS." },
        { q: "Bulan Haram", a: "Dzulhijjah adalah satu dari empat Asyhurul Hurum (Bulan Suci) dimana pahala amal saleh dilipatgandakan." },
        { q: "Sunnah Makan", a: "Berbeda dengan Idul Fitri, sunnah pada Idul Adha adalah menahan diri dari makan hingga selesai menunaikan sholat Idul Adha." }
    ];

    return (
        <section>
            <Reveal>
                <SectionHeading subtitle="Hal-hal istimewa yang perlu kamu ketahui tentang Idul Adha.">Tahukah Kamu?</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {faktas.map((f, i) => (
                        <Reveal key={i} delay={i * 0.15}>
                            <div className="group perspective-1000 h-48 cursor-default">
                                <div className="flip-inner relative w-full h-full">
                                    {/* Front */}
                                    <GlassCard className="flip-front absolute w-full h-full flex flex-col justify-center items-center text-center bg-black/40 border-gold/50">
                                        <Info size={32} className="text-gold mb-3 opacity-50" />
                                        <h3 className="font-cinzel text-xl font-bold text-cream tracking-wide">{f.q}</h3>
                                        <p className="text-xs uppercase text-gold/70 mt-2 tracking-widest font-sans">Arahkan untuk membaca</p>
                                    </GlassCard>
                                    {/* Back */}
                                    <GlassCard className="flip-back absolute w-full h-full flex flex-col justify-center items-center text-center bg-green-dark/95 border-gold shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                                        <p className="text-sm md:text-base text-cream-dark leading-relaxed font-serif px-4">
                                            {f.a}
                                        </p>
                                    </GlassCard>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function SectionUcapan() {
    const ucapans = [
        { type: "Formal", text: "Selamat Hari Raya Idul Adha 1447 H. Taqabbalallahu minna wa minkum. Semoga keikhlasan kurban kita membukakan pintu ridha Allah SWT." },
        { type: "Keluarga", text: "Selamat Idul Adha untuk keluarga tersayang! Semoga semangat berkurban menyertai setiap langkah kita dalam berbagi kasih dan kebahagiaan." },
        { type: "Santai", text: "Happy Idul Adha 1447 H! Minal Aidin wal Faizin ya. Semoga sate kurbannya enak dan amalnya diterima Allah SWT, aamiin!" }
    ];

    return (
        <section id="ucapan">
            <Reveal>
                <SectionHeading subtitle="Bagikan kebahagiaan Idul Adha kepada sanak saudara dan teman tercinta.">Kirim Ucapan</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ucapans.map((u, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <GlassCard className="flex flex-col h-full !p-6 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                    <Share2 size={64} />
                                </div>
                                <h3 className="font-cinzel text-xs font-bold text-gold tracking-widest uppercase mb-4 border-l-2 border-gold pl-3">{u.type}</h3>
                                <p className="text-sm md:text-base text-cream/90 italic leading-relaxed mb-8 flex-grow font-serif">"{u.text}"</p>
                                <CopyBtn text={u.text} label="Salin Teks" />
                            </GlassCard>
                        </Reveal>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function SectionAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <section>
            <Reveal>
                <div className="flex justify-center">
                    <GlassCard className="flex flex-col md:flex-row items-center gap-6 !p-6 md:!px-12 md:!py-6 border-gold cursor-pointer hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all bg-black/60" onClick={togglePlay}>
                        <audio ref={audioRef} loop src="https://c.termai.cc/a160/d2iDsBg.mp3" />
                        
                        <div className={`w-14 h-14 rounded-full border-2 ${isPlaying ? 'border-gold bg-gold/10' : 'border-gold/50'} flex items-center justify-center text-gold transition-colors`}>
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </div>
                        
                        <div className="text-center md:text-left flex-grow">
                            <div className="text-xs text-gold uppercase tracking-[0.3em] font-bold mb-1">🎵 Audio Player</div>
                            <div className="text-lg font-cinzel font-bold text-cream flex items-center justify-center md:justify-start gap-3">
                                Lantunan Menyambut Idul Adha
                                {isPlaying && (
                                    <div className="flex items-end gap-[2px] h-4">
                                        {[1, 3, 2, 4, 2].map((delay, i) => (
                                            <motion.div 
                                                key={i} 
                                                className="w-1 bg-gold rounded-t-sm"
                                                animate={{ height: ["20%", "100%", "20%"] }}
                                                transition={{ duration: 0.8, repeat: Infinity, delay: delay * 0.15 }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </Reveal>
        </section>
    );
}

function SectionKeutamaan() {
    const keutamaans = [
        { title: "Al-Quran Surah Al-Kautsar", arab: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ فَصَلِّ لِرَبِّكَ وَانْحَرْ", latin: "\"Innaa a'thaynakal kautsar, fashalli lirabbika wanhar\"", arti: "\"Sesungguhnya Kami telah memberimu nikmat yang banyak, maka sholatlah karena Tuhanmu dan berkurbanlah\"", sumber: "— QS. Al-Kautsar: 1-2", icon: "📖" },
        { title: "Keutamaan 10 Hari Dzulhijjah", arab: "", latin: "", arti: "\"Tidak ada hari-hari yang amal sholeh lebih dicintai Allah daripada 10 hari pertama Dzulhijjah\"", sumber: "— HR. Bukhari No. 969", icon: "📿" },
        { title: "Keutamaan Berkurban", arab: "", latin: "", arti: "\"Tidak ada amalan manusia yang lebih dicintai Allah pada hari Nahr (Idul Adha) selain mengalirkan darah hewan kurban\"", sumber: "— HR. Tirmidzi No. 1493", icon: "🐑" },
        { title: "Keutamaan Hari Arafah (9 Dzulhijjah)", arab: "", latin: "", arti: "\"Puasa pada hari Arafah menghapus dosa setahun yang lalu dan setahun yang akan datang\"", sumber: "— HR. Muslim No. 1162", icon: "🕌" }
    ];

    return (
        <section className="w-full relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
            <Reveal>
                <SectionHeading subtitle="Dalil & Keutamaan dari Al-Quran dan Hadits Shahih">Keutamaan Idul Adha</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {keutamaans.map((k, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <GlassCard className="h-full flex flex-col group border-l-[3px] border-l-gold hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-4xl opacity-10 font-sans">{k.icon}</div>
                                <h3 className="font-cinzel text-lg font-bold text-cream tracking-wide mb-4 relative z-10 flex items-center gap-2">
                                    <span className="font-sans">{k.icon}</span> {k.title}
                                </h3>
                                
                                <div className="flex-grow flex flex-col justify-center">
                                    {k.arab && <p className="font-amiri text-2xl md:text-3xl text-gold mb-3 text-right leading-loose">{k.arab}</p>}
                                    {k.latin && <p className="text-sm italic text-cream-dark mb-4 text-center font-serif">{k.latin}</p>}
                                    <p className="text-base text-cream/90 leading-relaxed font-serif text-justify">{k.arti}</p>
                                </div>
                                <div className="mt-6 text-right">
                                    <p className="text-sm text-gold-light italic tracking-wide">{k.sumber}</p>
                                </div>
                            </GlassCard>
                        </Reveal>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function SectionPesan() {
    return (
        <section>
            <Reveal>
                <div className="relative p-1 max-w-4xl mx-auto bg-gradient-to-b from-gold via-gold-dark to-black rounded-3xl">
                    <div className="bg-[#0f2115] rounded-[22px] p-8 md:p-16 text-center shadow-2xl bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjY2ZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]">
                        <Quote size={48} className="mx-auto text-gold mb-8 opacity-50" />
                        <h2 className="font-cinzel text-2xl md:text-3xl text-gold font-bold mb-8 uppercase tracking-widest">Pesan & Harapan</h2>
                        <div className="font-playfair text-lg md:text-xl leading-loose text-cream-dark italic mb-10 text-balance">
                            "Menyembelih hewan kurban adalah bentuk ketundukan syariat, namun menyembelih amarah, dengki, dan hawa nafsu adalah esensi hakikat. Semoga di hari raya yang agung ini, Allah menyucikan hati kita, melapangkan rezeki kita, dan menumbuhkan rasa peduli terhadap sesama."
                        </div>
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8" />
                        <p className="text-sm text-center text-cream/70 font-sans max-w-2xl mx-auto">
                            "Maka shalatlah untuk Tuhanmu dan sembelihlah kurban." — Al Kautsar: 2.<br/>Tidak ada amalan anak Adam di hari raya Kurban yang lebih dicintai Allah dibanding mengalirkan darah (berkurban).
                        </p>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

function SectionCreator() {
    return (
        <section className="pt-10">
            <Reveal>
                <div className="text-center font-cinzel text-gold text-sm tracking-[0.4em] mb-8">
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    <br/><br/>
                    ✦  DIBUAT DENGAN <Heart size={14} className="inline-block text-red-500 fill-red-500 -mt-1 mx-1 animate-pulse" />  ✦
                    <br/><br/>
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                </div>
                
                <GlassCard className="max-w-2xl mx-auto text-center relative overflow-hidden border-2 border-gold/60 !p-12 shadow-[0_0_40px_rgba(201,168,76,0.15)]">
                    <div className="absolute top-4 left-4 text-gold/30"><Star size={24} /></div>
                    <div className="absolute top-4 right-4 text-gold/30"><Moon size={24} /></div>
                    <div className="absolute bottom-4 left-4 text-gold/30"><Moon size={24} /></div>
                    <div className="absolute bottom-4 right-4 text-gold/30"><Star size={24} /></div>
                    
                    <div className="text-xs uppercase text-gold tracking-[0.3em] font-bold mb-6">── Kreator Website ──</div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold font-bold drop-shadow-[0_0_15px_rgba(201,168,76,0.8)] mb-2 mt-4 tracking-wider">
                            Sanz Snixy
                        </h2>
                        <h3 className="font-playfair text-xl md:text-2xl text-cream italic mb-8">
                            ( Karman Sudarjat )
                        </h3>
                    </motion.div>
                    
                    <div className="w-16 h-[2px] bg-gold mx-auto mb-8 rounded-full"></div>

                    <p className="text-sm md:text-base text-cream-dark italic mb-10 max-w-lg mx-auto font-serif">
                        "Website ini dibuat dengan penuh cinta dan rasa syukur untuk menyambut Hari Raya Idul Adha 1447 H"
                    </p>

                    <div className="font-amiri text-3xl md:text-4xl text-gold mb-3 leading-relaxed drop-shadow-md">
                        تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ
                    </div>
                    <div className="font-cinzel text-xs md:text-sm text-gold-light tracking-widest uppercase font-bold">
                        Taqabbalallahu Minna wa Minkum
                    </div>

                    <div className="mt-12 inline-block px-6 py-2 border border-gold/30 rounded-full bg-black/40 text-[10px] md:text-xs text-gold uppercase tracking-widest font-sans font-bold">
                        🌙 © 1447 H / 2026 M — Sanz Snixy
                    </div>
                </GlassCard>
            </Reveal>
        </section>
    );
}

function Footer() {
    return (
        <footer className="w-full bg-[#030905] border-t border-gold/30 py-12 text-center relative z-10 flex-none">
            <div className="font-amiri text-3xl text-gold mb-6 drop-shadow-md">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
            <div className="flex justify-center items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gold/50"></div>
                <div className="w-3 h-3 bg-gold rotate-45"></div>
                <div className="w-12 h-[1px] bg-gold/50"></div>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-[0.4em] font-sans">
                Minal Aidin Wal Faizin • 1447 Hijriah<br className="md:hidden" /> • Dibuat Oleh Sanz Snixy
            </p>
        </footer>
    );
}
