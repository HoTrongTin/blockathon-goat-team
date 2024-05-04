import { Box } from '@0xsequence/design-system'
import { Flex, Image, Typography } from 'antd'

import logoUrl from '~/images/logo.png'

const { Title, Paragraph } = Typography

export const Posts = () => {
  return (
    <div style={{ border: '1px solid #333', padding: 8 }}>
      <Flex style={{ gap: 8 }}>
        <Box>
          <Image src={logoUrl} width={420} />
        </Box>
        <Box style={{ flex: 'auto' }}>
          <Title style={{ textAlign: 'center' }}>h1. Ant Design</Title>
          <Flex>
            <Box style={{ flex: 1 }}>
              <Paragraph editable >
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design
                language for background applications, is refined by Ant UED Team. Ant Design, a design language for background
                applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by
                Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a
                design language for background applications, is refined by Ant UED Team.
              </Paragraph>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}
