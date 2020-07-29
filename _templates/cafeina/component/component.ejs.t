---
to: src/components/<%=h.inflection.pluralize(category)%>/<%=h.inflection.camelize(name)%>/<%=h.inflection.camelize(name)%>.tsx
---
import React from 'react'

import styled from 'styled-components'

interface Props {}

const <%=h.inflection.camelize(name)%>Styled = styled.div<Props>``

export const <%=h.inflection.camelize(name)%>: React.FC<Props> = () => {
  return <<%=h.inflection.camelize(name)%>Styled />
}
