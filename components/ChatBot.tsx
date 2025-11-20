import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        headers: {
          'Content-Type': 'application/json',
        },
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
          {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, I encountered an error. Please check your connection.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 font-sans flex flex-col items-end scale-150 origin-bottom-right">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-[90vw] sm:w-[550px] h-[80vh] max-h-[900px] flex flex-col mb-10 overflow-hidden animate-fade-in-up transition-all duration-300 text-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/90 to-blue-800/90 backdrop-blur-md p-7 flex justify-between items-center text-white shadow-md text-2xl">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <FaRobot className="text-3xl" />
              </div>
              <div>
                <h3 className="font-bold text-2xl leading-tight">
                  Hammads Assistant
                </h3>
                <p className="text-base text-blue-100 opacity-80">
                  Always here to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-3 rounded-full transition-colors duration-200"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-7 space-y-8 text-xl scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-6 opacity-80 text-xl">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full mb-6">
                  <FaRobot className="text-6xl text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-2xl mb-3">
                  Welcome!
                </h4>
                <p className="text-lg max-w-[300px]">
                  👋 Hi! I can help you with information about Hammads trainings
                  and services.
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-6 text-lg shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-bl-none'}`}
                >
                  <div className="prose prose-lg max-w-none dark:prose-invert prose-p:leading-relaxed">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl rounded-bl-none p-6 shadow-sm text-xl">
                  <div className="flex space-x-3 items-center h-7">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-t border-gray-200/30 text-xl"
          >
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about trainings..."
                className="flex-1 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-full px-7 py-4 text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-full hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <FaPaperPlane className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-3 relative"
        >
          <FaRobot className="text-5xl group-hover:animate-pulse" />
          <span className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
          <span className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
