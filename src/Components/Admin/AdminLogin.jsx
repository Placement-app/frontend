import { Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { useCookies } from "react-cookie";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState([false, ""]);
  const [cookie, setCookie] = useCookies(["AAUAT"]);

  const navigate = useNavigate();
  document.title = "Signup | Placement App";

  const loginBtn = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (email == "" || password == "") {
      setAlert([true, "Please fill all the fields"]);
    } else {
      if (regex.test(password)) {
        const send = await fetch("http://localhost:5000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({ email, password }),
        });
        const { msg } = await send.json();
        console.log(msg);
        if (msg.token) {
          setCookie("AAUAT", msg.token);
          navigate("/admin");
        } else {
          setAlert([true, msg]);
        }
      } else {
        setAlert([
          true,
          "Your password must contain \n2 uppercase,2 lowercase and 2 numbers ",
        ]);
      }
    }
  };
  return (
    <div style={{ backgroundColor: "#070707",width:"100%", height: "100vh"  }}>
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh"}}
       >
        <form action="/">
          <div  style={{position:"absolute",top:0,left:0,width:"100%"}}>
            <div className="flex justify-center mx-5 mt-5">
            {alert[0] ? (
              <Alert
                color="failure"
                icon={HiInformationCircle}
              >
                <span>
                  <p>
                    <span className="font-medium">{alert[1]}</span>
                  </p>
                </span>
              </Alert>
            ) : null}
            
            </div>
          </div>
          <div className="mt-12 container flex max-w-sm  mx-4 flex-col gap-4 bg-black rounded-lg p-3 pl-5 pr-5">
            <h2 className="text-white text-center font-bold text-2xl mt-4">
              Master Login
            </h2>
            <h2 className="text-gray-500 text-center text-sm mx-4">
              Welcome Back user!, Login in placement app to get latest trenings
              of clubs and placements related news
            </h2>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  value="Your email"
                  className="text-white"
                />
              </div>
              <TextInput
                id="email1"
                placeholder="Eg. Joe@flowbite.com"
                required
                className="text-white bg-black"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
            <div>
              <h2 className="text-gray-500 text-xs">
                If Don't have account{" "}
                <Link
                  to="/signup"
                  className="text-white underline cursor-pointer"
                >
                  Create New One
                </Link>
              </h2>
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
