<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-02-16 | Updated: 2025-02-16 -->

# src

## Purpose

애플리케이션 소스 코드 루트. App Router 앱 디렉터리, 공통 컴포넌트, UI 프리미티브, 유틸리티를 담습니다.

## Key Files

(이 디렉터리에는 파일 없음 – 하위 디렉터리만 존재)

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router 페이지·레이아웃·글로벌 스타일 (see `app/AGENTS.md`) |
| `components/` | 공통 및 UI 컴포넌트 (see `components/AGENTS.md`) |
| `lib/` | 유틸리티 함수 (see `lib/AGENTS.md`) |

## For AI Agents

### Working In This Directory

- 새 기능은 해당 하위 디렉터리에 맞게 추가 (페이지→app, 컴포넌트→components, 유틸→lib)
- import 시 `@/components`, `@/lib` 등 tsconfig 별칭 사용

### Testing Requirements

- 변경 후 `bun run build` 및 `bun run lint` 통과 확인

### Common Patterns

- 컴포넌트: `@/components` 또는 `@/components/ui`
- 유틸: `@/lib/utils` (cn 등)

## Dependencies

### Internal

- 루트 `package.json`, `tsconfig.json`

### External

- Next.js, React, TypeScript

<!-- MANUAL: -->
