// Element im working with

let display = document.querySelector('#display');
let textValue = document.querySelector('#TextValue');
let searchLogo = document.querySelector('.searchLogo');
let token = '?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=';



// key down event for enter, pass down ID value

  textValue.addEventListener('keydown', function(event){

  if(event.keyCode === 13){

    display.textContent = ""
    
    event.preventDefault();

    return(getInfo(event.target.value));
  }


});


// fetch API pass down artist event and stores users ID

function getInfo(event){
fetch(`http://api.soundcloud.com/users/${token}${event}`) //API address used to grab info
      .then( function(response) {
        return response.json() //returns API in Json format
      }).then(function(data){

        let userID = data[0].id;

        TrackInfo(userID);

      });
};


// Another Fetch request that uses the ID to search for unique track


function TrackInfo(userID){

  fetch(`http://api.soundcloud.com/users/${userID}/tracks/${token}`)
    .then( function(response){
      return response.json()
    })
    .then( function(data){
      moreInfo(data)
    })
}




// fill in dynamic html song-cards with fetch values

function moreInfo(data){
  displayResults="";
  for(i=0; i<data.length; i++){

    let id = data[i].id

    displayResults += `
                  <div class="w3-card-4"  type="click" value=${id} id=${id} onclick=audio(${id})>
                  <img class="albumArt" data-song-link="${data[i].stream_url}" src="${data[i].artwork_url}"/>
                  <p> <b>Title: </b>  ${data[i].title}</p>
                  <p> <b>Artist: </b>  ${data[i].user.username}</p>
                  </div>
                  `
  }

   display.insertAdjacentHTML('afterbegin', displayResults);
}



// querySelect audio tag give src attribute that adds + stream link API

function audio(id){

  let audioSource = document.querySelector("audio");

  audioSource.src = "https://api.soundcloud.com/tracks/"+id+"/stream?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f"

}
