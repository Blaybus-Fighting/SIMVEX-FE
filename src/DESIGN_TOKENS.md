# 사용법

## 1. colors

### Gray (텍스트 / 구분선)

- `text-gray-100` : 강조 텍스트
- `text-gray-200` : 기본 텍스트
- `text-gray-300` : 보조 텍스트
- `text-gray-400` : 비활성 / 구분선

```tsx
<p className="text-gray-200">기본 텍스트</p>
```

### Primary

- bg-primary-100, bg-primary-200
- text-primary-100, text-primary-200
- border-primary-100, border-primary-200

### Background

- bg-background-100, bg-background-200
- bg-background-300, bg-background-400

### Accent

- bg-accent-100, text-accent-100

## 2. fontSize

### 정의된 텍스트 타입

- text-title-1 : 대제목(56px)
- text-title-2 : (미사용, 32px)
- text-title-3 : 소제목(24px)
- text-subtitle : 페이지 제목(20px)
- text-text-1 : 본문 제목(18px)
- text-text-2 : 주요 버튼명 / 컴포넌트 제목(16px)
- text-text-3 : 기본 버튼명 / 탭 버튼(14px)
- text-text-4 : 본문 내용(14px)
- text-caption : 날짜 / 보조 설명(13px)

### 예시

```tsx
<h1 className="text-title-1">대제목</h1>
<h2 className="text-title-3">소제목</h2>
<p className="text-text-4">본문 내용</p>
<span className="text-caption">보조 텍스트</span>
```

## 3. Font Family (Pretendard Weight)

### 폰트 굵기 토큰

- 폰트 굵기는 font-light ~ font-bold로 사용

### 예시

```tsx
<h2 className="text-title-3 font-ps">소제목</h2>
<p className="text-text-4 font-pr">본문</p>
<button className="text-text-2 font-pb">버튼</button>
```

## 4. 기본 사용 원칙

- 색상은 반드시 정의된 토큰만 사용
- font-size는 임의 값 사용 금지
- font-weight는 font-pl ~ font-pb만 사용
- 새로운 디자인 토큰 추가 시 tailwind.config.js에만 정의
