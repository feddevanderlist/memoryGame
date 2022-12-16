function timer() {
    let sec = 500;
    let timer = setInterval(function () {
        document.getElementById('time-left').innerHTML = 'Time passed: ' + sec + ' seconden';
        document.getElementById('time-remaining').value = sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}
