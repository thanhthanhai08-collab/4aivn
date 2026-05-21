import { HomeClient } from "@/components/home/home-client";
import { getHomepageSettings, getLatestNews, getTopTools } from "@/lib/get-home-data";

export default async function HomePage() {
  const [settings, news, tools] = await Promise.all([
    getHomepageSettings(),
    getLatestNews(),
    getTopTools()
  ]);

  return (
    <HomeClient 
      homepageSettings={settings} 
      latestNews={news} 
      topTools={tools} 
    />
  );
}
