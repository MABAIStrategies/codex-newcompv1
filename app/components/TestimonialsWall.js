'use client';

import { motion } from 'framer-motion';

const videos = [
  { name: 'Amelia — Fortune 100 Ops', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
  { name: 'Rahul — PE Partner', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
  { name: 'Sofia — Luxury Retail', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
];

export default function TestimonialsWall() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {videos.map((video) => (
        <motion.div
          key={video.name}
          className="relative overflow-hidden rounded-2xl border border-gold/30 glass"
          whileHover={{ boxShadow: '0 20px 60px rgba(212,175,55,0.25)', translateY: -4 }}
        >
          <video
            src={video.src}
            muted
            loop
            playsInline
            className="w-full h-60 object-cover"
            onMouseOver={(e) => e.currentTarget.play()}
            onMouseOut={(e) => e.currentTarget.pause()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-gold text-sm">Video Testimonial</p>
            <p className="text-xl font-semibold">{video.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
