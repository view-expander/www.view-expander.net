import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import ContentHeader from '../components/content-header'

const Wrapper = styled.div`
  margin-top: 100px;
`

const TopPageLink = styled(Link)`
  color: inherit;
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
          <TopPageLink to="/">トップページ</TopPageLink>
          をご覧ください。
        </p>
      </div>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
