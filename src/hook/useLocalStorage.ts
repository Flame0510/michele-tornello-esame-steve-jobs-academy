export const useLocalStorage = () => {
  const getLocalStorageItem = (id: string) => {
    const item = localStorage.getItem(id);
    return item ? JSON.parse(item) : "";
  };

  const setLocalStorageItem = (id: string, value: {}) =>
    localStorage.setItem(id, JSON.stringify(value));

  const removeLocalStorageItem = (id: string) => localStorage.removeItem(id);

  return { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
};
