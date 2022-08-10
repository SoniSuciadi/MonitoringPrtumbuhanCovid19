function getData() {
  return fetch("https://api.covid19api.com/summary")
    .then((respon) => respon.json())
    .then((respon) => respon.Countries);
  // .then((respon) => respon.Countries[10])
  // .then((respon) => respon.Country);
}
function showtable(pDataCovid, no) {
  return `<tr>
  <th scope="row">${no}</th>
                    <td>${pDataCovid.Country}</td>
                    <td>${pDataCovid.TotalConfirmed}</td>
                    <td>${pDataCovid.TotalDeaths}</td>
                    <td>${pDataCovid.TotalRecovered}</td>
                    <td><button type="button" class="button-detail btn btn-primary"  data-toggle="modal" data-target="#exampleModal" data-detail="${pDataCovid.Country}">
        Detail
    </button></td>
                    </tr>`;
}
async function app() {
  const dataCovid = await getData();
  let td = "";
  for (let i = 0; i < dataCovid.length; i++) {
    td += showtable(dataCovid[i], i + 1);
  }
  const tabelBody = document.querySelector(".tBody");
  tabelBody.innerHTML = td;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("button-detail")) {
    // console.log("oke");
    // const a = await getCountry(e.target.dataset.detail);
    const modal = showModal(await getCountry(e.target.dataset.detail));
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = modal;
    // const modal = await getCountry();
  }
});

async function setIndonesia() {
  const dataIndonesia = await getCountry("Indonesia");
  // console.log(dataIndonesia);
  const kasus = document.querySelector(".kasus");
  kasus.innerHTML = `Kasus <br>${dataIndonesia.TotalConfirmed}<br> Orang`;
  const meninggal = document.querySelector(".meniggal");
  meninggal.innerHTML = `Meninggal <br>${dataIndonesia.TotalDeaths}<br> Orang`;
  const sembuh = document.querySelector(".Sembuh");
  sembuh.innerHTML = `Sembuh <br>${dataIndonesia.TotalRecovered}<br> Orang`;
}
async function getCountry(country) {
  const dataAll = await getData();
  // console.log(dataAll);
  for (let i = 0; i < dataAll.length; i++) {
    if (dataAll[i].Country == country) {
      // console.log(dataAll[i]);
      return dataAll[i];
    }
  }
}
function showModal(country) {
  return `<div class="row">
                        <div class="col-md-4"><img src="https://www.countryflags.io/${country.CountryCode}/flat/64.png"></div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <h3>${country.Country}</h3>
                                </li>
                                <li class="list-group-item"><strong>Confirmed: </strong>${country.TotalConfirmed}</li>
                                <li class="list-group-item"><strong>Deaths: </strong>${country.TotalDeaths}</li>
                                <li class="list-group-item"><strong>Recovered: </strong>${country.TotalRecovered}</li>
                                <li class="list-group-item"><strong>New Confirmed: <br> </strong>${country.NewConfirmed}</li>
                                <li class="list-group-item"><strong>New Deaths: <br> </strong>${country.NewDeaths}</li>
                                <li class="list-group-item"><strong>New Recovered: <br> </strong>${country.NewRecovered}</li>
                                
                            </ul>
                        </div>
                    </div>`;
}

app();
setIndonesia();
const btnSearch = document.querySelector(".buttonSearch");
btnSearch.addEventListener("click", async function () {
  const inputKey = document.querySelector(".inputNegara").value;
  const tabel = showtable(await getCountry(inputKey), 1);
  const tabelBody = document.querySelector(".tBody");
  tabelBody.innerHTML = tabel;
});
