import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedSticker from '../../components/AnimatedSticker';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const CONTRACT_ADDRESS = "0x420694206942069420694206942069420";

const hackingText = [
  "INITIALIZING HACK...",
  "BYPASSING MAINFRAME...",
  "ACCESSING BLOCKCHAIN...",
  "RETRIEVING CA...",
  "HACK SUCCESSFUL!"
];

const Home = () => {
  const navigate = useNavigate();
  const [showCA, setShowCA] = useState(false);
  const [hackingStep, setHackingStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const boxRef = useRef(null);

  const handleClose = () => {
    setShowCA(false);
    setHackingStep(0);
  };

  const handleBuyClick = async () => {
    setShowCA(true);
    for (let i = 0; i < hackingText.length; i++) {
      setHackingStep(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = CONTRACT_ADDRESS;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const features = [
    {
      title: "Maximum Autism",
      description: "Our AI trading bot has more chromosomes than your entire portfolio",
      icon: "/confused_pepe.webm"
    },
    {
      title: "Degen Friendly",
      description: "Even a monkey could use our platform (we tested it)",
      icon: "/typing_pepe.webm"
    },
    {
      title: "Moon Guaranteed*",
      description: "*Not financial advice, we're just really optimistic",
      icon: "/victory_pepe.webm"
    },
    {
      title: "Community Driven",
      description: "Like a special ed class, but with memes",
      icon: "/rofl_pepe.webm"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <AnimatedSticker
            src="/me_question_mark_pepe_or_shy.webm"
            width={200}
            height={200}
            hover={false}
          />
        </MotionDiv>

        <MotionH1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-press-start text-primary mb-6"
        >
          Autism Intelligence
        </MotionH1>

        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-accent mb-12 max-w-2xl"
        >
          The first memecoin powered by pure retardation and artificial intelligence
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center relative"
        >
          <motion.button
            onClick={handleBuyClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-background font-press-start rounded-lg hover:bg-accent transition-colors"
          >
            CA
          </motion.button>
          <motion.button
            onClick={() => navigate('/community')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-primary text-primary font-press-start rounded-lg hover:bg-primary/10 transition-colors"
          >
            Join Community
          </motion.button>

          {/* Hacking Animation */}
          <AnimatePresence>
            {showCA && (
              <div 
                className="fixed inset-0 flex items-center justify-center z-50"
                onClick={handleClose}
              >
                <div className="absolute inset-0 bg-black/50" />
                <MotionDiv
                  ref={boxRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative z-10 px-4 max-w-md w-full"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="bg-black/90 backdrop-blur-sm p-4 rounded-lg border-2 border-primary">
                    <motion.p
                      animate={{
                        color: ['#00ff00', '#ffffff', '#00ff00'],
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="font-mono mb-2 text-center"
                    >
                      {hackingText[hackingStep]}
                    </motion.p>
                    {hackingStep === hackingText.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative"
                      >
                        <div className="flex items-center justify-center gap-2 bg-primary/10 p-2 rounded">
                          <code className="text-primary font-mono text-sm select-all">
                            {CONTRACT_ADDRESS}
                          </code>
                          <button
                            onClick={handleCopy}
                            className="px-2 py-1 bg-primary text-background rounded text-sm hover:bg-accent transition-colors"
                          >
                            {copied ? '✓' : 'Copy'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </MotionDiv>
              </div>
            )}
          </AnimatePresence>
        </MotionDiv>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-press-start text-primary text-center mb-16">
            Why Choose Autism?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-primary/10 p-6 rounded-xl text-center hover:bg-primary/20 transition-colors"
              >
                <AnimatedSticker
                  src={feature.icon}
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                  hover={false}
                />
                <h3 className="text-xl font-press-start mb-2">{feature.title}</h3>
                <p className="text-accent">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 