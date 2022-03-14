# Git Rules

<br>

## Git Flow

![img](git_rules.assets/kF7Uf.png)

<br>

## Branching Strategy

```
master : 제품으로 출시될 수 있는 브랜치
release : 출시 버전을 준비하는 브랜치
hotfix : 출시 버전에서 발생한 버그를 수정하는 브랜치
develop : 다음 출시 버전을 개발하는 브랜치
feature : 기능을 개발하는 브랜치
```

<br>

#### 예시

```
master

release-1.0.0

hotfix

develop
develop/fe
develop/be
develop/al

feature/login
feature/signup
```

<br>

## Commit Message Convention

### 1. Developmet 코드

```
Feat : 새로운 기능을 추가할 경우
Fix : 버그를 고친 경우
Hotfix : 급하게 치명적인 버그를 고쳐야하는 경우
Design : CSS 등 사용자 UI 디자인 변경
Style : 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
Modify : 단순한 코드 수정
Delete : 삭제한 코드 설명
Remove : 파일을 삭제하는 작업만 수행한 경우
Comment: 필요한 주석 추가 및 변경
Docs : 문서를 수정한 경우
Test : 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)
Chore : 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)
Refactor : 코드 리팩토링한 경우
Rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
Merge : to ← from (#1)
Merge : 변경된 내용 작성
```

<br>

#### 예시

```
Feat : 회원가입 API 구현
```

```
Delete : 로그인 API에서 중복된 코드 삭제
```

```
Refactor : 마이페이지 코드 리팩토링
```

```
Merge : develop ← feature/signup
```

<br>

***

### 2. Documents 문서

```
Add : 내용 추가
Update : 내용 업데이트
Modify : 내용 수정
Delete : 내용 삭제
Remove : 파일 삭제
```

<br>

#### 예시

```
Update : 회원가입 API 이메일 인증 업데이트
```