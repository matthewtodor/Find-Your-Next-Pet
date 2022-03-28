const delButtonHandler = async (event) => {
    console.log("I'm want to delete this one  ",  event.target.Id)
    event.preventDefault();

    if (event.target.matches(".unsaveBtn")) {
    let btnElId = event.target.id;
    const { id } = event.target.dataset;
        const response = await fetch(`/api/pets/${{id}}`, {
        method: 'DELETE',
    });

        if (response.ok) {
            document.location.replace('/pets');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('.savedpetslist')
    .addEventListener('click', delButtonHandler);