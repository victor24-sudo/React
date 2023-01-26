import { useEffect, useRef, useState } from "react"

export default function CountDown({seconds}){

    const[countdown, setCountDown] = useState(seconds);
    const timerId = useRef;

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountDown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(()=> {
        if (countdown <= 0){
            clearInterval(timerId.current);
            alert("FIN DEL JUEGO");
            window.location.reload();
        }
    })

    return(
        <h2>Tiempo: {countdown}</h2>
    )

}