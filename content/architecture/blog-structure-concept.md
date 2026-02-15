---
title: "HelioSent Blog Architecture Concept"
slug: blog-structure-concept
description: "Content-first, framework-agnostic blog architecture."
date: "2026-02-16"
tags: ["architecture", "blog", "system-design"]
---

# HelioSent Blog Architecture Concept

이 블로그는 단순한 테마 기반 Website가 아닙니다.  
장기적으로 유지 가능한 **content system**으로 설계되었습니다.

---

## 1. Content First

Framework는 계속 변화합니다.  
Next.js, TanStack Start, Astro 등은 언제든 교체될 수 있습니다.

그러나 **content**는 교체 대상이 아닙니다.

모든 글은 최상위 `content/` 디렉토리에 저장됩니다.  
이 구조는 rendering layer와 완전히 분리되어 있습니다.

핵심 원칙은 다음과 같습니다:

> Framework는 바뀌어도  
> content는 유지되어야 한다.

---

## 2. Layered Architecture

이 시스템은 세 개의 layer로 구성됩니다.

### 1) Content Layer

Markdown / MDX 파일은 다음 구조로 관리됩니다:

- essays  
- blog  
- labs  
- architecture  
- apps  

이 layer는 영구 자산입니다.

---

### 2) Content Pipeline Layer

Velite는 schema를 검증하고, type을 생성하며,  
build time에 content를 transform합니다.

이를 통해 확보하는 것은:

- Type safety  
- Schema consistency  
- Build-time optimization  

Runtime parsing을 최소화하여 성능을 안정적으로 유지합니다.

---

### 3) Rendering Layer

Next.js App Router는 typed content를 rendering합니다.

UI는 의도적으로 minimal하게 설계됩니다.  
Client Component 사용은 최소화합니다.

이 블로그의 목적은 animation이나 visual novelty가 아니라,  
구조적 명확성과 가독성입니다.

---

## 3. Section Philosophy

각 section은 단순 분류가 아니라 사고 방식의 구분입니다.

- **essays** → 장기적 technical philosophy  
- **blog** → update 및 insight  
- **labs** → experiment 및 AI workflow  
- **architecture** → system design 기록  
- **apps** → product showcase  

이 구조는 content type이 아니라 thinking mode를 나누는 방식입니다.

---

## 4. Long-Term Strategy

UI는 변경될 수 있습니다.  
Framework는 교체될 수 있습니다.

그러나 `content/` 구조는 유지됩니다.

이 blog는 여러 번의 migration을 견딜 수 있도록 설계되었습니다.

Rendering layer는 disposable,  
Content layer는 permanent.

---

이 문서는 HelioSent Blog System의 version 1 선언입니다.