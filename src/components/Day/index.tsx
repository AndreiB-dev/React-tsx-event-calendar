import React from "react";
import PropTypes, { InferProps } from "prop-types";

import "./Day.css";

export default function Day(
    this: any,
    { day, selectDay, event }: InferProps<typeof Day.propTypes>,
) {
    const me = window.localStorage.user;

    return (
        <div className="day_wrapper" onClick={selectDay.bind(this, day)}>
            <p className="day_number">{day.getDate()}</p>
            <div className="event_wrapper">
                {event
                    ? event.map((ev) =>
                          ev && (ev.author === me || ev.user === me) ? (
                              <>
                                  <p className="day_event">
                                      {ev.author} приглашает пользователя{" "}
                                      {ev.user} на: {ev.description}
                                  </p>
                              </>
                          ) : null,
                      )
                    : null}
            </div>
        </div>
    );
}

Day.propTypes = {
    day: PropTypes.instanceOf(Date).isRequired,
    selectDay: PropTypes.func.isRequired,
    event: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
            description: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
        }),
    ),
};
