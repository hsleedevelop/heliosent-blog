<!-- Generated: 2025-02-16 | Updated: 2025-02-16 -->

# heliosent-blog

## Purpose

Next.js 기반 블로그/웹사이트 프로젝트. App Router, React 19, TypeScript, Tailwind CSS 4, shadcn/ui(new-york)를 사용하며, 테마 전환과 공통 UI 컴포넌트를 제공합니다.

## Key Files

| File | Description |
|------|-------------|
| `package.json` | 의존성 및 스크립트 (next, react, shadcn 관련) |
| `tsconfig.json` | TypeScript 설정 및 경로 별칭 |
| `next.config.ts` | Next.js 설정 |
| `components.json` | shadcn/ui 설정 (new-york, RSC, alias) |
| `postcss.config.mjs` | PostCSS/Tailwind 설정 |
| `eslint.config.mjs` | ESLint 설정 |
| `.gitignore` | Git 제외 목록 |
| `README.md` | 프로젝트 설명 |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `public/` | 정적 자산 (see `public/AGENTS.md`) |
| `src/` | 소스 코드 (see `src/AGENTS.md`) |
| `.cursor/` | Cursor 규칙 (rules 등) |

## For AI Agents

### Working In This Directory

- 의존성 변경 시 `bun install` 실행
- TypeScript strict, ESLint 준수
- 새 UI는 shadcn 컴포넌트 추가 후 조합 (`npx shadcn@latest add ...`)

### Testing Requirements

- `bun run lint`로 린트 확인
- `bun run build`로 빌드 성공 확인

### Common Patterns

- 경로 별칭: `@/components`, `@/lib`, `@/components/ui`
- 스타일: Tailwind + `cn()` (src/lib/utils.ts)
- AI 응답은 **한국어** 사용

## Dependencies

### External

- Next.js 16 – App Router, RSC
- React 19 – UI
- TypeScript 5 – 타입
- Tailwind CSS 4 – 스타일
- shadcn/ui, Radix UI, next-themes, lucide-react

<!-- MANUAL: 이 줄 아래 수동 메모는 재생성 시 유지됩니다 -->
