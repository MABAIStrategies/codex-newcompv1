import PortfolioGrid from '../components/PortfolioGrid';
import SectionHeading from '../components/SectionHeading';

export default function PortfolioPage() {
  return (
    <div className="section max-w-6xl mx-auto space-y-10">
      <SectionHeading
        eyebrow="Portfolio"
        title="Proof in motion"
        description="Every build shows the how (logic flow) and why (ROI). Tap a card to view the modal."
      />
      <PortfolioGrid />
    </div>
  );
}
