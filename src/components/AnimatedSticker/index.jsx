import { motion } from 'framer-motion';

const AnimatedSticker = ({ 
  src, 
  className = "", 
  width = "48", 
  height = "48",
  animate = true,
  hover = true,
  initial = { opacity: 0, scale: 0 },
  animation = { opacity: 1, scale: 1 },
  transition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
  hoverAnimation = { 
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: { duration: 0.5 }
  }
}) => {
  const videoProps = {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    className: `${className}`,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      objectFit: 'contain'
    },
    ...(animate && {
      initial,
      animate: animation,
      transition
    }),
    ...(hover && {
      whileHover: hoverAnimation
    })
  };

  return (
    <motion.video {...videoProps}>
      <source src={src} type="video/webm" />
    </motion.video>
  );
};

export default AnimatedSticker; 