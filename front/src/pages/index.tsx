import { Card, CardHeader, CardBody, Heading, Stack, Box, Text, CheckboxGroup, Checkbox, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, RadioGroup, Radio, Input, SimpleGrid, GridItem, Container, Link as ChakraLink, Image, useDisclosure, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

type ScholarDataType = {
  '団体名': string
  '備考': string
  '対象者': string[]
  '推薦人数': string
  '月額': string
  '他奨学金との重複': string
  '学内選考申請締切': string
  'p対象者': string[]
  'p推薦人数': number | undefined | null
  'p年額': number | undefined | null
  'p他奨学金との重複': 'o' | 'x' | '?'
  'p学内選考申請締切': string
};

const fetcher = async () => {
  const response = await fetch(new URL(process.env.NODE_ENV === 'production' ? '/api/back/' : '/back/', process.env.NEXT_PUBLIC_API_ORIGIN).href);
  const data: ScholarDataType[] = await response.json();
  return data;
};

export default function Home() {
  const { data: scholarData } = useSWR('AA', fetcher);
  const [targets, setTargets] = useState<string[]>([]);
  const [duplication, setDuplication] = useState<'o' | 'x' | '?'>('?');
  const [expire, setExpire] = useState<undefined | string>();
  const { isOpen: isExpireChecked, onToggle: onToggleIsExpireChecked } = useDisclosure({ defaultIsOpen: true });
  const [peopleRange, setPeopleRange] = useState([0, 100]);
  const { isOpen: isPeopleChecked, onToggle: onToggleIsPeopleChecked } = useDisclosure({ defaultIsOpen: true });
  const [amoutRange, setAmoutRange] = useState([0, 500]);
  const { isOpen: isAmountChecked, onToggle: onToggleIsAmountChecked } = useDisclosure({ defaultIsOpen: true });
  const filteredScholarData = useMemo(() => {
    return (scholarData ?? []).filter((scholarDatum) => {
      let matches = true;
      if (duplication !== '?') {
        // 他奨学金との重複
        matches = matches && scholarDatum['p他奨学金との重複'] == duplication;
      }
      if (targets.length > 0) {
        // 対象者
        matches = matches && targets.some((target) => scholarDatum['p対象者'].includes(target));
      }
      if (expire) {
        // 学内選考申請締切
        if (isExpireChecked && scholarDatum['p学内選考申請締切'] == '?') { }
        else {
          matches = matches && new Date(scholarDatum['p学内選考申請締切']) <= new Date(expire);
        }
      }
      // 年額
      if (scholarDatum['p年額'] && (amoutRange[0] * 10000 > scholarDatum['p年額'] || scholarDatum['p年額'] > amoutRange[1] * 10000)) {
        matches = false;
      }
      if (!isAmountChecked && !scholarDatum['p年額']) {
        matches = false;
      }
      // 推薦人数
      if (scholarDatum['p推薦人数'] && (peopleRange[0] > scholarDatum['p推薦人数'] || scholarDatum['p推薦人数'] > peopleRange[1])) {
        matches = false;
      }
      if (!isPeopleChecked && !scholarDatum['p推薦人数']) {
        matches = false;
      }
      return matches;
    })
  }, [scholarData, duplication, targets, expire, isExpireChecked, isPeopleChecked, isAmountChecked, amoutRange, peopleRange]);

  return (
    <Container mt={8} maxW="container.md">
      <Image src='/logo.png' />

      <SimpleGrid columns={3} spacing={12}>
        <GridItem>
          対象者
          <Box>
            <CheckboxGroup value={targets} onChange={(v) => { setTargets(v as string[]) }}>
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
          </Box>
        </GridItem>
        <GridItem>
          他奨学金との重複
          <RadioGroup onChange={(e) => setDuplication(e as 'o' | 'x' | '?')} value={duplication}>
            <Radio value='o'>o</Radio>
            <Radio value='x'>x</Radio>
            <Radio value='?'>すべて</Radio>
          </RadioGroup>
        </GridItem>
        <GridItem>
          学内選考申請締切
          <Input
            placeholder="学内選考申請締切の選択"
            size="md"
            type="date"
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
          />
          {expire &&
            <Checkbox isChecked={isExpireChecked} onChange={onToggleIsExpireChecked}>不明含む</Checkbox>
          }
        </GridItem>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={12}>
        <GridItem>
          推薦人数 ({peopleRange[0]}~{peopleRange[1]}人)
          <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 100]} min={1} max={100} onChange={setPeopleRange}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Checkbox isChecked={isPeopleChecked} onChange={onToggleIsPeopleChecked}>直接応募・不明含む</Checkbox>
        </GridItem>
        <GridItem>
          年額 ({amoutRange[0]}~{amoutRange[1]}万円)
          <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 500]} min={0} max={500} step={1} onChange={setAmoutRange}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Checkbox isChecked={isAmountChecked} onChange={onToggleIsAmountChecked}>直接応募・不明含む</Checkbox>
        </GridItem>
      </SimpleGrid>

      <Flex my={8} justifyContent='end'>結果: {filteredScholarData.length}/{(scholarData || []).length}件</Flex>

      {
        filteredScholarData.map((scholarColumn) => (
          <>
            <Card key={scholarColumn['団体名']} id={scholarColumn['団体名']} my={2}>
              <CardHeader>
                <Heading as={ChakraLink} size='md' href={`#${scholarColumn['団体名']}`}>{scholarColumn['団体名']}</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing={4}>
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
                      <ChakraLink color='blue.500' as={NextLink} href={`https://www.google.com/search?q=${scholarColumn['団体名']}`} target="_blank" rel="noopener noreferrer">{scholarColumn['団体名']}</ChakraLink>
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </>
        ))
      }
    </Container>
  )
}
