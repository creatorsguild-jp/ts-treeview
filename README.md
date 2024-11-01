# ts-treeview (開発中)

⚠️ **このプロジェクトは現在開発中です。安定版がリリースされるまで変更が頻繁に行われる可能性があります。**

## ts-treeview ライブラリ利用ガイド

このライブラリは、jQueryに依存しないJavaScriptでツリービューを実現するためのものです。以下の手順で使用方法について説明します。

### 1. インストール

npm には公開していません。
このGitHubからレポジトリーをクローンしてご使用ください。

### 2. 基本的な使用方法

ツリービューの初期化は、HTMLのリスト構造を用いて行います。以下のようにHTML構造を準備してください。

```html
<ul id="tree">
  <li><span class="folder">親ノード1</span>
    <ul>
      <li><span class="file">子ノード1-1</span></li>
      <li><span class="file">子ノード1-2</span></li>
    </ul>
  </li>
  <li><span class="folder">親ノード2</span>
    <ul>
      <li><span class="file">子ノード2-1</span></li>
    </ul>
  </li>
</ul>
```

`<span>`タグでフォルダとファイルを表現し、クラスとしてそれぞれ`"folder"`と`"file"`を指定します。

### 3. ライブラリの初期化

HTMLとCSSの準備が整ったら、JavaScriptで`ts-treeview`を初期化します。

```html
<script src="ts-treeview.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const tree = new TsTreeview("#tree", {
      animated: true,
      collapsed: true,
      unique: true,
    });
  });
</script>
```

#### オプション

- `animated`: アニメーションの有無を指定します（デフォルトは`false`）。
- `collapsed`: 初期状態で全てのノードを折りたたむかどうかを設定します（デフォルトは`true`）。
- `unique`: 同時に複数のノードを展開できるかどうかを指定します（デフォルトは`false`）。

### 4. CSSのスタイル調整

ライブラリのスタイルは自由に変更できます。必要に応じて以下のように基本のスタイルをカスタマイズしてください。

```css
ul.tree, ul.tree ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul.tree li {
  cursor: pointer;
}
ul.tree li.folder::before {
  content: "▶";
}
ul.tree li.file::before {
  content: "📄";
}
```

### 5. イベントハンドリング

各ノードに対してクリックイベントやカスタムイベントを設定できます。たとえば、ノードが開かれたときにイベントをトリガーするには次のようにします。

```typescript
tree.on("nodeOpen", (node) => {
  console.log("Node opened:", node);
});
```

### 6. よくある質問

#### Q: 初期状態で特定のノードを展開したい場合は？

A: 初期化後に`expandNode()`メソッドを使用して展開できます。
