document.addEventListener('DOMContentLoaded', function(){
    if(!('geolocation' in navigator)){
        alert("Navegador não tem suporte para esta API")
    } else {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
})

function showPosition(local){
    let latitude = local.coords.latitude
    let longitude = local.coords.longitude

    document.getElementById("location").innerHTML = "<span>Latitude: </span>"
    + latitude + "<span> <br>Longitude: </span>" +   longitude

    // Criando o objeto mapa
    var mapOpition ={
        center: [latitude, longitude],
        zoom: 16
    }
    // Criando o objeto mapa
    var map = new L.map('map', mapOpition);

    // Criando a camada do mapa
    var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

    //adicionando a camada ao mapa
    map.addLayer(layer)

    // adicionando marcador
    var marker = new L.Marker([latitude, longitude])
    marker.addTo(map)
    .bindPopup('Você esta aqui!')
    .openPopup()
}

const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageText = "Adicionar Imagem";
pictureImage.innerHTML = pictureImageText;

inputFile.addEventListener('change', function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0]

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function (e) {
            const readerTarget = e.target;

            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture__img');

            pictureImage.innerHTML = "";
            pictureImage.appendChild(img);
        })

        reader.readAsDataURL(file);
    }
    else {
        pictureImage.innerHTML = pictureImageText;
    }
    console.log(file);
})