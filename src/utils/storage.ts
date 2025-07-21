export const saveUser = (userData: any) => {
  const existing = JSON.parse(localStorage.getItem("users") || "[]");
  const updated = [...existing, userData];
  localStorage.setItem("users", JSON.stringify(updated));
};

export const getUsers = (): any[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};
