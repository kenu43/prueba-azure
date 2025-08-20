import { useEffect, useState } from 'react';
import Toast from 'comunes/informativos/Notificaciones';
import Condicional from 'comunes/funcionales/Condicional';
import { Parrafo, Subtitulo, Titulo } from 'comunes/estilos/EstComunes';
import Toggle from 'comunes/controles/Toggle';
import { SAVE_TOKEN } from 'app/interfaz/barra-lateral/peticiones/Mutations';
import { useMutation } from '@apollo/client';

import { ContActivarMensajeria, ContMensajeria, ContTituloMensMod } from '../estilos/EstPerfil';
import { ContImagenUrlMensa } from '../estilos/EstMensajeria';

const Mensajeria = () => {
	// const [url, setUrl] = useState([]);
	const [estados, setEstados] = useState(Notification.permission === 'granted');

	const [tokenRev, setToken] = useState(0);
	const [saveToken] = useMutation(SAVE_TOKEN, {
		onError: (e) => {
			Toast(e.message, 'error');
		},
	});

	const instructivo = {
		paso1:
			'https://firebasestorage.googleapis.com/v0/b/perenco-apps.appspot.com/o/instructivoNotificacion%2FPaso1.png?alt=media&token=02e770c2-cffd-43e2-9c8a-10809b175161',
		paso2:
			'https://firebasestorage.googleapis.com/v0/b/perenco-apps.appspot.com/o/instructivoNotificacion%2FPaso2.png?alt=media&token=d1f5ae61-1253-4326-ab4a-83b1f029eaa7',
		paso3:
			'https://firebasestorage.googleapis.com/v0/b/perenco-apps.appspot.com/o/instructivoNotificacion%2FPaso3.png?alt=media&token=23870b47-60dd-46d8-b78b-aae706e05cdf',
		paso4:
			'https://firebasestorage.googleapis.com/v0/b/perenco-apps.appspot.com/o/instructivoNotificacion%2FPaso4.png?alt=media&token=0c11d241-30e2-42c4-aed3-494b7a0fcdd0',
		paso1Bloqueado:
			'https://firebasestorage.googleapis.com/v0/b/perenco-apps.appspot.com/o/instructivoNotificacion%2FPaso1Bloqueada.png?alt=media&token=efe8466d-2ea8-4824-9ad7-763508250d91',
	};

	useEffect(() => {
		console.log();
	}, [estados]);

	return (
		<ContMensajeria>
			<ContTituloMensMod
				style={{
					color:
						Notification.permission === 'granted'
							? 'var(--color-add-green-6)'
							: 'var(--color-add-red-1)',
				}}
			>
				Mensajeria
			</ContTituloMensMod>
			<ContActivarMensajeria>
				<Parrafo style={{ color: 'var(--gray-11)' }}>
					{Notification.permission === 'granted'
						? 'Tiene las notificaciones activadas'
						: 'Tiene las notificaciones desactivadas'}
				</Parrafo>
				<Toggle
					label=''
					horizontal
					name='activo'
					checked={Notification.permission === 'granted'}
					onChange={() => {
						setEstados(!estados);
						const estadoActual = !estados;

						if (estadoActual) {
							Notification.requestPermission().then((permission) => {
								if (permission === 'granted') {
									if (tokenRev === 0) {
										saveToken({ variables: { token: '' } });
										setToken(1);
										localStorage.setItem('activarNotificación', 'true');
									}
									setEstados(true);
									Toast('Activa la mensajería', 'exitoso');
								} else {
									setEstados(false);

									Toast('Se bloqueó la mensajería', 'exitoso');
								}
							});
						}
					}}
				/>
			</ContActivarMensajeria>
			<Condicional condicion={!estados && Notification.permission === 'granted'}>
				<Titulo>Manual para desactivar las notificaciones </Titulo>
				<Subtitulo style={{ textAlign: 'justify', padding: '1em 0em' }}>Paso 1</Subtitulo>
				<ContImagenUrlMensa src={instructivo.paso1} alt='Imagen usuario1' />
				<Subtitulo style={{ textAlign: 'justify', padding: '1em 0em' }}>Paso 2</Subtitulo>
				<ContImagenUrlMensa src={instructivo.paso2} alt='Imagen usuario2' />
				<Subtitulo style={{ textAlign: 'justify', padding: '1em 0em' }}>Paso 3</Subtitulo>
				<ContImagenUrlMensa src={instructivo.paso3} alt='Imagen usuario3' />
				<Subtitulo style={{ textAlign: 'justify', padding: '1em 0em' }}>Paso 4</Subtitulo>
				<ContImagenUrlMensa src={instructivo.paso4} alt='Imagen usuario4' />
			</Condicional>
			<Condicional condicion={!estados && Notification.permission === 'denied'}>
				{' '}
				<Titulo>Manual para activar las notificaciones bloqueadas </Titulo>
				<Subtitulo style={{ textAlign: 'justify', padding: '1em 0em' }}>Paso 1</Subtitulo>
				<ContImagenUrlMensa src={instructivo.paso1} alt='Imagen usuario1' />
				<Subtitulo style={{ textAlign: 'justify', padding: '1em 0em' }}>Paso 2</Subtitulo>
				<ContImagenUrlMensa src={instructivo.paso1Bloqueado} alt='Imagen usuario2' />
				<Subtitulo style={{ textAlign: 'justify', padding: '1em 0em' }}>Paso 3</Subtitulo>
				<ContImagenUrlMensa src={instructivo.paso3} alt='Imagen usuario3' />
			</Condicional>
		</ContMensajeria>
	);
};
export default Mensajeria;
