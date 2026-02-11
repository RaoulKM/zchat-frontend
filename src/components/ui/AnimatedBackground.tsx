import React, { useState } from "react";
import {
  MessageCircle,
  Mail,
  Send,
  Users,
  Bell,
  Heart,
  Camera,
  Image as ImageIcon,
  Video,
  Music,
  Gamepad2,
  Pizza,
  Car,
  Plane,
  Gift,
  Coffee,
  Book,
  Lightbulb,
  Star,
} from "lucide-react";

const ICON_COMPONENTS = [
  MessageCircle,
  Mail,
  Send,
  Users,
  Bell,
  Heart,
  Camera,
  ImageIcon,
  Video,
  Music,
  Gamepad2,
  Pizza,
  Car,
  Plane,
  Gift,
  Coffee,
  Book,
  Lightbulb,
  Star,
];

const AnimatedBackground = () => {
  const [icons] = useState(() =>
    Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      Icon: ICON_COMPONENTS[i % ICON_COMPONENTS.length],
      size: Math.floor(Math.random() * 15) + 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.08 + 0.05,
    })),
  );

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
      {icons.map(({ id, Icon, size, left, top, duration, delay, opacity }) => (
        <div
          key={id}
          className="absolute animate-float-drift will-change-transform"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDuration: `${duration}s`,
            animationDelay: `-${delay}s`,
            opacity: opacity,
          }}
        >
          <Icon size={size} color="#000" strokeWidth={1.5} />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
