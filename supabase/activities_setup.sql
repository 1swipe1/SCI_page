-- activities 테이블
create table if not exists activities (
  id            bigint generated always as identity primary key,
  title         text not null,
  tags          text[],
  summary       text,
  image_url     text,
  display_order integer default 0,
  created_at    timestamptz default now()
);

alter table activities enable row level security;

do $$ begin
  create policy "activities_select" on activities for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "activities_insert" on activities for insert with check (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "activities_update" on activities for update using (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "activities_delete" on activities for delete using (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

-- activity-images 버킷
insert into storage.buckets (id, name, public)
values ('activity-images', 'activity-images', true)
on conflict (id) do nothing;

do $$ begin
  create policy "activity_images_read" on storage.objects for select using (bucket_id = 'activity-images');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "activity_images_upload" on storage.objects for insert with check (bucket_id = 'activity-images' and auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "activity_images_delete" on storage.objects for delete using (bucket_id = 'activity-images' and auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;

-- 초기 데이터 (없을 때만 삽입)
insert into activities (title, tags, summary, display_order)
select * from (values
  (E'캠퍼스타운 입주기업\n진단 및 BM 분석',         array['컨설팅','BM분석','스타트업'], '캠퍼스타운 입주 스타트업 60개 기업을 대상으로 경영 현황 진단과 비즈니스 모델 분석을 수행하였습니다. 기업별 강점/약점을 도출하고 맞춤형 성장 전략을 제시하였습니다.', 0),
  ('소상공인 성장지원 온라인 교육',                  array['교육','소상공인','온라인'],   '소상공인을 대상으로 한 성장지원 온라인 교육 프로그램을 기획하고 운영하였습니다. 현장 중심의 실무 교육으로 소상공인의 경영역량 강화를 지원하였습니다.', 1),
  (E'OO대학교 창업보육센터\nStartup-Booster Academy 운영', array['교육','창업보육','대학'], 'OO대학교 창업보육센터 Biz-Up 프로그램의 운영사로서 창업기업 대상 전문 멘토링, 교육, 사업화 지원을 수행하였습니다.', 2),
  (E'중소벤처기업 대상\n공공연수의 적정 비용 기준 연구', array['연구용역','정책연구','원가분석'], '중소벤처기업 재직자 대상 공공연수 사업의 적정 비용 기준을 수립하기 위한 연구용역을 수행하였습니다. 연수사업 현황 분석, 유관기관 사례 비교, 원가모형 구축 및 단가 산정, 정책 활용 전략 도출까지 전 과정을 수행하였습니다.', 3),
  (E'OO대학교 창업중심대학\n창업기업 성과점검 및 컨설팅 용역', array['컨설팅','창업기업진단','대학'], 'OO대학교 창업중심대학 선정 창업기업 70개사를 대상으로 전문가 1:1 심층 진단 및 컨설팅을 총괄 운영하였습니다. 기업별 성과 달성도 점검, 비즈니스모델 변화 진단, 차년도 성장전략 수립을 지원하고 종합 결과보고서를 작성하였습니다.', 4)
) as v(title, tags, summary, display_order)
where not exists (select 1 from activities limit 1);
