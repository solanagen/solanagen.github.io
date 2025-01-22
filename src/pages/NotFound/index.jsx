import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSticker from '../../components/AnimatedSticker';

const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionLink = motion(Link);

const shakeAnimation = {
  animate: {
    x: [0, -2, 3, -4, 0, 2, -3, 4, 0],
    y: [0, 2, -3, 2, 0, -2, 3, -2, 0],
    rotate: [0, -0.5, 1, -1, 0, 0.5, -1, 1, 0],
    transition: {
      duration: 0.25,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const glitchAnimation = {
  animate: {
    opacity: [1, 0.8, 1, 0.9, 1],
    x: [0, 2, -2, 1, 0],
    skewX: [0, 2, -2, 1, 0],
    filter: [
      'none',
      'brightness(150%) contrast(110%)',
      'brightness(90%) contrast(90%)',
      'brightness(120%) contrast(105%)',
      'none'
    ],
    transition: {
      duration: 0.25,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      <div className="relative">
        <MotionH1
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            ...shakeAnimation.animate
          }}
          className="text-8xl md:text-9xl font-press-start text-primary mb-8 drop-shadow-[0_0_20px_rgba(0,255,0,0.5)] relative"
        >
          {/* Glitch layers */}
          <motion.span
            className="absolute inset-0 text-[#ff0000] mix-blend-screen"
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [0.5, 0.3, 0.5, 0.3, 0.5],
            }}
            transition={shakeAnimation.animate.transition}
          >
            404
          </motion.span>
          <motion.span
            className="absolute inset-0 text-[#00ff00] mix-blend-screen"
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0.5, 0.3, 0.5, 0.3, 0.5],
            }}
            transition={shakeAnimation.animate.transition}
          >
            404
          </motion.span>
          404
        </MotionH1>
      </div>
      
      <MotionP
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          ...glitchAnimation.animate
        }}
        className="text-2xl md:text-3xl text-accent mb-16 relative"
      >
        The Brain's Loading... Or Not
      </MotionP>

      <MotionLink
        to="/"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          ...shakeAnimation.animate
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="px-8 py-4 bg-primary text-background font-press-start rounded-lg hover:bg-accent transition-colors relative"
      >
        <motion.span
          className="absolute inset-0 bg-[#ff0000] opacity-50 rounded-lg"
          animate={{
            x: [-1, 1, -0.5, 0.5, 0],
            opacity: [0.3, 0.2, 0.3, 0.2, 0.3],
          }}
          transition={shakeAnimation.animate.transition}
        />
        <motion.span
          className="absolute inset-0 bg-[#00ff00] opacity-50 rounded-lg"
          animate={{
            x: [1, -1, 0.5, -0.5, 0],
            opacity: [0.3, 0.2, 0.3, 0.2, 0.3],
          }}
          transition={shakeAnimation.animate.transition}
        />
        Back to Homepage
      </MotionLink>

      {/* Positioned Pepe */}
      <div className="fixed left-0 bottom-0">
        <AnimatedSticker
          src="/confused_pepe.webm"
          width={384}
          height={384}
          hover={false}
        />
      </div>
    </div>
  );
};

export default NotFound; 