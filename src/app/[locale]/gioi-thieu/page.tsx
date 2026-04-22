"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Link } from "@/i18n/routing";
import { Users, Target, ShieldCheck, Newspaper, Cpu, Wrench, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  const services = [
    {
      title: t("service1Title"),
      description: t("service1Desc"),
      icon: <Newspaper size={32} className="text-blue-600" />,
      bgColor: "bg-blue-100 dark:bg-blue-900/50"
    },
    {
      title: t("service2Title"),
      description: t("service2Desc"),
      icon: <Cpu size={32} className="text-indigo-600" />,
      bgColor: "bg-indigo-100 dark:bg-indigo-900/50"
    },
    {
      title: t("service3Title"),
      description: t("service3Desc"),
      icon: <Wrench size={32} className="text-purple-600" />,
      bgColor: "bg-purple-100 dark:bg-purple-900/50"
    },
    {
      title: t("service4Title"),
      description: t("service4Desc"),
      icon: <MessageSquare size={32} className="text-amber-600" />,
      bgColor: "bg-amber-100 dark:bg-amber-900/50"
    }
  ];

  return (
    <AppLayout>
      <div className="bg-background text-foreground animate-in fade-in duration-700">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50 to-background dark:from-slate-900/50 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('heroDesc')}
            </p>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 dark:bg-blue-900/50 dark:text-blue-300">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('missionTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('missionDesc')}
              </p>
            </div>
            <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 dark:bg-indigo-900/50 dark:text-indigo-300">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('communityTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('communityDesc')}
              </p>
            </div>
            <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 dark:bg-purple-900/50 dark:text-purple-300">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('trustTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('trustDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('servicesTitle')}</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">{service.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm bg-background">
          <p>{t('contactCTA')} <Link href="/lien-he" className="text-primary hover:underline font-medium">{t('contactLink')}</Link> {t('contactCTASuffix')}</p>
        </section>
      </div>
    </AppLayout>
  );
}
