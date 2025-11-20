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
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-[90vw] sm:w-[450px] h-[70vh] max-h-[800px] flex flex-col mb-6 overflow-hidden animate-fade-in-up transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/90 to-blue-800/90 backdrop-blur-md p-5 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <FaRobot className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Hammads Assistant</h3>
                <p className="text-xs text-blue-100 opacity-80">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-6 opacity-80">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                  <FaRobot className="text-4xl text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Welcome!</h4>
                <p className="text-sm max-w-[250px]">
                  👋 Hi! I can help you with information about Hammads trainings and services. Ask me anything!
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-bl-none'
                    }`}
                >
                  {/* Wrapper div (ReactMarkdown cannot use className directly) */}
                  <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-a:text-blue-300 hover:prose-a:text-blue-200">
                    <ReactMarkdown
                      components={{
                        p: props => <p className="mb-2 last:mb-0" {...props} />,
                        ul: props => (
                          <ul className="list-disc ml-4 mb-2" {...props} />
                        ),
                        ol: props => (
                          <ol className="list-decimal ml-4 mb-2" {...props} />
                        ),
                        li: props => <li className="mb-1" {...props} />,
                        a: props => (
                          <a
                            className="text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                            {...props}
                          />
                        ),
                        strong: props => (
                          <strong className="font-bold" {...props} />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl rounded-bl-none p-4 shadow-sm">
                  <div className="flex space-x-2 items-center h-5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-t border-gray-200/30"
          >
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about trainings..."
                className="flex-1 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <FaPaperPlane className="text-sm ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3"
        >
          <FaRobot className="text-3xl group-hover:animate-pulse" />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      )}
    </div>
  );
};
// //
export default ChatBot;
