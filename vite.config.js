import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base はリポジトリ名に合わせています。
// https://<ユーザー名>.github.io/Hontobira/ で公開する想定です。
// もし独自ドメインを使う場合や、リポジトリ名を変える場合は '/' や '/新しい名前/' に書き換えてください。
export default defineConfig({
  plugins: [react()],
  base: '/Hontobira/',
})
