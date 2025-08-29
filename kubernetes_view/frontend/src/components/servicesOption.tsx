import { Button, Flex, Select, TextInput } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";
import { faSort } from "@fortawesome/free-solid-svg-icons/faSort";

export const Options = ({
  options = { nameFilter: "", sortBy: "Name" },
  setOptions = () => {},
}: {
  options?: {
    nameFilter: string;
    sortBy: string;
  };
  setOptions?: React.Dispatch<
    React.SetStateAction<{
      nameFilter: string;
      sortBy: string;
    }>
  >;
}) => {
  return (
    <Flex align="center">
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        placeholder="Name"
        value={options.nameFilter}
        onChange={(e) => {
          setOptions({
            ...options,
            nameFilter: e.currentTarget.value,
          });
        }}
      />
      <div style={{ flexGrow: 1 }}></div>
      <Button
        leftSection={<FontAwesomeIcon icon={faArrowsRotate} />}
        color="cyan"
        mr={6}
      >
        Apply all
      </Button>
      <Select
        data={["Name", "Type", "Status"]}
        checkIconPosition="right"
        defaultValue="Name"
        leftSection={<FontAwesomeIcon icon={faSort} />}
        onChange={(e) => {
          if (e) {
            setOptions((options) => ({
              ...options,
              sortBy: e,
            }));
          }
        }}
        style={{ width: "120px" }}
      />
    </Flex>
  );
};
