import { notifications } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

export const showError = (text: string) => {
  notifications.show({
    title: text,
    message: "",
    color: "red",
    position: "top-center",
    withCloseButton: true,
    icon: <FontAwesomeIcon icon={faXmark} />,
    withBorder: true,
  });
};

export const showSuccess = (text: string) => {
  notifications.show({
    title: text,
    message: "",
    color: "green",
    position: "top-center",
    withCloseButton: true,
    icon: <FontAwesomeIcon icon={faCheck} />,
    withBorder: true,
  });
};

export const isServiceDatabase = (name: string) => {
  return name.slice(-8) === "Database";
};

export const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};
