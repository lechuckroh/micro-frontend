# MicroFrontend

## 요구사항

* 자식 프로젝트끼리는 커플링이 없어야 한다. (라이브러리 공유는 가능)
* 컨테이너와 자식 프로젝트는 커플링을 최소화한다.
* 프로젝트의 CSS가 다른 프로젝트에 영향을 주면 안된다.
* 저장소 관리 방법(모노 저장소 혹은 별도의 저장소)은 전체 프로젝트에 영향을 주면 안된다.
* 컨테이너 프로젝트는 자식 프로젝트의 특정 버전을 선택해서 사용할 수 있어야 한다.

배포 요구사항
* 각각의 프로젝트(컨테이너 포함)는 독립적으로 배포할 수 있어야 한다.
* 자식 프로젝트의 `remoteEntry.js` 파일 위치는 빌드시점에 알 수 있어야 한다.
* 단일 저장소를 사용하는 경우 CI 실행시 변경된 프로젝트만 빌드할 수 있도록 설정이 필요하다.
* `remoteEntry.js` 파일명이 고정되어 있기 때문에 캐싱 이슈를 고려해야 한다.
* 각각의 배포 파일을 단일 도메인에 배포하기 위해 각 프로젝트의 배포 경로를 다르게 설정한다.
    * `/auth/latest/*`
    * `/container/latest/*`
    * `/dashboard/latest/*`
    * `/marketing/latest/*`

## 웹팩 설정

* 로컬 개발 서버용 설정과 production 배포용 설정을 분리한다.
    * `webpack.common.js`
    * `webpack.dev.js`
    * `webpack.prod.js`
* [webpack-merge](https://github.com/survivejs/webpack-merge)를 사용해 `webpack.common.js`의 공통 설정을 가져와 합친다.



## 빌드 및 실행

### 개발 서버

```shell
# dependency 설치
$ task install

# 개발 서버 실행
$ task start-container
$ task start-marketing
```

접속 주소:
* Container: `http://localhost:8080`
* Marketing: `http://localhost:8081`


### production

```shell
# 도커 이미지 빌드
$ task docker-build-image

# 도커 컨테이너 실행
$ task docker-run-image
```

도커 컨테이너는 `http://localhost:8000/container/index.html` 로 접속한다.
