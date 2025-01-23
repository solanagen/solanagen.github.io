import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionButton = motion.button;

const MemeGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('/excited_pepe.png');
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const canvasRef = useRef(null);

  const templates = [
    { src: '/100x_pepe.png', name: '100x' },
    { src: '/angry_pepe.png', name: 'Angry' },
    { src: '/angry2_pepe.png', name: 'Angry 2' },
    { src: '/chill_pepe.png', name: 'Chill' },
    { src: '/drooling_pepe.png', name: 'Drooling' },
    { src: '/excited_pepe.png', name: 'Excited' },
    { src: '/gm_coffee_pepe.png', name: 'GM Coffee' },
    { src: '/green_candle_pepe.png', name: 'Green Candle' },
    { src: '/horny_pepe.png', name: 'Horny' },
    { src: '/love_pepe.png', name: 'Love' },
    { src: '/me_question_mark_pepe_or_shy.png', name: 'Shy' },
    { src: '/peeking_pepe.png', name: 'Peeking' },
    { src: '/rofl_pepe.png', name: 'ROFL' },
    { src: '/sleep_pepe.png', name: 'Sleep' },
    { src: '/sniping_pepe.png', name: 'Sniping' },
    { src: '/surprised_pepe.png', name: 'Surprised' },
    { src: '/thoughtful_pepe.png', name: 'Thoughtful' },
    { src: '/typing_pepe.png', name: 'Typing' },
    { src: '/unimpressed_pepe.png', name: 'Unimpressed' },
    { src: '/victory_pepe.png', name: 'Victory' },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const backgrounds = [
    { src: '/backgrounds/1.png', name: 'Background 1' },
    { src: '/backgrounds/2.png', name: 'Background 2' },
    { src: '/backgrounds/3.png', name: 'Background 3' },
    { src: '/backgrounds/4.png', name: 'Background 4' },
    { src: '/backgrounds/5.png', name: 'Background 5' },
  ];

  const downloadMeme = async () => {
    const element = canvasRef.current;
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: selectedBackground ? null : '#ffffff',
      scale: 2, // Higher quality output
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector('[data-html2canvas-ignore]');
        if (clonedElement) {
          clonedElement.remove();
        }
      }
    });

    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    
    link.href = data;
    link.download = 'autism-intelligence-meme.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareOnX = async () => {
    const element = canvasRef.current;
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
    });

    // Convert the canvas to a blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const file = new File([blob], 'meme.png', { type: 'image/png' });

    // Create tweet text
    const tweetText = "Created with @AutismIntel Meme Generator 🧠\n\n$AI #AutismIntelligence";

    // Try to use Web Share API first
    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          text: tweetText,
        });
        return;
      } catch (err) {
        console.log('Web Share API failed, falling back to X URL');
      }
    }

    // Fallback to X URL
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
      '_blank'
    );
  };

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
          Autism Intelligence Meme Generator
        </MotionH1>
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-accent"
        >
          Create your own autistic masterpiece!
        </MotionP>
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
        {/* Template and Background Selector */}
        <div className="space-y-8">
          {/* Template Selector */}
          <div className="bg-primary/10 rounded-xl p-6">
            <h3 className="font-press-start mb-6">Choose Template</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-h-[300px] overflow-y-auto pr-2">
              {templates.map((template, index) => (
                <MotionButton
                  key={index}
                  onClick={() => setSelectedTemplate(template.src)}
                  className={`w-full p-4 border-2 border-primary rounded-lg flex items-center gap-4 transition-all ${
                    selectedTemplate === template.src
                      ? 'bg-primary text-background'
                      : 'bg-transparent hover:bg-primary/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={template.src}
                    alt={template.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="font-press-start text-sm">{template.name}</span>
                </MotionButton>
              ))}
            </div>
          </div>

          {/* Background Selector */}
          <div className="bg-primary/10 rounded-xl p-6">
            <h3 className="font-press-start mb-6">Choose Background</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-h-[300px] overflow-y-auto pr-2">
              <MotionButton
                onClick={() => setSelectedBackground(null)}
                className={`w-full p-4 border-2 border-primary rounded-lg flex items-center gap-4 transition-all ${
                  selectedBackground === null
                    ? 'bg-primary text-background'
                    : 'bg-transparent hover:bg-primary/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                  ❌
                </div>
                <span className="font-press-start text-sm">No Background</span>
              </MotionButton>
              {backgrounds.map((bg, index) => (
                <MotionButton
                  key={index}
                  onClick={() => setSelectedBackground(bg.src)}
                  className={`w-full p-4 border-2 border-primary rounded-lg flex items-center gap-4 transition-all ${
                    selectedBackground === bg.src
                      ? 'bg-primary text-background'
                      : 'bg-transparent hover:bg-primary/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={bg.src}
                    alt={bg.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="font-press-start text-sm">{bg.name}</span>
                </MotionButton>
              ))}
            </div>
          </div>
        </div>

        {/* Meme Canvas */}
        <div>
          <div
            ref={canvasRef}
            className="relative max-w-sm mx-auto mb-8 rounded-xl overflow-hidden"
            style={{ 
              backgroundColor: selectedBackground ? 'transparent' : '#ffffff',
              aspectRatio: '1 / 1'
            }}
          >
            {selectedBackground ? (
              <img
                src={selectedBackground}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-white" />
            )}
            <div className="absolute inset-0 bg-black/5" /> {/* Subtle overlay for better contrast */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src={selectedTemplate}
                alt="Meme template"
                className="w-full h-full object-contain"
                style={{ 
                  filter: selectedBackground ? 'contrast(1.2) brightness(0.9)' : 'none',
                  mixBlendMode: selectedBackground ? 'multiply' : 'normal'
                }}
              />
            </div>
            <div className="absolute top-4 left-0 right-0 px-4 text-center z-20">
              <p className="text-white text-4xl font-['Impact'] uppercase break-words meme-text">
                {topText}
              </p>
            </div>
            <div className="absolute bottom-4 left-0 right-0 px-4 text-center z-20">
              <p className="text-white text-4xl font-['Impact'] uppercase break-words meme-text">
                {bottomText}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="max-w-sm mx-auto space-y-4">
            <input
              type="text"
              placeholder="Top Text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              className="w-full p-4 bg-primary/10 border-2 border-primary rounded-lg text-white focus:outline-none focus:border-accent"
            />
            <input
              type="text"
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              className="w-full p-4 bg-primary/10 border-2 border-primary rounded-lg text-white focus:outline-none focus:border-accent"
            />
            <div className="flex gap-4">
              <MotionButton
                onClick={downloadMeme}
                className="flex-1 p-4 bg-primary text-background font-press-start rounded-lg hover:bg-accent transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download
              </MotionButton>
              <MotionButton
                onClick={shareOnX}
                className="flex-1 p-4 bg-black text-white font-press-start rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Share on
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </MotionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator; 