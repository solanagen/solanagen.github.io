import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSticker from '../../components/AnimatedSticker';

const MotionDiv = motion.div;

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "GM anon! I'm your friendly neighborhood AI trading degen. What's on your smooth brain today?",
      sticker: "/typing_pepe.webm"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const aiResponses = [
    {
      content: "That's the most autistic thing I've heard today... I love it! 🚀",
      sticker: "/rofl_pepe.webm"
    },
    {
      content: "Sir, this is a Wendy's... but keep going, I'm interested 🍔",
      sticker: "/confused_pepe.webm"
    },
    {
      content: "Have you tried turning your portfolio off and on again? Works 60% of the time, every time! 💻",
      sticker: "/me_question_mark_pepe_or_shy.webm"
    },
    {
      content: "To the moon! Or McDonald's... I'm good with either 🌙",
      sticker: "/victory_pepe.webm"
    }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: inputMessage
    }]);
    setInputMessage('');

    // Simulate AI thinking
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    // Add AI response
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    setMessages(prev => [...prev, {
      type: 'ai',
      content: randomResponse.content,
      sticker: randomResponse.sticker
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-press-start text-primary mb-4">Chat with AI</h1>
        <p className="text-accent">Warning: May cause brain damage and unexpected gains</p>
      </div>

      {/* Chat Container */}
      <div className="bg-primary/5 rounded-xl p-4 h-[600px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.type === 'ai' && (
                    <div className="w-12 h-12">
                      <AnimatedSticker
                        src={message.sticker}
                        width={48}
                        height={48}
                        hover={false}
                      />
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-xl ${
                      message.type === 'user'
                        ? 'bg-primary text-background rounded-br-none'
                        : 'bg-primary/10 text-white rounded-bl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
            {isTyping && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-end gap-2">
                  <div className="w-12 h-12">
                    <AnimatedSticker
                      src="/typing_pepe.webm"
                      width={48}
                      height={48}
                      hover={false}
                    />
                  </div>
                  <div className="bg-primary/10 p-4 rounded-xl rounded-bl-none">
                    <p>typing...</p>
                  </div>
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask something autistic..."
            className="flex-1 bg-primary/10 border-2 border-primary rounded-lg p-4 text-white focus:outline-none focus:border-accent"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-background px-8 py-4 rounded-lg font-press-start hover:bg-accent transition-colors"
          >
            Send
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 