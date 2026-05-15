/**
 * DEEPFENSE.ONLINE â€” TypewriterText
 * Hiá»‡u á»©ng Ä‘Ã¡nh mÃ¡y tá»«ng kÃ½ tá»± vá»›i cursor nháº¥p nhÃ¡y.
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
 */

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;      // ms per character
  delay?: number;      // ms before starting
  className?: string;
  showCursor?: boolean;
  onDone?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 45,
  delay = 0,
  className = '',
  showCursor = true,
  onDone,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let charIdx = 0;
    let startTimeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        charIdx++;
        setDisplayed(text.slice(0, charIdx));
        if (charIdx >= text.length) {
          clearInterval(interval);
          setDone(true);
          onDone?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, delay, onDone]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-[2px] h-[1em] bg-current ml-[1px] align-middle ${
            done ? 'animate-pulse' : 'opacity-100'
          }`}
          style={{ verticalAlign: '-0.1em' }}
        />
      )}
    </span>
  );
};

export default TypewriterText;
