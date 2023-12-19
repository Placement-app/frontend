import { Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { useCookies } from "react-cookie";
export default function ClubAdminLogin() {
  const [cid, setCid] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState([false, ""]);
  const [cookie, setCookie] = useCookies(["CAAUAT"]);

  const navigate = useNavigate();
  document.title = "Login | Club Admin";

  const loginBtn = async (e) => {
    e.preventDefault();
    if (cid == "" || password == "") {
      setAlert([true, "Please fill all the fields"]);
    } else {
      const send = await fetch("https://psa-server-placement-system-application.vercel.app/myclub/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ id:cid, password }),
      });
      const { msg,token } = await send.json();
      console.log(msg);
      if (msg=="Access granted") {
        setCookie("CAAUAT", token);
        navigate("/myclub");

      } else {
        setAlert([true, msg]);
      }
    }
  };
  
  return (
    <div style={{ backgroundColor: "#070707" }}>
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <form action="/">
          <div className="flex justify-center item-center pt-5 pb-5 ">
            {alert[0] ? (
              <Alert
                color="failure"
                icon={HiInformationCircle}
                className="mx-4"
              >
                <span>
                  <p>
                    <span className="font-medium">{alert[1]}</span>
                  </p>
                </span>
              </Alert>
            ) : null}
          </div>
          <div className=" container flex max-w-sm  mx-4 flex-col gap-4 bg-black rounded-lg p-3 pl-5 pr-5">
            <h2 className="text-white text-center font-bold text-2xl mt-4">
              Club Admin Login
            </h2>
            <h2 className="text-gray-500 text-center text-sm mx-4">
              Welcome Back user!, Login in placement app to get latest trenings
              of clubs and placements related news
            </h2>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="cid"
                  value="Your club id"
                  className="text-white"
                />
              </div>
              <TextInput
                id="cid"
                placeholder="Club Id"
                required
                className="text-white bg-black"
                type="email"
                onChange={(e) => setCid(e.target.value)}
                value={cid}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  className="text-white"
                  value="Your password"
                />
              </div>
              <TextInput
                id="password1"
                required
                type="password"
                placeholder="••••••••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" required />
              <h2 className="text-gray-500 text-center text-xs">Remember me</h2>
            </div>
            <button
              type="submit"
              onClick={loginBtn}
              className="border-2 border-white mb-4 text-white rounded-lg pt-2 pb-2"
              required
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
