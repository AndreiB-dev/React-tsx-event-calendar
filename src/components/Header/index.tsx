import React from "react";
import { Button } from "antd";
import PropTypes, { InferProps } from "prop-types";

import "./Header.css";

export default function Header({
    user,
    setUser,
}: InferProps<typeof Header.propTypes>) {
    const me = window.localStorage.user;
    const onExit = () => {
        setUser(null);
        window.localStorage.clear();
    };
    return (
        <div className="top">
            <div />
            {me && <p className="username">{me}</p>}
            <Button className="exit_btn" onClick={onExit}>
                Выход
            </Button>
        </div>
    );
}

Header.propTypes = {
    setUser: PropTypes.func.isRequired,
    user: PropTypes.exact({
        id: PropTypes.number,
        username: PropTypes.string,
        password: PropTypes.string,
    }),
};
