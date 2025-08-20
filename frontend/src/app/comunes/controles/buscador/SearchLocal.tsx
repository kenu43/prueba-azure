import { useDebounce } from '@uidotdev/usehooks';
import { useMemo, useState } from 'react';

import NotFoundItems from 'app/comunes/controles/buscador/NotFoundItems';
import { DocumentIcon, EraserIcon } from 'app/comunes/controles/buscador/recursos/Iconografia';

import resultStyles from './estilos/StyleResultsLocal.module.css';
import styles from './estilos/StylesSearchLocal.module.css';

type OptionsType = {
  codigo: string;
  label: string;
};

type Props = {
  title: string;
  options: OptionsType[];
  onSelect: (e: OptionsType) => void;
  onClose: () => void;
};

const SearchLocal = ({ title, options, onSelect, onClose }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredOptions = useMemo(() => {
    if (!debouncedSearchTerm)
      return [];

    const search = debouncedSearchTerm?.toLowerCase?.() ?? '';

    return options
      .filter((opcion) => {
        const label = opcion.label?.toLowerCase?.() ?? '';
        return label.includes(search);
      })
      .slice(0, 10);
  }, [debouncedSearchTerm, options]);

  return (
    <main className={styles.search_container}>
      <div className={styles.header_container}>
        <h1 className={styles.search_title}>{title}</h1>
      </div>

      <section className={styles.search_input_container}>
        <input
          value={searchTerm}
          placeholder="Escribe el nombre"
          className={styles.search_input}
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <EraserIcon onClick={() => setSearchTerm('')} />
      </section>

      {debouncedSearchTerm === ''
        ? null
        : filteredOptions.length === 0
          ? (
              <NotFoundItems />
            )
          : (
              <section className={resultStyles.results_container}>
                <p className={resultStyles.results_total}>
                  {filteredOptions.length}
                  {' '}
                  resultados encontrados
                </p>
                {filteredOptions.map(opcion => (
                  <div
                    key={opcion.codigo}
                    className={resultStyles.results_text_container}
                  >
                    <DocumentIcon className={resultStyles.icono} />
                    <p className={resultStyles.results_text}>{opcion.label}</p>
                    <h5
                      className={resultStyles.results_selection}
                      onClick={() => {
                        onSelect(opcion);
                        onClose();
                      }}
                    >
                      Seleccionar
                    </h5>
                  </div>
                ))}
              </section>
            )}
    </main>
  );
};

export default SearchLocal;
