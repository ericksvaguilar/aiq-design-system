import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import {
  Title,
  Primary,
  ArgsTable,
  Stories,
  Subheading,
  Heading
} from '@storybook/addon-docs'

export const createPageExport = (
  component: React.FC,
  title: string,
  aiqProps: string[],
  optionalConfigs: any
) => {
  return {
    component,
    title,
    decorators: [withKnobs],
    parameters: {
      controls: {
        include: new RegExp(`^(${aiqProps.join('|')})`)
      },
      docs: {
        page: () => (
          <>
            <Title />
            <Primary />

            <Heading>Props</Heading>
            {aiqProps.length > 0 && (
              <>
                <Subheading>Component control props</Subheading>
                <ArgsTable include={aiqProps} />{' '}
              </>
            )}
            <Subheading>Styling props (from styled-system)</Subheading>
            <ArgsTable exclude={aiqProps} />

            <Stories />
          </>
        )
      }
    },
    ...optionalConfigs
  }
}
