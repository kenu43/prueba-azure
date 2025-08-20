import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

import useAlgolia from 'hooks/Algolia';

import type { SearchProps } from './types/SearchTypes';

import styles from './estilos/StylesSearch.module.css';
import { EraserIcon } from './recursos/Iconografia';
import Results from './Results';

const SearchComponent = ({
  algoliaIndex,
  title,
  returnAlgoliaValue,
}: SearchProps) => {
  const { loading, datos, consulta } = useAlgolia({
    indexName: algoliaIndex,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 350);

  useEffect(() => {
    if (searchTerm !== '') {
      consulta(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <main className={styles.search_container}>
      <div className={styles.header_container}>
        <h1 className={styles.search_title}>{title}</h1>
      </div>
      <section className={styles.search_input_container}>
        <input
          value={searchTerm}
          placeholder="Escriba una palabra clave"
          className={styles.search_input}
          type="text"
          onChange={text => setSearchTerm(text.target.value)}
        />
        <EraserIcon onClick={() => setSearchTerm('')} />
      </section>
      <Results
        data={datos}
        searchWord={searchTerm}
        loading={loading}
        callback={returnAlgoliaValue}
      />
    </main>
  );
};

export default SearchComponent;
