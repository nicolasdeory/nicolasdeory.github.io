import { MutableRefObject, useEffect, useRef } from "react";

type ProjectGridElementProps = {
    children: JSX.Element | JSX.Element[];
    ref: MutableRefObject<HTMLDivElement>
}

export default function ProjectGridElement({children, ref}: ProjectGridElementProps) {

    // const ref = useRef<HTMLDivElement>();

    // // This doesn't account for browser window resizing, but that would introduce a lot of unnecessary overhead
    // useEffect(() => 
    // {
    //     console.log(ref.current.clientHeight);
    // }, [ref]);

    return <div ref={ref}>{children}</div>;
}