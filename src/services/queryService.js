import { matchQuery, getMockExecutionTime } from '../data/mockData.js';

/**
 * Mock query execution service
 * Simulates query execution with pattern matching
 */
export class QueryService {
  /**
   * Execute a SQL query (mock)
   * @param {string} query - SQL query string
   * @returns {Promise<{result: Array, executionTime: number}>}
   */
  static async executeQuery(query) {
    const startTime = performance.now();

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, getMockExecutionTime()));

    // Match query to predefined results
    const result = matchQuery(query);

    const executionTime = Math.floor(performance.now() - startTime);

    return {
      result,
      executionTime,
      rowCount: result.length
    };
  }

  /**
   * Normalize query for matching
   * @param {string} query - SQL query string
   * @returns {string} - Normalized query
   */
  static normalizeQuery(query) {
    return query.trim().replace(/\s+/g, ' ');
  }

  /**
   * Basic query validation
   * @param {string} query - SQL query string
   * @returns {boolean} - Whether query appears valid
   */
  static isValidQuery(query) {
    const normalized = this.normalizeQuery(query).toUpperCase();
    return normalized.startsWith('SELECT') && normalized.length > 0;
  }
}
