/**
 * SQL Query Formatter
 * Basic SQL formatting utility
 */
export class QueryFormatter {
  /**
   * Format SQL query for readability
   * @param {string} query - SQL query string
   * @returns {string} - Formatted SQL query
   */
  static format(query) {
    if (!query || typeof query !== 'string') {
      return '';
    }

    let formatted = query.trim();

    // Basic formatting: add line breaks after keywords
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
      'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'UNION', 'INSERT', 'UPDATE', 'DELETE'
    ];

    // Add newlines after keywords (case-insensitive)
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${keyword.toUpperCase()}`);
    });

    // Clean up multiple newlines
    formatted = formatted.replace(/\n\s*\n/g, '\n');

    // Add proper indentation
    const lines = formatted.split('\n');
    let indentLevel = 0;
    const indentSize = 2;

    const formattedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';

      // Decrease indent before certain keywords
      if (trimmed.match(/^(FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT)/i)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indented = ' '.repeat(indentLevel * indentSize) + trimmed;

      // Increase indent after SELECT
      if (trimmed.match(/^SELECT/i)) {
        indentLevel++;
      }

      return indented;
    });

    return formattedLines.filter(line => line).join('\n').trim();
  }

  /**
   * Capitalize SQL keywords
   * @param {string} query - SQL query string
   * @returns {string} - Query with capitalized keywords
   */
  static capitalizeKeywords(query) {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'ON',
      'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'AS', 'AND', 'OR', 'NOT',
      'IN', 'LIKE', 'BETWEEN', 'IS', 'NULL', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN'
    ];

    let formatted = query;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, keyword.toUpperCase());
    });

    return formatted;
  }
}
