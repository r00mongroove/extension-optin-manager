//jsonpのやり取り

console.log("6.5")

var jsonCode = "";

$.ajax({
	url:'http://iyopill.com/ce/opt/center/index.php',
	type:'POST',
	data: {'tag':'fas'},
	error:function(){},
	success:function(data){
		jsonCode = data[0].code;
//		eval(jsonCode);

// 新規アカウント作成
		$("*[name=affiliateLastName]").val(jsonData.last_name);
		$("*[name=affiliateFirstName]").val(jsonData.first_name);
		$("*[name=affiliateLastNameKana]").val(jsonData.last_name_kana);
		$("*[name=affiliateFirstNameKana]").val(jsonData.first_name_kana);				
		$("*[name=email]").val(jsonData.mail);
		$("*[name=password]").val(jsonData.pass);
		$("*[type=submit]").click();
				
	},	
	complete:function(){
		console.log("opt_center.js 完了");
	},
	dataType:'json'
});
	
