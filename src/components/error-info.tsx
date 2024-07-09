import { Box, Typography } from "@mui/material";

type ErrorInfoProps = {
  type: string,
  status: number,
  title: string,
  detail: string,
  instance: string
}

export default function ErrorInfo({ error }: { error: ErrorInfoProps }) {
  let title, detail: string;

  switch (error.type) {
    case "/zile-filla/file-access-denied/":
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
    default:
      title = "Возникла неизвестная ошибка";
      detail = "Мы не знаем, что произошло :("
      break;
  }

  return (
    <Box>
      <Typography align="center" variant="h1">{title}</Typography>
      <Typography align="center" variant="h2">{error.status}</Typography>
      <Typography align="center">{detail}</Typography>
    </Box>
  );
}