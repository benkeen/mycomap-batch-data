export const isValidVoucherNumber = (val: string) => {
  // crude, but checks for a basic BCxx-xx pattern, where x are numbers and there are any numbers of digits after the dash
  return val && /^BC\d{2}\-\d+/.test(val);
};

export const downloadCSV = (data: any[]) => {
  const headers = ['iNat Number', 'Observed On', 'User Name', 'Voucher Number'];
  const csvRows = [headers.join(',')];

  data.forEach((row) => {
    const values = [row.id, row.observedOn, row.user, row.voucherNumber];
    csvRows.push(values.map((v) => `"${v}"`).join(','));
  });

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'mycomap_observations.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
