import { type ReactNode, type ElementType } from 'react';
import { useInView } from '../hooks/useInView';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  as?: ElementType;
  className?: string;
}

const translateMap = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: 'translate-x-6',
  right: '-translate-x-6',
  none: '',
} as const;

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  as: Tag = 'div',
  className = '',
}: FadeInProps) {
  const { ref, isInView } = useInView();

  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${translateMap[direction]}`
      } ${className}`}
      style={delayStyle}
    >
      {children}
    </Tag>
  );
}
