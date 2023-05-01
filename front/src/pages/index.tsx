// import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Heading, StackDivider, Stack, Box, Text, Divider, CheckboxGroup, Checkbox, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, RadioGroup, Radio, Input } from '@chakra-ui/react'
import { useState } from 'react'
import useSWR from 'swr'

type ScholarDataType = {
  '団体名': string
  '備考': string
  '対象者': string[]
  '推薦人数': string
  '月額': string
  '他奨学金との重複': string
  '学内選考申請締切': string
  'p対象者': string[]
  'p推薦人数': number | undefined
  'p年額': number | undefined
  'p他奨学金との重複': 'o' | 'x' | '?'
  'p学内選考申請締切': string
}

const fetcher = async () => {
  const response = await fetch(new URL(process.env.NODE_ENV === 'production' ? '/api/back/' : '/back/', process.env.NEXT_PUBLIC_API_ORIGIN).href);
  const data: ScholarDataType[] = await response.json();
  return data
}

export default function Home() {
  const { data: scholarData } = useSWR('AA', fetcher);
  const [targers, setTargets] = useState<any[]>([])
  const [peopleRange, setPeopleRange] = useState([0, 100])
  const [amoutRange, setAmoutRange] = useState([0, 5000000])
  const [duplication, setDuplication] = useState<'o' | 'x' | '?'>('?')

  return (
    <>
      対象者
      <CheckboxGroup value={targers} onChange={(v) => { setTargets(v) }}>
        <Checkbox value='B1'>B1</Checkbox>
        <Checkbox value='B2'>B2</Checkbox>
        <Checkbox value='B3'>B3</Checkbox>
        <Checkbox value='B4'>B4</Checkbox>
        <Checkbox value='M1'>M1</Checkbox>
        <Checkbox value='M2'>M2</Checkbox>
        <Checkbox value='D1'>D1</Checkbox>
        <Checkbox value='D2'>D2</Checkbox>
        <Checkbox value='D3'>D3</Checkbox>
      </CheckboxGroup>
      <br />
      推薦人数
      <RangeSlider aria-label={['min', 'max']} defaultValue={peopleRange} min={peopleRange[0]} max={peopleRange[1]} onChangeEnd={(v) => setPeopleRange(() => v)}>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Checkbox>直接応募・不明含む</Checkbox>
      <br />
      年額
      <RangeSlider aria-label={['min', 'max']} defaultValue={amoutRange} min={amoutRange[0]} max={amoutRange[1]} step={10000} onChange={(v) => setPeopleRange(v)}>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Checkbox>直接応募・不明含む</Checkbox>
      <br />
      他奨学金との重複
      <RadioGroup onChange={(e) => setDuplication(e as 'o' | 'x' | '?')} value={duplication}>
        <Radio value='o'>o</Radio>
        <Radio value='x'>x</Radio>
        <Radio value='?'>?</Radio>
      </RadioGroup>
      <br />
      学内選考申請締切
      <Input
        placeholder="Select Date and Time"
        size="md"
        type="datetime-local"
      />
      {
        (scholarData ?? []).map((scholarColumn) => (
          <>
            <Card key={scholarColumn['団体名']}>
              <CardHeader>
                <Heading size='md'>{scholarColumn['団体名']}</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      備考
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {scholarColumn['備考']}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      対象者
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {scholarColumn['対象者']}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      推薦人数
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {scholarColumn['推薦人数']}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      月額
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {scholarColumn['月額']}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      他奨学金との重複
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {scholarColumn['他奨学金との重複']}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      学内選考申請締切
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {scholarColumn['学内選考申請締切']}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Google URL
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      <a href={`https://www.google.com/search?q=${scholarColumn['団体名']}`} target="_blank" rel="noopener noreferrer">{scholarColumn['団体名']}</a>
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            <Divider />
          </>
        ))
      }
    </>
  )
}
