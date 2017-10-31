var inputReady = true;
var input = $('.404-input');
input.focus();
$('.container').on('click', function(e){
  input.focus();
});

input.on('keyup', function(e){
  $('.new-output').text(input.val());
});

$('.four-oh-four-form').on('submit', function(e){
  e.preventDefault();
  var val = $(this).children($('.404-input')).val().toLowerCase();
  var href;
  if (val === "back") {
    window.location.href = 'https://codetime.kz/';
  } else if (val === "clear") {
    clearForm();
  } else if (val === "pwd") {
    pwd();
  } else if (val === "help") {
    help();
  } else if (val === "sudo -i") {
    sudo();
  } else {
    resetForm();
  }
});

function help(){
    $('.new-output').removeClass('new-output');
    input.val('');
    message = "Доступные команды:\n help -- список доступных команд,\n back -- вернуться на предыдущую страницу,\n clear -- очистить терминал,\n pwd -- текующее местоположение,\n sudo -i -- получить права администратора";
    $('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');
    $('.new-output').velocity('scroll'), {duration: 100}
}

function sudo(){
    $('.new-output').removeClass('new-output');
    input.val('');
    message = "ХАХАХА! Вы реально думали, что получите права доступа администратора?!";
    if ($(window).width() > 440){
        $.get('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=LOL', function(result){
            var gif = result.data.image_url;
            $('.terminal').append('<img class="lol-gif" src="' + gif + '">');
            resetForm(true);
        });
    }
    $('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');
    $('.new-output').velocity('scroll'), {duration: 100}
}

function pwd(){
    $('.new-output').removeClass('new-output');
    input.val('');
    message = "/ codetime.kz / " + getLang() + " / index.html";
    $('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');
    $('.new-output').velocity('scroll'), {duration: 100}
}

function getLang() { 
    var metas = document.getElementsByTagName('meta'); 
    for (var i = 0; i < metas.length; i++) { 
        if (metas[i].getAttribute("name") == "lang") { 
            return metas[i].getAttribute("content"); 
        }
    }
    return '';
} 

function clearForm(){
    $('.prompt').remove();
    $('.lol-gif').remove();
    input.val('');
    $('.terminal').append('<p class="prompt output new-output"></p>');
    window.scrollTo(0, 0);
}

function resetForm(withLOL){
    var message = "Неизвестная команда. Попробуйте заново или введите help.";
    var input = $('.404-input');
    if (withLOL == true) message = '';
    $('.new-output').removeClass('new-output');
    input.val('');
    $('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');
    $('.new-output').velocity('scroll'), {duration: 100}
}

function toUnderscore(copyString, line, newChar){
  copyString[newChar[1]] = newChar[0];
  line.text(copyString.join(''));
}

function fromUnderscore(copyString, splitString, newChar, line){
  copyString[newChar[1]] = splitString[newChar[1]];
  line.text(copyString.join(""));
}
