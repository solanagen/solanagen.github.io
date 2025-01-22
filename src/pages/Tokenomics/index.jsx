import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const Tokenomics = () => {
  const progressRefs = useRef([]);

  const tokenomicsData = [
    {
      title: "Degenerate Development",
      percentage: 10,
      description: "Funding our retarded ideas",
      pepe: "/typing_pepe.png"
    },
    {
      title: "Marketing & Memes",
      percentage: 20,
      description: "Spreading autism awareness",
      pepe: "/excited_pepe.png"
    },
    {
      title: "Community Rewards",
      percentage: 30,
      description: "For the most autistic traders",
      pepe: "/100x_pepe.png"
    },
    {
      title: "Liquidity Pool",
      percentage: 40,
      description: "Making sure you can always trade",
      pepe: "/drooling_pepe.png"
    }
  ];

  useEffect(() => {
    // Animate progress bars
    progressRefs.current.forEach((ref, index) => {
      gsap.to(ref, {
        width: `${tokenomicsData[index].percentage}%`,
        duration: 1.5,
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <MotionH1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-press-start text-primary mb-4"
        >
          Tokenomics
        </MotionH1>
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-accent"
        >
          Our perfectly balanced (trust me bro) token distribution
        </MotionP>
      </div>

      {/* Tokenomics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {tokenomicsData.map((item, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-primary/10 border-2 border-primary rounded-xl p-6 relative overflow-hidden"
          >
            {/* Pepe Overlay */}
            <img
              src={item.pepe}
              alt={item.title}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10 transition-all duration-300 pointer-events-none group-hover:opacity-20"
            />
            
            <h3 className="text-xl font-press-start mb-2">{item.title}</h3>
            <p className="mb-4">{item.description}</p>
            <p className="text-4xl text-primary mb-4">{item.percentage}%</p>
            
            {/* Progress Bar */}
            <div className="h-5 bg-black/30 rounded-full overflow-hidden">
              <div
                ref={el => progressRefs.current[index] = el}
                className="h-full bg-primary w-0"
              />
            </div>
          </MotionDiv>
        ))}
      </div>

      {/* Total Supply */}
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        className="bg-accent p-8 rounded-xl text-center"
      >
        <h2 className="text-2xl md:text-3xl font-press-start text-background mb-2">
          Total Supply: 420,690,000,000 $AUTISM
        </h2>
        <p className="text-background">The perfect number doesn't exi-</p>
      </MotionDiv>
    </div>
  );
};

export default Tokenomics; 