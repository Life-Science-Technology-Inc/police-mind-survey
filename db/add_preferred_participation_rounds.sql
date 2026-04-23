ALTER TABLE public."survey-person"
ADD COLUMN IF NOT EXISTS preferred_participation_rounds text;

COMMENT ON COLUMN public."survey-person".preferred_participation_rounds
IS '희망 참여일 선택값. 예: 1차, 2차, 상관없음';
