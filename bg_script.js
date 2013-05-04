// コンソールログに出す
function conLog(e){
	chrome.tabs.executeScript(null, {code: "console.log('" + e +"');"});
}
/*

function optInput(jsonData, url){
	conLog("11");
	chrome.tabs.getSelected(null, function(e){
		conLog("2");
//		chrome.tabs.executeScript(e.id, {code: 'location.href = "'+url+'"'}, function(){
			conLog("3");
			chrome.tabs.executeScript(e.id, {file: "jquery.min.js"}, function() {
				conLog("4");
				chrome.tabs.executeScript(e.id, {code: "var jsonData = {mail:'"+jsonData.mail+"', pass:'"+jsonData.pass+"', last_name:'"+jsonData.last_name+"', first_name:'"+jsonData.first_name+"', first_name_kana:'"+jsonData.first_name_kana+"', last_name_kana:'"+jsonData.last_name_kana+"'}"}, function(){
					conLog("5");
					chrome.tabs.executeScript(e.id, {file: "created.js"}, function(){
					
						
						
					});				
				});
				conLog("6")
			});
//		})
	});
}


*/

/*
//Facebookにログイン
function fbLogin(mail, pass) {
	chrome.tabs.getSelected(null, function(e){
		chrome.tabs.executeScript(e.id, {code: 'location.href = "https://www.facebook.com/"'}, function(){
			chrome.tabs.executeScript(e.id, {file: "jquery.min.js"}, function() {
				chrome.tabs.executeScript(e.id, {code: "var date = {mail:'"+mail+"',pass:'"+pass+"'}"}, function(){
					chrome.tabs.executeScript(e.id, {file: "write.js"});				
				});
			});
		})
	});
};

//Option画面を表示
function option() {
	chrome.tabs.create({
	    "url": chrome.extension.getURL("options.html"),
	});
}

////////////////////     cookieリセット STR     ///////////////////// 
function resetCookies() {
	chrome.cookies.getAll({"domain":"facebook.com"}, function(cookies) {
		for (var i in cookies) {
			removeCookies(cookies[i]);
		}
	});
}

function removeCookies(cookie) {
	var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
	chrome.cookies.remove({"url": url, "name": cookie.name});
}
////////////////////    cookieリセット END      /////////////////////


/////////////////////     Proxyセット STR      //////////////////////
var proxy = "";

function setProxy() {
	proxies = proxy.split(":");
	var config;
	if(proxy) {
		config = { mode: "fixed_servers", rules: { proxyForHttp: { scheme: "http", host:proxies[0], port:Number(proxies[1]) }, bypassList: [""] } };
	} else {
		config = { mode: "direct" };
	}
	chrome.proxy.settings.set( { value: config, scope: 'regular' }, function(){});
//	chrome.tabs.getSelected(null, function(e){chrome.tabs.executeScript(e.id, {code: 'location.href = "http://www.ugtop.com/spill.shtml"'})})
}

/////////////////////     Proxyセット END      //////////////////////
*/