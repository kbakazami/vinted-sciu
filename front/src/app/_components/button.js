import Link from "next/link";

export default function Button(props) {

    return (
        <>
            {
                props.onClick

                    ? <button className={`btn btn-primary ${props.className}`} onClick={props.onClick}>
                        { props.children }
                        { props.content }
                    </button>

                    : <Link className={`btn btn-primary ${props.className}`} href={ props.href }>
                        { props.children }
                        { props.content }
                    </Link>
            }
        </>

    )
}