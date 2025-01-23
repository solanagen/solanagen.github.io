import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSticker from '../../components/AnimatedSticker';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulating API loading time
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Meme card component to handle both static and animated content
  const MemeCard = ({ meme }) => {
    const isAnimated = meme.imageUrl.endsWith('.webm');

    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary/10 rounded-xl overflow-hidden hover:bg-primary/20 transition-colors group"
      >
        <div className="relative aspect-square">
          {isAnimated ? (
            <video
              src={meme.imageUrl}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={meme.imageUrl}
              alt={meme.title}
              className="w-full h-full object-cover"
            />
          )}
          {/* Hover overlay */}
          {/* <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="px-4 py-2 bg-primary text-background rounded-lg font-press-start text-sm hover:bg-accent transition-colors">
              View Full Size
            </button>
          </div> */}
          {isAnimated && (
            <div className="absolute top-2 right-2 bg-accent/80 text-xs font-press-start px-2 py-1 rounded">
              GIF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-press-start text-lg mb-2">{meme.title}</h3>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent">
                {meme.platform === 'X' ? '𝕏' : 'TG'}:
              </span>
              <span>{meme.author}</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:text-accent transition-colors">
                <span>👍</span>
                <span>{meme.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-accent transition-colors">
                <span>👎</span>
                <span>{meme.dislikes}</span>
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-accent">
            {new Date(meme.createdAt).toLocaleDateString()}
          </div>
        </div>
      </MotionDiv>
    );
  };

  // Comprehensive memes array with all available content
  const memes = [
    {
      id: 1,
      imageUrl: '/100x_pepe.png',
      title: 'When you hit that 100x',
      author: '@LuckyTrader',
      platform: 'X',
      likes: 2100,
      dislikes: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      imageUrl: '/angry_pepe.png',
      title: 'Market Manipulation Again',
      author: '@AngryHolder',
      platform: 'TG',
      likes: 1500,
      dislikes: 50,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      imageUrl: '/CLOWN.png',
      title: 'Me after panic selling',
      author: '@PanicSeller',
      platform: 'X',
      likes: 1337,
      dislikes: 21,
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      imageUrl: '/computerrstik.png',
      title: 'Trading with AI',
      author: '@AITrader',
      platform: 'TG',
      likes: 888,
      dislikes: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      imageUrl: '/COOL.png',
      title: 'When my trade is in profit',
      author: '@CoolTrader',
      platform: 'X',
      likes: 777,
      dislikes: 13,
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      imageUrl: '/drooling_pepe.png',
      title: 'Looking at those gains',
      author: '@DroolGang',
      platform: 'TG',
      likes: 444,
      dislikes: 12,
      createdAt: new Date().toISOString()
    },
    {
      id: 7,
      imageUrl: '/excited_pepe.png',
      title: 'New ATH incoming',
      author: '@ExcitedApe',
      platform: 'X',
      likes: 2222,
      dislikes: 11,
      createdAt: new Date().toISOString()
    },
    {
      id: 8,
      imageUrl: '/feelsgood.png',
      title: 'Green Portfolio Day',
      author: '@FeelsGoodMan',
      platform: 'TG',
      likes: 555,
      dislikes: 44,
      createdAt: new Date().toISOString()
    },
    {
      id: 9,
      imageUrl: '/green_candle_pepe.png',
      title: 'The Only Candle We Like',
      author: '@GreenCandle',
      platform: 'X',
      likes: 1111,
      dislikes: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: 10,
      imageUrl: '/horny_pepe.png',
      title: 'When AI Pumps',
      author: '@PumpChaser',
      platform: 'TG',
      likes: 696,
      dislikes: 69,
      createdAt: new Date().toISOString()
    },
    {
      id: 11,
      imageUrl: '/lookup.png',
      title: 'Watching the charts',
      author: '@ChartWatcher',
      platform: 'X',
      likes: 999,
      dislikes: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: 12,
      imageUrl: '/on floorst.png',
      title: 'Market Crash Position',
      author: '@FloorTrader',
      platform: 'TG',
      likes: 666,
      dislikes: 33,
      createdAt: new Date().toISOString()
    },
    {
      id: 13,
      imageUrl: '/pog.png',
      title: 'When AI pumps 100x',
      author: '@PogChamp',
      platform: 'X',
      likes: 1234,
      dislikes: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: 14,
      imageUrl: '/smokingSTIK.png',
      title: 'Chilling after gains',
      author: '@SmoothTrader',
      platform: 'TG',
      likes: 420,
      dislikes: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: 15,
      imageUrl: '/sniping_pepe.png',
      title: 'Sniping that bottom',
      author: '@BottomSniper',
      platform: 'X',
      likes: 1750,
      dislikes: 25,
      createdAt: new Date().toISOString()
    },
    // Animated memes
    {
      id: 16,
      imageUrl: '/confused_pepe.webm',
      title: 'Reading Crypto Twitter',
      author: '@ConfusedTrader',
      platform: 'X',
      likes: 888,
      dislikes: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: 17,
      imageUrl: '/cutie.webm',
      title: 'Wholesome AI Community',
      author: '@CutiePie',
      platform: 'TG',
      likes: 1234,
      dislikes: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: 18,
      imageUrl: '/relaxed-with-coffee-and-snowing-outside.webm',
      title: 'Cozy Trading Session',
      author: '@CozyTrader',
      platform: 'X',
      likes: 777,
      dislikes: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: 19,
      imageUrl: '/rofl_pepe.webm',
      title: 'Watching Shorts Get Rekt',
      author: '@LiquidationHunter',
      platform: 'TG',
      likes: 2500,
      dislikes: 100,
      createdAt: new Date().toISOString()
    },
    {
      id: 20,
      imageUrl: '/typing_pepe.webm',
      title: 'Writing My Trading Plan',
      author: '@StrategyMaster',
      platform: 'X',
      likes: 445,
      dislikes: 12,
      createdAt: new Date().toISOString()
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
          Meme Gallery
        </MotionH1>
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-accent mb-6"
        >
          The most autistic collection on the blockchain
        </MotionP>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://t.me/addstickers/AIonSOL"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
            </svg>
            <span className="font-press-start text-sm">Static Sticker Pack</span>
          </a>
          <a
            href="https://t.me/addstickers/AIonSOLanimated"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
            </svg>
            <span className="font-press-start text-sm">Animated Sticker Pack</span>
            <span className="bg-accent/80 text-xs font-press-start px-2 py-1 rounded">GIF</span>
          </a>
        </MotionDiv>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Loading state
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <AnimatedSticker
              src="/confused_pepe.webm"
              width={128}
              height={128}
              hover={false}
            />
            <p className="text-accent mt-4 font-press-start">Loading memes...</p>
          </div>
        ) : memes.length === 0 ? (
          // Empty state
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <AnimatedSticker
              src="/me_question_mark_pepe_or_shy.webm"
              width={128}
              height={128}
              hover={false}
            />
            <p className="text-accent mt-4 font-press-start">No memes yet...</p>
          </div>
        ) : (
          // Meme cards
          memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery; 