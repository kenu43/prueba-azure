export const TIPO_ARCHIVO = [
  { ext: "pdf", type: "pdf" },
  { ext: "rar", type: "archivoComprimido" },
  { ext: "zip", type: "archivoComprimido" },
  { ext: "xlsx", type: "excel" },
  { ext: "png", type: "imagen" },
  { ext: "jpg", type: "imagen" },
  { ext: "jpeg", type: "imagen" },
  { ext: "mp4", type: "video" },
  { ext: "mov", type: "video" },
];

export const EXTENSIONES_GRUPOS = {
  imagen: ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"],
  video: ["mp4", "mov", "avi", "mkv"],
  audio: ["mp3", "wav", "aac"],
  excel: ["xls", "xlsx"],
  pdf: ["pdf"],
  rar: ["rar", "zip", "7z"],
} as const;
