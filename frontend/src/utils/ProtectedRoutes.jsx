import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({ children, isAdminRequired }) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }

        if (isAdminRequired && user?.role !== 'Admin') {
            navigate('/');
        }
    }, [navigate, user, isAdminRequired]);

    if (!user || (isAdminRequired && user?.role !== 'Admin')) {
        return null;
    }

    return <>{children}</>;
}

ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
    isAdminRequired: PropTypes.bool,
};

export default ProtectedRoutes;
