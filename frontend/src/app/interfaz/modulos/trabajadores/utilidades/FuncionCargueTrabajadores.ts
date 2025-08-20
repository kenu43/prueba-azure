import type { TrabajadorExcel } from '../types/CargueImportarTypes';

import {
  ENCABEZADOS_OBLIGATORIOS,
  ENCABEZADOS_OPCIONALES,
} from '../constantes/ConstantesCargue';

export function revisarEvidencia(
  evidencias: { url: string; nombre: string }[],
) {
  return evidencias.filter((evidencia) => {
    if (!evidencia.url || !evidencia.nombre)
      return false;
    const nombreLower = evidencia.nombre.toLowerCase();
    return nombreLower.endsWith('.xls') || nombreLower.endsWith('.xlsx');
  });
}

export type ResultadoValidacion = {
  fila: number;
  errores: string[];
};

export function validarTrabajadoresExcel(
  datos: TrabajadorExcel[],
): ResultadoValidacion[] {
  const errores: ResultadoValidacion[] = [];
  const cedulasVistas = new Set<string>();

  const normalizar = (texto: string) =>
    texto
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '');

  const opciones = {
    'tipo de documento': ['cc', 'ti', 'ce', 'pasaporte', ''],
    'genero': ['masculino', 'femenino'],
    'estado civil': [
      'soltero',
      'casado',
      'viudo',
      'divorciado',
      'separado',
      'union_libre',
      '',
    ],
    'numero de hijos': 'numero',
    'nivel educativo': [
      'primaria',
      'secundaria',
      'tecnica',
      'universitaria',
      'postgrado',
      'maestria',
      'doctorado',
      '',
    ],
    'tipo de cargo': ['administrativo', 'operativo'],
    'tipo de contrato': ['fijo', 'indefinido', 'prestacion'],
  };

  const encabezados = Object.keys(datos[0] || {}).map(normalizar);
  const faltantes = ENCABEZADOS_OBLIGATORIOS.filter(
    campo => !encabezados.includes(campo),
  );

  if (faltantes.length > 0) {
    errores.push({
      fila: 1,
      errores: [
        `La plantilla no es correcta. Faltan columnas: ${faltantes.join(', ')}`,
      ],
    });
    return errores;
  }

  const calcularEdad = (fechaNacimiento: string, fechaBase?: string) => {
    const nacimiento = new Date(fechaNacimiento);
    const base = fechaBase ? new Date(fechaBase) : new Date();
    let edad = base.getFullYear() - nacimiento.getFullYear();
    const mesDif = base.getMonth() - nacimiento.getMonth();
    if (mesDif < 0 || (mesDif === 0 && base.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return Number.isNaN(edad) ? -1 : edad;
  };

  const esFechaISOValida = (fecha: string): boolean => {
    const regexISO = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexISO.test(fecha))
      return false;
    const date = new Date(fecha);
    return !Number.isNaN(date.getTime()) && fecha === date.toISOString().split('T')[0];
  };

  datos.forEach((trabajador, index) => {
    const filaErrores: string[] = [];
    const fila = index + 2;

    const get = (clave: string) =>
      `${trabajador[clave as keyof TrabajadorExcel] ?? ''}`.trim();

    for (const campo of ENCABEZADOS_OBLIGATORIOS) {
      const valor = get(campo);
      if (!valor) {
        filaErrores.push(`Campo obligatorio "${campo}" vacío`);
      }
    }

    const cedula = get('cedula');
    if (cedula && cedulasVistas.has(cedula)) {
      filaErrores.push('Cédula duplicada');
    }
    else {
      cedulasVistas.add(cedula);
    }

    const fechaNacimiento = get('fecha de nacimiento');
    const fechaIngreso = get('fecha de ingreso');
    const fechaRetiro = get('fecha de retiro');

    if (fechaIngreso && !esFechaISOValida(fechaIngreso)) {
      filaErrores.push('Fecha de ingreso inválida (formato YYYY-MM-DD)');
    }

    if (fechaRetiro && !esFechaISOValida(fechaRetiro)) {
      filaErrores.push('Fecha de retiro inválida (formato YYYY-MM-DD)');
    }

    if (fechaNacimiento && !esFechaISOValida(fechaNacimiento)) {
      filaErrores.push('Fecha de nacimiento inválida (formato YYYY-MM-DD)');
    }

    if (fechaNacimiento && esFechaISOValida(fechaNacimiento)) {
      const edadActual = calcularEdad(fechaNacimiento);
      if (edadActual >= 0 && edadActual < 16) {
        filaErrores.push('Edad actual menor de 16 años');
      }
      if (fechaIngreso && esFechaISOValida(fechaIngreso)) {
        const edadIngreso = calcularEdad(fechaNacimiento, fechaIngreso);
        if (edadIngreso >= 0 && edadIngreso < 16) {
          filaErrores.push('Edad al ingresar menor de 16 años');
        }
      }
    }

    const validarCampoConOpciones = (
      campo: string,
      valor: string,
      opcionesValidas: string[],
    ) => {
      if (!opcionesValidas.includes(normalizar(valor))) {
        filaErrores.push(`"${campo}" inválido (valor no permitido)`);
      }
    };

    validarCampoConOpciones('genero', get('genero'), opciones.genero);
    validarCampoConOpciones(
      'tipo de cargo',
      get('tipo de cargo'),
      opciones['tipo de cargo'],
    );
    validarCampoConOpciones(
      'tipo de contrato',
      get('tipo de contrato'),
      opciones['tipo de contrato'],
    );

    for (const campo of ENCABEZADOS_OPCIONALES) {
      const valor = get(campo);
      const validacion = opciones[campo as keyof typeof opciones];

      if (!valor)
        continue;

      const valorNormalizado = normalizar(valor);

      if (validacion === 'numero') {
        const num = Number(valorNormalizado);
        if (Number.isNaN(num) || num < 0) {
          filaErrores.push(`"${campo}" inválido (debe ser número ≥ 0)`);
        }
      }
      else if (
        Array.isArray(validacion)
        && !validacion.includes(valorNormalizado)
      ) {
        filaErrores.push(`"${campo}" inválido (valor no permitido)`);
      }
    }

    if (filaErrores.length > 0) {
      errores.push({
        fila,
        errores: filaErrores,
      });
    }
  });

  return errores;
}
