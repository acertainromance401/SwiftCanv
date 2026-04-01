# The Invisible Gallery - SwiftUI Port

이 폴더는 기존 React UI를 SwiftUI로 옮긴 코드이며, `XcodeGen` 기반으로 `.xcodeproj`를 자동 생성할 수 있도록 정리되어 있습니다.

## 폴더 구조

- `TheInvisibleGallery/`: SwiftUI 소스
- `project.yml`: XcodeGen 프로젝트 스펙
- `scripts/generate_xcodeproj.sh`: `.xcodeproj` 자동 생성 스크립트
- `Makefile`: generate/open/build/clean 명령

생성되는 타깃:

- `TheInvisibleGallery` (iOS)
- `TheInvisibleGalleryMac` (macOS)

## 포함 소스

- `TheInvisibleGallery/TheInvisibleGalleryApp.swift`: 앱 시작점
- `TheInvisibleGallery/ContentView.swift`: 메인 화면과 상호작용
- `TheInvisibleGallery/ColorModel.swift`: HSL/RGB/HEX 변환 유틸

## `.xcodeproj` 자동 생성

1. `swift` 폴더로 이동
2. 아래 명령 실행

```bash
make generate
```

생성 결과:

- `TheInvisibleGallery.xcodeproj`

`xcodegen`이 설치되어 있지 않으면 `scripts/generate_xcodeproj.sh`가 Homebrew로 자동 설치를 시도합니다.

## Xcode 열기

```bash
make open
```

## CLI 빌드 검증

```bash
make build
```

위 명령은 코드 사인 없이(`CODE_SIGNING_ALLOWED=NO`) macOS generic destination으로 빌드합니다.

iOS 빌드를 확인하려면:

```bash
make build-ios
```

`make build-ios`는 Xcode iOS 플랫폼 컴포넌트 설치 상태에 따라 실패할 수 있습니다.

## 구현 상태

- HSL 슬라이더 동작
- RGB 채널 실시간 반영
- HEX 실시간 갱신
- History 색상 클릭 시 HSL 값 복원
- Export 버튼(ShareLink)
- Save Collection(UserDefaults)

## 이 폴더의 운영 목적

이 SwiftUI 포트는 배포용 완성도보다 기능 학습과 Web 구현 비교를 우선합니다.

- 색상 계산 로직 이해
- SwiftUI 상태 관리 패턴 연습
- Web 버전과 기능 parity 확인

## 함께 보면 좋은 문서

- `../README.md`: 루트 프로젝트 개요
- `../docs/ARCHITECTURE.md`: Web/Swift 구조 비교
- `../docs/FEATURE_TEST_CHECKLIST.md`: 기능 회귀 점검 기준
