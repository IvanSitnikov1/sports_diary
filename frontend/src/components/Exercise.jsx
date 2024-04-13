import logo from '../logo192.png';

export const Exercise = () => {
    return (
        <>
            <h4 className="m-3">Упражнение 1</h4>
            <div className="bg-light d-flex mt-3" style={{minWidth: "500px"}}>
                <img
                    src={logo}
                    height="130"
                    width="130"
                    alt="Logo"
                    className="m-2"
                />
                <p className="m-2 overflow-hidden">
                    Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                </p>
            </div>
        </>
    )
}