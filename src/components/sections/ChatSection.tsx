import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || (import.meta as any).env?.MODE === 'production' ? '/api' : 'http://127.0.0.1:8000';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const forceScrollOnNextMessageRef = useRef(false);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior });
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const threshold = 80; // px from bottom to consider "near bottom"
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    const isNearBottom = distanceFromBottom <= threshold;

    if (forceScrollOnNextMessageRef.current) {
      scrollToBottom('smooth');
      forceScrollOnNextMessageRef.current = false;
      return;
    }

    if (isNearBottom) {
      scrollToBottom('auto');
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Start chat if this is the first message
    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    // Force scroll to bottom after adding the user's message
    forceScrollOnNextMessageRef.current = true;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // For non-streaming responses, we'll handle the response directly
      const aiMessageId = (Date.now() + 1).toString();
      let responseReceived = false;

      const appendDelta = (delta: string) => {
        if (!delta) return;
        responseReceived = true;
        setMessages(prev => {
          // Create the AI message with the full response
          setIsLoading(false);
          return [
            ...prev,
            {
              id: aiMessageId,
              content: delta,
              sender: 'ai',
              timestamp: new Date()
            }
          ];
        });
      };

      await sendToBackend(userMessage.content, appendDelta);
      // If no response was received, show a fallback
      if (!responseReceived) {
        setIsLoading(false);
        setMessages(prev => ([
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            content: "I couldn't generate a response right now. Please try again.",
            sender: 'ai',
            timestamp: new Date()
          }
        ]));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble responding right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // isLoading is cleared on first delta or on fallback/error; no-op here to avoid flicker
      // Refocus input after sending message
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const sendToBackend = async (userMessage: string, onDelta: (delta: string) => void): Promise<void> => {
    const url = `${API_BASE}/chat`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userMessage, stream: false })
    });
    if (!resp.ok) throw new Error(`Backend error: ${resp.status}`);
    const data = await resp.json().catch(() => ({} as any));
    const text = (data as any)?.answer ?? '';
    if (text) {
      // For non-streaming responses, send the entire text as one delta
      onDelta(text);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  return (
    <section id="chat" className="relative py-20 md:py-24 overflow-hidden bg-white border-t border-border/20">
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            What would you like to know?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ask me anything about my experience, projects, or background
          </p>
        </motion.div>

        {/* Chat Messages (only show when chat has started) */}
        <AnimatePresence>
          {hasStartedChat && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-lg p-6 mb-8">
                <div 
                  ref={chatContainerRef}
                  className="max-h-96 overflow-y-auto space-y-4 pr-3 -mr-3"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  <AnimatePresence mode="popLayout">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.sender === 'user'
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-900 text-left'
                          }`}
                        >
                          <p className="text-sm leading-relaxed break-words font-sans">
                            {message.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 text-gray-900 text-left">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input Bar (moved below messages) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <div className="flex items-center bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl focus-within:shadow-xl transition-all duration-300 p-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything..."
                className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none focus:border-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 ring-0 ring-offset-0 text-base placeholder:text-gray-500 px-4 py-3 font-sans"
                style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="bg-gray-900 hover:bg-gray-800 text-white h-10 w-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mr-1"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}