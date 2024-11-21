# 使用官方 Node.js 映像作為基礎
FROM node:lts

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 yarn.lock 進入容器
COPY package.json yarn.lock ./

# 安裝依賴
RUN yarn install --frozen-lockfile

# 複製專案文件
COPY . .

# 編譯 TypeScript (如果需要)
RUN yarn build

# 暴露應用程式埠
EXPOSE 3000

# 啟動應用程式
CMD ["yarn", "start"]