import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, ArrowDown } from 'lucide-react';
import VoiceInput from './VoiceInput';
import EligibilityCard from './EligibilityCard';
import DocumentChecklist from './DocumentChecklist';
import { sendChatQuery, getTTSAudioUrl } from '../services/api';

/* ── Avatar components ─────────────────────────────── */
function BotAvatar() {
  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '6px',
        background: 'var(--accent)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 700,
        color: '#171714',
        letterSpacing: '-0.01em',
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
      }}
    >
      G
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '6px',
        background: 'var(--raised)',
        border: '1px solid var(--border)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 650,
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em',
      }}
    >
      U
    </div>
  );
}

/* ── Typing indicator ──────────────────────────────── */
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <BotAvatar />
      <div
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          background: '#FFFFFF',
          border: '1px solid rgba(26, 25, 22, 0.1)',
          boxShadow: '0 1px 3px rgba(23,23,20,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

/* ── Message bubble ───────────────────────────────── */
function Message({ msg, selectedLang, onPlayAudio }) {
  const isUser = msg.sender === 'user';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      {isUser ? <UserAvatar /> : <BotAvatar />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: isUser ? 'flex-end' : 'flex-start',
          maxWidth: '78%',
        }}
      >
        {/* Text bubble */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: 1.6,
            background: isUser
              ? 'var(--accent)'
              : msg.isError
              ? 'rgba(184,92,82,0.06)'
              : '#FFFFFF',
            border: `1px solid ${
              isUser
                ? 'var(--accent)'
                : msg.isError
                ? 'rgba(184,92,82,0.2)'
                : 'rgba(26, 25, 22, 0.1)'
            }`,
            color: isUser
              ? '#171714'
              : msg.isError
              ? 'var(--error)'
              : '#16140E',
            boxShadow: isUser
              ? '0 1px 2px rgba(0,0,0,0.05)'
              : '0 1px 3px rgba(23, 23, 20, 0.04)',
          }}
        >
          <p style={{ whiteSpace: 'pre-wrap', margin: 0, fontWeight: isUser ? 500 : 450 }}>
            {msg.text}
          </p>

          {/* TTS button */}
          {!isUser && !msg.isError && (
            <button
              onClick={() => onPlayAudio(msg.translatedText || msg.text)}
              style={{
                marginTop: '10px',
                paddingTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                background: 'none',
                border: 'none',
                borderTop: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                width: '100%',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Volume2 style={{ width: '12px', height: '12px' }} />
              <span>Listen</span>
            </button>
          )}
        </div>

        {/* Eligibility + Docs panels (Kept Untouched) */}
        {msg.data && (
          <div style={{ width: '100%' }}>
            <EligibilityCard data={msg.data} />
            <DocumentChecklist
              checklist={msg.data.document_checklist}
              applicationSteps={msg.data.application_steps}
              citations={msg.data.citations}
              language={msg.data.language || selectedLang}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main ChatBox ─────────────────────────────────── */
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

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distFromBottom > 120);
  };

  useEffect(() => {
    if (initialQuery) handleSend(initialQuery);
  }, [initialQuery]);

  const handleSend = async (queryText) => {
    const text = (queryText || inputText).trim();
    if (!text || isLoading) return;

    const history = messages
      .filter(msg => !msg.isError)
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
        profile_snapshot: msg.profile || null,
      }));

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseData = await sendChatQuery(text, selectedLang, history);

      if (responseData.status === 'clarification_required') {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: responseData.clarification?.prompt || 'Could you share a few more details — your age, income, and state?',
          isClarification: true,
          profile: responseData.user_profile,
        }]);
      } else if (responseData.status === 'success') {
        const resp = responseData.response || {};
        const displayText = resp.translated_summary || resp.summary || 'Eligibility evaluation complete.';
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: displayText,
          translatedText: displayText,
          data: resp,
          profile: responseData.user_profile,
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
    <section
      className="max-w-7xl mx-auto px-6 sm:px-12"
      style={{
        paddingTop: '40px',
        paddingBottom: '48px',
      }}
    >
      {/* Section label */}
      <p className="label-meta" style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
        Scheme Advisor
      </p>

      {/* Chat panel */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >

        {/* Message list */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            minHeight: '420px',
            maxHeight: '62vh',
          }}
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
            style={{
              position: 'absolute',
              bottom: '76px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'var(--raised)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(23,23,20,0.08)',
              transition: 'all 0.15s',
            }}
          >
            <ArrowDown style={{ width: '11px', height: '11px' }} />
            <span>Latest</span>
          </button>
        )}

        {/* Input bar */}
        <div
          style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--border)',
            background: 'var(--raised)',
          }}
        >
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ display: 'flex', items: 'center', gap: '8px' }}
          >
            <VoiceInput
              selectedLang={selectedLang}
              onSpeechRecognized={(t) => setInputText(t)}
            />

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your situation — e.g. farmer, UP, income 80,000…"
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.boxShadow = '0 0 0 2px rgba(242,181,68,0.2)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              style={{
                flexShrink: 0,
                width: '38px',
                height: '38px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: (!isLoading && inputText.trim()) ? 'var(--accent)' : 'var(--surface)',
                border: '1px solid ' + ((!isLoading && inputText.trim()) ? 'var(--accent)' : 'var(--border)'),
                color: (!isLoading && inputText.trim()) ? '#171714' : 'var(--text-muted)',
                cursor: (!isLoading && inputText.trim()) ? 'pointer' : 'default',
                opacity: (isLoading) ? 0.5 : 1,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.opacity = '0.92';
                }
              }}
              onMouseLeave={e => {
                if (!e.currentTarget.disabled && inputText.trim()) {
                  e.currentTarget.style.opacity = '1';
                }
              }}
            >
              <Send style={{ width: '15px', height: '15px' }} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
