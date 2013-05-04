$(function() {
	// background 読込み
	var api = {
		"auth" : "http://kabu-u.net/auth/login",
		"logout" : "http://kabu-u.net/auth/logout",
		"campaign_short" : "http://kabu-u.net/campaign/avaiables?term=0",
		"campaign_long" : "http://kabu-u.net/campaign/avaiables?term=1",
		"edit_user_info" : "http://kabu-u.net/user/edit",
	};
	var bg = chrome.extension.getBackgroundPage();

	$('#tabcontent > div').hide();
	//初期では非表示

	$('#tabnavi a').click(function() {
		$('#tabcontent > div').hide().filter(this.hash).fadeIn();
		//アンカー要素を表示

		$('#tabnavi a').removeClass('active');
		$(this).addClass('active');

		return false;
		//いれてないとアンカーリンクになる
	}).filter(':eq(0)').click();
	//最初の要素をクリックした状態に

	$("#option").click(function() {
		bg.option();
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
	
	$("#")

	$.ajax({
		type : "GET",
		url : api["campaign_short"],
		success : function(msg) {
			data = JSON.parse(msg);
			if (data.status == false) {
				$("#loginForm").show();
				$("#main").hide();
			} else {
				for (var i in data) {
					var html = insert_campaign(data[i]);
					$("#tab01").append(html);
				}
			}
		}
	});

	$("#sign_in").click(function() {
		data = {};
		data["login"] = $("#inputLogin").val();
		data["pass"] = $("#inputPassword").val();
		$.ajax({
			type : "POST",
			url : api["auth"],
			data : data,
			success : function(msg) {
				if (msg == true) {
					$("#flash").html("");
					$("#loginForm").hide();
					$("#main").show();
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
				} else {
					$("#flash").html("ログインIDとパスワードの組み合わせが異なります");
				}
			}
		});
	});

	$("#logout").click(function() {
		$.ajax({
			type : "GET",
			url : api["logout"],
			success : function(msg) {
				$("#loginForm").show();
				$("#main").hide();
			}
		});
	});

	$("form").bind("submit", function() {
		return false;
	});

	$("#create_option").click(function() {
		chrome.tabs.create({
			url : "options.html"
		})
	});

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
