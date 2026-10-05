import React from 'react';
import { LEADERBOARD } from '../../data/abuDhabiData';
import { useLanguage } from '../../context/LanguageContext';
import { Trophy, ShieldCheck, User } from 'lucide-react';

export const LeaderboardTable: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#C5A059]" />
            <span>{t.challenges.leaderboardTitle}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? 'احترام كامل للخصوصية: أسماء مجهولة ومشفرة لجميع المشاركين'
              : 'Privacy Protected: Anonymous pseudonyms displayed across the Emirate'}
          </p>
        </div>

        <span className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero PII Exposed</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
              <th className="py-2.5 px-3">Rank</th>
              <th className="py-2.5 px-3">Participant</th>
              <th className="py-2.5 px-3 text-right">Trips</th>
              <th className="py-2.5 px-3 text-right">CO₂ Saved</th>
              <th className="py-2.5 px-3 text-right">Green Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {LEADERBOARD.map(row => (
              <tr
                key={row.rank}
                className={`transition-colors ${
                  row.isCurrent
                    ? 'bg-emerald-50/80 font-bold text-emerald-950'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <td className="py-3 px-3">
                  <span
                    className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs ${
                      row.rank === 1
                        ? 'bg-amber-400 text-amber-950'
                        : row.rank === 2
                        ? 'bg-slate-300 text-slate-800'
                        : row.rank === 3
                        ? 'bg-amber-700/60 text-white'
                        : 'text-slate-500'
                    }`}
                  >
                    {row.rank}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{row.user}</span>
                    {row.isCurrent && (
                      <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono">
                        YOU
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-3 text-right font-mono">{row.trips}</td>
                <td className="py-3 px-3 text-right font-mono text-emerald-700 font-bold">{row.co2}</td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#C5A059]">
                  {row.points.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
