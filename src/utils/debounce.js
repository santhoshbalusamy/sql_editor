/**
 * Debounce utility function with cancel capability
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function with cancel method
 */
export function debounce(func, wait = 300) {
  let timeout;

  const executedFunction = function(...args) {
    const later = () => {
      clearTimeout(timeout);
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  // Add cancel method to clear pending timeout
  executedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return executedFunction;
}
