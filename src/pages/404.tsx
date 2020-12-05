import React from 'react'
import styled from 'styled-components'
import ContentHeader from '../components/content-header'
import EffectedLink from '../components/effected-link'
import Layout from '../components/layout'

const Wrapper = styled.div`
  margin-top: 100px;
`

const NotFoundPage = () => (
  <Layout>
    <Wrapper>
      <ContentHeader>
        <h2>Not Found</h2>
      </ContentHeader>
      <div>
        <p>
          ページが存在しません。
          <br />
          <EffectedLink to="/">トップページ</EffectedLink>
          をご覧ください。
        </p>
      </div>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
