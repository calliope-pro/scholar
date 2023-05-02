import { Container, Heading, Text } from "@chakra-ui/react";

export default function Terms() {
  return (
    <Container mt={8} maxW="container.md">
      <Heading size="lg">利用規約・免責事項</Heading>
      <Text mt={2} mb={4}>本規約は、calliopeとth2ch-g(以下、当社といいます。)が提供する「東京工業大学奨学金検索サイト」(以下「本サービス」といいます。)を利用する際に適用されます。ご利用にあたっては、本規約をお読みいただき、内容をご承諾の上でご利用ください。</Text>
      <Heading size="md">免責事項</Heading>
      <Text mt={2} mb={4}>本サービスは、掲載内容によって生じた損害に対する一切の責任を負いません。 各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。 また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。</Text>
      <Heading size="md">著作権について</Heading>
      <Text mt={2} mb={4}>本サービスで掲載している文章や画像などにつきましては、無断転載することを禁止します。 本サービスは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、GithubのIssueよりご連絡ください。迅速に対応いたします。</Text>
      <Heading size="md">リンクについて</Heading>
      <Text mt={2} mb={4}>本サービスは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。 ただし、インラインフレームの使用や、画像の直リンクはご遠慮ください。法的に認められている引用の範囲を超えて、無断で転載することを禁止します。</Text>
    </Container>
  );
}
