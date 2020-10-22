const chatToggleBtn = $('#chatToggleBtn');
const chatMsgWindow = $('#chat_fullscreen');
const chatIcon = $('#chatIcon');
const textarea = $("#chatTextInput");
const sendBtn = $('#chatUi_send');

// hide chat UI to start
$('#chat_converse').css('display', 'none');
$('#chat_body').css('display', 'none');
$('#chat_form').css('display', 'none');
chatMsgWindow.css('display', 'block');

//Toggle chat and links
function toggleChatWindow() {
  chatToggleBtn.toggleClass('is-float');
  chatIcon.toggleClass('zmdi-comment-outline').toggleClass('zmdi-close'); // toggle between icons
  chatIcon.toggleClass('is-active').toggleClass('is-visible'); // toggle visible/active state
  $('.chat').toggleClass('is-visible');
  $('.chatUi').toggleClass('is-visible');

  if (chatToggleBtn.hasClass('is-visible')){
    scrollToBottom();
  }
}

chatToggleBtn.click(function() {
  toggleChatWindow();
});

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
function scrollToBottom() {
  chatMsgWindow.animate({
    scrollTop: chatMsgWindow[0].scrollHeight
 }, 500);
}

function addLocalMsg(msg) {
  chatMsgWindow.append(
    $('<span/>', {'class': 'chat_msg_item chat_msg_item_local_user'}).append(msg)
  );
  // scroll to bottom
  scrollToBottom();
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
    scrollToBottom();
  }
}

// send a message when the user clicks the send button
sendBtn.click(function() {
  sendLocalMsg();
});

function sendLocalMsg() {
  const msg = textarea.value.replace(/\n/g, '<br/>');;
  console.log(msg)
  publishMessage(msg,function(){
    addLocalMsg(msg);
    textarea.value = ""; // after the message is sent clear the text area.
    resizeTextArea();
  })
}