var counter;

$(function() {
	var api = {
		"auth" : "http://kabu-u.net/auth/login",
		"logout" : "http://kabu-u.net/auth/logout",
		"campaign_short" : "http://kabu-u.net/campaign/avaiables?term=0",
		"campaign_long" : "http://kabu-u.net/campaign/avaiables?term=1",
		"user_info" : "http://kabu-u.net/user/get",
		"edit_user_info" : "http://kabu-u.net/user/edit",
	};
	$('#tabnavi a').click(function() {
		$('#tabcontent > div').hide().filter(this.hash).fadeIn();
		//アンカー要素を表示

		$('#tabnavi a').removeClass('active');
		$(this).addClass('active');

		return false;
		//いれてないとアンカーリンクになる
	}).filter(':eq(0)').click();

	$.ajax({
		type : "GET",
		url : api["user_info"],
		success : function(msg) {
			data = JSON.parse(msg);
			set_user_form(data);
		}
	});

	$("#user_info").click(function() {
		$.ajax({
			type : "GET",
			url : api["user_info"],
			success : function(msg) {
				data = JSON.parse(msg);
				set_user_form(data);
			}
		});
	});
	
	$("#edit_user_info").click(function() {
		data = get_user_form();
		$.ajax({
			type : "POST",
			data : data,
			url : api["edit_user_info"],
			success : function(msg) {
				console.log(msg);
			}
		});
	});

	$("#campaign_short").click(function() {
		$("#tab01").empty();
		$.ajax({
			type : "GET",
			url : api["campaign_short"],
			success : function(msg) {
				data = JSON.parse(msg);
				for (var i in data) {
					var html = insert_campaign(data[i]);
					$("#tab01").append(html);
				}
			}
		});
	});

	$("#campaign_long").click(function() {
		$("#tab02").empty();
		$.ajax({
			type : "GET",
			url : api["campaign_long"],
			success : function(msg) {
				data = JSON.parse(msg);
				for (var i in data) {
					insert_campaign(data[i]);
					var html = insert_campaign(data[i]);
					$("#tab02").append(html);
				}
			}
		});
	});

	function set_user_form(data) {
		$("#inputSei").val(data.sei);
		$("#inputMei").val(data.mei);
		$("#inputSeiKana").val(data.sei_kana);
		$("#inputMeiKana").val(data.mei_kana);
		$("#inputEmail").val(data.email);
		$("#inputLogin").val(data.login);
		$("#inputRecieve").val(data.haishin_type);
		$("#inputTel").val(data.tel);
	}

	function get_user_form(data) {
		var data = {};
		data["sei"] = $("#inputSei").val();
		data["mei"] = $("#inputMei").val();
		data["sei_kana"] = $("#inputSeiKana").val();
		data["mei_kana"] = $("#inputMeiKana").val();
		data["email"] = $("#inputEmail").val();
		data["login"] = $("#inputLogin").val();
		data["haishin_type"] = $("#inputRecieve").val();
		data["tel"] = $("#inputTel").val();
		return JSON.stringify(data);
	}

	function insert_campaign(data) {
		var html = '<div class="one_camp"><div class="camp_name">';
		html = html + '<div class="camp_text">';
		html = html + '<p class="camp_text_title">';
		html = html + '<a href="' + data.url + '">' + data.name + '</a>';
		html = html + '</p>';
		html = html + '<p class="camp_text_value">';
		html = html + data.price + '円';
		html = html + '</p>';
		html = html + '</div>';
		html = html + '<div class="camp_status">';
		html = html + '<p class="camp_status_data">';
		html = html + data.start + "〜" + data.end;
		html = html + '</p>';
		html = html + '<p class="camp_status_opt">';
		html = html + data.optin_type;
		html = html + '</p>';
		html = html + '</div>';
		html = html + '</div>';
		html = html + '<div class="camp_btn">';
		html = html + '<div class="camp_btn_login camp_btn_part">';
		html = html + '<a href="●ｱﾌｨﾘｴｲﾄｾﾝﾀｰﾛｸﾞｲﾝ●"><img src="./icon/login_btn.png" alt="ログイン"></a>';
		html = html + '</div>';
		html = html + '<div class="camp_btn_facebook camp_btn_part">';
		html = html + '<a href="●facebookに投稿●"><img src="./icon/facebook_btn.png" alt="facebookに投稿"></a>';
		html = html + '</div>';
		html = html + '<div class="camp_btn_twitter camp_btn_part">';
		html = html + '<a href="●twitterに投稿●"><img src="./icon/twitter_btn.png" alt="twitterに投稿"></a>';
		html = html + '</div>';
		html = html + '<div class="camp_btn_ameblo camp_btn_part">';
		html = html + '<a href="●amebloに投稿●"><img src="./icon/ameblo_btn.png" alt="amebloに投稿"></a>';
		html = html + '</div>';
		html = html + '</div></div>';
		return html;
	}

});

