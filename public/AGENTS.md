<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-02-16 | Updated: 2025-02-16 -->

# public

## Purpose

Next.js가 서빙하는 정적 자산 디렉터리. 빌드 시 루트 `/`에 그대로 노출됩니다.

## Key Files

| File | Description |
|------|-------------|
| `file.svg` | 아이콘/이미지 자산 |
| `globe.svg` | 아이콘 자산 |
| `next.svg` | Next.js 로고 |
| `vercel.svg` | Vercel 로고 |
| `window.svg` | 아이콘 자산 |

## Subdirectories

(없음)

## For AI Agents

### Working In This Directory

- 정적 파일만 두기 (이미지, 폰트, favicon 등). 앱 favicon은 `src/app/favicon.ico` 사용 중.
- 대용량 자산은 필요 시 하위 디렉터리로 구성 가능

### Testing Requirements

- 배포/빌드 후 해당 경로에서 파일 접근 가능한지 확인

### Common Patterns

- 참조 시 경로는 `/file.svg` 형태 (public 기준)

## Dependencies

### Internal

- 루트 프로젝트 (Next.js 정적 서빙)

### External

- 없음 (순수 정적 파일)

<!-- MANUAL: -->
