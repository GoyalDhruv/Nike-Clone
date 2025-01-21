export const isLoggedIn = (user) => {
    return Boolean(user?.email && user?.token);
};

export const getItemFromLocalStorage = () => {
    const savedItem = localStorage.getItem('nike_user');
    return savedItem ? JSON.parse(savedItem) : null;
}