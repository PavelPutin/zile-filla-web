import { Alert, AlertTitle, Box, Snackbar, Stack, Typography } from "@mui/material";
import Image from "next/image";

export type ErrorInfoProps = {
  type: string,
  status: number,
  title: string,
  detail: string,
  instance: string
}

export default function ErrorInfo({ error, variant, open, handleClose }: { error: ErrorInfoProps, variant?: "snackbar", open?: boolean, handleClose?: (event: React.SyntheticEvent | Event, reason?: string) => void }) {
  let title, detail: string;

  switch (error.type) {
    case "/zile-filla/file-access-denied":
      title = "Нет доступа к файлу";
      detail = `У вас нет разрешения на чтение файла ${error.instance}`;
      break;
    case "/zile-filla/not-directory":
      title = "Это не директория"
      detail = `'${error.instance}' Не является директорией, вы не можете посмотреть его потомков. Проверьте путь`;
      break;
    case "/zile-filla/invalid-path":
      title = "Нечитаемый путь";
      detail = "В пути есть нечитаемые символы. Проверьте путь";
      break;
    case "/zile-filla/internal-io-exception":
      title = "Ошибка сервера";
      detail = "Нашему серверу плохо, но делаем всё возможное, чтобы ему стало лучше";
      break;
    case "/zile-filla/no-such-file":
      title = "Файл или директория не существует";
      detail = "Вы пытаетесь получить доступ к несуществующему элементу. Проверьте путь";
      break;
    case "/zile-filla/not-regular-file":
      title = "Специальный файл";
      detail = "Вы пытаетесь получить доступ к специальному файлу, не явлющимся директорией или данными";
      break;
    case "/zile-filla/not-text-file":
      title = "Не текстовый файл";
      detail = "Вы пытаетесь просмотреть содержимое не текстового файла";
      break;
    case "/zile-filla/directory-not-empty":
      title = "Директория не пустая";
      detail = "Не удалось переименовать директорию, так как она не пустая";
      break;
    case "/zile-filla/file-already-exists":
      title = "Файл уже существует";
      detail = "Не удалось переименовать или переместить файл из-за конфлитка имён";
      break;
    default:
      title = "Возникла неизвестная ошибка";
      detail = "Мы не знаем, что произошло :("
      break;
  }

  return (
    variant === "snackbar" ?
    <Snackbar
      open={open}
      autoHideDuration={50000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
      >
        <AlertTitle>{title}</AlertTitle>
        {error.status}: {detail}
      </Alert>
    </Snackbar> :
    <Stack alignItems="center">
      <Image src="/images/ZileFilla.png" alt="Зайлфилла недовольна ошибкой" width={230} height={230}/>
      <Typography align="center" variant="h1">{title}</Typography>
      <Typography align="center" variant="h2">{error.status}</Typography>
      <Typography align="center">{detail}</Typography>
    </Stack>);
}