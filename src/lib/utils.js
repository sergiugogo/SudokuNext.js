
/**
 * Combines multiple class names into a single string
 * @param {...string} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Delays execution for a specified number of milliseconds
 * @param {number} ms - The number of milliseconds to delay
 * @returns {Promise} - Promise that resolves after the delay
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Saves game state to local storage
 * @param {string} key - The key to store the data under
 * @param {any} data - The data to store
 */
export function saveToLocalStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Loads game state from local storage
 * @param {string} key - The key the data is stored under
 * @returns {any} - The stored data, or null if not found
 */
export function loadFromLocalStorage(key) {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return null;
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
}

/**
 * Creates a deep copy of an object or array
 * @param {any} obj - The object to copy
 * @returns {any} - A deep copy of the object
 */
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Format time in seconds to mm:ss format
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
