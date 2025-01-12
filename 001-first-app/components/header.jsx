import Image from "next/image";
import { Fragment } from "react";

export default function Header(){
    return <Fragment>
        <Image src="/icon.png" alt="Icon" width={180} height={100} priority />
        <h1>NextJS Course</h1>
    </Fragment>
}