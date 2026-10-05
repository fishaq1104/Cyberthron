import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { askDarbAI } from '../../services/api';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const DarbAIChat: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: isAr
        ? 'مرحباً بك! أنا «درب الذكي» (Darb AI)، مساعدك للتنقل المستدام والمكيف في أبوظبي. كيف يمكنني مساعدتك اليوم في رحلتك؟'
        : 'Marhaban! I am Darb AI, your Abu Dhabi climate mobility companion. How can I guide your shaded, sustainable journey today?',
      timestamp: '11:20 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    isAr ? 'من جزيرة الريم إلى الكورنيش' : 'I need to go from Al Reem Island to Corniche.',
    isAr ? 'أنا أستخدم كرسياً متحركاً' : 'I use a wheelchair.',
    isAr ? 'ما هي درجات الحرارة الآن؟' : 'Current Abu Dhabi heat advisory?',
    isAr ? 'أفضل مسار دراجات مظلل' : 'Best shaded cycling track?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const reply = await askDarbAI(query);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: isAr
          ? 'عذراً، يواجه درب الذكي ضغطاً مؤقتاً. يمكنك الاستمرار في استخدام حاسبة المسارات المظللة أعلاه.'
          : 'Darb AI is temporarily synchronizing with Abu Dhabi climate stations. Please continue using the Route Planner above.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-6 z-40 flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#044E3B] via-[#065F46] to-[#044E3B] text-white shadow-2xl border-2 border-[#C5A059] hover:scale-105 transition-all cursor-pointer group"
          aria-label="Open Darb AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#FDE68A]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#022C22] animate-ping"></span>
          </div>
          <span className="font-extrabold text-sm tracking-wide">Darb AI</span>
          <span className="text-[10px] bg-[#C5A059] text-white px-2 py-0.5 rounded-full font-bold uppercase hidden sm:inline">
            Climate Bot
          </span>
        </button>
      )}

      {/* Expanded Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[550px] max-h-[85vh] bg-[#022C22] text-white rounded-3xl border-2 border-[#C5A059]/50 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#022C22] to-emerald-950 border-b border-[#C5A059]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-900 border border-[#C5A059] flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-[#FDE68A]">Darb AI (درب الذكي)</h4>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                    Abu Dhabi Live
                  </span>
                </div>
                <p className="text-[10px] text-emerald-200">
                  {isAr ? 'مساعد التنقل المتكيف مع المناخ' : 'Climate & Accessible Mobility Engine'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-black/20 hover:bg-black/40 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-emerald-950/60 border-b border-emerald-900/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(qp)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-900/40 hover:bg-emerald-800 text-[11px] text-emerald-200 border border-emerald-700/50 transition-all shrink-0 cursor-pointer"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#022C22] via-[#03362A] to-[#022C22]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-900/90 border border-[#C5A059]/40 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-[#C5A059] text-[#022C22] font-semibold'
                      : 'bg-emerald-950/90 text-emerald-50 border border-emerald-500/30'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-[#022C22]/70' : 'text-emerald-400/60'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-[#C5A059] text-[#022C22] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-emerald-900 border border-[#C5A059]/40 flex items-center justify-center text-xs">
                  🤖
                </div>
                <div className="bg-emerald-950/90 border border-emerald-500/30 rounded-2xl px-4 py-2.5 text-xs text-emerald-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-[11px] text-emerald-400">
                    {isAr ? 'درب الذكي يحلل مسارات أبوظبي...' : 'Darb AI analyzing climate corridors...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-[#022C22] border-t border-[#C5A059]/30">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isAr ? 'اسأل درب الذكي عن مسار أو وجهة...' : 'Ask Darb AI about shaded routes, accessibility...'}
                className="flex-1 bg-emerald-950/80 border border-emerald-600/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D97706] text-white disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
