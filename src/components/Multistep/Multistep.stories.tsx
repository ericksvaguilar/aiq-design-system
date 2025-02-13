import React, { useState } from 'react'

import { Flex } from '../Flex'
import { Button } from '../Button'
import { Multistep } from './Multistep'

export default {
  component: Multistep,
  title: 'Multistep'
}

export interface Props {
  children?: any
}

const Step: React.FC<Props> = ({ children }) => {
  return <h1>{children}</h1>
}

export const Basic: React.FC = () => {
  const [stepCurrent, setStepCurrent] = useState(0)

  const steps = [
    { name: 'StepOne', component: <Step>One</Step> },
    { name: 'StepTwo', component: <Step>Two</Step> },
    { name: 'StepThree', component: <Step>Three</Step> },
    { name: 'StepFour', component: <Step>Four</Step> }
  ]

  function handleClickBtnNext() {
    setStepCurrent(stepCurrent + 1)
  }

  function handleClickBtnLast() {
    setStepCurrent(stepCurrent - 1)
  }

  return (
    <Flex flexDirection='column'>
      <Multistep stepCurrent={stepCurrent} steps={steps} />
      <Flex flexDirection='row' marginTop='16px' variant='centralized'>
        <Button
          onClick={handleClickBtnLast}
          variant='contained'
          palette='primary'
          marginRight={'16px'}
        >
          Last
        </Button>
        <Button
          onClick={handleClickBtnNext}
          variant='contained'
          palette='primary'
        >
          Next
        </Button>
      </Flex>
    </Flex>
  )
}

export const DisabledClickStep: React.FC = () => {
  const [stepCurrent, setStepCurrent] = useState(0)

  const steps = [
    { name: 'StepOne', component: <Step>One</Step> },
    { name: 'StepTwo', component: <Step>Two</Step> },
    { name: 'StepThree', component: <Step>Three</Step> },
    { name: 'StepFour', component: <Step>Four</Step> }
  ]

  function handleClickBtnNext() {
    setStepCurrent(stepCurrent + 1)
  }

  function handleClickBtnLast() {
    setStepCurrent(stepCurrent - 1)
  }

  return (
    <Flex flexDirection='column'>
      <Multistep
        disabledClickStep={true}
        stepCurrent={stepCurrent}
        steps={steps}
      />
      <Flex flexDirection='row' marginTop='16px' variant='centralized'>
        <Button
          onClick={handleClickBtnLast}
          variant='contained'
          palette='primary'
          marginRight={'16px'}
        >
          Last
        </Button>
        <Button
          onClick={handleClickBtnNext}
          variant='contained'
          palette='primary'
        >
          Next
        </Button>
      </Flex>
    </Flex>
  )
}
