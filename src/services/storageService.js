/**
 * Storage service for persisting data in localStorage
 */
export class StorageService {
  static STORAGE_KEYS = {
    QUERY_HISTORY: 'sql_query_history',
    FAVORITES: 'sql_query_favorites',
    SETTINGS: 'sql_query_settings'
  };

  /**
   * Get query history from localStorage
   * @returns {Array} - Array of query history items
   */
  static getQueryHistory() {
    try {
      const history = localStorage.getItem(this.STORAGE_KEYS.QUERY_HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error reading query history:', error);
      return [];
    }
  }

  /**
   * Save query to history
   * @param {string} query - SQL query string
   * @param {Object} result - Query result metadata
   */
  static saveToHistory(query, result) {
    try {
      const history = this.getQueryHistory();
      const historyItem = {
        query,
        timestamp: new Date().toISOString(),
        rowCount: result.rowCount || 0,
        executionTime: result.executionTime || 0
      };

      // Add to beginning and limit to 50 items
      history.unshift(historyItem);
      const limitedHistory = history.slice(0, 50);

      localStorage.setItem(this.STORAGE_KEYS.QUERY_HISTORY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error saving query history:', error);
    }
  }

  /**
   * Clear query history
   */
  static clearHistory() {
    try {
      localStorage.removeItem(this.STORAGE_KEYS.QUERY_HISTORY);
    } catch (error) {
      console.error('Error clearing query history:', error);
    }
  }

  /**
   * Get favorites from localStorage
   * @returns {Array} - Array of favorite queries
   */
  static getFavorites() {
    try {
      const favorites = localStorage.getItem(this.STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error reading favorites:', error);
      return [];
    }
  }

  /**
   * Save query to favorites
   * @param {string} query - SQL query string
   * @param {string} name - Favorite name
   */
  static saveFavorite(query, name) {
    try {
      const favorites = this.getFavorites();
      const favorite = {
        id: Date.now().toString(),
        name,
        query,
        createdAt: new Date().toISOString()
      };

      favorites.push(favorite);
      localStorage.setItem(this.STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return favorite;
    } catch (error) {
      console.error('Error saving favorite:', error);
      return null;
    }
  }

  /**
   * Delete favorite by ID
   * @param {string} id - Favorite ID
   */
  static deleteFavorite(id) {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(f => f.id !== id);
      localStorage.setItem(this.STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  }

  /**
   * Update favorite name
   * @param {string} id - Favorite ID
   * @param {string} newName - New favorite name
   */
  static updateFavoriteName(id, newName) {
    try {
      const favorites = this.getFavorites();
      const updated = favorites.map(f =>
        f.id === id ? { ...f, name: newName } : f
      );
      localStorage.setItem(this.STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  }

  /**
   * Get settings from localStorage
   * @returns {Object} - Settings object
   */
  static getSettings() {
    try {
      const settings = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {};
    } catch (error) {
      console.error('Error reading settings:', error);
      return {};
    }
  }

  /**
   * Save settings to localStorage
   * @param {Object} settings - Settings object
   */
  static saveSettings(settings) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }
}
