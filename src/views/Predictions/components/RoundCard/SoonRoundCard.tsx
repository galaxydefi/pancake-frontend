import React from 'react'
import { CardBody, Text, WaitIcon } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { Position, Round } from 'state/types'
import { padTime } from '../../helpers'
import useBlockCountdown from '../../hooks/useGetBlockCountdown'
import MultiplierArrow from './MultiplierArrow'
import Card from './Card'
import RoundInfoBox from './RoundInfoBox'
import CardHeader from './CardHeader'

interface SoonRoundCardProps {
  round: Round
}

const SoonRoundCard: React.FC<SoonRoundCardProps> = ({ round }) => {
  const TranslateString = useI18n()
  const { minutes, seconds } = useBlockCountdown(round.startBlock)
  const padMinute = padTime(minutes >= 0 ? minutes : 0)
  const padSecond = padTime(seconds >= 0 ? seconds : 0)
  const countdown = minutes > 0 || seconds > 0 ? `~${padMinute}:${padSecond}` : TranslateString(999, 'Soon')

  return (
    <Card>
      <CardHeader
        status="soon"
        icon={<WaitIcon mr="4px" width="21px" />}
        title={TranslateString(999, 'Later')}
        epoch={round.epoch}
        blockNumber={round.startBlock}
      />
      <CardBody p="16px">
        <MultiplierArrow isDisabled />
        <RoundInfoBox>
          <Text textAlign="center">
            <Text bold>{TranslateString(999, 'Entry starts')}</Text>
            <Text fontSize="24px" bold>
              {countdown}
            </Text>
          </Text>
        </RoundInfoBox>
        <MultiplierArrow roundPosition={Position.DOWN} isDisabled />
      </CardBody>
    </Card>
  )
}

export default SoonRoundCard