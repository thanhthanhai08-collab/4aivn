import { HomeClient } from "@/components/home/home-client";
import { getHomepageSettings, getLatestNews, getTopTools } from "@/lib/get-home-data";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [settings, news, tools] = await Promise.all([
    getHomepageSettings(),
    getLatestNews(locale),
    getTopTools(locale)
  ]);

  return (
    <HomeClient 
      homepageSettings={settings} 
      latestNews={news} 
      topTools={tools} 
    />
  );
}

