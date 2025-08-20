import estilos from '../../estilos/TarjetaElementoEPP.module.css';

type Props = {
  elemento: { codigo: string; label: string; imagen: string };
};

const TarjetaElementoEPP = ({ elemento }: Props) => (
  <article className={estilos.card}>
    <img src={elemento.imagen} alt={elemento.label} />
    <h4>{elemento.label}</h4>
  </article>
);

export default TarjetaElementoEPP;
