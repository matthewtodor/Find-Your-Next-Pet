const searchButtonHandler = async function (event) {
	event.preventDefault();
	const keyCheck = await document.querySelectorAll(".form-check-input");
	let keyCheckedValue = "";

	keyCheck[0].checked == true ? (keyCheckedValue = "dog") : keyCheck[1].checked == true ? (keyCheckedValue = "cat") : (keyCheckedValue = "");

	console.log(keyCheckedValue);

	const limitCheck = await document.querySelector("#limitCheck");
	console.log(limitCheck.value);

	const response = fetch("/api/search", {
		method: "POST",
		body: JSON.stringify({
			keyCheck: keyCheckedValue,
			limitCheck: limitCheck.value,
			// typeValue: type,
		}),
		headers: { "Content-Type": "application/json" },
	}).then(document.location.reload());
};

const saveBtnHandler = async function (event) {
	event.preventDefault();
	if (event.target.matches(".favoritepet")) {
		// let btnElId = event.target.id;
		// const {
		//   type,
		//   pf_id,
		//   breeds,
		//   age,
		//   gender,
		//   name,
		//   size,
		//   description,
		//   photo,
		//   status,
		//   contact,
		//   published_at,
		// } = event.target.dataset;
		// console.log(btnElId);
		// console.log({
		//   type,
		//   pf_id,
		//   breeds,
		//   age,
		//   gender,
		//   name,
		//   size,
		//   description,
		//   photo,
		//   status,
		//   contact,
		//   published_at,
		// });
		const response = await fetch("/api/pets", {
			method: "POST",
			body: JSON.stringify(event.target.dataset),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			const data = await response.json();
			console.log("PET SAVED***  ", data);
		}
	}
	//look ay btn id
};
document
	.querySelector("#searchresultscontainer")
	// event delegation class favoritepet
	.addEventListener("click", saveBtnHandler);

document.querySelector("#searchbutton").addEventListener("click", searchButtonHandler);
