async function sendMessage() {
    let nama = document.getElementById('nama').value
    let alamat = document.getElementById('alamat').value
    let pesan = document.getElementById('pesan').value

    var data = JSON.stringify({
        "nama": nama,
        "alamat": alamat,
        "pesan": pesan
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
          location.reload();
        }
      });
      
      xhr.open("POST", "https://floating-lake-26224.herokuapp.com/ucapan");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      
      xhr.send(data);
}

async function getMessage() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        let objData = JSON.parse(this.responseText);

        let ucapanCarousel = ''
        objData.map((ucapan) => {
            ucapanCarousel += `
            <div class="item">
                <div class="testimony-slide active text-center">
                    <span style="text-transform: none;">${ucapan.nama}, di <a href="#" class="twitter">${ucapan.alamat}</a></span>
                    <blockquote>
                        <p>"${ucapan.pesan}"</p>
                    </blockquote>
                </div>
            </div>`
        })
        
        let ucapanId = document.getElementById("ucapan-carousel")
        ucapanId.innerHTML = ucapanCarousel

        // asdas.map(() => {

        // })
    }
    });

    xhr.open("GET", "https://floating-lake-26224.herokuapp.com/ucapan");

    xhr.send();
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
      
//     fetch("https://floating-lake-26224.herokuapp.com/ucapan", requestOptions)
//         .then(response => response.text())
//         .then(result => function() {
//             console.log(JSON.parse(result))
//         })
//         .catch(error => console.log('error', error));
}

getMessage()