export function getToken() {
  return {
    headers: {
      crossdomain: true,
      authorization:
        "Bearer " +
        (sessionStorage.getItem("user") &&
          JSON.parse(sessionStorage.getItem("user")).token),
    },
  };
}
