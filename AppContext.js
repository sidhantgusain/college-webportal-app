import React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [studentDetail, setStudentDetail] = React.useState('');

    return (
        <AppContext.Provider value={{ studentDetail, setStudentDetail }}>
            {children}
        </AppContext.Provider>
    );
};
