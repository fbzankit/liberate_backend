import React from 'react';
import { Redirect } from 'react-router';

const LogOut = () => {
    localStorage.clear();
	sessionStorage.clear();
	return <Redirect to="/login" />
}

export default LogOut;