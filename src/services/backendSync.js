const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL || 'https://lst-police.plaidai.io';

const normalizePhoneNumber = (value) => (value || '').replace(/\D/g, '');

export const syncScreeningProfile = async (payload) => {
  const response = await fetch(`${BACKEND_BASE_URL}/api/public/screening-profiles/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Backend sync failed: ${response.status} ${text}`);
  }

  return response.json();
};

export const buildSurveySyncPayload = ({ personalInfo, depressionScore, anxietyScore, stressScore }) => ({
  phone_number: normalizePhoneNumber(personalInfo.phoneNumber),
  name: personalInfo.name?.trim(),
  email: personalInfo.email?.trim(),
  preferred_participation_rounds: (personalInfo.preferredSessions || [])
    .map((session) => (
      {
        round1: '1차',
        round2: '2차',
        noPreference: '상관없음',
      }[session]
    ))
    .filter(Boolean)
    .join(', '),
  phq9: depressionScore,
  gad7: anxietyScore,
  pss: stressScore,
});

export const buildRegistrationSyncPayload = ({
  participantId,
  phoneNumber,
  userData,
}) => ({
  source_participant_id: participantId || undefined,
  phone_number: normalizePhoneNumber(phoneNumber),
  gender: userData.gender || undefined,
  birth_date: userData.birthDate || undefined,
  department: userData.department || undefined,
  work_type: userData.workType || undefined,
  watch_delivery_address: userData.watchDeliveryAddress || undefined,
});
