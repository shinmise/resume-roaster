# 🔥 Resume Roaster — リリース手順書

## 必要なもの（無料 or 安い）
| ツール | 用途 | 費用 |
|--------|------|------|
| GitHub | コード管理 | 無料 |
| Vercel | ホスティング | 無料〜 |
| Anthropic API | AI機能 | 従量課金 ($0.003/回) |
| Stripe | 決済 | 無料 (販売手数料2.9%) |

---

## STEP 1: GitHubにコードをアップロード

1. https://github.com にアクセスしてアカウント作成（既存ならログイン）
2. 「New repository」→ 名前: `resume-roaster` → Public → Create
3. ターミナルで以下を実行：

```bash
cd resume-roaster
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/あなたのID/resume-roaster.git
git push -u origin main
```

---

## STEP 2: Anthropic APIキーを取得

1. https://console.anthropic.com にアクセス
2. 「API Keys」→「Create Key」
3. 表示されたキー（`sk-ant-...`）をコピーして保存

---

## STEP 3: Stripeの設定

1. https://stripe.com でアカウント作成
2. ダッシュボード → 「Products」→「Add product」
   - 名前: `Resume Roaster Pro`
   - 価格: `$9.99` / month (recurring)
3. 作成後に表示される `price_xxx...` をメモ
4. 「Developers」→「API keys」から以下をメモ：
   - `pk_live_xxx...` (Publishable key)
   - `sk_live_xxx...` (Secret key)

---

## STEP 4: Vercelにデプロイ

1. https://vercel.com にアクセス（GitHubでログイン推奨）
2. 「New Project」→ GitHubの `resume-roaster` を選択
3. 「Environment Variables」に以下を入力：

```
ANTHROPIC_API_KEY     = sk-ant-xxxxxxx
STRIPE_SECRET_KEY     = sk_live_xxxxxxx
STRIPE_PUBLISHABLE_KEY = pk_live_xxxxxxx
STRIPE_PRICE_ID       = price_xxxxxxx
NEXT_PUBLIC_APP_URL   = https://resume-roaster.vercel.app
```

4. 「Deploy」をクリック → 2〜3分で完了 🎉

---

## STEP 5: Stripe Webhookの設定

1. Stripeダッシュボード →「Developers」→「Webhooks」
2. 「Add endpoint」
   - URL: `https://resume-roaster.vercel.app/api/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`
3. 「Webhook signing secret」(`whsec_xxx`) をコピー
4. Vercelの環境変数に追加：
   - `STRIPE_WEBHOOK_SECRET = whsec_xxxxxxx`
5. Vercel → 「Redeploy」

---

## STEP 6: 動作確認

1. https://resume-roaster.vercel.app にアクセス
2. 適当な履歴書テキストを貼り付けて「Roast」
3. 結果が表示されること確認
4. 「Upgrade」ボタン → Stripeの決済ページが表示されること確認

**Stripeのテストカード:**
- カード番号: `4242 4242 4242 4242`
- 有効期限: 任意の将来日付
- CVV: 任意3桁

---

## 収益試算

| 有料ユーザー数 | 月収 |
|--------------|------|
| 100人 | $999/月 (約15万円) |
| 500人 | $4,995/月 (約75万円) |
| 1,000人 | $9,990/月 (約150万円) |

---

## マーケティング（無料でできる）

- **Reddit**: r/jobs, r/resumes, r/cscareerquestions に投稿
- **Twitter/X**: 「I built a brutally honest AI resume reviewer」でバイラル狙い
- **Product Hunt**: 月曜朝（US時間）に投稿が最も効果的
- **Hacker News**: Show HN: Resume Roaster – AI that tears your resume apart

---

## トラブルシューティング

| 問題 | 解決策 |
|------|--------|
| AIが動かない | ANTHROPIC_API_KEYの確認 |
| 決済ページが開かない | STRIPE_PRICE_IDの確認 |
| Webhookが届かない | STRIPE_WEBHOOK_SECRETの確認 |
| ビルドエラー | `npm run build` をローカルで実行して確認 |

---

問題があれば、エラーメッセージをそのまま共有してください！
