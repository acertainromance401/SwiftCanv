# Architecture Overview

## 목적 체크리스트

- [x] 컬러 편집 도메인을 Web/SwiftUI로 병행 구현
- [x] 기능 동등성(parity) 비교
- [x] UI/상태 관리 방식 차이 학습

## 구성

## Web (React + Vite + TypeScript)

- 진입점: `src/main.tsx`
- 메인 UI: `src/App.tsx`
- 스타일: `src/index.css` (Tailwind v4 theme 사용)

주요 상태:

- HSL: hue, saturation, lightness
- RGB/HEX: HSL에서 파생 계산
- history: 프리셋/최근 색상 리스트

핵심 흐름:

1. HSL 슬라이더 조작
2. HSL -> RGB -> HEX 계산
3. 미리보기 UI, RGB 채널, 팔레트 블록 갱신
4. 히스토리 색 선택으로 상태 반영

## Native (SwiftUI + XcodeGen)

- 진입점: `swift/TheInvisibleGallery/TheInvisibleGalleryApp.swift`
- 메인 화면: `swift/TheInvisibleGallery/ContentView.swift`
- 색상 유틸: `swift/TheInvisibleGallery/ColorModel.swift`
- 프로젝트 생성: `swift/project.yml`, `swift/scripts/generate_xcodeproj.sh`

주요 상태:

- hue, saturation, lightness
- rgb, hex 파생값
- history 배열
- savedPalettes(UserDefaults)

핵심 흐름:

1. 슬라이더 변경
2. 계산 유틸로 RGB/HEX 반영
3. 히스토리 탭 시 HEX -> HSL 역변환
4. Save Collection 시 로컬 저장

## parity gap 체크리스트

- [x] Swift: HEX -> HSL 역변환 구현
- [ ] Web: HEX -> HSL 역변환 미구현
- [x] Swift: 저장(UserDefaults) 구현
- [ ] Web: 저장(localStorage) 미구현

## 저장소 메모

- 루트 프로젝트는 학습용 멀티 스택 워크스페이스입니다.
- `SwiftCanvas/`는 별도 `.git`을 가진 독립 저장소입니다.

## 다음 확장 아이디어 체크리스트

- [ ] Web에서도 히스토리 선택 시 HEX -> HSL 역변환 구현
- [ ] Web 저장 기능(localStorage) 추가로 Swift와 기능 parity 맞추기
- [ ] 공통 색상 테스트 벡터(JSON) 도입 후 두 플랫폼 동일 검증
