import React from "react";
import { Button } from "antd";
import PropTypes, { InferProps } from "prop-types";

import "./Header.css";

export default function Header({
    setUser,
}: InferProps<typeof Header.propTypes>) {
    const me = window.localStorage.user;
    const onExit = () => {
        window.localStorage.clear();
        setUser(null);
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
};
