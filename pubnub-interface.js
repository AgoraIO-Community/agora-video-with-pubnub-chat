function publish(uid) {
  
  pubnub = new PubNub({
      publishKey : 'pub-c-0fc621ec-acc8-49fd-bbd7-5af724d9008a',
      subscribeKey : 'sub-c-b3333fce-e2ff-11ea-a984-2afbe9b5aae9',
      // uuid: "myUniqueUUID"
      uuid: uid
  })
    
  function publishSampleMessage() {
      console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
      var publishConfig = {
          channel : "hello_world",
          message: { 
              title: "greeting",
              description: "hello world!"
          }
      }
      pubnub.publish(publishConfig, function(status, response) {
          console.log(status, response);
      })
  }
    
  pubnub.addListener({
      status: function(statusEvent) {
          if (statusEvent.category === "PNConnectedCategory") {
              publishSampleMessage();
          }
      },
      message: function(msg) {
          console.log(msg.message.title);
          console.log(msg.message.description);
      },
      presence: function(presenceEvent) {
          // handle presence
      }
  })      
  console.log("Subscribing..");
  pubnub.subscribe({
      channels: ['hello_world'] 
  });
};

window.publish = publish