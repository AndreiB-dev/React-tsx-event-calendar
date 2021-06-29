import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import './Login.css';

export default function Login({ setUser, usersList }: InferProps<typeof Login.propTypes>) {

    const onFinish = (values: any) => {
        const user = usersList.find(item => item.username === values.username && item.password === values.password)
        window.localStorage["user"] = user?.username;
        setUser(user);
      };

    return (
        <div className="login">
            <div className="login__top">
                <h2>Войти в аккаунт</h2>
                <p className="login__top-p">Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <div className="login__block">
                <Form onFinish={onFinish} className="login__form">
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}>
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}>
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

Login.propTypes = {
    setUser: PropTypes.func.isRequired,
    usersList: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};