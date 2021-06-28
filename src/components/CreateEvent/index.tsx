import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Button, Modal, DatePicker, Select, Input } from "antd";

import "./CreateEvent.css";

const { Option } = Select;

export default function CreateEvent({
    setEventsList,
    eventsList,
    usersList,
}: InferProps<typeof CreateEvent.propTypes>) {
    const me = window.localStorage.user;

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [date, setDate] = React.useState(null);
    const [userList, setUserList] = React.useState(usersList);
    const [user, setUser] = React.useState("");
    const [event, setEvent] = React.useState("");

    const options = userList.map((user) => (
        <Option key={user.id} value={user.username}>
            {user.username}
        </Option>
    ));

    const generateId = Math.floor(Math.random() * 1000);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setDate(null);
        setUser("");
        setEvent("");
    };

    const onChangeDate = (date: any) => {
        if (date) {
            setDate(date._d);
        }
    };

    const onSearch = (value: string) => {
        setUserList(
            usersList.filter(
                (user) =>
                    user.username.toLowerCase().indexOf(value.toLowerCase()) >=
                    0,
            ),
        );
    };

    const onChangeSelect = (value: string) => {
        setUser(value);
    };

    const onCreateEvent = () => {
        const newEvent = {
            id: generateId,
            date: date,
            description: event,
            author: me,
            user: user,
        };
        setEventsList([...eventsList, newEvent]);
        setDate(null);
        setUser("");
        setEvent("");
    };

    return (
        <div className="calendar__footer">
            <div>
                <Button type="primary" size="large" onClick={showModal}>
                    Новое событие
                </Button>
            </div>
            <Modal
                title="Создать событие"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="back" onClick={closeModal}>
                        Закрыть
                    </Button>,
                    <Button
                        disabled={!event}
                        key="submit"
                        type="primary"
                        onClick={onCreateEvent}>
                        Создать
                    </Button>,
                ]}>
                <p>Выбирете дату</p>
                <DatePicker onChange={onChangeDate} />
                <p>Найдите кого вы хотите пригласить</p>
                <Select
                    showSearch
                    value={user}
                    placeholder="Введите имя или email пользователя"
                    style={{ width: "100%" }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={onSearch}
                    onChange={onChangeSelect}
                    notFoundContent={"Не найдено"}>
                    {options}
                </Select>
                <p>Название события</p>
                <Input
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                />
            </Modal>
        </div>
    );
}

CreateEvent.propTypes = {
    setEventsList: PropTypes.func.isRequired,
    eventsList: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
            description: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    usersList: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};
