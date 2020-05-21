# shiritori
【新】高松3rd昼卒業制作<br>
フォークして自分のGitHubにリポジトリ（フォルダ）ができる。<br>
クローン（ダウンロード）して自分のPC上にリポジトリが保存される。<br>
ここまでの説明→[リポジトリをフォークする](https://help.github.com/ja/github/getting-started-with-github/fork-a-repo?fbclid=IwAR2GgI0EvMoIv8HwUxghpgOoH89Bv0jrYCjalzcTgzhXiK_litM9H6PDwMU)<br>
PC上のファイルをVScodeなどで開発して、適宜pull-rebaseとプルリクしてください。<br>
説明1→[GitHubにプッシュ・プルリクまでのメモ](https://qiita.com/414_cherry/items/c6803b44930965ff7398)<br>
説明2→[GitHub、作業前・プルリク前にpull-rebaseするメモ](https://qiita.com/414_cherry/items/71527f424340b27894e8)<br>
<br>手順<br>

1. フォーク（私のリポジトリから）<br>
2. クローンorダウンロードzip（自分のリポジトリから自分のPCへ）<br>
3. コードを書く（自分のPCで）<br>
4. git init<br>
5. git remote add origin(自分のGitHubのshiritoriアドレス) →説明１<br>
6. git remote add upstream(私のGitHubのshiritoriアドレス) →説明２<br>
7. pull --rebase →説明２<br>
8. git add と git status<br>
9. git commit と git log<br>
10. git push origin master →説明１<br>
11. GitHubからプルリク →説明１<br>
12. 「7→3→7→8→9→10→11」の繰り返し<br>

<br>

>sunabaco[練習用リポジトリ](https://github.com/shataku/gourmet)より<br>
>コードを書き換えたらNewPull Request→ compare across forksから元のリポジトリにPull-Requestを送信してください<br>
>その際pushする前にfetshしましょう！ 貴方が書いたコードはその時点で最新版とは限らないですからね！他の人が先にpushしているかもしれません<br>
>オーナーに認められたらあなたの書いたコードがサイトに反映されます<br>
>その後も継続的に作業する場合は作業の開始時にPull-Rebaseしましょう これをしないと古い情報で作業することになって混線しちゃいます笑(これをコンフリクト(衝突)を起こす、なんて言ったりします)
