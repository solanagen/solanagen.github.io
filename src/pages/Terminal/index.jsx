import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSticker from '../../components/AnimatedSticker';

const MotionDiv = motion.div;

const Terminal = () => {
  const [currentPrice, setCurrentPrice] = useState(420.69);
  const [buySignal, setBuySignal] = useState(false);
  const [sellSignal, setSellSignal] = useState(false);
  const [autismLevel, setAutismLevel] = useState(69);
  const [retardStrength, setRetardStrength] = useState(42);
  const [lastTrade, setLastTrade] = useState(null);
  const [logs, setLogs] = useState([
    "Initializing autism protocols...",
    "Loading chromosome multipliers...",
    "Calibrating retard strength...",
    "Ready to lose money! 🚀",
  ]);

  // Simulate price movements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Number((prev + change).toFixed(2));
      });

      // Random signals based on pure autism
      setBuySignal(Math.random() > 0.7);
      setSellSignal(Math.random() > 0.7);
      
      // Update autism metrics
      setAutismLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)));
      setRetardStrength(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Add log messages
  const addLog = (message) => {
    setLogs(prev => [...prev.slice(-9), message]);
  };

  // Simulate trade
  const executeTrade = (type) => {
    const tradeSize = Math.floor(Math.random() * 1000);
    const message = type === 'buy' 
      ? `🟢 Aped in ${tradeSize} $AI at ${currentPrice} because line go up`
      : `🔴 Panic sold ${tradeSize} $AI at ${currentPrice} (mom's spaghetti)`;
    
    setLastTrade({ type, size: tradeSize, price: currentPrice });
    addLog(message);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-press-start text-primary mb-2">AI Trading Terminal</h1>
        <p className="text-accent">Warning: Not financial advice (we can't even count)</p>
      </div>

      {/* Main Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
        {/* Left Column - Main Trading View */}
        <div className="space-y-8">
          {/* Price Display */}
          <MotionDiv 
            className="bg-primary/10 p-6 rounded-xl"
            animate={{
              borderColor: currentPrice > 420.69 ? '#00ff00' : '#ff0000',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-press-start">$AI/USDT</h2>
              <div className="flex items-center gap-4">
                {/* {buySignal && (
                  <AnimatedSticker
                    src="/confused_pepe.webm"
                    width={48}
                    height={48}
                    hover={false}
                  />
                )}
                {sellSignal && (
                  <AnimatedSticker
                    src="/me_question_mark_pepe_or_shy.webm"
                    width={48}
                    height={48}
                    hover={false}
                  />
                )} */}
              </div>
            </div>
            <div className="text-6xl font-mono mb-4">
              ${currentPrice.toFixed(2)}
            </div>
            <div className="flex gap-4">
              <motion.button
                onClick={() => executeTrade('buy')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-green-500 text-black font-press-start py-2 rounded-lg hover:bg-green-400 transition-colors"
              >
                APE IN
              </motion.button>
              <motion.button
                onClick={() => executeTrade('sell')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-red-500 text-black font-press-start py-2 rounded-lg hover:bg-red-400 transition-colors"
              >
                PANIC SELL
              </motion.button>
            </div>
          </MotionDiv>

          {/* Autism Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary/10 p-4 rounded-xl">
              <h3 className="font-press-start mb-2">Autism Level</h3>
              <div className="h-4 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ width: `${autismLevel}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-2 text-right">{autismLevel.toFixed(1)}%</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-xl">
              <h3 className="font-press-start mb-2">Retard Strength</h3>
              <div className="h-4 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  animate={{ width: `${retardStrength}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-2 text-right">{retardStrength.toFixed(1)}%</div>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="bg-black/50 p-4 rounded-xl font-mono">
            <h3 className="font-press-start mb-4">Trading Log</h3>
            <div className="space-y-2">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm"
                >
                  <span className="text-accent">{'>'}</span> {log}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Analysis */}
        <div className="space-y-8">
          {/* AI Analysis */}
          <div className="bg-primary/10 p-4 rounded-xl">
            <h3 className="font-press-start mb-4">AI Analysis</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AnimatedSticker
                  src="/confused_pepe.webm"
                  width={32}
                  height={32}
                  hover={false}
                />
                <span>Trust me bro indicator: BULLISH</span>
              </div>
              <div className="flex items-center gap-2">
                <AnimatedSticker
                  src="/me_question_mark_pepe_or_shy.webm"
                  width={32}
                  height={32}
                  hover={false}
                />
                <span>Moon probability: 420%</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/thoughtful_pepe.png"
                  alt="Thoughtful"
                  className="w-8 h-8"
                />
                <span>Chromosome count: Over 9000</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/love_pepe.png"
                  alt="Love"
                  className="w-8 h-8"
                />
                <span>Copium levels: MAXIMUM</span>
              </div>
            </div>
          </div>

          {/* Last Trade */}
          {lastTrade && (
            <div className="bg-primary/10 p-4 rounded-xl">
              <h3 className="font-press-start mb-4">Last Trade</h3>
              <div className="space-y-2">
                <div>Type: {lastTrade.type === 'buy' ? '🟢 Buy' : '🔴 Sell'}</div>
                <div>Size: {lastTrade.size} $AI</div>
                <div>Price: ${lastTrade.price.toFixed(2)}</div>
              </div>
            </div>
          )}

          {/* Trading Tips */}
          <div className="bg-primary/10 p-4 rounded-xl">
            <h3 className="font-press-start mb-4">Trading Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>• Buy high, sell low (this is the way)</li>
              <li>• If line goes up, it will keep going up</li>
              <li>• Red means discount</li>
              <li>• Always trust random Discord calls</li>
              <li>• Mortgage your house for more leverage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal; 