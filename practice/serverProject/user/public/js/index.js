var whereObj = {};
postData(whereObj);

$('#add').click(function () {
    let userName = $('#userName').val();
    let userAge = $('#userAge').val();
    if (userName && userAge) {
        $.ajax({
            type: 'post',
            url: '/addPost',
            data: {
                userName,
                userAge,
                id: +new Date()
            },
            beforeSend() {
            },
            success(data) {
                postData(whereObj);
            },
            complete() {
                $('#userName').val('');
                $('#userAge').val('');
            }
        });
    } else {
        alert('姓名或年龄不能为空!');
        return;
    }


})

// ID排序 有待完善
$('#idSortBtn').click(function () {
    if ($(this).text() === 'ID从小排序') {
        $(this).text('ID从大排序');
        var idList = $('#tbody>tr>td:nth-of-type(1)');
        var arr = [];
        $.each(idList, function (index, items) {
            let oldV = $(items).text();
            // console.log(oldV);
            arr.push(oldV / 1);
        })
        // console.log(arr);
        // ============================================
        var item;
        for (let j = 0; j < arr.length - 1; j++) {
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] < arr[i + 1]) {
                    item = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = item;
                }
            }

        }
        // console.log(arr);
        $.each(idList, function (index, items) {
            $(items).text(arr[index]);
        })

    } else if ($(this).text() === 'ID从大排序') {
        $(this).text('ID从小排序');
        postData(whereObj);
    }
    // ============================================

})

// 年龄排序
$('#ageSortBtn').click(function () {
    if ($(this).text() === '年龄从小排序') {
        $(this).text('年龄从大排序');
        whereObj = {
            sortObj: {
                userAge: -1
            }
        };
        postData(whereObj);
    } else if ($(this).text() === '年龄从大排序') {
        $(this).text('年龄从小排序');
        whereObj = {
            sortObj: {
                userAge: 1
            }
        };
        postData(whereObj);
    }
})

// 重置
$('#resetBtn').click(function () {
    $('#searchInput').val('');
})

// 搜索
$('#searchBtn').click(function () {
    whereObj = {
        findObj: {
            userName: $('#searchInput').val()
        }
    };
    postData(whereObj);
    $('#searchInput').val('');
})

// 移入变色
$('#yrbsBtn').click(function () {
    if ($(this).text() === '开启移入变色') {
        $(this).text('关闭移入变色');
        $('#tbody>tr').addClass('yrbs');
    } else if ($(this).text() === '关闭移入变色') {
        $(this).text('开启移入变色');
        $('#tbody>tr').removeClass('yrbs');
    }
})

// 删除
function del(id) {
    $.ajax({
        type: 'post',
        url: '/delPost',
        data: {
            _id: id
        },
        beforeSend() {
        },
        success(data) {
            postData(whereObj);
        },
        complete() {
        }
    });
}

// 获取数据
function postData(whereObj) {
    $.ajax({
        type: 'post',
        url: '/postData',
        data: whereObj,
        beforeSend() {
        },
        success(data) {
            if (!data.data.length) {
                str = `
                    <h1 class="red">暂无数据</h1>
                `;

                $('#tbody').html(str);
            } else {
                showPage(data.data);
            }
        },
        complete() {
        }
    });
}

// 渲染
function showPage(arr) {
    let str = '';
    let len = arr.length;
    for (let i = 0; i < arr.length; i++) {
        str += `
        <tr tr >
            <td>${i + 1}</td>
            <td>${arr[i].userName}</td>
            <td>${arr[i].userAge}</td>
            <td>
                <button onclick=del('${arr[i]._id}')>删除</button>
            </td >
        </tr >
        `;
    }
    $('#tbody').html(str);
}