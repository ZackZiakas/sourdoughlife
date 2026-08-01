import BakeLogHero from "../../components/BakeLogHero/BakeLogHero";
import BakeLogForm from "../../components/BakeLogForm/BakeLogForm";
import BakeLogTimeline from "../../components/BakeLogTimeline/BakeLogTimeline";
import "./BakeLog.css";

function BakeLog() {
  return (
    <main className="bake-log">
      <BakeLogHero />
      <BakeLogForm />
      <BakeLogTimeline />
    </main>
  );
}

export default BakeLog;
