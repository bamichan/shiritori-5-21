# splite3をimportする
import sqlite3
# flaskをimportしてflaskを使えるようにする
from flask import Flask , render_template , request , redirect , session,url_for,jsonify,Blueprint
#時間ごとに処理する
import time
import re

app = Flask(__name__)

app.secret_key = 'sunabakoza'

#正規表現
def word_re(word):
    re_hiragana = re.compile(r'^[あ-ん\u30A1-\u30F4ー]+$')
    return re_hiragana.fullmatch(word)

@app.route('/',methods=["GET", "POST"])
def top():
    if request.method == "GET":
        return render_template("index.html")
    else:
        #テーマ名を入力してDBに保存
        theme = request.form.get("theme")
        if theme == "":
            noTheme = "テーマが入力されていません"
            return render_template("index.html",noTheme = noTheme)
        conn = sqlite3.connect('service.db')
        c = conn.cursor()
        c.execute("insert into themes values(null,?)", (theme,) )
        #テーマIDをthemeに代入
        c.execute("select id from themes where theme = ?",(theme,))
        theme_id = c.fetchone()
        conn.commit()
        conn.close()
        # theme_id が NULL(PythonではNone)じゃなければログイン成功
        if theme_id is None:
            # theme_id が設定されていないとトップページに戻す
            return render_template("index.html")
        else:
            session['theme_id'] = theme_id[0]
            return redirect("/shiritori")
        

@app.route('/shiritori',methods=["GET","POST"])
def shiritori():
    if request.method == "GET":
        if 'theme_id' is None:
            # theme_id が設定されていないとトップページに戻す
            return render_template("index.html")
        else:
            return render_template("shiritori.html")
    else:
        #sessionからtheme_idを取得
        theme_id = session['theme_id']
        word = request.form.get('words')
        #正規表現で入力をひらがな限定
        if word_re(word):
            conn = sqlite3.connect('service.db')
            c = conn.cursor()
            c.execute("select count(*) from shiritori where word = ? and theme_id = ?", (word,theme_id,))
            word_count = c.fetchone()
            # 入力された単語と同じ単語がデータベースの中に何個あるかを数える
            print(word_count[0])
            if word_count[0] == 0:
                #db shiritori に theme_idと単語をインサート
                c.execute("insert into shiritori values(?,?,null)", (theme_id,word,))
                conn.commit()
                conn.close()
                return jsonify({'word_output':word,'error':'入力完了'})
            else:
                conn.close()
                return jsonify({'error' : 'この単語はすでに使われています'})
        else:
            return jsonify({'error' : 'ひらがなかカタカナで入力してください'})


@app.route('/remind',methods=["GET","POST"])
def remind():
    if request.method == "GET":
        if 'theme_id' is None:
            # theme_id が設定されていないとトップページに戻す
            return render_template("index.html")
        else:
            return render_template("remind.html")
    else:
        #sessionからtheme_idを取得
        theme_id = session['theme_id']
        remind = request.form.get('remind')

        # テーマ名を取ってくる
        conn = sqlite3.connect("servise.db")
        c = conn.cursor()
        c.execute("select theme from themes where id = ?", (theme_id,))
        theme = c.fetchone()
        c.close()

        # しりとりの内容を取ってくる
        conn = sqlite3.connect("servise.db")
        c = conn.cursor()
        c.execute("select word,id from shiritori where theme_id = ?", (theme_id,))
        shiritori_list = []
        # shiritori_listに取ってきた内容を辞書型格納
        for row in c.fetchall():
            shiritori_list.append({'id': row[0], 'word': row[1]})
        c.close()  # closeはfor文の外で！
        # 中身を確認
        print(shiritori_list)
        shiritori_id = shiritori_list[0]

        #db remind に 連想をインサート
        conn = sqlite3.connect('service.db')
        c = conn.cursor()
        c.execute("insert into remind values(?,?,?)", (theme_id,shiritori_id,remind,) )
        conn.commit()
        conn.close()

        return render_template("remind.html", shiritori_word = shiritori_list[1], theme = theme)



## おまじない
if __name__ == "__main__":
    app.run(debug=True)