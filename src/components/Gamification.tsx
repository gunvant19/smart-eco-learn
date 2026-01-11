import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Flame, Medal, Gift, CheckCircle2, Clock } from 'lucide-react';

const Gamification = () => {
  const { t } = useLanguage();
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);

  const userStats = {
    points: 2450,
    level: 5,
    streak: 12,
    nextLevelPoints: 3000,
  };

  const badges = [
    { icon: Trophy, name: t('badgeRecycler'), earned: true, color: 'text-yellow-500' },
    { icon: Star, name: t('badgeStreak'), earned: true, color: 'text-orange-500' },
    { icon: Medal, name: t('badgeExpert'), earned: true, color: 'text-blue-500' },
    { icon: Target, name: t('badgePerfect'), earned: false, color: 'text-gray-400' },
  ];

  const challenges = [
    { 
      id: 1,
      title: t('challenge1Title'), 
      desc: t('challenge1Desc'),
      reward: 100,
      progress: 60,
      deadline: '3 days',
      participants: 234,
    },
    { 
      id: 2,
      title: t('challenge2Title'), 
      desc: t('challenge2Desc'),
      reward: 200,
      progress: 30,
      deadline: '5 days',
      participants: 456,
    },
    { 
      id: 3,
      title: t('challenge3Title'), 
      desc: t('challenge3Desc'),
      reward: 150,
      progress: 0,
      deadline: '7 days',
      participants: 178,
    },
  ];

  const rewards = [
    { points: 500, reward: t('reward1'), claimed: true },
    { points: 1000, reward: t('reward2'), claimed: true },
    { points: 2500, reward: t('reward3'), claimed: false },
    { points: 5000, reward: t('reward4'), claimed: false },
  ];

  const handleJoinChallenge = (id: number) => {
    if (!joinedChallenges.includes(id)) {
      setJoinedChallenges([...joinedChallenges, id]);
    }
  };

  return (
    <section id="gamification" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('gamificationTitle')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('gamificationDesc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Progress Card */}
          <Card className="bg-gradient-to-br from-eco-primary/20 to-eco-secondary/20 border-eco-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-eco-primary to-eco-secondary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">L{userStats.level}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{t('yourProgress')}</h3>
                  <p className="text-muted-foreground">{userStats.points} {t('points')}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{t('levelProgress')}</span>
                  <span className="text-foreground font-medium">{userStats.points}/{userStats.nextLevelPoints}</span>
                </div>
                <Progress value={(userStats.points / userStats.nextLevelPoints) * 100} className="h-3" />
              </div>

              <div className="flex items-center gap-2 p-3 bg-orange-500/10 rounded-lg">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-foreground font-medium">{userStats.streak} {t('dayStreak')}</span>
              </div>

              {/* Badges */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">{t('yourBadges')}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {badges.map((badge, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg flex flex-col items-center ${badge.earned ? 'bg-card' : 'bg-muted/50 opacity-50'}`}
                    >
                      <badge.icon className={`w-6 h-6 ${badge.color}`} />
                      <span className="text-xs text-center mt-1 text-muted-foreground">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-eco-primary" />
                {t('activeChallenges')}
              </h3>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{challenge.title}</h4>
                      <span className="text-xs text-eco-primary font-medium">+{challenge.reward} pts</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{challenge.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {challenge.deadline}
                      </span>
                      <span>{challenge.participants} {t('participants')}</span>
                    </div>
                    {joinedChallenges.includes(challenge.id) ? (
                      <>
                        <Progress value={challenge.progress} className="h-2 mb-2" />
                        <span className="text-xs text-muted-foreground">{challenge.progress}% {t('complete')}</span>
                      </>
                    ) : (
                      <Button 
                        size="sm" 
                        className="w-full bg-eco-primary hover:bg-eco-primary/90"
                        onClick={() => handleJoinChallenge(challenge.id)}
                      >
                        {t('joinChallenge')}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rewards */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Gift className="w-5 h-5 text-eco-secondary" />
                {t('rewardsTitle')}
              </h3>
              <div className="space-y-4">
                {rewards.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg flex items-center justify-between ${
                      item.claimed ? 'bg-eco-primary/10' : userStats.points >= item.points ? 'bg-eco-secondary/10' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.claimed ? (
                        <CheckCircle2 className="w-5 h-5 text-eco-primary" />
                      ) : (
                        <div className={`w-5 h-5 rounded-full border-2 ${userStats.points >= item.points ? 'border-eco-secondary' : 'border-muted-foreground'}`} />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{item.reward}</p>
                        <p className="text-xs text-muted-foreground">{item.points} {t('points')}</p>
                      </div>
                    </div>
                    {!item.claimed && userStats.points >= item.points && (
                      <Button size="sm" variant="outline" className="text-eco-secondary border-eco-secondary">
                        {t('claim')}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Gamification;
