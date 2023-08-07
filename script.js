let startGameSpan = document.querySelector(".control-buttons span");
let playerName = document.querySelector(".name span");


startGameSpan.onclick = function () {
   
   let yourName = prompt("What Is Your Name ?!")
   if (yourName ==  null || yourName == "") {
      playerName.innerHTML = "Unknown";
   }else{
      playerName.innerHTML = yourName;
   }
   document.querySelector(".control-buttons").remove();
}


let duration = 1000 ;
let blocksContainer = document.querySelector(".memory-game-blocks")
let blocks = Array.from(blocksContainer.children) ; // Array.from() ===> بتحول اللي بتديهولها الي مصفوفه

let orderRange = [...Array(blocks.length).keys()] ;

Shuffle(orderRange);

blocks.forEach((block , index) => {

   block.style.order = orderRange[index] ;

   block.addEventListener('click' , function() {
      flipBlock(block);
   });

});

//flipBlock functions 
function flipBlock(selectedBlock) {
   
   // Add is-flipped class
   selectedBlock.classList.add('is-flipped');

   // Collect All flipped cards
   let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))
   //if there is two selected blocks
   if (allFlippedBlocks.length === 2) {

      //Stop Clicking
      stopClicking();

      // Check the match blocks
      checkMathchedBlocks(allFlippedBlocks[0] , allFlippedBlocks[1])
   }

}


// Stop clicking function 
function stopClicking() {
   // Add class no clicking
   blocksContainer.classList.add('no-clicking')

   setTimeout(() => {
      // Remove class no clicking after the duration
      blocksContainer.classList.remove('no-clicking')
   }, duration);
}


//Check Matched blocks
function checkMathchedBlocks(firstBlock , secondBlock) {
   
   let triesElement = document.querySelector('.tries span')

   if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
      
      firstBlock.classList.remove('is-flipped')
      secondBlock.classList.remove('is-flipped')

      firstBlock.classList.add('has-match')
      secondBlock.classList.add('has-match')

      document.getElementById("success").play();

   }else{
      triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

      setTimeout(() => {
         firstBlock.classList.remove('is-flipped')
         secondBlock.classList.remove('is-flipped')
      }, duration);

      document.getElementById("fail").play();

   }
}

//Shuffle Function
function Shuffle(array) {
   let current = array.length ,
   temp , random ;

   while (current > 0) {

      //Get random number
      random = Math.floor(Math.random() * current);

      //Decrease length by 1 
      current-- ;

      //Save current element in stash
      temp = array[current] ;

      //Current Element =  Random Element
      array[current] = array[random] ;

      //Random Element =  Get Element from stash
      array[random] = temp ;
   }
   return array ;
}
