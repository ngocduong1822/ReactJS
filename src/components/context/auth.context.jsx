import { createContext, useState } from 'react';

export const AuthContext = createContext({
            email: "",
            phone: "",
            fullName: "",
            role: "",
            avatar: "",
            id: ""
});

const AuthWrapper = ( props ) => {
    const [user, setUser] = useState({
            email: "",
            phone: "",
            fullName: "",
            role: "",
            avatar: "",
            id: ""
        });
        const [isApploading, setIsApploading] = useState(true);
    return (
        <AuthContext.Provider value={{ user, setUser,isApploading, setIsApploading }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthWrapper;