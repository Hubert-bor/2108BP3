getData({});
$('#add').click(function () {
    var bookName = $('#bookName').val();
    var bookAuthor = $('#bookAuthor').val();
    var bookAddress = $('#bookAddress').val();
    if (bookName && bookAuthor && bookAddress) {
        $.ajax({
            type: 'post',
            url: '/addPost',
            data: {
                bookName,
                bookAuthor,
                bookAddress
                ,
                time: +new Date()
            },
            beforeSend() {
                $('#loading').show();
            },
            success(data) {
                console.log(data.data);
                getData({});

            },
            complete() {
                $('#loading').hide();

                $('#bookName').val('');
                $('#bookAuthor').val('');
                $('#bookAddress').val('');
            }
        })
    }
});

function showPage(arr) {
    var str = '';
    for (let i = 0; i < arr.length; i++) {
        str += `
        <tr>
        <td>${arr[i].time}</td>
        <td>${arr[i].bookName}</td>
        <td>${arr[i].bookAuthor}</td>
        <td>${arr[i].bookAddress}</td>
        <td>
            <button onclick="del('${arr[i]._id}')">删除</button>
        </td>
    </tr>
        `;
    }
    $('#tbody').html(str);
}

function getData(whereObj) {
    if (!whereObj) {
        whereObj = {
            findObj: {}
        }
    }
    $.ajax({
        type: 'get',
        url: '/getData',
        data: whereObj,
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
// 删除
function del(id) {
    $.ajax({
        type: 'post',
        url: '/postDel',
        data: {
            _id: id,

        },
        beforeSend() {
            $('#loading').show();
        },
        success(data) {
            getData();
        },
        complete() {
            $('#loading').hide();
        }

    })
}


$('#searchBtn').click(function () {
    var searchBook = $('#searchBook').val();
    var whereObj = {
        findObj: {
            bookName: searchBook
        }
    }
    $.ajax({
        type: 'get',
        url: '/getData',
        data: whereObj,
        beforeSend() {
            $('#loading').show();
        },
        success(data) {
            console.log(data.data);
            if (data.data.length) {
                showPage(data.data)
            } else {
                $('#tbody').html("没有相关数据!");
            }
        },
        complete() {
            $('#loading').hide();
        }
    })
})

$('#searchBtn1').click(function () {
    var searchBook = $('#searchBook').val();
    var whereObj = {
        findObj: {
            bookName: searchBook
        }
    }
    $.ajax({
        type: 'post',
        url: '/postData',
        data: whereObj,
        beforeSend() {
            $('#loading').show();
        },
        success(data) {
            console.log(data.data);
            if (data.data.length) {
                showPage(data.data)
            } else {
                $('#tbody').html("没有相关数据!");
            }
        },
        complete() {
            $('#loading').hide();
            $('#searchBook').val('')
        }
    })
})