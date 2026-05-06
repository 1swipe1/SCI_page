# 과학기술인협동조합 기술사업화지원단 사이트 관리 매뉴얼

---

## 목차

1. [사이트 개요](#1-사이트-개요)
2. [관리자 로그인](#2-관리자-로그인)
3. [공지사항 관리](#3-공지사항-관리)
4. [조합 활동 관리](#4-조합-활동-관리)
5. [회원 관리](#5-회원-관리)
6. [문의 관리 및 답변](#6-문의-관리-및-답변)
7. [이메일 설정 변경](#7-이메일-설정-변경)
8. [데이터베이스 관리](#8-데이터베이스-관리)
9. [사이트 배포 및 업데이트](#9-사이트-배포-및-업데이트)
10. [자주 묻는 질문 (FAQ)](#10-자주-묻는-질문-faq)

---

## 1. 사이트 개요

### 구성 페이지

| 페이지 | URL | 설명 |
|--------|-----|------|
| 메인 | `/` | 사이트 홈 화면 |
| 조합 소개 | `/about` | 인사말, 소개, 조직도 |
| 조합원 소개 | `/members` | 조합원 프로필 |
| 조합 활동 | `/gallery` | 사업 분야 소개, 조합 활동 |
| 공지사항 | `/notice` | 공지 목록 및 상세 |
| 상담 문의 | `/inquiry` | 문의 접수 폼 |
| 로그인 | `/login` | 회원 로그인 |
| 회원가입 | `/signup` | 회원가입 신청 |

### 관리자 전용 페이지

| 페이지 | URL | 설명 |
|--------|-----|------|
| 공지 관리 | `/admin` | 공지사항 작성/수정/삭제 |
| 조합 활동 관리 | `/admin/activities` | 활동 추가/수정/삭제/순서 변경 |
| 회원 관리 | `/admin/users` | 회원 승인/삭제 |
| 문의 관리 | `/admin/inquiries` | 문의 확인 및 답변 |

### 기술 인프라

- **프론트엔드**: React + Vite (GitHub Pages 호스팅)
- **백엔드/DB**: Supabase (데이터베이스, 인증, 스토리지, Edge Functions)
- **이메일**: 네이버 SMTP (lew1029@naver.com 발신)
- **소스코드**: https://github.com/1swipe1/SCI_page

---

## 2. 관리자 로그인

1. 사이트 접속 후 우측 상단 **LOGIN** 클릭
2. 관리자 이메일/비밀번호 입력 후 로그인
3. 로그인 성공 시 상단 메뉴에 **ADMIN / 문의사항 / 조합활동 / 회원관리** 버튼이 표시됨

> **관리자 계정 정보는 별도로 보관하세요. 분실 시 Supabase 대시보드에서 직접 재설정해야 합니다.**

---

## 3. 공지사항 관리

### 공지 작성
1. 상단 메뉴 **ADMIN** 클릭 → 공지 관리 페이지
2. 제목, 내용 입력 후 **등록** 클릭
3. 작성된 공지는 즉시 `/notice` 페이지에 표시됨

### 공지 수정
1. 공지 목록에서 수정할 공지 클릭
2. 내용 수정 후 **수정** 클릭

### 공지 삭제
1. 공지 목록에서 삭제할 공지 우측의 **삭제** 클릭
2. 확인 창에서 **확인** 클릭

---

## 4. 조합 활동 관리

### 활동 추가
1. 상단 메뉴 **조합활동** 클릭
2. **+ 새 활동 추가** 버튼 클릭
3. 아래 항목 입력:
   - **제목**: 줄바꿈 가능 (여러 줄로 표시됨)
   - **태그**: 쉼표(,)로 구분하여 입력 (예: `컨설팅, R&D`)
   - **요약**: 활동 설명 텍스트
   - **이미지**: 파일 선택하여 업로드
4. **저장** 클릭

### 활동 수정
1. 수정할 활동 우측 **수정** 버튼 클릭
2. 내용 변경 후 **저장** 클릭

### 활동 삭제
1. 삭제할 활동 우측 **삭제** 버튼 클릭

### 활동 순서 변경
- 각 활동 좌측의 **▲ / ▼** 버튼으로 순서 조정
- 변경된 순서가 사이트에 즉시 반영됨

---

## 5. 회원 관리

### 회원 승인
1. 상단 메뉴 **회원관리** 클릭
2. 대기 중인 회원(주황색 뱃지) 클릭
3. **승인** 버튼 클릭 → 해당 회원 로그인 가능

> 회원가입 시 이메일 인증 없이 계정이 생성되며, 관리자 승인 후 로그인이 가능합니다.

### 승인 취소
1. 승인된 회원 클릭
2. **승인 취소** 버튼 클릭 → 해당 회원 로그인 불가

### 회원 삭제
1. 삭제할 회원 클릭
2. **삭제** 버튼 클릭
3. 계정 및 관련 데이터가 완전 삭제됨

---

## 6. 문의 관리 및 답변

### 문의 확인
1. 상단 메뉴 **문의사항** 클릭
2. 좌측 목록에서 문의 클릭 → 우측에 상세 내용 표시
3. **미답변** 뱃지: 아직 답변하지 않은 문의
4. **답변완료** 뱃지: 답변이 등록된 문의

### 답변 등록 및 이메일 발송
1. 우측 **답변 작성** 영역에 내용 입력
2. **답변 미리보기** 클릭 → 이메일 미리보기 확인
3. **저장 및 발송** 클릭
   - 답변이 DB에 저장됨
   - 문의자 이메일로 답변 내용이 자동 발송됨

### 신규 문의 알림
- 누군가 문의를 접수하면 **kisadan01@naver.com**으로 알림 이메일이 자동 발송됨

### 첨부파일 확인
- 문의 상세 화면에서 첨부파일 링크 클릭 시 다운로드 가능

---

## 7. 이메일 설정 변경

이메일 발신/수신 주소 변경은 **Supabase Edge Functions 환경변수(Secrets)**를 수정해야 합니다.

### 필요 도구
- Supabase CLI (터미널에서 `supabase` 명령 사용)
- 또는 Supabase 대시보드

### 현재 이메일 설정

| 항목 | 값 | 설명 |
|------|-----|------|
| NAVER_EMAIL | lew1029@naver.com | 답변 이메일 발신 계정 |
| NAVER_PASSWORD | (앱 비밀번호) | 발신 계정 SMTP 비밀번호 |
| 수신 알림 주소 | kisadan01@naver.com | 신규 문의 알림 수신 주소 (코드에 고정) |

---

### 7-1. 발신 이메일 계정 변경 (NAVER_EMAIL / NAVER_PASSWORD)

**터미널에서 변경:**
```bash
supabase secrets set NAVER_EMAIL=새이메일@naver.com --project-ref wslpjtklajuyppocdwdf
supabase secrets set 'NAVER_PASSWORD=새비밀번호' --project-ref wslpjtklajuyppocdwdf
```

> **주의**: 비밀번호에 특수문자(`*`, `!` 등)가 포함된 경우 반드시 작은따옴표(`'`)로 감싸주세요.

**변경 후 Edge Functions 재배포:**
```bash
supabase functions deploy reply-inquiry --project-ref wslpjtklajuyppocdwdf
supabase functions deploy notify-inquiry --project-ref wslpjtklajuyppocdwdf
```

**네이버 SMTP 사용 전 확인사항:**
1. 네이버 메일 로그인 → 환경설정 → **POP3/IMAP 설정** → SMTP 사용: **사용함**
2. 2단계 인증이 켜져 있으면 일반 비밀번호 대신 **앱 비밀번호** 사용
   - 네이버 → 내 정보 → 보안설정 → 2단계 인증 → 앱 비밀번호 관리

---

### 7-2. 신규 문의 알림 수신 주소 변경

알림 수신 주소는 코드에 직접 고정되어 있습니다. 변경하려면 파일을 수정해야 합니다.

**파일 위치**: `supabase/functions/notify-inquiry/index.ts`

```typescript
// 이 줄의 이메일 주소를 변경하세요
const ADMIN_EMAIL = "kisadan01@naver.com";
```

변경 후 재배포:
```bash
supabase functions deploy notify-inquiry --project-ref wslpjtklajuyppocdwdf
```

---

## 8. 데이터베이스 관리

### Supabase 대시보드 접근
1. https://supabase.com/dashboard 접속
2. 로그인 → 프로젝트 **wslpjtklajuyppocdwdf** 선택

### 주요 테이블

| 테이블 | 설명 |
|--------|------|
| `profiles` | 회원 정보 (이름, 소속, 승인 여부) |
| `inquiries` | 문의 내용 및 답변 |
| `notices` | 공지사항 |
| `activities` | 조합 활동 |

### 데이터 직접 조회/수정
1. 대시보드 → 좌측 메뉴 **Table Editor**
2. 테이블 선택 후 데이터 확인
3. 행 클릭 시 수정 가능, 우측 **Delete** 버튼으로 삭제

### SQL로 직접 조회
1. 대시보드 → 좌측 메뉴 **SQL Editor**
2. 쿼리 입력 후 **Run** 클릭

예시:
```sql
-- 전체 회원 조회
SELECT * FROM profiles;

-- 미승인 회원 조회
SELECT * FROM profiles WHERE approved = false;

-- 전체 문의 조회
SELECT * FROM inquiries ORDER BY created_at DESC;
```

### 데이터 백업
1. 대시보드 → **Settings → Database**
2. **Backups** 탭에서 일별 자동 백업 확인 및 다운로드 가능 (유료 플랜 기준)

또는 SQL Editor에서 수동 내보내기:
```sql
-- CSV로 데이터 조회 후 대시보드에서 다운로드
SELECT * FROM inquiries;
```

### 스토리지 (첨부파일/이미지)
1. 대시보드 → 좌측 메뉴 **Storage**
2. `inquiry-attachments`: 문의 첨부파일
3. `activity-images`: 조합 활동 이미지
4. 파일 클릭 → **Download** 또는 **Delete**

---

### 8-1. 데이터베이스 이전 (프로젝트 교체)

Supabase 프로젝트를 새로 만들거나 이전해야 할 경우 아래 절차를 따릅니다.

#### 1단계: 새 Supabase 프로젝트 생성
1. https://supabase.com/dashboard → **New Project**
2. 프로젝트 이름, 비밀번호, 리전(Northeast Asia) 설정

#### 2단계: 기존 데이터 내보내기
기존 프로젝트 SQL Editor에서 실행:
```sql
-- 각 테이블 데이터를 CSV로 저장 (대시보드 우측 Download 버튼 사용)
SELECT * FROM profiles;
SELECT * FROM notices;
SELECT * FROM activities;
SELECT * FROM inquiries;
```

#### 3단계: 새 프로젝트에 스키마 적용
`supabase/seed.sql` 파일의 내용을 새 프로젝트 SQL Editor에서 실행

#### 4단계: 환경변수 업데이트
프로젝트 루트의 `.env` 파일 수정:
```
VITE_SUPABASE_URL=https://새프로젝트ID.supabase.co
VITE_SUPABASE_ANON_KEY=새_anon_key
```

새 프로젝트의 URL과 키는 대시보드 → **Settings → API**에서 확인

#### 5단계: Edge Functions 재배포
```bash
supabase functions deploy reply-inquiry --project-ref 새프로젝트ID
supabase functions deploy notify-inquiry --project-ref 새프로젝트ID
supabase functions deploy signup-user --project-ref 새프로젝트ID
supabase functions deploy delete-user --project-ref 새프로젝트ID
```

#### 6단계: Secrets 재설정
```bash
supabase secrets set NAVER_EMAIL=이메일 --project-ref 새프로젝트ID
supabase secrets set 'NAVER_PASSWORD=비밀번호' --project-ref 새프로젝트ID
```

#### 7단계: 사이트 재빌드 및 배포
```bash
npm run deploy
```

---

## 9. 사이트 배포 및 업데이트

### 개발 환경 실행
```bash
npm install       # 최초 1회
npm run dev       # 로컬 개발 서버 실행 (http://localhost:5173)
```

### 사이트 빌드 및 배포
```bash
npm run deploy
```
- 자동으로 빌드 후 GitHub Pages에 배포됨
- 배포 완료까지 약 1~3분 소요

### 소스코드 수정 후 반영 절차
1. 코드 수정
2. 터미널에서:
```bash
git add .
git commit -m "수정 내용 요약"
git push origin main
npm run deploy
```

### Edge Function 수정 후 반영
```bash
supabase functions deploy 함수이름 --project-ref wslpjtklajuyppocdwdf
```

함수 목록:
- `reply-inquiry` — 문의 답변 이메일 발송
- `notify-inquiry` — 신규 문의 알림 이메일
- `signup-user` — 회원가입 처리
- `delete-user` — 회원 삭제

---

## 10. 자주 묻는 질문 (FAQ)

### Q. 관리자 비밀번호를 잊어버렸어요
Supabase 대시보드 → **Authentication → Users** → 관리자 계정 클릭 → **Send password reset email** 또는 **Change password** 직접 변경

### Q. 회원이 로그인이 안 된다고 해요
1. **회원관리** 페이지에서 해당 회원의 승인 여부 확인
2. 미승인 상태이면 **승인** 버튼 클릭

### Q. 답변 이메일이 발송되지 않아요
1. lew1029@naver.com 계정의 **SMTP 설정이 활성화**되어 있는지 확인
   - 네이버 메일 → 환경설정 → POP3/IMAP 설정 → SMTP 사용: 사용함
2. 네이버 계정의 비밀번호가 변경된 경우 Secret도 함께 업데이트 필요
3. Supabase 대시보드 → **Edge Functions → reply-inquiry → Logs**에서 오류 확인

### Q. 신규 문의 알림이 안 와요
1. Supabase 대시보드 → **Edge Functions → notify-inquiry → Logs**에서 오류 확인
2. SMTP 설정 동일하게 확인

### Q. 조합 활동 이미지가 표시되지 않아요
1. Supabase 대시보드 → **Storage → activity-images** 버킷에 파일이 있는지 확인
2. 버킷의 **Public 설정**이 활성화되어 있는지 확인

### Q. 사이트 주소(도메인)를 변경하고 싶어요
현재는 GitHub Pages 기본 주소를 사용 중입니다. 커스텀 도메인 연결은:
1. GitHub 저장소 → **Settings → Pages → Custom domain** 입력
2. 도메인 DNS 설정에서 GitHub Pages IP로 A 레코드 추가

### Q. Supabase 무료 플랜 제한은 어떻게 되나요?
- 데이터베이스: 500MB
- 스토리지: 1GB
- Edge Function 호출: 월 500,000회
- 인증 사용자: 50,000명
- 무료 플랜은 **7일 이상 미사용 시 프로젝트가 일시 중지**될 수 있음 → 유료 플랜 전환 권장

---

*최종 업데이트: 2026-05-06*
