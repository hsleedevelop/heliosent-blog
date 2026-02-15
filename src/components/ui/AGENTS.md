<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-02-16 | Updated: 2025-02-16 -->

# ui

## Purpose

shadcn/ui(new-york) 스타일의 재사용 가능한 UI 프리미티브. Radix UI 기반으로 접근성과 스타일이 적용되어 있습니다.

## Key Files

| File | Description |
|------|-------------|
| `badge.tsx` | 뱃지 컴포넌트 (variant 지원) |
| `button.tsx` | 버튼 컴포넌트 (size, variant) |
| `card.tsx` | 카드 컨테이너 (Card, CardHeader, CardContent, CardFooter) |
| `separator.tsx` | 구분선 컴포넌트 |

## Subdirectories

(없음 – shadcn 추가 시 새 컴포넌트 파일이 이 디렉터리에 추가됨)

## For AI Agents

### Working In This Directory

- shadcn 컴포넌트는 `npx shadcn@latest add <name>`으로 추가. 수동 편집은 최소화하고, variant/className으로 커스터마이즈
- 스타일은 `cn()` 사용, `globals.css` CSS 변수와 일치
- 컴포넌트 내부 구조(Radix 슬롯 등) 변경 시 사용처 영향 확인

### Testing Requirements

- 스토리/페이지에서 각 variant·size 렌더 확인
- 다크/라이트 테마 전환 시 색상 일관성 확인

### Common Patterns

- `import { Button } from "@/components/ui/button"` 형태로 사용
- props에 `className` 전달해 외부에서 스타일 확장
- class-variance-authority(cva)로 variant 정의

## Dependencies

### Internal

- `@/lib/utils` – cn()

### External

- Radix UI (per component), class-variance-authority, clsx, tailwind-merge, lucide-react

<!-- MANUAL: -->
