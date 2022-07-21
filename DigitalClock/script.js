document.body.classList.toggle('dark-mode');
setInterval(function () {
    let time = new Date();
    const clock = document.querySelector(".display");
    let sec = time.getSeconds();
    let min = time.getMinutes();
    let hour = time.getHours();
    clock.innerText = `${hour} : ${min < 10 ? '0'+min : min} : ${sec < 10? '0'+sec : sec}`;
});