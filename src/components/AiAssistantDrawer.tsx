import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello! I am SafeSpace AI, Singapore’s specialized renovation intelligence advisor. How can I assist you today? You can ask me about HDB permits, CaseTrust deposit protection, ACRA checks, or quote red flags.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'chat',
          payload: { query: textToSend },
        }),
      });

      const data = await res.json();
      const aiResponse = data.text || 'I apologize, I am unable to process that query right now. Please check back shortly.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('AI Drawer error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Under CaseTrust deposit guarantee guidelines, homeowners are strongly advised to keep upfront deposits under 10-15%. Always verify HDB registration numbers before allowing hacking.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 text-slate-900">
      
      {/* Drawer Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>SafeSpace AI Assistant</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                Gemini 3.6
              </span>
            </h3>
            <p className="text-[10px] text-slate-500">Singapore Renovation & Consumer Rights Advisor</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Preset Quick Chips */}
      <div className="p-2.5 bg-slate-50/60 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <button
          onClick={() => handleSendMessage('Explain CaseTrust deposit performance guarantee scheme in simple terms')}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition-colors font-medium shadow-2xs"
        >
          CaseTrust Escrow Rules
        </button>
        <button
          onClick={() => handleSendMessage('What are the top 3 red flags in an interior designer contract?')}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition-colors font-medium shadow-2xs"
        >
          Contract Red Flags
        </button>
        <button
          onClick={() => handleSendMessage('What structural hacking permits are required for HDB BTO flats?')}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition-colors font-medium shadow-2xs"
        >
          HDB Hacking Rules
        </button>
      </div>

      {/* Messages List */}
      <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
              m.sender === 'user'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 text-teal-700 border border-slate-200'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
              m.sender === 'user'
                ? 'bg-teal-600 text-white font-medium rounded-tr-none shadow-2xs'
                : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
            }`}>
              <p className="whitespace-pre-wrap">{m.text}</p>
              <span className={`block text-[9px] mt-1 ${m.sender === 'user' ? 'text-white/80 text-right' : 'text-slate-400'}`}>
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs italic p-2">
            <Bot className="w-4 h-4 text-teal-600 animate-spin" />
            <span>SafeSpace AI is analyzing Singapore renovation regulations...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything about SG renovation safety..."
            className="flex-1 bg-white text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all disabled:opacity-40 shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
