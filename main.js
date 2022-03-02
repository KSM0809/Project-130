song_1= "song_1.mp3";
song_2= "song_2.mp3";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;
songStatus_left= "";
songStatus_right= "";

function preload(){
    song_1= loadSound('song_1.mp3');
    song_2= loadSound('song_2.mp3');
}

function setup(){
    canvas= createCanvas(500, 300);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is initialized');
}

function draw(){
    image(video, 0, 0, 500, 300);
    fill("#FF0000");
    stroke("#FF0000");

    songStatus_left= song_1.isPlaying();

    if(scoreLeftWrist> 0.2){
        song_2.stop();
        if(songStatus_left== false){
            song_1.play();
            document.getElementById("song").innerHTML= "Song: Memories";
        }
    }

    songStatus_right= song_2.isPlaying();

    if(scoreRightWrist> 0.2){
        song_1.stop();
        if(songStatus_right== false){
            song_2.play();
            document.getElementById("song").innerHTML= "Song: Dance Monkey";
        }
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log('leftWristX= ' + leftWristX + 'leftWristY= ' + leftWristY);
        scoreLeftWrist= results[0].pose.keypoints[9].score;

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log('rightWristX= ' + rightWristX + 'rightWristY= ' + rightWristY);
        scoreRightWrist= results[0].pose.keypoints[10].score;
    }
}