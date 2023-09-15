import {
  Avatar,
  Heading,
  Spacer,
  Card,
  Icon,
  CenteredContent,
  Paragraph,
} from "@camiloamora/components";

export default function Home() {
  return (
    <CenteredContent>
      <div style={{ display: "flex" }}>
        <Avatar src="http://placeimg.com/200/200/people"></Avatar>
        <Spacer.Vertical size="xs" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Heading size="lg">Buenos días, Camilo</Heading>
          <Heading size="md" color="primary">
            ¿Cómo quieres empezar?
          </Heading>
        </div>
      </div>
      <Spacer.Horizontal size="lg" />
      <Card color="secondary" size="lg">
        Buscar un espacio para trabajar
      </Card>
      <Spacer.Horizontal size="md" />
      <Card color="primary" size="lg">
        Iniciar una sesión de productividad
      </Card>
      <Spacer.Horizontal size="lg" />
      <Card size="sm">
        <Icon name="user" color="primary" background="highlight" />
        <Spacer.Horizontal size="sm" />
        <Paragraph>Maria ha hecho check-in en Factoria</Paragraph>
      </Card>
      <Spacer.Horizontal size="xs" />
      <Card size="sm">
      <Icon name="user" color="primary" background="highlight" />
            <Spacer.Horizontal size="sm" />
            <Paragraph>Frank ha iniciado una sesión de productividad</Paragraph>
      </Card>
      <Spacer.Horizontal size="xs" />
      <Card size="sm">
      <Icon name="arrowUp" color="primary" background="spotlight" />
            <Spacer.Horizontal size="sm" />
            <Paragraph>
              Tu productividad ha incrementado un 30% durante la última semana
            </Paragraph>
      </Card>
    </CenteredContent>
  );
}
