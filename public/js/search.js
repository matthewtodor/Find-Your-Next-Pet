const searchButtonHandler = async function (event) {
  event.preventDefault();
  const dogCheck = document.querySelector("#typedog");
  const catCheck = document.querySelector("#typecat");

  if (dogCheck === "dogtrue") {
    type = "dog";
  } else if (catCheck === "cattrue") {
    type = "cat";
  } else {
    type = "";
  }

  const response = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify({
      typeValue: type,
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
  .addEventListener("submit", searchButtonHandler);
