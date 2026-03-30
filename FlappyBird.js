    let board = document.getElementById("board");
    let ctx = board.getContext("2d");

    board.width = 360;
    board.height = 640;

    let velocityY = 0;
    let gravity = 0.05;

    let bird = {
    bw: 27,
    bh: 25,
    px: 47,
    py: 330
    };
    
    let pipes = [];
    let pipeWidth = 52;
    let pipeHeight = 411;
    let pipeposX = board.width;
    let pipeposy = 0;
    let speed = 0.7;

    let gameOver;
    let score = 0;

    let bPipe = new Image();
    bPipe.src = "bottompipe.png";

    let tPipe = new Image();
    tPipe.src = "toppipe.png";

    let birdImg = new Image();
    birdImg.src = "flappybird.png";

    birdImg.onload = () => {ctx.drawImage(birdImg, bird.px, bird.py, bird.bw, bird.bh);}
    
    setInterval(setPipes, 1500);

    function setPipes() {
      let random = pipeposy - pipeHeight/4 - Math.random()*(pipeHeight/2); 
      let open = board.height/4;

      let highPipe = {
        img: tPipe,
        x: pipeposX,
        y: random,
        width: pipeWidth,
        height: pipeHeight,
      }

      let lowPipe = {
        img: bPipe,
        x: pipeposX,
        y: random + pipeHeight + open,
        width: pipeWidth,
        height: pipeHeight,
      }

      pipes.push(highPipe, lowPipe);

    }
  
    function animate() {
      ctx.clearRect(0, 0, board.width, board.height);

        for(let i = 0; i < pipes.length; i++){
          let pipe = pipes[i];
          pipe.x -= speed;
          ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

          colDet(bird, pipe);
          if(colDet(bird, pipe)){
            gameOver = true;
           }
        }

        let s = document.getElementById("score");
            s.innerHTML = "score: " + score;

        velocityY += gravity;
        bird.py += velocityY;

        board.addEventListener("click", function (){
          velocityY = -1.5;
        });
      
      ctx.drawImage(birdImg, bird.px, bird.py, bird.bw, bird.bh);

      bird.py = Math.max(bird.py + velocityY, 0);

      if(bird.py + bird.bh >= board.height){
       gameOver = true;
      }

      if(gameOver == true){
        return;
      }
      requestAnimationFrame(animate);
    }

     requestAnimationFrame(animate);

    function colDet(a, b){
      return a.px < b.x + b.width && a.px + a.bw > b.x && 
             a.py < b.y + b.height && a.py + a.bh > b.y;
    }
    
    