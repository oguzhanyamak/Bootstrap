const btn = document.getElementById("startButton");
const link = $(".link").val()
const formats = document.getElementById("selectList");

btn.addEventListener('click', () => {
    let format = formats.options[formats.selectedIndex].value;
    download(link, format);
});

function download(link, format) {
    $('.button-container').html('<iframe = style="heigh:50px; border:none;overflow:hidden;" src="https://loader.to/api/button/?url=' + link + '&f=' + format + '"></iframe>');
}