ARG profile_arg

FROM node:16 as base

#########################
# build container
#########################

FROM base AS build-container

COPY container /usr/src/myapp
WORKDIR /usr/src/myapp
RUN yarn install
RUN yarn build

#########################
# build marketing
#########################

FROM base AS build-marketing

COPY marketing /usr/src/myapp
WORKDIR /usr/src/myapp
RUN yarn install
RUN yarn build

#########################
# build auth
#########################

FROM base AS build-auth

COPY auth /usr/src/myapp
WORKDIR /usr/src/myapp
RUN yarn install
RUN yarn build

#########################
# build dashboard
#########################

FROM base AS build-dashboard

COPY auth /usr/src/myapp
WORKDIR /usr/src/myapp
RUN yarn install
RUN yarn build

###################
# final image
###################

FROM nginx:stable

COPY --from=build-container /usr/src/myapp/dist /usr/share/nginx/html/container/latest
COPY --from=build-marketing /usr/src/myapp/dist /usr/share/nginx/html/marketing/latest
COPY --from=build-auth /usr/src/myapp/dist /usr/share/nginx/html/auth/latest
COPY --from=build-dashboard /usr/src/myapp/dist /usr/share/nginx/html/dashboard/latest
CMD nginx -g 'daemon off;'
