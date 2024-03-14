# 블록 코딩 서비스

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/b046f300-3b74-4f32-b5ed-1564e64f520e">

## 프로젝트구조

- 컴포넌트 구조

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/468be8d6-ab50-4a40-9d71-9a1d1a19acec">

- core API (상태 관리, 렌더링)

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/968d2c4b-0350-4c80-b4e4-984babde0a69">

## 일정 관리

### 사용자 스토리, 피쳐 리스트

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/571b9593-8044-45d6-ac39-553b119d843a">

### 간트 차트

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/7b821031-3483-471f-a1a0-0326b025763b">

## 기본 기능

- 블록 구현
- 블록 배치, 연결
- 프로그램 실행, 중지, 일시정지
- 예외 처리

## 추가 기능

- 코드 블록 복제 (ctrl, command 드래그 앤 드랍)
- 되돌리기 기능 (ctrl + z, command + z)
- JSON 저장 / 불러오기
- URL 블록 배치 공유
- Javascript 코드 내보내기
- 디버깅 블록 구현

## 기능 동작 화면

### 블럭 구현

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/a47a10d2-d04a-46a5-9639-9f7a8aa36774">

### 블럭 배치, 연결

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/b19bd9e5-2144-433a-99d4-6c8adcd92a10">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/65892def-9bb7-4c32-ae72-d48d1794207e">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/a0636fea-1c20-4d03-8bdb-acdc131e4677">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/82a56b23-539a-433a-8e26-fd6eebf5c357">

### 프로그램 실행, 정지, 일시정지

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/a10b4bc8-0f2a-4fda-abe3-b9d0a67a7b53">

### 예외 처리

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/71b0a057-2dae-402b-872e-064ed0a67c21">

### 블럭 복제 (ctrl + drag / command + drag)

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/b50ece95-10cb-4c1e-a86b-fe3d0f234d63">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/9f2ce315-c17a-4f2f-8d0a-3768683d2039">

### 되돌리기 기능 (ctrl + z / command + z)

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/78c91da3-1336-41da-ac45-5210061cb86a">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/97b79893-246d-498f-a995-8698fc1b7913">

### JSON 저장, 불러오기
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/0c4b9cac-e02e-4019-ac11-77c8112fc3c8">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/64d02e0c-3c9b-46c3-a69f-240713947f74">

### 디버깅 블록 구현

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/12fb67ba-1a8b-4480-9063-1796f81dc7a9">

### Javascript로 내보내기

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/705bfe4f-9037-4135-9bf7-d441e4094222">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/058c5b60-51f1-4845-be81-2230bec17d2e">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/fd891989-1fc5-4d8f-b7d3-ced56aab8c7a">


### URL 블록 배치 공유

<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/3da1f6b3-23b3-43f8-92fe-a113d424a003">
<img width="600" alt="image" src="https://github.com/J3SUNG/BlockCoding/assets/16315673/1b86fba9-a9cc-407a-a080-a1ac56e22628">

## 추가 개선 사항

### 성능

- 접은 상태 인 경우, paint과정에서 그리지 않도록 수정
- 블록 관련 이벤트 발생 시, 해당 블록들만 새롭게 렌더링 되도록 수정
- 블록의 너비와 높이를 계산하지 않고 css로 들어갈 위치 지정

### 구조

- 뷰와 모델 분리
- 클래스 상속 구조 수정
- 블록 클래스가 parent값을 갖도록 수정
- 블록 객체의 최상위가 현재 배열인데 객체 형식으로 변경
- 블록 객체의 child 필드를 자식 블록을 담는 필드로 사용

### UI/UX

- 블록의 공간에 어떤 데이터가 들어오는지 명시
- svg, canvas를 사용해서 블록 디자인 변경
- 블록 연결 전 들어갈 위치를 보여주는 기능 추가
- 블록 연결이 가능 한지 미리 확인 가능하도록 구현
- 블록 사이에 블록을 연결하는 기능 추가
- 워크스페이스 확대, 축소 기능 구현
- 워크스페이스 드래그 이벤트로 위치 이동하도록 구현

### 기타

- 지정되지 않은 예외 발생 시 해당 코드를 그대로 콘솔창에 출력
- 테스트 코드 작성
- 앞으로 되돌리기 기능 구현
