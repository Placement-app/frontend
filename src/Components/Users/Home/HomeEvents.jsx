import React, { useContext, useEffect, useState } from "react";
import announcement from '../../../assets/img/announcement.png'
import events from '../../../assets/img/events.png'
import { Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';
import { UserContext } from "../../../Context/UserContext";

export default function HomeEvents() {
    const { Events } = useContext(UserContext)
    const month = {
        1: "January",
        2: "Febrary",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "September",
        11: "November",
        12: "December",
    }

    return (
        <div className="lg:max-w-xl px-6 w-full">
            <h1 className="text-2xl font-bold p-4 font-extrabold text-xl sm:text-4xl flex justify-center items-center mt-10 md:mt-0"><img src={events} style={{ width: 36, marginRight: 10 }} alt="" />Events</h1>
            <Timeline>
                {
                    Events.map((e, i) => {
                        return (
                            <Timeline.Item key={i} className="cursor-pointer">
                                <Timeline.Point icon={HiCalendar} />
                                <Timeline.Content>
                                    <Timeline.Time>{e.timeStart.split("T")[0].split("-").map((e, i) => i == 1 ? month[Number(e)] + " " : e + " ")}<br></br> {e.timeStart.split("T")[1]}</Timeline.Time>
                                    <Timeline.Title>{e.title}</Timeline.Title>
                                    <Timeline.Body>{e.description}
                                    </Timeline.Body>
                                </Timeline.Content>
                            </Timeline.Item>
                        )
                    })
                }

            </Timeline>
        </div>

    );
}
