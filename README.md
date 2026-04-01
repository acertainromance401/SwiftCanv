# The Invisible Gallery

![Purpose](https://img.shields.io/badge/Purpose-Learning%20%26%20Testing-1f6feb)
![SwiftUI](https://img.shields.io/badge/SwiftUI-iOS%20%26%20macOS-orange)
![React](https://img.shields.io/badge/Web-React%20%2B%20Vite-0ea5e9)
![License](https://img.shields.io/badge/License-MIT-green)

이 저장소는 배포를 목표로 한 제품 개발이 아니라, Swift 앱 개발 방법을 개인적으로 학습하고 기능 테스트를 반복하기 위한 프로젝트입니다.

## GitHub About 추천 문구

- Description: Personal Swift app learning and feature testing project (with a React parity reference).
- Topics: swift, swiftui, ios, macos, xcodegen, react, vite, typescript, color-palette, learning-project

## 빠른 이동

- [프로젝트 목표](#프로젝트-목표)
- [빠른 시작](#빠른-시작)
- [핵심 기능](#핵심-기능)
- [기능 parity 현황](#기능-parity-현황)
- [문서](#문서)
- [학습 로그 템플릿](#학습-로그-템플릿)

동일한 아이디어(컬러 팔레트 스튜디오)를 두 가지 스택으로 실험합니다.

- Web(React + Vite + TypeScript)
- Native(SwiftUI + XcodeGen)

## 프로젝트 목표

- HSL/RGB/HEX 변환 로직 이해
- UI 상호작용(슬라이더, 히스토리, 저장 흐름) 구현 연습
- 같은 기능을 Web/SwiftUI에서 비교 학습

## 빠른 시작

### 1) Web 앱 실행

사전 준비: Node.js

```bash
npm install
npm run dev
```

기본 주소: http://localhost:3000

### 2) SwiftUI 앱 실행

사전 준비: Xcode, XcodeGen

```bash
cd swift
make generate
make open
```

CLI 빌드 검증:

```bash
make build
```

## 폴더 구조

- `src/`: React 앱 코드
- `swift/`: SwiftUI 포트 및 XcodeGen 설정
- `metadata.json`: 프로젝트 메타 정보

## 핵심 기능

- HSL 슬라이더 기반 실시간 색상 조정
- RGB 값/HEX 값 동기화 표시
- 팔레트 미리보기(밝은/어두운 변형 포함)
- 색상 히스토리 선택
- 컬렉션 저장(플랫폼별 구현)

## 기능 parity 현황

- [x] HSL 조정 -> RGB/HEX 동기화
- [x] Active Palette 미리보기
- [x] 히스토리 색상 표시 및 선택
- [x] Export UI 제공
- [ ] Web에서 히스토리 선택 시 HEX -> HSL 완전 복원
- [ ] Web 컬렉션 저장(localStorage) 구현
- [x] Swift 컬렉션 저장(UserDefaults) 구현

## 문서

- [아키텍처 개요](docs/ARCHITECTURE.md)
- [학습 가이드](docs/LEARNING_GUIDE.md)
- [기능 테스트 체크리스트](docs/FEATURE_TEST_CHECKLIST.md)
- [주간 학습 로그 템플릿](docs/SWIFT_WEEKLY_LOG_TEMPLATE.md)
- [Swift 폴더 상세 문서](swift/README.md)

## 학습 로그 템플릿

Swift 학습 기록은 아래 템플릿 파일을 복제해서 주차별로 누적하면 됩니다.

- `docs/SWIFT_WEEKLY_LOG_TEMPLATE.md`

## 운영 원칙

- 배포 최적화보다 기능 실험과 코드 학습을 우선
- 리팩터링/비교 실험을 위한 구조 변경 허용
- 변경 후 체크리스트 기반으로 기능 회귀 확인

## 오늘 작업 체크리스트

- [x] 루트 문서 구조 정리
- [x] 아키텍처/학습/테스트 문서 분리
- [x] Swift 문서와 루트 문서 연결
- [x] SwiftCanvas 실험 저장소 목적 명시
