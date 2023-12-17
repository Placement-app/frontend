import { Alert, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function RequestCarousel() {
  const [imagepath, setImagepath] = useState([false, ""]);
  const [price, setPrice] = useState(0);
  const [desc, setdesc] = useState("");
  const [AdminData, setAdminData] = useState({});
  const [cookie, setCookie] = useCookies(["AAUAT"]);
  const navigate = useNavigate()
  const check = async () => {
    const getUser = await fetch("http://localhost:5000/myclub/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.CAUAT }),
    });
    const findbyCid = await getUser.json();
    console.log(findbyCid);
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
    console.log(e);
    const formData = new FormData();
    formData.append("carousel", e);
    const send = await fetch("http://localhost:5000/myclub/uploadcarousel", {
      method: "POST",
      mode: "cors",
      body: formData,
    });
    const res = await send.json();
    console.log(res);
    if (res.msg == "Done") {
      setImagepath([true, res.path]);
    } else {
      setImagepath([false, ""]);
    }
  };
  const request = async (e) => {
    console.log(AdminData);
    e.preventDefault();
    if (imagepath[0] == false || price == "" || desc == "") {
      console.log("please fill all details");
    } else {
      console.log(AdminData.logo);
      const send = await fetch("http://localhost:5000/myclub/addcarousel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          img: imagepath[1],
          price,
          content: desc,
          cid: AdminData.cid,
          logo:AdminData.logo,
          name:AdminData.name,
          founder:AdminData.founder
        }),
      });
      const res = await send.json();
      console.log(res);
    }
  };
  useEffect(() => {
    check()
    
  }, [])
  

  return (
    <div className="flex justify-center item-center">
      <form action="/">
        <div className="flex justify-center item-center pt-5 pb-5 ">
          {alert[0] ? (
            <Alert color="failure" icon={HiInformationCircle} className="mx-4">
              <span>
                <p>
                  <span className="font-medium">{alert[1]}</span>
                </p>
              </span>
            </Alert>
          ) : null}
        </div>
        <div className=" container flex w-100 mx-4 flex-col gap-4 rounded-lg p-3 pl-5 pr-5">
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
            <TextInput
              id="cimg"
              placeholder="Upload image"
              required
              className="text-white"
              type="file"
              onChange={(e) => uploadSiderImage(e.target.files[0])}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="bprice"
                value="Enter biding price"
                className="text-gray-500"
              />
            </div>
            <TextInput
              id="bprice"
              placeholder="Enter price in ₹ "
              required
              className="text-white"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="des"
                value="Describe  a request query"
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
            onClick={request}
            className="bg-black mb-4 text-white rounded-lg pt-2 pb-2"
            required
          >
            Request
          </button>
        </div>
      </form>
    </div>
  );
}
