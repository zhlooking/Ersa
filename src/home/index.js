import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import '../../styles/pages/home.scss'

const { Sider, Content, Header, Footer } = Layout

export default () => {
  const menus = [
    { icon: 'user', className: 'nav-text', name: '首页' },
    { icon: 'video-camera', className: 'nav-text', name: 'Foo' },
    { icon: 'upload', className: 'nav-text', name: 'Bar' },
  ]

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {menus.map(({ icon, className, name }, index) => (
            <Menu.Item key={index}>
              <Icon type={icon} />
              <span className={className}>{name}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: 'white', padding: 0 }} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: 'white',
            minHeight: 280,
          }}
        >
          Content
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
