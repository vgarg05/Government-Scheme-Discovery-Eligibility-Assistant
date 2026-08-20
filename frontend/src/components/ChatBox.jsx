import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, ArrowDown } from 'lucide-react';
import VoiceInput from './VoiceInput';
import EligibilityCard from './EligibilityCard';
import DocumentChecklist from './DocumentChecklist';
import { sendChatQuery, getTTSAudioUrl } from '../services/api';

/* ── Avatar components ──────────────────────────── */
function BotAvatar() {
  return (
    <div
      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold"
      style={{
        background: 'rgba(91,142,240,0.12)',
        border: '1px solid rgba(91,142,240,0.2)',
        color: '#5b8ef0',
      }}
    >
      G
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold"
      style={{
        background: 'rgba(62,207,142,0.1)',
        border: '1px solid rgba(62,207,142,0.15)',
        color: '#3ecf8e',
      }}
    >
      U
    </div>
  );
}

/* ── Typing indicator ────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <BotAvatar />
      <div
        className="px-4 py-3 rounded-xl flex items-center gap-1.5"
        style={{ background: '#111118', border: '1px solid #26262e' }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

/* ── Message bubble ──────────────────────────────── */
function Message({ msg, selectedLang, onPlayAudio }) {
  const isUser = msg.sender === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {isUser ? <UserAvatar /> : <BotAvatar />}

      <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'} max-w-[80%] sm:max-w-[72%]`}>

        {/* Text bubble */}
        <div
          className="px-4 py-3 rounded-xl text-sm leading-relaxed"
          style={{
            background: isUser
              ? 'rgba(91,142,240,0.12)'
              : msg.isError
              ? 'rgba(248,113,113,0.06)'
              : '#111118',
            border: `1px solid ${
              isUser
                ? 'rgba(91,142,240,0.2)'
                : msg.isError
                ? 'rgba(248,113,113,0.2)'
                : '#26262e'
            }`,
            color: msg.isError ? '#f87171' : '#d0d0e0',
          }}
        >
          <p className="whitespace-pre-wrap">{msg.text}</p>

          {/* TTS button */}
          {!isUser && !msg.isError && (
            <button
              onClick={() => onPlayAudio(msg.translatedText || msg.text)}
              className="mt-2.5 pt-2.5 flex items-center gap-1.5 text-xs transition-colors duration-150 w-full"
              style={{
                borderTop: '1px solid #1e1e26',
                color: '#55556a',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#8888a0'}
              onMouseLeave={e => e.currentTarget.style.color = '#55556a'}
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>Listen</span>
            </button>
          )}
        </div>

        {/* Eligibility + Docs panels */}
        {msg.data && (
          <div className="w-full">
            <EligibilityCard data={msg.data} />
            <DocumentChecklist
              checklist={msg.data.document_checklist}
              applicationSteps={msg.data.application_steps}
              citations={msg.data.citations}
            />
          </div>
        )}

      </div>
    </div>
  );
}

/* ── Main ChatBox ────────────────────────────────── */
export default function ChatBox({ initialQuery, selectedLang }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! Describe your situation — age, income, occupation, and state — and I'll find the government schemes you qualify for.",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const chatEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  // Show scroll-to-bottom button when user scrolls up
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distFromBottom > 120);
  };

  // Auto-trigger preset query
  useEffect(() => {
    if (initialQuery) handleSend(initialQuery);
  }, [initialQuery]);

  const handleSend = async (queryText) => {
    const text = (queryText || inputText).trim();
    if (!text || isLoading) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseData = await sendChatQuery(text, selectedLang);

      if (responseData.status === 'clarification_required') {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: responseData.clarification?.prompt || 'Could you share a few more details — your age, income, and state?',
          isClarification: true,
        }]);
      } else if (responseData.status === 'success') {
        const resp = responseData.response || {};
        // translated_summary is the text in the user's selected language
        // msg.text shows translated text in UI; msg.translatedText is used for TTS
        const displayText = resp.translated_summary || resp.summary || 'Eligibility evaluation complete.';
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: displayText,
          translatedText: displayText, // already in target language from backend
          data: resp,
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Cannot reach the backend server. Make sure FastAPI is running on http://localhost:8000.',
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = (text) => {
    try {
      const url = `${getTTSAudioUrl()}?text=${encodeURIComponent(text)}&lang=${selectedLang}`;
      new Audio(url).play();
    } catch (err) {
      console.error('TTS error:', err);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">

      {/* Chat panel */}
      <div
        className="relative flex flex-col rounded-xl overflow-hidden"
        style={{ border: '1px solid #26262e', background: '#0a0a0f' }}
      >

        {/* Message list */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6"
          style={{ minHeight: '420px', maxHeight: '62vh' }}
        >
          {messages.map((msg, i) => (
            <Message
              key={i}
              msg={msg}
              selectedLang={selectedLang}
              onPlayAudio={handlePlayAudio}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Scroll-to-bottom pill */}
        {showScrollBtn && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-150"
            style={{
              background: '#18181f',
              border: '1px solid #3a3a48',
              color: '#8888a0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            <ArrowDown className="h-3 w-3" />
            <span>Latest</span>
          </button>
        )}

        {/* Input bar */}
        <div
          className="px-4 py-3"
          style={{ borderTop: '1px solid #1e1e26', background: '#111118' }}
        >
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <VoiceInput selectedLang={selectedLang} onSpeechRecognized={(t) => setInputText(t)} />

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your situation — e.g. farmer, UP, income 80,000…"
              className="flex-1 rounded-lg px-3.5 py-2.5 text-sm transition-all duration-150 focus:outline-none"
              style={{
                background: '#0a0a0f',
                border: '1px solid #26262e',
                color: '#d0d0e0',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(91,142,240,0.4)'}
              onBlur={e => e.target.style.borderColor = '#26262e'}
            />

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-40"
              style={{
                background: 'rgba(91,142,240,0.15)',
                border: '1px solid rgba(91,142,240,0.25)',
                color: '#5b8ef0',
              }}
              onMouseEnter={e => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = 'rgba(91,142,240,0.25)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(91,142,240,0.15)';
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

    </section>
  );
}
