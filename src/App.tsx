import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Play, Pause, CheckCircle2 } from 'lucide-react';

export default function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen font-playfair selection:bg-gold/30">
            <CustomCursor />
            <AnimatePresence>
                {showSplash && <SplashScreen />}
            </AnimatePresence>
            {!showSplash && <MainContent />}
        </div>
    );
}

function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);
    return (
        <div 
            ref={cursorRef} 
            className="fixed w-3 h-3 bg-gold rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#c9a84c] transition-transform duration-75 -translate-x-1/2 -translate-y-1/2"
        />
    );
}

function SplashScreen() {
    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 bg-black z-[10000] flex justify-center items-center pointer-events-none"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 2.5 }}
                className="font-amiri text-6xl md:text-8xl lg:text-9xl text-gold drop-shadow-[0_0_30px_rgba(201,168,76,0.6)]"
            >
                بِسْمِ اللهِ
            </motion.div>
        </motion.div>
    );
}

function BackgroundLayers() {
    return (
        <>
            <div className="fixed inset-0 -z-30 bg-[#0a1628]" />
            <div className="layer-girih fixed inset-0 opacity-10 pointer-events-none -z-20" />
            <div className="fixed inset-0 bg-gradient-to-b from-[#1a3a2a]/40 to-[#0a1628] pointer-events-none -z-10" />
            <StarParticles />
        </>
    );
}

function StarParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: any[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = Array.from({ length: 80 }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random()
            }));
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let s of stars) {
                s.y -= s.speed;
                if (s.y < 0) s.y = canvas.height + Math.random() * 50;
                ctx.fillStyle = `rgba(241, 213, 146, ${s.opacity})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 -z-[15] pointer-events-none" />;
}

function Lanterns() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
            <div className="lantern-swing-left absolute w-[60px] h-[100px] top-10 left-8">
                <svg width="60" height="100" viewBox="0 0 60 100" className="fill-gold">
                    <path d="M30 0 L50 20 L50 80 L30 100 L10 80 L10 20 Z" opacity="0.8" />
                    <circle cx="30" cy="50" r="10" fill="#f1d592" />
                    <rect x="29" y="-20" width="2" height="20" />
                </svg>
            </div>
            <div className="lantern-swing-right absolute w-[60px] h-[100px] top-10 right-8">
                <svg width="60" height="100" viewBox="0 0 60 100" className="fill-gold">
                    <path d="M30 0 L50 20 L50 80 L30 100 L10 80 L10 20 Z" opacity="0.8" />
                    <circle cx="30" cy="50" r="10" fill="#f1d592" />
                    <rect x="29" y="-20" width="2" height="20" />
                </svg>
            </div>
        </div>
    );
}

function MainContent() {
    return (
        <div className="relative min-h-screen flex flex-col text-[#f5f0e8]">
            <BackgroundLayers />
            <Lanterns />
            
            <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-4 md:px-10 pt-10 pb-20 relative z-10">
                 <HeroSection />
                 
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-10">
                     <div className="lg:col-span-3 flex flex-col gap-6">
                         <HikmahSection />
                         <TakbirSection />
                     </div>

                     <div className="lg:col-span-6 flex flex-col justify-start items-center">
                         <CountdownSection />
                         <AudioPlayer />
                     </div>

                     <div className="lg:col-span-3 flex flex-col gap-6">
                         <AmalanSection />
                         <UcapanSection />
                     </div>
                 </div>
            </main>
            
            <footer className="py-6 border-t border-gold/20 text-center flex-none">
                <div className="font-amiri text-xl text-gold mb-1">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em]">Minal Aidin Wal Faizin • 1447 Hijriah • Google AI Studio Production</p>
            </footer>
        </div>
    );
}

function HikmahSection() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-gold/30 rounded-2xl p-5"
        >
            <h3 className="text-gold uppercase text-xs tracking-widest mb-3 border-b border-gold/20 pb-2 text-left">Hikmah Qurban</h3>
            <p className="text-sm leading-relaxed text-gray-300 text-left">
                Ketulusan Nabi Ibrahim AS dan ketaatan Nabi Ismail AS mengajarkan kita bahwa pengorbanan sejati adalah tentang keikhlasan hati dalam mencintai Sang Pencipta di atas segalanya.
            </p>
        </motion.div>
    );
}

function TakbirSection() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a3a2a]/40 border border-gold rounded-2xl p-5 relative overflow-hidden flex flex-col"
        >
            <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 3z"/></svg>
            </div>
            <h3 className="text-gold uppercase text-xs tracking-widest mb-3 border-b border-gold/20 pb-2 text-left">Lafadz Takbir</h3>
            <p className="text-lg font-amiri mb-3 text-right text-gold leading-relaxed">
                اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ<br/>
                لَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ<br/>
                اَللّٰهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ
            </p>
            <CopyButton text="اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ لَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ اَللّٰهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ" label="Salin Takbir" />
        </motion.div>
    );
}

function AmalanSection() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-gold/30 rounded-2xl p-5"
        >
            <h3 className="text-gold uppercase text-xs tracking-widest mb-3 border-b border-gold/20 pb-2 text-left">Amalan Utama</h3>
            <div className="flex flex-col gap-3">
                <AmalanCard num="1" desc="Puasa Tarwiyah (8 Dzulhijjah)" />
                <AmalanCard num="2" desc="Puasa Arafah (9 Dzulhijjah)" />
                <AmalanCard num="3" desc="Sholat Idul Adha Berjamaah" />
                <AmalanCard num="4" desc="Menyembelih Hewan Kurban" />
                <AmalanCard num="5" desc="Memperbanyak Takbir" />
            </div>
        </motion.div>
    );
}

function UcapanSection() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
        >
            <UcapanCard title="Formal" text="Selamat Hari Raya Idul Adha 1447 H. Taqabbalallahu minna wa minkum." />
            <UcapanCard title="Keluarga" text="Selamat Idul Adha untuk keluarga tercinta. Semoga keberkahan menyertai kita semua." />
            <UcapanCard title="Teman" text="Happy Idul Adha! Minal Aidin wal Faizin, bro! Semoga berkah kurbannya!" />
        </motion.div>
    );
}

function HeroSection() {
    const [takbirIndex, setTakbirIndex] = useState(0);
    const takbirs = ["Allahu Akbar", "Labbaik Allahumma Labbaik", "Subhanallah"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTakbirIndex((prev) => (prev + 1) % takbirs.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="flex-none pt-10 text-center relative z-10 w-full mb-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-amiri text-6xl md:text-7xl mb-2 text-gold drop-shadow-[0_0_20px_rgba(201,168,76,0.4)]"
            >
                عِيدُ الأَضْحَى مُبَارَك
            </motion.div>
            
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold tracking-widest uppercase text-white my-2">
                Idul Adha 1447 H
            </h1>

            <p className="text-lg md:text-xl italic text-gold mt-2">28 Mei 2026 • 10 Dzulhijjah 1447 H</p>
            
            <div className="flex justify-center items-center gap-4 mt-6">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold"></div>
                <span className="text-gold text-2xl">❃</span>
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold"></div>
            </div>

            <div className="h-6 mt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={takbirIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-sm md:text-base text-gold/70 uppercase tracking-widest"
                    >
                        {takbirs[takbirIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </header>
    );
}

function CountdownSection() {
    const targetDate = new Date("May 28, 2026 00:00:00").getTime();
    const startDate = new Date("May 18, 2026 00:00:00").getTime();
    
    const [timeLeft, setTimeLeft] = useState<{d:number, h:number, m:number, s:number, percent:number} | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance < 0) return null;
            return {
                d: Math.floor(distance / (1000 * 60 * 60 * 24)),
                h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                s: Math.floor((distance % (1000 * 60)) / 1000),
                percent: Math.min(Math.max(((now - startDate) / (targetDate - startDate)) * 100, 0), 100)
            };
        };
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center p-8 text-center"
            >
                <h1 className="font-cinzel text-gold text-3xl md:text-4xl mb-2">🌙 Alhamdulillah</h1>
                <p className="text-lg text-white-silver">Hari Raya Idul Adha 1447 H Telah Tiba!</p>
                <div className="font-amiri text-3xl mt-4 text-gold drop-shadow-lg">تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ</div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center w-full"
        >
            <div className="text-gold text-sm uppercase tracking-[0.3em] mb-6 text-center">Menghitung Hari Menuju Hari Raya</div>
            
            <div className="flex justify-center gap-4 mb-8">
                <FlipCard label="Hari" value={timeLeft.d} />
                <FlipCard label="Jam" value={timeLeft.h} />
                <FlipCard label="Menit" value={timeLeft.m} />
                <FlipCard label="Detik" value={timeLeft.s} />
            </div>

            <div className="w-full max-w-md mb-8">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gold mb-2">
                    <span>Persiapan Qurban</span>
                    <span>{Math.round(timeLeft.percent)}% Selesai</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-1000 ease-linear rounded-full"
                        style={{ width: `${timeLeft.percent}%` }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function FlipCard({ label, value }: { label: string, value: number }) {
    const [isFlipping, setIsFlipping] = useState(false);
    const prevValueRef = useRef(value);

    // Track when value changes effectively.
    if (prevValueRef.current !== value) {
        setIsFlipping(true);
        prevValueRef.current = value;
    }

    useEffect(() => {
        if (isFlipping) {
            const tm = setTimeout(() => setIsFlipping(false), 200);
            return () => clearTimeout(tm);
        }
    }, [isFlipping]);

    const formattedValue = value.toString().padStart(2, '0');

    return (
        <div className="bg-[#0a1628] border-2 border-gold rounded-xl w-[4.5rem] md:w-24 py-4 flex flex-col justify-center items-center shadow-[0_0_30px_rgba(201,168,76,0.15)] overflow-hidden">
            <span 
                className="text-3xl md:text-4xl font-bold text-white transition-transform duration-500 font-sans"
                style={{ transform: isFlipping ? 'rotateX(90deg)' : 'rotateX(0deg)' }}
            >
                {formattedValue}
            </span>
            <span className="text-[10px] uppercase text-gold tracking-widest mt-1">
                {label}
            </span>
        </div>
    );
}

function AudioPlayer() {
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
        <div className="mt-8 flex gap-4 items-center cursor-pointer hover:scale-105 transition-transform duration-300" onClick={togglePlay}>
            <audio ref={audioRef} loop src="https://c.termai.cc/a160/d2iDsBg.mp3" />
            
            <div className="p-4 rounded-full border border-gold flex items-center justify-center w-12 h-12">
                {isPlaying ? (
                    <div className="w-3 h-3 bg-gold" />
                ) : (
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gold border-b-[8px] border-b-transparent ml-1" />
                )}
            </div>
            
            <div className="text-left">
                <div className="text-xs text-gold uppercase tracking-widest">Audio Latar</div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                    Lantunan Takbir Murottal
                    {isPlaying && (
                        <div className="flex items-end gap-1 h-3 ml-2">
                            {[1, 3, 2, 4].map((delay, i) => (
                                <div 
                                    key={i} 
                                    className="v-bar w-[2px] bg-gold"
                                    style={{ animationDelay: `${delay * 0.1}s` }} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CopyButton({ text, label = "Copy" }: { text: string, label?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className="w-full py-2 border border-gold text-gold text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-gold hover:text-black transition-all flex items-center justify-center gap-2"
        >
            {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            {copied ? "Tersalin!" : label}
        </button>
    );
}

function AmalanCard({ num, desc }: { num: string, desc: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full border border-gold flex items-center justify-center text-[10px] text-gold shrink-0">{num}</span>
            <span className="text-xs text-gray-300">{desc}</span>
        </div>
    );
}

function UcapanCard({ title, text }: { title: string, text: string }) {
    return (
        <div className="bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 rounded-2xl p-4 text-left flex flex-col gap-2">
            <h4 className="text-gold uppercase text-[10px] tracking-widest font-bold">{title}</h4>
            <p className="text-xs italic text-white/80 leading-snug">"{text}"</p>
            <div className="mt-2">
                <CopyButton text={text} label="Salin Ucapan" />
            </div>
        </div>
    );
}
