import nuxtStorage from "nuxt-storage";

export const getDataFromLocalStorage = () => {
    const data = nuxtStorage.localStorage.getData("TaskArray");
    return data ? JSON.parse(data) : [];
  };


  export const saveDataToLocalStorage = ( data) => {
    nuxtStorage.localStorage.setData("TaskArray", data);
  };

export const updateItemInLocalStorage = ( updatedItem) => {
    const data = getDataFromLocalStorage();
    const index = data.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      data[index] = updatedItem;
      saveDataToLocalStorage(data);
    }
  };