import { useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface GuidedTourProps {
  steps: Step[];
  tourKey: string;
}

const GuidedTour = ({ steps, tourKey }: GuidedTourProps) => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(`tour_${tourKey}`);
    if (!hasSeenTour) {
      const timer = setTimeout(() => setRun(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [tourKey]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem(`tour_${tourKey}`, 'true');
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: 'hsl(189, 94%, 43%)',
          zIndex: 10000,
        },
      }}
    />
  );
};

export const restartTour = (tourKey: string) => {
  localStorage.removeItem(`tour_${tourKey}`);
  window.location.reload();
};

export default GuidedTour;
