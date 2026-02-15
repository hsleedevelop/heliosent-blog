<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-02-16 | Updated: 2025-02-16 -->

# components

## Purpose

공통 React 컴포넌트. 테마 제공/토글과 shadcn/ui 기반 UI 컴포넌트를 포함합니다.

## Key Files

| File | Description |
|------|-------------|
| `theme-provider.tsx` | next-themes 기반 ThemeProvider (class 기반 다크/라이트) |
| `theme-toggle.tsx` | 테마 전환 버튼/UI 컴포넌트 |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `ui/` | shadcn/ui 컴포넌트 (see `ui/AGENTS.md`) |

## For AI Agents

### Working In This Directory

- 앱 전역 로직(테마 등)은 이 레벨에, 순수 UI 조각은 `ui/`에
- 새 shadcn 컴포넌트는 `npx shadcn@latest add <name>`로 추가하면 `ui/`에 생성됨
- 스타일은 `cn()`과 Tailwind 사용, `@/lib/utils`의 cn import

### Testing Requirements

- 테마 전환 시 스타일 반영 확인
- 새 UI 컴포넌트는 페이지에서 import 후 렌더 확인

### Common Patterns

- ThemeProvider는 `layout.tsx`에서 한 번만 래핑
- UI 컴포넌트는 `ui/`에서 re-export 하지 않아도 됨, 필요 시 `@/components/ui/...`로 직접 import

## Dependencies

### Internal

- `@/lib/utils` – cn()
- `@/components/ui/*` – 하위 UI 프리미티브

### External

- next-themes, class-variance-authority, clsx, tailwind-merge, Radix UI, lucide-react

<!-- MANUAL: -->
