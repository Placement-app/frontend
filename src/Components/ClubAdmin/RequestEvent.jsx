import { Alert, Label, Spinner, Toast, Datepicker } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { HiInformationCircle } from 'react-icons/hi';


export default function RequestEvent() {
    const [data, setData] = useState({
        title: "",
        description: "",
        link: "",
        content: "",
        timeStart: "",
        timeEnd: ""
    });
    const [AdminData, setAdminData] = useState({});
    const [cookie, setCookie] = useCookies(["CAAUAT"]);
    const [Warning, setWarning] = useState([false, ""])
    const [Success, setSuccess] = useState([false, ""])
    const [AlreadyReq, setAlreadyReq] = useState([false, {
        title: "",
        description: "",
        link: "",
        content: "",
        approval: "",
        timeStart: "",
        timeEnd: ""
    }])
    const navigate = useNavigate()

    const check = async () => {
        const getUser = await fetch("http://localhost:5000/myclub/protected", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ token: cookie.CAAUAT }),
        });
        const findbyCid = await getUser.json();
        if (findbyCid.msg == "Access granted") {
            setAdminData({
                name: findbyCid.name,
                id: findbyCid._id,
                email: findbyCid.email,
                founder: findbyCid.founder,
                about: findbyCid.about,
                statement: findbyCid.statement,
                cid: findbyCid.cid,
                logo: findbyCid.logo,
            });
        } else {
            navigate("/myclub/login");
        }
    };
    const Request = async (e) => {
        e.preventDefault();
        if (data.content === "" || data.description === "" || data.timeStart === "" || data.timeEnd === "" || data.title === "") {
            setWarning([true, "Please fill all details!"])
            setSuccess([false, ""])
        } else {
            const send = await fetch("http://localhost:5000/myclub/addevent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    cid: AdminData.cid,
                    title: data.title,
                    description: data.description,
                    content: data.content,
                    link: data.link,
                    timeStart: data.timeStart,
                    timeEnd: data.timeEnd,
                    name: AdminData.name,
                }),
            });
            const res = await send.json();
            console.log(res);
            if (res.created) {
                setWarning([false, ""])
                setSuccess([true, res.msg])
                setAlreadyReq([true, {
                    title: data.title,
                    description: data.description,
                    link: data.link,
                    content: data.content,
                    approval: "Pending"
                }])

            } else {
                setWarning([true, res.msg])
                setSuccess([false, ""])
            }
        }
    };
    const Requested = async (e) => {
        try {

            const send = await fetch("http://localhost:5000/myclub/verify_event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({ cid: AdminData.cid })
            });
            const res = await send.json();
            if (res) {
                if (res.event.title !== null && res.event.title !== undefined) {
                    setAlreadyReq([true, { ...res.event }])
                    console.log(res.event);
                }
            } else {
                setAlreadyReq([null, { ...AlreadyReq[1] }])
            }

        } catch (error) {

        }

    }
    const Remove = async () => {
        const send = await fetch("http://localhost:5000/myclub/remove_event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                cid: AdminData.cid,
            }),
        });
        const res = await send.json();
        if (res.removed) {
            setWarning([false, ""])
            setSuccess([true, res.msg])
            setAlreadyReq([false, {
                img: "",
                content: "",
                approval: ""
            }])
            Requested()
        } else {
            setWarning([true, res.msg])
            setSuccess([false, ""])
        }
    }
    useEffect(() => {
        document.title = "Request Event | Club Admin"
        check()
        Requested()
    }, [AlreadyReq[0]])

    return (
        <>
            <div className="flex justify-center mx-4 pt-16">
                <div className="flex justify-center item-center pt-5 pb-5 fixed">
                    {Warning[0] ? <Alert color="failure" icon={HiInformationCircle} className="mx-4 shadow">
                        <span>
                            <p>
                                <span className="font-medium">{Warning[1]}</span>
                            </p>
                        </span>
                    </Alert> : ""}
                    {Success[0] ? <Alert color="success" icon={CiCircleCheck} className="mx-4 shadow">
                        <span>
                            <p>
                                <span className="font-medium">{Success[1]}</span>
                            </p>
                        </span>
                    </Alert> : ""}
                </div>
               
                {AlreadyReq[0] ?
                    <div className="container flex w-100 flex-col rounded-lg">
                        <h2 className="text-black text-center font-bold text-2xl mt-4">
                            Your Event Request
                        </h2>
                        {AlreadyReq[1].approved == "Denied" ?
                            <Alert color="failure" icon={HiInformationCircle} className="mx-4">
                                <p className="font-medium">
                                    Oops! Well Tried but your news rejected but <span onClick={Remove} className="underline cursor-pointer"> Try again</span>
                                </p>
                            </Alert> : ""
                        }
                        {AlreadyReq[1].approved == "Time Up" ?
                            <Alert color="yellow" icon={HiInformationCircle} className="mx-4">
                                <p className="font-medium">
                                    Ok! Well done but your Event has been removed now <span onClick={Remove} className="underline cursor-pointer"> Try again</span>
                                </p>
                            </Alert> : ""
                        }
                        {AlreadyReq[1].approved == "Approved" ?
                            <Alert color="success" icon={HiInformationCircle} className="mx-4">
                                <p className="font-medium">
                                    🎉 Congratulations! Your Event has been approved.
                                </p>
                            </Alert> : ""
                        }
                        <div className="flex justify-between w-full mt-10">
                            <div>
                                <h5 className="text-sm text-gray-500 font-bold">Timings</h5>
                                <p className="font-bold text-gray-700"><span className="text-sm text-gray-500 font-bold mr-2 ml-2">Start </span> {AlreadyReq[1].timeStart !== "" && AlreadyReq[1].timeStart !== undefined ? AlreadyReq[1].timeStart.split("T").map(e => e + "  ") : null}</p>
                                <p className="font-bold text-gray-700"><span className="text-sm text-gray-500 font-bold mr-5 ml-2">End</span>{AlreadyReq[1].timeEnd !== "" && AlreadyReq[1].timeEnd !== undefined ? AlreadyReq[1].timeEnd.split("T").map(e => e + "  ") : null}</p>
                            </div>
                            <h2 className="text-white text-sm bg-black p-2 px-4 rounded " style={{ width: "fit-content", height: "fit-content" }}>
                                {AlreadyReq[1].approved}</h2>
                        </div>
                        <h5 className="text-sm text-gray-500 font-bold mt-6">Heading</h5>
                        <p className="text-2xl">{AlreadyReq[1].title}</p>
                        <h5 className="text-sm text-gray-500 font-bold mt-6">Description</h5>
                        <h5>{AlreadyReq[1].description}</h5>
                        <h5 className="text-sm text-gray-500 font-bold mt-6">Proposal</h5>
                        <h5>{AlreadyReq[1].content}</h5>

                        {AlreadyReq[1].approved == "Denied" ? <div onClick={Remove} className="bg-black mb-10 p-2 px-6 rounded" style={{ width: "fit-content" }}>
                            <h2 className="text-white text-sm">Try again</h2>
                        </div> : ""}

                    </div>
                    :
                    <div className="flex w-full justify-between sm:flex-row items-center sm:items-start">
                        <div className="flex w-full flex-col gap-4 my-2 rounded-lg shadow-md border p-3 px-5 md:mr-20">
                            <h2 className="text-black text-center font-bold text-2xl mt-4">
                                Request for Event
                            </h2>
                            <div>
                                <Label
                                    value="Add a title"
                                    className="text-gray-500"
                                />
                                <input onChange={(e) => setData({ ...data, title: e.target.value })} value={data.title} type="text" className="block w-full border hover:boreder-gray-600 disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg" placeholder="Enter your title" />
                            </div>
                            <div>
                                <Label
                                    value="Add a discription"
                                    className="text-gray-500"
                                />
                                <textarea onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} type="text" className="block w-full border hover:boreder-gray-600 disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg" placeholder="Enter your description" required ></textarea>
                            </div>
                            <div>

                                <Label
                                    value="Add a link if needed"
                                    className="text-gray-500"
                                />
                                <input onChange={(e) => setData({ ...data, link: e.target.value })} value={data.link} type="text" className="block w-full border hover:boreder-gray-600 disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg" placeholder="i.e google forms, website etc..." required />
                            </div>
                            <div>
                                <Label
                                    value="Add a starting time"
                                    className="text-gray-500"
                                />
                                <input type="datetime-local" onChange={(e) => setData({ ...data, timeStart: e.target.value })} value={data.timeStart} className="block w-full border hover:boreder-gray-600 disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg" placeholder="i.e google forms, website etc..." required />
                            </div>
                            <div>
                                <Label
                                    value="Add a ending time"
                                    className="text-gray-500"
                                />
                                <input type="datetime-local"  onChange={(e) => setData({ ...data, timeEnd: e.target.value })} value={data.timeEnd} className="block w-full border hover:boreder-gray-600 disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg" placeholder="i.e google forms, website etc..." required />
                            </div>
                            <div className="mb-2 block">
                                <Label
                                    value="Describe a Request query"
                                    className="text-gray-500"
                                />
                                <textarea
                                    onChange={(e) => setData({ ...data, content: e.target.value })}
                                    value={data.content}
                                    className="block w-full border hover:boreder-gray-600  disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg"
                                    placeholder="Enter your proposal...."
                                    style={{ width: "100%", height: 100 }}
                                ></textarea>
                            </div>

                            <button
                                onClick={Request}
                                className="bg-black mb-4 text-white rounded-lg pt-2 pb-2"
                                required
                            >
                                Request
                            </button>
                        </div>
                        <div className="ml-2 my-2 w-1/2">
                            <Alert
                                color="success"
                                icon={HiInformationCircle}
                                rounded
                                additionalContent={<h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ex molestias voluptatem quas.</h5>}
                            >
                                <span className="font-medium">Info alert!</span>  Change a few things
                            </Alert>
                            <Alert
                                color="warning"
                                icon={HiInformationCircle}
                                rounded
                                className="my-2"
                                additionalContent={<h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ex molestias voluptatem quas.</h5>}
                            >
                                <span className="font-medium">Info alert!</span> Change a few things
                            </Alert>
                            <Alert
                                color="failure"
                                icon={HiInformationCircle}
                                rounded
                                className="my-2"
                                additionalContent={<h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ex molestias voluptatem quas.</h5>}
                            >
                                <span className="font-medium">Info alert!</span> Change a few things
                            </Alert>
                        </div>
                    </div>
                }

            </div>

        </>
    );
}
