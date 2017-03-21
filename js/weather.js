function addScriptTag(src){
    var script=document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.src=src;
    document.body.appendChild(script);
}

function foo(data) {
    console.log(data.result.today);
}

//返回当前的日期和星期
function getDateWeek(){
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    var week=weekday[date.getDay()];
    return year+"年"+month+"月"+day+"日"+"&nbsp;"+week;
}

$(document).ready(function(){
    $("#date").html(getDateWeek()); //显示日期和星期

    //当发生 submit 事件时运行的函数
    $("form").submit(function(e){
        //addScriptTag("http://v.juhe.cn/weather/index?format=2&cityname=%E8%8B%8F%E5%B7%9E&key=47ae6e500980056c1defce105b3a90c3&callback=foo");
        e.preventDefault();  //使用 preventDefault() 函数阻止提交按钮的默认 action。
        if($("#cityname").val().trim() == ""){
            alert("城市名称不能为空!");
            $("#cityname").val("");
            $("#cityname").focus();
            return;
        }

            var data=$("form").serialize();
            data+="&key=47ae6e500980056c1defce105b3a90c3";

            $.getJSON("http://v.juhe.cn/weather/index?callback=?",
                data,
                function (responseText) {
                    if(responseText.resultcode == 200){
                        //显示今天天气
                        var today=responseText.result.today;
                        $("#tWeather").text(today.weather);
                        $("#tTemperature").text(today.temperature);
                        $("#skHumidity").text(responseText.result.sk.humidity);
                        $("#dressing_index").text(today.dressing_index);
                        $("#wash_index").text(today.wash_index);
                        $("#travel_index").text(today.travel_index);
                        $("#exercise_index").text(today.exercise_index);
                        $("#uv_index").text(today.uv_index);

                        //显示未来天气
                        var future=responseText.result.future;
                        var msg="";
                        for(var day in future){
                            var day=future[day];
                            if(today.week == day.week){
                                continue;
                            }
                            msg+="<div class='futureDay'>"+
                                day.week+"<br>"+
                                day.temperature+"<br>"+
                                day.weather+"<br>"+
                                "</div>";
                        }
                        $("#future").html(msg+"<br style='clear: both'>");
                    }else{
                        alert("查询不到该城市的信息");
                        $("#cityname").select();
                        $("#cityname").focus();
                    }
                }
            );
        

    });
});

