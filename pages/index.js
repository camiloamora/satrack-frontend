import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Heading, Input, Button, Spacer, CenteredContent } from '@camiloamora/components'

export default function Home() {

  const [formValues, setFormValues] = useState({})
  const onChange = (key) => (event) => {
    const { value } = event.target
    setFormValues({...formValues, [key]: value })
  }

  return (
  <CenteredContent>
    <Heading>Cuentame sobre ti</Heading>
    <Spacer.Horizontal size="md" />
    <Input placeholder="Nombres" value={formValues.name} onChange={onChange('name')} />
    <Spacer.Horizontal size="sm" />
    <Input placeholder="Apellidos" value={formValues.lastname} onChange={onChange('lastname')} />
    <Spacer.Horizontal size="sm" />
    <Input placeholder="Correo electrónico" value={formValues.email} onChange={onChange('email')} />
    <Spacer.Horizontal size="lg" />

    <div style={{ textAlign: 'center' }}>
      <Button type="primary">Completa tu perfil</Button>
      <Spacer.Horizontal size="md" />
      <Button type="tertiary">Saltar este paso por ahora</Button>
    </div>
  </CenteredContent>
  )
}
