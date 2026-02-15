<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-02-16 | Updated: 2025-02-16 -->

# app

## Purpose

Next.js App Router 루트. 레이아웃, 글로벌 스타일, 메타데이터, 루트 페이지를 정의합니다. ThemeProvider로 다크/라이트 테마를 제공합니다.

## Key Files

| File | Description |
|------|-------------|
| `layout.tsx` | 루트 레이아웃, Geist 폰트, ThemeProvider, 메타데이터 |
| `page.tsx` | 루트 경로(/) 페이지 |
| `globals.css` | 전역 Tailwind 및 CSS 변수 (테마 색상 등) |
| `favicon.ico` | 사이트 파비콘 |

## Subdirectories

(추가 라우트 시 `[slug]`, `blog` 등 하위 디렉터리 생성)

## For AI Agents

### Working In This Directory

- 새 라우트는 하위 폴더 + `page.tsx` (App Router 규칙)
- 레이아웃/폰트 변경은 `layout.tsx`만 수정
- 글로벌 스타일/변수는 `globals.css`에 추가, 기존 변수와 일치시키기

### Testing Requirements

- `bun run dev` 후 레이아웃·테마 전환·폰트 적용 확인
- 빌드 시 메타데이터·레이아웃 오류 없음 확인

### Common Patterns

- RSC 기본, 클라이언트는 `"use client"` 필요 시만
- `@/components/theme-provider`로 앱 전체 테마 래핑

## Dependencies

### Internal

- `@/components/theme-provider` – 테마 컨텍스트
- `@/components/theme-toggle` – (페이지에서 사용 시)

### External

- next/font (Geist, Geist_Mono), next/metadata

<!-- MANUAL: -->
