var whereObj = {};
getData(whereObj);

var add = $('#add').click(function () {
    var newsTitle = $('#newsTitle').val();
    var newsAddress = $('#newsAddress').val();
    if (newsTitle && newsAddress) {
        $.ajax({
            type: 'post',
            url: '/postAdd',
            data: {
                newsTitle: newsTitle,
                newsAddress: newsAddress,
                selList: $('#selList').val(),
                isRed: $('#isRed>label>input:checked').val(),
                time: +new Date()
            },
            beforeSend() {
                $('#loading').show();
            },
            success(data) {
                console.log(data);
                getData(whereObj);
            },
            complete() {
                setTimeout(() => {
                    $('#loading').hide();
                }, 1000);

            }

        })
    } else {
        alert('请输入完整信息');
        return;
    }
})

// 渲染
function showPage(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += `
        <li>${arr[i].newsTitle} ${arr[i].newsAddress} ${arr[i].selList == 'n1' ? '科技' : arr[i].selList == 'n2' ? '娱乐' : '财经'}<span>${timer(arr[i].time)}</span><button onclick=del('${arr[i]._id}')>删除</button></li>
        `;
    }
    $('#ulList').html(str);
}

// 获取数据
function getData(whereObj) {
    $.ajax({
        type: 'post',
        url: '/getData',
        data: {
            selList: whereObj.selList,
            skip: whereObj.skip
        },
        beforeSend() {
            $('#loading').show();
        },
        success(data) {
            showPage(data.data);
        },
        complete() {
            $('#loading').hide();
        }
    })
}

getTotalPages();


// 时间

function timer(time) {
    var d = new Date(time - 0);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    return year + '-' + buL(month) + '-' + buL(date) + '  ' + buL(hour) + ':' + buL(minute) + ':' + buL(second)
}

function buL(n) {
    return n < 10 ? '0' + n : n;
}

//删除
function del(id) {
    console.log(id);
    $.ajax({
        type: 'post',
        url: '/postDel',
        data: {
            _id: id
        },
        beforeSend() {
            $('#loading').show();
        },
        success(data) {
            console.log(data);
            getData(whereObj);
        },
        complete() {
            $('#loading').hide();
        }
    })
}
$('#btns>button').eq(0).addClass('red').siblings().removeClass('red');

$('#btns>button').on('click', function () {
    $(this).addClass('red').siblings().removeClass('red');
})

var totalPages;
var pages;

var currentPageIndex = 0;
// 获取总页数
function getTotalPages() {
    $.ajax({
        type: 'post',
        url: '/postTotal',
        data: {
            findObj: {}
        },
        beforeSend: function () {
            $('#loading').show();
        },
        success(data) {
            totalPages = data.data;
            pages = Math.ceil(totalPages / 3);
            console.log(pages);
            btns(pages);
        },
        complete() {
            $('#loading').hide();
        }
    })
}

// 按钮渲染
function btns(pages) {
    var str = '';
    for (var i = 1; i <= pages; i++) {
        str += `
            <button>${i}</button>
        `;
    }
    $('#pagings').html(str);

    $('#pagings>button').eq(currentPageIndex).addClass('red').siblings().removeClass('red');

    $('#pagings>button').on('click', function () {
        currentPageIndex = $(this).index();
        $('#pagings>button').eq(currentPageIndex).addClass('red').siblings().removeClass('red');
        getData(
            {
                skip: currentPageIndex
            }
        );
    })

    // 上下页
    $('#prev').on('click', function () {

        if (currentPageIndex > 0) {
            currentPageIndex--;
            $('#pagings>button').eq(currentPageIndex).addClass('red').siblings().removeClass('red');
            console.log(currentPageIndex);
        };
        getData(
            {
                skip: currentPageIndex
            }
        );
    })

    $('#next').on('click', function () {

        if (currentPageIndex < pages - 1) {
            currentPageIndex++;
            $('#pagings>button').eq(currentPageIndex).addClass('red').siblings().removeClass('red');
            console.log(currentPageIndex);
        };
        getData(
            {
                skip: currentPageIndex
            }
        );
    })
}

