const content = document.querySelector(".container"),
    playimage = content.querySelector(".cover img"),
    musicName = content.querySelector(".music-title .track-name"),
    musicArtist = content.querySelector(".music-title .artist"),
    Audio = document.querySelector(".main-song"),
    playbtn = content.querySelector(".play-pause"),
    playbtnIcon = content.querySelector(".play-pause span"),
    previousBtn = content.querySelector("#previous"),
    nextBtn = content.querySelector("#next"),
    progressTab = content.querySelector(".progress-tab"),
    progressBar = content.querySelector(".progress-bar"),
    repeatBtn = content.querySelector("#repeat")

let index = 1;

window.addEventListener("load", () => {
    loadData(index);

});

function loadData(indexValue) {
    musicName.innerHTML = songs[indexValue - 1].name;
    musicArtist.innerHTML = songs[indexValue - 1].artist;
    playimage.src = "images/" + songs[indexValue - 1].img + ".jpg";
    Audio.src = "assets/" + songs[indexValue - 1].audio + ".mp3"
}

playbtn.addEventListener("click", () => { //play & pause songs
    const isMusicPaused = content.classList.contains("paused");
    if (isMusicPaused) {
        pauseSong();
    }
    else {
        playSong();
    }
});

function playSong() {
    content.classList.add("paused");
    playbtnIcon.innerHTML = "pause";
    Audio.play();
}

function pauseSong() {
    content.classList.remove("paused");
    playbtnIcon.innerHTML = "play_arrow";
    Audio.pause();
}

nextBtn.addEventListener("click", () => {
    nextSong();
});
previousBtn.addEventListener("click", () => {
    previousSong();
})

function nextSong() {
    index = index + 1;
    if (index > songs.length) {
        index = 1;
    }
    else {
        index = index;
    }
    loadData(index);
    playSong();
}

function previousSong() {
    index = index - 1;
    if (index <= 0) {
        index = songs.length;
    }
    else {
        index = index;
    }
    loadData(index);
    playSong();

}

Audio.addEventListener("timeupdate", (e) => {
    const initialTime = e.target.currentTime; //Get current music time
    const finalTime = e.target.duration; //GEt music duration
    let BarWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = BarWidth + "%"

    progressTab.addEventListener("click", (e) => {
        let progressValue = progressTab.clientWidth; //Get widthof progress TAb
        let clickedOffsetX = e.offsetX; //get offsetX value
        let MusicDuration = Audio.duration; //Get song duration

        Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
    });

    //Timer
    Audio.addEventListener("loadeddata", () => {
        let finalTimeData = content.querySelector(".end");

        //update End of music duration
        let AudioDuration = Audio.duration;
        let finalminutes = Math.floor(AudioDuration / 60);
        let finalSeconds = Math.floor(AudioDuration % 60);
        if (finalSeconds < 10) {
            finalSeconds = "0" + finalSeconds;
        }
        finalTimeData.innerText = finalminutes + ":" + finalSeconds;
    });


    //update current duration
    let currentTimeData = content.querySelector(".current");
    let CurrentTime = Audio.currentTime;
    let currentMinutes = Math.floor(CurrentTime / 60);
    let currentSeconds = Math.floor(CurrentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    currentTimeData.innerText = currentMinutes + ":" + currentSeconds;

    //repeat button logic
    repeatBtn.addEventListener("click", () => {
        Audio.currentTime = 0;
    });

})
Audio.addEventListener("ended", () => {
    index++;
    if (index > songs.length) {
        index = 1;
    }
    loadData(index);
    playSong();
})