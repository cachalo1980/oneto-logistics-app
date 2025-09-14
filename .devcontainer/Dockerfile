FROM mcr.microsoft.com/devcontainers/typescript-node:18
USER root
RUN apt-get update && apt-get install -y tzdata \
    && ln -fs /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime \
    && dpkg-reconfigure -f noninteractive tzdata
USER node