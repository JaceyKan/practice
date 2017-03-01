$(document).ready(function(){
    
    //设置随机颜色值
    var randomColor=function(){
        //设置在0~255（包含边界值）之间的随机整数值
        var randomVal=function(){
            return Math.floor(Math.random()*256);
        };

        var randomColor="rgb(" + randomVal() + ", " + randomVal() + ", " + randomVal() + ")" ;
        return randomColor;
    };

    //单击 “New quote” 按钮时
    $("#changeQuote").click(function(){
        //变换颜色
        var color=randomColor();
        $("body, .button, #changeQuote").css("backgroundColor", color);
        $(".quoteText, .quoteAuthor").css("color", color);

        //设置随机引用语
        $.getJSON("json/quote.json", function(json){
            //引入json文件成功后
            // 设置随机引用
            var val=Math.floor(Math.random()*json.length);
            $("#text").html(json[val]["text"]);
            $("#author").html(json[val]["author"]);

            //设置分享按钮链接
            var myStr='"' + json[val]["text"] + '" -' + json[val]["author"];
            $("#tweetQuote").attr("href",'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent(myStr));
            $("#weiboQuote").attr("href","http://service.weibo.com/share/share.php?title=" +  encodeURIComponent(myStr));

        });
    });

    //打开页面或刷新页面时调用“New quote” 按钮的click事件
    $("#changeQuote").click();

});