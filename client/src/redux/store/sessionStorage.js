export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("user");

    if (serializedState === null) {
      return {
        isLoggedIn: false,
        errors: "",
        token: null,
      };
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.log("Load state error...", error.response ?? error);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    sessionStorage.clear();
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("user", serializedState);
  } catch (error) {
    console.log("Save state error...", error.response ?? error);
  }
};
