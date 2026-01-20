import { Button } from "@chakra-ui/react";
import { exportToCSV } from "../../utils/exportToCSV";

const ExportButton = ({ data, headers, fileName }) => {
  return (
    <Button
      size="sm"
      colorScheme="green"
      onClick={() => exportToCSV({ data, headers, fileName })}
    >
      Export
    </Button>
  );
};

export default ExportButton;
