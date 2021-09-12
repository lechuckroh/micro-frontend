# MicroFrontend

## 요구사항

* 자식 프로젝트끼리는 커플링이 없어야 한다. (라이브러리 공유는 가능)
* 컨테이너와 자식 프로젝트는 커플링을 최소화한다.
* 프로젝트의 CSS가 다른 프로젝트에 영향을 주면 안된다.
* 저장소 관리 방법(모노 저장소 혹은 별도의 저장소)은 전체 프로젝트에 영향을 주면 안된다.
* 컨테이너 프로젝트는 자식 프로젝트의 특정 버전을 선택해서 사용할 수 있어야 한다.
* 페이지별로 필요한 자식 프로젝트만 로드해야 한다. (Lazy Loading)

### 배포 요구사항
* 각각의 프로젝트(컨테이너 포함)는 독립적으로 배포할 수 있어야 한다.
* 자식 프로젝트의 `remoteEntry.js` 파일 위치는 빌드시점에 알 수 있어야 한다.
* 단일 저장소를 사용하는 경우 CI 실행시 변경된 프로젝트만 빌드할 수 있도록 설정이 필요하다.
* `remoteEntry.js` 파일명이 고정되어 있기 때문에 캐싱 이슈를 고려해야 한다.
* 각각의 배포 파일을 단일 도메인에 배포하기 위해 각 프로젝트의 배포 경로를 다르게 설정한다.
    * `/auth/latest/*`
    * `/container/latest/*`
    * `/dashboard/latest/*`
    * `/marketing/latest/*`

### CSS 요구사항
* 사용한 CSS 스타일이 다른 프로젝트의 CSS 스타일을 덮어쓰면 안된다.
* 동일한 CSS-in-JS 라이브러리를 사용하는 경우, 생성된 스타일 이름이 다른 프로젝트에서 생성된 스타일과 중복되지 않도록 한다.

### Routing 요구사항
* 컨테이너의 라우팅 로직을 사용해서 각각의 서브앱을 표시할 수 있어야 한다.
* 서브앱의 라우팅 로직을 사용해서 서브앱 내부에서 이동할 수 있어야 한다.
* 서브앱의 라우팅이 변경된 경우 컨테이너를 재배포하지 않고 반영될 수 있어야 한다.
* 여러 서브앱이 동시에 표시될 수 있어야 한다.
* 커스텀 프레임워크 대신 기존 라우팅 라이브러리(예: `react-router-dom`)를 사용할 수 있어야 한다.
* 서브앱의 라우팅은 단독 실행/통합 실행시 모두 동일하게 동작해야 한다.
* 서브앱간의 라우팅 통신은 최대한 일반적인 방법으로 이루어져야 한다.

### Authentication 요구사항
* 단지 사용자 로그인 여부를 확인하기 위해서 Auth 앱을 로드해서는 안된다. (불필요한 초기 트래픽 증가)
* 컨테이너에서 전체적인 인증 로직을 관리하며, 서브앱에 로그인 여부를 알려준다.

## 웹팩 설정

* 로컬 개발 서버용 설정과 production 배포용 설정을 분리한다.
    * `webpack.common.js`
    * `webpack.dev.js`
    * `webpack.prod.js`
* [webpack-merge](https://github.com/survivejs/webpack-merge)를 사용해 `webpack.common.js`의 공통 설정을 가져와 합친다.


## CSS 설정

* CSS-in-JS 라이브러리를 사용하는 경우, 라이브러리에 따라 생성되는 CSS 스타일 이름의 길이를 줄여서 표시하는 경우가 있다. (예: `jss1`, `jss2`, ...)
* 여러 프로젝트에서 동일한 라이브러리를 사용하는 경우, 동일한 스타일 이름이 중복되어 생성되면서 스타일이 충돌하는 경우가 발생한다.
* 이 경우에는 사용하는 CSS-in-JS 라이브러리에서 프로젝트별로 서로 다른 규칙을 사용해 스타일 이름을 생성하도록 별도의 설정이 필요하다.


## Routing 설정
* 컨테이너 프로젝트에서는 Browser History를 사용한다
* 서브앱에서는 Memory History를 사용한다.
* 각각의 Routing 라이브러리는 서로 다른 방식으로 구현하기 때문에, 컨테이너와 서브앱에서 동시에 Browser History를 사용하는 경우 어떤 결과가 나타날지 알 수 없는 상황이 된다. 예를 들면, Race Condition이 발생할 수도 있다.

컨테이너와 서브앱에서 관리하는 라우팅 정보를 동기화하기 위해서는 서로 통신이 필요하다.
* 컨테이너 링크 클릭시: 라우팅 변경 이벤트를 서브앱으로 전송
* 서브앱 링크 클릭시: 라우팅 변경 이벤트를 컨테이너로 전송


## 빌드 및 실행

### 개발 서버

```shell
# dependency 설치
$ task install

# 개발 서버 실행
$ task start-container
$ task start-marketing
$ task start-auth
$ task start-dashboard
```

접속 주소:
* Container: `http://localhost:8080`
* Marketing: `http://localhost:8081`
* Auth: `http://localhost:8082`
* Dashboard: `http://localhost:8083`


### production

```shell
# 도커 이미지 빌드
$ task docker-build-image

# 도커 컨테이너 실행
$ task docker-run

# 도커 컨테이너 중단
$ task docker-stop
```

도커 컨테이너는 `http://localhost:8000/container/index.html` 로 접속한다.
