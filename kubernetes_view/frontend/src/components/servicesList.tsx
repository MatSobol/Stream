import { useQuery } from "@tanstack/react-query";
import { ServiceListElement } from "./serviceElement";
import { Options } from "./servicesOption";

import styles from "../styles/serviceList.module.css";
import { useEffect, useState } from "react";
import { isServiceDatabase } from "../utility";
import { showError } from "../utility";
import { ServicesSkeleton } from "./serviceSkeleton";

const fetchServices = async () => {
  const response = await fetch("http://localhost:4000/services");
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Network returned: ${response.status}`);
  }
  return response.json();
};

const applyOptions = (
  sortedData: {
    name: string;
    status: string;
  }[],
  options: { nameFilter: string; sortBy: string }
) => {
  switch (options.sortBy) {
    case "Name":
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Type":
      sortedData.sort(
        (a, b) =>
          Number(isServiceDatabase(a.name)) - Number(isServiceDatabase(b.name))
      );
      break;
    case "Status":
      sortedData.sort((a, b) => {
        if (a.name === "Running") return -1;
        if (b.name === "Running") return 1;
        return 0;
      });
      break;
  }

  return sortedData.filter((s) =>
    s.name.toLowerCase().startsWith(options.nameFilter.toLowerCase())
  );
};

export const ServicesList = () => {
  const [options, setOptions] = useState({
    nameFilter: "",
    sortBy: "Name",
  });

  const query = useQuery({ queryKey: ["getServices"], queryFn: fetchServices });

  useEffect(() => {
    if (query.isError) {
      showError(
        query.error instanceof Error ? query.error.message : String(query.error)
      );
    }
  }, [query.isError]);

  if (query.isLoading || query.isError) {
    return <ServicesSkeleton />;
  }

  let processedData = applyOptions(query.data, options);

  return (
    <div className={styles["service-list"]}>
      <Options options={options} setOptions={setOptions} />
      {processedData.map(
        (el: { name: string; status: string }, index: number) => {
          return <ServiceListElement key={index} service={el} />;
        }
      )}
    </div>
  );
};
