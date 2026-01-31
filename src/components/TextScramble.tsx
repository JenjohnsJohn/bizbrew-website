import { useState, useCallback } from 'react';

interface TextScrambleProps {
  children: string;
  className?: string;
  scrambleChars?: string;
}

const defaultScrambleChars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({
  children,
  className = '',
  scrambleChars = defaultScrambleChars,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const originalText = children;
    const length = originalText.length;
    let iteration = 0;
    const maxIterations = length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) {
              return originalText[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    }, 30);
  }, [children, isScrambling, scrambleChars]);

  return (
    <span
      className={`inline-block font-mono ${className}`}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
}
