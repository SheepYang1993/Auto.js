"ui";

showMainUI();

function showMainUI() {
    ui.layout(
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="流量工具"/>
            </appbar>
             <button text="随机浏览"/>
             <button text="随机浏览 + 自动关注"/>
        </vertical>
    );
}