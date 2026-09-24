# Sierpinski Carpet

WebGL을 이용하여 Sierpinski Carpet을 구현한 컴퓨터 그래픽스 과제입니다.

## 구현 기능

- 정사각형을 3×3 영역으로 분할
- 가운데 영역을 제외한 8개 영역을 재귀적으로 분할
- 분할 횟수 선택 기능
- 빨강, 초록, 파랑 색상 선택 기능
- 선택한 설정에 따라 Sierpinski Carpet 다시 그리기

## 실행 방법

1. 저장소의 파일을 다운로드합니다.
2. `carpet.html` 파일을 웹 브라우저에서 실행합니다.
3. 분할 횟수와 색상을 선택합니다.
4. `그리기` 버튼을 누르면 선택한 설정으로 Sierpinski Carpet이 그려집니다.

## 주요 파일

- `carpet.html` : WebGL 화면, Shader 및 사용자 인터페이스
- `carpet.js` : Sierpinski Carpet 분할 및 렌더링
- `MV.js` : 벡터 및 행렬 연산
- `initShaders.js` : Shader 초기화
- `webgl-utils.js` : WebGL 초기화 관련 유틸리티
