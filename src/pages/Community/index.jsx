import { motion } from 'framer-motion';
import AnimatedSticker from '../../components/AnimatedSticker';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionA = motion.a;
const MotionImg = motion.img;

const Community = () => {
  const socialLinks = [
    {
      platform: "Telegram",
      link: "https://t.me/autismintelligence",
      description: "Join our Telegram group for daily autism!",
      sticker: "/gm_coffee_pepe.png"
    },
    {
      platform: "Dexscreener",
      link: "https://dexscreener.com/autismintelligence",
      description: "Find us on Dexscreener!",
      sticker: "/love_pepe.png"
    },
    {
      platform: "Twitter",
      link: "https://twitter.com/autismintelligence",
      description: "Follow us for the dankest memes!",
      sticker: "/drooling_pepe.png"
    }
  ];

  const stats = [
    {
      number: "10K+",
      label: "Autistic Traders",
      icon: "/victory_pepe.webm"
    },
    {
      number: "1M+",
      label: "Memes Shared",
      icon: "/typing_pepe.webm"
    },
    {
      number: "∞",
      label: "Chromosomes",
      icon: "/rofl_pepe.webm"
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
          Join the Autism Intelligence Army!
        </MotionH1>
        
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-accent"
        >
          Where autism meets community (and sometimes profits)
        </MotionP>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {socialLinks.map((social, index) => (
          <MotionA
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-primary/10 border-2 border-primary rounded-xl p-8 text-center relative overflow-hidden group"
          >
            {/* <MotionImg
              src={social.sticker}
              alt={social.platform}
              width={160}
              height={160}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
            /> */}
            <div className="relative z-10">
              <MotionImg
                src={social.sticker}
                alt={social.platform}
                className="w-16 h-16 mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
              />
              <h2 className="text-2xl font-press-start mb-4">{social.platform}</h2>
              <p className="text-lg">{social.description}</p>
            </div>
          </MotionA>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.1 }}
            className="bg-primary text-background p-6 rounded-xl text-center"
          >
            <AnimatedSticker
              src={stat.icon}
              width={64}
              height={64}
              className="mx-auto mb-4"
              hover={false}
            />
            <h3 className="text-4xl font-press-start mb-2">{stat.number}</h3>
            <p className="text-lg">{stat.label}</p>
          </MotionDiv>
        ))}
      </div>

      {/* Join Section */}
      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-primary/10 p-8 rounded-xl text-center"
      >
        <h2 className="text-3xl font-press-start mb-4">Ready to Join?</h2>
        <p className="text-xl mb-8">Bring your autism, we'll provide the intelligence!</p>
        <AnimatedSticker
          src="/peeking-pepe.webm"
          width={128}
          height={128}
          className="mx-auto"
          hover={false}
        />
      </MotionDiv>
    </div>
  );
};

export default Community; 