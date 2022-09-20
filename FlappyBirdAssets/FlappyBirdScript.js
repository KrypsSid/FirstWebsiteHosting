let move_speed = 10, grativy = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('https://krypssid.github.io/FirstWebsiteHosting/FlappyBirdAssets/Click_Soft_02.mp3');
let sound_die = new Audio('https://krypssid.github.io/FirstWebsiteHosting/FlappyBirdAssets/Click_Electronic_12.mp3');

// getting bird element properties
let bird_props = bird.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '50vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play()
{

    let bird_dy = 0;
   
    function apply_gravity()
    {
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'https://github.com/KrypsSid/FirstWebsiteHosting/blob/master/FlappyBirdAssets/FlyingGameCharacter.png?raw=true';
                bird_dy = -12.6;
                
               
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'https://github.com/KrypsSid/FirstWebsiteHosting/blob/master/FlappyBirdAssets/FlyingGameCharacter2.png?raw=true';
                sound_point.play();
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();

        
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);




    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => 
        {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0)
            {
                element.remove();
            }
            else
            {
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top)
                {
                    sound_die.play();
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') +'<br>Your Final Score: ' + score_val.innerHTML.fontcolor('green') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    
                    return;
                }
                else
                {
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1')
                    {
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    

    

    let pipe_seperation = 0;

    let pipe_gap = 35;

    function create_pipe()
    {
        if(game_state != 'Play') return;

        if(pipe_seperation > 140)
        {
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 40) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 65 + 'vh'; //the gap between pipes.
            pipe_sprite_inv.style.left = '100vw';
            pipe_sprite_inv.style.transform = 'scaleY(-1)';
           

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
