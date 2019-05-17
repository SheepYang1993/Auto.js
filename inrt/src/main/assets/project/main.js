"ui";

showMainUI();
var sleep_time = 2000
var dou_yin_user_id_path = "/sdcard/dou_yin_user_id.txt"
var downloadSuccess

function autoFollow() {

    toastLog("打开抖音短视频")
    app.launchApp("抖音短视频")

    open_main()

    sleep(sleep_time)
    toastLog("检查是否开启辅助功能")
    auto.waitFor()

    var ids = files.read(dou_yin_user_id_path);
    var temp = ids.split(/[\n]/g)
    for (var i = 0; i < temp.length; i++) {
        sleep(sleep_time)
        toastLog("开始任务" + (i + 1) + ", id:" + temp[i])
        task1(temp[i])
    }
}

function task1(sUserId) {
    sleep(sleep_time)
    var play_nun = random(6, 7)
    toastLog("需要随机浏览" + play_nun + "个视频")

    for (var i = 0; i < play_nun; i++) {
        sleep(10000)
        toastLog("上滑浏览第" + (i + 1) + "个视频")
        //x1,y1,x2,y2,时间间隔
        swipe(500, 1970, 500, 325, 200)
    }

    sleep(sleep_time)
    toastLog("直接跳转用户" + sUserId + "详情界面")
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "snssdk1128://user/profile/" + sUserId
    });

    sleep(sleep_time)
    if (text("取消关注").exists()) {
        toastLog("已经关注该用户")
    } else {
        sleep(10000)
        toastLog("关注用户")
        click("关注")
    }

    sleep(sleep_time)
    toastLog("返回主界面")
    open_main()
}

function open_main() {
    sleep(sleep_time)
    toastLog("打开主界面")
    app.startActivity({
        action: "android.intent.action.VIEW",
        packageName: "com.ss.android.ugc.aweme",
        className: "com.ss.android.ugc.aweme.main.MainActivity"
    });
}

function downloadUserId(url) {
    var res = http.get(url);
    if (res.statusCode != 200) {
        toastLog("用户ID下载失败, 请检查输入地址是否正确！");
        return
    }
    files.writeBytes(dou_yin_user_id_path, res.body.bytes());
    toastLog("用户ID下载成功");
    downloadSuccess = true;
    sleep(2000)
    autoFollow()
}

function autoWatch() {
    var sleep_time = 2000
    toastLog("打开抖音短视频")
    app.launchApp("抖音短视频")

    open_main()

    sleep(sleep_time)
    toastLog("检查是否开启辅助功能")
    auto.waitFor()
    var times = 6 * 60 * 3
    for (var i = 0; i <= times; i++) {
        sleep(10000)
        toastLog("开始第" + (i + 1) + "次随机浏览, 一共浏览" + times + "次")
        //x1,y1,x2,y2,时间间隔
        swipe(500, 1970, 500, 325, 200)
    }
}

function showMainUI() {
    ui.layout(
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="抖音工具箱" />
            </appbar>
            <button id="btn_watch" text="随机浏览"margin = "15 0 15 0"  />
            <button id="btn_follow" text="随机浏览 + 自动关注"margin = "15 0 15 0" />
        </vertical>
    );
    ui.btn_watch.on("click", () => {
        threads.start(function() {
            autoWatch()
        })
    });
    ui.btn_follow.click(() => {
        dialogs.rawInput("请输入用户ID地址", "", function(str) {
            threads.start(function() {
                downloadUserId(str)
            });
        });
    });
}