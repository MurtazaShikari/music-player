console.log("Welcome to Spotify")
//Initialise the Variable
let songIndex = 0
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById("gif")
let masterSongName = document.getElementById("masterSongName")
let timeStamp = document.getElementsByClassName("timeStamp")

let songItems = Array.from(document.getElementsByClassName("songItem"))





let songs = [
    {songName: "Warriyo", filePath:"songs/1.mp3", coverPath: "covers/1.jpg", time:"4:50"},
    {songName: "Cielo Huna Huna", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", time:"3:30"},
    {songName: "DEAF KEV", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", time:"4:00"},
    {songName: "Different heaven and EHIDE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", time:"2:30"},
    {songName: "Jaanji Heroes", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", time:"3:00"},
    {songName: "Raabta", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", time:"4:30"},
    {songName: "Maan Meri Jaan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", time:"3:20"},
    {songName: "Namo Namo", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", time:"2:10"},
    {songName: "Salaam - E - Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", time:"2:15"},
    {songName: "Yo-Yo Honey", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", time:"4:10"}

]

songItems.forEach((element,i)=>{
    // console.log(element,i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
    element.getElementsByClassName("timeStamp")[0].innerText = songs[i].time

})
// audioElement.play()

// audioElement.play()
//Handle Play, Pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
    } else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        makeAllPlays();
        gif.style.opacity = 0
    }
})


//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate')
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    // console.log(progress)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')

    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click',(e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName
        audioElement.src = `songs/${songIndex+1}.mp3`
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        audioElement.currentTime = 0
        audioElement.play();
        gif.style.opacity = 1
    })
})

document.getElementById('next').addEventListener('click',()=>{
    songItems[songIndex].classList.remove('fa-pause-circle')
    songItems[songIndex].classList.add('fa-play-circle')

    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1
    }
    songItems[songIndex].classList.add('fa-pause-circle')
    songItems[songIndex].classList.remove('fa-play-circle')

    masterSongName.innerText = songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        audioElement.currentTime = 0
        audioElement.play();
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1
    }
    masterSongName.innerText = songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        audioElement.currentTime = 0
        audioElement.play();
})