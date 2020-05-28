$(function () {
    // しりとり入力
    $('#shiritori_form').on('submit', function (event) {
        $.ajax({
                data: {
                    words: $('#words').val(),
                },
                type: 'POST',
                url: '/shiritori'
            })
            .done(function (data) {
                if (data.error == '入力完了') {
                    $('#word_output ol').append('<li>' + data.word_output + '</li>').show();
                    $("#word_output ol").scrollTop($("#word_output ol")[0].scrollHeight);
                    $('#error_text').hide();
                } else {
                    $('#error_text').text(data.error).show();
                }
            });
        $("#shiritori_form").each(function () {
            $(this).find('input#words').val('');
        });
        event.preventDefault();
    });


    // 変数targetに、入力不可にしたい項目を定義
    var target = document.getElementById("words");
    // 変数wordsの要素を入力不可にする
    target.disabled = true;
    $('#words_submit').prop('disabled', true);

    // しりとりタイマー
    $('.start_button button').on('click', function () {
        // 一定時間経過後に指定ページにジャンプする
        setTimeout(function () {
            location.href = "/remind";
        }, 63000);
        // スタートボタンを隠す
        $('.start_button').css('display', 'none');
        // しりとりフォームを入力できるようにする
        target.disabled = false;
        $('#words_submit').prop('disabled', false);
        // １秒ごとに数字が減っていく
        var time = 60;
        var countup = function () {
            time -= 1;
            console.log(time)
            if (time < 0) {
                $("#limit_time").text('終了です');
            } else {
                $("#limit_time").text(time);
            }
        }
        var id = setInterval(function () {
            countup();
            if (time > 60) {
                clearInterval(id)
            }
        }, 1000);
    });

    // コンテンツを増やす参考
    // function appendFlex() {
    //     var appendedDiv = $('.flex_area_padding').last().clone(); 
    //     $('.flex_area').append(add_contents);
    // }
    // $("#copyflex_btn").on("click", function (e) {
    //     // イベントをキャンセルしてページ最上部への移動を防ぐ
    //     e.preventDefault();
    //     // 入力フォームの値を取得
    //     var copyflex_form = $('#copyflex_form').val();
    //     // 入力フォームから入力された値は「文字列型」
    //     console.log(typeof copyflex_form);
    //     // 入力されたものは「文字列型」なので「数値型」に型変換
    //     copyflex_form = Number(copyflex_form);
    //     console.log(typeof copyflex_form);
    //     if (copyflex_form > 0 && copyflex_form < 11 && Number.isInteger(copyflex_form)) {
    //         for (var i = 0; i < copyflex_form; i++) {
    //             appendFlex();
    //         }
    //     }
    // });

    // // 連想入力
    // $('#remind_form').on('submit', function (event) {
    //     $.ajax({
    //         data: {
    //             words: $('#words').val(),
    //         },
    //         type: 'POST',
    //         url: '/shiritori'
    //     })
    //     .done(function (data) {
    //         if (data.error == '入力完了') {
    //             $('#word_output ol').append('<li>' + data.word_output + '</li>').show();
    //             $('#error_text').hide();
    //         } else {
    //             $('#error_text').text(data.error).show();
    //         }
    //     });
    //     $("#shiritori_form").each(function () {
    //         $(this).find('input#words').val('');
    //     });
    //     event.preventDefault();
    // });







});