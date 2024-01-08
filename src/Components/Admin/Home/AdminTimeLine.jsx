import { Timeline } from 'flowbite-react';
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function AdminTimeLine() {
    return (
        <div className='flex'>
            <div className='p-5'>
            <Timeline >
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Time>11:00 AM</Timeline.Time>
                        <Timeline.Title>IEEE Machine leaning Introduction</Timeline.Title>
                        <Timeline.Body>
                            IEEE CRM Chapter will have a Machine leaning introduction seminar in mini hall 1.
                        </Timeline.Body>
                        <div className='flex'>
                            <button className="flex bg-blue-600 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaEye className="mr-2" />
                                View
                            </button>
                            <button className="flex bg-yellow-400 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaRegEdit className="mr-2 " />
                                Edit
                            </button>
                            <button className="flex bg-red-500 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <MdDelete className="mr-2 " />
                                Remove
                            </button>
                        </ div>
                    </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Time>2:30 PM</Timeline.Time>
                        <Timeline.Title>IEEE Machine leaning Introduction</Timeline.Title>
                        <Timeline.Body>
                            IEEE CRM Chapter will have a Machine leaning introduction seminar in mini hall 1.
                        </Timeline.Body>
                        <div className='flex'>
                            <button className="flex bg-blue-600 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaEye className="mr-2" />
                                View
                            </button>
                            <button className="flex bg-yellow-400 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaRegEdit className="mr-2 " />
                                Edit
                            </button>
                            <button className="flex bg-red-500 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <MdDelete className="mr-2 " />
                                Remove
                            </button>
                        </ div>
                    </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Time>3:30 PM</Timeline.Time>
                        <Timeline.Title>IEEE Machine leaning Introduction</Timeline.Title>
                        <Timeline.Body>
                            IEEE CRM Chapter will have a Machine leaning introduction seminar in mini hall 1.
                        </Timeline.Body>
                        <div className='flex'>
                            <button className="flex bg-blue-600 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaEye className="mr-2" />
                                View
                            </button>
                            <button className="flex bg-yellow-400 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaRegEdit className="mr-2 " />
                                Edit
                            </button>
                            <button className="flex bg-red-500 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <MdDelete className="mr-2 " />
                                Remove
                            </button>
                        </ div>
                    </Timeline.Content>
                </Timeline.Item>

            </Timeline>
            </div>
            <div className='p-5'>
            <Timeline>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Time>11:00 AM</Timeline.Time>
                        <Timeline.Title>IEEE Machine leaning Introduction</Timeline.Title>
                        <Timeline.Body>
                            IEEE CRM Chapter will have a Machine leaning introduction seminar in mini hall 1.
                        </Timeline.Body>
                        <div className='flex'>
                            <button className="flex bg-blue-600 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaEye className="mr-2" />
                                View
                            </button>
                            <button className="flex bg-yellow-400 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaRegEdit className="mr-2 " />
                                Edit
                            </button>
                            <button className="flex bg-red-500 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <MdDelete className="mr-2 " />
                                Remove
                            </button>
                        </ div>
                    </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Time>3:30 PM</Timeline.Time>
                        <Timeline.Title>IEEE Machine leaning Introduction</Timeline.Title>
                        <Timeline.Body>
                            IEEE CRM Chapter will have a Machine leaning introduction seminar in mini hall 1.
                        </Timeline.Body>
                        <div className='flex'>
                            <button className="flex bg-blue-600 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaEye className="mr-2" />
                                View
                            </button>
                            <button className="flex bg-yellow-400 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <FaRegEdit className="mr-2 " />
                                Edit
                            </button>
                            <button className="flex bg-red-500 text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                <MdDelete className="mr-2 " />
                                Remove
                            </button>
                        </ div>
                    </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                    <Timeline.Point icon={FaExternalLinkAlt} />
                    <Timeline.Content>
                        <Timeline.Title>
                            <button className="flex bg-black text-white justify-center items-center m-1 px-3 py-1 rounded text-sm">
                                View all events
                            </button>
                        </Timeline.Title>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
            </div>
        </div>
    );
}
