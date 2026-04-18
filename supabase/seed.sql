-- ================================================================
-- SCI Site — Supabase Seed SQL
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- ================================================================

-- ----------------------------------------------------------------
-- 1. 테이블 생성
-- ----------------------------------------------------------------

create table if not exists notices (
  id              bigint generated always as identity primary key,
  title           text    not null,
  content         text,
  important       boolean default false,
  date            text,
  views           integer default 0,
  attachment_url  text,
  attachment_name text,
  created_at      timestamptz default now()
);

-- 기존 테이블에 컬럼이 없는 경우 추가
alter table notices add column if not exists attachment_url  text;
alter table notices add column if not exists attachment_name text;

create table if not exists inquiries (
  id           bigint generated always as identity primary key,
  name         text,
  organization text,
  phone        text,
  email        text,
  subject      text,
  message      text,
  reply        text,
  replied_at   timestamptz,
  created_at   timestamptz default now()
);

-- 기존 테이블에 컬럼이 없는 경우 추가
alter table inquiries add column if not exists organization     text;
alter table inquiries add column if not exists phone            text;
alter table inquiries add column if not exists reply            text;
alter table inquiries add column if not exists replied_at       timestamptz;
alter table inquiries add column if not exists attachment_url   text;
alter table inquiries add column if not exists attachment_name  text;

-- ----------------------------------------------------------------
-- 2. RLS (Row Level Security) 활성화
-- ----------------------------------------------------------------

alter table notices   enable row level security;
alter table inquiries enable row level security;

-- 누구나 읽기 허용
create policy "notices_select" on notices for select using (true);

-- 로그인한 유저만 쓰기 허용 (관리자 체크는 앱 레이어에서 처리)
create policy "notices_insert" on notices for insert with check (auth.role() = 'authenticated');
create policy "notices_update" on notices for update using (auth.role() = 'authenticated');
create policy "notices_delete" on notices for delete using (auth.role() = 'authenticated');

-- 문의는 누구나 등록 가능
create policy "inquiries_insert" on inquiries for insert with check (true);

-- 로그인한 유저(어드민)만 문의 조회/수정/삭제 허용
create policy "inquiries_select" on inquiries for select using (auth.role() = 'authenticated');
create policy "inquiries_update" on inquiries for update using (auth.role() = 'authenticated');
create policy "inquiries_delete" on inquiries for delete using (auth.role() = 'authenticated');

