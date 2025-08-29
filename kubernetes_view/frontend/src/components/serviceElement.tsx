import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";
import { faDatabase } from "@fortawesome/free-solid-svg-icons/faDatabase";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { faServer } from "@fortawesome/free-solid-svg-icons/faServer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Flex, Tooltip, Text, Button } from "@mantine/core";

import styles from "../styles/serviceElement.module.css";
import { capitalizeFirstLetter, isServiceDatabase } from "../utility";
import { useMemo } from "react";

export const ServiceListElement = ({
  service,
}: {
  service: {
    name: string;
    status: string;
  };
}) => {
  const isDatabase = useMemo(
    () => isServiceDatabase(service.name),
    [service.name]
  );

  let type;

  switch (service.status) {
    case "Running":
      type = "active";
      break;
    default:
      type = "down";
  }

  return (
    <Card mt={10}>
      <Flex align="center" gap="md">
        {isDatabase ? (
          <FontAwesomeIcon icon={faDatabase} />
        ) : (
          <FontAwesomeIcon icon={faServer} />
        )}

        <Tooltip label="name">
          <Text size="lg">{capitalizeFirstLetter(service.name)}</Text>
        </Tooltip>
        <div style={{ flexGrow: 1 }}></div>
        <Button
          leftSection={
            <FontAwesomeIcon
              className={styles.updating}
              icon={faArrowsRotate}
            />
          }
          color="cyan"
        >
          Apply
        </Button>
        {!isDatabase ? (
          <a
            href={`http://192.168.200.200/${service.name.toLowerCase()}/docs`}
            target="_blank"
          >
            <Button
              leftSection={<FontAwesomeIcon icon={faLink} />}
              color="green"
            >
              Connect
            </Button>
          </a>
        ) : (
          <Button leftSection={<FontAwesomeIcon icon={faLink} />} color="green">
            Connect
          </Button>
        )}

        <Tooltip label={service.status}>
          <div className={`${styles["service-status"]} ${styles[type]} `} />
        </Tooltip>
      </Flex>
    </Card>
  );
};
