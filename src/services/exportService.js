/**
 * Export service for downloading query results
 */
export class ExportService {
  /**
   * Export data as CSV
   * @param {Array} data - Array of objects to export
   * @param {string} filename - Output filename
   */
  static exportToCSV(data, filename = 'query-results.csv') {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes, wrap in quotes if needed
          if (value === null || value === undefined) return '';
          const stringValue = String(value);
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      )
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke object URL to prevent memory leak
    URL.revokeObjectURL(url);
  }

  /**
   * Export data as JSON
   * @param {Array} data - Array of objects to export
   * @param {string} filename - Output filename
   */
  static exportToJSON(data, filename = 'query-results.json') {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke object URL to prevent memory leak
    URL.revokeObjectURL(url);
  }
}
