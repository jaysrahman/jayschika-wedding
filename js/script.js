async function sendMessage() {
    let nama = document.getElementById('nama').value
    let alamat = document.getElementById('alamat').value
    let pesan = document.getElementById('pesan').value

    if (nama === '') {
        return alert('Harap mengisi nama anda')
    }

    if (alamat === '') {
        return alert('Harap mengisi alamat anda, cth: Mentari, Buaran, dll')
    }

    if (pesan === '') {
        return alert('Harap mengisi pesan yang ingin anda sampaikan kepada yang berbahagia')
    }

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
      
      xhr.open("POST", "https://jayschika-wedding-api.jaysrahman.repl.co/ucapan");
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

    xhr.open("GET", "https://jayschika-wedding-api.jaysrahman.repl.co/ucapan");

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