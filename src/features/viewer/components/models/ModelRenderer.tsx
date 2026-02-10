import { MachineVice } from "./MachineVice";
import { RobotGripper } from "./RobotGripper";
import { Suspension } from "./Suspension";

type ModelName = "Machine Vice" | "Suspension" | "Robot Gripper";

type ModelRendererProps = {
  modelName: ModelName;
  modelUrl?: string;
  explode?: number;
  selectedPart?: string | null;
};

export default function ModelRenderer({
  modelName,
  modelUrl,
  explode = 0,
  selectedPart,
}: ModelRendererProps) {
  switch (modelName) {
    case "Machine Vice":
      return (
        <MachineVice
          url={modelUrl}
          explode={explode}
          selectedPart={selectedPart}
        />
      );
    case "Suspension":
      return <Suspension url={modelUrl} explode={explode} />;
    case "Robot Gripper":
      return (
        <RobotGripper
          url={modelUrl}
          explode={explode}
          selectedPart={selectedPart}
        />
      );
    default:
      return null;
  }
}
