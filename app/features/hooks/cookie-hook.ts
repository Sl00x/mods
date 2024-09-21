export const useCookie = () => {
  const set = (name: string, value: string) => {
    document.cookie = name + "=" + value + "; path=/";
  };
  const get = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  return {
    cookie: get,
    set,
  };
};
