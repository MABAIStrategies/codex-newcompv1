import SectionHeading from '../components/SectionHeading';
import TestimonialsWall from '../components/TestimonialsWall';

export default function TestimonialsPage() {
  return (
    <div className="section max-w-6xl mx-auto space-y-10">
      <SectionHeading
        eyebrow="Testimonials"
        title="Social proof in motion"
        description="Hover to play the gold-framed video wall with high-fidelity audio."
      />
      <TestimonialsWall />
    </div>
  );
}
