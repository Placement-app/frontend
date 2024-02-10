import { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [Carousels, setCarousels] = useState([])
    const [Events, setEvents] = useState([])
    const [News, setNews] = useState([])
    const [Loader, setLoader] = useState(true)
    const [cookie, setCookie] = useCookies(["PAUAT"]);
    const [Name, setName] = useState("")
    const [UserData, setUserData] = useState({})
    const [Clubs, setClubs] = useState([])
    const getData = async () => {
        const req = await fetch('http://192.168.1.35:5000/user/all', {
            method: "GET",
            mode: "cors",
        })
        const { carousels, events, news,clubs } = await req.json()
        setCarousels(carousels.map(e => e.carousel))
        setEvents(events.map(e => e.event))
        setNews(news)
        setClubs(clubs)
    }

    const check = async () => {
        const getUser = await fetch("http://192.168.1.35:5000/user/protected", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ token: cookie.PAUAT }),
        });
        const { msg, data } = await getUser.json();

        if (msg == "Access granted") {
            setName(data.name.slice(0, 2))
            setUserData(data)
            setCookie(['PAUAT', data])
        }
        if (msg == "User not found!") {
            setCookie(['PAUAT', null])
        }
    };

    useEffect(() => {
        getData()
        check()
        setLoader(false)
    }, [Loader])
    return (
        <UserContext.Provider value={{
            Carousels,
            Events,
            News,
            Clubs,
            Loader,
            setLoader,
            Name,
            User: UserData,
            cookie,
            setCookie,
        }}>
            {children}
        </UserContext.Provider>

    )
}

export { UserProvider, UserContext }