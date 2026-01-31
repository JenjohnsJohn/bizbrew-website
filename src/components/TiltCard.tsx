import { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 15,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount;
    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    if (glare) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      
      gsap.to(glare, {
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(217, 154, 77, ${glareOpacity}) 0%, transparent 60%)`,
        duration: 0.3,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const card = cardRef.current;
    const glare = glareRef.current;
    
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    
    if (glare) {
      gsap.to(glare, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none rounded-inherit transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          borderRadius: 'inherit',
        }}
      />
    </div>
  );
}
