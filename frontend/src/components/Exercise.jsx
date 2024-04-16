

export const Exercise = (exercise) => {
    const {name, photo, photo_url, description} = exercise.exercise
    const imageUrl = photo_url ? photo_url : photo

    return (
        <>
            <h4 className="m-3">{name}</h4>
            <div className="bg-light d-flex mt-3" style={{minWidth: "500px"}}>
                <img
                    src={imageUrl}
                    width="130"
                    alt="Logo"
                    className="m-2"
                />
                <p className="m-2 overflow-hidden">{description}</p>
            </div>
        </>
    )
}