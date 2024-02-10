import { Alert, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";

export default function AddClubs() {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [club_founder_name, setClub_founder_name] = useState("");
  const [About, setAbout] = useState("");
  const [purpose, setPurpose] = useState("");
  const [logoSaved, setLogoSaved] = useState([null, ""])
  const [VDocsSaved, setVDocsSaved] = useState([false, ""])
  const [MainWarning, setMainWarning] = useState([false, "Please fill all the fields!"])
  const [MainSuccess, setMainSuccess] = useState([false, ""])
  const createClub = async (e) => {
    e.preventDefault();
    if (Name == "" || email == "" || club_founder_name == "" || About == "" || purpose == "" || logoSaved[0] == false || VDocsSaved[0] == false) {
      setMainSuccess([false, ""])
      setMainWarning([true, "Please fill all the fields!"])
    } else {
      const send = await fetch("http://192.168.1.35:5000/admin/addclub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",

        body: JSON.stringify({
          name: Name,
          email: email,
          about: About,
          founder: club_founder_name,
          statement: purpose,
          docs: VDocsSaved[1],
          logo: logoSaved[1]
        }),
      });
      const res = await send.json();
      console.log(res);
      if (res.created === false) {
        setMainWarning([true, res.msg])
        setMainSuccess([false, ""])
      } else {
        setMainWarning([false, ""])
        setMainSuccess([true, "Club Created sucessfully."])

      }
    }
  };

  const uploadLogo = async (e) => {

    try {

      const formData = new FormData();
      formData.append('logo', e);
      const send = await fetch("http://192.168.1.35:5000/admin/clublogo", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      const res = await send.json()

      if (res.msg == "Done") {
        setLogoSaved([true, res.path])
      } else {
        setLogoSaved([false, ""])
      }
    } catch (e) {
      setLogoSaved([false, "File not uploaded"])
    }
  };
  const uploadVDocs = async (e) => {
    const formData = new FormData();
    formData.append('verification', e);
    const send = await fetch("http://192.168.1.35:5000/admin/clubverificationdocs", {
      method: "POST",
      mode: "cors",
      body: formData,

    });
    const res = await send.json()
    console.log(res);
    if (res.msg == "Done") {
      setVDocsSaved([true, res.path])
    } else {
      setVDocsSaved([false, ""])
    }
  };
  return (
    <div className="flex justify-center w-full p-6 sm:p-16">
      <div className="fixed" style={{ zIndex: 10, width: "100%", top: 60 }} id="notif">
        <div className="flex w-full justify-center items-center">
          <Alert color="failure" icon={HiInformationCircle} className="mx-4" style={{ display: MainWarning[0] ? null : "none" }}>
            <span className="flex justify-center items-center">
              <p>
                <span className="font-medium mr-2">{MainWarning[1]}</span>
              </p>
              <IoMdCloseCircle size={20} className="cursor-pointer" onClick={e => { setMainWarning([false, ""]) }} />
            </span>
          </Alert>
          <Alert color="success" icon={HiInformationCircle} className="mx-4" style={{ display: MainSuccess[0] ? null : "none" }}>
            <span className="flex justify-center items-center">
              <p>
                <span className="font-medium">{MainSuccess[1]}</span>
              </p>
              <IoMdCloseCircle size={20} className="cursor-pointer" onClick={e => { setMainWarning([false, ""]) }} />
            </span>
          </Alert>
        </div>
      </div>
      <form action="/" style={{ width: "100%" }}>
        <div className="container flex flex-col gap-4 rounded-lg px-3  pt-10">
          <h2 className="text-center font-bold text-2xl mt-4">Add New Club</h2>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="club_name" value="Club Name" />
            </div>
            <TextInput
              id="club_name"
              placeholder="Enter your club name"
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full">
            <div className="md:w-1/2 w-full mr-1">
              <div className="mb-2 block">
                <Label htmlFor="club_founder_email" value="Founder's Email" />
              </div>
              <TextInput
                id="club_founder_email"
                placeholder="Enter your club founder's email"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="md:w-1/2 w-full ml-1">
              <div className="mb-2">
                <Label htmlFor="club_founder_name" value="Founder's Name" />
              </div>
              <TextInput
                id="club_founder_name"
                placeholder="Enter your club founder's name"
                required
                type="text"
                onChange={(e) => setClub_founder_name(e.target.value)}
                value={club_founder_name}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col w-full">
            <div className="md:w-1/2 w-full mr-1">
              <div className="mb-2 ">
                <Label htmlFor="club_about" value="About club" />
              </div>
              <TextInput
                id="club_about"
                placeholder="Enter about  your club"
                required
                type="text"
                onChange={(e) => { setAbout(e.target.value) }}
                value={About}
              />
            </div>
            <div className="md:w-1/2 w-full ml-1">
              <div className="mb-2 block">
                <Label
                  htmlFor="club_purpose"
                  value="Statement purppose of your club"
                />
              </div>
              <TextInput
                id="club_purpose"
                placeholder="Enter statement of purppose"
                required
                type="text"
                onChange={(e) => setPurpose(e.target.value)}
                value={purpose}
              />
            </div>

          </div>

          <div className="flex md:flex-row flex-col w-full">
            <div className="md:w-1/2 w-full mr-1">
              <div className="mb-2 block">
                <Label htmlFor="club_logo" value="Upload Club Logo" />
              </div>
              <div style={{ display: logoSaved == null ? "none" : logoSaved == false ? null : "none" }}>
                <Alert
                  color="failure"
                  icon={HiInformationCircle}
                >
                  <span>
                    <p>
                      File not uploaded
                    </p>
                  </span>
                </Alert>
              </div>
              <TextInput
                id="club_logo"
                type="file"
                onChange={(e) => { uploadLogo(e.target.files[0]) }}
              />
            </div>
            <div className="md:w-1/2 w-full ml-1">
              <div className="mb-2 block">
                <Label htmlFor="club_docs" value="Upload Verified Documents" />
              </div>
              <TextInput
                id="club_docs"
                type="file"
                onChange={(e) => { uploadVDocs(e.target.files[0]) }}
              />
            </div>
          </div>

          <button
            onClick={createClub}
            className="border-2 border mb-4 rounded-lg pt-2 pb-2 bg-black text-white"
            required
          >
            Add Club
          </button>
        </div>
      </form>
    </div>
  );
}
