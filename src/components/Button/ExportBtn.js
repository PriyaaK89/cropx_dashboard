import { Button } from "@chakra-ui/react";
import { exportToCSV } from "../../utils/exportToCSV";
import { FaFileExcel } from "react-icons/fa";
const ExportButton = ({ data, headers, fileName }) => {
  return (
    <Button
      size="sm"
        leftIcon={<FaFileExcel />}
      colorScheme="green"
      onClick={() => exportToCSV({ data, headers, fileName })}
    >
      Export
    </Button>
  );
};

export default ExportButton;
