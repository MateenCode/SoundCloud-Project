// 1. First select and store the elements you'll be working with
let display = document.querySelector('#display')
let textValue = document.querySelector('#TextValue')

// 2. Create your `keydown` event for getting the user's search term

  textValue.addEventListener('keydown', function(event){

  if(event.keyCode === 13){
    return(getInfo(event.target.value));
  }

});

// 3. Create your `fetch` request that is called after a submission
getInfo("")

function getInfo(event){
fetch(`https://api.soundcloud.com/tracks?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=${event}`) //API address used to grab info
      .then( function(response) {
        return response.json() //returns API in Json format
      }).then(function(data){
              moreInfo(data)
      })
}




// 4. Create a way to append the fetch results to your page


function moreInfo(data){
  displayResults="";
  for(i=0; i<data.length; i++){
    displayResults += `<div class="w3-card-4">
                  <img class="albumArt" src="${data[i].artwork_url}"/>
                  <h6><b>Title:</b>  ${data[i].title}</h6>
                  <p><b>Artist:</b>  ${data[i].user.username}</p>
                  </div>`
  }
   display.innerHTML = displayResults
}





// 5. Create a way to listen for a click that will play the song in the audio play
