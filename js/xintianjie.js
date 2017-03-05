$(document).ready(function(){
    //began 使banner的图片循环展示
    var current=0;    //存储选中按钮的序列，初始值为0
    var next=current+1;     //存储下一次要执行的按钮序列，初始值为1
    var last=current;   //存储上一次操作的按钮序列，初始为current，即0
    var t;  //设置延时执行
    var length=$(".button").length; //存储按钮的个数

    $(".button").click(function(){
        //先将所有按钮置为灰色，再将当前按钮置为红色
        $(".button").css({
            "background-color":"#bbb"
        });
        $(this).css({
            "background-color": "#cf1b25"
        });

        current=$(this).index();  //获取当前按钮的序列

        //实现从左或从右滑动出现
        if((current==0 && last==length-1) || current>last){  //如果（下一个要展示的序列是0且上一个是序列中的最后一个） 或 当前要展示的序列比上一个大，向左滑动
            $(".subBanner").eq(current).css({left:'1920px'});
            $(".subBanner").eq(last).animate({left:'-1920px'});
            $(".subBanner").eq(current).animate({left:'0'});
        }else if(current<last){  //如果当前要展示的序列比上一个小，向右滑动
            $(".subBanner").eq(current).css({left:'-1920px'});
            $(".subBanner").eq(last).animate({left:'1920px'});
            $(".subBanner").eq(current).animate({left:'0'});
        }

        last=current;
        next=current+1;
        if(next>=length){
            next=0;
        }

        //先清除原有的延时，再设置新延时为4秒后点击下一个按钮
        clearTimeout(t);
        t=setTimeout(function(){
            $(".button").eq(next).click();  //点击下一个按钮
        }, 4000);
    });

    $(".button").eq(0).click(); //页面初始时点击一下第一个按钮，启动图片循环
    //end 使banner的图片循环展示

    //当在banner面板上悬停时，显示左右切换按钮
    $(".banner").mouseover(function(){
        $(".nextBtn").css({
            "display":"inline"
        });
    });
    $(".banner").mouseout(function(){
        $(".nextBtn").css({"display":"none"});
    });

    //点击左切换按钮时，next值为当前序列减1
    $("#leftBtn").click(function (){
        next=current-1;
        if(next<0){
            next=length-1;
        }
        $(".button").eq(next).click();
    });

    //点击左切换按钮时，next值为当前序列加1
    $("#rightBtn").click(function (){
        next=current+1;
        if(next>length-1){
            next=0;
        }
        $(".button").eq(next).click();
    });
});