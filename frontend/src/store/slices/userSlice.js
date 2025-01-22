import { createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage } from '../../utils/utils';

const initialState = {
    dateOfBirth: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: loadUserFromLocalStorage() || initialState,
    reducers: {
        setUserCredentials: (state, action) => {
            const userData = action.payload;
            state.dateOfBirth = userData.dateOfBirth;
            state.email = userData.email;
            state.firstName = userData.firstName;
            state.lastName = userData.lastName;
            state.role = userData.role;
            state.token = userData.token;

            localStorage.setItem('nike_user', JSON.stringify(userData));
        },
        clearUserCredentials: () => {
            localStorage.removeItem('nike_user');
            return initialState;
        },
    },
});

function loadUserFromLocalStorage() {
    return getItemFromLocalStorage()
}

export const { setUserCredentials, clearUserCredentials } = userSlice.actions;
export default userSlice.reducer;
