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
  // keyCheckedValue = ''

  // if (keyCheckedValue === true) {
  // 	keyCheckedValue = 'dogs';
  // } if else (keyCheckedValue === false) {
  // 	keyCheckedValue = 'cats'
  // }

  //   if (dogCheck === "dogtrue") {
  //     type = "dog";
  //   } else if (catCheck === "cattrue") {
  //     type = "cat";
  //   } else {
  //     type = "";
  //   }

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
