import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from './utils';

function ProtectedRoutes({ children, isAdminRequired }) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const loggedIn = isLoggedIn(user)

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }

        if (isAdminRequired && loggedIn && user?.role !== 'Admin') {
            navigate('/');
        }
    }, [navigate, loggedIn, isAdminRequired, user]);

    if (!loggedIn || (isAdminRequired && loggedIn && user?.role !== 'Admin')) {
        return null;
    }

    return <>{children}</>;
}

ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
    isAdminRequired: PropTypes.bool,
};

export default ProtectedRoutes;