-- ----------------------------------------------------------------
-- Storage 버킷 (첨부파일)
-- ----------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('notice-attachments', 'notice-attachments', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('inquiry-attachments', 'inquiry-attachments', true)
on conflict (id) do nothing;

-- 누구나 파일 읽기 허용
create policy "notice_attach_read" on storage.objects
  for select using (bucket_id = 'notice-attachments');

-- 로그인한 유저만 업로드/삭제 허용
create policy "notice_attach_upload" on storage.objects
  for insert with check (bucket_id = 'notice-attachments' and auth.role() = 'authenticated');

create policy "notice_attach_delete" on storage.objects
  for delete using (bucket_id = 'notice-attachments' and auth.role() = 'authenticated');

-- 문의 첨부파일: 누구나 업로드/읽기, 어드민만 삭제
create policy "inquiry_attach_read" on storage.objects
  for select using (bucket_id = 'inquiry-attachments');

create policy "inquiry_attach_upload" on storage.objects
  for insert with check (bucket_id = 'inquiry-attachments');

create policy "inquiry_attach_delete" on storage.objects
  for delete using (bucket_id = 'inquiry-attachments' and auth.role() = 'authenticated');

-- ----------------------------------------------------------------
-- 3. 공지사항 더미 데이터
-- ----------------------------------------------------------------

insert into notices (title, content, important, date, views) values
(
  '2026년 상반기 조합원 정기총회 개최 안내',
  '안녕하세요. 과학기술인협동조합 기술사업화지원단(기사단)입니다.

2026년 상반기 조합원 정기총회를 아래와 같이 개최하오니, 조합원 여러분의 많은 참석 바랍니다.

■ 일시: 2026년 5월 15일(금) 오후 2시
■ 장소: 서울 강남구 테헤란로 OO빌딩 3층 대회의실
■ 안건:
  1. 2025년 사업실적 보고
  2. 2026년 사업계획 및 예산 심의
  3. 임원 선임 건
  4. 기타 안건

참석 여부는 5월 10일(일)까지 사무국(info@sci-coop.kr)으로 회신해 주시기 바랍니다.
감사합니다.',
  true,
  '2026.04.10',
  48
),
(
  '정부지원사업 신청 일정 변경 안내',
  '안녕하세요. 과학기술인협동조합입니다.

중소벤처기업부 공고에 따라 아래 정부지원사업의 신청 일정이 변경되었습니다.
해당 사업을 준비 중이신 조합원 여러분께서는 참고하시기 바랍니다.

■ 변경 사업명: 2026년 초기창업패키지 2차 모집
■ 기존 마감일: 2026년 4월 25일
■ 변경 마감일: 2026년 5월 9일

서류 준비에 충분한 시간을 활용하시기 바라며, 컨설팅 지원이 필요하신 분은 사무국으로 연락 주세요.
감사합니다.',
  true,
  '2026.04.07',
  92
),
(
  '4월 월례회의 안내',
  '안녕하세요. 기사단 사무국입니다.

4월 정기 월례회의를 아래와 같이 진행할 예정입니다.

■ 일시: 2026년 4월 18일(금) 오후 6시
■ 장소: 서울 마포구 공덕동 OO스페이스 회의실 B
■ 주요 논의사항:
  - 진행 중인 프로젝트 현황 공유
  - 신규 사업 수주 검토
  - 조합원 네트워킹

참석이 어려우신 분은 사무국에 미리 알려주시기 바랍니다. 온라인 참여도 가능합니다.
감사합니다.',
  false,
  '2026.04.05',
  37
),
(
  '창립기념일 휴무 안내',
  '안녕하세요. 과학기술인협동조합입니다.

2026년 창립기념일을 맞이하여 아래와 같이 휴무를 안내드리오니, 업무 및 서비스 이용에 참고하시기 바랍니다.

■ 휴무 일자: 2026년 3월 19일(목)
■ 휴무 대상: 전 부서 및 고객센터

휴무 기간 동안 접수된 문의사항은 3월 20일(금)부터 순차적으로 처리될 예정입니다.
조합원 여러분의 너른 양해 부탁드립니다.
감사합니다.',
  false,
  '2026.03.17',
  125
),
(
  '신규 조합원 가입 절차 안내 (개정)',
  '안녕하세요. 과학기술인협동조합입니다.

2026년 3월 1일부터 신규 조합원 가입 절차가 아래와 같이 개정되었습니다.

■ 변경 사항:
  - 가입 신청서 양식 업데이트 (자격증 및 학위 증빙 첨부 방식 변경)
  - 이사회 심의 주기: 월 1회 → 격주 1회

■ 제출 서류:
  1. 조합원 가입 신청서
  2. 학위증명서 또는 국가전문자격증 사본
  3. 경력기술서 (자유 양식, A4 2매 이내)

개정된 양식은 홈페이지 공지사항 하단 첨부파일에서 내려받으시기 바랍니다.
감사합니다.',
  false,
  '2026.03.01',
  214
),
(
  '2025년 연간 사업실적 보고서 공유',
  '안녕하세요. 과학기술인협동조합입니다.

2025년 한 해 동안 기사단이 수행한 주요 사업 실적을 조합원 여러분께 공유드립니다.

■ 주요 실적 요약:
  - 컨설팅 수행 기업 수: 68개사
  - 교육 프로그램 운영: 12개 과정, 수강인원 340명
  - 연구용역 수주: 4건
  - 신규 조합원 가입: 3명

상세 내용은 첨부 파일의 연간 사업실적 보고서를 참고해 주시기 바랍니다.
2026년에도 더욱 알찬 성과로 보답하겠습니다. 감사합니다.',
  false,
  '2026.01.20',
  189
);
