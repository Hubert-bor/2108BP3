var arr = [];
var imgIndex = 0;
$('#add').click(function () {
    let imgInput = $('#imgInput>input').val();
    let comInput = $('#comInput').val();
    let obj = {
        imgInput,
        comInput,
        imgIndex: imgIndex ? imgIndex : 1,
        time: +new Date()
    };
    arr.unshift(obj);
    showPage();
    $('#imgInput>input').val('');
    $('#comInput').val('');
    $('#imgInput>img').eq(0).css('opacity', '1').siblings('img').css('opacity', '.4');
    imgIndex = 0;
});

// 图片选择
$('#imgInput img').click(function () {
    imgIndex = $(this).index();
    $(this).css('opacity', '1').siblings('img').css('opacity', '.4');
})

// 渲染
function showPage() {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        str += `
        <li>
            <img src="../public/img/${arr[i].imgIndex}.png">
            <div>
                <p><span class="names">${arr[i].imgInput}:</span><span> ${arr[i].comInput}</span></p>
                <p class="times">${timer(arr[i].time)}</p>
            </div>
        </li>
        `;
    }
    $("#ulList").html(str);
}

function timer(time) {
    let d = new Date(time);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    return Zero(month) + '月' + Zero(day) + '日' + '  ' + Zero(hour) + ':' + Zero(minute)
}

function Zero(n) {
    return n < 10 ? '0' + n : n;
}
