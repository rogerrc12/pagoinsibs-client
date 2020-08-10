import { useState, useEffect } from 'react';

export default () => {
  const [scrollPosition, setScrollPosition] = useState(null);
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    document.addEventListener('scroll', handleScroll);
    return () =>
      document.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollPosition;
}