# 어떤 이미지를 사용할지 
FROM node:alpine AS development

WORKDIR /usr/src/app

# package.json 복사(필요한 dependency 설치를 위해서)
COPY package*.json ./

#pnpm-lock.yaml 복사
COPY pnpm-lock.yaml ./

# Dependency 설치
RUN npm i -g pnpm
RUN pnpm i

# 나머지 파일및 폴더 복사
COPY . .

# 커맨드 실행
CMD ["pnpm", "start:dev", "user"]
