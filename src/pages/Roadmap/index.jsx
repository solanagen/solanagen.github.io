import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSticker from '../../components/AnimatedSticker';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const Roadmap = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);

  const phases = [
    {
      id: 1,
      icon: "/rofl_pepe.webm",
      title: "Phase 1: WTF Are We Doing?",
      subtitle: "Right Now (probably)",
      description: "Launch token and pretend we know what we're doing",
      details: [
        "Create a website that looks professional (you're looking at it) ✅",
        "Launch social media presence with maximum autism 🚀",
        "Deploy smart contract (pray it doesn't get rugged) 🙏",
        "Initial marketing push (spam /biz/ until we get banned)",
        "Get listed on your cousin's DEX",
        "Convince your mom to buy the token"
      ]
    },
    {
      id: 2,
      icon: "/typing_pepe.webm",
      title: "Phase 2: Trust the Process",
      subtitle: "Soon™",
      description: "Time to unleash pure chaos",
      details: [
        "Develop AI trading bot (60% of the time, it works every time)",
        "Partner with other memecoins (hello fellow degens)",
        "Get listed on actual CEX (Sir, please list our token)",
        "Host meme competitions (winner gets extra chromosomes)",
        "Create merch nobody asked for",
        "Start calling ourselves 'ecosystem'"
      ]
    },
    {
      id: 3,
      icon: "/victory_pepe.webm",
      title: "Phase 3: Moon or McDonalds",
      subtitle: "Very Soon™™",
      description: "Either we're millionaires or back to flipping burgers",
      details: [
        "Launch AI trading bot V2 (now with 69% more autism)",
        "Release NFT collection of rare Pepes (right click this)",
        "Get listed on major CEX (the real ones this time)",
        "Achieve world domination (or at least Crypto Twitter)",
        "Buy Wojak's bags",
        "Make Bogdanoff proud"
      ]
    },
    {
      id: 4,
      icon: "/me_question_mark_pepe_or_shy.webm",
      title: "Phase 4: ???",
      subtitle: "When Moon?",
      description: "We'll figure this out when we get here (if we get here)",
      details: [
        "Something something Metaverse (buzzword quota fulfilled)",
        "Maybe we'll cure autism (unlikely)",
        "More memes, definitely more memes",
        "Build time machine to buy Bitcoin in 2009",
        "Achieve sentience through pure retardation",
        "Whatever the community votes for (we're democratic degens)"
      ]
    }
  ];

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
          Roadmap to Valhalla
        </MotionH1>
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-accent"
        >
          Trust the process (we have no idea what we're doing)
        </MotionP>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-primary transform -translate-x-1/2" />

        {/* Phases */}
        {phases.map((phase, index) => (
          <MotionDiv
            key={phase.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative flex items-center mb-16 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Point */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
              <AnimatedSticker
                src={phase.icon}
                width={64}
                height={64}
                className="bg-primary rounded-full p-2"
                hover={false}
              />
            </div>

            {/* Content */}
            <div
              className={`ml-16 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
              }`}
            >
              <MotionDiv
                className="bg-primary/10 p-6 rounded-xl cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <AnimatedSticker
                    src={phase.icon}
                    width={48}
                    height={48}
                    hover={false}
                  />
                  <div>
                    <h3 className="text-xl font-press-start">{phase.title}</h3>
                    <p className="text-accent">{phase.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg mb-2">{phase.description}</p>
                
                <AnimatePresence>
                  {selectedPhase === phase.id && (
                    <MotionDiv
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="list-disc list-inside mt-4 space-y-2">
                        {phase.details.map((detail, i) => (
                          <MotionDiv
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <li>{detail}</li>
                          </MotionDiv>
                        ))}
                      </ul>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </MotionDiv>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default Roadmap; 