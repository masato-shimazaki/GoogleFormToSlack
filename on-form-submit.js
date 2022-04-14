// Incoming Webhook
// https://slack.com/intl/ja-jp/help/articles/115005265063-Slack-%E3%81%A7%E3%81%AE-Incoming-Webhook-%E3%81%AE%E5%88%A9%E7%94%A8
//
var HOOKS_KEY = "https://hooks.slack.com/services/***";

var CHANNEL = "free word";
var BOT_NAME = "free word";
var ANSWER_URL = "https://docs.google.com/spreadsheets/d/***";

// Class ItemResponse.
// https://developers.google.com/apps-script/reference/forms/item-response
//
function sendToSlack(body, botnane, channel, url) {
  //var url = key;
  var data = { "channel" : channel, "username" : botnane, "text" : body, "icon_emoji" : ":date: " };
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function test() {
  const date = new Date();
  const time = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  var text = "<!channel> テスト通知確認です" + time;

  sendToSlack(text, BOT_NAME, CHANNEL, HOOKS_KEY);
}

function onFormSubmit(e){

  var body = "<!channel> アイディア投稿されました！\n"; 
  var applicant = "";
  var itemResponse = e.response.getItemResponses();
  var category = '';
  var idea = '';
  
  for (var j = 0; j < itemResponse.length; j++){    
    var formData = itemResponse[j];
    var title = formData.getItem().getTitle();
    var response = formData.getResponse();

    // 自由にカスタマイズ
    switch (title) {
      case "カテゴリー":
        category = "【カテゴリー】\n" + response;
        break;
      case "アイディア・報告内容":
        idea = "【アイディア・報告内容】\n"+ response;
        break;
      default:
        break;
    }
  }
  
  var name = "【投稿者】\n"+ e.response.getRespondentEmail();
  var time = "【Time】\n"+ e.response.getTimestamp();
  var url = "【回答URL】\n" + ANSWER_URL;
  
  var bodyPublic = body + "\n" + name + "\n"+ time + "\n\n" + category + "\n\n"+ idea + "\n\n" + url;
  sendToSlack(bodyPublic, BOT_NAME, CHANNEL, HOOKS_KEY);
}