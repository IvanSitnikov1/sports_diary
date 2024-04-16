import logo from '../logo192.png';

export const Exercise = (exercise) => {
    return (
        <>
            <h4 className="m-3">{exercise.exercise.name}</h4>
            <div className="bg-light d-flex mt-3" style={{minWidth: "500px"}}>
                <img
                    src={exercise.exercise.photo}
                    height="130"
                    width="130"
                    alt="Logo"
                    className="m-2"
                />
                <p className="m-2 overflow-hidden">{exercise.exercise.description}</p>
            </div>
        </>
    )
}