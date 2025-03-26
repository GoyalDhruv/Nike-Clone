export const isLoggedIn = (user) => {
    return Boolean(user?.email && user?.token);
};

export const getItemFromLocalStorage = () => {
    const savedItem = localStorage.getItem('nike_user');
    return savedItem ? JSON.parse(savedItem) : null;
}

export const getTokenFromLocalStorage = () => {
    const savedItem = localStorage.getItem('nike_user');
    return savedItem ? JSON.parse(savedItem)?.token : null;
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

export function getDate(string) {
    const date = new Date(string);
    const options = { timeZone: 'Asia/Kolkata' };
    const istDate = new Date(date.toLocaleString('en-US', options));

    const day = istDate.getDate();
    const month = istDate.toLocaleString('default', { month: 'long' });
    const year = istDate.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function getTimeInIST(string) {
    const date = new Date(string);

    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const timeString = date.toLocaleTimeString('en-US', options);

    return timeString;
}

