

$('#prime').click(function() {
  toggleFab();
});

//Toggle chat and links
function toggleFab() {
  $('.prime').toggleClass('zmdi-comment-outline');
  $('.prime').toggleClass('zmdi-close');
  $('.prime').toggleClass('is-active');
  $('.prime').toggleClass('is-visible');
  $('#prime').toggleClass('is-float');
  $('.chat').toggleClass('is-visible');
  $('.fab').toggleClass('is-visible');
  
}

$('#chat_converse').css('display', 'none');
$('#chat_body').css('display', 'none');
$('#chat_form').css('display', 'none');
// $('.chat_fullscreen_loader').css('display', 'block');
$('#chat_fullscreen').css('display', 'block');


function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  // min-height + lines x line-height + padding + border
  let newHeight = 25 + numberOfLineBreaks * 25 + 12 + 2;
  return newHeight;
}

let textarea = document.querySelector("#chatSend");
textarea.addEventListener("keyup", () => {
  textarea.style.height = calcHeight(textarea.value) + "px";
});