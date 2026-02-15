<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-02-16 | Updated: 2025-02-16 -->

# lib

## Purpose

공용 유틸리티. Tailwind 클래스 병합용 `cn()` 등 앱 전역에서 쓰는 헬퍼를 제공합니다.

## Key Files

| File | Description |
|------|-------------|
| `utils.ts` | `cn(...inputs)` – clsx + tailwind-merge로 조건부·중복 클래스 병합 |

## Subdirectories

(없음 – 추가 유틸은 같은 디렉터리 또는 `lib/foo.ts` 형태로 확장)

## For AI Agents

### Working In This Directory

- 순수 함수·유틸만 두기 (컴포넌트 X)
- `cn` 시그니처 변경 시 모든 사용처(`components/`, `app/`) 영향 있음 – 신중히 변경

### Testing Requirements

- `cn()`에 여러 클래스·조건부 인자 넣어서 병합 결과 확인 (중복 제거, 조건부 적용)

### Common Patterns

- import: `import { cn } from "@/lib/utils"`
- 컴포넌트에서 `className={cn("base", condition && "extra", className)}` 패턴

## Dependencies

### Internal

- 없음 (루트 레벨 유틸)

### External

- clsx – 조건부 클래스
- tailwind-merge – Tailwind 클래스 충돌 시 후자 우선 병합

<!-- MANUAL: -->
