import { Alert, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
export default function AddClubs() {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [club_founder_name, setClub_founder_name] = useState("");
  const [About, setAbout] = useState("");
  const [purpose, setPurpose] = useState("");
  const [logoSaved, setLogoSaved] = useState([false,""])
  const [VDocs, setVDocs] = useState(null)
  const [VDocsSaved, setVDocsSaved] = useState([false,""])
  
  const createClub = async (e) => {
    e.preventDefault();
    console.log(logoSaved[1]);
    const send = await fetch("http://localhost:5000/admin/addclub", {
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
        docs:VDocsSaved[1],
        logo:logoSaved[1]
      }),
    });
    const res = await send.json();
    console.log(res);
  };
  const uploadLogo = async (e) => {
    const formData = new FormData();
    formData.append('logo', e);
    const send = await fetch("http://localhost:5000/admin/clublogo", {
      method: "POST",
      mode: "cors",
      body: formData,
    
    });
    const res = await send.json()
    console.log(res);
    if(res.msg == "Done"){
      setLogoSaved([true,res.path])
    }else{
      setLogoSaved([false,""])
    }
  };
  const uploadVDocs = async (e) => {
    const formData = new FormData();
    formData.append('verification', e);
    const send = await fetch("http://localhost:5000/admin/clubverificationdocs", {
      method: "POST",
      mode: "cors",
      body: formData,
    
    });
    const res = await send.json()
    console.log(res);
    if(res.msg == "Done"){
      setVDocsSaved([true,res.path])
    }else{
      setVDocsSaved([false,""])
    }
  };
  return (
    <div className="flex justify-center">
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
        <div className="container flex max-w-sm  mx-4 flex-col gap-4 rounded-lg p-3 pl-5 pr-5">
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
          <div>
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
          <div>
            <div className="mb-2 block">
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="club_about" value="About club" />
            </div>
            <TextInput
              id="club_about"
              placeholder="Enter about  your club"
              required
              type="text"
              onChange={(e) => {setAbout(e.target.value)}}
              value={About}
            />
          </div>

          <div>
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="club_logo" value="Upload Club Logo" />
            </div>
            <TextInput
              id="club_logo"
              type="file"
              onChange={(e) => {uploadLogo(e.target.files[0])}}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="club_docs" value="Upload Verified Documents" />
            </div>
            <TextInput
              id="club_docs"
              type="file"
              onChange={(e) => {uploadVDocs(e.target.files[0])}}
            />
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
