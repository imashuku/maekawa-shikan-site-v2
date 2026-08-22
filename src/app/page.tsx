import EngagementWays from "./components/EngagementWays";
import FreeExperience from "./components/FreeExperience";
import HeroSalonChooser from "./components/HeroSalonChooser";
import ProfileTeaser from "./components/ProfileTeaser";
import PublicationRoad from "./components/PublicationRoad";
import StoryHighlights from "./components/StoryHighlights";
import UpcomingSalonGrid from "./components/UpcomingSalonGrid";

// 次回表示を切り替えるため、静的生成の結果を定期的に作り直す
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <HeroSalonChooser />
      <FreeExperience />
      <UpcomingSalonGrid />
      <ProfileTeaser />
      <StoryHighlights />
      <PublicationRoad />
      <EngagementWays />
    </>
  );
}
