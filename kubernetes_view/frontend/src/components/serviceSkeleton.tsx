import { Skeleton } from "@mantine/core";
import styles from "../styles/serviceList.module.css";
import { Options } from "./servicesOption";

export const ServicesSkeleton = () => {
  const skeletonNum = Math.ceil(window.innerHeight / 78);
  return (
    <div
      className={`${styles["service-list"]} ${styles["service-list-skeleton-container"]}`}
    >
      <Options />
      {[...Array(skeletonNum)].map((_, index) => (
        <Skeleton mt={10} key={index} height={68} width={"100%"} />
      ))}
    </div>
  );
};
