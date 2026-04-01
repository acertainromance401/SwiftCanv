# Feature Test Checklist

기능 학습 프로젝트용 수동 테스트 체크리스트입니다.

## 공통

- [ ] 앱 실행이 정상 동작한다.
- [ ] 기본 색상 상태가 의도한 값으로 초기화된다.
- [ ] UI가 모바일 폭에서도 깨지지 않는다.

## Web (React)

- [ ] Hue 슬라이더 변경 시 컬러 링 인디케이터가 움직인다.
- [ ] Saturation/Lightness 변경 시 HEX와 미리보기 색이 갱신된다.
- [ ] RGB 채널 수치가 현재 색상과 일치한다.
- [ ] Active Palette의 Primary/Light/Deep 블록이 정상 갱신된다.
- [ ] Studio History 원형 버튼 클릭이 동작한다.
- [ ] Export 버튼 클릭 시 앱이 비정상 종료되지 않는다.

주의:

- 현재 Web은 히스토리 클릭 시 HEX만 바꾸고 HSL 복원은 미구현 상태일 수 있다.

## SwiftUI

- [ ] HSL 슬라이더 변경 시 중앙 색상과 HEX가 즉시 반영된다.
- [ ] RGB 채널 ProgressView 값이 계산 결과와 일치한다.
- [ ] Studio History 색상 탭 시 HSL 복원이 된다.
- [ ] Save Collection 실행 시 저장 개수가 증가한다.
- [ ] 앱 재실행 후 savedPalettes가 유지된다(UserDefaults).
- [ ] Export(ShareLink)가 정상 표시된다.

## 회귀 확인 루틴

1. HSL을 3개 이상 조합으로 변경
2. 히스토리 3개 이상 선택
3. 저장 2회 실행
4. 재실행 후 데이터/상태 확인

## parity gap 추적

- [ ] Web 히스토리 선택 시 HEX -> HSL 완전 복원
- [ ] Web Save Collection(localStorage) 구현
- [x] Swift Save Collection(UserDefaults) 구현
