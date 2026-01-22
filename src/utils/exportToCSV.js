export const exportToCSV = ({ data, headers, fileName }) => {
  if (!data || data.length === 0) return;

  const csv = [
    headers.join(","),
    ...data.map(row =>
      headers.map(h => `"${row[h] ?? ""}"`).join(",")
    )
  ].join("\n");
  console.log(data, "csvdata")
  // const url = URL.createObjectURL(blob);

  // const link = document.createElement("a");
  // link.href = url;
  // link.download = fileName;
  // link.click();

  // URL.revokeObjectURL(url);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
