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
  });
  console.log("we got there");
  console.log(response);
  response.then(function (data) {
    if (data.ok) {
      // console.log("please come back to me baby");
      // data.JSON.then(function (result) {
      //   console.log(result);
      // });
      console.log(data);
      console.log(data.body);
      console.log(data.json());
      // function searchData(data) {
      //   return data.json()
      // }
      // let result = await searchData()
      // console.log(result);

      searchEl = document.getElementById("searchresults");
      const searchCard = `<div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <div class="savedpetimageholder">
            <img src="{{petSearchCall.[0].primary_photo_cropped.full}}" href="/pets/:id" class="img-fluid" alt="{{description}}">
          </div>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <i class="savedhearticon"><button id="{{id}}">Save</button></i>
            <h5 class="card-title">{{name}}</h5>
            <ul class="card-text" style="list-style: none;">
              <li>{{gender}}</li>
              <li>{{breed.primary}}</li>
              <li>{{age}}</li>
            </ul>
            <p class="card-text"><small class="text-muted">{{contact.address.postcode}}</small></p>
          </div>
        </div>
      </div>
    </div>`;
      searchEl.innerHTML = ``;

      //   searchEl.innerHTML = `<div class="card mb-3">
      //   <div class="row g-0">
      //     <div class="col-md-4">
      //       <div class="savedpetimageholder">
      //         <img src="${data[0].primary_photo_cropped.full}" href="/pets/:id" class="img-fluid" alt="{{description}}">
      //       </div>
      //     </div>
      //     <div class="col-md-8">
      //       <div class="card-body">
      //         <i class="savedhearticon"><button id="{{id}}">Save</button></i>
      //         <h5 class="card-title">${name}</h5>
      //         <ul class="card-text" style="list-style: none;">
      //           <li>${gender}</li>
      //           <li>${breed.primary}</li>
      //           <li>${age}</li>
      //         </ul>
      //         <p class="card-text"><small class="text-muted">${contact.address.postcode}</small></p>
      //       </div>
      //     </div>
      //   </div>
      // </div>`;

      // document.location.replace("/api/search");
    } else {
      console.log("something went wrong");
    }
  });
};
document
  .querySelector("#searchbutton")
  .addEventListener("click", searchButtonHandler);
