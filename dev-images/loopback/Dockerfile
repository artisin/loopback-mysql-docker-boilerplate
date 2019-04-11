# Select node version
From node:6.11.1

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list

# Update/install pakcages
RUN apt-get update && \
    apt-get install -y curl apt-transport-https build-essential libssl-dev libmysqlclient-dev && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Setup/Define working directory
WORKDIR /usr/src/api

# Set Node env -> dev/prod
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Install globally in container -> we use yarn to avoid a permission headach
RUN yarn && yarn global add loopback-cli@3.1.0 nodemon loopback-connector-mysql
