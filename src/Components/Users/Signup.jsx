import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { UserContext } from "../../Context/UserContext";

export default function Signup() {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regno, setRegno] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [alert, setAlert] = useState([false, ""]);
  const { setLoader, Loader, setCookie } = useContext(UserContext)

  const navigate = useNavigate();
  document.title = "Signup | Placement App";

  const signupBtn = async (e) => {
    e.preventDefault()
    setAlert([false, ""]);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (Name == "" || email == "" || password == "" || regno == "") {
      setAlert([true, "Please fill all the fields"]);
    } else {
      if (regex.test(password)) {
        if (password == cpassword) {
          const send = await fetch("https://psa-server.vercel.app/user/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ name: Name, email, password, regno }),
          });
          const { msg } = await send.json();
          if (msg.token) {
            setCookie('PAUAT', msg.token)
            setLoader(!Loader)
            navigate("/")
          } else {
            setAlert([true, "Something Went Wrong!"]);
          }
        } else {
          setAlert([
            true,
            "Your password and confirm password dosen't matches!",
          ]);
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
    <div style={{ backgroundColor: "#070707", height: "130vh" }}>
      <div className="flex justify-center pt-5 pb-5">
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
      <div className="flex justify-center items-center mt-14 sm:mt-0">
        <form>
          <div className="container flex max-w-sm flex-col gap-4 bg-black rounded-lg p-3 px-5">
            <h2 className="text-white text-center font-bold text-2xl mt-4">
              Sign Up
            </h2>
            <h2 className="text-gray-500 text-center text-sm mx-2">
              signup in placement app to get latest trenings of clubs and
              placements related news
            </h2>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="Your Name"
                  className="text-white"
                />
              </div>
              <TextInput
                id="name"
                placeholder="Eg. Joe"
                required
                className="text-white bg-black"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={Name}
              />
            </div>
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
                  htmlFor="regno"
                  value="Your Register Number"
                  className="text-white"
                />
              </div>
              <TextInput
                id="regno"
                placeholder="Eg. RA......"
                required
                className="text-white bg-black"
                type="text"
                onChange={(e) => setRegno(e.target.value)}
                value={regno}
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="mr-2">
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
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="password2"
                    className="text-white"
                    value="confirm password"
                  />
                </div>
                <TextInput
                  id="password2"
                  required
                  type="password"
                  placeholder="••••••••••••••"
                  onChange={(e) => setCPassword(e.target.value)}
                  value={cpassword}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" required />
              <h2 className="text-gray-500 text-center text-xs">
                I agree with the{" "}
                <span className="text-white underline cursor-pointer">
                  Terms & Conditions
                </span>
              </h2>
            </div>
            <div>
              <h2 className="text-gray-500 text-xs">
                Already have account {" "}
                <Link to="/login" className="text-white underline cursor-pointer">
                  Login Now
                </Link>
              </h2>
            </div>

            <button
              type="submit"
              onClick={signupBtn}
              className="border-2 border-white mb-4 text-white rounded-lg pt-2 pb-2"
              required
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
