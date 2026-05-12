import React, { useEffect, useState } from 'react';
import { ShieldCheck, Activity, Wifi, Lock, Globe } from 'lucide-react';

const CyberDashboard: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const possibleLogs = [
      "Analyzing input stream...",
      "Audio frequency check: NORMAL",
      "Face landmark detection: 468 points",
      "Blink rate analysis: 18/min",
      "Syncing with threat database...",
      "No deepfake artifacts detected.",
      "Connection secured via TLS 1.3",
      "Scanning background noise pattern...",
      "Lipsync latency: 12ms (Pass)",
      "User session authenticated."
    ];

    const interval = setInterval(() => {
      const newLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLogs(prev => [`[${time}] > ${newLog}`, ...prev.slice(0, 4)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden shadow-2xl h-full min-h-[320px] flex flex-col font-mono relative group hover:border-primary/50 transition-colors duration-500">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-800 p-3 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-[10px] text-gray-400 ml-2 tracking-widest">DEEPFENSE_MONITOR_V1.0</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-[10px] text-success font-bold">LIVE</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
        
        <div className="grid grid-cols-2 gap-4 h-full relative z-10">
            {/* Left Col: Radar & Security */}
            <div className="border border-gray-800 bg-black/40 rounded p-3 flex flex-col justify-between overflow-hidden relative">
                {/* Radar Effect Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 pointer-events-none">
                     <div className="w-full h-full rounded-full border border-primary/30 relative animate-[spin_4s_linear_infinite]">
                        <div className="absolute top-1/2 left-1/2 w-full h-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-bottom rotate-90" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
                     </div>
                </div>

                <div className="flex justify-between items-start mb-2 relative z-10">
                    <ShieldCheck className="text-primary" size={24} />
                    <span className="text-[10px] text-primary border border-primary/30 px-1 rounded bg-black/50 backdrop-blur">SECURE</span>
                </div>
                
                {/* Simulated World Map Points */}
                <div className="flex-1 relative border-t border-b border-gray-800 my-2 opacity-60">
                    <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 w-full h-full opacity-30" />
                    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-success rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>

                <div className="flex justify-between text-[10px] text-gray-500 relative z-10">
                    <span>UPTIME: 99.9%</span>
                    <span>THREATS: 0</span>
                </div>
            </div>

            {/* Right Col: Stats */}
            <div className="flex flex-col gap-3">
                <div className="bg-gray-900/30 p-2 rounded border border-gray-800">
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-1">
                        <Activity size={10} /> NETWORK TRAFFIC
                    </div>
                    <div className="h-8 flex items-end gap-0.5">
                        {[...Array(15)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-full bg-primary/50 transition-all duration-300" 
                                style={{ height: `${Math.random() * 80 + 20}%` }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900/30 p-2 rounded border border-gray-800 flex-1 flex flex-col">
                     <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 shrink-0">
                        <Lock size={10} /> SYSTEM LOGS
                    </div>
                    <div className="space-y-1 overflow-hidden flex-1 relative">
                        {/* Overlay to fade out bottom logs */}
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none"></div>
                        {logs.map((log, i) => (
                            <div key={i} className="text-[9px] text-success/80 truncate font-mono animate-in slide-in-from-left-2 duration-300">
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-gray-900/80 border-t border-gray-800 p-1.5 flex justify-between text-[9px] text-gray-500 font-mono">
         <span className="flex items-center gap-1"><Wifi size={10}/> CONNECTED</span>
         <span>MEM: 64%</span>
         <span>CPU: 12%</span>
         <span className="text-primary">DEEPFENSE.AI PROTECTED</span>
      </div>
    </div>
  );
};

export default CyberDashboard;