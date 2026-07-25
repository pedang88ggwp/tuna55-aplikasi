import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  HelpCircle, 
  Share2, 
  MessageCircle, 
  PhoneCall, 
  AlertTriangle,
  Gift,
  Trophy,
  Sparkles,
  ExternalLink,
  ArrowRight,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function App() {
  const [deviceInfo, setDeviceInfo] = useState<{
    isAndroid: boolean;
    isIOS: boolean;
    isMobile: boolean;
    osName: string;
    browserName: string;
  }>({
    isAndroid: false,
    isIOS: false,
    isMobile: false,
    osName: 'Desktop / Multi-device',
    browserName: 'Browser',
  });

  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [activeProgress, setActiveProgress] = useState(35);
  const [visitorId, setVisitorId] = useState('FP-' + Math.random().toString(36).substring(2, 9).toUpperCase());
  const [activeTab, setActiveTab] = useState<'games' | 'features' | 'faq'>('games');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Smooth progress calculation on scroll and user page interactions
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolledPercent = (window.scrollY / totalHeight) * 65;
        setActiveProgress(Math.min(100, Math.round(35 + scrolledPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect user agent on mount
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isMobile = isAndroid || isIOS || /mobile/i.test(ua);

    let osName = 'Windows / Desktop';
    if (isAndroid) osName = 'Android System';
    else if (isIOS) osName = 'iOS System (Apple)';
    else if (/mac/i.test(ua)) osName = 'macOS';

    let browserName = 'Chrome/Safari';
    if (/chrome/i.test(ua)) browserName = 'Google Chrome';
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browserName = 'Safari';
    else if (/firefox/i.test(ua)) browserName = 'Firefox';

    setDeviceInfo({
      isAndroid,
      isIOS,
      isMobile,
      osName,
      browserName,
    });
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          
          // Trigger file download
          const link = document.createElement('a');
          if (deviceInfo.isIOS) {
            // For iOS demo, provide config or notification
            alert('Aplikasi iOS dapat dipasang melalui Profil Pengembang / PWA. Mengunduh berkas iOS Config...');
            link.href = 'https://dk4jo88env94i.cloudfront.net/tuna55-32bit.apk';
            link.setAttribute('download', 'Tuna55.mobileconfig');
          } else {
            // Standard APK for Android / General
            link.href = 'https://dk4jo88env94i.cloudfront.net/tuna55-32bit.apk';
            link.setAttribute('download', 'Tuna55_Official_v2.4.apk');
            link.target = '_blank';
          }
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setToastMessage('🎉 Unduhan dimulai! Silakan periksa folder Download Anda.');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 5000);

          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleDownloadZip = () => {
    const link = document.createElement('a');
    link.href = 'https://dk4jo88env94i.cloudfront.net/tuna55-32bit.apk';
    link.setAttribute('download', 'Tuna55_Aset_Resmi.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('📦 Unduhan Berkas ZIP Aset Tuna55 telah dimulai!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const gamesList = [
    { name: 'SWEET BONANZA 1000 DICE', tag: 'Slot Hot', image: 'https://dkzd8du6wd13r.cloudfront.net/Images/providers/PP/vs20swdicex.jpg?v=607151302' },
    { name: 'POKER', tag: 'Live Table', image: 'https://dkzd8du6wd13r.cloudfront.net/Images/v-normad-alpha/menu/desktop/home-menu-5/game-code-32.webp?v=607201652' },
    { name: 'NEXUS KOI GATE', tag: 'Gacor 98%', image: 'https://dkzd8du6wd13r.cloudfront.net/Images/providers/HABANERO/SGNexusKoiGate.jpg?v=606021804' },
    { name: 'SWEET RUSH BONANZA', tag: 'Populer', image: 'https://dkzd8du6wd13r.cloudfront.net/Images/providers/PP/vs20swrbon.jpg?v=607151302' },
    { name: 'W BET', tag: 'Sportsbook', image: 'https://dkzd8du6wd13r.cloudfront.net/Images/v-normad-alpha/menu/desktop/home-menu-1/game-code-69.webp?v=607201652' },
    { name: 'SV', tag: 'Sabung Ayam', image: 'https://dkzd8du6wd13r.cloudfront.net/Images/v-normad-alpha/menu/desktop/home-menu-9/game-code-57.webp?v=607201652' },
    { name: 'SPACEMAN', tag: 'Crash Game', image: 'https://dkzd8du6wd13r.cloudfront.net/Images/providers/PPLIVECASINO/PPLiveCasino_1301.jpg?v=606021804' },
    { name: 'BALAKPLAY', tag: 'Domino Cards', image: 'https://dkzd8du6wd13r.cloudfront.net/Images/v-normad-alpha/menu/desktop/home-menu-5/game-code-24.webp?v=607201652' },
  ];

  return (
    <div className="min-h-screen bg-[#07070c] text-white font-sans pb-24 selection:bg-red-600 selection:text-white">
      {/* Top Visual Progress Bar (Filling up smoothly on scroll, interaction & download) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 h-2 shadow-[0_0_15px_rgba(37,99,235,0.8)] overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-red-600 via-purple-500 to-blue-500 transition-all duration-300 relative"
          style={{ width: `${downloading ? downloadProgress : activeProgress}%` }}
        >
          <div className="absolute top-0 right-0 h-full w-6 bg-white/80 blur-sm animate-pulse"></div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-[0_0_25px_rgba(220,38,38,0.7)] flex items-center gap-2 transition-all duration-300 animate-bounce border-2 border-white">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Side Support Bar */}
      <div className="fixed right-3 top-1/3 z-40 flex flex-col gap-3">
        {/* Telegram Button */}
        <a 
          href="https://t.me/kesatryapedang" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-2xl bg-[#229ED9] hover:bg-[#1d8cb2] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all border-2 border-white group p-2 shadow-[0_0_15px_rgba(34,158,217,0.5)] relative"
          title="Telegram Support"
        >
          <svg className="w-6 h-6 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-2.01 1.28-5.69 3.77-.54.37-1.03.55-1.47.54-.48-.01-1.4-.27-2.09-.5-.84-.27-1.51-.42-1.45-.89.03-.25.38-.51 1.07-.78 4.2-1.83 7.01-3.04 8.42-3.63 4.01-1.67 4.84-1.96 5.39-1.97.12 0 .38.03.55.17.14.12.18.28.2.42-.01.07.01.23 0 .38z"/>
          </svg>
          <span className="absolute right-14 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-sky-400/30 pointer-events-none shadow-md">
            Telegram
          </span>
        </a>

        {/* WhatsApp Button */}
        <a 
          href="https://api.whatsapp.com/send?phone=885762480281&text=halo%20ka%20mika" 
          target="_blank" 
          rel="noreferrer"
          className="w-12 h-12 rounded-2xl bg-[#25D366] hover:bg-[#1ebf58] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all border-2 border-white group p-2 shadow-[0_0_15px_rgba(37,211,102,0.5)] relative"
          title="WhatsApp Support"
        >
          <svg className="w-6 h-6 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
            <path d="M12.011 2C6.48 2 2 6.48 2 12c0 1.95.56 3.77 1.53 5.32L2 22l4.83-1.48A9.957 9.957 0 0012.011 22C17.53 22 22 17.52 22 12S17.531 2 12.011 2zm5.79 14.36c-.24.68-1.2 1.25-1.95 1.41-.52.11-1.2.2-3.49-.75-2.93-1.21-4.81-4.2-4.96-4.4-.14-.2-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1.01-2.41.27-.29.59-.36.79-.36.2 0 .39.01.56.01.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.38.08.14.08.81-.16 1.49z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white animate-pulse"></span>
          <span className="absolute right-14 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-emerald-400/30 pointer-events-none shadow-md">
            WhatsApp
          </span>
        </a>

        {/* Facebook Button */}
        <a 
          href="https://www.facebook.com/groups/932263785054052" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-2xl bg-[#1877F2] hover:bg-[#1464cc] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all border-2 border-white group p-2 shadow-[0_0_15px_rgba(24,119,242,0.5)] relative"
          title="Facebook Community"
        >
          <svg className="w-6 h-6 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
          </svg>
          <span className="absolute right-14 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-blue-400/30 pointer-events-none shadow-md">
            Facebook
          </span>
        </a>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto bg-[#0a0a12] min-h-screen border-x border-red-900/30 shadow-[0_0_70px_rgba(220,38,38,0.15)] relative overflow-hidden">
        
        {/* Header Banner Section with Requested Image */}
        <div className="relative w-full bg-gradient-to-b from-black via-[#100b14] to-[#0a0a12]">
          {/* Top Logo Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/95 border-b border-red-900/40">
            <img 
              src="https://api2-t55.imgnxa.com/images/1kpqvj2b40s/logo_1fb63c9c-be87-435a-aa7d-7385afcb85bf_1766247144257.png" 
              alt="Tuna55 Logo" 
              className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
            <div className="flex items-center gap-1.5">
              <a 
                href="https://jagonyatuna.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-yellow-400 hover:to-amber-300 text-black font-black text-[11px] sm:text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md hover:scale-105 transition-all border border-yellow-200 flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>LOGIN</span>
              </a>
              <a 
                href="https://surl.li/ngrcms"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-black text-[11px] sm:text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md hover:scale-105 transition-all border border-white/40 flex items-center gap-1 animate-pulse"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>DAFTAR</span>
              </a>
            </div>
          </div>

          <div className="p-3 text-center bg-gradient-to-r from-red-700 via-blue-700 to-red-700 border-b border-white/20 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md">
            <Sparkles className="w-4 h-4 animate-spin text-white" />
            <span className="text-white drop-shadow-md font-black">EVENT UNTUK MEMBER LAMA NIKMATI KEMENANGAN ANDA</span>
            <Sparkles className="w-4 h-4 animate-spin text-white" />
          </div>

          {/* Requested Banner Header Image */}
          <div className="w-full relative group overflow-hidden border-b-2 border-red-600 shadow-2xl bg-black">
            <a href="https://freeimage.host/i/CeAebyb" target="_blank" rel="noreferrer" className="block">
              <img 
                src="https://iili.io/CeAebyb.md.jpg" 
                alt="Gambar Promosi" 
                loading="eager"
                decoding="async"
                className="w-full h-auto object-cover hover:scale-102 transition-transform duration-300"
              />
            </a>
            <div className="absolute top-3 right-3 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider animate-pulse shadow-md border border-white">
              LIVE PROFIT
            </div>
          </div>
        </div>

        {/* Device Detection Banner & VIP Download Action */}
        <div className="p-5 space-y-5">
          {/* Device Detection Box */}
          <div className="bg-[#121320]/95 border border-blue-500/40 rounded-2xl p-4 flex items-center justify-between gap-3 backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.15)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/30 to-blue-600/30 flex items-center justify-center text-white border border-blue-400/50">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white font-medium">Perangkat Terdeteksi:</p>
                <p className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>{deviceInfo.osName}</span>
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-gradient-to-r from-red-950 to-blue-950 border border-blue-400/50 text-white font-bold px-2.5 py-1 rounded-full font-mono shadow-sm">
                ID: {visitorId}
              </span>
            </div>
          </div>

          {/* Interactive Active Progress Bar Card */}
          <div className="bg-[#121320]/90 border border-blue-500/40 rounded-2xl p-3.5 space-y-2 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>{downloading ? 'Proses Pengunduhan APK...' : 'Status Jalur Unduh & Server:'}</span>
              </span>
              <span className="font-mono text-yellow-300 bg-black/60 px-2.5 py-0.5 rounded-full border border-yellow-500/40 text-[11px] font-black shadow-sm">
                {downloading ? `${downloadProgress}%` : `${activeProgress}% Teroptimasi`}
              </span>
            </div>
            
            <div className="w-full bg-black/70 rounded-full h-3.5 overflow-hidden p-0.5 border border-white/20 relative shadow-inner">
              <div 
                className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-500 h-full rounded-full transition-all duration-300 relative shadow-[0_0_12px_rgba(37,99,235,0.7)]"
                style={{ width: `${downloading ? downloadProgress : activeProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-300 font-semibold pt-0.5">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> SSL 256-Bit</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> CDN High Speed</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-400" /> Anti Lag & Fast</span>
            </div>
          </div>

          {/* Prominent Call-to-Action (CTA) Download Section */}
          <div className="bg-gradient-to-br from-[#1a0812] via-[#0d1022] to-[#070914] border-2 border-red-600/70 rounded-3xl p-6 shadow-[0_0_35px_rgba(220,38,38,0.25)] relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="text-center space-y-2 mb-5">
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600/40 to-blue-600/40 border border-white/40 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-yellow-300" /> VERSI APLIKASI RESMI v2.4 (OFFICIAL)
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                Unduh Aplikasi <span className="text-blue-400">Tuna55</span>
              </h2>
              <p className="text-xs sm:text-sm text-white font-semibold leading-relaxed">
                Akses 70+ Game Gacor, Penarikan Instan 24 Jam & Bonus 100 % New Member
              </p>
            </div>

            {/* Member Direct Access Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <a 
                href="https://jagonyatuna.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-yellow-400 hover:to-amber-300 text-black font-black text-xs sm:text-sm py-3 px-3 rounded-xl shadow-lg hover:scale-102 transition-all border border-yellow-200 flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                <LogIn className="w-4 h-4" />
                <span>MEMBER LOGIN</span>
              </a>
              <a 
                href="https://surl.li/ngrcms"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-black text-xs sm:text-sm py-3 px-3 rounded-xl shadow-lg hover:scale-102 transition-all border border-white/40 flex items-center justify-center gap-1.5 uppercase tracking-wider animate-pulse"
              >
                <UserPlus className="w-4 h-4" />
                <span>DAFTAR AKUN</span>
              </a>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full relative group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-black text-lg py-4 px-6 shadow-[0_10px_30px_rgba(220,38,38,0.4)] active:scale-[0.98] transition-all duration-200 border-2 border-white flex items-center justify-center gap-3 cursor-pointer"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000"></div>
              
              {downloading ? (
                <div className="flex items-center gap-3 w-full max-w-xs">
                  <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden p-0.5 border border-white/40">
                    <div 
                      className="bg-white h-full rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{downloadProgress}%</span>
                </div>
              ) : (
                <>
                  <Download className="w-7 h-7 text-white animate-bounce" />
                  <div className="text-left leading-tight">
                    <div className="text-base sm:text-lg font-black uppercase tracking-wide text-white">
                      {deviceInfo.isIOS ? 'UNDUH UNTUK iOS (APPLE)' : 'UNDUH APK SEKARANG'}
                    </div>
                    <div className="text-[11px] font-bold text-white/90">
                      Bebas Virus • Ukuran 18.5 MB • Server Cepat
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white group-hover/btn:translate-x-1 transition-transform ml-auto" />
                </>
              )}
            </button>

            {/* Optional ZIP Assets Download Button */}
            <button
              onClick={handleDownloadZip}
              className="w-full mt-2.5 py-2.5 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>UNDUH PAKET ASET RESMI (ZIP)</span>
            </button>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center text-[12px] font-bold text-white pt-3 border-t border-white/20">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span className="text-white">100% Aman</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-white">Mulai Cepat</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Gift className="w-4 h-4 text-pink-400" />
                <span className="text-white">Bonus 100% NEW MEMBER</span>
              </div>
            </div>
          </div>

          {/* Features Highlight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#121320]/90 border border-blue-800/50 rounded-2xl p-3.5 flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/50 text-yellow-300 flex items-center justify-center font-bold text-lg">
                💰
              </div>
              <div>
                <p className="text-xs text-white font-medium">Bonus Registrasi</p>
                <p className="text-sm font-black text-yellow-300">100 % NEW MEMBER</p>
              </div>
            </div>

            <div className="bg-[#121320]/90 border border-blue-800/50 rounded-2xl p-3.5 flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/50 text-blue-300 flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <div>
                <p className="text-xs text-white font-medium">Penarikan Saldo</p>
                <p className="text-sm font-black text-blue-400">Proses Instant 24/7</p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-blue-900/60 bg-[#080812] rounded-t-xl overflow-hidden p-1">
            <button
              onClick={() => setActiveTab('games')}
              className={`flex-1 py-3 text-xs sm:text-sm font-black transition-all rounded-lg ${
                activeTab === 'games'
                  ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md border border-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              🎮 70+ Game Terpopuler
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`flex-1 py-3 text-xs sm:text-sm font-black transition-all rounded-lg ${
                activeTab === 'features'
                  ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md border border-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              ⭐ Keunggulan App
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-3 text-xs sm:text-sm font-black transition-all rounded-lg ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md border border-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              ❓ Bantuan / FAQ
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === 'games' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0d0e1a] p-3 rounded-b-2xl border border-blue-900/50 shadow-inner">
              {gamesList.map((game, idx) => (
                <div
                  key={idx}
                  className="bg-[#121320] border border-blue-900/60 hover:border-red-500 rounded-2xl p-2.5 text-center space-y-2 transition-all group overflow-hidden shadow-lg"
                >
                  <div className="w-full h-24 sm:h-28 mx-auto rounded-xl overflow-hidden bg-black/80 relative shadow-md border border-blue-950">
                    <img 
                      src={game.image} 
                      alt={game.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=500&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black text-white truncate px-1" title={game.name}>{game.name}</h3>
                    <span className="text-[10px] bg-red-600/40 text-white border border-red-400/50 px-2 py-0.5 rounded-full font-bold inline-block mt-1">
                      {game.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-3">
              <div className="bg-[#121320]/90 border border-blue-800/50 rounded-2xl p-4 flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-white">Sistem Keamanan Tingkat Tinggi</h4>
                  <p className="text-xs text-white font-medium mt-0.5 leading-relaxed">
                    Dilengkapi dengan enkripsi data mutakhir dan perlindungan privasi akun tanpa takut bocor.
                  </p>
                </div>
              </div>

              <div className="bg-[#121320]/90 border border-blue-800/50 rounded-2xl p-4 flex gap-3">
                <Zap className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-white">Performa Ringan & Bebas Lag</h4>
                  <p className="text-xs text-white font-medium mt-0.5 leading-relaxed">
                    Aplikasi dioptimalkan untuk semua HP Android & iOS bahkan pada perangkat ram rendah.
                  </p>
                </div>
              </div>

              <div className="bg-[#121320]/90 border border-blue-800/50 rounded-2xl p-4 flex gap-3">
                <Gift className="w-6 h-6 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-white">Bonus Misteri Harian</h4>
                  <p className="text-xs text-white font-medium mt-0.5 leading-relaxed">
                    Dapatkan giliran spin gratis dan klaim saldo kejutan setiap hari saat membuka aplikasi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="bg-[#121320]/90 border border-blue-800/50 rounded-2xl p-4 space-y-1">
                <p className="text-xs font-black text-yellow-300">Bagaimana cara memasang berkas APK?</p>
                <p className="text-xs text-white font-medium leading-relaxed">
                  Unduh berkas APK di atas, buka folder download, izinkan "Instal dari Sumber Tidak Dikenal" di pengaturan HP Anda, lalu selesaikan instalasi.
                </p>
              </div>

              <div className="bg-[#121320]/90 border border-blue-800/50 rounded-2xl p-4 space-y-1">
                <p className="text-xs font-black text-yellow-300">Apakah aplikasi ini aman untuk HP saya?</p>
                <p className="text-xs text-white font-medium leading-relaxed">
                  Ya, aplikasi resmi Tuna55 dijamin 100% bebas dari malware maupun virus bahaya.
                </p>
              </div>

              <div className="bg-[#121320]/90 border border-blue-800/50 rounded-2xl p-4 space-y-1">
                <p className="text-xs font-black text-yellow-300">Kenapa putaran game di akun saya sedang kurang bagus?</p>
                <p className="text-xs text-white font-medium leading-relaxed">
                  Untuk melihat persentase kemenangan terbaik dan panduan pola saat ini, silakan cek langsung di link RTP resmi TUNA55:{' '}
                  <a 
                    href="https://rtptuna55.xyz/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-400 font-bold underline hover:text-blue-300"
                  >
                    https://rtptuna55.xyz/
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-6 text-center text-xs text-white/90 space-y-2 border-t border-red-950/80 mt-6 bg-[#06060e]">
          <p className="font-bold text-white">© 2026 Tuna55 Gaming Official Platform. Hak Cipta Dilindungi.</p>
          <p className="text-[11px] text-white/80">
            Platform permainan game seluler terkemuka dengan lisensi resmi dan dukungan pelanggan 24/7.
          </p>
        </div>

        {/* Sticky Bottom Download & Member Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#080812]/95 backdrop-blur-md border-t border-red-600/50 p-2.5 shadow-[0_-5px_25px_rgba(220,38,38,0.3)]">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img 
                src="https://api2-t55.imgnxa.com/images/1kpqvj2b40s/logo_1fb63c9c-be87-435a-aa7d-7385afcb85bf_1766247144257.png" 
                alt="Tuna55 Logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/80 p-1 object-contain shadow-md border border-white/60"
              />
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-white">Tuna55 App</p>
                <p className="text-[10px] text-yellow-300 font-semibold">Bonus 100 % NEW MEMBER</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href="https://jagonyatuna.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-black font-black px-3 py-2 rounded-xl text-xs shadow-md flex items-center gap-1 active:scale-95 transition-all border border-yellow-200"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>LOGIN</span>
              </a>
              <a
                href="https://surl.li/ngrcms"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-500 text-white font-black px-3 py-2 rounded-xl text-xs shadow-md flex items-center gap-1 active:scale-95 transition-all border border-white/60"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>DAFTAR</span>
              </a>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-black px-3 py-2 rounded-xl text-xs shadow-lg flex items-center gap-1 active:scale-95 transition-all cursor-pointer border border-white"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>{downloading ? `${downloadProgress}%` : 'APK'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

