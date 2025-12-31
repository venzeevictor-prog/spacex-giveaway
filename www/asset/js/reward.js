window.onload =async  function () {

    
   fetch("/track-view", {
      method: "POST"
    });

   let refresh;


    
    fetch(window.location+'/reviews', {
             method: 'POST',
                credentials:'include',
               headers: {
                 'Content-Type': 'application/json',
                  
               },
               body: JSON.stringify({ipaddress: '192.168.01'}) // Convert the data to a JSON string
            
    })
    .then(async  response => {
         const data = await response.json()
         console.log(data)
         refresh = data.refresh;
            const arr = data.initial_data_list
         for (let index = 0; index < arr.length; index++) {
            
          let item = arr[index]
         document.querySelector('.comment').insertAdjacentHTML('beforeend', `
              <div class="comment-text">
                <span class="ad"><b>${item.address}:</b></span>
                <span  class="ad"> ${item.content_source}</span>
                <img src="${item.Image_src_url}" width="50" height="60" alt="" srcset="">
            </div>
            `)
         }

         
     let elem_count = 0;
setInterval(() =>{
    elem_count ++
  
         let display = refresh[elem_count]

         document.querySelector('.comment').insertAdjacentHTML('afterbegin', `
              <div class="comment-text">
                <span class="ad"><b>${display.address}:</b></span>
                <span  class="ad"> ${display.content_source}</span>
                <img src="${display.Image_src_url}" width="50" height="60" alt="" srcset="">
            </div>
            `)
      
}, 5000)

    const trans = data.transactions;
        

        setTimeout( ()=>{
         document.querySelector('.trans-view-container').insertAjacentHTML('beforeend', ` 
              <div class="tans elementToFadeInAndOut">
        <p class="text">1Pm6EP8TDqtRWxHhyTkWTsuSqxYRdAe1B8 recieved 8.543 BTC  (4 secs ago)</p>
      </div>
         `);

            setInterval( () =>{
              let pick = Math.round(Math.random()*50);
                let seletted_data = trans[pick]

                document.querySelector('.trans-view-container').insertAjacentHTML('beforeend', ` 
              <div class="tans elementToFadeInAndOut">
        <p class="text">${selected_data}</p>
      </div>
         `);

            },18000)

        },2000)
        
    })




}
  

let time = 9 * 60; // 9 minutes in seconds
    const timerElement = document.getElementById("timer");

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        timerElement.textContent = 'Time left ' +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

            if (time < 4) {
                document.querySelector('.timer').style.color = 'red';
            }else if (document.querySelector('.timer').style.textContent == '0:00') {
                document.querySelector('.timer').style.textContent = 'Time out';
            }else{
               document.querySelector('.timer').style.color = 'black';
            }
        if (time > 0) {
            time--;
        } else {
            clearInterval(countdown);
        }
    }

    updateTimer(); // initial display

    const countdown = setInterval(updateTimer, 1000);



