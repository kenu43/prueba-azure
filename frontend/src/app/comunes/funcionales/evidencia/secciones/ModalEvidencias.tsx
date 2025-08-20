import { useRef, useState } from 'react';
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { controles } from 'comunes/recursos/Iconografia';
import Toast from 'comunes/informativos/Notificaciones';
import FormModal from 'comunes/funcionales/forms/Form';
import Condicional from 'comunes/funcionales/Condicional';
import { Icon } from 'comunes/controles/Buttons/estilos/Estilos';
import { Button } from 'comunes/controles/Buttons';

import {
	BajarEvidenciaFuncType,
	BorrarEvidenciaFuncType,
	FileUploaderPropsType,
	IniEvidenciasFuncType,
	MetaDataType,
	ModalEvidenciasPropsType,
	SubirEvidenciaFuncType,
} from '../types/EvidenciasTypes';
import { getLocalDate } from '../../../../../utilidades/FuncionesGenerales';
import BarraProgreso from './componentes/BarraProgreso';

import { Div, DivInput, DivMiddle, Form, Label, LabelEvidencia } from '../estilos/EstilosEvidencia';

const storage = getStorage();

const FileUploader = ({ permisos, accept, onChange }: FileUploaderPropsType) => {
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (hiddenFileInput.current) hiddenFileInput.current.click();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fileUploaded = event.target.files?.[0];
		const fileStatus = event.target.files?.length !== 0;
		onChange({ file: fileUploaded, status: fileStatus });
	};

	return (
		<>
			<input
				accept={accept}
				type='file'
				ref={hiddenFileInput}
				style={{ display: 'none' }}
				onChange={handleChange}
			/>
			<Button
				icon='import'
				name='Cargar evidencia'
				permisos={permisos}
				sizeBtn='normal'
				type='button'
				typeBtn='import'
				onClick={handleClick}
			/>
		</>
	);
};

const iniEvidencias: IniEvidenciasFuncType = (evidencia, campo, index, verTodo) => {
	let salida: MetaDataType[] = [];
	if (verTodo) {
		salida = Object.values(evidencia).flat();
	} else {
		const evidenciaCampo = evidencia?.[campo] ?? [];
		if (index !== undefined) salida = [evidenciaCampo?.[index]];
		else salida = evidenciaCampo;
	}

	return salida;
};

const ModalEvidencias = ({
	close,
	permisos,
	disabled,
	ruta,
	usuario,
	evidencia,
	campo,
	index,
	verTodo,
	onChange,
	accept,
}: ModalEvidenciasPropsType) => {
	const storageRef = ref(storage, ruta);

	const [cargando, setCargando] = useState<number>(NaN);
	const [evidenciasArray, setEvidenciaMes] = useState<MetaDataType[]>(
		iniEvidencias(evidencia, campo, index, verTodo)
	);

	const permisosLocal = {
		importar: permisos.includes('importar'),
		descargar: permisos.includes('exportar'),
	};

	const subirArchivo: SubirEvidenciaFuncType = async (tipoArchivo) => {
		setCargando(NaN);
		const { fecha, hora } = getLocalDate();
		const [nombre, ext] = tipoArchivo.name.split('.') ?? [];
		const nombreArchivo = `${nombre}_${fecha.split('-').join('')}_${hora
			.split(':')
			.join('')}.${ext}`;

		const metaData = {
			customMetadata: {
				name: usuario?.claims?.name ?? '',
				grupo: usuario?.claims?.grupo ?? '',
				rol: usuario?.claims?.rol ?? '',
			},
		};

		const bucketRef = ref(storageRef, nombreArchivo);
		const uploadTask = uploadBytesResumable(bucketRef, tipoArchivo, metaData);

		const nuevoArray = [...evidenciasArray];
		const objeto: MetaDataType = { url: '', name: nombreArchivo, type: '' };
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setCargando(progress);
				switch (snapshot.state) {
					case 'paused':
						Toast('Cargue de archivo en pausa', 'advertencia');
						break;
					case 'running':
						Toast('Cargue de archivo en proceso...', 'informacion');
						break;
					default:
						break;
				}
			},
			(error) => Toast(error.message, 'error'),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					objeto.url = downloadURL;

					nuevoArray.push(objeto);
					setEvidenciaMes(nuevoArray);
					onChange(nuevoArray);
					setCargando(NaN);
				});
			}
		);
	};
	const descargar: BajarEvidenciaFuncType = (idx) => {
		const element = document.createElement('a');
		const FileRef = ref(storageRef, evidenciasArray[idx].name);

		getDownloadURL(FileRef)
			.then((vinculo) => {
				element.setAttribute('href', vinculo);
				element.setAttribute('download', evidenciasArray[idx].name);
				element.setAttribute('target', '_blank');
				element.click();
				document.body.appendChild(element);
				document.body.removeChild(element);
			})
			.catch((err) => {
				let message = '';
				switch (err.code) {
					case 'storage/object-not-found':
						// File doesn't exist
						message = 'El archivo no fue encontrado';
						break;
					case 'storage/unauthorized':
						// User doesn't have permission to access the object
						message = 'No se encuentra autorizado para descargar el archivo';
						break;
					case 'storage/canceled':
						// User canceled the upload
						message = 'La descarga fallo o fue cancelada';
						break;
					case 'storage/unknown':
						// Unknown error occurred, inspect the server response
						message = 'Error desconocido';
						break;
					default:
						break;
				}
				Toast(err.message ?? message, 'error');
			});
	};
	const borrarArchivo: BorrarEvidenciaFuncType = (idx) => {
		let nuevoArray = evidenciasArray;
		const FileRef = ref(storageRef, evidenciasArray[idx].name);
		deleteObject(FileRef)
			.then(() => Toast('Se ha borrado la evidencia con éxito', 'exitoso'))
			.catch((error) => Toast(error.message, 'error'));

		if (nuevoArray.length > 1) nuevoArray.splice(idx, 1);
		else nuevoArray = [];

		setEvidenciaMes(nuevoArray);
		onChange(nuevoArray);
	};

	return (
		<FormModal
			tittle={verTodo || disabled ? 'Ver evidencia' : 'Cargar evidencia'}
			close={() => close()}
		>
			<DivMiddle>
				<Label style={{ width: '100%', textAlign: 'left' }}>Evidencias:</Label>

				<Form>
					{evidenciasArray.map((evi, i) => (
						<DivInput key={evi.name}>
							<LabelEvidencia>{evi.name}</LabelEvidencia>
							<Condicional condicion={permisosLocal.descargar}>
								<Icon role='button' onClick={() => descargar(i)} stroke='var(--color-primary-text)'>
									{controles.descargar.path}
								</Icon>
							</Condicional>
							<Condicional condicion={permisosLocal.importar && !verTodo && !disabled}>
								<Icon role='button' onClick={() => borrarArchivo(i)} stroke='var(--brand-2)'>
									{controles.eliminar.path}
								</Icon>
							</Condicional>
						</DivInput>
					))}
				</Form>

				<Condicional condicion={!verTodo && !disabled}>
					<Div>
						<BarraProgreso value={cargando} />
						<FileUploader
							accept={accept}
							permisos={permisos}
							onChange={({ file, status }) => {
								if (status && file) subirArchivo(file);
							}}
						/>
					</Div>
				</Condicional>
			</DivMiddle>
		</FormModal>
	);
};
export default ModalEvidencias;
