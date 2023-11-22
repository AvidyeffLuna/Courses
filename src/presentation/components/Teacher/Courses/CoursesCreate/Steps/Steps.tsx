import { useRouter } from "next/router";
import { useEffect, useId, useState } from "react";

interface IStep {
  stepId: string;
  step: number;
  text: string;
}

export default function Steps() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  const steps: IStep[] = [
    {
      stepId: useId(),
      step: 1,
      text: "Sobre el curso",
    },
    {
      stepId: useId(),
      step: 2,
      text: "Multimedia",
    },
    {
      stepId: useId(),
      step: 3,
      text: "Resumen",
    },
  ];

  useEffect(() => {
    setCurrentStep(
      router.query.step ? parseInt(router.query.step.toString(), 10) : 1
    );
  }, [router.query]);

  return (
    <div className="d-flex align-items-center">
      <div className="steps">
        {steps.map((step: IStep) => (
          <div
            key={step.stepId}
            className={`steps-indicator ${
              step.step === currentStep
                ? "steps-indicator--in-step"
                : step.step < currentStep && "steps-indicator--finish"
            }`}
          >
            <div className="steps-circle">
              <div className="steps-circle-text">
                <span>{step.step}</span>
              </div>

              {steps.length > step.step && (
                <div className="steps-circle-progress" />
              )}
            </div>
            <div className="mt-2">
              <span className="font-size-md">{step.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
