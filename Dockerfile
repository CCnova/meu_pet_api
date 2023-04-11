FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json prisma ./

RUN npm install

# Bundle app source
COPY . .

RUN npm install -g dotenv-cli

RUN chmod +x /app/scripts/run-it.sh && chmod +x /app/scripts/wait-for-it.sh

EXPOSE 3000

CMD ["./scripts/run-it.sh"]