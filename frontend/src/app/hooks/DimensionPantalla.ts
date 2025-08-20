import { useEffect, useState } from 'react';

/**
 * Hook que evalúa una media query CSS y retorna `true` si se cumple, `false` si no.
 *
 * @param {string} query - Media query CSS válida (ej: "(max-width: 768px)")
 * @returns  `true` si se cumple, `false` si no.
 */

const useDimensionPantalla = (query: string) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export default useDimensionPantalla;
