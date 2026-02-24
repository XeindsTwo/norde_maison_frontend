import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigationType} from 'react-router-dom';

export const useRouteLoading = (delay = 600) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [loading, setLoading] = useState(false);
  const [justNavigated, setJustNavigated] = useState(false);
  const prevPathRef = useRef(location.pathname);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    const currentPath = location.pathname;
    let timeoutId;

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      setLoading(true);
      timeoutId = setTimeout(() => setLoading(false), delay);
      return () => timeoutId && clearTimeout(timeoutId);
    }

    if (prevPathRef.current === currentPath) {
      return;
    }

    prevPathRef.current = currentPath;

    if (navigationType === 'POP') {
      return;
    }

    setLoading(true);
    setJustNavigated(true);

    timeoutId = setTimeout(() => {
      setLoading(false);
    }, delay);

    const cooldownId = setTimeout(() => {
      setJustNavigated(false);
    }, 600);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(cooldownId);
    };
  }, [location.pathname, navigationType, delay]);

  return { loading, justNavigated };
};