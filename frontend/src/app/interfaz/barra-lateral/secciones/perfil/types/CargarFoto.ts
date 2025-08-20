interface UpdaterChangeFuncProps {
  file?: File;
  status?: boolean;
}
type AcceptFileType =
  | 'audio/*'
  | 'video/*'
  | 'image/*'
  | '.pdf'
  | '.doc'
  | '.docx'
  | string;

export interface FileUploaderPropsType {
  accept?: AcceptFileType;
  deshabilitarCargar?: boolean;
  onChange: (e: UpdaterChangeFuncProps) => void;
}
