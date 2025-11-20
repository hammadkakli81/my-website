// ChatBot with modern blue→yellow gradient, glassy UI, sleeker inputs

import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Tailwind custom gradients assumed:
// bg-gradient-primary  → from-blue-500 to-yellow-400
// bg-gradient-primary-dark → from-blue-700 to-yellow-500
// primary = blue-yellow branding
// secondary-light/dark left as-is

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Explicit class strings for Tailwind to detect during build
  const userBubbleClass = 'bg-yellow-600 text-white shadow-xl';
  const assistantBubbleClass =
    'bg-blue-100 text-gray-900 border border-white/30';

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.response },
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Sorry, something went wrong.' },
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Connection error, please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[30px] right-[30px] z-[9999] flex flex-col items-end font-sans">
      {isOpen && (
        <div
          className="w-[90vw] sm:w-[450px] h-[70vh] flex flex-col mb-6 overflow-hidden
                     rounded-3xl shadow-2xl border border-white/30
                     bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
        >
          {/* Header */}
          <div
            className="p-5 flex justify-between items-center shadow-xl
                       bg-yellow-600"
          >
            <div className="flex items-center gap-3">
              {/* Icon uses currentColor so keep it white for contrast */}
              <FaRobot className="text-[30px] text-white drop-shadow-lg" />
              {/* Make the title pop with subtle clipped gradient text if supported */}
              <h3 className="font-bold text-[22px] text-white drop-shadow">
                Assistant
              </h3>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="text-[24px] text-white hover:scale-125 transition drop-shadow" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
            {messages.length === 0 && (
              <p className="text-gray-700 dark:text-gray-300 text-center mt-10 text-[18px] opacity-80">
                Start a conversation...
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`text-[16px] px-5 py-3 rounded-2xl max-w-[80%] shadow-lg backdrop-blur-sm ${
                    msg.role === 'user' ? userBubbleClass : assistantBubbleClass
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-gray-500 dark:text-gray-300 animate-pulse text-[16px]">
                Typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-white/30 flex gap-3
                       bg-white/60 dark:bg-gray-900/50 backdrop-blur-xl"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-5 py-3 text-[16px] rounded-2xl border border-yellow-600/40 shadow-inner
                         bg-white/80 dark:bg-gray-800/70 focus:ring-4 focus:ring-yellow-300/40
                         outline-none transition-all"
            />

            <button
              className="p-4 rounded-2xl shadow-xl text-white text-[20px]
                         bg-yellow-600
                         hover:scale-110 transition"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-[80px] h-[80px] rounded-2xl shadow-2xl flex items-center justify-center text-white text-[40px]
                     bg-yellow-600 hover:scale-110 transition backdrop-blur-xl"
        >
          <FaRobot />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
