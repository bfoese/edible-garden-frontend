FROM node:14.15-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

ARG GH_PKG_TOKEN
ARG NG_BUILD_CONFIG

# Creates npmrc file on the fly to enable download of private packages from
# github package registry. npmrc file will be removed afterwards to not end up
# in the tarball of this command layer. Careful: the build argument
# $GH_PKG_TOKEN would show up in docker commit history of the image if the build
# would consist only of one stage, because the build steps of the  final stage
# will show up in the commit history.
RUN echo "//npm.pkg.github.com/:_authToken=${GH_PKG_TOKEN}" > .npmrc && \
    echo "@bfoese:registry=https://npm.pkg.github.com/" >> .npmrc && \
    echo "always-auth = true" >> .npmrc && \
    npm ci && rm -f .npmrc

# Copy the rest of the files
COPY . ./
# If --prod is present, Angular will apply it first
RUN node_modules/.bin/ng build --configuration=${NG_BUILD_CONFIG} --prod && npm prune --production


# Create a second stage to make this a multi stage build: only the final build
# will show up in the commit history of the docker image. With this second
# stage, the secret $GH_PKG_TOKEN from previous stage is not going to be visible in
# the commit history of the image.
FROM nginx:1.19.6

# By default there is only an index.html and an 50x.html in the directory
# /usr/share/nginx/html. The index.html will be overwritten in the next step,
# and for now I keep the 50x.html default file, so no deleting of the default
# /html directory. RUN rm -rf /usr/share/nginx/html/*

# copy the built app bundles into the directory, which is defined as nginx root
# directory (see nginx/default.conf file)
COPY --from=builder /usr/src/app/dist/seed-sharing-app /usr/share/nginx/html

COPY nginx/prod/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/prod/nginx.conf /etc/nginx/nginx.conf
COPY projects/seed-sharing-app/src/static/html /usr/share/nginx/html

# envsubst replaces the variable PORT within the given file with the value from
# the environment variable PORT (PORT env variable is provided by HEROKU at
# runtime). The syntax "envsubst VAR < filePath" will return the file content
# with the replaced variable. In order to override the file, the return value
# must be written into that file, which is done with 'textContent > filePath'.
# 'deamon off' tells nginx to stay in the foreground

# NGINX >=1.19 has also a built in solution for replacing variables:, which
# would be better if list of variables grows:
# https://stackoverflow.com/questions/56649582/substitute-environment-variables-in-nginx-config-from-docker-compose
CMD /bin/bash -c "envsubst '\$PORT,\$NGINX_PROXY_PASS' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
