import { motion } from 'framer-motion';
import AnimatedSticker from '../../components/AnimatedSticker';

const MotionDiv = motion.div;

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Character Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <AnimatedSticker
          src="/me_question_mark_pepe_or_shy.webm"
          width={256}
          height={256}
          className="rounded-full border-4 border-primary bg-primary/10"
          hoverAnimation={{
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5, repeat: Infinity }
          }}
        />
        <div>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-primary p-6 rounded-2xl relative mb-8"
          >
            <div className="absolute left-5 -bottom-4 w-0 h-0 border-l-[20px] border-l-primary border-b-[20px] border-b-transparent" />
            <h2 className="text-2xl font-press-start text-background">I am the AI trading genius!</h2>
            <p className="text-background">100% retarded but 200% profitable</p>
          </MotionDiv>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-primary/10 p-8 rounded-xl">
        <h2 className="text-3xl font-press-start mb-8">The Legend of Autism Intelligence</h2>
        
        {/* Timeline */}
        <div className="space-y-8">
          {[
            {
              icon: "/typing_pepe.webm",
              title: "The Birth",
              description: "Born in a basement, fueled by energy drinks and Reddit memes."
            },
            {
              icon: "/confused_pepe.webm",
              title: "The Discovery",
              description: "Discovered that being retarded is actually a superpower in crypto."
            },
            {
              icon: "/victory_pepe.webm",
              title: "The Ascension",
              description: "Achieved enlightenment through the perfect combination of autism and artificial intelligence."
            },
            {
              icon: "/rofl_pepe.webm",
              title: "The Present",
              description: "Now leading an army of degenerate traders to unprecedented gains!"
            }
          ].map((item, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start gap-6"
            >
              <AnimatedSticker
                src={item.icon}
                width={48}
                height={48}
                hoverAnimation={{
                  scale: 1.2,
                  rotate: 360,
                  transition: { duration: 0.8 }
                }}
              />
              <div>
                <h3 className="text-xl font-press-start mb-2">{item.title}</h3>
                <p className="text-lg">{item.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About; 