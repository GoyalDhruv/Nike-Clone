export const isLoggedIn = (user) => {
    return Boolean(user?.email && user?.token);
};
