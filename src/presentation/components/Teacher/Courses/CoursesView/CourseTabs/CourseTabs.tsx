import { useRouter } from "next/router";
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

export default function CourseTabs() {
  const router = useRouter();

  const [keySelected, setKeySelected] = useState(
    router?.query?.section ? router.query.section.toString() : "about"
  );

  const handleTab = (key: string) => {
    router.push(window.location.pathname + `?section=${key}`);

    setKeySelected(key);
  };

  return (
    <Tabs
      id="controlled-tab-course"
      activeKey={keySelected}
      onSelect={(key: string | null) => handleTab(key ?? "")}
      className="nav-tabs--lg"
    >
      <Tab eventKey="about" title="Sobre el curso" />

      <Tab eventKey="lessons" title="Secciones" />

      <Tab eventKey="students" title="Estudiantes" />

      <Tab eventKey="class" title="Actividades" />

      <Tab eventKey="deliverables" title="Entregas" />

      <Tab eventKey="settings" title="Configuración" />
    </Tabs>
  );
}
