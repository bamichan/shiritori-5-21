$(function () {

    $('#shiritori_form').on('submit', function (event) {
        $.ajax({
                data: {
                    words: $('#words').val(),
                },
                type: 'POST',
                url: '/shiritori'
            })
            .done(function (data) {
                if (data.error == 'テスト') {
                    $('#word_output').append('<li>' + data.word_output + '</li>').show();
                    $('#error_text').hide();
                } else {
                    $('#error_text').text(data.error).show();
                }
            });
        event.preventDefault();
    });


    // 変数targetに、入力不可にしたい項目を定義
    var target = document.getElementById("words");
    // 変数wordsの要素を入力不可にする
    target.disabled = true;
    $('#words_submit').prop('disabled', true);

    $('.start_button button').on('click', function () {
        //スタートボタンを隠す
        $('.start_button').css('display', 'none');
        //しりとりフォームを入力できるようにする
        target.disabled = false;
        $('#words_submit').prop('disabled', false);
        //１秒ごとに数字が減っていく
        var time = 60;
        var countup = function () {
            time -= 1;
            console.log(time)
            $("#limit_time").text(time);
        }
        var id = setInterval(function () {
            countup();
            if (time > 60) {
                clearInterval(id)
            }
        }, 1000);
        // 一定時間経過後に指定ページにジャンプする
        // ジャンプしません!!!
        // waitTimer = 60; // 何秒後に移動する
        // url = "/remind"; // 移動するアドレス
        // function jumpPage() {
        //     location.href = url;
        // }
        // setTimeout(jumpPage(), waitTimer * 1000)
    });




    // //①formのsubmitボタンをクリック
    // $('#form').on('submit', function (event) {
    //     //②Ajax通信
    //     $.ajax({
    //             data: {
    //                 //③form内inputの値、リクエスト(POST or GET),リクエスト先のURLを記述
    //                 firstname: $('#firstname').val(),
    //                 lastname: $('#lastname').val(),
    //             },
    //             type: 'POST',
    //             url: '/test'
    //         })
    //         //④formの下に結果を表示
    //         .done(function (data) {
    //             $('#output').text(data.output).show();
    //         });
    //     event.preventDefault();
    // });










});