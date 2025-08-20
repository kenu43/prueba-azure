import { nanoid } from 'nanoid';

const FilaDatos = ({ datos }: { datos: string[] | number[] }) => {
  return (
    <>
      {datos.map((val) => (
        <td key={nanoid()}>{val}</td>
      ))}
    </>
  );
};

export default FilaDatos;
