import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";

export default function AlliesList() {
  const [allies] = useState([
    "https://i.pinimg.com/564x/85/33/16/853316f4f5ed0e4a98df214152888970.jpg",
    "https://i.pinimg.com/564x/4e/89/6f/4e896f08f1b76953122e5ea53db0a2e6.jpg",
    "https://i.pinimg.com/564x/74/f4/fe/74f4fe0fc44bf968d51c20c58fee305e.jpg",
    "https://i.pinimg.com/564x/68/43/d9/6843d9b1dfe89a576dbbe769ecc46ffb.jpg",
    "https://i.pinimg.com/564x/c5/f1/62/c5f162f0f979cf76c661c6a51eec595e.jpg",
    "https://i.pinimg.com/564x/fa/80/5a/fa805a2cd8a6acb921a5011e5d903533.jpg",
  ]);

  return (
    <Row>
      {allies.map((ally) => (
        <Col key={ally} lg={4} className="mb-4">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "200px",
            }}
          >
            <Image
              src={ally}
              alt="Ally media port"
              title="Ally media"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Col>
      ))}
    </Row>
  );
}
