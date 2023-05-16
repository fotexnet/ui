import { useEffect, useState } from 'react';

function useMediaQuery(mediaQuery: string): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>();

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEffect(() => {
    if (!mediaQueryList) return;

    const handler = (e: MediaQueryListEvent) => setIsMatch(e.matches);
    mediaQueryList.addEventListener('change', handler);

    return () => mediaQueryList.removeEventListener('change', handler);
  }, [mediaQueryList]);

  return isMatch;
}

export default useMediaQuery;
