export default function Info(props) {
    return (
        <div className={`flex flex-col items-center ${props.className}`}>
            <h2>{ props.title }</h2>
            <div className="bg-secondary w-full text-center mt-6 py-5 px-4 lg:px-14">
                { props.children }
            </div>
        </div>
    )
}