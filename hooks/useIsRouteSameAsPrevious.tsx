import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * @description Custom hook that returns true if the previous route is equal to the current route
 * @returns {boolean} - true if the previous route is equal to the current route
 */
export const useIsRouteSameAsPrevious = (): boolean => {
  const router = useRouter();
  const prevRouteRef = useRef(router.asPath);

  useEffect(() => {
    prevRouteRef.current = router.asPath;
  }, [router.asPath]);

  console.log('prevRouteRef.current', prevRouteRef.current);
  console.log('router.asPath', router.asPath);
  
  return prevRouteRef.current === router.asPath;
};
