# FROM node:16 as builder
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000

CMD ["npm", "run", "cloud"]
# CMD ["npm", "run", "build"]

# FROM nginx
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
