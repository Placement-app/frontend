import { Alert, Checkbox, Label, Spinner, TextInput, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { HiEye, HiInformationCircle } from 'react-icons/hi';
import { IoIosCloudDone } from "react-icons/io";
import { BiSolidErrorAlt } from "react-icons/bi";

export default function RequestCarousel() {
  const [imagepath, setImagepath] = useState([false, ""]);
  const [desc, setdesc] = useState("");
  const [AdminData, setAdminData] = useState({});
  const [cookie, setCookie] = useCookies(["CAAUAT"]);
  const [Warning, setWarning] = useState([false, ""])
  const [Success, setSuccess] = useState([false, ""])
  const [AlreadyReq, setAlreadyReq] = useState([false, {
    img: "",
    content: "",
    approval: ""
  }])
  const [ImageLoader, setImageLoader] = useState(false)
  const navigate = useNavigate()

  const check = async () => {
    const getUser = await fetch("http://192.168.1.35:5000/myclub/protected", {
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
  const uploadSiderImage = async (e) => {
    try {

      setImageLoader(true)
      const formData = new FormData();
      formData.append("carousel", e);
      const send = await fetch("http://192.168.1.35:5000/myclub/uploadcarousel", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      const res = await send.json();
      if (res.msg == "Done") {
        setImagepath([true, res.path]);
        setImageLoader(false)

      } else {
        setImageLoader(false)
        setImagepath([null, ""]);
      }

    } catch (error) {
      setImageLoader(false)
      setImagepath([null, ""]);
    }
  };
  const Request = async (e) => {
    e.preventDefault();
    if (imagepath[0] == false || desc == "") {
      setWarning([true, "Please fill all details!"])
      setSuccess([false, ""])
    } else {
      const send = await fetch("http://192.168.1.35:5000/myclub/addcarousel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          img: imagepath[1],
          content: desc,
          cid: AdminData.cid,
          logo: AdminData.logo,
          name: AdminData.name,
          founder: AdminData.founder
        }),
      });
      const res = await send.json();
      if (res.created) {
        setWarning([false, ""])
        setSuccess([true, res.msg])
        setAlreadyReq([true, {
          img: imagepath[1],
          content: desc,
          approval: "pending"
        }])

      } else {
        setWarning([true, res.msg])
        setSuccess([false, ""])
      }
    }
  };
  const Requested = async (e) => {
    const send = await fetch("http://192.168.1.35:5000/myclub/verify_carousel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ cid: AdminData.cid })
    });
    const res = await send.json();
    console.log(res);
    if (res) {
      if (res.carousel.img !== null) {
        setAlreadyReq([true, { ...res.carousel }])
      }
    } else {
      setAlreadyReq([null, { ...AlreadyReq[1] }])
    }

  }
  const Remove = async () => {
    const send = await fetch("http://192.168.1.35:5000/myclub/remove_carousel", {
      method: "DELETE",
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
    document.title = "Request Carousel | Club Admi"
    check()
    Requested()
  }, [AlreadyReq[0]])

  return (
    <>
      <div className="flex justify-center mx-4 pt-16">
        <div>
          <div className="flex justify-center item-center pt-5 pb-5 ">
            {Warning[0] ? <Alert color="failure" icon={HiInformationCircle} className="mx-4">
              <span>
                <p>
                  <span className="font-medium">{Warning[1]}</span>
                </p>
              </span>
            </Alert> : ""}
            {Success[0] ? <Alert color="success" icon={CiCircleCheck} className="mx-4">
              <span>
                <p>
                  <span className="font-medium">{Success[1]}</span>
                </p>
              </span>
            </Alert> : ""}
          </div>
          {AlreadyReq[0] ?
            <div className="container flex w-100 flex-col gap-4 rounded-lg">
              <h2 className="text-black text-center font-bold text-2xl mt-4">
                Your Carousel Request
              </h2>
              {AlreadyReq[1].approved == "Denied" ?
                <Alert color="failure" icon={HiInformationCircle} className="mx-4">
                  <p className="font-medium">
                    Oops! Well Tried but your carousel rejected but <span onClick={Remove} className="underline cursor-pointer"> Try again</span>
                  </p>
                </Alert> : ""
              }
              {AlreadyReq[1].approved == "Time Up" ?
                <Alert color="yellow" icon={HiInformationCircle} className="mx-4">
                  <p className="font-medium">
                    Ok! Well done but your carousel has been removed now <span onClick={Remove} className="underline cursor-pointer"> Try again</span>
                  </p>
                </Alert> : ""
              }
              {AlreadyReq[1].approved == "Approved" ?
                <Alert color="success" icon={HiInformationCircle} className="mx-4">
                  <p className="font-medium">
                    🎉 Congratulations! Your carouel has been approved.
                  </p>
                </Alert> : ""
              }

              <img className="rounded md:w-2/3" src={AlreadyReq[1].img !== "" ? `http://192.168.1.35:5000/myclub/carousel/${AlreadyReq[1].img}` : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJAAegMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAVEAEBAAAAAAAAAAAAAAAAAAAAAf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aw4AAAUAEAAAAAUAAAAURRRBQCCKgJVAQUAAUABABFEUUEVAAEAAQVBQUEVFAABQBAAoIAIAAAAALAAAAFURQEFqCACAAAAACwAAAAUAUSgCACAAAAAsQBQAAFUAAABBQRAEABQUAABQAAAAAAAAAQAFAAAAAAAAAAAEABQAAAAAAAB//2Q=="} alt="" />
              <div className="bg-black p-2 px-4 rounded " style={{ width: "fit-content" }}>
                <h2 className="text-white text-sm">
                  {AlreadyReq[1].approved}</h2>
              </div>

              <h2 className="text-lg">
                {AlreadyReq[1].content}
              </h2>
              {AlreadyReq[1].approved == "Denied" ? <div onClick={Remove} className="bg-black mb-10 p-2 px-6 rounded" style={{ width: "fit-content" }}>
                <h2 className="text-white text-sm">Try again</h2>
              </div> : ""}

            </div>
            :
            <div className="flex w-full justify-between sm:flex-row items-center sm:items-start">
              <div className="flex w-full flex-col gap-4 my-2 rounded-lg shadow-md border p-3 px-5 md:mr-20">
                <h2 className="text-black text-center font-bold text-2xl mt-4">
                  Request for carousel
                </h2>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="cimg"
                      value="Upload Your slider image"
                      className="text-gray-500"
                    />
                  </div>
                  {/* 
                  <TextInput
                    id="cimg"
                    placeholder="Upload image"
                    required
                    className="text-white"
                    type="file"
                    onChange={(e) => uploadSiderImage(e.target.files[0])}
                  /> */}
                  {/* <div className="w-full flex bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg w-full ps-10 py-2 "> */}
                  <div className="w-full flex items-center justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full pr-5 ">
                    <input type="file" placeholder="Search branch name..." required onChange={(e) => uploadSiderImage(e.target.files[0])} />
                    {
                      imagepath[0] == true ? <IoIosCloudDone style={{ width: 30, height: 30 }} color="green" /> : ImageLoader ? <Spinner /> : imagepath[0] == null ? <BiSolidErrorAlt style={{ width: 25, height: 25 }} color="red" /> : null
                    }
                  </div>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="des"
                      value="Describe  a Request query"
                      className="text-gray-500"
                    />
                  </div>
                  <textarea
                    onChange={(e) => setdesc(e.target.value)}
                    value={desc}
                    id="des"
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                    placeholder="Enter description...."
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
      </div>

    </>
  );
}
