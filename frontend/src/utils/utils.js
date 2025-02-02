export const isLoggedIn = (user) => {
    return Boolean(user?.email && user?.token);
};

export const getItemFromLocalStorage = () => {
    const savedItem = localStorage.getItem('nike_user');
    return savedItem ? JSON.parse(savedItem) : null;
}

export const waitForToken = async () => {
    const tokenCheck = () =>
        new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const token = getItemFromLocalStorage()?.token
                if (token) {
                    clearInterval(interval);
                    resolve(token);
                }
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
                reject(new Error("Token not set in time"));
            }, 5000);
        });

    return await tokenCheck();
};
