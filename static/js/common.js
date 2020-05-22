$(function () {



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
        url = "/remind"; // 移動するアドレス
        function jumpPage() {
            location.href = url;
        }
        setTimeout(jumpPage(), waitTimer * 1000)
    });

    $('#shiritori_form').on('submit', function (event) {
        //Ajax通信
        $.ajax({
                date: {
                    //form内inputの値
                    words: $('words').val()
                },
                type: 'POST',
                url: '/shiritori'
            })
            //入力した単語を表示
            .done(function (data) {
                $('#word_output').append('<li>' + data.output + '</li>').show();
            });
        event.preventDefault();
    });













});