const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const voice = new SpeechRecognition();

const btnVoice = document.querySelector('.btn-voice');
const textz = document.querySelector('.text');
const mess = document.querySelector('.mess');
const listen = document.querySelector('.listen');
const noti = document.querySelector('.noti');
let btn, timInterval = 3000, dem=1000;
let voiceMess, url;

btnVoice.onclick = function(){
    voice.start(); // Lắng nghe
    this.style.display = 'none';
    listen.style.display = 'flex';
    btn = this;
    if(url){
        url = undefined;
    }
}


// Kết quả nghe được
voice.onresult = (voice)=>{
    voiceMess = voice.results[0][0].transcript.toLowerCase();
    listen.style.display = 'none';
    mess.innerHTML = ` Ý của bạn có phải là: <b>${voiceMess}</b> `;
    const arrVoid = voiceMess.split(' ');
    let indexVideo = arrVoid.findIndex(el=>el=='video');
    let indexSong = arrVoid.findIndex(el=>el=='hát');
    let indexMaps = arrVoid.includes('tới') ? arrVoid.findIndex(el=>el=='tới') : arrVoid.includes('đường') ? arrVoid.findIndex(el=>el=='đường') : undefined;
    if(voiceMess === 'facebook'){
        url = 'https://www.facebook.com/';
    }else if(voiceMess === 'youtube'){
        url = 'https://www.youtube.com';
            }else if(voiceMess === 'google'){
        url = 'https://www.google.com/';
    }else if(voiceMess === 'google drive'){
        url = 'https://drive.google.com/drive/my-drive';
    }else if(voiceMess === 'google maps' || voiceMess === 'bản đồ'){
        url = 'https://www.google.com/maps';
    }else if(typeof indexVideo === 'number' && indexVideo >= 0){
        const video = arrVoid.slice(++indexVideo);
        const stringVideo = video.join('+');
        url = 'https://www.youtube.com/results?search_query='+ stringVideo;
    }else if(typeof indexSong === 'number' && indexSong >= 0){
        const song = arrVoid.slice(++indexSong);
        const stringSong = song.join('%20');
        url = 'https://zingmp3.vn/tim-kiem/tat-ca?q='+ stringSong;
    }else if(typeof indexMaps === 'number' && indexMaps >= 0){
        const maps = arrVoid.slice(++indexMaps);
        const stringMap = maps.join('+');
        url = 'https://www.google.com/maps/place/'+ stringMap;
    }
    else {
        btn.style.display = '';
    }
    if(url){
        fnTime();
    }
}

function fnTime(){
    if(timInterval>= 0){
        setTimeout(()=>{
            noti.innerHTML = ` Hệ thống sẽ chuyển trang mới sau: ${Math.floor(timInterval/1000)} `;
            timInterval = timInterval - dem;
            fnTime()
        }, dem)
    }else{
        let newTab = window.open(url, '_blank');
        if(newTab){
            newTab.focus();
            noti.textContent = '';
            mess.textContent = '';
            btn.style.display = '';
        }
    }
}
//Ngừng lắng nghe
voice.onspeechend = () => {
    voice.stop();
};
