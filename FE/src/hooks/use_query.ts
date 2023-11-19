import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQuery = () => {
  const [search, setSearch] = useSearchParams();
  const query: any = useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]);

  return [query, setSearch];
};
