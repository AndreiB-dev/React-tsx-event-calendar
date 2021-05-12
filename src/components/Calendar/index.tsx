import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { Day, Header, CreateEvent } from "../../components";
import { getMonthData } from "../../helpers/GetMonthData";

import "./Calendar.css";

export default function Calendar({
    years,
    monthNames,
    weekDayNames,
    user,
    setUser,
    events,
    usersList,
}: InferProps<typeof Calendar.propTypes>) {
    const [date, setDate] = React.useState(new Date());
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const [eventsList, setEventsList] = React.useState(events);

    const yearRef = React.useRef<HTMLSelectElement>(null);
    const monthRef = React.useRef<HTMLSelectElement>(null);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const monthData = getMonthData(year, month);

    function handleChange() {
        if (yearRef && yearRef.current && monthRef && monthRef.current) {
            const year = Number(yearRef.current.value);
            const month = Number(monthRef.current.value);

            const newDate = new Date(year, month);

            setDate(newDate);
        }
    }

    const handlePrevMonthButtonClick = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() - 1);
        console.log("prev", newDate);
        setDate(newDate);
    };

    const handleNextMonthButtonClick = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1);
        console.log("next", newDate);
        setDate(newDate);
    };

    const selectDay = (date: Date) => {
        console.log(date);

        setSelectedDate(date);
    };

    return (
        <div className="calendar__wrapper">
            <Header user={user} setUser={setUser} />
            <div className="navigation">
                <Button
                    shape="circle"
                    icon={<ArrowLeftOutlined />}
                    onClick={handlePrevMonthButtonClick}
                />
                <div className="navigation__selects">
                    <select
                        ref={monthRef}
                        value={month}
                        style={{ width: 120 }}
                        onChange={handleChange}>
                        {monthNames.map((name, index) => (
                            <option key={index} value={index}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <select
                        ref={yearRef}
                        value={year}
                        style={{ width: 120 }}
                        onChange={handleChange}>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    shape="circle"
                    icon={<ArrowRightOutlined />}
                    onClick={handleNextMonthButtonClick}
                />
            </div>
            <table>
                <thead>
                    <tr className="weekdays">
                        {weekDayNames.map((name) => (
                            <th key={name}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {monthData &&
                        monthData.map(
                            (
                                week: any[],
                                index: React.Key | null | undefined,
                            ) => (
                                <tr key={index} className="week">
                                    {week.map((day, index) =>
                                        day ? (
                                            <td key={index}>
                                                <Day
                                                    event={eventsList.filter((event) =>
                                                        event.date.toDateString() ===
                                                        day.toDateString()
                                                            )}
                                                    day={day}
                                                    selectDay={selectDay}
                                                />
                                            </td>
                                        ) : (
                                            <td key={index} />
                                        ),
                                    )}
                                </tr>
                            ),
                        )}
                </tbody>
            </table>
            <CreateEvent eventsList={eventsList} setEventsList={setEventsList} usersList={usersList} />
        </div>
    );
}

Calendar.propTypes = {
    years: PropTypes.array.isRequired,
    monthNames: PropTypes.array.isRequired,
    weekDayNames: PropTypes.array.isRequired,
    setUser: PropTypes.func.isRequired,
    user: PropTypes.exact({
        id: PropTypes.number,
        username: PropTypes.string,
        password: PropTypes.string,
    }),
    events: PropTypes.arrayOf(
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

Calendar.defaultProps = {
    years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
    monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ],
    weekDayNames: [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
    ],
    events: [
        {
            id: 1,
            date: new Date(Date.now() + 3600 * 1000 * 24),
            description: "вечеринка у децла дома",
            author: "user",
            user: "user2",
        },
        {
            id: 2,
            date: new Date(Date.now() - 3600 * 1000 * 24),
            description: "концерт спанч боба",
            author: "user",
            user: "user2",
        },
        {
            id: 3,
            date: new Date(Date.now() + 3600 * 1000 * 24 * 5),
            description: "встреча клуба любителей поспать",
            author: "user3",
            user: "user",
        },
    ],
};
