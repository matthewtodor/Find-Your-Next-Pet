const searchButtonHandler = async function (event) {
  event.preventDefault();
  const keyCheck = await document.querySelectorAll(".form-check-input");
  let keyCheckedValue = "";

  keyCheck[0].checked == true
    ? (keyCheckedValue = "dog")
    : keyCheck[1].checked == true
    ? (keyCheckedValue = "cat")
    : (keyCheckedValue = "");

  console.log(keyCheckedValue);

  const limitCheck = await document.querySelector("#valueNum");
  console.log(limitCheck);

  const response = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify({
      // typeValue: type,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/seachpage");
  } else {
    alert("something went wrong");
  }
};
document
  .querySelector("#searchbutton")
  .addEventListener("click", searchButtonHandler);
