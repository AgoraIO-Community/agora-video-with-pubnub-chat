const textarea = document.querySelector("#chatSend");
const chatMsgWindow = $('#chat_fullscreen');
const chatToggleBtn = $('#chatToggleBtn');

// hide chat UI to start
$('#chat_converse').css('display', 'none');
$('#chat_body').css('display', 'none');
$('#chat_form').css('display', 'none');
chatMsgWindow.css('display', 'block');

//Toggle chat and links
function toggleChatWindow() {
  chatToggleBtn.toggleClass('is-float');
  $('.prime').toggleClass('zmdi-comment-outline');
  $('.prime').toggleClass('zmdi-close');
  $('.prime').toggleClass('is-active');
  $('.prime').toggleClass('is-visible');
  $('.chat').toggleClass('is-visible');
  $('.fab').toggleClass('is-visible');

  if (chatToggleBtn.hasClass('is-visible')){
    scrollToBottm();
  }
}

chatToggleBtn.click(function() {
  toggleChatWindow();
});

window.toggleChatWindow = toggleChatWindow;

// resizable text area
function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  // min-height + lines x line-height + padding + border
  let newHeight = 25;
  if(numberOfLineBreaks > 0){
    newHeight = 25 + numberOfLineBreaks * 25 + 12 + 2;
  }
  
  return newHeight;
}

// resize on key-up event
textarea.addEventListener("keyup", () => {
  resizeTextArea();
});

function resizeTextArea() {
  textarea.style.height = calcHeight(textarea.value) + "px";
}

// chat msg UI
function scrollToBottm() {
  chatMsgWindow.animate({
    scrollTop: chatMsgWindow[0].scrollHeight
 }, 500);
}

function addLocalMsg(msg) {
  chatMsgWindow.append(
    $('<span/>', {'class': 'chat_msg_item chat_msg_item_local_user'}).append(msg)
  );
  // scroll to bottom
  scrollToBottm();
}

function addRemoteMsg(uid, msg) {
  console.log('message from: ' + uid);
  chatMsgWindow.append(
    $('<div/>', {'class': 'chat_msg_item chat_msg_item_remote_user'}).append(
      $('<div/>', {'class': 'chat_avatar'}).append(
        // $('<img/>', {'src': 'https://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg'})
      )
    ).append(
      $('<span/>').append(msg)
    )
  );
  if (chatToggleBtn.hasClass('is-visible')){
    scrollToBottm();
  }
}

$('#fab_send').click(function() {
  const msg = textarea.value.replace(/\n/g, '<br/>');;
  console.log(msg)
  window.publishMessage(msg,function(){
    addLocalMsg(msg);
    textarea.value = ""; // after the message is sent clear the text area.
    resizeTextArea();
  })
});

window.addLocalMsg = addLocalMsg;
window.addRemoteMsg = addRemoteMsg;