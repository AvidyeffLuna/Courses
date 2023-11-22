import { Dispatch, SetStateAction, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

interface ICourseTabsProps {
  section: number;
  setSection: Dispatch<SetStateAction<number>>;
}

export default function CourseTabs({ section, setSection }: ICourseTabsProps) {
  const [keySelected, setKeySelected] = useState("about");

  const handleTab = (key: string) => {
    switch (key) {
      case "about":
        setSection(0);
        break;
      case "tasks":
        setSection(1);
        break;

      default:
        setSection(0);
    }

    setKeySelected(key);
  };

  return (
    <Tabs
      id="controlled-tab-course"
      activeKey={keySelected}
      onSelect={(key: string | null) => handleTab(key ?? "")}
      className="nav-tabs--lg"
    >
      <Tab eventKey="about" title="Sobre la clase" />

      <Tab eventKey="tasks" title="Actividades" />
    </Tabs>
  );
}
