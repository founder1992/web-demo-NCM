import React, { useState, useEffect } from 'react';

import Header from '@views/home/header'
import Body from '@views/home/body'

interface IHomeProps {
    history: any
}

const Home: React.SFC<IHomeProps> = function (props) {
    const [toggled, setToggled] = useState(false);
    const [init, setInit] = useState(true);
    const bodyRef: React.RefObject<any> = React.createRef();

    let ticking = false; // rAF 触发锁
    let preTop = 0;

    function onScroll(e: any): void{
        if(!ticking) {
            requestAnimationFrame(judgeScroll);
            ticking = true;
        }
    }

    function judgeScroll() {
        const up = preTop > window.pageYOffset;
        if (!up && !toggled) {
            setToggled(true)
        } else if (up && window.pageYOffset <= 1) {
            setToggled(false)
        }
        setInit(false);
        preTop = window.pageYOffset;

        ticking = false;
    }

    useEffect((): void => {
        bodyRef.current.addEventListener("touchstart", () => {
            window.addEventListener("scroll", onScroll)
        });
        bodyRef.current.addEventListener("touchend", () => {
            window.removeEventListener("scroll", onScroll)
        })
    }, []);

    return (
        <div ref={bodyRef}>
            <Header toggled={toggled} init={init} rh={props.history} />
            <Body toggled={toggled} />
        </div>
    );
};

export default Home