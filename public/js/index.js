require('dotenv').config();

const key = "sW47nEJ6VGOP4yi0DTBFrQ5M82BOoXMmoA8Z5Jqtx9rhhqoeRH";
const secret = "OEPgGe511xyFpGLdy8Kzz6902FJX3brHxu5uGbec";

var pf = new petfinder.Client({
  apiKey: process.env.API_KEY,
  secret: process.env.SECRET,
});

pf.animal
  .search({
    type: "cat",
    // breed: searchBreed,
    // page,
    limit: 100,
  })
  .then(function (response) {
    console.log(response.data);
    // Do something with `response.data.animals`
  })
  .catch(function (error) {
    console.log(error);
    // Handle the error
  });