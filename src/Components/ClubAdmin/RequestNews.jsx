import { Alert, Label, Spinner, Toast, Datepicker } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { HiInformationCircle } from 'react-icons/hi';


export default function RequestNews() {
    const [data, setData] = useState({
        head: "",
        description: "",
        link: "",
        content: "",
        date:""
    });
    const [AdminData, setAdminData] = useState({});
    const [cookie, setCookie] = useCookies(["CAAUAT"]);
    const [Warning, setWarning] = useState([false, ""])
    const [Success, setSuccess] = useState([false, ""])
    const [AlreadyReq, setAlreadyReq] = useState([false, {
        head: "",
        description: "",
        link: "",
        content: "",
        approval: "",
        date:""
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
        if (data.content === "" || data.description === "" || data.head === "") {
            setWarning([true, "Please fill all details!"])
            setSuccess([false, ""])
        } else {
            const send = await fetch("http://localhost:5000/myclub/addnews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    head: data.head,
                    description: data.description,
                    link: data.link,
                    content: data.content,
                    cid: AdminData.cid,
                    logo: AdminData.logo,
                    name: AdminData.name,
                    founder: AdminData.founder
                }),
            });
            const res = await send.json();
            console.log(res);
            if (res.created) {
                setWarning([false, ""])
                setSuccess([true, res.msg])
                setAlreadyReq([true, {
                    head: data.head,
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

            const send = await fetch("http://localhost:5000/myclub/verify_news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({ cid: AdminData.cid })
            });
            const res = await send.json();
            if (res) {
                if (res.news.head !== null && res.news.head !== undefined) {
                    setAlreadyReq([true, { ...res.news }])
                }
            } else {
                setAlreadyReq([null, { ...AlreadyReq[1] }])
            }

        } catch (error) {

        }

    }
    const Remove = async () => {
        const send = await fetch("http://localhost:5000/myclub/remove_news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                cid: AdminData.cid
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
        document.title = "Request News | Club Admin"
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
                            Your News Request
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
                                    Ok! Well done but your News has been removed now <span onClick={Remove} className="underline cursor-pointer"> Try again</span>
                                </p>
                            </Alert> : ""
                        }
                        {AlreadyReq[1].approved == "Approved" ?
                            <Alert color="success" icon={HiInformationCircle} className="mx-4">
                                <p className="font-medium">
                                    🎉 Congratulations! Your News has been approved.
                                </p>
                            </Alert> : ""
                        }
                        <div className="flex justify-between w-full mt-10">
                            <div>
                                <h5 className="text-sm text-gray-500 font-bold">Date</h5>
                                <p className="font-bold text-gray-700">{AlreadyReq[1].date!=="" && AlreadyReq[1].date!==undefined?new Date(AlreadyReq[1].date).toISOString().split("T")[0]:null}</p>
                            </div>
                            <h2 className="text-white text-sm bg-black p-2 px-4 rounded " style={{ width: "fit-content", height: "fit-content" }}>
                                {AlreadyReq[1].approved}</h2>
                        </div>
                        <h5 className="text-sm text-gray-500 font-bold">Heading</h5>
                        <p className="text-2xl">{AlreadyReq[1].head}</p>
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
                                Request for News
                            </h2>
                            <div>
                                <Label
                                    value="Add a headline"
                                    className="text-gray-500"
                                />
                                <input onChange={(e) => setData({ ...data, head: e.target.value })} value={data.head} type="text" className="block w-full border hover:boreder-gray-600 disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg" placeholder="Enter your headline" />
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
                            {/* <div>
                                <Label
                                    value="Add a link if needed"
                                    className="text-gray-500"
                                />
                                <input type="date" min={new Date().toISOString().split("T")[0]} onChange={(e) => setData({ ...data, date: e.value })} value={data.date} className="block w-full border hover:boreder-gray-600 disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg" placeholder="i.e google forms, website etc..." required />
                            </div> */}
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
