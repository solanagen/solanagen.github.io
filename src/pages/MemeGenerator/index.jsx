import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [imageScale, setImageScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const templateDropdownRef = useRef(null);
  const backgroundDropdownRef = useRef(null);

  const [backgrounds, setBackgrounds] = useState([
    { src: '/backgrounds/1.png', name: 'Background 1' },
    { src: '/backgrounds/2.png', name: 'Background 2' },
    { src: '/backgrounds/3.png', name: 'Background 3' },
    { src: '/backgrounds/4.png', name: 'Background 4' },
    { src: '/backgrounds/5.png', name: 'Background 5' },
  ]);

  // Reset position when template changes
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [selectedTemplate]);

  // Handle drag start
  const handleDragStart = (e) => {
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

    setIsDragging(true);
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging) return;

    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const canvasRect = canvas.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();

    // Calculate boundaries
    const maxX = (canvasRect.width - imageRect.width * imageScale) / 2;
    const maxY = (canvasRect.height - imageRect.height * imageScale) / 2;
    const minX = -maxX;
    const minY = -maxY;

    // Calculate new position
    let newX = clientX - dragStart.x;
    let newY = clientY - dragStart.y;

    // Apply boundaries
    newX = Math.min(Math.max(newX, minX), maxX);
    newY = Math.min(Math.max(newY, minY), maxY);

    setPosition({ x: newX, y: newY });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Add event listeners for drag
  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleTouchMove = (e) => {
      e.preventDefault();
      handleDragMove(e);
    };
    const handleUp = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, dragStart, imageScale]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (templateDropdownRef.current && !templateDropdownRef.current.contains(event.target)) {
        setIsTemplateOpen(false);
      }
      if (backgroundDropdownRef.current && !backgroundDropdownRef.current.contains(event.target)) {
        setIsBackgroundOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const templates = [
    { src: '/100x_pepe.png', name: '100x' },
    { src: '/angry_pepe.png', name: 'Angry' },
    { src: '/angry2_pepe.png', name: 'Angry 2' },
    { src: '/chill_pepe.png', name: 'Chill' },
    { src: '/CLOWN.png', name: 'Clown' },
    { src: '/computerrstik.png', name: 'Computer' },
    { src: '/COOL.png', name: 'Cool' },
    { src: '/drooling_pepe.png', name: 'Drooling' },
    { src: '/excited_pepe.png', name: 'Excited' },
    { src: '/feelsgood.png', name: 'Feels Good' },
    { src: '/gm_coffee_pepe.png', name: 'GM Coffee' },
    { src: '/green_candle_pepe.png', name: 'Green Candle' },
    { src: '/horny_pepe.png', name: 'Horny' },
    { src: '/lookup.png', name: 'Look Up' },
    { src: '/love_pepe.png', name: 'Love' },
    { src: '/me_question_mark_pepe_or_shy.png', name: 'Shy' },
    { src: '/on floorst.png', name: 'On Floor' },
    { src: '/peeking_pepe.png', name: 'Peeking' },
    { src: '/pog.png', name: 'Pog' },
    { src: '/rofl_pepe.png', name: 'ROFL' },
    { src: '/sleep_pepe.png', name: 'Sleep' },
    { src: '/smokingSTIK.png', name: 'Smoking' },
    { src: '/sniping_pepe.png', name: 'Sniping' },
    { src: '/surprised_pepe.png', name: 'Surprised' },
    { src: '/thoughtful_pepe.png', name: 'Thoughtful' },
    { src: '/typing_pepe.png', name: 'Typing' },
    { src: '/unimpressed_pepe.png', name: 'Unimpressed' },
    { src: '/victory_pepe.png', name: 'Victory' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  // Handle file upload for custom background
  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Create object URL for the uploaded file
    const objectUrl = URL.createObjectURL(file);
    
    // Add the uploaded background to the list
    setBackgrounds(prev => [{
      src: objectUrl,
      name: file.name,
      isCustom: true
    }, ...prev]);

    // Select the uploaded background
    setSelectedBackground(objectUrl);
    setIsBackgroundOpen(false);
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      backgrounds.forEach(bg => {
        if (bg.isCustom) {
          URL.revokeObjectURL(bg.src);
        }
      });
    };
  }, [backgrounds]);

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
    const tweetText = "Created with @autism_intel_ai Meme Generator 🧠\n\n$AI #AutismIntelligence";

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

  const handleScaleReset = () => {
    setImageScale(1);
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
      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr,300px] gap-8">
        {/* Left Column - Template and Background Selector */}
        <div className="space-y-8">
          {/* Template Selector */}
          <div className="bg-primary/10 rounded-xl p-6" ref={templateDropdownRef}>
            <h3 className="font-press-start mb-6">Choose Template</h3>
            <div className="relative">
              <MotionButton
                onClick={() => setIsTemplateOpen(!isTemplateOpen)}
                className="w-full p-4 border-2 border-primary rounded-lg flex items-center gap-4 transition-all hover:bg-primary/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={selectedTemplate}
                  alt="Selected template"
                  className="w-12 h-12 object-contain"
                />
                <span className="font-press-start text-sm">
                  {templates.find(t => t.src === selectedTemplate)?.name}
                </span>
                <svg
                  className={`w-4 h-4 ml-auto transition-transform ${isTemplateOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </MotionButton>

              <AnimatePresence>
                {isTemplateOpen && (
                  <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-primary rounded-lg shadow-lg z-50 max-h-[350px] overflow-y-auto"
                  >
                    {templates.map((template, index) => (
                      <MotionButton
                        key={index}
                        onClick={() => {
                          setSelectedTemplate(template.src);
                          setIsTemplateOpen(false);
                        }}
                        className={`w-full p-4 flex items-center gap-4 transition-all ${
                          selectedTemplate === template.src
                            ? 'bg-primary text-background'
                            : 'hover:bg-primary/20'
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
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Background Selector */}
          <div className="bg-primary/10 rounded-xl p-6" ref={backgroundDropdownRef}>
            <h3 className="font-press-start mb-6">Choose Background</h3>
            <div className="relative">
              <MotionButton
                onClick={() => setIsBackgroundOpen(!isBackgroundOpen)}
                className="w-full p-4 border-2 border-primary rounded-lg flex items-center gap-4 transition-all hover:bg-primary/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedBackground ? (
                  <img
                    src={selectedBackground}
                    alt="Selected background"
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                    ❌
                  </div>
                )}
                <span className="font-press-start text-sm">
                  {selectedBackground 
                    ? backgrounds.find(b => b.src === selectedBackground)?.name 
                    : 'No Background'}
                </span>
                <svg
                  className={`w-4 h-4 ml-auto transition-transform ${isBackgroundOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </MotionButton>

              <AnimatePresence>
                {isBackgroundOpen && (
                  <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-primary rounded-lg shadow-lg z-50 max-h-[350px] overflow-y-auto"
                  >
                    {/* Upload button */}
                    <label className="block w-full p-4 cursor-pointer hover:bg-primary/20 transition-colors border-b-2 border-primary/20">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundUpload}
                        className="hidden"
                      />
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="font-press-start text-sm">Upload Background</span>
                      </div>
                    </label>

                    <MotionButton
                      onClick={() => {
                        setSelectedBackground(null);
                        setIsBackgroundOpen(false);
                      }}
                      className={`w-full p-4 flex items-center gap-4 transition-all ${
                        selectedBackground === null
                          ? 'bg-primary text-background'
                          : 'hover:bg-primary/20'
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
                        onClick={() => {
                          setSelectedBackground(bg.src);
                          setIsBackgroundOpen(false);
                        }}
                        className={`w-full p-4 flex items-center gap-4 transition-all ${
                          selectedBackground === bg.src
                            ? 'bg-primary text-background'
                            : 'hover:bg-primary/20'
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
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Middle Column - Meme Canvas */}
        <div className="flex items-center justify-center">
          <div
            ref={canvasRef}
            className="relative w-full max-w-2xl rounded-xl overflow-hidden select-none"
            style={{ 
              backgroundColor: selectedBackground ? 'transparent' : '#ffffff',
              aspectRatio: '1 / 1'
            }}
          >
            {/* Background Layer */}
            {selectedBackground ? (
              <img
                src={selectedBackground}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-white" />
            )}
            <div className="absolute inset-0 bg-black/5" />

            {/* Draggable Image Layer */}
            <div 
              className="relative z-10 w-full h-full cursor-move"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              style={{
                touchAction: 'none' // Prevent touch scrolling while dragging
              }}
            >
              <img
                ref={imageRef}
                src={selectedTemplate}
                alt="Meme template"
                className="absolute w-full h-full object-contain transition-all duration-200"
                style={{ 
                  filter: selectedBackground ? 'contrast(1.2) brightness(0.9)' : 'none',
                  mixBlendMode: selectedBackground ? 'multiply' : 'normal',
                  transform: `translate(${position.x}px, ${position.y}px) scale(${imageScale})`,
                  transformOrigin: 'center'
                }}
                draggable="false"
              />
            </div>

            {/* Text Overlay Layer */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-4 left-0 right-0 px-4 text-center">
                <p className="text-white text-4xl font-['Impact'] uppercase break-words meme-text">
                  {topText}
                </p>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                <p className="text-white text-4xl font-['Impact'] uppercase break-words meme-text">
                  {bottomText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Controls */}
        <div className="space-y-8">
          {/* Text Controls */}
          <div className="bg-primary/10 rounded-xl p-6 space-y-4">
            <h3 className="font-press-start mb-6">Customize Meme</h3>
            
            {/* Size Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-press-start">Image Size</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setPosition({ x: 0, y: 0 })}
                    className="text-xs font-press-start text-primary hover:text-accent transition-colors"
                  >
                    Reset Position
                  </button>
                  <button
                    onClick={handleScaleReset}
                    className="text-xs font-press-start text-primary hover:text-accent transition-colors"
                  >
                    Reset Size
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={imageScale}
                  onChange={(e) => setImageScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-accent"
                />
                <span className="text-xs font-press-start w-12 text-right">
                  {Math.round(imageScale * 100)}%
                </span>
              </div>
            </div>

            {/* Text Inputs */}
            <div className="space-y-4">
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-primary/10 rounded-xl p-6 space-y-4">
            <h3 className="font-press-start mb-6">Share Your Meme</h3>
            <MotionButton
              onClick={downloadMeme}
              className="w-full p-4 bg-primary text-background font-press-start rounded-lg hover:bg-accent transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download
            </MotionButton>
            <MotionButton
              onClick={shareOnX}
              className="w-full p-4 bg-black text-white font-press-start rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
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
  );
};

export default MemeGenerator; 