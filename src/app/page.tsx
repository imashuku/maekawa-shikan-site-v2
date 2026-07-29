import EngagementWays from "./components/EngagementWays";
import FreeExperience from "./components/FreeExperience";
import HeroSalonChooser from "./components/HeroSalonChooser";
import ProfileTeaser from "./components/ProfileTeaser";
import PublicationRoad from "./components/PublicationRoad";
import StoryHighlights from "./components/StoryHighlights";
import UpcomingSalonGrid from "./components/UpcomingSalonGrid";

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
