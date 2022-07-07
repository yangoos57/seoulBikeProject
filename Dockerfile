# docker-compose build는 Dockerfile이 변경될때 실행하면 된다.
# 파일 변동사항은 실시간으로 반영된다.
# pull official base image

FROM python:3.9.7-buster

# set wrok directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# RUN apk update
# RUN apk add mysql mysql-client gcc python3-dev musl-dev zlib-dev jpeg-dev

#install dependencies
RUN pip install --upgrade pip
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

## sql file
# COPY selector_options.sql /docker-entrypoint-initdb.d/

# matplotlib font 설치 & wget 설치 
RUN apt-get update && apt-get install -y wget && apt-get install -y fonts-nanum*

RUN cp /usr/share/fonts/truetype/nanum/Nanum* /usr/local/lib/python3.9/site-packages/matplotlib/mpl-data/fonts/ttf/ && rm -rf ~/.cache/matplotlib/*


### docker-compose 할때 사용하기
# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# ENTRYPOINT ["dockerize", "-wait", "tcp://mysql_service:3306", "-timeout", "20s"]