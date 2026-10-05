import React from 'react';
import { UserStatsBanner } from '../components/challenges/UserStatsBanner';
import { BadgesList } from '../components/challenges/BadgesList';
import { ChallengesList } from '../components/challenges/ChallengesList';
import { LeaderboardTable } from '../components/challenges/LeaderboardTable';
import { RewardsList } from '../components/challenges/RewardsList';
import { useLanguage } from '../context/LanguageContext';

export const ChallengesPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* User Stats Banner */}
      <UserStatsBanner />

      {/* Badges & Achievements */}
      <BadgesList />

      {/* Active Weekly Challenges & Community Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ChallengesList />
        <LeaderboardTable />
      </div>

      {/* Mock Partner Rewards */}
      <RewardsList />
    </div>
  );
};
