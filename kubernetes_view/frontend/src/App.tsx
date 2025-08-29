import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MinikubeLoad } from "./components/isMinikube";
import { Center, LoadingOverlay, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useSse } from "./hooks/sseHook";
import { ServicesList } from "./components/servicesList";
import { Notifications } from "@mantine/notifications";

export default function App() {
  const [visible, { toggle }] = useDisclosure(true);

  useEffect(() => {
    useSse(toggle);
  }, []);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <Center>{visible ? <MinikubeLoad /> : <ServicesList />}</Center>
    </MantineProvider>
  );
}
