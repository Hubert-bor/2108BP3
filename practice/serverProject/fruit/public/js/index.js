// import $ from 'jquery';
// 查询条件 默认为空
var whereObj = {};
// 价格增减区间
const PRICE = 0.5;

postData(whereObj);
$("#imgSrc>img").eq(0).css("opacity", '1').siblings().css('opacity', '.4');


var imgSrcIndex = 0;
$("#imgSrc>img").click(function () {
    imgSrcIndex = $(this).index();
    $(this).css("opacity", '1').siblings().css('opacity', '.4');
})


$('#add').click(function () {
    var goodsName = $('#goodsName').val();
    var goodsPrice = $('#goodsPrice').val();
    if (goodsName && goodsPrice) {
        $.ajax({
            type: 'post',
            url: '/addPost',
            data: {
                goodsName,
                imgSrcIndex,
                goodsPrice: (goodsPrice / 1).toFixed(2),
                time: +new Date()
            },
            beforeSend() {
            },
            success(data) {
                postData(whereObj);
            },
            complete() {
                $('#goodsName').val('');
                $('#goodsPrice').val('');
                $("#imgSrc>img").eq(0).css("opacity", '1').siblings().css('opacity', '.4');
            }
        });
    } else {
        mark();
    }

})

// 水果分类查询
$('#ulList>li>a').click(function () {
    let findObj = $(this).text();
    whereObj = {
        findObj: {
            goodsName: findObj == '全部' ? findObj = {} : findObj
        }
    }
    postData(whereObj);
})

// 渲染
function showPage(arr) {
    let str = '';
    for (var i = 0; i < arr.length; i++) {
        str += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].goodsName}</td>
        <td>
            <button class="layui-btn layui-btn-xs subBtn"><i
                    class='layui-icon layui-icon-subtraction'></i></button>
            <span>¥${arr[i].goodsPrice}</span>
            <button class="layui-btn layui-btn-xs addBtn"><i
                    class='layui-icon layui-icon-addition'></i></button>
        </td>
        <td>
            <img src="${$('#imgSrc>img').eq(arr[i].imgSrcIndex).attr('src')}" style='opacity:1;'>
        </td >
        <td>${timer(arr[i].time)}</td>
        <td>
            <button class="layui-btn layui-btn-sm" onclick=del('${arr[i]._id}')>删除</button>
        </td >
    </tr >
            `;
    }
    $('#tbody').html(str);

    // 给加减按钮绑定事件
    $('.subBtn').on('click', function () {
        let spanPrice = $(this).siblings('span').text();
        spanPriceOld = spanPrice.slice(1, spanPrice.length) / 1;
        spanPriceNew = spanPriceOld - PRICE;
        if (spanPriceNew == 0) {
            $(this).css('display', 'none');
        }
        $(this).siblings('span').text('¥' + spanPriceNew.toFixed(2));
        let updateObj = {
            old: {
                goodsPrice: spanPriceOld.toFixed(2)
            },
            new: {
                $set: {
                    goodsPrice: spanPriceNew.toFixed(2)
                }
            }
        }
        updateData(updateObj);
    })
    $('.addBtn').on('click', function () {
        let spanPrice = $(this).siblings('span').text();
        spanPriceOld = spanPrice.slice(1, spanPrice.length) / 1;
        spanPriceNew = spanPriceOld + PRICE;
        if (spanPriceNew > 0) {
            $(this).siblings('button').css('display', 'inline-block');
        }
        $(this).siblings('span').text('¥' + spanPriceNew.toFixed(2));
        let updateObj = {
            old: {
                goodsPrice: spanPriceOld.toFixed(2)
            },
            new: {
                $set: {
                    goodsPrice: spanPriceNew.toFixed(2)
                }
            }
        }
        updateData(updateObj);
    })
}

// 更新接口
function updateData(updateObj) {
    $.ajax({
        type: 'post',
        url: '/updatePost',
        data: updateObj,
        beforeSend() {
        },
        success(data) {
            // console.log(data);
        },
        complete() {
        }
    });
}

// 删除接口 postDel
function del(id) {
    $.ajax({
        type: 'post',
        url: '/postDel',
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

// 获取数据 接口 postData
function postData(whereObj) {
    $.ajax({
        type: 'post',
        url: '/postData',
        data: whereObj,
        beforeSend() {
        },
        success(data) {
            // console.log(data.data);
            showPage(data.data);
        },
        complete() {
        }
    });
}

// 时间函数
function timer(time) {
    let d = new Date(time / 1);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    return zero(year) + '-' + zero(month) + '-' + zero(date) + '  ' + zero(hour) + ':' + zero(minute) + ':' + zero(second);
}

// 补零函数
function zero(n) {
    return n < 10 ? "0" + n : n;
}


// 弹出框
function mark() {
    layer.open({
        type: 1
        , title: false //不显示标题栏
        , closeBtn: false
        , area: '300px;'
        , shade: 0.8
        , id: 'LAY_layuipro' //设定一个id，防止重复弹出
        , resize: false
        , btn: ['OK']
        , btnAlign: 'c'
        , moveType: 1 //拖拽模式，0或者1
        , content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">给个名字或价格吧!</div>'
        // , success: function (layero) {
        //     var btn = layero.find('.layui-layer-btn');
        //     btn.find('.layui-layer-btn0').attr({
        //         href: 'https://layui.itze.cn'
        //         , target: '_blank'
        //     });
        // }
    });
}
