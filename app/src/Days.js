import { useEffect, useState } from "react";
import React from "react";

const dateTimeNow = Date.now();
const oneDay = 1000 * 60 * 60 * 24;

const localizedDaysOfWeek = new Map([
    [0, "вс"],
    [1, "пн"],
    [2, "вт"],
    [3, "ср"],
    [4, "чт"],
    [5, "пт"],
    [6, "сб"],
]);

const localizeDayOfWeek = (dayNumber) => {
    const dayName = localizedDaysOfWeek.get(dayNumber);
    return dayName || "";
};

const formatDate = (dateItem) => {
    const date = new Date(dateItem);
    return (
        <>
            <span className='day_text'>{date.getDate()}</span>
            <span className='day_text'>{localizeDayOfWeek(date.getDay())}</span>
        </>
    );
};

// React.FC
const Days = () => {
    const [visibleDays, setVisibleDays] = useState([
        dateTimeNow - 1 * oneDay,
        dateTimeNow,
        dateTimeNow + 1 * oneDay,
        dateTimeNow + 2 * oneDay,
        dateTimeNow + 3 * oneDay,
        dateTimeNow + 4 * oneDay,
        dateTimeNow + 5 * oneDay,
        dateTimeNow + 6 * oneDay,
        dateTimeNow + 7 * oneDay,
    ]);
    const [currentDay, setCurrentDay] = useState(dateTimeNow);

    let rigthCrossLine = 230;

    const changeWeekLeft = () => {
        setVisibleDays((prev) => {
            return [prev[0] - 2 * oneDay, prev[0] - 1 * oneDay, ...prev];
        });
    };

    const changeWeekRight = () => {
        setVisibleDays((prev) => {
            return [
                ...prev,
                prev[prev.length - 1] + 1 * oneDay,
                prev[prev.length - 1] + 2 * oneDay,
            ];
        });
    };

    const fObserver = (event) => {
        if (!event.target.scrollLeft) {
            changeWeekLeft();
            event.target.scroll(240, 0);
            rigthCrossLine = rigthCrossLine + 240;
        } else if (
            event.target.scrollLeft > 0 &&
            event.target.scrollLeft === rigthCrossLine
        ) {
            changeWeekRight()
            event.target.scroll(rigthCrossLine, 0);
            rigthCrossLine = rigthCrossLine + 240;
        }
    };

    const days_line_wrapper = React.createRef();

    useEffect(() => {
        const element = days_line_wrapper.current;

        element.scroll(120, 0);

        element.addEventListener("scroll", fObserver);

        return () => {
            element.removeEventListener("scroll", fObserver);
        }
    }, []);

    return (
        <>
            <nav className='days'>
                <div ref={days_line_wrapper} className="days_line-wrapper">
                    <ul className='days_line'>
                        {visibleDays.map((it) => (
                            <li
                                onClick={() => setCurrentDay(it)}
                                key={it}
                                className={
                                    "day" +
                                    `${it === currentDay ? " active" : ""}`
                                }>
                                {formatDate(it)}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Days;
